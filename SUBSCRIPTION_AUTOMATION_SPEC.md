# Prestige Monthly Memberships — Production Automation & Launch Specification

**Status:** LIVE COMPONENTS VERIFIED / M01-M03 MAPPED / FIRST PAID CUSTOMER-JOURNEY PROOF PENDING  
**Updated:** 2026-08-19  
**Owner:** Forge / ChatGPT

## 1. Purpose
This file is the production source of truth for Prestige monthly memberships. Preserve the live one-time ladder, standalone products and Shopify mappings while operating the recurring system.

Do not rebuild or duplicate live Stripe products, prices, Payment Links or mapped Drive packages unless a verified defect requires a controlled version change.

## 2. Live Stripe Memberships
Connected live Stripe account: `acct_1TwJUgJkrg28KsFA`.

| Tier | Monthly price | Product | Price | Payment Link |
|---|---:|---|---|---|
| Essentials | $19 | `prod_V6M9GJCytR9Cu7` | `price_1U69RSJkrg28KsFAXc7xCGlG` | `plink_1U69SgJkrg28KsFASlFzmDxw` |
| Choice | $39 | `prod_V6MA1rXYKcIIOc` | `price_1U69RiJkrg28KsFAiSeSJfRz` | `plink_1U69SwJkrg28KsFAJp40W2lt` |
| Pro | $79 | `prod_V6MAWHYuBrlZ71` | `price_1U69RxJkrg28KsFAe02oEpSy` | `plink_1U69TCJkrg28KsFAVLZMFhTC` |
| Premium | $149 | `prod_V6MAZiJKdPsdMv` | `price_1U69SCJkrg28KsFATJW4QjtN` | `plink_1U69TQJkrg28KsFAArCHlhdT` |

All four are active `livemode:true`, flat-rate USD monthly recurring prices with no trial.

## 3. Fulfillment Engine
Enabled hourly condition-watch automation:
- Title: `Digital Product + Membership Fulfillment`
- ID: `6a7660320e308191aec8cab859c03046`
- Cadence: hourly

This same watcher preserves one-time Stripe and mapped Shopify fulfillment while handling monthly memberships.

## 4. Canonical Idempotency / Subscriber-Month Rule
**Membership identity:** Stripe `subscription.id`.

**Unique paid-cycle delivery key:** Stripe PAID `invoice.id`.

**Subscriber month index:** chronological count of successful PAID subscription invoices for that subscription:
- first paid subscription invoice = M01
- second = M02
- third = M03
- fourth = M04
- etc.

Failed, unpaid and void invoices do not advance the subscriber month.

Never:
- dedupe monthly delivery on subscription ID alone;
- dedupe on subscription ID + calendar month;
- use calendar month as a substitute for paid-cycle sequence;
- deliver paid content merely because a subscription or Checkout Session exists without confirming the paid invoice.

Every successful membership delivery email must include these literal searchable lines:
- `Invoice fulfillment: <INVOICE_ID>`
- `Membership subscription: <SUBSCRIPTION_ID>`
- `Subscriber month: M<NN>`

## 5. Canonical Package Map
### M01 — first successful paid subscription invoice
M01 is one complete welcome package. It already includes the tier core product plus Month 1 content and applicable tier bonuses. **Do not send a separate onboarding ZIP plus a second M01 ZIP.**

- Essentials: Drive `11ESOS7CLlZ4vKDU3RH654q1v9tfmc56M` — `Prestige_Essentials_M01_2026-08_v1.0.zip`
- Choice: Drive `1s0Zz85lLgYfYUK9eBjqXNTJXOqzvoCf6` — `Prestige_Choice_M01_2026-08_v1.0.zip`
- Pro: Drive `1GsY358Ci6Z_ZVViyux5mZNgava9amELG` — `Prestige_Pro_M01_2026-08_v1.0.zip`
- Premium: Drive `1lCEURc_MQsn6IyRJJ6EriUeCzbSvfpvf` — `Prestige_Premium_M01_2026-08_v1.0.zip`

### M02 — second successful paid subscription invoice
- Essentials: Drive `15QWA3H152GowyIdWMGTqQByQyyMQdaBC` — `Prestige_Essentials_M02_2026-09_v1.0.zip`
- Choice: Drive `1UfhHJYhHPBxD8j7QiT5yMr63OwOdUsMW` — `Prestige_Choice_M02_2026-09_v1.0.zip`
- Pro: Drive `1n_tV3XJRXBzbKnx8x3WmT9GVJIM3p1CB` — `Prestige_Pro_M02_2026-09_v1.0.zip`
- Premium: Drive `1nMNck6a5Gh9TKN5nRxVBfYLqSlF4Yz7B` — `Prestige_Premium_M02_2026-09_v1.0.zip`

### M03 — third successful paid subscription invoice
Built, formula/visual QA'd where applicable, ZIP-integrity tested, uploaded to Drive, persisted in the ChatGPT Library and mapped into Stripe product metadata + hourly fulfillment.

- Essentials: Drive `1Zd2Zub4L48w5E7RAMBv80FQhEZv1YGsl` — `Prestige_Essentials_M03_2026-10_v1.0.zip`
- Choice: Drive `159ccUNCakLeQlmEL7zlUfyyq6fh-PxCy` — `Prestige_Choice_M03_2026-10_v1.0.zip`
- Pro: Drive `1uDerxtR50VjB6s8eldWY9UBhdaE9y7TH` — `Prestige_Pro_M03_2026-10_v1.0.zip`
- Premium: Drive `1ifdXLG6R6V0X3O2NKA6bkd5AiKOimAyD` — `Prestige_Premium_M03_2026-10_v1.0.zip`

M03 includes, by tier inheritance:
- Essentials: Break-Even Labor Rate in Plain English + Fall/Cold-Weather Contractor Checklist.
- Choice: Essentials material + One Good Job to Three Referrals training.
- Pro: Choice material + Pro AI Local Marketing Expansion #2 + functional 90-Day Profit Review workbook.
- Premium: Pro material + white-label-ready Estimate/Proposal workbook + Premium Pricing/Lead-Conversion Coaching worksheet.

Premium white-label rights are limited to the member's own internal/customer-facing rebranding. They do **not** grant resale, redistribution, sublicensing or competing-product rights.

## 6. Paid-Invoice Fulfillment Procedure
For each paid invoice tied to a verified Prestige membership price/product:
1. Resolve subscription, tier and purchaser email.
2. Search Gmail Sent for `Invoice fulfillment: <INVOICE_ID>`. If found, skip.
3. Count successful PAID invoices for that subscription chronologically to determine M01/M02/M03/etc.
4. Look up tier + subscriber month in the canonical map.
5. If the month is not mapped, do not substitute an older package. Notify Jason with customer email, tier, invoice ID, subscription ID and missing subscriber month.
6. Fetch the exact mapped Drive ZIP and verify its expected filename.
7. Send exactly one package for that paid cycle.
8. Include the searchable invoice/subscription/subscriber-month lines above.

## 7. Failed Payment
For `past_due`, unpaid or otherwise failed membership billing:
- deliver no new paid package;
- send at most one concise payment-attention notice per subscription + failing invoice;
- if that same invoice later becomes paid, it may fulfill exactly once using that invoice ID.

## 8. Cancellation
For verified canceled or `cancel_at_period_end` state:
- future drops stop after paid access ends;
- previously delivered files remain usable under their license;
- do not cancel subscriptions automatically unless Jason explicitly requests it.

## 9. Website State
Production `digital-products.html` contains the four live membership links. Some explanatory wording may still describe the older separate onboarding+drop model. That wording is stale; the fulfillment engine and this spec are canonical. Any copy cleanup must be surgical and must preserve working links/prices.

## 10. Customer Portal Gap
As of 2026-08-19 Stripe returned zero active Billing Portal configurations. Do not claim Customer Portal is live.

Desired live settings when configuration becomes writable/available:
- update payment method ON
- invoice history ON
- cancel subscription ON

## 11. Evidence Boundary
Latest live subscription audit on 2026-08-19 returned zero subscriptions. Therefore products, prices, Payment Links, M01-M03 Drive packages, Stripe metadata and hourly fulfillment logic are verified present, but a real paid membership delivery has not yet exercised the path.

Do not manufacture proof. The first legitimate paid membership invoice is the production proof event.

## 12. Next Production Work
1. Build, QA, upload and map M04 for all four tiers.
2. Continue M05 and M06 immediately afterward so the content engine remains ahead of billing cycles.
3. Monitor for the first real paid invoice and audit actual delivery/dedupe behavior.
4. Configure/verify Stripe Customer Portal when a writable surface becomes available.
5. Preserve all existing one-time/standalone/Shopify fulfillment mappings while doing the above.
