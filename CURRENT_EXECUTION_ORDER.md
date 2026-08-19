# Current Execution Order

**Owner:** Forge / ChatGPT  
**Last updated:** 2026-08-19  
**Source of truth:** `FORGE_PRODUCTION_QUEUE.md`

## Mandatory Startup Rule
At the beginning of every work session, open and read:
1. `CURRENT_EXECUTION_ORDER.md`
2. `FORGE_PRODUCTION_QUEUE.md`
Then resume the highest-priority unfinished Forge task unless Jason explicitly changes the order. Do not replace Forge's work with a Jason checklist. Update GitHub after substantive progress. Do not claim completion without a verifiable deliverable or confirmed external action.

## Active Order

### 1. Contractor Tested Picks / Prestige digital revenue funnel
- **Status:** LIVE — FOUR-TIER PRESTIGE PRODUCT LADDER + SEPARATE $19 BUNDLE + CHECKOUT + FULFILLMENT + LEAD CAPTURE ACTIVE.
- **Public site:** `https://contractor-tested-picks-site.vercel.app`.
- **Hosting/deploy:** GitHub `main` auto-deploys to Vercel project `prj_xUofNzAF7d2ZO58EgH7VucYsdd1u`.
- **Prestige four-tier ladder:** Essentials $6.99; Choice $16.99; Pro $49.99; Premium v1.1 $99.99.
- **Separate legacy offer:** Contractor Business Operating System — Starter V1 at $19 launch price is a separate 12-template bundle and is not part of the four-tier Prestige ladder.
- **Checkout:** all five offers have verified active live Stripe Payment Links.
- **Essentials:** new `Prestige_Essentials_v1_0_Digital_Download.zip` built August 19, 2026; workbook includes START HERE, Estimate, Change Order and Job Cost. Formula-error scan returned no common spreadsheet errors. ZIP is stored in Google Drive and mapped to its live $6.99 Stripe Payment Link.
- **Verified Drive fulfillment assets:** Choice `Prestige_Choice_v1_0_Digital_Download.zip` 14,032 bytes; Pro `Prestige_Pro_v1_0_Digital_Download.zip` 21,298 bytes; Premium `Prestige_Premium_v1_1_Digital_Download.zip` 45,505 bytes. Exact Drive IDs, filenames and byte sizes were read back successfully on August 19.
- **Package-content verification:** Choice README/manifest confirms the five promised core templates; Pro confirms Estimate, Invoice, Change Order, Job Cost, Payment Tracker, Job Progress, Materials & Expenses, Field Report, Client Sign-Off, Profit Dashboard and START HERE; Premium confirms the 17 advertised operating areas plus Quick Start PDF.
- **Fulfillment:** active hourly `Digital Product Fulfillment` condition-watch handles all five paid offers. It queries completed Stripe Checkout Sessions by Payment Link, uses Checkout Session ID as the deduplication key, checks Gmail Sent before sending, fetches the mapped verified Google Drive ZIP, emails the product to the purchaser, and notifies Jason only when a new order is fulfilled.
- **Homepage:** all four Prestige tiers are shown with direct verified Stripe Buy buttons plus `Compare All Products`. The free Profit Leak Checklist CTA remains above the paid funnel.
- **Digital product page:** four-tier ladder is production-confirmed with direct buy links, separate $19 legacy bundle, truthful automated-delivery copy, and buy-click analytics hooks.
- **Free lead magnet:** `profit-leak-checklist.html` is live and the `#profit-leak-checklist` signup section is restored on `digital-products.html` after a regression was caught and corrected.
- **Lead-magnet capture:** signup submits to Klaviyo list `SJ8FBv`; list is verified and double opt-in for marketing.
- **Remodeling lead capture:** `/contact.html` directly submits through FormSubmit AJAX with validation, honeypot, status feedback, analytics hook and mailto fallback. Production deployment is verified.
- **Resume point:** confirm real completed Checkout Session behavior / first actual fulfillment, then push traffic into the live funnel. Do not rebuild these systems.

### 2. Product QA / paid fulfillment proof
- **Status:** ASSETS + CHECKOUT + AUTOMATION VERIFIED; REAL PAID CUSTOMER-JOURNEY PROOF REMAINS.
- **Verified packages:** Essentials, Choice, Pro and Premium have confirmed archive contents; the separate $19 Starter V1 remains mapped to its existing verified Drive package.
- **Evidence standard:** do not claim a fully completed customer journey test until at least one successful completed paid Checkout Session is observed through automated email delivery.
- **Resume point:** inspect completed Stripe Checkout Sessions for all five Payment Links and confirm fulfillment automation handles any unfulfilled paid order without duplication.

### 3. Analytics / conversion measurement
- **Status:** PARTIAL — EVENT CODE EXISTS; GA4 DESTINATION BLOCKED.
- **Verified event hooks:** affiliate outbound clicks, homepage and digital-product buy clicks, lead submissions and email signup/lead-magnet events exist in code.
- **Blocker:** `analytics-config.js` has no verified `G-...` Measurement ID. Searches of available records did not recover one.
- **Resume point:** add only a verified GA4 Measurement ID, then confirm events in Realtime/DebugView. Never invent the ID.

### 4. Digital-product tax configuration
- **Status:** HOLD — DO NOT ENABLE STRIPE TAX YET.
- **Verified Stripe state:** Stripe Tax capability/settings are present, but the account has zero tax registrations recorded in the prior check.
- **Resume point:** verify Wisconsin registration/classification before enabling Stripe Tax if required.

### 5. eBay / affiliate revenue
- **Status:** LIVE / TRACKED.
- **Campaign:** `5339172120` is used for Contractor Tested Picks eBay links.
- **Full-store CTA:** uses EPN tracking.
- **Shop:** 26 tracked product groups remain live; individual JRep82 homepage inventory links should be monitored for expiration.

### 6. Traffic / distribution
- **Status:** FUNNEL READY FOR TRAFFIC.
- **Assets already present:** free Contractor Profit Leak Checklist, contractor SEO guides, product ladder, eBay affiliate categories, direct paid checkout, email capture and fulfillment automation.
- **Priority:** organic distribution should point visitors either to the free checklist, the $6.99 Essentials offer, a relevant SEO guide, or the tracked eBay category/store depending on audience intent.

### 7. Domain decision
- **Status:** WAITING FOR JASON DECISION.
- **Current sales site:** temporary Vercel alias is functional.
- **Safety:** never change DNS without explicit approval and without preserving existing MX/email records.

### 8. Existing customer/estimate work
- **Jeff estimate package:** previously completed customer-ready package; revise only if Jason requests.
- **Connie Hendries foundation estimate:** previously completed customer-ready package; revise only if Jason requests.
- **Car limp-mode diagnosis:** blocked until vehicle data/DTCs are supplied.

## Resume Instruction
The current Forge revenue sequence is: **(1) inspect current completed Stripe Checkout Sessions and confirm fulfillment behavior; (2) push organic traffic to the live free-checklist / $6.99 Essentials / four-tier product funnel; (3) measure signups, checkout activity and orders with available Stripe/Klaviyo evidence; (4) install a verified GA4 Measurement ID when available; (5) resolve Wisconsin digital-product tax registration/classification before enabling Stripe Tax.** Do not regress to rebuilding the storefront, four-tier product ladder, affiliate tracking, lead magnet, lead form, or fulfillment mappings that are already live.