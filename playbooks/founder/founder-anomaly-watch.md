---
schema_version: 1
slug: "founder-anomaly-watch"
title: "Revenue Anomaly Watch"
summary: "Revenue Anomaly Watch helps ecommerce operators answer: What changed enough to explain the revenue anomaly?"
operating_question: "What changed enough to explain the revenue anomaly?"
short_title: "Revenue Anomaly"
primary_persona: "founder"
personas: ["founder"]
category: "trading-profit"
platforms: ["commerce", "google-analytics-4"]
cadence: "triggered"
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/founder-anomaly-watch"
shopmcp_prompt: "Run the Revenue Anomaly Watch play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Revenue Anomaly Watch

## Operating Question

**Revenue just moved hard against the baseline — what actually changed, and is it even real before I react?**

A day or week breaks abnormally from the rolling baseline (a spike or a drop beyond roughly **2 standard deviations of the trailing 28-day daily revenue**, or **>20% versus the trailing 14-day average**), and the instinct is to celebrate or panic immediately. Both are usually wrong. This play forces a cold sequence: first decide whether the anomaly is **REAL or a tracking artefact**, then decompose the move into **Traffic × Conversion Rate × AOV**, then find the single channel / device / geo / product / new-vs-returning slice that **concentrates the variance** — and rank candidate explanations by how much of the swing each one accounts for. The output is a defensible attribution of the move, not a vibe.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your Shopify order ledger or your GA4 property, so it cannot tell a real demand swing from a double-fired pixel. To do this manually under pressure you have to:

1. Pull **commerce orders** for the anomaly day and the trailing baseline, net of cancellations, test orders, and the one $14,000 wholesale order that skews everything.
2. Pull **GA4 sessions, conversion rate, and revenue** for the same exact window, by channel / device / geo / landing page.
3. **Reconcile the two**, because GA4 last-click revenue and Shopify booked revenue rarely agree — and the gap is itself a clue (a tracking break shows up as one source moving and the other not).
4. Decompose the move and rank slices by share of variance — fast, while the Slack thread is already on fire.

**The decomposition logic in this playbook is free. The live, reconciled access to commerce + GA4 is the hard part — and that is exactly what ShopMCP connects.** With no live data line, a manual run stalls at step 2. The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Founder / CEO — the person being asked "why is revenue down today?" in the standup.
- **Also useful for:** Head of Ecommerce / Trading Manager (channel decomposition), Performance lead (if the swing traces to paid), Ops (if it traces to stock or fulfilment).
- Run it the moment someone reacts to a number — to replace "revenue is down, pause everything" with "here is the slice that moved and the confidence level."

## When To Run It

- **Cadence:** triggered — fired by an alert or by a human noticing an abnormal day/week, not on a calendar.
- **Triggers:** daily revenue beyond ~2 SD of the trailing 28-day mean; revenue >20% above or below the trailing 14-day average; a sudden order-count cliff; a spike that looks "too good." 
- **Pre-requisite:** confirm the alert window is **closed** (settled orders, not a half-finished day) before you trust the delta. Comparing a partial day against full days manufactures a fake anomaly every time.

## Required Evidence

- **Commerce (Shopify / Woo / BigCommerce / etc.)** — net revenue, order count, AOV, and units for the anomaly window **and** the trailing baseline (14- and 28-day), net of cancellations / test orders / refunds. Split by **channel/UTM source, device, geo, product, and new-vs-returning customer**.
- **GA4** — sessions, engaged sessions, ecommerce conversion rate, and purchase revenue for the same exact windows, broken down by **default channel grouping, device category, country, and landing page**.
- **Baseline definition** — the trailing-average and standard-deviation numbers the anomaly was flagged against, so "abnormal" is a stated threshold, not a feeling.

## Optional Evidence (changes the answer when present)

- **Promo / discount calendar** — a live or just-ended promo explains most "anomalies" and borrows demand from the next window.
- **Known incidents** — site outage, checkout error, payment-gateway downtime, app/pixel deploy, or a CDN blip during the window.
- **Bot / referral-spam context** — a sudden session flood from one source/geo with ~0% conversion is traffic noise, not demand.
- **External demand drivers** — a TikTok / press / influencer mention, a competitor stockout, weather, or a public holiday shifting the baseline.
- **Stock state** — a hero SKU back in stock (spike) or sold out (drop) during the window.

## How To Pull This Evidence

- **Shopify net revenue/orders** — Analytics → Reports → "Sales over time" and "Sales by traffic source"; set the date range to the anomaly window, then re-run it for the trailing 14/28 days. Gotcha: the dashboard tiles show *gross* sales by order date — switch to **net sales** and confirm cancellations/refunds attribute to the order date, not the refund date, or your delta is wrong.
- **Shopify slices (channel/device/geo/product/new-vs-returning)** — same Reports area: "Sales by referrer", "Online store conversion over time", and "Customers" → first-time vs returning. Gotcha: exclude **test orders and the one giant wholesale/POS order** before you trust AOV — a single $14k order silently owns the whole swing.
- **GA4 sessions/CVR/revenue** — Reports → Acquisition → "Traffic acquisition" (set primary dimension to Default channel grouping) and Monetization → Ecommerce purchases; apply the exact same dates. Gotcha: GA4 defaults to **last-click attribution and its own timezone/data-thresholding** — match the property timezone to your store and disable thresholding, or GA4 and Shopify will never reconcile.
- **GA4 reconciliation check** — compare GA4 "purchase revenue" to Shopify net for the window side by side. Gotcha: a gap that *only* moves on one side is the artefact signal — don't average them away.
- **Baseline / threshold** — pull the trailing-average and standard-deviation the alert fired on from whatever raised it (Shopify alert, Triple Whale, Glew, a sheet). Gotcha: if no one can state the threshold, the "anomaly" is a feeling — recompute it before proceeding.
- **Promo calendar & incidents** — check Shopify Discounts (active/just-ended codes) and your status page / deploy log / app-install history for the window. Gotcha: a promo that ended *yesterday* still distorts today by borrowing demand forward.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Validate the window first.** Confirm the anomaly day/week is fully settled and compared against equal, complete periods. A partial day vs. full days is an artefact → **FIX** the comparison before anything else.
2. **REAL or artefact?** Reconcile commerce orders against GA4 purchases for the window. If they diverge sharply (e.g. GA4 revenue jumps but Shopify orders are flat, or order count doubles with no session lift), suspect **double-fired purchases, a bot/referral-spam session flood, or a tracking/outage break** → **FIX**, do not act on the number. Only a move that shows up in *both* commerce and analytics is real.
3. **Decompose into Traffic × CVR × AOV.** Revenue = Sessions × CVR × AOV. Compute each factor's change vs. baseline and attribute the revenue delta across the three. Name which factor moved — most anomalies are a one-factor story.
4. **Find the concentrating slice.** Within the factor that moved, drill by channel / device / geo / product / new-vs-returning and rank slices by **share of the total variance**. Decide: is the move **concentrated** (one slice owns most of it) or **broad** (spread evenly — a sign of tracking or a sitewide event)?
5. **Rank candidate explanations by variance explained.** List each plausible cause with the percentage of the swing it accounts for. The winner is the smallest set of causes that explains most of the move.
6. **Apply the vetoes**, then assign status + owner + recheck window. One day is a signal, not a trend.

## Manual Workflow

1. State the anomaly precisely: metric, direction, size, window, and the baseline/threshold it broke (e.g. "+38% DoD revenue, 2.4 SD above trailing 28-day mean").
2. Pull commerce and GA4 for the anomaly window and the trailing 14/28-day baseline, with the breakdowns above. Net out cancellations and test orders.
3. Reconcile commerce vs. GA4 for the window — this is the REAL-or-artefact gate. If they disagree materially, mark **FIX** and investigate tracking before decomposing.
4. Build the **Traffic × CVR × AOV** decomposition; identify the moving factor.
5. Drill the moving factor by slice; rank slices by share of variance and label the move concentrated or broad.
6. Paste the prompt below with your tables. Pressure-test against the veto list, then write the action packet with owner, recheck window, and confidence level.

## Copy-Paste Prompt

```text
You are my ecommerce trading analyst running the "Revenue Anomaly Watch" play.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If settled commerce
order data (net of cancellations/test orders) for the anomaly window AND the trailing
baseline is missing, STOP and return only (a) what's missing and (b) how to get it — never
estimate it or proceed.

SITUATION: revenue broke abnormally from baseline and people want to react. Before anyone
acts, tell me what actually changed and whether it is even real.

I will paste: the anomaly statement (metric, direction, size, window, baseline/threshold),
commerce orders/AOV/units for the anomaly window and the trailing 14/28-day baseline split
by channel/device/geo/product/new-vs-returning, and GA4 sessions/CVR/revenue for the same
windows and splits. Some data may be missing.

RUN IN THIS ORDER:
1. Validate the window: is the anomaly period fully settled and compared against equal,
   complete periods? If not, mark FIX and stop.
2. REAL or artefact: reconcile commerce orders vs GA4 purchases for the window. If they
   diverge sharply (double-fired purchases, bot/referral-spam session flood, outage,
   tracking break), mark FIX and do NOT attribute the move to demand.
3. Decompose: Revenue = Sessions x CVR x AOV. Attribute the revenue delta across the three
   factors and name the one that moved.
4. Concentrate: within the moving factor, rank channel/device/geo/product/new-vs-returning
   slices by share of variance. State whether the move is concentrated or broad.
5. Rank candidate explanations by % of the swing each accounts for. Smallest set that
   explains most of the move wins.

RULES:
- A move is only REAL if it appears in BOTH commerce and analytics.
- One day is not a trend. Flag anything resting on a single day as directional.
- Every row carries a number, its source, the time window, and a confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read: real or artefact, the moving factor, the concentrating slice.
2. A decomposition table: Factor | Baseline | Anomaly window | Change | Share of revenue delta.
3. A ranked explanations table using EXACTLY this header row:
   | Explanation | Variance explained | Evidence | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns, and
   do not replace the table with prose.
4. Vetoes/caveats that downgraded any conclusion.
5. What evidence is blocked and what you'd need to confirm the cause.
```

## Decision Rules

- **FIX** — the window is unsettled or mismatched, or commerce and GA4 diverge enough that the move can't be trusted as real (double-fire, bot flood, outage, tracking break). Resolve before attributing anything.
- **KILL** — only for a confirmed, sustained negative driver where the cause is clear, it shows in both data sources, and no veto protects it (e.g. a checkout step that's been silently failing for days). Never kill on one day.
- **REFRESH** — the anomaly traces to a fixable, decaying asset (a fatigued top-of-funnel source, a landing page whose CVR cratered) that still has a credible path back.
- **WATCH** — the move is real but rests on a single day, a small slice, or a still-open trend; monitor across a clean window before acting.
- **KEEP** — a real, healthy spike (or an explained, benign dip) where the right move is to protect what's working, not to intervene.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- Do **not** celebrate or panic before the REAL-or-artefact gate clears — rule out double-fired purchases and bot traffic first.
- Do **not** call one day a trend. A single anomalous day is a signal to investigate, never a mandate to act.
- Do **not** attribute the move to strategy when a **promo, discount, or just-ended sale** explains most of it (and remember it borrows demand from the next window).
- Do **not** ignore a **site outage, checkout error, or payment-gateway incident** during the window — an "organic drop" is often a broken funnel.
- Do **not** claim a real demand swing from a single source — it must appear in both commerce and analytics.
- Do **not** recommend writes, budget shifts, refunds, customer messages, or catalog changes without explicit human approval.

## Output Contract

A 3-sentence trading read, a Traffic × CVR × AOV decomposition, and a ranked explanations table — each explanation carrying its share of the variance, evidence, status, and recheck window.

| Explanation | Variance explained | Evidence | Status | Owner | Recheck |
|---|---|---|---|---|---|
| Example row | 0% | Source + number + window | WATCH | Founder | After a clean 7-day window |

## Worked Example

> **Executive read:** Yesterday's revenue spike (**+38% DoD, 2.4 SD above the trailing 28-day mean**) is REAL — it shows in both Shopify orders and GA4 purchases. It is **concentrated, not broad**: ~91% of the lift is a traffic surge to one product (the "Trail Flask 750ml") from a single viral TikTok, with CVR and AOV essentially flat. This is a demand event to protect and restock against, not a sitewide trend — so hold pricing, check Trail Flask stock cover, and recheck after the TikTok traffic decays.

| Explanation | Variance explained | Evidence | Status | Owner | Recheck |
|---|---|---|---|---|---|
| Traffic surge to Trail Flask 750ml from one viral TikTok | **~91%** | Sessions +41% (GA4, yesterday); TikTok/social referral +5,900 sessions to one PDP; orders confirmed in Shopify | **KEEP** | Founder + Ops | 3 days |
| AOV drift (slightly lower — single-item TikTok carts) | ~6% | AOV $58 → $55 (Shopify, yesterday vs 28d) | **WATCH** | Founder | 3 days |
| Sitewide CVR | ~0% | CVR 2.1% → 2.1% (GA4, yesterday vs 28d) — flat, rules out broad cause | **KEEP** | Founder | 7 days |
| Returning-customer email pop (minor, coincidental) | ~3% | Email channel +$640 (GA4); flow sent same morning | **WATCH** | Lifecycle | 7 days |

Contrast with the **false-alarm pattern** this play exists to catch: an alert fires on "+62% revenue" that exists *only* in GA4 while Shopify order count is flat — a checkout pixel started double-firing after a deploy. That is **FIX**, not a win. Same shape on the alert, opposite truth: one is a concentrated real demand event, the other is a tracking artefact, and only the commerce↔GA4 reconciliation tells them apart.

## Common Failure Modes

- Celebrating a spike that lives only in GA4 (double-fired pixel) or panicking over a drop that's just a bot flood.
- Comparing a half-finished day against complete days and inventing an anomaly.
- Treating one anomalous day as a trend and changing strategy on it.
- Missing the promo or outage that explains 80% of the move.
- Reading the blended number and never finding the single slice that concentrates the variance.
- Accepting an AI answer that doesn't show its decomposition or its numbers.

## Run This Play With Live Data

**Manual version:** export Shopify orders and GA4 for the anomaly window and the trailing baseline, net out cancellations and test orders, reconcile the two sources by hand, decompose Traffic × CVR × AOV, and rank slices by variance — all while the question is already being asked in Slack.

**ShopMCP version:** connect your store and GA4 once. Ask the question; ShopMCP pulls live commerce orders and GA4 for the anomaly and baseline windows, runs the REAL-or-artefact reconciliation, computes the Traffic × CVR × AOV decomposition, finds the slice that concentrates the variance, and returns the ranked explanations table — in minutes, not a tab-juggling scramble. It stays **read-only** until you explicitly approve any action.

> No Shopify or GA4 connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of a frantic spreadsheet session mid-fire.

Example ShopMCP prompt:

```text
Run the Revenue Anomaly Watch play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/founder-anomaly-watch?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual Shopify and GA4 exports under time pressure.
- Reconciling commerce orders against GA4 purchases by hand to spot a tracking artefact.
- Rebuilding the Traffic × CVR × AOV decomposition and the variance ranking every time.
- Guessing whether a one-day move is real, concentrated, and worth reacting to.
