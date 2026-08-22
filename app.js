(function(){
  const products=window.CTP_PRODUCTS||[];
  const labels={all:'All Picks',tools:'Contractor Tools',welding:'Welding & Fabrication',garage:'Garage & Harley',cards:'Cards & Collectibles',deals:'Live Deals'};
  const categoryNames={tools:'Contractor Tools',welding:'Welding & Fabrication',garage:'Garage & Harley',cards:'Cards & Collectibles',deals:'Live Value Finds'};

  function trackAffiliateClick(link){
    const card=link.closest('.product-card');
    const eventDetail={event:'affiliate_outbound_click',destination:link.href,product_name:card?.querySelector('h3')?.textContent?.trim()||link.textContent.trim(),category:card?.dataset.category||new URL(link.href).searchParams.get('customid')||'unknown',page_path:location.pathname,timestamp:new Date().toISOString()};
    window.dataLayer=window.dataLayer||[];window.dataLayer.push(eventDetail);window.dispatchEvent(new CustomEvent('ctp:affiliate-click',{detail:eventDetail}));
    if(typeof window.gtag==='function')window.gtag('event','affiliate_outbound_click',{link_url:eventDetail.destination,item_name:eventDetail.product_name,item_category:eventDetail.category,page_path:eventDetail.page_path});
    try{const stored=JSON.parse(localStorage.getItem('ctp_affiliate_clicks')||'[]');stored.push(eventDetail);localStorage.setItem('ctp_affiliate_clicks',JSON.stringify(stored.slice(-100)));}catch(error){console.debug('Affiliate click storage unavailable',error);}
  }

  function card(p,index=0){
    const features=(p.features||[]).map(x=>`<span class="product-feature">${x}</span>`).join('');
    return `<article class="product-card" data-category="${p.category}">
      <div class="product-visual" data-theme="${p.category}">
        <div class="visual-top"><span class="visual-brand">Prestige Select</span><span class="visual-index">${String(index+1).padStart(2,'0')}</span></div>
        <div class="visual-title">${p.visualTitle||p.name}</div>
        <div class="visual-bottom"><span class="visual-meta">${p.visualMeta||categoryNames[p.category]}</span><span class="visual-live">Live eBay Market</span></div>
      </div>
      <div class="product-body">
        <div class="badges"><span class="badge">${categoryNames[p.category]||'Prestige Select'}</span>${p.used?'<span class="badge badge-used">Experience-backed category</span>':'<span class="badge">Curated market search</span>'}</div>
        <h3>${p.name}</h3>
        <p>${p.reason}</p>
        <div class="product-feature-list">${features}</div>
        <div class="product-meta"><span>${p.status}</span><span>Tracked EPN</span></div>
        <a class="btn btn-primary affiliate-link" href="${p.url}" target="_blank" rel="sponsored noopener">Browse Live Listings →</a>
      </div>
    </article>`;
  }

  document.addEventListener('click',event=>{const link=event.target.closest('a[href*="ebay.com"],a[href*="ebay.io"]');if(link)trackAffiliateClick(link);});

  const featured=document.getElementById('featured-products');if(featured)featured.innerHTML=products.slice(0,6).map((p,i)=>card(p,i)).join('');
  const grid=document.getElementById('product-grid');const filters=document.getElementById('filters');
  if(grid&&filters){
    const params=new URLSearchParams(location.search);let active=params.get('category')||'all';if(!labels[active])active='all';
    filters.innerHTML=Object.entries(labels).map(([key,label])=>`<button class="filter-btn ${key===active?'active':''}" data-filter="${key}">${label}</button>`).join('');
    function render(cat){const set=cat==='all'?products:products.filter(p=>p.category===cat);grid.innerHTML=set.length?set.map((p,i)=>card(p,i)).join(''):'<div class="empty">No active picks in this category right now.</div>';}
    filters.addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;active=b.dataset.filter;filters.querySelectorAll('.filter-btn').forEach(x=>x.classList.toggle('active',x===b));render(active);history.replaceState({},'',active==='all'?'shop.html':`shop.html?category=${active}`);});render(active);
  }
})();

(function enhancePrestigeHomepageProducts(){
  const artwork={
    '.buy-prestige-essentials':{src:'https://cdn.shopify.com/s/files/1/0739/9066/8477/files/prestige-essentials-product.png?v=1787142829',alt:'Prestige Essentials contractor Quick Start Mini Pack'},
    '.buy-prestige-choice':{src:'https://cdn.shopify.com/s/files/1/0739/9066/8477/files/prestige-choice-product.png?v=1787142842',alt:'Prestige Choice contractor operating templates'},
    '.buy-prestige-pro':{src:'https://cdn.shopify.com/s/files/1/0739/9066/8477/files/prestige-pro-product.png?v=1787142855',alt:'Prestige Pro contractor job management system'},
    '.buy-prestige-premium':{src:'https://cdn.shopify.com/s/files/1/0739/9066/8477/files/prestige-premium-product.png?v=1787142870',alt:'Prestige Premium contractor business operating system'}
  };
  Object.entries(artwork).forEach(([selector,image])=>document.querySelectorAll(selector).forEach(link=>{const visual=link.closest('.product-card')?.querySelector('.product-visual');if(!visual||visual.querySelector('img'))return;visual.innerHTML='';visual.style.padding='0';visual.style.minHeight='300px';const img=document.createElement('img');img.src=image.src;img.alt=image.alt;img.loading=selector==='.buy-prestige-essentials'?'eager':'lazy';img.style.cssText='width:100%;height:100%;min-height:300px;object-fit:cover;object-position:center top;display:block';visual.appendChild(img);}));
})();

(function connectPrestigeStoreNetwork(){
  const destinations=[
    {label:'Physical Gear',title:'Prestige Contractor Best Picks',description:'Contractor-focused jobsite gear and equipment through the connected Prestige commerce storefront.',url:'https://prestige-digitool.myshopify.com/collections/prestige-contractor-best-picks',cta:'Shop Physical Gear →',rel:'noopener'},
    {label:'Digital Systems',title:'Prestige DigiTools',description:'Estimating, pricing, job-cost and contractor operating tools built to protect margin and reduce paperwork.',url:'https://prestige-digitool.myshopify.com/collections/prestige-contractor-digital-tools',cta:'Browse DigiTools →',rel:'noopener'},
    {label:'Collectibles & Resale',title:'Prestige eBay Inventory',description:'Cards, collectibles, tools and resale inventory from the active Prestige eBay store.',url:'https://www.ebay.com/str/prestigerandomtreasures?mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339172120&customid=ctp-network-store&mkevt=1&toolid=10001',cta:'Shop eBay Inventory →',rel:'sponsored noopener'},
    {label:'Local Services',title:'Prestige Remodeling',description:'Remodeling, exterior work, carpentry, welding and fabrication serving Manitowoc and the surrounding lakeshore.',url:'https://PrestigeRemodelingWI.com/#estimate',cta:'Request an Estimate →',rel:'noopener'}
  ];
  if(document.querySelector('[data-prestige-store-network]'))return;const anchor=document.querySelector('.disclosure-strip')||document.querySelector('main .hero');if(!anchor||!anchor.parentNode)return;
  const section=document.createElement('section');section.className='section alt';section.setAttribute('data-prestige-store-network','true');section.innerHTML=`<div class="container"><div class="section-heading"><div><span class="eyebrow">Prestige Revenue Network</span><h2>One brand. Multiple ways to buy, build and work with Prestige.</h2><p>Every traffic source is connected into the same revenue system: physical gear, affiliate picks, digital contractor tools, recurring memberships, resale inventory and local contracting leads.</p></div></div><div class="funnel-grid">${destinations.map((d,i)=>`<a class="funnel-card prestige-network-link" data-network-destination="${d.title}" href="${d.url}" target="_blank" rel="${d.rel}"><span>0${i+1} • ${d.label}</span><h3>${d.title}</h3><p>${d.description}</p><strong>${d.cta}</strong></a>`).join('')}</div></div>`;anchor.insertAdjacentElement('afterend',section);
  document.addEventListener('click',event=>{const link=event.target.closest('.prestige-network-link');if(!link)return;const detail={event:'store_network_click',destination_name:link.dataset.networkDestination||link.textContent.trim(),destination_url:link.href,page_path:location.pathname,timestamp:new Date().toISOString()};window.dataLayer=window.dataLayer||[];window.dataLayer.push(detail);if(typeof window.gtag==='function')window.gtag('event','store_network_click',{destination_name:detail.destination_name,link_url:detail.destination_url,page_path:detail.page_path});});
})();

(function addPrestigeGrandOpeningPromotion(){
  const starts=new Date('2026-08-21T05:20:00-05:00'),ends=new Date('2026-09-05T00:00:00-05:00'),now=new Date();if(now<starts||now>=ends||document.querySelector('[data-grand-opening-promo]'))return;const anchor=document.querySelector('.disclosure-strip')||document.querySelector('main .hero');if(!anchor||!anchor.parentNode)return;
  const section=document.createElement('section');section.className='section';section.setAttribute('data-grand-opening-promo','true');section.style.padding='24px 0 0';section.innerHTML=`<div class="container"><div class="capture-panel"><span class="eyebrow" style="margin-bottom:12px">Grand opening • Ends Sept. 4</span><h2>Prestige Contractor Best Picks Grand Opening Sale</h2><p><strong style="color:#fff">Save 10% with code GRANDOPEN10</strong> on eligible gear, or buy 2+ eligible items and use <strong style="color:#fff">BUNDLE15</strong> for 15% off. The Recon 2000 power station is excluded.</p><div class="hero-actions"><a class="btn btn-primary grand-opening-link" href="https://prestige-digitool.myshopify.com/collections/prestige-contractor-best-picks?utm_source=prestige-select&utm_medium=website&utm_campaign=grand-opening&utm_content=grand-opening-banner" target="_blank" rel="noopener">Shop the Grand Opening Sale →</a></div></div></div>`;anchor.insertAdjacentElement('afterend',section);
})();

(function loadCrossStorePromotionEngine(){if(window.PrestigeCrossStorePromotionEngine||document.querySelector('script[data-cross-store-engine-loader]'))return;const script=document.createElement('script');script.src='cross-store-promotion-engine.js';script.defer=true;script.setAttribute('data-cross-store-engine-loader','true');document.head.appendChild(script);})();