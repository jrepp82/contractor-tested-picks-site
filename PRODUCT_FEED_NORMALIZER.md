# Prestige Product Feed Normalizer

## Purpose

This is the shared product contract for Contractor Tested Picks and the Prestige commerce network.

It lets the same downstream content, store cards, analytics, and automation code work with:

- Shopify products
- Shopify Collective products
- Prestige DigiTools
- eBay Partner Network search feeds
- specific eBay listings
- future Amazon affiliate feeds
- future Home Depot affiliate feeds
- other approved affiliate programs

## Canonical fields

Every normalized product uses:

- `product_id`
- `source_type`
- `source_id`
- `product_name`
- `category`
- `image`
- `current_price`
- `currency`
- `retailer`
- `destination`
- `affiliate_url`
- `campaign_id`
- `custom_id`
- `description`
- `jason_tested`
- `featured`
- `status`
- `availability`
- `last_verified_date`
- `content_hooks`
- `disclosure_requirement`
- `tags`

## Safety rule for draft products

`DRAFT` Shopify products are allowed in `normalized-products.json` for internal planning, but they are marked `NOT_FOR_SALE`.

Downstream publishing code should use:

```js
PrestigeProductNormalizer.publishable(feed.products)
```

That filters out draft/non-live products.

This is especially important for Prestige DigiTools until automated digital fulfillment has been verified.

## eBay tracking

Existing eBay Partner Network campaign:

`5339172120`

The normalizer preserves each product/search `custom_id` so traffic can later be attributed by content source.

## Current seeded feed

The initial normalized feed contains:

- 26 existing Contractor Tested Picks eBay EPN search groups
- 13 products from the connected Shopify catalog
- both ACTIVE and DRAFT Shopify products, with status preserved

No Amazon or Home Depot affiliate URLs are fabricated. Their adapter types exist so approved feeds can be added later without changing the schema.

## Validation

`validateProduct(product)` checks required fields and prevents a Shopify `DRAFT` product from being treated as `LIVE`.

`buildFeed(products)` validates the entire feed before returning the canonical feed object.
