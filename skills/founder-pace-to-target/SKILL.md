---
name: founder-pace-to-target
description: "When an ecommerce operator needs to decide: Are we on pace to hit the target, and what must change today? Runs the Pace to Target play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Pace to Target', 'Commerce', 'Trading Profit'."
license: CC-BY-4.0
metadata:
  persona: Founder / CEO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Pace to Target

**Operating question:** Are we on pace to hit the target, and what must change today?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce — MTD actuals:** revenue month-to-date, order count, and sessions for the same MTD window (Shopify/Woo/BigCommerce). Net revenue after refunds and cancellations, not gross.
- **Commerce — yesterday:** revenue, orders, sessions, and AOV for the most recent settled day.
- **The monthly target:** the revenue goal for the current month, and how it was set (run-rate, board number, or stretch).
- **Seasonality shape:** last year's same-month **daily** revenue curve, or — if you don't have clean YoY — a trailing **weekday index** (avg revenue per weekday over the last 8–12 weeks). This is what turns a flat split into a real pace target.
- **Days remaining:** calendar days left in the month, flagged by weekday and any known peak days.

Optional, if available:

- **Promo calendar** — a live or imminent promo window inflates or front-loads pace; a finished promo leaves a demand hangover.
- **Paydays / known peaks** — end-of-month and mid-month paydays, paycheck cycles, payday-adjacent weekends.
- **Channel mix / planned spend** — whether tomorrow's paid budget is already booked, so "push" is realistic.
- **Stock cover on hero SKUs** — you can't push into a stockout.
- **Last year's promo timing** — so the YoY pace curve isn't distorted by a promo that ran on different dates.

## How to decide — in order

1. **Check tracking and settlement first.** If yesterday's orders are still settling, the pixel is drifting, or sessions look implausible, mark the read **FIX** and stop — do not declare a shortfall on dirty data.
2. **Build the seasonality-adjusted pace target, not a linear one.** Distribute the monthly target across days using last year's daily shape (or the weekday index), so each day carries its real weight. The expected MTD line is the cumulative sum to today's date.
3. **Compute the gap.** Gap ($) = MTD actual − seasonality-adjusted MTD pace target. State it as dollars ahead/behind and as a percentage of the pace target.
4. **Compute the required run-rate.** Required $/day for the rest of the month = (monthly target − MTD actual) ÷ days remaining, then re-weight by the remaining days' seasonality. Compare it to your recent realized $/day. If the required rate is wildly above what you've ever run, the target — not the day — is the problem.
5. **Decompose the gap into levers.** Revenue = Sessions × Conversion Rate × AOV. Compare each factor's MTD value against the pace assumption to find the **binding lever**: is the gap a traffic problem, a conversion problem, or an AOV problem? Only one usually dominates.
6. **Make the call.** PUSH (add spend/promo against the binding lever), HOLD (gap is inside noise or a promo distorts the window), or IT'S FINE (ahead of pace). Attach the specific move to the binding lever, never a generic "spend more."

## The prompt to run

```text
You are my ecommerce trading analyst running the "Pace to Target" play.

GOAL: tell me if we are on pace to hit this month's revenue target against a
SEASONALITY-ADJUSTED pace line (not a flat daily split), and name the single move
to make today.

I will paste: this month's revenue target, MTD revenue / orders / sessions, yesterday's
revenue / orders / sessions / AOV, last year's same-month daily revenue curve (or my
trailing weekday index), days remaining, and my promo calendar. Some data may be missing.

RULES:
- PRE-FLIGHT: First list which required inputs I provided vs. missing. If settled net commerce
  revenue for the MTD window and yesterday (orders fully settled, after refunds/cancellations,
  tracking confirmed clean) is missing, STOP and return only (a) what's missing and (b) how to
  get it — never estimate it or proceed.
- Build a seasonality-adjusted pace target by distributing the monthly target across days
  using the daily shape I gave you. Never use a naive target / days-in-month linear split.
- Report the gap as dollars and as a percent of the pace target to date.
- Compute the required $/day for the remaining days, re-weighted by their seasonality, and
  compare it to my recent realized $/day. Flag if the target itself is unrealistic.
- Decompose the gap into Sessions x Conversion Rate x AOV and name the ONE binding lever.
- Do not declare a shortfall if a promo window distorts the window, stock was constrained,
  yesterday's orders are still settling, or tracking is drifting — mark FIX or HOLD instead.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read ending in PUSH / HOLD / IT'S FINE.
2. A table using exactly this header row:
   | MTD actual | Pace target to date | $ ahead/behind | Required $/day to close | Binding lever | Recommended move | Confidence |
   |---|---|---|---|---|---|---|
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns, and do
   not replace the table with prose.
3. The lever decomposition (traffic / CVR / AOV) showing which one is binding.
4. Vetoes/caveats that downgraded the call, and what evidence would upgrade it.
```

## Decision rules

- **PUSH** — MTD is behind the seasonality-adjusted pace by more than day-to-day noise (roughly >5% of pace), the required $/day is achievable, the binding lever is identified, and no veto applies. The move targets the binding lever specifically.
- **HOLD** — the gap is inside normal daily variance, the window is distorted by a promo or stockout, or it's too early in the month for the pace line to be stable. Watch, don't act.
- **IT'S FINE / KEEP** — MTD is at or ahead of the seasonality-adjusted pace and no risk signal is present.
- **REFRESH** — pace is slipping because a specific lever is decaying (e.g. CVR drifting down on a tired landing experience) but the underlying demand is still there.
- **FIX** — yesterday's orders are unsettled, tracking is drifting, or the seasonality baseline is missing; the pace read can't be trusted yet.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** extrapolate the month from a handful of low-traffic days — early-month and mid-week troughs are not a trend.
- Do **not** compare against a naive linear target; bake in known seasonality (paydays, weekends, holidays) or the read is wrong by construction.
- Do **not** declare "behind" when a promo window is inflating, front-loading, or hung-over the pace — a promo distorts pace in both directions.
- Do **not** call a shortfall before yesterday's orders have settled or while tracking is drifting — check tracking first.
- Do **not** prescribe "push" into a hero-SKU stockout or when tomorrow's spend can't actually be deployed.
- Do **not** authorize the spend increase, promo, or budget shift itself without an explicit human approval step.

## Output

A one-line trading read ending in the call, then a pace table:

| MTD actual | Pace target to date | $ ahead/behind | Required $/day to close | Binding lever | Recommended move | Confidence |
|---|---|---|---|---|---|---|
| $312,400 | $330,000 | −$17,600 (−5.3%) | $14,900/day (28d realized: $12,100) | Conversion rate | Push retargeting + fix PDP load on hero SKU | Med |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
