---
name: founder-yoy-pulse
description: "When an ecommerce operator needs to decide: What is materially different versus the same period last year? Runs the Year-over-Year Pulse play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Year-over-Year Pulse', 'Commerce', 'Trading Profit'."
license: CC-BY-4.0
metadata:
  persona: Founder / CEO
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Year-over-Year Pulse

**Operating question:** What is materially different versus the same period last year?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Revenue (net)** — this period and the same period last year, net of refunds and returns, from commerce orders.
- **Orders** — count for both windows, so you can decompose revenue into orders × AOV.
- **AOV** — average order value for both windows (revenue ÷ orders); the metric that tells you whether growth is volume or value.
- **New-vs-returning mix** — share of orders (or revenue) from new vs. returning customers, both windows. Returning-customer rate is the leading indicator of retention health.
- **Gross margin** — contribution or gross margin % for both windows, from COGS; required to tell profitable growth from discount-funded growth.
- **Discount dependence** — discount/promo dollars as a share of gross revenue, both windows.
- **The comparable window definition** — the explicit calendar alignment you used (e.g. ISO week 25 this year vs. ISO week 25 last year), so the comparison is reproducible.

Optional, if available:

- **Promo calendar (both years)** — which promos ran in each window; the only way to know if a "decline" is just a holiday that shifted weeks (Easter, BFCM, EOFY).
- **Store-growth context** — SKU count, ad spend, and sessions YoY, to separate "the business is bigger" from "each unit of the business is healthier."
- **Price-change log** — list-price increases since last year, to split real growth from inflation (more dollars per unit vs. more units).
- **Stock / availability** — out-of-stocks in either window that suppressed orders and distort the comparison.
- **Channel and geo mix** — a shift into a lower-AOV channel or market explains an AOV drop without anything being "wrong."

## How to decide — in order

1. **Lock the comparable window.** Confirm this year vs. last year are the same calendar position with matched promo presence. If a promo landed in one window and not the other, you cannot compare them rationally → realign the window or mark the read **FIX** and stop.
2. **Decompose revenue, never read it raw.** Revenue = Orders × AOV. Always split the YoY revenue move into its order and AOV components before saying anything. "Revenue +12%" means nothing until you know it's +28% orders and −12% AOV.
3. **Test for discount-funded growth.** Cross-check the orders/AOV split against **discount share** and **margin**. Orders up while AOV down, discount share up, and margin down is the classic signature of growth you bought rather than earned → **WATCH/REFRESH**, not a victory lap.
4. **Read the retention tell.** Compare returning-customer rate YoY. A falling returning-customer rate while new orders climb means you are renting growth from acquisition and leaking the base that funds margin — flag even if total revenue looks fine.
5. **Strip the noise.** Net out store growth (more SKUs/spend/traffic), inflation (price increases ≠ unit growth), and stock distortions before attributing the change to demand or health.
6. **Name the pattern and assign status.** Classify the period as healthy growth, discount-funded growth, margin compression, retention erosion, or genuine softness — then apply the vetoes and assign a status with owner and recheck date.

## The prompt to run

```text
You are my ecommerce trading analyst running the "Year-over-Year Pulse" play.

GOAL: tell me what is materially different versus the SAME comparable calendar window
last year, and whether the change is healthy growth or structural erosion. Do not
celebrate a revenue number until you have decomposed it.

I will paste two columns of data: THIS period and the comparable window LAST YEAR, for
net revenue, orders, AOV, new-vs-returning mix, gross margin %, and discount share of
revenue. I will also note any promos, price changes, stockouts, or store-growth context.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If order-level
commerce data for the same comparable calendar window last year is missing, STOP and
return only (a) what's missing and (b) how to get it — never estimate it or proceed.

RULES:
- Confirm the two windows are the same calendar position with matched promo presence.
  If a promo or holiday landed in only one window, say the comparison is unsafe and stop.
- Never read revenue raw. Decompose every revenue move into Orders x AOV first.
- Test for discount-funded growth: orders up + AOV down + discount share up + margin down
  is bought growth, not earned growth. Call it.
- Compare returning-customer rate YoY as the retention tell, even when revenue looks fine.
- Separate real growth from store growth (more SKUs/spend), inflation (price up != units up),
  and stock distortions.
- Every line must carry a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 2-3 sentence executive trading read.
2. A YoY table using exactly this header row:
   | Metric | This period | Same window LY | YoY delta | Read |
   |---|---|---|---|---|
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns,
   and do not replace the table with prose.
3. The single most important pattern (healthy growth / discount-funded / margin
   compression / retention erosion / genuine softness) with the evidence behind it.
4. Vetoes or caveats that downgrade confidence.
5. Next actions with owner, timing, and recheck date.
```

## Decision rules

- **KEEP** — orders and AOV both up (or AOV flat) with margin held and discount share stable; growth is earned. Protect what's working and document why.
- **WATCH** — a directional softening (returning-customer rate slipping, AOV easing) that is real but inside one noisy week; needs a second clean window before action.
- **REFRESH** — growth is real but unhealthy: discount-funded, margin compressing, or retention eroding. The demand exists, but the mechanics need fixing (offer architecture, full-price mix, lifecycle/retention).
- **KILL** — a structurally unprofitable pattern with a clear cause and enough sample to act (e.g. a promo mechanic that reliably destroys margin every time it runs); retire the mechanic, not the channel.
- **FIX** — the comparison itself is unsafe: mismatched windows, missing margin/COGS, or a stockout-polluted period. Repair the evidence before making any commercial call.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- **Never compare across a shifted promo calendar.** If Easter, BFCM, EOFY, or any promo landed in different weeks across the two years, realign to a comparable window first — a calendar artifact masquerading as a trend is the cardinal sin of this play.
- **Never read one week of YoY as a trend.** A single week is noisy; confirm the direction across the rolling 4-week or 13-week YoY before you act on it.
- **Never call revenue growth "healthy" without separating it from inflation and discounting.** More dollars per order can be a price rise, not more value; more orders can be bought with margin.
- **Never make a margin claim without COGS coverage** — label it partial-profit if cost data is incomplete.
- **Never read an AOV or mix shift as decline** if it's explained by a deliberate move into a lower-AOV channel, market, or product tier.
- **Never trigger writes, budget shifts, promo changes, or customer messaging** off this read without an explicit human approval step.

## Output

A short trading read, a YoY metric table, the dominant pattern, the confidence level, and the next action.

Minimum table columns:

| Metric | This period | Same window LY | YoY delta | Read |
|---|---|---|---|---|
| Net revenue | $612k | $547k | +12% | Up — but decompose before judging |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
