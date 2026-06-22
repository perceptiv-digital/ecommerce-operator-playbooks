---
name: ecom-stockout-impact
description: "When an ecommerce operator needs to decide: Which stockouts are costing the most demand or revenue? Runs the Stockout Lost-Revenue Impact play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Stockout Lost-Revenue Impact', 'Commerce', 'Google Analytics 4', 'Merchandising Feed'."
license: CC-BY-4.0
metadata:
  persona: Head of Ecommerce
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Stockout Lost-Revenue Impact

**Operating question:** Which stockouts are costing the most demand or revenue?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce inventory** — current on-hand / sellable quantity per SKU and variant, plus the **timestamp each item dropped to 0** (or fell below its safety floor). This defines *days out of stock*.
- **Commerce order history** — units sold per SKU over a **clean trailing window** (28–56 days is typical), with the OOS days removed, so sell-rate reflects real demand, not the gap.
- **Contribution margin per unit** — selling price minus COGS minus variable fulfilment, per SKU or a category default. Revenue lost ≠ profit lost.
- **GA4 PDP traffic** — sessions/day still landing on each out-of-stock product page over the last 7–14 days (the live demand signal that the gap is actively turning shoppers away).
- **Restock state** — incoming PO quantity and expected restock/ETA date per affected SKU.

Optional, if available:

- **Back-in-stock signups** on the OOS PDP — demand that is partially *deferred*, not fully lost, and will recover some revenue on restock.
- **Substitute / sibling variant availability** — if the size-M is dead but size-L and size-S are in stock, much of that demand reroutes rather than evaporates.
- **Paid spend still pointing at the OOS page** — active ads or feed entries driving paid clicks into a Sold Out button (pure waste, separate from the lost-sales math).
- **Promo / launch calendar** — to avoid crediting (or blaming) the gap for a swing that a promotion actually caused.
- **Seasonality / day-of-week shape** — so a Monday-vs-weekend sell-rate isn't read as a trend.

## How to decide — in order

1. **Confirm the gap is real.** Inventory feed fresh, quantity truly 0/below floor, and the drop timestamp is trustworthy. If inventory is stale or ambiguous, mark the SKU **FIX** and stop — don't estimate loss on a number you don't trust.
2. **Qualify velocity.** Compute trailing sell-rate (units/day) on a **clean window with OOS days removed**. If the SKU is erratic or low-velocity (roughly < ~1 unit/day or a wildly spiky history), it is **WATCH** at most — a confident loss figure isn't defensible.
3. **Size the realised loss.** For qualifying SKUs: `lost units = clean sell-rate × days out of stock`; `lost contribution = lost units × contribution margin/unit`. This dollar figure, not the unit count, is the ranking key.
4. **Discount for recoverable demand.** Subtract what substitution (in-stock siblings) and back-in-stock signups will recover. Never double-count the same lost sale across a variant group — attribute it once.
5. **Add the live-demand and waste overlays.** High current GA4 PDP sessions on a dead page = the gap is actively bleeding *now* → escalate. Paid spend still routing there = an immediate, separate **FIX** (pause the ad/feed), independent of restock timing.
6. **Check the restock clock, then assign status.** If a PO lands within ~48h, expediting may be moot → **WATCH** and let it arrive. If the ETA is far out or unknown on a high-loss SKU, **REFRESH** (expedite / substitute / reallocate). Then apply the vetoes and attach owner + recheck.

## The prompt to run

```text
You are my ecommerce inventory analyst running the "Stockout Lost-Revenue Impact" play.

GOAL: rank my current and recent out-of-stock SKUs by REALISED lost contribution profit,
and tell me which ones are worth escalating versus letting ride.

I will paste: a list of out-of-stock SKUs with the date each went to 0, a clean trailing
sell-rate per SKU (units/day, with OOS days already excluded), contribution margin per unit,
GA4 PDP sessions/day on each dead page, incoming-PO ETA, back-in-stock signups, and
sibling-variant stock. Some fields may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the per-SKU clean
sell-rate (over a clean pre-stockout window with OOS days excluded), the days out of stock,
or the contribution margin per unit is missing, STOP and return only (a) what's missing and
(b) how to get it — never estimate it or proceed.

RULES:
- Lost units = clean sell-rate x days out of stock. Lost contribution = lost units x margin/unit.
  Rank by lost CONTRIBUTION, not units and not revenue.
- Do NOT value lost demand on erratic or low-velocity SKUs (roughly <1 unit/day or spiky history):
  mark WATCH and say the estimate is not defensible.
- Net out recoverable demand: subtract substitution to in-stock siblings and back-in-stock
  signups. Never double-count the same lost sale across a variant group.
- If paid spend is still pointing at an out-of-stock page, flag it as immediate waste (FIX)
  separate from the lost-sales math.
- If a restock PO lands within ~48h, treat expediting as low-value (WATCH); escalate only when
  ETA is far out or unknown on a high-loss SKU.
- If the inventory number is stale or ambiguous, mark FIX and do not estimate loss on it.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read (total lost contribution + the top offender).
2. A ranked table using exactly this header row:
   | SKU | Days OOS | Clean sell-rate | Lost units | Margin/unit | Lost contribution | Live PDP sessions/day | Recoverable | Restock ETA | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the table with prose.
3. Vetoes/caveats that downgraded any row.
4. What evidence is blocked and what would upgrade a WATCH/FIX to a confident escalation.
```

## Decision rules

- **REFRESH (escalate)** — high lost contribution (clean velocity × days out × margin), restock ETA far out or unknown, and recoverable demand doesn't cover the gap → expedite the PO, source a substitute, or reroute demand to a sibling.
- **FIX** — the inventory number is stale/ambiguous, OR paid spend is still pointing at the dead PDP (pause that ad/feed now, independent of restock).
- **WATCH** — directional only: low or erratic velocity, a tiny number of days out, or a restock landing within ~48h that makes expediting moot.
- **KEEP** — back in stock, fully recovered via siblings, or the loss is immaterial after netting recoverable demand.
- **KILL** — discontinue chasing a chronically OOS SKU with thin velocity and no margin case; stop spending attention (and any ad budget) on it.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** assign a dollar loss to erratic or sub-~1-unit/day SKUs — the sell-rate is too noisy to defend.
- Do **not** double-count demand across a variant group when an in-stock sibling absorbs it.
- Do **not** treat back-in-stock-signup demand as fully lost — it is partially deferred and recovers on restock.
- Do **not** escalate or expedite before checking the incoming-PO ETA; a restock inside ~48h usually beats a rush order.
- Do **not** compute sell-rate over a window that includes the OOS days — it deflates the very number you're measuring.
- Do **not** trigger a restock, expedite, ad pause, or catalog change without explicit human approval.

## Output

A SKU-level table ranked by **lost contribution**, with status and evidence per row:

| SKU | Days OOS | Clean sell-rate | Lost units | Margin/unit | Lost contribution | Live PDP sessions/day | Recoverable | Restock ETA | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Example variant | 3 | 8/day | 24 | $14 | $336 | 180 | sibling absorbs ~40% | 6 days | REFRESH | Merch | 24h |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/ecom-stockout-impact) — it executes this play read-only by default and applies changes only on your approval.
