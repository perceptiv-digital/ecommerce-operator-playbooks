---
schema_version: 1
slug: "founder-promo-profit-doctor"
title: "Promo Profit Doctor"
summary: "Promo Profit Doctor helps ecommerce operators answer: Which promotions look good on revenue but weak on profit?"
operating_question: "Which promotions look good on revenue but weak on profit?"
short_title: "Promo Profit Doctor"
primary_persona: "founder"
personas: ["founder", "ecommerce", "marketing"]
category: "trading-profit"
platforms: ["commerce"]
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/founder-promo-profit-doctor"
shopmcp_prompt: "Run the Promo Profit Doctor play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Promo Profit Doctor

## Operating Question

**Which of last quarter's promotions topped the revenue chart but actually destroyed contribution profit — and which quiet one was the real winner?**

Every promo looks like a hero on the revenue dashboard, because revenue is the one number a discount is guaranteed to move. But a promotion is a deliberate decision to *give away margin* to buy volume, and the only honest scorecard is **contribution profit per promo** — revenue, minus COGS on what sold, minus the discount you funded, minus returns on discounted units, minus the margin you cannibalised by discounting buyers who would have paid full price. This play re-ranks a set of past promotions by contribution and surfaces the ones that are revenue-famous and profit-broke, so next quarter's calendar repeats the winners instead of the loud losers.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Shopify discount report, your order-level COGS, or your returns by SKU — so it cannot tell a profitable promo from a flattering one. To run this manually you have to:

1. Export the **discount/price-rule report** for the window (orders, units, and dollars discounted per promo code or automatic discount).
2. Join those orders to **per-SKU COGS** so each discounted unit carries a real cost, not a blended guess.
3. Pull **returns/refunds** filtered to the discounted orders — promos with deep discounts and impulse buys return harder, and the refund lands weeks after the revenue.
4. Tag each order **new vs. returning** and estimate how much of the "lift" was just loyal full-price buyers taking a coupon they didn't need.

**The thinking in this playbook is free. The data access is the hard part — joining discounts, COGS, and returns at the order line is exactly what ShopMCP connects.** If your AI assistant has no live line into your store's orders, discounts, and cost data, that join is where manual runs stop. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Founder / CEO — you own the margin, so you own the promo calendar.
- **Also useful for:** Head of Ecommerce (which mechanics to repeat), Head of Retention/Email (which offers to send), Finance (true cost of the discount line).
- Run it **before** you lock next quarter's promo calendar, or whenever revenue is up but contribution margin is flat or down.

## When To Run It

- **Cadence:** monthly — review the trailing 30–90 days once returns on the most recent promos have had time to land.
- **Triggers:** a "record revenue" month that didn't lift profit; a new discount mechanic you want to judge before repeating; planning BFCM, EOFY, or a seasonal sale; a board/investor question about discount discipline.
- **Pre-requisite:** confirm **COGS coverage** for the SKUs in scope first. A promo ranking with half its costs missing is worse than no ranking — it will rank by revenue in disguise. Label any partial-cost promo explicitly.

## Required Evidence

- **Promo definitions** — for each promotion in scope: name/code, mechanic (% off, BOGO, free-shipping threshold, fixed-$ off, bundle), depth, and exact start/end datetimes. Without the window you can't attribute orders.
- **Discounted orders** — per promo: order count, units, gross revenue, and **dollars discounted** (the funded discount, including shipping you ate on free-ship promos).
- **Per-SKU COGS** — landed cost for every SKU that sold under each promo, so contribution is real and not blended. Flag SKUs with no cost as partial.
- **Returns / refunds on discounted units** — refund value and units returned for the discounted orders, ideally with a 2–4 week tail past promo end.
- **New vs. returning split** — share of promo orders from first-time customers vs. existing buyers.
- **Targets** — your contribution-margin floor (e.g. "no promo ships below 20% contribution") and a new-customer-acquisition goal if the promo was meant to recruit, not just sell.

## Optional Evidence

- **Full-price baseline for the same SKUs** — units those products sold at full price in the surrounding weeks, to estimate **cannibalisation** (discounting demand that was coming anyway).
- **Shipping & payment-fee deltas** — free-shipping promos and high-AOV bundles move real fulfilment and processing cost.
- **First-order → repeat rate by promo** — a deep discount that recruits one-and-done bargain hunters is worth less than one whose cohort comes back.
- **Inventory context** — a promo run to clear aged or overstocked SKUs can be "correctly" margin-thin and should be judged on sell-through, not contribution alone.
- **Gift-card / store-credit issuance** — refunds taken as credit aren't a clean cash loss and shouldn't be double-counted.

## How To Pull This Evidence

- **Per-promo revenue, discount $, and units** — Shopify admin → Analytics → Reports → "Discounts" (or "Sales by discount"); set the date range to each promo's exact window and read orders, units, gross sales, and discount amount per code. Export to CSV.
- **Automatic discounts and free-shipping promos** — these don't always surface in the code-level Discounts report; cross-check Reports → "Sales by discount" and pull absorbed shipping from the "Shipping" line or order export, since free-ship cost is funded discount too.
- **Per-SKU COGS** — Shopify stores landed cost under each variant's "Cost per item"; export Products (or the Inventory cost report) and join on SKU. Gotcha: blank "Cost per item" reads as $0, silently inflating contribution — treat blanks as missing, not zero.
- **Returns on discounted items** — Reports → "Returns" / refunds, filtered to the discounted order IDs from step one; pull units and refund value, and run it 2–4 weeks past promo end so the late-return tail is captured.
- **New vs. returning split** — Shopify tags each order's customer as first-time or returning; segment the discounted orders on that flag to size how much discount went to loyal full-price buyers.
- **Gotcha — windows and time zones** — match the report window to the promo's exact start/end datetime in the store's time zone; an off-by-a-day boundary pulls orders that never touched the promo.
- Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Anchor on revenue, then ignore it.** List the promos ranked by gross revenue first — this is the misleading view everyone already has. You will overturn it; you need it on the page to show the inversion.
2. **Gate on cost coverage.** For each promo, what % of discounted units have real COGS? If under ~80%, mark that promo **FIX** (partial) and do not let it win or lose the ranking on incomplete costs.
3. **Build contribution per promo.** `Contribution = Gross revenue − COGS on units sold − Dollars discounted − Returns (revenue and the COGS you don't recover) − Shipping/fees you funded.` This is the real scorecard.
4. **Subtract cannibalisation.** Estimate units that would have sold at full price anyway (use the full-price baseline). The discount on *those* units is pure given-away margin, not incremental — net it out of the promo's credit.
5. **Read the customer mix.** A contribution-thin promo that recruited a wall of *new* customers may still be a keeper on payback grounds; a contribution-thin promo that mostly couponed loyal full-price buyers is a margin leak wearing a revenue costume → **KILL**.
6. **Re-rank by contribution, name the winner and the impostor.** The top of the contribution chart is what to repeat. The promo that's #1 on revenue but bottom-third on contribution is the one to retire or re-cut. Then apply the vetoes and assign status + owner + recheck.

## Manual Workflow

1. List the promotions in scope for the window and pull each one's definition (mechanic, depth, exact dates).
2. Export discounted orders per promo: units, gross revenue, dollars discounted, plus the free-shipping cost you absorbed.
3. Join orders to per-SKU COGS; compute the cost-coverage % per promo and flag partials.
4. Pull returns on those discounted orders with a 2–4 week tail; subtract both lost revenue and unrecovered COGS.
5. Tag new vs. returning and, where you have a baseline, estimate cannibalised full-price units.
6. Compute contribution per promo, paste the prompt below with your tables, then pressure-test every KILL/KEEP against the vetoes and convert survivors into an action packet with owner and recheck date.

## Copy-Paste Prompt

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

## Decision Rules

- **KILL** — contribution-negative (or below your margin floor) on full cost coverage, the discount mostly hit returning full-price buyers, and new-customer recruitment was weak. Retire the mechanic or re-cut it shallower.
- **REFRESH** — contribution-thin but salvageable: same offer at a shallower depth, a higher free-ship threshold, or excluded best-sellers would plausibly clear the floor. The intent is sound; the calibration isn't.
- **WATCH** — directional only: returns tail hasn't fully landed, the new-customer cohort's repeat rate is still unknown, or it was an inventory-clearance promo whose payoff is sell-through, not contribution.
- **KEEP** — at or above the contribution floor on real costs, or contribution-thin *by design* while recruiting genuinely new customers at acceptable payback. Repeat it.
- **FIX** — cost coverage under ~80%, missing discount/returns data, or no way to tell new from returning. Get the data before ranking it.
- Every recommendation carries a **number, source, time window, and confidence level**.

## Veto Rules

- **Revenue ranking lies — never accept a promo verdict ranked by revenue.** Rank by contribution or don't rank at all.
- Do **not** make a profit claim on a promo with incomplete COGS — label it partial and gate it to FIX.
- Do **not** ignore returns on discounted units; deep-discount and impulse promos return harder, and the refund lands after the revenue is already booked.
- Do **not** credit a promo for cannibalised sales — discounting demand that was already coming is given-away margin, not a win.
- Do **not** judge an inventory-clearance promo purely on contribution; weigh sell-through and freed cash.
- Do **not** issue a new coupon, kill a flow, message customers, or change the calendar without an explicit human approval step.

## Output Contract

A short trading read, then a table ranked by **contribution profit**, not revenue, with the revenue rank shown alongside so the inversion is explicit:

| Promo | Mechanic | Revenue (rank) | Discount $ | Returns $ | New cust % | Contribution $ (rank) | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Example promo | 15% off sitewide | $42k (#2) | $6.3k | $1.1k | 38% | $7.4k (#1) | KEEP | Founder | 30 days |

## Worked Example

> **Executive read:** The sitewide BOGO was the quarter's #1 promo on revenue ($88.4k) and dead last on profit — after COGS, the funded discount, and a brutal 14% return rate it landed at **−$3.2k contribution**, and 71% of its orders were existing full-price buyers, so most of that discount was margin we handed to people already buying. The real winner was the **free-shipping-at-$75 threshold**, which was only #3 on revenue but **#1 on contribution at +$9.6k** because it lifted AOV from $58 to $81 without cutting product price. Retire the BOGO, repeat and widen the free-ship threshold, and re-cut the 30%-off clearance shallower next time.

| Promo | Mechanic | Revenue (rank) | Discount $ | Returns $ | New cust % | Contribution $ (rank) | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Spring BOGO | Buy-one-get-one sitewide | $88,400 (#1) | $31,200 | $12,400 (14%) | 29% | **−$3,200 (#5)** | **KILL** | Founder | Now |
| Free ship over $75 | Free-shipping threshold | $54,100 (#3) | $4,800 (ship) | $1,600 | 41% | **+$9,600 (#1)** | **KEEP** | Founder + Ecom | 30 days |
| 30% off clearance | % off aged SKUs | $61,700 (#2) | $18,500 | $2,200 | 18% | +$2,100 (#3) | **REFRESH** | Ecom | 14 days |
| New-customer 15% | First-order code | $22,300 (#4) | $3,300 | $700 | 94% | +$3,900 (#2) | **KEEP** | Retention | 30 days |
| Bundle & save | 3-for-2 bundle | $19,800 (#5) | $5,900 | partial COGS | 33% | unsafe | **FIX** | Ecom + Finance | Now |

Note how the answer *inverts* the revenue chart: the #1 revenue promo (BOGO) is the worst on profit and mostly discounted loyal buyers, while the #3 revenue promo (free-ship threshold) is the true contribution winner because it bought AOV instead of buying volume with margin. The bundle can't be ranked at all until its COGS coverage is fixed.

## Common Failure Modes

- Ranking promos by revenue (or by platform-reported sales) and calling the loudest one a winner.
- Booking the revenue on promo day and never subtracting the returns that land three weeks later.
- Using blended margin instead of per-SKU COGS, so a deep discount on a low-margin hero looks survivable.
- Crediting a promo for sales that would have happened at full price anyway (cannibalisation).
- Judging an acquisition promo on contribution alone, or a clearance promo on contribution alone, when each has a different job.

## Run This Play With Live Data

**Manual version:** export the discount report, join orders to per-SKU COGS, pull returns on the discounted orders, tag new vs. returning, estimate cannibalisation, and rebuild the contribution math by hand — every month.

**ShopMCP version:** connect your store once. Ask the question; ShopMCP pulls live discounted orders, real per-SKU COGS, and returns on those orders, runs the cost-coverage gate, computes contribution per promo, and returns the contribution-ranked table with the revenue rank shown alongside so the inversion is obvious. It stays **read-only** until you explicitly approve any change to the calendar or a discount.

> No store, discount, or COGS connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of a month-end spreadsheet join.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Promo Profit Doctor play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual discount, order, COGS, and returns exports.
- The order-level join across discounts, costs, and refunds that breaks in spreadsheets.
- Guessing which promos have enough cost coverage to rank safely.
- Rebuilding the same contribution math every month-end.
