---
slug: "ecom-pdp-improvement-list"
title: "PDP Improvement List"
operating_question: "Which product pages should be improved first?"
primary_persona: "ecommerce"
personas: ["ecommerce", "merchandising"]
category: "onsite-cro"
platforms: ["commerce", "google-analytics-4"]
cadence: "weekly"
public_tier: "fast-follow"
contributed_by: "Perceptiv"
---

# PDP Improvement List

## Operating Question

**Which product detail pages should I fix first this week to recover the most lost revenue — ranked so I work high-traffic underperformers, not the worst conversion rate on a page nobody visits?**

Every store has dozens of PDPs converting below where they should. The trap is fixing the wrong ones: a 0.4% page feels broken, but if it gets 60 sessions a month, fixing it returns almost nothing. This play ranks every PDP by **recoverable revenue** — `sessions × (benchmark CVR − actual CVR) × AOV × margin` — so the queue is ordered by dollars you can actually win back, then attaches a diagnosed root cause (add-to-cart drop, thin reviews, weak imagery, missing fit info, out-of-stock variants, slow load) to each page so the fix is specific, not "improve the page."

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your store admin or GA4, so it can't see the two numbers this play lives on: per-PDP **sessions** and per-PDP **conversion rate**. To run it manually you have to:

1. Pull a GA4 report at **landing-page or product-detail-view** granularity — sessions, add-to-cart, and purchases per PDP, last 28 days vs. the prior 28.
2. Pull the product/variant feed from commerce — price, current stock by variant, review count and average rating, image count.
3. Join them on product handle/URL (GA4 paths and store handles rarely match cleanly — redirects, query strings, and locale prefixes break the join).
4. Compute a **realistic benchmark CVR per page** (category and traffic-mix specific — not one site average), then the recoverable-revenue formula, then sort.

**The reasoning here is free. The page-level join across GA4 and your catalog is the work — and that is exactly what ShopMCP connects.** With no live link to GA4 and your store, a manual run stalls at step 3. Hold that; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Ecommerce
- **Also useful for:** Merchandising Manager (imagery, copy, fit content), CRO/Web (page template and load), Buying/Planning (out-of-stock variants suppressing CVR).
- Run it **before** your weekly site/merchandising stand-up, so the queue — not opinion — sets what gets touched.

## When To Run It

- **Cadence:** weekly — early in the week, after the weekend's traffic and orders have settled into GA4.
- **Triggers:** a new collection or hero product launched, a theme/template change, a site-wide CVR dip, or a planning cycle that needs a ranked backlog.
- **Pre-requisite:** confirm GA4 ecommerce events (`view_item`, `add_to_cart`, `purchase`) are firing and that purchases roughly reconcile with store orders. If GA4 purchases are 20%+ off store orders, every CVR below is unreliable — fix tracking first or the whole ranking is built on sand.

## Required Evidence

- **GA4, per PDP** — sessions (or `view_item` events), add-to-cart events, and purchases, at landing-page **and** product-detail granularity, last 28 days plus the prior equal period. You need both the rate and the volume; a rate without sessions can't be ranked.
- **Commerce catalog, per product/variant** — selling price and **contribution margin** (or COGS), live **stock by variant**, review count and average rating, and image count per PDP.
- **A benchmark CVR per page** — not a single site average. Derive it from the page's own category and traffic mix (a sale-collection PDP and a cold-paid PDP do not share a benchmark).
- **AOV for the product** — to convert recovered conversions into recovered revenue.

## Optional Evidence

- **PDP load time / Core Web Vitals** (LCP, INP) per template — slow pages bleed mobile add-to-cart.
- **Traffic-source split per PDP** (organic / paid / email / direct) — separates an intent problem from a page problem.
- **Recent merchandising or price changes, and launch date** — a 9-day-old PDP has no stable CVR yet.
- **On-site search and PDP exit/bounce rate** — corroborates where attention dies.
- **Returns rate by product** — a fit/expectation gap that no PDP edit alone will close.

## How To Pull This Evidence

- **Shopify → Analytics → Reports → "Sessions by landing page"** for per-PDP sessions; pair with **"Conversion by landing page"** (or build a custom report) to get CVR per page. Gotcha: landing-page sessions undercount PDPs reached via collection/search, so a deep-linked PDP's true traffic is higher than the report shows.
- **Shopify "Product analytics" / "Sessions converted to checkouts"** for add-to-cart rate per product. Gotcha: Shopify's product-level funnel keys on product, not URL — variant and `?variant=` PDPs collapse into one row.
- **GA4 → Reports → Engagement → Landing page** (add `add_to_cart`, `view_item`, `purchase` as secondary metrics) when you need the micro-funnel GA4 splits cleaner than Shopify's. Gotcha: GA4 page paths carry locale prefixes and query strings — normalize them before joining to Shopify handles, or the VLOOKUP drops rows.
- **Margin/COGS lives in the product/variant cost field** (Shopify "Cost per item"), not in any analytics report — export it from the catalog and join it in. Gotcha: a blank cost field silently zeroes contribution and corrupts the recoverable-revenue ranking; flag missing-cost rows rather than treating them as 100% margin.
- **Reviews (count + rating) and image count** come from the catalog/review app export, per PDP. Gotcha: review apps store counts outside Shopify's product object, so they need a separate pull keyed on product handle.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Gate on tracking.** If GA4 purchases for the window diverge from store orders by more than ~20%, stop — set the whole list to **FIX** and repair events first. A wrong CVR denominator mis-ranks everything.
2. **Filter to a rankable sample.** Drop any PDP with fewer than ~300 sessions in 28 days (or under ~5 transactions) to a holding **WATCH** — low CVR on low traffic is noise, not signal, and will dominate a naive "worst CVR" sort.
3. **Compute the gap, then the dollars.** For each surviving PDP: `gap = benchmark CVR − actual CVR`. If `gap ≤ 0`, it's at or above benchmark → **KEEP**. If `gap > 0`, recoverable revenue `= sessions × gap × AOV × margin`. **Rank descending by recoverable revenue.** This is the queue.
4. **Apply the veto pass (see Veto Rules) before diagnosing** — out-of-stock variants, pre-order/coming-soon, and single-source-intent pages get pulled or relabeled here so you don't "fix" a page that isn't broken.
5. **Diagnose the root cause** on the top recoverable PDPs by reading the micro-funnel. Add-to-cart rate is the fork:
   - **Low session → add-to-cart** = the page failed to convince. Look at images (count/quality), reviews (count < ~5 or rating < ~4.0), missing size/fit/spec info, unclear price/shipping. → **REFRESH**.
   - **Healthy add-to-cart but low purchase** = the leak is downstream (cart/shipping/checkout), not the PDP. → relabel; don't queue it as a PDP fix.
   - **Slow LCP on mobile + add-to-cart gap concentrated on mobile** = performance. → **FIX** (template/perf), route to web.
6. **Assign status + owner + recheck date.** Each top PDP gets one named driver, one owner, and a date to re-measure after the change.

## Manual Workflow

1. Export the GA4 per-PDP report (sessions, add-to-cart, purchases) for the last 28 days and the prior 28; export the catalog (price, margin, stock by variant, reviews, image count).
2. Join on product handle/URL. Manually fix the rows where the join fails (redirects, locale prefixes, `?variant=` params).
3. Run the tracking reconciliation (rule 1). If it fails, stop and fix events.
4. Filter out the sub-300-session pages (rule 2) into a WATCH bucket.
5. Compute `gap` and `recoverable revenue` per PDP and sort descending (rule 3).
6. Apply vetoes (rule 4), then read the micro-funnel on the top ~10 to assign a driver (rule 5).
7. Paste the prompt below with your joined table to pressure-test the ranking and produce the action packet.

## Copy-Paste Prompt

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

## Decision Rules

- **REFRESH** — rankable sample (≥300 sessions / 28d), actual CVR below benchmark by a gap that yields material recoverable revenue, and the add-to-cart drop traces to a fixable on-page cause (thin/low reviews, ≤1 or poor image, missing size/fit/spec, unclear price or shipping). The page has a credible reason to improve.
- **FIX** — tracking drift (GA4 vs. store orders >20%), a broken GA4↔catalog join, or a mobile performance problem (slow LCP) that blocks a clean PDP read or is itself the cause.
- **WATCH** — directional only: under ~300 sessions or ~5 transactions in 28 days, a PDP launched in the last ~14 days, or a window polluted by a promo or stockout.
- **KEEP** — actual CVR at or above its page-specific benchmark (gap ≤ 0); nothing material to recover.
- **KILL** — reserved: a chronically dead SKU (high traffic, near-zero CVR over multiple clean windows, no stock/intent veto) that merchandising recommends delisting rather than improving. Rare for a PDP play; most pages are REFRESH, not KILL.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do **not** label a PDP a page problem when it has **out-of-stock or pre-order variants** — the stock state explains the low CVR, not the layout. Pull it from the REFRESH queue; route to planning.
- Do **not** judge a low-CVR page before **segmenting by traffic source** — a page fed mostly by broad cold paid traffic carries different intent than one fed by branded search; the "low" CVR may be a mix artifact.
- Do **not** rank by worst CVR — low CVR on **low traffic is noise**; it must clear the session floor to enter the queue.
- Do **not** queue a PDP fix when the **add-to-cart rate is healthy but purchase is low** — the leak is in cart/checkout, downstream of the page.
- Do **not** make a recoverable-revenue claim without **margin and AOV**; revenue at risk is not contribution at risk.
- Do **not** push template, copy, image, or price changes live without an explicit human approval step.

## Output Contract

A list of PDPs ranked by recoverable revenue, each with a diagnosed driver, owner, and recheck date.

| PDP | Sessions (28d) | Actual CVR | Benchmark CVR | Recoverable $ | Driver | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| /products/example | 3,400 | 1.1% | 2.6% | $4,180 | 2 images, no reviews | REFRESH | Merch | 14 days |

## Worked Example

> **Executive read:** The Merino Crew Knit PDP is the clear top fix — 4,100 sessions converting at 0.9% against a 2.4% category benchmark is roughly **$5,200/mo of recoverable contribution**, traced to a single product image and only 2 reviews. The Trail Runner (6.0% CVR, 200 sessions) screams "broken" by rate but is deprioritized: at that volume the entire upside is ~$140, below the noise floor. The Linen Shirt looks weak too, but it's 80% out of stock by size — that's a planning fix, not a page fix, so it's vetoed off the queue.

| PDP | Sessions (28d) | Actual CVR | Benchmark CVR | Recoverable $ | Driver | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Merino Crew Knit | 4,100 | 0.9% | 2.4% | **$5,210** | 1 image, 2 reviews, no fit guide | **REFRESH** | Merch + Web | 14 days |
| Weatherproof Parka | 2,750 | 1.6% | 2.8% | $3,090 | Mobile LCP 4.8s, ATC gap mobile-only | **FIX** | Web | 10 days |
| Everyday Tote | 1,900 | 1.4% | 2.2% | $1,440 | Thin copy, no dimensions/spec | **REFRESH** | Merch | 14 days |
| Linen Shirt | 1,600 | 1.0% | 2.5% | n/a | 80% of sizes out of stock | **WATCH** (veto) | Planning | On restock |
| Wool Beanie | 980 | 2.9% | 2.5% | $0 | Above benchmark | **KEEP** | — | 28 days |
| Trail Runner | 200 | 6.0% | 2.6% | ~$140 | Below session floor | **WATCH** | — | 28 days |

Note how the ranking *inverts* the gut read: the scary 6.0%-vs-benchmark page (Trail Runner) is irrelevant on volume, and the "worst rate" page (Linen Shirt) is a stock problem masquerading as a page problem. The real money is the boring-looking 0.9% page that happens to get the most traffic.

## Common Failure Modes

- Sorting by worst conversion rate and burning a week on pages nobody visits.
- Using one site-wide benchmark CVR, so sale and cold-paid PDPs get judged against the wrong bar.
- Calling a stockout or pre-order PDP "broken" and rewriting a page that's fine.
- "Fixing" the PDP when add-to-cart is healthy and the real leak is checkout.
- Ranking on revenue at risk instead of contribution — high-revenue, low-margin pages jump the queue they don't deserve.
- Trusting CVR when GA4 purchases and store orders never reconciled.

## Run This Play With Live Data

**Manual version:** export the GA4 per-PDP report and the catalog, join them on handle/URL by hand, reconcile tracking, compute recoverable revenue per page, then read each micro-funnel — every week.

**ShopMCP version:** connect GA4 and your store once. Ask the question; ShopMCP pulls per-PDP sessions, add-to-cart, and purchases from GA4, joins them to live catalog price, margin, stock-by-variant, reviews, and image count, runs the tracking gate and the recoverable-revenue ranking, applies the stock and intent vetoes, and returns the ranked REFRESH/FIX/WATCH/KEEP queue with a driver per page. It stays **read-only** until you explicitly approve a change.

> No GA4 or store connection inside your AI assistant? That page-level join across analytics and your catalog is the wall every manual run hits. ShopMCP *is* that connection — and the same playbook runs in one prompt instead of an afternoon of VLOOKUPs.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the PDP Improvement List play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual GA4 exports and catalog dumps, and the stale CSVs they become.
- Hand-joining GA4 page paths to store product handles every week.
- Re-deriving per-page benchmarks and the recoverable-revenue math by hand.
- Guessing whether a low CVR is a page problem, a stock problem, or an intent problem.

---

*Contributed by [Perceptiv](https://perceptiv.digital).*
