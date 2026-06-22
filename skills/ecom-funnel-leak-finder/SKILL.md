---
name: ecom-funnel-leak-finder
description: "When an ecommerce operator needs to decide: Where is the buying journey leaking revenue? Runs the Funnel Leak Finder play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Funnel Leak Finder', 'Commerce', 'Google Analytics 4', 'Onsite Cro'."
license: CC-BY-4.0
metadata:
  persona: Head of Ecommerce
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Funnel Leak Finder

**Operating question:** Where is the buying journey leaking revenue?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **GA4 funnel counts** — `sessions` (or `session_start`), `view_item`, `add_to_cart`, `begin_checkout`, and `purchase`, for the window and the prior equal period, **split by device category (mobile / desktop / tablet) and by session source/medium**.
- **Commerce orders** — the actual order count and **AOV** for the same window, ideally split new vs. returning, to anchor the lost-revenue math and to reconcile against GA4's `purchase`.
- **Step benchmarks** — your own trailing 8–12 week baseline per step (the best benchmark) or category norms as a fallback: roughly view→cart 8–12%, cart→checkout 45–65%, checkout→purchase 60–75% on desktop (mobile typically 10–20 points lower at the final step).
- **Traffic per segment** — sessions by device and source, so a low rate on a tiny segment doesn't outrank a small drop on a huge one.

Optional, if available:

- **Page speed / Core Web Vitals** by device — a mobile LCP over ~4s quietly suppresses cart and checkout starts.
- **Checkout configuration** — when express wallets (Shop Pay, Apple Pay), guest checkout, or a shipping-cost-at-checkout surprise changed.
- **Promo calendar & merchandising changes** — a sitewide promo lifts view→cart but can depress checkout→purchase if the discount fails to apply.
- **Stock / availability** — out-of-stock variants inflate `view_item` while starving `add_to_cart`.
- **Known tracking incidents** — consent-banner changes, a GTM republish, or a SDK upgrade that moved an event.

## How to decide — in order

1. **Verify the funnel before you read it.** Reconcile GA4 `purchase` against real commerce orders for the window. If they diverge by more than ~10%, or any step count is implausible (e.g. `add_to_cart` > `view_item`), set the funnel to **FIX** and stop — a broken event mimics a leak.
2. **Compute every step rate.** Four transitions: view→cart, cart→checkout, checkout→purchase, plus session→view as a top-of-funnel read. Do it blended first, just to orient.
3. **Segment immediately — never trust the blended funnel.** Re-compute each step split by **device** and by **source/medium**. The blended number hides the leak: a healthy desktop step can mask a collapsing mobile one.
4. **Quantify lost revenue per step, per segment.** For each step in each segment: `lost revenue ≈ (benchmark rate − actual rate) × upstream traffic at that step × segment AOV`. This is the ranking metric — **not** the lowest percentage.
5. **Isolate the single weakest step by dollars.** The leak is the one transition × segment combination with the largest recoverable revenue. A 38% step on a high-traffic, high-AOV mobile segment beats a 25% step on a thin desktop tail.
6. **Separate top-of-funnel intent from a true leak.** A low session→view or view→cart rate on a cold paid-social source is intent, not a broken page (see Veto Rules). Down-funnel steps (checkout→purchase) are where intent is already proven and a low rate is almost always a real leak.
7. **Apply the vetoes**, then assign status + owner + recheck date, and write the smallest testable fix for the one leak.

## The prompt to run

```text
You are my ecommerce analyst running the "Funnel Leak Finder" play.

GOAL: find the single funnel step that is leaking the most REVENUE (not the lowest rate),
isolate the device and source it happens on, and propose the one smallest measurable fix.

FUNNEL: sessions -> view_item -> add_to_cart -> begin_checkout -> purchase.

I will paste: GA4 step counts (blended AND split by device and source/medium), my real
commerce order count and AOV per segment, and step benchmarks (my baseline if I have it).
Some data may be missing.

RULES:
- Verify first: reconcile GA4 purchases against my real orders. If they diverge >10%, or
  any step count is impossible (e.g. add_to_cart > view_item), mark the funnel FIX and stop.
- Never rank by lowest step rate. Rank by lost revenue:
  (benchmark rate - actual rate) x upstream traffic at that step x segment AOV.
- Always segment by device AND source. A healthy blended step can hide a collapsing mobile
  one. Report the worst step per segment, then the single worst overall by dollars.
- Distinguish top-of-funnel intent from a leak: a low view/cart rate on a cold paid-social
  source is intent, not a broken page. A low checkout->purchase rate is almost always a leak.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read naming the one leak and the recoverable revenue.
2. A funnel table: Step | Segment | Sessions/Traffic | Rate | Benchmark | Lost rev (est) | Status.
3. The single weakest step by dollars, with the device/source it lives on.
4. One smallest-measurable fix, its owner, and what evidence would confirm it worked.
5. Vetoes/caveats and any evidence blocked from a safe call.
```

## Decision rules

- **FIX** — GA4↔commerce purchase drift > ~10%, an impossible step count, or a known tracking incident in the window. You cannot diagnose a leak through a broken funnel.
- **KILL** — retire a checkout/onsite element (an interstitial, a forced-account gate, a broken express-wallet button) when its step shows a clear, large dollar drop, the sample is ≥ ~500 sessions at that step, and no veto protects it.
- **REFRESH** — the step is decaying but the page/offer is still viable: rework the shipping-cost reveal, the mobile form, the cart-to-checkout CTA. Most funnel fixes land here.
- **WATCH** — the drop is directional, the segment is under ~300 sessions at the step, or the window is polluted by a promo or stockout.
- **KEEP** — the step is inside its benchmark band for that device/source and no risk signal is present.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** call the lowest-rate step the leak — rank by lost revenue (rate gap × traffic × AOV), because a thin segment with an ugly rate can cost less than a small drop on a huge one.
- Do **not** read a blended funnel as the answer — always segment by device and source before naming a leak.
- Do **not** trust a step drop until tracking is verified — a renamed, missing, or double-firing event mimics a leak exactly; reconcile GA4 against real orders first.
- Do **not** treat a low top-of-funnel rate (session→view, view→cart) on a cold source as a leak — top-of-funnel intent differs by source, and a paid-social cold audience is *expected* to convert lower than branded search.
- Do **not** make recoverable-revenue claims without a real AOV and traffic count behind the math.
- Do **not** ship a checkout change, theme edit, or event-tracking fix without an explicit human approval step.

## Output

A funnel ranked by **lost revenue per step and segment**, not by lowest rate:

| Step | Segment | Traffic | Rate | Benchmark | Lost rev (est) | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Checkout started → Purchase | Mobile / Paid social | 6,400 | 38% | 70% | $— | REFRESH | Web + CRO | 7 days |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/ecom-funnel-leak-finder) — it executes this play read-only by default and applies changes only on your approval.
