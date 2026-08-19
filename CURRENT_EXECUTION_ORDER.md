# Current Execution Order

**Owner:** Forge / ChatGPT  
**Last updated:** 2026-08-19  
**Source of truth:** this file + `FORGE_PRODUCTION_QUEUE.md` + `SUBSCRIPTION_AUTOMATION_SPEC.md` + live Stripe/Drive/GitHub/Vercel evidence.

## Mandatory Startup Rule
Read the three source-of-truth files above before continuing digital revenue work. Audit live state before trusting older chat summaries. Resume the highest-priority unfinished task after every interruption. Completion requires a verified deliverable or confirmed external action.

## 1. Live Prestige digital revenue funnel
Production: `https://contractor-tested-picks-site.vercel.app`
Repo: `jrepp82/contractor-tested-picks-site`, `main`, Vercel auto-deploy.

Live components:
- core one-time Prestige ladder: $6.99 / $16.99 / $49.99 / $99.99;
- separate Contractor Business OS Starter V1 $19;
- 10 live standalone Stripe products at `/standalone-tools.html`;
- AI Estimating & Marketing Prompt Pack $14 at `/ai-prompt-pack.html`;
- four live monthly memberships $19 / $39 / $79 / $149;
- free Profit Leak Checklist + Klaviyo capture;
- direct remodeling lead form;
- tracked eBay/EPN paths, campaign `5339172120`.

Do not rebuild these without a verified defect.

## 2. Standalone contractor tools — LIVE / SELLABLE
All ten standalone offers have live Stripe Payment Links, private Drive delivery files and mappings in automation `6a7660320e308191aec8cab859c03046`.

- Estimate & Proposal Kit — $12.99 — `plink_1U6AHiJkrg28KsFAtZ4bPoH7`
- Job Cost & Profit Tracker — $19.99 — `plink_1U6AI6Jkrg28KsFAKWJqczOI`
- Change Order & Payment Protection — $14.99 — `plink_1U6AIOJkrg28KsFAjmezBky0`
- Lead & Follow-Up Tracker — $14.99 — `plink_1U6AIdJkrg28KsFAOZkA8yN2`
- Material Takeoff & Labor Log — $17.99 — `plink_1U6AIqJkrg28KsFAftOMldFB`
- Field Forms — $14.99 — `plink_1U6AJ4Jkrg28KsFAg27AJ3TZ`
- Labor Rate & Break-Even — $17.99 — `plink_1U6AJKJkrg28KsFANMMi2xiR`
- Follow-Up Script Pack — $9.99 — `plink_1U6AL4Jkrg28KsFAswTGzv3m`
- Product Photo Prompt Pack — $9.99 — `plink_1U6AJcJkrg28KsFA9IpcJw1q`
- AI Estimating & Marketing Prompt Pack — $14 launch — `plink_1U6ABPJkrg28KsFAxrCGeTqh`

One-time fulfillment dedupe = completed Stripe Checkout Session ID.

## 3. Monthly memberships — LIVE / M01-M03 MAPPED
Live recurring products:
- Essentials $19/mo — `prod_V6M9GJCytR9Cu7` — `price_1U69RSJkrg28KsFAXc7xCGlG` — `plink_1U69SgJkrg28KsFASlFzmDxw`
- Choice $39/mo — `prod_V6MA1rXYKcIIOc` — `price_1U69RiJkrg28KsFAiSeSJfRz` — `plink_1U69SwJkrg28KsFAJp40W2lt`
- Pro $79/mo — `prod_V6MAWHYuBrlZ71` — `price_1U69RxJkrg28KsFAe02oEpSy` — `plink_1U69TCJkrg28KsFAVLZMFhTC`
- Premium $149/mo — `prod_V6MAZiJKdPsdMv` — `price_1U69SCJkrg28KsFATJW4QjtN` — `plink_1U69TQJkrg28KsFAArCHlhdT`

Canonical rules:
- membership identity = Stripe `subscription.id`;
- unique monthly delivery key = PAID Stripe `invoice.id`;
- subscriber month = successful paid subscription-invoice sequence: M01, M02, M03, etc.;
- failed/unpaid/void invoices do not advance the sequence;
- never dedupe on subscription ID alone or subscription+calendar month.

M01 Drive packages:
- Essentials `11ESOS7CLlZ4vKDU3RH654q1v9tfmc56M`
- Choice `1s0Zz85lLgYfYUK9eBjqXNTJXOqzvoCf6`
- Pro `1GsY358Ci6Z_ZVViyux5mZNgava9amELG`
- Premium `1lCEURc_MQsn6IyRJJ6EriUeCzbSvfpvf`

M02:
- Essentials `15QWA3H152GowyIdWMGTqQByQyyMQdaBC`
- Choice `1UfhHJYhHPBxD8j7QiT5yMr63OwOdUsMW`
- Pro `1n_tV3XJRXBzbKnx8x3WmT9GVJIM3p1CB`
- Premium `1nMNck6a5Gh9TKN5nRxVBfYLqSlF4Yz7B`

M03 — BUILT / QA'D / DRIVE / LIBRARY / STRIPE METADATA / AUTOMATION MAPPED:
- Essentials `1Zd2Zub4L48w5E7RAMBv80FQhEZv1YGsl` — `Prestige_Essentials_M03_2026-10_v1.0.zip`
- Choice `159ccUNCakLeQlmEL7zlUfyyq6fh-PxCy` — `Prestige_Choice_M03_2026-10_v1.0.zip`
- Pro `1uDerxtR50VjB6s8eldWY9UBhdaE9y7TH` — `Prestige_Pro_M03_2026-10_v1.0.zip`
- Premium `1ifdXLG6R6V0X3O2NKA6bkd5AiKOimAyD` — `Prestige_Premium_M03_2026-10_v1.0.zip`

M03 content includes break-even labor-rate guidance, cold-weather checklist, referral training, Pro local-marketing AI expansion, functional 90-Day Profit Review workbook, and Premium white-label/coaching tools by tier inheritance.

Latest live Stripe subscription audit on 2026-08-19 returned zero subscriptions. No real paid membership journey has yet proven the delivery path; do not manufacture proof.

**NEXT MEMBERSHIP BUILD: M04, then M05-M06.**

## 4. Fulfillment automation — ACTIVE
`Digital Product + Membership Fulfillment` / `6a7660320e308191aec8cab859c03046`, hourly condition watch.
Covers core one-time products, all ten standalone products, mapped Shopify tier orders, and membership M01-M03.

## 5. Verified live gaps
### Stripe Customer Portal
No active Billing Portal configuration was found. Required eventual settings: payment-method update ON, invoice history ON, cancellation ON. Do not claim portal is live.

### GA4
Event hooks exist, but no verified `G-...` Measurement ID is available. Never invent one.

### Klaviyo
Free-checklist list capture is live; triggered nurture flow is not independently verified.

### Shopify / Wisconsin tax
Shopify tier products remain draft. Wisconsin digital-product tax classification / seller-registration is unresolved. Do not publish Shopify or enable Stripe Tax based on a guess.

### Main membership copy
Some `digital-products.html` wording still describes the older separate onboarding+drop model. Fulfillment logic and `SUBSCRIPTION_AUTOMATION_SPEC.md` are canonical. Copy cleanup must be surgical and preserve working prices/URLs.

## 6. Immediate execution order
1. Preserve urgent foreclosure/legal deadlines and active contracting cash/estimate opportunities outside this repo.
2. Keep the live digital funnel selling and monitor first real paid fulfillment.
3. Build, QA, upload and map M04; then M05 and M06 without waiting for customers to catch up.
4. Drive qualified organic traffic to the free checklist, standalone catalog, AI page, one-time ladder and memberships.
5. Configure/verify Customer Portal when a writable Stripe surface is available.
6. Resolve Klaviyo nurture and GA4 gaps without disturbing checkout.
7. Resolve Wisconsin tax/registration before Shopify publication.

Never regress completed products or mapped membership cycles back to PLANNED status without verified evidence.