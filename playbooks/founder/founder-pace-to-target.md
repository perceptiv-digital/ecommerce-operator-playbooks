---
schema_version: 1
slug: "founder-pace-to-target"
title: "Pace to Target"
summary: "Pace to Target helps ecommerce operators answer: Are we on pace to hit the target, and what must change today?"
operating_question: "Are we on pace to hit the target, and what must change today?"
short_title: "Pace to Target"
primary_persona: "founder"
personas: ["founder"]
category: "trading-profit"
platforms: ["commerce"]
cadence: "daily"
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
shopmcp_run_url: "https://shop-mcp.app"
shopmcp_prompt: "Run the Pace to Target play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Pace to Target

## Operating Question

**Are we on pace to hit this month's revenue target, and what is the single thing we must change today to close the gap?**

Every morning the founder asks a version of "are we OK?" and gets a useless answer: a raw month-to-date (MTD) number with no sense of whether it's ahead or behind where it *should* be by this date. The trap is the naive linear split — dividing the monthly target by the number of days and comparing. That's wrong, because demand isn't flat: weekends, paydays, and promo days carry far more revenue than a dead Tuesday mid-month. This play compares MTD revenue against a **seasonality-adjusted pace target**, computes the **required run-rate for the days remaining**, decomposes any gap into its three levers — **traffic, conversion rate, AOV** — and ends with one call: **push, hold, or it's fine.**

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Shopify/Woo/BigCommerce orders, your sessions, or last year's daily revenue curve. To run this manually you have to:

1. Pull MTD revenue and yesterday's revenue from your commerce platform.
2. Rebuild a **seasonality-adjusted pace curve** — last year's same-month daily shape, or a trailing weekday index — so the comparison isn't a flat line.
3. Pull sessions and order count for the same window to compute conversion rate and AOV, then split today's gap across those three levers.
4. Cross-check the promo calendar and any tracking incidents before you trust the shortfall.

**The thinking in this playbook is free. The data access is the hard part — and that is exactly what ShopMCP connects.** Without a live line into your store, a manual run stalls at step 2: nobody rebuilds the daily seasonality curve by hand at 8am. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Founder / CEO
- **Also useful for:** Head of Ecommerce / GM (owns the daily trading call), Performance lead (executes the "push")
- Run it as the **first thing each morning**, before standup, so the day's spend and promo decisions start from a pace read, not a vibe.

## When To Run It

- **Cadence:** daily — early, on the previous day's settled orders.
- **Triggers:** the morning trading check; the day after a promo launches or ends; any day MTD swings hard against the pace line; the final week of the month when the required run-rate gets steep.
- **Pre-requisite:** confirm yesterday's orders have fully settled and tracking is clean. A pending-order lag or a broken pixel will fake a shortfall — never declare "behind" on top of unsettled data.

## Required Evidence

- **Commerce — MTD actuals:** revenue month-to-date, order count, and sessions for the same MTD window (Shopify/Woo/BigCommerce). Net revenue after refunds and cancellations, not gross.
- **Commerce — yesterday:** revenue, orders, sessions, and AOV for the most recent settled day.
- **The monthly target:** the revenue goal for the current month, and how it was set (run-rate, board number, or stretch).
- **Seasonality shape:** last year's same-month **daily** revenue curve, or — if you don't have clean YoY — a trailing **weekday index** (avg revenue per weekday over the last 8–12 weeks). This is what turns a flat split into a real pace target.
- **Days remaining:** calendar days left in the month, flagged by weekday and any known peak days.

## Optional Evidence

- **Promo calendar** — a live or imminent promo window inflates or front-loads pace; a finished promo leaves a demand hangover.
- **Paydays / known peaks** — end-of-month and mid-month paydays, paycheck cycles, payday-adjacent weekends.
- **Channel mix / planned spend** — whether tomorrow's paid budget is already booked, so "push" is realistic.
- **Stock cover on hero SKUs** — you can't push into a stockout.
- **Last year's promo timing** — so the YoY pace curve isn't distorted by a promo that ran on different dates.

## How To Pull This Evidence

- **MTD + yesterday revenue (Shopify):** Analytics → Reports → "Sales over time", set the range to month-to-date and group by day. Gotcha: the Analytics dashboard tiles show *gross* and update in near-real-time, so yesterday's number keeps moving until orders settle — pull from the Sales *report* (net of refunds), not the home-screen tiles, and only after the day has closed.
- **MTD + yesterday revenue (WooCommerce):** WooCommerce → Reports / Analytics → Orders, filtered to the current month. Gotcha: "processing" and "on-hold" orders inflate revenue; filter to completed/paid statuses or you'll book a shortfall that fills in once payments clear.
- **MTD + yesterday revenue (BigCommerce):** Analytics → Insights / Orders, by day. Gotcha: BigCommerce counts revenue at order placement, so refunds and cancellations lag — reconcile against the Transactions/refunds view before trusting yesterday's net.
- **Sessions for CVR (GA4):** Explore → free-form, Sessions by date for the same MTD window; CVR = orders ÷ sessions. Gotcha: GA4 "sessions" ≠ Shopify sessions and GA4 holds a 24–48h processing lag plus thresholding on low-volume days — use one source for sessions consistently, and never compute CVR off a not-yet-final day.
- **Seasonality curve (last year's daily shape):** same commerce Sales report, range set to the same calendar month last year, grouped by day. Gotcha: if a promo ran on different dates last year, that day's spike will mis-shape the curve — note last year's promo timing and smooth or exclude those days before scaling.
- **Days remaining + peak days:** the calendar, cross-checked against your promo calendar and payday dates. Gotcha: a single payday weekend can hold 15–25% of the month's revenue, so "behind on day 20" is often fine if that weekend is still ahead — never extrapolate before the heavy days land.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Check tracking and settlement first.** If yesterday's orders are still settling, the pixel is drifting, or sessions look implausible, mark the read **FIX** and stop — do not declare a shortfall on dirty data.
2. **Build the seasonality-adjusted pace target, not a linear one.** Distribute the monthly target across days using last year's daily shape (or the weekday index), so each day carries its real weight. The expected MTD line is the cumulative sum to today's date.
3. **Compute the gap.** Gap ($) = MTD actual − seasonality-adjusted MTD pace target. State it as dollars ahead/behind and as a percentage of the pace target.
4. **Compute the required run-rate.** Required $/day for the rest of the month = (monthly target − MTD actual) ÷ days remaining, then re-weight by the remaining days' seasonality. Compare it to your recent realized $/day. If the required rate is wildly above what you've ever run, the target — not the day — is the problem.
5. **Decompose the gap into levers.** Revenue = Sessions × Conversion Rate × AOV. Compare each factor's MTD value against the pace assumption to find the **binding lever**: is the gap a traffic problem, a conversion problem, or an AOV problem? Only one usually dominates.
6. **Make the call.** PUSH (add spend/promo against the binding lever), HOLD (gap is inside noise or a promo distorts the window), or IT'S FINE (ahead of pace). Attach the specific move to the binding lever, never a generic "spend more."

## Manual Workflow

1. Pull MTD revenue, orders, and sessions, plus yesterday's same metrics, from your commerce platform.
2. Build the pace target: take last year's same-month daily revenue curve (or your trailing weekday index), scale it so the month sums to this year's target, and cumulate to today. That's your seasonality-adjusted MTD pace line.
3. Subtract to get the gap in dollars and percent; compute the required $/day for the days remaining, weighted by their seasonality.
4. Split the gap across traffic × conversion rate × AOV to find the binding lever.
5. Overlay the promo calendar, paydays, and stock cover to catch distortions.
6. Paste the prompt below with your numbers, pressure-test the call against the vetoes, then write the one-line action with an owner and a recheck time.

## Copy-Paste Prompt

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

## Decision Rules

- **PUSH** — MTD is behind the seasonality-adjusted pace by more than day-to-day noise (roughly >5% of pace), the required $/day is achievable, the binding lever is identified, and no veto applies. The move targets the binding lever specifically.
- **HOLD** — the gap is inside normal daily variance, the window is distorted by a promo or stockout, or it's too early in the month for the pace line to be stable. Watch, don't act.
- **IT'S FINE / KEEP** — MTD is at or ahead of the seasonality-adjusted pace and no risk signal is present.
- **REFRESH** — pace is slipping because a specific lever is decaying (e.g. CVR drifting down on a tired landing experience) but the underlying demand is still there.
- **FIX** — yesterday's orders are unsettled, tracking is drifting, or the seasonality baseline is missing; the pace read can't be trusted yet.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do **not** extrapolate the month from a handful of low-traffic days — early-month and mid-week troughs are not a trend.
- Do **not** compare against a naive linear target; bake in known seasonality (paydays, weekends, holidays) or the read is wrong by construction.
- Do **not** declare "behind" when a promo window is inflating, front-loading, or hung-over the pace — a promo distorts pace in both directions.
- Do **not** call a shortfall before yesterday's orders have settled or while tracking is drifting — check tracking first.
- Do **not** prescribe "push" into a hero-SKU stockout or when tomorrow's spend can't actually be deployed.
- Do **not** authorize the spend increase, promo, or budget shift itself without an explicit human approval step.

## Output Contract

A one-line trading read ending in the call, then a pace table:

| MTD actual | Pace target to date | $ ahead/behind | Required $/day to close | Binding lever | Recommended move | Confidence |
|---|---|---|---|---|---|---|
| $312,400 | $330,000 | −$17,600 (−5.3%) | $14,900/day (28d realized: $12,100) | Conversion rate | Push retargeting + fix PDP load on hero SKU | Med |

## Worked Example

> **Executive read (PUSH):** We're $17,600 behind the seasonality-adjusted pace through day 20 — a 5.3% gap, not a crisis, but the required run-rate to hit the month is $14,900/day versus the $12,100 we've actually been running, so the gap won't close on autopilot. The binding lever is conversion rate (1.7% MTD vs the 2.1% the pace assumes); traffic and AOV are both on plan. Push retargeting spend at the warm audience today and ship the PDP load-time fix on the hero SKU — do not raise the top-of-funnel budget, since traffic isn't the problem.

| Factor | MTD actual | Pace assumption | Read |
|---|---|---|---|
| Sessions | 184,000 | 180,500 | On plan (+1.9%) |
| Conversion rate | 1.70% | 2.10% | **Binding lever** (−19%) |
| AOV | $99.80 | $98.50 | On plan (+1.3%) |
| MTD revenue | $312,400 | $330,000 | −$17,600 (−5.3%) behind pace |

The naive linear target through day 20 of a 31-day month would have read $354,000 and screamed "12% behind, panic" — the seasonality curve corrects that to a manageable 5.3%, because the month's heavy payday weekend still sits in the remaining 11 days.

## Common Failure Modes

- Comparing MTD against a flat target/days split and either panicking or relaxing for no reason.
- Extrapolating the whole month off three slow mid-week days.
- Missing that a promo borrowed demand forward, so "ahead of pace" is really a future hole.
- Declaring a shortfall before yesterday's orders settled or while the pixel was drifting.
- Prescribing "spend more" without naming which lever — traffic, CVR, or AOV — is actually binding.

## Run This Play With Live Data

**Manual version:** pull MTD and yesterday's metrics, rebuild last year's daily seasonality curve, scale it to this month's target, subtract, compute the required run-rate, and split the gap across three levers — every morning, before coffee.

**ShopMCP version:** connect your store once. Ask the question; ShopMCP pulls live MTD and daily revenue, builds the seasonality-adjusted pace line from your own history, computes the gap and the required run-rate, runs the traffic × CVR × AOV decomposition, and returns the pace table with the PUSH / HOLD / IT'S FINE call. It stays **read-only** until you explicitly approve a spend or promo change.

> No store connection inside your AI assistant? That's the wall every manual run hits — nobody rebuilds a daily seasonality curve by hand at 8am. ShopMCP *is* the connection, and the same playbook then runs in one prompt instead of a morning spreadsheet.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Pace to Target play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual MTD exports and stale morning CSVs.
- Rebuilding the seasonality-adjusted pace curve by hand every day.
- Splitting the gap across traffic, conversion, and AOV in a spreadsheet.
- Guessing whether a promo window or unsettled orders are faking the shortfall.
