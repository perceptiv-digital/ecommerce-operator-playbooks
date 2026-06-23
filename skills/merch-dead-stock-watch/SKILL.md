---
name: merch-dead-stock-watch
description: "When an ecommerce operator needs to decide: Which products are tying up cash without enough demand? Runs the Dead Stock Watch play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Dead Stock Watch', 'Commerce', 'Merchandising Feed'."
license: CC-BY-4.0
metadata:
  persona: Merchandising Manager
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Dead Stock Watch

**Operating question:** Which products are tying up cash without enough demand?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **On-hand inventory by SKU** — current available units, from your commerce/inventory system; reconciled against 3PL/warehouse counts. Flag any SKU where store-available and warehouse-physical disagree.
- **Unit sales by SKU** — quantity sold over the **trailing 60 and 90 days**, net of refunds and cancellations. Two windows so you can tell a stalling SKU (90-day sales but nothing in 60) from a truly dead one (zero in both).
- **Unit cost (COGS)** per SKU — to convert units-on-hand into **cash tied up** and to set the markdown floor. Without cost you can rank by units but you cannot rank by cash or judge markdown depth.
- **Inventory age** — first-received or last-receipt date per SKU, so you can sort the dead list by *how long* cash has been stuck, not just how much.
- **Retail price / current margin** per SKU — to model markdown depth against the margin and the cost floor.

Optional, if available:

- **Holding cost rate** — storage + capital cost as a % of inventory value per month (often 2–3%/month at a 3PL). Turns "cash tied up" into "cash *bleeding* per week" and changes the urgency ranking.
- **Seasonality / sell-through curve** — last year's velocity for the same SKU or category, so a pre-season build doesn't read as dead.
- **Launch date** — anything live under ~60 days has no fair velocity yet.
- **Supplier return / RTV terms** — return-to-vendor eligibility, restocking fee, and window. A returnable SKU has a *better* exit than markdown.
- **Promotion calendar** — a recent promo borrows future demand; a planned one is a built-in clearance lever.
- **Open purchase orders** — inbound units for a SKU already flagged dead is a double-down to stop now.

## How to decide — in order

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

## The prompt to run

```text
You are my inventory/merchandising analyst running the "Dead Stock Watch" play.

GOAL: find SKUs tying up cash at a velocity that can't clear them, and assign the
least-lossy exit (RTV, markdown/bundle, liquidate, or discontinue) BEFORE they become
write-offs. Rank by cash-at-risk x inventory age, not by unit count.

I will paste a per-SKU table: on-hand units, units sold (60d and 90d, net of refunds),
unit cost, retail price, inventory age (days since first receipt), and where available:
supplier-return terms, launch date, seasonality flag, and holding-cost rate. Some columns
may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical inputs are
per-SKU on-hand units, inventory value (on-hand x unit cost), and recent sell-rate (units sold
over a trailing window) — these are what let you compute days-of-cover and cash tied up. Also
confirm seasonal/new-launch SKUs are excluded. If any of per-SKU on-hand units, inventory
value, or recent sell-rate is missing, STOP and return only (a) what's missing and (b) how to
get it — never estimate it or proceed.

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
2. A ranked table using exactly this header row:
   | SKU | On-hand | Units 90d | Days of cover | Cash tied up | Age (days) | Exit | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **KILL** — >180 days of cover OR zero net sales in 60–90 days with stock on hand, *and* no supplier-return option, *and* meaningful cash tied up; exit via deep clearance or liquidation. Accept the loss because holding cost compounds it.
- **REFRESH** — still sells *something* in 90 days and sits in a viable category: clear via markdown or bundle, with depth floored above **unit cost + cost-to-hold-and-clear**. Re-merchandising (better photos, a kit, a cross-sell slot) counts here when the SKU is sound but invisible.
- **WATCH** — launched under ~60 days, pre-season/pre-order, or the window is polluted by a stockout or a recent promo. Directional only; recheck after one clean window.
- **KEEP** — days of cover inside your healthy band (e.g. ≤90–120 days for core lines) with steady velocity and no aging signal.
- **FIX** — on-hand unreconciled, unit cost missing, or sales not de-refunded — anything that makes the cash-at-risk number unsafe to act on.
- Every recommendation carries a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- Do **not** KILL a seasonal or pre-order SKU sitting in its pre-season build — low velocity now is expected, not dead.
- Do **not** KILL a brand-new launch (under ~60 days): it hasn't earned a fair velocity read.
- Do **not** mark down below **unit cost + holding-cost-to-clear** unless you are deliberately liquidating, and label that as an accepted loss, not a "promotion."
- Do **not** reach for markdown when the SKU is **supplier-returnable** inside its window — RTV usually recovers more cash than discounted retail.
- Do **not** ignore **holding cost vs liquidation loss**: if waiting costs more to store than it recovers, the slower exit is the more expensive one.
- Do **not** compute days of cover on an unreconciled or phantom stock count.
- Do **not** discontinue, mark down, return, or write off anything without an explicit human approval step.

## Output

A per-SKU table ranked by **cash at risk × inventory age**, not by unit count:

| SKU | On-hand | Units 90d | Days of cover | Cash tied up | Age (days) | Exit | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| SCARF-OAT-OS | 140 | 3 | 4,200 | $2,660 | 410 | Liquidate | **KILL** | Merch + Finance | Today |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
