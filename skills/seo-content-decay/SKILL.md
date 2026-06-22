---
name: seo-content-decay
description: "When an ecommerce operator needs to decide: Which pages are losing demand and are worth refreshing? Runs the SEO Content Decay Watch play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'SEO Content Decay', 'Google Search Console', 'Google Analytics 4', 'Seo Demand Capture'."
license: CC-BY-4.0
metadata:
  persona: SEO / Content Lead
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# SEO Content Decay Watch

**Operating question:** Which pages are losing demand and are worth refreshing?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Google Search Console — Pages report**, last 90 days vs. prior 90 days (or YoY): clicks, impressions, average position, and the click/impression **deltas** per landing page. YoY is the safer comparison for any seasonal catalogue.
- **Google Search Console — Queries report** for the decaying pages: the same clicks / impressions / position deltas at query level, so you can attribute the page's drop to a specific cause and a specific term.
- **GA4 — landing-page report** filtered to Organic Search: sessions, conversions/purchases, and revenue per landing page, same windows. This is what converts a "clicks lost" number into a "revenue at risk" number.
- **Page type / intent** for each affected URL (category/PLP, product/PDP, buying-guide, blog/informational) — you cannot rank by commercial value without it.

Optional, if available:

- **SERP feature / AI Overview presence** for the head queries (a manual check, or a rank tracker) — the difference between "CTR fell because of content" and "CTR fell because Google added an AI Overview above me."
- **Publish / last-updated dates** and any recent on-page edits — freshness decay vs. a self-inflicted regression from a recent change.
- **A known Google update timeline** (core, helpful-content, reviews) lined up against the date the drop started — turns a vague "it's decaying" into "it dropped the week of the March core update."
- **Internal-link and backlink changes** to the page — lost internal links or lost referring domains are a common, fixable cause of a position drop.
- **Cannibalisation map** — which other URLs on your own site also rank for the page's head query.

## How to decide — in order

1. **Gate on trust and scope.** First ask: is this a *page-level* loss or a *sitewide* one? If organic is down broadly across unrelated page types at once, this is an **algorithm or technical event** (core update, manual action, robots/noindex regression, migration), not content decay — mark **FIX**, escalate to a sitewide diagnosis, and stop. Page-by-page refreshes will not fix a sitewide cause.
2. **Quantify the loss, not the noise.** Keep only pages whose **clicks dropped meaningfully** — e.g. a fall of **≥ 20% clicks AND ≥ ~50 absolute clicks per period** so you are not chasing a page that went from 4 clicks to 2. Below that floor it is **WATCH** at most.
3. **Attribute the cause** — for each surviving page, decompose the drop into one of four, using the query-level data:
   - **(a) Lost ranking** — average position got materially *worse* (e.g. 4.2 → 9.8) on the money queries. Demand is still there; you fell down the page. Cause: content staleness, lost links, a competitor outranking you, or a Google update. → **REFRESH** (content + internal links + freshness).
   - **(b) Lost demand / seasonality** — **impressions down, position roughly held.** Fewer people are searching; you still rank fine. The market shrank. → **KEEP / WATCH**. *Do not refresh — you cannot rewrite your way back to demand that left.*
   - **(c) SERP-layout / AI-Overview / CTR loss** — **impressions roughly held, position held, but CTR dropped.** An AI Overview, a featured snippet you lost, or more ads/widgets made the SERP less clickable. → **FIX** the title/snippet/schema, or accept it if the SERP itself changed. *Not a content-depth problem.*
   - **(d) Cannibalisation** — two or more of your URLs trade impressions for the same query and both underperform. → **FIX** by consolidating (canonical/redirect/merge to one stronger page).
4. **Score recoverability × value.** Estimate **recoverable clicks** (for ranking losses, roughly the clicks you'd regain getting back to the prior position using GSC's CTR-by-position curve; for seasonality, ~zero) and multiply by **commercial value** of the page type. A category or high-intent buying-guide page that drives revenue outranks a low-intent informational blog post that never converts — even if the blog lost more raw clicks.
5. **Rank and assign.** Sort by recoverable value, apply the vetoes, then give each page a status + owner + recheck date.

## The prompt to run

```text
You are my SEO/content analyst running the "SEO Content Decay Watch" play.

GOAL: decide, per page, whether to REFRESH, FIX, WATCH, KEEP, or KILL — ranked by
RECOVERABLE clicks x commercial value, not by raw clicks lost. The hard part is
naming WHY each page dropped, because each cause has a different fix.

I will paste: a GSC Pages table (clicks / impressions / avg position, this period vs.
prior period or YoY), a GSC Queries table for the decaying pages, and where available
GA4 organic sessions/conversions/revenue per landing page, plus the page type for each
URL. Some data may be missing.

RULES:
- Scope gate first: if the drop looks sitewide across unrelated page types, call it an
  algorithm/technical event (FIX + escalate), not page-level decay, and say so.
- Only diagnose pages past a real loss floor (>=20% clicks AND >=~50 clicks/period).
  Below that, WATCH at most.
- Attribute every decaying page to exactly one cause using the query data:
  (a) LOST RANKING = position got worse, demand held -> REFRESH.
  (b) LOST DEMAND/SEASONALITY = impressions down, position held -> KEEP/WATCH, do NOT refresh.
  (c) SERP/AI-OVERVIEW/CTR LOSS = impressions held, position held, CTR fell -> FIX title/snippet/schema.
  (d) CANNIBALISATION = two of my URLs split one query -> FIX by consolidating.
- Estimate recoverable clicks (≈0 for seasonality) and weight by commercial value
  (category/PDP/high-intent guide > low-intent blog). Rank by recoverable value.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked table: Page | Clicks delta | Impr delta | Avg pos delta | Cause |
   Recoverable value | Action | Owner | Recheck.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **REFRESH** — average position got materially worse on the money queries while impressions (demand) held, the page drives or can drive revenue, and there is a credible lever (stale content, lost links, thinner than the pages now outranking it). This is the only status that justifies rewriting.
- **FIX** — the drop is a SERP/CTR change (AI Overview, lost snippet) needing a title/schema fix; OR cannibalisation needing consolidation; OR the loss is sitewide/tracking-driven and needs escalation, not a page edit.
- **WATCH** — directional only: under the loss floor, an unclean comparison window (promo, migration, partial-data days), or a drop that started too recently to separate from normal volatility.
- **KEEP** — impressions fell to seasonality or a genuine market contraction while position held; the page is doing its job and there is nothing to recover. Leave it; revisit next season.
- **KILL** — a thin, off-strategy, non-converting page with collapsed and unrecoverable demand that is also a crawl/quality drag (consolidate into a better page or prune/redirect).
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** "refresh" a page that lost **demand to seasonality** (impressions down, position held). You cannot rewrite your way back to searches that left the market — that effort is wasted.
- Do **not** mistake a **SERP-layout or AI-Overview change** (impressions and position held, CTR fell) for content decay. The page didn't get worse; the SERP got less clickable. Fix the snippet, don't commission a rewrite.
- Do **not** prioritise a page by raw clicks lost without checking **commercial value** — a buying guide that lost 40 clicks but drives revenue beats a viral-but-irrelevant blog post that lost 4,000 clicks and never converted.
- Do **not** treat a **sitewide drop** as page-level decay. Broad, simultaneous losses across unrelated page types are an algorithm or technical issue; page-by-page refreshes won't fix it.
- Do **not** diagnose on a **polluted comparison window** (migration, deindex, analytics outage, a promo spike in the prior period). Re-run on a clean window first.
- Do **not** commission writes, redirects, consolidations, or deindexing without an explicit human approval step.

## Output

A per-page decision list ranked by **recoverable clicks × commercial value**, not by raw clicks lost:

| Page | Clicks Δ | Impr Δ | Avg pos Δ | Cause | Recoverable value | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| /collections/running-shoes | −38% | −6% | 3.1 → 7.4 | Lost ranking | High (category, revenue) | REFRESH | SEO + Writer | 21 days |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/seo-content-decay) — it executes this play read-only by default and applies changes only on your approval.
