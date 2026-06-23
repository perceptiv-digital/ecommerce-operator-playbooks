---
slug: "ops-daily-standup"
title: "Ops Daily Standup"
operating_question: "What order, fulfilment, refund, or exception queue needs action today?"
primary_persona: "operations"
personas: ["operations"]
category: "ops-risk"
platforms: ["commerce"]
cadence: "daily"
public_tier: "fast-follow"
---

# Ops Daily Standup

## Operating Question

**What order, fulfilment, refund, or exception queue needs action today — ranked so the first thing I touch is the one that's about to break an SLA, lose money, or anger a customer?**

Every morning your store accumulates a backlog of orders that are stuck somewhere they shouldn't be: unfulfilled past the dispatch promise, frozen behind a fraud hold, blocked by a payment that never cleared, sitting on a carrier dock with no scan, or waiting on stock that hasn't landed. Left unranked, an operator works the queue in whatever order the admin happens to show it — usually newest-first, which is exactly backwards. This play turns the raw exception data into a **prioritised action queue** scored by *order age × order value × customer impact*, assigns each item an owner and a concrete next action, and flags everything customer-facing for approval before anything is sent.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant can reason about *how* to triage an ops queue, but it cannot see a single one of your orders. To build today's queue manually you have to:

1. Open the admin and filter unfulfilled orders, then read each one's dispatch date against the right SLA for its shipping method and destination.
2. Open the fraud/risk view and list every order on hold awaiting manual review.
3. Pull failed and pending payments from the payments/gateway view.
4. Cross-check shipments with no carrier scan in the last 24–48h against the courier's tracking.
5. Open the returns/refunds queue and the out-of-stock report, then join OOS line items back to the open orders they're blocking.

**The triage logic in this playbook is free. The live order, payment, and fulfilment state is the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live line into your store and gateway, that wall is where manual standups stall. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Ops / Dispatch Lead
- **Also useful for:** Customer Service Lead (refund/return queue, customer-facing flags), Founder/Operator of a small store (you are the dispatch lead), Warehouse/3PL coordinator (the dispatch sub-queue).
- Run it **at the start of the dispatch day**, before anyone starts picking — so the highest-risk orders are worked first, not whatever surfaced last.

## When To Run It

- **Cadence:** daily — ideally 15–30 minutes before the carrier's pickup cut-off, so anything flagged still has a chance to ship today.
- **Triggers:** a normal morning standup; a post-weekend or post-holiday backlog (Monday queues are 2–3× longer); a sale or launch spike; a courier service disruption; a payment-gateway incident.
- **Pre-requisite:** confirm your order data has finished syncing for the day. A mid-sync snapshot invents phantom problems (see vetoes). If the store and 3PL/WMS reconcile on a lag, run *after* the overnight sync completes, not during it.

## Required Evidence

- **Unfulfilled orders** — order ID, placed-at timestamp, order value, shipping method, destination region, and current fulfilment status. You need the **placed-at time** specifically, not "days ago," to measure against the SLA in hours.
- **Dispatch SLA by shipping method** — your promised handling time per service (e.g. express = same-day if before cut-off, standard = 48h, freight/pre-order = quoted separately). Without this the age column is meaningless.
- **High-risk / held orders** — every order sitting in a fraud or manual-review hold, with its risk score/reason and value.
- **Payment exceptions** — failed, declined, or pending/unauthorised payments on otherwise-open orders, with the failure reason and retry eligibility.
- **Shipment status** — orders marked fulfilled but with **no carrier scan / no movement** for over 24–48h, plus any carrier exception codes (address issue, failed delivery, lost).
- **Refund / return queue** — open return requests and refunds awaiting action, with age and value.
- **Stock-block signals** — open orders containing at least one **out-of-stock or backordered** line, and the inbound/restock ETA if known.

## Optional Evidence

- **Customer tier / lifetime value** — a VIP or repeat customer's stuck order outranks a first-time low-value one at the same age.
- **Carrier cut-off times** — turns "ship today" into a hard deadline and re-sorts the dispatch sub-queue.
- **Open support tickets** — an order the customer has already chased is higher customer-impact than a silent one.
- **Promo / launch calendar** — explains a backlog spike and tells you whether it's transient or structural.
- **SLA breach cost** — marketplace (Amazon/eBay) late-dispatch penalties or chargeback risk that should escalate an item's rank.

## How To Pull This Evidence

In Shopify Admin → **Orders**, build each exception lane from the order list filters and the order detail fields:

- **Unfulfilled (past-SLA dispatch)** — filter `Fulfillment status: Unfulfilled` (and `Partially fulfilled`). Export or read the **Date** (created/placed-at) column to compute order age; combine with the shipping method to test each order against its own SLA.
- **High-risk / held orders** — filter by **Fraud risk: High** (or sort the risk column), plus any orders sitting in a manual `On hold` state. Capture the risk reason and order total.
- **Payment-pending / failed** — filter `Payment status: Pending`, `Unpaid`, `Payment error`, and `Partially paid`. These are the failed/declined/unauthorised payments on otherwise-open orders.
- **OOS-blocked** — cross-reference open orders against **Products → Inventory** for any line at or below zero available; those orders are blocked on restock.
- **Order age** — derive from the order's **Date** / created-at timestamp, not "days ago" — you need hours to measure against an hours-based SLA.
- **Value** — read each order's **Total** for the value component of the rank score.

**Gotcha — data-sync lag and phantom-stuck orders:** Shopify, your gateway, and your 3PL/WMS reconcile on different clocks. Mid-sync, an order can show as `Unfulfilled` or `Unpaid` when it has already shipped or cleared — a phantom-stuck flag. Confirm the day's sync has completed before trusting any "stuck" exception, and verify the live state before chasing or retrying.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Confirm the data is settled.** If today's order sync is mid-flight or the store/3PL reconciliation hasn't run, **stop** — every "stuck" flag is suspect. Verify sync completion first (this is the FIX-or-wait gate).
2. **Triage exceptions by type, not by recency.** Bucket the open work into the six lanes: past-SLA dispatch, high-risk holds, payment retries, stuck shipments, refund/return queue, OOS-blocked orders. Newest-first ordering is the trap this step removes.
3. **Score each item: age × value × customer impact.** Age is measured in hours past its *own* SLA (not a flat threshold). Value is order value. Customer impact lifts VIPs, already-complained customers, and marketplace orders with penalty exposure. The product of the three is the rank key.
4. **Split "act now" from "needs review."** Anything customer-facing (a refund, a cancellation, a "sorry it's late" message) or risk-laden (a fraud hold) is **flagged for approval**, never auto-executed. Mechanical, reversible actions (chase a 3PL, retry a card, push a label) can be owned and actioned directly.
5. **Assign owner + action + deadline.** Every ranked row gets one named owner, one concrete next action, and a deadline tied to the carrier cut-off or SLA, not a vague "today."
6. **Apply the vetoes**, then publish the queue.

## Manual Workflow

1. Confirm the daily order sync has completed. If it hasn't, wait — don't triage a half-synced store.
2. Filter unfulfilled orders and compute each one's **hours past its dispatch SLA** using its placed-at time and the SLA for its shipping method/region.
3. List held/high-risk orders, failed/pending payments, stuck shipments (no scan >24–48h), the open refund/return queue, and orders with an OOS line.
4. For each item, attach order value and any customer-impact modifier (VIP, prior complaint, marketplace penalty).
5. Paste the prompt below with your six lists.
6. Take the ranked queue, separate the approval-required rows from the act-now rows, attach owner + action + deadline, and publish to the team before pick-and-pack starts.

## Copy-Paste Prompt

```text
You are my ecommerce operations analyst running the "Ops Daily Standup" play.

GOAL: turn today's open exceptions into a single prioritised action queue, ranked by
(hours past SLA) x (order value) x (customer impact) — so the first item worked is the
one most likely to breach an SLA, lose money, or anger a customer.

I will paste up to six lists: unfulfilled orders (with placed-at time, value, shipping
method, region), my dispatch SLA per method, high-risk/held orders, failed/pending
payments, stuck shipments (no carrier scan), the refund/return queue, and OOS-blocked
orders. Some lists may be empty or partial.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the open
order/fulfilment/exception queues with ages and values (unfulfilled orders past their
dispatch SLA, high-risk/held orders, and failed/pending payments — each with its order
age and value) are missing, STOP and return only (a) what's missing and (b) how to get
it — never estimate it or proceed. Without the ages and values you cannot prioritise.

RULES:
- Measure dispatch age in HOURS PAST EACH ORDER'S OWN SLA, not a flat threshold. Express,
  standard, and freight/pre-order have different promises — use the SLA I give you.
- Rank by hours-past-SLA x order value x customer-impact modifier (VIP / prior complaint /
  marketplace penalty raise the rank). Show the components, not just the final rank.
- FLAG every customer-facing or risk-laden action (refund, cancellation, customer message,
  fraud-hold decision) as APPROVAL-REQUIRED. Never present it as already done.
- Mechanical reversible actions (chase 3PL, retry payment, generate label) can be assigned
  to an owner to action directly.
- If I tell you the order sync was mid-flight, treat all "stuck" flags as unverified and
  say so before ranking.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 2-3 sentence executive read: how big is today's queue and what's the single most
   urgent item.
2. A ranked action queue table. Use exactly this header row:
   | Item | Type | Age vs SLA | Value | Customer impact | Action | Owner | Approval? | Deadline |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace
   the table with prose.
3. The approval-required rows called out separately.
4. What evidence is missing and which items can't be safely ranked until it lands.
```

## Decision Rules

- **KILL** — only for a verified bad order: a confirmed-fraud hold or a duplicate/test order, where cancelling is the right action. Even then it routes through approval; ops "kills" the order, never the customer relationship silently.
- **REFRESH** — an order that's recoverable with one corrective action: retry the failed payment, re-trigger a dropped label, re-push a fulfilment request to the 3PL that silently failed.
- **WATCH** — a shipment that's late by the carrier's own scan cadence but still inside the delivery window, or a backlog item not yet past its SLA. Directional, recheck same day.
- **KEEP** — orders flowing normally inside SLA; no action, and they should not clutter the queue.
- **FIX** — required evidence is missing, inconsistent, or unsettled: the order sync was mid-flight, the SLA for a service isn't defined, or stock ETA is unknown. Resolve the data before acting.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- **Never auto-cancel a high-risk order without manual review.** A fraud score is a prompt to look, not a verdict — false positives cancel real revenue and real customers.
- **Don't apply one dispatch SLA to every order.** The SLA varies by shipping method and destination region; an express order is "late" hours before a standard one placed at the same time, and a freight/pre-order item is on a different clock entirely.
- **Flag — don't auto-send — anything customer-facing.** Refunds, cancellations, and "your order is delayed" messages need human approval before they leave. The queue proposes; a person sends.
- **Don't act on a phantom "stuck" order.** A data-sync lag between store, gateway, and 3PL routinely shows orders as unfulfilled or unpaid that have already moved. Verify the live state before chasing or retrying.
- **Don't retry a payment more than the gateway/issuer allows.** Repeated declines can trigger fraud blocks or duplicate authorisations — check retry eligibility first.
- **Don't promise a customer a dispatch you can't hit.** If an OOS line has no firm restock ETA, the action is to inform/offer alternatives, not to commit a date.

## Output Contract

A single prioritised action queue. Customer-facing and risk-laden rows are marked approval-required; mechanical rows carry a named owner.

Minimum table columns:

| Item | Type | Age vs SLA | Value | Customer impact | Action | Owner | Approval? | Deadline |
|---|---|---|---|---|---|---|---|---|
| Order #1042 | Past-SLA dispatch | +9h | $84 | Standard | Pick & ship on next van | Dispatch | No | Today, by 15:00 cut-off |

## Worked Example

> **Executive read:** 12 items need attention before today's 15:00 carrier cut-off. The single most urgent is order #4471 — $640, blocked by an out-of-stock line and already 53h past its 48h standard SLA — needs a customer-facing decision now. Six orders are past dispatch SLA (oldest #4318 at 71h), two fraud holds and three failed payments are recoverable but only one card retry is mechanical; the rest route through approval.

| Item | Type | Age vs SLA | Value | Customer impact | Action | Owner | Approval? | Deadline |
|---|---|---|---|---|---|---|---|---|
| #4471 | OOS-blocked, high value | +5h over (53h vs 48h) | $640 | Repeat customer | OOS line: offer swap or partial-ship + refund | CS Lead | **Yes** | Decide by 12:00 |
| #4318 | Past-SLA dispatch | +23h (71h vs 48h) | $129 | Standard | Pick & ship on first van | Dispatch | No | Today, 15:00 cut-off |
| #4290 | High-risk hold | held 19h | $410 | New customer | Manual fraud review → release or cancel | Ops Lead | **Yes** | By 11:00 |
| #4302 | High-risk hold | held 14h | $95 | Standard | Manual fraud review | Ops Lead | **Yes** | By 13:00 |
| #4355 | Past-SLA dispatch ×3 | +8–14h | $61–$140 | Standard | Batch pick the 3 oldest standard orders | Dispatch | No | Today, 15:00 cut-off |
| #4377 | Failed payment | 6h pending | $215 | Standard | Retry card once (within retry limit) | Ops (auto) | No | By 14:00 |
| #4380 | Failed payment | 4h pending | $88 | Standard | Email payment-update link | CS Lead | **Yes** | By 14:00 |
| #4361 | Failed payment | 9h pending | $156 | Standard | Retry, then dunning if declined | CS Lead | **Yes** | By 15:00 |

Note the queue **inverts** the admin's default view: order #4471 was placed *after* several others but ranks first because value × stock-block × customer impact dominates raw recency, and three near-identical standard orders are batched into one pick action rather than worked as three separate line items.

## Common Failure Modes

- Working the queue newest-first (or in admin default order) instead of by age × value × impact.
- Applying one flat dispatch SLA across express, standard, and freight/pre-order.
- Auto-cancelling a fraud-flagged order instead of reviewing it — killing real revenue on a false positive.
- Sending a customer-facing "we're late" message or refund without approval.
- Chasing a "stuck" order that a sync lag invented — the order already shipped.
- Retrying a declined card until the gateway blocks it or double-authorises.

## Run This Play With Live Data

**Manual version:** open six different views every morning — unfulfilled orders, fraud holds, the payments dashboard, carrier tracking, the returns queue, and the OOS report — read each order's placed-at time against the right SLA, and hand-rank the result before the carrier cut-off.

**ShopMCP version:** connect your store and gateway once. Ask the question; ShopMCP pulls live order, payment, fulfilment, and stock state, measures each order's age against its own dispatch SLA, scores age × value × customer impact, and returns the ranked action queue with owners, deadlines, and approval flags already attached. It stays **read-only** — it never cancels an order, retries a payment, sends a customer message, or issues a refund without your explicit approval and a supported preview/apply path.

> No store or payment-gateway connection inside your AI assistant? That's the wall every manual standup hits. ShopMCP *is* the connection — and the same triage then runs in one prompt instead of six browser tabs every morning.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Ops Daily Standup play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Opening six separate admin/gateway/carrier views every morning.
- Hand-computing each order's hours-past-SLA from placed-at timestamps.
- Re-sorting the queue by value and customer impact by eye.
- Rebuilding the same triage from scratch every single day.
