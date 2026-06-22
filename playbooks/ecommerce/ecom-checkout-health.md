---
schema_version: 1
slug: "ecom-checkout-health"
title: "Checkout Health Watch"
summary: "Checkout Health Watch helps ecommerce operators answer: Is checkout conversion healthy enough to trust demand generation?"
operating_question: "Is checkout conversion healthy enough to trust demand generation?"
short_title: "Checkout Health"
primary_persona: "ecommerce"
personas: ["ecommerce", "operations"]
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/ecom-checkout-health"
shopmcp_prompt: "Run the Checkout Health Watch play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Checkout Health Watch

## Operating Question

**Is my checkout completing orders well enough that I can trust demand generation — or am I about to pour ad spend into a leaking funnel?**

Checkout is the one step where you have already paid to acquire the visitor, already won the add-to-cart, and already survived the cart page. A break here destroys the most expensive traffic you own. The danger is that a broken checkout looks fine from the top: sessions are up, ad ROAS holds for a few days on cached attribution, and the blended completion rate barely moves because card payments mask a dead express-checkout button. This play measures one number — **checkout-started → purchase completion rate** — segmented by **device, payment method, and country**, against trend and benchmark, and forces a **KEEP / WATCH / FIX / REFRESH / KILL** call before anyone touches the acquisition budget.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Shopify (or Woo / BigCommerce) checkout funnel or your GA4 `begin_checkout` → `purchase` events. To run this manually you have to:

1. Pull the **checkout funnel** from your commerce platform — sessions that reached checkout, that hit the shipping step, that hit payment, and that completed — for the last 7–14 days plus the prior equal window.
2. Pull the **same funnel from GA4** (`begin_checkout`, `add_shipping_info`, `add_payment_info`, `purchase`) so you can cross-check the platform against analytics and catch tracking drift.
3. Break completion down by **device** (mobile vs. desktop), by **payment method** (card, Shop Pay / express wallets, PayPal, Apple/Google Pay, BNPL), and by **country**, because the blended number hides the break.
4. Line that up against your **deploy log** — theme pushes, app installs/updates, checkout-extension changes — to connect a drop to a cause.

**The thinking in this playbook is free. The data access is the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live line into your store and GA4, that wall is where manual runs stop. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Ecommerce
- **Also useful for:** Performance Marketer (don't scale into a leak), Web/Dev Lead (owns the theme and checkout apps), Ops Lead (payment-provider and shipping-config changes)
- Run it **before** you sign off the week's acquisition budget, and immediately after any theme deploy, checkout-app install, or payment-provider change.

## When To Run It

- **Cadence:** weekly — early in the week, after the weekend's checkout volume has settled into a stable sample.
- **Triggers:** a Shopify/theme update or app install/update, a new checkout-extensibility or one-page-checkout migration, a payment-provider or shipping-rate change, a sudden GA4 `purchase`-vs-sessions divergence, or a CVR dip that ops can't explain from traffic mix.
- **Pre-requisite:** confirm checkout and `purchase` tracking are firing **before** you trust any decline. A pixel or GA4 consent-mode change can fake a checkout collapse that never happened — see the first decision gate.

## Required Evidence

- **Commerce checkout funnel** — for the last 7–14 days and the prior equal window: `reached checkout`, `reached shipping step`, `reached payment step`, `completed`, expressed as step-to-step rates and as the headline **checkout-started → purchase** rate.
- **Completion by segment** — the same completion rate split by **device** (mobile / desktop / tablet), **payment method** (card vs. each express wallet, PayPal, BNPL), and **top countries** by checkout volume.
- **GA4 funnel** — `begin_checkout`, `add_shipping_info`, `add_payment_info`, `purchase` counts and step conversion, to validate the commerce numbers and surface tracking drift.
- **Benchmark / target** — your own trailing 8-week baseline completion rate per segment, plus a sane floor (mobile checkout completion materially below your desktop rate, or any single payment method >15–20 points below your blended rate, is a flag).

## Optional Evidence (changes the answer when present)

- **Deploy / change log** — theme publishes, app installs and version bumps, checkout-extension edits, payment-method toggles, shipping-rate or tax-config changes, with timestamps to align against the drop.
- **Checkout page-speed / Web Vitals** — LCP and interaction latency on the checkout and payment steps, especially on mobile.
- **Shipping and tax surfacing** — when shipping cost first appears, threshold for free shipping, and whether duties/taxes are shown at the shipping step (the classic shipping-shock abandon point).
- **Promo calendar** — discount-led and sale-period traffic abandons at checkout differently (more browsers, code-hunting, BNPL) and should be read on its own curve, not against full-price weeks.
- **Error / session telemetry** — checkout console errors, declined-payment rates, or session-replay clips for the failing step.

## How To Pull This Evidence

- **Shopify:** Analytics → Reports → "Conversion over time" and the "Sessions converted" / checkout funnel report (Online Store Conversion) for reached-checkout → completed counts; or Analytics → Live/Custom reports filtered to the checkout funnel steps.
- **GA4:** build a funnel exploration with `begin_checkout` → `add_shipping_info` → `add_payment_info` → `purchase`, then add **Device category** as the breakdown to get begin_checkout→purchase by device.
- **Payment-method segmentation:** Shopify doesn't expose completion-by-payment-method in standard reports — derive it from Orders/checkout exports (payment gateway field) or a GA4 custom dimension on payment type; capture card vs. Shop Pay / Apple Pay / Google Pay / PayPal / BNPL separately so the express-wallet break is visible.
- **Windows:** pull the last 7–14 days and the prior equal window on the *same* report so step definitions match; mismatched date ranges or report types are the most common false signal.
- **Gotcha — blended hides the break:** never accept a single blended completion number; a dead express button can sit under a healthy card rate. Segment by device AND payment method before reading anything.
- **Gotcha — tracking drift:** GA4 `purchase` undercounts vs. Shopify when consent mode, ad blockers, or a recent pixel/consent deploy are in play; reconcile the two before trusting a decline.
- **Gotcha — checkout-extensibility:** new one-page checkout / checkout-extension events can rename or drop steps, breaking step-to-step continuity across the window.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Gate on tracking.** If the commerce funnel and GA4 disagree on completed orders by more than ~10%, or if a deploy touched the pixel/consent setup in the window, set the headline to **FIX** and validate tracking before reading any decline. A "checkout collapse" is a tracking artifact until proven otherwise.
2. **Read the blended rate for direction only.** Note the checkout-started → purchase rate vs. the prior window and your 8-week baseline. A blended move is the smoke alarm, never the diagnosis — **do not** act on the blended number alone.
3. **Segment immediately — this is where the break hides.** Split completion by device, payment method, and country. A healthy blended rate with one payment method or one device 15+ points below the rest is a **localized break**, not a demand problem.
4. **Isolate the failing surface and bind it to a cause.** If one express wallet cratered, check the deploy log for a theme/app/checkout-extension change at that timestamp → **FIX** (broken express checkout). If completion sags at the *shipping* step, suspect shipping-cost shock or a new rate/threshold. If it sags at the *payment* step across all methods, suspect address/tax validation errors or checkout load time.
5. **Quantify the loss.** Take the failing segment's checkout volume × (baseline rate − current rate) = **lost orders**, then × AOV = **revenue at risk**. This is the number that ranks the fix and justifies the engineering pull.
6. **Apply the vetoes**, then assign status + owner + recheck date — and decide explicitly whether acquisition spend should hold until the leak is sealed.

## Manual Workflow

1. Pull the commerce checkout funnel and the GA4 funnel for the last 7–14 days and the prior equal window.
2. Run the tracking gate (step 1 above). If commerce and GA4 diverge or a pixel-touching deploy landed in the window, mark FIX and stop until tracking is confirmed.
3. Compute the blended checkout-started → purchase rate and its move vs. baseline — for direction only.
4. Segment completion by device, payment method, and country. Flag any segment 15+ points below the blended rate or below its own 8-week baseline.
5. Align each failing segment against the deploy/change log to bind the drop to a cause (theme push, app update, payment toggle, shipping-rate change).
6. Quantify lost orders and revenue at risk for each break (step 5 above).
7. Paste the prompt below with your funnel and segment tables.
8. Pressure-test every call against the veto list, then convert into an action packet with owner, recheck date, and an explicit hold/scale decision on acquisition spend.

## Copy-Paste Prompt

```text
You are my ecommerce checkout analyst running the "Checkout Health Watch" play.

GOAL: decide whether checkout is healthy enough to trust demand generation, and locate
any leak by segment, ranked by revenue at risk. Status vocab: KEEP / WATCH / FIX /
REFRESH / KILL.

I will paste: my commerce checkout funnel (reached checkout / shipping / payment /
completed) and GA4 funnel (begin_checkout / add_shipping_info / add_payment_info /
purchase) for the last 7-14 days and the prior equal window; completion split by device,
payment method, and country; my 8-week baseline; and a deploy/change log if I have one.
Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If checkout-started->purchase
counts segmented by device and payment method are missing (blended-only counts do not satisfy this
- they hide the break), STOP and return only (a) what's missing and (b) how to get it - never
estimate it or proceed.

RULES:
- Tracking gate first: if commerce and GA4 disagree on completed orders by >10%, or a
  deploy touched the pixel/consent setup, mark the headline FIX and do not read the
  decline until tracking is confirmed.
- Treat the blended checkout->purchase rate as direction only. Never diagnose from the
  blended number; always segment by device, payment method, and country first.
- Flag any segment 15+ points below the blended rate or below its own baseline as a
  localized break, and bind it to a cause from the deploy log when possible.
- Quantify each break: failing-segment checkout volume x (baseline rate - current rate)
  = lost orders; x AOV = revenue at risk. Rank by revenue at risk.
- Read promo-window checkout behavior on its own curve, not against full-price weeks.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read, ending with a clear hold-or-scale call on acquisition spend.
2. A segment table using exactly this header row:
   | Segment | Checkout→purchase rate | vs baseline | Lost orders (window) | Revenue at risk | Suspected cause | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns, and do not
   replace the table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision Rules

- **KEEP** — checkout-started → purchase rate inside your baseline band across device, payment method, and country; no segment 15+ points below the blended rate; tracking clean.
- **WATCH** — a directional dip, an early/small sample, or a segment soft-flagged but within noise; or the window is polluted by a promo and needs a clean re-read.
- **FIX** — tracking drift between commerce and GA4, a pixel/consent change in the window, or missing segment data prevents a safe read; or a payment/checkout config is provably broken and the fix is engineering, not budget.
- **REFRESH** — completion is decaying for a fixable on-surface reason that still converts (shipping-cost surfacing, a slow checkout step, a clumsy address/tax field) where the offer and audience are still viable.
- **KILL** — reserved: retire a payment method or checkout app only when it is provably suppressing completion in its segment with a large sample and no veto protects it.
- Every recommendation carries a number, source, time window, and confidence level.

## Veto Rules

- Do **not** scale acquisition spend while any high-volume checkout segment is leaking — sealing the checkout returns more than buying more leaking traffic.
- Do **not** diagnose from the blended completion rate; a healthy blend routinely hides a dead payment method or a mobile-only break. Always segment by device **and** payment method first.
- Do **not** trust a checkout decline before confirming the pixel and GA4 `purchase` event fired through the whole window — a tracking change fakes a collapse.
- Do **not** read promo-period checkout abandons against full-price weeks; discount traffic abandons more and differently, and the comparison is invalid.
- Do **not** claim causality from a single funnel step without binding it to a deploy/change-log event or a second source.
- Do **not** push theme edits, toggle payment methods, change shipping rates, or message customers without an explicit human approval step.

## Output Contract

A ranked leak diagnosis by **revenue at risk**, with a hold-or-scale call on acquisition spend.

| Segment | Checkout→purchase rate | vs baseline | Lost orders (window) | Revenue at risk | Suspected cause | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Mobile · Apple Pay | 41% | −23 pts | 84 | $6,300 | Express checkout broke after theme push | **FIX** | Web/Dev | Today |

## Worked Example

> **Executive read:** Blended checkout completion looks fine at 64% (vs. a 66% baseline), so the top-line says "trust the funnel" — but the blend is lying. Card completion is healthy at 70%, while Apple Pay / express checkout collapsed from 68% to 41% the same day a theme update shipped, costing an estimated 84 orders (~$6,300) in 9 days on mobile alone. **Hold the planned 20% acquisition budget increase until the express-checkout regression is fixed; we are funneling paid mobile traffic into a broken button.**

| Segment | Checkout→purchase rate | vs baseline | Lost orders (9d) | Revenue at risk | Suspected cause | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Blended (all) | 64% | −2 pts | — | — | Masks segment break | **WATCH** | Ecom | 3 days |
| Card (all devices) | 70% | +1 pt | 0 | $0 | Healthy | **KEEP** | Ecom | Weekly |
| Apple Pay / express · Mobile | 41% | −27 pts | 84 | $6,300 | Express button broke after theme push (same-day) | **FIX** | Web/Dev | Today |
| Shop Pay · Desktop | 67% | −1 pt | ~3 | $220 | Within noise | **KEEP** | Ecom | Weekly |
| Card · Shipping step (DE) | 58% | −9 pts | 19 | $1,400 | Shipping cost first shown at shipping step | **REFRESH** | Ecom + Web | 7 days |
| GA4 vs commerce `purchase` | 6% gap | — | — | — | Within tolerance, read is safe | **KEEP** | Analytics | Weekly |

Note how the answer *inverts* the top-line view: the blended 64% reads as "healthy enough to scale," but the express-checkout break on mobile is a clean, quantified KILL-the-scale-decision until fixed — and the German shipping-step sag is a separate, smaller REFRESH.

## Common Failure Modes

- Trusting the blended completion rate and missing a dead payment method or a mobile-only break underneath it.
- Reading a checkout "collapse" that is really a pixel/consent or GA4 `purchase` tracking change after a deploy.
- Scaling acquisition spend in the same week a checkout segment is leaking — buying more traffic for a broken button.
- Comparing a promo week's abandon rate against full-price weeks and calling the difference a regression.
- Naming a cause (shipping shock, express break) without binding it to a deploy/change-log timestamp or a second source.

## Run This Play With Live Data

**Manual version:** export the commerce checkout funnel and the GA4 funnel, align the windows, segment completion by device, payment method, and country by hand, then cross-reference your deploy log to bind each drop to a cause — every week, and again after every theme or app change.

**ShopMCP version:** connect your store and GA4 once. Ask the question; ShopMCP pulls the live checkout funnel and the GA4 events, runs the tracking gate, segments completion by device, payment method, and country, quantifies lost orders and revenue at risk per break, and returns the ranked KEEP/WATCH/FIX/REFRESH table with an explicit hold-or-scale call on spend. It stays **read-only** until you explicitly approve a change.

> No store or GA4 connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of an afternoon of funnel exports and segment pivots.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Checkout Health Watch play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual checkout-funnel and GA4 exports and stale CSVs.
- Hand-segmenting completion by device, payment method, and country every week.
- Cross-referencing the deploy log to bind a drop to a cause.
- Rebuilding the same tracking-gate and revenue-at-risk math after every theme or app change.
