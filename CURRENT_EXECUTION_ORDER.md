# Current Execution Order

**Owner:** Forge / ChatGPT  
**Last updated:** 2026-08-07  
**Source of truth:** `FORGE_PRODUCTION_QUEUE.md`

## Mandatory Startup Rule
At the beginning of every work session, open and read:
1. `CURRENT_EXECUTION_ORDER.md`
2. `FORGE_PRODUCTION_QUEUE.md`
Then resume the highest-priority unfinished Forge task unless Jason explicitly changes the order. Do not replace Forge's work with a Jason checklist. Update GitHub after substantive progress. Do not claim completion without a verifiable deliverable or confirmed external action.

## Active Order

### 1. Jeff Hastreiter estimate package
- **Status:** COMPLETE — customer-ready files verified.
- **Totals:** Asphalt $62,850; Pro-Rib $71,350; standing seam $79,350.
- **Jason-only action:** Review/send selected customer package. Internal comparison sheet is not customer-facing.

### 2. Connie Hendries foundation estimate — Two Rivers
- **Status:** COMPLETE — customer-ready DOCX/PDF generated.
- **Options:** $4,250 finished gray panel; $4,450 rigid foam + reinforced gray coating; $2,950 conditional repair/re-skim.
- **Jason-only action:** Confirm field dimensions/material choice and approve delivery.

### 3. Two job application packages
- **Status:** COMPLETE — tailored Ravelin Defense Welding Engineer and Kewaunee Fabrications/Oshkosh Plant Manager R47782 packages verified.
- **Jason-only action:** Submit/review application status.

### 4. Car limp-mode diagnosis
- **Status:** WAITING FOR VEHICLE DATA.
- **Blocker:** Exact vehicle, dash messages, DTCs, symptoms, battery/charging readings, recent repair history.
- **Resume point:** Battery/charging + code-based diagnosis immediately when supplied.

### 5. Prestige Select / Contractor Tested Picks website
- **Status:** IN PROGRESS — deployable site now includes paid digital-product sales path and GitHub Pages fallback workflow.
- **Verified repository state:** storefront, 26 eBay product groups, contact/privacy/blog/diagnostics pages, affiliate click tracking, GA4 loader hook, robots/sitemap, deployment guide, 7-day content bank, 30-day calendar.
- **New verified progress:** GitHub Pages fallback workflow added at commit `a9902739bf630816155993f805d49acbdd8afd97`.
- **Digital product sales page:** `digital-products.html` updated to Contractor Business Operating System — Starter V1, launch price $19, regular price $29, 12-template contents, scope disclosures, buy-now analytics hook. Commit `7cc7ea8737c6aaeabb3d0173f59dd4d56709087b`.
- **Homepage revenue path:** homepage now links to Digital Products, the $19 Starter V1 offer, and Request an Estimate. Commit `20009ba40dade4daf3d012512bfe658c5a336af7`.
- **Vercel state:** connected team still has zero projects. Direct connector deployment is currently limited by connector schema/runtime mismatch.
- **GitHub Pages state:** workflow exists but public Pages deployment is not yet independently verified. If repo Pages source is not enabled, owner action is Settings → Pages → Source: GitHub Actions, then run `Deploy static site to GitHub Pages` on `main`.
- **Resume point:** verify Pages deployment first; if live, test `/`, `/shop.html`, `/blog.html`, `/contact.html`, `/privacy.html`, `/diagnostics.html`, plus `digital-products.html`; then perform one controlled eBay click test.

### 6. Contractor Business Operating System — Starter V1
- **Status:** PRODUCT PACKAGE CREATED — CHECKOUT NOT ACTIVE.
- **Verified Forge copy:** `/mnt/data/Contractor_Business_OS_Starter_V1.zip` created 2026-08-07 with 12 editable XLSX templates plus START-HERE and LICENSE text files.
- **Templates:** estimate, job costing, project tracker, lead tracker, material tracker, scheduling, profit tracker, payment tracker, follow-up system, customer intake, change-order workflow, business operating checklist.
- **Offer:** launch $19; regular $29.
- **Checkout:** Stripe implementation path selected as hosted one-time Payment Link; real payment URL not yet available.
- **Resume point:** create/authorize real Stripe product + Payment Link, replace sales-page checkout placeholder, then establish customer delivery path for the ZIP.

### 7. Analytics / affiliate event verification
- **Status:** PARTIAL.
- **Verified code:** local affiliate-click tracking + diagnostics + optional GA4 bridge exist.
- **GA4 state:** no verified `G-...` Measurement ID is currently recorded in the repository config.
- **Resume point:** after production deployment, add verified Measurement ID, redeploy, confirm one `affiliate_outbound_click` event in GA4 Realtime/DebugView.

### 8. Domain decision
- **Status:** POST-LAUNCH / WAITING FOR JASON DECISION.
- **Choices:** use temporary GitHub Pages/Vercel URL; reclaim `prestigeremodelingwi.com`; use another domain.
- **Safety:** Never change DNS without Jason approval. Preserve existing MX/email records.

### 9. Automated money funnel / social launch
- **Status:** PARTIAL — first-week GenSpark assets and Forge content calendar exist; public site and checkout URL are the critical remaining rails.
- **Remaining:** replace landing placeholders with verified live URLs, connect real Buy Now URL, schedule Meta/YouTube pilot batch after Jason approval, then confirm live click performance.

## Resume Instruction
The active revenue sequence is: (1) get any public static deployment live, preferably GitHub Pages fallback if Vercel remains blocked; (2) create/authorize Stripe one-time Payment Link for the $19 Starter V1; (3) replace checkout placeholder; (4) verify affiliate + checkout links; (5) schedule promotional content. Task 4 remains paused until vehicle data arrives.