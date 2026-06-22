---
name: ecom-pdp-improvement-list
description: "When an ecommerce operator needs to decide: Which product pages should be improved first? Runs the PDP Improvement List play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'PDP Improvement', 'Commerce', 'Google Analytics 4', 'Onsite Cro'."
license: CC-BY-4.0
metadata:
  persona: Head of Ecommerce
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# PDP Improvement List

**Operating question:** Which product pages should be improved first?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **GA4, per PDP** — sessions (or `view_item` events), add-to-cart events, and purchases, at landing-page **and** product-detail granularity, last 28 days plus the prior equal period. You need both the rate and the volume; a rate without sessions can't be ranked.
- **Commerce catalog, per product/variant** — selling price and **contribution margin** (or COGS), live **stock by variant**, review count and average rating, and image count per PDP.
- **A benchmark CVR per page** — not a single site average. Derive it from the page's own category and traffic mix (a sale-collection PDP and a cold-paid PDP do not share a benchmark).
- **AOV for the product** — to convert recovered conversions into recovered revenue.

Optional, if available:

- **PDP load time / Core Web Vitals** (LCP, INP) per template — slow pages bleed mobile add-to-cart.
- **Traffic-source split per PDP** (organic / paid / email / direct) — separates an intent problem from a page problem.
- **Recent merchandising or price changes, and launch date** — a 9-day-old PDP has no stable CVR yet.
- **On-site search and PDP exit/bounce rate** — corroborates where attention dies.
- **Returns rate by product** — a fit/expectation gap that no PDP edit alone will close.

## How to decide — in order

1. **Gate on tracking.** If GA4 purchases for the window diverge from store orders by more than ~20%, stop — set the whole list to **FIX** and repair events first. A wrong CVR denominator mis-ranks everything.
2. **Filter to a rankable sample.** Drop any PDP with fewer than ~300 sessions in 28 days (or under ~5 transactions) to a holding **WATCH** — low CVR on low traffic is noise, not signal, and will dominate a naive "worst CVR" sort.
3. **Compute the gap, then the dollars.** For each surviving PDP: `gap = benchmark CVR − actual CVR`. If `gap ≤ 0`, it's at or above benchmark → **KEEP**. If `gap > 0`, recoverable revenue `= sessions × gap × AOV × margin`. **Rank descending by recoverable revenue.** This is the queue.
4. **Apply the veto pass (see Veto Rules) before diagnosing** — out-of-stock variants, pre-order/coming-soon, and single-source-intent pages get pulled or relabeled here so you don't "fix" a page that isn't broken.
5. **Diagnose the root cause** on the top recoverable PDPs by reading the micro-funnel. Add-to-cart rate is the fork:
   - **Low session → add-to-cart** = the page failed to convince. Look at images (count/quality), reviews (count < ~5 or rating < ~4.0), missing size/fit/spec info, unclear price/shipping. → **REFRESH**.
   - **Healthy add-to-cart but low purchase** = the leak is downstream (cart/shipping/checkout), not the PDP. → relabel; don't queue it as a PDP fix.
   - **Slow LCP on mobile + add-to-cart gap concentrated on mobile** = performance. → **FIX** (template/perf), route to web.
6. **Assign status + owner + recheck date.** Each top PDP gets one named driver, one owner, and a date to re-measure after the change.

## The prompt to run

```text
You are my ecommerce merchandising analyst running the "PDP Improvement List" play.

GOAL: rank my product detail pages by RECOVERABLE REVENUE and assign each top page a
diagnosed root cause and a fix owner. Recoverable revenue = sessions x (benchmark CVR -
actual CVR) x AOV x margin. Rank by dollars recoverable, NOT by worst conversion rate.

I will paste a per-PDP table: page, sessions (28d), add-to-cart rate, actual CVR,
benchmark CVR, AOV, margin %, review count, avg rating, image count, stock status by
variant, and mobile LCP where available. Some fields may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If per-PDP sessions
(traffic) + CVR (and margin) is missing, STOP and return only (a) what's missing and
(b) how to get it -- never estimate it or proceed. Without per-PDP traffic you cannot
compute recoverable revenue, and without margin you cannot rank by contribution.

RULES:
- Tracking gate first: if I tell you GA4 purchases and store orders diverge >20%, mark
  the whole list FIX and stop ranking.
- Drop any PDP under ~300 sessions (or <5 transactions) in 28 days to WATCH. Low CVR on
  low traffic is noise, never a top-of-queue fix.
- For rankable pages: gap = benchmark CVR - actual CVR. If gap <= 0, KEEP. Else
  recoverable = sessions x gap x AOV x margin. Rank descending by recoverable revenue.
- VETO before diagnosing: if a PDP has out-of-stock or pre-order variants, do NOT call it
  a page problem -- the stock state explains low CVR. Flag it, don't queue it as REFRESH.
- VETO on intent: if a low-CVR page's traffic is mostly one cold source (e.g. broad paid),
  say so -- segment before judging; intent differs by source.
- Diagnose via the micro-funnel: low add-to-cart = page failed to convince (images,
  reviews, fit/spec info, price clarity) -> REFRESH. Healthy add-to-cart but low purchase
  = downstream cart/checkout leak, NOT a PDP fix -> relabel. Mobile-only add-to-cart gap
  with slow LCP -> FIX (performance).
- Every row must carry a number, source, time window, and confidence level. Separate
  exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read naming the single highest-recoverable PDP.
2. A table ranked by recoverable revenue, using EXACTLY this header row:
   | PDP | Sessions (28d) | Actual CVR | Benchmark CVR | Recoverable $ | Driver | Status | Owner | Recheck |
   Use "--" for any cell you cannot fill. Do not add or drop columns, and do not replace
   the table with prose.
3. Vetoes/caveats that pulled or downgraded any page.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a fix decision.
```

## Decision rules

- **REFRESH** — rankable sample (≥300 sessions / 28d), actual CVR below benchmark by a gap that yields material recoverable revenue, and the add-to-cart drop traces to a fixable on-page cause (thin/low reviews, ≤1 or poor image, missing size/fit/spec, unclear price or shipping). The page has a credible reason to improve.
- **FIX** — tracking drift (GA4 vs. store orders >20%), a broken GA4↔catalog join, or a mobile performance problem (slow LCP) that blocks a clean PDP read or is itself the cause.
- **WATCH** — directional only: under ~300 sessions or ~5 transactions in 28 days, a PDP launched in the last ~14 days, or a window polluted by a promo or stockout.
- **KEEP** — actual CVR at or above its page-specific benchmark (gap ≤ 0); nothing material to recover.
- **KILL** — reserved: a chronically dead SKU (high traffic, near-zero CVR over multiple clean windows, no stock/intent veto) that merchandising recommends delisting rather than improving. Rare for a PDP play; most pages are REFRESH, not KILL.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** label a PDP a page problem when it has **out-of-stock or pre-order variants** — the stock state explains the low CVR, not the layout. Pull it from the REFRESH queue; route to planning.
- Do **not** judge a low-CVR page before **segmenting by traffic source** — a page fed mostly by broad cold paid traffic carries different intent than one fed by branded search; the "low" CVR may be a mix artifact.
- Do **not** rank by worst CVR — low CVR on **low traffic is noise**; it must clear the session floor to enter the queue.
- Do **not** queue a PDP fix when the **add-to-cart rate is healthy but purchase is low** — the leak is in cart/checkout, downstream of the page.
- Do **not** make a recoverable-revenue claim without **margin and AOV**; revenue at risk is not contribution at risk.
- Do **not** push template, copy, image, or price changes live without an explicit human approval step.

## Output

A list of PDPs ranked by recoverable revenue, each with a diagnosed driver, owner, and recheck date.

| PDP | Sessions (28d) | Actual CVR | Benchmark CVR | Recoverable $ | Driver | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| /products/example | 3,400 | 1.1% | 2.6% | $4,180 | 2 images, no reviews | REFRESH | Merch | 14 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
