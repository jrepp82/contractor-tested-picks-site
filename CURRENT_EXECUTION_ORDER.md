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
- **Status:** LIVE — MULTI-PRODUCT CHECKOUT + FULFILLMENT + LEAD CAPTURE ACTIVE; TRAFFIC/DISTRIBUTION IS NEXT.
- **Public site:** `https://contractor-tested-picks-site.vercel.app`.
- **Hosting/deploy:** GitHub `main` auto-deploys to Vercel project `prj_xUofNzAF7d2ZO58EgH7VucYsdd1u`.
- **Live product ladder:** Prestige Essentials $6.99; Prestige Choice $16.99; Contractor Business OS Starter V1 $19 launch price; Prestige Pro $49.99; Prestige Premium v1.1 $99.99.
- **Checkout:** all five offers have live Stripe Payment Links published on `digital-products.html`.
- **Fulfillment:** Essentials redirects successful Stripe checkout to a protected Supabase delivery function. Choice, $19 Starter V1, Pro and Premium are mapped to private Google Drive ZIPs and handled by active hourly `Digital Product Fulfillment` automation using completed Stripe Checkout Session IDs plus Gmail Sent deduplication.
- **Homepage:** promotes the product ladder and now has a verified `Free Profit Leak Checklist` CTA that jumps directly to `digital-products.html#profit-leak-checklist`.
- **Free lead magnet:** `profit-leak-checklist.html` is live and verified 200. It contains a 12-point Contractor Profit Leak Checklist with print/save-PDF option and a UTM-tagged product-ladder CTA.
- **Lead-magnet capture:** the digital-product page form submits to Klaviyo list `SJ8FBv`, tags the lead-magnet source, and unlocks the checklist link immediately after Klaviyo accepts the submission. The list remains double opt-in for marketing.
- **Klaviyo content:** `CTP Welcome — Contractor Tested Picks` now includes the checklist and product-ladder links. Follow-up templates `CTP Follow-Up 1 — Estimate Change Order Job Cost` and `CTP Follow-Up 2 — When to Upgrade to Pro or Premium` also exist.
- **Klaviyo blocker:** connected API can read flows and create/update templates but exposes no flow-creation action; the 3-email sequence assets are staged but not attached to an automated Klaviyo flow.
- **Remodeling lead capture:** `/contact.html` directly submits through FormSubmit AJAX with validation, honeypot, status feedback and mailto fallback.
- **Privacy:** public privacy notice updated August 19, 2026 for live contact forms, Klaviyo signup, Stripe checkout, automated fulfillment, Drive/Gmail, Supabase and affiliate tracking.
- **Resume point:** distribute the now-live funnel organically, then measure real signups/clicks/orders. Do not rebuild existing systems.

### 2. Analytics / conversion measurement
- **Status:** PARTIAL — EVENT CODE EXISTS; GA4 DESTINATION BLOCKED.
- **Verified event hooks:** affiliate outbound clicks, digital-product buy clicks, lead submissions and email signup/lead-magnet events exist in code.
- **Blocker:** `analytics-config.js` has no verified `G-...` Measurement ID. Searches of repo, Gmail and Drive did not recover one.
- **Resume point:** add only a verified GA4 Measurement ID, then confirm events in Realtime/DebugView. Never invent the ID.

### 3. Digital-product tax configuration
- **Status:** HOLD — DO NOT ENABLE STRIPE TAX YET.
- **Verified Stripe state:** Stripe Tax capability/settings are present, but the account has zero tax registrations recorded.
- **Search result:** no existing Wisconsin seller-permit / sales-tax registration record was recovered from connected Gmail or Drive.
- **Resume point:** verify Wisconsin registration/classification first; then configure Stripe Tax only if appropriate.

### 4. Product QA / fulfillment proof
- **Status:** BUILT AND WIRED; REAL PAID TRANSACTION PROOF REMAINS.
- **Verified packages:** Choice, Starter V1, Pro and Premium ZIPs pass archive integrity/content checks; spreadsheet scans found no obvious formula-error strings. Essentials was built and QA-scanned separately.
- **Evidence standard:** do not claim a fully completed customer journey test until at least one controlled successful paid transaction has been observed from checkout through delivery.

### 5. eBay / affiliate revenue
- **Status:** LIVE / TRACKED.
- **Campaign:** `5339172120` is used for Contractor Tested Picks eBay links.
- **Full-store CTA:** uses EPN tracking.
- **Shop:** 26 tracked product groups remain live; individual JRep82 homepage inventory links should be monitored for expiration.

### 6. Domain decision
- **Status:** WAITING FOR JASON DECISION.
- **Current sales site:** temporary Vercel alias is functional.
- **Safety:** never change DNS without explicit approval and without preserving existing MX/email records.

### 7. Existing customer/estimate work
- **Jeff estimate package:** previously completed customer-ready package; revise only if Jason requests.
- **Connie Hendries foundation estimate:** previously completed customer-ready package; revise only if Jason requests.
- **Car limp-mode diagnosis:** blocked until vehicle data/DTCs are supplied.

## Resume Instruction
The current Forge revenue sequence is: **(1) distribute the live free-checklist/product funnel organically; (2) monitor real signup/click/order behavior; (3) activate the staged Klaviyo nurture sequence when flow creation becomes technically supported; (4) install a verified GA4 Measurement ID; (5) resolve Wisconsin digital-product sales-tax registration/classification before enabling Stripe Tax.** Do not regress to rebuilding the storefront, product ladder, affiliate tracking, lead magnet, or fulfillment mappings that are already live.