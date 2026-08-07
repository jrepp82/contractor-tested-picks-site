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