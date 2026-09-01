#!/usr/bin/env node
const Feed=require('./affiliate-content-feed-builder.js');
const Meta=require('./meta-expansion-publisher.js');

function clean(v,max=Infinity){return String(v||'').replace(/\s+/g,' ').trim().slice(0,max);}
function hashInt(value){let h=2166136261;for(const c of String(value)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return Math.abs(h>>>0);}
function dayKey(d=new Date()){return new Date(d).toISOString().slice(0,10);}
function choose(date=new Date(),slot='0'){
  const built=Feed.build({platform:'facebook',date});
  if(built.validation_errors?.length) throw new Error(built.validation_errors.join('; '));
  const items=(built.items||[]).filter(x=>x.publishable);
  if(!items.length) throw new Error('No publishable Threads content available');
  return items[hashInt(`${dayKey(date)}|${slot}|threads`)%items.length];
}
async function main(){
  const args=process.argv.slice(2);
  const slot=(args.find(x=>x.startsWith('--slot='))||'--slot=0').split('=')[1];
  const dry=args.includes('--dry-run');
  const item=choose(new Date(),slot);
  const text=[clean(item.hook),...(item.talking_points||[]).map(x=>`• ${clean(x)}`),clean(item.cta),clean(item.disclosure)].filter(Boolean).join('\n\n');
  if(dry){console.log(JSON.stringify({ok:true,platform:'threads',status:'DRY_RUN',content_id:item.content_id,text,link:item.affiliate_url},null,2));return;}
  const result=await Meta.publishThreads({text,link:item.affiliate_url});
  console.log(JSON.stringify({...result,content_id:item.content_id},null,2));
  if(result.status==='SKIPPED') process.exitCode=2;
}
main().catch(err=>{console.error(err.stack||String(err));process.exit(1);});
