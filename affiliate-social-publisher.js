#!/usr/bin/env node
/*
 * Prestige affiliate social publisher
 *
 * Turns the canonical affiliate-content-feed into deterministic scheduled posts.
 * Facebook publishes tracked link posts. Instagram publishes image posts when the
 * source product has a public image. TikTok and YouTube publish a generated 9:16
 * short video. Missing credentials fail closed per-channel instead of blocking
 * the other channels.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const Feed = require('./affiliate-content-feed-builder.js');

const ROOT = __dirname;
const PRODUCTS = path.join(ROOT, 'normalized-products.json');
const CHANNELS = ['facebook', 'instagram', 'tiktok', 'youtube-shorts'];
const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v24.0';

function fail(message) { throw new Error(message); }
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function existsCommand(name) {
  const r = spawnSync('bash', ['-lc', `command -v ${name}`], { stdio: 'ignore' });
  return r.status === 0;
}
function hashInt(value) {
  return parseInt(crypto.createHash('sha256').update(String(value)).digest('hex').slice(0, 12), 16);
}
function dayKey(input = new Date()) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) fail(`Invalid date: ${input}`);
  return d.toISOString().slice(0, 10);
}
function productMap() {
  const data = JSON.parse(fs.readFileSync(PRODUCTS, 'utf8'));
  return new Map((data.products || []).map(p => [p.product_id, p]));
}
function clean(value, max = Infinity) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
}
function captionFor(item, platform) {
  const bullets = (item.talking_points || []).map(x => `• ${clean(x)}`);
  let cta = clean(item.cta);
  if (platform === 'instagram') cta = `${cta} Link in bio / tracked link in profile.`;
  const parts = [clean(item.hook), ...bullets, cta, item.affiliate_url, clean(item.disclosure)];
  return parts.filter(Boolean).join('\n\n');
}
function chooseItem({ platform, date = new Date(), slot = '0' }) {
  const built = Feed.build({ platform, date });
  if (built.validation_errors?.length) fail(`Feed validation errors: ${built.validation_errors.join('; ')}`);
  let items = built.items || [];
  if (platform === 'instagram') {
    const products = productMap();
    const withImages = items.filter(x => /^https:\/\//i.test(products.get(x.product_id)?.image || ''));
    if (withImages.length) items = withImages;
  }
  if (!items.length) fail(`No publishable items available for ${platform}`);
  const seed = `${dayKey(date)}|${slot}|${platform}`;
  const item = items[hashInt(seed) % items.length];
  const product = productMap().get(item.product_id) || {};
  return { item, product };
}
function manifestFor({ platform, date = new Date(), slot = '0' }) {
  const { item, product } = chooseItem({ platform, date, slot });
  const caption = captionFor(item, platform);
  const id = `${dayKey(date)}-${slot}-${platform}-${item.content_id}`.replace(/[^a-z0-9_-]+/gi, '-');
  return {
    id,
    platform,
    date: new Date(date).toISOString(),
    slot: String(slot),
    content_id: item.content_id,
    product_id: item.product_id,
    product_name: item.product_name,
    hook: item.hook,
    talking_points: item.talking_points,
    cta: item.cta,
    affiliate_url: item.affiliate_url,
    tracking_id: item.tracking_id,
    disclosure: item.disclosure,
    image_url: product.image || null,
    caption,
    title: clean(item.hook, 96),
    suggested_visual: item.suggested_visual,
    publishable: true
  };
}

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
function wrapText(value, width = 28, maxLines = 7) {
  const words = clean(value).split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > width && line) { lines.push(line); line = word; }
    else line = next;
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const clipped = lines.slice(0, maxLines);
    clipped[maxLines - 1] = `${clipped[maxLines - 1].slice(0, Math.max(0, width - 2))}…`;
    return clipped;
  }
  return lines;
}
function renderVerticalVideo(manifest, outDir) {
  if (!existsCommand('rsvg-convert')) fail('rsvg-convert is required to render social video');
  if (!existsCommand('ffmpeg')) fail('ffmpeg is required to render social video');
  fs.mkdirSync(outDir, { recursive: true });
  const svgPath = path.join(outDir, `${manifest.id}.svg`);
  const pngPath = path.join(outDir, `${manifest.id}.png`);
  const mp4Path = path.join(outDir, `${manifest.id}.mp4`);
  const lines = wrapText(manifest.hook, 27, 7);
  const lineSvg = lines.map((line, i) => `<text x="540" y="${640 + i * 104}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="76" font-weight="700" fill="#ffffff">${escapeXml(line)}</text>`).join('\n');
  const productLines = wrapText(manifest.product_name, 34, 3);
  const productSvg = productLines.map((line, i) => `<text x="540" y="${1380 + i * 68}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="45" font-weight="600" fill="#e8eef9">${escapeXml(line)}</text>`).join('\n');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07182f"/><stop offset="1" stop-color="#111820"/></linearGradient></defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <rect x="64" y="72" width="952" height="10" rx="5" fill="#d5a947"/>
  <text x="80" y="178" font-family="Arial,Helvetica,sans-serif" font-size="44" font-weight="700" fill="#d5a947">CONTRACTOR TESTED PICKS</text>
  <text x="80" y="246" font-family="Arial,Helvetica,sans-serif" font-size="32" fill="#b9c8dc">Real-world gear. No fluff.</text>
  ${lineSvg}
  <rect x="90" y="1280" width="900" height="5" fill="#d5a947" opacity="0.7"/>
  ${productSvg}
  <rect x="135" y="1675" width="810" height="104" rx="20" fill="#d5a947"/>
  <text x="540" y="1744" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="43" font-weight="800" fill="#07182f">CHECK THE TRACKED LINK</text>
  <text x="540" y="1850" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="28" fill="#b9c8dc">Prestige • Contractor Tested Picks</text>
</svg>`;
  fs.writeFileSync(svgPath, svg);
  let r = spawnSync('rsvg-convert', ['-w', '1080', '-h', '1920', '-o', pngPath, svgPath], { encoding: 'utf8' });
  if (r.status !== 0) fail(`rsvg-convert failed: ${r.stderr || r.stdout}`);
  r = spawnSync('ffmpeg', ['-y', '-loop', '1', '-i', pngPath, '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100', '-t', '12', '-r', '30', '-vf', 'format=yuv420p', '-c:v', 'libx264', '-preset', 'veryfast', '-c:a', 'aac', '-b:a', '96k', '-shortest', '-movflags', '+faststart', mp4Path], { encoding: 'utf8' });
  if (r.status !== 0) fail(`ffmpeg failed: ${r.stderr || r.stdout}`);
  return mp4Path;
}

async function jsonFetch(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  const providerError = json.error && json.error.code !== 'ok';
  if (!res.ok || providerError) fail(`${options.method || 'GET'} ${url} failed (${res.status}): ${JSON.stringify(json)}`);
  return json;
}
function missing(names) { return names.filter(n => !process.env[n]); }
function skipped(platform, names, reason = 'missing_credentials') {
  return { ok: true, platform, status: 'SKIPPED', reason, missing: names };
}

async function publishFacebook(manifest) {
  const tokenName = process.env.META_PAGE_ACCESS_TOKEN ? 'META_PAGE_ACCESS_TOKEN' : 'META_ACCESS_TOKEN';
  const miss = missing(['META_PAGE_ID', tokenName]);
  if (miss.length) return skipped('facebook', miss);
  const body = new URLSearchParams({
    message: manifest.caption,
    link: manifest.affiliate_url,
    access_token: process.env[tokenName]
  });
  const json = await jsonFetch(`https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(process.env.META_PAGE_ID)}/feed`, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body
  });
  return { ok: true, platform: 'facebook', status: 'PUBLISHED', post_id: json.id, content_id: manifest.content_id };
}

async function publishInstagram(manifest) {
  const miss = missing(['META_IG_USER_ID', 'META_ACCESS_TOKEN']);
  if (miss.length) return skipped('instagram', miss);
  if (!manifest.image_url) return skipped('instagram', [], 'no_public_product_image');
  const create = new URLSearchParams({ image_url: manifest.image_url, caption: manifest.caption, access_token: process.env.META_ACCESS_TOKEN });
  const container = await jsonFetch(`https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(process.env.META_IG_USER_ID)}/media`, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: create
  });
  if (!container.id) fail('Instagram media container did not return an id');
  await sleep(2500);
  const publish = new URLSearchParams({ creation_id: container.id, access_token: process.env.META_ACCESS_TOKEN });
  const json = await jsonFetch(`https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(process.env.META_IG_USER_ID)}/media_publish`, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: publish
  });
  return { ok: true, platform: 'instagram', status: 'PUBLISHED', media_id: json.id, content_id: manifest.content_id };
}

async function publishTikTok(manifest, videoPath) {
  const miss = missing(['TIKTOK_ACCESS_TOKEN']);
  if (miss.length) return skipped('tiktok', miss);
  const token = process.env.TIKTOK_ACCESS_TOKEN;
  const headers = { authorization: `Bearer ${token}`, 'content-type': 'application/json; charset=UTF-8' };
  const creator = await jsonFetch('https://open.tiktokapis.com/v2/post/publish/creator_info/query/', { method: 'POST', headers, body: '{}' });
  const options = creator.data?.privacy_level_options || [];
  const requested = process.env.TIKTOK_PRIVACY_LEVEL || 'PUBLIC_TO_EVERYONE';
  const privacy = options.includes(requested) ? requested : (options[0] || 'SELF_ONLY');
  const stat = fs.statSync(videoPath);
  const title = clean(`${manifest.hook} ${manifest.cta} ${manifest.disclosure}`, 2100);
  const initBody = {
    post_info: {
      title,
      privacy_level: privacy,
      disable_duet: false,
      disable_comment: false,
      disable_stitch: false,
      brand_content_toggle: false,
      brand_organic_toggle: true,
      is_aigc: true
    },
    source_info: { source: 'FILE_UPLOAD', video_size: stat.size, chunk_size: stat.size, total_chunk_count: 1 }
  };
  const init = await jsonFetch('https://open.tiktokapis.com/v2/post/publish/video/init/', { method: 'POST', headers, body: JSON.stringify(initBody) });
  if (init.error?.code && init.error.code !== 'ok') fail(`TikTok init failed: ${JSON.stringify(init)}`);
  const uploadUrl = init.data?.upload_url;
  const publishId = init.data?.publish_id;
  if (!uploadUrl || !publishId) fail(`TikTok init missing upload_url/publish_id: ${JSON.stringify(init)}`);
  const video = fs.readFileSync(videoPath);
  const upload = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'content-type': 'video/mp4', 'content-length': String(video.length), 'content-range': `bytes 0-${video.length - 1}/${video.length}` },
    body: video
  });
  if (!upload.ok) fail(`TikTok video upload failed (${upload.status}): ${await upload.text()}`);
  let status = null;
  for (let i = 0; i < 5; i++) {
    await sleep(3000);
    status = await jsonFetch('https://open.tiktokapis.com/v2/post/publish/status/fetch/', { method: 'POST', headers, body: JSON.stringify({ publish_id: publishId }) });
    const s = status.data?.status;
    if (s && !['PROCESSING_UPLOAD', 'PROCESSING_DOWNLOAD', 'SENDING_TO_USER_INBOX'].includes(s)) break;
  }
  return { ok: true, platform: 'tiktok', status: 'SUBMITTED', publish_id: publishId, privacy_level: privacy, provider_status: status?.data?.status || null, content_id: manifest.content_id };
}

function publishYouTube(manifest, videoPath, outDir, dryRun) {
  const miss = missing(['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'YOUTUBE_REFRESH_TOKEN']);
  if (miss.length && !dryRun) return skipped('youtube-shorts', miss);
  const ytManifest = {
    video_path: videoPath,
    title: clean(`${manifest.title} #Shorts`, 100),
    description: (manifest.talking_points || []).join('\n'),
    affiliate_url: manifest.affiliate_url,
    disclosure: manifest.disclosure,
    tags: ['contractor', 'tools', 'Prestige', 'ContractorTestedPicks', 'Shorts'],
    category_id: '26',
    privacy_status: process.env.YOUTUBE_PRIVACY_STATUS || 'public',
    made_for_kids: false,
    notify_subscribers: false
  };
  const file = path.join(outDir, `${manifest.id}-youtube.json`);
  fs.writeFileSync(file, JSON.stringify(ytManifest, null, 2));
  const args = ['youtube-shorts-publisher.js', file];
  if (dryRun) args.push('--dry-run');
  const r = spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8', env: process.env });
  if (r.status !== 0) fail(`YouTube publisher failed: ${r.stderr || r.stdout}`);
  let parsed = null;
  try { parsed = JSON.parse((r.stdout || '').trim().split('\n').slice(-1)[0]); } catch { parsed = null; }
  return { ok: true, platform: 'youtube-shorts', status: dryRun ? 'DRY_RUN' : 'SUBMITTED', output: r.stdout.trim(), parsed, content_id: manifest.content_id };
}

async function publishOne(platform, { date, slot, dryRun, outDir }) {
  const manifest = manifestFor({ platform, date, slot });
  if (dryRun) return { ok: true, platform, status: 'DRY_RUN', manifest };
  if (process.env.GITHUB_RUN_ATTEMPT && Number(process.env.GITHUB_RUN_ATTEMPT) > 1 && process.env.ALLOW_REPUBLISH !== 'true') {
    return skipped(platform, [], 'rerun_duplicate_guard');
  }
  if (platform === 'facebook') return publishFacebook(manifest);
  if (platform === 'instagram') return publishInstagram(manifest);
  const videoPath = renderVerticalVideo(manifest, outDir);
  if (platform === 'tiktok') return publishTikTok(manifest, videoPath);
  if (platform === 'youtube-shorts') return publishYouTube(manifest, videoPath, outDir, false);
  fail(`Unsupported platform: ${platform}`);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || process.env.SOCIAL_PUBLISH_DRY_RUN === 'true';
  const requested = (args.find(x => x.startsWith('--platform=')) || '').split('=')[1];
  const platforms = requested && requested !== 'all' ? [requested] : CHANNELS;
  for (const p of platforms) if (!CHANNELS.includes(p)) fail(`Unsupported platform: ${p}`);
  const dateArg = (args.find(x => x.startsWith('--date=')) || '').split('=')[1];
  const date = dateArg ? new Date(dateArg) : new Date();
  const slotArg = (args.find(x => x.startsWith('--slot=')) || '').split('=')[1];
  const slot = slotArg || process.env.PUBLISH_SLOT || String(new Date().getUTCHours());
  const outDir = path.join(ROOT, '.social-output');
  const validation = Feed.validate();
  if (!validation.ok) fail(`Feed validation failed: ${JSON.stringify(validation)}`);
  const results = [];
  for (const platform of platforms) {
    try { results.push(await publishOne(platform, { date, slot, dryRun, outDir })); }
    catch (err) { results.push({ ok: false, platform, status: 'ERROR', error: err.message || String(err) }); }
  }
  console.log(JSON.stringify({ ok: results.every(x => x.ok), dry_run: dryRun, date: date.toISOString(), slot, validation, results }, null, 2));
  if (results.some(x => !x.ok)) process.exitCode = 1;
}

if (require.main === module) main().catch(err => { console.error(err.stack || err.message || String(err)); process.exit(1); });

module.exports = { manifestFor, chooseItem, captionFor, renderVerticalVideo, publishFacebook, publishInstagram, publishTikTok, publishYouTube };