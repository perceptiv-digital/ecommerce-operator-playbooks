---
name: ecom-checkout-health
description: "When an ecommerce operator needs to decide: Is checkout conversion healthy enough to trust demand generation? Runs the Checkout Health Watch play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Checkout Health', 'Commerce', 'Google Analytics 4', 'Onsite Cro'."
license: CC-BY-4.0
metadata:
  persona: Head of Ecommerce
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Checkout Health Watch

**Operating question:** Is checkout conversion healthy enough to trust demand generation?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce checkout funnel** — for the last 7–14 days and the prior equal window: `reached checkout`, `reached shipping step`, `reached payment step`, `completed`, expressed as step-to-step rates and as the headline **checkout-started → purchase** rate.
- **Completion by segment** — the same completion rate split by **device** (mobile / desktop / tablet), **payment method** (card vs. each express wallet, PayPal, BNPL), and **top countries** by checkout volume.
- **GA4 funnel** — `begin_checkout`, `add_shipping_info`, `add_payment_info`, `purchase` counts and step conversion, to validate the commerce numbers and surface tracking drift.
- **Benchmark / target** — your own trailing 8-week baseline completion rate per segment, plus a sane floor (mobile checkout completion materially below your desktop rate, or any single payment method >15–20 points below your blended rate, is a flag).

Optional, if available:

- **Deploy / change log** — theme publishes, app installs and version bumps, checkout-extension edits, payment-method toggles, shipping-rate or tax-config changes, with timestamps to align against the drop.
- **Checkout page-speed / Web Vitals** — LCP and interaction latency on the checkout and payment steps, especially on mobile.
- **Shipping and tax surfacing** — when shipping cost first appears, threshold for free shipping, and whether duties/taxes are shown at the shipping step (the classic shipping-shock abandon point).
- **Promo calendar** — discount-led and sale-period traffic abandons at checkout differently (more browsers, code-hunting, BNPL) and should be read on its own curve, not against full-price weeks.
- **Error / session telemetry** — checkout console errors, declined-payment rates, or session-replay clips for the failing step.

## How to decide — in order

1. **Gate on tracking.** If the commerce funnel and GA4 disagree on completed orders by more than ~10%, or if a deploy touched the pixel/consent setup in the window, set the headline to **FIX** and validate tracking before reading any decline. A "checkout collapse" is a tracking artifact until proven otherwise.
2. **Read the blended rate for direction only.** Note the checkout-started → purchase rate vs. the prior window and your 8-week baseline. A blended move is the smoke alarm, never the diagnosis — **do not** act on the blended number alone.
3. **Segment immediately — this is where the break hides.** Split completion by device, payment method, and country. A healthy blended rate with one payment method or one device 15+ points below the rest is a **localized break**, not a demand problem.
4. **Isolate the failing surface and bind it to a cause.** If one express wallet cratered, check the deploy log for a theme/app/checkout-extension change at that timestamp → **FIX** (broken express checkout). If completion sags at the *shipping* step, suspect shipping-cost shock or a new rate/threshold. If it sags at the *payment* step across all methods, suspect address/tax validation errors or checkout load time.
5. **Quantify the loss.** Take the failing segment's checkout volume × (baseline rate − current rate) = **lost orders**, then × AOV = **revenue at risk**. This is the number that ranks the fix and justifies the engineering pull.
6. **Apply the vetoes**, then assign status + owner + recheck date — and decide explicitly whether acquisition spend should hold until the leak is sealed.

## The prompt to run

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

## Decision rules

- **KEEP** — checkout-started → purchase rate inside your baseline band across device, payment method, and country; no segment 15+ points below the blended rate; tracking clean.
- **WATCH** — a directional dip, an early/small sample, or a segment soft-flagged but within noise; or the window is polluted by a promo and needs a clean re-read.
- **FIX** — tracking drift between commerce and GA4, a pixel/consent change in the window, or missing segment data prevents a safe read; or a payment/checkout config is provably broken and the fix is engineering, not budget.
- **REFRESH** — completion is decaying for a fixable on-surface reason that still converts (shipping-cost surfacing, a slow checkout step, a clumsy address/tax field) where the offer and audience are still viable.
- **KILL** — reserved: retire a payment method or checkout app only when it is provably suppressing completion in its segment with a large sample and no veto protects it.
- Every recommendation carries a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** scale acquisition spend while any high-volume checkout segment is leaking — sealing the checkout returns more than buying more leaking traffic.
- Do **not** diagnose from the blended completion rate; a healthy blend routinely hides a dead payment method or a mobile-only break. Always segment by device **and** payment method first.
- Do **not** trust a checkout decline before confirming the pixel and GA4 `purchase` event fired through the whole window — a tracking change fakes a collapse.
- Do **not** read promo-period checkout abandons against full-price weeks; discount traffic abandons more and differently, and the comparison is invalid.
- Do **not** claim causality from a single funnel step without binding it to a deploy/change-log event or a second source.
- Do **not** push theme edits, toggle payment methods, change shipping rates, or message customers without an explicit human approval step.

## Output

A ranked leak diagnosis by **revenue at risk**, with a hold-or-scale call on acquisition spend.

| Segment | Checkout→purchase rate | vs baseline | Lost orders (window) | Revenue at risk | Suspected cause | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Mobile · Apple Pay | 41% | −23 pts | 84 | $6,300 | Express checkout broke after theme push | **FIX** | Web/Dev | Today |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
