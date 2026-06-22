---
schema_version: 1
slug: "founder-cash-runway-snapshot"
title: "Cash and Payout Snapshot"
summary: "Cash and Payout Snapshot helps ecommerce operators answer: What does cash, payout, refund, and sales evidence say about runway pressure?"
operating_question: "What does cash, payout, refund, and sales evidence say about runway pressure?"
short_title: "Cash and Payout Snapshot"
primary_persona: "founder"
personas: ["founder"]
category: "trading-profit"
platforms: ["stripe", "commerce"]
cadence: "weekly"
difficulty: "standard"
manual_time_minutes_min: 30
manual_time_minutes_max: 75
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/founder-cash-runway-snapshot"
shopmcp_prompt: "Run the Cash and Payout Snapshot play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Cash and Payout Snapshot

## Operating Question

**What does this week's cash, payout, refund, and sales evidence actually say about runway pressure — measured in money already in the bank or scheduled to arrive, not in revenue I booked?**

The most dangerous number on a founder's dashboard is gross sales, because it feels like cash and behaves like nothing of the sort. Between a customer clicking "buy" and money you can spend sit five deductions: processor fees, refunds, chargebacks, the payout lag, and the inventory purchase order you already committed to restock the thing you just sold. This play converts a week of trading into a single defensible read — **available balance, pending balance, next payout, net cash-in per week, refund and dispute trend, and estimated weeks of runway** — and forces a **KEEP / WATCH / REFRESH / FIX / KILL** call on each pressure signal before you touch a budget or a PO.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Stripe balance, your payout schedule, or your store's refund log. Revenue is the only number that leaks out into screenshots and email summaries — and revenue is exactly the number that lies about cash. To run this honestly you have to:

1. Open the **Stripe Balance** view and separate **available** from **pending**, then read the **payout schedule** (e.g. rolling 2-day, or weekly on a fixed weekday) to know *when* pending becomes spendable.
2. Pull the last 4 weeks of **payouts**, **refunds**, and **disputes/chargebacks** and trend them — a refund rate creeping from 2.1% to 3.4% is invisible in any single week.
3. Reconcile Stripe's gross against **commerce orders** so a Stripe-only view doesn't miss cash-on-delivery, PayPal, or marketplace payouts that land elsewhere.
4. Subtract **known outflows** you carry in your head or a spreadsheet — payroll date, ad spend run-rate, rent, SaaS, and the big one nobody models: **open inventory purchase orders**.

**The reasoning here is free. The data access is the wall — live Stripe balance, payout timing, and refund/dispute trends are not things you can paste from memory.** That is exactly the line ShopMCP connects. The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Founder / CEO — this is a cash decision, and only the person who signs POs and payroll can act on it.
- **Also useful for:** a fractional CFO or finance lead reconciling the weekly cash position; an ops lead who owns the inventory PO calendar.
- Run it **yourself**, weekly, before you approve any spend increase, restock PO, or new hire. The point is a decision ("can we afford this PO this week?"), not a report.

## When To Run It

- **Cadence:** weekly — same morning each week (Monday works), after the weekend's orders and the latest payout have settled, so available balance reflects reality.
- **Triggers:** an upcoming inventory PO or supplier deposit; a payroll run inside the next 14 days; a refund or dispute spike; a Stripe email about a **reserve** or rolling-reserve change; any week where net cash-in turned negative.
- **Pre-requisite:** confirm your **payout schedule and any reserve** in Stripe first. If Stripe has placed a reserve or extended your payout window, your "available" number is smaller than the dashboard headline and every downstream estimate is wrong until you account for it.

## Required Evidence

- **Stripe balance** — current **available** balance and **pending** balance, as two separate numbers, plus currency. Never one blended "balance."
- **Stripe payout schedule** — the cadence and lag (e.g. rolling 2-day, T+2; or weekly anchored to a weekday), the **next payout date and amount**, and whether any **reserve / rolling reserve** is in force.
- **Stripe activity, last 28 days** — gross volume, processor **fees**, **refunds** (count + amount), and **disputes/chargebacks** (count + amount), so you can compute refund rate and dispute rate.
- **Commerce orders (Shopify/Woo/BigCommerce/etc.)** — net sales by day, AOV, and order count, to reconcile against Stripe and to project forward cash-in.
- **Known outflows** — committed spend over the next 2–4 weeks: payroll + date, ad spend run-rate, rent/SaaS, taxes due, and **open inventory purchase orders** with due dates.

## Optional Evidence

- **Refund/dispute reasons** — to tell a quality/fulfilment problem (fixable) apart from friendly-fraud (a chargeback-defense problem).
- **Stripe Radar / fraud signals** — a rising fraud rate is the leading indicator of a reserve before the dispute rate even moves.
- **Promo or launch calendar** — a discount window inflates order count but compresses margin and often raises refunds 1–2 weeks later.
- **Supplier payment terms** — Net-30 vs deposit-on-order changes whether a PO is an immediate cash hit or a scheduled one.
- **Prior-period runway estimate** — last week's weeks-of-runway number, so you're tracking the *trend*, not just today's snapshot.

## The Decision Logic (run in this order)

1. **Anchor on available, not pending, not revenue.** Start from Stripe **available** balance. This is the only number you can actually spend today. Pending is scheduled, not spendable; revenue is a story about the past.
2. **Lay the payout schedule over the next 2–4 weeks.** Map each pending payout to the day it lands. A healthy "balance" with a 7-day reserve and payroll on day 5 is a cash problem the balance number hides.
3. **Compute net cash-in per week.** Net cash-in = payouts received − refunds − disputes − fees. Do this on *settled* money, then project forward from order run-rate. If net cash-in is negative while revenue is positive, fees + refunds + payout lag are eating you.
4. **Trend the refund and dispute rates.** Refund rate = refunds ÷ gross; dispute rate = disputed charges ÷ charge count. Trend over 4 weeks. A rising dispute rate is the single most expensive signal here — past roughly **0.75–1.0%** you risk a Stripe **reserve**, which freezes cash you were counting on.
5. **Subtract known outflows, PO-first.** List committed outflows by date. Inventory POs are almost always the largest and the most forgotten — a single restock can dwarf a month of payroll. Revenue does not cover a PO; *cash* does.
6. **Estimate weeks of runway.** Runway ≈ (available + scheduled payouts that will clear in time) ÷ average weekly net outflow. Flag the pressure level, then apply the vetoes before recommending any spend, PO, or hire decision.

## Manual Workflow

1. Open Stripe → **Balance**. Write down **available** and **pending** as two numbers. Note the **next payout date/amount** and check **Settings → Payouts** for the schedule and any reserve.
2. Export the last 28 days of Stripe activity: gross, fees, refunds, disputes. Compute refund rate and dispute rate for each of the last 4 weeks to get a trend, not a point.
3. Pull commerce orders for the same window; reconcile Stripe gross against store net sales so you catch any non-Stripe cash.
4. Write down every committed outflow for the next 2–4 weeks with its date — payroll, ad run-rate, rent/SaaS, taxes, and **open inventory POs**.
5. Compute net cash-in/week and weeks of runway using the formulas in the decision logic.
6. Paste the prompt below with your numbers. Pressure-test the runway estimate against the vetoes, then convert it into an action packet: which decisions are safe this week, which wait for the next payout, and the recheck date.

## Copy-Paste Prompt

```text
You are my fractional CFO running the "Cash and Payout Snapshot" play.

GOAL: tell me what this week's cash, payout, refund, and sales evidence says about
runway pressure — in spendable cash, not revenue. Estimate weeks of runway and flag
the pressure level.

I will paste: Stripe available vs pending balance, payout schedule + next payout +
any reserve, last-28-day gross/fees/refunds/disputes, commerce orders, and my known
outflows (payroll, ad spend, rent/SaaS, taxes, and open inventory POs with dates).
Some data may be missing.

RULES:
- Anchor on AVAILABLE balance. Treat PENDING as scheduled, not spendable. Never treat
  revenue or gross sales as cash.
- Map pending payouts to the dates they actually clear, accounting for payout lag and
  any reserve. State the next payout date and amount explicitly.
- Net cash-in/week = payouts received - refunds - disputes - fees. If it's negative
  while revenue is positive, say so plainly and name the cause.
- Trend refund rate and dispute rate across the last 4 weeks. Call out a rising dispute
  rate as a reserve risk above ~0.75-1.0%.
- Treat open inventory POs as the most likely hidden outflow. Subtract them by due date.
- Estimate weeks of runway = (available + payouts clearing in window) / avg weekly net
  outflow. Show the math.
- Every row must carry a number, source, time window, and confidence level. Separate
  exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read: cash position, the one pressure signal that matters, runway.
2. An evidence table: Signal | Number | Source | Window | Confidence.
3. A decision table: Signal | Status | Why | Owner | Timing.
4. Vetoes/caveats that changed any call.
5. What's blocked and what evidence would upgrade a WATCH/FIX to a decision.
```

## Decision Rules

- **KEEP** — available balance plus scheduled payouts comfortably cover all known outflows for the window, refund and dispute rates are flat and inside the band, and runway is healthy. No action; recheck next week.
- **WATCH** — one signal is moving the wrong way (refund rate ticking up, net cash-in soft, runway shortening) but it's still directional or inside a single noisy window. Monitor; do not change PO or spend plans yet.
- **REFRESH** — a fixable driver is eroding cash: refunds concentrated in one SKU or fulfilment issue, or fees higher than expected from a payment-method mix. The cash engine still works; one input needs fixing.
- **FIX** — the evidence itself is unsafe: Stripe and commerce gross diverge materially, payout schedule or reserve status is unknown, or open POs aren't quantified. Resolve the data before making a cash decision.
- **KILL** — a confirmed cash drain with no credible recovery: a payment method, channel, or promo whose refund/dispute load makes its net cash-in reliably negative. Stop it, with approval.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- **Pending is not available.** Never green-light a PO or hire against pending balance — it can be clawed back by refunds or disputes before it ever clears.
- **Revenue is not cash.** Never treat gross sales or a strong sales week as runway. Fees, refunds, payout lag, and POs all sit between the sale and the bank.
- **The biggest hidden outflow is inventory purchase orders.** Do not declare runway healthy until every open PO and supplier deposit is subtracted by due date.
- **A rising dispute rate can trigger a Stripe reserve.** Above ~0.75–1.0% dispute rate, assume some balance may be frozen and discount available cash accordingly before planning spend.
- Do not estimate runway off a single week — refund and dispute load lag the sale, so one clean week overstates the position.
- Do not recommend refunds, payout changes, PO approvals, or any spend without an explicit human approval step.

## Output Contract

An executive cash read, an evidence table, a decision table with status, and the runway estimate with its math shown.

Minimum decision-table columns:

| Signal | Evidence | Status | Why | Owner | Timing |
|---|---|---|---|---|---|
| Refund rate trend | Stripe, 2.1% → 3.4% over 4 wks (exact) | WATCH | Rising but driven by one SKU | Founder + Ops | Recheck in 7 days |

## Worked Example

> **Executive read:** Headline says $86,400 "balance," but only **$31,200 is available** — the other $55,200 is pending behind a 2-day payout lag, and the next payout ($28,900) lands in 2 days. Net cash-in has gone **negative this week** (−$4,100) as the refund rate climbed 2.1% → 3.4% and a $42,000 inventory PO falls due in 9 days; at the current net outflow that leaves roughly **5.2 weeks of runway**. The dispute rate at 0.9% is the real alarm — one more bad week risks a Stripe reserve that would freeze the pending balance this whole plan depends on.

| Signal | Evidence | Status | Why | Owner | Timing |
|---|---|---|---|---|---|
| Available vs pending balance | Stripe: $31,200 avail / $55,200 pending (exact) | WATCH | Only 36% is spendable today | Founder | Now |
| Next payout | Stripe: $28,900 clears in 2 days (exact) | KEEP | On schedule, no reserve yet | Founder | Track |
| Net cash-in / week | −$4,100 (payouts − refunds − disputes − fees) (exact) | REFRESH | Refunds + fees outran inflow | Founder + Ops | 7 days |
| Refund rate trend | 2.1% → 3.4% over 4 wks (exact) | REFRESH | Concentrated in one SKU's sizing | Ops | 7 days |
| Dispute rate | 0.9%, up from 0.5% (exact) | **WATCH** | Approaching reserve threshold | Founder | Now |
| Inventory PO due | $42,000 supplier PO in 9 days (estimated terms) | **FIX** | Outflow not in any runway model | Founder | Before approving |
| Weeks of runway | ~5.2 wks = ($31.2k + $28.9k) ÷ ~$11.6k/wk net outflow (estimated) | **WATCH** | Thin once the PO clears | Founder | Recheck weekly |

Note how the snapshot inverts the dashboard: an $86k "balance" that *feels* like comfortable runway is really $31k spendable, a negative weekly cash trend, and a $42k commitment nine days out — with a dispute rate quietly closing on a reserve that would freeze the rest.

## Common Failure Modes

- Reading the blended Stripe "balance" as cash and missing that most of it is pending behind the payout lag.
- Treating a strong sales week as runway while fees, refunds, and the payout lag quietly drain the actual bank balance.
- Forgetting open inventory POs and supplier deposits — the single largest outflow most founders don't model.
- Watching refund rate but ignoring the **dispute** rate until Stripe imposes a reserve and freezes pending cash.
- Estimating runway off one clean week, before refund and chargeback load (which lag the sale) have shown up.

## Run This Play With Live Data

**Manual version:** open Stripe, separate available from pending, read the payout schedule and reserve status, export and trend 4 weeks of refunds and disputes, reconcile against your store, and subtract every known outflow including POs — by hand, every week.

**ShopMCP version:** connect Stripe and your store once. Ask the question; ShopMCP pulls live **available vs pending balance**, the **payout schedule and next payout**, trended **refund and dispute rates**, and reconciled commerce orders, computes **net cash-in/week** and **weeks of runway**, and returns the ranked KEEP/WATCH/REFRESH/FIX/KILL read. It stays **read-only** — it never moves money, changes payouts, or issues refunds without an explicit approval step.

> No live Stripe balance or payout feed inside your AI assistant? That's the wall every manual run hits: revenue is the only thing you can paste from memory, and revenue is the one number that lies about cash. ShopMCP *is* the connection — the same playbook then runs in one prompt instead of a Monday-morning spreadsheet.

Example ShopMCP prompt:

```text
Run the Cash and Payout Snapshot play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/founder-cash-runway-snapshot?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual Stripe and store exports, reconciled by hand every week.
- Separating available from pending and mapping payouts to the days they clear.
- Trending refund and dispute rates far enough back to catch a reserve risk early.
- Rebuilding the same runway math — and re-finding the forgotten inventory POs — every single week.
