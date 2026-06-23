---
name: email-winback-builder
description: "When an ecommerce operator needs to decide: Which dormant customers are worth trying to win back? Runs the Winback Builder play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Winback Builder', 'Commerce', 'Klaviyo', 'Retention Ltv'."
license: CC-BY-4.0
metadata:
  persona: Retention / Email Lead
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Winback Builder

**Operating question:** Which dormant customers are worth trying to win back?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce customer ledger** — per customer: first order date, last order date, total orders, lifetime net revenue, AOV, and the categories/products purchased. Pull the **full dormant base**, not a sample.
- **Category reorder cadence** — for each major category, the typical gap between repeat orders (from your own repeat-purchase data, or a defensible category benchmark). This defines the "expected reorder window" per customer.
- **Klaviyo engagement** — per profile: subscribed status, last open, last click, days since last engagement, and current deliverability signals (spam-complaint rate, bounce rate, recent inbox-placement trend).
- **Contribution margin** — gross margin per category or blended, plus any fixed cost of the offer (free-ship threshold, sample insert), so offer depth can be tested against profit.
- **A reactivation-value assumption** — your historic win-back reactivation rate (% of mailed lapsed who reorder) and the expected near-term value of a reactivated customer.

Optional, if available:

- **Acquisition source / first-order channel** — paid-acquired one-timers behave differently from organic repeat buyers; useful for prioritising.
- **Product-level reason-to-return** — a consumable they're due to run out of, or a new-arrivals hook in their category.
- **Prior win-back results** — open/click/conversion and unsubscribe/complaint rates from past reactivation sends, to calibrate the offer and the suppression line.
- **Discount sensitivity** — whether this base historically converts on a soft nudge vs. only on depth, so you don't over-discount.
- **Sunset / suppression history** — who you've already suppressed, to avoid re-mailing addresses you deliberately retired.

## How to decide — in order

1. **Gate on data freshness.** If "last order date" or "last engaged" is stale or the Klaviyo↔commerce profile sync is broken, mark the whole run **FIX** and stop. You cannot segment dormancy on timestamps you don't trust.
2. **Define lapsed per category, not by a flat day count.** A customer is **lapsed** only when their gap since last order exceeds the *expected reorder window for their category* (e.g. coffee at 45 days vs. skincare at 90). Someone 70 days out on a 90-day cycle is **not** lapsed — they're due, and discounting them is pure margin leakage.
3. **Score recoverable value.** Rank lapsed customers by `prior LTV × reactivation-rate assumption`. A 2-order, $240-LTV customer who lapsed 6 weeks ago outranks a 1-order, $35 customer who vanished 11 months ago — recency of lapse and prior value both matter.
4. **Split off the deliverability risk (sunset).** Anyone deeply unengaged — no open/click in **>270 days**, especially single-order low-value profiles — goes to **KILL** (sunset / suppress). Mailing them buys nothing and risks your inbox placement for everyone else.
5. **Size the offer against margin.** The justified discount is the depth where `expected reactivation value × reactivation rate > offer cost`. High-margin categories can carry a real incentive; thin-margin SKUs should get a soft nudge (new arrivals, restock reminder, free shipping) before any percentage-off.
6. **Apply the vetoes**, then assign each segment a status, an owner, and a recheck date.

## The prompt to run

```text
You are my retention/CRM analyst running the "Winback Builder" play.

GOAL: split my dormant customers into WIN-BACK-WORTHY, WATCH, and SUNSET, and recommend an
offer depth per worthy segment that is justified by margin — without blasting everyone and
without discounting customers who were going to reorder anyway.

I will paste: my dormant customer ledger (first/last order date, order count, lifetime
revenue, categories), my category reorder cadences, Klaviyo engagement (last open/click,
days since engaged, complaint/bounce signals), and my contribution margin. Some data may
be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the critical input
is missing — lapsed customers with their prior value AND the category's natural reorder
cycle (lapsed = past their expected reorder window, not an arbitrary 90 days), plus
engagement state to identify sunset candidates — STOP and return only (a) what's missing
and (b) how to get it — never estimate it or proceed.

RULES:
- Freshness gate first: if last-order-date or last-engaged timestamps look stale or the
  commerce<->Klaviyo sync is broken, mark the run FIX and stop. Do not segment on bad dates.
- "Lapsed" is category-relative: a customer is lapsed only when their gap since last order
  exceeds the expected reorder window for THEIR category. Do not flag someone who is merely
  due to reorder on a long natural cycle.
- Score recoverable value as prior LTV x my reactivation-rate assumption. Prioritise
  high-value, recently-lapsed over old, low-value, single-order churned.
- SUNSET (suppress, do not mail) anyone deeply unengaged: no open/click in >270 days,
  especially single-order low-value profiles. Protect deliverability over reach.
- Offer depth must clear margin: recommend the smallest incentive where
  expected reactivation value x reactivation rate > offer cost. Prefer a soft nudge on
  thin-margin categories before any percentage-off.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked segment table using exactly this header row:
   | Segment | Size | Avg prior LTV | Days lapsed (vs cadence) | Engagement | Recoverable value | Recommended offer | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation (esp. anything sunset for deliverability).
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **KEEP / build the win-back** — lapsed past their category's reorder window, prior LTV above your blended customer average, still showing some engagement (opened or clicked in the last ~180 days), and the modelled offer clears margin. These are the customers worth a 2-message win-back.
- **WATCH** — lapsed but thin or noisy signal: a small segment (under ~50 profiles, where reactivation-rate math is unreliable), or near the edge of their reorder window, or value just below the build line. Hold, re-segment next cycle; don't over-discount on a noisy read.
- **REFRESH** — a previously mailed win-back that's decaying (open/click sliding, conversions thinning) but the audience is still viable: change the hook or offer rather than retiring the segment.
- **KILL (sunset / suppress)** — deeply unengaged (no open/click in >270 days), low prior value, single order. Suppress from sends to protect deliverability; do not mail.
- **FIX** — stale timestamps, broken commerce↔Klaviyo sync, or missing margin/cadence data make a safe segmentation impossible.
- Every recommendation carries a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** blast all dormant customers in one send — it spikes complaints and bounces and wrecks deliverability for your engaged list too. Segment and suppress first.
- Do **not** discount a customer who is merely partway through a long natural reorder cycle; you'd give margin away on an order you were getting for free.
- Do **not** set offer depth deeper than margin justifies — a "win" that loses contribution profit is not a win.
- Do **not** keep mailing the deeply unengaged for "reach." Past ~270 days with no engagement, reach is a liability, not an asset.
- Do **not** act on thin segments (under ~50 profiles) as if the reactivation rate were reliable.
- Do **not** push any segment live, apply suppressions, or send a discount without an explicit human approval step.

## Output

A dormant-base segmentation that says who to win back, with what offer, who to sunset, and why — each row defensible by number, source, window, and confidence.

| Segment | Size | Avg prior LTV | Days lapsed (vs cadence) | Engagement | Recoverable value | Recommended offer | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| High-value, recently lapsed | 180 | $240 | +35d past 60d cycle | Opened <90d | ~$8.6k @ 20% react. | 2-msg, modest 10% | **KEEP** | Retention | 30 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
