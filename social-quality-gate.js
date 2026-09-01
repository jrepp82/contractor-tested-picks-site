#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const Publisher = require('./affiliate-social-publisher.js');

const ROOT = __dirname;
const OUT = path.join(ROOT, '.social-quality');
const PLATFORMS = ['facebook','instagram','tiktok','youtube-shorts'];

function fail(msg){ throw new Error(msg); }
function assert(cond,msg){ if(!cond) fail(msg); }
function clean(v){ return String(v || '').trim(); }
function hasPlaceholder(v){ return /PENDING_|PLACEHOLDER|TODO|TBD|example\.com/i.test(String(v || '')); }

function checkManifest(m){
  assert(m && m.publishable === true, `${m?.platform || 'unknown'} manifest not publishable`);
  assert(clean(m.hook).length >= 18, `${m.platform} hook too weak/short`);
  assert(clean(m.caption).length >= 80, `${m.platform} caption too thin`);
  assert(clean(m.cta).length >= 8, `${m.platform} CTA missing/weak`);
  assert(/^https:\/\//i.test(clean(m.affiliate_url)), `${m.platform} tracked URL must be HTTPS`);
  assert(!hasPlaceholder(m.caption), `${m.platform} caption contains placeholder text`);
  assert(!hasPlaceholder(m.affiliate_url), `${m.platform} URL contains placeholder text`);
  assert(clean(m.disclosure).length >= 3, `${m.platform} disclosure missing`);
  if (m.platform === 'instagram') {
    assert(/^https:\/\//i.test(clean(m.image_url)), 'instagram requires a public HTTPS image');
  }
}

function probeVideo(file){
  const r = spawnSync('ffprobe', ['-v','error','-select_streams','v:0','-show_entries','stream=width,height,r_frame_rate:format=duration','-of','json',file], {encoding:'utf8'});
  if (r.status !== 0) fail(`ffprobe failed: ${r.stderr || r.stdout}`);
  const j = JSON.parse(r.stdout);
  const s = j.streams?.[0] || {};
  const duration = Number(j.format?.duration || 0);
  assert(s.width === 1080 && s.height === 1920, `video must be 1080x1920, got ${s.width}x${s.height}`);
  assert(duration >= 8 && duration <= 60, `video duration out of range: ${duration}`);
  const stat = fs.statSync(file);
  assert(stat.size > 100000, `video file suspiciously small: ${stat.size}`);
  return {width:s.width,height:s.height,duration,bytes:stat.size,fps:s.r_frame_rate};
}

function main(){
  const date = new Date();
  const slot = process.env.PUBLISH_SLOT || `qa-${date.toISOString().slice(0,10)}`;
  fs.mkdirSync(OUT,{recursive:true});
  const results = [];
  for (const platform of PLATFORMS){
    const m = Publisher.manifestFor({platform,date,slot});
    checkManifest(m);
    const row = {platform,content_id:m.content_id,hook:m.hook,cta:m.cta};
    if (platform === 'tiktok' || platform === 'youtube-shorts'){
      const file = Publisher.renderVerticalVideo(m, OUT);
      row.video = probeVideo(file);
    }
    results.push(row);
  }
  fs.writeFileSync(path.join(OUT,'quality-gate-result.json'), JSON.stringify({ok:true,checked_at:new Date().toISOString(),results},null,2));
  console.log(JSON.stringify({ok:true,results},null,2));
}

try { main(); }
catch (e) { console.error(`QUALITY_GATE_FAILED: ${e.message || e}`); process.exit(1); }
