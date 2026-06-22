---
schema_version: 1
slug: "email-vip-watch"
title: "VIP Cohort Watch"
summary: "VIP Cohort Watch helps ecommerce operators answer: Are VIP customers becoming less active or less valuable?"
operating_question: "Are VIP customers becoming less active or less valuable?"
short_title: "VIP Cohort"
primary_persona: "retention"
personas: ["retention", "founder"]
category: "retention-ltv"
platforms: ["commerce", "klaviyo"]
cadence: "monthly"
difficulty: "standard"
manual_time_minutes_min: 30
manual_time_minutes_max: 75
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "fast-follow"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/email-vip-watch"
shopmcp_prompt: "Run the VIP Cohort Watch play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# VIP Cohort Watch

## Operating Question

**Is my most valuable cohort quietly cooling off — ordering less often, spending less per order, or drifting toward lapse — before it shows up in blended revenue?**

VIPs are a small headcount carrying an outsized share of contribution profit, so their decay is invisible at the top line for a quarter or two: total revenue holds while a few whales churn and new-customer acquisition papers over the gap. By the time blended LTV bends, the best customers are already gone and win-back costs 5–8x what a timely concierge touch would have. This play forces a defensible **KEEP / WATCH / REFRESH / FIX / KILL** read on the VIP cohort *and* on the named individuals inside it who are sliding past their normal reorder window — ranked by **trailing-12-month contribution at risk**, not by headcount and not by a single month's repeat rate.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your store's order history or your Klaviyo profiles, and "who are my VIPs and are they cooling off" is a join across two systems plus a margin overlay. To run it manually you have to:

1. Export the full trailing-12-month (T12M) order history from Shopify/Woo/BigCommerce — every order, every customer, with COGS or a margin proxy.
2. Compute a **stable VIP definition** (top decile by T12M net spend, or an RFM/predicted-LTV threshold) — and freeze that definition so this month compares to last month on the same cohort, not a reshuffled one.
3. Derive per-customer **interpurchase interval** (their *own* normal cadence), recency, AOV, and order frequency, then diff this period against the prior period.
4. Pull Klaviyo engagement (opens, clicks, last-active, flow/campaign-attributed revenue) for those same profiles to tell *disengaged* apart from *deliverability-broken*.
5. Reconcile the two on email/customer ID, because a Klaviyo profile and a Shopify customer are not guaranteed to match.

**The reasoning here is free. The cross-system join and the stable cohort math are the hard part — and that is exactly what ShopMCP connects.** If your assistant can't see live orders and live Klaviyo profiles, that join is the wall every manual run hits. Hold that; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Retention / Email Lead
- **Also useful for:** Founder/CEO (where is concentrated revenue eroding?), Head of CX (who deserves a concierge touch this week).
- Run it **before** the monthly lifecycle review, and any month you're tempted to cut budget on a "small" VIP flow — that flow defends your highest-margin revenue.

## When To Run It

- **Cadence:** monthly — early in the month, against a clean prior-month window (avoid running mid-promo).
- **Triggers:** a quarter-over-quarter dip in repeat rate, a VIP-flow revenue drop in Klaviyo, a price increase or subscription change, a fulfillment/quality incident that may have burned loyal customers, or a sudden spike in first-time discount-code use that suggests you're buying new customers while old ones leak.
- **Pre-requisite:** confirm your VIP definition is **identical** to last run's. A definition that drifts month to month makes every comparison meaningless — this is the single most common way this play lies to you.

## Required Evidence

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — full T12M order line history: customer ID, order date, net order value (after discounts/refunds), and **COGS or contribution margin**. You need this both for the **current 90-day window** and the **prior 90-day window** to measure the trend.
- **VIP cohort definition** — the explicit rule (e.g. *top 10% of customers by T12M net spend*, or *RFM score ≥ 12*, or *predicted-LTV ≥ $X*), the resulting customer list, and the **count** in the cohort. State the absolute headcount — it governs whether month-to-month moves are signal or noise.
- **Per-customer cadence** — each VIP's median interpurchase interval over T12M and their **days-since-last-order**, so "overdue" is measured against *their own* rhythm, not a store-wide average.
- **Klaviyo** — for the VIP profiles: 90-day open/click engagement, last-active date, flow-attributed and campaign-attributed revenue, and deliverability signals (bounces, spam complaints, sends-to-opens collapse).

## Optional Evidence

- **Subscription / replenishment status** — auto-ship customers have a forced cadence; a "lapse" there is usually a failed payment or a cancel, not disengagement.
- **Category purchase cycle** — considered or seasonal goods (mattresses, outerwear, gifting) have long natural gaps; one missed cycle is not churn.
- **Promo & launch calendar** — a VIP-only early-access drop or a sitewide sale inflates both the current and prior windows differently and distorts AOV.
- **Service incidents** — a delayed-shipment wave, a stockout on a hero SKU, or a recent price increase explains a cohort-wide chill better than "fatigue."
- **Channel mix** — VIPs who shifted from DTC to a marketplace (Amazon) or retail aren't lost; they're just invisible to your store data.

## The Decision Logic (run in this order)

1. **Lock the cohort, then gate on join integrity.** Confirm the VIP definition matches last run. Then check that Shopify customers reconcile to Klaviyo profiles for the cohort. If more than ~10% of VIPs can't be matched (orphaned profiles, guest checkouts, ID mismatch), set **FIX** and stop — you can't read engagement against spend on a broken join.
2. **Check the cohort is big enough to trust.** If the VIP cohort is under ~150 customers, treat every month-over-month delta as **WATCH only** — at that headcount a handful of whales moving swings the percentages. Lean on the named-individual layer instead of the cohort rate.
3. **Read the four cohort vitals against the prior period:** 90-day repeat rate, median AOV, order frequency, and **VIP share of total revenue**. A decline in *one* with the others stable is a metric story (often AOV from a promo); a decline across three or four is a real cohort chill.
4. **Separate cooling from broken.** Cross the spend trend with Klaviyo engagement. Spend down **and** opens/clicks down = genuine disengagement → REFRESH the VIP lifecycle. Spend down but engagement healthy = offer/price/stock problem, not an email problem → FIX the root cause, don't just send more email. Engagement collapsed (sends-to-opens cratered) = **deliverability**, route to FIX before concluding anything about loyalty.
5. **Flag the named sliders.** List every VIP whose days-since-last-order now exceeds **2x their own median interval** and who sits in the top slice of T12M contribution. These are concrete, high-value individuals worth a personal or concierge touch — the highest-ROI output of the whole play.
6. **Overlay margin and rank by contribution at risk.** A cooling cohort of high-margin repeat buyers outranks a larger cooling cohort of discount-driven, low-margin ones. **Revenue share is not profit share.** Then apply the vetoes and assign status + owner + recheck date.

## Manual Workflow

1. Export T12M order history (with COGS) for the current 90 days and the prior 90 days. Re-apply last run's exact VIP rule and confirm the cohort headcount.
2. Compute per-VIP median interpurchase interval and days-since-last-order; compute cohort-level 90-day repeat rate, AOV, frequency, and VIP revenue share for both windows.
3. Pull Klaviyo 90-day engagement and deliverability for the cohort; reconcile profiles to customer IDs and note the unmatched rate.
4. Run the join gate (step 1) and the sample gate (step 2). If either fails, mark FIX/WATCH and note what's blocked.
5. Build the **cohort-vitals table** (the four trends) and the **named-slider list** (2x-interval VIPs by contribution). Overlay margin.
6. Paste the prompt below with your tables. Pressure-test against the vetoes, then convert survivors into an action packet with owner and recheck date.

## Copy-Paste Prompt

```text
You are my retention/CRM analyst running the "VIP Cohort Watch" play.

GOAL: decide whether my VIP cohort is becoming less active or less valuable, and name the
individual high-value customers sliding toward lapse — ranked by trailing-12-month
contribution at risk, not by headcount and not by a single month's repeat rate.

VIP DEFINITION (must be stable across periods): I will state it explicitly, e.g. "top 10%
of customers by trailing-12-month net spend." Use exactly this; do not redefine it.

I will paste: cohort headcount; current vs prior 90-day repeat rate, median AOV, order
frequency, and VIP share of total revenue; per-customer median interpurchase interval and
days-since-last-order; Klaviyo 90-day engagement + deliverability; and COGS/margin. Some
data may be missing.

RULES:
- Confirm the VIP definition is identical to the comparison period before trusting any delta.
- Join gate: if >~10% of VIPs don't reconcile between store and Klaviyo, mark FIX and stop.
- Sample gate: if the cohort is under ~150 customers, every cohort-level delta is WATCH only;
  rely on the named-individual layer instead.
- Separate "cooling" (spend AND engagement down -> REFRESH lifecycle) from "broken" (spend
  down, engagement fine -> FIX offer/price/stock) from "deliverability" (engagement crater
  -> FIX sending).
- Flag every VIP whose days-since-last-order exceeds 2x their OWN median interval AND who
  sits in the top contribution slice. These are concierge-touch candidates.
- Re-rank by contribution at risk using my real margin. Revenue share is not profit share.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.
- Respect long natural purchase cycles and subscription cadence; one missed cycle is not churn.

RETURN:
1. A 3-sentence executive read.
2. A cohort-vitals table: Metric | Prior 90d | Current 90d | Delta | Confidence.
3. A named-slider table: Customer | T12M contribution | Own cadence | Days overdue | Status | Touch.
4. Vetoes/caveats that downgraded any recommendation.
5. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision Rules

- **KEEP** — repeat rate, AOV, frequency, and VIP revenue share all inside their normal band, engagement healthy, no individual sliders. The cohort is fine; keep funding the VIP lifecycle.
- **WATCH** — directional only: one of the four vitals dipped while the others held, the cohort is under ~150 so deltas are noisy, or the window is polluted by a promo/launch/incident. Recheck after a clean window.
- **REFRESH** — spend trend down **and** Klaviyo engagement down across the cohort, with the relationship still credible (recent buyers, no mass deliverability failure). Refresh the VIP flow, early-access, and replenishment reminders; trigger concierge outreach to the named sliders.
- **FIX** — the join is broken (>~10% unmatched), the VIP definition drifted, COGS is missing, or engagement collapse points to deliverability. Repair the evidence or the sending before drawing a loyalty conclusion.
- **KILL** — reserved here for a specific tactic, not customers: retire a VIP perk, flow, or discount tier that demonstrably costs margin without moving repeat rate (e.g. a blanket VIP discount the cohort would have repurchased without). Never "kill" a customer.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do **not** call a small VIP cohort "churning" on a single month's repeat-rate move — under ~150 customers it's statistical noise; require a multi-period trend.
- Do **not** treat a long natural gap as lapse in considered/seasonal categories — measure overdue against each customer's own median interval, not a store-wide average.
- Do **not** let one outsized one-off order (a corporate bulk buy, a gifting spike) redefine a customer's RFM or the cohort's AOV — flag and exclude the outlier.
- Do **not** compare across periods if the VIP definition changed — a reshuffled cohort invalidates every delta.
- Do **not** blame disengagement for what is a deliverability failure, a failed-payment cancel on a subscription, or a channel shift to a marketplace.
- Do **not** send a win-back blast, apply a discount, or message named individuals without explicit human approval — a clumsy "we miss you" to an active, happy VIP is reputationally worse than silence.

## Output Contract

Two tables: a cohort-vitals trend and a named-slider list ranked by contribution at risk.

**Cohort vitals (current vs prior 90 days):**

| Metric | Prior 90d | Current 90d | Delta | Status | Confidence |
|---|---|---|---|---|---|
| Top-decile 90d repeat rate | 48% | 39% | −9pts | WATCH→REFRESH | High (n=approx 240) |

**Named sliders (concierge candidates):**

| Customer | T12M contribution | Own cadence | Days overdue | Status | Touch |
|---|---|---|---|---|---|
| Example VIP | $X (margin-adj) | ~Nd interval | 2.1x interval | REFRESH | Personal email + owner |

## Worked Example

> **Executive read:** The top-decile cohort (n=238) is genuinely cooling, not just noisy: 90-day repeat rate fell 48%→39% over the quarter while VIP share of revenue slipped 31%→27% and median AOV held — so this is a *frequency* problem, not a basket problem. Klaviyo engagement dropped in lockstep (VIP-flow click rate 4.1%→2.8%), which points to lifecycle fatigue rather than a deliverability break. Three of the top-20 by contribution are now past 2x their normal reorder cycle and warrant a personal touch this week, not a batch blast.

| Metric | Prior 90d | Current 90d | Delta | Status | Confidence |
|---|---|---|---|---|---|
| Top-decile 90d repeat rate | 48% | 39% | −9 pts | **REFRESH** | High (n=238) |
| VIP share of total revenue | 31% | 27% | −4 pts | **REFRESH** | High |
| Median VIP AOV | $142 | $139 | −2% | KEEP | High (basket stable) |
| VIP-flow click rate (Klaviyo) | 4.1% | 2.8% | −1.3 pts | **REFRESH** | Med (engagement, not deliverability) |
| VIPs past 2x own interval | 9 of 238 | 17 of 238 | +8 | **WATCH→REFRESH** | High |

| Customer | T12M contribution | Own cadence | Days overdue | Status | Touch |
|---|---|---|---|---|---|
| #4471 (top-5 by margin) | $2,180 @ 58% | ~34d | 71d (2.1x) | **REFRESH** | Personal email from owner |
| #2098 | $1,640 @ 55% | ~28d | 64d (2.3x) | **REFRESH** | Concierge call + restock note |
| #5512 | $1,510 @ 52% | ~41d | 88d (2.1x) | **WATCH** | Hold — seasonal gifter, off-cycle |

Note how the read inverts a naive view: AOV is fine, so "discount the VIPs" would be the wrong reflex — the cohort is buying *less often*, and the highest-ROI move is targeted reactivation plus three personal touches, not a margin-eroding sitewide VIP sale.

## Common Failure Modes

- Redefining "VIP" between runs (top 5% one month, RFM the next) so the trend is an artifact of the definition, not the customers.
- Measuring "overdue" against a store-wide average instead of each customer's own interpurchase interval, so seasonal buyers look churned.
- Reading a cohort-rate swing on a tiny cohort as a real trend when one or two whales moved it.
- Letting a single corporate bulk order or gifting spike inflate AOV / RFM and hide an underlying frequency decline.
- Concluding "loyalty is down" when the real story is a deliverability collapse, a subscription failed-payment wave, or VIPs shifting to Amazon/retail.
- Firing a generic "we miss you" blast at the whole cohort — including the VIPs who ordered last week.

## Run This Play With Live Data

**Manual version:** export T12M orders with COGS, freeze a stable VIP rule, compute per-customer cadence and four cohort vitals across two windows, pull and reconcile Klaviyo engagement — every month, by hand.

**ShopMCP version:** connect your store and Klaviyo once. Ask the question; ShopMCP pulls live T12M orders and live Klaviyo profiles, applies your *same* VIP definition each run, runs the join and sample gates, computes the cohort-vitals trend and the 2x-interval named-slider list, overlays margin, and returns the ranked KEEP/WATCH/REFRESH/FIX brief. It stays **read-only** until you explicitly approve any flow change or outreach.

> No live store + Klaviyo line inside your AI assistant? That cross-system join — and keeping the VIP cohort definition stable across months — is the wall every manual run hits. ShopMCP *is* that connection, and the same playbook then runs in one prompt instead of a month-end spreadsheet session.

Example ShopMCP prompt:

```text
Run the VIP Cohort Watch play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/email-vip-watch?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual T12M exports and stale CSVs.
- Re-deriving a stable VIP cohort and per-customer cadence every month.
- Reconciling Shopify customers against Klaviyo profiles by hand.
- Guessing whether a cohort move is signal or small-sample noise.
