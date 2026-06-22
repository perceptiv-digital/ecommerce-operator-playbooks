---
schema_version: 1
slug: "merch-stockout-priority"
title: "Stockout Priority List"
summary: "Stockout Priority List helps ecommerce operators answer: Which stockouts create the most commercial risk?"
operating_question: "Which stockouts create the most commercial risk?"
short_title: "Stockout Priority"
primary_persona: "merchandising"
personas: ["merchandising", "operations"]
category: "merchandising-feed"
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/merch-stockout-priority"
shopmcp_prompt: "Run the Stockout Priority List play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Stockout Priority List

## Operating Question

**Which at-risk SKUs do I reorder or expedite *today* — before they sell through — ranked by the commercial damage of letting them go dark?**

This is a **prevention** play, not a post-mortem. A separate play measures the dollars you already lost to items that are out of stock right now; this one runs *upstream* of that, while there are still units on the shelf. Every morning some of your sellable inventory is on a collision course: a fast mover whose days-of-cover has dropped below its supplier lead time will run out before any replenishment can land, and no amount of measuring the gap afterward buys those sales back. The job here is to rank the few SKUs where ordering today prevents a stockout, weight them by how much money the gap would cost, and flag the ones with live ad spend pointed at them — because running out mid-campaign burns acquisition budget on a Sold Out button. The output is a dollar-ranked **reorder/expedite priority list**, not a stock report.

## Why You Can't Just Ask ChatGPT This

A bare AI assistant can do the days-of-cover arithmetic, but it cannot see your live inventory, your sell-through, your supplier lead times, or which products your ads are currently driving traffic to. To run this for real you have to:

1. Pull the **current on-hand / sellable quantity** per SKU and variant from Shopify/Woo/BigCommerce — the *numerator* of days-of-cover.
2. Compute a **recent daily sell rate** per SKU from order history over a clean window — the *denominator* — and decide whether that rate is stable enough to trust.
3. Attach **supplier lead time and MOQ** per SKU from your purchasing records or a buying sheet (ad platforms and your store don't hold this; it usually lives in a spreadsheet or your ops tool).
4. Bolt on **contribution margin per unit**, because a SKU that runs dry isn't equally painful at 15% margin and 65% margin.
5. Cross-check **active ad spend by destination product**, so you catch winners you're paying to send shoppers toward right as they're about to sell out.

**The forecasting logic is free; the five live joins are the work — and that is exactly what ShopMCP wires together.** If your assistant has no live line into your store, your buying data, and your ad accounts, that missing connection is where every manual run stalls. The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Merchandising Manager
- **Also useful for:** Inventory / Demand Planner (sizes the PO), Ops / Dispatch Lead (decides air-freight vs. sea on an expedite), Performance Marketer (pauses or redirects spend pointed at a SKU about to go dark)
- Run it **before** the daily replenishment check or the weekly buy meeting, so the order list is dollar-ranked by stockout risk, not buyer gut feel.

## When To Run It

- **Cadence:** daily — replenishment is a flow problem; a hero SKU that crosses below its lead-time threshold on Monday and gets noticed on Friday has already lost four days off the reorder clock.
- **Triggers:** a velocity spike draining cover faster than planned, a supplier lead-time extension, a peak-season ramp, a campaign about to scale spend behind a thin-stock SKU, or a buy meeting that needs a priority order.
- **Pre-requisite:** confirm the **inventory feed is fresh** (synced within the last few hours) and that on-hand means truly *sellable* (not held, allocated, or in-transit-but-uncounted). A stale or misread quantity poisons every days-of-cover number downstream.

## Required Evidence

- **Commerce inventory** — current on-hand / sellable quantity per SKU and variant. This is the numerator of days-of-cover.
- **Commerce order history** — units sold per SKU over a **clean recent window** (typically the trailing 14–28 days), used to derive a daily sell rate. Exclude any days the SKU was already out of stock so the rate reflects real demand, not the gap.
- **Supplier lead time per SKU** — calendar days from placing a PO to receiving sellable stock. This is the threshold days-of-cover is measured against.
- **Safety buffer / reorder point policy** — the extra days of cover you keep on top of lead time to absorb demand variance and inbound delays.
- **Contribution margin per unit** — selling price minus COGS minus variable fulfilment, per SKU or a category default. Used to weight which at-risk SKUs matter most.

## Optional Evidence

- **MOQ and case-pack constraints** — the minimum you can actually order, which can make a "tiny reorder" impossible or force over-ordering.
- **Active ad spend by destination product** — campaigns/ad sets currently routing paid traffic to a SKU approaching stockout (running out mid-flight wastes that spend).
- **Inbound POs already in transit** — quantity and ETA, so you don't double-order something already on the water.
- **Demand shape** — seasonality, promo calendar, and day-of-week pattern, so a weekend velocity spike isn't read as a permanent run-rate.
- **Planned discontinuation / end-of-life flags** — a SKU you're sunsetting should *not* be reordered no matter how fast it's selling.

## How To Pull This Evidence

- **Shopify inventory on-hand** — in Shopify admin, **Products → Inventory** (or **Inventory** report), export the CSV and read the *Available* column per variant location; this is sellable on-hand, not the *On hand* column that still counts committed/allocated units. Roll up across locations if you fulfil from more than one.
- **Sell-through rate** — pull **Analytics → Reports → Sales by product variant** (or the orders export) for a clean trailing window, sum units sold per SKU, and divide by the number of *in-stock* days in that window. Exclude any day the variant was out of stock so the denominator reflects real demand, not the gap.
- **Margin** — selling price minus landed COGS minus variable fulfilment per unit. Shopify stores cost in the variant **Cost per item** field (export it from the products CSV); if it's blank, pull COGS from your buying sheet or supplier invoices rather than guessing.
- **Active ad spend per SKU** — in Meta Ads Manager / Google Ads, filter to live campaigns and read spend by the destination product URL or catalog item, then map that landing URL back to the SKU. Only count spend currently pointed at the SKU, not lifetime spend.
- **Supplier lead time** — calendar days from placing a PO to receiving sellable stock; this lives in your purchasing tool or buying sheet, not in Shopify or the ad platforms. Use the supplier's quoted lead time plus your typical receiving lag, not a best case.
- **Erratic-demand gotcha** — if a SKU's daily sales are spiky, seasonal, or driven by a one-off viral day, a short window will over- or under-state the run rate. Widen the window (e.g. 28→56 days), use a conservative rate, and lower the confidence level before trusting the days-of-cover number.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Confirm the inventory is real.** Feed fresh, quantity truly sellable, no held/allocated units inflating it. If on-hand is stale or ambiguous, mark the SKU **FIX** and stop — never schedule a reorder off a number you don't trust.
2. **Compute days-of-cover.** `days of cover = on-hand units ÷ recent daily sell rate`. Qualify the sell rate first: if demand is erratic, spiky, or seasonal, widen the window (e.g. 28→56 days), use a conservative rate, and drop the confidence level — a single viral weekend is not a run-rate.
3. **Compare cover to the runway.** A SKU is **urgent** when `days of cover < supplier lead time + safety buffer` — it will sell out before a normal PO can land. A SKU inside its reorder window (cover above the threshold but approaching it) is a routine PO, not an expedite.
4. **Weight by commercial value.** Rank the urgent set by `daily sell rate × contribution margin/unit` — the contribution-per-day you bleed once it goes dark. A fast, high-margin hero outranks a fast, thin-margin commodity even at the same days-of-cover.
5. **Overlay active acquisition.** Flag any urgent SKU with live ad spend pointed at it. Running out mid-campaign means you keep paying for clicks into a Sold Out page — that escalates the SKU and, separately, demands a spend decision (pause or redirect) independent of the reorder.
6. **Choose the action, then apply the vetoes.** Cover far below the runway on a valuable SKU → **expedite** (air-freight / rush PO). Inside the reorder window → standard PO. Then check MOQ, cash, discontinuation, and demand-confidence vetoes before committing, and attach owner + recheck.

## Manual Workflow

1. Export the current inventory snapshot; pull on-hand / sellable quantity per SKU and variant, and confirm the feed is fresh.
2. Pull order history and compute each SKU's recent daily sell rate over a clean window, with any out-of-stock days excluded from the denominator.
3. Compute `days of cover = on-hand ÷ daily sell rate` per SKU.
4. Join supplier lead time, safety buffer, MOQ, margin per unit, in-transit POs, and active ad spend by destination product onto each row.
5. Flag every SKU where `days of cover < lead time + safety buffer`; rank that set by `sell rate × margin/unit`.
6. Paste the prompt below with your table; pressure-test each reorder/expedite against the vetoes; convert survivors into an action packet with owner, order quantity, and recheck date.

## Copy-Paste Prompt

```text
You are my inventory and merchandising analyst running the "Stockout Priority List" play.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If per-SKU on-hand units,
recent daily sell rate, or supplier lead time is missing for a SKU, STOP and return only
(a) what's missing and (b) how to get it — never estimate it or proceed. Days-of-cover vs. lead
time is the entire play, so a guessed on-hand count, sell rate, or lead time silently fabricates
the answer.

GOAL: rank my at-risk SKUs by how urgently I should REORDER or EXPEDITE them BEFORE they
sell through, weighted by the contribution profit at risk if they go dark. This is
prevention, not a post-stockout loss report.

I will paste: current on-hand quantity per SKU/variant, a recent daily sell rate (units/day,
with any out-of-stock days excluded), supplier lead time, my safety-buffer policy,
contribution margin per unit, MOQ/case-pack, in-transit POs with ETAs, and which SKUs have
active ad spend pointed at them. Some fields may be missing.

RULES:
- Days of cover = on-hand units / recent daily sell rate. A SKU is URGENT when
  days of cover < supplier lead time + safety buffer (it sells out before a normal PO lands).
- Rank the urgent set by daily sell rate x contribution margin/unit (contribution bled per day
  out of stock), not by units, not by raw days of cover.
- For erratic / spiky / seasonal demand, widen the window, use a conservative sell rate, and
  lower the confidence level. Do not treat one viral weekend as a run-rate.
- Flag any urgent SKU with active ad spend pointed at it: running out mid-campaign wastes that
  spend, and is a separate pause/redirect decision from the reorder.
- Respect MOQ and lead-time reality: if the minimum order or rush option doesn't fit, say so.
- Do NOT recommend reordering a SKU flagged for discontinuation/end-of-life.
- Do NOT over-order into excess cash tied up in stock just to feel safe; size to demand + buffer.
- If the on-hand number is stale or ambiguous, mark FIX and do not schedule a reorder on it.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read (how many SKUs need action today + the top expedite).
2. A ranked table using exactly this header row:
   | SKU | On-hand | Sell rate/day | Days of cover | Lead time + buffer | Margin/unit | Contribution/day at risk | Active ad spend? | Action | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any row.
4. What evidence is blocked and what would upgrade a WATCH/FIX to a confident reorder.
```

## Decision Rules

- **REFRESH (expedite now)** — days of cover is well below `lead time + safety buffer` on a high-value SKU (strong sell rate × margin), so a standard PO can't land in time → air-freight, rush order, or substitute. Active ad spend pointed at it raises the priority further.
- **KEEP (standard PO)** — the SKU is inside its reorder window: cover is approaching the threshold but a normal-lead-time PO placed now still lands before stockout. Order at the normal quantity; no expedite premium needed.
- **WATCH** — directional only: demand is erratic, spiky, or seasonal so days-of-cover isn't trustworthy yet, the SKU is low-velocity, or an in-transit PO may already cover the gap. Widen the window and recheck.
- **KILL** — a SKU flagged for planned discontinuation or end-of-life: do not reorder however fast it's selling; let it run down and reallocate the shelf and budget.
- **FIX** — the on-hand number is stale/ambiguous, the sell rate can't be cleaned, or lead-time/MOQ data is missing, so no safe reorder size can be set.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do **not** trust days-of-cover built on an erratic or seasonal sell rate — widen the window and lower confidence before acting.
- Do **not** ignore MOQ and case-pack: a reorder you can't actually place at the supplier's minimum isn't an action.
- Do **not** over-order to feel safe — excess stock ties up cash and creates the dead-stock problem you'll be writing down next quarter.
- Do **not** reorder a SKU flagged for discontinuation, no matter how short its cover.
- Do **not** double-order a SKU that already has an inbound PO landing before the cover runs out.
- Do **not** place a PO, expedite a shipment, or pause/redirect ad spend without explicit human approval.

## Output Contract

A SKU-level table ranked by **contribution-per-day at risk**, with a reorder/expedite action and evidence per row:

| SKU | On-hand | Sell rate/day | Days of cover | Lead time + buffer | Margin/unit | Contribution/day at risk | Active ad spend? | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Example variant | 45 | 15/day | 3.0 | 14 + 3 | $22 | $330 | Yes | REFRESH (expedite) | Merch + Ops | 24h |

## Worked Example

> **Executive read:** Two SKUs need action today; one is a true emergency. The *Aurora Diffuser — White* has only **3 days of cover** against a 14-day lead time while selling 15/day at $22 margin (~$330 of contribution bled per day out of stock) and an active prospecting campaign is still driving traffic to it — air-freight a bridge order and pause or redirect that spend. The *Glow Serum 30ml* is inside its reorder window and just needs a normal PO; the slow-moving *Travel Candle Tin* and the discontinued *Linen Spray* are noise and should not consume a rush order.

| SKU | On-hand | Sell rate/day | Days of cover | Lead time + buffer | Margin/unit | Contribution/day at risk | Active ad spend? | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Aurora Diffuser — White | 45 | 15/day | 3.0 | 14 + 3 | $22 | **$330** | Yes (prospecting) | **REFRESH (expedite)** | Merch + Ops | 24h |
| Aurora Diffuser — White (ad set) | — | — | — | — | — | — | Yes | **FIX** (pause/redirect spend) | Perf | Now |
| Glow Serum 30ml | 280 | 18/day | 15.6 | 10 + 4 | $9 | $162 | No | **KEEP** (standard PO) | Merch | 48h |
| Travel Candle Tin | 6 | 0.3/day | 20.0 | 21 + 5 | $4 | $1.20 | No | **WATCH** | Merch | 7 days |
| Linen Spray 100ml (EOL) | 12 | 4/day | 3.0 | 14 + 3 | $7 | $28 | No | **KILL** (do not reorder) | Merch | n/a |

Note how ranking by **contribution-per-day at risk** sorts the panic correctly: the candle tin has only 6 units left but at 0.3/day it has 20 days of cover and ~$1/day at stake — ignore it. The Linen Spray has the *same* 3-day cover as the diffuser, but it's end-of-life, so the right move is to let it run dry, not rush a PO. Only the diffuser combines a sub-lead-time cover, real velocity, healthy margin, and live ad spend — which is why it's the one SKU worth an air-freight premium today, with its ad set as a separate immediate FIX.

## Common Failure Modes

- Ranking by raw days-of-cover or units-on-hand instead of contribution-per-day at risk, so a slow long-tail SKU with 6 units jumps the queue ahead of a fast hero.
- Building days-of-cover on a sell rate that includes a one-off viral weekend, so a temporary spike triggers a permanent over-order.
- Forgetting to subtract days already out of stock from the sell-rate window, deflating the very velocity you're forecasting from.
- Ignoring an inbound PO already in transit and double-ordering a SKU that was about to be covered.
- Expediting a SKU you've flagged for discontinuation because it briefly looks urgent.
- Over-ordering "to be safe," converting a stockout risk into a dead-stock write-down a quarter later.
- Treating MOQ as optional and recommending a reorder the supplier won't actually fulfil at that quantity.

## Run This Play With Live Data

**Manual version:** export the inventory snapshot, rebuild a clean sell rate per SKU, divide for days-of-cover, join lead times, safety buffers, MOQ, margin, in-transit POs, and active ad spend — every morning, before another day burns off the reorder clock.

**ShopMCP version:** connect your store and ad accounts once. Ask the question; ShopMCP reads the live on-hand quantity, reconstructs each SKU's recent daily sell rate, computes days-of-cover against your lead time and safety buffer, weights the at-risk set by contribution-per-day, and flags the SKUs with active spend pointed at them — returning the ranked reorder/expedite priority list. It stays **read-only** until you explicitly approve a PO, an expedite, or an ad-spend change.

> No store or ad-account connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — the same playbook then runs in one prompt instead of a spreadsheet-and-buying-sheet morning.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Stockout Priority List play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual inventory exports and stale on-hand snapshots.
- Rebuilding a clean daily sell rate per SKU and dividing for days-of-cover by hand.
- Copy-pasting between your store, your buying sheet, and your ad accounts to find the winners about to run dry.
- Re-deriving lead-time vs. cover thresholds for every SKU, every morning.
