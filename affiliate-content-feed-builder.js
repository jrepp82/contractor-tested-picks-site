#!/usr/bin/env node
/* Prestige affiliate content resolver.
 * Expands 60 compact content blueprints into platform-ready content with tracked links.
 */
const fs=require('fs');
const path=require('path');
const Links=require('./affiliate-link-builder.js');
const ROOT=__dirname;
const FEED=path.join(ROOT,'affiliate-content-feed.json');
const PRODUCTS=path.join(ROOT,'normalized-products.json');
const PLATFORMS=['facebook','instagram','youtube-shorts','tiktok'];
const GRAND_OPENING={name:'Prestige Grand Opening',code_single:'GRANDOPEN10',code_bundle:'BUNDLE15',bundle_min_qty:2,ends_on:'2026-09-04',excluded_product:'Recon 2000'};

function read(p){return JSON.parse(fs.readFileSync(p,'utf8'));}
function productIndex(){return new Map((read(PRODUCTS).products||[]).map(p=>[p.product_id,p]));}
function platformName(v){const p=String(v||'facebook').toLowerCase().replace(/_/g,'-');return p==='youtube-shorts'?p:p;}
function gateOpen(bp,p){if(bp.publishable) return p.status!=='DRAFT'&&p.availability!=='NOT_FOR_SALE';if(!bp.release_gate) return false;return String(process.env[bp.release_gate]||'').toLowerCase()==='true'&&p.status!=='DRAFT'&&p.availability!=='NOT_FOR_SALE';}
function promoActive(bp,when=new Date()){if(bp.promo!=='grand-opening') return false;return when<=new Date('2026-09-04T23:59:59-05:00');}
function desc(p){return p.description||p.product_name||'this product';}
function ebayDisclosure(){return 'Affiliate link: I may earn a commission from qualifying eBay purchases at no extra cost to you.';}
function storeDisclosure(p){return p.source_type==='prestige_digital'?'Prestige-owned digital product; no affiliate disclosure required.':'Prestige may earn margin on products sold through its Shopify storefront.';}

function template(bp,p,activePromo){
  const n=p.product_name;
  const d=desc(p);
  const common={suggested_platforms:PLATFORMS};
  if(bp.category==='contractor-tools'&&bp.angle==='buying-check') return {...common,
    hook:`Before you spend money on ${n.toLowerCase()}, check these three things.`,
    talking_points:[d,'Match the product to the work you actually do.','Compare condition, compatibility, accessories and return terms before buying.'],
    cta:activePromo?'Use GRANDOPEN10 for 10% off one eligible item, or BUNDLE15 for 15% off 2+.':(p.source_type==='ebay_epn_search'?'Compare current eBay listings through Contractor Tested Picks.':'See the current Prestige Contractor Best Picks listing.'),
    suggested_visual:'Jobsite or truck B-roll, product close-ups and a three-point on-screen checklist.'};
  if(bp.category==='contractor-tools'&&bp.angle==='jobsite-use') return {...common,
    hook:`Where does ${n.toLowerCase()} actually earn its keep on a job?`,
    talking_points:[d,'Show one realistic jobsite use instead of a generic feature list.','Say when you would skip it or choose a different setup.'],
    cta:activePromo?'Grand opening: GRANDOPEN10, or BUNDLE15 when buying 2+ eligible items.':'See the tracked current-listings link.',
    suggested_visual:'Real repair/remodel B-roll with text overlays naming the task.'};
  if(bp.category==='welding'&&bp.angle==='pro-check') return {...common,
    hook:`One thing I look at first with ${n.toLowerCase()}.`,
    talking_points:[d,'Separate fit-for-purpose and safety considerations from marketing features.','Use current listings as a comparison starting point, not a claim that every result is equal.'],
    cta:'Compare current eBay options from the tracked link.',
    suggested_visual:'Welding/shop B-roll, close-up details and a concise checklist.'};
  if(bp.category==='welding'&&bp.angle==='common-mistake') return {...common,
    hook:`A common mistake when buying ${n.toLowerCase()}: shopping specs before the actual job.`,
    talking_points:['Start with process, material, access, duty and safety requirements.',d,'Then compare price, seller and accessories after required capability is clear.'],
    cta:'Use Contractor Tested Picks to compare current listings.',
    suggested_visual:'Split-screen: wrong buying approach versus task-first checklist.'};
  if(bp.category==='garage-motorcycle'&&bp.angle==='garage-check') return {...common,
    hook:`If you work on your own truck or bike, here is what I would check before buying ${n.toLowerCase()}.`,
    talking_points:[d,'Check capacity, fitment or compatibility before focusing on price.','For marketplace buys, review condition, seller history and return terms.'],
    cta:'Compare current eBay listings from Contractor Tested Picks.',
    suggested_visual:'Garage/Harley B-roll plus product-category photos and checklist overlays.'};
  if(bp.category==='garage-motorcycle'&&bp.angle==='downtime') return {...common,
    hook:`Cheap garage gear gets expensive when it costs you an afternoon. Here is where ${n.toLowerCase()} can matter.`,
    talking_points:[d,'Frame the value around time, access and avoiding preventable downtime.','Do not imply a product fits a load or vehicle without checking its actual rating or fitment.'],
    cta:'See current options and compare before buying.',
    suggested_visual:'Truck or motorcycle maintenance B-roll with a time-saving angle.'};
  if(bp.category==='cards-collectibles'&&bp.angle==='protect-value') return {...common,
    hook:'Before you worry about what a card might grade, protect it properly first.',
    talking_points:[d,'Handle condition conservatively and never promise a grade.','Use inexpensive protection and inspection supplies to reduce preventable handling damage.'],
    cta:'See the card-supply shopping link from Contractor Tested Picks.',
    suggested_visual:'Card close-ups, protection/storage B-roll and no grade guarantee.'};
  if(bp.category==='cards-collectibles'&&bp.angle==='collector-workflow') return {...common,
    hook:`A simple collector workflow gets easier with the right ${n.toLowerCase()}.`,
    talking_points:[d,'Show the sequence: inspect, protect, label, store or prepare for submission.','Keep raw-card value and potential grading outcomes separate.'],
    cta:'See current supplies through the tracked Contractor Tested Picks link.',
    suggested_visual:'Top-down card desk workflow with inspect/protect/store labels.'};
  if(bp.category==='cards-collectibles'&&bp.angle==='common-mistake') return {...common,
    hook:`Collector mistake: spending big on cards and going cheap on ${n.toLowerCase()}.`,
    talking_points:['The goal is protection and organization, not expensive accessories for their own sake.',d,'Buy the protection level that matches the card and how you store or ship it.'],
    cta:'Compare current options before your next sorting or grading session.',
    suggested_visual:'Before/after organization visual plus card-protection closeups.'};
  if(bp.category==='prestige-digitools'&&bp.angle==='problem-solution') return {...common,
    hook:`Contractor paperwork problem: ${n} is built around a part that often gets skipped.`,
    talking_points:[d,'Show the workflow problem without claiming guaranteed savings or profit.','Use real sample data before making a sales push.'],
    cta:'Available only after digital fulfillment is verified.',
    suggested_visual:'Workbook screen recording with sample data and one workflow callout.'};
  if(bp.category==='prestige-digitools'&&bp.angle==='demo') return {...common,
    hook:`Here is what I wanted ${n} to do before I would put my name on it.`,
    talking_points:['Demonstrate one concrete feature with sample project data.','Show inputs and outputs instead of a static cover image.','Do not publish a purchase CTA until delivery is verified end to end.'],
    cta:'Prelaunch until digital fulfillment is verified.',
    suggested_visual:'Workbook demo with zoomed input/output area and PRELAUNCH label.'};
  throw new Error(`No template for ${bp.category}/${bp.angle}`);
}

function trackedLink(p,bp,platform,date){
  const context={platform:platformName(platform),contentType:'reel',campaign:bp.promo==='grand-opening'?'grand-opening':'evergreen',date,variant:bp.content_id};
  if(p.source_type==='ebay_epn_search'||p.source_type==='ebay_listing') return Links.linkForProduct(p,context);
  return Links.buildStoreTrackedLink({url:p.affiliate_url,product:p.product_name,...context});
}

function expand(bp,p,{platform='facebook',date=new Date()}={}){
  const open=gateOpen(bp,p);
  if(!open) return null;
  const activePromo=promoActive(bp,new Date(date));
  const copy=template(bp,p,activePromo);
  const tracked=trackedLink(p,bp,platform,date);
  return {content_id:bp.content_id,product_id:p.product_id,product_name:p.product_name,product_category:bp.category,angle:bp.angle,hook:copy.hook,talking_points:copy.talking_points,cta:copy.cta,destination:p.destination||p.retailer,affiliate_url:tracked.url,tracking_id:tracked.custom_id,disclosure:p.source_type==='ebay_epn_search'||p.source_type==='ebay_listing'?ebayDisclosure():storeDisclosure(p),suggested_visual:copy.suggested_visual,suggested_platforms:copy.suggested_platforms,evergreen:!activePromo,promo:activePromo?GRAND_OPENING:null,publishable:true,release_gate:bp.release_gate||null};
}

function build({platform='facebook',date=new Date()}={}){
  const f=read(FEED),idx=productIndex(),items=[],errors=[];
  for(const bp of f.items||[]){const p=idx.get(bp.product_id);if(!p){errors.push(`${bp.content_id}: missing ${bp.product_id}`);continue;}try{const x=expand(bp,p,{platform,date});if(x) items.push(x);}catch(e){errors.push(`${bp.content_id}: ${e.message}`);}}
  return {schema_version:f.schema_version,generated_at:new Date().toISOString(),platform:platformName(platform),total_available:items.length,validation_errors:errors,items};
}
function validate(){const f=read(FEED),idx=productIndex(),counts={};let errors=[];for(const bp of f.items||[]){counts[bp.category]=(counts[bp.category]||0)+1;if(!idx.has(bp.product_id))errors.push(`missing product ${bp.product_id}`);if(bp.category==='prestige-digitools'&&bp.publishable)errors.push(`${bp.content_id}: DigiTools must remain gated`);}const ok=f.items.length===60&&counts['contractor-tools']===20&&counts.welding===10&&counts['garage-motorcycle']===10&&counts['cards-collectibles']===10&&counts['prestige-digitools']===10&&errors.length===0;return{ok,counts,publishable_blueprints:f.items.filter(x=>x.publishable).length,gated_blueprints:f.items.filter(x=>!x.publishable).length,errors};}

if(require.main===module){const args=process.argv.slice(2),p=(args.find(x=>x.startsWith('--platform='))||'--platform=facebook').split('=')[1],d=(args.find(x=>x.startsWith('--date='))||'').split('=')[1];if(args.includes('--validate')){const r=validate();console.log(JSON.stringify(r,null,2));process.exit(r.ok?0:1);}console.log(JSON.stringify(build({platform:p,date:d?new Date(d):new Date()}),null,2));}
module.exports={build,validate,expand,template,gateOpen,promoActive};