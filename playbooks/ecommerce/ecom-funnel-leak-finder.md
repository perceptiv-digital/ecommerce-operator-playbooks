---
schema_version: 1
slug: "ecom-funnel-leak-finder"
title: "Funnel Leak Finder"
summary: "Funnel Leak Finder helps ecommerce operators answer: Where is the buying journey leaking revenue?"
operating_question: "Where is the buying journey leaking revenue?"
short_title: "Funnel Leak Finder"
primary_persona: "ecommerce"
personas: ["ecommerce"]
category: "onsite-cro"
platforms: ["commerce", "google-analytics-4"]
cadence: "weekly"
difficulty: "standard"
manual_time_minutes_min: 30
manual_time_minutes_max: 75
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/ecom-funnel-leak-finder"
shopmcp_prompt: "Run the Funnel Leak Finder play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Funnel Leak Finder

## Operating Question

**Where is the buying journey leaking the most revenue right now — and which single step, on which device and source, should I fix first?**

Every store has a funnel: sessions → product views → add-to-cart → checkout started → purchase. Revenue leaks out at every transition, but they don't leak evenly, and the step with the *worst rate* is rarely the step that's *costing the most money*. This play maps the step-by-step conversion of your funnel, measures each transition's drop-off against benchmarks **and** against itself across device and source, then isolates the **single weakest step by lost revenue** — step drop × traffic × AOV — so you fix the leak that moves the P&L, not the one that looks ugliest in a chart.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your GA4 property or your Shopify/Woo/BigCommerce orders, so it can't build the funnel — it can only describe one. To run this manually you have to:

1. Pull the GA4 funnel exploration (or the `purchase`/`begin_checkout`/`add_to_cart`/`view_item` event counts) for the window, **segmented by device category and session source/medium** — not just the blended total.
2. Reconcile GA4's `purchase` count against the real order count in your commerce platform, because GA4 under- or over-counts depending on consent mode, ad-blockers, and duplicate events.
3. Attach a real AOV per segment from commerce, because the lost-revenue math is meaningless without it.
4. Convert four step transitions into four drop-off rates, compare each to a benchmark *and* to the other device/source, and rank by dollars — by hand, every week.

**The thinking in this playbook is free. The data access is the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live line into GA4 and your store, that wall is where manual runs stop. The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Ecommerce
- **Also useful for:** CRO / Onsite Lead (owns the fix), Web/Dev Lead (mobile checkout, page speed), Founder/CEO (where is the store bleeding?).
- Run it **before** you brief a CRO sprint, commission a checkout change, or argue for dev time — so the brief points at the dollar-ranked leak, not a hunch.

## When To Run It

- **Cadence:** weekly — Monday, on the prior 7 full days, with the equal prior period for comparison.
- **Triggers:** a sitewide conversion-rate dip, a checkout or theme deploy, a new payment method or shipping change, a mobile-traffic surge from paid social, or a quarter where sessions are up but revenue is flat.
- **Pre-requisite:** confirm the funnel events still fire. A renamed or double-firing event mimics a leak perfectly — verify tracking **before** trusting any step drop (see Veto Rules).

## Required Evidence

- **GA4 funnel counts** — `sessions` (or `session_start`), `view_item`, `add_to_cart`, `begin_checkout`, and `purchase`, for the window and the prior equal period, **split by device category (mobile / desktop / tablet) and by session source/medium**.
- **Commerce orders** — the actual order count and **AOV** for the same window, ideally split new vs. returning, to anchor the lost-revenue math and to reconcile against GA4's `purchase`.
- **Step benchmarks** — your own trailing 8–12 week baseline per step (the best benchmark) or category norms as a fallback: roughly view→cart 8–12%, cart→checkout 45–65%, checkout→purchase 60–75% on desktop (mobile typically 10–20 points lower at the final step).
- **Traffic per segment** — sessions by device and source, so a low rate on a tiny segment doesn't outrank a small drop on a huge one.

## Optional Evidence

- **Page speed / Core Web Vitals** by device — a mobile LCP over ~4s quietly suppresses cart and checkout starts.
- **Checkout configuration** — when express wallets (Shop Pay, Apple Pay), guest checkout, or a shipping-cost-at-checkout surprise changed.
- **Promo calendar & merchandising changes** — a sitewide promo lifts view→cart but can depress checkout→purchase if the discount fails to apply.
- **Stock / availability** — out-of-stock variants inflate `view_item` while starving `add_to_cart`.
- **Known tracking incidents** — consent-banner changes, a GTM republish, or a SDK upgrade that moved an event.

## How To Pull This Evidence

- **GA4 funnel steps** — Explore → Funnel exploration; add steps in order `view_item` → `add_to_cart` → `begin_checkout` → `purchase`, set the date range to the window plus the prior equal period.
- **Segment the funnel** — drop **Device category** and **Session source / medium** into the Breakdown (or as funnel segments); never read the blended total alone — that is where the leak hides.
- **Top-of-funnel read** — add `sessions` (or `session_start`) as the entry step so you can compute session→view and spot intent vs. a real down-funnel leak.
- **Shopify orders & AOV** — Analytics → Reports → Sales (or Finances summary) for real order count and AOV in the same window; split new vs. returning if available, to anchor the lost-revenue math per segment.
- **Reconcile** — compare GA4 `purchase` count to the real Shopify order count; >~10% drift means a tracking artifact, not a leak.
- **Gotchas** — GA4 default 2-day reporting lag and consent-mode/ad-blocker under-counting skew `purchase`; a renamed or double-firing event (e.g. `add_to_cart` > `view_item`) mimics a leak; tablet traffic is often too thin to rank — fold it in cautiously.
- Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Verify the funnel before you read it.** Reconcile GA4 `purchase` against real commerce orders for the window. If they diverge by more than ~10%, or any step count is implausible (e.g. `add_to_cart` > `view_item`), set the funnel to **FIX** and stop — a broken event mimics a leak.
2. **Compute every step rate.** Four transitions: view→cart, cart→checkout, checkout→purchase, plus session→view as a top-of-funnel read. Do it blended first, just to orient.
3. **Segment immediately — never trust the blended funnel.** Re-compute each step split by **device** and by **source/medium**. The blended number hides the leak: a healthy desktop step can mask a collapsing mobile one.
4. **Quantify lost revenue per step, per segment.** For each step in each segment: `lost revenue ≈ (benchmark rate − actual rate) × upstream traffic at that step × segment AOV`. This is the ranking metric — **not** the lowest percentage.
5. **Isolate the single weakest step by dollars.** The leak is the one transition × segment combination with the largest recoverable revenue. A 38% step on a high-traffic, high-AOV mobile segment beats a 25% step on a thin desktop tail.
6. **Separate top-of-funnel intent from a true leak.** A low session→view or view→cart rate on a cold paid-social source is intent, not a broken page (see Veto Rules). Down-funnel steps (checkout→purchase) are where intent is already proven and a low rate is almost always a real leak.
7. **Apply the vetoes**, then assign status + owner + recheck date, and write the smallest testable fix for the one leak.

## Manual Workflow

1. Pull GA4 funnel counts for the last 7 days and the prior 7, split by device and source/medium; pull commerce orders + AOV for the same window.
2. Reconcile GA4 `purchase` vs. real orders. If drift exceeds ~10% or counts are impossible, mark FIX and stop.
3. Compute the four step rates blended, then re-compute per device and per source.
4. For every step × segment, compute lost revenue = (benchmark − actual) × upstream traffic × AOV.
5. Rank by lost revenue; circle the single largest leak and note its device/source.
6. Paste the prompt below with your funnel table and AOVs.
7. Pressure-test the leak against the veto list (intent? tracking? promo? stock?), then write one smallest-measurable fix with an owner and a recheck date.

## Copy-Paste Prompt

```text
You are my ecommerce analyst running the "Funnel Leak Finder" play.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the full funnel step
counts (sessions -> view_item -> add_to_cart -> begin_checkout -> purchase) segmented at least
by device, plus confirmation that tracking isn't broken (GA4 purchases reconciled against real
orders), is missing, STOP and return only (a) what's missing and (b) how to get it — never
estimate it or proceed.

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
2. A funnel table using exactly this header row:
   | Step | Segment | Traffic | Rate | Benchmark | Lost rev (est) | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns, and do
   not replace the table with prose.
3. The single weakest step by dollars, with the device/source it lives on.
4. One smallest-measurable fix, its owner, and what evidence would confirm it worked.
5. Vetoes/caveats and any evidence blocked from a safe call.
```

## Decision Rules

- **FIX** — GA4↔commerce purchase drift > ~10%, an impossible step count, or a known tracking incident in the window. You cannot diagnose a leak through a broken funnel.
- **KILL** — retire a checkout/onsite element (an interstitial, a forced-account gate, a broken express-wallet button) when its step shows a clear, large dollar drop, the sample is ≥ ~500 sessions at that step, and no veto protects it.
- **REFRESH** — the step is decaying but the page/offer is still viable: rework the shipping-cost reveal, the mobile form, the cart-to-checkout CTA. Most funnel fixes land here.
- **WATCH** — the drop is directional, the segment is under ~300 sessions at the step, or the window is polluted by a promo or stockout.
- **KEEP** — the step is inside its benchmark band for that device/source and no risk signal is present.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do **not** call the lowest-rate step the leak — rank by lost revenue (rate gap × traffic × AOV), because a thin segment with an ugly rate can cost less than a small drop on a huge one.
- Do **not** read a blended funnel as the answer — always segment by device and source before naming a leak.
- Do **not** trust a step drop until tracking is verified — a renamed, missing, or double-firing event mimics a leak exactly; reconcile GA4 against real orders first.
- Do **not** treat a low top-of-funnel rate (session→view, view→cart) on a cold source as a leak — top-of-funnel intent differs by source, and a paid-social cold audience is *expected* to convert lower than branded search.
- Do **not** make recoverable-revenue claims without a real AOV and traffic count behind the math.
- Do **not** ship a checkout change, theme edit, or event-tracking fix without an explicit human approval step.

## Output Contract

A funnel ranked by **lost revenue per step and segment**, not by lowest rate:

| Step | Segment | Traffic | Rate | Benchmark | Lost rev (est) | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Checkout started → Purchase | Mobile / Paid social | 6,400 | 38% | 70% | $— | REFRESH | Web + CRO | 7 days |

## Worked Example

> **Executive read:** Add-to-cart and cart→checkout are healthy everywhere, so the funnel "looks fine" blended at 2.1%. The leak is one step on one device: **checkout started → purchase converts 38% on mobile vs 71% on desktop**, and because mobile carries the most checkout starts at a $74 AOV, that gap is leaking roughly **$58k/quarter**. The mobile drop points at a payment/shipping-cost step — closing half the gap recovers ~$29k/quarter, so fix mobile checkout first, before any top-of-funnel work.

| Step | Segment | Traffic | Rate | Benchmark | Lost rev (est, 90d) | Status |
|---|---|---|---|---|---|---|
| Add-to-cart → Checkout started | Mobile | 9,800 | 58% | 55% | $0 (above benchmark) | KEEP |
| Add-to-cart → Checkout started | Desktop | 5,100 | 61% | 55% | $0 (above benchmark) | KEEP |
| Checkout started → Purchase | Desktop | 3,100 | 71% | 70% | ~$0 | KEEP |
| **Checkout started → Purchase** | **Mobile** | **5,680** | **38%** | **70%** | **~$58,200** | **REFRESH** |
| View item → Add-to-cart | Mobile / Paid social | 41,000 | 6.2% | 9% | ~$12,400 | WATCH |
| Purchase reconciliation | All | — | GA4 +6% vs orders | <10% | n/a | KEEP (tracking OK) |

Note how the answer *inverts* the blended view: the worst-looking percentage (6.2% view→cart on cold paid social) is mostly **intent**, downgraded to WATCH, while the real leak is the mobile checkout→purchase step — a smaller-looking gap that costs 4–5× more in dollars because it sits on proven-intent, high-traffic, paying sessions.

## Common Failure Modes

- Ranking by lowest step rate and chasing a thin segment while the real dollar leak sits elsewhere.
- Reading the blended funnel and missing a leak that lives entirely on mobile or one source.
- Trusting a step drop that's actually a renamed or double-firing GA4 event.
- Treating cold paid-social's low top-of-funnel rate as a broken page instead of normal intent.
- Quoting "recoverable revenue" with no AOV or traffic behind the number.
- Briefing a homepage redesign when the money is leaking at mobile checkout.

## Run This Play With Live Data

**Manual version:** export the GA4 funnel split by device and source, reconcile purchases against real orders, attach per-segment AOV, compute four drop-off rates per segment, and rank by dollars — every single week.

**ShopMCP version:** connect GA4 and your store once. Ask the question; ShopMCP pulls the live funnel counts and real commerce orders, runs the tracking reconciliation, segments every step by device and source, computes lost revenue per step, and returns the dollar-ranked leak with its device/source and a smallest-measurable fix. It stays **read-only** until you explicitly approve a checkout or tracking change.

> No GA4 or store connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of one GA4-exploration-afternoon.

Example ShopMCP prompt:

```text
Run the Funnel Leak Finder play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/ecom-funnel-leak-finder?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual GA4 funnel explorations and stale CSVs.
- Copy-pasting between GA4, your store's orders, and a spreadsheet to attach AOV.
- Re-segmenting every step by device and source by hand.
- Guessing whether a step drop is a real leak or a tracking artifact.
- Rebuilding the same lost-revenue ranking every week.
