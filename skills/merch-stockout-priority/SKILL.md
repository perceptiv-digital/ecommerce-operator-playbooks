---
name: merch-stockout-priority
description: "When an ecommerce operator needs to decide: Which stockouts create the most commercial risk? Runs the Stockout Priority List play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Stockout Priority List', 'Commerce', 'Merchandising Feed'."
license: CC-BY-4.0
metadata:
  persona: Merchandising Manager
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Stockout Priority List

**Operating question:** Which stockouts create the most commercial risk?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce inventory** — current on-hand / sellable quantity per SKU and variant. This is the numerator of days-of-cover.
- **Commerce order history** — units sold per SKU over a **clean recent window** (typically the trailing 14–28 days), used to derive a daily sell rate. Exclude any days the SKU was already out of stock so the rate reflects real demand, not the gap.
- **Supplier lead time per SKU** — calendar days from placing a PO to receiving sellable stock. This is the threshold days-of-cover is measured against.
- **Safety buffer / reorder point policy** — the extra days of cover you keep on top of lead time to absorb demand variance and inbound delays.
- **Contribution margin per unit** — selling price minus COGS minus variable fulfilment, per SKU or a category default. Used to weight which at-risk SKUs matter most.

Optional, if available:

- **MOQ and case-pack constraints** — the minimum you can actually order, which can make a "tiny reorder" impossible or force over-ordering.
- **Active ad spend by destination product** — campaigns/ad sets currently routing paid traffic to a SKU approaching stockout (running out mid-flight wastes that spend).
- **Inbound POs already in transit** — quantity and ETA, so you don't double-order something already on the water.
- **Demand shape** — seasonality, promo calendar, and day-of-week pattern, so a weekend velocity spike isn't read as a permanent run-rate.
- **Planned discontinuation / end-of-life flags** — a SKU you're sunsetting should *not* be reordered no matter how fast it's selling.

## How to decide — in order

1. **Confirm the inventory is real.** Feed fresh, quantity truly sellable, no held/allocated units inflating it. If on-hand is stale or ambiguous, mark the SKU **FIX** and stop — never schedule a reorder off a number you don't trust.
2. **Compute days-of-cover.** `days of cover = on-hand units ÷ recent daily sell rate`. Qualify the sell rate first: if demand is erratic, spiky, or seasonal, widen the window (e.g. 28→56 days), use a conservative rate, and drop the confidence level — a single viral weekend is not a run-rate.
3. **Compare cover to the runway.** A SKU is **urgent** when `days of cover < supplier lead time + safety buffer` — it will sell out before a normal PO can land. A SKU inside its reorder window (cover above the threshold but approaching it) is a routine PO, not an expedite.
4. **Weight by commercial value.** Rank the urgent set by `daily sell rate × contribution margin/unit` — the contribution-per-day you bleed once it goes dark. A fast, high-margin hero outranks a fast, thin-margin commodity even at the same days-of-cover.
5. **Overlay active acquisition.** Flag any urgent SKU with live ad spend pointed at it. Running out mid-campaign means you keep paying for clicks into a Sold Out page — that escalates the SKU and, separately, demands a spend decision (pause or redirect) independent of the reorder.
6. **Choose the action, then apply the vetoes.** Cover far below the runway on a valuable SKU → **expedite** (air-freight / rush PO). Inside the reorder window → standard PO. Then check MOQ, cash, discontinuation, and demand-confidence vetoes before committing, and attach owner + recheck.

## The prompt to run

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

## Decision rules

- **REFRESH (expedite now)** — days of cover is well below `lead time + safety buffer` on a high-value SKU (strong sell rate × margin), so a standard PO can't land in time → air-freight, rush order, or substitute. Active ad spend pointed at it raises the priority further.
- **KEEP (standard PO)** — the SKU is inside its reorder window: cover is approaching the threshold but a normal-lead-time PO placed now still lands before stockout. Order at the normal quantity; no expedite premium needed.
- **WATCH** — directional only: demand is erratic, spiky, or seasonal so days-of-cover isn't trustworthy yet, the SKU is low-velocity, or an in-transit PO may already cover the gap. Widen the window and recheck.
- **KILL** — a SKU flagged for planned discontinuation or end-of-life: do not reorder however fast it's selling; let it run down and reallocate the shelf and budget.
- **FIX** — the on-hand number is stale/ambiguous, the sell rate can't be cleaned, or lead-time/MOQ data is missing, so no safe reorder size can be set.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** trust days-of-cover built on an erratic or seasonal sell rate — widen the window and lower confidence before acting.
- Do **not** ignore MOQ and case-pack: a reorder you can't actually place at the supplier's minimum isn't an action.
- Do **not** over-order to feel safe — excess stock ties up cash and creates the dead-stock problem you'll be writing down next quarter.
- Do **not** reorder a SKU flagged for discontinuation, no matter how short its cover.
- Do **not** double-order a SKU that already has an inbound PO landing before the cover runs out.
- Do **not** place a PO, expedite a shipment, or pause/redirect ad spend without explicit human approval.

## Output

A SKU-level table ranked by **contribution-per-day at risk**, with a reorder/expedite action and evidence per row:

| SKU | On-hand | Sell rate/day | Days of cover | Lead time + buffer | Margin/unit | Contribution/day at risk | Active ad spend? | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Example variant | 45 | 15/day | 3.0 | 14 + 3 | $22 | $330 | Yes | REFRESH (expedite) | Merch + Ops | 24h |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
