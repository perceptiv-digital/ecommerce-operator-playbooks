---
schema_version: 1
slug: "perf-cpa-root-cause"
title: "CPA Spike Root Cause Explainer"
summary: "CPA Spike Root Cause Explainer helps ecommerce operators answer: Why did CPA spike and what should be checked first?"
operating_question: "Why did CPA spike and what should be checked first?"
short_title: "CPA Spike Root Cause Explainer"
primary_persona: "performance"
personas: ["performance", "marketing"]
category: "acquisition-efficiency"
platforms: ["commerce", "meta-ads", "google-ads", "tiktok-ads"]
cadence: "weekly"
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/perf-cpa-root-cause"
shopmcp_prompt: "Run the CPA Spike Root Cause Explainer play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# CPA Spike Root Cause Explainer

## Operating Question

**CPA jumped this week — which of the four things that actually move CPA is to blame, and what do I check first before I touch anything?**

CPA is not a root cause. It is an arithmetic output. At the funnel level it decomposes cleanly: **CPA ≈ CPM ÷ (CTR × CVR)** — what it costs to buy a thousand impressions, divided by the share of those impressions you turn into clicks and the share of clicks you turn into orders. (Scale the same identity by AOV and you get ROAS.) A CPA spike is *one of those four terms moving*, plus a fifth possibility that sits underneath all of them: the conversions simply stopped being recorded. This play decomposes the move and walks the five candidates in a strict order, because the order is the whole game — diagnose them out of sequence and you will "fix" a healthy ad to cure a broken checkout.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Meta Ads Manager, your Google Ads account, your GA4 property, or your Shopify checkout. So when you ask "why did CPA spike?" it pattern-matches to the most-blogged answer — *"your creative is probably fatigued, try refreshing it"* — which is the **fourth** thing to check, not the first. To run this honestly you have to:

1. Pull the CPA move itself, then pull **CPM, CTR, and CVR** for the same windows so you can see *which* term moved.
2. Cross-check platform-reported conversions against **real commerce orders** — because the single most common cause of a CPA "spike" is a tracking break, and the platform cannot tell you its own pixel went dark.
3. Pull **site/checkout CVR and stock state** from commerce, which no ad platform sees.
4. Overlay your **promo calendar and any recent campaign edits**, because both reset the baseline you are comparing against.

**The five-step logic below is free. The data access is the hard part — that is exactly what ShopMCP connects.** Until your assistant has live lines into ads, analytics, and your store, every manual run stalls at step 1.

## Who Should Run It

- **Primary owner:** Performance Marketer — owns the channels where CPA is measured and the budget decisions that follow.
- **Pull in Web/Dev** the moment the trail points at step 2 (site/checkout CVR) — a checkout or theme regression is their fix, not yours.
- **Pull in Analytics/Eng** the moment it points at step 1 (a pixel/CAPI/GA4 break) — attribution plumbing is theirs.
- **Also useful for:** Head of Marketing (is this a real efficiency problem or a measurement scare?) and Founder/CEO (one-line "the spike was the checkout, not the ads" answer).

## When To Run It

- **Cadence:** weekly, as part of the performance review — but it earns its keep as a **trigger play** the day CPA jumps.
- **Triggers:** channel CPA up ~25%+ week over week, blended MER sliding, or a sudden ROAS drop with no obvious spend change.
- **Run it before** you react — before you pause a campaign, swap creative, or shift budget on the back of a scary CPA number.
- **Pre-requisite:** matched windows (this period and the prior equal period) and at least one clean, promo-free week to compare against.

## Required Evidence

- **The CPA move itself** — CPA this period vs. the prior equal period, per channel and ideally per campaign. State the windows explicitly.
- **The decomposition terms** — **CPM, CTR, and CVR** (or click-to-order rate) for the same two windows. Without these three you cannot attribute the move; you are guessing.
- **Platform-reported conversions** — purchases/conversions as the ad platform counts them, per channel, for both windows.
- **Real commerce orders** — orders by source/UTM from Shopify/Woo/BigCommerce for the same windows, so you can reconcile against platform claims.
- **Site & checkout CVR** — store-side sessions → orders, ideally split add-to-cart → checkout → purchase, so a checkout break is visible.
- **Targets** — your target CPA (and MER/ROAS) so "spike" is measured against a number, not a vibe.

## Optional Evidence

- **Tracking/deploy log** — pixel, CAPI, GA4, or GTM changes; theme or checkout deploys; consent-banner edits. The first thing that breaks attribution.
- **Stock / availability** for the products these campaigns drive — an out-of-stock bestseller craters CVR with the ads untouched.
- **Promo calendar** — a promo that ended last week inflated the *prior* window, so this week only looks like a spike.
- **Campaign edit / learning-phase log** — a budget or creative change resets learning and distorts CPA for days.
- **Auction context** — seasonal demand, a competitor surge, or audience saturation (rising frequency) that lifts CPM.

## The Decision Logic (run in this order)

Walk these five in sequence. Stop at the first one that explains the move — do not skip ahead to creative.

1. **Tracking / attribution break (check FIRST).** Did conversions stop being *recorded*? Compare platform-reported conversions to real commerce orders. If platform conversions fell but commerce orders held roughly flat — or platform-vs-commerce drift jumped past ~15% versus its normal baseline — the "spike" is a measurement artifact. Look for a pixel/CAPI/GA4/GTM change, a checkout or consent-banner deploy, or iOS/ad-blocker signal loss. **Verdict: FIX. Do not touch budgets or creative.**
2. **CVR — site, checkout, or stock.** If tracking is clean, ask whether you stopped *converting* the clicks you already paid for. CPA rises when CVR falls even if every ad metric is perfect. Pull store-side CVR for both windows; a same-week drop (e.g. 2.x% → 1.x%) localizes to the **site, not the ad** — a checkout regression, a broken discount code, a price/shipping change, or an out-of-stock hero product. **Verdict: FIX/REFRESH the site or offer; leave the campaign alone.**
3. **CTR — creative fatigue.** Only now look at the ad. If **CPM is roughly flat but CTR has declined**, the auction is fine and the creative has stopped earning the click — classic fatigue, usually with rising frequency. **Verdict: REFRESH creative.**
4. **CPM — auction / audience pressure.** If **CTR held but CPM rose**, you are paying more for the same impressions: seasonality (Q4, a holiday), a competitor entering your auction, or a narrow audience saturating (frequency climbing). The ad is doing its job; the market got more expensive. **Verdict: WATCH, or broaden/adjust targeting — rarely KILL.**
5. **A real efficiency decline.** If none of the above moved and CPA is genuinely, durably above target across a clean window, it is a real performance problem. Re-rank by contribution at risk and decide KILL vs. REFRESH on the unit. **Verdict: KILL or REFRESH on the merits.**

## Manual Workflow

1. Set the two windows — this period vs. the prior equal period (use 7d/7d only as a trigger; confirm on 14d/14d so one noisy day can't drive the call).
2. Pull the CPA move per channel, then immediately pull **CPM, CTR, CVR** for both windows so the decomposition is on the page before any narrative.
3. Reconcile platform-reported conversions against real commerce orders — this is step 1 of the logic and the most common true cause.
4. Pull store-side / checkout CVR and current stock for the products these campaigns drive.
5. Overlay the promo calendar and the campaign-edit/learning log onto the same windows.
6. Paste the prompt below with your tables. Force the model to name *which decomposition term moved* before it names a fix.
7. Pressure-test the verdict against the veto list, then write the action packet: owner, the one thing to check first, and a recheck date.

## Copy-Paste Prompt

```text
You are my performance-marketing analyst running the "CPA Spike Root Cause Explainer" play.

GOAL: explain why CPA spiked by decomposing the move, and tell me what to check FIRST —
in the correct diagnostic order, so I don't blame creative for a tracking or site problem.

DECOMPOSITION: CPA ~= CPM / (CTR x CVR). A CPA move is one of these terms moving, or a
fifth cause underneath them: conversions stopped being recorded.

I will paste, per channel, for THIS period and the PRIOR equal period: CPA, CPM, CTR,
platform-reported conversions, real commerce orders, site/checkout CVR, current stock,
promo calendar, recent campaign edits, and my target CPA. Some data may be missing.

WALK THESE IN ORDER. Stop at the first that explains the move; name the term that moved:
1. TRACKING break first: platform conversions down but commerce orders flat, or platform-
   vs-commerce drift past its normal baseline => FIX, do not touch budget/creative.
2. CVR: site/checkout/stock CVR fell => fix the site/offer, NOT the ad.
3. CTR fell while CPM flat => creative fatigue => REFRESH.
4. CPM rose while CTR flat => auction/seasonality/saturation => WATCH or broaden.
5. None of the above and CPA durably over target on a clean window => real decline.

RULES:
- Every row carries: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.
- One week is noisy; flag any call resting on a single 7-day window as low confidence.
- A single platform's CPA is not commerce truth. Reconcile before concluding.

RETURN:
1. A 2-3 sentence executive read naming the root-cause term and the first thing to check.
2. A decomposition table: Channel | CPA delta | CPM delta | CTR delta | CVR delta | term that moved.
3. A decision table: Item | Evidence (number, source, window, confidence) | Status | First check | Owner | Recheck.
4. Vetoes/caveats that downgraded any call.
5. What evidence is blocked and what would upgrade a WATCH/FIX to a decision.
```

## Decision Rules

- **FIX** — the move traces to a tracking break (platform conversions diverging from commerce orders) or to a site/checkout/stock CVR collapse. The campaign is not the problem; do not reallocate budget on top of it.
- **REFRESH** — CTR has decayed at flat CPM (creative fatigue), or CVR slipped to a creative/landing mismatch, while the audience and offer remain viable.
- **WATCH** — the spike is CPM-driven (auction/seasonality/saturation) with CTR intact, or it rests on a single noisy 7-day window. Directional, not yet actionable.
- **KEEP** — CPA is inside the target band on a clean window and no decomposition term has moved adversely.
- **KILL** — reserved for step 5: a real, durable efficiency decline on a clean, well-tracked window with adequate sample, and no veto protecting the unit.
- Every recommendation must include a **number, source, time window, and confidence level** — and must name *which* decomposition term moved, not just "CPA went up."

## Veto Rules

- **Never blame the creative before ruling out tracking and site CVR.** Steps 1 and 2 come first; a REFRESH that skips them is a guess.
- Do not act on a single noisy week — one 7-day window is not a trend; confirm on 14d before you KILL or REFRESH.
- Do not call it a spike inside or just after a **promo window** — the promo inflated the comparison baseline on one side.
- Do not judge CPA on a campaign that had a **budget/creative edit or a learning reset** in the window; the algorithm is mid-recalibration.
- Do not treat **a single platform's CPA as commerce truth** — reconcile platform-reported conversions against real orders first.
- Do not recommend pauses, budget shifts, creative swaps, or catalog changes without an explicit human approval step.

## Output Contract

Two tables: a **decomposition** that shows which term moved, then a **decision** table ranked by impact.

Decomposition (this period vs. prior equal period):

| Channel | CPA Δ | CPM Δ | CTR Δ | CVR Δ | Term that moved |
|---|---|---|---|---|---|
| Meta – Prospecting | +45% | +2% | −3% | −38% | CVR (site) |

Decision:

| Item | Evidence (number, source, window, confidence) | Status | First check | Owner | Recheck |
|---|---|---|---|---|---|
| Meta – Prospecting | CVR 2.4%→1.5%, Shopify, 7d vs 7d, high | FIX | Checkout deploy on the 14th | Web + Perf | 3 days |

## Worked Example

> **Executive read:** Meta CPA spiked +45% week over week, and the platform view tempts you to refresh the creative. The decomposition says otherwise: CPM is flat (+2%) and CTR is flat (−3%), but site CVR fell from 2.4% to 1.5% the same week a checkout change shipped on the 14th. The ad is healthy; the leak is on the site — fixing the creative would burn a sprint and move nothing. First check: roll back / QA the checkout deploy, not the ad.

| Channel | CPA Δ | CPM Δ | CTR Δ | CVR Δ | Term that moved | Status | First check |
|---|---|---|---|---|---|---|---|
| Meta – Prospecting | **+45%** | +2% | −3% | **2.4%→1.5%** | **CVR (site)** | **FIX** | Checkout deploy (the 14th) |
| Google – Brand Search | +6% | +5% | −1% | −2% | CPM (auction) | WATCH | Competitor in auction; recheck 7d |
| Google – Shopping | +52% | +3% | +1% | n/a | Tracking | **FIX** | GA4 purchases −60% vs Shopify flat |
| TikTok – TopFunnel | +30% | +1% | −22% | −4% | CTR (fatigue) | REFRESH | Frequency 4.8; new hooks |

Read the table top-down and the order of operations is obvious: the two FIX rows (a site CVR collapse and a tracking break) are the real money, the CTR-driven TikTok row is a genuine REFRESH, and the CPM-driven Brand Search row is just a more expensive auction — a WATCH, not a fire.

## Common Failure Modes

- **Refreshing the creative first.** The blog-default answer and the most expensive mistake — you re-shoot ads while a dead pixel or a broken checkout keeps the CPA high.
- **Reading platform CPA as commerce truth.** The platform cannot see that its own conversions stopped recording; reconcile against real orders or you will diagnose a measurement gap as a performance one.
- **Reacting to one noisy week.** A single 7-day window swings on weekday mix, a payday, or one big order. Confirm on 14d.
- **Comparing across a promo edge or a learning reset.** The baseline on one side is inflated or mid-recalibration, so the "spike" is an artifact of the windows.
- **Judging the whole account by one platform's number.** A single channel's CPA isn't the business; blended commerce CPA/MER is.

## Run This Play With Live Data

**Manual version:** pull CPA, then CPM, CTR, and CVR for two matched windows on every channel; reconcile platform conversions against real Shopify orders; pull checkout CVR and stock; overlay your promo and edit logs — then reason through the five steps. Every week.

**ShopMCP version:** connect Meta, Google, TikTok, your analytics, and your store once. Ask why CPA spiked; ShopMCP pulls both windows live, runs the **CPM ÷ (CTR × CVR)** decomposition, executes the tracking reconciliation and the site-CVR check *in the correct order*, and returns the decomposition table plus a FIX/REFRESH/WATCH decision with the one thing to check first. It stays **read-only** until you explicitly approve a change.

> No Meta, Google, GA4, or Shopify connection inside your AI assistant? That's the wall every manual run hits — and it's why a plain chatbot defaults to "refresh your creative." ShopMCP *is* that connection, so the play runs in one prompt instead of a spreadsheet afternoon.

Example ShopMCP prompt:

```text
Run the CPA Spike Root Cause Explainer play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/perf-cpa-root-cause?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Pulling CPM/CTR/CVR for two matched windows on every channel by hand.
- Reconciling platform-reported conversions against real Shopify orders every week.
- Guessing the diagnostic order and defaulting to "it's the creative."
- Rebuilding the same decomposition and tracking-gate workflow every week.
