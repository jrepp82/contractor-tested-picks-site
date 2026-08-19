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
- **Checkout:** exactly five active live Stripe Payment Links remain: the four canonical one-time tiers plus the separate $19 Starter bundle. Verified unused legacy pricing links were deactivated on August 19.
- **Essentials canonical live link:** `plink_1U68DsJkrg28KsFAG970HNU3` / `https://buy.stripe.com/4gM7sM0aN4RP7Dxf1FdZ60d`.
- **Essentials package:** `Prestige_Essentials_v1_0_Digital_Download.zip`; workbook includes START HERE, Estimate, Change Order and Job Cost; stored in Google Drive and mapped to the hourly fulfillment watcher.
- **Verified Drive fulfillment assets:** Choice `Prestige_Choice_v1_0_Digital_Download.zip` 14,032 bytes; Pro `Prestige_Pro_v1_0_Digital_Download.zip` 21,298 bytes; Premium `Prestige_Premium_v1_1_Digital_Download.zip` 45,505 bytes.
- **Fulfillment:** active hourly `Digital Product Fulfillment` condition-watch handles BOTH Stripe and mapped Shopify digital orders. Stripe dedupes on Checkout Session ID; Shopify dedupes on Shopify order reference + SKU. Both paths verify the mapped Drive ZIP before Gmail delivery.
- **Stripe order check:** all current one-time Payment Links had zero completed paid Checkout Sessions at the August 19 audit; no paid order was stuck waiting for delivery.
- **Homepage:** all four Prestige tiers are shown with direct verified Stripe Buy buttons plus `Compare All Products`. The free Profit Leak Checklist CTA remains above the paid funnel.
- **Digital product page:** four-tier ladder is production-confirmed with direct buy links, separate $19 bundle, truthful automated-delivery copy, and buy-click analytics hooks.
- **Free lead magnet:** `profit-leak-checklist.html` is live; it includes both a direct `Fix the basics — $6.99` Essentials CTA and a compare-all-products path.
- **Lead-magnet capture:** signup submits to Klaviyo list `SJ8FBv`; list is verified and double opt-in for marketing.
- **Klaviyo nurture:** no triggered flow is attached to `SJ8FBv`; do not claim nurture automation is live.
- **Remodeling lead capture:** `/contact.html` directly submits through FormSubmit AJAX with validation, honeypot, status feedback, analytics hook and mailto fallback. Production deployment is verified.
- **Distribution asset:** `LIVE_DISTRIBUTION_NOW.md` contains tracked launch links and channel-ready copy.
- **Resume point:** drive traffic + prove first actual automated paid-order fulfillment. Do not rebuild these systems.

### 2. Monthly Prestige memberships — design + QA before launch
- **Status:** NOT LIVE. ZERO ACTIVE RECURRING PRICES IN CONNECTED LIVE STRIPE AT LAST AUDIT.
- **Proposed sandbox pricing only:** Essentials Monthly $19/mo; Choice Monthly $39/mo; Pro Monthly $79/mo; Premium Monthly $149/mo. These are not production facts and are not approved live merely because another agent created sandbox products.
- **Production repo:** no monthly membership section is deployed; current `digital-products.html` remains one-time only.
- **Stripe architecture selected:** hosted Stripe Payment Links / Checkout, flat-rate monthly billing, charge at signup, Stripe Customer Portal for payment-method updates/cancel self-service, Smart Retries + failed-payment emails for recovery.
- **Critical fulfillment rule:** never deliver solely on `customer.subscription.created`.
- **Initial signup fulfillment:** deliver only after paid signup is confirmed through `checkout.session.completed` with paid/subscription state verified or the corresponding successful first `invoice.paid`.
- **Monthly renewal fulfillment:** use `invoice.paid` as the successful renewal signal. Deduplicate on stable Stripe invoice/subscription identifiers.
- **Failed payment:** use `invoice.payment_failed`; do not send the new monthly asset until payment later succeeds.
- **Cancellation:** track cancellation/cancel-at-period-end and stop future deliveries after paid entitlement ends. Customer Portal is the preferred self-service path.
- **Main blocker:** no verified source currently defines exactly what each of the four membership tiers receives every month. Before creating live recurring links, define tier-specific monthly deliverables, initial signup assets, cadence/date, upgrade/downgrade rules, cancellation access, and what happens if a planned monthly asset is delayed.
- **Grok staged files:** reported but not found in the shared conversation/Library; do not deploy them unseen.
- **GitHub access:** Forge/ChatGPT has working write access; Grok's 403 is specific to Grok's integration.
- **Resume point:** define and QA the recurring product itself, then create live Stripe recurring products/links only when benefits and first-month assets are real.

### 3. Shopify digital sales channel
- **Status:** FOUR PRODUCTS BUILT AS DRAFTS; DIGITAL CONFIG + FULFILLMENT READY; PUBLICATION TAX-BLOCKED.
- **Collection:** `Prestige Contractor Digital Tools`, collection GID `gid://shopify/Collection/297738649853`.
- **Draft product IDs / SKUs:** Essentials `gid://shopify/Product/8459781439677` / `PDT-ESSENTIALS-100`; Choice `gid://shopify/Product/8459781865661` / `PDT-CHOICE-100`; Pro `gid://shopify/Product/8459782226109` / `PDT-PRO-100`; Premium `gid://shopify/Product/8459782652093` / `PDT-PREMIUM-110`.
- **Inventory safety:** all four are `tracked:false` and `requiresShipping:false`.
- **Fulfillment mapping:** Shopify paid-order delivery is incorporated into the existing hourly fulfillment automation using exact SKUs and verified Drive ZIPs.
- **Publication blocker:** Wisconsin sales-tax classification and seller-registration status are not verified. Do not activate the Shopify products until this is resolved or Jason explicitly directs otherwise after understanding the risk.

### 4. Product QA / paid fulfillment proof
- **Status:** ASSETS + CHECKOUT + AUTOMATION VERIFIED; REAL PAID CUSTOMER-JOURNEY PROOF REMAINS.
- **Verified packages:** Essentials, Choice, Pro and Premium have confirmed archive contents; the separate $19 Starter V1 remains mapped to its verified Drive package.
- **Evidence standard:** do not claim a fully completed customer journey until at least one successful completed paid order is observed through automated email delivery.
- **Resume point:** monitor Stripe and Shopify paid orders and verify the first real delivery without duplication.

### 5. Analytics / conversion measurement
- **Status:** PARTIAL — EVENT CODE EXISTS; GA4 DESTINATION BLOCKED.
- **Verified event hooks:** affiliate outbound clicks, homepage and digital-product buy clicks, lead submissions and email signup/lead-magnet events exist in code.
- **Blocker:** `analytics-config.js` has no verified `G-...` Measurement ID.
- **Resume point:** add only a verified GA4 Measurement ID, then confirm events in Realtime/DebugView. Never invent the ID.

### 6. Digital-product tax configuration
- **Status:** BLOCKS SHOPIFY PUBLICATION; STRIPE TAX STILL NOT ENABLED.
- **Wisconsin DOR guidance:** downloaded prewritten computer software is taxable, while not every electronically transferred digital product is taxable. Exact classification of these editable Excel workbook/template bundles remains unresolved.
- **Registration search:** Gmail and Google Drive searches found no seller's permit / sales-tax registration evidence for Prestige.
- **DOR inquiry:** Gmail draft `r-2293890372780478091` is prepared to `DORBusinessTax@wisconsin.gov` asking for written classification and seller-registration guidance. It has NOT been sent.
- **Safety:** do not enable Stripe Tax, change Shopify tax treatment, or activate Shopify digital listings based on a guessed classification.

### 7. eBay / affiliate revenue
- **Status:** LIVE / TRACKED.
- **Campaign:** `5339172120` is used for Contractor Tested Picks eBay links.
- **Full-store CTA:** uses EPN tracking.
- **Shop:** 26 tracked product groups remain live; individual JRep82 homepage inventory links should be monitored for expiration.

### 8. Traffic / distribution
- **Status:** LIVE FUNNEL READY FOR TRAFFIC; AUTO-PUBLISH TOOL UNAVAILABLE.
- **Assets:** free Contractor Profit Leak Checklist, contractor SEO guides, four-tier product ladder, eBay affiliate categories, direct paid Stripe checkout, email capture, fulfillment automation, and `LIVE_DISTRIBUTION_NOW.md` cross-channel posting sheet.
- **Priority:** cold traffic → free checklist; warm traffic → Essentials $6.99 / relevant higher tier; eBay-intent traffic → tracked category/store links.

### 9. Domain decision
- **Status:** WAITING FOR JASON DECISION.
- **Current sales site:** temporary Vercel alias is functional.
- **Safety:** never change DNS without explicit approval and without preserving existing MX/email records.

### 10. Existing customer/estimate work
- Existing customer-ready estimate packages remain separate from this funnel and should not be revised unless Jason asks or a verified discrepancy is found.

## Resume Instruction
The current Forge revenue sequence is: **(1) drive traffic to the live free-checklist / $6.99 Essentials / one-time Stripe funnel; (2) define and QA the actual monthly membership deliverables + lifecycle before creating live recurring links; (3) watch for and verify the first real automated fulfillment; (4) resolve Wisconsin tax/seller-registration status and activate Shopify only when safe; (5) measure signups, checkout activity and orders with Stripe/Klaviyo evidence; (6) install a verified GA4 Measurement ID when available.** Do not regress to rebuilding completed storefront, one-time ladder, affiliate tracking, lead magnet, lead form, Shopify drafts, or one-time fulfillment mappings.