---
schema_version: 1
slug: "commerce-profit-readiness-audit"
title: "Profit Readiness Audit"
summary: "Profit Readiness Audit helps ecommerce operators answer: Do we have enough cost evidence to answer profit questions safely?"
operating_question: "Do we have enough cost evidence to answer profit questions safely?"
short_title: "Profit Readiness"
primary_persona: "founder"
personas: ["founder"]
category: "trading-profit"
platforms: ["commerce"]
cadence: "monthly"
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/commerce-profit-readiness-audit"
shopmcp_prompt: "Run the Profit Readiness Audit play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Profit Readiness Audit

## Operating Question

**Do we have the cost evidence to answer profit questions safely — and which profit questions are we currently allowed to answer at all?**

This is the meta-play that gates every other profit claim in the business. Before anyone says "we made money last month," "Meta is profitable," or "this SKU should be cut," there has to be enough cost data underneath the revenue to make that statement true rather than confident-sounding. This audit does not tell you your profit. It tells you whether you are *entitled to a profit answer yet* — and labels each profit question **SAFE** (answer it), **PARTIAL** (answer it only as a labelled range), or **UNSAFE** (refuse until the missing cost input lands). The deliverable is a readiness scorecard plus the named SKUs, categories, and cost feeds blocking the confident answers.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant will happily compute "profit" from whatever you paste — and that is the trap. If you hand it revenue and ad spend but no COGS, it will quietly treat COGS as zero and hand back a gross-margin number dressed up as net profit. It cannot see that your 40 newest SKUs have no cost populated, that you have no shipping-cost feed, or that payment fees were never loaded. To run this honestly you have to:

1. Pull the product catalogue and measure **COGS coverage two ways** — percent of active SKUs with a cost, *and* percent of revenue those costed SKUs represent (the second matters far more).
2. Confirm whether **shipping/fulfilment cost** exists as a feed or is just a guess.
3. Confirm **payment-processing fees** are loaded (Shopify Payments, Stripe, PayPal, Klarna all differ).
4. Confirm **ad spend is complete** across every channel that actually spent, not just the one you look at.
5. Confirm **returns cost** (refunded revenue *and* the cost of goods you don't get back) is captured.

**The reasoning here is free. The evidence assembly is the entire job — and that is exactly what ShopMCP connects.** Without a live line into your store, catalogue, and finance data, this audit is a manual reconciliation every month.

## Who Should Run It

- **Primary owner:** Founder / CEO — you are the one who gets asked "are we profitable?" in a board update.
- **Also useful for:** Head of Finance / fractional CFO (owns the cost feeds), Head of Ops (owns COGS and fulfilment data), Performance lead (whose ROAS claims this gates).
- Run it **before** any meeting where a profit number will be quoted, before cutting a SKU on "margin," and before you let a ROAS or MER claim drive budget.

## When To Run It

- **Cadence:** monthly — run it on the same day you close the prior month, before anyone reports the month.
- **Triggers:** a product launch or range expansion (new SKUs almost always ship with no COGS), a switch of payment provider or 3PL, a fundraise / due-diligence request, or the first time someone asks for "true net margin by channel."
- **Pre-requisite:** none — this is the play that runs *first*. Every downstream profit play (channel P&L, SKU rationalisation, contribution-margin pricing) should refuse to run until this audit says its inputs are SAFE.

## Required Evidence

- **Product catalogue with COGS** — every active SKU, its unit cost, and its trailing revenue share. You need both **% of SKUs with COGS populated** and **% of revenue covered by costed SKUs**.
- **Order / revenue data** — orders by SKU for the window, so coverage can be revenue-weighted, not just counted.
- **Payment-processing fees** — actual fees charged by each processor over the window (or the contracted rate card if per-transaction data isn't exposed).
- **Ad spend completeness** — total spend per channel that ran, so you can confirm no spending channel is silently missing from the cost stack.

## Optional Evidence

- **Shipping / fulfilment cost feed** — per-order shipping cost or 3PL/pick-pack invoice; usually the largest *missing* input.
- **Returns / refund data** — refund rate, refunded value, and whether returned goods re-enter sellable stock (recovered COGS) or are written off.
- **Duties, FX, and inbound freight** for cross-border or imported goods — quietly large on landed cost.
- **Subscription / transaction app fees, chargebacks, and gift-card breakage** — small individually, but they decide whether "net" is real net.

## The Decision Logic (run in this order)

1. **Measure COGS coverage by revenue, not by SKU count.** "COGS on 90% of SKUs" can still be unsafe if the missing 10% are your bestsellers. Compute **% of revenue covered**. ≥95% revenue-covered → gross margin SAFE; 80–95% → PARTIAL (answer as a range); <80% → UNSAFE.
2. **Name the gap, don't average over it.** List the specific SKUs / categories with no cost. "Missing COGS = new-arrivals category, 22% of revenue" is actionable; "78% coverage" is not.
3. **Walk the cost stack in profit order:** Revenue → COGS → **shipping/fulfilment** → **payment fees** → **ad spend** → **returns cost** = contribution profit. A profit question is only as safe as its *weakest* required input.
4. **Classify each profit question by the inputs it needs.** Gross margin needs only COGS. Contribution profit needs COGS + shipping + fees + returns. Channel net needs all of that *plus* complete, correctly-attributed ad spend. Mark each SAFE / PARTIAL / UNSAFE by its weakest input.
5. **For PARTIAL questions, derive the honest range,** don't pick a point. Bound it: best case assumes missing-cost SKUs carry your *highest* known margin, worst case your *lowest*. If the range still keeps the decision on the same side of zero, it's decision-grade; if it straddles zero, it's UNSAFE for that decision.
6. **Apply the vetoes**, then publish the scorecard with the named owner and date for each blocking gap.

## Manual Workflow

1. Export the active product catalogue with unit cost, and orders-by-SKU for the window. Join them to compute COGS coverage **by revenue**, and list every uncosted SKU with its revenue share.
2. Check each cost feed exists and is current: shipping/fulfilment, payment fees, ad spend per channel, returns cost. Mark each Present / Partial / Missing with its source.
3. Build the cost stack and tag each profit question (gross margin, contribution profit, true net, channel net) by its weakest input.
4. Paste the prompt below with your coverage numbers and feed status.
5. For every PARTIAL question, compute the honest high/low range before letting anyone quote it.
6. Convert the result into a scorecard: which questions are SAFE / PARTIAL / UNSAFE, which SKUs/feeds block the rest, owner and date to close each gap.

## Copy-Paste Prompt

```text
You are my ecommerce finance analyst running the "Profit Readiness Audit" play.

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
2. A readiness scorecard: Profit question | Inputs required | Inputs present | Verdict
   (SAFE/PARTIAL/UNSAFE) | Range if partial.
3. The named SKUs / categories / feeds blocking the UNSAFE and PARTIAL answers.
4. The single highest-leverage gap to close first, with owner and ETA.
```

## Decision Rules

- **SAFE (KEEP)** — every required input is Present and current; for gross margin specifically, ≥95% of revenue is COGS-covered. The question can be answered as a point number.
- **PARTIAL (WATCH)** — the question's inputs are 80–95% covered by revenue, or one secondary input (returns, fees) is estimated. Answer **only** as a labelled range, never a point.
- **UNSAFE (FIX)** — a required input is Missing, or revenue coverage is <80%, or the honest range straddles the decision threshold. Refuse the answer and name what's blocked.
- **REFRESH** — a feed exists but has gone stale or drifted (e.g. COGS not updated since the last cost increase, payment rate card out of date). The input is recoverable without new infrastructure.
- **KILL** — retire a profit metric you keep reporting that can never be sourced safely (e.g. "true net by SKU" when no per-order shipping will ever exist) rather than reporting it wrong each month.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- **Never state a profit number on partial cost data without labelling it partial and giving the range.** A point estimate over incomplete COGS is the single most damaging output of this play.
- Do **not** fabricate, interpolate, or category-average a missing COGS, fee, or shipping cost to "complete" the picture — a guessed cost is worse than a flagged gap.
- Do **not** report COGS coverage as a SKU-count percentage without the revenue-weighted percentage beside it.
- Do **not** let a downstream profit play (channel P&L, SKU cut, pricing) run on an input this audit marked UNSAFE.
- Do **not** collapse a PARTIAL range to its midpoint to make a slide look cleaner.
- Do **not** recommend writes, COGS backfills, feed changes, or catalogue edits without explicit human approval.

## Output Contract

A readiness scorecard: each profit question, the inputs it requires, what's actually present, the SAFE/PARTIAL/UNSAFE verdict, and the named blockers. Plus a 3-sentence executive read.

Minimum table columns:

| Profit question | Inputs required | Inputs present | Verdict | Range if partial | Blocking gap |
|---|---|---|---|---|---|
| Gross margin (blended) | COGS coverage | 96% rev-covered | SAFE | — | None |

## Worked Example

> **Executive read:** Gross margin is reliable and can be reported as a point number — COGS covers 78% of SKUs but, more importantly, **91% of revenue**. Contribution profit is answerable only as a **range (28–34%)** because there is no shipping-cost feed and the uncosted SKUs are all new arrivals worth 22% of revenue. True net margin is **UNSAFE** to quote this month — close the shipping feed and backfill new-arrival COGS and it becomes answerable.

| Profit question | Inputs required | Inputs present | Verdict | Range if partial | Blocking gap |
|---|---|---|---|---|---|
| Gross margin (blended) | COGS | COGS on 78% of SKUs / **91% of revenue** | **SAFE** | — | New-arrivals COGS (won't move blended materially) |
| Gross margin — New Arrivals category | COGS | 0% costed | **UNSAFE** | — | 41 new SKUs, no unit cost loaded |
| Contribution profit (blended) | COGS + shipping + fees + returns | COGS ok, fees ok, no shipping feed, returns estimated | **PARTIAL** | **28–34%** | No per-order shipping cost; returns cost estimated |
| True net margin (blended) | All of the above, sourced | Shipping missing, 22% of revenue uncosted | **UNSAFE** | — | Shipping feed + new-arrival COGS |
| Channel net — Meta | Contribution inputs + complete ad spend | Ad spend complete, contribution only PARTIAL | **PARTIAL** | inherits 28–34% | Same shipping/COGS gap, not an ads gap |

Note how the answer refuses to average: gross margin is *safe despite* 22% of SKUs being uncosted, because those SKUs are only 9% of revenue — and true net is *unsafe despite* fees and ad spend being perfect, because one missing feed poisons the whole stack.

## Common Failure Modes

- Reporting "COGS on 78% of SKUs" as if it equalled 78% of *revenue* covered — the two diverge most exactly when new bestsellers are uncosted.
- Letting the AI silently treat missing COGS as zero and calling the result "net profit."
- Quoting contribution profit as a single number when shipping or returns cost is missing.
- Backfilling a missing cost with a category average to avoid an awkward gap, then forgetting it was a guess.
- Running a channel-profitability or SKU-cut play on top of an input this audit already marked UNSAFE.

## Run This Play With Live Data

**Manual version:** export the catalogue and orders, join them to compute revenue-weighted COGS coverage, hunt down every cost feed's status, build the stack, and bound each partial answer — every month, by hand.

**ShopMCP version:** connect your store and finance sources once. Ask the question; ShopMCP pulls the live catalogue and order data, computes COGS coverage **by revenue** (not just SKU count), checks each cost feed's presence and freshness, and returns the SAFE / PARTIAL / UNSAFE scorecard with the blocking SKUs and feeds named. It stays **read-only** — it never backfills a cost or edits the catalogue without your explicit approval.

> No live line into your store, catalogue, and finance data inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* that connection — the same audit then runs in one prompt instead of a month-end reconciliation.

Example ShopMCP prompt:

```text
Run the Profit Readiness Audit play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/commerce-profit-readiness-audit?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manually joining the catalogue to orders to get revenue-weighted COGS coverage.
- Chasing down whether each cost feed (shipping, fees, returns) is present and current.
- Guessing — and the temptation to backfill a missing cost with an average.
- Rebuilding the same month-end readiness reconciliation every cycle.
