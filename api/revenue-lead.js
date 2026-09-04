const TARGET='https://prestige-remodeling-a3-0s6imc.v2.appdeploy.ai/api/leads';
const SOURCES=new Set(['lead-broker','dispatch-request','lead-buyer','dispatch-provider']);
const clean=(v,n)=>typeof v==='string'?v.trim().slice(0,n):'';
const emailOk=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const phoneDigits=v=>String(v||'').replace(/\D/g,'');

export default async function handler(req,res){
  if(req.method!=='POST'){
    res.setHeader('Allow','POST');
    return res.status(405).json({ok:false,error:'method_not_allowed'});
  }
  const b=req.body&&typeof req.body==='object'?req.body:{};
  const source=clean(b.source,40);
  if(!SOURCES.has(source)) return res.status(400).json({ok:false,error:'invalid_source'});
  const name=clean(b.name,120), phone=clean(b.phone,40), email=clean(b.email,180);
  if(!name||phoneDigits(phone).length<7||!emailOk(email)) return res.status(400).json({ok:false,error:'Valid name, phone and email are required.'});
  if(clean(b.companyWebsite,200)) return res.status(200).json({ok:true,leadId:'received'});

  const marketingConsent=Boolean(b.marketingConsent);
  const smsConsent=Boolean(b.smsConsent);
  const routingConsent=Boolean(b.routingConsent);
  if((source==='lead-broker'||source==='dispatch-request')&&!routingConsent){
    return res.status(400).json({ok:false,error:'Routing consent is required before contact details can be shared with a selected service provider.'});
  }

  const fields={
    Service:clean(b.service,120),
    Location:clean(b.location,160),
    Urgency:clean(b.urgency,80),
    Budget:clean(b.budget,80),
    Company:clean(b.company,160),
    Coverage:clean(b.coverage,240),
    Notes:clean(b.details,3000),
    'Routing consent':routingConsent?'YES':'NO',
    'Marketing email consent':marketingConsent?'YES':'NO',
    'SMS consent':smsConsent?'YES':'NO',
    'Requested at':new Date().toISOString()
  };
  const details=Object.entries(fields).filter(([,v])=>v).map(([k,v])=>`${k}: ${v}`).join('\n');
  const projectType={
    'lead-broker':'Revenue Lead Broker — Qualified Service Request',
    'dispatch-request':'Emergency Dispatch Coordination Request',
    'lead-buyer':'Lead Buyer / Contractor Partner Application',
    'dispatch-provider':'Emergency Dispatch Provider Application'
  }[source];
  try{
    const r=await fetch(TARGET,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({
      name,phone,email,projectType,details,
      location:clean(b.location,160),
      budget:clean(b.budget,80),
      timeline:clean(b.urgency,160),
      contactMethod:smsConsent?'Text':'Email',
      leadSource:`Prestige Revenue Expansion — ${source}`,
      pageUrl:clean(b.pageUrl,500),
      referrer:clean(b.referrer,500),
      userAgent:clean(req.headers['user-agent']||'',500),
      clientReceivedAt:clean(b.clientReceivedAt,80),
      companyWebsite:''
    })});
    const text=await r.text(); let data={};
    try{data=JSON.parse(text)}catch{}
    if(!r.ok||!data.ok) return res.status(r.status||502).json({ok:false,error:data.error||'Prestige intake unavailable'});
    return res.status(200).json({ok:true,leadId:data.leadId,notificationStatus:data.notificationStatus||'accepted',receivedAt:data.receivedAt||new Date().toISOString()});
  }catch(e){
    console.error('revenue lead relay failed',e);
    return res.status(502).json({ok:false,error:'Revenue intake relay temporarily unavailable.'});
  }
}
