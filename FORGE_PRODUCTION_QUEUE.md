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
- **Current live systems:** homepage, eBay affiliate shop, digital product ladder, free lead magnet, direct-submit remodeling lead form, Klaviyo capture, privacy/disclosure, guides/blog, robots/sitemap.
- **Homepage conversion paths:** tracked eBay shopping; digital products from $6.99; free Profit Leak Checklist; Prestige remodeling estimate request.
- **Next Forge work:** organic traffic/distribution and real-conversion monitoring. Do not rebuild storefront architecture.

### 2. Free Contractor Profit Leak Checklist funnel
- **Status:** LIVE / VERIFIED.
- **Lead magnet page:** `profit-leak-checklist.html` returns 200 in production; contains 12 contractor profit-leak checks, print/save-PDF control, disclaimer and UTM-tagged CTA back to the product ladder.
- **Signup location:** `digital-products.html#profit-leak-checklist`.
- **Homepage CTA:** `Free Profit Leak Checklist` links directly to that anchor.
- **Klaviyo capture:** form uses list `SJ8FBv`, source `Contractor Profit Leak Checklist`, double opt-in marketing consent, and `email-capture.js` stores `CTP Lead Magnet` + signup source/page properties.
- **Immediate delivery behavior:** after Klaviyo accepts the form submission, the page unlocks `profit-leak-checklist.html`; user is separately told to confirm the marketing subscription by email.
- **Welcome email:** template `WEVQKX` (`CTP Welcome — Contractor Tested Picks`) now includes the free checklist CTA and UTM-tagged product-ladder CTA.
- **Follow-up templates staged:** `X2vSXV` (`CTP Follow-Up 1 — Estimate Change Order Job Cost`) and `WhYsvN` (`CTP Follow-Up 2 — When to Upgrade to Pro or Premium`).
- **Blocker:** Klaviyo connector exposes no flow-creation action; list currently has no triggered flow. Do not claim the 3-email sequence is automated yet.

### 3. Digital product ladder
- **Status:** LIVE CHECKOUTS.
- **Prestige Essentials v1.0:** $6.99 — Payment Link `plink_1U67DLJkrg28KsFADOCDwudQ` — `https://buy.stripe.com/aFaeVe4r33NLaPJf1FdZ609`.
- **Prestige Choice v1.0:** $16.99 — Payment Link `plink_1U67ZuJkrg28KsFAwyIZduUG` — `https://buy.stripe.com/8x2dRae1D6ZXbTNbPtdZ60a`.
- **Contractor Business OS Starter V1:** $19 launch — Payment Link `plink_1U1tzUJkrg28KsFADemfO0bk` — `https://buy.stripe.com/fZu9AUcXz3NLga37zddZ600`.
- **Prestige Pro v1.0:** $49.99 — Payment Link `plink_1U67a2Jkrg28KsFAdqZmMunI` — `https://buy.stripe.com/6oUcN6g9L5VTbTN3iXdZ60b`.
- **Prestige Premium v1.1:** $99.99 — Payment Link `plink_1U67aAJkrg28KsFAP7bQOxll` — `https://buy.stripe.com/5kQ6oI8Hj3NLe1Vg5JdZ60c`.
- **Product-position rule:** Essentials = 3 basics; Choice = 5 core templates; $19 Starter V1 = 12 separate-template library; Pro = integrated job-management workbook; Premium = full integrated contractor business OS.

### 4. Product QA / private files
- **Status:** VERIFIED PACKAGES EXIST.
- **Essentials:** workbook + README + license + manifest built; formula-error scan clean; package persisted privately.
- **$19 Starter V1:** 98,581 bytes; 12 advertised templates + START-HERE + license; SHA-256 `49f58c29e0c9c7caf4f04a42935a9697977f981707027e38932f9882d5f05979`.
- **Choice release ZIP:** 14,032 bytes; SHA-256 `4acec662eb65ba9d7a9d384dd9eb267fc3f508a72c1e7a30d362b58952358620`.
- **Pro release ZIP:** 21,298 bytes; SHA-256 `48559e5c7d56534c2fbefcfd80b740b716fc3479791d49e3527d9664ac3352f3`.
- **Premium release ZIP:** 45,505 bytes; SHA-256 `cb9acd9c610b3205d79e2abfcd5cd1387e3b93bef54ac984b7dc008aca8e0932`.
- **QA correction:** stale v1.1 license mismatch in older Choice/Pro source packages was corrected in release packages.

### 5. Automated digital fulfillment
- **Status:** ACTIVE / MAPPED; REAL PAID ORDER PROOF STILL NEEDED.
- **Essentials:** successful Stripe checkout redirects to protected Supabase Edge Function `prestige-essentials-delivery`.
- **Choice / $19 Starter / Pro / Premium:** hourly ChatGPT automation `Digital Product Fulfillment` (jawbone `6a7660320e308191aec8cab859c03046`).
- **Logic:** completed Stripe Checkout Sessions only; Checkout Session ID dedupe via Gmail Sent; fetch mapped private Drive ZIP; verify filename/size; send to buyer; notify Jason only after new fulfillment.
- **Drive mappings:** Starter `1B_yMpUx29mD9TKhglKXzgTZ764_knIYs`; Choice `1zUaaiIzErAKtQf2MwJ5-MUcZgzDVQZSn`; Pro `1WFe1opkdXHsDjNxadWatusyzNuYOkCgT`; Premium `1WzZgUeoaek5fPnT2H7ozR2vCnFzRSmzh`.
- **Evidence standard:** do not claim full end-to-end customer fulfillment proof until a controlled successful paid order has completed.

### 6. Prestige remodeling lead capture
- **Status:** LIVE DIRECT SUBMISSION.
- **Current form:** FormSubmit AJAX to business email; validation; honeypot; sending/success/failure states; `lead_submit` and `generate_lead` event hooks; mailto fallback only on direct-submit failure.
- **Supabase lead project:** `lmgsavonulfbmpaipqcx` is ACTIVE_HEALTHY, but connector SQL credentials rejected schema write attempts; do not claim a Supabase lead table exists.

---

## P1 — Measurement / Compliance / Distribution

### 7. Organic distribution
- **Status:** NEXT HIGHEST-PRIORITY UNBLOCKED WORK.
- **Primary offer for cold traffic:** free Contractor Profit Leak Checklist, then paid ladder.
- **Secondary direct-response offers:** $6.99 Essentials and $19 12-template bundle.
- **Do not spend on paid ads without Jason's explicit approval of spend.**
- **Next action:** use connected/available organic publishing channels where supported; otherwise stage channel-specific launch assets and install/connect the most useful publishing integration.

### 8. GA4 analytics
- **Status:** BLOCKED BY MISSING VERIFIED ID.
- **Code exists:** page views plus affiliate-click, checkout-click, lead-submit and email signup/lead-magnet events.
- **Current config:** empty Measurement ID; no verified `G-...` recovered from repo, Gmail or Drive.
- **Next action:** install only a real verified GA4 Measurement ID, then test Realtime/DebugView.

### 9. Wisconsin digital-product sales tax / Stripe Tax
- **Status:** HOLD / VERIFY BEFORE ACTION.
- **Stripe state:** no tax registrations recorded; automatic tax remains off on newly created links.
- **Connected-record search:** no Wisconsin seller permit/sales-tax registration recovered from Gmail/Drive.
- **Next action:** verify registration/classification, then configure Stripe Tax only if appropriate.

### 10. Affiliate monetization
- **Status:** LIVE.
- **EPN campaign:** `5339172120`.
- **Full eBay store CTA:** tracked.
- **Shop:** 26 search-based product groups; monitor individual JRep82 inventory links for expiration.

---

## P2 — Waiting / External Decisions

### 11. Domain
- **Status:** WAITING FOR JASON DECISION.
- **Current Vercel alias works.**
- **Safety:** do not change DNS or MX/email records without explicit approval.

### 12. Existing customer estimate packages
- Previously completed customer-ready estimate work remains outside this funnel; revise only if Jason requests changes.

### 13. Vehicle diagnosis
- **Status:** BLOCKED by missing exact vehicle/DTC/charging/symptom data.

---

## Resume Rule
The highest-priority unblocked Forge work is now **organic distribution of the verified free-checklist/product funnel and real-conversion monitoring**. Continue from the live lead magnet, five-product ladder, fulfillment automation and Klaviyo capture. Do not rebuild them. Activate nurture when technically supported, install analytics only with a verified ID, and resolve the sales-tax registration question before enabling Stripe Tax.