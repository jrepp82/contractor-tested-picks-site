# Current Execution Order

**Owner:** Forge / ChatGPT  
**Last updated:** 2026-08-07  
**Source of truth:** `FORGE_PRODUCTION_QUEUE.md`

## Mandatory Startup Rule

At the beginning of every work session, open and read:

1. `CURRENT_EXECUTION_ORDER.md`
2. `FORGE_PRODUCTION_QUEUE.md`

Then resume the highest-priority unfinished Forge task unless Jason explicitly changes the order.

Do not create a new Jason checklist in place of doing the work. Jason-only actions belong in reminders or calendar items. Update the repository after substantive progress. Do not mark anything complete without a verifiable deliverable or confirmed tool action.

## Active Order

### 1. Jeff Hastreiter estimate package
- **Status:** COMPLETE — CUSTOMER-READY FILES VERIFIED IN FILE LIBRARY
- **Verified deliverables:** Five customer proposals plus internal comparison sheet.
- **Complete-project totals:** Asphalt $62,850; Pro-Rib $71,350; standing seam $79,350.
- **Remaining Jason-only action:** Review the customer PDFs and send the selected package to Jeff. Do not send the internal comparison sheet.

### 2. Connie Hendries foundation estimate — Two Rivers
- **Status:** COMPLETE — CUSTOMER-READY DOCX AND PDF GENERATED AND VISUALLY VERIFIED
- **Verified deliverables:** `Connie_Hendries_Foundation_Estimate.docx`, `Connie_Hendries_Foundation_Estimate.pdf`, and GitHub completion record.
- **Customer options:** Finished gray panel $4,250; rigid foam plus reinforced gray coating $4,450; conditional repair/re-skim $2,950.
- **Remaining Jason-only action:** Confirm field measurements/material thickness and approve the option before delivery.

### 3. Two job application packages
- **Status:** COMPLETE — TWO TAILORED PACKAGES VERIFIED IN FILE LIBRARY
- **Package 1:** Ravelin Defense, Welding Engineer.
- **Package 2:** Kewaunee Fabrications / Oshkosh, Plant Manager R47782.
- **Remaining Jason-only action:** Submit or review submission status.

### 4. Car limp-mode diagnosis
- **Status:** WAITING FOR VEHICLE DATA
- **Blocker:** Exact vehicle, dash messages, diagnostic trouble codes, symptoms, battery/charging readings, and recent repair history are not available.
- **Resume point:** Begin battery/charging checks and code-based diagnosis immediately when data is supplied.

### 5. Prestige Select / Contractor Tested Picks website
- **Status:** IN PROGRESS — DEPLOYABLE SITE, CONTENT SYSTEM, CLICK TRACKING, OPERATOR DIAGNOSTICS, AND DEPLOYMENT GUIDE ARE IN REPOSITORY
- **Verified progress:**
  - Existing storefront and eBay campaign `5339172120` verified.
  - `contact.html`, `contact.js`, `privacy.html`, and `vercel.json` added.
  - `blog.html` added with three complete revenue-linked articles.
  - `styles.css` expanded for responsive article pages.
  - Seven-day Facebook/Instagram and YouTube Shorts content bank committed.
  - `products.js` expanded from 12 to 26 tracked product groups.
  - Added `robots.txt` and `sitemap.xml`.
  - Added browser-side outbound affiliate-click measurement in `app.js` using `window.dataLayer`, `ctp:affiliate-click`, and retained recent click records.
  - Added a 30-day publish-ready content calendar.
  - Added `DEPLOYMENT_AND_CLICK_VERIFICATION.md` with exact Vercel import, live-URL testing, custom-domain, browser event, GA4, Meta scheduling, and YouTube scheduling instructions.
  - Added `diagnostics.html` and `diagnostics.js` so Jason can verify stored affiliate-click events from a simple browser page without using DevTools. The diagnostics page is `noindex,nofollow` and excluded from the sitemap.
  - Updated deployment guide with the no-console diagnostics workflow.
  - Updated `README.md` to reflect the active eBay campaign, current assets, verification standard, and setup-guide link.
- **Latest verified commits:** `4457b0993db5722ac1a3da69a0a0ff24ac05b79f`, `887370ec67d56c803d64902f494961d80f704641`, `d49b4233011f630722fb46198dc8dd60663d3e22`.
- **Deployment blocker:** Vercel team `team_0vu8BzrfPHTeUjdq7Z0Si0NF` was checked again on 2026-08-07 and still contains zero projects. No production URL exists yet.
- **Exact Jason account action required:** In Vercel choose **Add New → Project**, import `jrepp82/contractor-tested-picks-site`, keep the root directory at `./`, use the `main` branch, and deploy. The repository guide records every following step.
- **Domain verification note:** `robots.txt` and `sitemap.xml` currently use `https://prestigeremodelingwi.com/`; confirm or revise during custom-domain setup.
- **Resume point:** Immediately after the Vercel import, retrieve the production URL, test all core routes and 26 product groups, open `/diagnostics.html`, run one real outbound eBay click test, verify analytics if installed, then replace relative calendar paths with full verified URLs.

### 6. Automated money funnel
- **Status:** PARTIAL — CONTENT BANKS, TRACKED CATALOG, CLICK EVENTS, OPERATOR VERIFICATION, AND IMPLEMENTATION INSTRUCTIONS COMPLETE
- **Verified progress:** Seven-day and 30-day content assets are stored in GitHub. Product-group links use campaign and category-specific tracking. Browser-side events capture outbound clicks. The diagnostics page now gives Jason a simple visual verification path. The repository contains exact instructions for producing live URLs, verifying click events, and scheduling Meta and YouTube content.
- **Current blocker:** Direct Meta/YouTube publishing access and a production website URL are not connected.
- **Next action:** After deployment, replace relative paths with verified production URLs, create remaining platform-ready visual/video assets, schedule the batch through available account access, and confirm first live link performance.

## Resume Instruction

Task 4 remains blocked by missing vehicle information. Continue task 5 from the Vercel import/deployment point. If Vercel remains unlinked, continue improving deployable assets without claiming production deployment. Remind Jason that Forge must continue from this recorded resume point after the account action. Dianne and Rusty Walesh and Patty are not active jobs unless Jason explicitly reopens them.
