---
name: ops-daily-standup
description: "When an ecommerce operator needs to decide: What order, fulfilment, refund, or exception queue needs action today? Runs the Ops Daily Standup play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Ops Daily Standup', 'Commerce', 'Ops Risk'."
license: CC-BY-4.0
metadata:
  persona: Ops / Dispatch Lead
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Ops Daily Standup

**Operating question:** What order, fulfilment, refund, or exception queue needs action today?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Unfulfilled orders** — order ID, placed-at timestamp, order value, shipping method, destination region, and current fulfilment status. You need the **placed-at time** specifically, not "days ago," to measure against the SLA in hours.
- **Dispatch SLA by shipping method** — your promised handling time per service (e.g. express = same-day if before cut-off, standard = 48h, freight/pre-order = quoted separately). Without this the age column is meaningless.
- **High-risk / held orders** — every order sitting in a fraud or manual-review hold, with its risk score/reason and value.
- **Payment exceptions** — failed, declined, or pending/unauthorised payments on otherwise-open orders, with the failure reason and retry eligibility.
- **Shipment status** — orders marked fulfilled but with **no carrier scan / no movement** for over 24–48h, plus any carrier exception codes (address issue, failed delivery, lost).
- **Refund / return queue** — open return requests and refunds awaiting action, with age and value.
- **Stock-block signals** — open orders containing at least one **out-of-stock or backordered** line, and the inbound/restock ETA if known.

Optional, if available:

- **Customer tier / lifetime value** — a VIP or repeat customer's stuck order outranks a first-time low-value one at the same age.
- **Carrier cut-off times** — turns "ship today" into a hard deadline and re-sorts the dispatch sub-queue.
- **Open support tickets** — an order the customer has already chased is higher customer-impact than a silent one.
- **Promo / launch calendar** — explains a backlog spike and tells you whether it's transient or structural.
- **SLA breach cost** — marketplace (Amazon/eBay) late-dispatch penalties or chargeback risk that should escalate an item's rank.

## How to decide — in order

1. **Confirm the data is settled.** If today's order sync is mid-flight or the store/3PL reconciliation hasn't run, **stop** — every "stuck" flag is suspect. Verify sync completion first (this is the FIX-or-wait gate).
2. **Triage exceptions by type, not by recency.** Bucket the open work into the six lanes: past-SLA dispatch, high-risk holds, payment retries, stuck shipments, refund/return queue, OOS-blocked orders. Newest-first ordering is the trap this step removes.
3. **Score each item: age × value × customer impact.** Age is measured in hours past its *own* SLA (not a flat threshold). Value is order value. Customer impact lifts VIPs, already-complained customers, and marketplace orders with penalty exposure. The product of the three is the rank key.
4. **Split "act now" from "needs review."** Anything customer-facing (a refund, a cancellation, a "sorry it's late" message) or risk-laden (a fraud hold) is **flagged for approval**, never auto-executed. Mechanical, reversible actions (chase a 3PL, retry a card, push a label) can be owned and actioned directly.
5. **Assign owner + action + deadline.** Every ranked row gets one named owner, one concrete next action, and a deadline tied to the carrier cut-off or SLA, not a vague "today."
6. **Apply the vetoes**, then publish the queue.

## The prompt to run

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

## Decision rules

- **KILL** — only for a verified bad order: a confirmed-fraud hold or a duplicate/test order, where cancelling is the right action. Even then it routes through approval; ops "kills" the order, never the customer relationship silently.
- **REFRESH** — an order that's recoverable with one corrective action: retry the failed payment, re-trigger a dropped label, re-push a fulfilment request to the 3PL that silently failed.
- **WATCH** — a shipment that's late by the carrier's own scan cadence but still inside the delivery window, or a backlog item not yet past its SLA. Directional, recheck same day.
- **KEEP** — orders flowing normally inside SLA; no action, and they should not clutter the queue.
- **FIX** — required evidence is missing, inconsistent, or unsettled: the order sync was mid-flight, the SLA for a service isn't defined, or stock ETA is unknown. Resolve the data before acting.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- **Never auto-cancel a high-risk order without manual review.** A fraud score is a prompt to look, not a verdict — false positives cancel real revenue and real customers.
- **Don't apply one dispatch SLA to every order.** The SLA varies by shipping method and destination region; an express order is "late" hours before a standard one placed at the same time, and a freight/pre-order item is on a different clock entirely.
- **Flag — don't auto-send — anything customer-facing.** Refunds, cancellations, and "your order is delayed" messages need human approval before they leave. The queue proposes; a person sends.
- **Don't act on a phantom "stuck" order.** A data-sync lag between store, gateway, and 3PL routinely shows orders as unfulfilled or unpaid that have already moved. Verify the live state before chasing or retrying.
- **Don't retry a payment more than the gateway/issuer allows.** Repeated declines can trigger fraud blocks or duplicate authorisations — check retry eligibility first.
- **Don't promise a customer a dispatch you can't hit.** If an OOS line has no firm restock ETA, the action is to inform/offer alternatives, not to commit a date.

## Output

A single prioritised action queue. Customer-facing and risk-laden rows are marked approval-required; mechanical rows carry a named owner.

Minimum table columns:

| Item | Type | Age vs SLA | Value | Customer impact | Action | Owner | Approval? | Deadline |
|---|---|---|---|---|---|---|---|---|
| Order #1042 | Past-SLA dispatch | +9h | $84 | Standard | Pick & ship on next van | Dispatch | No | Today, by 15:00 cut-off |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
