# Prestige Marketplace Connections - Verified State

Updated: 2026-08-21

This is the source-of-truth operating record for marketplace/social connection status. Do not mark a channel complete merely because an account exists. A channel is `OPERATIONAL` only when its public destination resolves and the required selling/publishing path is configured.

## Status definitions

- `OPERATIONAL` - public destination confirmed and core path can be used.
- `CONNECTED_SETUP_INCOMPLETE` - account/link exists but seller/merchant configuration blocks full operation.
- `ACCOUNT_EXISTS_ONBOARDING_INCOMPLETE` - account exists but no confirmed live public shop yet.
- `MANUAL_ACCOUNT_ACTION_REQUIRED` - authenticated account/security fields must be completed by the account owner.

## Pinterest

**Account:** `jreppen82`
**Public profile:** `https://www.pinterest.com/jreppen82/`
**Status:** `CONNECTED_SETUP_INCOMPLETE`

Verified facts:
- Pinterest account exists and previously supported Instagram auto-publishing.
- Instagram authorization is currently disconnected and must be re-authorized.
- Pinterest merchant review rejected the merchant because the submitted domain URL was considered broken.
- Pinterest had recorded `gx01a8-50.myshopify.com`.
- The connected Prestige Shopify store reports the public storefront domain `prestige-digitool.myshopify.com`.
- `gx01a8-50.myshopify.com` currently redirects to `prestige-digitool.myshopify.com`; therefore the issue is not simply an unrelated/dead store. The safest repair is to reconnect Pinterest to Shopify and ensure Pinterest claims the canonical public storefront URL.

Preferred repair order:
1. In Pinterest, re-link the Instagram professional account and restore auto-publishing if desired.
2. In Pinterest claimed accounts/websites, remove or replace any stale/broken merchant-domain claim.
3. Reconnect using the Pinterest for Shopify app where available. Pinterest recommends the Shopify integration over a manually installed tag because it handles website claim, tag/Conversions API, catalog connection, and Product Pins together.
4. Confirm the claimed website resolves to `https://prestige-digitool.myshopify.com/`.
5. Confirm catalog ingestion and merchant diagnostics are clean.
6. Re-submit/appeal merchant approval only after the domain/catalog state is healthy.

Do not treat a manual HTML tag alone as completion if the catalog/merchant integration remains broken.

## TikTok / TikTok Shop

**TikTok account:** `@jreppen82`
**Public profile:** `https://www.tiktok.com/@jreppen82`
**Status:** `CONNECTED_SETUP_INCOMPLETE`

Verified facts:
- TikTok Business Account exists.
- TikTok confirms the account is already linked to TikTok Shop.
- Business verification is complete.
- TikTok Shop is not ready to sell until seller setup is completed.

Required Seller Center completion:
1. Warehouse / pickup address.
2. Return warehouse/address.
3. Shipping method/settings.
4. U.S. W-9 / taxpayer information.
5. Bank account / payout information.
6. Shop profile basics and catalog/listings.

These are authenticated seller/security fields. They cannot be safely fabricated or inferred by automation.

Completion gate:
- Seller Center no longer reports shop setup incomplete.
- At least one eligible product is live and purchasable.
- Payout account is connected.
- Shipping/return workflow is configured.

## Poshmark

**Account:** `@jreppen82`
**Public closet:** `https://poshmark.com/closet/jreppen82`
**Status:** `OPERATIONAL_ACCOUNT`

Verified facts:
- Account is active.
- Seller drafts exist.

Remaining work is storefront/listing execution, not account connection.

## Etsy

**Account state:** account exists; identity verification succeeded.
**Public shop URL:** not yet confirmed.
**Status:** `ACCOUNT_EXISTS_ONBOARDING_INCOMPLETE`

Verified facts:
- Etsy confirmed identity verification.
- Etsy's seller onboarding message directed the account to continue/finish shop setup.
- No reliable public shop URL has been confirmed yet, so no URL should be fabricated.

Current Etsy setup requirements for a U.S. seller include:
1. Complete Etsy Payments enrollment.
2. Enter/verify taxpayer/business information.
3. Connect and verify the U.S. bank account through Plaid during opening.
4. Add the required billing card.
5. Finish shop preferences/name/branding/policies.
6. Create the first valid listing(s) and finish opening the shop.
7. Record the final public shop URL here once Etsy publishes it.

Completion gate:
- Shop Manager opens as a live shop, not onboarding.
- Public shop URL resolves while logged out.
- At least one listing is public.
- Payment/billing setup shows no opening blocker.

## Shopify

**Store:** Prestige Digitool
**Canonical public storefront:** `https://prestige-digitool.myshopify.com/`
**Status:** `OPERATIONAL`

This canonical URL should be used by Pinterest merchant/catalog setup unless Shopify/Pinterest explicitly supplies a different verified canonical destination.

## eBay

**Store:** JRep82 Random Treasures / Prestige Random Treasures
**Public store:** `https://www.ebay.com/str/prestigerandomtreasures`
**Status:** `OPERATIONAL`

Affiliate layer:
- eBay Partner Network campaign: `5339172120`
- Affiliate links must retain tracking/custom IDs and required disclosure.

## Facebook / Instagram / Google reviews

- Facebook: `https://www.facebook.com/Prestigeexteriorsllc`
- Instagram: `https://www.instagram.com/Jason_Reppen`
- Google review CTA: `https://g.page/r/CaXV3fVM4owyEAE/review`

These are confirmed canonical destinations for Prestige content, trust links, and review requests.

## Operating rule

Connection state and public URL must be checked before a publishing/commerce automation uses a destination. Never publish to a placeholder, draft shop, failed merchant catalog, or unverified checkout.