---
name: email-vip-watch
description: "When an ecommerce operator needs to decide: Are VIP customers becoming less active or less valuable? Runs the VIP Cohort Watch play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'VIP Cohort Watch', 'Commerce', 'Klaviyo', 'Retention Ltv'."
license: CC-BY-4.0
metadata:
  persona: Retention / Email Lead
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# VIP Cohort Watch

**Operating question:** Are VIP customers becoming less active or less valuable?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — full T12M order line history: customer ID, order date, net order value (after discounts/refunds), and **COGS or contribution margin**. You need this both for the **current 90-day window** and the **prior 90-day window** to measure the trend.
- **VIP cohort definition** — the explicit rule (e.g. *top 10% of customers by T12M net spend*, or *RFM score ≥ 12*, or *predicted-LTV ≥ $X*), the resulting customer list, and the **count** in the cohort. State the absolute headcount — it governs whether month-to-month moves are signal or noise.
- **Per-customer cadence** — each VIP's median interpurchase interval over T12M and their **days-since-last-order**, so "overdue" is measured against *their own* rhythm, not a store-wide average.
- **Klaviyo** — for the VIP profiles: 90-day open/click engagement, last-active date, flow-attributed and campaign-attributed revenue, and deliverability signals (bounces, spam complaints, sends-to-opens collapse).

Optional, if available:

- **Subscription / replenishment status** — auto-ship customers have a forced cadence; a "lapse" there is usually a failed payment or a cancel, not disengagement.
- **Category purchase cycle** — considered or seasonal goods (mattresses, outerwear, gifting) have long natural gaps; one missed cycle is not churn.
- **Promo & launch calendar** — a VIP-only early-access drop or a sitewide sale inflates both the current and prior windows differently and distorts AOV.
- **Service incidents** — a delayed-shipment wave, a stockout on a hero SKU, or a recent price increase explains a cohort-wide chill better than "fatigue."
- **Channel mix** — VIPs who shifted from DTC to a marketplace (Amazon) or retail aren't lost; they're just invisible to your store data.

## How to decide — in order

1. **Lock the cohort, then gate on join integrity.** Confirm the VIP definition matches last run. Then check that Shopify customers reconcile to Klaviyo profiles for the cohort. If more than ~10% of VIPs can't be matched (orphaned profiles, guest checkouts, ID mismatch), set **FIX** and stop — you can't read engagement against spend on a broken join.
2. **Check the cohort is big enough to trust.** If the VIP cohort is under ~150 customers, treat every month-over-month delta as **WATCH only** — at that headcount a handful of whales moving swings the percentages. Lean on the named-individual layer instead of the cohort rate.
3. **Read the four cohort vitals against the prior period:** 90-day repeat rate, median AOV, order frequency, and **VIP share of total revenue**. A decline in *one* with the others stable is a metric story (often AOV from a promo); a decline across three or four is a real cohort chill.
4. **Separate cooling from broken.** Cross the spend trend with Klaviyo engagement. Spend down **and** opens/clicks down = genuine disengagement → REFRESH the VIP lifecycle. Spend down but engagement healthy = offer/price/stock problem, not an email problem → FIX the root cause, don't just send more email. Engagement collapsed (sends-to-opens cratered) = **deliverability**, route to FIX before concluding anything about loyalty.
5. **Flag the named sliders.** List every VIP whose days-since-last-order now exceeds **2x their own median interval** and who sits in the top slice of T12M contribution. These are concrete, high-value individuals worth a personal or concierge touch — the highest-ROI output of the whole play.
6. **Overlay margin and rank by contribution at risk.** A cooling cohort of high-margin repeat buyers outranks a larger cooling cohort of discount-driven, low-margin ones. **Revenue share is not profit share.** Then apply the vetoes and assign status + owner + recheck date.

## The prompt to run

```text
You are my retention/CRM analyst running the "VIP Cohort Watch" play.

GOAL: decide whether my VIP cohort is becoming less active or less valuable, and name the
individual high-value customers sliding toward lapse — ranked by trailing-12-month
contribution at risk, not by headcount and not by a single month's repeat rate.

VIP DEFINITION (must be stable across periods): I will state it explicitly, e.g. "top 10%
of customers by trailing-12-month net spend." Use exactly this; do not redefine it.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical input is a
STABLE VIP definition — top-decile by trailing-12-month spend (or an equivalent RFM/predicted-LTV
rule) applied identically across both periods — backed by a large-enough cohort, since small
cohorts are noisy. If this stable VIP definition + sufficient cohort is missing, STOP and return
only (a) what's missing and (b) how to get it — never estimate it or proceed.

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
2. A cohort-vitals table using exactly this header row:
| Metric | Prior 90d | Current 90d | Delta | Status | Confidence |
3. A named-slider table: Customer | T12M contribution | Own cadence | Days overdue | Status | Touch.
4. Vetoes/caveats that downgraded any recommendation.
5. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.

Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the table with prose.
```

## Decision rules

- **KEEP** — repeat rate, AOV, frequency, and VIP revenue share all inside their normal band, engagement healthy, no individual sliders. The cohort is fine; keep funding the VIP lifecycle.
- **WATCH** — directional only: one of the four vitals dipped while the others held, the cohort is under ~150 so deltas are noisy, or the window is polluted by a promo/launch/incident. Recheck after a clean window.
- **REFRESH** — spend trend down **and** Klaviyo engagement down across the cohort, with the relationship still credible (recent buyers, no mass deliverability failure). Refresh the VIP flow, early-access, and replenishment reminders; trigger concierge outreach to the named sliders.
- **FIX** — the join is broken (>~10% unmatched), the VIP definition drifted, COGS is missing, or engagement collapse points to deliverability. Repair the evidence or the sending before drawing a loyalty conclusion.
- **KILL** — reserved here for a specific tactic, not customers: retire a VIP perk, flow, or discount tier that demonstrably costs margin without moving repeat rate (e.g. a blanket VIP discount the cohort would have repurchased without). Never "kill" a customer.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** call a small VIP cohort "churning" on a single month's repeat-rate move — under ~150 customers it's statistical noise; require a multi-period trend.
- Do **not** treat a long natural gap as lapse in considered/seasonal categories — measure overdue against each customer's own median interval, not a store-wide average.
- Do **not** let one outsized one-off order (a corporate bulk buy, a gifting spike) redefine a customer's RFM or the cohort's AOV — flag and exclude the outlier.
- Do **not** compare across periods if the VIP definition changed — a reshuffled cohort invalidates every delta.
- Do **not** blame disengagement for what is a deliverability failure, a failed-payment cancel on a subscription, or a channel shift to a marketplace.
- Do **not** send a win-back blast, apply a discount, or message named individuals without explicit human approval — a clumsy "we miss you" to an active, happy VIP is reputationally worse than silence.

## Output

Two tables: a cohort-vitals trend and a named-slider list ranked by contribution at risk.

**Cohort vitals (current vs prior 90 days):**

| Metric | Prior 90d | Current 90d | Delta | Status | Confidence |
|---|---|---|---|---|---|
| Top-decile 90d repeat rate | 48% | 39% | −9pts | WATCH→REFRESH | High (n=approx 240) |

**Named sliders (concierge candidates):**

| Customer | T12M contribution | Own cadence | Days overdue | Status | Touch |
|---|---|---|---|---|---|
| Example VIP | $X (margin-adj) | ~Nd interval | 2.1x interval | REFRESH | Personal email + owner |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
