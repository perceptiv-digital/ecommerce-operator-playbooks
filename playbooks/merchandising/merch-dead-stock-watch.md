---
schema_version: 1
slug: "merch-dead-stock-watch"
title: "Dead Stock Watch"
summary: "Dead Stock Watch helps ecommerce operators answer: Which products are tying up cash without enough demand?"
operating_question: "Which products are tying up cash without enough demand?"
short_title: "Dead Stock"
primary_persona: "merchandising"
personas: ["merchandising", "founder", "operations"]
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/merch-dead-stock-watch"
shopmcp_prompt: "Run the Dead Stock Watch play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Dead Stock Watch

## Operating Question

**Which SKUs are tying up cash at a sell-through rate that can't justify the shelf space — and what's the cheapest exit before each one becomes a write-off?**

Every catalogue silently accumulates inventory that *looks* fine on a stock report — it has units, it has a price, it occasionally sells — but is bleeding working capital at a velocity that will never clear it at full margin. The job here is not "find slow movers." It's to compute **days of cover at current velocity** for every stocked SKU, isolate the ones that are genuinely dead (not seasonal, not just-launched), quantify the **cash and shelf-life at risk**, and assign the *least-lossy* exit — markdown, bundle, supplier return, liquidation, or discontinue — **before holding cost and obsolescence make the decision for you.**

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your inventory system, your order history, or your cost file. Sell-through is a *computed* metric — it does not exist in any single export. To run this manually you have to:

1. Pull **on-hand units by SKU** from your commerce/inventory platform (and reconcile it against any 3PL or warehouse count, because store-level "available" lies when there's unfulfilled or in-transit stock).
2. Pull **unit sales by SKU** over a clean trailing window (60 and 90 days), excluding refunded and cancelled lines.
3. Compute **daily sell rate** and divide on-hand by it to get **days of cover** — a number no platform shows you natively.
4. Bolt on **unit cost** to convert units-at-risk into **cash tied up**, and pull **inventory age / first-received date** to separate "slow" from "rotting."
5. Cross-check **seasonality, launch date, and supplier return terms** before you mark anything down, or you'll torch margin on a SKU that just needed three more weeks.

**The reasoning below is free. The data assembly is the wall — five sources, joined on SKU, recomputed every week — and that is exactly what ShopMCP removes.** If your assistant can't see your store and cost file, that's where the manual run stalls. The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Merchandising / Inventory Manager
- **Also useful for:** Founder/CEO (working-capital and cash-conversion view), Finance (write-down and obsolescence-reserve planning), Buyer/Planner (feeds the next reorder and open-to-buy).
- Run it **before** the weekly buy meeting and **before** finance closes a period — dead stock is a cash and a balance-sheet decision, not just a merchandising one.

## When To Run It

- **Cadence:** weekly — ideally the same day you review open purchase orders, so dead-stock signals feed the next reorder decision instead of arriving after you've already re-bought.
- **Triggers:** a quarter-end or fiscal year-end approaching (write-down exposure), a warehouse/3PL storage invoice that jumped, a category review, a cash-flow squeeze, or a season turning over (the post-peak window is when last season's stock reveals itself).
- **Pre-requisite:** an inventory reconciliation. Never compute days of cover on top of a stock count you don't trust — a phantom on-hand number turns a healthy SKU into a false "dead" flag and vice versa.

## Required Evidence

- **On-hand inventory by SKU** — current available units, from your commerce/inventory system; reconciled against 3PL/warehouse counts. Flag any SKU where store-available and warehouse-physical disagree.
- **Unit sales by SKU** — quantity sold over the **trailing 60 and 90 days**, net of refunds and cancellations. Two windows so you can tell a stalling SKU (90-day sales but nothing in 60) from a truly dead one (zero in both).
- **Unit cost (COGS)** per SKU — to convert units-on-hand into **cash tied up** and to set the markdown floor. Without cost you can rank by units but you cannot rank by cash or judge markdown depth.
- **Inventory age** — first-received or last-receipt date per SKU, so you can sort the dead list by *how long* cash has been stuck, not just how much.
- **Retail price / current margin** per SKU — to model markdown depth against the margin and the cost floor.

## Optional Evidence (changes the answer when present)

- **Holding cost rate** — storage + capital cost as a % of inventory value per month (often 2–3%/month at a 3PL). Turns "cash tied up" into "cash *bleeding* per week" and changes the urgency ranking.
- **Seasonality / sell-through curve** — last year's velocity for the same SKU or category, so a pre-season build doesn't read as dead.
- **Launch date** — anything live under ~60 days has no fair velocity yet.
- **Supplier return / RTV terms** — return-to-vendor eligibility, restocking fee, and window. A returnable SKU has a *better* exit than markdown.
- **Promotion calendar** — a recent promo borrows future demand; a planned one is a built-in clearance lever.
- **Open purchase orders** — inbound units for a SKU already flagged dead is a double-down to stop now.

## The Decision Logic (run in this order)

1. **Gate on stock truth.** If on-hand can't be reconciled (store-available ≠ warehouse-physical, or a recent count is missing), set the SKU to **FIX** and stop. Every downstream number depends on a trustworthy unit count.
2. **Protect immaturity.** Exclude anything launched in the last ~60 days (no fair velocity yet) and any pre-season / pre-order SKU → **WATCH** with an explicit "ramp/seasonal hold" reason, never KILL.
3. **Compute days of cover.** `days_of_cover = on_hand_units ÷ (units_sold_90d ÷ 90)`. Flag the dead candidates: **>180 days of cover**, OR **zero net sales in the trailing 60–90 days with on-hand units > 0**. These two rules catch the slow-bleed and the flat-line separately.
4. **Quantify cash and age.** For each flagged SKU compute **cash tied up = on_hand × unit_cost** and pull **inventory age**. Re-rank the dead list by **cash × age**, not by unit count — the oldest, most-cash SKUs are where the write-off forms first.
5. **Pick the least-lossy exit per SKU:**
   - **Supplier-returnable within window** → **RTV** beats markdown almost every time; net recovery is cost minus restocking fee, not a discounted retail.
   - **Still has demand at a lower price** (sold *something* in 90d, healthy category) → **REFRESH** via markdown/bundle, depth set so price stays **above unit cost + holding cost to clear**.
   - **No demand, no return, real cash stuck** → **KILL**: deep clearance or liquidation; accept a loss now because holding cost compounds it.
   - **Marginal / early / seasonal** → **WATCH** for one clean window.
6. **Apply the vetoes**, then assign status + owner + recheck date.

## Manual Workflow

1. Export on-hand units by SKU and reconcile against the 3PL/warehouse count. Mark any mismatch FIX.
2. Export unit sales by SKU for the trailing 60 and 90 days, net of refunds/cancellations.
3. Compute daily sell rate and **days of cover** per SKU; join unit cost and inventory age.
4. Filter to the dead list (>180 days of cover, or zero 60–90d sales with stock on hand). Drop SKUs launched <60 days ago and flagged seasonal/pre-order.
5. Compute **cash tied up** and sort by **cash × age**; annotate supplier-return eligibility where you have terms.
6. Paste the prompt below with your table.
7. Pressure-test every KILL against the vetoes, then convert survivors into an action packet with exit type, markdown floor, owner, and recheck date.

## Copy-Paste Prompt

```text
You are my inventory/merchandising analyst running the "Dead Stock Watch" play.

GOAL: find SKUs tying up cash at a velocity that can't clear them, and assign the
least-lossy exit (RTV, markdown/bundle, liquidate, or discontinue) BEFORE they become
write-offs. Rank by cash-at-risk x inventory age, not by unit count.

I will paste a per-SKU table: on-hand units, units sold (60d and 90d, net of refunds),
unit cost, retail price, inventory age (days since first receipt), and where available:
supplier-return terms, launch date, seasonality flag, and holding-cost rate. Some columns
may be missing.

RULES:
- Stock-truth gate first: if on-hand is unreconciled or missing, mark the SKU FIX and
  exclude it from KILL decisions.
- Compute days_of_cover = on_hand / (units_sold_90d / 90). Flag as dead when days_of_cover
  > 180 OR units sold in the last 60-90 days = 0 with on-hand > 0.
- Exclude SKUs launched < 60 days ago and any pre-season / pre-order SKU: WATCH with a
  ramp/seasonal reason, never KILL.
- For each flagged SKU compute cash_tied_up = on_hand x unit_cost and rank by cash x age.
- Choose the exit: supplier-returnable -> RTV (net = cost - restocking fee). Demand at a
  lower price -> markdown/bundle, floor above unit_cost + holding cost. No demand/no return
  -> KILL (clearance/liquidate). Marginal/early/seasonal -> WATCH.
- Markdown depth must respect the cost floor and brand; never recommend a price below cost
  unless explicitly liquidating, and label it as a deliberate loss.
- Weigh holding cost vs liquidation loss when present: if holding cost to clear exceeds the
  extra recovery from waiting, exit now.
- Every row must carry a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read (total cash at risk, top exit, biggest caveat).
2. A ranked table: SKU | On-hand | Units 90d | Days of cover | Cash tied up | Age (days) |
   Exit | Status | Owner | Recheck.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision Rules

- **KILL** — >180 days of cover OR zero net sales in 60–90 days with stock on hand, *and* no supplier-return option, *and* meaningful cash tied up; exit via deep clearance or liquidation. Accept the loss because holding cost compounds it.
- **REFRESH** — still sells *something* in 90 days and sits in a viable category: clear via markdown or bundle, with depth floored above **unit cost + cost-to-hold-and-clear**. Re-merchandising (better photos, a kit, a cross-sell slot) counts here when the SKU is sound but invisible.
- **WATCH** — launched under ~60 days, pre-season/pre-order, or the window is polluted by a stockout or a recent promo. Directional only; recheck after one clean window.
- **KEEP** — days of cover inside your healthy band (e.g. ≤90–120 days for core lines) with steady velocity and no aging signal.
- **FIX** — on-hand unreconciled, unit cost missing, or sales not de-refunded — anything that makes the cash-at-risk number unsafe to act on.
- Every recommendation carries a **number, source, time window, and confidence level**.

## Veto Rules

- Do **not** KILL a seasonal or pre-order SKU sitting in its pre-season build — low velocity now is expected, not dead.
- Do **not** KILL a brand-new launch (under ~60 days): it hasn't earned a fair velocity read.
- Do **not** mark down below **unit cost + holding-cost-to-clear** unless you are deliberately liquidating, and label that as an accepted loss, not a "promotion."
- Do **not** reach for markdown when the SKU is **supplier-returnable** inside its window — RTV usually recovers more cash than discounted retail.
- Do **not** ignore **holding cost vs liquidation loss**: if waiting costs more to store than it recovers, the slower exit is the more expensive one.
- Do **not** compute days of cover on an unreconciled or phantom stock count.
- Do **not** discontinue, mark down, return, or write off anything without an explicit human approval step.

## Output Contract

A per-SKU table ranked by **cash at risk × inventory age**, not by unit count:

| SKU | On-hand | Units 90d | Days of cover | Cash tied up | Age (days) | Exit | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| SCARF-OAT-OS | 140 | 3 | 4,200 | $2,660 | 410 | Liquidate | **KILL** | Merch + Finance | Today |

## Worked Example

> **Executive read:** 22 SKUs are holding **$48,000** at **>270 days of cover** — roughly $1,150/month bleeding in holding cost alone. The cleanest move is a **tiered clearance**: deepest markdown on the oldest, most-cash items (a 410-day-old scarf and a discontinued kettle returnable to the supplier), shallower on items still showing a pulse. Two SKUs are excluded — a pre-season swim line on its planned build, and a 5-week-old launch that hasn't earned a velocity read.

| SKU | On-hand | Units 90d | Days of cover | Cash tied up | Age (days) | Exit | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| KETTLE-CPR-1.7 | 88 | 0 | ∞ (0 sales) | $9,240 | 360 | RTV (returnable, 8% fee) | **KILL → RTV** | Merch + Buyer | Today |
| SCARF-OAT-OS | 140 | 3 | 4,200 | $2,660 | 410 | Liquidate (below cost, accepted loss) | **KILL** | Merch + Finance | Today |
| MUG-SET-4 | 210 | 22 | 860 | $3,990 | 240 | Bundle + 25% markdown | **REFRESH** | Merch | 14 days |
| TOTE-CANVAS-L | 175 | 31 | 508 | $2,275 | 190 | 15% markdown, hero re-shoot | **REFRESH** | Merch + Content | 14 days |
| SWIM-WMN-AQUA | 96 | 4 | 2,160 | $3,360 | 35 | Pre-season hold | **WATCH** | Merch | 30 days |
| LAMP-ARC-BRZ | 40 | 6 | 600 | $4,800 | 28 | New-launch ramp | **WATCH** | Merch | 21 days |

Note how the answer *inverts* a naive units view: the scarf (140 units, deepest discount) is **not** the top priority — the kettle is, because $9,240 of cash is returnable to the supplier at an 8% fee, recovering ~$8,500 versus a few hundred dollars at clearance. Pure unit-count or pure days-of-cover sorting would have buried the single best cash-recovery move in the list.

## Common Failure Modes

- Sorting the dead list by units or days-of-cover instead of **cash × age**, so the biggest recoverable loss hides mid-table.
- Marking down a SKU that was **supplier-returnable**, forfeiting cost-recovery for a discounted-retail recovery.
- Computing days of cover on a **stockout-polluted** window — three days at zero stock fakes a velocity collapse.
- Killing a **pre-season or just-launched** SKU because this week's velocity is (correctly) near zero.
- Discounting below cost and calling it a "promotion" instead of an accepted liquidation loss — hides the real margin damage from finance.
- Ignoring **holding cost**, so a SKU is "monitored" for months while storage quietly outspends any recovery from waiting.

## Run This Play With Live Data

**Manual version:** export on-hand by SKU, reconcile against the warehouse, export 60- and 90-day sales net of refunds, compute days of cover, join cost and age, rank by cash — every week.

**ShopMCP version:** connect your store and inventory once. Ask the question; ShopMCP pulls live on-hand, trailing sell-through, unit cost, and inventory age, computes days of cover and cash-at-risk per SKU, applies the maturity and seasonality holds, and returns the ranked KILL/REFRESH/WATCH/KEEP table with an exit recommendation per row. It stays **read-only** until you explicitly approve a markdown, bundle, or discontinue.

> No store or inventory connection inside your AI assistant? That's the wall every manual dead-stock run hits — sell-through isn't in any single export, it has to be assembled. ShopMCP *is* that assembly, so the same playbook runs in one prompt instead of a spreadsheet afternoon.

Example ShopMCP prompt:

```text
Run the Dead Stock Watch play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/merch-dead-stock-watch?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual on-hand exports and the warehouse reconciliation.
- Computing days of cover and cash-at-risk by hand across sales, cost, and age files.
- Guessing whether a low-velocity SKU is dead, seasonal, or just newly launched.
- Rebuilding the same five-source join every single week.
