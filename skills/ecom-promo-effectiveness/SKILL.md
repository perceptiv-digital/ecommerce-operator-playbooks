---
name: ecom-promo-effectiveness
description: "When an ecommerce operator needs to decide: Did the promotion improve customer quality, margin, or conversion? Runs the Promo Effectiveness play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Promo Effectiveness', 'Commerce', 'Trading Profit'."
license: CC-BY-4.0
metadata:
  persona: Head of Ecommerce
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Promo Effectiveness

**Operating question:** Did the promotion improve customer quality, margin, or conversion?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Conversion rate, two windows** — site/storefront CVR for the promo window and an equal-length baseline immediately before it (or the same period last year if seasonality dominates). Note sessions/traffic source mix for both, so you're not comparing a paid-traffic spike to organic baseline.
- **Orders split by discount** — order count, revenue, and discount applied, split **promo-code/discounted vs. full-price**, for the promo window. This is what exposes cannibalisation.
- **AOV, two windows** — average order value and, ideally, units per order, for promo vs. baseline. Separates "bigger baskets" from "same basket, lower price."
- **New customers acquired in the window** — count of first-order customers during the promo, tagged so their later behaviour can be tracked.
- **Margin inputs** — COGS or contribution margin per product (or blended), plus the actual discount depth, so you can compute contribution **after** discount, not just gross revenue.

Optional, if available:

- **Promo-cohort repeat rate** — the 60- or 90-day repeat / second-order rate of customers acquired *in the promo window*, versus a baseline-cohort repeat rate. This is the single most important quality signal and the one most often skipped.
- **Discount mechanic** — was it a flat % off, a code, a threshold ("spend $80, save $15"), free shipping, or a bundle? The mechanic predicts the AOV direction.
- **Returning-vs-new split of redeemers** — how much of the discount was claimed by existing customers who would have repeated anyway (margin given away, not demand created).
- **Tracking/attribution notes** — discount-code reporting gaps, a checkout change mid-window, or a paid-traffic surge that inflates the CVR comparison.
- **Inventory state** — whether a stockout mid-promo suppressed conversions or AOV and is muddying the read.

## How to decide — in order

1. **Confirm the windows are comparable.** Equal length, comparable traffic-source mix, no checkout/tracking change mid-window, no stockout distorting either side. If the promo window was juiced by a paid-traffic push the baseline didn't have, the CVR delta is partly traffic, not offer → mark **FIX** on the comparison and caveat everything downstream.
2. **Measure the conversion-rate lift — and stop calling it the answer.** Compute promo CVR vs. baseline CVR. A lift is necessary but not sufficient. Treat it as the *headline you now have to disprove*, not the verdict.
3. **Check the AOV direction against the mechanic.** A **threshold** offer should *raise* AOV (people build baskets to hit it); a flat **% off** usually *lowers* effective AOV (same basket, less revenue). If AOV fell on a % off, the CVR lift is partly just cheaper orders, not more demand.
4. **Quantify cannibalisation.** What share of promo-window orders were full-price vs. discounted, and how does the full-price order *rate* compare to baseline? If discounted orders largely replaced full-price ones, you handed margin to buyers who'd have paid full freight.
5. **Interrogate customer quality.** Compare the promo cohort's 60-day repeat rate to a normal cohort. A discount-acquired cohort that repeats well is a genuine acquisition win; one that repeats materially below baseline is a one-time bargain-hunter haul dressed up as growth.
6. **Settle it on margin.** Compute contribution per order *after* discount and COGS, and total contribution for the window net of cannibalised full-price margin. A conversion win that's contribution-negative is a loss. **Conversion rate is not profit.**
7. **Apply the vetoes**, then assign status + owner + recheck date.

## The prompt to run

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

## Decision rules

- **KEEP / repeat the promo** — CVR lifted, AOV held or rose in line with the mechanic, the acquired cohort repeats at or near baseline, and contribution after discount and cannibalisation is positive. A clean, repeatable win.
- **REFRESH the mechanic** — the promo drove volume but the *shape* is wrong: e.g. a flat % off that crushed AOV and margin where a threshold or bundle would have lifted basket size. Keep promoting, change the offer structure.
- **WATCH** — the conversion and AOV read is in but the **customer-quality verdict is unresolved** because the promo cohort hasn't had ≥60 days to show repeat behaviour, or the sample of new customers is too small to trust. Directional only.
- **KILL / don't repeat** — CVR "lifted" but the cohort repeats well below baseline, AOV fell, or contribution after discount is negative once cannibalised full-price margin is subtracted. A hollow win.
- **FIX** — the two windows aren't comparable (unequal length, a paid-traffic surge on one side, a checkout/tracking change, a stockout, or discount-code reporting gaps) and no safe call can be made until the comparison is clean.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- **A conversion-rate lift is not a profit verdict.** Never call a promo a win on CVR or gross revenue alone — settle it on contribution after discount and COGS.
- **Never judge customer quality before the cohort matures.** Do not call a discount-acquired cohort "good customers" until you've watched their repeat rate over ≥60 days against a baseline cohort. Same-week repeat is not evidence.
- **Always account for cannibalised full-price sales.** Discount redemption by buyers who'd have paid full price is margin given away, not demand created — subtract it before claiming incremental contribution.
- **Confirm tracking and comparability across the window.** Do not trust the CVR delta if traffic mix differed, a checkout/tracking change landed mid-window, or discount-code reporting had gaps.
- **Do not attribute the lift to the offer alone** if a concurrent paid push, email blast, or seasonal spike also hit the window.
- **Do not recommend repeating, deepening, or writing any promo change** — codes, price edits, customer messages — without explicit human approval.

## Output

A short storefront-quality read, a two-window comparison table, the verdict, the confidence level, and the next action.

Minimum table columns:

| Dimension | Promo window | Baseline | Delta | Read |
|---|---|---|---|---|
| Conversion rate | 2.6% | 1.8% | +0.8pp | Lift is real but needs disproving |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/ecom-promo-effectiveness) — it executes this play read-only by default and applies changes only on your approval.
