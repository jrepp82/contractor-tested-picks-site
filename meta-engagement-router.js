#!/usr/bin/env node
/* Prestige Meta expansion router
 * Threads: organic publishing.
 * Messenger + WhatsApp: lead-response/follow-up channels.
 * Missing credentials fail closed per channel and never block other publishers.
 */

const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v26.0';

function clean(v, max = Infinity) {
  return String(v || '').replace(/\s+/g, ' ').trim().slice(0, max);
}
function missing(names) { return names.filter(n => !process.env[n]); }
function skipped(channel, names, reason='missing_credentials') {
  return { ok:true, channel, status:'SKIPPED', reason, missing:names };
}
async function jsonFetch(url, options={}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let json = {};
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw:text }; }
  if (!res.ok || (json.error && json.error.code !== 'ok')) {
    throw new Error(`${options.method || 'GET'} ${url} failed (${res.status}): ${JSON.stringify(json)}`);
  }
  return json;
}

async function publishThreads({ text }) {
  const miss = missing(['THREADS_USER_ID','THREADS_ACCESS_TOKEN']);
  if (miss.length) return skipped('threads', miss);
  const user = encodeURIComponent(process.env.THREADS_USER_ID);
  const token = process.env.THREADS_ACCESS_TOKEN;
  const create = new URLSearchParams({ media_type:'TEXT', text:clean(text,500), access_token:token });
  const container = await jsonFetch(`https://graph.threads.net/v1.0/${user}/threads`, {
    method:'POST', headers:{'content-type':'application/x-www-form-urlencoded'}, body:create
  });
  if (!container.id) throw new Error('Threads create did not return a container id');
  const publish = new URLSearchParams({ creation_id:container.id, access_token:token });
  const result = await jsonFetch(`https://graph.threads.net/v1.0/${user}/threads_publish`, {
    method:'POST', headers:{'content-type':'application/x-www-form-urlencoded'}, body:publish
  });
  return { ok:true, channel:'threads', status:'PUBLISHED', thread_id:result.id || container.id };
}

async function sendMessenger({ recipientId, text }) {
  const miss = missing(['META_PAGE_ID','META_PAGE_ACCESS_TOKEN']);
  if (miss.length) return skipped('messenger', miss);
  if (!recipientId) return skipped('messenger', [], 'missing_recipient');
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(process.env.META_PAGE_ID)}/messages?access_token=${encodeURIComponent(process.env.META_PAGE_ACCESS_TOKEN)}`;
  const payload = { recipient:{ id:String(recipientId) }, messaging_type:'RESPONSE', message:{ text:clean(text,2000) } };
  const result = await jsonFetch(url, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(payload) });
  return { ok:true, channel:'messenger', status:'SENT', message_id:result.message_id || null, recipient_id:result.recipient_id || recipientId };
}

async function sendWhatsApp({ to, text }) {
  const miss = missing(['WHATSAPP_PHONE_NUMBER_ID','WHATSAPP_ACCESS_TOKEN']);
  if (miss.length) return skipped('whatsapp', miss);
  if (!to) return skipped('whatsapp', [], 'missing_recipient');
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(process.env.WHATSAPP_PHONE_NUMBER_ID)}/messages`;
  const payload = { messaging_product:'whatsapp', recipient_type:'individual', to:String(to), type:'text', text:{ preview_url:false, body:clean(text,4096) } };
  const result = await jsonFetch(url, { method:'POST', headers:{ authorization:`Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`, 'content-type':'application/json' }, body:JSON.stringify(payload) });
  return { ok:true, channel:'whatsapp', status:'SENT', message_id:result.messages?.[0]?.id || null };
}

function leadReply({ name='', service='', city='' }={}) {
  const who = clean(name) ? ` ${clean(name,60)}` : '';
  const job = clean(service) ? ` about your ${clean(service,120)} project` : ' about your project';
  const place = clean(city) ? ` in ${clean(city,80)}` : '';
  return `Thanks${who} for reaching out to Prestige Remodeling${job}${place}. I received your message. Send the project address, a few photos if you have them, and the best time to reach you. We’ll use that to tighten up the next step for your estimate.`;
}

async function routeLead(event) {
  const reply = leadReply(event.lead || {});
  const results = [];
  if (event.messenger_recipient_id) {
    try { results.push(await sendMessenger({recipientId:event.messenger_recipient_id,text:reply})); }
    catch (e) { results.push({ok:false,channel:'messenger',status:'ERROR',error:e.message}); }
  }
  if (event.whatsapp_to) {
    try { results.push(await sendWhatsApp({to:event.whatsapp_to,text:reply})); }
    catch (e) { results.push({ok:false,channel:'whatsapp',status:'ERROR',error:e.message}); }
  }
  return { ok:results.every(r=>r.ok), results };
}

module.exports = { publishThreads, sendMessenger, sendWhatsApp, leadReply, routeLead };

if (require.main === module) {
  const mode = process.argv[2] || 'check';
  if (mode === 'check') {
    console.log(JSON.stringify({
      threads:{missing:missing(['THREADS_USER_ID','THREADS_ACCESS_TOKEN'])},
      messenger:{missing:missing(['META_PAGE_ID','META_PAGE_ACCESS_TOKEN'])},
      whatsapp:{missing:missing(['WHATSAPP_PHONE_NUMBER_ID','WHATSAPP_ACCESS_TOKEN'])}
    },null,2));
  }
}
