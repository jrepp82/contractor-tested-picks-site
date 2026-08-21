#!/usr/bin/env node
/*
 * Prestige YouTube Shorts Publisher
 *
 * Uploads rendered Shorts to the OAuth-authorized YouTube channel using the
 * official YouTube Data API. No credentials belong in this repository.
 *
 * Required environment variables:
 *   GOOGLE_CLIENT_ID
 *   GOOGLE_CLIENT_SECRET
 *   YOUTUBE_REFRESH_TOKEN
 *
 * Optional safety variable:
 *   YOUTUBE_EXPECTED_CHANNEL_ID
 *
 * Usage:
 *   node youtube-shorts-publisher.js manifest.json --dry-run
 *   node youtube-shorts-publisher.js manifest.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const API_BASE = 'https://www.googleapis.com/youtube/v3';
const UPLOAD_BASE = 'https://www.googleapis.com/upload/youtube/v3';

function fail(message) {
  throw new Error(message);
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) fail(`Missing required environment variable: ${name}`);
  return value;
}

function readManifest(filename) {
  const absolute = path.resolve(filename);
  if (!fs.existsSync(absolute)) fail(`Manifest not found: ${absolute}`);
  return JSON.parse(fs.readFileSync(absolute, 'utf8'));
}

function validateManifest(input) {
  const m = { ...input };
  if (!m.video_path) fail('manifest.video_path is required');
  m.video_path = path.resolve(m.video_path);
  if (!fs.existsSync(m.video_path)) fail(`Video file not found: ${m.video_path}`);

  if (!m.title || !String(m.title).trim()) fail('manifest.title is required');
  m.title = String(m.title).trim();
  if (m.title.length > 100) fail('YouTube title must be 100 characters or fewer');

  m.description = String(m.description || '').trim();
  m.affiliate_url = String(m.affiliate_url || '').trim();
  m.disclosure = String(m.disclosure || '').trim();
  if (m.affiliate_url && !/^https:\/\//i.test(m.affiliate_url)) fail('affiliate_url must use https://');

  const descriptionParts = [m.description];
  if (m.affiliate_url) descriptionParts.push(`Link: ${m.affiliate_url}`);
  if (m.disclosure) descriptionParts.push(m.disclosure);
  m.final_description = descriptionParts.filter(Boolean).join('\n\n');
  if (m.final_description.length > 5000) fail('Final YouTube description exceeds 5,000 characters');

  m.tags = Array.isArray(m.tags) ? m.tags.map(String).filter(Boolean) : [];
  m.category_id = String(m.category_id || '22');
  m.privacy_status = String(m.privacy_status || 'private').toLowerCase();
  if (!['private', 'unlisted', 'public'].includes(m.privacy_status)) fail('privacy_status must be private, unlisted, or public');

  m.made_for_kids = Boolean(m.made_for_kids);
  m.notify_subscribers = Boolean(m.notify_subscribers);
  if (m.publish_at) {
    const d = new Date(m.publish_at);
    if (Number.isNaN(d.getTime())) fail('publish_at is not a valid date/time');
    if (m.privacy_status !== 'private') fail('Scheduled publish_at requires privacy_status=private');
    m.publish_at = d.toISOString();
  }

  return m;
}

function detectMime(filename) {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.m4v': 'video/x-m4v',
    '.webm': 'video/webm',
    '.avi': 'video/x-msvideo',
    '.mpeg': 'video/mpeg',
    '.mpg': 'video/mpeg'
  };
  return map[ext] || 'application/octet-stream';
}

async function refreshAccessToken() {
  const clientId = requireEnv('GOOGLE_CLIENT_ID');
  const clientSecret = requireEnv('GOOGLE_CLIENT_SECRET');
  const refreshToken = requireEnv('YOUTUBE_REFRESH_TOKEN');

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body
  });
  const json = await res.json();
  if (!res.ok || !json.access_token) fail(`OAuth token refresh failed: ${JSON.stringify(json)}`);
  return json.access_token;
}

async function getAuthorizedChannel(accessToken) {
  const url = new URL(`${API_BASE}/channels`);
  url.searchParams.set('part', 'id,snippet');
  url.searchParams.set('mine', 'true');

  const res = await fetch(url, { headers: { authorization: `Bearer ${accessToken}` } });
  const json = await res.json();
  if (!res.ok) fail(`Unable to resolve authorized YouTube channel: ${JSON.stringify(json)}`);
  const channel = Array.isArray(json.items) ? json.items[0] : null;
  if (!channel || !channel.id) fail('OAuth account did not return an authorized YouTube channel');

  const expected = process.env.YOUTUBE_EXPECTED_CHANNEL_ID;
  if (expected && expected !== channel.id) {
    fail(`Authorized channel mismatch. Expected ${expected}, received ${channel.id}`);
  }

  return {
    id: channel.id,
    title: channel.snippet?.title || null,
    custom_url: channel.snippet?.customUrl || null,
    canonical_url: `https://www.youtube.com/channel/${channel.id}`
  };
}

function multipartBody(metadata, videoPath) {
  const boundary = `prestige_${crypto.randomBytes(18).toString('hex')}`;
  const mime = detectMime(videoPath);
  const video = fs.readFileSync(videoPath);
  const first = Buffer.from(
    `--${boundary}\r\n` +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: ${mime}\r\n\r\n`
  );
  const last = Buffer.from(`\r\n--${boundary}--\r\n`);
  return {
    boundary,
    body: Buffer.concat([first, video, last])
  };
}

async function uploadVideo(accessToken, manifest) {
  const metadata = {
    snippet: {
      title: manifest.title,
      description: manifest.final_description,
      tags: manifest.tags,
      categoryId: manifest.category_id
    },
    status: {
      privacyStatus: manifest.privacy_status,
      selfDeclaredMadeForKids: manifest.made_for_kids
    }
  };
  if (manifest.publish_at) metadata.status.publishAt = manifest.publish_at;

  const payload = multipartBody(metadata, manifest.video_path);
  const url = new URL(`${UPLOAD_BASE}/videos`);
  url.searchParams.set('uploadType', 'multipart');
  url.searchParams.set('part', 'snippet,status');
  url.searchParams.set('notifySubscribers', manifest.notify_subscribers ? 'true' : 'false');

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': `multipart/related; boundary=${payload.boundary}`,
      'content-length': String(payload.body.length)
    },
    body: payload.body
  });
  const json = await res.json();
  if (!res.ok || !json.id) fail(`YouTube upload failed: ${JSON.stringify(json)}`);
  return json;
}

async function main() {
  const args = process.argv.slice(2);
  const manifestFile = args.find(a => !a.startsWith('--'));
  if (!manifestFile) fail('Usage: node youtube-shorts-publisher.js manifest.json [--dry-run]');
  const dryRun = args.includes('--dry-run');
  const manifest = validateManifest(readManifest(manifestFile));

  if (dryRun) {
    console.log(JSON.stringify({
      ok: true,
      dry_run: true,
      title: manifest.title,
      final_description: manifest.final_description,
      video_path: manifest.video_path,
      privacy_status: manifest.privacy_status,
      publish_at: manifest.publish_at || null,
      tracking_link_present: Boolean(manifest.affiliate_url),
      disclosure_present: Boolean(manifest.disclosure)
    }, null, 2));
    return;
  }

  const accessToken = await refreshAccessToken();
  const channel = await getAuthorizedChannel(accessToken);
  console.log(`Authorized channel: ${channel.title || channel.id} (${channel.canonical_url})`);
  const uploaded = await uploadVideo(accessToken, manifest);
  console.log(JSON.stringify({
    ok: true,
    channel,
    video_id: uploaded.id,
    youtube_url: `https://www.youtube.com/watch?v=${uploaded.id}`,
    requested_privacy_status: manifest.privacy_status,
    note: 'YouTube may force uploads from an unverified API project to private until the project passes the required audit.'
  }, null, 2));
}

if (require.main === module) {
  main().catch(err => {
    console.error(err.stack || err.message || String(err));
    process.exit(1);
  });
}

module.exports = {
  validateManifest,
  detectMime,
  refreshAccessToken,
  getAuthorizedChannel,
  multipartBody,
  uploadVideo
};
