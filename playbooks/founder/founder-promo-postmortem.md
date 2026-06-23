---
slug: "founder-promo-postmortem"
title: "Promo Post-Mortem"
operating_question: "Did the promotion create incremental value or just pull forward demand?"
primary_persona: "founder"
personas: ["founder", "ecommerce", "marketing"]
category: "trading-profit"
platforms: ["commerce"]
cadence: "ad-hoc"
public_tier: "launch"
---

# Promo Post-Mortem

## Operating Question

**Did this promotion create incremental contribution profit, or did it just pull forward demand we would have captured anyway — at full price?**

A finished promo always looks like a win inside the store dashboard: revenue spikes, order count jumps, the team feels good. That headline number is a trap. The only question that matters for the next promo decision is **incrementality** — did the discount *generate* orders that would not otherwise have happened, or did it *re-price* orders that were already coming? This play tears the gross uplift apart, nets out the post-promo trough, charges the promo for every margin dollar given away on units that would have sold at full price, and lands a verdict: **incremental, break-even, or margin-dilutive.** The decision it protects is whether you ever run this offer again.

## Why You Can't Just Ask ChatGPT This

A bare AI assistant has no line into your store, so it cannot see the one thing this play turns on: the **counterfactual** — what sales *would have been* without the promo. To answer this manually you have to:

1. Export daily orders for the promo window **and** at least the four weeks before it **and** the same calendar window last year (to separate the promo effect from seasonality).
2. Export the **two-to-three weeks after** the promo, because pull-forward only shows up as a trough you have to go looking for.
3. Split every order into **new vs. returning** customer and tag which ones used the discount code.
4. Attach **COGS and the discount amount per line** so you can compute contribution profit, not revenue.
5. Wait 30–60 days and re-pull to see whether promo-acquired customers ever placed a **second** order.

**The reasoning here is free. The data access — daily order history, customer mix, per-line margin, and a forward-looking repeat cohort — is the wall.** That wall is exactly what ShopMCP connects. Hold the thought; the final section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Founder / CEO — this is a trading-profit call, not a marketing-reporting one.
- **Also useful for:** Head of Ecommerce (calendar planning), Head of Finance (margin sign-off), Head of Retention (was this a customer-acquisition event or a discount to the loyal base?).
- Run it when someone is about to say *"that worked, let's do it again"* — before the offer gets baked into the calendar.

## When To Run It

- **Cadence:** ad-hoc — after any promotion with a discount of roughly **15% or deeper**, or any sitewide/category event (BFCM, an anniversary sale, a flash sale, a code drop).
- **Triggers:** a promo just ended; planning next quarter's promo calendar; finance questions why margin dipped in a strong-revenue month; a wholesale partner or marketplace pushes you to discount.
- **Pre-requisite:** let the window **settle at least 14 days past the promo end** so the post-promo trough is visible. Running it the morning after the sale will always flatter the promo — the dip hasn't happened yet.

## Required Evidence

- **Promo definition** — start/end dates, discount mechanic (% off, code, BOGO, free-shipping threshold), and which products/collections were eligible.
- **Daily orders, units, and revenue** for: the **promo window**, the **4 weeks immediately before** (baseline), and the **2–3 weeks immediately after** (trough window).
- **Counterfactual baseline** — same calendar period **last year**, or a trailing non-promo run-rate, to net out seasonality and underlying growth.
- **New vs. returning split** per order across all three windows, plus discount-code usage flag.
- **COGS / contribution margin** per unit, and the **discount value** actually given away (not list price).
- **Returns / refunds** on promo-window orders — discounted units come back at a higher rate and must be netted out.

## Optional Evidence

- **Repeat-purchase cohort** — did promo-acquired *new* customers place a second order in the following 30–60 days? This is what separates "bought a discount" from "bought a customer."
- **Paid-media spend in the window** — a promo amplified by extra ad spend isn't a clean read of the offer itself.
- **Inventory / stock cover** — a sell-through that emptied a hero SKU borrows from future full-price weeks.
- **Full-price sell-through of the same SKUs** in the baseline — tells you how many discounted units would have sold anyway.
- **Email/SMS send volume** behind the promo — distinguishes offer pull from list-fatigue.

## How To Pull This Evidence

- **Daily orders / units / revenue (all windows):** Shopify Admin → Analytics → Reports → "Sales over time," set Day granularity and export CSV per window. Gotcha: the default report is by *order processed date* and includes taxes/shipping — filter to net sales and confirm the timezone matches your promo start/end, or a sale that ran "Friday" leaks an extra day.
- **Same-period-last-year baseline:** re-run the same Shopify sales report with last year's date range. Gotcha: if the SKU set or your traffic mix changed materially YoY, last year isn't a clean counterfactual on its own — pair it with the trailing 4-week run-rate.
- **New vs. returning + discount-code usage:** Shopify → Analytics → "Sales by customer type," and Discounts → the specific code for redemption counts. Gotcha: "returning" is keyed to Shopify's customer record, so guest checkouts and email-mismatched repeat buyers get mis-tagged as new — treat the new share as a slight overcount.
- **COGS / contribution margin:** Shopify product "Cost per item" field (Admin → Products), exported via the "Sales" report's cost columns or a margin app. Gotcha: COGS is blank for any SKU where cost was never entered, and it's a *current* snapshot — it won't reflect what the unit actually cost during the promo.
- **Discount value actually given away:** Shopify Discounts report → "Total discounts," not list price. Gotcha: automatic discounts, stacked codes, and free-shipping thresholds land in different buckets — sum them or you'll undercount the margin transfer.
- **Returns / refunds on promo orders:** Shopify → Analytics → "Returns" or the Refunds export, filtered to orders within the promo window. Gotcha: refunds lag the sale by days to weeks, so let the window settle before reading the rate or you'll flatter the promo.
- Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Establish the counterfactual first.** Before looking at uplift, fix the baseline: trailing 4-week run-rate *and* same-period-last-year. **Gross uplift means nothing until you have a number to be incremental *against*.** If you can't build a credible baseline, the play is **FIX**, not a verdict.
2. **Measure gross uplift.** Promo-window revenue and units vs. baseline. Note it — but treat it as the *claim to be disproven*, not the answer.
3. **Net the post-promo trough (pull-forward).** Compare the 2–3 weeks after the promo to the baseline. A dip here is demand you *borrowed*, not created. **Incremental units = (promo-window uplift) − (post-promo shortfall).** If the trough erases most of the uplift, the promo moved timing, not volume.
4. **Charge the margin given away.** For every discounted unit that would have sold at full price (use baseline full-price sell-through to estimate this share), the discount is a **pure margin transfer**, not a cost of acquisition. Subtract it.
5. **Split new vs. returning.** If the discount mostly hit **returning/loyal** customers, you re-priced orders that were already loyal — the worst kind of margin leak. A high *new*-customer share is the only thing that can justify a thin promo margin (you may be buying LTV).
6. **Net returns on discounted units**, then compute **contribution profit after discount and refunds**.
7. **Land the verdict** — incremental / break-even / margin-dilutive — apply the vetoes, and assign owner + recheck (the repeat-cohort check 30–60 days out).

## Manual Workflow

1. Write the promo definition and the three date windows (before / during / after), plus the same-period-last-year window.
2. Export daily orders, units, revenue, new-vs-returning, discount-code flag, COGS, and refunds for all windows.
3. Build the baseline (trailing run-rate + last-year) — this is the counterfactual.
4. Compute gross uplift, then **subtract the post-promo trough** to get net incremental units.
5. Estimate the would-have-bought-anyway share from baseline full-price sell-through; charge the discount on those units as margin transfer.
6. Net returns; compute contribution profit after discount and refunds.
7. Paste the prompt below with your tables; pressure-test the verdict against the vetoes; schedule the 30–60-day repeat-cohort recheck.

## Copy-Paste Prompt

```text
You are my ecommerce trading analyst running the "Promo Post-Mortem" play.

GOAL: decide whether a finished promotion created INCREMENTAL contribution profit or
just pulled forward demand we'd have captured anyway at full price. Gross revenue uplift
is the claim to disprove, NOT the answer.

I will paste: the promo definition (dates, discount, eligible SKUs); daily orders/units/
revenue for the promo window, the 4 weeks before, and the 2-3 weeks after; same-period-
last-year; new-vs-returning split; discount value given away; COGS; and refunds. Some
data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If a clean pre-promo
baseline (trailing 4-week run-rate and/or same-period-last-year) or per-unit margin/COGS to
judge incrementality is missing, STOP and return only (a) what's missing and (b) how to get
it -- never estimate it or proceed.

RUN IN THIS ORDER:
1. Build the counterfactual baseline (trailing 4-week run-rate AND same-period-last-year).
   If no credible baseline exists, return FIX -- do not score the promo.
2. State gross uplift vs baseline, then immediately net the post-promo trough:
   incremental units = promo-window uplift - post-promo shortfall.
3. Charge the discount as a pure margin transfer on the share of units that would have
   sold at full price (estimate from baseline full-price sell-through).
4. Split new vs returning. Flag if the discount mostly hit returning/loyal customers.
5. Net refunds on discounted units. Compute contribution profit after discount + refunds.
6. Verdict: INCREMENTAL / BREAK-EVEN / MARGIN-DILUTIVE.

RULES:
- Never present gross uplift as incrementality.
- Every row must carry a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent data.
- Do not claim the promo "worked" until the post-promo trough and margin are netted.

RETURN:
1. A 2-3 sentence executive read with the verdict.
2. A table using exactly this header row:
   | Metric | Baseline (run-rate / LY) | Promo window | Post-promo window | Net incremental | Confidence |
   |---|---|---|---|---|---|
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns, and
   do not replace the table with prose.
3. The contribution-profit walk (gross uplift -> minus trough -> minus margin given away
   -> minus refunds -> net).
4. Vetoes/caveats and what evidence would upgrade the confidence.
```

## Decision Rules

- **KILL (don't repeat this offer)** — net incremental units are near zero or negative after the trough, and contribution after discount + refunds is below your margin floor. The promo re-priced existing demand.
- **REFRESH (re-shape, don't retire)** — the offer drove real incremental *new* customers but margin was too thin; fix the mechanic (shallower discount, threshold, bundle, exclude loyal base) and re-run.
- **WATCH** — directional only: window too fresh to see the full trough, or the repeat-cohort read on promo-acquired customers isn't in yet (re-pull at 30–60 days).
- **KEEP (repeat as-is)** — net incremental contribution is clearly positive after the trough, margin, and refunds, **and** new-customer share justifies the spend.
- **FIX** — no credible baseline/counterfactual, missing COGS or discount values, or paid spend so entangled the offer can't be isolated.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- **Gross uplift is not incrementality.** Never sign off a promo on revenue or order-count uplift alone — the post-promo trough must be netted first.
- **Always net the post-promo trough.** A window cut off at the promo's end date will always overstate the win.
- **Discounting to loyal / returning buyers destroys margin.** A promo that mostly hit the returning base re-priced demand you already owned; flag it, never call it a win.
- **Account for returns on discounted units.** Discounted and impulse orders refund at a higher rate; unrefunded "revenue" is not contribution.
- **No profit claim without COGS and the real discount value** — list-price math hides the margin you actually gave away.
- **Don't claim causality from one window.** Same-period-last-year or a trailing baseline is mandatory; a single spike is not proof.
- **No writes** — calendar changes, flow edits, or repeat-promo scheduling — without explicit human approval.

## Output Contract

A trading verdict (incremental / break-even / margin-dilutive), a windowed metric table, the contribution-profit walk, the main driver, a confidence level, and the next action with owner and recheck date.

Minimum table columns:

| Metric | Baseline (run-rate / LY) | Promo window | Post-promo window | Net incremental | Confidence |
|---|---|---|---|---|---|
| Example row | Source + number + window | number | number | number | High / Med / Low |

## Worked Example

> **Executive read:** Verdict — **margin-dilutive, not incremental.** The "Spring 20% Off Sitewide" week looked like a hit at **+42% gross revenue** vs. the trailing 4-week run-rate, but the **two weeks after ran −18%** below baseline: most of the uplift was demand pulled forward, not created. **80% of buyers were existing customers** redeeming the code on orders they'd likely have placed anyway, and after the 20% discount, COGS, and a slightly elevated 9% refund rate, **contribution profit landed near zero (≈$1.6k on $186k of promo revenue)**. Net incremental new customers were thin and their 30-day repeat read isn't in yet. Recommendation: **do not repeat sitewide; REFRESH into a new-customer-only or threshold offer** and recheck the acquired cohort at day 30.

| Metric | Baseline (4-wk run-rate / LY) | Promo window (7 days) | Post-promo (14 days) | Net incremental | Confidence |
|---|---|---|---|---|---|
| Revenue | $131k/wk run-rate | $186k (+42%) | −$24k vs baseline | **+$31k**, not +$55k | High |
| Orders | 2,310/wk | 3,140 (+36%) | −410 vs baseline | **+420 net** | High |
| New-customer share | 31% | 20% | 28% | Returning-heavy | High |
| Discount given away | — | $37.2k | — | Pure margin transfer on ~68% would-buy units | Med |
| Refund rate | 6% | 9% | 7% | +3pts on discounted units | Med |
| Contribution after discount + refunds | — | **≈$1.6k** | — | Near break-even | Med |
| Promo-acquired repeat (30d) | — | pending | — | — | **Unavailable** |

Note how the answer *inverts* the dashboard: the headline +42% revenue is real, but once the −18% trough, the 80% returning mix, and the $37.2k of margin handed to people who'd have paid full price are netted, the promo bought almost no profit — it mostly moved the timing of orders the store already owned.

## Common Failure Modes

- Celebrating gross revenue/order uplift and never looking at the weeks *after* the promo.
- Cutting the analysis window at the promo end date, so the pull-forward trough never appears.
- Crediting the promo with returning-customer orders that were already coming.
- Doing the margin math on list price instead of the discount actually given away.
- Ignoring the higher refund rate on discounted and impulse orders.
- Declaring victory before the promo-acquired cohort has had a chance to (not) repeat.

## Run This Play With Live Data

**Manual version:** export daily orders for three windows plus last year, split new vs. returning, attach COGS and per-line discount, net the refunds, then re-pull in 30–60 days for the repeat cohort — all by hand, in a spreadsheet.

**ShopMCP version:** connect your store once. Ask the question; ShopMCP pulls the daily order history, builds the trailing-and-last-year baseline, nets the post-promo trough, splits new vs. returning, charges the real discount and COGS, nets refunds, and returns the contribution-profit walk with an incremental / break-even / margin-dilutive verdict — then schedules the 30–60-day repeat-cohort recheck. It stays **read-only** until you explicitly approve any calendar or flow change.

> No store connection inside your AI assistant — no daily order history, no customer mix, no per-line margin? That's the wall every manual promo post-mortem hits. ShopMCP *is* that connection, and the same playbook runs in one prompt instead of a spreadsheet afternoon plus a calendar reminder.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Promo Post-Mortem play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual exports of three order windows plus same-period-last-year.
- Rebuilding the counterfactual baseline and netting the trough by hand.
- Stitching new-vs-returning mix to per-line COGS and discount values.
- Remembering to re-pull the promo-acquired cohort 30–60 days later.
