# Forge Production Queue

**Owner:** Forge / ChatGPT  
**Business:** Prestige / Prestige Exteriors / Prestige Select / Contractor Tested Picks  
**Repository:** `jrepp82/contractor-tested-picks-site`  
**Last updated:** 2026-08-19

## Operating Rules
1. Resume the highest-priority unfinished task unless Jason explicitly redirects.
2. Interruptions do not cancel in-progress work.
3. Completion requires verified deliverables/external actions.
4. Audit Forge/Grok/Gemini claims against live systems.
5. Fix verified defects while working; do not park them as vague future items.
6. Protect working revenue systems.

## P0 — LIVE REVENUE
- Production funnel live at `https://contractor-tested-picks-site.vercel.app`.
- Core one-time ladder live.
- Ten standalone products live and fulfillment-mapped.
- Four monthly memberships live.
- Hourly fulfillment automation `6a7660320e308191aec8cab859c03046` active.
- M01-M06 are fully built, QA'd, stored, mapped and dynamically resolvable from Stripe product metadata.

## Membership runway — M01-M06 COMPLETE
Canonical rules:
- paid Stripe `invoice.id` = unique monthly delivery key;
- `subscription.id` = membership identity;
- subscriber month = successful paid subscription-invoice sequence;
- Stripe metadata `mNN_drive_id` + `mNN_file` = canonical package lookup;
- all four membership products have `max_mapped_month=6`.

See `MEMBERSHIP_RELEASE_MAP_M01_M06.md` for exact Drive IDs and filenames.

M03-M06 passed complete release lifecycles including visual QA, workbook formula checks/smoke tests, ZIP integrity, Drive upload, Library persistence, Stripe mapping and fulfillment mapping.

M06 specifically passed:
- one GREEN active job at 40.9% projected margin;
- one RED job at 10% projected margin;
- correct portfolio contract/cost/profit/margin/payment/unpaid values;
- correct GREEN/WATCH/RED counts;
- closeout example at 33.3% gross margin;
- zero spreadsheet formula errors.

## P1 — NEXT REVENUE WORK
### 1. First paid fulfillment proof — MONITOR / HIGHEST DIGITAL VALIDATION
Latest live Stripe subscription audit returned zero subscriptions. Do not manufacture proof.
On the first legitimate one-time purchase or paid membership invoice:
- verify actual Gmail delivery;
- verify exact attachment;
- verify Checkout Session or paid Invoice dedupe marker;
- verify delivery timing;
- fix any defect immediately.

### 2. Organic traffic / distribution — CASH-NOW
The build runway is no longer the bottleneck.
- Cold contractor traffic → free Profit Leak Checklist.
- Specific contractor problem → `/standalone-tools.html`.
- AI-interest contractor traffic → `/ai-prompt-pack.html`.
- Warm buyers → one-time ladder or monthly memberships.
- eBay intent → tracked EPN paths.
No paid ad spend without Jason approval.

### 3. Public membership wording — SURGICAL FIX
`digital-products.html` still contains some obsolete wording from the old separate onboarding + monthly-drop model. Correct the copy to one complete M01 welcome package followed by one package per successful paid subscriber cycle. Preserve all working prices and Stripe URLs.

### 4. Stripe Customer Portal — VERIFIED GAP
No active Billing Portal configuration was returned. Desired settings: update payment method ON, invoice history ON, cancellation ON. Do not claim it is live until independently verified. Connected Stripe write surface has not exposed portal-configuration creation.

### 5. Klaviyo nurture — VERIFIED GAP
Free-checklist capture is live; triggered welcome/upsell nurture is not independently verified.

### 6. GA4 — VERIFIED GAP
Event hooks exist but no verified Measurement ID is available. Never invent a `G-...` ID.

### 7. Shopify / Wisconsin tax — BLOCKED BY CONSEQUENTIAL TAX STATUS
Shopify tier products remain draft. Do not publish or enable Stripe Tax from an assumed Wisconsin classification. Existing DOR inquiry requires Jason approval before sending.

### 8. M07 — BUILD WHEN IT SERVES THE RUNWAY
M07 is not yet built. Build it before a seventh paid renewal can occur, using the same build → QA → Drive → Library → Stripe metadata lifecycle. Do not spend all production time building endless future months while traffic and first-sale proof are still missing.

## P2 — BROADER BUSINESS CASH / LEGAL
When immediately actionable, foreclosure/bankruptcy deadlines, active remodeling estimates, receivables and hot contracting leads outrank long-horizon digital polish.

## Resume Rule
1. Protect legal/contracting cash emergencies.
2. Monitor first real paid fulfillment proof.
3. Drive organic traffic to already-live revenue surfaces.
4. Fix stale membership copy and platform conversion gaps.
5. Build M07 before it becomes operationally necessary.

Never regress completed assets or live links back to PLANNED without verified evidence.