# Prestige Select / Contractor Tested Picks — Visual Overhaul Requirements

**Status:** REQUIRED AFTER FUNCTIONAL LAUNCH VERIFICATION  
**Priority rule:** Finish production routing, revenue-link, checkout, fulfillment, and analytics verification first. Then overhaul the visual experience before major promotion.

## User feedback captured 2026-08-07

The current live storefront is too plain, too black-and-white, and not attention-grabbing enough. Product visuals are also unacceptable as final production assets.

The redesign must stay visually consistent with the Prestige brand. The site should feel cleaner, brighter, more premium, and more professional rather than dark and monochrome.

## Locked Prestige color direction

Use a Prestige-focused palette built around:

- Navy blue as the primary brand anchor.
- Medium blue for strong calls to action, active states, links, and branded accents.
- Light blue for section backgrounds, soft highlights, cards, and visual separation.
- Gray / cool gray for secondary surfaces, borders, supporting text, and neutral balance.
- White as a major background and breathing-space color.
- Black only as a limited contrast/accent color where useful; do not use black as the dominant site background.

The finished site should not feel like a generic black contractor template. It should read immediately as a polished Prestige-branded storefront using blue, navy, gray, light blue, and white throughout the page hierarchy.

## Verified current problem

- `products.js` currently represents each of the 26 product groups with emoji icons such as 🧰, 🔩, 🪚, 🥽, 🏍️, etc.
- `app.js` renders the `p.icon` value directly into the `.product-visual` area.
- These are temporary placeholder visuals, not actual product photography.
- The current eBay CTAs are category/search links rather than fixed individual listings, so a single exact listing photo can become misleading if the underlying eBay results change.

## Required visual overhaul

1. Replace emoji/placeholders with professional product-relevant imagery.
2. Where a card links to a specific individual product/listing, use an image that matches that exact product/listing and is legally/technically appropriate to display.
3. Where a card remains a dynamic eBay category/search link, use polished category imagery or a dynamic feed solution rather than implying that one pictured item is the exact destination listing.
4. Apply the locked Prestige color system across the whole site: navy, medium blue, light blue, gray, and white, with black used sparingly.
5. Rework the hero section so the first screen immediately communicates value and gets attention without relying on an all-black background.
6. Improve product cards with real imagery, stronger calls to action, clearer category/retailer signals, and more premium spacing/layout.
7. Add appropriate real-world contractor/welding/garage/cards imagery across sections instead of an all-black-and-white text-heavy appearance.
8. Add stronger Prestige visual identity through branded accents, better typography, stronger section hierarchy, and more visual depth.
9. Keep mobile performance, accessibility, and affiliate disclosure intact during redesign.
10. Preserve existing working affiliate tracking (`5339172120`) and analytics hooks during the visual rewrite.
11. Perform final desktop/mobile visual QA before any large promotional push.

## Preferred implementation direction

- Functional revenue paths first.
- Visual redesign second.
- Avoid cosmetic work that breaks tracking or checkout.
- Do not treat the current emoji visuals as launch-quality assets.
- Use the Prestige palette consistently across navigation, hero, content sections, product cards, buttons, forms, footer, hover states, and mobile layouts.
