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
- **Fulfillment:** active hourly `Digital Product Fulfillment` condition-watch now handles BOTH Stripe and mapped Shopify digital orders. Stripe dedupes on Checkout Session ID; Shopify dedupes on Shopify order reference + SKU. Both paths verify the mapped Drive ZIP before Gmail delivery and notify Jason only when a new order is actually fulfilled.
- **Stripe order check:** all five Payment Links returned zero completed paid Checkout Sessions on August 19; no paid order was stuck waiting for delivery.
- **Homepage:** all four Prestige tiers are shown with direct verified Stripe Buy buttons plus `Compare All Products`. The free Profit Leak Checklist CTA remains above the paid funnel.
- **Digital product page:** four-tier ladder is production-confirmed with direct buy links, separate $19 legacy bundle, truthful automated-delivery copy, and buy-click analytics hooks.
- **Free lead magnet:** `profit-leak-checklist.html` is live; it now includes both a direct `Fix the basics — $6.99` Essentials CTA and a compare-all-products path.
- **Lead-magnet capture:** signup submits to Klaviyo list `SJ8FBv`; list is verified and double opt-in for marketing.
- **Klaviyo nurture:** three current nurture templates exist, but no Klaviyo flow is attached to list `SJ8FBv`. There were no confirmed marketing subscribers waiting for nurture at the August 19 check.
- **Remodeling lead capture:** `/contact.html` directly submits through FormSubmit AJAX with validation, honeypot, status feedback, analytics hook and mailto fallback. Production deployment is verified.
- **Distribution asset:** `LIVE_DISTRIBUTION_NOW.md` contains tracked launch links and ready copy for Facebook, personal Facebook, Nextdoor, Instagram, TikTok, Pinterest, YouTube and warm product follow-ups.
- **Resume point:** first actual paid-order fulfillment proof + traffic distribution. Do not rebuild these systems.

### 2. Shopify digital sales channel
- **Status:** FOUR PRODUCTS BUILT AS DRAFTS; DIGITAL CONFIG + FULFILLMENT READY; PUBLICATION TAX-BLOCKED.
- **Collection:** `Prestige Contractor Digital Tools`, collection GID `gid://shopify/Collection/297738649853`.
- **Draft product IDs / SKUs:** Essentials `gid://shopify/Product/8459781439677` / `PDT-ESSENTIALS-100`; Choice `gid://shopify/Product/8459781865661` / `PDT-CHOICE-100`; Pro `gid://shopify/Product/8459782226109` / `PDT-PRO-100`; Premium `gid://shopify/Product/8459782652093` / `PDT-PREMIUM-110`.
- **Live inventory safety verified:** all four current Shopify inventory items are `tracked:false` and `requiresShipping:false`. They are correctly configured as non-shippable digital products.
- **Fulfillment mapping:** Shopify paid-order delivery is incorporated into the existing hourly `Digital Product Fulfillment` automation using exact SKUs and verified Drive ZIPs.
- **Checkout evidence:** the connected Shopify store has at least one historical PAID order, confirming store checkout has processed payment; the four Prestige digital products remain DRAFT and cannot yet be purchased.
- **Copy QA:** Premium's inaccurate `Immediate ZIP download` / license-key wording was removed. Current copy states electronic delivery after completed paid order.
- **Publication blocker:** Wisconsin sales-tax classification and seller-registration status are not verified. Do not activate the Shopify products until this is resolved or Jason explicitly directs otherwise after understanding the risk.

### 3. Product QA / paid fulfillment proof
- **Status:** ASSETS + CHECKOUT + AUTOMATION VERIFIED; REAL PAID CUSTOMER-JOURNEY PROOF REMAINS.
- **Verified packages:** Essentials, Choice, Pro and Premium have confirmed archive contents; the separate $19 Starter V1 remains mapped to its existing verified Drive package.
- **Evidence standard:** do not claim a fully completed customer journey test until at least one successful completed paid order is observed through automated email delivery.
- **Resume point:** monitor Stripe and Shopify paid orders and verify the first real delivery without duplication.

### 4. Analytics / conversion measurement
- **Status:** PARTIAL — EVENT CODE EXISTS; GA4 DESTINATION BLOCKED.
- **Verified event hooks:** affiliate outbound clicks, homepage and digital-product buy clicks, lead submissions and email signup/lead-magnet events exist in code.
- **Blocker:** `analytics-config.js` has no verified `G-...` Measurement ID. Searches of available records did not recover one.
- **Resume point:** add only a verified GA4 Measurement ID, then confirm events in Realtime/DebugView. Never invent the ID.

### 5. Digital-product tax configuration
- **Status:** BLOCKS SHOPIFY PUBLICATION; STRIPE TAX STILL NOT ENABLED.
- **Wisconsin DOR verified guidance:** downloaded prewritten computer software is taxable, while not every electronically transferred digital product is taxable. Exact classification of these editable Excel workbook/template bundles remains unresolved.
- **Registration search:** Gmail and Google Drive searches found no seller's permit / sales-tax registration evidence for Prestige.
- **DOR inquiry:** Gmail draft `r-2293890372780478091` is prepared to `DORBusinessTax@wisconsin.gov` asking for written classification and seller-registration guidance. It has NOT been sent.
- **Safety:** do not enable Stripe Tax, change Shopify product tax treatment, or activate the Shopify digital listings based on a guessed classification.
- **Resume point:** get written DOR/tax-professional classification and confirm registration requirement/status.

### 6. eBay / affiliate revenue
- **Status:** LIVE / TRACKED.
- **Campaign:** `5339172120` is used for Contractor Tested Picks eBay links.
- **Full-store CTA:** uses EPN tracking.
- **Shop:** 26 tracked product groups remain live; individual JRep82 homepage inventory links should be monitored for expiration.

### 7. Traffic / distribution
- **Status:** LIVE FUNNEL READY FOR TRAFFIC; AUTO-PUBLISH TOOL UNAVAILABLE.
- **Assets:** free Contractor Profit Leak Checklist, contractor SEO guides, four-tier product ladder, eBay affiliate categories, direct paid Stripe checkout, email capture, fulfillment automation, and `LIVE_DISTRIBUTION_NOW.md` cross-channel posting sheet.
- **Tool limitation:** no installed/available social publisher or Etsy seller-management plugin was found. Do not claim automated posting/listing where no tool exists.
- **Priority:** cold traffic → free checklist; warm traffic → Essentials $6.99 / relevant higher tier; eBay-intent traffic → tracked category/store links.

### 8. Domain decision
- **Status:** WAITING FOR JASON DECISION.
- **Current sales site:** temporary Vercel alias is functional.
- **Safety:** never change DNS without explicit approval and without preserving existing MX/email records.

### 9. Existing customer/estimate work
- **Jeff estimate package:** previously completed customer-ready package; revise only if Jason requests.
- **Connie Hendries foundation estimate:** previously completed customer-ready package; revise only if Jason requests.
- **Car limp-mode diagnosis:** blocked until vehicle data/DTCs are supplied.

## Resume Instruction
The current Forge revenue sequence is: **(1) distribute traffic to the live free-checklist / $6.99 Essentials / four-tier Stripe funnel; (2) watch for and verify the first real Stripe or Shopify automated fulfillment; (3) obtain Wisconsin DOR/tax-professional classification and seller-registration guidance, then activate Shopify if safe; (4) measure signups, checkout activity and orders with Stripe/Klaviyo evidence; (5) install a verified GA4 Measurement ID when available.** Do not regress to rebuilding the storefront, product ladder, affiliate tracking, lead magnet, lead form, Shopify drafts, non-shipping configuration, or fulfillment mappings that are already complete.