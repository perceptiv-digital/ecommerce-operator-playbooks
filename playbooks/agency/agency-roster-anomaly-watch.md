---
schema_version: 1
slug: "agency-roster-anomaly-watch"
title: "Roster Anomaly Radar"
summary: "Roster Anomaly Radar helps ecommerce operators answer: Which client needs a human this morning?"
operating_question: "Which client needs a human this morning?"
short_title: "Roster Anomaly Radar"
primary_persona: "agency"
personas: ["agency"]
category: "agency-portfolio"
platforms: ["commerce", "meta-ads", "google-ads", "klaviyo"]
cadence: "daily"
difficulty: "intermediate"
manual_time_minutes_min: 30
manual_time_minutes_max: 60
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "client-action-packet"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/agency-roster-anomaly-watch"
shopmcp_prompt: "Run the Roster Anomaly Radar play for yesterday vs baseline. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Roster Anomaly Radar

## Operating Question

**Across my entire client roster, which one or two accounts had a real overnight anomaly that needs a human *today* — a revenue cliff, a CPA blowout, conversions falling to zero, a deliverability spike, a hero-SKU feed disapproval — so my team spends this morning on the account that's actually on fire instead of opening fifteen dashboards to confirm everyone is fine?**

This is not a weekly health score and it is not a per-client deep dive. It is a **daily, exception-only radar**: a single overnight scan that compares each client's *yesterday* against *its own trailing baseline* and returns **only the accounts that broke a band** — ranked by money at risk × client sensitivity. Most mornings, most of the roster should be silent. The whole value of this play is that silence: when something does surface, it is real, it is scoped, and it is already pointed at an owner. The job is to compress "fifteen dashboards every morning" into "the two clients you actually need to look at before 9am."

The contrast with the weekly composite is deliberate. The weekly health score asks *which client is trending red over three weeks* — a slow-burn churn-risk question. This radar asks *which client broke overnight* — a fast-twitch incident question. A client can be perfectly green on the weekly score and still have had its checkout break, its top feed item disapproved, or its best campaign's CPA triple at 2am. This is the morning tripwire that catches that, before the client emails you about it.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant can't see *one* client's Shopify, Meta, Google, and Klaviyo overnight — let alone the *twelve or twenty* of them you'd need to scan a whole roster before the morning stand-up. And a daily exception scan is brutal manually, because the cost is paid *every single morning*, not once a week. To run this by hand you have to:

1. Open, for **every** client, yesterday's commerce revenue and orders and hold them against *that client's own* trailing baseline — not a blanket number, and not last Tuesday if last Tuesday was a Black Friday.
2. Pull each client's paid CPA / spend for yesterday across however many ad platforms they run, and decide whether a spike is a real blowout or just thin overnight volume.
3. Check each client's conversion tracking didn't silently break — a pixel that stopped firing reads as "zero sales," which is indistinguishable from a real zero-sales day until you look.
4. Scan each client's email/SMS deliverability for an overnight spam-complaint or bounce spike that will torch the next send.
5. Check each client's product feed for an overnight disapproval, especially on a hero SKU that carries the account.
6. Decide, for each blip, whether it's *noise* (one quiet overnight) or a *signal* (a genuine break) — and rank the real ones so a small team hits the biggest fire first.

Do that for one client and it's a coffee's worth of clicking. Do it for fifteen or twenty, *every morning*, and either it doesn't happen or it eats the first two hours of every analyst's day — which is exactly why the broken checkout gets found at noon when the client calls, not at 7am when the orders first flatlined. **The radar logic here is free. The per-account data access, across the whole roster, every single morning, is the hard part — and that is exactly what ShopMCP connects.** The last section shows the scan-the-whole-roster-overnight version.

## Who Should Run It

- **Primary owner:** Agency Account Director / COO who triages the team's morning — the person who decides who gets pulled off planned work to firefight today.
- **Also useful for:** the on-call AM or "morning duty" rotation (first eyes on the roster), Head of Client Services (so an escalation never arrives as a surprise), Agency Founder (overnight blast-radius across the book).
- Run it **first thing**, before the morning stand-up and before anyone opens a single client dashboard — the radar tells you which dashboards are even worth opening.

## When To Run It

- **Cadence:** daily — early morning, after overnight orders, spend, and sends have posted, so "yesterday" is a settled, complete day.
- **Triggers:** every morning as a standing routine; additionally after a known platform incident (a Meta outage, a Shopify checkout bug, a Klaviyo deliverability event) to localize the blast radius to *your* accounts.
- **Pre-requisite:** each client needs a **trailing baseline on file** — a same-weekday-aware run-rate for revenue, CPA, conversions, and deliverability over the last 2–4 weeks. A "drop" with no baseline to drop *from* is just a number. A client with no baseline is itself a finding: mark them **BLIND**, not quiet.

## Required Evidence

- **Commerce, yesterday vs. baseline (per client)** — yesterday's revenue and order count against *that client's own* trailing same-weekday baseline (Tuesdays compare to Tuesdays). A drop beyond the client's normal daily band is the headline signal. Order count matters as much as revenue: revenue can hold on one fluke big order while the order *count* has cratered.
- **Paid efficiency, yesterday vs. baseline (per client)** — yesterday's blended CPA (or cost-per-result) and spend versus the trailing baseline, across all that client's ad platforms. A CPA blowout — spend continuing while results collapse — is the second signal. Pair it with spend so you can separate "burned money on nothing" from "barely spent, ignore."
- **Conversion / tracking integrity (per client)** — did conversions actually post yesterday, and does platform-claimed conversion count reconcile with store orders? **Conversions to zero is the loudest signal on this radar** — but it is also the most ambiguous, because a broken pixel and a real dead day look identical until you check whether *orders* also went to zero.
- **Deliverability, yesterday vs. baseline (per client)** — overnight spam-complaint rate, bounce rate, and any hard send failure on the last campaign or flow. A complaint/bounce spike is an early signal that today's sends are about to be throttled or blocked.
- **Per-client trailing baselines** — the same-weekday-aware run-rate and the normal daily band (how much this account swings on an ordinary day) for each metric above. The band, not a fixed percentage, is what a breach is measured against.

## Optional Evidence

- **Hero-SKU product-feed status (per client)** — overnight disapproval or out-of-stock on the one or two SKUs that carry the account. A disapproved hero item is a slow-bleed signal that won't show in yesterday's revenue yet but will gut today's.
- **Account sensitivity / tier (per client)** — MRR, contract value, and how twitchy the client is. The same $-at-risk on a jumpy flagship outranks it on a relaxed small retainer; sensitivity is half the ranking.
- **Promo / send calendar (per client)** — a flash-sale day reads as a huge "spike," and the morning after a big send reads as a revenue cliff (demand was pulled forward). Both are expected, not anomalies — strip them before flagging.
- **Known overnight changes (per client)** — a budget edit, a campaign launch, a theme deploy, a migration. A "CPA blowout" the morning after a deliberate budget 3x is the plan, not a fire.
- **Yesterday's radar result** — a signal that fired yesterday *and* again today is a confirmed incident, not a one-morning blip. Repeat is what upgrades a WATCH to a real flag.

## How To Pull This Evidence

For each client on the roster, gather yesterday-vs-trailing-baseline on the few things that actually break overnight:

- **Commerce drop vs. baseline (Shopify)** — pull yesterday's revenue *and order count* and compare against the client's own trailing same-weekday baseline and normal daily band. Read the order count alongside revenue so one fluke order can't mask a collapse in volume (or vice versa).
- **Paid CPA blowout vs. baseline (Meta + Google)** — pull yesterday's spend and blended CPA/cost-per-result per ad platform and compare to the trailing baseline. Always pair the CPA move with the spend level: a tripled CPA on $40 of overnight spend is noise; a tripled CPA on $4,000 is the fire.
- **Conversions-to-zero / tracking break (per client)** — check that conversions posted yesterday at all, and reconcile platform-claimed conversions against store orders. If *conversions* read zero but *orders* are normal, it's a tracking break (FIX); if *both* are zero, it's a real outage (escalate). Never call these the same thing.
- **Deliverability spike (Klaviyo)** — pull yesterday's spam-complaint rate, bounce rate, and any send failure on the latest campaign/flow, against the deliverability baseline. A complaint or bounce spike is the tell that today's sends are at risk.
- **The overnight / weekend-lag gotcha:** "yesterday" is only trustworthy once the day has fully *settled*. Overnight order data, ad-platform spend, and especially attributed conversions lag — a 7am scan can read a normal night as a "drop" simply because the numbers haven't finished posting. Worse, on **Monday mornings** the baseline must compare to *prior Mondays*, not to the weekend, and the "drop vs. Friday" that the radar sees is often just the normal weekday/weekend rhythm, not an anomaly. Use a same-weekday baseline, give the data time to settle, and treat any signal on data that's still posting as a *look*, not an *act*.

Or skip all of this — ShopMCP scans the whole roster every morning.

## The Decision Logic (run in this order)

1. **Confirm the data settled before reading anything.** Yesterday must be a *complete, posted* day — orders, spend, and conversions all finished landing. If you're scanning before the data settled, or on weekend/overnight lag, any "drop" is suspect. A signal on un-settled data is a WATCH ("look once it settles"), never an immediate act.
2. **Set each client's baseline before flagging anyone.** Pull each account's own trailing, **same-weekday-aware** run-rate and normal daily band for revenue, CPA, conversions, and deliverability. A client with no baseline on file is **BLIND**, not quiet — you cannot declare an account fine on data you never had.
3. **Tracking-break gate, per client.** If conversions read zero (or platform-claimed conversions and store orders diverge hard) but store orders are otherwise normal, that's a **tracking FIX**, not a sales emergency — flag it as a data break and do not report it as a real revenue collapse. The reverse (orders *also* zero) is a genuine outage and escalates.
4. **Test each signal against the client's own band — not a blanket percentage.** A revenue dip that's inside a jumpy small account's normal daily swing is *noise*; the same dip on a steady high-volume account is a *breach*. The band is the bar. Below a per-client daily-volume floor, widen the band and require the signal to be large and confirmed before flagging.
5. **Separate one-morning noise from a real break.** A single overnight blip with no corroboration is a **flag-for-a-look**, not an action — especially if it sits right on the band edge. A signal that repeats from yesterday, or that two metrics corroborate (revenue down *and* conversions down), is a real incident.
6. **Strip the expected.** A promo day reads as a spike; the morning after a big send reads as a cliff; the morning after a deliberate budget change reads as a CPA move. If a known calendar event or change explains the signal, it is not an anomaly — suppress it.
7. **Rank survivors by money at risk × client sensitivity, and assign an owner.** Re-sort the real signals by *estimated $-at-risk* (how much revenue or spend the break is bleeding per day) multiplied by *client sensitivity* (tier, twitchiness, renewal proximity). Output only the flagged accounts — Client, Signal, Magnitude, Likely cause, Urgency, Owner. Everyone else is silent, and silence is the correct answer for most of the roster most mornings.

## Manual Workflow

1. Confirm yesterday is a settled, complete day, and that it's the right baseline weekday (Mondays compare to Mondays). If the data is still posting, note it and treat anything you see as provisional.
2. List the roster and confirm each client has a trailing same-weekday baseline + normal daily band on file. Flag any client without one as **BLIND** before you start — never declare a baseline-less account quiet.
3. For each client, pull yesterday vs. baseline on the four signals: commerce (revenue *and* orders), paid CPA/spend, conversions/tracking reconciliation, and deliverability. Add hero-SKU feed status if you track it.
4. Run the **tracking-break gate** per client first — separate "conversions zero but orders normal" (FIX) from "both zero" (real outage).
5. Test each move against *that client's own band*, not a blanket percentage; widen the band for small/low-volume accounts.
6. Strip promo days, post-send mornings, and known overnight changes. Drop any single-morning, band-edge blip to a WATCH.
7. Paste the prompt below with your per-client yesterday-vs-baseline figures.
8. Rank the survivors by $-at-risk × client sensitivity, assign each an owner and an urgency, and hand the morning stand-up the short list — only the accounts that need a human today.

## Copy-Paste Prompt

```text
You are my agency morning-radar analyst running the "Roster Anomaly Radar" play.

GOAL: across my whole client roster, surface ONLY the accounts that had a real overnight
anomaly needing a human TODAY — a revenue cliff, a CPA blowout, conversions-to-zero / a
tracking break, a deliverability spike, or a hero-SKU feed disapproval. This is a daily,
exception-only scan: most clients should be SILENT, and silence is the correct output for
an account that's fine. Do not pad the list to look thorough.

I will paste, per client: yesterday's revenue and order count vs that client's own trailing
same-weekday baseline, yesterday's blended CPA and spend vs baseline, a conversions/tracking
figure (conversions posted, and platform-claimed vs store orders), deliverability (spam/bounce
spike on the last send), and where I have them the hero-SKU feed status, account tier/MRR,
renewal date, and any known overnight change or promo. Some data will be missing.

PRE-FLIGHT: First list which clients I have yesterday-vs-baseline data for. For any client
with stale or missing data, mark them BLIND (not quiet) and say what's needed — never declare
a client fine on missing data.

RULES:
- Settled-data gate first: if yesterday's data is still posting, or it's a weekend/Monday
  lag situation, treat any "drop" as provisional — flag it as a LOOK, never an immediate act.
- Use a same-weekday baseline (Mondays vs Mondays). Judge every move against THAT client's
  own normal daily band, never a blanket percentage. A dip inside a jumpy account's normal
  swing is noise; the same dip on a steady account is a breach.
- Tracking-break gate: if conversions read zero but store orders are normal, that's a tracking
  FIX, not a revenue emergency — say so. If BOTH conversions and orders are zero, that's a real
  outage and escalates. Never conflate the two.
- One quiet morning is noise: a single band-edge blip with no corroboration is a flag-for-a-look,
  not an action. A signal that repeats from yesterday, or that two metrics corroborate, is real.
- Strip the expected: a promo day reads as a spike, the morning after a big send reads as a
  cliff, the morning after a deliberate budget change reads as a CPA move — suppress these.
- Pair every CPA move with the spend level: a tripled CPA on tiny overnight spend is noise.
- Below a per-client daily-volume floor, widen the band and require a large, confirmed signal.
- NEVER auto-act on a client's accounts — no pausing, no budget shift, no resend. Flag for a human.
- Every flagged row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 2-3 sentence executive read naming only the accounts that need a human this morning
   (and stating plainly how many of the roster are silent/fine).
2. An exception-only table — ONLY flagged clients, ranked by $-at-risk x client sensitivity —
   using exactly this header row:
   | Client | Signal | Magnitude | Likely cause | Urgency | Owner |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Which accounts are BLIND (stale/missing data) and what's needed to read them.
4. For each flagged client, the recommended FIRST human action (read-only check first).
```

## Decision Rules

- **Flag (real signal)** — yesterday breached *that client's own* daily band on a material metric **and** it survives the noise tests: data has settled, it isn't explained by promo/send/known-change, and it's either corroborated (two metrics agree) or a repeat of yesterday. Goes on the morning short list with an owner and urgency.
- **WATCH (flag for a look, don't act)** — a single-morning, band-edge move with no corroboration, or a signal sitting on un-settled / lagging data. Worth a human glance once the data settles; not worth pulling someone off planned work yet.
- **FIX (tracking break)** — conversions read zero (or platform-claimed vs store orders diverge hard) while store orders are otherwise normal. A data problem wearing a revenue costume — escalate to fix tracking, do *not* report it as a sales collapse.
- **BLIND (data gap)** — no trailing baseline on file, or yesterday's data is missing/too stale to read. Reported as an access gap, never as "quiet/fine." A baseline-less account is the easiest place for a real fire to hide.
- **Silent (the common case)** — every metric inside the client's normal band. This is the correct, expected output for most of the roster every morning; say so plainly and spend zero hours here.
- Every flagged row must carry a **number, source, time window, and confidence level** — a "revenue cliff" without all four is a hunch, not a finding, and not worth a stand-up's time.

## Veto Rules

- **Never flag on one quiet morning alone.** A single band-edge blip is a look, not an action — require corroboration (two metrics, or a repeat from yesterday) before pulling a human off planned work.
- **Never trust a weekend / overnight-lag drop.** Monday compares to Mondays, not the weekend; data that's still posting reads low for non-reasons. Let it settle, then judge.
- **Never conflate a tracking break with a real drop.** Conversions-to-zero with orders normal is a FIX (pixel/tag), not a sales emergency. Conversions *and* orders both zero is the real outage. Check orders before you sound the alarm.
- **Never judge two clients on the same absolute band.** A daily swing that's normal for a jumpy small account is a breach for a steady high-volume one. Use each client's own band.
- **Never call a promo spike or post-send cliff an anomaly.** A flash-sale day spikes; the morning after a big send dips as demand was pulled forward. Strip the calendar before flagging.
- **Never auto-act on a client's accounts off this scan.** No pausing campaigns, shifting budget, resending email, or messaging the client without a human reviewing the account first. The radar points the human; it never pulls the trigger.
- **Never report a BLIND account as quiet.** Missing data is a finding, not a pass — surface the gap loudly.

## Output Contract

An exception-only morning radar — **only** the accounts that broke a band appear, ranked by money at risk × client sensitivity. A roster where everyone is fine returns an *empty* flagged table and an explicit "N of N silent" read. That empty table is a success, not a missed scan.

Minimum table columns:

| Client | Signal | Magnitude | Likely cause | Urgency | Owner |
|---|---|---|---|---|---|
| Example Co | Revenue drop vs baseline | −$X/day vs band | Checkout / tracking — verify | Today | Priya |

## Worked Example

> **Executive read:** Of 15 active accounts, **12 are silent** and need nothing this morning. Three broke a band overnight: **Harborview Goods** lost roughly $3,100 of expected revenue with orders down to a trickle and conversions reading near-zero while store orders held — that's a tracking break, not a dead day, so it's a same-morning FIX before we'd ever call it a sales emergency. **Ridgeline Athletic** is burning spend at a tripled CPA on a live prospecting campaign with no obvious cause, on the flagship account 28 days from renewal, so it gets a senior human first. **Petal & Vine** had an overnight spam-complaint spike that puts today's scheduled send at risk — cheap to catch now, expensive to ignore. Everyone else is inside their normal daily band.

| Client | Signal | Magnitude | Likely cause | Urgency | Owner |
|---|---|---|---|---|---|
| **Ridgeline Athletic** ($310k/mo, flagship, renews 28d) | Paid CPA blowout | CPA $19 → $61 on $2,840 spend (yesterday vs 21-day baseline) | Real blowout — no known change; auction or LP break, verify | **Now (senior)** | Dana |
| **Harborview Goods** ($46k/mo) | Conversions → near-zero, revenue cliff | ~$3,100 below daily band; orders 38 → 4; conversions 2 vs ~40 baseline but store orders ~36 | **Tracking break** (conversions zero, orders normal) — FIX pixel, not a sales emergency | **This morning** | Marcus |
| **Petal & Vine** ($24k/mo) | Deliverability spike | Spam complaints 0.08% → 0.41%; bounces up 3.2x on last flow | Complaint spike — pause today's scheduled send and review list hygiene | **Before 11am send** | Sofia |

Read the table the way the morning actually plays out. Harborview *looks* like the worst fire — a revenue cliff and conversions near zero — but the order count says the store is still selling, so it's a broken pixel, not lost sales; it's urgent to fix the data, not urgent to panic. Ridgeline is the genuine money fire: real spend converting at a tripled CPA on the agency's biggest, twitchiest, soon-to-renew account, which is why it outranks a bigger raw dollar number and goes to a senior human first. Petal & Vine is the cheap save — five minutes now to hold a send beats a deliverability hole that bleeds for a month.

## Common Failure Modes

- **Flagging on one quiet overnight** instead of requiring corroboration or a repeat — burning the morning chasing a band-edge blip that's gone by lunch.
- **Trusting a weekend/Monday or still-posting-data "drop"** — sounding an alarm on numbers that simply hadn't finished landing, or comparing Monday to the weekend.
- **Calling a tracking break a sales emergency** — the most expensive false alarm: conversions read zero, everyone panics, and the store was selling fine the whole time (and vice versa — missing a real outage because "the pixel's probably just flaky").
- **Judging every client on the same percentage** — a −15% day that's normal noise for a jumpy small account read as a crisis, or a real breach on a steady account waved off as "within range."
- **Mistaking a promo spike or post-send cliff for an anomaly** — the calendar explained it; nobody checked the calendar.
- **Padding the flagged list to look thorough** — surfacing six "maybes" so the scan feels complete defeats the entire point; an exception radar that flags everyone is just another dashboard.
- **Reporting a BLIND account as quiet** — the at-risk client with no baseline hides in the silence, and the radar gives false comfort.
- **Auto-acting on the signal** — pausing a campaign or messaging a client straight off the scan, before a human confirmed it was real.

## Run This Play With Live Data

**Manual version:** every morning, for *every* client on the roster, open yesterday's commerce, paid, tracking, and deliverability numbers; reconstruct each client's own same-weekday baseline and normal band; separate real breaks from overnight lag and promo noise; rank what's left — then do the entire thing again tomorrow, and the day after.

**ShopMCP version:** connect each client's store, ad platforms, and Klaviyo once. Ask the question; ShopMCP scans **every connected account across the roster every morning**, compares each client's yesterday against its own trailing same-weekday baseline and daily band, runs the settled-data and tracking-break gates, strips promo/post-send/known-change noise, ranks the survivors by money at risk × client sensitivity, and returns the exception-only radar — only the accounts that need a human today, each with the signal, the magnitude, the likely cause, and the owner. It stays **read-only**: pausing a campaign, holding a send, shifting budget, or messaging a client always needs your explicit approval.

> This is the agency multiplier at its sharpest *daily* edge. The manual version costs a roster's worth of dashboard-opening every single morning, so it either doesn't happen or it eats the first two hours of someone's day — which is precisely why the broken checkout gets caught at noon by the client's email instead of at 7am by the radar. ShopMCP runs the identical scan across **every connected client account at once, every morning**, so the stand-up starts with the one or two accounts that are actually on fire and a clean "everyone else is silent." No live line into each client's commerce, ads, and Klaviyo every morning is the wall every manual run hits. ShopMCP *is* that connection — and running an exception-only scan across the whole roster overnight is the entire point.

Example ShopMCP prompt:

```text
Run the Roster Anomaly Radar play across my whole connected roster for yesterday vs each
client's own trailing baseline. Surface ONLY the accounts with a real overnight anomaly that
needs a human today, ranked by money at risk x client sensitivity, and tell me how many of the
roster are silent. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/agency-roster-anomaly-watch?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Opening every client's dashboards every single morning to confirm most are fine.
- Reconstructing each client's own same-weekday baseline and normal band by hand.
- Telling a real overnight break apart from weekend lag, promo noise, and a flaky pixel.
- Re-running the whole roster scan again tomorrow, and every morning after that.
