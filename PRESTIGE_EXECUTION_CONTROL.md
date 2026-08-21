# Prestige Execution Control Board

Updated: 2026-08-21
Owner: Jason Reppen / Prestige
Purpose: one source of truth for what is actually complete, what is blocked, and what must happen next. External AI output from Grok/Gemini is input only until audited and integrated here.

## P0 - Revenue / estimates

### Jeff Hastreiter - 3918 Ellis Street
Status: `ACTIVE - ASPHALT ESTIMATE CORRECTION IN PROGRESS`

Known current basis:
- House + detached garage.
- 24 roofing squares.
- Asphalt overlay over one existing flat/dry three-tab layer, subject to field verification.
- 62 LF ridge/ridge vent.
- 20 LF valley.
- 4 pipe/soil-stack flashings.
- 1 electrical-mast flashing/detail.
- 2 garage box vents removed/closed as applicable.
- Current package review allocates $18,900 to asphalt roofing.

Do not send the older `$12,000` PDF. It contains outdated price/scope presentation, old experience language, banned wording (`field shingles`), and estimate-as-contract signature language.

Required deliverables:
- Internal DSM / pricing check.
- One customer-facing asphalt estimate first.
- Separate Wisconsin residential contract only after customer accepts the estimate.

### Connie Hendries
Status: `ACTIVE - SCOPE INCOMPLETE`

Two separate estimates required:
1. Approx. 40 LF damaged foundation insulation board - repair/re-skim option and replacement option.
2. Repaint small storm-damaged deck.

Known limitation: no final dimensions/prep/product/access details are recorded beyond the approximate 40 LF foundation quantity and small-deck description. Do not invent quantities or a fixed customer price without a defensible basis.

## P1 - Main Prestige website

Canonical source: approved V33 structure only.
Current approved file: `Prestige_Remodeling_Website_V33_APPROVED_GALLERY_FIX.html`
Rules:
- Do not deploy V35.
- Do not redesign the locked hero/section structure without explicit approval.
- Use `Estimates`, never `Free estimates`.
- Confirm live domain/DNS for `PrestigeRemodelingWI.com` before declaring launch complete.

## P1 - Affiliate/content engine

Completed and merged:
- `product-feed-normalizer.js`
- `normalized-products.json`
- `affiliate-link-builder.js`
- `affiliate-content-feed.json` / content feed layer
- `cross-store-promotion-engine.js`
- `prestige-store-network.json`

Supported content destinations include Facebook, Instagram, YouTube Shorts, and TikTok. The current content resolver already emits `youtube-shorts` as a supported platform and the link builder uses deterministic `yt` tracking IDs.

Safety rule:
- Draft/unverified DigiTools must not be represented as live/purchasable until fulfillment is proven.

## P1 - YouTube Shorts

Status: `ACCOUNT CONFIRMED - PUBLIC CHANNEL URL + UPLOAD AUTHORIZATION STILL TO VERIFY`

Verified:
- The Google account has YouTube creator/channel history.
- Google recorded a YouTube Channel authorization on 2026-08-02.
- The Prestige affiliate-content resolver already supports `youtube-shorts`.
- Affiliate/store links can already be generated with YouTube-specific `yt` attribution.

Required to finish automated posting:
1. Resolve and record the current YouTube channel ID, handle, and public URL.
2. Authorize the publisher with Google OAuth 2.0 using the minimum `youtube.upload` scope.
3. Store OAuth client/refresh credentials as deployment secrets, never in GitHub.
4. Verify the authorized channel before every upload.
5. Upload a test Short as private first and confirm title, description, tracking link, disclosure, audience setting and playback.
6. Do not declare public automated posting complete until the Google API project can publish publicly. YouTube currently restricts uploads from unverified API projects to private viewing until the API project passes its required compliance audit.
7. Once verified, feed rendered Reel/Short assets from the same content factory into the YouTube publisher rather than creating a separate YouTube workflow.

## P1 - Shopify

Status: `LIVE PHYSICAL STORE + DIGITAL FULFILLMENT GATED`
Store: `https://prestige-digitool.myshopify.com/`
Grand Opening Sale:
- `GRANDOPEN10` - 10% off eligible lower-priced physical products.
- `BUNDLE15` - 15% off 2+ eligible lower-priced physical products.
- Recon 2000 excluded from these discounts.

Do not activate draft DigiTools until reliable instant fulfillment is confirmed.

## P1 - Marketplace/social connections

See `MARKETPLACE_CONNECTIONS.md`.

- Facebook: operational destination confirmed.
- Instagram: operational destination confirmed.
- YouTube: account/channel relationship confirmed; current public URL and automated upload OAuth still require verification.
- eBay: operational destination confirmed.
- Poshmark: account operational; listing/storefront work remains.
- Pinterest: connected but merchant/domain + Instagram reauthorization repair required.
- TikTok: account/shop linked; seller setup incomplete.
- Etsy: identity verified; shop onboarding incomplete; no confirmed public shop URL yet.

## P1 - Google Business Profile / local SEO

Status: `LIVE PROFILE - OPTIMIZATION/REVIEW GAP`
Public profile currently shows:
- Business: Prestige Exteriors LLC / DBA Prestige Remodeling.
- Phone: 920-242-0969.
- Remodeler primary category plus multiple relevant secondary categories/services.
- 5.0 rating with only 1 Google review as of 2026-08-21.

Immediate local SEO priorities:
1. Audit category choice against actual lead/revenue focus; do not keyword-stuff categories.
2. Update outdated profile bio/specialties/contact information where access permits.
3. Build steady compliant review requests using the canonical Google review link.
4. Add current project photos/videos and keep hours/service areas accurate.
5. Align NAP/branding across website, Google, Facebook, Yelp, Nextdoor and key citations.

Important: the often-cited `32%` GBP figure is an expert-survey estimate (Whitespark/BrightLocal), not a Google-published algorithm weight. Google's official framework is relevance, distance, and prominence.

## P2 - Digital fulfillment

Automated fulfillment watcher exists and is enabled for mapped Stripe/Shopify digital products and memberships.
Completion standard before selling draft DigiTools broadly:
- paid transaction detection verified,
- exact product/file mapping verified,
- duplicate prevention verified,
- customer delivery verified,
- failed/refunded/canceled states do not deliver,
- customer receives correct file exactly once.

## P2 - Revenue attribution

Target closed loop:
`product feed -> content idea -> platform post/Reel/Short -> tracked link -> store/marketplace -> purchase -> fulfillment -> attribution`

No component is considered complete if the downstream handoff is missing.

## Final-state rule

The system is finished only when each revenue path can be tested from discovery through purchase/delivery/lead capture and the result can be attributed. Until then, mark the exact blocker rather than calling the network fully operational.