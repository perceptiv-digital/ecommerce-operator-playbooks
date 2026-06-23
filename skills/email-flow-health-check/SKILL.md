---
name: email-flow-health-check
description: "When an ecommerce operator needs to decide: Which lifecycle flows are underperforming or broken? Runs the Klaviyo Flow Health Check play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Klaviyo Flow Health Check', 'Klaviyo', 'Commerce', 'Retention Ltv'."
license: CC-BY-4.0
metadata:
  persona: Retention / Email Lead
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Klaviyo Flow Health Check

**Operating question:** Which lifecycle flows are underperforming or broken?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Flow status + configuration** — for each of the seven core flows: is it **Live, Draft, or Manual**? What is the **trigger** (and does it still match the current store events), and what **flow filters / trigger filters** are applied? This is the silent-killer check and it comes first.
- **Per-flow performance (last 30 days)** — **recipients**, **click rate**, **placed-order rate**, and **revenue per recipient** for each flow (and ideally each message in the flow). Revenue per recipient is the number that matters most; total revenue just flatters big lists.
- **Deliverability gates (account-level, last 30 days)** — **spam-complaint rate** (keep under ~0.1%, i.e. 1 in 1,000), **bounce rate**, **sending-domain / dedicated-IP reputation**, and **list growth vs. unsubscribe + spam**. These sit *above* flow performance: if they're red, every flow number below is suspect.
- **Attribution settings** — your Klaviyo **conversion window** (default 5-day click / 5-day open) so you can flag where flow-attributed revenue overlaps with campaigns or other flows.
- **Benchmarks by flow type** — judge each flow against its *own* type, never against another. An abandoned-checkout flow earning $2-4/recipient is normal; a post-purchase or newsletter-style flow at $0.30/recipient can be perfectly healthy.

Optional, if available:

- **Apple Mail Privacy Protection share of your list** — if a large slice of opens are MPP-inflated machine opens, open rate is noise. Lean on clicks and placed-order rate regardless.
- **Recent send-volume changes or a list import** — a sudden volume spike or a cold imported list is the usual cause of a spam-complaint spike.
- **Promo calendar** — a sitewide promo inflates placed-order rate across every flow for that window and borrows demand.
- **Store AOV and contribution margin** — to convert revenue per recipient into recoverable *profit* and rank fixes properly.
- **Flow last-edited date** — to tell a genuinely fatigued flow apart from one a teammate just changed.

## How to decide — in order

1. **Gate on deliverability first.** If account spam-complaint rate is over ~0.3% (3x the 0.1% ceiling), or bounce rate is elevated, or domain reputation is degraded -> the whole program is **FIX** and you stop judging individual flows. A deliverability problem upstream invalidates every flow-level read below it; great copy can't out-perform the spam folder.
2. **Check status before performance — the silent killer.** Any core flow in **Draft or Manual**, or with a **trigger/filter that no longer matches store events**, is **FIX** regardless of its numbers. A flow earning $0 because it isn't sending is not "underperforming" — it's off. Catch this before you read a single rate.
3. **Throw out the open rate.** Post-Apple Mail Privacy Protection, opens are inflated by machine pre-fetching and are unreliable. Judge on **click rate** and **placed-order rate** only. Never KILL or KEEP a flow on opens.
4. **Gate on sample size.** Any flow with too few recipients in the window (rule of thumb: under ~200 in 30 days) is **WATCH** — the rates are noise, not signal. Small samples can't earn a KILL.
5. **Rank by revenue per recipient vs. flow-type benchmark.** Compare each flow only to its own type. A live abandoned-checkout flow at $0.40/recipient is broken; a winback at $0.40/recipient may be fine. Flag the gap to benchmark, not the raw number.
6. **Decompose the underperformers.** For a live, well-sampled flow below benchmark, split the problem: **click rate low** -> copy/subject/CTA/timing problem -> REFRESH. **Click rate fine but placed-order rate low** -> offer/landing/product or attribution-window problem, not a copy problem. **Recipients far lower than expected** -> trigger or filter is over-restricting -> FIX.
7. **Apply the vetoes**, then assign status + owner + recheck date, ranked by recoverable revenue (revenue-per-recipient gap x recipients).

## The prompt to run

```text
You are my retention / lifecycle email analyst running the "Klaviyo Flow Health Check" play.

GOAL: decide which of my core Klaviyo flows to KILL, REFRESH, WATCH, KEEP, or FIX,
ranked by recoverable revenue (revenue-per-recipient gap x recipients) — not by total
revenue and not by open rate.

I will paste, for the seven core flows (welcome, abandoned checkout, browse abandonment,
post-purchase, winback/sunset, replenishment, VIP): each flow's status (Live/Draft/Manual),
trigger + filters, recipients (30d), click rate, placed-order rate, and revenue per
recipient. I will also paste account deliverability: spam-complaint rate, bounce rate,
domain reputation, and my Klaviyo conversion window. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If [critical input]
is missing, STOP and return only (a) what's missing and (b) how to get it — never estimate
it or proceed. Here [critical input] = each flow's Live/Draft/Manual status AND account
deliverability (spam-complaint rate). A deliverability problem invalidates every flow read
below it, and a Draft/Manual flow earns $0 — so without these two I cannot tell a broken
flow from an underperforming one, and any ranking I produce would be fiction. Do not infer
status from revenue or guess a complaint rate.

RULES:
- Deliverability gate first: if spam-complaint rate is over ~0.3%, bounce rate is elevated,
  or domain reputation is degraded, mark the whole program FIX and do not judge flows.
- Status before performance: any flow in Draft/Manual, or with a trigger/filter that no
  longer matches store events, is FIX — even if revenue looks fine. A live flow earning $0
  with healthy recipients is a broken trigger, not weak copy.
- Ignore open rate entirely (Apple Mail Privacy Protection makes it unreliable). Judge on
  click rate and placed-order rate only.
- Protect thin samples: any flow under ~200 recipients in 30 days is WATCH, never KILL.
- Benchmark revenue per recipient by FLOW TYPE. Abandoned checkout should massively
  outperform a newsletter/post-purchase flow. Never compare a flow to a different type.
- For underperformers, name the driver: low click rate = copy/subject/CTA/timing;
  click fine but placed-order low = offer/landing/attribution-window; low recipients =
  trigger/filter over-restricting.
- Do not claim flow revenue is incremental — note that the conversion window overlaps
  campaigns and other flows.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked table using exactly this header row:
   | Flow | Status | Recipients (30d) | Click % | Placed-order % | Rev/recipient | Issue | Action | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **FIX** — the flow is in Draft/Manual, its trigger/filter no longer matches store events, the Klaviyo<->store integration is stale, or an account-level deliverability gate (spam complaints over ~0.3%, high bounces, degraded domain) makes every flow read unsafe. A live flow earning $0 at healthy recipient volume is FIX (broken trigger), not KILL.
- **KILL** — a live, well-sampled flow (>~200 recipients/30d) whose revenue per recipient is far below its flow-type benchmark *after* a copy refresh has already failed, and where the flow has no credible path back (e.g. a redundant flow duplicating another's sends and cannibalizing attribution).
- **REFRESH** — a live, well-sampled flow below its type benchmark with a fixable driver: low click rate (subject/CTA/timing), or a click-to-order gap traced to offer/landing — where the audience and intent are still real.
- **WATCH** — thin sample (under ~200 recipients/30d), a brand-new flow, or a window polluted by a promo, list import, or volume change. Directional only.
- **KEEP** — live, within or above its flow-type benchmark on click rate and placed-order rate, deliverability clean.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- Do **not** judge a flow on **open rate** — Apple Mail Privacy Protection inflates it. Clicks and placed-order rate only.
- Do **not** KILL or KEEP a flow on a **thin sample** (under ~200 recipients in the window) — the rates are noise.
- Do **not** read flow-level performance at all when a **deliverability gate upstream is red** — fix the program first; the flow numbers are invalid.
- Do **not** call a flow's attributed revenue **incremental** without noting that Klaviyo's conversion window (default 5-day click / 5-day open) overlaps campaigns and other flows — some of that revenue would have happened anyway.
- Do **not** benchmark a flow against a **different flow type** (a post-purchase flow will always lose to abandoned checkout on rev/recipient — that's not a problem).
- Do **not** push any flow live, edit a trigger, change a segment, or send to a list **without an explicit human approval step**.

## Output

A flow health map ranked by **recoverable revenue**, with blocked evidence and the next check date:

| Flow | Status | Recipients (30d) | Click % | Placed-order % | Rev/recipient | Issue | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Browse abandonment | Live | 1,840 | 1.1% | 0.4% | $0.18 | Below type benchmark, weak CTA | REFRESH | Retention | 14 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
