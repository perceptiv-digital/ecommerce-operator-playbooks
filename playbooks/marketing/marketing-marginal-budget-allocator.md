---
slug: "marketing-marginal-budget-allocator"
title: "Marginal Budget Allocator"
operating_question: "Where should the next marginal dollar go?"
primary_persona: "marketing"
personas: ["marketing", "founder", "performance"]
category: "acquisition-efficiency"
platforms: ["commerce", "meta-ads", "google-ads", "tiktok-ads"]
cadence: "weekly"
public_tier: "fast-follow"
contributed_by: "Perceptiv"
---

# Marginal Budget Allocator

## Operating Question

**Where should the next marginal dollar go — judged on what the *next* dollar returns in each channel, not on the average ROAS that channel has already banked?**

The weekly budget meeting almost always asks the wrong question. "Meta is at 3.1 ROAS and Google is at 2.4, so move money to Meta" treats **average** efficiency as if it were **marginal** efficiency — and those two numbers diverge hard once a channel starts to saturate. The dollar that *already* ran captured the cheapest, highest-intent impressions. The *next* dollar buys whatever is left: a worse audience, a higher-CPM slot, a less-qualified search query. This play finds where incremental spend still clears your margin-derived CPA ceiling — and where it has stopped — so you can place the **next increment** deliberately: **add**, **hold**, or **cut/test**. Output is a ranked call per channel, sized by marginal headroom, not by the trophy ROAS on the dashboard.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into Google Ads, Meta Ads Manager, TikTok, or your store — and the four numbers this play turns on are *exactly* the ones that live behind those logins and never appear in a generic answer:

> Marginal headroom is invisible from outside the platforms. It lives in **Google's "Search lost IS (budget)"**, **Meta's frequency and the marginal-CPA curve as you scaled**, **TikTok's small-sample response to the last budget bump**, and **your own contribution margin** — none of which a chatbot can see, and three of which the *average* ROAS number actively hides.

To run it manually you must:

1. Pull each channel's recent spend curve and read how CPA / ROAS moved *as spend rose* — the slope, not the average.
2. Pull Google **impression share lost to budget** vs. **lost to rank** (room to scale only exists in the budget-lost bucket).
3. Pull Meta **frequency** and audience size per ad set (saturation shows up as rising frequency at rising CPA).
4. Anchor everything to **contribution margin**, which sets the absolute CPA ceiling no channel may cross.

**The reasoning is free. The platform access — spend curves, impression-share splits, frequency, and margin in one place — is the wall.** That is what ShopMCP removes; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Marketing
- **Also useful for:** Performance Marketer (executes the increment), Founder/CEO (defends the reallocation), Finance (owns the contribution-margin CPA ceiling the whole play sits on).
- Run it **before** the weekly budget meeting and before any "shift $X from channel A to channel B" decision — so the move is sized by marginal return, not by last week's average.

## When To Run It

- **Cadence:** weekly — early in the week, once the prior week's orders and refunds have settled enough to read the spend-to-response slope cleanly.
- **Triggers:** a channel hitting or approaching budget-capped impression share, frequency climbing past ~3 on a core prospecting audience, a flat or rising blended MER while you keep adding budget, a new channel clearing its learning phase, or a planned budget increase that needs a destination.
- **Pre-requisite:** confirm attribution isn't drifting and that contribution margin is current. If platform-claimed conversions and commerce orders disagree, you'll mis-read which channel has headroom — reconcile first, or this play allocates into a tracking artifact.

## Required Evidence

- **Per-channel spend curve** — daily/weekly spend with the matched **CPA and ROAS trend as spend changed**, last 28–30 days plus the prior equal period. The *slope* is the evidence; a single-period average is not.
- **Google Ads** — spend, conversions, conversion value split by type (Brand / non-brand Search / Shopping / PMax), and crucially **Search impression share lost to budget vs. lost to rank**. Budget-lost IS at an on-target CPA is the cleanest "add here" signal in the whole play.
- **Meta Ads** — spend, CPA, ROAS, **frequency**, and audience size at ad-set level, plus how marginal CPA moved across the last scaling steps. Rising frequency + rising marginal CPA = saturation.
- **TikTok Ads** — spend, CPA, ROAS, and the response to the most recent budget change. Treat as **directional** at low volume — a strong slope on a small base is a test signal, not a scale signal.
- **Commerce (Shopify/Woo/BigCommerce/etc.)** — actual orders by source/UTM and **contribution margin** (per product or blended). Margin sets the CPA ceiling; without it you cannot say what "on-target" even means.

## Optional Evidence

- **LTV / payback by channel** — a channel can run above first-order CPA and still deserve the next dollar if payback lands inside your window; lets you scale on contribution rather than first-order ROAS.
- **Creative pipeline / fatigue state** — headroom is worthless if you have no fresh creative to spend it on; a saturating ad set may be a creative problem, not a channel ceiling.
- **Promo / seasonality calendar** — a promo window inflates marginal response and borrows future demand; scaling into it reads as headroom that won't persist.
- **Learning-phase and recent-edit status** — a budget jump resets Meta learning; the next-dollar read is unreliable until it re-stabilises.
- **Stock cover on top SKUs** — never point the marginal dollar at a channel selling a product about to stock out.

## How To Pull This Evidence

- **Google IS-lost-to-budget columns** — in Google Ads, open Campaigns → Columns → Modify columns → **Competitive metrics**, and enable **Search lost IS (budget)** alongside **Search lost IS (rank)** and **Search impression share**. Segment by campaign and by network so Shopping/PMax don't blur the Search read; only the *budget* column is scaling headroom — the *rank* column is a bid/quality problem.
- **Meta frequency** — in Ads Manager, set the level to **Ad set**, add the **Frequency** and **Reach** columns (Columns → Customize columns → Performance), and match the window to your spend curve. Read frequency next to **Audience size / Estimated audience** per ad set; rising frequency on a shrinking audience is the saturation tell.
- **Recent marginal-spend response** — for each channel, export daily spend with daily CPA/ROAS for the last 28–30 days and the prior equal period, then read CPA/ROAS *at the points where you changed budget* (the slope after each bump), not the period average. For TikTok specifically, isolate the days after the most recent budget change and treat a small base as directional.
- **Margin CPA ceiling** — from your store/finance data, take contribution margin per order (price − COGS − payment/fulfilment/variable costs), per product or blended; that margin is the maximum allowable CPA. Pull it from Shopify/Woo/BigCommerce order data joined to product costs, or from your finance sheet if margin lives there.
- **Gotchas** — match every window to the same date range or the slope lies; reconcile platform-claimed conversions against commerce orders before trusting any channel's headroom; exclude campaigns still in the learning phase or recently edited; and don't read a promo window or a near-stockout SKU as durable headroom.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Gate on trust and margin.** If platform-claimed conversions and commerce orders diverge materially for a channel, or contribution margin is missing, you can't locate real headroom → mark that channel **FIX** and exclude it from add/cut calls. The CPA ceiling = contribution margin per order; everything below is judged against it.
2. **Separate marginal from average.** For every channel, state the **average** CPA/ROAS *and* the **marginal** read (how CPA moved on the last increments of spend) side by side. If marginal CPA is already at or above the ceiling, average ROAS is irrelevant — that channel is done, however good its trophy number looks.
3. **Find genuine scaling headroom.** The cleanest "add" is **Google Search IS lost to budget** while on-target CPA holds — that is demand you're refusing to serve at a price you've already proven. Headroom also shows as a flat marginal CPA across recent scaling steps. *No* headroom: IS lost to **rank** (a bid/quality problem, not a budget one) — adding budget there buys nothing.
4. **Detect saturation and stop.** Rising **frequency** (≳3–4 on core prospecting) with **rising marginal CPA** and a shrinking addressable audience = the channel is saturating → **HOLD**, do not feed it the next dollar even if average ROAS still looks fine. The average is a memory of cheaper impressions you'll never buy again.
5. **Size the small-but-improving test.** A low-spend channel with an *improving* marginal response (TikTok bumped and CPA fell) is a **small test**, not a reallocation target — fund a capped increment, judge on trend, don't bet the budget on one good week.
6. **Apply the vetoes**, then assign **add / hold / cut-or-test** per channel with owner and recheck date, ranked by **marginal contribution the next dollar buys** — i.e. where the increment clears the CPA ceiling by the most.

## Manual Workflow

1. Pick the window (28–30 days to smooth weekly noise; pull the prior equal period for the slope).
2. For each channel, chart spend against CPA/ROAS over time and read the **marginal** trend — how the last increments performed — not just the period average.
3. Pull Google IS lost to **budget** vs **rank**; pull Meta **frequency** and audience size per ad set; note TikTok's response to its last budget change.
4. Overlay **contribution margin** to set the CPA ceiling, then mark each channel: headroom (add), saturating (hold), or small-and-improving (test).
5. Paste the prompt below with your per-channel table and the margin-derived CPA ceiling.
6. Pressure-test every "add" against the veto list (frequency, IS-lost-to-rank, learning phase, promo, stock), then convert the survivors into an increment plan with owner, dollar size, and recheck date.

## Copy-Paste Prompt

```text
You are my growth-marketing analyst running the "Marginal Budget Allocator" play.

GOAL: decide where the NEXT marginal dollar should go this week — ADD, HOLD, or
CUT/TEST per channel — ranked by the marginal contribution the next dollar buys.

CORE DISTINCTION YOU MUST HOLD:
- AVERAGE ROAS/CPA = what a channel has already banked across all spend. It is a memory
  of the cheapest impressions and tells you nothing about the next dollar.
- MARGINAL ROAS/CPA = what the NEXT increment returns, read from how CPA moved as spend
  rose. Diminishing returns mean these diverge. Allocate on the marginal read only.
- The CPA ceiling = my contribution margin per order. No "add" is allowed above it.

I will paste, per channel: spend curve with CPA/ROAS trend as spend changed; Google
Search impression share lost to BUDGET vs lost to RANK; Meta frequency + audience size;
TikTok response to its last budget change; and my contribution margin. Some may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical inputs
are the scaling-headroom signals (Google Search impression-share-lost-to-BUDGET, Meta
frequency/saturation) and a contribution-margin CPA ceiling — average ROAS alone is NOT
marginal ROAS and cannot stand in for them. If any of those critical inputs is missing,
STOP and return only (a) what's missing and (b) how to get it — never estimate it or proceed.

RULES:
- Gate first: if platform conversions and my commerce orders diverge, or margin is
  missing, mark that channel FIX and exclude it from add/cut calls. Do not guess headroom.
- State AVERAGE and MARGINAL efficiency side by side for every channel. If marginal CPA is
  at/above my ceiling, do not recommend ADD no matter how good the average looks.
- ADD only where there is real headroom: Google IS lost to BUDGET at on-target CPA, or a
  flat marginal CPA across recent scaling steps. IS lost to RANK is NOT budget headroom.
- HOLD a channel that is saturating: frequency rising past ~3-4 with rising marginal CPA
  and a shrinking audience. Average ROAS does not override this.
- For a small channel with improving marginal response, recommend a CAPPED TEST, not a
  reallocation. One good week is a weak read — require a trend.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read naming where the next dollar goes and why.
2. A ranked table using EXACTLY this header row, copied verbatim:
   | Channel | Spend (30d) | Avg ROAS/CPA | Marginal read | Headroom signal | Call | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a HOLD/FIX to a decision.
```

## Decision Rules

- **ADD (KEEP + scale)** — marginal CPA is at or below the contribution-margin ceiling *and* there is real headroom: Google Search IS lost to budget (not rank) at on-target CPA, or a flat marginal CPA across the last scaling steps. Fund the next increment here.
- **HOLD (WATCH)** — average ROAS still looks healthy but the channel is saturating: frequency past ~3–4 on core prospecting, marginal CPA rising toward the ceiling, audience tapped out. Maintain spend, do not add.
- **TEST (small REFRESH)** — a low-spend channel with an improving marginal response on a small base; fund a capped test increment and judge on trend, not on one week.
- **CUT (KILL the increment)** — marginal CPA is already above the ceiling and the slope is worsening, with no learning-phase or tracking veto; pull the *last* increment of spend back, don't necessarily zero the channel.
- **FIX** — attribution drift, missing contribution margin, or IS lost to rank masquerading as budget headroom makes the marginal read unsafe.
- Every recommendation must include **a number, source, time window, and confidence level** — and must state the *marginal* read, never just the average.

## Veto Rules

- Do **not** allocate on **average** ROAS — it is a memory of cheaper impressions and overstates what the next dollar returns. Require the marginal read.
- Do **not** treat headroom as infinite — once Google budget-lost IS approaches zero or Meta frequency climbs past ~3–4 at rising CPA, the next dollar is buying saturation.
- Do **not** read **IS lost to rank** as a reason to add budget — that's a bid/quality/relevance problem; more budget changes nothing.
- Do **not** add to or judge a **learning-phase** campaign on its marginal slope — a recent budget jump resets the algorithm and the read is noise.
- Do **not** let any "add" cross the **contribution-margin CPA ceiling**; margin, not platform ROAS, defines what on-target means.
- Do **not** scale on **one week** of response, inside a promo window, or into a SKU short on stock — confirm the trend on a clean window first.
- Do **not** shift budget, raise a cap, or pause anything without an explicit human approval step.

## Output Contract

A table ranked by the marginal contribution the next dollar buys — not by average ROAS:

| Channel | Spend (30d) | Avg ROAS/CPA | Marginal read | Headroom signal | Call | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| Example row | $X | 2.6 / $38 | CPA flat as spend rose | 22% IS lost (budget) | Add | Marketing | 7 days |

## Worked Example

> **Executive read:** The next dollar goes to **Google Shopping**, not to Meta — even though Meta posts the higher average ROAS (3.4). Shopping is leaving **40% of impression share on the table to budget** at an on-target **$42 CPA**, so incremental spend there is demand we're refusing to serve at a price we've already proven. Meta prospecting is saturating (frequency 4.3, marginal CPA climbing toward the $48 ceiling) — **hold**, don't feed it; and TikTok is small but improving, worth a **capped $1.5k test**, not a reallocation.

| Channel | Spend (30d) | Avg ROAS / CPA | Marginal read | Headroom signal | Call | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| Google – Shopping | $9,400 | 2.9 / **$42** | CPA flat across last 3 scaling steps | **40% IS lost to budget**, on-target | **ADD (+$3k)** | Marketing + Perf | 7 days |
| Meta – Prospecting | $18,600 | **3.4** / $46 | Marginal CPA rising $41→$52 as spend rose | **Frequency 4.3**, audience tapped | **HOLD** | Marketing | 7 days |
| Google – Non-brand Search | $6,200 | 2.5 / $44 | Flat marginal CPA, on-target | IS lost mostly to **rank**, not budget | **HOLD** (raise bids, not budget) | Perf | 14 days |
| TikTok – TopFunnel | $2,100 | 1.8 / $61 | CPA improving $74→$61 after last bump | Small base, slope improving | **TEST (+$1.5k cap)** | Marketing | 7 days |
| Meta – Retargeting | $3,300 | 5.1 / $19 | Marginal CPA flat but audience tiny | Frequency 6.8, harvest only | **HOLD** (no scale headroom) | Marketing | 14 days |

Note how the answer *inverts* the dashboard: Meta Prospecting has the best average ROAS yet gets no new money because its **marginal** dollar is saturating, while Google Shopping — the lower-average channel — earns the increment because budget-capped impression share proves the next dollar still clears the ceiling. Retargeting's gorgeous 5.1 ROAS is a harvest line with no headroom at frequency 6.8: scaling it just raises frequency on people already converting.

## Common Failure Modes

- Moving budget to the channel with the highest **average** ROAS, straight into its saturation zone.
- Reading **IS lost to rank** as room to scale and pouring budget into a bid/quality problem.
- Ignoring **frequency** — adding spend to a tapped audience that's already seeing the ad 5+ times.
- Betting a reallocation on **one good week** from a small channel instead of a confirmed trend.
- Allowing an "add" to cross the **contribution-margin CPA ceiling** because platform ROAS still looked positive.
- Scaling into a **promo window** or a stockout and mistaking borrowed demand for durable headroom.

## Run This Play With Live Data

**Manual version:** pull each channel's spend curve and read the marginal slope, pull Google's IS-lost-to-budget-vs-rank split, pull Meta frequency and audience size, anchor it all to contribution margin, then decide where the next dollar clears the ceiling — every week, before the numbers go stale.

**ShopMCP version:** connect Google, Meta, TikTok, and your store once. Ask the question; ShopMCP pulls live spend curves, computes the **marginal** read beside the average, surfaces Google budget-lost impression share and Meta frequency, anchors the CPA ceiling to your real contribution margin, and returns the ranked **add / hold / test** call. It stays **read-only** until you explicitly approve a budget move.

> No Google + Meta + TikTok + store connection inside your AI assistant? That's the wall every manual run hits — marginal headroom is impossible to see without impression-share, frequency, spend-curve, and margin data in one place. ShopMCP *is* that access, and the same playbook runs in one prompt instead of a spreadsheet afternoon.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Marginal Budget Allocator play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual exports and stale CSVs from three ad platforms and your store every week.
- Reconstructing each channel's spend-to-response slope by hand to find the marginal read.
- Stitching together Google impression share, Meta frequency, and contribution margin to locate real headroom.
- Rebuilding the same average-vs-marginal allocation sheet every cycle.

---

*Contributed by [Perceptiv](https://perceptiv.digital).*
