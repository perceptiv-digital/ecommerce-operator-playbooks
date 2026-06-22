---
name: merch-least-profitable-products
description: "When an ecommerce operator needs to decide: Which products create the weakest known profit? Runs the Least Profitable Products play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Least Profitable Products', 'Commerce', 'Merchandising Feed'."
license: CC-BY-4.0
metadata:
  persona: Merchandising Manager
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Least Profitable Products

**Operating question:** Which products create the weakest known profit?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Orders by SKU (net of returns)** — units sold, gross revenue, and units/value refunded, last 90 days (use 30 days only for high-velocity SKUs; slow movers need the longer window for a stable return rate).
- **COGS per SKU** — current landed cost (unit cost + inbound freight + duties). Flag any SKU where COGS is stale or missing — that SKU is **FIX**, not KILL.
- **Returns** — return rate per SKU and the loaded cost per return (return shipping + restocking/refurb labour + the write-off rate on units that can't be resold).
- **Variable cost to serve** — payment-processing rate (e.g. 2.9% + $0.30), per-order fulfillment/pick-pack cost, and any directly attributable ad spend per SKU.
- **List price and realized price** — headline price *and* the average discount actually applied (coupons, automatic discounts, markdowns), so you can separate list margin from realized margin.

Optional, if available:

- **Attach rate / basket role** — how often a SKU appears alongside others and whether it pulls AOV up. This is what exempts a deliberate loss-leader from a KILL.
- **Inventory on hand and age** — a deep-discount-dependent SKU may be aged stock being cleared, not a structural loser.
- **Promotion calendar** — flags whether the discount on a SKU is a permanent crutch or a one-off campaign distorting the window.
- **Seasonality / clearance status** — end-of-season clearance compresses margin by design and must not be read as a structural failure.
- **Competitor price band** — tells you whether a reprice is even feasible before you recommend one.

## How to decide — in order

1. **Gate on cost coverage.** Any SKU with missing or stale COGS, or with returns not attributable to it, is **FIX** — label it *partial profit* and exclude it from KILL decisions. You cannot delist on a margin you can't compute.
2. **Compute real per-unit contribution.** `unit contribution = realized price − COGS − (return rate × loaded return cost) − payment fee − per-order fulfillment − attributable ad cost`. Rank ascending. The most negative SKUs surface first.
3. **Separate the two ways a SKU goes negative.** A *thin-gross-margin* SKU (e.g. 8% gross) and a *high-return* SKU are different diseases. A 30%-gross SKU with a 22% return rate and a 9% write-off can be a bigger contribution loser than an 8%-gross SKU that never comes back. **Returns are the silent killer — always rank by contribution-after-returns, never by gross margin.**
4. **Test discount dependence.** For each weak SKU, compare realized price to list. If contribution is only negative *because* of a standing discount, the lever is repricing/removing the coupon, not delisting — provided volume survives the price move.
5. **Check the basket role before any KILL.** Pull attach rate and AOV lift. A contribution-negative SKU that reliably drags a profitable basket is a strategic loss-leader → **KEEP (exempt)**, not KILL. A contribution-negative SKU bought in isolation is a true drain.
6. **Assign the lever, then apply the vetoes.** Map each survivor to reprice / renegotiate COGS / bundle / delist, attach owner and recheck date, then pressure-test against the veto list before anything is actioned.

## The prompt to run

```text
You are my merchandising-margin analyst running the "Least Profitable Products" play.

GOAL: rank my SKUs by REAL per-unit contribution and decide, per SKU, whether to
reprice, renegotiate COGS, bundle, delist (KILL), REFRESH, WATCH, KEEP, or FIX.

Per-unit contribution = realized price - COGS - (return rate x loaded return cost)
  - payment fee - per-order fulfillment - attributable ad cost.

I will paste: orders by SKU (net of returns), COGS per SKU, return rate and loaded
return cost, payment/fulfillment/ad cost, and list vs realized price. Some data may
be missing.

RULES:
- Cost-coverage gate first: any SKU with missing/stale COGS or non-attributable
  returns is FIX and labelled "partial profit" - never KILL it.
- Rank by contribution AFTER returns and fees, never by gross margin. Call out any
  SKU that looks fine on gross margin but is contribution-negative once returns count.
- Separate "thin gross margin" from "high return rate" as distinct causes.
- For each negative SKU, state whether it is negative only because of a standing
  discount (lever = reprice) vs structurally negative (lever = renegotiate/bundle/delist).
- Before recommending KILL, check attach rate / basket role. Exempt a genuine
  loss-leader (KEEP-exempt) and say what AOV/attach evidence justifies the exemption.
- Flag seasonal/clearance SKUs - do not read deliberate markdown as structural loss.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 2-3 sentence executive read.
2. A ranked table: SKU | Net units (90d) | Gross margin % | Return rate | Real unit
   contribution | Discount-dependent? | Basket role | Lever | Status | Owner | Recheck.
3. Vetoes/caveats that downgraded or exempted any recommendation.
4. What evidence is blocked and what you'd need to upgrade a FIX/WATCH to a decision.
```

## Decision rules

- **KILL (delist)** — structurally contribution-negative at realized price *and* at list (so a reprice can't save it), volume too low to matter, no basket role, full COGS coverage, and no seasonal/clearance veto.
- **REFRESH** — contribution is weak or negative but a credible lever exists: reprice off a standing discount, renegotiate COGS with the supplier, rework the listing to cut a return-driving fit/expectation gap, or bundle to lift attach.
- **WATCH** — directional only: short window, an unstable return rate (too few returns to trust), or a window polluted by a promo/clearance event.
- **KEEP** — contribution-positive inside the target band, *or* a deliberate loss-leader whose attach/AOV evidence justifies the loss (KEEP-exempt).
- **FIX** — missing/stale COGS, returns not attributable to the SKU, or realized-price data too messy to compute contribution. Label *partial profit*.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** make a profit claim — or a KILL — without COGS coverage. Missing cost = **FIX / partial profit**, never a delist.
- Do **not** rank or decide on gross margin alone. A low gross margin paired with a high return rate is the real killer, and gross margin hides it.
- Do **not** delist a loss-leader before checking attach rate and basket role — some negative-contribution SKUs are deliberately subsidising a profitable basket.
- Do **not** treat a seasonal-clearance or aged-stock markdown as a structural loss; a deliberate end-of-life discount distorts a single snapshot.
- Do **not** KILL on an unstable return rate (too few return events to trust) — WATCH until the sample is large enough.
- Do **not** reprice, delist, edit the catalog, or change discounts without an explicit human approval step.

## Output

A SKU table ranked by **real per-unit contribution** (ascending — worst first), one decision per row:

| SKU | Net units (90d) | Gross margin % | Return rate | Real unit contribution | Discount-dependent? | Basket role | Lever | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Example SKU | 410 | 31% | 8% | +$4.20 | No | Standalone | none | KEEP | Merch | 30 days |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/merch-least-profitable-products) — it executes this play read-only by default and applies changes only on your approval.
