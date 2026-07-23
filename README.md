# Contractor Tested Picks

A responsive, dark contractor-style static affiliate storefront for **Jason Reppen**, a contractor and Certified Welding Inspector (CWI) with roughly 25 years of construction, remodeling, welding, and fabrication experience.

## Categories

- Contractor Tools
- Welding & Shop Gear
- Garage & Harley
- Cards & Collectibles
- Deals

## Affiliate link setup

Open `products.js` and replace these placeholders after each affiliate approval:

- `REPLACE_WITH_LOWES_AFFILIATE_URL`
- `REPLACE_WITH_HOME_DEPOT_AFFILIATE_URL`
- `REPLACE_WITH_EBAY_AFFILIATE_URL`
- `REPLACE_WITH_ACE_AFFILIATE_URL`
- `REPLACE_WITH_NORTHERN_TOOL_AFFILIATE_URL`

Until a real URL is inserted, retailer buttons are intentionally blocked and display a reminder instead of sending visitors to a fake link.

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Docker

```bash
docker build -t contractor-tested-picks .
docker run --rm -p 8080:80 contractor-tested-picks
```

## AWS Amplify

`amplify.yml` publishes the repository root as a static artifact directory. There are no dependencies or build tools required.

## Disclosure

The site includes a dedicated FTC-style affiliate disclosure page plus shorter disclosures on shopping surfaces. Before public launch, verify the current disclosure and branding requirements for every affiliate program used.
