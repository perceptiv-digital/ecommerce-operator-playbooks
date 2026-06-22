---
schema_version: 1
slug: "ecom-weekly-trading-deck"
title: "Weekly Trading Deck"
summary: "Weekly Trading Deck helps ecommerce operators answer: What happened this week, why, and what should the operator do next?"
operating_question: "What happened this week, why, and what should the operator do next?"
short_title: "Weekly Trading"
primary_persona: "ecommerce"
personas: ["ecommerce", "founder"]
category: "trading-profit"
platforms: ["commerce", "google-analytics-4"]
cadence: "weekly"
difficulty: "intermediate"
manual_time_minutes_min: 45
manual_time_minutes_max: 90
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: true
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://shop-mcp.app"
shopmcp_prompt: "Run the Weekly Trading Deck play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Weekly Trading Deck

## Operating Question

**What happened to revenue this week, which lever actually moved it, and what are the three things I do about it before Tuesday?**

This is the Monday trading read — the meeting where the Head of Ecommerce has to explain the number to the founder and the board without hiding behind "traffic was soft." The trap is that revenue is one number with at least three different diseases. Revenue decomposes into **sessions × conversion rate × average order value**, and a drop in each one has a completely different fix: a traffic problem is a marketing/channel conversation, a CVR problem is a site/checkout/merchandising conversation, and an AOV problem is a pricing/bundle/mix conversation. Hand any of those three the wrong owner and you burn a week chasing the wrong fire. This play forces the revenue move down to the lever that caused it, attributes it to a channel and a cohort, and hands back a one-paragraph narrative plus the three highest-priority actions — not a 40-tab dashboard.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Shopify (or Woo/BigCommerce) orders or your GA4 property, so it cannot decompose a single dollar of revenue. To run this read manually you have to:

1. Pull **this week vs last week** from commerce: gross revenue, orders, AOV, and the new-vs-returning split — with refunds and test orders stripped out.
2. Pull **sessions and conversion rate** from GA4 for the matching window, by **default channel grouping** (paid / organic / email / direct / social).
3. Reconcile the two, because GA4 sessions×CVR will *not* reconcile to Shopify revenue exactly — different attribution, different timezone, bot filtering, consent gaps.
4. Rank top movers — products and collections up and down — and overlay the promo calendar so you don't read a flash-sale spike as underlying demand.

**The reasoning in this playbook is free. The live read into your store and GA4 is the part that takes an hour every Monday — and that is exactly what ShopMCP connects.** If your AI assistant has no line into commerce and GA4, that's where the manual run stalls. The last section is the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Ecommerce / Ecommerce Director.
- **Also useful for:** Founder/CEO (the "is the number real?" question), Trading/Merchandising Manager (top-mover follow-through), Performance lead (when the lever turns out to be traffic).
- Run it **yourself** before the Monday trading stand-up — the value is in walking in with the *diagnosis and three actions*, not a deck someone else built that you're seeing for the first time.

## When To Run It

- **Cadence:** weekly — **Monday morning**, after the weekend's orders, refunds, and GA4 processing have settled (GA4 can take 24–48h to finalize; reading Sunday's number on Sunday night is a known trap).
- **Triggers:** revenue missing or beating week's target, a conversion-rate alert, a big swing in a hero SKU, the week after a promo ends (demand payback), or a site/checkout deploy you want to confirm didn't break anything.
- **Pre-requisite:** confirm the comparison weeks are like-for-like. Bank holidays, payday weeks, and the tail of a promo will move the number for reasons that have nothing to do with how the business is trading.

## Required Evidence

- **Commerce (Shopify / Woo / BigCommerce, etc.)** — this week vs last week: **gross and net revenue, order count, AOV, units per order**, refunds, and **new vs returning** customer split. This is your source of truth for revenue; GA4 is not.
- **GA4** — for the matching window: **sessions, engaged sessions, ecommerce conversion rate, and purchases**, broken out by **default channel grouping** (Paid Search, Paid Social, Organic Search, Direct, Email, Organic Social, Referral). This is what lets you split a revenue move into the sessions × CVR × AOV levers.
- **A comparison baseline** — last week (WoW) **and** the same week last year (YoY) or your weekly target/forecast. A WoW move with no baseline is uninterpretable.
- **Top movers** — products and collections with the biggest revenue gain and biggest revenue loss vs last week.

## Optional Evidence

- **Promo / discount calendar** — which days ran an offer, the depth, and the code. Without it you will misread a promo spike as demand.
- **Site/deploy log** — theme changes, checkout edits, app installs/removals, payment-method changes timestamped to the day.
- **Stock position** on hero SKUs — a revenue drop on a top product is often a stockout, not a demand or CVR problem.
- **Device split** (mobile vs desktop CVR) — the single fastest way to localize a checkout regression.
- **Tracking health** — known consent-banner, GTM, or pixel incidents that would dent measured CVR without denting real demand.

## How To Pull This Evidence

- **Shopify WoW commerce** — Analytics → Reports → Sales over time for this week and last week (same days, same length); pull revenue, orders, and AOV, then segment by **new vs returning** customer. Gotcha: use **net sales** (refunds and test/draft orders stripped) — gross sales over-reads the number you'll defend in the room.
- **GA4 sessions, CVR, channel** — Reports → Acquisition → Traffic acquisition, dimension **Default channel group**, for the matching window. Gotcha: build conversion rate from **`purchases` / `key events`**, not "sessions with transactions" — the legacy ecommerce-CVR metric attributes differently and won't match.
- **GA4 device split** — same report, add **Device category** as a secondary dimension. A mobile-only CVR move with desktop flat is your fastest checkout-regression localizer.
- **Top movers** — Shopify Reports → Sales by product (and by collection), sorted by revenue delta vs last week; keep the top 3–5 gainers and losers. Gotcha: a hero SKU that went to zero inventory mid-week shows as a revenue loss, not a CVR loss — cross-check stock before blaming the funnel.
- **Like-for-like windows** — set both date ranges to whole, matched weeks (Mon–Sun vs Mon–Sun) and let GA4 finalize for 24–48h before reading. Gotcha: timezone and attribution differences mean GA4 sessions×CVR will not reconcile to Shopify revenue exactly — expect drift, don't chase it.
- Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Establish the revenue move and its size.** Net revenue this week vs last week, as a number and a percent, commerce-side. Note the WoW *and* the baseline (YoY or target) gap. Until you know the magnitude you can't tell signal from noise (see Decision Rules).
2. **Decompose before you explain.** Hold revenue = **sessions × CVR × AOV** and find which term carries the move. Sessions flat, CVR down → a **conversion problem**. CVR flat, sessions down → a **traffic problem**. Both flat, revenue down → an **AOV / mix problem** (or refunds). Never narrate the cause before you've isolated the lever — this is the step everyone skips.
3. **Localize the moved lever.**
   - **Traffic move** → which channel? Split sessions by default channel grouping WoW. A paid drop is a budget/delivery question; an organic drop is rankings/seasonality; a direct/email drop is often a tracking or send-calendar artifact.
   - **CVR move** → which surface? Split CVR by **device** (mobile vs desktop) and by **landing/entry behavior**. A mobile-only CVR drop with desktop flat is a checkout or page regression until proven otherwise — run the tracking check before you accept it as real.
   - **AOV move** → units-per-order vs price/mix. Did a promo shift the basket, did a high-AOV hero go out of stock, or did discount depth rise?
4. **Attribute the cohort.** Overlay **new vs returning**. New-customer revenue down is usually acquisition (a traffic/channel story); returning down is usually lifecycle/email or a loyalty/repeat issue. They route to different owners.
5. **Name the top movers.** Which 3–5 products/collections drove the gain and which drove the loss. One stocked-out hero can explain an entire "CVR drop" that isn't one.
6. **Apply the vetoes, then write the narrative.** Strip promo distortion, confirm tracking, then compress to one paragraph and exactly three actions, each with an owner and a recheck date.

## Manual Workflow

1. Pull commerce WoW (net revenue, orders, AOV, new/returning), refunds and test orders excluded, for this week and last week — same days of week, same length.
2. Pull GA4 for the matching window: sessions, ecommerce CVR, purchases, by default channel grouping; add the device split.
3. Compute the decomposition: lay sessions, CVR, and AOV side by side WoW and mark which term moved most. Sanity-check that sessions × CVR roughly tracks GA4 purchases (not commerce revenue — they won't tie exactly).
4. Build two short lists: **top revenue gainers** and **top revenue losers** by product/collection.
5. Overlay the promo calendar and any deploys/stock events onto the days that moved.
6. Paste the prompt below with your tables. Pressure-test the narrative against the vetoes, then keep only the three highest-leverage actions with owners.

## Copy-Paste Prompt

```text
You are my ecommerce trading analyst running the "Weekly Trading Deck" play.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If commerce
truth for the week (net revenue/orders/AOV/new-vs-returning) plus a
confirmed-trustworthy CVR/sessions read is missing, STOP and return only (a) what's
missing and (b) how to get it — never estimate it or proceed. Do not narrate a CVR
drop on unverified tracking.

GOAL: tell me what happened to revenue this week, isolate WHICH LEVER moved it
(sessions vs conversion rate vs AOV), attribute it to a channel and to new-vs-returning,
and hand me the THREE highest-priority actions with owners. Not a data dump.

I will paste: commerce revenue/orders/AOV/new-vs-returning this week vs last week;
GA4 sessions, ecommerce CVR, and purchases by default channel grouping (and by device);
top product/collection movers; my promo calendar; any deploys or stock events. Some
data may be missing.

RULES:
- Revenue = sessions x conversion rate x AOV. Always decompose the move into these three
  levers BEFORE explaining a cause. Name the single lever that carries most of the move.
- Treat commerce as revenue truth; treat GA4 as the sessions/CVR lens. Do NOT expect them
  to reconcile exactly and do NOT use GA4 revenue as the headline.
- Judge signal vs noise by traffic volume: on a store doing only a few hundred orders a
  week, a single-digit-percent WoW move is usually noise unless a lever shifted hard.
- A mobile-only CVR drop is a checkout/page-regression suspect: demand a tracking check
  before declaring a real CVR decline.
- Separate promo-driven spikes from underlying demand using my promo calendar.
- Split new vs returning to route the issue to the right owner (acquisition vs lifecycle).
- Every claim must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-4 sentence executive trading read in plain operator language.
2. The decomposition table, using exactly this header row:
   | Metric | This wk | Last wk | WoW | vs Target/YoY | Read |
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop
   columns, and do not replace the table with prose.
3. Lever verdict: TRAFFIC, CVR, or AOV problem (or "noise"), with the channel/cohort.
4. Top movers up and down (product/collection, revenue delta, why).
5. Exactly 3 prioritized actions, each with owner, timing, and what would change the call.
6. Vetoes/caveats that downgraded confidence, and what evidence is blocked.
```

## Decision Rules

- **KEEP** — the number is inside its normal band: revenue WoW within roughly ±5% on a higher-volume store (1,000+ orders/wk) or ±10–15% on a lower-volume store, all three levers stable, no risk signal. Report it, don't act on it.
- **WATCH** — a lever moved but the read is early or directional: one soft week, a sample too small to be sure, or a window polluted by promo/stock. Set a recheck date and a threshold that would escalate it.
- **REFRESH** — a lever is decaying with a credible fix: CVR slipping on a specific surface, a fatiguing channel, a collection losing share — where the asset still has a viable path back.
- **FIX** — the read itself is unsafe: GA4 and commerce diverge beyond explainable drift, a tracking/consent incident is live, or refunds/test orders are polluting revenue. Fix measurement before you trade on it.
- **KILL** — stop or pull something only when the downside is clear, the sample is large enough to be sure, and no veto protects it (e.g. a money-losing promo mechanic that's tanking AOV with no offsetting volume).
- Every recommendation must include a **number, source, time window, and confidence level** — "CVR 1.8% (GA4, last 7d, high confidence)", never "conversion felt low."

## Veto Rules

- **Do not explain noise as signal on a low-traffic store.** Under ~200–300 orders/week, a single-digit-percent WoW wobble is usually variance, not a trend. Name it noise and move on.
- **Do not declare a CVR drop real until tracking is cleared.** A consent-banner change, a GTM/pixel break, or a duplicated purchase event can fake a CVR move with zero change in actual demand. Run the tracking check first.
- **Do not read a promo spike as underlying demand.** A discount week inflates orders and AOV-down, and borrows demand from the following week. Separate promo days from clean days before drawing a trend.
- **Do not blame "the site" when a hero SKU was out of stock.** A revenue drop concentrated in one product is a supply problem, not a conversion problem — check stock before touching the funnel.
- **Do not call causality from one metric.** A channel-grouping shift, a calendar artifact, and a real demand change can all look identical at the headline. Triangulate with the decomposition and the cohort split.
- **Do not recommend writes, budget shifts, refunds, customer messages, or catalog changes** without an explicit human approval step.

## Output Contract

A short trading narrative (the paragraph the operator reads aloud), a decomposition table, the lever verdict, top movers, and **exactly three** prioritized actions with owners.

Decomposition table (minimum columns):

| Metric | This wk | Last wk | WoW | vs Target/YoY | Read |
|---|---|---|---|---|---|
| Net revenue | $X | $Y | ±% | ±% | one-line |
| Sessions | | | | | |
| Conversion rate | | | | | |
| AOV | | | | | |

Action packet (minimum columns):

| Action | Lever | Status | Evidence | Owner | Timing |
|---|---|---|---|---|---|
| Example | CVR | FIX | Source + number + window | Ecommerce + Dev | Today |

## Worked Example

> **Executive trading read:** Net revenue landed at $182.4k, down 8.2% WoW against a flat target — but this is **not** a traffic story. Sessions were essentially flat (48.1k vs 48.6k, −1%), and AOV held at $76. The entire move is conversion rate falling from 2.10% to 1.78% (−15% relative). The drop is **mobile-only** — desktop CVR was steady at 3.0% while mobile fell 1.65% → 1.21% — and it starts on Wednesday, the day the new express-checkout app went live. This is a checkout regression, not soft demand. Three actions below; the first is a same-day dev rollback, not a marketing change.

| Metric | This wk | Last wk | WoW | vs Target | Read |
|---|---|---|---|---|---|
| Net revenue | $182.4k | $198.7k | −8.2% | −8% | Down, but driven by one lever |
| Sessions | 48,100 | 48,600 | −1.0% | on plan | Flat — **not** a traffic problem |
| Conversion rate | 1.78% | 2.10% | **−15%** | below | The lever carrying the move |
| AOV | $76.20 | $76.05 | +0.2% | on plan | Stable — not a mix/pricing problem |
| Mobile CVR | 1.21% | 1.65% | **−27%** | — | Regression localized here |
| Desktop CVR | 3.02% | 3.00% | +0.7% | — | Clean — isolates the fault to mobile |
| New-customer rev | $79.1k | $86.0k | −8% | — | Falls in line with CVR, not acquisition |

| Action | Lever | Status | Evidence | Owner | Timing |
|---|---|---|---|---|---|
| Roll back / disable the express-checkout app installed Wed; A/B on a test cohort first | CVR | FIX | Mobile CVR −27% from Wed; desktop flat (GA4, 7d, high) | Ecommerce + Dev | Today |
| Confirm purchase event still fires post-rollback before declaring recovery | CVR | FIX | Tracking check pending (GTM, today, med) | Analytics | Today |
| Hold paid-social budget steady, not cut — traffic and intent are fine | Traffic | KEEP | Sessions −1%, AOV flat (GA4 + commerce, 7d, high) | Performance | Recheck Mon |

## Common Failure Modes

- **Narrating the cause before decomposing.** Saying "traffic was soft" when sessions were flat and CVR did all the work — the most common and most expensive miss.
- **Using GA4 revenue as the headline** instead of commerce, then chasing a "drop" that's just attribution drift between the two systems.
- **Reading a promo week as a demand trend** — celebrating the spike, then panicking at next week's payback dip.
- **Calling a CVR drop real without a tracking check**, when a consent-banner or pixel change quietly broke measurement, not conversion.
- **Missing the stockout** — diagnosing a funnel problem when a hero SKU simply went to zero inventory mid-week.
- **Walking into the meeting with a dashboard instead of a decision** — 40 metrics, no narrative, no three actions, no owners.

## Run This Play With Live Data

**Manual version:** every Monday, pull commerce WoW, pull GA4 by channel and device, reconcile the two by hand, build the mover lists, overlay the promo calendar, and *then* start thinking — usually an hour before the read is even framed.

**ShopMCP version:** connect your store and GA4 once. Ask the question; ShopMCP pulls live commerce revenue and GA4 sessions/CVR for the matching window, runs the sessions × CVR × AOV decomposition, splits the moved lever by channel, device, and new-vs-returning, surfaces the top movers, and returns the operator narrative plus three actions. It stays **read-only** — it will not pause budgets, message customers, or edit the catalog without an explicit approval step.

> No store or GA4 connection inside your AI assistant? That's the wall every manual Monday hits. ShopMCP *is* the connection — the same trading read then runs in one prompt instead of an hour of exports.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Weekly Trading Deck play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual commerce and GA4 exports, and the weekly reconciliation between them.
- Rebuilding the sessions × CVR × AOV decomposition and the channel/device splits by hand.
- Copy-pasting across your store, GA4, the promo calendar, and the inventory view.
- Guessing whether a WoW move is signal or noise for your traffic volume.
