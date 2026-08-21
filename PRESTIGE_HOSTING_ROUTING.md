# Prestige Remodeling - Canonical Hosting / DNS Route

Updated: 2026-08-21

## Decision

**Registrar / DNS:** GoDaddy
**Hosting target:** Vercel
**Do not add Netlify.** A third host would create another competing deployment path and more DNS ambiguity.

## Public-domain state verified 2026-08-21

`https://PrestigeRemodelingWI.com/` currently serves the old generic site with the heading **"Elevate Your Living Space"**. It is not serving the approved Prestige V33 site.

No currently visible Vercel project has `PrestigeRemodelingWI.com` attached as a custom domain.

## Existing Vercel projects

### `prestige-remodeling-website-test`
- Project ID: `prj_Heyf0iIiWAvpL8AhNwecp0uWwUDT`
- Team: `team_0vu8BzrfPHTeUjdq7Z0Si0NF`
- Production alias: `https://prestige-remodeling-website-test.vercel.app`
- Current production content: `<!doctype html><html><body>test</body></html>`
- Status: **TEST ONLY - NOT SAFE TO ROUTE THE CUSTOM DOMAIN TO YET**

This project may be repurposed for the main website only after its production deployment is replaced with the approved V33 payload and verified visually.

### `prestige-revenue-hub`
- Project ID: `prj_9PLZ8HC69q25mokM8WHJD4Xtgvu0`
- Team: `team_0vu8BzrfPHTeUjdq7Z0Si0NF`
- Production alias: `https://prestige-revenue-hub.vercel.app`
- Current content: a separate Prestige contractor-tools/revenue-hub page with digital-product tiers and lead intake.
- Status: **SEPARATE REVENUE HUB - DO NOT ROUTE PrestigeRemodelingWI.com HERE**

### `contractor-tested-picks-site`
- Project ID: `prj_xUofNzAF7d2ZO58EgH7VucYsdd1u`
- Status: live affiliate/content automation site.
- **Do not attach the main remodeling domain to this project.**

## Canonical main-site source

Approved file:
`Prestige_Remodeling_Website_V33_APPROVED_GALLERY_FIX.html`

Deployment filename:
`index.html`

SHA-256 of the approved file currently packaged for handoff:
`7b9fda7215c74c361c69bb4a3abcc6c03a7c5816e6ae6e3134f09c4fb069a8a1`

Locked rules:
- Do not deploy V35/V37 or any alternate redesign as the main site.
- Do not restructure or replace the approved hero/layout without Jason's explicit approval.
- Canonical URL inside the approved file is `https://PrestigeRemodelingWI.com/`.
- Use `Estimates`, never `Free estimates`.

## Correct execution sequence

1. **Choose a single Vercel main-site project.**
   - Preferred path: repurpose `prestige-remodeling-website-test` after replacing the current `test` file with the approved V33 `index.html`.
   - A new dedicated project named `prestige-remodeling-website` is also acceptable if created intentionally. Do not create a Netlify site.

2. **Deploy the approved V33 file as `index.html`.**
   - Verify the Vercel `.vercel.app` deployment first.
   - Confirm hero, gallery/lightbox, estimate form, social/review links, mobile actions, and canonical metadata.
   - Do not change design/content merely to make deployment easier.

3. **Only after the Vercel preview is verified, add both domains to that same Vercel project:**
   - `prestigeremodelingwi.com`
   - `www.prestigeremodelingwi.com`

4. **Keep GoDaddy as registrar/DNS manager.**
   - Do not purchase GoDaddy hosting.
   - Do not transfer the domain simply to host on Vercel.

5. **In Vercel Project Settings -> Domains, copy the exact DNS records Vercel requests.**
   Vercel's current general-purpose values are:
   - Apex/root: `A` record, host `@`, value `76.76.21.21`
   - `www`: `CNAME`, host `www`, value `cname.vercel-dns-0.com`

   **However, Vercel may provide project-specific values. Use the exact values displayed by Vercel for this project if they differ.**

6. **In GoDaddy DNS:**
   - Back up/screenshot the existing DNS records first.
   - Remove/replace only the conflicting website-routing records for `@` and `www` that currently send traffic to the old site.
   - Do **not** delete MX/TXT/mail verification records unless they are independently proven obsolete.
   - Set `@` and `www` to the exact Vercel values from Step 5.

7. **Primary-domain behavior:**
   Because the approved V33 file already declares `https://PrestigeRemodelingWI.com/` as canonical, keep the apex domain as the primary address and redirect `www` to the apex unless Jason explicitly approves a canonical change.

8. **Verify before declaring complete:**
   - Vercel shows both domains as valid/configured.
   - SSL certificate is active.
   - `https://prestigeremodelingwi.com/` loads approved V33, not "Elevate Your Living Space".
   - `https://www.prestigeremodelingwi.com/` redirects to the canonical apex domain.
   - Page source has one H1 and the intended LocalBusiness schema/canonical.
   - All primary CTA/social/review/store links work.
   - Old GoDaddy website content is no longer reachable from the production domain.

## Grok handoff instruction

Do not create a new design. Do not use Netlify. Do not deploy a V37 file. Use the supplied approved V33 `index.html` exactly as the main-site payload. First make it work on one Vercel main-site project, verify the `.vercel.app` deployment, then attach `prestigeremodelingwi.com` and `www.prestigeremodelingwi.com`. Keep DNS at GoDaddy and replace only the old website-routing records with the exact A/CNAME values Vercel gives you. Preserve email records. Return the final Vercel project ID, deployment URL, exact DNS records used, and proof that both custom URLs resolve to approved V33.