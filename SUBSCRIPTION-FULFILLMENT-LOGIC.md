# Prestige Monthly Membership — Fulfillment Logic

**Status:** IMPLEMENTATION SOURCE OF TRUTH  
**Updated:** 2026-08-19

## Purpose
Extend the existing hourly `Digital Product Fulfillment` watcher so the same Stripe → Google Drive → Gmail path safely handles monthly memberships without duplicating deliveries or sending unpaid/canceled customers future drops.

---

## Live Stripe Membership Map

| Tier | Price | Product | Price ID | Payment Link ID | Live URL |
|---|---:|---|---|---|---|
| Essentials Monthly | $19/mo | `prod_V6M9GJCytR9Cu7` | `price_1U69RSJkrg28KsFAXc7xCGlG` | `plink_1U69SgJkrg28KsFASlFzmDxw` | `https://buy.stripe.com/eVqbJ2g9Lbgd8HB2eTdZ60e` |
| Choice Monthly | $39/mo | `prod_V6MA1rXYKcIIOc` | `price_1U69RiJkrg28KsFAiSeSJfRz` | `plink_1U69SwJkrg28KsFAJp40W2lt` | `https://buy.stripe.com/cNi7sM7Dfckhga36v9dZ60f` |
| Pro Monthly | $79/mo | `prod_V6MAWHYuBrlZ71` | `price_1U69RxJkrg28KsFAe02oEpSy` | `plink_1U69TCJkrg28KsFAVLZMFhTC` | `https://buy.stripe.com/dRm3cw0aNesp0b5cTxdZ60g` |
| Premium Monthly | $149/mo | `prod_V6MAZiJKdPsdMv` | `price_1U69SCJkrg28KsFATJW4QjtN` | `plink_1U69TQJkrg28KsFAArCHlhdT` | `https://buy.stripe.com/7sY5kE3mZbgdaPJcTxdZ60h` |

All four are LIVE-mode recurring Stripe products. Payment Link metadata and subscription metadata include `brand=Prestige`, `membership=true`, `billing=monthly`, `tier=<tier>`, and `fulfillment=drive_email`.

---

## First-Purchase Toolkit Map

| Tier | Onboarding ZIP Drive ID | Expected filename | Expected bytes |
|---|---|---|---:|
| essentials | `13hop6iBTkkOymvIFgO3kMK5vf1gMjZPV` | `Prestige_Essentials_v1_0_Digital_Download.zip` | 11,872 |
| choice | `1zUaaiIzErAKtQf2MwJ5-MUcZgzDVQZSn` | `Prestige_Choice_v1_0_Digital_Download.zip` | 14,032 |
| pro | `1WFe1opkdXHsDjNxadWatusyzNuYOkCgT` | `Prestige_Pro_v1_0_Digital_Download.zip` | 21,298 |
| premium | `1WzZgUeoaek5fPnT2H7ozR2vCnFzRSmzh` | `Prestige_Premium_v1_1_Digital_Download.zip` | 45,505 |

The onboarding ZIP is sent **once**, on the first successful subscription Checkout Session only.

---

## Monthly Drop Map

### 2026-08

| Tier | Drive ID | Expected filename | Expected bytes | SHA-256 |
|---|---|---|---:|---|
| essentials | `1G7wcTpHMOa2WHK4Epe2GaxiMF28iI8iX` | `Prestige_Essentials_Monthly_August_2026_Member_Drop.zip` | 103,693 | `d410b588770840777b37fd742b75775bf9d5028d1b5bf4499dcd1e5a2b02750b` |
| choice | `1tOXhwLTIDeTmrzgW7IuKXGPKkHDxZoWH` | `Prestige_Choice_Monthly_August_2026_Member_Drop.zip` | 113,070 | `3a56114ac119fdb930f4bc7c593be13d90a449484117c04bf5dbdf9d98972df3` |
| pro | `13sTBjPwSbbHMXX92ro-zl7ZkVqBbHEXv` | `Prestige_Pro_Monthly_August_2026_Member_Drop.zip` | 125,606 | `717491b40493c8edb3567cce76cd21b8aad9733835be2b9175ef541d7a536b04` |
| premium | `1lutq0UmcpxLGjbK2cNEuWo4A5B0lsrjt` | `Prestige_Premium_Monthly_August_2026_Member_Drop.zip` | 143,771 | `025ec8d491dd8096f8dbe8373106c57b0d58c7610ad77bd74aadd4aa0b587e07` |

### 2026-09

| Tier | Drive ID | Expected filename | Expected bytes | SHA-256 |
|---|---|---|---:|---|
| essentials | `12Khi-zib0kguU3KXYgUous47HLJLKi3P` | `Prestige_Essentials_Monthly_September_2026_Member_Drop.zip` | 90,979 | `a7707afcb8480604de0c6fff1ce057754ffcf0e31a1f3c956c2023f5767ff9ea` |
| choice | `1qzIuCowxWOKa4gARh5ezwoAJtCa2QZvK` | `Prestige_Choice_Monthly_September_2026_Member_Drop.zip` | 95,943 | `0e77d646ac10d366cbdfde6c6abb25478ce790bff9fd05edb0935d9268a245c9` |
| pro | `17VyV2Q3_zj5z-JZU-xtdw4YnEsSRlSQ4` | `Prestige_Pro_Monthly_September_2026_Member_Drop.zip` | 105,785 | `10469c1443751a0c7f069e15fb4c89a4cbf375c94e3211a7379168984740230d` |
| premium | `1RT8l4hP5HBIfuuqxJekP1A6mzSIbM7Iw` | `Prestige_Premium_Monthly_September_2026_Member_Drop.zip` | 116,001 | `7c57d508ccb96db337e3ac0adba600a1fc5d9e5cc9dc7e65373e53d490a00c86` |

---

## Dedupe Keys

### Initial subscription delivery
Use:

`subscription:<SUBSCRIPTION_ID>|onboarding`

The corresponding email body must contain the literal line:

`Membership subscription: <SUBSCRIPTION_ID>`

and the current member-drop line:

`Member drop: <YYYY-MM>`

Search Gmail Sent for the subscription ID before sending. If an onboarding email containing the subscription ID already exists, never resend the onboarding toolkit.

### Monthly renewal delivery
Use:

`subscription:<SUBSCRIPTION_ID>|drop:<YYYY-MM>`

Search Gmail Sent for **both** the exact subscription ID and `Member drop: <YYYY-MM>`. Only skip if both appear in the same prior sent membership message.

Do **not** dedupe monthly renewals on `subscription.id` alone. One subscription legitimately receives many monthly drops.

---

## Hourly Watcher Algorithm

### A. Existing one-time + Shopify branches
Preserve the current logic exactly. Do not regress or replace it.

### B. New subscription initial-purchase branch
For each of the four live monthly Payment Link IDs:
1. Call Stripe Checkout Sessions list with `payment_link=<PLINK>`, `status=complete`, `limit=100`.
2. For each completed Session:
   - require a non-null `subscription` ID;
   - require customer email;
   - verify payment is complete / paid;
   - derive tier from the Payment Link map or metadata;
   - derive paid month (`YYYY-MM`) from the successful checkout timestamp in America/Chicago.
3. Search Gmail Sent for the exact subscription ID.
4. If onboarding was already delivered, skip onboarding.
5. If not delivered:
   - fetch the tier onboarding ZIP and verify filename + bytes;
   - fetch the mapped monthly drop for the checkout month and verify filename + bytes;
   - if the monthly drop mapping does not exist, do not send a wrong month; notify Jason using the internal missing-drop alert;
   - send one Welcome + First Delivery email with both ZIPs attached;
   - include `Membership subscription: <SUBSCRIPTION_ID>` and `Member drop: <YYYY-MM>` in the body.

### C. Paid recurring invoice branch
1. List recent Stripe invoices with `status=paid`, `limit=100`.
2. Inspect invoices tied to a subscription.
3. Retrieve the subscription when needed and require subscription metadata `membership=true` and a valid tier.
4. Exclude the first invoice if the same subscription/month was already delivered by the onboarding branch.
5. Determine the delivery month from the paid invoice billing period / paid timestamp in America/Chicago.
6. Build dedupe key `subscription:<ID>|drop:<YYYY-MM>`.
7. Search Gmail Sent for the exact subscription ID **and** exact member-drop month.
8. If already sent, skip.
9. If a verified map exists for the tier/month:
   - fetch the monthly ZIP;
   - verify filename + byte size;
   - send the Monthly Paid Renewal Drop email with that single ZIP attached;
   - include `Membership subscription: <ID>` and `Member drop: <YYYY-MM>`.
10. If no verified map exists, do not send an old drop. Notify Jason with the internal Missing-Drop Alert and leave the paid customer queued for fulfillment after the correct asset is added.

### D. Payment-attention branch
1. List subscriptions / invoices that are `past_due`, `unpaid`, or have a verified failed-payment state.
2. Require `membership=true` metadata and a known tier.
3. Search Gmail Sent for a payment-attention message tied to the subscription and the current failing invoice ID.
4. Send at most one Payment Attention Needed email per failing invoice ID.
5. Do not attach member files while the invoice is unpaid.

### E. Cancellation branch
1. Inspect membership subscriptions that are canceled or have `cancel_at_period_end=true`.
2. Require a verified Stripe cancellation state.
3. Dedupe on `subscription:<ID>|cancellation:<status/end-date>`.
4. Send Cancellation Confirmed only once per final cancellation state.
5. Never delete previously delivered Drive files or revoke the customer's local copies. Cancellation only stops future automated drops.

---

## Safety / Failure Rules

- Never send membership files for an open, unpaid, void, refunded, or otherwise unverified billing state.
- Never use an old monthly drop when the requested month is missing.
- Never send onboarding ZIPs again on monthly renewals.
- Never treat `subscription.id` alone as a monthly-drop dedupe key.
- If Stripe, Gmail or Drive has a transient read failure, retry the relevant read once. Do not disable the automation.
- If a Drive file's expected filename or byte size does not match, stop that fulfillment and alert Jason.
- After any successful membership fulfillment, notify Jason with tier, customer email, amount, subscription ID, invoice/session ID, and member-drop month.
- If no action is required, do not notify Jason.
