# Deployment, Live URLs, Scheduling, and Affiliate Click Verification

This guide is the exact resume point for putting the Prestige Select / Contractor Tested Picks site live and connecting content to working URLs.

## 1. Import the GitHub repository into Vercel

1. Sign in to Vercel using the GitHub account that can access `jrepp82/contractor-tested-picks-site`.
2. From the Vercel dashboard, choose **Add New → Project**.
3. Under **Import Git Repository**, locate `jrepp82/contractor-tested-picks-site`.
4. Select **Import**.
5. Leave the framework preset as **Other** because this is a static HTML/CSS/JavaScript site.
6. Leave the root directory as the repository root (`./`).
7. Do not add environment variables for the initial deployment.
8. Choose **Deploy**.

After deployment, Vercel will display a production address similar to:

`https://contractor-tested-picks-site.vercel.app`

That address is the first verified live base URL. Do not substitute or guess a custom domain before it is connected and verified.

## 2. Record and test the live URLs

Starting with the Vercel base URL, test these pages in a browser:

- `/`
- `/shop.html`
- `/about.html`
- `/blog.html`
- `/contact.html`
- `/disclosure.html`
- `/privacy.html`

Example:

`https://contractor-tested-picks-site.vercel.app/blog.html`

A route is verified only after it loads successfully and its navigation, images, and buttons work.

## 3. Confirm or connect the custom domain

The repository currently references `https://prestigeremodelingwi.com/` in `robots.txt` and `sitemap.xml`. Use that domain only if it is intentionally assigned to this storefront.

In Vercel:

1. Open the project.
2. Choose **Settings → Domains**.
3. Enter the intended domain.
4. Follow Vercel's DNS instructions at the domain registrar.
5. Wait until Vercel shows the domain as valid.
6. Open every important route using the custom domain.

If a different storefront domain is chosen, update `robots.txt`, `sitemap.xml`, the content calendar, and all social calls to action before publishing.

## 4. Verify browser-side affiliate click events immediately

The current site records outbound affiliate clicks in three places:

- `window.dataLayer` as `affiliate_outbound_click`
- a browser event named `ctp:affiliate-click`
- local browser storage containing the latest click records

To test without Google Analytics:

1. Open the deployed shop page in Chrome.
2. Press **F12** or right-click and choose **Inspect**.
3. Open the **Console** tab.
4. Enter:

```js
window.dataLayer
```

5. In another tab or after returning to the page, click one eBay product button.
6. Return to the Console and enter:

```js
window.dataLayer.filter((item) => item.event === 'affiliate_outbound_click')
```

A successful result should show an object containing the clicked product/listing name, destination URL, category or tracking identifier, page path, and timestamp.

To inspect the stored recent events, open **DevTools → Application → Local Storage**, select the deployed domain, and look for the affiliate click-history entry. The site retains up to 100 recent browser-side events for testing.

## 5. Verify the custom browser event

Before clicking a product, paste this into the Console:

```js
window.addEventListener('ctp:affiliate-click', (event) => {
  console.log('Verified affiliate event:', event.detail);
});
```

Then click a product. A successful event prints `Verified affiliate event:` followed by the click details.

## 6. Connect Google Analytics 4 after the site is live

1. Open Google Analytics and create or select a GA4 property.
2. Create a **Web** data stream for the verified production domain.
3. Copy the Measurement ID in the form `G-XXXXXXXXXX`.
4. Add the Google tag to every public HTML page or deploy it through Google Tag Manager.
5. In GA4, open **Admin → DebugView** or **Reports → Realtime**.
6. Visit the production shop page and click one affiliate product.
7. Confirm that `affiliate_outbound_click` appears.

Do not mark analytics complete solely because the tag is installed. Completion requires one observed test click in GA4 Realtime or DebugView.

## 7. Turn relative content-calendar paths into live URLs

The 30-day calendar contains landing paths such as `/shop.html` or `/blog.html`. Combine each path with the verified production base URL.

Example:

- Base URL: `https://contractor-tested-picks-site.vercel.app`
- Landing path: `/blog.html`
- Scheduled link: `https://contractor-tested-picks-site.vercel.app/blog.html`

After a custom domain is verified, replace the Vercel address with that domain in future scheduled content.

## 8. Schedule Meta content

In Meta Business Suite:

1. Open **Planner**.
2. Choose **Create post** or **Create reel**.
3. Select the Facebook Page and Instagram account.
4. Paste the finished copy from the seven-day bank or 30-day calendar.
5. Upload the matching image or vertical video.
6. Paste the verified full landing URL.
7. Use the preview to confirm the link and formatting.
8. Choose **Schedule**, select the date/time, and save.

Before scheduling the full batch, publish or schedule one test post and open its link from a phone.

## 9. Schedule YouTube Shorts

In YouTube Studio:

1. Choose **Create → Upload videos**.
2. Upload a vertical video, preferably 9:16 and under 60 seconds unless the current Shorts limits permit otherwise.
3. Add the finished title and description.
4. Put the verified full landing URL near the beginning of the description.
5. Complete audience and disclosure settings.
6. Under **Visibility**, choose **Schedule**.
7. Select the date/time and save.

Test the first scheduled Short's description link after publication before loading the remaining batch.

## Verified completion standard

The website/deployment stage is complete only when all of the following are true:

- The GitHub repository is linked to a Vercel project.
- `main` has a successful production deployment.
- A production base URL is recorded.
- All core routes load.
- At least one eBay outbound link opens correctly.
- One `affiliate_outbound_click` event is observed in browser tools.
- If GA4 is installed, one event is observed in Realtime or DebugView.
- The content calendar contains full verified URLs rather than unverified placeholders.
