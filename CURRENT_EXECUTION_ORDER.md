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
- **Status:** LIVE — MULTI-PRODUCT CHECKOUT + FULFILLMENT + LEAD CAPTURE ACTIVE; OPTIMIZATION CONTINUES.
- **Public site:** `https://contractor-tested-picks-site.vercel.app`.
- **Hosting/deploy:** GitHub `main` auto-deploys to Vercel project `prj_xUofNzAF7d2ZO58EgH7VucYsdd1u`.
- **Live product ladder:** Prestige Essentials $6.99; Prestige Choice $16.99; Contractor Business OS Starter V1 $19 launch price; Prestige Pro $49.99; Prestige Premium v1.1 $99.99.
- **Checkout:** all five offers have live Stripe Payment Links published on `digital-products.html`.
- **Fulfillment:** Essentials redirects successful Stripe checkout to a protected Supabase delivery function. Choice, $19 Starter V1, Pro and Premium are mapped to private Google Drive ZIPs and handled by the active hourly `Digital Product Fulfillment` automation using completed Stripe Checkout Session IDs plus Gmail Sent deduplication.
- **Homepage:** now promotes the digital ladder starting at $6.99 while preserving eBay affiliate and remodeling-lead paths.
- **Lead capture:** `/contact.html` no longer depends on mailto; it directly submits the inquiry through FormSubmit AJAX with validation, spam honeypot, status feedback and mailto fallback.
- **Email capture:** `digital-products.html` feeds confirmed opt-ins into Klaviyo list `SJ8FBv` (`Contractor Tested Picks Subscribers`, double opt-in).
- **Klaviyo content:** three sequence assets exist: `CTP Welcome — Contractor Tested Picks`, `CTP Follow-Up 1 — Estimate Change Order Job Cost`, and `CTP Follow-Up 2 — When to Upgrade to Pro or Premium`.
- **Klaviyo blocker:** the connected Klaviyo API can read flows and create templates but does not expose flow creation; the sequence is staged but not attached to an automated Klaviyo flow yet.
- **Privacy:** public privacy notice updated August 19, 2026 for live contact forms, Klaviyo signup, Stripe checkout, automated fulfillment, Drive/Gmail, Supabase and affiliate tracking.
- **Resume point:** continue conversion/QA work, then promotion. Do not rebuild already-live systems.

### 2. Analytics / conversion measurement
- **Status:** PARTIAL — EVENT CODE EXISTS; GA4 DESTINATION BLOCKED.
- **Verified event hooks:** affiliate outbound clicks, digital-product buy clicks, lead submissions and email signup events exist in code.
- **Blocker:** `analytics-config.js` has no verified `G-...` Measurement ID. Searches of repo, Gmail and Drive did not recover one.
- **Resume point:** add only a verified GA4 Measurement ID, then confirm events in Realtime/DebugView. Never invent the ID.

### 3. Digital-product tax configuration
- **Status:** HOLD — DO NOT ENABLE STRIPE TAX YET.
- **Verified Stripe state:** Stripe Tax capability/settings are present, but the account has zero tax registrations recorded.
- **Search result:** no existing Wisconsin seller-permit / sales-tax registration record was recovered from connected Gmail or Drive.
- **Risk:** Wisconsin tax treatment of formula-driven Excel digital products should be confirmed and any required registration completed before enabling automatic collection.
- **Resume point:** verify Wisconsin registration/classification first; then configure Stripe Tax only if appropriate.

### 4. Product QA / fulfillment proof
- **Status:** BUILT AND WIRED; REAL PAID TRANSACTION PROOF REMAINS.
- **Verified private packages:** Choice, Starter V1, Pro and Premium ZIPs pass archive integrity and content checks; spreadsheet scans found no obvious formula-error strings.
- **Essentials package:** built and stored; protected delivery function deployed.
- **Evidence standard:** do not claim a fully completed customer journey test until at least one controlled successful paid transaction has been observed from checkout through delivery.

### 5. eBay / affiliate revenue
- **Status:** LIVE / TRACKED.
- **Campaign:** `5339172120` is used for Contractor Tested Picks eBay links.
- **Full-store CTA:** corrected to use EPN tracking instead of the old untracked shortlink.
- **Shop:** 26 tracked product groups remain live; homepage also contains tracked JRep82 Random Treasures inventory links.
- **Resume point:** monitor for expired personal inventory listings and replace as needed; keep search-based affiliate groups intact.

### 6. Domain decision
- **Status:** WAITING FOR JASON DECISION.
- **Current sales site:** temporary Vercel alias is functional.
- **Safety:** never change DNS without explicit approval and without preserving existing MX/email records.

### 7. Existing customer/estimate work
- **Jeff estimate package:** previously completed customer-ready package; revise only if Jason requests.
- **Connie Hendries foundation estimate:** previously completed customer-ready package; revise only if Jason requests.
- **Car limp-mode diagnosis:** blocked until vehicle data/DTCs are supplied.

## Resume Instruction
The current Forge revenue sequence is: **(1) finish live-funnel QA and conversion improvements; (2) activate/complete email nurture when Klaviyo flow creation is possible; (3) install a verified GA4 Measurement ID; (4) resolve Wisconsin digital-product sales-tax registration/classification before enabling Stripe Tax; (5) drive traffic and monitor real checkout/fulfillment results.** Do not regress to rebuilding the storefront, affiliate tracking, product ladder, or fulfillment mappings that are already live.