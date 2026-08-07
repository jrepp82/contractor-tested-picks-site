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
- **Status:** IN PROGRESS — CODE READY, PRODUCTION DEPLOYMENT BLOCKED
- **Verified repository assets:** storefront, 26 tracked product groups, contact/privacy/blog/diagnostics pages, robots/sitemap, click tracking, GA4 loader hook, deployment guide, 7-day + 30-day content assets.
- **Vercel verification:** Connected Vercel team currently returns zero projects.
- **Current blocker:** `jrepp82/contractor-tested-picks-site` has not been imported as a Vercel project, so no production deployment can be verified through the connector.
- **Jason-only account action:** Vercel → Add New → Project → import `jrepp82/contractor-tested-picks-site` → root `./` → branch `main` → deploy.
- **Resume point after import:** Retrieve production URL, verify deployment SHA, test core routes, test all 26 product groups, verify `/diagnostics.html`, and record results.

### 6. Analytics / affiliate event verification
- **Status:** PARTIAL
- **Verified code:** Browser affiliate-click event + local diagnostics storage + optional GA4 bridge exist.
- **GA4 state:** No verified Measurement ID is stored in the repository configuration.
- **Blocker:** Production URL and real GA4 Measurement ID required.
- **Resume point:** Add verified `G-...` ID to `analytics-config.js`, redeploy, perform controlled affiliate click, confirm `affiliate_outbound_click` in GA4 Realtime/DebugView.

### 7. Domain launch decision
- **Status:** WAITING FOR JASON DECISION
- **Current repository canonical references:** `prestigeremodelingwi.com` appears in robots/sitemap and must be confirmed before final SEO launch.
- **External handoff note:** GenSpark reported the domain currently serves a GoDaddy Airo placeholder; Forge has not independently verified DNS state in this queue update.
- **Jason decision required:** Reclaim current domain / use Vercel default temporarily / use a different domain.
- **Safety rule:** Do not alter DNS without Jason approval and without preserving existing MX/email records.

### 8. Automated money funnel
- **Status:** PARTIAL — CONTENT + TRACKING ASSETS BUILT
- **Completed:** 26 tracked product groups, affiliate event hooks, 7-day content bank, 30-day content calendar, three blog articles, CTAs and shop paths.
- **Remaining:** Replace relative paths with verified production URLs, finish platform-specific creative assets, connect scheduling workflow, verify first live traffic/clicks.
- **Blockers:** Production URL; direct Meta/YouTube management access is not currently verified through Forge connectors.

---

## P1 — Business Operating System / Automation

### 9. Forge production tracking system
- **Status:** COMPLETE / MAINTENANCE
- **Deliverable:** `FORGE_PRODUCTION_QUEUE.md` + `CURRENT_EXECUTION_ORDER.md` as persistent source of truth.
- **Next action:** Maintain after each substantive work session.

### 10. Prestige operating dashboard / active lead protection
- **Status:** PARTIAL
- **Deliverable:** Persistent current dashboard covering leads, estimates, jobs, revenue, follow-ups, online sales, legal deadlines, vehicles, and property issues.
- **Next action:** Reconcile the latest operations dashboard against Gmail/calendar and remove stale client rows.

### 11. AI lead intake / follow-up automation
- **Status:** PARTIAL
- **Completed:** Contact page exists.
- **Remaining:** Implement reliable lead capture destination, acknowledgement flow, lead logging, and follow-up automation.
- **Dependency:** Production deployment first.

### 12. Construction Business Operating System digital product
- **Status:** PARTIAL
- **Remaining:** Inventory existing assets, complete minimum sellable package, product page, checkout, delivery workflow.
- **Dependency:** Revenue website/money funnel first.

---

## Resume Rule

Task 4 is blocked by missing vehicle data. Task 5 is the highest-priority unblocked Forge task. If Vercel remains unlinked, continue launch-prep work that does not require a production URL, but do not claim deployment, analytics completion, DNS completion, or social publishing without verification.