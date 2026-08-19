# Prestige Monthly Memberships — Production Automation & Launch Specification

**Status:** LIVE COMPONENTS VERIFIED / FIRST PAID CUSTOMER-JOURNEY PROOF PENDING  
**Updated:** 2026-08-19  
**Owner:** Forge / ChatGPT

## 1. Purpose
This file is the production source of truth for Prestige monthly memberships. Preserve the existing one-time Prestige ladder and Shopify mappings while operating the recurring membership system.

Do not rebuild or duplicate live Stripe products, prices, Payment Links, Drive member drops, or the live monthly website section unless a verified defect requires a change.

## 2. Current Verified Production State
The connected live Stripe account `acct_1TwJUgJkrg28KsFA` has four active recurring monthly products/prices and four active subscription Payment Links:

| Tier | Monthly price | Product | Price | Payment Link |
|---|---:|---|---|---|
| Essentials Monthly | $19 | `prod_V6M9GJCytR9Cu7` | `price_1U69RSJkrg28KsFAXc7xCGlG` | `plink_1U69SgJkrg28KsFASlFzmDxw` |
| Choice Monthly | $39 | `prod_V6MA1rXYKcIIOc` | `price_1U69RiJkrg28KsFAiSeSJfRz` | `plink_1U69SwJkrg28KsFAJp40W2lt` |
| Pro Monthly | $79 | `prod_V6MAWHYuBrlZ71` | `price_1U69RxJkrg28KsFAe02oEpSy` | `plink_1U69TCJkrg28KsFAVLZMFhTC` |
| Premium Monthly | $149 | `prod_V6MAZiJKdPsdMv` | `price_1U69SCJkrg28KsFATJW4QjtN` | `plink_1U69TQJkrg28KsFAArCHlhdT` |

All four are live, active, USD, flat-rate monthly recurring prices with no trial.

The production `digital-products.html` contains the live `#monthly-memberships` section with those four live Stripe subscription links and recurring-billing language.

The existing one-time ladder remains live and unchanged.

## 3. Fulfillment Architecture
The membership MVP uses the enabled hourly ChatGPT condition-watch automation:

- Title: `Digital Product + Membership Fulfillment`
- Jawbone ID: `6a7660320e308191aec8cab859c03046`
- Cadence: hourly
- One-time Stripe and mapped Shopify fulfillment logic remains preserved.
- Monthly membership fulfillment is added to that same watcher.

There is no requirement to add a site-side webhook before the MVP can operate. A future webhook implementation may replace or supplement polling, but it must preserve the same payment-state and idempotency rules below.

## 4. Canonical Membership Payment Rule
### Paid Invoice ID is the unique membership delivery key
For the first paid membership cycle and every renewal cycle:

**Canonical successful signal:** a Stripe invoice that is confirmed `paid` for a known membership subscription.

**Canonical fulfillment/idempotency key:** `invoice.id` (`in_...`).

Never use only `subscription.id` as a membership delivery key. A subscription keeps the same ID across months and would suppress later legitimate deliveries.

Do not use `subscription.id + month` as the canonical idempotency key either. Month may be useful for asset selection, but the actual paid Stripe Invoice ID is the unique delivery key and must be recorded in the delivery email.

Do not provision membership content merely because `customer.subscription.created` or `checkout.session.completed` exists. First confirm the paid invoice.

## 5. Initial Paid Signup
For a completed membership Checkout Session:
1. Resolve the subscription and first invoice.
2. Require a paid invoice, purchaser email, known membership product/price, and subscription ID.
3. Determine tier from current Stripe product/price/metadata.
4. Determine the member-drop month from the paid invoice billing period / paid timestamp in `America/Chicago`.
5. Search Gmail Sent for exact literal `Invoice reference: <PAID_INVOICE_ID>`.
6. If found in a prior membership fulfillment email, skip.
7. Verify the tier onboarding ZIP and correct month/tier member-drop ZIP.
8. Send both onboarding + current monthly drop once.
9. Include machine-searchable lines:
   - `Membership subscription: <SUBSCRIPTION_ID>`
   - `Invoice reference: <PAID_INVOICE_ID>`
   - `Member drop: <YYYY-MM>`

If the month is unmapped, never substitute an older drop. Notify Jason with the customer, tier, invoice ID, subscription ID, and missing month.

## 6. Paid Monthly Renewal
For each paid subscription invoice:
1. Require membership metadata / a known membership product and tier.
2. Use that invoice's `invoice.id` as the only renewal delivery key.
3. Search Gmail Sent for exact literal `Invoice reference: <PAID_INVOICE_ID>`.
4. If already found, skip.
5. Determine the correct member-drop month.
6. Verify the mapped tier/month ZIP.
7. Send only the new monthly drop; do not resend onboarding.
8. Include subscription ID, paid invoice ID, and member-drop month in the email.

## 7. Failed Payment
**Signal/state:** an invoice is verified `past_due`, `unpaid`, or otherwise failed/unpaid.

Rules:
- Do not deliver a new paid monthly drop while that invoice remains unpaid.
- Payment-attention notices dedupe on the failing Invoice ID.
- If that same invoice later becomes paid, the normal paid-invoice path can fulfill it exactly once using that Invoice ID.
- Stripe Smart Retries / Stripe customer recovery should remain the default recovery layer when enabled.

## 8. Cancellation
Track verified canceled / `cancel_at_period_end` subscription states.

Rules:
- Paid access continues through the already-paid entitlement period unless Stripe state says otherwise.
- Future monthly drops stop after paid access ends.
- Previously delivered files remain usable under the membership license.
- Do not cancel subscriptions automatically unless Jason explicitly directs it.

## 9. Monthly Drop Map
### 2026-08
- Essentials: Drive `1G7wcTpHMOa2WHK4Epe2GaxiMF28iI8iX` — `Prestige_Essentials_Monthly_August_2026_Member_Drop.zip` — 103,693 bytes
- Choice: Drive `1tOXhwLTIDeTmrzgW7IuKXGPKkHDxZoWH` — `Prestige_Choice_Monthly_August_2026_Member_Drop.zip` — 113,070 bytes
- Pro: Drive `13sTBjPwSbbHMXX92ro-zl7ZkVqBbHEXv` — `Prestige_Pro_Monthly_August_2026_Member_Drop.zip` — 125,606 bytes
- Premium: Drive `1lutq0UmcpxLGjbK2cNEuWo4A5B0lsrjt` — `Prestige_Premium_Monthly_August_2026_Member_Drop.zip` — 143,771 bytes

### 2026-09
- Essentials: Drive `12Khi-zib0kguU3KXYgUous47HLJLKi3P` — `Prestige_Essentials_Monthly_September_2026_Member_Drop.zip` — 90,979 bytes
- Choice: Drive `1qzIuCowxWOKa4gARh5ezwoAJtCa2QZvK` — `Prestige_Choice_Monthly_September_2026_Member_Drop.zip` — 95,943 bytes
- Pro: Drive `17VyV2Q3_zj5z-JZU-xtdw4YnEsSRlSQ4` — `Prestige_Pro_Monthly_September_2026_Member_Drop.zip` — 105,785 bytes
- Premium: Drive `1RT8l4hP5HBIfuuqxJekP1A6mzSIbM7Iw` — `Prestige_Premium_Monthly_September_2026_Member_Drop.zip` — 116,001 bytes

Do not replace these live mapped packages with supplemental/rebuilt files unless a QA failure is documented and the fulfillment mapping is intentionally changed.

## 10. Onboarding ZIP Map
- Essentials: Drive `13hop6iBTkkOymvIFgO3kMK5vf1gMjZPV` — `Prestige_Essentials_v1_0_Digital_Download.zip` — 11,872 bytes
- Choice: Drive `1zUaaiIzErAKtQf2MwJ5-MUcZgzDVQZSn` — `Prestige_Choice_v1_0_Digital_Download.zip` — 14,032 bytes
- Pro: Drive `1WFe1opkdXHsDjNxadWatusyzNuYOkCgT` — `Prestige_Pro_v1_0_Digital_Download.zip` — 21,298 bytes
- Premium: Drive `1WzZgUeoaek5fPnT2H7ozR2vCnFzRSmzh` — `Prestige_Premium_v1_1_Digital_Download.zip` — 45,505 bytes

## 11. Website / Checkout State
Production `digital-products.html` contains:
- one-time Prestige products;
- four Prestige Monthly memberships;
- live Stripe subscription links;
- monthly renewal/cancellation disclosure;
- explanation that first paid cycle receives onboarding + current drop and later paid cycles receive the monthly drop.

Do not create duplicate recurring products or duplicate Payment Links.

## 12. Evidence Standard
As of the latest 2026-08-19 Stripe read, there are **zero completed Checkout Sessions** in the connected live Stripe account.

Therefore:
- the subscription products/prices/Payment Links, website wiring, Drive asset mappings, and hourly fulfillment logic are verified present;
- the corrected paid-Invoice-ID rule is active in the fulfillment automation;
- **a real end-to-end paid membership delivery is not yet proven**, because no live paid membership transaction exists to exercise the path.

Do not manufacture or claim that proof. The next paid membership invoice should be treated as the production proof event and monitored for one-time delivery with no duplicate send.

## 13. Current Next Actions
1. Drive qualified traffic to the live one-time and membership funnel.
2. Monitor for the first completed paid membership invoice.
3. Verify the automation sends the correct onboarding + current drop exactly once using the paid Invoice ID.
4. Verify the first real renewal later sends only the new monthly drop exactly once using that renewal Invoice ID.
5. Keep future monthly drop maps built ahead of billing periods.

## 14. Safety
Never:
- fulfill an unpaid/open/void/refunded membership invoice;
- use subscription ID alone as the membership dedupe key;
- substitute an old monthly drop when a month is missing;
- resend onboarding on renewal;
- duplicate live products/Payment Links merely because an older repo document says they do not exist;
- expose private Drive assets publicly to bypass paid fulfillment.
