---
schema_version: 1
slug: "email-replenishment-timing"
title: "Replenishment Timing"
summary: "Replenishment Timing helps ecommerce operators answer: When should replenishment messages be sent by product or category?"
operating_question: "When should replenishment messages be sent by product or category?"
short_title: "Replenishment Timing"
primary_persona: "retention"
personas: ["retention", "merchandising"]
category: "retention-ltv"
platforms: ["commerce", "klaviyo"]
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/email-replenishment-timing"
shopmcp_prompt: "Run the Replenishment Timing play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Replenishment Timing

## Operating Question

**For each consumable product or category, on what day after purchase should the replenishment message fire — and which top consumables have no replenishment flow at all?**

Consumables get used up on a clock. A 4 oz serum, a 30-count supplement, a bag of dog food, a pod of detergent — each has a real-world burn rate, and the customer re-enters the market for it on a predictable schedule whether or not you email them. Get the timing right and you catch them a few days before the jar runs dry, while intent is rising and before a competitor's ad does. Send too early and you train people to ignore the flow; too late and they've already reordered (often somewhere else). This play computes the **median inter-purchase interval** per product or category from your own order history, sets a trigger day a few days *before* typical depletion, and audits which consumables are leaking revenue because no flow exists yet.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your order history, so it cannot compute the one number this play depends on: how many days *your* customers actually wait between reorders of *this* SKU. Ask it cold and it will hand you a category rule of thumb ("supplements: ~30 days") that is often wrong for your specific pack size, dosage, and customer mix. To do it properly you have to:

1. Export the full **line-item order history** for repeat customers (not just order headers — you need product-level reorders).
2. For every customer who bought a product **two or more times**, compute the gap in days between consecutive purchases of that exact SKU.
3. Take the **median** of those gaps per product (and roll up to category), discarding products with too few repeat buyers to trust.
4. Cross-reference against Klaviyo to see which products already have a replenishment flow and which top consumables have none.
5. Estimate the revenue opportunity from each gap and rank.

**The reasoning here is free. The line-item reorder export and the Klaviyo flow cross-reference are the work — and that is exactly what ShopMCP connects.** If your AI assistant has no live link into your store's order history and Klaviyo, that is where the manual run stalls. The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Retention / Email Lead
- **Also useful for:** Merchandising Manager (which consumables deserve a flow), Founder/CEO (where is repeat revenue leaking?)
- Run it **before** building or re-timing replenishment flows in Klaviyo, and whenever a new consumable line matures past ~6 months of order history.

## When To Run It

- **Cadence:** monthly — interval estimates firm up as repeat-purchase volume accumulates.
- **Triggers:** a new consumable SKU has crossed ~50 repeat buyers; a pack-size or formulation change that alters burn rate; replenishment-flow revenue per recipient sliding; an audit before a quarterly lifecycle review.
- **Pre-requisite:** confirm orders carry **clean line-item product data** and that subscription orders are **tagged and separable**. If subscription and one-off purchases are blended, intervals are corrupted before you start.

## Required Evidence

- **Commerce line-item order history** — for the trailing 12 months minimum, every order line with product/variant ID, customer ID, order date, quantity, and net revenue. Twelve months lets a ~60-day interval show up as a clean repeat at least 5–6 times per customer.
- **Repeat-buyer counts per product** — how many distinct customers bought each consumable ≥2 times. This is the trust gate for whether an interval is real.
- **Subscription flag per order/line** — so subscription purchases can be excluded from interval math and from messaging.
- **Klaviyo flow inventory** — which products/categories are wired into an existing replenishment or post-purchase flow, plus that flow's trigger delay, send volume, and attributed revenue per recipient.

## Optional Evidence

- **Product catalogue with consumable vs. durable/seasonal tags** — so the audit ignores one-time and gift purchases.
- **Pack size / unit count / dosage** per SKU — a sanity check: does a 28-day median match a 30-day supply?
- **Variant-level interval split** — a travel size and a full size of the same product deplete on different clocks.
- **Klaviyo deliverability and list-health** for the sending segment — a perfectly timed message still fails if it lands in spam.
- **Contribution margin per product** — to rank the opportunity by profit, not just top-line reorder revenue.

## How To Pull This Evidence

- **Shopify repeat-order history per product/category** — export line-item orders (Admin > Orders, or a Shopify report / the Admin API `orders` endpoint with line items) for the trailing 12 months, then group order lines by customer ID and product/variant ID to isolate customers who bought the same SKU two or more times. Roll SKUs up to category using the product type / collection field.
- **Median days-between-reorder** — for each customer-SKU pair with ≥2 purchases, sort their orders by date and take the day gaps between consecutive same-SKU purchases; collect those gaps per SKU and take the median (plus the 25th/75th percentiles for IQR). Keep only SKUs that clear the repeat-buyer data gate.
- **Existing Klaviyo replenishment flows** — in Klaviyo, list Flows and find any post-purchase / replenishment / "running low" flow; note its trigger filter (which products/categories it targets), its time delay, send volume, and revenue per recipient, so you can match each SKU to a flow or mark it as a gap.
- **Subscription/one-time gotcha** — subscription (recurring) orders sit on a fulfillment clock, not a buying-intent clock, so blending them corrupts the interval and the messaging. Confirm subscription orders carry a tag/source you can filter on (Shopify Subscriptions, Recharge, Bold, etc.) and split them out before computing anything; if they aren't separable, that's a FIX, not a guess.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Gate on data sufficiency.** A product needs **≥30 customers with ≥2 purchases** of that SKU (≥50 is comfortable) before you trust its interval. Below that, mark **WATCH — thin data**, never set a trigger. Don't guess an interval from 4 reorders.
2. **Separate subscriptions out.** Drop all subscription-tagged orders from the interval calculation. Subscribers are already on a fulfillment clock; they must also be **excluded from replenishment messaging** (vetoed below).
3. **Compute the interval per product.** For each qualifying SKU, take the **median** days between consecutive same-SKU purchases, plus the interquartile range (25th–75th percentile). Use median, not mean — a handful of customers who reorder at 6 months will drag a mean badly. Roll products up to category only where per-product samples are thin but the category is coherent.
4. **Set the trigger a few days before depletion.** Trigger day = median interval minus a lead buffer (typically **3–6 days**, wider when the IQR is wide). The goal is to arrive while the jar is nearly empty, not after. Express it as a **window**, not a single calendar day.
5. **Audit the gaps.** List every consumable that clears the data gate but has **no replenishment flow** in Klaviyo. For each, estimate monthly opportunity = (repeat buyers reaching the trigger window per month) x (AOV of that SKU) x (a conservative reactivation lift, e.g. 8–15%).
6. **Rank and assign.** Order by estimated monthly opportunity (or contribution if margin is available), then assign status, trigger window, owner, and recheck date.

## Manual Workflow

1. Export 12 months of **line-item** orders with customer ID, product/variant ID, date, qty, revenue, and the subscription flag.
2. Filter out subscription orders. Keep one-off and prepaid-but-non-recurring purchases.
3. For each customer-SKU pair with ≥2 purchases, compute consecutive gaps in days; collect gaps per SKU.
4. For each SKU with ≥30 qualifying customers, take the **median** gap and the 25th/75th percentiles. Drop SKUs below the gate to a WATCH list.
5. Set each trigger window = median minus a 3–6 day buffer.
6. Pull the Klaviyo flow inventory; flag SKUs with no replenishment flow and estimate monthly opportunity for each.
7. Paste the prompt below with your interval table and flow inventory.
8. Pressure-test against the veto list, then convert survivors into an action packet with trigger window, owner, and recheck date.

## Copy-Paste Prompt

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

## Decision Rules

- **KEEP** — a replenishment flow already fires inside the correct window (median minus 3–6 days) for a SKU that clears the data gate; interval is stable month over month.
- **REFRESH** — a flow exists but its trigger is mistimed (firing well after median depletion, or before the IQR even opens); re-time it to the computed window.
- **WATCH** — thin data (under ~30 repeat buyers for the SKU), a wide IQR that makes any single trigger unreliable, or a recently launched SKU still accumulating reorders. Directional only; do not set a trigger yet.
- **FIX** — line-item product data is missing, subscription orders aren't separable, or the interval can't be computed safely. Resolve the data block before timing anything.
- **KILL** — retire or suppress a replenishment message that is mistimed badly enough to suppress engagement (e.g. firing weeks after customers have already reordered) until it is re-timed.
- The clearest action here is the **gap flag**: a top consumable that clears the data gate with **no flow at all** is the highest-value finding, ranked by estimated monthly opportunity.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do **not** set a trigger for a SKU below the data gate (~30 repeat buyers). Thin data is a WATCH, never a guessed interval.
- Do **not** use the **mean** interval — a long-tail of slow reorderers will mislead the trigger. Median plus IQR only.
- Do **not** collapse a wide-variance cohort onto a single send day. Use a window, and widen it as the IQR widens.
- Do **not** send replenishment prompts to **subscription customers** — they are already on a fulfillment cadence; a "running low?" nudge is noise at best and a churn prompt at worst.
- Do **not** assign a replenishment trigger to durable, seasonal, or one-time products. They don't deplete on a repeat clock.
- Do **not** send a SKU into a replenishment flow if it's out of stock or discontinued — time the message to availability.
- Do **not** push any flow build, re-time, or send without an explicit human approval step.

## Output Contract

A ranked replenishment map: per consumable, the trigger window, whether a flow exists, the revenue opportunity from gaps, and the next check date.

| Product / Category | Median interval | IQR (25th–75th) | Repeat buyers | Trigger window | Existing flow? | Est. monthly opportunity | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Example SKU | 30d | 26–37d | 140 | Day 25–27 | No | $2,400 | FLAG | Email Lead | 30 days |

## Worked Example

> **Executive read:** Three consumables clear the data gate and want action. Ground coffee reorders at a 28-day median, so the trigger should fire at day 24 (currently no flow — roughly $3,100/mo of reorder revenue is unprompted, the single biggest gap). The daily multivitamin reorders at a 60-day median; its existing flow fires at day 45, two weeks early — re-time it to day 54. The protein-powder line is still thin at 22 repeat buyers — leave it on WATCH until it clears 30.

| Product / Category | Median interval | IQR (25th–75th) | Repeat buyers | Trigger window | Existing flow? | Est. monthly opportunity | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Ground coffee – 12oz | 28d | 24–33d | 188 | **Day 24–26** | **No** | **~$3,100** | **FLAG (build)** | Email Lead | 30 days |
| Daily multivitamin – 60ct | 60d | 54–69d | 132 | Day 54–56 | Yes – fires day 45 | ~$900 recovered | **REFRESH (re-time)** | Email Lead | 30 days |
| Dog food – 5kg | 41d | 35–48d | 96 | Day 36–38 | Yes – fires day 38 | on target | **KEEP** | Email Lead | 60 days |
| Protein powder – 1kg | 47d (provisional) | 31–66d | 22 | n/a | No | n/a | **WATCH – thin data** | Email Lead | 30 days |
| Gift candle set | n/a | n/a | n/a | n/a | No | n/a | **Ignore – not consumable** | — | — |

Note how the answer is driven by *your* reorder clock, not a category default: the multivitamin flow wasn't broken, it was firing 9 days too early and burning sends; the coffee gap — a flow that simply doesn't exist — is worth more than every re-timing combined.

## Common Failure Modes

- Using a category rule of thumb instead of the SKU's own median interval.
- Setting a trigger off a mean dragged up by a few slow reorderers, or off 4–5 reorders total.
- Firing a single calendar-day trigger when the IQR spans three weeks — half the audience is messaged at the wrong time.
- Sending replenishment nudges to subscribers who are already auto-shipped.
- Triggering on durable or gift purchases that never repeat.
- Building a flow for a SKU that's out of stock, so the click lands on a sold-out page.

## Run This Play With Live Data

**Manual version:** export 12 months of line-item orders, compute per-customer-per-SKU reorder gaps, take medians and IQRs, gate on repeat-buyer counts, then cross-reference Klaviyo to find the flow gaps — a multi-hour spreadsheet job each month.

**ShopMCP version:** connect your store and Klaviyo once. Ask the question; ShopMCP pulls live line-item order history, computes the median inter-purchase interval and IQR per SKU, applies the repeat-buyer data gate, excludes subscription orders, cross-references your existing Klaviyo flows, and returns the ranked trigger-window map with the no-flow gaps costed out. It stays **read-only** until you explicitly approve a flow build or re-time.

> No store or Klaviyo connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of a spreadsheet afternoon.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Replenishment Timing play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual line-item exports and stale CSVs.
- Computing per-customer-per-SKU reorder gaps and medians by hand.
- Copy-pasting between your store's order history and Klaviyo's flow inventory.
- Rebuilding the same interval-and-gap analysis every month.
