---
name: ecom-weekly-trading-deck
description: "When an ecommerce operator needs to decide: What happened this week, why, and what should the operator do next? Runs the Weekly Trading Deck play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Weekly Trading Deck', 'Commerce', 'Google Analytics 4', 'Trading Profit'."
license: CC-BY-4.0
metadata:
  persona: Head of Ecommerce
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Weekly Trading Deck

**Operating question:** What happened this week, why, and what should the operator do next?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce (Shopify / Woo / BigCommerce, etc.)** — this week vs last week: **gross and net revenue, order count, AOV, units per order**, refunds, and **new vs returning** customer split. This is your source of truth for revenue; GA4 is not.
- **GA4** — for the matching window: **sessions, engaged sessions, ecommerce conversion rate, and purchases**, broken out by **default channel grouping** (Paid Search, Paid Social, Organic Search, Direct, Email, Organic Social, Referral). This is what lets you split a revenue move into the sessions × CVR × AOV levers.
- **A comparison baseline** — last week (WoW) **and** the same week last year (YoY) or your weekly target/forecast. A WoW move with no baseline is uninterpretable.
- **Top movers** — products and collections with the biggest revenue gain and biggest revenue loss vs last week.

Optional, if available:

- **Promo / discount calendar** — which days ran an offer, the depth, and the code. Without it you will misread a promo spike as demand.
- **Site/deploy log** — theme changes, checkout edits, app installs/removals, payment-method changes timestamped to the day.
- **Stock position** on hero SKUs — a revenue drop on a top product is often a stockout, not a demand or CVR problem.
- **Device split** (mobile vs desktop CVR) — the single fastest way to localize a checkout regression.
- **Tracking health** — known consent-banner, GTM, or pixel incidents that would dent measured CVR without denting real demand.

## How to decide — in order

1. **Establish the revenue move and its size.** Net revenue this week vs last week, as a number and a percent, commerce-side. Note the WoW *and* the baseline (YoY or target) gap. Until you know the magnitude you can't tell signal from noise (see Decision Rules).
2. **Decompose before you explain.** Hold revenue = **sessions × CVR × AOV** and find which term carries the move. Sessions flat, CVR down → a **conversion problem**. CVR flat, sessions down → a **traffic problem**. Both flat, revenue down → an **AOV / mix problem** (or refunds). Never narrate the cause before you've isolated the lever — this is the step everyone skips.
3. **Localize the moved lever.**
   - **Traffic move** → which channel? Split sessions by default channel grouping WoW. A paid drop is a budget/delivery question; an organic drop is rankings/seasonality; a direct/email drop is often a tracking or send-calendar artifact.
   - **CVR move** → which surface? Split CVR by **device** (mobile vs desktop) and by **landing/entry behavior**. A mobile-only CVR drop with desktop flat is a checkout or page regression until proven otherwise — run the tracking check before you accept it as real.
   - **AOV move** → units-per-order vs price/mix. Did a promo shift the basket, did a high-AOV hero go out of stock, or did discount depth rise?
4. **Attribute the cohort.** Overlay **new vs returning**. New-customer revenue down is usually acquisition (a traffic/channel story); returning down is usually lifecycle/email or a loyalty/repeat issue. They route to different owners.
5. **Name the top movers.** Which 3–5 products/collections drove the gain and which drove the loss. One stocked-out hero can explain an entire "CVR drop" that isn't one.
6. **Apply the vetoes, then write the narrative.** Strip promo distortion, confirm tracking, then compress to one paragraph and exactly three actions, each with an owner and a recheck date.

## The prompt to run

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

## Decision rules

- **KEEP** — the number is inside its normal band: revenue WoW within roughly ±5% on a higher-volume store (1,000+ orders/wk) or ±10–15% on a lower-volume store, all three levers stable, no risk signal. Report it, don't act on it.
- **WATCH** — a lever moved but the read is early or directional: one soft week, a sample too small to be sure, or a window polluted by promo/stock. Set a recheck date and a threshold that would escalate it.
- **REFRESH** — a lever is decaying with a credible fix: CVR slipping on a specific surface, a fatiguing channel, a collection losing share — where the asset still has a viable path back.
- **FIX** — the read itself is unsafe: GA4 and commerce diverge beyond explainable drift, a tracking/consent incident is live, or refunds/test orders are polluting revenue. Fix measurement before you trade on it.
- **KILL** — stop or pull something only when the downside is clear, the sample is large enough to be sure, and no veto protects it (e.g. a money-losing promo mechanic that's tanking AOV with no offsetting volume).
- Every recommendation must include a **number, source, time window, and confidence level** — "CVR 1.8% (GA4, last 7d, high confidence)", never "conversion felt low."

## Vetoes — stop if any apply

- **Do not explain noise as signal on a low-traffic store.** Under ~200–300 orders/week, a single-digit-percent WoW wobble is usually variance, not a trend. Name it noise and move on.
- **Do not declare a CVR drop real until tracking is cleared.** A consent-banner change, a GTM/pixel break, or a duplicated purchase event can fake a CVR move with zero change in actual demand. Run the tracking check first.
- **Do not read a promo spike as underlying demand.** A discount week inflates orders and AOV-down, and borrows demand from the following week. Separate promo days from clean days before drawing a trend.
- **Do not blame "the site" when a hero SKU was out of stock.** A revenue drop concentrated in one product is a supply problem, not a conversion problem — check stock before touching the funnel.
- **Do not call causality from one metric.** A channel-grouping shift, a calendar artifact, and a real demand change can all look identical at the headline. Triangulate with the decomposition and the cohort split.
- **Do not recommend writes, budget shifts, refunds, customer messages, or catalog changes** without an explicit human approval step.

## Output

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

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
