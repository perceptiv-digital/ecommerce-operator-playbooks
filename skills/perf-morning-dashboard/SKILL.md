---
name: perf-morning-dashboard
description: "When an ecommerce operator needs to decide: What needs attention in paid media this morning? Runs the Performance Morning Dashboard play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Performance Morning', 'Meta Ads', 'Google Ads', 'Tiktok Ads', 'Acquisition Efficiency'."
license: CC-BY-4.0
metadata:
  persona: Performance Marketer
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Performance Morning Dashboard

**Operating question:** What needs attention in paid media this morning?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Meta Ads** — yesterday and day-before (and the overnight slice if you spend overnight): spend, purchases/conversions, CPA, ROAS vs. target, at **campaign and ad-set level**; plus **delivery/account status** (active, learning, limited, rejected) and any **ad disapprovals**.
- **Google Ads** — same window: cost, conversions, CPA/ROAS by **campaign type (Search / Shopping / Performance Max)**; **"Limited by budget" status** and **Search/absolute-top impression share lost to budget**; any **disapproved products or ads**.
- **TikTok Ads** — same window: spend, CPA, ROAS, **delivery status**, and whether **auto-bid / smart-bid** is on (it drifts spend fastest). Treat as **directional** at low volume.
- **Targets and tolerance bands** — your target CPA, ROAS, or daily-spend cap **per account**, and the ± band that counts as normal noise (e.g. CPA within ±25% of target = ignore).
- **Each account's reporting time zone** — so you can tell a real overnight move from a clock artifact.

Optional, if available:

- **Overnight change log** — any budget, bid, audience, or creative edit made yesterday/last night. An edit that reset learning is the single most common cause of a "scary" morning number.
- **Promo / sale calendar** — a live promo inflates yesterday's ROAS and borrows forward demand; the morning after it ends looks like a crash.
- **Stock / feed status** for hero products — a sudden conversion drop is often an out-of-stock or a feed disapproval, not a media problem.
- **Yesterday's site / checkout incident notes** — a pixel deploy, a checkout outage, or a GA4 break shows up as "conversions → 0" with spend perfectly normal.

## How to decide — in order

1. **Set the clock first.** Confirm each account's reporting time zone and pick one comparison window (yesterday full day vs. the prior matching day). If an account's "overnight" straddles its midnight differently from the others, note it — half of all morning false alarms are time-zone cutoffs, not performance.
2. **Triage tracking before performance.** Any campaign showing **spend normal but conversions = 0** is a *tracking / pixel / feed* suspect first, a performance problem second. Check for a disapproval, a pixel/GA4 break, or an out-of-stock before you ever write "performance collapsed."
3. **Scan for hard blockers.** Account or ad **disapprovals**, payment holds, and **disapproved products** stop delivery regardless of bid — these jump to the top because they're a *binary* loss of a channel, and usually a same-day fix.
4. **Flag delivery anomalies by money at risk.** Three patterns, ranked by daily dollars exposed:
   - **Spend spike** — daily spend ≥ ~1.4× the trailing-7-day average (auto-bid drift, a lifted cap, a competitor exiting the auction).
   - **CPA blowout** — CPA beyond your tolerance band (e.g. > ~1.5× target) on a campaign spending enough to matter.
   - **Budget-capped** — campaign marked limited-by-budget and **losing ≥ ~20–30% impression share to budget** during prime hours (lost cheap volume).
5. **Discount immaturity and resets.** Anything in **learning** (Meta: under ~50 conversions in 7 days) or reset by an overnight edit is **WATCH**, not a fire — its numbers are supposed to be noisy.
6. **One morning is not a trend.** A single bad day inside a still-acceptable trailing average is **WATCH** ("flag for a look"), never **KILL**. Rank what survives by *daily money at risk* and stop at the top 3.

## The prompt to run

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

## Decision rules

- **FIX** — spend normal but conversions = 0, a disapproval, a feed/pixel break, or missing tracking makes the channel's numbers untrustworthy. Fixing this is today's priority over any budget move.
- **KILL** — **not a triage verb.** A morning scan flags; it does not kill. If something genuinely looks dead, route it to a deep-dive play with a full window — never pause on one morning.
- **REFRESH** — only when the *same* fatigue signal (e.g. CTR sliding for days at flat CPM) has shown up across several prior mornings, not on the strength of today alone.
- **WATCH** — the default for almost everything: a single anomalous morning, a learning-phase campaign, a post-edit reset, or any signal inside the trailing tolerance band. "Flag for a look," recheck tomorrow.
- **KEEP** — spend, CPA, and ROAS all inside their tolerance bands; no blocker. Say so explicitly so the operator trusts the all-clear and moves on.
- Every flagged item must carry a **number, source, time window, and confidence level** — a CPA with no window and no baseline is a rumour, not a trigger.

## Vetoes — stop if any apply

- Do **not** kill or pause anything on one morning's data — triage flags for a look; it never executes a kill.
- Do **not** call "conversions dropped to zero" a performance collapse until you've ruled out a disapproval, a pixel/GA4 break, or an out-of-stock.
- Do **not** trust weekend or post-holiday numbers at face value — conversion attribution lags and backfills for 24–72 hours.
- Do **not** treat a cross-platform "overnight" gap as real until the reporting time zones are reconciled.
- Do **not** react to a learning-phase or just-edited campaign's volatility — that noise is expected.
- Do **not** recommend budget shifts, pauses, edits, or any write without an explicit human approval step.

## Output

A ranked, **top-3** morning triage list — anomalies only, each with a suspected cause, ordered by daily money at risk.

| Item | Platform | Signal (vs. baseline) | Window | Suspected cause | Status | Owner | Next step |
|---|---|---|---|---|---|---|---|
| Example: Prospecting – Broad | Meta | CPA +52% vs. 7-day avg | Yesterday | Top creative disapproved overnight | FIX | Perf | Resubmit creative by noon |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
