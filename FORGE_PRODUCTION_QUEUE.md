# Forge Production Queue

**Owner:** Forge / ChatGPT  
**Business:** Prestige / Prestige Exteriors / Prestige Select  
**Repository:** `jrepp82/contractor-tested-picks-site`  
**Last updated:** 2026-08-07

## Operating Rules

1. This is Forge's work queue, not Jason's personal checklist.
2. Resume the highest-priority unfinished Forge task each work session unless Jason explicitly redirects.
3. Do not mark work complete without a verifiable deliverable or confirmed external action.
4. Jason-only actions belong in reminders/calendar or a clearly labeled blocker note.
5. Update this file after substantive progress.

---

## P0 — Immediate Revenue / Deployment

### 1. Jeff Hastreiter estimate package
- **Status:** COMPLETE — CUSTOMER-READY FILES VERIFIED
- **Deliverable:** Final customer-ready estimate alternatives and internal comparison.
- **Verified totals:** Asphalt $62,850; Pro-Rib $71,350; standing seam $79,350.
- **Forge remaining:** None unless Jason requests revisions.
- **Jason-only action:** Review and send selected customer package; do not send internal comparison sheet.

### 2. Connie Hendries foundation estimate — Two Rivers
- **Status:** COMPLETE — CUSTOMER-READY DOCX/PDF GENERATED
- **Scope:** Approx. 40 ft foundation insulation-board work with concrete-look finished-panel/coating and conditional re-skim alternatives.
- **Verified pricing:** $4,250 finished gray panel; $4,450 rigid foam + reinforced gray coating; $2,950 conditional repair/re-skim.
- **Forge remaining:** None unless field measurements or material thickness require revision.
- **Jason-only action:** Confirm field dimensions/material choice and approve delivery.

### 3. Two job application packages
- **Status:** COMPLETE — TWO TAILORED PACKAGES VERIFIED
- **Package 1:** Ravelin Defense — Welding Engineer.
- **Package 2:** Kewaunee Fabrications / Oshkosh — Plant Manager R47782.
- **Forge remaining:** None unless new job postings require retargeting.
- **Jason-only action:** Submit/review application status.

### 4. Car limp-mode diagnosis
- **Status:** WAITING
- **Blocker:** Exact vehicle, dash messages, DTCs, symptoms, battery/charging readings, and recent repair history are still missing.
- **Resume point:** Begin battery/charging and code-based diagnosis immediately when data is supplied.

### 5. Prestige Select / Contractor Tested Picks website deployment
- **Status:** DEPLOYED TO VERCEL — PUBLIC ALIAS CONFIRMED; ROUTE/REVENUE VERIFICATION IN PROGRESS
- **Confirmed public alias from Vercel deployment screen:** `https://contractor-tested-picks-site.vercel.app/`.
- **Verified repository assets:** storefront, 26 tracked product groups, contact/privacy/blog/diagnostics pages, robots/sitemap, click tracking, GA4 loader hook, deployment guide, 7-day + 30-day content assets, digital product sales page.
- **Code-level verification this run:** `index.html`, `shop.html`, `blog.html`, `guides.html`, `products.js`, `app.js`, `analytics.js`, and `digital-products.html` were opened and reviewed. `products.js` contains 26 product groups and uses eBay campaign `5339172120`; `app.js` records outbound eBay events as `affiliate_outbound_click`.
- **Revenue-safety change:** `digital-products.html` was corrected so it does not imply independently verified automatic delivery. It now states that Stripe checkout is live while automated file delivery is still being finalized. Both checkout CTAs now emit `buy_now_click` events.
- **Verified deploy:** commit `f106f7682fcd91802753dc6511b4e0b114af787b` received GitHub status `Vercel: success`.
- **Deploy safety:** `.vercelignore` excludes internal operations files, deployment notes, deliverables, digital-product payload, secure-download payload, GitHub metadata, and non-Vercel build files from Vercel deploys.
- **Connector limitation:** Vercel `list_projects` still returns zero and `get_project` returns 404 for the connected team even though the project is visibly deployed and GitHub reports Vercel success. Treat this as connector visibility mismatch, not failed deployment.
- **Current verification limitation:** Forge's present external fetch environment cannot resolve the public alias, so HTTP route checks are not yet independently completed from this session.
- **Visual overhaul staged:** `VISUAL_OVERHAUL_REQUIREMENTS.md` now locks the Prestige navy/blue/light-blue/gray/white palette, real product imagery, Prestige logos, approved Jason portrait source, approved secondary caricature, and catchphrase integration. Latest visual requirement commit: `2338fce1c0ba1035a068a97940b248f45d946ccf`.
- **Preferred portrait source located:** the approved profile portrait embedded in `Prestige_Approved_Full_Site_v29_READY.html` under `.about-photo` is the primary personal image for the later hero/About/trust redesign.
- **Resume point:** verify `/`, `/shop.html`, `/blog.html`, `/contact.html`, `/privacy.html`, `/diagnostics.html`, `/digital-products.html` from a reachable production-check path; verify one eBay outbound click and campaign tracking; then continue fulfillment verification. Visual redesign remains second, before major promotion.

### 6. Contractor Business Operating System — Starter V1
- **Status:** CHECKOUT ACTIVE — FULFILLMENT VERIFICATION REMAINS
- **Offer:** launch $19; regular $29.
- **Stripe verification:** connected live Stripe account has active Payment Link `plink_1U1tzUJkrg28KsFADemfO0bk` for `Contractor Business Operating System — Starter V1` at $19.00 one-time.
- **Website:** sales page is wired to the verified live Stripe URL and now truthfully discloses the current fulfillment state.
- **Product payload:** encrypted parts 1–3 are committed under `secure-download/` and excluded from Vercel deployment by `.vercelignore`.
- **Critical remaining check:** no actual automated post-payment file-delivery mechanism has yet been independently verified.
- **Resume point:** verify end-to-end post-payment fulfillment before public promotion; do not claim automatic delivery without a successful controlled test.

### 7. Analytics / affiliate event verification
- **Status:** PARTIAL
- **Verified code:** browser affiliate-click event + local diagnostics storage + optional GA4 bridge exist; both Starter V1 purchase CTAs now emit `buy_now_click` events.
- **GA4 state:** no verified Measurement ID is stored in the repository configuration.
- **Blocker:** real GA4 Measurement ID is required for complete GA4 production verification.
- **Resume point:** add verified `G-...` ID to `analytics-config.js`, redeploy, perform controlled affiliate and checkout clicks, confirm events in GA4 Realtime/DebugView.

### 8. Domain launch decision
- **Status:** WAITING FOR JASON DECISION
- **Current repository canonical references:** `prestigeremodelingwi.com` appears in robots/sitemap and must be reconciled with the live Vercel deployment before final SEO launch.
- **Jason decision required:** use temporary Vercel URL / reclaim current domain / use a different domain.
- **Safety rule:** Do not alter DNS without Jason approval and without preserving existing MX/email records.

### 9. Automated money funnel
- **Status:** PARTIAL — DEPLOYMENT + CHECKOUT ACTIVE
- **Completed:** Vercel deployment succeeds from GitHub; public alias is known; live Stripe $19 checkout exists; 26 tracked product groups; affiliate event hooks; checkout event hooks; 7-day content bank; 30-day content calendar; three blog articles; CTAs and shop paths.
- **Remaining:** independently verify live routes/affiliate clicks, verify digital-product fulfillment, connect GA4 if available, complete the planned visual overhaul, then schedule first promotional batch after Jason approval.

---

## P1 — Business Operating System / Automation

### 10. Forge production tracking system
- **Status:** COMPLETE / MAINTENANCE
- **Deliverable:** `FORGE_PRODUCTION_QUEUE.md` + `CURRENT_EXECUTION_ORDER.md` as persistent source of truth.
- **Next action:** Maintain after each substantive work session.

### 11. Prestige operating dashboard / active lead protection
- **Status:** PARTIAL
- **Deliverable:** Persistent current dashboard covering leads, estimates, jobs, revenue, follow-ups, online sales, legal deadlines, vehicles, and property issues.
- **Next action:** Reconcile the latest operations dashboard against Gmail/calendar and remove stale client rows.

### 12. AI lead intake / follow-up automation
- **Status:** PARTIAL
- **Completed:** Contact page exists.
- **Remaining:** Implement reliable lead capture destination, acknowledgement flow, lead logging, and follow-up automation.
- **Dependency:** Verify live production contact flow first.

---

## Resume Rule

Task 4 is blocked by missing vehicle data. Task 5 is the highest-priority unblocked Forge task. Deployment and the public Vercel alias are confirmed. The immediate Forge work is route/revenue-link verification, followed by digital-product fulfillment verification. The full Prestige visual overhaul — including real product imagery, Prestige colors/logos, approved portrait, catchphrases, and stronger hero/card design — is locked for implementation after functionality is stable and before major promotion.