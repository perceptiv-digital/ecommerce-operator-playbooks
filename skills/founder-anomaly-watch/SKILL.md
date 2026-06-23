---
name: founder-anomaly-watch
description: "When an ecommerce operator needs to decide: What changed enough to explain the revenue anomaly? Runs the Revenue Anomaly Watch play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Revenue Anomaly Watch', 'Commerce', 'Google Analytics 4', 'Trading Profit'."
license: CC-BY-4.0
metadata:
  persona: Founder / CEO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Revenue Anomaly Watch

**Operating question:** What changed enough to explain the revenue anomaly?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce (Shopify / Woo / BigCommerce / etc.)** — net revenue, order count, AOV, and units for the anomaly window **and** the trailing baseline (14- and 28-day), net of cancellations / test orders / refunds. Split by **channel/UTM source, device, geo, product, and new-vs-returning customer**.
- **GA4** — sessions, engaged sessions, ecommerce conversion rate, and purchase revenue for the same exact windows, broken down by **default channel grouping, device category, country, and landing page**.
- **Baseline definition** — the trailing-average and standard-deviation numbers the anomaly was flagged against, so "abnormal" is a stated threshold, not a feeling.

Optional, if available:

- **Promo / discount calendar** — a live or just-ended promo explains most "anomalies" and borrows demand from the next window.
- **Known incidents** — site outage, checkout error, payment-gateway downtime, app/pixel deploy, or a CDN blip during the window.
- **Bot / referral-spam context** — a sudden session flood from one source/geo with ~0% conversion is traffic noise, not demand.
- **External demand drivers** — a TikTok / press / influencer mention, a competitor stockout, weather, or a public holiday shifting the baseline.
- **Stock state** — a hero SKU back in stock (spike) or sold out (drop) during the window.

## How to decide — in order

1. **Validate the window first.** Confirm the anomaly day/week is fully settled and compared against equal, complete periods. A partial day vs. full days is an artefact → **FIX** the comparison before anything else.
2. **REAL or artefact?** Reconcile commerce orders against GA4 purchases for the window. If they diverge sharply (e.g. GA4 revenue jumps but Shopify orders are flat, or order count doubles with no session lift), suspect **double-fired purchases, a bot/referral-spam session flood, or a tracking/outage break** → **FIX**, do not act on the number. Only a move that shows up in *both* commerce and analytics is real.
3. **Decompose into Traffic × CVR × AOV.** Revenue = Sessions × CVR × AOV. Compute each factor's change vs. baseline and attribute the revenue delta across the three. Name which factor moved — most anomalies are a one-factor story.
4. **Find the concentrating slice.** Within the factor that moved, drill by channel / device / geo / product / new-vs-returning and rank slices by **share of the total variance**. Decide: is the move **concentrated** (one slice owns most of it) or **broad** (spread evenly — a sign of tracking or a sitewide event)?
5. **Rank candidate explanations by variance explained.** List each plausible cause with the percentage of the swing it accounts for. The winner is the smallest set of causes that explains most of the move.
6. **Apply the vetoes**, then assign status + owner + recheck window. One day is a signal, not a trend.

## The prompt to run

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

## Decision rules

- **FIX** — the window is unsettled or mismatched, or commerce and GA4 diverge enough that the move can't be trusted as real (double-fire, bot flood, outage, tracking break). Resolve before attributing anything.
- **KILL** — only for a confirmed, sustained negative driver where the cause is clear, it shows in both data sources, and no veto protects it (e.g. a checkout step that's been silently failing for days). Never kill on one day.
- **REFRESH** — the anomaly traces to a fixable, decaying asset (a fatigued top-of-funnel source, a landing page whose CVR cratered) that still has a credible path back.
- **WATCH** — the move is real but rests on a single day, a small slice, or a still-open trend; monitor across a clean window before acting.
- **KEEP** — a real, healthy spike (or an explained, benign dip) where the right move is to protect what's working, not to intervene.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- Do **not** celebrate or panic before the REAL-or-artefact gate clears — rule out double-fired purchases and bot traffic first.
- Do **not** call one day a trend. A single anomalous day is a signal to investigate, never a mandate to act.
- Do **not** attribute the move to strategy when a **promo, discount, or just-ended sale** explains most of it (and remember it borrows demand from the next window).
- Do **not** ignore a **site outage, checkout error, or payment-gateway incident** during the window — an "organic drop" is often a broken funnel.
- Do **not** claim a real demand swing from a single source — it must appear in both commerce and analytics.
- Do **not** recommend writes, budget shifts, refunds, customer messages, or catalog changes without explicit human approval.

## Output

A 3-sentence trading read, a Traffic × CVR × AOV decomposition, and a ranked explanations table — each explanation carrying its share of the variance, evidence, status, and recheck window.

| Explanation | Variance explained | Evidence | Status | Owner | Recheck |
|---|---|---|---|---|---|
| Example row | 0% | Source + number + window | WATCH | Founder | After a clean 7-day window |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
