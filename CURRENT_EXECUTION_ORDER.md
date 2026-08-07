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
- **Status:** DEPLOYED TO VERCEL — PUBLIC URL/ROUTE VERIFICATION IN PROGRESS.
- **Verified repository state:** storefront, 26 eBay product groups, contact/privacy/blog/diagnostics pages, affiliate click tracking, GA4 loader hook, robots/sitemap, deployment guide, 7-day content bank, 30-day calendar, digital product sales path.
- **Latest verified deploy:** commit `f106f7682fcd91802753dc6511b4e0b114af787b` deployed successfully; GitHub reports `Vercel: success` for that exact commit.
- **Latest revenue-safety change:** `digital-products.html` no longer implies independently verified automatic delivery; it now truthfully states that checkout is live while automated file delivery is still being finalized. Both Stripe checkout CTAs now emit `buy_now_click` analytics events.
- **Deploy safety:** `.vercelignore` excludes internal operations files, deployment notes, deliverables, digital-product payload, secure-download payload, GitHub metadata, and non-Vercel build files from Vercel deploys.
- **Connector limitation:** Vercel connector still returns zero projects on list/get and 403 on deployment listing even though GitHub's Vercel status proves the deployment exists. Treat this as a connector visibility/permission mismatch, not a failed deployment.
- **Resume point:** retrieve/confirm exact public `.vercel.app` URL, then test `/`, `/shop.html`, `/blog.html`, `/contact.html`, `/privacy.html`, `/diagnostics.html`, and `/digital-products.html`; perform one controlled eBay click test and confirm campaign tracking.

### 6. Contractor Business Operating System — Starter V1
- **Status:** CHECKOUT ACTIVE — FULFILLMENT VERIFICATION REMAINS.
- **Offer:** launch $19; regular $29.
- **Stripe:** connected live Stripe account verified. Active live-mode Payment Link exists for `Contractor Business Operating System — Starter V1`, one-time price $19.00.
- **Website:** `digital-products.html` links to the verified live Stripe Payment Link and now accurately discloses that automated file delivery is still being finalized.
- **Payload:** encrypted product payload parts 1–3 are committed under `secure-download/` and excluded from Vercel deployment by `.vercelignore`.
- **Resume point:** verify post-payment fulfillment path before promotion; do not claim automatic delivery until a successful controlled fulfillment test exists.

### 7. Analytics / affiliate event verification
- **Status:** PARTIAL.
- **Verified code:** local affiliate-click tracking + diagnostics + optional GA4 bridge exist. Both Starter V1 checkout CTAs now emit `buy_now_click` events.
- **GA4 state:** no verified `G-...` Measurement ID is currently recorded in the repository config.
- **Resume point:** after public URL verification, add verified Measurement ID, redeploy, confirm one `affiliate_outbound_click` and one `buy_now_click` event in GA4 Realtime/DebugView.

### 8. Domain decision
- **Status:** POST-LAUNCH / WAITING FOR JASON DECISION.
- **Choices:** use temporary Vercel URL; reclaim `prestigeremodelingwi.com`; use another domain.
- **Safety:** Never change DNS without Jason approval. Preserve existing MX/email records.

### 9. Automated money funnel / social launch
- **Status:** PARTIAL — checkout is active and Vercel deployment succeeded; URL verification, fulfillment verification, analytics, and promotion remain.
- **Remaining:** confirm exact public URL, verify all revenue routes/clicks, verify digital-product fulfillment, add GA4 if available, then schedule Meta/YouTube pilot batch after Jason approval.

## Resume Instruction
The active revenue sequence is: (1) confirm the exact Vercel public URL and verify all critical routes; (2) verify eBay tracking on production; (3) verify the $19 Stripe checkout and actual customer fulfillment path end-to-end; (4) connect GA4 with a real Measurement ID if available; (5) schedule promotional content after Jason approval. Task 4 remains paused until vehicle data arrives.