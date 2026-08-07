# Contractor Tested Picks / Prestige Select

A zero-cost-startup affiliate storefront and lead-generation hub for Jason Reppen.

## Current stack

- Static HTML, CSS, and JavaScript
- No database or paid runtime dependency
- Vercel-ready through `vercel.json`
- AWS Amplify-ready through `amplify.yml`
- Docker-ready for local preview
- eBay Partner Network tracking campaign: `5339172120`
- Browser-side outbound affiliate-click events in `app.js`

## Current site assets

- Storefront and 26 tracked product groups
- About, disclosure, privacy, contact, and blog pages
- Lead-capture email workflow
- Three revenue-linked articles
- `robots.txt` and `sitemap.xml`
- Seven-day content bank and 30-day social/Shorts calendar under `forge-deliverables/`

## Deployment and verification

Follow the complete step-by-step instructions in:

[`DEPLOYMENT_AND_CLICK_VERIFICATION.md`](DEPLOYMENT_AND_CLICK_VERIFICATION.md)

That guide covers:

1. Importing the repository into Vercel
2. Finding and testing the production URL
3. Connecting or correcting the custom domain
4. Verifying `affiliate_outbound_click` events in browser developer tools
5. Connecting GA4 and confirming a real test event
6. Turning calendar landing paths into full live URLs
7. Scheduling Meta posts and YouTube Shorts

## Update affiliate links

Edit `products.js`. Preserve the eBay campaign ID and use a unique custom tracking value for each product group. Do not publish placeholder URLs as active products.

## Local Docker preview

```bash
docker build -t contractor-tested-picks .
docker run --rm -p 8080:80 contractor-tested-picks
```

Then open `http://localhost:8080`.

## Deployment completion standard

Deployment is not complete until the production URL is recorded, all core routes load, an eBay outbound link works, and at least one `affiliate_outbound_click` event is observed in browser tools. If GA4 is installed, verify the same test event in Realtime or DebugView.

## Affiliate rollout status

- eBay: active through campaign `5339172120`
- Lowe's, Home Depot, Northern Tool, Ace, Walmart, and Amazon: add only after approval and valid tracking links are confirmed
