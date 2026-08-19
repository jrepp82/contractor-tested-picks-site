# Prestige Monthly Memberships — Production Automation & Launch Specification

**Status:** LIVE COMPONENTS VERIFIED / M01-M04 MAPPED / FIRST PAID CUSTOMER-JOURNEY PROOF PENDING  
**Updated:** 2026-08-19  
**Owner:** Forge / ChatGPT

## 1. Purpose
This is the production source of truth for Prestige monthly memberships. Preserve live one-time products, standalone products and Shopify mappings while operating the recurring system. Do not duplicate working Stripe products/links or mapped Drive packages unless a verified defect requires a controlled version change.

## 2. Live Stripe Memberships
Connected live Stripe account: `acct_1TwJUgJkrg28KsFA`.

| Tier | Monthly price | Product | Price | Payment Link |
|---|---:|---|---|---|
| Essentials | $19 | `prod_V6M9GJCytR9Cu7` | `price_1U69RSJkrg28KsFAXc7xCGlG` | `plink_1U69SgJkrg28KsFASlFzmDxw` |
| Choice | $39 | `prod_V6MA1rXYKcIIOc` | `price_1U69RiJkrg28KsFAiSeSJfRz` | `plink_1U69SwJkrg28KsFAJp40W2lt` |
| Pro | $79 | `prod_V6MAWHYuBrlZ71` | `price_1U69RxJkrg28KsFAe02oEpSy` | `plink_1U69TCJkrg28KsFAVLZMFhTC` |
| Premium | $149 | `prod_V6MAZiJKdPsdMv` | `price_1U69SCJkrg28KsFATJW4QjtN` | `plink_1U69TQJkrg28KsFAArCHlhdT` |

All four are active `livemode:true`, USD monthly recurring prices with no trial.

## 3. Fulfillment Engine
Enabled automation:
- `Digital Product + Membership Fulfillment`
- ID `6a7660320e308191aec8cab859c03046`
- hourly condition watch

It preserves one-time Stripe and mapped Shopify fulfillment and handles monthly membership delivery.

## 4. Canonical Membership Rule
- Membership identity = Stripe `subscription.id`.
- Unique paid-cycle delivery key = PAID Stripe `invoice.id`.
- Subscriber month index = successful PAID subscription-invoice sequence: first=M01, second=M02, third=M03, fourth=M04, etc.
- Failed/unpaid/void invoices do not advance the sequence.
- Never dedupe on subscription ID alone or subscription + calendar month.
- Never deliver paid content before confirming the paid invoice.

Every successful membership delivery email must include:
- `Invoice fulfillment: <INVOICE_ID>`
- `Membership subscription: <SUBSCRIPTION_ID>`
- `Subscriber month: M<NN>`

## 5. Canonical Package Map
### M01 — first successful paid subscription invoice
M01 is one complete welcome package; do not send a separate onboarding ZIP plus a second M01 ZIP.
- Essentials `11ESOS7CLlZ4vKDU3RH654q1v9tfmc56M` — `Prestige_Essentials_M01_2026-08_v1.0.zip`
- Choice `1s0Zz85lLgYfYUK9eBjqXNTJXOqzvoCf6` — `Prestige_Choice_M01_2026-08_v1.0.zip`
- Pro `1GsY358Ci6Z_ZVViyux5mZNgava9amELG` — `Prestige_Pro_M01_2026-08_v1.0.zip`
- Premium `1lCEURc_MQsn6IyRJJ6EriUeCzbSvfpvf` — `Prestige_Premium_M01_2026-08_v1.0.zip`

### M02 — second successful paid subscription invoice
- Essentials `15QWA3H152GowyIdWMGTqQByQyyMQdaBC` — `Prestige_Essentials_M02_2026-09_v1.0.zip`
- Choice `1UfhHJYhHPBxD8j7QiT5yMr63OwOdUsMW` — `Prestige_Choice_M02_2026-09_v1.0.zip`
- Pro `1n_tV3XJRXBzbKnx8x3WmT9GVJIM3p1CB` — `Prestige_Pro_M02_2026-09_v1.0.zip`
- Premium `1nMNck6a5Gh9TKN5nRxVBfYLqSlF4Yz7B` — `Prestige_Premium_M02_2026-09_v1.0.zip`

### M03 — third successful paid subscription invoice
- Essentials `1Zd2Zub4L48w5E7RAMBv80FQhEZv1YGsl` — `Prestige_Essentials_M03_2026-10_v1.0.zip`
- Choice `159ccUNCakLeQlmEL7zlUfyyq6fh-PxCy` — `Prestige_Choice_M03_2026-10_v1.0.zip`
- Pro `1uDerxtR50VjB6s8eldWY9UBhdaE9y7TH` — `Prestige_Pro_M03_2026-10_v1.0.zip`
- Premium `1ifdXLG6R6V0X3O2NKA6bkd5AiKOimAyD` — `Prestige_Premium_M03_2026-10_v1.0.zip`

### M04 — fourth successful paid subscription invoice
Built, customer-facing PDF QA performed, functional 13-week workbook smoke-tested, ZIP-integrity tested, uploaded to Drive, persisted in Library, mapped into Stripe product metadata and added to the hourly fulfillment automation.
- Essentials `1nqMDkHoIGBIA-FAuudoGk_aNXbRoVr45` — `Prestige_Essentials_M04_2026-11_v1.0.zip`
- Choice `15M_8oAhgeHILaM7CXlnPlyX8HDsqAKWY` — `Prestige_Choice_M04_2026-11_v1.0.zip`
- Pro `1a_EAuchCZH5vILp2nK4iZavim5DFHtQ2` — `Prestige_Pro_M04_2026-11_v1.0.zip`
- Premium `1Rm7RLT6WlMHczIj-UAE83GOthILaxfdB` — `Prestige_Premium_M04_2026-11_v1.0.zip`

M04 theme: **Cash Collection + Schedule Control**.
Tier inheritance:
- Essentials: 5 Ways to Get Paid Faster Without Being Pushy + Friday Cash Closeout Checklist.
- Choice: Essentials + Deposit → Progress Payment → Final Payment workflow training.
- Pro: Choice + 20-prompt Cash/Schedule AI Expansion #3 + functional 13-Week Contractor Cash Forecast workbook.
- Premium: Pro + Premium Weekly Cash-Control Meeting SOP.

The 13-week workbook passed a live-number smoke test: week-to-week cash rollover, net cash flow, minimum cash gap and probability-weighted receivable calculations all reconciled.

## 6. Paid-Invoice Fulfillment Procedure
1. Resolve tier, subscription and purchaser email from a verified paid membership invoice.
2. Search Gmail Sent for `Invoice fulfillment: <INVOICE_ID>`; skip if found.
3. Count successful paid subscription invoices chronologically to determine M01/M02/M03/M04/etc.
4. Map tier + subscriber month to the canonical Drive ZIP.
5. If unmapped, never substitute an older package; notify Jason with customer, tier, invoice ID, subscription ID and missing subscriber month.
6. Fetch the exact mapped ZIP and verify filename.
7. Send exactly one package for that invoice.
8. Include the searchable invoice/subscription/subscriber-month lines above.

## 7. Failed Payment / Cancellation
- Never deliver new paid content while the billing cycle is unpaid.
- At most one payment-attention notice per subscription + failing invoice.
- If the same invoice later becomes paid, it may fulfill once with that invoice ID.
- For verified cancellation/cancel-at-period-end, future drops stop after paid access ends; previously delivered files remain under their license.
- Never cancel subscriptions automatically unless Jason explicitly requests it.

## 8. Website State
Production `digital-products.html` has the four live membership links. Some explanatory copy still describes an older separate onboarding+drop model. This spec and the fulfillment automation are canonical. Any copy fix must be surgical and preserve live URLs/prices.

## 9. Customer Portal Gap
As of 2026-08-19, Stripe returned zero active Billing Portal configurations. Do not claim Customer Portal is live.
Desired eventual settings: payment-method update ON, invoice history ON, cancellation ON.

## 10. Evidence Boundary
Latest live subscription audit returned zero subscriptions. Products, prices, links, M01-M04 packages, Stripe metadata and automation are verified present, but no real paid membership has yet exercised the final delivery path. Do not manufacture proof.

## 11. Next Production Work
1. Build, QA, upload and map M05 for all four tiers.
2. Build and map M06 immediately afterward.
3. Monitor the first legitimate paid membership invoice and audit actual delivery/dedupe behavior.
4. Configure/verify Customer Portal when a writable Stripe surface becomes available.
5. Preserve every existing one-time, standalone and Shopify fulfillment mapping while continuing membership work.
