---
schema_version: 1
slug: "ecom-promo-effectiveness"
title: "Promo Effectiveness"
summary: "Promo Effectiveness helps ecommerce operators answer: Did the promotion improve customer quality, margin, or conversion?"
operating_question: "Did the promotion improve customer quality, margin, or conversion?"
short_title: "Promo Effectiveness"
primary_persona: "ecommerce"
personas: ["ecommerce", "marketing"]
category: "trading-profit"
platforms: ["commerce"]
cadence: "ad-hoc"
difficulty: "standard"
manual_time_minutes_min: 30
manual_time_minutes_max: 75
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "fast-follow"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://shop-mcp.app"
shopmcp_prompt: "Run the Promo Effectiveness play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Promo Effectiveness

## Operating Question

**That promo "converted" — but did it actually improve customer quality, basket size, or margin, or did it just rent a conversion-rate spike by discounting people who would have bought anyway?**

A promo is the easiest win in ecommerce to fake. Drop 15% off, watch conversion rate jump, screenshot the revenue line, call it a success. But conversion rate is the most flattering and least honest number in the building: it goes up the instant you make the offer cheaper, and it tells you nothing about *who* converted, *how much* they spent, *what it cost you in margin*, or *whether they ever come back*. This play is the CRO/storefront-quality lens on a **single completed promo**. It separates the conversion-rate headline from the four things that decide whether the promo was actually good business: AOV effect, acquired-customer quality, margin after discount, and full-price cannibalisation.

This is deliberately *not* the portfolio view (ranking promos by contribution — that's the Profit Doctor play) and *not* the pure-incrementality view (how much was truly net-new vs. pulled forward — that's the Promo Post-Mortem play). This play answers one narrower, storefront-level question: **was this one promo's conversion lift high-quality or hollow?**

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your storefront analytics, your order ledger, or your customer table — so it cannot tell a conversion-rate lift apart from a margin leak. To answer this honestly you have to:

1. Pull the **conversion rate** for the promo window *and* a clean baseline window of equal length and comparable traffic mix — not last month, not the all-time average.
2. Split orders into **promo-code / discounted** vs. **full-price** to measure how much full-price demand the promo simply absorbed.
3. Pull **AOV** and basket composition for both windows, because a threshold offer and a flat % off move basket size in opposite directions.
4. Tag the **new customers acquired in the window** and wait long enough to measure their **repeat rate** against a normal cohort — quality is a 60–90 day question, not a same-week one.
5. Subtract the **discount and the COGS** to get contribution per order, because the storefront only ever shows you gross revenue.

**The thinking in this playbook is free. The data access — joining orders, customers, and discounts across the right two windows — is the hard part, and that's exactly what ShopMCP connects.** If your AI assistant has no live line into your store, that join is where manual runs stall. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Ecommerce
- **Also useful for:** CRO / Site lead (CVR and AOV mechanics), Head of Retention (does the promo cohort repeat?), Head of Marketing (was the discount worth it?).
- Run it when someone is about to declare a promo a "win" off the revenue or conversion-rate line alone — or about to repeat the same offer next month.

## When To Run It

- **Cadence:** ad-hoc — after any discrete promo (a code drop, a sitewide % off, a threshold "spend $X get Y", a flash sale) has run and the window has closed.
- **Triggers:** a promo just ended; someone wants to re-run the same offer; the discount was deeper than usual; a finance review questions the margin; you are choosing between a % off and a threshold mechanic for next time.
- **Pre-requisite:** the promo window must be **closed** and you must have at least one clean, comparable baseline window. For the customer-quality call you also need enough elapsed time (≥60 days) since the promo to read repeat behaviour — if it just ended, run the conversion/AOV/margin half now and flag the quality call as **WATCH** until the cohort matures.

## Required Evidence

- **Conversion rate, two windows** — site/storefront CVR for the promo window and an equal-length baseline immediately before it (or the same period last year if seasonality dominates). Note sessions/traffic source mix for both, so you're not comparing a paid-traffic spike to organic baseline.
- **Orders split by discount** — order count, revenue, and discount applied, split **promo-code/discounted vs. full-price**, for the promo window. This is what exposes cannibalisation.
- **AOV, two windows** — average order value and, ideally, units per order, for promo vs. baseline. Separates "bigger baskets" from "same basket, lower price."
- **New customers acquired in the window** — count of first-order customers during the promo, tagged so their later behaviour can be tracked.
- **Margin inputs** — COGS or contribution margin per product (or blended), plus the actual discount depth, so you can compute contribution **after** discount, not just gross revenue.

## Optional Evidence

- **Promo-cohort repeat rate** — the 60- or 90-day repeat / second-order rate of customers acquired *in the promo window*, versus a baseline-cohort repeat rate. This is the single most important quality signal and the one most often skipped.
- **Discount mechanic** — was it a flat % off, a code, a threshold ("spend $80, save $15"), free shipping, or a bundle? The mechanic predicts the AOV direction.
- **Returning-vs-new split of redeemers** — how much of the discount was claimed by existing customers who would have repeated anyway (margin given away, not demand created).
- **Tracking/attribution notes** — discount-code reporting gaps, a checkout change mid-window, or a paid-traffic surge that inflates the CVR comparison.
- **Inventory state** — whether a stockout mid-promo suppressed conversions or AOV and is muddying the read.

## How To Pull This Evidence

- **Shopify promo-window CVR/AOV** — Shopify Analytics → Reports → "Online store conversion over time" and "Average order value" for the promo window, then re-run for an equal-length baseline immediately before it. *Gotcha:* Shopify's headline conversion rate is sessions-based and shifts with traffic-source mix — pull sessions and the referrer/channel breakdown for both windows so you're not reading a paid-traffic spike as an offer lift, and set both windows to the same store timezone.
- **New-vs-returning** — Reports → Customers → "First-time vs. returning customer sales" (or the "Customer cohort analysis" report) for the promo window to isolate first-order customers. *Gotcha:* Shopify keys "returning" off the customer record, so guest checkouts and customers who used a different email read as new and inflate the new-customer count — reconcile against orders that have a matching customer ID before trusting the tag.
- **Cohort repeat** — use "Customer cohort analysis" (or export the promo-window first-order customers and check second-order rate) at 60 and 90 days out, against a pre-promo baseline cohort of similar size. *Gotcha:* repeat behaviour needs ≥60 days to mature — if you pull it the week the promo ends you'll read a near-zero repeat rate and wrongly KILL a cohort that hasn't had time to come back; mark it WATCH instead.
- **Discount/margin** — Reports → "Discounts" (or "Sales by discount") to split discounted vs. full-price orders and total discount given, then bring in per-product COGS (Products → Inventory → "Cost per item", or your cost export) to compute contribution after discount. *Gotcha:* Shopify discount reporting only captures code- and automatic-discount orders — manual price edits, draft-order discounts, and Shopify Plus script discounts can slip the split, and "Cost per item" is often blank or stale, so confirm COGS coverage before trusting the contribution number.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Confirm the windows are comparable.** Equal length, comparable traffic-source mix, no checkout/tracking change mid-window, no stockout distorting either side. If the promo window was juiced by a paid-traffic push the baseline didn't have, the CVR delta is partly traffic, not offer → mark **FIX** on the comparison and caveat everything downstream.
2. **Measure the conversion-rate lift — and stop calling it the answer.** Compute promo CVR vs. baseline CVR. A lift is necessary but not sufficient. Treat it as the *headline you now have to disprove*, not the verdict.
3. **Check the AOV direction against the mechanic.** A **threshold** offer should *raise* AOV (people build baskets to hit it); a flat **% off** usually *lowers* effective AOV (same basket, less revenue). If AOV fell on a % off, the CVR lift is partly just cheaper orders, not more demand.
4. **Quantify cannibalisation.** What share of promo-window orders were full-price vs. discounted, and how does the full-price order *rate* compare to baseline? If discounted orders largely replaced full-price ones, you handed margin to buyers who'd have paid full freight.
5. **Interrogate customer quality.** Compare the promo cohort's 60-day repeat rate to a normal cohort. A discount-acquired cohort that repeats well is a genuine acquisition win; one that repeats materially below baseline is a one-time bargain-hunter haul dressed up as growth.
6. **Settle it on margin.** Compute contribution per order *after* discount and COGS, and total contribution for the window net of cannibalised full-price margin. A conversion win that's contribution-negative is a loss. **Conversion rate is not profit.**
7. **Apply the vetoes**, then assign status + owner + recheck date.

## Manual Workflow

1. Fix the two windows: the promo window and an equal-length, comparable baseline. Write down each window's sessions and traffic-source mix.
2. Pull CVR for both windows. Pull orders for the promo window split into discounted vs. full-price, with discount amounts.
3. Pull AOV (and units/order if you have it) for both windows; note the discount mechanic so you know which AOV direction to expect.
4. Tag the new customers acquired in the promo window. If ≥60 days have passed, pull their repeat rate and a baseline-cohort repeat rate; if not, flag the quality call as WATCH.
5. Compute contribution per order after discount and COGS, and a window total net of cannibalised full-price margin.
6. Paste the prompt below with your two-window tables.
7. Pressure-test the "win" against the veto list, then convert into an action packet with owner and recheck date.

## Copy-Paste Prompt

```text
You are my ecommerce/CRO analyst running the "Promo Effectiveness" play on ONE completed promo.

GOAL: decide whether this promo's conversion-rate lift was high-quality or hollow — judged on
AOV effect, acquired-customer quality, full-price cannibalisation, and margin after discount.
This is NOT a portfolio ranking and NOT a pure-incrementality study. It is the storefront-quality
read on a single promo.

I will paste, for the promo window and an equal-length baseline window:
- Conversion rate + sessions + traffic-source mix for both windows
- Orders split into discounted vs. full-price (with discount amounts) for the promo window
- AOV (and units/order if available) for both windows, plus the discount mechanic (% off / code /
  threshold / free shipping / bundle)
- New customers acquired in the promo window, and their 60-day repeat rate vs. a baseline cohort
  (or a note that the cohort hasn't matured yet)
- COGS or contribution margin and the actual discount depth
Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical inputs are the
promo-window CVR and AOV, the new-customer flag for the cohort, and margin (COGS/contribution +
discount depth) — each measured against the baseline window. Without the promo cohort's repeat
behaviour and the margin inputs you cannot judge whether the conversion lift was quality or hollow.
If any critical input is missing, STOP and return only (a) what's missing and (b) how to get it —
never estimate it or proceed.

RULES:
- Treat the conversion-rate lift as a headline to disprove, not the verdict.
- Check AOV direction against the mechanic: a threshold offer should raise AOV; a flat % off
  usually lowers it. Flag a mechanic/AOV mismatch.
- Quantify cannibalisation: how much full-price demand the discount simply absorbed.
- Judge customer quality on the promo cohort's repeat rate vs. baseline; if the cohort hasn't
  had 60 days to mature, mark the quality call WATCH, never KEEP.
- Settle the verdict on contribution after discount and COGS, net of cannibalised full-price
  margin — not on gross revenue or CVR.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 2-3 sentence executive read that names the verdict (e.g. "conversion win, quality loss").
2. A table using exactly this header row:
   | Dimension | Promo window | Baseline | Delta | Read |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the table
   with prose.
3. The single decision: was this promo good business? Status + why.
4. Vetoes/caveats that downgraded the call, and what evidence would upgrade a WATCH.
```

## Decision Rules

- **KEEP / repeat the promo** — CVR lifted, AOV held or rose in line with the mechanic, the acquired cohort repeats at or near baseline, and contribution after discount and cannibalisation is positive. A clean, repeatable win.
- **REFRESH the mechanic** — the promo drove volume but the *shape* is wrong: e.g. a flat % off that crushed AOV and margin where a threshold or bundle would have lifted basket size. Keep promoting, change the offer structure.
- **WATCH** — the conversion and AOV read is in but the **customer-quality verdict is unresolved** because the promo cohort hasn't had ≥60 days to show repeat behaviour, or the sample of new customers is too small to trust. Directional only.
- **KILL / don't repeat** — CVR "lifted" but the cohort repeats well below baseline, AOV fell, or contribution after discount is negative once cannibalised full-price margin is subtracted. A hollow win.
- **FIX** — the two windows aren't comparable (unequal length, a paid-traffic surge on one side, a checkout/tracking change, a stockout, or discount-code reporting gaps) and no safe call can be made until the comparison is clean.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- **A conversion-rate lift is not a profit verdict.** Never call a promo a win on CVR or gross revenue alone — settle it on contribution after discount and COGS.
- **Never judge customer quality before the cohort matures.** Do not call a discount-acquired cohort "good customers" until you've watched their repeat rate over ≥60 days against a baseline cohort. Same-week repeat is not evidence.
- **Always account for cannibalised full-price sales.** Discount redemption by buyers who'd have paid full price is margin given away, not demand created — subtract it before claiming incremental contribution.
- **Confirm tracking and comparability across the window.** Do not trust the CVR delta if traffic mix differed, a checkout/tracking change landed mid-window, or discount-code reporting had gaps.
- **Do not attribute the lift to the offer alone** if a concurrent paid push, email blast, or seasonal spike also hit the window.
- **Do not recommend repeating, deepening, or writing any promo change** — codes, price edits, customer messages — without explicit human approval.

## Output Contract

A short storefront-quality read, a two-window comparison table, the verdict, the confidence level, and the next action.

Minimum table columns:

| Dimension | Promo window | Baseline | Delta | Read |
|---|---|---|---|---|
| Conversion rate | 2.6% | 1.8% | +0.8pp | Lift is real but needs disproving |

## Worked Example

> **Executive read:** This was a **conversion win and a quality loss.** The 15%-off promo lifted CVR from 1.8% to 2.6% and pulled in 420 new customers — but that cohort's 60-day repeat rate is 22% against a 31% baseline, and AOV fell 9% on a flat % off where a threshold would have protected basket size. After discount and the cannibalised full-price orders, contribution per order was roughly flat to slightly negative. Do not repeat this mechanic as-is; if you promote again, switch to a spend-threshold offer to defend AOV and stop discounting customers who'd have paid full price.

| Dimension | Promo window (14 days) | Baseline (prior 14 days) | Delta | Read |
|---|---|---|---|---|
| Conversion rate | 2.6% | 1.8% | **+0.8pp (+44%)** | Headline lift — necessary, not sufficient |
| Avg order value | $58 | $64 | **−9%** | Flat % off shrank baskets; wrong mechanic |
| New customers acquired | 420 | 295 | +125 | More volume, quality unknown until cohort matures |
| Promo-cohort 60-day repeat | 22% | 31% | **−9pp** | Lower-quality buyers; bargain-hunter skew |
| Full-price share of orders | 38% | 71% | **−33pp** | Heavy cannibalisation of full-price demand |
| Contribution / order (post-discount) | ~$11 | ~$14 | **−$3** | Conversion win is margin-negative |

The read *inverts* the dashboard: the promo's headline (CVR up 44%, 420 new customers) looks like a triumph, but lower repeat, shrunken AOV, and cannibalised full-price margin make it a contribution-flat-to-negative event that acquired the wrong customers.

## Common Failure Modes

- Declaring victory off the conversion-rate or gross-revenue line and never checking margin.
- Calling a discount-acquired cohort "new customers" without ever measuring whether they repeat.
- Comparing the promo window to a non-comparable baseline (different length, different traffic mix, a stockout).
- Using a flat % off and being surprised AOV fell — then blaming the storefront instead of the mechanic.
- Ignoring how much of the discount went to full-price buyers who'd have converted anyway.
- Treating same-week repeat as proof of quality instead of waiting for the 60-day cohort read.

## Run This Play With Live Data

**Manual version:** pull CVR for two comparable windows, split orders into discounted vs. full-price, compute AOV both ways, tag and wait on the new-customer cohort, then subtract discount and COGS by hand — a multi-tool join you have to rebuild every promo.

**ShopMCP version:** connect your store once. Ask the question; ShopMCP pulls the promo-window and baseline CVR, splits orders by discount, computes the AOV delta against the mechanic, tags the promo cohort and reads its repeat rate, and overlays margin to return the conversion-vs-quality verdict in one brief — not a revenue screenshot. It stays **read-only**: it will not repeat a promo, edit a code, or message customers without explicit approval.

> No store connection inside your AI assistant? That's the wall every manual run hits — without a live line into orders, customers, and discounts, the assistant can't tell a conversion lift apart from a margin leak. ShopMCP *is* that connection, and the same playbook runs in one prompt instead of a spreadsheet afternoon.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Promo Effectiveness play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- The manual join across orders, customers, and discounts for two matched windows.
- Tagging the promo cohort and remembering to read its repeat rate 60 days later.
- Computing contribution after discount and cannibalisation by hand.
- Rebuilding the same two-window comparison every time a promo ends.
