# Prestige Affiliate Content Feed

This is the handoff layer between the Prestige product/affiliate system and the Reels/posting automation.

## What it does

`affiliate-content-feed.json` contains 60 content blueprints tied to canonical product IDs in `normalized-products.json`.

`affiliate-content-feed-builder.js` expands those blueprints into complete platform-ready records containing:

- product
- hook
- three talking points
- CTA
- destination
- tracked URL
- unique tracking ID
- disclosure
- suggested visual
- suggested platforms
- promotion status
- publishing gate

Final links are generated at publishing time through `affiliate-link-builder.js`, so Facebook, Instagram, YouTube Shorts and TikTok traffic can be attributed separately.

## Current mix

- 20 contractor/tool inputs
- 10 welding inputs
- 10 garage/motorcycle inputs
- 10 card/collectible inputs
- 10 Prestige DigiTools inputs

50 blueprints are eligible now. The 10 DigiTools blueprints are gated by `DIGITAL_FULFILLMENT_VERIFIED` and also require the underlying product to be ACTIVE/LIVE before they can resolve into publishable content.

## Grand Opening

Eligible Shopify gear uses the current Prestige launch promotion through September 4, 2026:

- `GRANDOPEN10` — 10% off one eligible item
- `BUNDLE15` — 15% off 2+ eligible items

Recon 2000 is excluded from the promotion.

When the promotion expires, the resolver automatically drops the sale language and falls back to an evergreen product CTA.

## Commands

Validate the 60-item blueprint feed:

```bash
node affiliate-content-feed-builder.js --validate
```

Build Facebook Reel inputs:

```bash
node affiliate-content-feed-builder.js --platform=facebook
```

Build Instagram inputs for a specified date:

```bash
node affiliate-content-feed-builder.js --platform=instagram --date=2026-08-25
```

The output can be consumed by the Reel factory or a scheduler as JSON.

## Release gate for DigiTools

Do not enable until digital fulfillment is verified end to end and the corresponding Shopify products are ACTIVE.

Once both conditions are true, the resolver supports:

```bash
DIGITAL_FULFILLMENT_VERIFIED=true node affiliate-content-feed-builder.js --platform=facebook
```

The product-status check remains in place, so setting the environment variable alone cannot publish a Shopify DRAFT product.

## Content safeguards

- No guaranteed revenue, profit or savings claims.
- No guaranteed card grades.
- Marketplace results are presented as comparison/shopping starting points, not identical recommendations.
- Product safety, load rating, fitment and compatibility must be checked against the actual listing/product specifications.
- Affiliate disclosures stay attached to eBay content.