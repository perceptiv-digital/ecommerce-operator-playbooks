---
schema_version: 1
slug: "perf-morning-dashboard"
title: "Performance Morning Dashboard"
summary: "Performance Morning Dashboard helps ecommerce operators answer: What needs attention in paid media this morning?"
operating_question: "What needs attention in paid media this morning?"
short_title: "Performance Morning"
primary_persona: "performance"
personas: ["performance"]
category: "acquisition-efficiency"
platforms: ["meta-ads", "google-ads", "tiktok-ads"]
cadence: "daily"
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/perf-morning-dashboard"
shopmcp_prompt: "Run the Performance Morning Dashboard play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Performance Morning Dashboard

## Operating Question

**What in paid media needs a human this morning — and what is just noise I should leave alone?**

This is a fast daily **triage**, not an audit. In ten minutes you scan last night's and yesterday's spend, CPA, and ROAS against target, across Meta, Google, and TikTok, and surface only the few things that genuinely need a person today: a spend spike, conversions falling to zero, a CPA blowout past your tolerance band, an ad or account disapproval, a budget-capped campaign bleeding impression share, or a learning-phase reset from an overnight edit. The output is a ranked **"look at these 3 things"** list with a *suspected cause* — not a dashboard, not a data dump. The whole point is to separate the one or two real fires from the dozen wiggles that will mean-revert on their own.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Meta Ads Manager, your Google Ads account, or your TikTok Ads Manager — so at 8am it has nothing to triage. To run this manually you have to:

1. Open three platforms before coffee and read each one's "yesterday vs. day-before" view, plus the overnight slice if your account spends after midnight.
2. Normalise three different definitions of "today" — each platform reports in its **own account time zone**, so their "overnight" windows don't line up with each other or with your store's day.
3. Spot the anomalies by eye: a CPA that doubled, a campaign that printed zero conversions, a spend line that ran 2× hot, a disapproval banner buried two clicks deep.
4. Decide, for each one, whether it's a *real* performance move or a *tracking / disapproval / time-zone* artifact — before you touch anything.

**The thinking in this playbook is free. The data access — three live accounts, reconciled to one clock, every single morning — is the hard part, and that is exactly what ShopMCP connects.** If your AI assistant has no live line into Meta/Google/TikTok, that wall is where manual mornings stop. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Performance Marketer (the person with their hand on the budgets).
- **Also useful for:** Head of Growth doing a morning glance before standup; an agency account manager covering several stores who needs a 10-minute sweep per client.
- Run it **solo and fast**. This is a triage, so its job is to decide *what gets a deeper look later today*, not to resolve anything on the spot. The moment you find yourself doing root-cause analysis inside this play, you've left triage — pull that one item into its own deep-dive (e.g. Wasted Spend Killer) and keep scanning.

## When To Run It

- **Cadence:** daily, first thing — same time every morning so "since yesterday" means the same window each day.
- **Triggers:** the standing daily run, plus any mid-day alert (a disapproval email, a budget-pacing ping, a sudden spend-rate jump).
- **Skip / discount the run after a weekend or public holiday:** platform conversion data **lags** and backfills for 24–72 hours, so a Saturday-morning read of "Friday looks dead" is usually just unattributed conversions that haven't landed yet. Treat Monday's first numbers as provisional.
- **Pre-requisite:** know your **tolerance bands** (target CPA/ROAS ± what counts as normal daily wobble) *before* you look. If you don't, every random day looks alarming and you'll chase noise.

## Required Evidence

- **Meta Ads** — yesterday and day-before (and the overnight slice if you spend overnight): spend, purchases/conversions, CPA, ROAS vs. target, at **campaign and ad-set level**; plus **delivery/account status** (active, learning, limited, rejected) and any **ad disapprovals**.
- **Google Ads** — same window: cost, conversions, CPA/ROAS by **campaign type (Search / Shopping / Performance Max)**; **"Limited by budget" status** and **Search/absolute-top impression share lost to budget**; any **disapproved products or ads**.
- **TikTok Ads** — same window: spend, CPA, ROAS, **delivery status**, and whether **auto-bid / smart-bid** is on (it drifts spend fastest). Treat as **directional** at low volume.
- **Targets and tolerance bands** — your target CPA, ROAS, or daily-spend cap **per account**, and the ± band that counts as normal noise (e.g. CPA within ±25% of target = ignore).
- **Each account's reporting time zone** — so you can tell a real overnight move from a clock artifact.

## Optional Evidence

- **Overnight change log** — any budget, bid, audience, or creative edit made yesterday/last night. An edit that reset learning is the single most common cause of a "scary" morning number.
- **Promo / sale calendar** — a live promo inflates yesterday's ROAS and borrows forward demand; the morning after it ends looks like a crash.
- **Stock / feed status** for hero products — a sudden conversion drop is often an out-of-stock or a feed disapproval, not a media problem.
- **Yesterday's site / checkout incident notes** — a pixel deploy, a checkout outage, or a GA4 break shows up as "conversions → 0" with spend perfectly normal.

## How To Pull This Evidence

- **Meta daily export** — Ads Manager → Reports, or the "Export" button on the Campaigns/Ad-sets tab. Set the date preset to *Yesterday* (add *Last 7 days* in a second pull for the trailing baseline), group by day, and include Amount Spent, Purchases, Cost per Purchase, and Purchase ROAS. *Gotcha:* the default attribution window (7-day click / 1-day view) keeps re-attributing for ~72h, so this morning's export of yesterday will still move — pull it as provisional, not final.
- **Google daily export** — Campaigns view → date range *Yesterday* → segment by *Day*, or download via Reports. Pull Cost, Conversions, Cost/conv, Conv. value/cost, segmented by campaign type (Search / Shopping / Performance Max). *Gotcha:* conversions import on a delay (offline/store + modeled conversions land hours-to-days late), so a fresh "yesterday" undercounts — Performance Max especially.
- **TikTok daily export** — Ads Manager → Campaign tab → *Download* (or Reporting → custom report) for *Yesterday*, with Cost, Conversions, CPA, and ROAS. *Gotcha:* at low volume the numbers are directional only, and TikTok's reported conversions revise upward for 24-48h after the click.
- **Disapprovals** — Meta: filter the Ads tab by Delivery = *Rejected* / *Has issues*, and check Account Quality for account-level flags. Google: Ads & assets → filter Status = *Disapproved*, and Products in Merchant Center for *Disapproved* / *Limited*. TikTok: Ad status column → *Rejected*. *Gotcha:* disapprovals don't always surface in the metrics export — you have to read the status column or quality page separately, or a dead channel reads as "spend stopped" with no reason given.
- **Impression share lost to budget** — Google only, and it is **not** in the default columns: in the Campaigns view add *Search lost IS (budget)* and *Search lost abs. top IS (budget)* via the column picker, or include them in a custom report. *Gotcha:* Meta and TikTok have no true equivalent — read their *limited-by-budget* / delivery-capped delivery flag instead; don't expect a clean percentage.
- **Time-zone reporting cutoffs** — confirm each account's reporting time zone (Meta: Account Settings; Google: account *Preferences → Time zone*, fixed at creation; TikTok: account settings) and remember the export's "yesterday" is *that account's* yesterday. *Gotcha:* three accounts on three time zones means three different "overnight" windows — reconcile them to your store's clock before comparing, or a clock offset reads as a performance gap.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Set the clock first.** Confirm each account's reporting time zone and pick one comparison window (yesterday full day vs. the prior matching day). If an account's "overnight" straddles its midnight differently from the others, note it — half of all morning false alarms are time-zone cutoffs, not performance.
2. **Triage tracking before performance.** Any campaign showing **spend normal but conversions = 0** is a *tracking / pixel / feed* suspect first, a performance problem second. Check for a disapproval, a pixel/GA4 break, or an out-of-stock before you ever write "performance collapsed."
3. **Scan for hard blockers.** Account or ad **disapprovals**, payment holds, and **disapproved products** stop delivery regardless of bid — these jump to the top because they're a *binary* loss of a channel, and usually a same-day fix.
4. **Flag delivery anomalies by money at risk.** Three patterns, ranked by daily dollars exposed:
   - **Spend spike** — daily spend ≥ ~1.4× the trailing-7-day average (auto-bid drift, a lifted cap, a competitor exiting the auction).
   - **CPA blowout** — CPA beyond your tolerance band (e.g. > ~1.5× target) on a campaign spending enough to matter.
   - **Budget-capped** — campaign marked limited-by-budget and **losing ≥ ~20–30% impression share to budget** during prime hours (lost cheap volume).
5. **Discount immaturity and resets.** Anything in **learning** (Meta: under ~50 conversions in 7 days) or reset by an overnight edit is **WATCH**, not a fire — its numbers are supposed to be noisy.
6. **One morning is not a trend.** A single bad day inside a still-acceptable trailing average is **WATCH** ("flag for a look"), never **KILL**. Rank what survives by *daily money at risk* and stop at the top 3.

## Manual Workflow

1. Open Meta, Google, and TikTok to each one's "yesterday vs. day-before" view (add the overnight slice if you spend after midnight). Note each account's time zone.
2. Eyeball the four signals per account: spend vs. trailing average, CPA/ROAS vs. tolerance band, any conversions-to-zero lines, and any disapproval/limited-by-budget banners.
3. For every flag, decide *tracking vs. delivery vs. performance* — apply step 2 of the logic before assuming media is the cause.
4. Write each surviving anomaly as one line: metric, the number, its source and window, and your **suspected** cause (a hypothesis, not a verdict).
5. Paste the prompt below with your three short tables to get the ranked triage and a sanity check on your causes.
6. Keep only the **top 3 by money at risk**. Assign each an owner and a same-day next step; route anything needing real analysis into its own deep-dive play.

## Copy-Paste Prompt

```text
You are my performance-marketing analyst running the "Performance Morning Dashboard"
TRIAGE play. This is a fast daily scan, not a full audit.

GOAL: from last night's / yesterday's data across Meta, Google, and TikTok, surface ONLY
the items that need a human today, ranked by daily money at risk. Return a "look at these
3 things" list with a SUSPECTED cause for each — not a data dump.

I will paste, per account: spend vs. trailing-7-day average, CPA and ROAS vs. target,
conversions, delivery/account status, any disapprovals or "limited by budget" flags, the
account's reporting time zone, and any overnight edits / live promos. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical input is
yesterday/overnight spend + conversions + target, broken out by account/campaign. If that
critical input is missing, STOP and return only (a) what's missing and (b) how to get it —
never estimate it or proceed. Platform conversions can lag and backfill for 24-72h; treat a
lagging conversion count as a flag-don't-kill caveat, not a missing input — proceed and note it.

RULES:
- Reconcile time zones first. Treat any "overnight" gap that is really a reporting-cutoff
  difference as noise, not performance.
- If spend is normal but conversions = 0, treat it as a TRACKING / disapproval / stock
  suspect FIRST, not a performance collapse. Say which.
- Disapprovals and limited-by-budget are hard blockers: surface them even if CPA looks fine.
- One bad morning inside an acceptable trailing average is WATCH ("flag for a look"),
  never KILL. Protect learning-phase and post-edit resets as WATCH.
- Discount weekend/holiday data: conversions lag and backfill for 24-72h.
- Every flagged item must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 2-3 sentence executive read: how many real items vs. how much was noise.
2. A table of AT MOST the top 3-5 items, ranked by daily money at risk, using exactly this
   header row:
   | Item | Platform | Signal (vs. baseline) | Window | Suspected cause | Status | Owner | Next step |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. What you deliberately did NOT flag, and why (so I trust the quiet).
4. Anything blocked by missing evidence and what would confirm the cause.
```

## Decision Rules

- **FIX** — spend normal but conversions = 0, a disapproval, a feed/pixel break, or missing tracking makes the channel's numbers untrustworthy. Fixing this is today's priority over any budget move.
- **KILL** — **not a triage verb.** A morning scan flags; it does not kill. If something genuinely looks dead, route it to a deep-dive play with a full window — never pause on one morning.
- **REFRESH** — only when the *same* fatigue signal (e.g. CTR sliding for days at flat CPM) has shown up across several prior mornings, not on the strength of today alone.
- **WATCH** — the default for almost everything: a single anomalous morning, a learning-phase campaign, a post-edit reset, or any signal inside the trailing tolerance band. "Flag for a look," recheck tomorrow.
- **KEEP** — spend, CPA, and ROAS all inside their tolerance bands; no blocker. Say so explicitly so the operator trusts the all-clear and moves on.
- Every flagged item must carry a **number, source, time window, and confidence level** — a CPA with no window and no baseline is a rumour, not a trigger.

## Veto Rules

- Do **not** kill or pause anything on one morning's data — triage flags for a look; it never executes a kill.
- Do **not** call "conversions dropped to zero" a performance collapse until you've ruled out a disapproval, a pixel/GA4 break, or an out-of-stock.
- Do **not** trust weekend or post-holiday numbers at face value — conversion attribution lags and backfills for 24–72 hours.
- Do **not** treat a cross-platform "overnight" gap as real until the reporting time zones are reconciled.
- Do **not** react to a learning-phase or just-edited campaign's volatility — that noise is expected.
- Do **not** recommend budget shifts, pauses, edits, or any write without an explicit human approval step.

## Output Contract

A ranked, **top-3** morning triage list — anomalies only, each with a suspected cause, ordered by daily money at risk.

| Item | Platform | Signal (vs. baseline) | Window | Suspected cause | Status | Owner | Next step |
|---|---|---|---|---|---|---|---|
| Example: Prospecting – Broad | Meta | CPA +52% vs. 7-day avg | Yesterday | Top creative disapproved overnight | FIX | Perf | Resubmit creative by noon |

## Worked Example

> **Executive read:** Three real items this morning out of eleven flagged moves — the rest was within tolerance or weekend lag. The biggest dollar exposure is TikTok auto-bid drift (+140% spend overnight, ~$1,680 burned with no matching conversion lift), so that's the first call before standup. The Meta CPA spike is a disapproval, not a performance drop — a same-day creative fix, not a budget decision.

| Item | Platform | Signal (vs. baseline) | Window | Suspected cause | Status | Owner | Next step |
|---|---|---|---|---|---|---|---|
| TopFunnel – Auto-bid | TikTok | Spend +140% ($1,680 vs. ~$700/day) | Overnight | Smart-bid drift after cap lifted | FIX | Perf | Cap daily budget now, watch CPA 4h |
| Prospecting – Broad | Meta | CPA +60% ($42 vs. $26 target) | Yesterday | Top creative disapproved → spend forced to weak ads | FIX | Perf | Resubmit/replace creative by noon |
| Shopping – All products | Google | IS lost to budget ~30%, capped 9am | Live (today) | Budget hit during prime hours | WATCH | Perf | Decide on +budget at midday pacing check |
| Brand – Search | Google | CPA −8% vs. target | Yesterday | Within band | KEEP | — | No action |
| TopFunnel – New creative | Meta | ROAS 1.1, 6 days old | Trailing | Still in learning | WATCH | — | Recheck after 50 conv. |

Note how triage *re-ranks the morning*: the scariest single number (Meta CPA +60%) is not the costliest problem and isn't even a media issue — it's a disapproval. The quiet-looking TikTok line is the real fire because of the dollars draining per hour, and the Google cap is a "watch at midday," not an emergency.

## Common Failure Modes

- Reacting to one noisy morning as if it were a trend, and pausing a campaign that would have mean-reverted by tonight.
- Reading "conversions = 0" as a performance crash when it's a disapproval, a broken pixel, or an out-of-stock.
- Comparing platforms on "overnight" without reconciling their reporting time zones, then chasing a gap that's just a clock difference.
- Trusting Saturday/Monday numbers before lagged conversions have backfilled.
- Panicking over a learning-phase or just-edited campaign whose volatility is expected.
- Producing a 40-row dashboard instead of a 3-item, cause-tagged action list — triage that doesn't prioritise isn't triage.

## Run This Play With Live Data

**Manual version:** open three ad platforms before coffee, read each one's yesterday-vs-day-before view, mentally reconcile three time zones, hunt for disapprovals two clicks deep, and decide tracking-vs-performance on each flag — every morning, per account.

**ShopMCP version:** connect Meta, Google, and TikTok once. Ask the question; ShopMCP pulls last night's and yesterday's spend, CPA, ROAS, delivery status, and disapprovals across all three accounts, reconciles them to one clock, applies your tolerance bands, separates tracking-zeros from real drops, and returns the ranked top-3 triage with suspected causes. It stays **read-only** until you explicitly approve a budget change or pause.

> No Meta, Google, or TikTok connection inside your AI assistant? That's the wall every manual morning hits. ShopMCP *is* the connection — the same triage then runs in one prompt instead of three browser tabs and a stopwatch.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Performance Morning Dashboard triage across Meta, Google, and TikTok for
yesterday vs. the prior day. Reconcile time zones, flag only what needs a human today
ranked by money at risk, and keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Opening and eyeballing three ad platforms every single morning.
- Reconciling three account time zones by hand to define "overnight."
- Missing a disapproval or limited-by-budget flag buried in the UI.
- Mistaking a tracking-zero or weekend lag for a real performance collapse.
