# Prestige Monthly Memberships — Production Automation & Launch Specification

**Status:** LIVE / M01-M06 BUILT AND MAPPED / FIRST REAL PAID MEMBERSHIP PROOF PENDING  
**Updated:** 2026-08-19  
**Owner:** Forge / ChatGPT

## Live memberships
Stripe account: `acct_1TwJUgJkrg28KsFA`

| Tier | Price | Product | Recurring Price | Payment Link |
|---|---:|---|---|---|
| Essentials | $19/mo | `prod_V6M9GJCytR9Cu7` | `price_1U69RSJkrg28KsFAXc7xCGlG` | `plink_1U69SgJkrg28KsFASlFzmDxw` |
| Choice | $39/mo | `prod_V6MA1rXYKcIIOc` | `price_1U69RiJkrg28KsFAiSeSJfRz` | `plink_1U69SwJkrg28KsFAJp40W2lt` |
| Pro | $79/mo | `prod_V6MAWHYuBrlZ71` | `price_1U69RxJkrg28KsFAe02oEpSy` | `plink_1U69TCJkrg28KsFAVLZMFhTC` |
| Premium | $149/mo | `prod_V6MAZiJKdPsdMv` | `price_1U69SCJkrg28KsFATJW4QjtN` | `plink_1U69TQJkrg28KsFAArCHlhdT` |

All four were independently verified active, `livemode:true`, monthly recurring.

## Fulfillment engine
- Automation: `Digital Product + Membership Fulfillment`
- ID: `6a7660320e308191aec8cab859c03046`
- Cadence: hourly condition watch
- One-time products, mapped Shopify orders and memberships share the same watcher.

## Canonical membership identity and idempotency
- Membership identity = Stripe `subscription.id`.
- Unique delivery key = PAID Stripe `invoice.id`.
- Subscriber month = chronological count of successful PAID subscription invoices for that subscription.
- First paid invoice = M01, second = M02, etc.
- Failed, unpaid and void invoices do not advance the subscriber month.
- Never dedupe monthly fulfillment on subscription ID alone or subscription + calendar month.

Every successful membership delivery email must include:
- `Invoice fulfillment: <INVOICE_ID>`
- `Membership subscription: <SUBSCRIPTION_ID>`
- `Subscriber month: M<NN>`

## Dynamic package lookup
All four live membership products use metadata schema `subscriber_month_sequence_v1`.

For each prepared subscriber month, the Stripe product contains:
- `mNN_drive_id` = canonical private Google Drive ZIP ID
- `mNN_file` = exact expected ZIP filename

All four products currently have M01-M06 metadata and `max_mapped_month=6`.

The watcher determines subscriber month from paid-invoice sequence, then dynamically reads `mNN_drive_id` + `mNN_file` from the matching membership product. This replaces the older fragile hard-coded month table.

Canonical M01-M06 Drive IDs and filenames are maintained in `MEMBERSHIP_RELEASE_MAP_M01_M06.md`.

## Fulfillment procedure
For each PAID invoice tied to a verified membership price/product:
1. Resolve customer email, subscription, product/tier and paid invoice ID.
2. Search Gmail Sent for `Invoice fulfillment: <INVOICE_ID>`; if found, skip.
3. Count successful paid invoices for the subscription to calculate subscriber month MNN.
4. Retrieve the live Stripe membership product.
5. Read `mNN_drive_id` and `mNN_file`.
6. If either is absent or subscriber month exceeds `max_mapped_month`, never substitute an older package. Notify Jason with customer, tier, invoice ID, subscription ID and missing month.
7. Fetch the exact Drive file and verify its filename matches `mNN_file`.
8. Send exactly one package and include the searchable invoice/subscription/month lines.

M01 is the complete welcome package; do not send a separate onboarding ZIP plus M01.

## M01-M06 production state
- M01: welcome/core system
- M02: second-cycle member package
- M03: pricing/profit/referral + 90-Day Profit Review for Pro/Premium
- M04: cash collection/schedule control + functional 13-Week Cash Forecast
- M05: estimate conversion/scope control + functional Estimate Win/Loss Analytics
- M06: active job health/margin rescue/closeout + functional Active Job Health workbook + Premium Six-Month Owner Review

M03-M06 were built as real customer files, visually QA'd, workbook-formula tested where applicable, ZIP-integrity tested, uploaded to Drive, persisted in the ChatGPT Library, mapped into Stripe product metadata and mapped into the hourly fulfillment system.

M06 workbook QA specifically passed one GREEN active job at 40.9% projected margin, one RED job at 10%, reconciled portfolio totals/unpaid balances/health-count values, and a closeout case at 33.3% gross margin. Final error scan returned zero spreadsheet formula errors.

## Payment failure and cancellation
- Never deliver new paid content for an unpaid cycle.
- For verified failed/past-due billing, send at most one payment-attention email per subscription + failing invoice.
- If that invoice later becomes paid, it may fulfill exactly once using the paid invoice ID.
- For verified cancellation or `cancel_at_period_end`, future drops stop after paid access ends; previously delivered files remain usable under their license.
- Never cancel a subscription automatically unless Jason explicitly requests it.

## Customer Portal gap
Stripe API audit on 2026-08-19 returned zero active Billing Portal configurations. Do not claim the Customer Portal is live.
Desired eventual settings: payment-method update ON, invoice history ON, subscription cancellation ON.

## Evidence boundary
Latest live Stripe subscription audit on 2026-08-19 returned zero subscriptions. The products, recurring prices, Payment Links, M01-M06 packages, Stripe metadata and hourly fulfillment logic are verified present, but a real paid membership invoice has not yet exercised the delivery path. Do not manufacture proof.

## Next production work
1. Monitor the first real membership invoice / one-time purchase and audit actual delivery immediately.
2. Drive qualified traffic to the already-live funnel.
3. Build M07 before any seventh paid renewal could occur; use the same full build → QA → Drive → Library → Stripe metadata lifecycle.
4. Configure and verify Customer Portal when a writable Stripe surface is available.
5. Preserve all one-time, standalone and Shopify fulfillment mappings while continuing recurring work.
