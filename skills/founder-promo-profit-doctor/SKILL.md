---
name: founder-promo-profit-doctor
description: "When an ecommerce operator needs to decide: Which promotions look good on revenue but weak on profit? Runs the Promo Profit Doctor play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Promo Profit Doctor', 'Commerce', 'Trading Profit'."
license: CC-BY-4.0
metadata:
  persona: Founder / CEO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Promo Profit Doctor

**Operating question:** Which promotions look good on revenue but weak on profit?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Promo definitions** — for each promotion in scope: name/code, mechanic (% off, BOGO, free-shipping threshold, fixed-$ off, bundle), depth, and exact start/end datetimes. Without the window you can't attribute orders.
- **Discounted orders** — per promo: order count, units, gross revenue, and **dollars discounted** (the funded discount, including shipping you ate on free-ship promos).
- **Per-SKU COGS** — landed cost for every SKU that sold under each promo, so contribution is real and not blended. Flag SKUs with no cost as partial.
- **Returns / refunds on discounted units** — refund value and units returned for the discounted orders, ideally with a 2–4 week tail past promo end.
- **New vs. returning split** — share of promo orders from first-time customers vs. existing buyers.
- **Targets** — your contribution-margin floor (e.g. "no promo ships below 20% contribution") and a new-customer-acquisition goal if the promo was meant to recruit, not just sell.

Optional, if available:

- **Full-price baseline for the same SKUs** — units those products sold at full price in the surrounding weeks, to estimate **cannibalisation** (discounting demand that was coming anyway).
- **Shipping & payment-fee deltas** — free-shipping promos and high-AOV bundles move real fulfilment and processing cost.
- **First-order → repeat rate by promo** — a deep discount that recruits one-and-done bargain hunters is worth less than one whose cohort comes back.
- **Inventory context** — a promo run to clear aged or overstocked SKUs can be "correctly" margin-thin and should be judged on sell-through, not contribution alone.
- **Gift-card / store-credit issuance** — refunds taken as credit aren't a clean cash loss and shouldn't be double-counted.

## How to decide — in order

1. **Anchor on revenue, then ignore it.** List the promos ranked by gross revenue first — this is the misleading view everyone already has. You will overturn it; you need it on the page to show the inversion.
2. **Gate on cost coverage.** For each promo, what % of discounted units have real COGS? If under ~80%, mark that promo **FIX** (partial) and do not let it win or lose the ranking on incomplete costs.
3. **Build contribution per promo.** `Contribution = Gross revenue − COGS on units sold − Dollars discounted − Returns (revenue and the COGS you don't recover) − Shipping/fees you funded.` This is the real scorecard.
4. **Subtract cannibalisation.** Estimate units that would have sold at full price anyway (use the full-price baseline). The discount on *those* units is pure given-away margin, not incremental — net it out of the promo's credit.
5. **Read the customer mix.** A contribution-thin promo that recruited a wall of *new* customers may still be a keeper on payback grounds; a contribution-thin promo that mostly couponed loyal full-price buyers is a margin leak wearing a revenue costume → **KILL**.
6. **Re-rank by contribution, name the winner and the impostor.** The top of the contribution chart is what to repeat. The promo that's #1 on revenue but bottom-third on contribution is the one to retire or re-cut. Then apply the vetoes and assign status + owner + recheck.

## The prompt to run

```text
You are my ecommerce profit analyst running the "Promo Profit Doctor" play.

GOAL: rank a set of past promotions by CONTRIBUTION PROFIT, not revenue, and surface
the promos that top the revenue chart but are contribution-negative.

I will paste, per promotion: mechanic and depth, window, units, gross revenue, dollars
discounted, per-SKU COGS (or coverage %), returns on discounted units, new-vs-returning
split, and (if I have it) a full-price baseline for the same SKUs. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If per-SKU COGS / margin
coverage on the discounted items is missing, STOP and return only (a) what's missing and (b) how
to get it — never estimate it or proceed. Without it the contribution ranking is a guess.

RULES:
- Rank by contribution, never by revenue. Always show the revenue rank AND the contribution
  rank side by side so the inversion is visible.
- Contribution = gross revenue - COGS on units sold - dollars discounted - returns (lost
  revenue and unrecovered COGS) - shipping/fees I funded.
- Cost-coverage gate: if a promo has under ~80% of discounted units mapped to real COGS,
  mark it FIX (partial) and do not let incomplete costs decide its rank.
- Subtract cannibalisation: estimate units that would have sold at full price anyway and
  treat the discount on those as given-away margin, not incremental.
- Read the customer mix: distinguish a promo that recruited new customers from one that
  mostly couponed loyal full-price buyers.
- Every row must carry a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read naming the revenue impostor and the real contribution winner.
2. A ranked table using exactly this header row:
   | Promo | Mechanic | Revenue (rank) | Discount $ | Returns $ | New cust % | Contribution $ (rank) | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns, and do not
   replace the table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a FIX/WATCH to a decision.
```

## Decision rules

- **KILL** — contribution-negative (or below your margin floor) on full cost coverage, the discount mostly hit returning full-price buyers, and new-customer recruitment was weak. Retire the mechanic or re-cut it shallower.
- **REFRESH** — contribution-thin but salvageable: same offer at a shallower depth, a higher free-ship threshold, or excluded best-sellers would plausibly clear the floor. The intent is sound; the calibration isn't.
- **WATCH** — directional only: returns tail hasn't fully landed, the new-customer cohort's repeat rate is still unknown, or it was an inventory-clearance promo whose payoff is sell-through, not contribution.
- **KEEP** — at or above the contribution floor on real costs, or contribution-thin *by design* while recruiting genuinely new customers at acceptable payback. Repeat it.
- **FIX** — cost coverage under ~80%, missing discount/returns data, or no way to tell new from returning. Get the data before ranking it.
- Every recommendation carries a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- **Revenue ranking lies — never accept a promo verdict ranked by revenue.** Rank by contribution or don't rank at all.
- Do **not** make a profit claim on a promo with incomplete COGS — label it partial and gate it to FIX.
- Do **not** ignore returns on discounted units; deep-discount and impulse promos return harder, and the refund lands after the revenue is already booked.
- Do **not** credit a promo for cannibalised sales — discounting demand that was already coming is given-away margin, not a win.
- Do **not** judge an inventory-clearance promo purely on contribution; weigh sell-through and freed cash.
- Do **not** issue a new coupon, kill a flow, message customers, or change the calendar without an explicit human approval step.

## Output

A short trading read, then a table ranked by **contribution profit**, not revenue, with the revenue rank shown alongside so the inversion is explicit:

| Promo | Mechanic | Revenue (rank) | Discount $ | Returns $ | New cust % | Contribution $ (rank) | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Example promo | 15% off sitewide | $42k (#2) | $6.3k | $1.1k | 38% | $7.4k (#1) | KEEP | Founder | 30 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
