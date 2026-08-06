# Current Execution Order

**Owner:** Forge / ChatGPT  
**Last updated:** 2026-08-06  
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
- **Status:** IN PROGRESS — STOREFRONT, LEAD CAPTURE, TRUST PAGES, BLOG, CONTENT HUB, EXPANDED CATALOG, SEO FILES AND AFFILIATE CLICK TRACKING NOW IN REPOSITORY
- **Verified progress:**
  - Existing storefront and eBay campaign `5339172120` verified.
  - `contact.html`, `contact.js`, `privacy.html`, and `vercel.json` added.
  - `blog.html` added with three complete revenue-linked articles: drill vs. impact driver, welding helmet buying checklist, and card-storage system.
  - `styles.css` expanded for responsive article pages.
  - First publish-ready seven-day Facebook/Instagram and YouTube Shorts content bank committed at `forge-deliverables/2026-08-05-seven-day-content-bank.md`.
  - `products.js` expanded from 12 to 26 tracked product groups across tools, welding, garage/Harley, diagnostics, cards and deals.
  - Added `robots.txt` and `sitemap.xml` for production search indexing.
  - Added outbound affiliate-click measurement in `app.js`; eBay clicks now push `affiliate_outbound_click` events to `window.dataLayer`, dispatch `ctp:affiliate-click`, and retain the last 100 browser-side events for verification.
  - Added progress records at `forge-deliverables/2026-08-06-catalog-and-seo-progress.md` and `forge-deliverables/2026-08-06-affiliate-click-tracking-progress.md`.
- **Latest verified commits:** `f68564411661ba03c64e94eb9ef10c9d8f3ae195`, `70227ebe7e153e561f3951aead5c04b6a86e0324`.
- **Deployment blocker:** Connected Vercel team contains zero projects; no linked production deployment exists to test.
- **Domain verification note:** `robots.txt` and `sitemap.xml` currently use `https://prestigeremodelingwi.com/`; confirm or revise this during Vercel custom-domain setup.
- **Next action:** Link/import `jrepp82/contractor-tested-picks-site` into Vercel, deploy `main`, test all routes and 26 product groups, verify outbound-click events, document the production URL, then connect the event stream to analytics and scheduling.

### 6. Automated money funnel
- **Status:** PARTIAL — FIRST CONTENT BATCH, 26-GROUP TRACKED AFFILIATE CATALOG AND BROWSER-SIDE OUTBOUND CLICK EVENTS COMPLETE
- **Verified progress:** Seven days of Facebook/Instagram source posts and seven YouTube Shorts scripts are stored in GitHub and tied to site categories and blog content. Product-group outbound links contain campaign and category-specific tracking values. Browser-side events now capture eBay outbound clicks for future analytics integration.
- **Current blocker:** Direct Meta/YouTube publishing access and a production website URL are not connected.
- **Next action:** After deployment, connect analytics, create platform-ready visual/video assets, schedule the batch in Meta Business Suite and YouTube Studio through available account access, and use verified production calls to action.

## Resume Instruction

Task 4 remains blocked by missing vehicle information. Continue task 5 from the Vercel import/deployment point; if the account remains unlinked, continue improving deployable site assets and money-funnel content without claiming production deployment. Dianne and Rusty Walesh and Patty are not active jobs unless Jason explicitly reopens them.
