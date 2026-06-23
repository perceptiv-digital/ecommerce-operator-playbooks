---
slug: "email-flow-health-check"
title: "Klaviyo Flow Health Check"
operating_question: "Which lifecycle flows are underperforming or broken?"
primary_persona: "retention"
personas: ["retention"]
category: "retention-ltv"
platforms: ["klaviyo", "commerce"]
cadence: "weekly"
public_tier: "launch"
---

# Klaviyo Flow Health Check

## Operating Question

**Which of my Klaviyo lifecycle flows are silently broken, underperforming, or leaking revenue per recipient — and which deserve the next hour of work, ranked by recoverable revenue?**

Flows are the part of an email program that runs without anyone watching. A campaign that fails is loud — someone notices the send didn't go out. A flow that fails is silent: a welcome series toggled to **Draft** during a theme migration, an abandoned-checkout trigger pointed at the wrong metric after a Shopify checkout-extensibility update, a sunset filter that quietly excludes everyone. It keeps showing green in the flow list while earning **$0**. This play audits the seven core flows — welcome/signup, abandoned checkout, browse abandonment, post-purchase/thank-you, winback/sunset, replenishment, VIP — and forces a **KILL / REFRESH / WATCH / KEEP / FIX** call on each, ranked by **revenue per recipient** and the dollars you can actually recover, not by open rate and not by total revenue (which just rewards your biggest list).

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see inside your Klaviyo account. It cannot tell you that your browse-abandonment flow is in **Manual** mode, that your spam-complaint rate crept to 0.18% last Tuesday, or that your "abandoned cart" flow has been firing on `Started Checkout` instead of `Added to Cart` and double-counting against the real checkout flow. To run this manually you have to:

1. Open each flow in Klaviyo and check its **live/draft/manual** status and the trigger + flow filters by hand — the dashboard does not surface "this flow is earning nothing" for you.
2. Pull the **Flow Performance** report for a 30-day window, then read **per-message** analytics (recipients, click rate, placed-order rate, revenue) message by message.
3. Cross-check the **Deliverability** tab for spam-complaint rate, bounce rate, and the sending-domain reputation, because a deliverability problem invalidates every performance number above it.
4. Reconcile Klaviyo's **attributed** revenue against actual store orders, because the default 5-day click / 5-day open conversion window overlaps with campaigns and with other flows.

**The thinking in this playbook is free. The data access is the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live line into Klaviyo and your store, that wall is where manual runs stop. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Retention / Email / Lifecycle Lead
- **Also useful for:** Head of Ecommerce (retention is often 25–40% of revenue and the cheapest to defend), Founder/CEO of a small store running Klaviyo themselves, an agency retention strategist auditing a new account.
- Run it **before** you build a new flow or rewrite copy — a broken trigger or a deliverability gate makes any creative work pointless until it's fixed.

## When To Run It

- **Cadence:** weekly for a high-volume store; monthly is the floor. Always run a full audit after any **Shopify theme change, checkout-extensibility migration, Klaviyo plan/integration reconnect, or domain/DNS change** — those are the four events that silently break triggers.
- **Triggers:** flow revenue drops week over week with no campaign change; a deliverability warning in Klaviyo; spam complaints climbing; a new flow you just turned on; onboarding a store you've never audited.
- **Pre-requisite:** confirm the **Klaviyo <-> store integration is connected and syncing** (Settings -> Integrations). A stale integration breaks `Placed Order` and `Started Checkout` metrics and will make healthy flows look dead.

## Required Evidence

- **Flow status + configuration** — for each of the seven core flows: is it **Live, Draft, or Manual**? What is the **trigger** (and does it still match the current store events), and what **flow filters / trigger filters** are applied? This is the silent-killer check and it comes first.
- **Per-flow performance (last 30 days)** — **recipients**, **click rate**, **placed-order rate**, and **revenue per recipient** for each flow (and ideally each message in the flow). Revenue per recipient is the number that matters most; total revenue just flatters big lists.
- **Deliverability gates (account-level, last 30 days)** — **spam-complaint rate** (keep under ~0.1%, i.e. 1 in 1,000), **bounce rate**, **sending-domain / dedicated-IP reputation**, and **list growth vs. unsubscribe + spam**. These sit *above* flow performance: if they're red, every flow number below is suspect.
- **Attribution settings** — your Klaviyo **conversion window** (default 5-day click / 5-day open) so you can flag where flow-attributed revenue overlaps with campaigns or other flows.
- **Benchmarks by flow type** — judge each flow against its *own* type, never against another. An abandoned-checkout flow earning $2-4/recipient is normal; a post-purchase or newsletter-style flow at $0.30/recipient can be perfectly healthy.

## Optional Evidence (changes the answer when present)

- **Apple Mail Privacy Protection share of your list** — if a large slice of opens are MPP-inflated machine opens, open rate is noise. Lean on clicks and placed-order rate regardless.
- **Recent send-volume changes or a list import** — a sudden volume spike or a cold imported list is the usual cause of a spam-complaint spike.
- **Promo calendar** — a sitewide promo inflates placed-order rate across every flow for that window and borrows demand.
- **Store AOV and contribution margin** — to convert revenue per recipient into recoverable *profit* and rank fixes properly.
- **Flow last-edited date** — to tell a genuinely fatigued flow apart from one a teammate just changed.

## How To Pull This Evidence

- **Flow status (Live/Draft/Manual)** — Klaviyo left nav -> **Flows**. The status pill sits next to each flow name in the list; open the flow and check the toggle (Live vs. Draft/Manual) plus the trigger and flow/trigger filters in the trigger card. This is the silent-killer check — do it for all seven core flows first.
- **Per-flow performance (recipients / click / placed-order / rev-per-recipient)** — open a flow -> **Analytics** tab, set the date range to the last 30 days. Read recipients, click rate, placed-order rate, and revenue per recipient at the flow level; drill into per-message analytics where a flow is below benchmark. Or pull the account-wide **Flow Performance** report (Analytics -> Reports / Flows) for all flows in one view.
- **Deliverability (spam-complaint + bounce)** — **Analytics -> Deliverability** tab (or Account -> Deliverability). Record spam-complaint rate (keep under ~0.1%), bounce rate, and sending-domain / dedicated-IP reputation for the last 30 days. These gate everything — if they're red, every flow number below is suspect.
- **MPP open-rate gotcha** — Apple Mail Privacy Protection pre-fetches images and inflates opens with machine opens, so Klaviyo's open rate is noise for any list with meaningful Apple Mail share. Never judge a flow on opens — lean on click rate and placed-order rate, which MPP does not touch.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Gate on deliverability first.** If account spam-complaint rate is over ~0.3% (3x the 0.1% ceiling), or bounce rate is elevated, or domain reputation is degraded -> the whole program is **FIX** and you stop judging individual flows. A deliverability problem upstream invalidates every flow-level read below it; great copy can't out-perform the spam folder.
2. **Check status before performance — the silent killer.** Any core flow in **Draft or Manual**, or with a **trigger/filter that no longer matches store events**, is **FIX** regardless of its numbers. A flow earning $0 because it isn't sending is not "underperforming" — it's off. Catch this before you read a single rate.
3. **Throw out the open rate.** Post-Apple Mail Privacy Protection, opens are inflated by machine pre-fetching and are unreliable. Judge on **click rate** and **placed-order rate** only. Never KILL or KEEP a flow on opens.
4. **Gate on sample size.** Any flow with too few recipients in the window (rule of thumb: under ~200 in 30 days) is **WATCH** — the rates are noise, not signal. Small samples can't earn a KILL.
5. **Rank by revenue per recipient vs. flow-type benchmark.** Compare each flow only to its own type. A live abandoned-checkout flow at $0.40/recipient is broken; a winback at $0.40/recipient may be fine. Flag the gap to benchmark, not the raw number.
6. **Decompose the underperformers.** For a live, well-sampled flow below benchmark, split the problem: **click rate low** -> copy/subject/CTA/timing problem -> REFRESH. **Click rate fine but placed-order rate low** -> offer/landing/product or attribution-window problem, not a copy problem. **Recipients far lower than expected** -> trigger or filter is over-restricting -> FIX.
7. **Apply the vetoes**, then assign status + owner + recheck date, ranked by recoverable revenue (revenue-per-recipient gap x recipients).

## Manual Workflow

1. In Klaviyo, open **Flows** and list the status (Live / Draft / Manual) and trigger + filters for each of the seven core flows. Anything not Live, or with a stale trigger, is flagged FIX immediately.
2. Open the **Deliverability** tab. Record spam-complaint rate, bounce rate, and domain reputation for the last 30 days. If any is red, stop and mark the program FIX.
3. Pull **Flow Performance** for the last 30 days: recipients, click rate, placed-order rate, and revenue per recipient per flow (drill into per-message where a flow is underperforming).
4. Note your **conversion window** and whether the audit window overlaps a promo, a list import, or a recent volume change.
5. Tag each flow's sample as sufficient or thin (rule 4) and compute the gap to its flow-type benchmark (rule 5).
6. Paste the prompt below with your flow table and deliverability numbers.
7. Pressure-test every KILL/REFRESH against the veto list, then convert survivors into an action packet with owner and recheck date.

## Copy-Paste Prompt

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

## Decision Rules

- **FIX** — the flow is in Draft/Manual, its trigger/filter no longer matches store events, the Klaviyo<->store integration is stale, or an account-level deliverability gate (spam complaints over ~0.3%, high bounces, degraded domain) makes every flow read unsafe. A live flow earning $0 at healthy recipient volume is FIX (broken trigger), not KILL.
- **KILL** — a live, well-sampled flow (>~200 recipients/30d) whose revenue per recipient is far below its flow-type benchmark *after* a copy refresh has already failed, and where the flow has no credible path back (e.g. a redundant flow duplicating another's sends and cannibalizing attribution).
- **REFRESH** — a live, well-sampled flow below its type benchmark with a fixable driver: low click rate (subject/CTA/timing), or a click-to-order gap traced to offer/landing — where the audience and intent are still real.
- **WATCH** — thin sample (under ~200 recipients/30d), a brand-new flow, or a window polluted by a promo, list import, or volume change. Directional only.
- **KEEP** — live, within or above its flow-type benchmark on click rate and placed-order rate, deliverability clean.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- Do **not** judge a flow on **open rate** — Apple Mail Privacy Protection inflates it. Clicks and placed-order rate only.
- Do **not** KILL or KEEP a flow on a **thin sample** (under ~200 recipients in the window) — the rates are noise.
- Do **not** read flow-level performance at all when a **deliverability gate upstream is red** — fix the program first; the flow numbers are invalid.
- Do **not** call a flow's attributed revenue **incremental** without noting that Klaviyo's conversion window (default 5-day click / 5-day open) overlaps campaigns and other flows — some of that revenue would have happened anyway.
- Do **not** benchmark a flow against a **different flow type** (a post-purchase flow will always lose to abandoned checkout on rev/recipient — that's not a problem).
- Do **not** push any flow live, edit a trigger, change a segment, or send to a list **without an explicit human approval step**.

## Output Contract

A flow health map ranked by **recoverable revenue**, with blocked evidence and the next check date:

| Flow | Status | Recipients (30d) | Click % | Placed-order % | Rev/recipient | Issue | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Browse abandonment | Live | 1,840 | 1.1% | 0.4% | $0.18 | Below type benchmark, weak CTA | REFRESH | Retention | 14 days |

## Worked Example

> **Executive read:** Two of seven flows are dead weight that look alive. Browse abandonment is **Live but earning $0** on 2,100 recipients — the trigger broke after the May theme migration and is firing on a metric the store no longer emits; that's a FIX, and it's the single biggest recoverable line. Abandoned checkout is the only genuinely healthy revenue flow ($3.10/recipient); the welcome series under-converts on a weak CTA, not bad deliverability (spam complaints are clean at 0.04%). Do not judge any flow on open rate — MPP makes it meaningless here.

| Flow | Status | Recipients (30d) | Click % | Placed-order % | Rev/recipient | Issue | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Abandoned checkout | Live | 1,420 | 6.8% | 9.1% | **$3.10** | Above type benchmark, healthy | **KEEP** | Retention | 30 days |
| Welcome / signup | Live | 3,260 | 2.9% | 1.4% | $0.62 | Click fine, weak first-email CTA | **REFRESH** | Retention + Copy | 14 days |
| Browse abandonment | **Live but $0** | 2,100 | 0.0% | 0.0% | **$0.00** | Trigger broke post-theme-migration | **FIX** | Retention + Dev | Today |
| Post-purchase / thank-you | Live | 2,540 | 3.4% | 0.6% | $0.41 | On-benchmark for type | **KEEP** | Retention | 30 days |
| Winback / sunset | Live | 180 | 1.0% | 0.0% | $0.00 | Only 180 recipients — too thin | **WATCH** | Retention | 30 days |
| Replenishment | **Draft** | 0 | n/a | n/a | n/a | Built but never turned on | **FIX** | Retention | Today |
| VIP | Live | 410 | 5.2% | 4.8% | $2.05 | Strong for small VIP segment | **KEEP** | Retention | 30 days |

Note how the answer *inverts* the dashboard view: the flow list shows browse abandonment as a green "Live" flow, but it's earning nothing on real volume — a broken trigger masquerading as a performance problem. The replenishment flow was never even switched on. The two highest-leverage moves this week are both FIXes, not creative rewrites.

## Common Failure Modes

- Judging a flow on open rate when Apple Mail Privacy Protection has made opens meaningless.
- Reading "Live and green" in the flow list as "working" — without checking whether the trigger still fires or the flow is in Manual.
- Comparing every flow to the same benchmark, then "concluding" the post-purchase flow is broken because it earns less than abandoned checkout.
- Ranking by total flow revenue (which just rewards list size) instead of revenue per recipient and recoverable dollars.
- Reading flow performance while spam complaints or bounces are red upstream — the numbers are already invalid.
- Calling flow-attributed revenue pure incremental lift without noting conversion-window overlap with campaigns and other flows.

## Run This Play With Live Data

**Manual version:** open each of seven flows to check status and triggers, pull Flow Performance for 30 days, cross-check the Deliverability tab, reconcile attributed revenue against real orders, and rebuild the benchmark-by-type comparison — every week.

**ShopMCP version:** connect Klaviyo and your store once. Ask the question; ShopMCP pulls every flow's live status, trigger config, and 30-day per-flow metrics, reads account deliverability, runs the deliverability gate and the status-before-performance check, benchmarks revenue per recipient by flow type, and returns the ranked KILL/REFRESH/WATCH/KEEP/FIX table — surfacing "Live but $0" broken triggers the dashboard hides. It stays **read-only** until you explicitly approve turning a flow on or editing a trigger.

> No Klaviyo connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of an afternoon of clicking through seven flows and two deliverability tabs.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Klaviyo Flow Health Check play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Opening seven flows by hand to check status, triggers, and filters.
- Catching the "Live but $0" broken-trigger flows the dashboard shows as green.
- Cross-checking the Deliverability tab and reconciling attributed revenue against real orders.
- Rebuilding the same benchmark-by-flow-type comparison every week.
