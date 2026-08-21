# Prestige Website Launch Routing

Updated: 2026-08-21

## Source of truth

- Canonical website source: `Prestige_Remodeling_Website_V33_APPROVED_GALLERY_FIX.html`
- Do not deploy V35, V37, or any outside AI rebuild unless Jason explicitly approves replacing V33.
- For static hosting, deploy the approved V33 content as root `index.html`.
- Locked content rules include: preserve approved hero/section structure, use `Estimates` not `Free estimates`, preserve approved contact/social/review links.

## Architecture

- Domain registrar: GoDaddy.
- DNS changes should remain at the current authoritative DNS provider unless there is a specific reason to move nameservers. Do not move the domain to Netlify.
- Hosting target: Vercel.
- Do not create a second Netlify hosting stack.
- Do not point `PrestigeRemodelingWI.com` to Contractor Tested Picks or Prestige Revenue Hub.

## Correct Vercel target

Team/account ID:
`team_0vu8BzrfPHTeUjdq7Z0Si0NF`

Existing website project:
- Project name: `prestige-remodeling-website-test`
- Project ID: `prj_Heyf0iIiWAvpL8AhNwecp0uWwUDT`
- Current Vercel production URL: `https://prestige-remodeling-website-test-33dkfe8q4.vercel.app`
- Project currently has only Vercel subdomains; `prestigeremodelingwi.com` is not attached as a custom domain as of 2026-08-21.

Other projects that are NOT the target for the main remodeling domain:
- `contractor-tested-picks-site` — `prj_xUofNzAF7d2ZO58EgH7VucYsdd1u`
- `prestige-revenue-hub` — `prj_9PLZ8HC69q25mokM8WHJD4Xtgvu0`

## Current public-state problem

`https://PrestigeRemodelingWI.com/` still serves the old generic page with the heading `Elevate Your Living Space`, not the approved V33 custom site. Therefore the custom domain is still routed to the old destination rather than the approved Vercel website deployment.

## Required launch sequence

1. Deploy the approved V33 source to the existing `prestige-remodeling-website-test` project as the production root `index.html`.
2. Verify the Vercel preview/production URL shows the approved V33 site before touching DNS.
3. Add both custom domains to that exact Vercel project:
   - `prestigeremodelingwi.com`
   - `www.prestigeremodelingwi.com`
4. Run Vercel domain inspection and use the exact DNS records Vercel displays for this project.
5. At the authoritative DNS host, replace only conflicting web-hosting records for the root `@` and `www`.
6. Preserve all unrelated MX/TXT/SPF/DKIM/DMARC/email verification records. Do not wipe the DNS zone because Prestige business email may depend on it.
7. Current Vercel documentation commonly expects:
   - apex/root `@` A -> `76.76.21.21`
   - `www` CNAME -> `cname.vercel-dns-0.com`
   Treat Vercel's live `domains inspect` output as authoritative if it gives a different/current value.
8. Remove old conflicting GoDaddy website-builder/parking A/AAAA/CNAME records only after the Vercel project is ready and the replacement values are known.
9. Verify both domains in Vercel until status is valid and SSL is issued.
10. Choose one canonical URL and redirect the other. Preferred canonical: `https://prestigeremodelingwi.com/` with `www` redirecting to apex unless Jason directs otherwise.
11. Test logged-out/public access on desktop and mobile.
12. Confirm these V33-specific markers before declaring completion:
   - Prestige Remodeling/Prestige Exteriors branding, not `Elevate Your Living Space`
   - phone `920-242-0969`
   - email `Jason@prestigeremodelingwi.com`
   - Facebook `https://www.facebook.com/Prestigeexteriorsllc`
   - Instagram `https://www.instagram.com/Jason_Reppen`
   - Google review CTA `https://g.page/r/CaXV3fVM4owyEAE/review`
   - no `Free estimates`
   - approved deck gallery/lightbox still works

## Hard stop rules

- Do not deploy `Prestige_Remodeling_Website_v37_WORKING.html` from Grok's handoff. It is not the approved canonical source.
- Do not deploy V35.
- Do not create a Netlify site for the main domain.
- Do not change MX/TXT/email records while moving the website.
- Do not call the site live until the public custom domain shows approved V33 and both root/www routing are verified.
