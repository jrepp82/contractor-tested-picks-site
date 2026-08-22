# Current Execution Order

**Owner:** Forge / ChatGPT  
**Last updated:** 2026-08-21  
**Source of truth:** this file + `FORGE_PRODUCTION_QUEUE.md` + `SUBSCRIPTION_AUTOMATION_SPEC.md` + `MEMBERSHIP_RELEASE_MAP_M01_M06.md` + live Stripe/Drive/GitHub/Vercel evidence.

## Mandatory Startup Rule
Read the source-of-truth files before digital revenue work. Audit live state before trusting old chats. Resume unfinished work after every interruption. Completion requires a verified deliverable or confirmed external action.

## Mandatory Continuity / Decision-Preservation Rule
Continuity is a hard requirement, not a preference.

Before changing branding, pricing, product names, website structure, funnel architecture, automation flow, deployment, or task status:
1. Read the current source-of-truth and relevant locked-decision files first.
2. Inspect the current live/repo state instead of assuming an older chat or artifact is current.
3. The newest explicit owner decision overrides older conflicting files or assistant output.
4. Preserve existing approved/working architecture and make surgical changes unless Jason explicitly orders a rebuild.
5. Never create a duplicate project, duplicate storefront, duplicate funnel, or replacement system when an existing one can be continued.
6. Interrupted work remains ACTIVE / IN PROGRESS and must be resumed from the exact stopping point after new requests are handled.
7. Distinguish clearly between WORKING, IN PROGRESS, READY FOR OWNER ACTION, DEPLOYED and VERIFIED DONE. Do not call something done because a draft/file/commit exists.
8. Never change locked prices, payout/bank/tax settings, irreversible data, or unverified legal/licensing claims without required owner approval.
9. Treat Automated Money Machines, Prestige Select, Prestige DigiTools, affiliate marketing, eBay, website traffic, email capture, checkout, fulfillment, memberships, analytics, content distribution and local Prestige Remodeling lead generation as ONE connected revenue system, not separate side projects.
10. When prior context is available, use it before asking Jason to repeat information.

## Mandatory New-Idea Execution Rule
Any business, revenue, automation, marketing, affiliate, e-commerce, digital-product, content, or AI idea Jason sends is an execution target by default, not an inspiration item. In the same work session: verify what can be verified, identify the shortest path to revenue or risk reduction, adapt it to the existing Prestige system, create or modify the usable asset when tools permit, connect it to a monetization/lead path, test the result, and record any genuine external blocker. Do not create a passive "ideas" backlog when executable work can be completed now.

## Mandatory Production Quality / Sellability Gate
Functional is not finished. Every customer-facing Prestige revenue asset must be treated as production-grade commerce and must meet the highest practical quality available with the current tools before it is called complete.

Required by default:
- premium, modern, attention-grabbing visual hierarchy consistent with the Prestige brand;
- no emoji placeholders, generic filler cards, blank visuals, lorem ipsum, temporary copy, dead buttons, untracked monetization links, or knowingly weak presentation left in production;
- strong naming, headline, offer framing, product merchandising, CTA hierarchy and trust signals designed to maximize legitimate conversion without deceptive claims;
- each page must feed at least one real revenue or lead path and, when relevant, cross-connect affiliate sales, digital products, memberships, eBay inventory, email capture and Prestige Remodeling leads rather than becoming an isolated microsite;
- product/category cards must have intentional product-specific visual treatment and clear buying intent; dynamic affiliate search cards must not falsely imply one pictured listing is the exact live destination;
- mobile must receive the same quality standard as desktop: readable typography, balanced spacing, polished cards, obvious CTAs and no awkward overflow or giant empty sections;
- preserve verified Stripe checkout, fulfillment, EPN tracking, disclosures, analytics and lead routing while improving presentation;
- perform live production verification after meaningful customer-facing changes;
- proactively improve obvious quality defects when discovered instead of waiting for Jason to identify them.

A page that merely loads is not done. A page is done only when it is functional, connected, sellable, visually credible and verified in production.

## 1. Live revenue system
Production: `https://contractor-tested-picks-site.vercel.app`
Repo: `jrepp82/contractor-tested-picks-site`, `main`, Vercel auto-deploy.

Live/protected:
- one-time Prestige ladder $6.99 / $16.99 / $49.99 / $99.99;
- separate Starter V1 $19;
- ten standalone Stripe products at `/standalone-tools.html`;
- AI Prompt Pack $14 at `/ai-prompt-pack.html`;
- four live monthly memberships $19 / $39 / $79 / $149;
- free Profit Leak Checklist + Klaviyo capture;
- remodeling lead form;
- eBay/EPN campaign `5339172120`.

Do not rebuild working systems without a verified defect.

## 2. Monthly membership runway — M01-M06 COMPLETE / MAPPED
Canonical fulfillment:
- membership identity = Stripe `subscription.id`;
- unique delivery key = PAID Stripe `invoice.id`;
- subscriber month = chronological count of successful paid subscription invoices;
- failed/unpaid/void invoices do not advance the sequence.

All four live Stripe membership products now carry dynamic metadata keys `m01...m06_drive_id` + `m01...m06_file`, use schema `subscriber_month_sequence_v1`, and have `max_mapped_month=6`.

The hourly watcher dynamically reads those Stripe metadata keys instead of carrying a fragile hard-coded monthly file table.

Canonical M01-M06 IDs and filenames: `MEMBERSHIP_RELEASE_MAP_M01_M06.md`.

Release themes:
- M01: welcome/core system
- M02: second-cycle package
- M03: pricing/profit/referral + 90-Day Profit Review
- M04: cash collection/schedule control + 13-Week Cash Forecast
- M05: estimate conversion/scope control + Estimate Win/Loss Analytics
- M06: active-job health/margin rescue/closeout + Active Job Health workbook + Premium Six-Month Owner Review

M03-M06 passed customer-facing visual QA, spreadsheet formula/error scans, relevant live-number smoke tests, ZIP integrity, Drive upload, persistent Library storage, Stripe metadata mapping, and fulfillment mapping.

Latest Stripe subscription audit returned zero subscriptions. No real paid membership delivery is proven yet; do not manufacture proof.

## 3. Fulfillment automation — ACTIVE
`Digital Product + Membership Fulfillment` / `6a7660320e308191aec8cab859c03046`, hourly condition watch.
Covers core one-time products, all ten standalone products, mapped Shopify tier orders, and dynamic membership delivery through M06.

One-time dedupe = completed Checkout Session ID.
Membership dedupe = paid Invoice ID.

## 4. Immediate execution order — NOW
1. Protect urgent foreclosure/legal deadlines and active contracting cash opportunities whenever actionable.
2. **Drive qualified organic traffic to the already-live digital funnel.** The build runway is no longer the main blocker.
3. Monitor the first legitimate paid one-time order / membership invoice and immediately audit actual delivery, attachment, dedupe marker and timing.
4. Surgically correct stale public membership wording so the page matches the one-package-per-paid-cycle system, without changing working prices/URLs.
5. Fix Customer Portal / Klaviyo nurture / GA4 when verified writable credentials/settings exist.
6. Resolve Wisconsin digital-product tax / seller-registration before Shopify publication.
7. Build M07 before a seventh paid renewal can occur; do not build endless future months ahead of traffic and proof.

## 5. Verified remaining gaps
### Stripe Customer Portal
No active Billing Portal configuration was found. Do not claim portal is live. Desired eventual settings: payment-method update ON, invoice history ON, cancellation ON.

### GA4
Event code exists, but no verified Measurement ID is available. Never invent one.

### Klaviyo
Free-checklist capture is live; triggered nurture is not independently verified.

### Shopify / Wisconsin tax
Shopify digital tier products remain draft. Wisconsin tax/seller-registration status remains unresolved. Do not publish or enable Stripe Tax from a guess.

### Main membership page copy
Some wording still reflects the old separate onboarding + drop architecture. The Stripe metadata + fulfillment automation + `SUBSCRIPTION_AUTOMATION_SPEC.md` are canonical until the page copy is surgically corrected.

Never regress completed products or M01-M06 back to PLANNED without verified evidence.
