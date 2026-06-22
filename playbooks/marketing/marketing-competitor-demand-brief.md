---
schema_version: 1
slug: "marketing-competitor-demand-brief"
title: "Competitor Demand Brief"
summary: "Competitor Demand Brief helps ecommerce operators answer: Which competitor demand signals deserve a response?"
operating_question: "Which competitor demand signals deserve a response?"
short_title: "Competitor Demand Brief"
primary_persona: "marketing"
personas: ["marketing", "seo", "performance"]
category: "seo-demand-capture"
platforms: ["dataforseo", "google-search-console"]
cadence: "monthly"
difficulty: "standard"
manual_time_minutes_min: 30
manual_time_minutes_max: 75
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "fast-follow"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/marketing-competitor-demand-brief"
shopmcp_prompt: "Run the Competitor Demand Brief play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Competitor Demand Brief

## Operating Question

**Which competitor demand signals deserve a response this month — and which are noise I should deliberately ignore?**

Every month your competitors gain rankings, publish new pages, win SERP features, and surface in queries you don't cover. Most of those moves are irrelevant to your P&L. The failure mode is reactive: chasing every gap a rank tracker flags, spreading the content team across twenty low-intent topics, and never building the one page that would actually capture transactional demand. This play does the opposite. It inventories competitor movement, then **triages each signal by commercial intent × search volume × your realistic feasibility to win** — and produces a short, defensible list of moves worth funding, with everything else explicitly parked. The discipline is *saying no on the record*, not reacting fast.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no live line into competitor SERP movement or your own Search Console footing. It can describe the *concept* of competitive demand analysis, but it cannot tell you that competitor B jumped from position 14 to 4 on a 2,400-search query last month, or that you already rank #11 on that same query and just need a stronger page. To run this manually you have to:

1. Pull keyword-gap and position-change data per competitor from DataForSEO (Labs gap, ranked-keywords, SERP-feature flags) — usually 3–6 exports.
2. Pull *your own* Search Console queries, pages, average position, and impressions for the same terms, so you know where you already have footing.
3. Reconcile two different keyword universes (the tool's clickstream-modeled volume vs. GSC's actual impressions) that rarely agree.
4. Score every candidate by intent, volume, and feasibility — the judgement no export does for you.

**The thinking in this playbook is free. The data access is the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live line into DataForSEO and Search Console, that wall is where manual runs stop. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Marketing
- **Also useful for:** SEO / Content Lead (turns the brief into a build queue), Performance Marketer (decides which gaps to buy instead of earn)
- Run it **before** the monthly content-and-budget planning meeting, so the brief sets the agenda instead of opinions.

## When To Run It

- **Cadence:** monthly — early in the month, against a full trailing window so volume and position changes have settled.
- **Triggers:** a competitor launches a new category or content hub; your category-level organic clicks slip month over month; a planning cycle where the content roadmap is up for debate; a competitor's funding/PR splash that you suspect is also a demand grab.
- **Pre-requisite:** confirm your Search Console property covers the right domain/sub-paths and that DataForSEO is pointed at the correct location and language. A US-vs-UK location mismatch silently doubles or halves every volume number.

## Required Evidence

- **DataForSEO — competitor movement.** For each named competitor: newly ranked keywords (last 30 days), keywords where they gained ≥3 positions, the keyword gap vs. your domain (terms they rank top-10 for and you don't), and **SERP features won** (featured snippet, PAA, shopping pack, image/video). Capture **monthly search volume** and a **keyword-intent label** (transactional / commercial / informational / navigational) per term.
- **Google Search Console — your footing.** Query and page report for the trailing 28 days plus the prior 28: clicks, impressions, average position, and CTR. This is the only source that tells you where you *already* rank and could move cheaply.
- **Your competitor set** — 3–6 real domains you actually compete with for revenue, not aspirational ones.

## Optional Evidence

- **Commercial value per term** — your AOV and conversion rate for the category a query maps to, so volume can be expressed as recoverable revenue, not raw searches.
- **Domain authority / link gap** — your DR vs. the competitor's, and referring-domain counts on the ranking page, to sanity-check feasibility.
- **Existing coverage** — whether you already have a thin PLP, blog post, or collection that could be upgraded instead of built from zero.
- **Promo / seasonality calendar** — a competitor spike that's really a seasonal or campaign artifact, not durable demand.
- **AI Overview / answer-engine presence** — whether the query now resolves inside an AI answer, which changes the click economics.

## The Decision Logic (run in this order)

1. **Scope the field.** Pull competitor movement for your 3–6 real competitors over the trailing 30 days. Drop anything that isn't a *new* rank, a *gained* position (≥3), or a *won* SERP feature — you're triaging change, not the whole keyword universe.
2. **Label intent first, before volume.** Tag each surviving term transactional / commercial / informational / navigational. **Intent gates everything downstream** — a 9,000-search informational term can be worth less than a 700-search transactional one. Park pure-informational gains unless they feed a cluster you're already building.
3. **Apply the volume floor.** Require ≥500 monthly searches (use ~250 for high-AOV / niche catalogs) *and* a credible trend — a one-month blip on clickstream-modeled volume is not demand.
4. **Check your own footing in GSC.** For every candidate, look up where you already rank. Already impressions at position 8–20 → cheap win, *upgrade* the existing page. No presence at all and competitor sits top-3 with high DR → expensive, downgrade feasibility.
5. **Score feasibility honestly.** Compare your DR and the SERP's link profile to the incumbent. If the page-1 results are all DR 70+ with hundreds of referring domains and you're DR 35, that's a multi-quarter fight — WATCH, don't commit this month.
6. **Map signal → response type.** Transactional gap with a winnable SERP → PLP / collection + supporting content. Branded-comparison query rising → a comparison / "vs" page. Informational cluster with intent that eventually converts → content only if it ladders to a money page. Then assign status, owner, and a recheck date.

## Manual Workflow

1. Confirm location, language, and the GSC property are correct, then list your 3–6 real competitors.
2. Pull the DataForSEO competitor-movement exports (new ranks, position gains ≥3, keyword gap, SERP features) for the trailing 30 days.
3. Pull your GSC query+page report for the trailing 28 days and the prior 28.
4. Build a candidate list: each row = term, competitor, their position change, monthly volume, intent label, your current GSC position (or "none").
5. Apply the intent gate, the volume floor, and the feasibility check from the decision logic.
6. Paste the prompt below with your two tables (competitor movement + your GSC footing).
7. Pressure-test every "build" recommendation against the veto list, then convert survivors into a brief with owner, response type, and recheck date.

## Copy-Paste Prompt

```text
You are my competitive-demand analyst running the "Competitor Demand Brief" play.

GOAL: from a list of competitor SERP/keyword movements, decide which signals deserve a
response this month, ranked by recoverable commercial value — NOT by raw search volume,
and NOT by how dramatic the competitor's move looks.

I will paste two tables:
(A) Competitor movement from DataForSEO: term, competitor, position change, monthly search
    volume, intent label, SERP features won.
(B) My own footing from Google Search Console: term/page, my avg position, impressions,
    clicks, CTR, trailing 28d vs prior 28d.
Some rows may be missing one side. Do not invent the missing side.

RULES:
- Label intent BEFORE ranking. Transactional/commercial beats informational at equal volume.
  Park pure-informational gains unless they feed a cluster I'm already building.
- Apply a volume floor: ignore terms under ~500 monthly searches (250 for niche/high-AOV)
  or with only a single-month blip and no trend.
- Cross-check my GSC footing. If I already rank position 8-20 on a term, treat it as a cheap
  UPGRADE, not a new build. If I have zero footing and the competitor is top-3 on a high-DR
  SERP, downgrade feasibility to WATCH.
- Map each kept signal to a response type: PLP/collection, comparison/"vs" page, content
  cluster, or technical/SERP-feature play.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not claim demand is "real"
  off a single tool's modeled volume.

RETURN:
1. A 3-sentence executive read: the 2-3 signals worth funding and what to ignore.
2. A ranked table: Signal | Competitor | Their move | Volume & intent | My GSC footing |
   Feasibility | Response type | Status | Owner | Recheck.
3. The "deliberately ignored" list with one-line reasons (this is the point of the play).
4. What evidence is blocked and what you'd need to upgrade a WATCH to a build decision.
```

## Decision Rules

- **KEEP / BUILD** — transactional or commercial intent, ≥500 monthly searches (≥250 niche) with a credible trend, and a winnable SERP (your DR within reach of page 1, or existing GSC footing at position 8–20). Ship a PLP, collection, or comparison page.
- **REFRESH / UPGRADE** — you already rank position 8–20 in GSC and a competitor just gained on the same term; strengthen the existing page rather than building new.
- **WATCH** — directional only: real intent but you have no footing and the SERP is dominated by high-DR incumbents, or the volume is a single-month blip, or the term sits inside an AI Overview that suppresses clicks.
- **KILL / IGNORE** — informational or navigational intent with no path to a money page, volume below the floor, or a competitor move that's a seasonal/promo artifact. Record it as deliberately ignored.
- **FIX** — location/language mismatch, GSC property gap, or volume sources that disagree by more than ~2× make a safe call impossible until the data is reconciled.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Not every competitor move warrants a response — a gained position or a new page is *not*, by itself, evidence of recoverable demand. Require the intent and volume gates.
- Do **not** commit to a build before checking feasibility — verify your domain authority and the SERP's link profile against the incumbent first.
- Do **not** treat a single tool's clickstream-modeled volume as truth; demand must be real volume with a trend, not a one-month vanity spike.
- Do **not** rank an informational gain above a transactional one just because the search volume is larger — transactional/commercial intent beats informational.
- Do **not** green-light a target where you have no footing without confirming it in your own GSC — verify where you already have a position before claiming a cheap win.
- Do **not** queue content, change product data, or shift budget without an explicit human approval step.

## Output Contract

A triaged competitor-demand brief: a ranked list of signals worth a response, each with evidence, feasibility, a response type, and a status — plus an explicit "ignored" list.

| Signal | Competitor | Their move | Volume & intent | My GSC footing | Feasibility | Response type | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| "[category] for [use-case]" | competitor-b.com | New, pos. 4 | 2,400/mo · transactional | none | Medium | PLP + buyer guide | **BUILD** | SEO + Merch | 30 days |

## Worked Example

> **Executive read:** Of 41 competitor movements this month, exactly two deserve funding. Competitor B newly ranking page-1 for a 2,400-search transactional query we don't target is the one real opportunity — build a PLP plus a supporting buyer guide. A rising branded-comparison query (590 searches) justifies a single "vs" page we can ship in a day. Everything else — including a competitor's 8,900-search informational blog win — is parked, because the intent doesn't convert and we have no path to a money page.

| Signal | Competitor | Their move | Volume & intent | My GSC footing | Feasibility | Response type | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| "insulated dog crates for winter" | competitor-b.com | New, pos. 4 | 2,400/mo · transactional | none | Medium (DR 41 vs 48) | PLP + buyer guide | **BUILD** | SEO + Merch | 30 days |
| "competitor-b vs ourbrand" | competitor-b.com | Rising, pos. 6→3 | 590/mo · commercial | pos. 14 (212 impr.) | High (own brand term) | Comparison "vs" page | **BUILD** | Content | 30 days |
| "best heated water bowl" | competitor-c.com | Gained +5, pos. 7 | 1,300/mo · commercial | pos. 11 (430 impr.) | High (already ranking) | Upgrade existing PLP | **REFRESH** | SEO | 30 days |
| "are dogs cold in winter" | competitor-b.com | New, pos. 2 | 8,900/mo · informational | none | Low payoff | None (no money path) | **IGNORE** | — | — |
| "smart pet feeder app" | competitor-d.com | New, pos. 5 | 720/mo · commercial | none | Low (DR 35 vs 72) | — | **WATCH** | SEO | 60 days |

The brief inverts the rank-tracker view: the single most dramatic move — competitor B seizing position 2 on an 8,900-search term — is the one we *deliberately ignore*, while a quieter 2,400-search transactional gap is the only build worth a content sprint.

## Common Failure Modes

- Chasing the biggest-volume move regardless of intent, and starving the transactional gap that actually converts.
- Skipping the GSC footing check and building a brand-new page when an upgrade to an existing position-12 page would have ranked in weeks.
- Treating one tool's modeled volume as demand truth without a trend or a second source.
- Committing to a SERP owned by DR 70+ incumbents with no honest feasibility check, then wondering why the page never ranks.
- Producing a list of "opportunities" with no explicit ignore list — which is just a backlog, not a decision.

## Run This Play With Live Data

**Manual version:** pull competitor movement from DataForSEO, pull your own footing from Search Console, reconcile two keyword universes, and score intent × volume × feasibility by hand — every month.

**ShopMCP version:** connect DataForSEO and Google Search Console once. Ask the question; ShopMCP pulls live competitor movement and your real GSC footing, applies the intent gate and volume floor, cross-references where you already rank, and returns the ranked BUILD / REFRESH / WATCH / IGNORE brief with an explicit ignore list. It stays **read-only** — it never queues content or changes product data without your explicit approval.

> No DataForSEO or Search Console connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of an afternoon of cross-referencing exports.

Example ShopMCP prompt:

```text
Run the Competitor Demand Brief play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/marketing-competitor-demand-brief?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual DataForSEO and Search Console exports and stale CSVs.
- Cross-referencing competitor movement against your own rankings by hand.
- Guessing which modeled search volume is real demand versus a blip.
- Rebuilding the same intent-and-feasibility triage every month.
