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
- **Vercel deployment evidence:** browser deployment screen confirms successful project deployment under `jreppen82-5979's projects`; GitHub combined status for latest commit `eafcffe6f119a2ed16879e54dd4288552d26dfb6` reports `Vercel: success`.
- **Connector limitation:** Vercel connector still returns zero projects on list/get and 403 on deployment listing, so the exact public alias and deployment metadata cannot yet be read through that connector.
- **Resume point:** retrieve/confirm exact public URL, then test `/`, `/shop.html`, `/blog.html`, `/contact.html`, `/privacy.html`, `/diagnostics.html`, and `/digital-products.html`; perform one controlled eBay click test and confirm campaign tracking.

### 6. Contractor Business Operating System — Starter V1
- **Status:** CHECKOUT ACTIVE — FULFILLMENT VERIFICATION REMAINS.
- **Offer:** launch $19; regular $29.
- **Stripe:** connected live Stripe account verified. Active live-mode Payment Link exists for `Contractor Business Operating System — Starter V1`, one-time price $19.00.
- **Website:** `digital-products.html` links to the verified live Stripe Payment Link.
- **Payload:** encrypted product payload parts 1–3 are committed under `secure-download/`.
- **Important:** Stripe hosted confirmation says delivery will be sent to the checkout email, but an actual automated file-delivery mechanism has not yet been independently verified.
- **Resume point:** verify post-payment fulfillment path before promotion; do not claim automatic delivery until a successful controlled fulfillment test exists.

### 7. Analytics / affiliate event verification
- **Status:** PARTIAL.
- **Verified code:** local affiliate-click tracking + diagnostics + optional GA4 bridge exist.
- **GA4 state:** no verified `G-...` Measurement ID is currently recorded in the repository config.
- **Resume point:** after public URL verification, add verified Measurement ID, redeploy, confirm one `affiliate_outbound_click` event in GA4 Realtime/DebugView.

### 8. Domain decision
- **Status:** POST-LAUNCH / WAITING FOR JASON DECISION.
- **Choices:** use temporary Vercel URL; reclaim `prestigeremodelingwi.com`; use another domain.
- **Safety:** Never change DNS without Jason approval. Preserve existing MX/email records.

### 9. Automated money funnel / social launch
- **Status:** PARTIAL — checkout is active and Vercel deployment succeeded; URL verification, fulfillment verification, analytics, and promotion remain.
- **Remaining:** confirm exact public URL, verify all revenue routes/clicks, verify digital-product fulfillment, add GA4 if available, then schedule Meta/YouTube pilot batch after Jason approval.

## Resume Instruction
The active revenue sequence is: (1) confirm the exact Vercel public URL and verify all critical routes; (2) verify eBay tracking on production; (3) verify the $19 Stripe checkout and actual customer fulfillment path end-to-end; (4) connect GA4 with a real Measurement ID if available; (5) schedule promotional content after Jason approval. Task 4 remains paused until vehicle data arrives.