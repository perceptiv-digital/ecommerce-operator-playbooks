---
schema_version: 1
slug: "founder-yoy-pulse"
title: "Year-over-Year Pulse"
summary: "Year-over-Year Pulse helps ecommerce operators answer: What is materially different versus the same period last year?"
operating_question: "What is materially different versus the same period last year?"
short_title: "Year-over-Year Pulse"
primary_persona: "founder"
personas: ["founder"]
category: "trading-profit"
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/founder-yoy-pulse"
shopmcp_prompt: "Run the Year-over-Year Pulse play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Year-over-Year Pulse

## Operating Question

**What is materially different versus the same period last year — and is the change healthy growth or structural erosion hiding behind a green top line?**

Once a week, the founder needs one honest read on the business: not "are we up," but "up *how*, and is it the kind of up that survives." Revenue alone lies. A store can post a record YoY number while quietly getting less valuable per order, leaning harder on discounts, and bleeding the returning customers that fund its margin. This play compares the same calendar window against last year across **revenue, orders, AOV, new-vs-returning mix, gross margin, and discount dependence**, controls for store growth and seasonality, and forces a call on whether the trajectory is something to protect, push, or quietly worry about.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your Shopify, Woo, or BigCommerce orders, and YoY is brutally unforgiving of sloppy windows. To do this by hand you have to:

1. Pull this year's orders for the period **and** last year's matching window — by **comparable calendar position**, not raw date range (last year's week 25 may have started on a different Monday).
2. Recompute AOV, new-vs-returning split, and discount share for both periods from order-level data, because dashboards rarely break these out YoY in one view.
3. Bolt on **gross margin** from COGS the store doesn't store next to revenue.
4. Subtract the noise — store growth (more SKUs, more spend, more traffic), inflation (higher prices ≠ more units), and any promo that landed in one year's window but not the other's.

**The reasoning here is free — the data assembly is the tax, and it's the same tax every single week.** That assembly, against live order-level data with margin attached, is exactly what ShopMCP removes. The closing section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Founder / CEO — this is the founder's weekly gut-check on the health of the business.
- **Also useful for:** Head of Ecommerce / Trading (translates the read into merchandising and budget moves), Finance (margin and discount trend feed the forecast).
- Run it **before** the Monday trading stand-up, and **before** you let a strong-looking revenue number talk you into more spend or more discounting.

## When To Run It

- **Cadence:** weekly — Monday morning, on a closed prior week so order, refund, and discount data have settled.
- **Triggers:** revenue diverging from plan in either direction, a discount-heavy week, a returning-customer rate that feels soft, or any week before you commit a budget step-up off "we're growing."
- **Pre-requisite:** confirm last year's comparison window is the **same calendar position** (same weekday alignment, same promo presence), not just "this date minus 365 days." A mis-aligned window is the single most common way this play lies to you.

## Required Evidence

- **Revenue (net)** — this period and the same period last year, net of refunds and returns, from commerce orders.
- **Orders** — count for both windows, so you can decompose revenue into orders × AOV.
- **AOV** — average order value for both windows (revenue ÷ orders); the metric that tells you whether growth is volume or value.
- **New-vs-returning mix** — share of orders (or revenue) from new vs. returning customers, both windows. Returning-customer rate is the leading indicator of retention health.
- **Gross margin** — contribution or gross margin % for both windows, from COGS; required to tell profitable growth from discount-funded growth.
- **Discount dependence** — discount/promo dollars as a share of gross revenue, both windows.
- **The comparable window definition** — the explicit calendar alignment you used (e.g. ISO week 25 this year vs. ISO week 25 last year), so the comparison is reproducible.

## Optional Evidence

- **Promo calendar (both years)** — which promos ran in each window; the only way to know if a "decline" is just a holiday that shifted weeks (Easter, BFCM, EOFY).
- **Store-growth context** — SKU count, ad spend, and sessions YoY, to separate "the business is bigger" from "each unit of the business is healthier."
- **Price-change log** — list-price increases since last year, to split real growth from inflation (more dollars per unit vs. more units).
- **Stock / availability** — out-of-stocks in either window that suppressed orders and distort the comparison.
- **Channel and geo mix** — a shift into a lower-AOV channel or market explains an AOV drop without anything being "wrong."

## The Decision Logic (run in this order)

1. **Lock the comparable window.** Confirm this year vs. last year are the same calendar position with matched promo presence. If a promo landed in one window and not the other, you cannot compare them rationally → realign the window or mark the read **FIX** and stop.
2. **Decompose revenue, never read it raw.** Revenue = Orders × AOV. Always split the YoY revenue move into its order and AOV components before saying anything. "Revenue +12%" means nothing until you know it's +28% orders and −12% AOV.
3. **Test for discount-funded growth.** Cross-check the orders/AOV split against **discount share** and **margin**. Orders up while AOV down, discount share up, and margin down is the classic signature of growth you bought rather than earned → **WATCH/REFRESH**, not a victory lap.
4. **Read the retention tell.** Compare returning-customer rate YoY. A falling returning-customer rate while new orders climb means you are renting growth from acquisition and leaking the base that funds margin — flag even if total revenue looks fine.
5. **Strip the noise.** Net out store growth (more SKUs/spend/traffic), inflation (price increases ≠ unit growth), and stock distortions before attributing the change to demand or health.
6. **Name the pattern and assign status.** Classify the period as healthy growth, discount-funded growth, margin compression, retention erosion, or genuine softness — then apply the vetoes and assign a status with owner and recheck date.

## Manual Workflow

1. Define this period's window and the **comparable** prior-year window (same calendar position, matched promos). Write both date ranges down explicitly.
2. Pull net revenue, orders, AOV, new-vs-returning split, gross margin, and discount share for **both** windows from order-level commerce data.
3. Decompose the revenue move into Orders × AOV; compute the YoY delta for every metric.
4. Overlay discount share and margin to test whether any growth is discount-funded; compare returning-customer rate YoY.
5. Annotate noise: store growth, price increases, stockouts, channel/geo mix shifts.
6. Paste the prompt below with your two-period table.
7. Pressure-test the read against the vetoes, then turn it into an action packet with owner, timing, and recheck date.

## Copy-Paste Prompt

```text
You are my ecommerce trading analyst running the "Year-over-Year Pulse" play.

GOAL: tell me what is materially different versus the SAME comparable calendar window
last year, and whether the change is healthy growth or structural erosion. Do not
celebrate a revenue number until you have decomposed it.

I will paste two columns of data: THIS period and the comparable window LAST YEAR, for
net revenue, orders, AOV, new-vs-returning mix, gross margin %, and discount share of
revenue. I will also note any promos, price changes, stockouts, or store-growth context.

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
2. A YoY table: Metric | This period | Same window LY | YoY delta | Read.
3. The single most important pattern (healthy growth / discount-funded / margin
   compression / retention erosion / genuine softness) with the evidence behind it.
4. Vetoes or caveats that downgrade confidence.
5. Next actions with owner, timing, and recheck date.
```

## Decision Rules

- **KEEP** — orders and AOV both up (or AOV flat) with margin held and discount share stable; growth is earned. Protect what's working and document why.
- **WATCH** — a directional softening (returning-customer rate slipping, AOV easing) that is real but inside one noisy week; needs a second clean window before action.
- **REFRESH** — growth is real but unhealthy: discount-funded, margin compressing, or retention eroding. The demand exists, but the mechanics need fixing (offer architecture, full-price mix, lifecycle/retention).
- **KILL** — a structurally unprofitable pattern with a clear cause and enough sample to act (e.g. a promo mechanic that reliably destroys margin every time it runs); retire the mechanic, not the channel.
- **FIX** — the comparison itself is unsafe: mismatched windows, missing margin/COGS, or a stockout-polluted period. Repair the evidence before making any commercial call.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- **Never compare across a shifted promo calendar.** If Easter, BFCM, EOFY, or any promo landed in different weeks across the two years, realign to a comparable window first — a calendar artifact masquerading as a trend is the cardinal sin of this play.
- **Never read one week of YoY as a trend.** A single week is noisy; confirm the direction across the rolling 4-week or 13-week YoY before you act on it.
- **Never call revenue growth "healthy" without separating it from inflation and discounting.** More dollars per order can be a price rise, not more value; more orders can be bought with margin.
- **Never make a margin claim without COGS coverage** — label it partial-profit if cost data is incomplete.
- **Never read an AOV or mix shift as decline** if it's explained by a deliberate move into a lower-AOV channel, market, or product tier.
- **Never trigger writes, budget shifts, promo changes, or customer messaging** off this read without an explicit human approval step.

## Output Contract

A short trading read, a YoY metric table, the dominant pattern, the confidence level, and the next action.

Minimum table columns:

| Metric | This period | Same window LY | YoY delta | Read |
|---|---|---|---|---|
| Net revenue | $612k | $547k | +12% | Up — but decompose before judging |

## Worked Example

> **Executive read:** Revenue is up 12% YoY, but it is entirely volume: orders are up 28% while AOV fell 12%, so each order is worth less. Underneath, the returning-customer rate slid from 34% to 29% and discount share of revenue jumped from 14% to 23% — this is discount-funded, acquisition-led growth with margin compressing, not a healthy quarter. Status REFRESH: protect the top line but fix the offer architecture and retention before the next budget step-up.

| Metric | This period | Same window LY | YoY delta | Read |
|---|---|---|---|---|
| Net revenue | $612k | $547k | **+12%** | Green, but volume-only — see below |
| Orders | 8,400 | 6,560 | **+28%** | All of the growth lives here |
| AOV | $72.90 | $83.40 | **−12%** | Each order is less valuable |
| Returning-customer rate | 29% | 34% | **−5 pts** | Retention tell: base is eroding |
| Gross margin | 41% | 48% | **−7 pts** | Margin compressing fast |
| Discount share of revenue | 23% | 14% | **+9 pts** | Growth is bought, not earned |

The pattern: orders up + AOV down + discount share up + margin down + returning rate down = **discount-funded, acquisition-led growth**. The 12% revenue headline is real but misleading — the business is bigger and less profitable per order than a year ago, and leaning harder on new-customer discounting to get there.

## Common Failure Modes

- Comparing raw date ranges instead of comparable calendar windows, so a shifted Easter or BFCM reads as a trend.
- Celebrating a revenue number without decomposing it into orders × AOV.
- Missing discount-funded growth because margin and discount share were never pulled YoY.
- Ignoring the returning-customer rate until churn shows up in revenue months later.
- Confusing inflation (higher prices) or store growth (more SKUs/spend) with genuine demand growth.
- Acting on a single noisy week instead of confirming the rolling YoY trend.

## Run This Play With Live Data

**Manual version:** pull two matched calendar windows of order-level data, recompute AOV, new-vs-returning split, margin, and discount share for both, align the promo calendars, strip out inflation and store growth — every single week.

**ShopMCP version:** connect your store once. Ask the question; ShopMCP pulls live order-level data for this period and the comparable prior-year window, computes the YoY decomposition (orders × AOV, mix, margin, discount share), flags discount-funded growth and retention erosion automatically, and returns the trading read with the pattern named. It stays **read-only** until you explicitly approve any change.

> No Shopify, Woo, or BigCommerce connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same YoY decomposition then runs in one prompt instead of a Monday-morning spreadsheet session.

Example ShopMCP prompt:

```text
Run the Year-over-Year Pulse play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/founder-yoy-pulse?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual exports and matching two calendar windows by hand every week.
- Recomputing AOV, mix, margin, and discount share YoY from order-level data.
- Guessing whether a "decline" is a real trend or a shifted promo calendar.
- Rebuilding the same YoY decomposition every Monday.
