---
schema_version: 1
slug: "merch-least-profitable-products"
title: "Least Profitable Products"
summary: "Least Profitable Products helps ecommerce operators answer: Which products create the weakest known profit?"
operating_question: "Which products create the weakest known profit?"
short_title: "Least Profitable Products"
primary_persona: "merchandising"
personas: ["merchandising", "founder", "marketing"]
category: "merchandising-feed"
platforms: ["commerce"]
cadence: "weekly"
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
shopmcp_prompt: "Run the Least Profitable Products play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Least Profitable Products

## Operating Question

**Which products create the weakest known profit per unit sold — once returns, fees, and discount dependence are subtracted — and what do I do about each one: reprice, renegotiate COGS, bundle, or delist?**

Most "best/worst sellers" reports rank by revenue or by *gross* margin, and both lie. A SKU can show a respectable gross margin on the price tag and still lose money on every order once a 14% return rate, the inbound and refurb cost of those returns, payment processing, and a standing 20%-off coupon are counted. This play computes a real **per-unit contribution** for each SKU — `price − COGS − returns cost − attributable variable cost` — ranks the weakest, and forces one of five calls per SKU: **KILL** (delist), **REFRESH** (reprice / renegotiate / rework the listing), **WATCH**, **KEEP**, or **FIX** (the data isn't trustworthy enough to decide yet). The unit of analysis is the SKU, not the campaign or the page.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant can reason about contribution margin in the abstract, but it cannot see the four numbers that actually decide each SKU. To run this manually you have to assemble them yourself:

1. **Sell-through and price realized** — export orders by SKU, but use *net* units (gross orders minus refunded/returned units), not the headline order count.
2. **COGS per SKU** — almost never lives in your store platform. It sits in a supplier spreadsheet, your 3PL landed-cost file, or your accounting system, and it drifts every time a PO repriced.
3. **Returns** — return *rate* and the *cost* of a return (return shipping + restocking/refurb + write-off of damaged units). Your storefront reports rarely net this against margin; it leaks silently.
4. **Variable cost to serve** — payment-processing %, per-order pick/pack, and any ad spend attributable to that SKU.

**The contribution math is the easy half. Stitching net units, COGS, returns cost, and fees into one per-SKU row is the work — and that is exactly the join ShopMCP automates.** If your AI assistant has no live line into your store, your returns data, and your cost file, that wall is where manual runs stall. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Merchandising Manager
- **Also useful for:** Head of Finance / FP&A (validates the COGS and fee inputs), Founder/CEO (catalog-rationalization decisions), Buying/Sourcing (COGS renegotiation targets).
- Run it when you own the catalog and need a *decision per SKU*, not a dashboard — repricing, a supplier conversation, a bundle, or a delist.

## When To Run It

- **Cadence:** weekly — a light pass to catch new negative-contribution SKUs early; a deeper quarterly pass feeds the assortment/delist review.
- **Triggers:** a COGS increase from a supplier, a freight or payment-fee change, a returns spike on a category, a blended-margin drop in the P&L with no obvious cause, or planning a catalog cull.
- **Pre-requisite:** confirm COGS is loaded and current for the SKUs in scope, and that returns are recorded against the originating SKU. Without both, this play runs in **partial** mode and every output is labelled as such.

## Required Evidence

- **Orders by SKU (net of returns)** — units sold, gross revenue, and units/value refunded, last 90 days (use 30 days only for high-velocity SKUs; slow movers need the longer window for a stable return rate).
- **COGS per SKU** — current landed cost (unit cost + inbound freight + duties). Flag any SKU where COGS is stale or missing — that SKU is **FIX**, not KILL.
- **Returns** — return rate per SKU and the loaded cost per return (return shipping + restocking/refurb labour + the write-off rate on units that can't be resold).
- **Variable cost to serve** — payment-processing rate (e.g. 2.9% + $0.30), per-order fulfillment/pick-pack cost, and any directly attributable ad spend per SKU.
- **List price and realized price** — headline price *and* the average discount actually applied (coupons, automatic discounts, markdowns), so you can separate list margin from realized margin.

## Optional Evidence

- **Attach rate / basket role** — how often a SKU appears alongside others and whether it pulls AOV up. This is what exempts a deliberate loss-leader from a KILL.
- **Inventory on hand and age** — a deep-discount-dependent SKU may be aged stock being cleared, not a structural loser.
- **Promotion calendar** — flags whether the discount on a SKU is a permanent crutch or a one-off campaign distorting the window.
- **Seasonality / clearance status** — end-of-season clearance compresses margin by design and must not be read as a structural failure.
- **Competitor price band** — tells you whether a reprice is even feasible before you recommend one.

## How To Pull This Evidence

- **Per-SKU price and COGS (Shopify)** — list price comes from each variant; COGS lives in the variant's **Cost per item** field (Products → variant → Pricing → *Cost per item*). It's optional in Shopify and routinely left blank, so export the products CSV and check the `Cost per item` column for gaps before trusting any margin. No Cost per item = no real contribution for that SKU → **FIX**.
- **Return rate per SKU** — Shopify's admin returns/refunds live at the *order* level, not rolled up per SKU. Pull refunded line items (Orders → filter Refunded, or the refunds export) and aggregate refunded units against net units sold per SKU yourself. Add the loaded cost of a return — return shipping + restock/refurb labour + the write-off rate on units you can't resell — since Shopify won't net any of that against margin.
- **Payment fees** — Shopify Payments fees (e.g. 2.9% + $0.30, varies by plan/region) and any third-party gateway fees sit in **Settings → Payments** and on the payout/transaction export, not on the product record. Apply the per-transaction rate to realized price, and don't forget per-order pick/pack and attributable ad spend.
- **Loss-leader / attach-rate gotcha** — none of the above tells you whether a contribution-negative SKU is *deliberately* subsidising a profitable basket. You can't read attach rate or AOV lift off a product or refund export; you have to join order-line co-occurrence (which SKUs ship in the same order) before you let any KILL through. Skip this join and you will delist a loss-leader that was carrying the cart.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Gate on cost coverage.** Any SKU with missing or stale COGS, or with returns not attributable to it, is **FIX** — label it *partial profit* and exclude it from KILL decisions. You cannot delist on a margin you can't compute.
2. **Compute real per-unit contribution.** `unit contribution = realized price − COGS − (return rate × loaded return cost) − payment fee − per-order fulfillment − attributable ad cost`. Rank ascending. The most negative SKUs surface first.
3. **Separate the two ways a SKU goes negative.** A *thin-gross-margin* SKU (e.g. 8% gross) and a *high-return* SKU are different diseases. A 30%-gross SKU with a 22% return rate and a 9% write-off can be a bigger contribution loser than an 8%-gross SKU that never comes back. **Returns are the silent killer — always rank by contribution-after-returns, never by gross margin.**
4. **Test discount dependence.** For each weak SKU, compare realized price to list. If contribution is only negative *because* of a standing discount, the lever is repricing/removing the coupon, not delisting — provided volume survives the price move.
5. **Check the basket role before any KILL.** Pull attach rate and AOV lift. A contribution-negative SKU that reliably drags a profitable basket is a strategic loss-leader → **KEEP (exempt)**, not KILL. A contribution-negative SKU bought in isolation is a true drain.
6. **Assign the lever, then apply the vetoes.** Map each survivor to reprice / renegotiate COGS / bundle / delist, attach owner and recheck date, then pressure-test against the veto list before anything is actioned.

## Manual Workflow

1. Export orders by SKU for the last 90 days; compute **net units** (gross minus returned units) and realized revenue.
2. Join COGS per SKU from your cost file. Mark any stale/missing COGS row as **FIX** and set it aside.
3. Join returns: return rate per SKU and the loaded cost per return. Subtract `return rate × loaded return cost` from per-unit economics.
4. Subtract variable cost to serve (payment %, pick/pack, attributable ad spend) to land **per-unit contribution**.
5. Rank ascending; take the bottom decile plus every SKU with negative contribution.
6. For each, pull discount dependence and attach rate/basket role.
7. Paste the prompt below with your table.
8. Assign reprice / renegotiate / bundle / delist, run the veto list, and convert survivors into an action packet with owner and recheck date.

## Copy-Paste Prompt

```text
You are my merchandising-margin analyst running the "Least Profitable Products" play.

GOAL: rank my SKUs by REAL per-unit contribution and decide, per SKU, whether to
reprice, renegotiate COGS, bundle, delist (KILL), REFRESH, WATCH, KEEP, or FIX.

Per-unit contribution = realized price - COGS - (return rate x loaded return cost)
  - payment fee - per-order fulfillment - attributable ad cost.

I will paste: orders by SKU (net of returns), COGS per SKU, return rate and loaded
return cost, payment/fulfillment/ad cost, and list vs realized price. Some data may
be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical
input is per-SKU price, COGS, and returns data - without COGS and returns coverage
the contribution ranking is wrong. If that critical input is missing, STOP and return
only (a) what's missing and (b) how to get it - never estimate it or proceed. If a
non-critical input is missing, label the run "partial" and continue.

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
2. A ranked table using exactly this header row:
   | SKU | Net units (90d) | Gross margin % | Return rate | Real unit contribution | Discount-dependent? | Basket role | Lever | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not
   replace the table with prose.
3. Vetoes/caveats that downgraded or exempted any recommendation.
4. What evidence is blocked and what you'd need to upgrade a FIX/WATCH to a decision.
```

## Decision Rules

- **KILL (delist)** — structurally contribution-negative at realized price *and* at list (so a reprice can't save it), volume too low to matter, no basket role, full COGS coverage, and no seasonal/clearance veto.
- **REFRESH** — contribution is weak or negative but a credible lever exists: reprice off a standing discount, renegotiate COGS with the supplier, rework the listing to cut a return-driving fit/expectation gap, or bundle to lift attach.
- **WATCH** — directional only: short window, an unstable return rate (too few returns to trust), or a window polluted by a promo/clearance event.
- **KEEP** — contribution-positive inside the target band, *or* a deliberate loss-leader whose attach/AOV evidence justifies the loss (KEEP-exempt).
- **FIX** — missing/stale COGS, returns not attributable to the SKU, or realized-price data too messy to compute contribution. Label *partial profit*.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do **not** make a profit claim — or a KILL — without COGS coverage. Missing cost = **FIX / partial profit**, never a delist.
- Do **not** rank or decide on gross margin alone. A low gross margin paired with a high return rate is the real killer, and gross margin hides it.
- Do **not** delist a loss-leader before checking attach rate and basket role — some negative-contribution SKUs are deliberately subsidising a profitable basket.
- Do **not** treat a seasonal-clearance or aged-stock markdown as a structural loss; a deliberate end-of-life discount distorts a single snapshot.
- Do **not** KILL on an unstable return rate (too few return events to trust) — WATCH until the sample is large enough.
- Do **not** reprice, delist, edit the catalog, or change discounts without an explicit human approval step.

## Output Contract

A SKU table ranked by **real per-unit contribution** (ascending — worst first), one decision per row:

| SKU | Net units (90d) | Gross margin % | Return rate | Real unit contribution | Discount-dependent? | Basket role | Lever | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Example SKU | 410 | 31% | 8% | +$4.20 | No | Standalone | none | KEEP | Merch | 30 days |

## Worked Example

> **Executive read:** Three SKUs are destroying known profit. "Trailhead 22L Daypack" looks healthy at a glance — but a 14% return rate plus payment and fulfillment fees push it to **−$3.10 per unit**, and at 1,180 net units that's roughly **$3.7k of contribution bled in 90 days**; reprice +$6 and tighten the size guide before considering a delist. The "Clip-On Bottle Cage" is structurally negative at both list and realized price with no basket role — a clean **KILL**. The "$9 Carabiner" is contribution-negative in isolation but appears in 38% of multi-item baskets and lifts AOV ~$22, so it stays as a deliberate **loss-leader (KEEP-exempt)**.

| SKU | Net units (90d) | Gross margin % | Return rate | Real unit contribution | Discount-dependent? | Basket role | Lever | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Trailhead 22L Daypack | 1,180 | 30% | 14% | **−$3.10** | No | Standalone | Reprice +$6 / fix size guide | **REFRESH** | Merch + Listings | 21 days |
| Clip-On Bottle Cage | 240 | 8% | 6% | **−$1.40** | No | Standalone | — | **KILL** | Merch | Now |
| $9 Carabiner | 2,600 | 12% | 2% | **−$0.55** | No | Attach (38% of baskets, +$22 AOV) | Keep as loss-leader | **KEEP-exempt** | Merch + Founder | 30 days |
| Heated Vest (clearance) | 90 | 4% | 19% | **−$8.20** | Yes (60% off) | Standalone | — | **WATCH** | Merch | After clearance |
| Insulated Bottle 1L | 1,540 | 41% | 5% | **+$6.80** | No | Standalone | — | **KEEP** | Merch | 30 days |
| Trail Socks (3-pack) | 880 | 35% | 9% | **partial** | Unknown | Standalone | — | **FIX** | Merch + Finance | COGS load |

Note how the ranking *inverts* a gross-margin view: the Daypack (30% gross) loses more real contribution than the Bottle Cage (8% gross), because returns — not the price tag — are doing the damage. The clearance Heated Vest looks worst of all but is a deliberate markdown, so it's WATCH, not KILL. And the Socks can't be judged at all until COGS is loaded.

## Common Failure Modes

- Ranking by gross margin (or worse, by revenue) and missing the high-return SKUs that are the real drain.
- Counting gross orders instead of net units, so a high-return SKU's "sales" look healthy.
- Delisting a loss-leader without checking its attach rate and AOV lift.
- Reading a seasonal-clearance or aged-stock markdown as a structural loss.
- Making a KILL call on a SKU whose COGS is stale, missing, or guessed.
- Accepting an AI answer that shows a contribution number without the returns and fee inputs behind it.

## Run This Play With Live Data

**Manual version:** export orders by SKU, net out returns, join COGS from a separate cost file, join returns cost, subtract payment and fulfillment fees, separate list from realized price — then rank and decide. Every week.

**ShopMCP version:** connect your store, your returns data, and your cost/COGS source once. Ask the question; ShopMCP pulls net units, current COGS, return rate and loaded return cost, and payment/fulfillment fees, computes per-SKU contribution, runs the cost-coverage gate, separates discount-dependent from structurally negative SKUs, checks basket role before flagging any KILL, and returns the ranked contribution table. It stays **read-only** until you explicitly approve a reprice, bundle, or delist.

> No store, returns, or COGS connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of a spreadsheet-afternoon of joins.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Least Profitable Products play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual exports and stale COGS spreadsheets.
- Joining orders, returns, COGS, and fees by hand into one per-SKU row.
- Mistaking gross margin for real contribution because returns are netted somewhere else.
- Rebuilding the same contribution model every week.
