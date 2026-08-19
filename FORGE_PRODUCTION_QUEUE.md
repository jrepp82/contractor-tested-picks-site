# Forge Production Queue

**Owner:** Forge / ChatGPT  
**Business:** Prestige / Prestige Exteriors / Prestige Select / Contractor Tested Picks  
**Repository:** `jrepp82/contractor-tested-picks-site`  
**Last updated:** 2026-08-19

## Operating Rules
1. This is Forge's production queue, not Jason's personal checklist.
2. Resume the highest-priority unfinished Forge task unless Jason explicitly redirects.
3. An interruption does not cancel or erase in-progress work; carry it forward until complete, explicitly blocked, or canceled by Jason.
4. Completion requires a verified deliverable or confirmed external action.
5. Protect existing working revenue systems; do not rebuild them for novelty.
6. Update this file after substantive progress.

---

## P0 — Live Revenue Funnel

### 1. Prestige storefront / contractor digital funnel
- **Status:** LIVE / PRODUCTION COMPONENTS VERIFIED.
- **Public URL:** `https://contractor-tested-picks-site.vercel.app/`
- **Git source:** `jrepp82/contractor-tested-picks-site`, `main`.
- **Current funnel components:** one-time Prestige product ladder, separate $19 Starter V1, four Prestige Monthly memberships, free Profit Leak Checklist, Klaviyo capture, remodeling lead form, eBay affiliate paths, digital-product page and direct Stripe checkout.
- **Do not rebuild** these components unless a verified defect is found.
- **Current money action:** distribute qualified traffic and observe real conversion data.

### 2. Free Contractor Profit Leak Checklist funnel
- **Status:** LIVE / VERIFIED.
- `profit-leak-checklist.html` is the free contractor lead magnet.
- Signup entry is on `digital-products.html#profit-leak-checklist`.
- Klaviyo list `SJ8FBv` remains the capture destination.
- No triggered Klaviyo nurture flow has been independently verified; do not claim nurture automation is live until verified.

### 3. One-time digital product ladder
- **Status:** LIVE CHECKOUTS + HOURLY FULFILLMENT MAPPED.
- Essentials v1.0 — $6.99 — `plink_1U68DsJkrg28KsFAG970HNU3`
- Choice v1.0 — $16.99 — `plink_1U67ZuJkrg28KsFAwyIZduUG`
- Contractor Business OS Starter V1 — $19 one time — `plink_1U1tzUJkrg28KsFADemfO0bk`
- Pro v1.0 — $49.99 — `plink_1U67a2Jkrg28KsFAdqZmMunI`
- Premium v1.1 — $99.99 — `plink_1U67aAJkrg28KsFAP7bQOxll`
- Preserve canonical Drive mappings and file-size verification in the hourly fulfillment automation.
- One-time fulfillment dedupe remains Checkout Session ID.

### 4. Monthly memberships
- **Status:** LIVE STRIPE + LIVE PAGE + DRIVE DROPS + HOURLY FULFILLMENT LOGIC VERIFIED PRESENT. FIRST REAL PAID CUSTOMER-JOURNEY PROOF PENDING.

#### Live recurring Stripe tiers
- Essentials Monthly — $19/mo — product `prod_V6M9GJCytR9Cu7` — price `price_1U69RSJkrg28KsFAXc7xCGlG` — link `plink_1U69SgJkrg28KsFASlFzmDxw`
- Choice Monthly — $39/mo — product `prod_V6MA1rXYKcIIOc` — price `price_1U69RiJkrg28KsFAiSeSJfRz` — link `plink_1U69SwJkrg28KsFAJp40W2lt`
- Pro Monthly — $79/mo — product `prod_V6MAWHYuBrlZ71` — price `price_1U69RxJkrg28KsFAe02oEpSy` — link `plink_1U69TCJkrg28KsFAVLZMFhTC`
- Premium Monthly — $149/mo — product `prod_V6MAZiJKdPsdMv` — price `price_1U69SCJkrg28KsFATJW4QjtN` — link `plink_1U69TQJkrg28KsFAArCHlhdT`

#### Live page
`digital-products.html` contains `#monthly-memberships` with the four live subscription links, recurring billing/cancellation language, signup benefits and monthly-delivery explanation.

#### Canonical member-drop mappings
August 2026 and September 2026 have real tier-specific Drive member-drop ZIPs. Exact Drive IDs, filenames and byte sizes are recorded in `SUBSCRIPTION_AUTOMATION_SPEC.md` and in the live fulfillment automation. Do not replace them casually.

#### Fulfillment
Enabled hourly condition-watch automation:
- title `Digital Product + Membership Fulfillment`
- jawbone `6a7660320e308191aec8cab859c03046`

**Corrected membership idempotency rule:**
- first paid cycle and every renewal are fulfilled only after a Stripe membership invoice is verified `paid`;
- **the PAID STRIPE INVOICE ID is the canonical and unique membership delivery key**;
- every membership delivery email records `Invoice reference: <in_...>`;
- never dedupe membership delivery on subscription ID alone;
- do not use subscription ID + month as the canonical idempotency key;
- month is for selecting the correct asset, not for replacing the paid invoice ID as the delivery key.

Failed/unpaid invoices receive no paid content. If the same invoice later becomes paid, it can fulfill once using that invoice ID.

#### Current evidence boundary
Latest Stripe audit on August 19 returned zero completed Checkout Sessions. Therefore no real paid transaction exists yet to prove the final email-delivery path. Do not claim an end-to-end paid membership success until one occurs.

#### Next action
Drive qualified traffic, monitor the first paid membership invoice, and verify onboarding + current drop arrive exactly once. Later verify a real renewal sends only the new monthly drop exactly once using the new renewal Invoice ID.

### 5. AI Estimating & Marketing Prompt Pack
- **Status:** PHYSICAL SELLABLE PACKAGE BUILT + QA'D + UPLOADED TO DRIVE.
- Package: `Prestige_AI_Estimating_Marketing_Prompt_Pack_v1_0.zip`
- Drive file ID: `1UpPZ2vTZRrylWkPrG8Fz3UwRQlQ-2wW9`
- Includes 64 specialized contractor prompts + Universal Contractor Setup Prompt, Quick Start PDF, formatted prompt PDF, TXT/Markdown libraries, license, sales copy, manifest and checksums.
- **Do not rebuild.**
- Next action: finalize selling price/channel placement and wire it into the appropriate storefront(s).

### 6. Supplemental Month 1 training assets
- **Status:** BUILT + QA'D + UPLOADED.
- Combined ZIP: `Prestige_Monthly_Membership_2026-08_Month_1.zip`
- Drive ID: `1uWLndiHDd4xgmjFk9o38pHPfOf_Elr79`
- Tier PDFs: Essentials Profit Leak Guard; Choice Lead-to-Cash Billing Flow; Pro Weekly Job Control; Premium Contractor Command Cycle.
- These are supplemental assets. Preserve the existing canonical live August member-drop ZIP mappings unless an intentional version change is approved.

### 7. Automated fulfillment
- **Status:** ENABLED HOURLY FOR ONE-TIME STRIPE, MAPPED SHOPIFY ORDERS, AND MONTHLY MEMBERSHIPS.
- Automation: `Digital Product + Membership Fulfillment` / `6a7660320e308191aec8cab859c03046`.
- One-time Stripe dedupe: Checkout Session ID.
- Shopify dedupe: order reference + SKU.
- Membership dedupe: paid Stripe Invoice ID.
- All sends verify the mapped private Drive ZIP before email delivery.
- Real paid customer proof remains transaction-dependent because no completed Checkout Session exists yet.

### 8. Prestige remodeling lead capture
- **Status:** LIVE DIRECT SUBMISSION.
- Current form uses FormSubmit AJAX with validation/status handling and mailto fallback only if direct submit fails.
- Preserve this working lead path while finishing broader Prestige Remodeling website QA in the main business workflow.

---

## P1 — Revenue Expansion / Compliance / Measurement

### 9. Organic distribution
- **Status:** HIGHEST-PRIORITY UNBLOCKED DIGITAL CASH-NOW WORK.
- Cold traffic: free Contractor Profit Leak Checklist.
- Warm contractor traffic: $6.99 Essentials, relevant one-time tier or matching monthly membership.
- eBay-intent traffic: tracked eBay paths.
- Do not spend on paid ads without Jason explicitly approving spend.

### 10. Shopify digital sales channel
- **Status:** PRODUCTS STAGED / FULFILLMENT MAPPED / PUBLICATION TAX-BLOCKED.
- Four Prestige digital products remain staged/drafted for Shopify.
- Wisconsin sales-tax classification and seller-registration status remain unresolved.
- Do not activate the Shopify products or guess tax treatment before verification or explicit informed direction.

### 11. Analytics / GA4
- **Status:** EVENT CODE EXISTS; VERIFIED GA4 DESTINATION MISSING.
- Do not invent a `G-...` Measurement ID.
- Once a real ID is available, install it and verify events in Realtime/DebugView.

### 12. Wisconsin digital-product tax / seller registration
- **Status:** UNRESOLVED / CONSEQUENTIAL.
- Do not enable Stripe Tax or publish Shopify digital listings based on a guess.
- Existing Wisconsin DOR inquiry draft can be sent if Jason approves sending it.

### 13. Affiliate monetization
- **Status:** LIVE.
- EPN campaign `5339172120` remains canonical.
- Monitor individual inventory links for expiration; preserve working tracked category/store links.

---

## P2 — Waiting / External Decisions

### 14. Domain
- **Status:** WAITING FOR JASON DECISION.
- Current Vercel alias remains usable.
- Never change DNS/MX records without explicit approval and preservation of email records.

### 15. Real paid transaction proof
- **Status:** EXTERNALLY DEPENDENT.
- Stripe currently has zero completed Checkout Sessions.
- The next legitimate paid order or membership invoice is the proof event; do not manufacture one or claim it happened.

### 16. Existing customer estimate / business work
Customer estimate and Prestige Remodeling work remain higher-priority cash opportunities outside this repo when active. Digital-product work must not cause those revenue items, foreclosure/legal protection items or live lead follow-up to be dropped.

---

## Resume Rule
Highest-priority unblocked Forge work:
1. Preserve urgent legal/foreclosure protection and active estimate/lead cash work in the broader operating system.
2. Drive qualified traffic to the already-live digital funnel instead of rebuilding it.
3. Monitor and prove the first real automated paid order/membership fulfillment.
4. Keep monthly member drops built and mapped ahead of billing periods.
5. Place the finished AI Prompt Pack into the most profitable storefront/channel once price is finalized.
6. Resolve Wisconsin tax/registration before Shopify publication.
7. Install a verified GA4 Measurement ID when one becomes available.

Do not regress to rebuilding completed storefront sections, one-time products, monthly Stripe products, member drops, payment links, affiliate tracking, lead magnet, lead form, Shopify mappings or fulfillment logic unless a verified defect requires correction.