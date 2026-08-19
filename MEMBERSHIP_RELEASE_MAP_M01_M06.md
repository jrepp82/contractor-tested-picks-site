# Prestige Select Membership Release Map — M01 through M06

**Updated:** 2026-08-19  
**Canonical fulfillment schema:** `subscriber_month_sequence_v1`

## Fulfillment identity
- Membership identity: Stripe `subscription.id`
- Unique delivery key: PAID Stripe `invoice.id`
- Subscriber month: chronological count of successful paid subscription invoices
- Stripe product metadata keys: `mNN_drive_id` + `mNN_file`
- `max_mapped_month=6` on all four live membership products as of this release

## M01 — Welcome / Core System
| Tier | Drive ID | File |
|---|---|---|
| Essentials | `11ESOS7CLlZ4vKDU3RH654q1v9tfmc56M` | `Prestige_Essentials_M01_2026-08_v1.0.zip` |
| Choice | `1s0Zz85lLgYfYUK9eBjqXNTJXOqzvoCf6` | `Prestige_Choice_M01_2026-08_v1.0.zip` |
| Pro | `1GsY358Ci6Z_ZVViyux5mZNgava9amELG` | `Prestige_Pro_M01_2026-08_v1.0.zip` |
| Premium | `1lCEURc_MQsn6IyRJJ6EriUeCzbSvfpvf` | `Prestige_Premium_M01_2026-08_v1.0.zip` |

## M02 — Second Paid Cycle
| Tier | Drive ID | File |
|---|---|---|
| Essentials | `15QWA3H152GowyIdWMGTqQByQyyMQdaBC` | `Prestige_Essentials_M02_2026-09_v1.0.zip` |
| Choice | `1UfhHJYhHPBxD8j7QiT5yMr63OwOdUsMW` | `Prestige_Choice_M02_2026-09_v1.0.zip` |
| Pro | `1n_tV3XJRXBzbKnx8x3WmT9GVJIM3p1CB` | `Prestige_Pro_M02_2026-09_v1.0.zip` |
| Premium | `1nMNck6a5Gh9TKN5nRxVBfYLqSlF4Yz7B` | `Prestige_Premium_M02_2026-09_v1.0.zip` |

## M03 — Pricing / Profit / Referral
| Tier | Drive ID | File |
|---|---|---|
| Essentials | `1Zd2Zub4L48w5E7RAMBv80FQhEZv1YGsl` | `Prestige_Essentials_M03_2026-10_v1.0.zip` |
| Choice | `159ccUNCakLeQlmEL7zlUfyyq6fh-PxCy` | `Prestige_Choice_M03_2026-10_v1.0.zip` |
| Pro | `1uDerxtR50VjB6s8eldWY9UBhdaE9y7TH` | `Prestige_Pro_M03_2026-10_v1.0.zip` |
| Premium | `1ifdXLG6R6V0X3O2NKA6bkd5AiKOimAyD` | `Prestige_Premium_M03_2026-10_v1.0.zip` |

## M04 — Cash Collection + Schedule Control
| Tier | Drive ID | File |
|---|---|---|
| Essentials | `1nqMDkHoIGBIA-FAuudoGk_aNXbRoVr45` | `Prestige_Essentials_M04_2026-11_v1.0.zip` |
| Choice | `15M_8oAhgeHILaM7CXlnPlyX8HDsqAKWY` | `Prestige_Choice_M04_2026-11_v1.0.zip` |
| Pro | `1a_EAuchCZH5vILp2nK4iZavim5DFHtQ2` | `Prestige_Pro_M04_2026-11_v1.0.zip` |
| Premium | `1Rm7RLT6WlMHczIj-UAE83GOthILaxfdB` | `Prestige_Premium_M04_2026-11_v1.0.zip` |

## M05 — Estimate Conversion + Scope Control
| Tier | Drive ID | File |
|---|---|---|
| Essentials | `1ZQxdwAuC_XOEV4yrVPOJuc3Zl9Rt7JUA` | `Prestige_Essentials_M05_2026-12_v1.0.zip` |
| Choice | `18Uj_OLu51-7L2EsPGRD6h-Ayne_F_ER-` | `Prestige_Choice_M05_2026-12_v1.0.zip` |
| Pro | `1syhJ-95Kpr0nqk-UYru1f2NrQgR-psgB` | `Prestige_Pro_M05_2026-12_v1.0.zip` |
| Premium | `1IBvE4hWTSRJagBnI1Vg4uXsMMurHAGO_` | `Prestige_Premium_M05_2026-12_v1.0.zip` |

## M06 — Active Job Health + Margin Rescue + Closeout
| Tier | Drive ID | File |
|---|---|---|
| Essentials | `1bMlV-340h2GWTGU-KmHvq0T8CNJRs8ML` | `Prestige_Essentials_M06_2027-01_v1.0.zip` |
| Choice | `1GmfIUO2OYK-HGwcEIfSOuarfCpvHxhC_` | `Prestige_Choice_M06_2027-01_v1.0.zip` |
| Pro | `1c6wQDAETljmidXui4TWzmyp0ksESfQff` | `Prestige_Pro_M06_2027-01_v1.0.zip` |
| Premium | `1Y-QiEY3pj9jWFzRiRPESgT9Ub0j9bYy4` | `Prestige_Premium_M06_2027-01_v1.0.zip` |

M06 includes, by tier inheritance:
- Essentials: Job Start Readiness + Punch/Closeout/Profit checklists
- Choice: Essentials + Active-Job Communication & Change-Control workflow
- Pro: Choice + AI Job-Health Expansion #5 + functional Active Job Health & Margin Rescue workbook
- Premium: Pro + Six-Month Owner Review

M06 workbook QA passed on 2026-08-19 using two active-job scenarios: one GREEN job with 40.9% projected margin, one RED job at 10% projected margin, reconciled portfolio totals/unpaid balances/health counts, and a closeout case at 33.3% gross margin. Final formula-error scan returned zero spreadsheet errors.

## Production storage
- All M01-M06 release ZIPs are in Google Drive for automated fulfillment.
- M01-M06 release ZIPs are also persisted in the ChatGPT Library under `/Prestige Select/Digital Products/Membership Releases/`.
- The hourly fulfillment watcher reads `mNN_drive_id` and `mNN_file` dynamically from the live Stripe membership product metadata.

## Next cycle
M07 is not yet built. Do not deliver an older package for an unmapped seventh paid invoice. Build, QA, upload, persist and add `m07_drive_id` + `m07_file` before M07 is marked ready.