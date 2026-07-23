(function(){
  const products = window.CTP_PRODUCTS || [];
  const labels = {all:'All eBay Picks',tools:'Contractor Tools',welding:'Welding & Shop',garage:'Garage & Harley',cards:'Cards & Collectibles',deals:'eBay Deals'};
  function card(p){
    return `<article class="product-card" data-category="${p.category}"><div class="product-visual">${p.icon}</div><div class="product-body"><div class="badges"><span class="badge">eBay</span>${p.used?'<span class="badge badge-used">Personally used category</span>':'<span class="badge">Recommended category</span>'}</div><h3>${p.name}</h3><p>${p.reason}</p><div class="product-meta"><span>${p.status}</span></div><a class="btn btn-primary" href="${p.url}" target="_blank" rel="sponsored noopener">Shop on eBay</a></div></article>`;
  }
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