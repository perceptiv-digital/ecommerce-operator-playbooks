---
name: email-replenishment-timing
description: "When an ecommerce operator needs to decide: When should replenishment messages be sent by product or category? Runs the Replenishment Timing play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Replenishment Timing', 'Commerce', 'Klaviyo', 'Retention Ltv'."
license: CC-BY-4.0
metadata:
  persona: Retention / Email Lead
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Replenishment Timing

**Operating question:** When should replenishment messages be sent by product or category?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce line-item order history** — for the trailing 12 months minimum, every order line with product/variant ID, customer ID, order date, quantity, and net revenue. Twelve months lets a ~60-day interval show up as a clean repeat at least 5–6 times per customer.
- **Repeat-buyer counts per product** — how many distinct customers bought each consumable ≥2 times. This is the trust gate for whether an interval is real.
- **Subscription flag per order/line** — so subscription purchases can be excluded from interval math and from messaging.
- **Klaviyo flow inventory** — which products/categories are wired into an existing replenishment or post-purchase flow, plus that flow's trigger delay, send volume, and attributed revenue per recipient.

Optional, if available:

- **Product catalogue with consumable vs. durable/seasonal tags** — so the audit ignores one-time and gift purchases.
- **Pack size / unit count / dosage** per SKU — a sanity check: does a 28-day median match a 30-day supply?
- **Variant-level interval split** — a travel size and a full size of the same product deplete on different clocks.
- **Klaviyo deliverability and list-health** for the sending segment — a perfectly timed message still fails if it lands in spam.
- **Contribution margin per product** — to rank the opportunity by profit, not just top-line reorder revenue.

## How to decide — in order

1. **Gate on data sufficiency.** A product needs **≥30 customers with ≥2 purchases** of that SKU (≥50 is comfortable) before you trust its interval. Below that, mark **WATCH — thin data**, never set a trigger. Don't guess an interval from 4 reorders.
2. **Separate subscriptions out.** Drop all subscription-tagged orders from the interval calculation. Subscribers are already on a fulfillment clock; they must also be **excluded from replenishment messaging** (vetoed below).
3. **Compute the interval per product.** For each qualifying SKU, take the **median** days between consecutive same-SKU purchases, plus the interquartile range (25th–75th percentile). Use median, not mean — a handful of customers who reorder at 6 months will drag a mean badly. Roll products up to category only where per-product samples are thin but the category is coherent.
4. **Set the trigger a few days before depletion.** Trigger day = median interval minus a lead buffer (typically **3–6 days**, wider when the IQR is wide). The goal is to arrive while the jar is nearly empty, not after. Express it as a **window**, not a single calendar day.
5. **Audit the gaps.** List every consumable that clears the data gate but has **no replenishment flow** in Klaviyo. For each, estimate monthly opportunity = (repeat buyers reaching the trigger window per month) x (AOV of that SKU) x (a conservative reactivation lift, e.g. 8–15%).
6. **Rank and assign.** Order by estimated monthly opportunity (or contribution if margin is available), then assign status, trigger window, owner, and recheck date.

## The prompt to run

```text
You are my retention/lifecycle analyst running the "Replenishment Timing" play.

GOAL: for each consumable product or category, set the day-after-purchase trigger window
for a replenishment message, and flag top consumables that have NO replenishment flow,
ranked by estimated monthly revenue opportunity.

I will paste: a per-SKU table of median days-between-reorder with repeat-buyer counts and
the 25th/75th percentiles, my Klaviyo flow inventory (which SKUs have a replenishment flow
and its current delay), AOV per SKU, and optionally contribution margin. Some data may be
missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If enough
repeat-purchase history per consumable product to compute a reliable median inter-purchase
interval (>=30 distinct customers who bought the SKU >=2 times) is missing, STOP and return
only (a) what's missing and (b) how to get it — never estimate it or proceed.

RULES:
- Data gate first: only set a trigger for a SKU with >=30 distinct customers who bought it
  >=2 times. Below that, mark WATCH - thin data, and do NOT invent an interval.
- Use the MEDIAN interval, never the mean. Report the interquartile range so I can see
  cohort spread. Express the trigger as a WINDOW (e.g. day 24-26), not a single day.
- Trigger day = median interval minus a 3-6 day lead buffer; widen the buffer when the IQR
  is wide.
- Exclude subscription customers from interval math AND from messaging.
- Durable, seasonal, or one-time products do not replenish - mark them KEEP/ignore, never
  assign a trigger.
- For SKUs with no existing flow, estimate monthly opportunity = (repeat buyers hitting the
  window per month) x (AOV) x (conservative reactivation lift). State the lift you assumed.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked table using exactly this header row:
   | Product / Category | Median interval | IQR (25th–75th) | Repeat buyers | Trigger window | Existing flow? | Est. monthly opportunity | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH to a decision.
```

## Decision rules

- **KEEP** — a replenishment flow already fires inside the correct window (median minus 3–6 days) for a SKU that clears the data gate; interval is stable month over month.
- **REFRESH** — a flow exists but its trigger is mistimed (firing well after median depletion, or before the IQR even opens); re-time it to the computed window.
- **WATCH** — thin data (under ~30 repeat buyers for the SKU), a wide IQR that makes any single trigger unreliable, or a recently launched SKU still accumulating reorders. Directional only; do not set a trigger yet.
- **FIX** — line-item product data is missing, subscription orders aren't separable, or the interval can't be computed safely. Resolve the data block before timing anything.
- **KILL** — retire or suppress a replenishment message that is mistimed badly enough to suppress engagement (e.g. firing weeks after customers have already reordered) until it is re-timed.
- The clearest action here is the **gap flag**: a top consumable that clears the data gate with **no flow at all** is the highest-value finding, ranked by estimated monthly opportunity.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** set a trigger for a SKU below the data gate (~30 repeat buyers). Thin data is a WATCH, never a guessed interval.
- Do **not** use the **mean** interval — a long-tail of slow reorderers will mislead the trigger. Median plus IQR only.
- Do **not** collapse a wide-variance cohort onto a single send day. Use a window, and widen it as the IQR widens.
- Do **not** send replenishment prompts to **subscription customers** — they are already on a fulfillment cadence; a "running low?" nudge is noise at best and a churn prompt at worst.
- Do **not** assign a replenishment trigger to durable, seasonal, or one-time products. They don't deplete on a repeat clock.
- Do **not** send a SKU into a replenishment flow if it's out of stock or discontinued — time the message to availability.
- Do **not** push any flow build, re-time, or send without an explicit human approval step.

## Output

A ranked replenishment map: per consumable, the trigger window, whether a flow exists, the revenue opportunity from gaps, and the next check date.

| Product / Category | Median interval | IQR (25th–75th) | Repeat buyers | Trigger window | Existing flow? | Est. monthly opportunity | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Example SKU | 30d | 26–37d | 140 | Day 25–27 | No | $2,400 | FLAG | Email Lead | 30 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
