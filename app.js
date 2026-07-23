(() => {
  const PLACEHOLDER_PREFIX = "REPLACE_WITH_";
  const esc = (v) => String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const icon = (category) => ({"Contractor Tools":"▰","Welding & Shop Gear":"✦","Garage & Harley":"◆","Cards & Collectibles":"▣","Deals":"%"}[category] || "+");
  const affiliateUrl = (p) => {
    const url = AFFILIATE_LINKS[p.retailerKey];
    return url && !url.startsWith(PLACEHOLDER_PREFIX) ? url : "#affiliate-link-pending";
  };
  const card = (p) => `<article class="product-card"><div class="product-topline"><span>${esc(p.category)}</span><b>${esc(p.badge)}</b></div><div class="product-icon">${icon(p.category)}</div><h3>${esc(p.name)}</h3><p>${esc(p.note)}</p><div class="tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div><div class="product-footer"><span>Retailer: <strong>${esc(p.retailer)}</strong></span><a class="btn primary small affiliate-button" href="${affiliateUrl(p)}" data-retailer="${esc(p.retailer)}" target="_blank" rel="nofollow sponsored noopener">Check retailer</a></div></article>`;

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  const navButton = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  navButton?.addEventListener("click", () => { const open = navButton.getAttribute("aria-expanded") === "true"; navButton.setAttribute("aria-expanded", String(!open)); nav?.classList.toggle("open", !open); });

  const wirePlaceholders = (root=document) => root.querySelectorAll('.affiliate-button[href="#affiliate-link-pending"]').forEach(a => a.addEventListener("click", e => { e.preventDefault(); alert(`${a.dataset.retailer} affiliate link placeholder is ready. Replace it in products.js after approval.`); }));

  const featured = document.getElementById("featured-products");
  if (featured) { featured.innerHTML = PRODUCTS.filter(p=>p.featured).slice(0,6).map(card).join(""); wirePlaceholders(featured); }

  const grid = document.getElementById("product-grid");
  if (!grid) return;
  const search = document.getElementById("product-search");
  const filters = document.getElementById("category-filters");
  const clear = document.getElementById("clear-filters");
  const count = document.getElementById("result-count");
  const empty = document.getElementById("empty-state");
  const categories = ["All", ...new Set(PRODUCTS.map(p=>p.category))];
  const requested = new URLSearchParams(location.search).get("category");
  let active = categories.includes(requested) ? requested : "All";
  filters.innerHTML = categories.map(c=>`<button class="filter-chip${c===active?" active":""}" data-category="${esc(c)}" type="button">${esc(c)}</button>`).join("");

  const render = () => {
    const q = search.value.trim().toLowerCase();
    const rows = PRODUCTS.filter(p => (active === "All" || p.category === active) && (!q || [p.name,p.category,p.retailer,p.note,...p.tags].join(" ").toLowerCase().includes(q)));
    grid.innerHTML = rows.map(card).join("");
    count.textContent = `${rows.length} ${rows.length===1?"pick":"picks"}`;
    empty.hidden = rows.length !== 0;
    wirePlaceholders(grid);
  };
  filters.addEventListener("click", e => { const b = e.target.closest("[data-category]"); if (!b) return; active=b.dataset.category; filters.querySelectorAll(".filter-chip").forEach(x=>x.classList.toggle("active",x===b)); const u=new URL(location.href); active==="All"?u.searchParams.delete("category"):u.searchParams.set("category",active); history.replaceState({},"",u); render(); });
  search.addEventListener("input", render);
  clear.addEventListener("click", () => { search.value=""; active="All"; filters.querySelectorAll(".filter-chip").forEach(x=>x.classList.toggle("active",x.dataset.category==="All")); history.replaceState({},"",location.pathname); render(); });
  render();
})();
