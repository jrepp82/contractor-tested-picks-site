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
- **Status:** DEPLOYED TO VERCEL — LIVE URL/ROUTE VERIFICATION IN PROGRESS
- **Verified repository assets:** storefront, 26 tracked product groups, contact/privacy/blog/diagnostics pages, robots/sitemap, click tracking, GA4 loader hook, deployment guide, 7-day + 30-day content assets, digital product sales page.
- **Latest verified deploy:** commit `e6b6aa376a3838b189d8ed6d4bc1e3479b8bb81a` is current on `main`; GitHub combined status reports `Vercel: success` with a Vercel deployment target for that exact commit.
- **Deploy safety:** `.vercelignore` was added in that commit and excludes `CURRENT_EXECUTION_ORDER.md`, `FORGE_PRODUCTION_QUEUE.md`, `DEPLOYMENT_AND_CLICK_VERIFICATION.md`, `README.md`, `forge-deliverables/`, `digital-products/`, `secure-download/`, `.github/`, `Dockerfile`, `.dockerignore`, and `amplify.yml` from Vercel deploys.
- **Connector limitation:** Vercel connector still returns zero projects on list/get and 403 when listing deployments even though GitHub confirms successful Vercel deployment. Treat as connector visibility/permission mismatch, not deployment failure.
- **Resume point:** confirm exact public Vercel URL; test `/`, `/shop.html`, `/blog.html`, `/contact.html`, `/privacy.html`, `/diagnostics.html`, `/digital-products.html`; verify all 26 product groups and one controlled eBay outbound click with campaign tracking.

### 6. Contractor Business Operating System — Starter V1
- **Status:** CHECKOUT ACTIVE — FULFILLMENT VERIFICATION REMAINS
- **Offer:** launch $19; regular $29.
- **Stripe verification:** connected live Stripe account has active Payment Link `plink_1U1tzUJkrg28KsFADemfO0bk` for `Contractor Business Operating System — Starter V1`.
- **Price:** one-time $19.00 USD, quantity 1, live mode.
- **Payment URL:** `https://buy.stripe.com/fZu9AUcXz3NLga37zddZ600`.
- **Website:** `digital-products.html` is wired to that verified Stripe URL.
- **Product payload:** encrypted parts 1–3 are committed under `secure-download/` and excluded from Vercel deployment by `.vercelignore`.
- **Critical remaining check:** Stripe hosted confirmation says the download will be delivered to the checkout email, but no actual automated file-delivery mechanism has yet been independently verified.
- **Resume point:** verify end-to-end post-payment fulfillment before public promotion; do not claim automatic delivery without a successful controlled test.

### 7. Analytics / affiliate event verification
- **Status:** PARTIAL
- **Verified code:** Browser affiliate-click event + local diagnostics storage + optional GA4 bridge exist.
- **GA4 state:** No verified Measurement ID is stored in the repository configuration.
- **Blocker:** Exact public URL and real GA4 Measurement ID required for complete production verification.
- **Resume point:** add verified `G-...` ID to `analytics-config.js`, redeploy, perform controlled affiliate click, confirm `affiliate_outbound_click` in GA4 Realtime/DebugView.

### 8. Domain launch decision
- **Status:** WAITING FOR JASON DECISION
- **Current repository canonical references:** `prestigeremodelingwi.com` appears in robots/sitemap and must be reconciled with the live Vercel deployment before final SEO launch.
- **Jason decision required:** use temporary Vercel URL / reclaim current domain / use a different domain.
- **Safety rule:** Do not alter DNS without Jason approval and without preserving existing MX/email records.

### 9. Automated money funnel
- **Status:** PARTIAL — DEPLOYMENT + CHECKOUT NOW ACTIVE
- **Completed:** Vercel deployment succeeded; live Stripe $19 checkout exists; 26 tracked product groups; affiliate event hooks; 7-day content bank; 30-day content calendar; three blog articles; CTAs and shop paths.
- **Remaining:** confirm exact public URL, verify live routes/affiliate clicks, verify digital-product fulfillment, connect GA4 if available, then schedule first promotional batch after Jason approval.

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

Task 4 is blocked by missing vehicle data. Task 5 is the highest-priority unblocked Forge task. Vercel deployment is no longer blocked. Continue by confirming the exact public URL and performing live route/revenue-link verification, then verify digital-product fulfillment before promotion.