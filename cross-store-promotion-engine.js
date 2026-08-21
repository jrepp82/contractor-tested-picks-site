/* Prestige Cross-Store Promotion Engine
 * Contextual promotion layer for Contractor Tested Picks.
 * Uses normalized-products.json and routes traffic among Shopify, eBay,
 * Prestige DigiTools and Prestige Remodeling without spamming every page.
 */
(function(){
  if (window.PrestigeCrossStorePromotionEngine) return;

  const CONFIG = {
    sale: {
      startsAt: '2026-08-21T05:20:00-05:00',
      endsAt: '2026-09-05T00:00:00-05:00',
      title: 'Grand Opening Sale',
      url: 'https://prestige-digitool.myshopify.com/collections/grand-opening-sale?utm_source=contractor-tested-picks&utm_medium=website&utm_campaign=grand-opening&utm_content=contextual-promo',
      copy: 'Save 10% with GRANDOPEN10, or 15% on 2+ eligible items with BUNDLE15.'
    },
    digital: {
      title: 'Prestige DigiTools',
      url: 'https://prestige-digitool.myshopify.com/collections/prestige-contractor-digital-tools?utm_source=contractor-tested-picks&utm_medium=website&utm_campaign=cross-store&utm_content=digital-tools',
      copy: 'Contractor estimating, job-cost, pricing and operating tools.'
    },
    ebayStore: {
      title: 'JRep82 Random Treasures',
      url: 'https://www.ebay.com/str/prestigerandomtreasures?mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339172120&customid=ctp-cross-store-ebay&mkevt=1&toolid=10001',
      copy: 'Cards, collectibles, tools and resale inventory on eBay.'
    },
    remodeling: {
      title: 'Prestige Remodeling',
      url: 'https://PrestigeRemodelingWI.com/#estimate?utm_source=contractor-tested-picks&utm_medium=website&utm_campaign=cross-store&utm_content=remodeling',
      copy: 'Decks, exteriors, remodeling, carpentry, welding and fabrication.'
    }
  };

  function isSaleLive(){
    const now = new Date();
    return now >= new Date(CONFIG.sale.startsAt) && now < new Date(CONFIG.sale.endsAt);
  }

  function pageContext(){
    const path = location.pathname.toLowerCase();
    const params = new URLSearchParams(location.search);
    const category = (params.get('category') || '').toLowerCase();
    if (path.includes('digital-products')) return {type:'digital', category:'digital-tools'};
    if (path.includes('shop')) return {type:'shop', category: category || 'all'};
    if (path.includes('guides')) return {type:'guides', category:'all'};
    if (path.includes('contact')) return {type:'contact', category:'services'};
    return {type:'home', category:'all'};
  }

  function track(link, destination, placement){
    const detail = {
      event: 'cross_store_promo_click',
      destination,
      placement,
      destination_url: link.href,
      page_path: location.pathname,
      timestamp: new Date().toISOString()
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    if (typeof window.gtag === 'function') {
      window.gtag('event','cross_store_promo_click',{
        destination_name: destination,
        placement,
        link_url: link.href,
        page_path: location.pathname
      });
    }
  }

  function card(item, label){
    return `<article class="product-card" data-cross-store="${item.title}"><div class="product-body"><div class="badges"><span class="badge">${label}</span></div><h3>${item.title}</h3><p>${item.copy}</p><a class="btn btn-primary cross-store-promo-link" href="${item.url}" target="_blank" rel="${item.url.includes('ebay.com')?'sponsored noopener':'noopener'}">Explore →</a></div></article>`;
  }

  function pickDestinations(context){
    const picks = [];
    if (isSaleLive()) picks.push([CONFIG.sale, 'Limited-time sale']);

    if (context.type === 'digital') {
      picks.push([CONFIG.remodeling, 'Local services']);
      picks.push([CONFIG.ebayStore, 'Resale & collectibles']);
    } else if (context.type === 'shop') {
      picks.push([CONFIG.digital, 'Digital contractor tools']);
      picks.push([CONFIG.remodeling, 'Local services']);
    } else if (context.type === 'contact') {
      picks.push([CONFIG.digital, 'Contractor tools']);
      picks.push([CONFIG.sale, 'Shop gear']);
    } else {
      picks.push([CONFIG.digital, 'Digital contractor tools']);
      picks.push([CONFIG.ebayStore, 'eBay inventory']);
      picks.push([CONFIG.remodeling, 'Local services']);
    }

    const seen = new Set();
    return picks.filter(([item]) => {
      if (!item || seen.has(item.title)) return false;
      seen.add(item.title);
      return true;
    }).slice(0,3);
  }

  function preferredProductCategories(context){
    if (['tools','welding','garage','cards','deals'].includes(context.category)) return [context.category];
    if (context.type === 'digital') return ['digital-tools'];
    return ['jobsite-power','charging-accessories','tools'];
  }

  function productCard(product){
    const price = Number.isFinite(Number(product.current_price)) ? `$${Number(product.current_price).toFixed(2)}` : product.availability === 'DYNAMIC_SEARCH' ? 'Live eBay search' : '';
    const image = product.image ? `<img src="${product.image}" alt="${product.product_name}" loading="lazy" style="width:100%;height:190px;object-fit:cover;display:block;">` : '🛠️';
    return `<article class="product-card" data-cross-product="${product.product_id}"><div class="product-visual" style="padding:0;overflow:hidden;">${image}</div><div class="product-body"><div class="badges"><span class="badge">${product.retailer || product.destination}</span></div><h3>${product.product_name}</h3><p>${product.description || ''}</p><div class="product-meta"><span>${price}</span></div><a class="btn btn-primary cross-product-link" href="${product.affiliate_url}" target="_blank" rel="${product.retailer==='eBay'?'sponsored noopener':'noopener'}">View Pick →</a></div></article>`;
  }

  async function loadProducts(){
    try {
      const response = await fetch('normalized-products.json', {cache:'no-store'});
      if (!response.ok) return [];
      const feed = await response.json();
      return Array.isArray(feed.products) ? feed.products.filter(p => p.status === 'ACTIVE' && p.availability !== 'NOT_FOR_SALE' && p.affiliate_url) : [];
    } catch {
      return [];
    }
  }

  async function render(){
    if (document.querySelector('[data-cross-store-engine]')) return;
    const context = pageContext();
    const destinationPicks = pickDestinations(context);
    const products = await loadProducts();
    const preferred = preferredProductCategories(context);
    const productPicks = products.filter(p => preferred.includes(p.category)).slice(0,3);

    const anchor = document.querySelector('main .section:last-of-type') || document.querySelector('main');
    if (!anchor || !anchor.parentNode) return;

    const section = document.createElement('section');
    section.className = 'section alt';
    section.setAttribute('data-cross-store-engine','true');
    section.innerHTML = `<div class="container"><div class="section-heading"><div><span class="eyebrow">Across the Prestige network</span><h2>Keep shopping without hitting a dead end.</h2><p>Relevant gear, digital tools, resale inventory and local services are connected so each page can send you to the next useful place.</p></div></div>${productPicks.length?`<div class="product-grid" style="margin-bottom:18px;">${productPicks.map(productCard).join('')}</div>`:''}<div class="product-grid">${destinationPicks.map(([item,label])=>card(item,label)).join('')}</div></div>`;
    anchor.insertAdjacentElement('afterend', section);

    section.addEventListener('click', event => {
      const link = event.target.closest('.cross-store-promo-link, .cross-product-link');
      if (!link) return;
      const destination = link.closest('[data-cross-store]')?.dataset.crossStore || link.closest('[data-cross-product]')?.dataset.crossProduct || 'unknown';
      track(link, destination, 'contextual-cross-store');
    });
  }

  window.PrestigeCrossStorePromotionEngine = {render, pageContext, isSaleLive, CONFIG};
  render();
})();