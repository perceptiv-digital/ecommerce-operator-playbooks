---
slug: "ecom-tracking-sanity"
title: "Tracking Sanity Check"
operating_question: "Can we trust the tracking before making growth decisions?"
primary_persona: "ecommerce"
personas: ["ecommerce", "performance", "marketing"]
category: "tracking-data-quality"
platforms: ["commerce", "google-analytics-4", "meta-ads", "google-ads", "klaviyo"]
cadence: "weekly"
public_tier: "launch"
---

# Tracking Sanity Check

## Operating Question

**Can I trust the tracking before I make any growth decision this week — and if not, exactly which source is lying and in what direction?**

This is the **trust gate** every other play stands on. Wasted-spend kills, budget reallocation, creative scaling, lifecycle attribution — all of them read from GA4, Meta, Google Ads, and Klaviyo, and all of those platforms report on *themselves*. Each one over-counts its own conversions, sees a different window, and never reconciles to the one number that actually settled in your bank: the store's real orders. This play reconciles every reporting source against **commerce truth** (the store's own paid, non-test orders), labels each source's drift, and produces an **ordered repair sequence** — fix the biggest decision-blocking drift first. It is mostly a **FIX** play by design. If you can't trust the numbers, the only correct decision is to repair them before acting on anything else.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your Shopify admin, your GA4 property, Meta Ads Manager, Google Ads, or Klaviyo — so it can't *see* the four numbers that have to be reconciled, let alone the fifth (the store's true order count) that judges them. To run this manually you have to:

1. Pull the store's real orders for the window — and strip test orders, $0 orders, cancelled/fully-refunded orders, and (depending on your definition) draft and POS orders.
2. Pull GA4 `purchase` events / `ecommerce purchases`, and confirm you're reading the right metric (events vs. sessions-with-transactions vs. key-event count).
3. Pull Meta's `purchases` (and decide 7-day-click/1-day-view vs. the default attribution setting), Google Ads `conversions` (and check for double-counted conversion actions), and Klaviyo `attributed orders` (5-day click / 1-day open by default).
4. Align time zones and currency, then compute drift per source against commerce truth and label whether each gap is a real break or an expected modelled gap.

**The reconciliation logic below is free. The cross-platform data access is the wall** — and that wall is exactly where manual runs stall. ShopMCP is the line into all five sources; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Ecommerce — owns the trust gate for the whole reporting stack.
- **Also useful for:** Performance Marketer (won't kill the wrong campaign on bad attribution), Head of Marketing (won't reallocate budget on a phantom channel), Analytics/Web lead (owns the actual tracking fixes).
- Run it **before** any spend, creative, or lifecycle decision — this play gates the others. Treat its output as a prerequisite, not a report.

## When To Run It

- **Cadence:** weekly — early in the week, after the weekend's orders and platform attribution windows have settled (Meta and Klaviyo keep re-attributing for days).
- **Triggers:** a reporting source suddenly jumps or craters; a checkout, theme, GTM, consent-banner, or pixel/CAPI change shipped; a platform update (iOS, consent mode v2, GA4 model change); finance/board numbers stop matching the dashboard; or you're about to run **Wasted Spend Killer** or any budget play and need a clean attribution base first.
- **Hard rule:** never run a budget or attribution play on top of un-reconciled tracking. You'll optimize toward whichever platform lies the most flatteringly.

## Required Evidence

- **Commerce truth (Shopify / Woo / BigCommerce)** — total **paid orders** and order count for the window, with test orders, $0 orders, and cancelled/fully-refunded orders excluded; order timestamps in **store time zone**; store **currency**. This is the denominator everything else is judged against.
- **GA4** — `purchase` event count (or `ecommerce purchases`) and purchase revenue for the same window, plus `session_default_channel_group` and `source / medium` so you can see `(direct) / (none)` and self-referral inflation.
- **Meta Ads** — `purchases` and purchase value, **with the attribution setting stated** (7-day click / 1-day view is the default and over-claims view-through orders that GA4 and the store never see).
- **Google Ads** — `conversions` and conversion value, **per conversion action** (so you can spot a purchase action firing alongside a duplicate "Purchase" or a GA4-imported conversion = double counting).
- **Klaviyo** — flow + campaign **attributed orders** and attributed value (default 5-day click / 1-day open), which will legitimately overlap with paid and so must never be added to other sources as if exclusive.
- **Targets / context for labelling drift** — your accepted healthy band (under 5% drift), and any known modelled/consent gap baseline for the account.

## Optional Evidence

- **Consent / CMP state** — consent-mode v2 status, % of sessions consented, ad-blocker share — to separate an *expected* modelled gap from a *real* break.
- **Tag/deploy log** — recent GTM, theme, checkout, pixel, or CAPI changes with dates, so a drift spike can be tied to a release.
- **Server-side setup** — whether Meta CAPI / GA4 server-side / Conversions API is live, its dedup key (`event_id`), and its match quality.
- **Subscription / recurring app** — does a recurring charge re-fire `purchase`? (a classic duplicate-transaction source).
- **Promo / launch calendar** — a spike in one source during a launch can look like a break and isn't.

## How To Pull This Evidence

- **Commerce truth (Shopify order count)** — Admin → Orders, filter to **Paid** financial status, then exclude test orders, $0 orders, and cancelled/fully-refunded orders; set the date range in **store time zone**. Gotcha: Shopify's "Total orders" report includes cancelled and test orders — count the filtered list, not the headline number.
- **GA4 purchases** — Reports → Monetization (or Explore) → `purchase` event count / `ecommerce purchases` for the identical window. Gotcha: pick one metric and stick to it — events vs. sessions-with-transactions vs. key-event count diverge, and consent-modelled purchases inflate the total.
- **Meta claimed conversions** — Ads Manager → Purchases column, with the **attribution setting explicitly stated** (default 7-day-click / 1-day-view over-claims view-through orders the store never sees). Gotcha: change the attribution window in the column settings before reading, or you're comparing apples to a model.
- **Google Ads claimed conversions** — Goals/Conversions → Conversions **per conversion action**, not the rolled-up total. Gotcha: a GA4-imported "Purchase" firing alongside a native pixel "Purchase" double-counts — list each action separately to catch it.
- **Klaviyo attributed orders** — Analytics → attributed orders across flows + campaigns (default 5-day click / 1-day open). Gotcha: this is an overlapping subset of total orders, not an exclusive channel — never add it to the other sources as if it were.
- Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

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

## Manual Workflow

1. Set the window (last 14 or 30 days) and write down the store's **time zone and currency** — most drift "bugs" are really window/TZ artifacts.
2. Pull commerce truth: real paid orders + revenue, test/$0/cancelled/refunded excluded. This is your denominator.
3. Pull the four reported numbers for the *identical* window: GA4 purchases, Meta purchases (note the attribution setting), Google Ads conversions (per action), Klaviyo attributed orders.
4. Compute drift % per source against commerce truth; apply the 5% / 15% bands.
5. For each source over 5%, walk the culprit order in Logic step 4 and name the *likely cause* with its signature (above truth vs. below truth).
6. Label each gap **real break** or **expected modelled/consent gap** before calling FIX.
7. Paste the prompt below with your reconciliation numbers; have it return the table + an ordered repair sequence.
8. Convert FIX rows into an owner-assigned repair packet, biggest decision-blocker first, with a recheck date after a clean window.

## Copy-Paste Prompt

```text
You are my ecommerce analytics lead running the "Tracking Sanity Check" play — the
trust gate that every other growth decision depends on.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the commerce
order count (the store's real paid, non-test, non-cancelled order count used as the
denominator/truth) is missing, STOP and return only (a) what's missing and (b) how to
get it — never estimate it or proceed. Without commerce truth no drift can be computed.

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
2. A reconciliation table using EXACTLY this header:
   | Source | Reported | Commerce truth | Drift % | Likely cause | Confidence | Fix priority |
   |---|---|---|---|---|---|---|
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns, and
   do not replace the table with prose.
3. Broken-tracking notes per flagged source (real break vs expected modelled gap).
4. An ORDERED repair sequence — biggest decision-blocking drift first — with owner and recheck.
```

## Decision Rules

- **KEEP** — drift under 5% against commerce truth; the source reconciles and is safe to base decisions on.
- **WATCH** — drift 5–15%, *or* a larger gap that is fully explained by a known modelled/consent baseline (expected, not broken). Monitor; do not yet rebuild tracking.
- **REFRESH** — drift 5–15% traced to a fixable hygiene issue (a few untagged links, one mislabelled UTM, a stale channel grouping) where a light correction closes the gap.
- **FIX** — drift over 15%, *or* any drift caused by a genuine break (double-fired pixel, dedup failure, self-referral storm, unfiltered test orders). This source is **frozen for decisions** until repaired.
- **KILL** — retire a tracking artifact that should not exist at all: a duplicate/legacy pixel, an orphaned conversion action double-counting purchases, a dead UTM convention still polluting reports.
- Every recommendation must include a **number, source, time window, and confidence level** — a drift % with no window or no stated source is not evidence.

## Veto Rules

- **Never make an attribution or budget decision while a channel's drift exceeds 15%.** Reconcile or freeze that channel first — full stop.
- **Never treat a single platform's self-report as truth.** Commerce orders are the only denominator; Meta/Google/GA4/Klaviyo are all claimants, not judges.
- **Never call FIX on an expected modelled/consent gap.** A drift that matches the known view-through/consent baseline is WATCH, not a broken pixel — repairing it is wasted effort and can break legitimate modelling.
- **Never add attributed orders across sources** (Meta + Google + Klaviyo + GA4) as if they were exclusive — overlapping attribution windows double-count the same order.
- **Never declare a source "fixed" without a clean recheck window** free of the promo, launch, or deploy that polluted the original comparison.
- **Never recommend writes, pixel deletions, UTM rewrites, or tag changes without explicit human approval** and a preview of what changes.

## Output Contract

A source-reconciliation table, broken-tracking notes, confidence labels, and an **ordered repair sequence** (biggest decision-blocking drift first).

Minimum table columns:

| Source | Reported | Commerce truth | Drift % | Likely cause | Confidence | Fix priority |
|---|---|---|---|---|---|---|
| Example: GA4 purchases | 1,180 (GA4, last 30d) | 1,000 (Shopify paid, 30d) | +18% | Double-fired purchase tag (GTM + theme) | High | 1 |

## Worked Example

> **Executive read:** Tracking is **not** safe to make budget calls on this week. Of the four sources, only Klaviyo and (after labelling) Meta reconcile; GA4 is over-counting by 19% from a double-fired purchase tag and Google Ads is over-counting by 27% from a duplicate conversion action — both block any attribution decision until repaired. Commerce truth for the 30-day window is **1,000 paid orders / $182,400**. Fix the Google Ads duplicate first (it's gating this week's Shopping budget call), then the GA4 tag.

| Source | Reported | Commerce truth | Drift % | Likely cause | Confidence | Fix priority |
|---|---|---|---|---|---|---|
| Klaviyo attributed orders | 268 (Klaviyo, 30d, 5-day click) | 1,000 (Shopify paid, 30d) | n/a — subset, reconciles | Email/SMS subset of total; within expected overlap | High | KEEP |
| Meta purchases | 1,140 (Meta, 30d, 7d-click/1d-view) | 1,000 (Shopify paid, 30d) | +14% | Expected 1-day view-through modelling, not a break | Med | WATCH |
| GA4 purchases | 1,190 (GA4, 30d) | 1,000 (Shopify paid, 30d) | +19% | Double-fired `purchase` (GTM tag + theme snippet both firing) | High | 2 — FIX |
| Google Ads conversions | 1,270 (Google Ads, 30d, per-action) | 1,000 (Shopify paid, 30d) | +27% | Duplicate conversion action + GA4-imported purchase counted twice | High | 1 — FIX |
| `(direct) / (none)` share | 31% of GA4 sessions-with-purchase | — | — | Self-referral via payment gateway inflating direct; untagged email links | Med | 3 — REFRESH |

The decisions that invert: Meta looks "worst" by raw over-count (+14%) but is the *expected* modelled gap and is safe to watch, while Google Ads (+27%) is a genuine double-count that would have you over-credit Shopping and over-fund it. The repair order is set by *decision impact* — the Google Ads duplicate is fixed first because this week's Shopping budget call depends on it, not because it has the largest percentage.

## Common Failure Modes

- Treating a platform's self-reported conversions as commerce truth instead of the store's paid orders.
- Adding Meta + Google + Klaviyo + GA4 attributed orders together and "explaining" why they exceed real orders, when the answer is overlapping attribution.
- Calling an expected modelled/view-through gap a broken pixel and burning a sprint chasing a non-bug.
- Comparing windows in different time zones or currencies and reading the boundary artifact as drift.
- Forgetting to exclude test, $0, cancelled, or fully-refunded orders from commerce truth, then blaming the platforms.
- Missing a double-fired pixel because each platform looks internally consistent — they only disagree against the store.
- Accepting an AI answer with a drift % but no window, no source, and no real-break-vs-modelled-gap label.

## Run This Play With Live Data

**Manual version:** export the store's real orders, pull GA4 / Meta / Google Ads / Klaviyo each with its own attribution quirk, align time zones and currency, compute drift against commerce truth, and label every gap real-break-vs-modelled — every single week, across five tools that each insist they're right.

**ShopMCP version:** connect your store, GA4, Meta, Google Ads, and Klaviyo once. Ask the question; ShopMCP pulls real paid orders as the denominator, pulls each source's reported number with its attribution setting, computes the drift bands, separates expected modelled gaps from genuine breaks, and returns the reconciliation table plus an ordered repair sequence. It stays **read-only** — it will never delete a pixel, rewrite a UTM, or change a tag without an explicit approval step and a preview.

> No store, GA4, Meta, Google, or Klaviyo connection inside your AI assistant? That's the wall every manual run hits — you cannot reconcile sources you cannot read. ShopMCP *is* the connection across all five, so the trust gate that gates every other play runs in one prompt instead of a five-tab spreadsheet afternoon.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Tracking Sanity Check play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual exports and stale CSVs from five sources that each report on themselves.
- Re-deriving each platform's attribution window and currency/time-zone quirk by hand.
- Guessing whether a gap is a real break or an expected modelled/consent gap.
- Rebuilding the same commerce-truth reconciliation every single week.
