(function(){
  const products = window.CTP_PRODUCTS || [];
  const labels = {all:'All eBay Picks',tools:'Contractor Tools',welding:'Welding & Shop',garage:'Garage & Harley',cards:'Cards & Collectibles',deals:'eBay Deals'};

  function trackAffiliateClick(link){
    const card = link.closest('.product-card');
    const eventDetail = {
      event: 'affiliate_outbound_click',
      destination: link.href,
      product_name: card?.querySelector('h3')?.textContent?.trim() || link.textContent.trim(),
      category: card?.dataset.category || new URL(link.href).searchParams.get('customid') || 'unknown',
      page_path: location.pathname,
      timestamp: new Date().toISOString()
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventDetail);
    window.dispatchEvent(new CustomEvent('ctp:affiliate-click', {detail: eventDetail}));

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'affiliate_outbound_click', {
        link_url: eventDetail.destination,
        item_name: eventDetail.product_name,
        item_category: eventDetail.category,
        page_path: eventDetail.page_path
      });
    }

    try {
      const stored = JSON.parse(localStorage.getItem('ctp_affiliate_clicks') || '[]');
      stored.push(eventDetail);
      localStorage.setItem('ctp_affiliate_clicks', JSON.stringify(stored.slice(-100)));
    } catch (error) {
      console.debug('Affiliate click storage unavailable', error);
    }
  }

  function card(p){
    return `<article class="product-card" data-category="${p.category}"><div class="product-visual">${p.icon}</div><div class="product-body"><div class="badges"><span class="badge">eBay</span>${p.used?'<span class="badge badge-used">Personally used category</span>':'<span class="badge">Recommended category</span>'}</div><h3>${p.name}</h3><p>${p.reason}</p><div class="product-meta"><span>${p.status}</span></div><a class="btn btn-primary affiliate-link" href="${p.url}" target="_blank" rel="sponsored noopener">Shop on eBay</a></div></article>`;
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href*="ebay.com"], a[href*="ebay.io"]');
    if (!link) return;
    trackAffiliateClick(link);
  });

  const featured = document.getElementById('featured-products');
  if(featured) featured.innerHTML = products.slice(0,6).map(card).join('');
  const grid = document.getElementById('product-grid');
  const filters = document.getElementById('filters');
  if(grid && filters){
    const params = new URLSearchParams(location.search); let active = params.get('category') || 'all'; if(!labels[active]) active='all';
    filters.innerHTML = Object.entries(labels).map(([key,label])=>`<button class="filter-btn ${key===active?'active':''}" data-filter="${key}">${label}</button>`).join('');
    function render(cat){ const set = cat==='all'?products:products.filter(p=>p.category===cat); grid.innerHTML = set.length?set.map(card).join(''):'<div class="empty">No picks in this category yet.</div>'; }
    filters.addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;active=b.dataset.filter;filters.querySelectorAll('.filter-btn').forEach(x=>x.classList.toggle('active',x===b));render(active);history.replaceState({},'',active==='all'?'shop.html':`shop.html?category=${active}`);});
    render(active);
  }
})();

(function enhancePrestigeHomepageProducts(){
  const artwork = {
    '.buy-prestige-essentials': {
      src: 'https://cdn.shopify.com/s/files/1/0739/9066/8477/files/prestige-essentials-product.png?v=1787142829',
      alt: 'Prestige Essentials contractor Quick Start Mini Pack with Estimate, Change Order and Job Cost templates'
    },
    '.buy-prestige-choice': {
      src: 'https://cdn.shopify.com/s/files/1/0739/9066/8477/files/prestige-choice-product.png?v=1787142842',
      alt: 'Prestige Choice five core contractor Excel templates'
    },
    '.buy-prestige-pro': {
      src: 'https://cdn.shopify.com/s/files/1/0739/9066/8477/files/prestige-pro-product.png?v=1787142855',
      alt: 'Prestige Pro contractor job management and profit Excel system'
    },
    '.buy-prestige-premium': {
      src: 'https://cdn.shopify.com/s/files/1/0739/9066/8477/files/prestige-premium-product.png?v=1787142870',
      alt: 'Prestige Premium complete contractor business operating system'
    }
  };

  Object.entries(artwork).forEach(([selector, image]) => {
    document.querySelectorAll(selector).forEach(link => {
      const visual = link.closest('.product-card')?.querySelector('.product-visual');
      if (!visual || visual.querySelector('img')) return;
      visual.innerHTML = '';
      visual.style.padding = '0';
      visual.style.minHeight = '280px';
      visual.style.overflow = 'hidden';
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.loading = selector === '.buy-prestige-essentials' ? 'eager' : 'lazy';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.minHeight = '280px';
      img.style.objectFit = 'cover';
      img.style.objectPosition = 'center top';
      img.style.display = 'block';
      visual.appendChild(img);
    });
  });
})();

(function connectPrestigeStoreNetwork(){
  const destinations = [
    {
      label: 'Jobsite Gear',
      title: 'Prestige Contractor Best Picks',
      description: 'Rugged power, charging and field-ready products selected for contractor and jobsite use.',
      url: 'https://prestige-digitool.myshopify.com/collections/prestige-contractor-best-picks',
      cta: 'Shop Best Picks →',
      rel: 'noopener'
    },
    {
      label: 'Digital Contractor Tools',
      title: 'Prestige DigiTools',
      description: 'Estimating, job-cost, pricing and contractor operating tools built to protect profit and reduce paperwork.',
      url: 'https://prestige-digitool.myshopify.com/collections/prestige-contractor-digital-tools',
      cta: 'Browse DigiTools →',
      rel: 'noopener'
    },
    {
      label: 'Collectibles & Resale',
      title: 'JRep82 Random Treasures',
      description: 'Cards, collectibles, tools and resale inventory from Jason’s active eBay store.',
      url: 'https://www.ebay.com/str/prestigerandomtreasures?mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339172120&customid=ctp-network-store&mkevt=1&toolid=10001',
      cta: 'Shop eBay →',
      rel: 'sponsored noopener'
    },
    {
      label: 'Local Contracting',
      title: 'Prestige Remodeling',
      description: 'Decks, remodeling, exteriors, carpentry, welding and fabrication in Manitowoc and the Lakeshore.',
      url: 'https://PrestigeRemodelingWI.com/#estimate',
      cta: 'Request an Estimate →',
      rel: 'noopener'
    }
  ];

  if (document.querySelector('[data-prestige-store-network]')) return;
  const anchor = document.querySelector('.disclosure-strip') || document.querySelector('main .hero');
  if (!anchor || !anchor.parentNode) return;

  const section = document.createElement('section');
  section.className = 'section alt';
  section.setAttribute('data-prestige-store-network','true');
  section.innerHTML = `<div class="container"><div class="section-heading"><div><span class="eyebrow">Prestige network</span><h2>One network. Multiple ways to shop and work with Prestige.</h2><p>Contractor gear, digital business tools, eBay inventory and local remodeling are connected here so every traffic source can feed the rest of the Prestige system.</p></div></div><div class="product-grid">${destinations.map(d=>`<article class="product-card" data-network-destination="${d.title}"><div class="product-body"><div class="badges"><span class="badge">${d.label}</span></div><h3>${d.title}</h3><p>${d.description}</p><a class="btn btn-primary prestige-network-link" href="${d.url}" target="_blank" rel="${d.rel}">${d.cta}</a></div></article>`).join('')}</div></div>`;
  anchor.insertAdjacentElement('afterend', section);

  document.addEventListener('click', event => {
    const link = event.target.closest('.prestige-network-link');
    if (!link) return;
    const card = link.closest('[data-network-destination]');
    const detail = {
      event: 'store_network_click',
      destination_name: card?.dataset.networkDestination || link.textContent.trim(),
      destination_url: link.href,
      page_path: location.pathname,
      timestamp: new Date().toISOString()
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    if (typeof window.gtag === 'function') {
      window.gtag('event','store_network_click',{
        destination_name: detail.destination_name,
        link_url: detail.destination_url,
        page_path: detail.page_path
      });
    }
  });
})();

(function addPrestigeGrandOpeningPromotion(){
  const starts = new Date('2026-08-21T05:20:00-05:00');
  const ends = new Date('2026-09-05T00:00:00-05:00');
  const now = new Date();
  if (now < starts || now >= ends || document.querySelector('[data-grand-opening-promo]')) return;

  const anchor = document.querySelector('.disclosure-strip') || document.querySelector('main .hero');
  if (!anchor || !anchor.parentNode) return;

  const section = document.createElement('section');
  section.className = 'section';
  section.setAttribute('data-grand-opening-promo','true');
  section.style.padding = '24px 0 0';
  section.innerHTML = `
    <div class="container">
      <div class="capture-panel" style="background:linear-gradient(135deg,#0b1f3a 0%,#12345a 58%,#1f5aa6 100%);">
        <span class="eyebrow" style="margin-bottom:12px;">Grand opening • Ends Sept. 4</span>
        <h2>Prestige Contractor Best Picks Grand Opening Sale</h2>
        <p><strong style="color:#fff;">Save 10% with code GRANDOPEN10</strong> on eligible gear, or buy 2+ eligible items and use <strong style="color:#fff;">BUNDLE15</strong> for 15% off. The Recon 2000 power station is excluded.</p>
        <div class="hero-actions">
          <a class="btn btn-primary grand-opening-link" href="https://prestige-digitool.myshopify.com/collections/prestige-contractor-best-picks?utm_source=contractor-tested-picks&utm_medium=website&utm_campaign=grand-opening&utm_content=grand-opening-banner" target="_blank" rel="noopener">Shop the Grand Opening Sale →</a>
        </div>
      </div>
    </div>`;

  anchor.insertAdjacentElement('afterend', section);

  section.querySelector('.grand-opening-link')?.addEventListener('click', event => {
    const detail = {
      event: 'grand_opening_click',
      offer: 'GRANDOPEN10_OR_BUNDLE15',
      destination_url: event.currentTarget.href,
      page_path: location.pathname,
      timestamp: new Date().toISOString()
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    if (typeof window.gtag === 'function') {
      window.gtag('event','grand_opening_click',{
        promotion_name: 'Prestige Grand Opening',
        coupon: 'GRANDOPEN10_OR_BUNDLE15',
        link_url: detail.destination_url,
        page_path: detail.page_path
      });
    }
  });
})();