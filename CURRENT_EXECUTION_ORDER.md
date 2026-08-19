# Current Execution Order

**Owner:** Forge / ChatGPT  
**Last updated:** 2026-08-19  
**Source of truth:** `FORGE_PRODUCTION_QUEUE.md` + `SUBSCRIPTION_AUTOMATION_SPEC.md`

## Mandatory Startup Rule
At the beginning of every work session, open and read:
1. `CURRENT_EXECUTION_ORDER.md`
2. `FORGE_PRODUCTION_QUEUE.md`
3. `SUBSCRIPTION_AUTOMATION_SPEC.md` when touching digital fulfillment or memberships.

Resume the highest-priority unfinished Forge task unless Jason explicitly changes the order. Do not replace Forge's work with a new checklist, and do not drop in-progress work because Jason interrupts with another request. Completion requires a verifiable deliverable or confirmed external action.

## Active Order

### 1. Prestige digital revenue funnel — LIVE
- **Public site:** `https://contractor-tested-picks-site.vercel.app`.
- **Git source:** `jrepp82/contractor-tested-picks-site`, `main`; Vercel auto-deploy is configured for this project.
- **One-time Prestige ladder:** Essentials $6.99; Choice $16.99; Pro $49.99; Premium v1.1 $99.99.
- **Separate one-time offer:** Contractor Business Operating System Starter V1 at $19 remains separate from the four-tier ladder.
- **One-time checkout + Drive/Gmail fulfillment:** active hourly automation remains mapped; do not rebuild it.
- **Free Contractor Profit Leak Checklist:** live and connected to Klaviyo capture.
- **Remodeling lead form:** direct-submit FormSubmit AJAX path remains active; do not regress it to mailto-only.
- **Affiliate/eBay system:** existing tracked paths remain live.
- **Highest cash-now action:** distribute traffic and measure real conversions instead of rebuilding working funnel components.

### 2. Prestige Monthly memberships — LIVE COMPONENTS VERIFIED / FIRST PAID CUSTOMER PROOF PENDING
The earlier `NOT LIVE` / `zero recurring prices` state is obsolete.

#### Live Stripe monthly tiers
- Essentials Monthly — $19/mo — `prod_V6M9GJCytR9Cu7` — `price_1U69RSJkrg28KsFAXc7xCGlG` — `plink_1U69SgJkrg28KsFASlFzmDxw`
- Choice Monthly — $39/mo — `prod_V6MA1rXYKcIIOc` — `price_1U69RiJkrg28KsFAiSeSJfRz` — `plink_1U69SwJkrg28KsFAJp40W2lt`
- Pro Monthly — $79/mo — `prod_V6MAWHYuBrlZ71` — `price_1U69RxJkrg28KsFAe02oEpSy` — `plink_1U69TCJkrg28KsFAVLZMFhTC`
- Premium Monthly — $149/mo — `prod_V6MAZiJKdPsdMv` — `price_1U69SCJkrg28KsFATJW4QjtN` — `plink_1U69TQJkrg28KsFAArCHlhdT`

#### Website
`digital-products.html` on `main` contains the production `#monthly-memberships` section with those live subscription links, tier benefits, signup delivery explanation, recurring-billing disclosure and cancellation/support language.

#### Member drops
Verified tier-specific Drive ZIPs exist for August 2026 and September 2026. Preserve the canonical Drive IDs, filenames and byte sizes recorded in `SUBSCRIPTION_AUTOMATION_SPEC.md`.

#### Fulfillment
- Enabled automation: `Digital Product + Membership Fulfillment`
- Jawbone: `6a7660320e308191aec8cab859c03046`
- Cadence: hourly condition watch.
- First paid cycle: send onboarding toolkit + current monthly drop only after a paid Stripe membership invoice is verified.
- Renewal: send only the mapped monthly drop after a paid membership invoice is verified.
- **Canonical membership dedupe key: PAID STRIPE INVOICE ID (`invoice.id`).**
- Every membership delivery email must contain `Invoice reference: in_...`.
- Never use `subscription.id` alone, and never treat `subscription ID + month` as the canonical idempotency key.
- Failed/unpaid invoices receive no paid content; a later-paid same invoice can fulfill once using that invoice ID.

#### Evidence boundary
Latest Stripe check on August 19 found zero completed Checkout Sessions. Therefore the live products, prices, Payment Links, page wiring, Drive mappings and automation are present, but no real paid customer transaction has yet proven the customer-delivery path. Do not manufacture or claim proof that does not exist.

#### Resume point
Drive qualified traffic and monitor the first real paid membership invoice. Verify one correct onboarding + monthly-drop email with no duplicate send. Later verify a real renewal sends only the new monthly drop using its new Invoice ID.

### 3. Prompt Pack standalone product — PACKAGE BUILT
- `Prestige_AI_Estimating_Marketing_Prompt_Pack_v1_0.zip` was physically built and QA'd on August 19.
- Contains Quick Start PDF, formatted prompt PDF, TXT/Markdown copy-paste libraries, license, sales copy, manifest and checksums.
- Includes 64 specialized contractor prompts plus the Universal Contractor Setup Prompt.
- Uploaded to Drive in `Digital Products - Contractor Starter Pack` as file ID `1UpPZ2vTZRrylWkPrG8Fz3UwRQlQ-2wW9`.
- Next action: add it to the standalone catalog/storefront only after final offer price and channel placement are reconciled; do not rebuild the package.

### 4. Supplemental Month 1 training assets — BUILT / DO NOT REPLACE LIVE DROP MAP
Forge also built supplemental tier-specific training PDFs and a combined August ZIP:
- Essentials — Profit Leak Guard
- Choice — Lead-to-Cash Billing Flow
- Pro — Weekly Job Control
- Premium — Contractor Command Cycle
- Combined Drive file: `Prestige_Monthly_Membership_2026-08_Month_1.zip`, ID `1uWLndiHDd4xgmjFk9o38pHPfOf_Elr79`.

These are supplemental production assets. The existing live Stripe fulfillment mapping remains pointed at the previously built canonical August tier-specific member-drop ZIPs. Do not silently replace the live mappings with the supplemental files.

### 5. Shopify digital sales channel
- **Status:** four digital products staged/drafted with paid-order fulfillment mapping ready.
- **Blocker:** Wisconsin sales-tax classification / seller-registration status remains unresolved.
- Do not activate Shopify digital listings or guess tax treatment until the classification/registration issue is verified or Jason explicitly accepts the risk after review.

### 6. Product QA / real paid fulfillment proof
- Product ZIPs and mappings are verified.
- One-time and monthly automations are enabled.
- Real paid customer proof remains transaction-dependent because Stripe currently has no completed Checkout Sessions.
- Monitor new transactions; do not create a fake success claim.

### 7. Analytics / conversion measurement
- Event hooks exist for affiliate clicks, digital buy clicks, leads and email signups.
- GA4 destination remains blocked by missing verified `G-...` Measurement ID.
- Add only a real verified ID, then test Realtime/DebugView.

### 8. Digital-product tax configuration
- Wisconsin classification / seller-registration status remains unresolved.
- Do not enable Stripe Tax or publish Shopify listings based on a guessed tax classification.
- Existing DOR inquiry draft can be sent when Jason approves sending it.

### 9. eBay / affiliate revenue
- EPN campaign `5339172120` remains the canonical tracking campaign.
- Existing tracked product/store paths remain live.
- Monitor per-item inventory links for expiration and replace only verified dead inventory links.

### 10. Traffic / distribution
- Funnel is ready for organic traffic.
- Cold traffic: free Contractor Profit Leak Checklist.
- Warm contractor traffic: Essentials $6.99 / relevant one-time tier or matching monthly membership.
- Marketplace/eBay-intent traffic: tracked eBay category/store paths.
- Do not spend on paid ads without Jason approving spend.

### 11. Domain
- Current Vercel alias is functional for the funnel.
- Never change DNS/MX without explicit approval and preservation of email records.

### 12. Existing customer/estimate work
Customer estimate projects remain separate from this digital funnel. Do not let digital-product work cause active estimate/revenue follow-up to be dropped.

## Resume Instruction
Current Forge revenue sequence:
1. Preserve foreclosure/legal deadline protection and active estimate cash opportunities outside this repo.
2. Drive traffic to the already-live digital funnel instead of rebuilding it.
3. Monitor and prove the first actual paid one-time or membership fulfillment.
4. Keep future monthly member drops built and mapped ahead of billing periods.
5. Place the finished AI Prompt Pack into the most profitable storefront/channel once pricing is finalized.
6. Resolve Wisconsin digital-product tax/registration before Shopify publication.
7. Install a verified GA4 Measurement ID when one becomes available.

Do not regress to rebuilding completed one-time products, monthly Stripe products, member drops, live subscription links, fulfillment mappings, affiliate tracking, lead magnet, lead form or storefront sections without a verified defect.