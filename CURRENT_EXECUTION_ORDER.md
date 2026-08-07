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
- **Status:** IN PROGRESS — repository launch assets substantially built; production deployment not verified.
- **Verified repository state:** storefront, 26 product groups, contact/privacy/blog/diagnostics pages, affiliate click tracking, GA4 loader hook, robots/sitemap, deployment guide, 7-day content bank, 30-day calendar.
- **Vercel connector check:** team `team_0vu8BzrfPHTeUjdq7Z0Si0NF` currently returns zero projects.
- **Direct deployment attempt on 2026-08-07:** Forge invoked the connected Vercel deployment action. Runtime rejected the call because it required deployment `target`, `name`, and `files`, but the exposed connector schema does not allow Forge to supply those arguments. Treat this as a connector limitation, not proof that Jason failed to connect Vercel.
- **External handoff from GenSpark:** reports the expected Vercel hostname is not currently deployed and `prestigeremodelingwi.com` currently serves a GoDaddy Airo placeholder. These external findings are useful but are not marked Forge-verified until independently confirmed after deployment.
- **Required account action if connector remains unable to import:** Vercel → Add New → Project → import `jrepp82/contractor-tested-picks-site` → root `./` → production branch `main` → deploy.
- **Resume point after project exists:** retrieve actual production URL + deployment SHA; test `/`, `/shop.html`, `/blog.html`, `/contact.html`, `/privacy.html`, `/diagnostics.html`; test all 26 product groups; perform one controlled eBay click; verify diagnostics record; then configure GA4.

### 6. Analytics / affiliate event verification
- **Status:** PARTIAL.
- **Verified code:** local affiliate-click tracking + diagnostics + optional GA4 bridge exist.
- **GA4 state:** no verified `G-...` Measurement ID is currently recorded in the repository config.
- **Resume point:** after production deployment, add verified Measurement ID, redeploy, confirm one `affiliate_outbound_click` event in GA4 Realtime/DebugView.

### 7. Domain decision
- **Status:** WAITING FOR JASON DECISION.
- **Choices:** use Vercel default temporarily; reclaim `prestigeremodelingwi.com`; use another domain.
- **Safety:** Never change DNS without Jason approval. Preserve existing MX/email records. Use project-specific DNS values shown by Vercel rather than blindly applying generic records.

### 8. Automated money funnel / social launch
- **Status:** PARTIAL — content and tracking assets exist; live URLs and direct publishing access are not verified.
- **Remaining:** replace relative landing paths with verified production URLs, create remaining visual/video assets, schedule Meta/YouTube pilot batch after Jason approval, then confirm live click performance.

## Resume Instruction
Task 4 is blocked. Task 5 remains the active Forge assignment. If Vercel still has zero projects and direct deployment remains unavailable through the connector, continue all non-deployment launch prep, keep the queue current, and alert Jason only for the exact account action needed.