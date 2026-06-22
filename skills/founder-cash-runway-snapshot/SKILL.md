---
name: founder-cash-runway-snapshot
description: "When an ecommerce operator needs to decide: What does cash, payout, refund, and sales evidence say about runway pressure? Runs the Cash and Payout Snapshot play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Cash and Payout Snapshot', 'Stripe', 'Commerce', 'Trading Profit'."
license: CC-BY-4.0
metadata:
  persona: Founder / CEO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Cash and Payout Snapshot

**Operating question:** What does cash, payout, refund, and sales evidence say about runway pressure?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Stripe balance** — current **available** balance and **pending** balance, as two separate numbers, plus currency. Never one blended "balance."
- **Stripe payout schedule** — the cadence and lag (e.g. rolling 2-day, T+2; or weekly anchored to a weekday), the **next payout date and amount**, and whether any **reserve / rolling reserve** is in force.
- **Stripe activity, last 28 days** — gross volume, processor **fees**, **refunds** (count + amount), and **disputes/chargebacks** (count + amount), so you can compute refund rate and dispute rate.
- **Commerce orders (Shopify/Woo/BigCommerce/etc.)** — net sales by day, AOV, and order count, to reconcile against Stripe and to project forward cash-in.
- **Known outflows** — committed spend over the next 2–4 weeks: payroll + date, ad spend run-rate, rent/SaaS, taxes due, and **open inventory purchase orders** with due dates.

Optional, if available:

- **Refund/dispute reasons** — to tell a quality/fulfilment problem (fixable) apart from friendly-fraud (a chargeback-defense problem).
- **Stripe Radar / fraud signals** — a rising fraud rate is the leading indicator of a reserve before the dispute rate even moves.
- **Promo or launch calendar** — a discount window inflates order count but compresses margin and often raises refunds 1–2 weeks later.
- **Supplier payment terms** — Net-30 vs deposit-on-order changes whether a PO is an immediate cash hit or a scheduled one.
- **Prior-period runway estimate** — last week's weeks-of-runway number, so you're tracking the *trend*, not just today's snapshot.

## How to decide — in order

1. **Anchor on available, not pending, not revenue.** Start from Stripe **available** balance. This is the only number you can actually spend today. Pending is scheduled, not spendable; revenue is a story about the past.
2. **Lay the payout schedule over the next 2–4 weeks.** Map each pending payout to the day it lands. A healthy "balance" with a 7-day reserve and payroll on day 5 is a cash problem the balance number hides.
3. **Compute net cash-in per week.** Net cash-in = payouts received − refunds − disputes − fees. Do this on *settled* money, then project forward from order run-rate. If net cash-in is negative while revenue is positive, fees + refunds + payout lag are eating you.
4. **Trend the refund and dispute rates.** Refund rate = refunds ÷ gross; dispute rate = disputed charges ÷ charge count. Trend over 4 weeks. A rising dispute rate is the single most expensive signal here — past roughly **0.75–1.0%** you risk a Stripe **reserve**, which freezes cash you were counting on.
5. **Subtract known outflows, PO-first.** List committed outflows by date. Inventory POs are almost always the largest and the most forgotten — a single restock can dwarf a month of payroll. Revenue does not cover a PO; *cash* does.
6. **Estimate weeks of runway.** Runway ≈ (available + scheduled payouts that will clear in time) ÷ average weekly net outflow. Flag the pressure level, then apply the vetoes before recommending any spend, PO, or hire decision.

## The prompt to run

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

## Decision rules

- **KEEP** — available balance plus scheduled payouts comfortably cover all known outflows for the window, refund and dispute rates are flat and inside the band, and runway is healthy. No action; recheck next week.
- **WATCH** — one signal is moving the wrong way (refund rate ticking up, net cash-in soft, runway shortening) but it's still directional or inside a single noisy window. Monitor; do not change PO or spend plans yet.
- **REFRESH** — a fixable driver is eroding cash: refunds concentrated in one SKU or fulfilment issue, or fees higher than expected from a payment-method mix. The cash engine still works; one input needs fixing.
- **FIX** — the evidence itself is unsafe: Stripe and commerce gross diverge materially, payout schedule or reserve status is unknown, or open POs aren't quantified. Resolve the data before making a cash decision.
- **KILL** — a confirmed cash drain with no credible recovery: a payment method, channel, or promo whose refund/dispute load makes its net cash-in reliably negative. Stop it, with approval.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- **Pending is not available.** Never green-light a PO or hire against pending balance — it can be clawed back by refunds or disputes before it ever clears.
- **Revenue is not cash.** Never treat gross sales or a strong sales week as runway. Fees, refunds, payout lag, and POs all sit between the sale and the bank.
- **The biggest hidden outflow is inventory purchase orders.** Do not declare runway healthy until every open PO and supplier deposit is subtracted by due date.
- **A rising dispute rate can trigger a Stripe reserve.** Above ~0.75–1.0% dispute rate, assume some balance may be frozen and discount available cash accordingly before planning spend.
- Do not estimate runway off a single week — refund and dispute load lag the sale, so one clean week overstates the position.
- Do not recommend refunds, payout changes, PO approvals, or any spend without an explicit human approval step.

## Output

An executive cash read, an evidence table, a decision table with status, and the runway estimate with its math shown.

Minimum decision-table columns:

| Signal | Evidence | Status | Why | Owner | Timing |
|---|---|---|---|---|---|
| Refund rate trend | Stripe, 2.1% → 3.4% over 4 wks (exact) | WATCH | Rising but driven by one SKU | Founder + Ops | Recheck in 7 days |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/founder-cash-runway-snapshot) — it executes this play read-only by default and applies changes only on your approval.
