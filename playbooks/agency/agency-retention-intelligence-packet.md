---
schema_version: 1
slug: "agency-retention-intelligence-packet"
title: "Retention Intelligence Packet"
summary: "Retention Intelligence Packet helps ecommerce operators answer: What should the agency tell this client about retention risk and next actions?"
operating_question: "What should the agency tell this client about retention risk and next actions?"
short_title: "Retention Intelligence"
primary_persona: "agency"
personas: ["agency", "retention"]
category: "agency-portfolio"
platforms: ["commerce", "klaviyo", "attentive"]
cadence: "weekly"
difficulty: "intermediate"
manual_time_minutes_min: 45
manual_time_minutes_max: 90
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "client-action-packet"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: true
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://shop-mcp.app"
shopmcp_prompt: "Run the Retention Intelligence Packet play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Retention Intelligence Packet

## Operating Question

**What do I, as the account lead, walk into this client's meeting and say about their retention health — which signals are real enough to raise, which to monitor quietly, and what's the one next play I'm recommending?**

Every account review, the client asks some version of "so how are we doing on retention?" The trap is answering from vibes, or worse, from a single metric a dashboard surfaced that morning. This play turns the per-client retention picture — repeat-purchase rate and its trend, share of revenue from returning customers, 30/60/90-day cohort decay, the health of the core lifecycle flows, deliverability, and list growth versus churn — into an **AM-ready packet**: a one-paragraph client-facing summary, a status table, the two or three things actually worth raising, and the recommended next play. The hard part is not pulling the numbers. It is separating a *real* intervention need from *missing-data noise* so you don't cry wolf, and translating internal metrics into **client-safe** language that informs without alarming.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant can't see the client's Shopify orders, their Klaviyo flows, or their Attentive subscriber file — and even if you paste exports in, the retention story lives in the *seams between* those systems, which is exactly where boilerplate goes wrong. To run this manually you have to:

1. Pull the commerce side — orders with customer IDs over at least 12 months, so you can compute repeat-purchase rate, returning-customer revenue share, and cohort retention by acquisition month.
2. Pull Klaviyo flow performance (Welcome, Browse Abandon, Abandoned Cart, Post-Purchase, Winback), campaign-attributed revenue, list growth, and the deliverability panel (open/click trend, spam rate, unsub rate).
3. Pull Attentive (or the SMS platform) subscriber growth, journey performance, and opt-out rate — a separate export with its own date logic.
4. Reconcile three different attribution models and three different date-window conventions before any number means anything.
5. Then do the genuinely hard part: decide which gaps are *signal* and which are just *a flow that was never turned on* or *a 41-subscriber segment too small to read*.

**The thinking in this playbook is free. The per-client data access — across many client stores — is the hard part, and that is exactly what ShopMCP connects.** If your assistant has no live line into each client's commerce, Klaviyo, and Attentive, that wall is where manual runs stall. Hold that thought; the last section shows the one-prompt, run-it-across-the-roster version.

## Who Should Run It

- **Primary owner:** Agency Account Manager / COO preparing for a client review.
- **Also useful for:** Retention / Email Lead (owns the fix), Agency Founder (portfolio risk across accounts), the AM's manager sense-checking what gets said to the client.
- Run it **the day before** a monthly or quarterly business review, or whenever a client emails "are our emails even working?" before you've looked.

## When To Run It

- **Cadence:** weekly for a quiet pre-read; always immediately before any scheduled client review (QBR, monthly check-in, renewal conversation).
- **Triggers:** an upcoming renewal, a client who's gone quiet, a visible drop in email/SMS revenue share, a deliverability scare (a Gmail/Yahoo bounce spike), or onboarding a new account where you need a retention baseline.
- **Pre-requisite:** confirm the commerce↔Klaviyo customer sync is healthy and the lookback window has enough order history (≥12 months) to compute cohorts. A 3-month-old store has no cohort decay to read — say that, don't fabricate one.

## Required Evidence

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — orders with customer identifiers, ≥12 months. Derive: **repeat-purchase rate** (share of customers with ≥2 orders) and its trend, **% of revenue from returning customers**, **AOV** new vs. returning, and **cohort retention** — for each acquisition month, the % of that cohort that ordered again by day 30 / 60 / 90.
- **Klaviyo** — per-flow performance for the core lifecycle (Welcome, Browse/Site Abandon, Abandoned Cart, Post-Purchase / Cross-sell, Winback): live status, open/click/placed-order rate, attributed revenue. Plus **list growth** (net new subscribers minus suppressions), **deliverability** (open-rate trend, spam-complaint rate, unsub rate, sending-domain health), and **email's share of total revenue**.
- **Attentive (or SMS platform)** — subscriber growth, opt-out rate, journey/automation performance, and **SMS share of total revenue**, where connected.
- **Targets / context** — the client's own retention goal or LTV/payback target if one exists; otherwise the category benchmark you'll judge against (state which).

## Optional Evidence

- **Promotion calendar** — a sitewide sale spikes repeat-rate and returning-customer revenue, then borrows from the next window. Cohorts straddling a Black Friday read hot for the wrong reason.
- **Recent flow/template changes** — a flow paused or rebuilt mid-window explains a "decay" that is really an edit.
- **Acquisition-mix shift** — a surge of discount-led or marketplace first orders lowers repeat-rate without anything being broken; it's a different customer.
- **Subscription / replenishment products** — change the entire baseline; a 55% repeat-rate is unremarkable for coffee, excellent for mattresses.
- **Known deliverability incidents** — a domain reputation dip or a Klaviyo dedicated-IP warmup in progress.

## How To Pull This Evidence

- **Shopify repeat-rate & returning-customer revenue** — Shopify admin → Analytics → Reports → *Customers* (first-time vs. returning, repeat customer rate) and *Sales by customer type* for the returning-revenue share; cross-check against a raw orders export with customer IDs so the math is yours, not the dashboard's.
- **Shopify cohorts** — Analytics → Reports → *Customer cohort analysis* for retention by acquisition month, or build 30/60/90-day decay yourself from the orders export (group by first-order month, count who reordered by day 30/60/90).
- **Klaviyo flow health** — Analytics → *Flows* for per-flow live status and open/click/placed-order rate on the core lifecycle (Welcome, Browse/Site Abandon, Abandoned Cart, Post-Purchase, Winback); confirm each flow is actually *live and sending*, not just drafted.
- **Klaviyo deliverability** — the *Deliverability* tab (or the email performance report) for open-rate trend, spam-complaint rate, unsub rate, and sending-domain authentication status.
- **Klaviyo / Attentive list growth** — Klaviyo *Growth* / list-growth report for net new subscribers minus suppressions; Attentive → *Audience* / Reporting for subscriber growth, opt-out rate, and journey/automation performance plus SMS revenue share.
- **Small-sample / client-safe gotcha** — every export above degrades when the window is thin: a cohort under ~50 customers, a flow under ~200 recipients, or a segment under ~50 profiles reads as anecdote, not signal. Note the sample beside every number, and never carry an under-sample figure — or a metric a platform isn't even connected to — into a client-facing line. Flag it blind instead.

Or skip all of this — ShopMCP pulls it live across every client.

## The Decision Logic (run in this order)

1. **Gate on data sufficiency first.** Before reading any trend, check sample and history. Cohorts need ≥12 months of orders and ≥~50 customers per cohort to be stable; a flow needs ≥~200 recipients in the window to judge its rate; a list segment under ~50 profiles is anecdote, not signal. Anything that fails the gate is **FIX** (data/access gap) and is reported as *"can't see this yet,"* never guessed.
2. **Establish the baseline before the trend.** Is this client's absolute repeat-purchase rate healthy *for its category* (most non-replenishment DTC lands ~20–30% repeat; replenishment 40%+)? A flat 18% repeat-rate is a bigger story than a 2-point wobble on a healthy 35%.
3. **Read the trend against a clean window.** Compare the trailing 90 days to the prior 90 (and year-over-year if seasonal). Strip promo-distorted weeks before calling a move real. A change inside roughly ±3 points / ±10% relative on a normal-sample metric is noise — **WATCH**, don't raise.
4. **Localize the leak — acquisition, first-repeat, or loyal.** Decompose: is returning-customer revenue share falling because *fewer* customers come back (a first-to-second-purchase problem → Post-Purchase flow + winback), or because *the same* returners spend less (an offer/merch problem)? Cohort decay tells you *when* customers drop; flow health tells you *whether the safety net is even deployed*.
5. **Check the safety net is actually on.** Map each core flow: live or off, sending or stalled, converting or not. A dark Post-Purchase or Winback flow is the single most common, most fixable retention leak — and it's an agency win, not a client failing.
6. **Gate on deliverability before blaming content.** If open-rate has stepped down, spam complaints are above ~0.3%, or the sending domain is unauthenticated, *that* is the retention story, not "the emails need a refresh." Deliverability problems masquerade as content problems.
7. **Translate to client-safe, then triage to raise vs. monitor.** Convert each surviving signal into plain, non-alarming language with the number, source, window, and confidence behind it. Raise only the two or three that clear the Decision Rules; everything else is monitored quietly. End with one recommended next play.

## Manual Workflow

1. Set the client and the window (trailing 90 days vs. prior 90; pull 12+ months of orders for cohorts).
2. Export commerce orders with customer IDs; compute repeat-purchase rate + trend, returning-customer revenue share, new-vs-returning AOV, and 30/60/90-day cohort retention by acquisition month.
3. Export Klaviyo: core-flow performance + status, list growth, deliverability panel, email revenue share. Export Attentive: subscriber growth, opt-out rate, SMS revenue share.
4. Run the **data-sufficiency gate** (Logic step 1): mark every metric exact / estimated / partial / unavailable. Drop or flag anything below sample.
5. Establish baseline-vs-category, then trend-vs-clean-window; localize the leak; map the flow safety net; check deliverability.
6. Paste the prompt below with your tables and the client's category/context.
7. Pressure-test every "raise this" against the Veto Rules, write the client-safe lines, and assemble the packet: one-paragraph summary + status table + the 2–3 to raise + the next play.

## Copy-Paste Prompt

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

## Decision Rules

- **Raise it (FIX / REFRESH / KILL as fits)** — only when the signal clears sample (passes the data-sufficiency gate) **and** the move is material: a baseline meaningfully below category, or a trend beyond ~±3 points / ~10% relative on a clean, promo-free window, **and** you can attach a number, source, time window, and confidence level to it. If you can't defend all four, it doesn't go in the meeting.
- **FIX** — a core flow is off/stalled, deliverability has degraded (open-rate step-down, spam complaints >~0.3%, unauthenticated domain), or the commerce↔Klaviyo sync is broken. These are concrete, agency-ownable, and usually the highest-leverage thing to raise.
- **REFRESH** — a live flow or program is decaying but still credible: Post-Purchase converting below benchmark, a Winback that's gone stale, returning-customer AOV slipping while traffic holds.
- **WATCH** — directional or early: a 1–2 point move inside noise, a young cohort, a segment near the sample floor, or a window polluted by a promo. Monitor quietly; do not raise.
- **KEEP** — repeat-rate and returning-revenue share inside the category band, core flows live and converting, deliverability clean. Say so plainly — a confident "retention is healthy, here's the proof" is a deliverable.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- **Never alarm a client on weak or low-sample data.** A scary-looking move on a 40-customer cohort or a 150-recipient flow is not a finding — it's a data gap. Under sample, the only honest move is "we need more weeks."
- **Don't expose raw internal metrics without framing.** "Your day-60 cohort decay is 71%" is not a client sentence. Translate every number into plain, non-alarming language; keep the raw figure in the evidence column, not the talk track.
- **Where data access is missing, say so explicitly — never paper over it with a guess.** "We can't yet see SMS attribution because Attentive isn't connected" beats an invented number every time.
- **Don't call a promo-distorted window a trend.** A repeat-rate spike or dip that straddles a sale is borrowed demand, not retention movement.
- **Don't attribute causality to a single platform metric.** A Klaviyo open-rate dip can be Apple MPP inflation unwinding, not disengagement. Corroborate before you conclude.
- **Don't blame content when deliverability is the cause** — and vice versa.
- **Don't recommend any write** (pausing/launching a flow, sending a campaign, editing segments) without an explicit human approval step.

## Output Contract

A client action packet: a one-paragraph client-facing summary, then a status table, then the 2–3 to raise and the recommended next play.

Status table columns:

| Signal | Reading | Evidence | Confidence | Client-safe line | Next action |
|---|---|---|---|---|---|
| Post-Purchase flow | Off | Klaviyo flow status, 90d | High | "There's an easy win we'd like to switch on for repeat buyers." | FIX — launch flow (Retention Lead, this sprint) |

## Worked Example

**Client:** *Marlowe & Field* (fictional premium home-fragrance DTC, ~$2.1M/yr, non-replenishment, Shopify + Klaviyo + Attentive). Trailing 90 days vs. prior 90; 14 months of order history.

> **Client-facing summary (the AM reads this aloud):** "Retention is fundamentally healthy — about a third of your revenue now comes from returning customers, and your welcome and cart flows are doing real work. Two things we'd like to act on: there's a post-purchase email series that isn't switched on yet, which is the clearest near-term win for turning first-time buyers into repeat buyers, and we've spotted an early dip in email open rates we want to get ahead of before it affects results. We're also keeping an eye on SMS, but want a couple more clean weeks before we read too much into it."

| Signal | Reading | Evidence | Confidence | Client-safe line | Next action |
|---|---|---|---|---|---|
| Repeat-purchase rate | 27% → 28%, stable | Shopify orders, trailing 90d vs prior 90d | High | "Roughly 1 in 4 customers buys again — solid for your category." | KEEP — monitor |
| Returning-customer revenue share | 34% of revenue | Shopify, trailing 90d | High | "About a third of revenue is from repeat customers." | KEEP |
| Post-Purchase flow | **Off / never built** | Klaviyo flow status, all-time | High | "There's an easy repeat-buyer win we'd like to switch on." | **FIX** — build & launch (Retention Lead, this sprint) |
| Day-60 cohort decay | 72% don't reorder by day 60 | Shopify cohorts, last 6 acquisition months | Med | (kept internal; framed as the *why* behind the post-purchase play) | Feeds the FIX above |
| Email open rate | 41% → 36% over 90d | Klaviyo deliverability, 90d | Med | "A small early dip in opens we want to get ahead of." | REFRESH — list cleaning + auth check |
| Winback flow | Live, 2.1% placed-order | Klaviyo flow, 90d, ~1,900 recipients | High | "Working, but we see room to improve it next." | REFRESH — queued, not this meeting |
| SMS subscriber growth | +6% but opt-out 4.1% | Attentive, 90d | Low | "Early signal; want more clean weeks before acting." | WATCH |
| New-customer cohort retention | n/a — only 38 customers | Shopify, most recent month | n/a | "Too soon to read this month's group." | FIX (sample) — recheck in 30d |

**Executive read:** Marlowe & Field's retention base is healthy and defensible — the headline is good news, and saying so confidently *is* part of the job. The only two items that clear the bar to raise are a dark Post-Purchase flow (a clean, agency-ownable repeat-buyer win, justified by the day-60 cohort drop-off we keep internal) and an early open-rate dip we treat as deliverability before content. SMS opt-out and the newest cohort are explicitly *not* raised — too thin to be anything but noise this week.

## Common Failure Modes

- **Crying wolf on a small cohort.** A 9-point "collapse" on a 40-customer acquisition month is sampling jitter; raising it burns credibility and triggers needless client anxiety.
- **Reading a promo-straddled window as a trend.** A Black Friday cohort makes repeat-rate look heroic, then "crashes" next quarter — neither was real.
- **Reciting raw internal metrics in the meeting.** "Your day-90 cohort decay is 78%" lands as alarming and meaningless; the client hears a problem with no handle on it.
- **Blaming creative for a deliverability issue** (or vice versa) — refreshing templates won't fix an unauthenticated sending domain.
- **Mistaking Apple MPP open-rate inflation unwinding for disengagement.**
- **Filling a data gap with a guess** instead of saying "we can't see this yet" — the fastest way to lose an account's trust when it surfaces later.
- **Forgetting the good news.** A clean, evidenced "retention is healthy" is a deliverable, not a non-event.

## Run This Play With Live Data

**Manual version:** for *each* client, export 12+ months of orders, build cohorts in a spreadsheet, pull the Klaviyo flow/deliverability panel and the Attentive subscriber file, reconcile three attribution models and three date conventions, then hand-write client-safe lines — and repeat it the night before every review.

**ShopMCP version:** connect a client's store, Klaviyo, and Attentive once. Ask the question; ShopMCP pulls live orders, cohorts, flow status, deliverability, and list growth, runs the data-sufficiency gate and the baseline→trend→leak→deliverability logic, and returns the packet — one-paragraph summary, status table, the 2–3 to raise, and the next play. It stays **read-only**: launching a flow or sending anything always needs your explicit approval.

> This is the agency multiplier: the manual version is one spreadsheet-evening *per client*, so a 15-account roster is your whole week. ShopMCP runs the identical play across **every connected client store** on demand, so you walk into every review with the same defensible packet — and spot the at-risk account before the client emails you. No live line into each client's commerce, Klaviyo, and Attentive is the wall every manual run hits. ShopMCP *is* that connection.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Retention Intelligence Packet play for this client over the last 90 days.
Keep it read-only and write the summary client-safe — I'm taking it into their review.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Per-client exports, spreadsheet cohort-building, and stale CSVs.
- Copy-pasting across each client's commerce, Klaviyo, and Attentive.
- Re-deciding every week which signals are real enough to raise versus noise.
- Hand-writing client-safe commentary from raw internal metrics, one account at a time.
