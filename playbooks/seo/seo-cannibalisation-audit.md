---
slug: "seo-cannibalisation-audit"
title: "SEO Cannibalisation Audit"
operating_question: "Which pages compete with each other for the same search demand?"
primary_persona: "seo"
personas: ["seo"]
category: "seo-demand-capture"
platforms: ["google-search-console"]
cadence: "monthly"
public_tier: "fast-follow"
---

# SEO Cannibalisation Audit

## Operating Question

**Which of my pages are competing against each other for the same query — splitting clicks, oscillating in rank, and leaving the term weaker than one consolidated page would be?**

Cannibalisation is not "two pages mention the same keyword." It is one query where Google can't decide which of *your* URLs deserves the slot, so it alternates between them, splits impressions across them, and parks all of them outside the positions that actually earn clicks. On an ecommerce site the classic shape is a category PLP, an old blog post, and sometimes a PDP or a thin tag page all chasing the same head term — none of them breaking the top 5, each stealing authority and internal-link equity the others need. This play finds those clusters in Google Search Console, names the rightful canonical winner, and forces one call per cluster: **consolidate (301), differentiate intent, de-optimise the loser, or fix internal-link / canonical signals.**

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no idea which of your URLs Google is showing for which query, on which day. The entire signal lives in Search Console, behind your login, and the diagnostic is comparative — you need the *same query* viewed across *multiple pages over time*. To do it by hand you have to:

1. Export the GSC **Queries** dimension and the **Pages** dimension for the same date range, then pivot them against each other (the default UI shows them one at a time, not crossed).
2. Filter to queries where **two or more URLs each cross a meaningful impression floor** for the same term.
3. Pull **page-level position history** week by week to catch the URL that Google keeps swapping in and out — a single 28-day average hides the oscillation completely.
4. Cross-check each candidate against the live SERP, your canonical tags, and your internal anchor text to tell real cannibalisation apart from intent-split or brand multi-ranking.

**The reasoning here is free. The cross-dimensional GSC data is the wall.** A generic chatbot with no line into Search Console can't even see the alternation, let alone judge it. The last section shows the one-prompt version once that wall is gone.

## Who Should Run It

- **Primary owner:** SEO / Content Lead
- **Also useful for:** Ecommerce Merchandiser (which PLP is the canonical commercial page), Content Editor (which blog posts to retire or redirect), Web/Dev (who executes the 301s and canonical fixes).
- Run it **before** you commission new content on a head term — you may already rank for it with three weak pages instead of one strong one.

## When To Run It

- **Cadence:** monthly. Cannibalisation builds slowly as you publish; a monthly sweep catches new clusters before they ossify.
- **Triggers:** a head term stuck at position 6–12 for months despite link-building; a page that "lost rankings" right after you published a related post; a site migration or re-platform that duplicated URLs; a tag/filter system generating near-duplicate facet pages.
- **Pre-requisite:** confirm GSC is verified at the **domain property** level (not a single URL-prefix property), or you will miss `www`/non-`www` and `http`/`https` variants splitting the same term.

## Required Evidence

- **GSC Queries × Pages cross-tab** — for each query, *every* URL on your site that receives impressions, with clicks, impressions, average position, and CTR, over the last **90 days** (28 days is too short to see oscillation; 16 months is the GSC ceiling if you want seasonality).
- **Page-level position history** — average position **week by week** for each candidate URL on the shared query, so you can see Google swapping which page it ranks.
- **Impression share within the cluster** — what percent of the query's total impressions each URL captures (e.g. 40 / 35 / 25). Even split across non-winning positions is the cannibalisation fingerprint.

## Optional Evidence (changes the answer when present)

- **The live SERP for the query** — does the result reflect different *intent* (a how-to vs. a buy page)? If so it may not be cannibalisation at all.
- **Canonical tags** on each candidate URL — a wrong or missing canonical is often the actual root cause.
- **Internal anchor text** pointing to each URL — if your own links send the head term to the weaker page, that's a fix, not a redirect.
- **Commerce value per URL** — sessions → revenue, so you consolidate *toward* the page that actually converts, not just the one with more impressions.
- **Publish / last-modified dates** — to tell a stale legacy post from the current canonical asset.

## How To Pull This Evidence

- **Per-query URL breakdown (the critical input):** in GSC **Performance → Search results**, add a **Query filter** for the head term, then open the **Pages** tab. Every URL listed there ranks for that one query — two or more above your impression floor is the cannibalisation signal. Repeat per head term, or export Queries and Pages and pivot URL × query.
- **Position oscillation:** for each candidate URL, open its **page-level history** and read **average position week by week** on the shared query. Genuine cannibalisation shows Google swapping which URL it ranks; a flat single-URL line does not. A 28-day average flattens this — always go weekly.
- **Impression split:** within one query, record what percent of the query's total impressions each URL captures (e.g. 41 / 34 / 25). An even split across non-winning positions is the fingerprint; one URL at 90%+ is noise, not a split.
- **Different-intent gotcha:** before calling a split, eyeball the live SERP and the query wording. A how-to query and a buy query sharing words are *different demand* — two pages serving them is correct coverage, not cannibalisation, and merging them destroys reach.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Confirm it's the same intent, not just the same words.** Read the query and the live SERP. A "how to clean X" informational query and a "buy X" commercial query are *different demand* — two pages serving them is correct, not cannibalisation. If intent differs, status is **KEEP both** and stop. This is the most common false positive.
2. **Confirm multiple URLs actually share the impressions.** Require **≥2 URLs each holding ≥15% of the query's impressions** over 90 days. One URL at 92% and another at 3% is not a split — that's normal long-tail noise.
3. **Confirm Google is alternating, not settled.** Check week-by-week position history. **Real cannibalisation oscillates** — URL A ranks one week, URL B the next, neither holding. If one URL is stably ranked and the others are pinned far below, it's weak duplication, not active swapping → **WATCH**, fix later.
4. **Exclude brand and navigational queries.** Your homepage, a brand PLP, and a brand PDP all ranking for "[brand] [product]" is healthy site presence, not cannibalisation. Never consolidate these.
5. **Name the rightful canonical winner.** Pick the URL with the **best intent match + highest commercial value + strongest existing authority** — usually the category PLP for a commercial head term, not the blog post that happens to rank.
6. **Check signals before reaching for a redirect.** Inspect canonicals and internal anchor text. If the loser canonicals to itself and your internal links point the head term at it, a **signal fix** may resolve the split with zero redirect risk. Only escalate to a 301 when the pages are genuinely redundant.
7. **Apply the vetoes**, then assign status + owner + recheck date.

## Manual Workflow

1. In GSC, open **Performance → Search results**, set the date range to **90 days**, and export both the **Queries** and **Pages** tables.
2. For your top head terms, filter the Pages view by each query (click the query, then the Pages tab) to list every URL ranking for it. Record impression share per URL.
3. For any query with ≥2 URLs above the 15% floor, open **page-level history** and read average position week by week to confirm oscillation.
4. Pull the live SERP, canonical tag, and internal anchor text for each candidate URL.
5. Classify each cluster against the decision logic: intent-split (keep), settled (watch), or active cannibalisation (act).
6. Paste the prompt below with your cluster tables.
7. Pressure-test every consolidate/redirect call against the veto list, then convert survivors into an action packet with the canonical winner, the loser's fate, owner, and recheck date.

## Copy-Paste Prompt

```text
You are my technical-SEO analyst running the "SEO Cannibalisation Audit" play.

GOAL: find queries where MULTIPLE URLs from my own site compete for the same search
demand, name the rightful canonical winner per cluster, and decide for each loser:
CONSOLIDATE (301), DIFFERENTIATE intent, DE-OPTIMISE, or FIX signals (canonical/internal links).

I will paste a GSC export: for each query, every URL with clicks, impressions, average
position, CTR over 90 days, plus week-by-week position history where I have it. Some
data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the GSC query->URL
breakdown (each query showing which of my URLs rank/alternate for it, with per-URL
impression share) is missing, STOP and return only (a) what's missing and (b) how to get it
-- never estimate it or proceed. Without per-query URL breakdown you cannot detect
cannibalisation: a query-only or page-only export hides which URLs split the same term.

RULES:
- Same words is not cannibalisation. If the live SERP / intent for the competing URLs
  differs (e.g. a how-to vs a buy page), mark KEEP BOTH and explain why.
- Require >=2 URLs each holding >=15% of that query's impressions before calling a split.
- Confirm OSCILLATION in position history (Google swapping which URL it shows). A stably
  ranked URL with others pinned far below is WATCH, not a redirect.
- Exclude brand/navigational queries — multi-ranking there is normal.
- Pick the canonical winner by intent match + commercial value + existing authority,
  not just by impression count.
- Before recommending a 301, check canonical tags and internal anchor text; prefer a
  signal fix when the pages are not truly redundant. Redirects lose some equity — only
  consolidate when the upside is clear.
- Every row must carry a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent data.

RETURN:
1. A 3-sentence executive read.
2. A cluster table using EXACTLY this header row:
| Query | Competing URLs (impression share) | Position behaviour | Canonical winner | Loser action | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH to a decision.
```

## Decision Rules

- **CONSOLIDATE (KILL the loser via 301)** — ≥2 URLs each ≥15% impression share on one non-brand query, confirmed position oscillation over ≥90 days, genuinely redundant intent, and a clear canonical winner; redirect the loser(s) into the winner.
- **REFRESH** — the cluster is real but the rightful winner is the *weaker-performing* page today; differentiate or strengthen the winner (title, H1, internal links, depth) rather than redirecting, then re-measure.
- **WATCH** — a split exists on paper but one URL is stably ranked while others sit far below (no active oscillation), or the sample is under the 15% / 90-day floor. Directional only.
- **KEEP** — distinct search intent across the URLs (informational vs. transactional), or a brand/navigational query where multi-ranking is expected. Do not merge.
- **FIX** — the root cause is a wrong/missing canonical or mis-pointed internal anchor text, not redundant content. Correct the signal first; a 301 would be premature.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do **not** merge pages that serve genuinely different intent — a how-to guide and a PLP both ranking for "[product] [attribute]" is healthy coverage, not cannibalisation.
- Do **not** issue a 301 before checking canonical tags and internal anchor text; a signal fix is reversible and a redirect is not.
- Do **not** consolidate when the upside is unclear — redirects leak some link equity, so only merge when one strong page clearly beats two weak ones.
- Do **not** treat brand or navigational multi-ranking as a problem; your own brand terms surfacing several pages is normal.
- Do **not** pick the canonical winner on impression count alone — weigh intent match and commercial value, or you'll redirect buyers into a blog post.
- Do **not** execute redirects, canonical edits, or page deletions without an explicit human approval step.

## Output Contract

A cannibalisation cluster list: each shared query, the competing URLs and their impression split, the position behaviour, the named canonical winner, and the action for each loser.

| Query | Competing URLs (impression share) | Position behaviour | Canonical winner | Loser action | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| running shoes waterproof | PLP 41% / blog 34% / tag 25% | All oscillating pos 7–11 | PLP | 301 blog + tag → PLP | CONSOLIDATE | SEO + Dev | 30 days |

## Worked Example

> **Executive read:** "waterproof trail shoes" is splitting across three of our own URLs (impression share 41 / 34 / 25), all oscillating between positions 7 and 11 — none reaching the top 5, where 80% of the clicks live. The category PLP is the rightful winner on intent and revenue; the legacy blog post and an auto-generated tag page are redundant, so we 301 both into the PLP. Separately, "how to waterproof running shoes" looks like a clash but is genuine informational intent — we keep the guide *and* the PLP.

| Query | Competing URLs (impression share) | Position behaviour | Canonical winner | Loser action | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| waterproof trail shoes | /collections/waterproof-trail (41%) · /blog/best-waterproof-trail-shoes-2023 (34%) · /tags/waterproof (25%) | All 3 oscillate pos 7–11, 90d | /collections/waterproof-trail | 301 blog + tag page into PLP | **CONSOLIDATE** | SEO + Dev | 30 days |
| how to waterproof running shoes | /blog/how-to-waterproof-shoes (88%) · /collections/waterproof-trail (9%) | Guide stable pos 3; PLP pos 14 | n/a — different intent | Keep both; add internal link guide → PLP | **KEEP** | SEO | 60 days |
| trail shoes | /collections/trail-running (12%) · /blog/best-waterproof-trail-shoes-2023 (9%) | PLP stable pos 5; blog flat pos 19 | /collections/trail-running | None yet — no oscillation | **WATCH** | SEO | 30 days |
| trail running shoes mens | /collections/mens-trail (52%) · /products/alpine-gtx (22%) | PLP pos 6; PDP pos 8, mild swap | /collections/mens-trail | Fix: PDP canonical + internal anchors point term to PLP | **FIX** | SEO + Dev | 30 days |

Note how the audit *resists* the obvious move twice: the informational guide is kept despite sharing words with the PLP, and the "trail shoes" pair is held at WATCH because there's no actual oscillation — only the genuinely redundant, actively-swapping cluster earns a redirect.

## Common Failure Modes

- Merging a how-to guide and a PLP because they share a keyword — destroying informational coverage that was never competing.
- Calling cannibalisation off a 28-day average that hides the week-to-week oscillation (or the lack of it).
- 301-redirecting before checking canonical tags and internal links — when a reversible signal fix would have solved it.
- Picking the canonical winner by impression count and redirecting shoppers into a blog post that doesn't convert.
- Treating brand/navigational multi-ranking as a defect and consolidating pages Google was right to show.
- Forgetting that a redirect leaks some equity, then merging two pages whose combined upside never justified the loss.

## Run This Play With Live Data

**Manual version:** export the Queries and Pages tables, pivot them against each other, pull week-by-week position history per candidate URL, then cross-check canonicals, internal anchors, and the live SERP — for every head term, every month.

**ShopMCP version:** connect Google Search Console once. Ask the question; ShopMCP pulls the live Queries × Pages cross-tab, computes per-URL impression share inside each query, reads the week-by-week position history to flag genuine oscillation, screens out brand and intent-split queries, and returns the ranked cluster table with a named canonical winner and a loser action per cluster. It stays **read-only** — it never issues a redirect, edits a canonical, or deletes a page without your explicit approval.

> No Search Console connection inside your AI assistant? That's the wall every manual run hits — the cross-dimensional query/page data simply isn't visible to a generic chatbot. ShopMCP *is* the connection, and the same playbook then runs in one prompt instead of a pivot-table afternoon.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the SEO Cannibalisation Audit play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual GSC exports and the Queries-vs-Pages pivot.
- Eyeballing week-by-week position history to spot oscillation.
- Guessing which split is real cannibalisation vs. intent or brand noise.
- Rebuilding the same cluster analysis every month.
