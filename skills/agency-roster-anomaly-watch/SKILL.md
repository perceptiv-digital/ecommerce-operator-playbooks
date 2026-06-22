---
name: agency-roster-anomaly-watch
description: "When an ecommerce operator needs to decide: Which client needs a human this morning? Runs the Roster Anomaly Radar play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Roster Anomaly Radar', 'Commerce', 'Meta Ads', 'Google Ads', 'Klaviyo', 'Agency Portfolio'."
license: CC-BY-4.0
metadata:
  persona: Agency AM / COO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Roster Anomaly Radar

**Operating question:** Which client needs a human this morning?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce, yesterday vs. baseline (per client)** — yesterday's revenue and order count against *that client's own* trailing same-weekday baseline (Tuesdays compare to Tuesdays). A drop beyond the client's normal daily band is the headline signal. Order count matters as much as revenue: revenue can hold on one fluke big order while the order *count* has cratered.
- **Paid efficiency, yesterday vs. baseline (per client)** — yesterday's blended CPA (or cost-per-result) and spend versus the trailing baseline, across all that client's ad platforms. A CPA blowout — spend continuing while results collapse — is the second signal. Pair it with spend so you can separate "burned money on nothing" from "barely spent, ignore."
- **Conversion / tracking integrity (per client)** — did conversions actually post yesterday, and does platform-claimed conversion count reconcile with store orders? **Conversions to zero is the loudest signal on this radar** — but it is also the most ambiguous, because a broken pixel and a real dead day look identical until you check whether *orders* also went to zero.
- **Deliverability, yesterday vs. baseline (per client)** — overnight spam-complaint rate, bounce rate, and any hard send failure on the last campaign or flow. A complaint/bounce spike is an early signal that today's sends are about to be throttled or blocked.
- **Per-client trailing baselines** — the same-weekday-aware run-rate and the normal daily band (how much this account swings on an ordinary day) for each metric above. The band, not a fixed percentage, is what a breach is measured against.

Optional, if available:

- **Hero-SKU product-feed status (per client)** — overnight disapproval or out-of-stock on the one or two SKUs that carry the account. A disapproved hero item is a slow-bleed signal that won't show in yesterday's revenue yet but will gut today's.
- **Account sensitivity / tier (per client)** — MRR, contract value, and how twitchy the client is. The same $-at-risk on a jumpy flagship outranks it on a relaxed small retainer; sensitivity is half the ranking.
- **Promo / send calendar (per client)** — a flash-sale day reads as a huge "spike," and the morning after a big send reads as a revenue cliff (demand was pulled forward). Both are expected, not anomalies — strip them before flagging.
- **Known overnight changes (per client)** — a budget edit, a campaign launch, a theme deploy, a migration. A "CPA blowout" the morning after a deliberate budget 3x is the plan, not a fire.
- **Yesterday's radar result** — a signal that fired yesterday *and* again today is a confirmed incident, not a one-morning blip. Repeat is what upgrades a WATCH to a real flag.

## How to decide — in order

1. **Confirm the data settled before reading anything.** Yesterday must be a *complete, posted* day — orders, spend, and conversions all finished landing. If you're scanning before the data settled, or on weekend/overnight lag, any "drop" is suspect. A signal on un-settled data is a WATCH ("look once it settles"), never an immediate act.
2. **Set each client's baseline before flagging anyone.** Pull each account's own trailing, **same-weekday-aware** run-rate and normal daily band for revenue, CPA, conversions, and deliverability. A client with no baseline on file is **BLIND**, not quiet — you cannot declare an account fine on data you never had.
3. **Tracking-break gate, per client.** If conversions read zero (or platform-claimed conversions and store orders diverge hard) but store orders are otherwise normal, that's a **tracking FIX**, not a sales emergency — flag it as a data break and do not report it as a real revenue collapse. The reverse (orders *also* zero) is a genuine outage and escalates.
4. **Test each signal against the client's own band — not a blanket percentage.** A revenue dip that's inside a jumpy small account's normal daily swing is *noise*; the same dip on a steady high-volume account is a *breach*. The band is the bar. Below a per-client daily-volume floor, widen the band and require the signal to be large and confirmed before flagging.
5. **Separate one-morning noise from a real break.** A single overnight blip with no corroboration is a **flag-for-a-look**, not an action — especially if it sits right on the band edge. A signal that repeats from yesterday, or that two metrics corroborate (revenue down *and* conversions down), is a real incident.
6. **Strip the expected.** A promo day reads as a spike; the morning after a big send reads as a cliff; the morning after a deliberate budget change reads as a CPA move. If a known calendar event or change explains the signal, it is not an anomaly — suppress it.
7. **Rank survivors by money at risk × client sensitivity, and assign an owner.** Re-sort the real signals by *estimated $-at-risk* (how much revenue or spend the break is bleeding per day) multiplied by *client sensitivity* (tier, twitchiness, renewal proximity). Output only the flagged accounts — Client, Signal, Magnitude, Likely cause, Urgency, Owner. Everyone else is silent, and silence is the correct answer for most of the roster most mornings.

## The prompt to run

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

## Decision rules

- **Flag (real signal)** — yesterday breached *that client's own* daily band on a material metric **and** it survives the noise tests: data has settled, it isn't explained by promo/send/known-change, and it's either corroborated (two metrics agree) or a repeat of yesterday. Goes on the morning short list with an owner and urgency.
- **WATCH (flag for a look, don't act)** — a single-morning, band-edge move with no corroboration, or a signal sitting on un-settled / lagging data. Worth a human glance once the data settles; not worth pulling someone off planned work yet.
- **FIX (tracking break)** — conversions read zero (or platform-claimed vs store orders diverge hard) while store orders are otherwise normal. A data problem wearing a revenue costume — escalate to fix tracking, do *not* report it as a sales collapse.
- **BLIND (data gap)** — no trailing baseline on file, or yesterday's data is missing/too stale to read. Reported as an access gap, never as "quiet/fine." A baseline-less account is the easiest place for a real fire to hide.
- **Silent (the common case)** — every metric inside the client's normal band. This is the correct, expected output for most of the roster every morning; say so plainly and spend zero hours here.
- Every flagged row must carry a **number, source, time window, and confidence level** — a "revenue cliff" without all four is a hunch, not a finding, and not worth a stand-up's time.

## Vetoes — stop if any apply

- **Never flag on one quiet morning alone.** A single band-edge blip is a look, not an action — require corroboration (two metrics, or a repeat from yesterday) before pulling a human off planned work.
- **Never trust a weekend / overnight-lag drop.** Monday compares to Mondays, not the weekend; data that's still posting reads low for non-reasons. Let it settle, then judge.
- **Never conflate a tracking break with a real drop.** Conversions-to-zero with orders normal is a FIX (pixel/tag), not a sales emergency. Conversions *and* orders both zero is the real outage. Check orders before you sound the alarm.
- **Never judge two clients on the same absolute band.** A daily swing that's normal for a jumpy small account is a breach for a steady high-volume one. Use each client's own band.
- **Never call a promo spike or post-send cliff an anomaly.** A flash-sale day spikes; the morning after a big send dips as demand was pulled forward. Strip the calendar before flagging.
- **Never auto-act on a client's accounts off this scan.** No pausing campaigns, shifting budget, resending email, or messaging the client without a human reviewing the account first. The radar points the human; it never pulls the trigger.
- **Never report a BLIND account as quiet.** Missing data is a finding, not a pass — surface the gap loudly.

## Output

An exception-only morning radar — **only** the accounts that broke a band appear, ranked by money at risk × client sensitivity. A roster where everyone is fine returns an *empty* flagged table and an explicit "N of N silent" read. That empty table is a success, not a missed scan.

Minimum table columns:

| Client | Signal | Magnitude | Likely cause | Urgency | Owner |
|---|---|---|---|---|---|
| Example Co | Revenue drop vs baseline | −$X/day vs band | Checkout / tracking — verify | Today | Priya |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/agency-roster-anomaly-watch) — it executes this play read-only by default and applies changes only on your approval.
