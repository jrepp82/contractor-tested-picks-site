# Prestige Select / Contractor Tested Picks — Visual Overhaul Requirements

**Status:** REQUIRED AFTER FUNCTIONAL LAUNCH VERIFICATION  
**Priority rule:** Finish production routing, revenue-link, checkout, fulfillment, and analytics verification first. Then overhaul the visual experience before major promotion.

## User feedback captured 2026-08-07

The current live storefront is too plain, too black-and-white, and not attention-grabbing enough. Product visuals are also unacceptable as final production assets.

## Verified current problem

- `products.js` currently represents each of the 26 product groups with emoji icons such as 🧰, 🔩, 🪚, 🥽, 🏍️, etc.
- `app.js` renders the `p.icon` value directly into the `.product-visual` area.
- These are temporary placeholder visuals, not actual product photography.
- The current eBay CTAs are category/search links rather than fixed individual listings, so a single exact listing photo can become misleading if the underlying eBay results change.

## Required visual overhaul

1. Replace emoji/placeholders with professional product-relevant imagery.
2. Where a card links to a specific individual product/listing, use an image that matches that exact product/listing and is legally/technically appropriate to display.
3. Where a card remains a dynamic eBay category/search link, use polished category imagery or a dynamic feed solution rather than implying that one pictured item is the exact destination listing.
4. Add stronger Prestige visual identity: richer color system, more contrast variation, branded accents, better typography, stronger section hierarchy, and more visual depth.
5. Rework hero section so the first screen immediately communicates value and gets attention.
6. Improve product cards with real imagery, stronger calls to action, clearer category/retailer signals, and more premium spacing/layout.
7. Add appropriate real-world contractor/welding/garage/cards imagery across sections instead of an all-black-and-white text-heavy appearance.
8. Keep mobile performance, accessibility, and affiliate disclosure intact during redesign.
9. Preserve existing working affiliate tracking (`5339172120`) and analytics hooks during the visual rewrite.
10. Perform final desktop/mobile visual QA before any large promotional push.

## Preferred implementation direction

- Functional revenue paths first.
- Visual redesign second.
- Avoid cosmetic work that breaks tracking or checkout.
- Do not treat the current emoji visuals as launch-quality assets.
