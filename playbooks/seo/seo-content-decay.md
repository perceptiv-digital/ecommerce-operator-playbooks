---
schema_version: 1
slug: "seo-content-decay"
title: "SEO Content Decay Watch"
summary: "SEO Content Decay Watch helps ecommerce operators answer: Which pages are losing demand and are worth refreshing?"
operating_question: "Which pages are losing demand and are worth refreshing?"
short_title: "SEO Content Decay"
primary_persona: "seo"
personas: ["seo", "marketing"]
category: "seo-demand-capture"
platforms: ["google-search-console", "google-analytics-4"]
cadence: "weekly"
difficulty: "intermediate"
manual_time_minutes_min: 45
manual_time_minutes_max: 90
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: true
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/seo-content-decay"
shopmcp_prompt: "Run the SEO Content Decay Watch play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# SEO Content Decay Watch

## Operating Question

**Which pages are losing organic demand, *why* are they losing it, and which of those losses are actually recoverable enough to be worth a refresh?**

Most "content decay" lists are just a sorted clicks-down report — and acting on one straight is how teams burn a quarter rewriting blog posts while the market quietly moved on. The skill in this play is not spotting that clicks fell. It is **separating the four causes of a click drop**, because each has a different fix and three of them are *not* "rewrite the page." A page that lost rankings needs content and links. A page that lost demand to seasonality needs you to leave it alone. A page that held rank but lost clicks to an AI Overview needs a snippet or schema change, not a rewrite. Two pages splitting one query need to be *merged*, not refreshed. This play forces a per-page **REFRESH / FIX / WATCH / KEEP / KILL** call, ranked by **recoverable clicks × commercial value** — not by raw traffic lost.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your Google Search Console or GA4, so it cannot see a single click, impression, or position. To run this manually you have to:

1. Pull GSC **Pages** *and* **Queries** for a recent window (say last 90 days) and the comparison window (prior 90 days, or the same 90 days last year to control for seasonality) — and GSC's UI caps at 1,000 rows per export, so large sites need the API or Looker Studio.
2. Join page-level deltas to query-level deltas, because the page table tells you *that* clicks fell and only the query table tells you *why* (position vs. impressions vs. CTR).
3. Diff **average position** carefully — it is a blended, impression-weighted average across every query the page ranks for, so a "stable" page average can hide one money query that fell off a cliff.
4. Layer GA4 revenue/conversion per landing page on top, because GSC has no idea which of these pages actually makes money.

**The thinking in this playbook is free. The data access is the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live line into Search Console and GA4, that wall is where manual runs stop. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** SEO / Content Lead
- **Also useful for:** Head of Marketing (where is organic revenue leaking?), Ecommerce Manager (which category/PLP pages are slipping), the content writer who will execute the actual refresh.
- Run it **before** you commission any refresh work — the output is the brief that tells writers which pages to touch and which to leave.

## When To Run It

- **Cadence:** weekly for a quick scan of the top revenue pages; a deeper full-catalogue pass monthly or quarterly.
- **Triggers:** a step-down in organic sessions in GA4, a Google core or "helpful content" update rolling out, a site migration or replatform, a seasonal category coming out of peak, or a quarter-end content-budget decision.
- **Pre-requisite:** confirm GSC and GA4 are reporting cleanly and the comparison window is not polluted by a known incident (migration, deindex, analytics outage). Never diagnose decay on top of a tracking gap — you will "fix" pages that never actually dropped.

## Required Evidence

- **Google Search Console — Pages report**, last 90 days vs. prior 90 days (or YoY): clicks, impressions, average position, and the click/impression **deltas** per landing page. YoY is the safer comparison for any seasonal catalogue.
- **Google Search Console — Queries report** for the decaying pages: the same clicks / impressions / position deltas at query level, so you can attribute the page's drop to a specific cause and a specific term.
- **GA4 — landing-page report** filtered to Organic Search: sessions, conversions/purchases, and revenue per landing page, same windows. This is what converts a "clicks lost" number into a "revenue at risk" number.
- **Page type / intent** for each affected URL (category/PLP, product/PDP, buying-guide, blog/informational) — you cannot rank by commercial value without it.

## Optional Evidence (changes the answer when present)

- **SERP feature / AI Overview presence** for the head queries (a manual check, or a rank tracker) — the difference between "CTR fell because of content" and "CTR fell because Google added an AI Overview above me."
- **Publish / last-updated dates** and any recent on-page edits — freshness decay vs. a self-inflicted regression from a recent change.
- **A known Google update timeline** (core, helpful-content, reviews) lined up against the date the drop started — turns a vague "it's decaying" into "it dropped the week of the March core update."
- **Internal-link and backlink changes** to the page — lost internal links or lost referring domains are a common, fixable cause of a position drop.
- **Cannibalisation map** — which other URLs on your own site also rank for the page's head query.

## How To Pull This Evidence

- **GSC period-over-period deltas (the critical input)** — in Search Console → Performance, open the **Pages** tab, set the date range to **Last 90 days** and toggle **Compare** to the **previous 90 days** (or, for any seasonal catalogue, the **same 90 days last year** / YoY). Enable the Clicks, Impressions, **and** Position checkboxes so the export carries the period-over-period change per page. Repeat on the **Queries** tab, filtered to each decaying page, to get the same clicks/impressions/position deltas at query level — that query view is what lets you separate lost ranking from lost demand. Export to Looker Studio or the API when you have more than ~1,000 rows.
- **GA4 page value** — in GA4 → Reports → Engagement → **Landing page** (or Explore with the *Landing page* dimension), add a filter for **Session default channel group = Organic Search**, and pull **Sessions, Conversions/Purchases, and Revenue** for the *same* two windows. Joining this per URL is what turns "clicks lost" into "revenue at risk" and lets you rank by commercial value rather than raw traffic.
- **Seasonality / SERP-layout gotcha** — a YoY (same-90-days-last-year) comparison is the only clean way to tell genuine decay from a seasonal trough; a previous-90-days window will flag every page coming out of peak as "decaying." Separately, when impressions and position both held but CTR fell, check the live SERP for an **AI Overview**, a lost featured snippet, or new ads/widgets before blaming the content — the page didn't get worse, the SERP got less clickable.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Gate on trust and scope.** First ask: is this a *page-level* loss or a *sitewide* one? If organic is down broadly across unrelated page types at once, this is an **algorithm or technical event** (core update, manual action, robots/noindex regression, migration), not content decay — mark **FIX**, escalate to a sitewide diagnosis, and stop. Page-by-page refreshes will not fix a sitewide cause.
2. **Quantify the loss, not the noise.** Keep only pages whose **clicks dropped meaningfully** — e.g. a fall of **≥ 20% clicks AND ≥ ~50 absolute clicks per period** so you are not chasing a page that went from 4 clicks to 2. Below that floor it is **WATCH** at most.
3. **Attribute the cause** — for each surviving page, decompose the drop into one of four, using the query-level data:
   - **(a) Lost ranking** — average position got materially *worse* (e.g. 4.2 → 9.8) on the money queries. Demand is still there; you fell down the page. Cause: content staleness, lost links, a competitor outranking you, or a Google update. → **REFRESH** (content + internal links + freshness).
   - **(b) Lost demand / seasonality** — **impressions down, position roughly held.** Fewer people are searching; you still rank fine. The market shrank. → **KEEP / WATCH**. *Do not refresh — you cannot rewrite your way back to demand that left.*
   - **(c) SERP-layout / AI-Overview / CTR loss** — **impressions roughly held, position held, but CTR dropped.** An AI Overview, a featured snippet you lost, or more ads/widgets made the SERP less clickable. → **FIX** the title/snippet/schema, or accept it if the SERP itself changed. *Not a content-depth problem.*
   - **(d) Cannibalisation** — two or more of your URLs trade impressions for the same query and both underperform. → **FIX** by consolidating (canonical/redirect/merge to one stronger page).
4. **Score recoverability × value.** Estimate **recoverable clicks** (for ranking losses, roughly the clicks you'd regain getting back to the prior position using GSC's CTR-by-position curve; for seasonality, ~zero) and multiply by **commercial value** of the page type. A category or high-intent buying-guide page that drives revenue outranks a low-intent informational blog post that never converts — even if the blog lost more raw clicks.
5. **Rank and assign.** Sort by recoverable value, apply the vetoes, then give each page a status + owner + recheck date.

## Manual Workflow

1. Export the GSC **Pages** report for last 90 days vs. prior 90 (or YoY), sorted by click delta. Export the **Queries** report for the worst-hit pages.
2. Export the GA4 organic-landing-page report (sessions, conversions, revenue) for the same windows and join it to the GSC pages by URL.
3. Run the scope gate (step 1 of the Decision Logic): is the drop sitewide or page-level? If sitewide, stop and switch to a sitewide diagnosis.
4. For each page over the loss floor, pull its query deltas and tag the cause — (a) ranking, (b) demand, (c) CTR/SERP, (d) cannibalisation — using the position vs. impressions vs. CTR pattern.
5. Estimate recoverable clicks and overlay commercial value (page type + GA4 revenue).
6. Paste the prompt below with your two tables (page-level deltas and query-level deltas for the decayers).
7. Pressure-test every REFRESH against the veto list, then convert the survivors into a refresh brief with owner and recheck date.

## Copy-Paste Prompt

```text
You are my SEO/content analyst running the "SEO Content Decay Watch" play.

GOAL: decide, per page, whether to REFRESH, FIX, WATCH, KEEP, or KILL — ranked by
RECOVERABLE clicks x commercial value, not by raw clicks lost. The hard part is
naming WHY each page dropped, because each cause has a different fix.

I will paste: a GSC Pages table (clicks / impressions / avg position, this period vs.
prior period or YoY), a GSC Queries table for the decaying pages, and where available
GA4 organic sessions/conversions/revenue per landing page, plus the page type for each
URL. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the GSC
period-over-period clicks/impressions/position deltas per page (this period vs. prior
period or YoY) are missing, STOP and return only (a) what's missing and (b) how to get
it — never estimate it or proceed. Without that delta you cannot separate lost ranking
from lost demand/seasonality, which is the entire job.

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
2. A ranked table using exactly this header row:
   | Page | Clicks Δ | Impr Δ | Avg pos Δ | Cause | Recoverable value | Action | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace
   the table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision Rules

- **REFRESH** — average position got materially worse on the money queries while impressions (demand) held, the page drives or can drive revenue, and there is a credible lever (stale content, lost links, thinner than the pages now outranking it). This is the only status that justifies rewriting.
- **FIX** — the drop is a SERP/CTR change (AI Overview, lost snippet) needing a title/schema fix; OR cannibalisation needing consolidation; OR the loss is sitewide/tracking-driven and needs escalation, not a page edit.
- **WATCH** — directional only: under the loss floor, an unclean comparison window (promo, migration, partial-data days), or a drop that started too recently to separate from normal volatility.
- **KEEP** — impressions fell to seasonality or a genuine market contraction while position held; the page is doing its job and there is nothing to recover. Leave it; revisit next season.
- **KILL** — a thin, off-strategy, non-converting page with collapsed and unrecoverable demand that is also a crawl/quality drag (consolidate into a better page or prune/redirect).
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do **not** "refresh" a page that lost **demand to seasonality** (impressions down, position held). You cannot rewrite your way back to searches that left the market — that effort is wasted.
- Do **not** mistake a **SERP-layout or AI-Overview change** (impressions and position held, CTR fell) for content decay. The page didn't get worse; the SERP got less clickable. Fix the snippet, don't commission a rewrite.
- Do **not** prioritise a page by raw clicks lost without checking **commercial value** — a buying guide that lost 40 clicks but drives revenue beats a viral-but-irrelevant blog post that lost 4,000 clicks and never converted.
- Do **not** treat a **sitewide drop** as page-level decay. Broad, simultaneous losses across unrelated page types are an algorithm or technical issue; page-by-page refreshes won't fix it.
- Do **not** diagnose on a **polluted comparison window** (migration, deindex, analytics outage, a promo spike in the prior period). Re-run on a clean window first.
- Do **not** commission writes, redirects, consolidations, or deindexing without an explicit human approval step.

## Output Contract

A per-page decision list ranked by **recoverable clicks × commercial value**, not by raw clicks lost:

| Page | Clicks Δ | Impr Δ | Avg pos Δ | Cause | Recoverable value | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| /collections/running-shoes | −38% | −6% | 3.1 → 7.4 | Lost ranking | High (category, revenue) | REFRESH | SEO + Writer | 21 days |

## Worked Example

> **Executive read:** Of five decaying pages, only two are worth touching. The `/collections/running-shoes` category page lost rankings on its head terms while demand held — a clean REFRESH with the most recoverable revenue. The `/blog/winter-running-gear` post "decay" is pure seasonality (impressions down, position flat) and must be left alone; and the `best-running-shoes` guide didn't lose rank or demand at all — it lost CTR to an AI Overview, so the fix is a snippet/schema change, not a rewrite. Two of the five "losses" need zero content work.

| Page | Clicks Δ | Impr Δ | Avg pos Δ | Cause | Recoverable value | Action |
|---|---|---|---|---|---|---|
| /collections/running-shoes | −38% (−1,210) | −6% | 3.1 → 7.4 | **Lost ranking** (competitor overtook, content stale 14mo) | **High** — category, ~$9k/mo organic rev | **REFRESH** |
| /guides/best-running-shoes | −31% (−540) | +2% | 2.4 → 2.6 | **CTR/AI-Overview** — impressions & rank held, CTR 11.8% → 7.9% | **Medium** — high-intent guide | **FIX** (snippet/schema) |
| /blog/winter-running-gear | −72% (−2,140) | −70% | 4.0 → 4.3 | **Seasonality** — demand left, rank held | **~Zero** — out of season | **KEEP** |
| /products/trail-shoe-x + /collections/trail | −22% (−180) | flat | splitting "trail running shoes" | **Cannibalisation** — two URLs, one query | **Medium** | **FIX** (consolidate) |
| /blog/how-to-tie-shoes | −19% (−60) | −18% | 6.1 → 6.4 | Below loss floor, low intent, ~0 conversions | **Low** | **WATCH** |

Note how the answer *inverts* the raw report: the blog post that lost the **most** clicks (`winter-running-gear`, −2,140) is the one you do **nothing** about, while the category page that lost fewer absolute clicks but holds real recoverable revenue is the priority.

## Common Failure Modes

- Acting on a clicks-down report without ever separating *why* clicks fell — and rewriting pages that lost demand or CTR, not rankings.
- Reading the blended **average position** as if it were one number, missing that a single money query fell off page one while the average barely moved.
- Calling a seasonal trough "decay" and burning writer hours fighting the calendar.
- Mistaking an AI Overview / SERP-layout change for content decay and rewriting a page that never got worse.
- Prioritising by raw traffic lost instead of recoverable clicks × commercial value, so the team refreshes high-traffic, zero-revenue content.
- Diagnosing page-by-page during a sitewide core-update or migration event that needs a sitewide fix.

## Run This Play With Live Data

**Manual version:** export GSC Pages and Queries for two aligned windows, fight the 1,000-row cap, join page deltas to query deltas to attribute cause, then overlay GA4 revenue per landing page — every time you want a clean read.

**ShopMCP version:** connect Search Console and GA4 once. Ask the question; ShopMCP pulls live GSC page- and query-level deltas across your chosen windows (including YoY for seasonality), runs the scope gate, attributes each decaying page to one of the four causes from its position/impressions/CTR pattern, overlays GA4 revenue per landing page, and returns the per-page **REFRESH/FIX/WATCH/KEEP/KILL** table ranked by recoverable value. It stays **read-only** — it never edits a page, redirect, or canonical without explicit approval.

> No Search Console or GA4 connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of a spreadsheet afternoon of joins and row-cap workarounds.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the SEO Content Decay Watch play. Compare the last 90 days to the same 90 days last
year to control for seasonality, and rank pages by recoverable clicks x revenue. Read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual GSC exports, the 1,000-row cap, and stale CSVs.
- The page-delta ↔ query-delta join you'd otherwise rebuild by hand to attribute cause.
- Cross-referencing GA4 revenue per landing page to separate high-traffic from high-value.
- Guessing whether a drop is ranking, demand, SERP-layout, or cannibalisation.
- Rebuilding the same decay workflow every week.
