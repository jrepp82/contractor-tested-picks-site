# Prestige Monthly Membership — Transactional Email Templates

**Status:** READY FOR AUTOMATED FULFILLMENT  
**Updated:** 2026-08-19  
**Support:** Jason@prestigeremodelingwi.com

These templates are transactional membership messages for verified Stripe subscription states. Never send a customer state that has not been verified in Stripe first.

---

## 1. Welcome + First Delivery

**Subject:** `Welcome to Prestige <TIER> Monthly | Your toolkit + <MONTH YEAR> member drop`

Hi <FIRST NAME>,

Thank you for joining **Prestige <TIER> Monthly**.

Your first delivery is attached:
- your current **Prestige <TIER> toolkit**; and
- your **<MONTH YEAR> Prestige <TIER> Monthly member drop**.

The member playbook is provided in an editable DOCX version and a ready-to-read PDF inside the member-drop ZIP.

Save a backup copy of both ZIP files. Files already delivered remain yours to use under the membership license even if you later cancel. An active paid membership is required for future monthly drops.

Your membership renews monthly until canceled. For billing or cancellation help, email **Jason@prestigeremodelingwi.com**.

Membership subscription: `<SUBSCRIPTION_ID>`  
Member drop: `<YYYY-MM>`

Thank you,
Prestige

---

## 2. Monthly Paid Renewal Drop

**Subject:** `Your Prestige <TIER> Monthly Drop | <MONTH YEAR>`

Hi <FIRST NAME>,

Your **Prestige <TIER> Monthly** payment for this billing cycle is confirmed, and your new **<MONTH YEAR> member drop** is attached.

This month’s playbook is built to give you practical contractor actions, prompts, scripts, and operating tools you can put to work immediately.

Save a backup copy. Files already delivered remain yours under the membership license.

Billing or cancellation help: **Jason@prestigeremodelingwi.com**

Membership subscription: `<SUBSCRIPTION_ID>`  
Member drop: `<YYYY-MM>`

- Prestige

---

## 3. Payment Attention Needed

**Subject:** `Action needed: Prestige <TIER> Monthly payment`

Hi <FIRST NAME>,

Stripe currently shows a payment problem on your **Prestige <TIER> Monthly** membership.

No new member-drop file will be sent unless the billing cycle is successfully paid. Please update or resolve the payment method through Stripe when prompted. If you need help with the membership or want to cancel future renewals, email **Jason@prestigeremodelingwi.com**.

Membership subscription: `<SUBSCRIPTION_ID>`

- Prestige

**Automation rule:** Send only after Stripe verifies a `past_due`, `unpaid`, or otherwise failed-payment state. Do not send from a guess or from an open invoice that later paid successfully.

---

## 4. Cancellation Confirmed

**Subject:** `Prestige <TIER> Monthly cancellation confirmed`

Hi <FIRST NAME>,

Your **Prestige <TIER> Monthly** membership cancellation is confirmed in Stripe.

You will not receive future monthly drops after your paid access period ends. Files already delivered remain yours to use under the membership license.

If this cancellation was not intended or you need help, email **Jason@prestigeremodelingwi.com**.

Membership subscription: `<SUBSCRIPTION_ID>`

- Prestige

**Automation rule:** Only send after Stripe verifies the subscription is canceled or scheduled to cancel. State the end date when Stripe provides a reliable `current_period_end` / cancellation date.

---

## 5. Internal Missing-Drop Alert — Jason Only

**Subject:** `Prestige membership paid but monthly drop is not mapped | <SUBSCRIPTION_ID>`

A paid Prestige membership invoice was found for **<TIER> / <YYYY-MM>**, but the fulfillment map does not contain a verified Drive ZIP for that month.

Do **not** send an older or unrelated file as a substitute.

Required action:
1. build and QA the correct monthly drop;
2. upload it to Drive;
3. add its Drive ID / filename / byte size / SHA-256 to the fulfillment map;
4. rerun fulfillment for this subscription + month key.

Customer: `<EMAIL>`  
Subscription: `<SUBSCRIPTION_ID>`  
Invoice: `<INVOICE_ID>`  
Member drop required: `<YYYY-MM>`
