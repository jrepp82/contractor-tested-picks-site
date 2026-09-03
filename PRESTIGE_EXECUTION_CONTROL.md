# Prestige Execution Control Board

Updated: 2026-09-03
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

## P0 - Lead engine

Status: `LIVE - DATABASE CAPTURE + OWNER EMAIL ALERT VERIFIED`

Verified on 2026-09-03:
- Production website estimate form posts to the AppDeploy lead API.
- Valid leads are stored before notification attempts.
- The direct API test returned success.
- The server email relay accepted the owner alert and a matching production-origin message arrived at `jreppen82@gmail.com`, with `Jason@PrestigeRemodelingWI.com` copied.
- The five-minute `lead-alert-worker-v2` is enabled with zero failures.

Remaining limitation:
- AppDeploy push alerts require the owner to sign in and enable the device; email is the verified primary alert path.

## P1 - Main Prestige website

Canonical source: approved V33 structure only.
Current approved file: `Prestige_Remodeling_Website_V33_APPROVED_GALLERY_FIX.html`
Rules:
- Do not deploy V35.
- Do not redesign the locked hero/section structure without explicit approval.
- Use `Estimates`, never `Free estimates`.
- Live domain/DNS for `PrestigeRemodelingWI.com` was confirmed on 2026-09-03; AppDeploy serves the production application.

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

Automation status on 2026-09-03:
- The GitHub `Affiliate Social Publisher` workflow exists and contains scheduled jobs for Facebook, Instagram, Threads, TikTok and YouTube Shorts.
- Automatic publishing is not proven because the required platform tokens/secrets cannot be listed or verified through the available connection.
- The AppDeploy Make.com social cron is intentionally disabled because `MAKE_SOCIAL_WEBHOOK_URL` is not configured.
- A tested 30-day batch scheduler and a daily 7:30 AM Central review reminder are active fallbacks; do not call social autopublishing live yet.

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

Status: `LIVE PHYSICAL STORE + UNVERIFIED DIGITAL PRODUCTS PAUSED`
Store: `https://prestige-digitool.myshopify.com/`
Grand Opening Sale:
- `GRANDOPEN10` - 10% off eligible lower-priced physical products.
- `BUNDLE15` - 15% off 2+ eligible lower-priced physical products.
- Recon 2000 excluded from these discounts.

On 2026-09-03, all 15 Digital Contractor Tool listings were changed from ACTIVE to DRAFT because no Shopify order proved their attached-file delivery. Physical Shopify Collective products were not changed.

Do not reactivate a DigiTool until its final files, listing claims, checkout, and delivery path pass QA.

Product status on 2026-09-03:
- Contractor Labor Rate & Break-Even Engine: live at $17.99 through Stripe; no-secrets redirect/download handoff verified.
- Contractor Estimate & Proposal Studio v1.0: product files complete and live-browser QA passed; not yet attached to a public listing or checkout, so keep it draft until its listing and delivery mapping are created.

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

### Contractor Labor Rate & Break-Even Engine

Status: `LIVE - NO-SECRETS STRIPE REDIRECT HANDOFF`

Verified on 2026-09-03:
- Live Payment Link `plink_1UBL1qHB1wxxj42cHzCMtnbA` is active.
- Price is $17.99 USD, one-time, quantity 1, with no shipping.
- Stripe redirects successful payments to `https://prestigeremodelingwi.com/digitools/labor-rate-download.html`.
- The confirmation page exposes the tested ZIP immediately and gives accurate extraction/start instructions.
- The ZIP returns `200 application/zip`; archive integrity and the contained labor-rate calculator were audited.
- The AppDeploy funnel monitor verifies the website, Stripe link, confirmation page and ZIP and currently reports healthy.

Accepted limitation:
- The low-ticket download URL is un-gated and can be shared.
- No real paid transaction was placed during QA.
- Secure per-order verification, refund-state gating and automatic email attachment delivery remain future upgrades requiring a Stripe restricted key/webhook connection.

Completion standard before activating any additional draft DigiTools:
- exact product/file mapping verified,
- checkout success destination verified,
- product file and formula QA passed,
- customer delivery method is visible and truthful,
- a real paid lifecycle test is recorded when feasible.

## P2 - Revenue attribution

Target closed loop:
`product feed -> content idea -> platform post/Reel/Short -> tracked link -> store/marketplace -> purchase -> fulfillment -> attribution`

No component is considered complete if the downstream handoff is missing.

## Final-state rule

The system is finished only when each revenue path can be tested from discovery through purchase/delivery/lead capture and the result can be attributed. Until then, mark the exact blocker rather than calling the network fully operational.