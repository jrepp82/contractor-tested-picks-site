#!/usr/bin/env node
/* Meta expansion adapters: Threads publishing plus Messenger/WhatsApp lead replies.
 * Fail closed when credentials or recipient context are missing so these channels
 * never block the core Facebook/Instagram/TikTok/YouTube publisher.
 */

const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v24.0';

function missing(names) { return names.filter(n => !process.env[n]); }
function skipped(platform, names = [], reason = 'missing_credentials') {
  return { ok: true, platform, status: 'SKIPPED', reason, missing: names };
}
async function jsonFetch(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  if (!res.ok || (json.error && json.error.code !== 'ok')) {
    throw new Error(`${options.method || 'GET'} ${url} failed (${res.status}): ${JSON.stringify(json)}`);
  }
  return json;
}

async function publishThreads({ text, link }) {
  const miss = missing(['THREADS_ACCESS_TOKEN']);
  if (miss.length) return skipped('threads', miss);
  const copy = [String(text || '').trim(), String(link || '').trim()].filter(Boolean).join('\n\n');
  if (!copy) return skipped('threads', [], 'empty_content');
  const create = new URLSearchParams({
    media_type: 'TEXT',
    text: copy,
    auto_publish_text: 'true',
    access_token: process.env.THREADS_ACCESS_TOKEN
  });
  const json = await jsonFetch('https://graph.threads.net/me/threads', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: create
  });
  return { ok: true, platform: 'threads', status: 'PUBLISHED', post_id: json.id || null };
}

async function sendMessengerReply({ recipientPsid, text }) {
  const tokenName = process.env.META_PAGE_ACCESS_TOKEN ? 'META_PAGE_ACCESS_TOKEN' : 'META_ACCESS_TOKEN';
  const miss = missing([tokenName]);
  if (miss.length) return skipped('messenger', miss);
  if (!recipientPsid) return skipped('messenger', [], 'missing_recipient_context');
  if (!text) return skipped('messenger', [], 'empty_message');
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/me/messages?access_token=${encodeURIComponent(process.env[tokenName])}`;
  const json = await jsonFetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ recipient: { id: recipientPsid }, messaging_type: 'RESPONSE', message: { text } })
  });
  return { ok: true, platform: 'messenger', status: 'SENT', message_id: json.message_id || null };
}

async function sendWhatsAppReply({ to, text }) {
  const miss = missing(['WHATSAPP_PHONE_NUMBER_ID', 'WHATSAPP_ACCESS_TOKEN']);
  if (miss.length) return skipped('whatsapp', miss);
  if (!to) return skipped('whatsapp', [], 'missing_recipient_context');
  if (!text) return skipped('whatsapp', [], 'empty_message');
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(process.env.WHATSAPP_PHONE_NUMBER_ID)}/messages`;
  const json = await jsonFetch(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body: text } })
  });
  return { ok: true, platform: 'whatsapp', status: 'SENT', message_id: json.messages?.[0]?.id || null };
}

module.exports = { publishThreads, sendMessengerReply, sendWhatsAppReply };
