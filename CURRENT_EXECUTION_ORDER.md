# Current Execution Order

**Owner:** Forge / ChatGPT  
**Last updated:** 2026-08-19  
**Source of truth:** `CURRENT_EXECUTION_ORDER.md` + `FORGE_PRODUCTION_QUEUE.md` + live Stripe/Drive/GitHub/Vercel evidence.

## Mandatory Startup Rule
At the beginning of every work session, read this file and `FORGE_PRODUCTION_QUEUE.md`. When touching fulfillment or memberships, verify the live automation and Stripe/Drive mappings rather than trusting stale chat summaries.

Resume the highest-priority unfinished Forge task unless Jason explicitly redirects. An interruption does not cancel in-progress work. Completion requires a verifiable deliverable or confirmed external action.

## 1. Digital revenue funnel — LIVE
- Production site: `https://contractor-tested-picks-site.vercel.app`
- Git: `jrepp82/contractor-tested-picks-site`, `main`; Vercel auto-deploy is active.
- Core one-time ladder is live: Essentials $6.99, Choice $16.99, Pro $49.99, Premium v1.1 $99.99.
- Separate Contractor Business OS Starter V1 remains live at $19.
- Free Contractor Profit Leak Checklist + Klaviyo capture remain live.
- Remodeling lead form remains direct-submit with fallback; do not regress to mailto-only.
- eBay/EPN campaign `5339172120` remains the canonical affiliate campaign.

## 2. Standalone contractor tools — LIVE / SELLABLE
Production catalog: `https://contractor-tested-picks-site.vercel.app/standalone-tools.html`
Dedicated AI page: `https://contractor-tested-picks-site.vercel.app/ai-prompt-pack.html`
Both are deployed READY in Vercel and included in `sitemap.xml`.

Live one-time standalone offers:
- Contractor Estimate & Proposal Kit — $12.99 — `plink_1U6AHiJkrg28KsFAtZ4bPoH7`
- Job Cost & Profit Tracker — $19.99 — `plink_1U6AI6Jkrg28KsFAKWJqczOI`
- Change Order & Payment Protection Pack — $14.99 — `plink_1U6AIOJkrg28KsFAjmezBky0`
- Lead & Follow-Up Tracker — $14.99 — `plink_1U6AIdJkrg28KsFAOZkA8yN2`
- Material Takeoff & Labor Log — $17.99 — `plink_1U6AIqJkrg28KsFAftOMldFB`
- Contractor Field Forms Pack — $14.99 — `plink_1U6AJ4Jkrg28KsFAg27AJ3TZ`
- Contractor Labor Rate & Break-Even Calculator — $17.99 — `plink_1U6AJKJkrg28KsFANMMi2xiR`
- Contractor Follow-Up Script Pack — $9.99 — `plink_1U6AL4Jkrg28KsFAswTGzv3m`
- Product Photo Prompt Pack — $9.99 — `plink_1U6AJcJkrg28KsFA9IpcJw1q`
- AI Estimating & Marketing Prompt Pack v1.0 — $14 launch — `plink_1U6ABPJkrg28KsFAxrCGeTqh`

All ten have live Stripe Payment Links and Drive delivery mappings in automation `6a7660320e308191aec8cab859c03046`. One-time dedupe key remains Stripe Checkout Session ID.

AI Estimating & Marketing Prompt Pack canonical package:
- 25 contractor prompts across estimating/pricing, change orders/scope, lead follow-up/closing, local marketing and internal operations.
- Drive ID `1WrzbaIjVnrCpSmIX6vji9QwI-KbtWH3t`
- ZIP `14_AI_Estimating_and_Marketing_Prompt_Pack_v1_0.zip`
- Stripe product `prod_V6Muj8PPCLIJQy`; price `price_1U6AB3Jkrg28KsFA0KfdVcaO`; Payment Link above.
Do not revert to the obsolete 64-prompt package claim or old Drive ID.

## 3. Monthly memberships — LIVE PRODUCTS / M01+M02 PACKAGES / FIRST CUSTOMER PROOF PENDING
Live recurring tiers:
- Essentials $19/mo — `prod_V6M9GJCytR9Cu7` — `price_1U69RSJkrg28KsFAXc7xCGlG` — `plink_1U69SgJkrg28KsFASlFzmDxw`
- Choice $39/mo — `prod_V6MA1rXYKcIIOc` — `price_1U69RiJkrg28KsFAiSeSJfRz` — `plink_1U69SwJkrg28KsFAJp40W2lt`
- Pro $79/mo — `prod_V6MAWHYuBrlZ71` — `price_1U69RxJkrg28KsFAe02oEpSy` — `plink_1U69TCJkrg28KsFAVLZMFhTC`
- Premium $149/mo — `prod_V6MAZiJKdPsdMv` — `price_1U69SCJkrg28KsFATJW4QjtN` — `plink_1U69TQJkrg28KsFAArCHlhdT`
All four prices and links were independently verified `livemode:true` and recurring monthly.

Canonical fulfillment rule:
- Membership identifier = Stripe `subscription.id`.
- Unique delivery key = PAID Stripe `invoice.id`.
- Subscriber month index = chronological count of successful paid subscription invoices: first=M01, second=M02, third=M03, etc.
- Never dedupe membership delivery on subscription ID alone or subscription + calendar month.
- Never send a monthly package for an unpaid/failed/void billing cycle.

Canonical packages currently mapped:
M01:
- Essentials Drive `11ESOS7CLlZ4vKDU3RH654q1v9tfmc56M` — `Prestige_Essentials_M01_2026-08_v1.0.zip`
- Choice `1s0Zz85lLgYfYUK9eBjqXNTJXOqzvoCf6` — `Prestige_Choice_M01_2026-08_v1.0.zip`
- Pro `1GsY358Ci6Z_ZVViyux5mZNgava9amELG` — `Prestige_Pro_M01_2026-08_v1.0.zip`
- Premium `1lCEURc_MQsn6IyRJJ6EriUeCzbSvfpvf` — `Prestige_Premium_M01_2026-08_v1.0.zip`
M02:
- Essentials `15QWA3H152GowyIdWMGTqQByQyyMQdaBC` — `Prestige_Essentials_M02_2026-09_v1.0.zip`
- Choice `1UfhHJYhHPBxD8j7QiT5yMr63OwOdUsMW` — `Prestige_Choice_M02_2026-09_v1.0.zip`
- Pro `1n_tV3XJRXBzbKnx8x3WmT9GVJIM3p1CB` — `Prestige_Pro_M02_2026-09_v1.0.zip`
- Premium `1nMNck6a5Gh9TKN5nRxVBfYLqSlF4Yz7B` — `Prestige_Premium_M02_2026-09_v1.0.zip`

The M01 ZIP is the complete welcome package for that tier; do not send a separate onboarding ZIP plus a second M01 drop. M02 is the second paid-cycle package.

Latest live subscription audit on 2026-08-19 returned zero subscriptions (`GET /v1/subscriptions`, status=all). Therefore no paid membership is currently waiting for fulfillment and no real paid membership journey has yet been proven. Do not manufacture proof.

**Next build requirement:** create, QA, upload and map M03 for all four tiers before any third paid renewal can occur. Continue M04–M06 production afterward so the membership engine stays ahead.

## 4. Fulfillment automation — ACTIVE
- Automation: `Digital Product + Membership Fulfillment`
- ID: `6a7660320e308191aec8cab859c03046`
- Cadence: hourly condition watch.
- Covers core one-time ladder, all ten live standalone offers, mapped Shopify orders, and monthly M01/M02 membership delivery.
- One-time dedupe: Checkout Session ID.
- Membership dedupe: paid Invoice ID.

## 5. Customer Portal — VERIFIED GAP
Stripe portal configuration audit returned no active portal configurations on 2026-08-19. The connected Stripe write surface does not expose portal-configuration creation. This is a real remaining live setting, not a completed item.
Required portal behavior when configured in Stripe Dashboard: payment-method update ON, invoice history ON, subscription cancellation ON. Do not claim Customer Portal is live until re-verified.

## 6. Shopify
Four digital tier products remain draft/staged with fulfillment mapping. Wisconsin sales-tax classification / seller-registration status remains unresolved. Do not publish Shopify digital products or guess tax treatment until verified or explicitly directed after informed review.

## 7. Analytics / email conversion gaps
- Buy/affiliate/lead/signup event hooks exist.
- Verified GA4 Measurement ID is still missing; never invent a `G-...` ID.
- Klaviyo list capture exists, but no triggered nurture flow has been independently verified. Do not claim a welcome/upsell flow is live without evidence.

## 8. Tax / compliance
Wisconsin digital-product tax classification and seller-registration remain unresolved. Do not enable Stripe Tax or publish Shopify based on a guess. Existing DOR inquiry draft may be sent only with Jason's approval.

## 9. Immediate Revenue Sequence
1. Keep urgent foreclosure/legal and active contracting estimate/collection work protected outside this repo.
2. Drive qualified traffic to the live free checklist, core ladder, standalone catalog, AI Prompt Pack and memberships.
3. Monitor and verify the first real paid automated fulfillment; fix any defect immediately.
4. Build M03, then M04–M06, before customers can outrun the content map.
5. Configure and verify Stripe Customer Portal when Dashboard access permits.
6. Resolve GA4 and Klaviyo nurture gaps without disrupting live checkout.
7. Resolve Wisconsin tax/registration before Shopify publication.

Do not regress to rebuilding completed one-time products, standalone ZIPs, live Stripe links, M01/M02 packages, affiliate tracking, lead magnet or lead form without a verified defect.