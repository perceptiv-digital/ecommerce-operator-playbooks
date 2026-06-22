---
name: ecom-tracking-sanity
description: "When an ecommerce operator needs to decide: Can we trust the tracking before making growth decisions? Runs the Tracking Sanity Check play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Tracking Sanity', 'Commerce', 'Google Analytics 4', 'Meta Ads', 'Google Ads', 'Klaviyo', 'Tracking Data Quality'."
license: CC-BY-4.0
metadata:
  persona: Head of Ecommerce
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Tracking Sanity Check

**Operating question:** Can we trust the tracking before making growth decisions?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce truth (Shopify / Woo / BigCommerce)** — total **paid orders** and order count for the window, with test orders, $0 orders, and cancelled/fully-refunded orders excluded; order timestamps in **store time zone**; store **currency**. This is the denominator everything else is judged against.
- **GA4** — `purchase` event count (or `ecommerce purchases`) and purchase revenue for the same window, plus `session_default_channel_group` and `source / medium` so you can see `(direct) / (none)` and self-referral inflation.
- **Meta Ads** — `purchases` and purchase value, **with the attribution setting stated** (7-day click / 1-day view is the default and over-claims view-through orders that GA4 and the store never see).
- **Google Ads** — `conversions` and conversion value, **per conversion action** (so you can spot a purchase action firing alongside a duplicate "Purchase" or a GA4-imported conversion = double counting).
- **Klaviyo** — flow + campaign **attributed orders** and attributed value (default 5-day click / 1-day open), which will legitimately overlap with paid and so must never be added to other sources as if exclusive.
- **Targets / context for labelling drift** — your accepted healthy band (under 5% drift), and any known modelled/consent gap baseline for the account.

Optional, if available:

- **Consent / CMP state** — consent-mode v2 status, % of sessions consented, ad-blocker share — to separate an *expected* modelled gap from a *real* break.
- **Tag/deploy log** — recent GTM, theme, checkout, pixel, or CAPI changes with dates, so a drift spike can be tied to a release.
- **Server-side setup** — whether Meta CAPI / GA4 server-side / Conversions API is live, its dedup key (`event_id`), and its match quality.
- **Subscription / recurring app** — does a recurring charge re-fire `purchase`? (a classic duplicate-transaction source).
- **Promo / launch calendar** — a spike in one source during a launch can look like a break and isn't.

## How to decide — in order

1. **Establish commerce truth first.** Lock the store's real paid-order count and revenue for the window with test/$0/cancelled/refunded orders excluded. Every drift % is measured against this number, never against another platform. Nothing else is "truth."
2. **Reconcile each source against commerce, one at a time.** Compute `drift % = (source_reported − commerce_truth) / commerce_truth` for GA4 purchases, Meta purchases, Google Ads conversions, and Klaviyo attributed orders. Apply the bands: **under 5% healthy → KEEP; 5–15% caution → WATCH/REFRESH; over 15% unsafe → FIX, and no attribution decision may use that source until repaired.**
3. **Separate a real break from an expected modelled gap.** Meta/Google view-through and modelled conversions, Klaviyo's open-window attribution, and GA4's consent-modelled purchases are *designed* to exceed the store count. A drift that matches the known consent/modelled baseline is **WATCH**, not a broken-pixel **FIX**. Only flag FIX when the gap exceeds what the model alone explains.
4. **Walk the usual culprits for any source over 5%, in this order:**
   - **Duplicate transactions** — double-fired `purchase` (GTM + theme + app all firing), subscription/recurring re-counts, a thank-you page reachable on refresh. Signature: source materially *above* commerce truth.
   - **Untagged / broken UTMs and self-referrals** — your own domain, payment gateway, or subdomain in the referral path inflating `(direct)` or `(referral)`; missing UTMs on email/SMS/paid links. Signature: a fat `(direct) / (none)` bucket and orders attributed to the wrong channel.
   - **Consent-mode / iOS / ad-blocker shortfall** — browser tags blocked, so the *source under-reports*. Signature: source materially *below* commerce truth and below its server-side count.
   - **Server-side vs. browser gap** — CAPI/GA4 server events not de-duplicated against the browser tag (`event_id` missing) → over-count; or only server firing → under-count.
   - **Currency / time-zone / window mismatch** — source in account TZ/currency, store in another; a UTC-vs-store-day boundary shifting orders across the window edge.
   - **Test orders not filtered** — internal/QA orders inflating the store side, or not excluded from one source but excluded from another.
5. **Rank the repairs by decision impact, not by drift size.** The biggest drift on a channel you don't fund is lower priority than a 12% drift on the channel you're about to make a budget call on. Order the FIX list so the decision-blocking break is repaired first.
6. **Assign status + owner + recheck**, and state the single sentence: *which decisions are safe to make now, and which are blocked until a named source is repaired.*

## The prompt to run

```text
You are my ecommerce analytics lead running the "Tracking Sanity Check" play — the
trust gate that every other growth decision depends on.

GOAL: reconcile each reporting source against COMMERCE TRUTH (the store's real paid,
non-test orders) and tell me which numbers I can trust this week and which are blocked
until repaired. This is mostly a FIX play. Do not help me make budget/attribution calls
on un-reconciled data.

I will paste: commerce orders (real paid count + revenue, test/$0/cancelled/refunded
excluded), GA4 purchases, Meta purchases (with attribution setting), Google Ads
conversions (per conversion action), Klaviyo attributed orders, store time zone and
currency, and any recent tag/checkout/consent changes. Some data may be missing.

RULES:
- Commerce truth is the ONLY denominator. Never judge one platform by another platform.
- For each source compute drift % vs commerce truth and band it:
  under 5% = healthy (KEEP), 5-15% = caution (WATCH/REFRESH), over 15% = unsafe (FIX).
  Do NOT make attribution or budget decisions using any source above 15% drift.
- Distinguish a REAL tracking break from an EXPECTED modelled/consent gap (Meta/Google
  view-through + modelled conversions, Klaviyo open-window attribution, GA4 consent
  modelling all legitimately exceed the store count). Only call FIX when the gap exceeds
  what the model alone explains.
- For any source over 5%, name the likely cause in this diagnostic order: duplicate
  transactions (source ABOVE truth) -> untagged/broken UTMs & self-referrals (fat
  direct bucket) -> consent/iOS/ad-blocker shortfall (source BELOW truth) -> server-side
  vs browser dedup gap -> currency/timezone/window mismatch -> unfiltered test orders.
- Never trust a single platform's self-report as truth.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent data.

RETURN:
1. A 2-3 sentence executive read: can I trust the data this week, yes/no, and what's blocked.
2. A reconciliation table: Source | Reported | Commerce truth | Drift % | Likely cause |
   Confidence | Fix priority.
3. Broken-tracking notes per flagged source (real break vs expected modelled gap).
4. An ORDERED repair sequence — biggest decision-blocking drift first — with owner and recheck.
```

## Decision rules

- **KEEP** — drift under 5% against commerce truth; the source reconciles and is safe to base decisions on.
- **WATCH** — drift 5–15%, *or* a larger gap that is fully explained by a known modelled/consent baseline (expected, not broken). Monitor; do not yet rebuild tracking.
- **REFRESH** — drift 5–15% traced to a fixable hygiene issue (a few untagged links, one mislabelled UTM, a stale channel grouping) where a light correction closes the gap.
- **FIX** — drift over 15%, *or* any drift caused by a genuine break (double-fired pixel, dedup failure, self-referral storm, unfiltered test orders). This source is **frozen for decisions** until repaired.
- **KILL** — retire a tracking artifact that should not exist at all: a duplicate/legacy pixel, an orphaned conversion action double-counting purchases, a dead UTM convention still polluting reports.
- Every recommendation must include a **number, source, time window, and confidence level** — a drift % with no window or no stated source is not evidence.

## Vetoes — stop if any apply

- **Never make an attribution or budget decision while a channel's drift exceeds 15%.** Reconcile or freeze that channel first — full stop.
- **Never treat a single platform's self-report as truth.** Commerce orders are the only denominator; Meta/Google/GA4/Klaviyo are all claimants, not judges.
- **Never call FIX on an expected modelled/consent gap.** A drift that matches the known view-through/consent baseline is WATCH, not a broken pixel — repairing it is wasted effort and can break legitimate modelling.
- **Never add attributed orders across sources** (Meta + Google + Klaviyo + GA4) as if they were exclusive — overlapping attribution windows double-count the same order.
- **Never declare a source "fixed" without a clean recheck window** free of the promo, launch, or deploy that polluted the original comparison.
- **Never recommend writes, pixel deletions, UTM rewrites, or tag changes without explicit human approval** and a preview of what changes.

## Output

A source-reconciliation table, broken-tracking notes, confidence labels, and an **ordered repair sequence** (biggest decision-blocking drift first).

Minimum table columns:

| Source | Reported | Commerce truth | Drift % | Likely cause | Confidence | Fix priority |
|---|---|---|---|---|---|---|
| Example: GA4 purchases | 1,180 (GA4, last 30d) | 1,000 (Shopify paid, 30d) | +18% | Double-fired purchase tag (GTM + theme) | High | 1 |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/ecom-tracking-sanity) — it executes this play read-only by default and applies changes only on your approval.
