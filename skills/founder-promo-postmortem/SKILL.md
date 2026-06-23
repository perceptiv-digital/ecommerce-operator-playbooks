---
name: founder-promo-postmortem
description: "When an ecommerce operator needs to decide: Did the promotion create incremental value or just pull forward demand? Runs the Promo Post-Mortem play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Promo Post-Mortem', 'Commerce', 'Trading Profit'."
license: CC-BY-4.0
metadata:
  persona: Founder / CEO
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Promo Post-Mortem

**Operating question:** Did the promotion create incremental value or just pull forward demand?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Promo definition** — start/end dates, discount mechanic (% off, code, BOGO, free-shipping threshold), and which products/collections were eligible.
- **Daily orders, units, and revenue** for: the **promo window**, the **4 weeks immediately before** (baseline), and the **2–3 weeks immediately after** (trough window).
- **Counterfactual baseline** — same calendar period **last year**, or a trailing non-promo run-rate, to net out seasonality and underlying growth.
- **New vs. returning split** per order across all three windows, plus discount-code usage flag.
- **COGS / contribution margin** per unit, and the **discount value** actually given away (not list price).
- **Returns / refunds** on promo-window orders — discounted units come back at a higher rate and must be netted out.

Optional, if available:

- **Repeat-purchase cohort** — did promo-acquired *new* customers place a second order in the following 30–60 days? This is what separates "bought a discount" from "bought a customer."
- **Paid-media spend in the window** — a promo amplified by extra ad spend isn't a clean read of the offer itself.
- **Inventory / stock cover** — a sell-through that emptied a hero SKU borrows from future full-price weeks.
- **Full-price sell-through of the same SKUs** in the baseline — tells you how many discounted units would have sold anyway.
- **Email/SMS send volume** behind the promo — distinguishes offer pull from list-fatigue.

## How to decide — in order

1. **Establish the counterfactual first.** Before looking at uplift, fix the baseline: trailing 4-week run-rate *and* same-period-last-year. **Gross uplift means nothing until you have a number to be incremental *against*.** If you can't build a credible baseline, the play is **FIX**, not a verdict.
2. **Measure gross uplift.** Promo-window revenue and units vs. baseline. Note it — but treat it as the *claim to be disproven*, not the answer.
3. **Net the post-promo trough (pull-forward).** Compare the 2–3 weeks after the promo to the baseline. A dip here is demand you *borrowed*, not created. **Incremental units = (promo-window uplift) − (post-promo shortfall).** If the trough erases most of the uplift, the promo moved timing, not volume.
4. **Charge the margin given away.** For every discounted unit that would have sold at full price (use baseline full-price sell-through to estimate this share), the discount is a **pure margin transfer**, not a cost of acquisition. Subtract it.
5. **Split new vs. returning.** If the discount mostly hit **returning/loyal** customers, you re-priced orders that were already loyal — the worst kind of margin leak. A high *new*-customer share is the only thing that can justify a thin promo margin (you may be buying LTV).
6. **Net returns on discounted units**, then compute **contribution profit after discount and refunds**.
7. **Land the verdict** — incremental / break-even / margin-dilutive — apply the vetoes, and assign owner + recheck (the repeat-cohort check 30–60 days out).

## The prompt to run

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

## Decision rules

- **KILL (don't repeat this offer)** — net incremental units are near zero or negative after the trough, and contribution after discount + refunds is below your margin floor. The promo re-priced existing demand.
- **REFRESH (re-shape, don't retire)** — the offer drove real incremental *new* customers but margin was too thin; fix the mechanic (shallower discount, threshold, bundle, exclude loyal base) and re-run.
- **WATCH** — directional only: window too fresh to see the full trough, or the repeat-cohort read on promo-acquired customers isn't in yet (re-pull at 30–60 days).
- **KEEP (repeat as-is)** — net incremental contribution is clearly positive after the trough, margin, and refunds, **and** new-customer share justifies the spend.
- **FIX** — no credible baseline/counterfactual, missing COGS or discount values, or paid spend so entangled the offer can't be isolated.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- **Gross uplift is not incrementality.** Never sign off a promo on revenue or order-count uplift alone — the post-promo trough must be netted first.
- **Always net the post-promo trough.** A window cut off at the promo's end date will always overstate the win.
- **Discounting to loyal / returning buyers destroys margin.** A promo that mostly hit the returning base re-priced demand you already owned; flag it, never call it a win.
- **Account for returns on discounted units.** Discounted and impulse orders refund at a higher rate; unrefunded "revenue" is not contribution.
- **No profit claim without COGS and the real discount value** — list-price math hides the margin you actually gave away.
- **Don't claim causality from one window.** Same-period-last-year or a trailing baseline is mandatory; a single spike is not proof.
- **No writes** — calendar changes, flow edits, or repeat-promo scheduling — without explicit human approval.

## Output

A trading verdict (incremental / break-even / margin-dilutive), a windowed metric table, the contribution-profit walk, the main driver, a confidence level, and the next action with owner and recheck date.

Minimum table columns:

| Metric | Baseline (run-rate / LY) | Promo window | Post-promo window | Net incremental | Confidence |
|---|---|---|---|---|---|
| Example row | Source + number + window | number | number | number | High / Med / Low |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
