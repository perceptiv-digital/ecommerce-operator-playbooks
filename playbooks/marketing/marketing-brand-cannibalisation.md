---
schema_version: 1
slug: "marketing-brand-cannibalisation"
title: "Brand Cannibalisation Audit"
summary: "Brand Cannibalisation Audit helps ecommerce operators answer: Are paid campaigns buying demand that organic search would have captured?"
operating_question: "Are paid campaigns buying demand that organic search would have captured?"
short_title: "Brand Cannibalisation"
primary_persona: "marketing"
personas: ["marketing", "performance"]
category: "acquisition-efficiency"
platforms: ["google-ads", "google-search-console"]
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/marketing-brand-cannibalisation"
shopmcp_prompt: "Run the Brand Cannibalisation Audit play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Brand Cannibalisation Audit

## Operating Question

**How much of my brand-term paid spend is buying clicks I would have won for free in organic search — and how much is genuinely defensive?**

Brand campaigns are the most comfortable line in a paid account: high ROAS, low CPC, conversions that close. That comfort hides the problem. When you rank #1 organically for your own name and nobody is bidding against you, most of those paid brand clicks are clicks the same searcher would have given you anyway — you are paying a toll on your own front door. This play separates the **cannibalised** portion of brand spend (clicks you'd capture organically for free) from the **defensible** portion (impressions where a competitor ad, a missing #1 organic rank, or a buried SERP layout means the paid click is actually incremental). It ends in a clear **KILL / REFRESH / WATCH / KEEP / FIX** call per brand campaign or ad group, ranked by estimated cannibalised spend — with every estimate labelled as an estimate, because true incrementality is only ever proven by a holdout test.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your Google Ads account or your Search Console property, and the entire answer lives in the overlap between those two systems. To run this manually you have to:

1. Pull the **Google Ads Search Terms report** filtered to brand queries, with spend, clicks, conversions, and conversion value per term.
2. Pull **Search Console** for the same brand queries — average position, clicks, impressions, and organic CTR — over the same window.
3. Pull the **auction insights** report per brand campaign to see whether any competitor actually appears, and at what impression share.
4. Eyeball the live **SERP** for your top brand terms on mobile and desktop, because position 1.0 in GSC can still sit below four shopping tiles, a sitelink pack, and an AI overview.
5. Join all of it by query and reason about counterfactual organic capture — which no single tool reports.

**The reasoning in this playbook is free. The cross-system join — paid brand terms against organic brand rank against competitor presence — is the hard part, and that is exactly what ShopMCP connects.** With no live link to Google Ads and Search Console, that join is where every manual run stalls. The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Marketing
- **Also useful for:** Performance Marketer (who owns the brand campaign and runs any holdout), Founder/CEO (asking "why are we paying for our own name?")
- Run it **before** a quarterly budget review, or whenever brand-term spend grows faster than brand demand (impressions flat, spend up).

## When To Run It

- **Cadence:** monthly — brand SERP layout, competitor bidding, and your own organic rank all drift slowly, so monthly catches change without over-reacting to noise.
- **Triggers:** a new competitor appearing in auction insights on your brand, a brand-campaign budget increase, an organic ranking change on your homepage or brand query, or a CFO question about paid efficiency.
- **Pre-requisite:** confirm conversion tracking and GSC property coverage are clean. If GA4/Ads conversions are drifting, fix that first — you'll mis-size the cannibalised value.

## Required Evidence

- **Google Ads — Search Terms report**, brand queries only, last 30 days plus the prior 30: spend, clicks, impressions, conversions, conversion value, CPC, and search-term match against your brand exact/phrase keywords.
- **Google Ads — Auction Insights** per brand campaign: which domains appear, their **impression share** and **overlap rate** on your brand terms. This is the single most important input — it tells you whether the spend is defensive.
- **Search Console — brand queries**, same window: **average position**, **clicks**, **impressions**, and **organic CTR**. Confirm you actually hold position 1.0, not 1.4 averaged across a long tail.
- **Brand keyword list** — the explicit set of terms you count as "brand" (your name, common misspellings, name + product, name + "discount code"). Cannibalisation differs sharply across these.

## Optional Evidence (changes the answer when present)

- **Live SERP screenshots** (mobile + desktop) for your top 3–5 brand terms — to catch "rank #1 but pushed below the fold" cases that GSC position alone hides.
- **A geo or time holdout result** if you've ever paused brand in a region — this is the only true incrementality proof and overrides every estimate below.
- **Contribution margin** on brand-driven orders — to express cannibalised spend as profit recovered, not just spend cut.
- **Promo / launch calendar** — a sale or PR spike inflates brand demand and changes the paid-vs-organic split for that window.
- **Affiliate / coupon-site activity** on brand terms — coupon affiliates bidding on your brand are a different leak with a different fix.

## The Decision Logic (run in this order)

1. **Gate on tracking and rank confidence.** If brand conversions are drifting between Ads and GA4, or your GSC brand position is averaged across a noisy long tail (so you can't confirm a true #1), set the campaign to **FIX** and stop. You cannot size cannibalisation on an unstable organic baseline.
2. **Check for defenders first (the veto that protects spend).** Open auction insights per brand term. On any term where a competitor holds meaningful impression share, the paid click is plausibly incremental → that slice is **KEEP / defensive**, never a KILL candidate. Quantify it: what share of brand impressions face a competitor ad?
3. **Confirm you actually own organic #1.** For the remaining no-competitor terms, verify GSC average position ≤ 1.3 **and** a healthy organic CTR. If you don't hold the top organic spot, organic would *not* have captured the click cleanly → **WATCH**, not KILL.
4. **Check SERP layout, not just position.** Even at organic #1, if shopping tiles, sitelinks, or an AI overview push your organic result below the fold on mobile, the paid click buys visibility you'd otherwise lose → downgrade to **WATCH / REFRESH**.
5. **Size the cannibalised slice.** For terms that survive 2–4 (own #1, no competitor, organic above the fold), estimate cannibalised spend = brand spend on those terms × estimated organic-recapture rate. Label it an **estimate** — the honest range, not a point claim.
6. **Rank by cannibalised spend and assign status + owner + the holdout test** that would convert the estimate into proof.

## Manual Workflow

1. Build your brand keyword list, then pull the Google Ads Search Terms report filtered to those terms for the last 30 days and the prior 30.
2. Pull Search Console for the same brand queries (position, clicks, impressions, organic CTR) over the matching windows.
3. Pull auction insights per brand campaign; record each competitor's impression share and overlap on your brand terms.
4. Eyeball the live SERP (mobile + desktop) for your top brand terms; note anything pushing organic below the fold.
5. Join paid spend ↔ organic rank ↔ competitor presence per term. Split terms into **defensible** (competitor present, no #1, or buried SERP) and **cannibalised candidate** (own #1, no competitor, above fold).
6. Paste the prompt below with your tables. Estimate the cannibalised spend as a range and label it an estimate.
7. Pressure-test every KILL/REFRESH against the veto list, then design the geo/time holdout that would prove the number before cutting at scale.

## Copy-Paste Prompt

```text
You are my paid-search analyst running the "Brand Cannibalisation Audit" play.

GOAL: estimate how much of my brand-term paid spend is cannibalising free organic
clicks vs. how much is genuinely defensive/incremental, then rank brand campaigns or
ad groups by estimated cannibalised spend.

I will paste: my brand keyword list, the Google Ads Search Terms report for brand
queries (spend, clicks, conversions, value), Search Console for the same queries
(avg position, clicks, impressions, organic CTR), and auction insights per brand
campaign (competitor domains + impression share). Some data may be missing.

RULES:
- Defensible first: any brand term where a competitor holds meaningful impression
  share is plausibly incremental -> KEEP/defensive, never a KILL candidate. State the
  competitor and their impression share.
- Cannibalisation requires ALL of: I hold organic position <= 1.3, no competitor ad on
  that term, and my organic result is above the fold. Missing any one -> WATCH, not KILL.
- GSC brand position varies by query and by day; treat any average above 1.3, or a long
  noisy tail, as "rank not confirmed" -> FIX, do not size cannibalisation on it.
- Estimate cannibalised spend as a RANGE and LABEL IT AN ESTIMATE. True incrementality
  is only proven by a geo or time holdout test; say so explicitly. Never present a
  modelled recapture rate as a measured fact.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read (estimated cannibalised spend range + the one defensible slice).
2. A ranked table: Brand campaign/term | Brand spend (30d) | My organic position | Competitor on SERP? (impr share) | SERP layout | Est. cannibalised $ | Status | Owner | Holdout to confirm.
3. Vetoes/caveats that protected any spend or downgraded any recommendation.
4. The exact holdout test (geo or time) that would turn the top estimate into proof.
```

## Decision Rules

- **KILL / scale down** — own organic position ≤ 1.3, **no** competitor on the SERP, organic result above the fold, ≥30 days of data, and the estimated cannibalised slice is material. Cut in stages, never all at once.
- **REFRESH** — brand spend justified but inefficiently structured: bidding on terms that should be a tightly-controlled exact-match brand campaign, or paying to defend a buried SERP that better organic sitelinks/structured data would fix more cheaply.
- **WATCH** — directional only: organic position not confidently #1, SERP layout pushes organic below the fold, a competitor intermittently appears, or the window is polluted by a promo/PR spike.
- **KEEP** — competitor holds meaningful impression share on the term, so the paid click is plausibly incremental and defensive. This spend is doing a job.
- **FIX** — conversion tracking drift, an unstable/averaged GSC brand position, or missing auction-insights data prevents a safe estimate.
- Every recommendation carries a number, source, time window, and confidence level.

## Veto Rules

- Do **not** call spend cannibalised where a competitor holds meaningful brand impression share — that paid click is defensive and likely incremental.
- Do **not** call spend cannibalised unless you confirm you hold organic position #1 *and* sit above the fold on mobile — GSC position alone is not enough.
- Do **not** present a modelled recapture rate as fact. Cannibalised-spend figures are **estimates** until a geo/time holdout proves them.
- Do **not** cut all brand spend at once. Going dark on brand can invite competitor encroachment and a higher CPC to win the term back later — stage the cut and watch auction insights.
- Do **not** size cannibalisation on a noisy/averaged GSC brand position; brand position varies by query and by day.
- Do **not** pause, shift budget, or change campaign structure without an explicit human approval step.

## Output Contract

A table ranked by **estimated cannibalised spend**, with the defensible slice and the confirming holdout test called out:

| Brand campaign / term | Brand spend (30d) | My organic position | Competitor on SERP? (impr share) | SERP layout | Est. cannibalised $ | Status | Owner | Holdout to confirm |
|---|---|---|---|---|---|---|---|---|
| Brand exact – core name | $2,100 | 1.0 | No (most terms) | Organic above fold | ~$1,365 (est., ±15%) | REFRESH | Head of Mktg + Perf | 4-week geo holdout |

## Worked Example

> **Executive read:** Of $2,100/mo on the brand exact-match campaign, an estimated ~$1,365 (~65%, labelled an estimate) is buying clicks we'd likely win for free — we rank organic #1 on the core name with zero competitor ads on most terms and our organic result sits above the fold. The defensible slice is the ~35% of impressions where a competitor (a marketplace reseller) appears; that spend stays. Before cutting, we run a 4-week geo holdout, because no estimate here is proof.

| Brand campaign / term | Brand spend (30d) | My organic position | Competitor on SERP? (impr share) | SERP layout | Est. cannibalised $ | Status | Owner | Holdout to confirm |
|---|---|---|---|---|---|---|---|---|
| Brand exact – core name | $1,180 | 1.0 | No | Organic above fold | ~$885 (est.) | **REFRESH** | Head of Mktg + Perf | 4-week geo holdout |
| Brand + "discount code" | $410 | 1.0 | Coupon affiliate (22%) | Affiliate above organic | ~$120 (est.) | **WATCH** | Perf | Pause affiliate-bid terms, observe |
| Brand + product line | $290 | 1.0 | No | 3 shopping tiles above organic | ~$0 | **KEEP** | Perf | Buried by SERP; paid earns the click |
| Brand + "reviews" | $135 | 2.3 | No | Organic below review aggregators | ~$0 | **WATCH** | SEO + Perf | Not #1 organic; fix rank first |
| Brand exact – marketplace overlap terms | $85 | 1.0 | Reseller (38%) | Competitor ad above organic | ~$0 | **KEEP** | Perf | Defensive; competitor present |

Note how the answer refuses the lazy "kill all brand" move: the largest line (core-name exact) is a REFRESH worth ~$885/mo in estimated recapture, but the marketplace-overlap and shopping-tile terms are genuinely defensible and stay funded. The headline number is ~$1,005/mo of estimated cannibalised spend across the campaign — an estimate the geo holdout exists to confirm.

## Common Failure Modes

- Cutting all brand spend on the estimate, then watching a competitor move into the gap and your win-back CPC climb.
- Trusting GSC "position 1.0" without checking the live SERP, where shopping tiles or an AI overview have pushed organic below the fold.
- Reading an averaged brand position across a noisy query tail as a confident #1.
- Ignoring auction insights and labelling defensive (competitor-contested) spend as cannibalised.
- Presenting the modelled recapture rate as fact instead of running the holdout that would prove it.
- Missing coupon/affiliate sites bidding on "brand + discount code" — a different leak with a different fix than cutting your own brand campaign.

## Run This Play With Live Data

**Manual version:** pull the Search Terms report, Search Console, and auction insights; eyeball every brand SERP on two devices; join paid spend to organic rank to competitor presence by hand — every month, per brand term.

**ShopMCP version:** connect Google Ads and Search Console once. Ask the question; ShopMCP pulls brand-term spend, organic position and CTR, and competitor impression share, runs the defender check and the own-#1/above-the-fold gates, and returns the ranked table with the cannibalised slice sized as a labelled estimate and the holdout test that would confirm it. It stays **read-only** until you explicitly approve a budget or structure change.

> No Google Ads or Search Console connection inside your AI assistant? That's the wall every manual run hits — the whole answer is the join between those two systems. ShopMCP *is* the connection, and the same playbook then runs in one prompt instead of a month of cross-tab spreadsheets.

Example ShopMCP prompt:

```text
Run the Brand Cannibalisation Audit play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/marketing-brand-cannibalisation?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual Search Terms, Search Console, and auction-insights exports every month.
- Joining paid brand spend to organic rank to competitor presence by hand.
- Eyeballing every brand SERP on mobile and desktop to catch below-the-fold cases.
- Re-deriving the cannibalised-vs-defensible split from scratch each cycle — and forgetting to label it an estimate.
