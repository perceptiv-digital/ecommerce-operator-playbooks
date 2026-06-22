---
schema_version: 1
slug: "email-monday-recap"
title: "Email Monday Recap"
summary: "Email Monday Recap helps ecommerce operators answer: What changed in email and retention last week?"
operating_question: "What changed in email and retention last week?"
short_title: "Email Monday Recap"
primary_persona: "retention"
personas: ["retention", "marketing"]
category: "retention-ltv"
platforms: ["klaviyo", "commerce"]
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/email-monday-recap"
shopmcp_prompt: "Run the Email Monday Recap play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Email Monday Recap

## Operating Question

**What actually changed in email and retention last week — and which one thing do I fix, double down on, or leave alone before I send again?**

Every Monday a retention lead opens Klaviyo, sees a revenue number that is up or down, and writes a Slack update that is really just a vibe. This play replaces the vibe with a narrative: it splits **campaign revenue from flow revenue** (two different levers — one you push by sending, one you tune by editing automations), tracks **email + SMS as a share of total store revenue**, watches **net list growth** and **deliverability**, and ranks **top and bottom sends by placed-order rate and revenue per recipient**. The output is a three-sentence executive read plus exactly **three actions** — not a dashboard. It leans on **clicks and placed-order rate, never opens**, because Apple Mail Privacy Protection auto-inflates opens and makes open rate a lie.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your Klaviyo account or your store, so it cannot see a single one of the numbers this play turns on. To run it manually you have to:

1. Pull **campaign performance** from Klaviyo (last week + prior week) and read placed-order rate and revenue per recipient per send — not opens.
2. Pull **flow performance** separately (Welcome, Browse Abandon, Abandoned Cart, Post-Purchase, Winback) so you don't credit a flow's steady baseline to this week's campaigns.
3. Pull **list growth** — new subscribers minus unsubscribes minus spam complaints minus suppressions — to get *net* growth, not the flattering gross number.
4. Pull **deliverability** signals (spam-complaint rate, bounce rate, and whether you're sending to engaged segments).
5. Reconcile Klaviyo *attributed* revenue against your store's *actual* placed orders, because Klaviyo's default 5-day click / 5-day open attribution window over-credits email.

**The thinking in this playbook is free. The data access is the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live link into Klaviyo and your store, that wall is where manual runs stop. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Retention / Email Lead
- **Also useful for:** Head of Marketing (where is owned-channel revenue heading?), Founder/CEO (the one-paragraph "what happened in email" read), Agency account lead (the Monday client note)
- Run it **first thing Monday**, before the week's campaign calendar is locked, so a finding can still change what you send Tuesday.

## When To Run It

- **Cadence:** weekly — Monday morning, after the weekend's orders and attribution have settled (give it ~48h; same-day weekend revenue is under-attributed).
- **Triggers:** email's share of total revenue moves more than ~3 points week over week; a campaign's placed-order rate falls below ~0.10%; spam-complaint rate crosses 0.10%; net list growth turns negative; a flow's revenue per recipient drops two weeks running.
- **Pre-requisite:** confirm your **Klaviyo→store revenue attribution window** hasn't been changed and that conversion tracking fired all week. A recap built on a broken pixel narrates fiction.

## Required Evidence

- **Klaviyo campaigns** — for last week and the prior week: recipients, **clicks / click rate**, **placed-order rate**, **revenue**, and **revenue per recipient** per send. Opens are recorded but treated as untrusted.
- **Klaviyo flows** — revenue and placed-order rate **per flow** (Welcome, Browse Abandon, Abandoned Cart/Checkout, Post-Purchase, Winback, SMS flows), last week vs prior week, kept **separate** from campaign totals.
- **List health** — new subscribers, unsubscribes, spam complaints, suppressions → **net subscriber change** and **net growth %**.
- **Deliverability** — spam-complaint rate, hard + soft bounce rate, and the engaged-segment definition you're actually mailing.
- **Commerce (Shopify/Woo/BigCommerce/etc.)** — **total store revenue** for the same week, so you can compute email + SMS as a **share of total**, plus actual placed orders to sanity-check Klaviyo's attributed number.

## Optional Evidence

- **Promo / campaign calendar** — a sitewide sale or a double-send day inflates a week's email share and borrows from next week.
- **Send volume** — last week's number of campaigns and total emails sent; revenue can rise purely because you sent more, which is not a quality win.
- **Segment definitions for the worst send** — was the loser mailed to a stale "all subscribers" audience instead of an engaged 30/60/90-day segment?
- **SMS split** — if SMS revenue is bundled into "email + SMS," pull the SMS line separately; the two channels have different unsubscribe economics.
- **Prior 4-week baseline** — one week is noisy; a 4-week trailing average tells you whether a move is signal or just Tuesday.

## How To Pull This Evidence

- **Klaviyo campaign vs flow revenue** — in Klaviyo go to **Analytics → Campaigns** and **Analytics → Flows**, set the date range to last full week, and export each separately; never merge them into one revenue number. Per send/flow, read **placed-order rate** and **revenue per recipient**, not opens.
- **Email/SMS share of store revenue** — pull **total store revenue** for the same week from Shopify/Woo/BigCommerce (Analytics → Finances or Reports → Sales over time), then divide Klaviyo attributed email + SMS revenue by it. Show the share **and** the absolute.
- **List growth** — in Klaviyo **Lists & Segments** (or Analytics → Subscriber growth), pull new subscribers, unsubscribes, spam complaints, and suppressions for the week; compute **net** change, not the gross signup count.
- **Deliverability** — read **spam-complaint rate** and **hard + soft bounce rate** from Klaviyo's deliverability/campaign reporting, and confirm the engaged-segment definition you're actually mailing.
- **MPP-opens gotcha** — Apple Mail Privacy Protection auto-fetches images and inflates open rate, so any "opens" or "open rate" column in these exports is untrustworthy. Rank and diagnose on **clicks and placed-order rate** only — ignore the open columns entirely.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Reconcile the headline first.** Compare Klaviyo-attributed revenue to the store's actual placed orders for the week. If the attribution window was changed or the gap is implausibly large, mark the recap **FIX** and stop — don't narrate a tracking artifact as a retention story.
2. **Split campaign from flow.** Pull the two apart. Flow revenue is a baseline that runs whether or not you sent; campaign revenue is this week's discretionary work. A week can look "up" on flows alone (more traffic = more abandoned-cart triggers) while your campaigns quietly underperformed. **Never credit a flow's baseline to a campaign.**
3. **Compute share of total, then context it.** Email + SMS as a % of total store revenue is the north-star line. But a *rise* can be bad (total revenue fell, email held) and a *fall* can be fine (a paid push grew the denominator). Read the share **and** the absolute, never the share alone.
4. **Rank sends by placed-order rate and revenue per recipient — not opens, not raw revenue.** The biggest-revenue campaign is often just the biggest list blast. Revenue per recipient and placed-order rate find the send that actually *earned* its audience. Identify the top send and the bottom send.
5. **Diagnose the bottom send.** Walk click rate → placed-order rate → revenue per recipient. Low click rate = **creative/subject/offer** problem. Healthy clicks but low placed-order rate = **audience or landing/offer mismatch** (often a stale segment). This is where most weekly damage hides.
6. **Check the list and deliverability floor.** Net growth negative, or spam-complaint rate over ~0.10%, or bounces climbing → that becomes an action regardless of revenue, because it caps every future send.
7. **Apply the vetoes, then write the narrative + exactly three actions** with owner and recheck date.

## Manual Workflow

1. Set the window: last full Mon–Sun week and the prior Mon–Sun week. Avoid partial weeks.
2. Export Klaviyo campaign performance for both weeks; sort sends by **revenue per recipient** and by **placed-order rate**. Ignore the open columns.
3. Export Klaviyo flow performance for both weeks, per flow. Keep it in a separate table from campaigns.
4. Pull list growth (new subs, unsubs, complaints, suppressions) and compute **net**; pull spam-complaint and bounce rates.
5. Pull total store revenue for the week and compute **email + SMS share of total**.
6. Reconcile Klaviyo attributed revenue vs actual placed orders; if it fails, stop and mark FIX.
7. Paste the prompt below with your tables. Pressure-test against the vetoes.
8. Write the **three-sentence read + three actions**, each with owner and recheck date.

## Copy-Paste Prompt

```text
You are my retention/email analyst writing the weekly "Email Monday Recap" narrative.

GOAL: tell me what changed in email + retention last week and give me EXACTLY three
actions. This is a recap across campaigns AND flows, not a single-flow audit.

I will paste: Klaviyo campaign performance (last week + prior week), Klaviyo flow
performance per flow, list growth (new subs, unsubs, complaints, suppressions),
deliverability (spam-complaint rate, bounce rate), and total store revenue for the week.
Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the campaign-vs-flow
revenue split with placed-order rate per send (NOT opens — Apple MPP makes opens unreliable),
or deliverability (spam-complaint rate, bounce rate) is missing, STOP and return only (a)
what's missing and (b) how to get it — never estimate it or proceed.

RULES:
- Use clicks, placed-order rate, and revenue per recipient. IGNORE open rate entirely —
  Apple Mail Privacy Protection makes opens unreliable. Do not rank or diagnose on opens.
- Separate CAMPAIGN revenue from FLOW revenue. Never credit a flow's steady baseline to
  this week's campaigns. Report them on two separate lines.
- Report email + SMS as a % of total store revenue, AND the absolute revenue. A share move
  can be caused by the denominator (total revenue) moving, so always show both.
- Rank sends by placed-order rate and revenue per recipient, not by raw revenue.
- One week is noisy: flag anything that could be promo timing, a double-send, or a
  single-week blip rather than a trend.
- Reconcile Klaviyo attributed revenue against actual placed orders. If attribution looks
  broken, mark the recap FIX and stop.
- Every claim must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read (what changed and why it matters).
2. A metrics table using EXACTLY this header row:
   | Metric | Last week | Prior week | WoW | Source | Confidence |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not
   replace the table with prose.
3. EXACTLY three prioritized actions: Action | Status | Why | Owner | Recheck.
4. Vetoes/caveats that downgraded any read.
5. What evidence is blocked and what you'd need to upgrade it.
```

## Decision Rules

- **FIX** — Klaviyo↔store revenue reconciliation fails, attribution window was changed mid-week, or conversion tracking gapped. You cannot narrate retention on top of broken tracking.
- **KILL** — retire or stop a recurring send/segment only when it has lost money or eroded the list over a meaningful sample (e.g. a recurring campaign mailing a stale segment that drives complaints and near-zero placed-order rate across 3+ sends).
- **REFRESH** — a send or flow is decaying (placed-order rate or revenue per recipient sliding) but the audience and offer are still viable: rework subject/creative/segment, don't scrap it.
- **WATCH** — the move is one week old, inside normal variance, or polluted by a promo/double-send; monitor across a clean window before acting.
- **KEEP** — share of revenue, placed-order rate, and net list growth are inside their target bands with no deliverability flag.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- Do **not** rank, diagnose, or write an action off **open rate** — Apple MPP auto-opens make it unreliable post-2021.
- Do **not** treat a **single week** as a trend; one good or bad send is noise until a clean second week confirms it.
- Do **not** credit a **flow's baseline** revenue to this week's campaign work (or vice versa) — separate the two lines or the read is false.
- Do **not** call an email-share rise a "win" without checking the **denominator**: total store revenue may simply have dropped.
- Do **not** read **Klaviyo attributed revenue** as commerce truth when the attribution window overlaps paid/other channels — it inflates email's credit.
- Do **not** discount **promo-timed** weeks against normal weeks; a sale or double-send borrows demand and skews the share.
- Do **not** push send volume to "grow revenue" while spam-complaint rate is over ~0.10% — you'll burn the list and the sending reputation.
- Do **not** trigger any send, segment change, flow edit, or suppression without explicit human approval.

## Output Contract

A weekly recap: a three-sentence narrative, a metrics table, and exactly three actions with owner and recheck date.

Metrics table (minimum columns):

| Metric | Last week | Prior week | WoW | Source | Confidence |
|---|---|---|---|---|---|
| Email + SMS % of total revenue | 24% | 28% | −4 pts | Klaviyo + Shopify | High |
| Campaign revenue | $— | $— | — | Klaviyo | High |
| Flow revenue | $— | $— | — | Klaviyo | High |
| Net list growth | +— | +— | — | Klaviyo | High |
| Spam-complaint rate | —% | —% | — | Klaviyo | High |

## Worked Example

> **Executive read:** Email + SMS slipped from 28% to 24% of total store revenue week over week, but the cause is narrow, not systemic — flows held steady ($18,400, placed-order rate flat) and the drop is entirely one Friday campaign blasted to the full 90-day-inactive list. List is still healthy at net +1.2% and deliverability is clean (complaints 0.04%), so this is a segmentation fix, not a deliverability fire. Tighten the segment, and the share recovers without touching cadence.

| Metric | Last week | Prior week | WoW | Source | Confidence |
|---|---|---|---|---|---|
| Email + SMS % of total revenue | 24% | 28% | −4 pts | Klaviyo + Shopify | High |
| Campaign revenue | $9,100 | $13,600 | −33% | Klaviyo | High |
| Flow revenue | $18,400 | $18,050 | +2% | Klaviyo | High |
| Net list growth | +1.2% | +1.5% | −0.3 pts | Klaviyo | High |
| Spam-complaint rate | 0.04% | 0.03% | +0.01 pts | Klaviyo | High |
| Best send (rev/recipient) | $0.62 (Restock VIP, 0.41% POR) | — | — | Klaviyo | High |
| Worst send (rev/recipient) | $0.04 (Friday "We miss you" to 90d-inactive, 0.06% POR) | — | — | Klaviyo | High |

**Three actions:**

1. **REFRESH** — Stop mailing the Friday winback to the full 90-day-inactive list; rebuild it as a 30/60-day engaged segment and re-send next week. *Owner: Email Lead. Recheck: next Monday.*
2. **WATCH** — Net list growth ticked down 0.3 pts; one week, inside variance. Confirm the signup form / popup didn't break before treating it as a trend. *Owner: Email Lead. Recheck: 7 days.*
3. **KEEP** — Flows are steady and profitable; do not touch the Abandoned Cart or Post-Purchase automations this week — the campaign miss is not a flow problem. *Owner: Email Lead. Recheck: 14 days.*

Note how the answer *inverts* the headline: the scary "−4 points of revenue share" is one mis-segmented send, while the flows quietly doing 67% of owned revenue need no action at all.

## Common Failure Modes

- Ranking or diagnosing on **open rate** when Apple MPP has made it meaningless.
- Blaming "email is down" on the whole channel when **one campaign to a stale segment** did all the damage.
- Crediting a strong week to campaigns when **flows** (driven by more site traffic) actually carried it.
- Calling an email-share rise a win when **total revenue fell** and email merely held flat.
- Treating **Klaviyo attributed revenue** as commerce truth across an overlapping attribution window.
- Reacting to a **single noisy week** — promo timing or a double-send — as if it were a trend.

## Run This Play With Live Data

**Manual version:** export campaign and flow performance from Klaviyo for two weeks, pull list growth and deliverability, fetch total store revenue, reconcile attribution, and assemble the narrative — every Monday.

**ShopMCP version:** connect Klaviyo and your store once. Ask the question; ShopMCP pulls live campaign and flow performance, computes email + SMS share against real store revenue, separates campaign from flow lines, ranks sends by placed-order rate and revenue per recipient (never opens), checks net list growth and spam/bounce floors, and returns the three-sentence read plus three actions. It stays **read-only** until you explicitly approve a send, segment, or flow change.

> No Klaviyo or store connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same recap then writes itself in one prompt instead of a Monday-morning spreadsheet session.

Example ShopMCP prompt:

```text
Run the Email Monday Recap play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/email-monday-recap?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Weekly Klaviyo + store exports and stale CSVs.
- Manually splitting campaign revenue from flow revenue every Monday.
- Recomputing email + SMS share of total store revenue by hand.
- Rebuilding the same recap and reconciliation every week.
