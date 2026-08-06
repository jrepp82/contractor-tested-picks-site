# Forge Progress — Affiliate Click Tracking

**Date:** 2026-08-06
**Active assignment:** Finish and deploy Prestige Select / Contractor Tested Picks website

## Verified work completed

- Updated `app.js` to capture outbound clicks to `ebay.com` and `ebay.io`.
- Each click now records:
  - destination URL
  - product/listing name
  - category or eBay `customid`
  - page path
  - ISO timestamp
- Events are pushed to `window.dataLayer` using the event name `affiliate_outbound_click`.
- A browser event named `ctp:affiliate-click` is also dispatched for future analytics integrations.
- The last 100 click events are retained locally in `localStorage` under `ctp_affiliate_clicks` for browser-side verification before a production analytics provider is connected.
- Dynamically rendered product buttons now include the `affiliate-link` class.

## Verification

GitHub commit: `f68564411661ba03c64e94eb9ef10c9d8f3ae195`

## Current blocker

The connected Vercel account still has no imported project for `jrepp82/contractor-tested-picks-site`, so production deployment and live event verification cannot be completed yet.

## Exact resume point

After the repository is imported into Vercel:

1. Deploy `main`.
2. Confirm the production domain.
3. Test every route and all 26 product groups.
4. Verify `affiliate_outbound_click` events in the browser data layer.
5. Connect the event stream to the selected analytics platform.
6. Replace the provisional domain in `sitemap.xml` and `robots.txt` if necessary.
