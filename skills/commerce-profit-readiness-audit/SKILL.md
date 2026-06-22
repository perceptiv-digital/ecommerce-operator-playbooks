---
name: commerce-profit-readiness-audit
description: "When an ecommerce operator needs to decide: Do we have enough cost evidence to answer profit questions safely? Runs the Profit Readiness Audit play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Profit Readiness', 'Commerce', 'Trading Profit'."
license: CC-BY-4.0
metadata:
  persona: Founder / CEO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Profit Readiness Audit

**Operating question:** Do we have enough cost evidence to answer profit questions safely?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Product catalogue with COGS** — every active SKU, its unit cost, and its trailing revenue share. You need both **% of SKUs with COGS populated** and **% of revenue covered by costed SKUs**.
- **Order / revenue data** — orders by SKU for the window, so coverage can be revenue-weighted, not just counted.
- **Payment-processing fees** — actual fees charged by each processor over the window (or the contracted rate card if per-transaction data isn't exposed).
- **Ad spend completeness** — total spend per channel that ran, so you can confirm no spending channel is silently missing from the cost stack.

Optional, if available:

- **Shipping / fulfilment cost feed** — per-order shipping cost or 3PL/pick-pack invoice; usually the largest *missing* input.
- **Returns / refund data** — refund rate, refunded value, and whether returned goods re-enter sellable stock (recovered COGS) or are written off.
- **Duties, FX, and inbound freight** for cross-border or imported goods — quietly large on landed cost.
- **Subscription / transaction app fees, chargebacks, and gift-card breakage** — small individually, but they decide whether "net" is real net.

## How to decide — in order

1. **Measure COGS coverage by revenue, not by SKU count.** "COGS on 90% of SKUs" can still be unsafe if the missing 10% are your bestsellers. Compute **% of revenue covered**. ≥95% revenue-covered → gross margin SAFE; 80–95% → PARTIAL (answer as a range); <80% → UNSAFE.
2. **Name the gap, don't average over it.** List the specific SKUs / categories with no cost. "Missing COGS = new-arrivals category, 22% of revenue" is actionable; "78% coverage" is not.
3. **Walk the cost stack in profit order:** Revenue → COGS → **shipping/fulfilment** → **payment fees** → **ad spend** → **returns cost** = contribution profit. A profit question is only as safe as its *weakest* required input.
4. **Classify each profit question by the inputs it needs.** Gross margin needs only COGS. Contribution profit needs COGS + shipping + fees + returns. Channel net needs all of that *plus* complete, correctly-attributed ad spend. Mark each SAFE / PARTIAL / UNSAFE by its weakest input.
5. **For PARTIAL questions, derive the honest range,** don't pick a point. Bound it: best case assumes missing-cost SKUs carry your *highest* known margin, worst case your *lowest*. If the range still keeps the decision on the same side of zero, it's decision-grade; if it straddles zero, it's UNSAFE for that decision.
6. **Apply the vetoes**, then publish the scorecard with the named owner and date for each blocking gap.

## The prompt to run

```text
You are my ecommerce finance analyst running the "Profit Readiness Audit" play.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If a representative
sample of catalogue/order/cost data (COGS coverage and the cost-feed status) is missing,
STOP and return only (a) what's missing and (b) how to get it — never estimate it or proceed.

GOAL: do NOT compute my profit. Instead, tell me which profit questions I am currently
allowed to answer safely, given the cost evidence I have — and what is blocking the rest.

I will paste: COGS coverage (% of SKUs AND % of revenue, with the uncosted SKUs/categories
named), and the status of each cost feed — shipping/fulfilment, payment fees, ad spend per
channel, returns cost — marked Present / Partial / Missing with its source.

RULES:
- Weight COGS coverage by REVENUE, not SKU count. Missing cost on a bestseller is worse
  than missing it on 20 dead SKUs. Name the specific blocking SKUs/categories.
- Walk the stack in order: Revenue -> COGS -> shipping -> payment fees -> ad spend ->
  returns = contribution profit. A question is only as safe as its weakest required input.
- Classify each profit question SAFE (answer it), PARTIAL (answer only as a labelled range),
  or UNSAFE (refuse). Gross margin needs COGS; contribution needs COGS+shipping+fees+returns;
  channel net also needs complete ad spend.
- For PARTIAL, give the honest high/low range (missing-cost SKUs at my best vs worst known
  margin). Never collapse a range to a single number.
- Never state a profit number on partial cost data without labelling it partial and giving
  the range. Never fabricate a missing COGS, fee, or shipping cost.
- Every row carries a number, source, time window, and confidence level.

RETURN:
1. A 3-sentence executive read: what I can and cannot safely claim right now.
2. A readiness scorecard using EXACTLY this table header:

| Profit question | Inputs required | Inputs present | Verdict | Range if partial | Blocking gap |
|---|---|---|---|---|---|

   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns, and
   do not replace the table with prose.
3. The named SKUs / categories / feeds blocking the UNSAFE and PARTIAL answers.
4. The single highest-leverage gap to close first, with owner and ETA.
```

## Decision rules

- **SAFE (KEEP)** — every required input is Present and current; for gross margin specifically, ≥95% of revenue is COGS-covered. The question can be answered as a point number.
- **PARTIAL (WATCH)** — the question's inputs are 80–95% covered by revenue, or one secondary input (returns, fees) is estimated. Answer **only** as a labelled range, never a point.
- **UNSAFE (FIX)** — a required input is Missing, or revenue coverage is <80%, or the honest range straddles the decision threshold. Refuse the answer and name what's blocked.
- **REFRESH** — a feed exists but has gone stale or drifted (e.g. COGS not updated since the last cost increase, payment rate card out of date). The input is recoverable without new infrastructure.
- **KILL** — retire a profit metric you keep reporting that can never be sourced safely (e.g. "true net by SKU" when no per-order shipping will ever exist) rather than reporting it wrong each month.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- **Never state a profit number on partial cost data without labelling it partial and giving the range.** A point estimate over incomplete COGS is the single most damaging output of this play.
- Do **not** fabricate, interpolate, or category-average a missing COGS, fee, or shipping cost to "complete" the picture — a guessed cost is worse than a flagged gap.
- Do **not** report COGS coverage as a SKU-count percentage without the revenue-weighted percentage beside it.
- Do **not** let a downstream profit play (channel P&L, SKU cut, pricing) run on an input this audit marked UNSAFE.
- Do **not** collapse a PARTIAL range to its midpoint to make a slide look cleaner.
- Do **not** recommend writes, COGS backfills, feed changes, or catalogue edits without explicit human approval.

## Output

A readiness scorecard: each profit question, the inputs it requires, what's actually present, the SAFE/PARTIAL/UNSAFE verdict, and the named blockers. Plus a 3-sentence executive read.

Minimum table columns:

| Profit question | Inputs required | Inputs present | Verdict | Range if partial | Blocking gap |
|---|---|---|---|---|---|
| Gross margin (blended) | COGS coverage | 96% rev-covered | SAFE | — | None |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/commerce-profit-readiness-audit) — it executes this play read-only by default and applies changes only on your approval.
