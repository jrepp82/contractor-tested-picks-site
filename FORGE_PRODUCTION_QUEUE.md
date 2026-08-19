# Forge Production Queue

**Owner:** Forge / ChatGPT  
**Business:** Prestige / Prestige Exteriors / Prestige Select / Contractor Tested Picks  
**Repository:** `jrepp82/contractor-tested-picks-site`  
**Last updated:** 2026-08-19

## Operating Rules
1. This is Forge's production queue, not Jason's personal checklist.
2. Resume the highest-priority unfinished Forge task unless Jason explicitly redirects.
3. Completion requires a verified deliverable or confirmed external action.
4. Protect existing working revenue systems; do not rebuild for novelty.
5. Update this file after substantive progress.

---

## P0 — Live Revenue Funnel

### 1. Contractor Tested Picks / Prestige storefront
- **Status:** LIVE / PRODUCTION VERIFIED.
- **Public URL:** `https://contractor-tested-picks-site.vercel.app/`
- **Vercel project:** `prj_xUofNzAF7d2ZO58EgH7VucYsdd1u`.
- **Git source:** `jrepp82/contractor-tested-picks-site`, branch `main`.
- **Current live systems:** homepage, eBay affiliate shop, digital product ladder, free lead magnet, direct-submit remodeling lead form, Klaviyo capture, privacy/disclosure, guides/blog, robots/sitemap.
- **Homepage conversion paths:** tracked eBay shopping; digital products from $6.99; free Profit Leak Checklist; Prestige remodeling estimate request.
- **Next Forge work:** organic traffic/distribution and real-conversion monitoring. Do not rebuild storefront architecture.

### 2. Free Contractor Profit Leak Checklist funnel
- **Status:** LIVE / VERIFIED.
- **Lead magnet page:** `profit-leak-checklist.html` returns 200 in production; contains 12 contractor profit-leak checks, print/save-PDF control, disclaimer and UTM-tagged CTA back to the product ladder.
- **Signup location:** `digital-products.html#profit-leak-checklist`.
- **Homepage CTA:** `Free Profit Leak Checklist` links directly to that anchor.
- **Klaviyo capture:** form uses list `SJ8FBv`, source `Contractor Profit Leak Checklist`, double opt-in marketing consent, and `email-capture.js` stores `CTP Lead Magnet` + signup source/page properties.
- **Live Klaviyo audit 2026-08-19:** list `SJ8FBv` exists, is double opt-in, has 1 profile, and has no flow triggers attached.
- **Immediate delivery behavior:** after Klaviyo accepts the form submission, the page unlocks `profit-leak-checklist.html`; user is separately told to confirm the marketing subscription by email.
- **Welcome/follow-up assets:** prior records identify staged Klaviyo templates, but no triggered nurture flow is active. Do not claim the nurture sequence is automated until a real flow trigger is verified.

### 3. Digital product ladder
- **Status:** LIVE CHECKOUTS.
- **CANONICAL CURRENT Prestige Essentials v1.0:** $6.99 — Payment Link `plink_1U68DsJkrg28KsFAG970HNU3` — `https://buy.stripe.com/4gM7sM0aN4RP7Dxf1FdZ60d`.
- **Prestige Choice v1.0:** $16.99 — Payment Link `plink_1U67ZuJkrg28KsFAwyIZduUG` — `https://buy.stripe.com/8x2dRae1D6ZXbTNbPtdZ60a`.
- **Contractor Business OS Starter V1:** $19 launch — Payment Link `plink_1U1tzUJkrg28KsFADemfO0bk` — `https://buy.stripe.com/fZu9AUcXz3NLga37zddZ600`.
- **Prestige Pro v1.0:** $49.99 — Payment Link `plink_1U67a2Jkrg28KsFAdqZmMunI` — `https://buy.stripe.com/6oUcN6g9L5VTbTN3iXdZ60b`.
- **Prestige Premium v1.1:** $99.99 — Payment Link `plink_1U67aAJkrg28KsFAP7bQOxll` — `https://buy.stripe.com/5kQ6oI8Hj3NLe1Vg5JdZ60c`.
- **Product-position rule:** Essentials = 3 basics; Choice = 5 core templates; $19 Starter V1 = 12 separate-template library; Pro = integrated job-management workbook; Premium = full integrated contractor business OS.
- **Legacy Stripe cleanup 2026-08-19:** verified unused legacy Payment Links from prior pricing iterations were deactivated. Current live Stripe audit now shows exactly five active live Payment Links: the four canonical Prestige one-time tiers plus the separate $19 Starter V1 bundle.

### 4. Product QA / private files
- **Status:** VERIFIED PACKAGES EXIST.
- **Essentials:** workbook + README + license + manifest built; formula-error scan clean; package persisted privately.
- **$19 Starter V1:** 98,581 bytes; 12 advertised templates + START-HERE + license; SHA-256 `49f58c29e0c9c7caf4f04a42935a9697977f981707027e38932f9882d5f05979`.
- **Choice release ZIP:** 14,032 bytes; SHA-256 `4acec662eb65ba9d7a9d384dd9eb267fc3f508a72c1e7a30d362b58952358620`.
- **Pro release ZIP:** 21,298 bytes; SHA-256 `48559e5c7d56534c2fbefcfd80b740b716fc3479791d49e3527d9664ac3352f3`.
- **Premium release ZIP:** 45,505 bytes; SHA-256 `cb9acd9c610b3205d79e2abfcd5cd1387e3b93bef54ac984b7dc008aca8e0932`.
- **QA correction:** stale v1.1 license mismatch in older Choice/Pro source packages was corrected in release packages.

### 5. Automated digital fulfillment
- **Status:** ACTIVE / MAPPED FOR CURRENT ONE-TIME OFFERS; REAL PAID ORDER PROOF STILL NEEDED.
- **Current canonical Essentials:** hourly ChatGPT automation watches `plink_1U68DsJkrg28KsFAG970HNU3` and maps it to Drive file ID `13hop6iBTkkOymvIFgO3kMK5vf1gMjZPV` (`Prestige_Essentials_v1_0_Digital_Download.zip`, 11,872 bytes).
- **Choice / $19 Starter / Pro / Premium:** same hourly ChatGPT automation `Digital Product Fulfillment` (jawbone `6a7660320e308191aec8cab859c03046`).
- **Logic:** completed Stripe Checkout Sessions only; Checkout Session ID dedupe via Gmail Sent; fetch mapped private Drive ZIP; verify filename/size; send to buyer; notify Jason only after new fulfillment.
- **Drive mappings:** Starter `1B_yMpUx29mD9TKhglKXzgTZ764_knIYs`; Choice `1zUaaiIzErAKtQf2MwJ5-MUcZgzDVQZSn`; Pro `1WFe1opkdXHsDjNxadWatusyzNuYOkCgT`; Premium `1WzZgUeoaek5fPnT2H7ozR2vCnFzRSmzh`.
- **Evidence standard:** do not claim full end-to-end customer fulfillment proof until a controlled successful paid order has completed.

### 6. Prestige remodeling lead capture
- **Status:** LIVE DIRECT SUBMISSION.
- **Current form:** FormSubmit AJAX to business email; validation; honeypot; sending/success/failure states; `lead_submit` and `generate_lead` event hooks; mailto fallback only on direct-submit failure.
- **Supabase lead project:** `lmgsavonulfbmpaipqcx` is ACTIVE_HEALTHY, but connector SQL credentials rejected schema write attempts; do not claim a Supabase lead table exists.

### 7. Monthly memberships — independently audited design
- **Status:** NOT LIVE / DO NOT PUBLISH YET.
- **Proposed monthly prices from Grok sandbox handoff:** Essentials Monthly $19/mo; Choice Monthly $39/mo; Pro Monthly $79/mo; Premium Monthly $149/mo. These proposed recurring prices are not approved as live offers merely because they existed in another agent's sandbox.
- **Independent live Stripe audit:** connected account `acct_1TwJUgJkrg28KsFA` / Prestigeremodelingwi has **zero active recurring prices** as of the 2026-08-19 audit. Therefore none of the four monthly tiers is live in the connected Stripe account.
- **GitHub production audit:** `digital-products.html` on `main` contains no monthly section and still states one-time purchase / no subscription. Production remains one-time only.
- **Staged-file audit:** Grok reported files named `digital-products-UPDATED-2026-08-19.html`, `CURRENT_EXECUTION_ORDER-UPDATED-2026-08-19.md`, `FORGE_PRODUCTION_QUEUE-UPDATED-2026-08-19.md`, `GROK-READY-FILES-README.md`, and `AI-Estimating-Marketing-Prompt-Pack-DRAFT.md`; those exact files were not found in the ChatGPT conversation or persistent Library, so their contents are not independently approved.
- **Stripe architecture audit:** use Stripe Payment Links / hosted Checkout, flat-rate monthly billing, charge at signup, Customer Portal for self-service, and Stripe Smart Retries + failed-payment emails for revenue recovery.
- **CRITICAL event correction:** do **not** fulfill merely because `customer.subscription.created` exists. Subscription creation is not sufficient proof that first payment succeeded.
- **Initial paid signup trigger:** provision/deliver only after a paid subscription Checkout is confirmed, using `checkout.session.completed` with payment/subscription state verified or the corresponding successful first `invoice.paid` event. Deduplicate on stable Stripe IDs.
- **Renewal trigger:** `invoice.paid` is the canonical successful renewal event for monthly content/access continuation.
- **Failed-payment trigger:** `invoice.payment_failed`; do not deliver the new monthly asset while the renewal remains unpaid. Let Stripe Smart Retries/customer emails handle default dunning unless a custom recovery workflow is later justified.
- **Cancellation lifecycle:** track cancellation / cancel-at-period-end state and stop future monthly deliveries after the paid entitlement period ends. Customer Portal is the preferred self-service path.
- **Offer-definition gap:** no verified source currently defines exactly what Essentials / Choice / Pro / Premium members receive every month. Before launch define monthly deliverables, cadence/date, initial signup benefit, tier differences, upgrade/downgrade behavior, cancellation access, and the fallback if a promised monthly asset is delayed.
- **Do not mirror the recurring products into live Stripe until the monthly benefits and first-month assets are defined and independently QA'd.**
- **GitHub permission correction:** Forge/ChatGPT GitHub connector has write access. Grok's 403 is specific to Grok's integration, not a repo-wide write block.

---

## P1 — Measurement / Compliance / Distribution

### 8. Organic distribution
- **Status:** HIGHEST-PRIORITY UNBLOCKED CASH-NOW WORK WHILE MONTHLY OFFER IS QA'D.
- **Primary offer for cold traffic:** free Contractor Profit Leak Checklist, then paid ladder.
- **Secondary direct-response offers:** $6.99 Essentials and $19 12-template bundle.
- **Do not spend on paid ads without Jason's explicit approval of spend.**
- **Next action:** use connected/available organic publishing channels where supported; otherwise stage channel-specific launch assets and install/connect the most useful publishing integration.

### 9. GA4 analytics
- **Status:** BLOCKED BY MISSING VERIFIED ID.
- **Code exists:** page views plus affiliate-click, checkout-click, lead-submit and email signup/lead-magnet events.
- **Current config:** empty Measurement ID; no verified `G-...` recovered from repo, Gmail or Drive.
- **Next action:** install only a real verified GA4 Measurement ID, then test Realtime/DebugView.

### 10. Wisconsin digital-product sales tax / Stripe Tax
- **Status:** HOLD / VERIFY BEFORE ACTION.
- **Stripe state:** no tax registrations recorded; automatic tax remains off on current links.
- **Connected-record search:** no Wisconsin seller permit/sales-tax registration recovered from Gmail/Drive.
- **Next action:** verify registration/classification, then configure Stripe Tax only if appropriate.

### 11. Affiliate monetization
- **Status:** LIVE.
- **EPN campaign:** `5339172120`.
- **Full eBay store CTA:** tracked.
- **Shop:** 26 search-based product groups; monitor individual JRep82 inventory links for expiration.

---

## P2 — Waiting / External Decisions

### 12. Domain
- **Status:** WAITING FOR JASON DECISION.
- **Current Vercel alias works.**
- **Safety:** do not change DNS or MX/email records without explicit approval.

### 13. Existing customer estimate packages
- Previously completed customer-ready estimate work remains outside this funnel; revise only if Jason requests changes.

### 14. Vehicle diagnosis
- **Status:** BLOCKED by missing exact vehicle/DTC/charging/symptom data.

---

## Resume Rule
The highest-priority unblocked Forge work is now **(1) distribute the verified free-checklist / one-time product funnel for cash-now revenue; (2) independently define and QA the monthly-membership benefits + recurring fulfillment lifecycle before creating live recurring links; (3) monitor for and prove the first real automated paid-order delivery; (4) resolve tax/registration and GA4 blockers when verified information is available.** Do not rebuild completed storefront, lead magnet, one-time products, affiliate tracking, lead form, Shopify drafts, or one-time fulfillment mappings.