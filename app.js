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