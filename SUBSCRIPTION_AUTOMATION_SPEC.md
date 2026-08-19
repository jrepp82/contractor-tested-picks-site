# Prestige Monthly Memberships — Audited Automation & Launch Specification

**Status:** DESIGN / QA — NOT LIVE  
**Updated:** 2026-08-19  
**Owner:** Forge / ChatGPT  

## 1. Purpose
This file is the implementation source of truth for any future Prestige monthly digital membership. It exists to prevent a sandbox or draft subscription from being treated as a live product before the recurring value, billing lifecycle, delivery assets, and failure handling are verified.

The current one-time Prestige ladder remains unchanged and live. Do not rebuild it to add subscriptions.

## 2. Current Verified Production State
- Live Stripe account currently has **zero active recurring prices** at the audited checkpoint.
- Current production website is one-time-purchase only.
- Current hourly `Digital Product Fulfillment` automation handles one-time Stripe Checkout Sessions and mapped Shopify paid orders.
- The four proposed monthly prices reported by another agent — Essentials $19/mo, Choice $39/mo, Pro $79/mo, Premium $149/mo — existed only as sandbox concepts at audit time and are **not live offers**.
- Reported staged subscription markdown/HTML files from the other agent were not present in the shared ChatGPT conversation files or persistent Library, so their contents are not approved source material.

## 3. Stripe Architecture — Approved Technical Pattern
Use:
- Stripe-hosted Payment Links / Checkout for signup.
- Flat-rate monthly recurring prices.
- Charge at signup; no free trial unless Jason later explicitly approves one.
- Stripe Customer Portal for payment-method updates and cancellation/self-service.
- Stripe Smart Retries + Stripe failed-payment customer emails for default revenue recovery.

Do **not** provision access merely because a Stripe Subscription object was created.

## 4. Correct Event / Polling Logic
The system may continue using the existing hourly watcher rather than a real-time webhook for the MVP, provided it polls the equivalent Stripe objects/events and uses the same state rules below.

### A. New paid signup
**Safe signal:** a subscription-mode Checkout Session that is completed and whose payment / first invoice is confirmed paid, or the successful first `invoice.paid` event.

**Never use `customer.subscription.created` alone as proof of payment.**

Suggested initial fulfillment key:
- Primary: `checkout_session.id` for the first signup delivery.
- Store/reference: `subscription.id` as the membership relationship ID.
- If fulfillment is driven from first invoice instead, use `invoice.id` as the idempotency key.

### B. Successful monthly renewal
**Canonical signal:** `invoice.paid` for the recurring subscription invoice.

**Renewal idempotency key:** `invoice.id`.

Do **not** dedupe renewals on `subscription.id`. A subscription keeps the same ID across billing periods; using it as the dedupe key would allow month one and incorrectly suppress every later monthly delivery.

### C. Failed monthly payment
**Signal:** `invoice.payment_failed`.

Rules:
- Do not deliver the new month's paid asset while the invoice remains unpaid.
- Let Stripe Smart Retries and failed-payment emails run by default.
- If the same invoice later becomes paid, the normal `invoice.paid` path may fulfill it once using that invoice ID.

### D. Cancellation
Track subscription cancellation state / cancel-at-period-end.

Rules:
- Cancel-at-period-end keeps the member entitled through the already-paid period.
- Stop future monthly deliveries after the paid entitlement period ends.
- Immediate cancellation should not create an automatic refund unless a separate approved refund policy/action says so.
- Preferred customer self-service path: Stripe Customer Portal.

### E. Upgrade / downgrade
Do not implement plan switching until tier entitlements are defined. When implemented:
- Use Stripe Customer Portal if supported by the final plan configuration.
- Preserve a stable `subscription.id` relationship.
- Determine the tier for each paid invoice from the invoice/subscription price/product, not from stale local assumptions.
- Decide proration behavior explicitly before enabling customer plan changes.

## 5. Dedupe / Audit Trail
Every delivery email must contain machine-searchable references.

New signup email body:
- `Subscription reference: sub_...`
- `Signup order reference: cs_...` OR `Invoice reference: in_...`
- `Tier: essentials|choice|pro|premium`

Renewal email body:
- `Subscription reference: sub_...`
- `Invoice reference: in_...`
- `Tier: ...`
- `Membership period: YYYY-MM`

Before any send:
1. Search Gmail Sent for the exact fulfillment key.
2. If already found, skip.
3. Fetch the mapped Drive asset.
4. Verify expected filename and byte size/hash when known.
5. Send once.
6. Notify Jason only after a real new fulfillment succeeds.

## 6. Offer Definition — REQUIRED BEFORE LIVE STRIPE CREATION
No recurring product may be mirrored into live Stripe until these are written and approved for every tier:
- Exact recurring monthly price.
- Exact monthly deliverable(s).
- Exact first-month signup deliverable(s).
- Delivery cadence/date.
- What higher tiers include from lower tiers.
- Upgrade/downgrade rules.
- Cancellation / access-end behavior.
- Failed-payment behavior.
- Refund policy for digital memberships.
- What happens if a planned monthly asset is delayed.
- Support expectations.

## 7. Existing Assets — What Is Actually Verified
### Verified one-time paid packages
- Prestige Essentials v1.0 — real package mapped to Drive and live one-time Stripe checkout.
- Prestige Choice v1.0 — real package mapped to Drive and live one-time Stripe checkout.
- Prestige Pro v1.0 — real package mapped to Drive and live one-time Stripe checkout.
- Prestige Premium v1.1 — real package mapped to Drive and live one-time Stripe checkout.
- Contractor Business OS Starter V1 — separate real $19 one-time bundle mapped to Drive.

### Standalone add-on catalog
The Launch Control Center / storefront review lists the following planned or review-listed standalones:
- Contractor Estimate & Proposal Kit — $12.99
- Job Cost & Profit Tracker — $19.99
- Change Order & Payment Protection Pack — $14.99
- Lead & Follow-Up Tracker — $14.99
- Material Takeoff & Labor Log — $17.99
- Contractor Field Forms Pack — $14.99
- Labor Rate & Break-Even Calculator — $17.99
- Contractor Follow-Up Script Pack — $9.99
- Product Photo Prompt Pack — $9.99

**Audit correction:** the catalog names package filenames, but the corresponding sellable ZIPs were not recovered in the shared Library during the 2026-08-19 audit. Do not promise or fulfill these as existing deliverables until the actual package file is recovered or rebuilt and QA'd.

## 8. Recommended Sustainable Membership Structure — PROPOSAL ONLY
This is a product-design proposal, not an approved live price/offer.

### Essentials Monthly — proposed $19/mo
- One practical contractor template/checklist/tool each month.
- One concise implementation/tip sheet.
- Access to that month's Essentials member drop.

### Choice Monthly — proposed $39/mo
- Everything in Essentials Monthly.
- One additional customer/admin asset such as a script pack, payment/checklist pack, or follow-up tool.

### Pro Monthly — proposed $79/mo
- Everything in Choice Monthly.
- One advanced operations/profit asset or integrated workbook enhancement each month.
- One monthly implementation worksheet focused on estimating, job cost, production, or collections.

### Premium Monthly — proposed $149/mo
- Everything in Pro Monthly.
- Full monthly business-operations drop: advanced system/tool + scripts/checklists + implementation guide.
- Priority access to newly released Prestige contractor-business assets during the paid membership period.

Do not advertise unlimited consulting, legal advice, custom estimating, guaranteed income, or personalized contractor compliance review as membership benefits.

## 9. Month-One Launch Gate
Before creating live recurring Stripe Payment Links, there must be a real `MONTH_01` folder/package for each tier or a clearly defined cumulative package structure.

Minimum acceptable first-month proof:
- Exact files exist.
- Files open correctly.
- No placeholder/beta text.
- README states membership tier and month.
- License is consistent.
- ZIP name/version is final.
- File is uploaded privately to Drive.
- Drive ID + expected filename + expected byte size/hash are recorded.
- Test delivery email can attach/retrieve the exact file.

## 10. Live-Launch Sequence
1. Finish and QA month-one assets.
2. Jason approves recurring prices and public benefit wording.
3. Create four recurring live Stripe products/prices/Payment Links.
4. Add stable `tier=essentials|choice|pro|premium` metadata where supported.
5. Configure Customer Portal and Stripe customer/recovery emails.
6. Extend hourly fulfillment watcher using the rules in this file.
7. Add the monthly section to `digital-products.html` while preserving the one-time ladder.
8. Add clear recurring-billing / cancel language to the page and relevant terms/privacy pages.
9. Deploy to Vercel and verify production HTML/links.
10. Run a controlled end-to-end paid subscription test.
11. Confirm first signup delivery and dedupe.
12. Test a renewal-equivalent invoice path before describing monthly fulfillment as proven.
13. Only then drive traffic to monthly memberships.

## 11. Evidence Standard
Never call the monthly membership system `LIVE`, `AUTOMATED`, or `VERIFIED` until:
- live recurring prices exist in the connected Stripe account;
- production page contains the real live links;
- first-month tier assets exist and are mapped;
- signup delivery logic is active;
- at least one controlled paid signup succeeds end-to-end;
- renewal delivery logic has been tested without duplicate sends.
