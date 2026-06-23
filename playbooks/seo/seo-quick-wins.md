---
slug: "seo-quick-wins"
title: "SEO Quick Wins"
operating_question: "Which organic search wins are close enough to act on now?"
primary_persona: "seo"
personas: ["seo"]
category: "seo-demand-capture"
platforms: ["google-search-console"]
cadence: "weekly"
public_tier: "launch"
contributed_by: "Perceptiv"
---

# SEO Quick Wins

## Operating Question

**Which organic search wins are close enough to a breakthrough that a single edit this week turns existing impressions into incremental revenue — and which "almost there" rankings are mirages I should leave alone?**

This is the *upside* play, not the decay play. It does not hunt for pages that are falling — a separate play does that. It mines Google Search Console for demand you have *already earned but are not yet capturing*: queries and pages parked at the bottom of page one or the top of page two, where a one-position gain is worth a disproportionate click jump; high-impression queries bleeding clicks to a weak title or meta; and near-miss SERP features (featured snippet, People Also Ask, AI Overview) you are one structural change away from owning. The skill is not finding "low-ranking keywords." It is **separating a striking-distance win from a no-demand decoy**, then ranking the real ones by `impressions × commercial intent × proximity to a breakthrough position` and mapping each to a money page. It forces a per-opportunity **WIN / REFRESH / WATCH / KEEP / FIX** call.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your Search Console, so it cannot see a single impression, position, or CTR. To run this manually you have to:

1. Pull the GSC **Queries** report *and* the **Pages** report for the same recent window (last 28 days is the cleanest — it avoids the weekly seasonality wobble of a 7-day pull), filtered to web search only.
2. Filter to the **striking-distance band** — average position roughly 5–15 — *and* set an impressions floor, because position 8 on a query with 40 impressions a month is not a "win," it is rounding error.
3. Join queries to their landing pages, because GSC's Queries tab and Pages tab don't show each other by default — and the title/meta you'll rewrite lives on the *page*, while the demand signal lives on the *query*.
4. Benchmark each query's CTR against the **expected CTR for its position** (position 4 should pull roughly 7–10% organic CTR; if yours is 2%, the SERP snippet is the leak), then sanity-check whether an AI Overview or a feature box is eating the clicks before you blame the title.
5. Layer commercial intent and a money page on top, because GSC has no idea which of these queries a shopper types with a credit card out versus a researcher who will never buy.

**The thinking in this playbook is free. The data access is the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live line into Search Console, that wall is where manual runs stop. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** SEO / Content Lead.
- **Also useful for:** Ecommerce Manager (which category/PLP pages are one push from page-one top spots), Head of Marketing (cheapest incremental revenue this quarter — no media spend), the copywriter who will rewrite the titles and metas.
- Run it **before** you commission new content. The fastest organic revenue is almost never a net-new page; it is a page you already rank with on page two. This play finds those first.

## When To Run It

- **Cadence:** weekly — a fast scan of the top revenue pages and their striking-distance queries. Run a deeper full-catalogue pass monthly.
- **Triggers:** a new product or category indexed and starting to gain impressions (catch it at position 11 before a competitor does); a title/template change shipped two weeks ago you now want to measure; a quiet quarter where you need revenue without ad budget; a seasonal category warming up where small rank gains compound fast.
- **Pre-requisite:** confirm GSC is reporting cleanly and the window is not distorted by a tracking gap, a recent migration, or a Google core update still settling. A position that is mid-flight up or down is not "striking distance" — it is noise. Let it stabilise for a week first.

## Required Evidence

- **GSC Queries report** — query, clicks, impressions, CTR, average position, for the last 28 days. This is the demand-and-proximity layer.
- **GSC Pages report** — page, clicks, impressions, CTR, average position, same window. This is the money-page layer.
- **GSC query→page mapping** — for each striking-distance query, the URL that actually ranks for it (GSC: filter Queries by a single page, or filter Pages by a single query). You cannot write a fix without knowing the page.
- **An impressions floor** — your own threshold for "enough demand to matter." A practical default: ≥ 250 impressions / 28 days for a query, ≥ 1,000 for a page. Below the floor, ignore the position.

## Optional Evidence (changes the answer when present)

- **Commercial intent tag per query** — transactional ("buy", "best", "[product] for sale", model numbers) vs. informational ("how to", "what is"). Intent decides whether a rank gain becomes revenue or just traffic.
- **Money-page map** — does the ranking URL sell something, or is it a blog post? An informational page at position 6 is a *KEEP*, not a *WIN*, unless you can route its demand to a product or category.
- **Current SERP layout for the query** — is there an AI Overview, a feature box, a shopping pack, or 4 ads above the fold? CTR is set by SERP real estate as much as by your title.
- **Existing title/meta + on-page H1** — so the rewrite targets the actual query a shopper uses, not the one you wish they used.
- **Internal-link inventory to the target page** — the cheapest lever to nudge a position-11 page onto page one is usually three contextual internal links from high-authority pages.
- **Keyword volume / difficulty** — to weight a borderline win by how big the prize is once you break through.

## How To Pull This Evidence

- **GSC Search results export (Queries + Pages).** In Google Search Console open *Performance → Search results*, set the date range to the last 28 days, and switch on the **Average CTR** and **Average position** toggles so every row carries clicks, impressions, CTR, and position together. Export the **Queries** tab and the **Pages** tab separately (Export → Google Sheets / CSV) — they don't show each other's dimension by default, which is why you pull both.
- **Striking-distance filter (position 5–15).** Sort or filter the Queries export by Average position and keep only rows between ~5 and ~15 — the band where one or two positions of movement produces the biggest click delta. Always pair the position filter with your impressions floor: a position-8 query with 40 impressions is rounding error, not a striking-distance win.
- **Commercial-intent / money-page gotcha.** GSC has no idea which queries a buyer types versus a researcher, and the position-5–15 list is full of informational pages that will never convert. Before you forecast revenue, tag each surviving query transactional vs. informational and confirm the ranking URL either *is* a money page or can route demand to one — otherwise a "win" is just traffic.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Gate on stability and demand.** Drop any query/page below your impressions floor — no demand, no win. Drop anything whose position is visibly mid-move (check the trend, not just the 28-day average); judge it next week. A position-9 query with 80 impressions is a decoy, not an opportunity.
2. **Find the proximity layer.** Isolate queries/pages at **average position ~5–15**. This is the band where one or two positions of movement produces the largest click delta — moving from 8 to 4 can roughly triple clicks; moving from 25 to 21 changes almost nothing. Rank within the band by impressions.
3. **Split the win type.** Each opportunity is one of three shapes, and each has a *different* fix:
   - **Rank-gap win** — strong impressions, position 6–15, CTR roughly normal for that position → the page is *visible but not high enough*. Fix = on-page depth + internal links + (sometimes) a link build. Status **WIN**.
   - **Snippet/CTR win** — position 3–8 but CTR well below the expected curve for that position → the page *ranks fine but the SERP listing is weak*. Fix = title + meta rewrite to match query intent, add structured data. Fastest possible win — no rank change required. Status **WIN** (or **REFRESH** if the page body also undersells).
   - **Feature-box win** — page already ranks 1–5, a PAA / featured-snippet / AI Overview sits above it, and the query is answerable in 40–60 words → restructure the page to win the box (concise answer block, schema, clean heading). Status **WIN**.
4. **Overlay commercial intent and the money page.** Re-rank by `impressions × intent × proximity`, not impressions alone. A transactional query at position 7 outranks a higher-impression informational query at position 6 every time. If the ranking URL can't convert and can't route demand to one that can, downgrade.
5. **Apply the vetoes**, then assign status + owner + a recheck date (rank moves take 2–6 weeks to read).

## Manual Workflow

1. Export GSC **Queries** and **Pages** for the last 28 days, web search only. Use the GSC API or Looker Studio if you exceed the 1,000-row UI cap.
2. Filter both to **average position 5–15** and apply your impressions floor. Discard the rest.
3. For each surviving query, find its ranking page (filter by page, read the top queries) and write the pairing into one row.
4. Compute each query's **CTR gap**: actual CTR minus the expected CTR for its position. A large negative gap flags a snippet/CTR win.
5. Tag commercial intent and confirm the ranking URL is (or can route to) a money page.
6. Eyeball the live SERP for your top 10 candidates — note AI Overviews and feature boxes that change the math.
7. Paste the prompt below with your tables. Rank, assign the win type and fix, and build the action packet with owner and recheck date.

## Copy-Paste Prompt

```text
You are my SEO analyst running the "SEO Quick Wins" play. The goal is UPSIDE, not decay:
find organic wins already within reach and rank them by how fast they convert existing
impressions into incremental revenue.

I will paste: a GSC Queries table and a GSC Pages table (query/page, clicks, impressions,
CTR, avg position, 28-day window), a query->page mapping, my impressions floor, and where I
have it, a commercial-intent tag and a money-page flag per row. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical input is
GSC query/page data carrying impressions AND average position AND CTR together -
striking-distance math needs impressions (a position 5-15 row with no impressions isn't a
win, it's rounding error), and the snippet/CTR call needs CTR against position. If that
critical input is missing, STOP and return only (a) what's missing and (b) how to get it -
never estimate impressions, position, or CTR, and never proceed on assumed demand.

RULES:
- Only consider rows at avg position ~5-15 AND above my impressions floor. Everything else
  is no-demand or out-of-band: exclude it and say so. Do not invent demand.
- Classify each opportunity as one of: RANK-GAP (visible but not high enough -> depth +
  internal links), SNIPPET/CTR (ranks fine, CTR far below the expected curve for its
  position -> title/meta rewrite), or FEATURE-BOX (ranks 1-5, a snippet/PAA/AI Overview sits
  above -> restructure to win the box). Name the win type for every row.
- For CTR judgments, compare actual CTR to a reasonable expected CTR for that position
  (e.g. ~7-10% at position 4) and flag the gap as the evidence. Do not call a CTR "low"
  without the position-adjusted benchmark.
- Re-rank by impressions x commercial intent x proximity to a breakthrough position. A
  transactional query near the page-one cutoff beats a higher-impression informational one.
- A win must map to a money page or a page that can route demand to one. An informational
  page ranking fine with no commercial path is KEEP, not WIN.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence.

RETURN:
1. A 3-sentence executive read: total est. incremental clicks/mo within reach and the
   single fastest win.
2. A ranked table using exactly this header row:
   | Query / Page | Position | Impressions (28d) | CTR vs expected | Intent | Win type | Est. clicks gained / mo | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any row.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a WIN.
```

## Decision Rules

- **WIN** — average position ~5–15 (or 1–5 with a winnable feature box), impressions above the floor, a clear win type (rank-gap / snippet-CTR / feature-box), a named single fix, and a money page (or a routable path to one). The estimated incremental clicks must beat the effort to ship the fix.
- **REFRESH** — the page is in the band and the demand is real, but the fix is bigger than a title tweak (thin body, weak match to query intent, outdated content). The win is there but it is a content job, not a quick edit.
- **WATCH** — directional only: in the band but below the impressions floor, position visibly mid-move, or the SERP layout is in flux (a new AI Overview just appeared and CTR has not settled).
- **KEEP** — already ranking well with CTR at or above the expected curve, or an informational page with no commercial path; nothing to gain from touching it.
- **FIX** — GSC is reporting incompletely, the query→page mapping is ambiguous, or a tracking/migration gap makes the position untrustworthy.
- Every recommendation carries a **number, source, time window, and confidence level**.

## Veto Rules

- Do **not** call a position-5–15 page a win if it sits below your impressions floor — that is no demand, not a near-miss. Rank without demand is vanity.
- Do **not** count **branded queries** (your name, your product names) as wins. You already own that demand; a rank gain there is not incremental.
- Do **not** promise revenue from an **informational** ranking unless you can route its demand to a commercial page. Position ≠ purchase intent.
- Do **not** blame a low CTR on the title without checking the **SERP layout** — an AI Overview, a feature box, or an ad stack can cap organic CTR no matter how good your snippet is.
- Do **not** treat a position that is **still moving** as striking distance; a page mid-climb or mid-fall needs a stable week before you judge it.
- Do **not** ship a title rewrite without a before/after baseline and a recheck date — and never push a write, edit, or republish without explicit human approval.

## Output Contract

A ranked striking-distance opportunity list, each row mapped to a money page, a win type, and a single named fix.

Minimum table columns:

| Query / Page | Position | Impressions (28d) | CTR vs expected | Intent | Win type | Est. clicks gained / mo | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| "merino base layer" → /collections/base-layers | 8.3 | 9,100 | 1.4% vs ~3% | Transactional | Rank-gap | +480 | WIN | SEO + Web | 21 days |

## Worked Example

> **Executive read:** Three striking-distance opportunities put roughly **+760 incremental organic clicks/month** within reach with zero media spend, all on pages we already rank. The single fastest win is a title rewrite on a position-4 product query leaking clicks at 2.1% CTR — no rank change needed, ship it today. The category-page rank-gap is the biggest prize but takes 3–4 weeks to read.

| Query / Page | Position | Impressions (28d) | CTR vs expected | Intent | Win type | Est. clicks gained / mo | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| "merino base layer womens" → /collections/womens-base-layers | 8.3 | 9,100 | 1.4% vs ~3% | Transactional | Rank-gap | +380 | **WIN** | SEO + Web | 28 days |
| "thermal leggings fleece lined" → /products/arctic-fleece-legging | 4.0 | 6,400 | 2.1% vs ~8% | Transactional | Snippet/CTR | +290 | **WIN** | SEO (title rewrite) | 14 days |
| "how to layer for skiing" → /blog/ski-layering-guide | 12.0 | 5,200 | 3.0% vs ~3% | Informational | Rank-gap | +90 | **REFRESH** | Content | 28 days |
| "best merino base layer" → /blog/base-layer-guide | 6.0 | 4,800 | 4.0% vs ~5% | Commercial-research | Feature-box | — | **WATCH** | SEO | 14 days |
| "[brand] base layer" → /collections/all | 2.0 | 3,300 | 9.0% vs ~9% | Branded | — | — | **KEEP** | — | 90 days |
| "base layer mens" → (two URLs splitting the query) | 9.0 / 11.0 | 7,700 | low | Transactional | Rank-gap | unclear | **FIX** | SEO | Now |

Note how the answer *inverts* the obvious read: the biggest-impression branded query is a **KEEP** (demand already captured, not incremental), the lowest-effort win is the position-4 product query (a 2.1% CTR at position 4 is leaking clicks a title rewrite recovers without moving rank at all), and the mens query is parked at **FIX** because two URLs are splitting the same demand — that is a canonicalisation/merge job before any "win" math is valid.

## Common Failure Modes

- Sorting GSC by position ascending and "fixing" position-5–15 rows that have 30 impressions — chasing rank where there is no demand.
- Calling a CTR "bad" without benchmarking it against the expected CTR for that exact position.
- Counting branded queries as wins and inflating the forecast.
- Blaming a weak title when an AI Overview or feature box is the real cap on organic clicks.
- Forecasting revenue off an informational page that has no path to a product.
- Acting on a position that is still mid-flight, then claiming credit (or blame) for a move that was already happening.

## Run This Play With Live Data

**Manual version:** export the GSC Queries and Pages reports, filter to the 5–15 band above your impressions floor, hand-join every query to its page, compute the CTR-vs-expected gap row by row, eyeball the live SERP for feature boxes — every single week.

**ShopMCP version:** connect Search Console once. Ask the question; ShopMCP pulls the live Queries and Pages data, isolates the striking-distance band above your floor, classifies each opportunity as a rank-gap / snippet-CTR / feature-box win, benchmarks CTR against the position-expected curve, maps each query to its ranking page, and returns the ranked WIN/REFRESH/WATCH/KEEP/FIX table with estimated incremental clicks. It stays **read-only** until you explicitly approve a title rewrite or content change.

> No Search Console connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of one spreadsheet-afternoon.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the SEO Quick Wins play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual GSC exports and the 1,000-row UI cap.
- Hand-joining the Queries report to the Pages report to find which URL ranks for each query.
- Computing the CTR-vs-position-expected gap for every row by hand.
- Rebuilding the same striking-distance scan every week.

---

*Contributed by [Perceptiv](https://perceptiv.digital).*
