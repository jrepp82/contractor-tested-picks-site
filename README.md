# Contractor Tested Picks

A zero-cost-startup affiliate storefront/link hub for Jason Reppen.

## Stack
- Static HTML/CSS/JavaScript
- No database
- No paid dependencies
- AWS Amplify-ready
- Docker-ready

## Update affiliate links
Edit `products.js`. Replace `url: '#'` with the approved tracking URL and update the status/retailer fields.

## Local Docker preview
```bash
docker build -t contractor-tested-picks .
docker run --rm -p 8080:80 contractor-tested-picks
```
Then open http://localhost:8080.

## AWS Amplify
Connect this GitHub repo in Amplify Hosting and deploy the `main` branch. `amplify.yml` is included.

## Current affiliate rollout status (July 23, 2026)
- eBay: affiliate registration active; tracking links not yet inserted
- Lowe's: application submitted; approval/link pending
- Home Depot: application submitted; approval/link pending
- Northern Tool: CJ publisher setup in progress; advertiser link pending
- Ace / Walmart / Amazon: add only after their applications or eligibility are confirmed
