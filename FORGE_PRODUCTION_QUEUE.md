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
- **Vercel project:** `prj_xUofNzAF7d2ZO58EgH7VucYsdd1u`
- **Git source:** `jrepp82/contractor-tested-picks-site`, branch `main`.
- **Current live systems:** homepage, eBay affiliate shop, digital product ladder, direct-submit lead form, Klaviyo capture, privacy/disclosure, guides/blog, robots/sitemap.
- **Latest major production changes:** full digital ladder published; homepage now promotes digital products from $6.99; contact form changed from mailto-only to direct submission; privacy notice updated for the real live stack.
- **Next Forge work:** conversion QA, email nurture activation, measurement, promotion. Do not rebuild storefront architecture.

### 2. Digital product ladder
- **Status:** LIVE CHECKOUTS.
- **Prestige Essentials v1.0:** $6.99 — Payment Link `plink_1U67DLJkrg28KsFADOCDwudQ` — public URL `https://buy.stripe.com/aFaeVe4r33NLaPJf1FdZ609`.
- **Prestige Choice v1.0:** $16.99 — Payment Link `plink_1U67ZuJkrg28KsFAwyIZduUG` — public URL `https://buy.stripe.com/8x2dRae1D6ZXbTNbPtdZ60a`.
- **Contractor Business OS Starter V1:** $19 launch — Payment Link `plink_1U1tzUJkrg28KsFADemfO0bk` — public URL `https://buy.stripe.com/fZu9AUcXz3NLga37zddZ600`.
- **Prestige Pro v1.0:** $49.99 — Payment Link `plink_1U67a2Jkrg28KsFAdqZmMunI` — public URL `https://buy.stripe.com/6oUcN6g9L5VTbTN3iXdZ60b`.
- **Prestige Premium v1.1:** $99.99 — Payment Link `plink_1U67aAJkrg28KsFAP7bQOxll` — public URL `https://buy.stripe.com/5kQ6oI8Hj3NLe1Vg5JdZ60c`.
- **Product-position rule:** Essentials = 3 basics; Choice = 5 core templates; $19 Starter V1 = 12 separate-template library; Pro = integrated job-management workbook; Premium = full integrated contractor business OS.

### 3. Product QA / private files
- **Status:** VERIFIED PACKAGES EXIST.
- **Essentials:** workbook + README + license + manifest built; formula-error scan clean; package persisted in private Library.
- **$19 Starter V1:** exact ZIP verified at 98,581 bytes; 12 advertised templates + START-HERE + license; archive integrity passed; SHA-256 `49f58c29e0c9c7caf4f04a42935a9697977f981707027e38932f9882d5f05979`.
- **Choice release ZIP:** 14,032 bytes; SHA-256 `4acec662eb65ba9d7a9d384dd9eb267fc3f508a72c1e7a30d362b58952358620`.
- **Pro release ZIP:** 21,298 bytes; SHA-256 `48559e5c7d56534c2fbefcfd80b740b716fc3479791d49e3527d9664ac3352f3`.
- **Premium release ZIP:** 45,505 bytes; SHA-256 `cb9acd9c610b3205d79e2abfcd5cd1387e3b93bef54ac984b7dc008aca8e0932`.
- **QA correction:** stale v1.1 license mismatch in older Choice/Pro source packages was corrected in the release packages.

### 4. Automated digital fulfillment
- **Status:** ACTIVE / MAPPED; REAL PAID ORDER PROOF STILL NEEDED.
- **Prestige Essentials:** successful Stripe checkout redirects to protected Supabase Edge Function `prestige-essentials-delivery`; product is not committed as a public Vercel asset.
- **Choice / $19 Starter / Pro / Premium:** active hourly ChatGPT automation `Digital Product Fulfillment` (jawbone `6a7660320e308191aec8cab859c03046`).
- **Automation logic:** query completed Stripe Checkout Sessions by Payment Link; use Checkout Session ID as fulfillment key; search Gmail Sent for exact ID to prevent duplicate delivery; fetch mapped private Google Drive ZIP; verify expected filename/size; send ZIP to purchaser; notify Jason only after new fulfillment.
- **Private Drive mappings:** Starter `1B_yMpUx29mD9TKhglKXzgTZ764_knIYs`; Choice `1zUaaiIzErAKtQf2MwJ5-MUcZgzDVQZSn`; Pro `1WFe1opkdXHsDjNxadWatusyzNuYOkCgT`; Premium `1WzZgUeoaek5fPnT2H7ozR2vCnFzRSmzh`.
- **Evidence standard:** do not claim full end-to-end customer fulfillment proof until a controlled successful paid order has completed.

### 5. Email capture / nurture
- **Status:** CAPTURE LIVE; NURTURE ASSETS STAGED; FLOW CREATION BLOCKED BY CONNECTOR.
- **Klaviyo list:** `SJ8FBv` — `Contractor Tested Picks Subscribers` — double opt-in.
- **Digital-products signup:** live on public page and handled by `email-capture.js`.
- **Templates saved in Klaviyo:** `CTP Welcome — Contractor Tested Picks`; `CTP Follow-Up 1 — Estimate Change Order Job Cost`; `CTP Follow-Up 2 — When to Upgrade to Pro or Premium`.
- **Blocker:** connected Klaviyo API exposes flow reads/template writes but no flow-creation action. Existing list currently has no triggered flow.
- **Next Forge work:** activate list-triggered 3-email flow when a supported Klaviyo flow-creation path becomes available; do not send unsolicited broadcasts as a substitute.

### 6. Prestige remodeling lead capture
- **Status:** LIVE DIRECT SUBMISSION.
- **Old failure mode removed:** no longer mailto-only.
- **Current form:** FormSubmit AJAX to business email; name/phone/details validation; honeypot; sending/success/failure states; `lead_submit` and `generate_lead` event hooks; mailto fallback only on direct-submit failure.
- **Supabase lead project:** `lmgsavonulfbmpaipqcx` is ACTIVE_HEALTHY, but connector SQL credentials rejected schema write attempts; do not claim a Supabase lead table exists.

---

## P1 — Measurement / Compliance / Promotion

### 7. GA4 analytics
- **Status:** BLOCKED BY MISSING VERIFIED ID.
- **Code exists:** page view loader plus affiliate-click, checkout-click, lead-submit and signup event hooks.
- **Current config:** `analytics-config.js` has an empty Measurement ID.
- **Search completed:** no verified `G-...` ID recovered from repo, Gmail or Drive.
- **Next action:** install only a real verified GA4 Measurement ID, then test Realtime/DebugView.

### 8. Wisconsin digital-product sales tax / Stripe Tax
- **Status:** HOLD / VERIFY BEFORE ACTION.
- **Stripe state:** no tax registrations are recorded in the live account; automatic tax remains off on the newly created links.
- **Connected-record search:** no existing Wisconsin seller permit or sales-tax registration was recovered from Gmail/Drive.
- **Risk:** formula-driven Excel products may require Wisconsin tax treatment as downloaded prewritten software; classification/registration must be confirmed before collection is enabled.
- **Next action:** verify registration/classification, then configure Stripe Tax only if appropriate.

### 9. Affiliate monetization
- **Status:** LIVE.
- **EPN campaign:** `5339172120` for Contractor Tested Picks.
- **Full eBay store CTA:** tracked; old untracked shortlink removed from the primary CTA.
- **Shop:** 26 search-based product groups reduce stale-listing risk; individual JRep82 homepage inventory links should be monitored for expiration.

### 10. Promotion
- **Status:** READY FOR CONTROLLED TRAFFIC AFTER FINAL QA.
- **Already available:** homepage CTAs, product ladder, buying guides, 7-day/30-day content assets from prior build work.
- **Before scaling traffic:** obtain measurement if possible; resolve tax registration question; observe first real checkout/fulfillment outcomes; then publish/schedule the highest-conversion content rather than creating another new funnel.

---

## P2 — Waiting / External Decisions

### 11. Domain
- **Status:** WAITING FOR JASON DECISION.
- **Current Vercel alias works.**
- **Safety:** do not change DNS or email/MX records without explicit approval.

### 12. Existing customer estimate packages
- Previously completed customer-ready estimate work remains outside this website funnel; revise only if Jason requests changes.

### 13. Vehicle diagnosis
- **Status:** BLOCKED by missing exact vehicle/DTC/charging/symptom data.

---

## Resume Rule
The highest-priority unblocked Forge work is **live-funnel conversion and QA**, not another rebuild. Continue from the working storefront/product ladder/fulfillment system, activate nurture when technically supported, install analytics only with a verified ID, resolve the sales-tax registration question before enabling Stripe Tax, then drive controlled traffic and measure actual sales.