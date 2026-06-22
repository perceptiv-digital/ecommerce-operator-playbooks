---
name: agency-retention-intelligence-packet
description: "When an ecommerce operator needs to decide: What should the agency tell this client about retention risk and next actions? Runs the Retention Intelligence Packet play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Retention Intelligence', 'Commerce', 'Klaviyo', 'Attentive', 'Agency Portfolio'."
license: CC-BY-4.0
metadata:
  persona: Agency AM / COO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Retention Intelligence Packet

**Operating question:** What should the agency tell this client about retention risk and next actions?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — orders with customer identifiers, ≥12 months. Derive: **repeat-purchase rate** (share of customers with ≥2 orders) and its trend, **% of revenue from returning customers**, **AOV** new vs. returning, and **cohort retention** — for each acquisition month, the % of that cohort that ordered again by day 30 / 60 / 90.
- **Klaviyo** — per-flow performance for the core lifecycle (Welcome, Browse/Site Abandon, Abandoned Cart, Post-Purchase / Cross-sell, Winback): live status, open/click/placed-order rate, attributed revenue. Plus **list growth** (net new subscribers minus suppressions), **deliverability** (open-rate trend, spam-complaint rate, unsub rate, sending-domain health), and **email's share of total revenue**.
- **Attentive (or SMS platform)** — subscriber growth, opt-out rate, journey/automation performance, and **SMS share of total revenue**, where connected.
- **Targets / context** — the client's own retention goal or LTV/payback target if one exists; otherwise the category benchmark you'll judge against (state which).

Optional, if available:

- **Promotion calendar** — a sitewide sale spikes repeat-rate and returning-customer revenue, then borrows from the next window. Cohorts straddling a Black Friday read hot for the wrong reason.
- **Recent flow/template changes** — a flow paused or rebuilt mid-window explains a "decay" that is really an edit.
- **Acquisition-mix shift** — a surge of discount-led or marketplace first orders lowers repeat-rate without anything being broken; it's a different customer.
- **Subscription / replenishment products** — change the entire baseline; a 55% repeat-rate is unremarkable for coffee, excellent for mattresses.
- **Known deliverability incidents** — a domain reputation dip or a Klaviyo dedicated-IP warmup in progress.

## How to decide — in order

1. **Gate on data sufficiency first.** Before reading any trend, check sample and history. Cohorts need ≥12 months of orders and ≥~50 customers per cohort to be stable; a flow needs ≥~200 recipients in the window to judge its rate; a list segment under ~50 profiles is anecdote, not signal. Anything that fails the gate is **FIX** (data/access gap) and is reported as *"can't see this yet,"* never guessed.
2. **Establish the baseline before the trend.** Is this client's absolute repeat-purchase rate healthy *for its category* (most non-replenishment DTC lands ~20–30% repeat; replenishment 40%+)? A flat 18% repeat-rate is a bigger story than a 2-point wobble on a healthy 35%.
3. **Read the trend against a clean window.** Compare the trailing 90 days to the prior 90 (and year-over-year if seasonal). Strip promo-distorted weeks before calling a move real. A change inside roughly ±3 points / ±10% relative on a normal-sample metric is noise — **WATCH**, don't raise.
4. **Localize the leak — acquisition, first-repeat, or loyal.** Decompose: is returning-customer revenue share falling because *fewer* customers come back (a first-to-second-purchase problem → Post-Purchase flow + winback), or because *the same* returners spend less (an offer/merch problem)? Cohort decay tells you *when* customers drop; flow health tells you *whether the safety net is even deployed*.
5. **Check the safety net is actually on.** Map each core flow: live or off, sending or stalled, converting or not. A dark Post-Purchase or Winback flow is the single most common, most fixable retention leak — and it's an agency win, not a client failing.
6. **Gate on deliverability before blaming content.** If open-rate has stepped down, spam complaints are above ~0.3%, or the sending domain is unauthenticated, *that* is the retention story, not "the emails need a refresh." Deliverability problems masquerade as content problems.
7. **Translate to client-safe, then triage to raise vs. monitor.** Convert each surviving signal into plain, non-alarming language with the number, source, window, and confidence behind it. Raise only the two or three that clear the Decision Rules; everything else is monitored quietly. End with one recommended next play.

## The prompt to run

```text
You are my retention analyst preparing a client-meeting intelligence packet for an
ecommerce agency account manager. I run retention for this client across their store,
Klaviyo (email), and Attentive (SMS).

GOAL: tell me what to say to THIS client about retention health — which signals are real
enough to raise in the meeting, which to monitor quietly, and the single next play to
recommend. The output must be client-safe: plain, non-alarming, no internal jargon.

I will paste: commerce repeat-purchase rate + trend, % revenue from returning customers,
30/60/90-day cohort retention, core Klaviyo flow performance + status, list growth,
deliverability (open trend / spam rate / unsub rate / domain auth), email & SMS revenue
share, Attentive subscriber growth + opt-out rate, the client's category, and any
promo/flow-change context. Some data will be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If this client's
commerce + Klaviyo/Attentive retention data over a sufficient window (>=12 months of
orders for cohorts, enough recipients/profiles to clear sample) is missing, STOP and
return only (a) what's missing and (b) how to get it — never estimate it or alarm the
client; flag it as blind.

RULES:
- Data-sufficiency gate FIRST. Cohorts need >=12 months and ~50+ customers each; flows need
  ~200+ recipients; segments under ~50 profiles are anecdote. Anything below sample is FIX
  (a "can't see this yet" gap) reported plainly, NEVER guessed or smoothed over.
- Judge the absolute baseline against the stated category benchmark BEFORE the trend.
- Compare trailing 90d vs prior 90d on a promo-clean window. A move within ~+/-3 points or
  ~10% relative on a normal sample is noise -> WATCH, do not raise it with the client.
- Localize the leak: fewer returners (first-to-second-purchase / Post-Purchase / Winback)
  vs. same returners spending less (offer/merch). Use cohort decay for WHEN, flow health
  for WHETHER the safety net is deployed.
- Check deliverability before calling anything a content problem.
- Every row must carry: a number, its source, the time window, and a confidence level.
- For each raised signal, write a client-safe line: plain English, no internal metric names
  exposed raw, no alarm. Where access is missing, say so explicitly instead of guessing.

RETURN:
1. A one-paragraph client-facing summary (the AM could read it aloud).
2. A status table using exactly this header row:
   | Signal | Reading | Evidence | Confidence | Client-safe line | Next action |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace
   the table with prose.
3. The 2-3 signals worth raising in the meeting, and why each cleared the bar.
4. What's being monitored quietly (and what would promote it to a "raise").
5. The single recommended next play, with owner and timing.
6. What evidence is blocked/low-sample and what you'd need to upgrade it.
```

## Decision rules

- **Raise it (FIX / REFRESH / KILL as fits)** — only when the signal clears sample (passes the data-sufficiency gate) **and** the move is material: a baseline meaningfully below category, or a trend beyond ~±3 points / ~10% relative on a clean, promo-free window, **and** you can attach a number, source, time window, and confidence level to it. If you can't defend all four, it doesn't go in the meeting.
- **FIX** — a core flow is off/stalled, deliverability has degraded (open-rate step-down, spam complaints >~0.3%, unauthenticated domain), or the commerce↔Klaviyo sync is broken. These are concrete, agency-ownable, and usually the highest-leverage thing to raise.
- **REFRESH** — a live flow or program is decaying but still credible: Post-Purchase converting below benchmark, a Winback that's gone stale, returning-customer AOV slipping while traffic holds.
- **WATCH** — directional or early: a 1–2 point move inside noise, a young cohort, a segment near the sample floor, or a window polluted by a promo. Monitor quietly; do not raise.
- **KEEP** — repeat-rate and returning-revenue share inside the category band, core flows live and converting, deliverability clean. Say so plainly — a confident "retention is healthy, here's the proof" is a deliverable.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- **Never alarm a client on weak or low-sample data.** A scary-looking move on a 40-customer cohort or a 150-recipient flow is not a finding — it's a data gap. Under sample, the only honest move is "we need more weeks."
- **Don't expose raw internal metrics without framing.** "Your day-60 cohort decay is 71%" is not a client sentence. Translate every number into plain, non-alarming language; keep the raw figure in the evidence column, not the talk track.
- **Where data access is missing, say so explicitly — never paper over it with a guess.** "We can't yet see SMS attribution because Attentive isn't connected" beats an invented number every time.
- **Don't call a promo-distorted window a trend.** A repeat-rate spike or dip that straddles a sale is borrowed demand, not retention movement.
- **Don't attribute causality to a single platform metric.** A Klaviyo open-rate dip can be Apple MPP inflation unwinding, not disengagement. Corroborate before you conclude.
- **Don't blame content when deliverability is the cause** — and vice versa.
- **Don't recommend any write** (pausing/launching a flow, sending a campaign, editing segments) without an explicit human approval step.

## Output

A client action packet: a one-paragraph client-facing summary, then a status table, then the 2–3 to raise and the recommended next play.

Status table columns:

| Signal | Reading | Evidence | Confidence | Client-safe line | Next action |
|---|---|---|---|---|---|
| Post-Purchase flow | Off | Klaviyo flow status, 90d | High | "There's an easy win we'd like to switch on for repeat buyers." | FIX — launch flow (Retention Lead, this sprint) |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
