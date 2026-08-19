# Forge Production Queue

**Owner:** Forge / ChatGPT  
**Business:** Prestige / Prestige Exteriors / Prestige Select / Contractor Tested Picks  
**Repository:** `jrepp82/contractor-tested-picks-site`  
**Last updated:** 2026-08-19

## Operating Rules
1. Resume the highest-priority unfinished Forge task unless Jason explicitly redirects.
2. An interruption does not cancel in-progress work; resume it immediately afterward.
3. Completion requires a verified deliverable or confirmed external action.
4. Audit claims from Forge, Grok, Gemini or prior chats against the live system before treating them as true.
5. Fix verified defects while working; do not downgrade or park them as vague future items.
6. Protect working revenue systems and do not rebuild them for novelty.

---

## P0 — LIVE REVENUE

### 1. Prestige public funnel
**Status: LIVE / PRODUCTION VERIFIED.**
- Public site: `https://contractor-tested-picks-site.vercel.app`
- Main product page: `/digital-products.html`
- Standalone catalog: `/standalone-tools.html`
- AI Prompt Pack page: `/ai-prompt-pack.html`
- Git `main` auto-deploys to Vercel. Recent catalog/product deployments are production `READY`.
- Free Profit Leak Checklist, Klaviyo capture, remodeling lead form and tracked eBay/EPN paths remain live.

### 2. Core one-time ladder
**Status: LIVE CHECKOUT + HOURLY FULFILLMENT.**
- Essentials $6.99 — `plink_1U68DsJkrg28KsFAG970HNU3`
- Choice $16.99 — `plink_1U67ZuJkrg28KsFAwyIZduUG`
- Starter V1 $19 — `plink_1U1tzUJkrg28KsFADemfO0bk`
- Pro $49.99 — `plink_1U67a2Jkrg28KsFAdqZmMunI`
- Premium v1.1 $99.99 — `plink_1U67aAJkrg28KsFAP7bQOxll`
One-time fulfillment dedupe = Stripe Checkout Session ID.

### 3. Standalone tool catalog
**Status: LIVE / SELLABLE / FULFILLMENT MAPPED.**
All releases were built, QA-tested, persisted, uploaded to Drive and mapped into the hourly fulfillment automation.
- Estimate & Proposal Kit — $12.99 — `plink_1U6AHiJkrg28KsFAtZ4bPoH7`
- Job Cost & Profit Tracker — $19.99 — `plink_1U6AI6Jkrg28KsFAKWJqczOI`
- Change Order & Payment Protection — $14.99 — `plink_1U6AIOJkrg28KsFAjmezBky0`
- Lead & Follow-Up Tracker — $14.99 — `plink_1U6AIdJkrg28KsFAOZkA8yN2`
- Material Takeoff & Labor Log — $17.99 — `plink_1U6AIqJkrg28KsFAftOMldFB`
- Contractor Field Forms — $14.99 — `plink_1U6AJ4Jkrg28KsFAg27AJ3TZ`
- Labor Rate & Break-Even Calculator — $17.99 — `plink_1U6AJKJkrg28KsFANMMi2xiR`
- Contractor Follow-Up Script Pack — $9.99 — `plink_1U6AL4Jkrg28KsFAswTGzv3m`
- Product Photo Prompt Pack — $9.99 — `plink_1U6AJcJkrg28KsFA9IpcJw1q`
- AI Estimating & Marketing Prompt Pack v1.0 — $14 launch — `plink_1U6ABPJkrg28KsFAxrCGeTqh`

Standalone Excel products 05–11 passed functional calculation smoke tests and formula-error scans. ZIPs 05–14 passed archive integrity. Do not regress these to BUILDING/PLANNED.

### 4. AI Estimating & Marketing Prompt Pack
**Status: LIVE PRODUCT, NOT PENDING.**
- Product `prod_V6Muj8PPCLIJQy`
- Price `price_1U6AB3Jkrg28KsFA0KfdVcaO` = $14 one-time launch price
- Payment Link `plink_1U6ABPJkrg28KsFAxrCGeTqh`
- Checkout URL `https://buy.stripe.com/eVq3cw7Dffwtga35r5dZ60i`
- Drive `1WrzbaIjVnrCpSmIX6vji9QwI-KbtWH3t`
- Delivery ZIP `14_AI_Estimating_and_Marketing_Prompt_Pack_v1_0.zip`
- Product contains 25 contractor prompts + README/license/category MD/TXT files + How-to-Use PDF.
The old claim of 64 prompts / old Drive ID is obsolete.

### 5. Monthly memberships
**Status: LIVE STRIPE + LIVE PAGE + M01/M02 CANONICAL PACKAGES + AUTOMATION; FIRST REAL CUSTOMER PROOF PENDING.**
Recurring tiers:
- Essentials $19/mo — `prod_V6M9GJCytR9Cu7` — `price_1U69RSJkrg28KsFAXc7xCGlG` — `plink_1U69SgJkrg28KsFASlFzmDxw`
- Choice $39/mo — `prod_V6MA1rXYKcIIOc` — `price_1U69RiJkrg28KsFAiSeSJfRz` — `plink_1U69SwJkrg28KsFAJp40W2lt`
- Pro $79/mo — `prod_V6MAWHYuBrlZ71` — `price_1U69RxJkrg28KsFAe02oEpSy` — `plink_1U69TCJkrg28KsFAVLZMFhTC`
- Premium $149/mo — `prod_V6MAZiJKdPsdMv` — `price_1U69SCJkrg28KsFATJW4QjtN` — `plink_1U69TQJkrg28KsFAArCHlhdT`
All are `livemode:true`, recurring monthly and active.

Membership idempotency:
- unique monthly delivery key = paid Stripe `invoice.id`
- membership identifier = `subscription.id`
- subscriber month index = successful paid subscription-invoice sequence (M01, M02, M03...)
Never use subscription ID alone or subscription+calendar month as the dedupe key.

Canonical M01 Drive packages:
- essentials `11ESOS7CLlZ4vKDU3RH654q1v9tfmc56M`
- choice `1s0Zz85lLgYfYUK9eBjqXNTJXOqzvoCf6`
- pro `1GsY358Ci6Z_ZVViyux5mZNgava9amELG`
- premium `1lCEURc_MQsn6IyRJJ6EriUeCzbSvfpvf`
Canonical M02 Drive packages:
- essentials `15QWA3H152GowyIdWMGTqQByQyyMQdaBC`
- choice `1UfhHJYhHPBxD8j7QiT5yMr63OwOdUsMW`
- pro `1n_tV3XJRXBzbKnx8x3WmT9GVJIM3p1CB`
- premium `1nMNck6a5Gh9TKN5nRxVBfYLqSlF4Yz7B`
M01 is one complete welcome package; do not send separate onboarding + drop files.

Latest Stripe subscription audit returned zero subscriptions. There is no missed member delivery to recover and no real paid membership proof yet.

**NEXT BUILD:** M03 for all four tiers, then M04–M06. Do not wait until a customer reaches an unmapped invoice.

### 6. Automated fulfillment
**Status: ENABLED / EXPANDED.**
Automation `Digital Product + Membership Fulfillment` / `6a7660320e308191aec8cab859c03046`, hourly condition watch.
Covers:
- core one-time Stripe ladder
- ten live standalone Stripe products
- mapped Shopify tier orders
- monthly membership M01/M02
Dedupe: Checkout Session ID for one-time; paid Invoice ID for membership; order+SKU for Shopify.

### 7. First real paid-order proof
**Status: EXTERNALLY DEPENDENT, MONITOR.**
Do not manufacture a test success claim. The next legitimate purchase is the proof event. When it happens, audit the delivery email, attachment, dedupe marker and timing immediately.

---

## P1 — BUILD AHEAD / CONVERSION / COMPLIANCE

### 8. M03–M06 member content
**Status: M03 NOT YET CANONICALLY BUILT/MAPPED.**
Build M03 next for Essentials/Choice/Pro/Premium, QA it, upload four ZIPs to Drive and add them to Stripe metadata + fulfillment automation. Continue M04–M06 afterward.

### 9. Traffic / distribution
**Status: UNBLOCKED / CASH-NOW.**
- Cold contractor traffic → free Profit Leak Checklist.
- Problem-specific traffic → `/standalone-tools.html`.
- AI-curious contractor traffic → `/ai-prompt-pack.html`.
- Warm contractor traffic → core ladder or relevant monthly tier.
- eBay intent → tracked EPN links.
Do not spend on paid ads without explicit approval.

### 10. Stripe Customer Portal
**Status: VERIFIED MISSING LIVE CONFIGURATION.**
Stripe API audit returned zero active billing portal configurations. Required settings when configured: update payment method ON, invoice history ON, cancel subscription ON. Current connected Stripe write surface does not expose portal-configuration creation. Do not claim portal is live until independently re-verified.

### 11. Klaviyo nurture
**Status: CAPTURE LIVE / NURTURE NOT VERIFIED.**
List `SJ8FBv` captures the free checklist. No triggered welcome/upsell flow has been independently verified. Build/verify a real nurture flow when connector/UI access supports it.

### 12. Analytics / GA4
**Status: EVENT CODE EXISTS / DESTINATION MISSING.**
A verified GA4 Measurement ID is still missing. Never invent a `G-...` ID. Install and verify only after the real property ID is available.

### 13. Shopify digital sales
**Status: DRAFT / TAX-BLOCKED.**
Four tier products are staged and fulfillment-mapped. Wisconsin digital-product tax classification / seller-registration remains unresolved. Do not publish based on a guess.

### 14. Wisconsin tax / registration
**Status: UNRESOLVED / CONSEQUENTIAL.**
Do not enable Stripe Tax or activate Shopify digital listings based on assumption. Existing DOR inquiry draft may be sent only with Jason's approval.

### 15. Main digital-products page wording cleanup
**Status: NON-BLOCKING VERIFIED STALENESS.**
The live monthly links work, but some explanatory copy still describes the older separate onboarding+monthly-drop model and subscription-plus-month wording. Canonical automation is already corrected. Update the page copy surgically when safe; never change the working URLs/prices while doing so.

### 16. Affiliate monetization
EPN campaign `5339172120` remains canonical. Preserve tracked category/store links; replace only verified dead item links.

---

## P2 — BROADER BUSINESS CASH / LEGAL PRIORITY
Active remodeling estimates, receivables, foreclosure/legal deadlines and live leads remain higher priority when immediately actionable. Do not let digital build work cause those to be forgotten.

## Resume Rule
1. Protect urgent legal/foreclosure deadlines and active contracting cash opportunities.
2. Keep live digital funnel selling; monitor first paid fulfillment.
3. Build and map M03, then M04–M06.
4. Drive qualified traffic to free checklist, standalone catalog, AI page, ladder and memberships.
5. Configure/verify Stripe Customer Portal when the available Stripe surface permits it.
6. Fix Klaviyo nurture and GA4 measurement gaps.
7. Resolve Wisconsin tax/registration before Shopify publication.

Never regress completed products or live links back into PLANNED status without verified evidence.