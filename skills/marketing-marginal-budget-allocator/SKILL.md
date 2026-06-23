---
name: marketing-marginal-budget-allocator
description: "When an ecommerce operator needs to decide: Where should the next marginal dollar go? Runs the Marginal Budget Allocator play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Marginal Budget Allocator', 'Commerce', 'Meta Ads', 'Google Ads', 'Tiktok Ads', 'Acquisition Efficiency'."
license: CC-BY-4.0
metadata:
  persona: Head of Marketing
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Marginal Budget Allocator

**Operating question:** Where should the next marginal dollar go?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Per-channel spend curve** — daily/weekly spend with the matched **CPA and ROAS trend as spend changed**, last 28–30 days plus the prior equal period. The *slope* is the evidence; a single-period average is not.
- **Google Ads** — spend, conversions, conversion value split by type (Brand / non-brand Search / Shopping / PMax), and crucially **Search impression share lost to budget vs. lost to rank**. Budget-lost IS at an on-target CPA is the cleanest "add here" signal in the whole play.
- **Meta Ads** — spend, CPA, ROAS, **frequency**, and audience size at ad-set level, plus how marginal CPA moved across the last scaling steps. Rising frequency + rising marginal CPA = saturation.
- **TikTok Ads** — spend, CPA, ROAS, and the response to the most recent budget change. Treat as **directional** at low volume — a strong slope on a small base is a test signal, not a scale signal.
- **Commerce (Shopify/Woo/BigCommerce/etc.)** — actual orders by source/UTM and **contribution margin** (per product or blended). Margin sets the CPA ceiling; without it you cannot say what "on-target" even means.

Optional, if available:

- **LTV / payback by channel** — a channel can run above first-order CPA and still deserve the next dollar if payback lands inside your window; lets you scale on contribution rather than first-order ROAS.
- **Creative pipeline / fatigue state** — headroom is worthless if you have no fresh creative to spend it on; a saturating ad set may be a creative problem, not a channel ceiling.
- **Promo / seasonality calendar** — a promo window inflates marginal response and borrows future demand; scaling into it reads as headroom that won't persist.
- **Learning-phase and recent-edit status** — a budget jump resets Meta learning; the next-dollar read is unreliable until it re-stabilises.
- **Stock cover on top SKUs** — never point the marginal dollar at a channel selling a product about to stock out.

## How to decide — in order

1. **Gate on trust and margin.** If platform-claimed conversions and commerce orders diverge materially for a channel, or contribution margin is missing, you can't locate real headroom → mark that channel **FIX** and exclude it from add/cut calls. The CPA ceiling = contribution margin per order; everything below is judged against it.
2. **Separate marginal from average.** For every channel, state the **average** CPA/ROAS *and* the **marginal** read (how CPA moved on the last increments of spend) side by side. If marginal CPA is already at or above the ceiling, average ROAS is irrelevant — that channel is done, however good its trophy number looks.
3. **Find genuine scaling headroom.** The cleanest "add" is **Google Search IS lost to budget** while on-target CPA holds — that is demand you're refusing to serve at a price you've already proven. Headroom also shows as a flat marginal CPA across recent scaling steps. *No* headroom: IS lost to **rank** (a bid/quality problem, not a budget one) — adding budget there buys nothing.
4. **Detect saturation and stop.** Rising **frequency** (≳3–4 on core prospecting) with **rising marginal CPA** and a shrinking addressable audience = the channel is saturating → **HOLD**, do not feed it the next dollar even if average ROAS still looks fine. The average is a memory of cheaper impressions you'll never buy again.
5. **Size the small-but-improving test.** A low-spend channel with an *improving* marginal response (TikTok bumped and CPA fell) is a **small test**, not a reallocation target — fund a capped increment, judge on trend, don't bet the budget on one good week.
6. **Apply the vetoes**, then assign **add / hold / cut-or-test** per channel with owner and recheck date, ranked by **marginal contribution the next dollar buys** — i.e. where the increment clears the CPA ceiling by the most.

## The prompt to run

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

## Decision rules

- **ADD (KEEP + scale)** — marginal CPA is at or below the contribution-margin ceiling *and* there is real headroom: Google Search IS lost to budget (not rank) at on-target CPA, or a flat marginal CPA across the last scaling steps. Fund the next increment here.
- **HOLD (WATCH)** — average ROAS still looks healthy but the channel is saturating: frequency past ~3–4 on core prospecting, marginal CPA rising toward the ceiling, audience tapped out. Maintain spend, do not add.
- **TEST (small REFRESH)** — a low-spend channel with an improving marginal response on a small base; fund a capped test increment and judge on trend, not on one week.
- **CUT (KILL the increment)** — marginal CPA is already above the ceiling and the slope is worsening, with no learning-phase or tracking veto; pull the *last* increment of spend back, don't necessarily zero the channel.
- **FIX** — attribution drift, missing contribution margin, or IS lost to rank masquerading as budget headroom makes the marginal read unsafe.
- Every recommendation must include **a number, source, time window, and confidence level** — and must state the *marginal* read, never just the average.

## Vetoes — stop if any apply

- Do **not** allocate on **average** ROAS — it is a memory of cheaper impressions and overstates what the next dollar returns. Require the marginal read.
- Do **not** treat headroom as infinite — once Google budget-lost IS approaches zero or Meta frequency climbs past ~3–4 at rising CPA, the next dollar is buying saturation.
- Do **not** read **IS lost to rank** as a reason to add budget — that's a bid/quality/relevance problem; more budget changes nothing.
- Do **not** add to or judge a **learning-phase** campaign on its marginal slope — a recent budget jump resets the algorithm and the read is noise.
- Do **not** let any "add" cross the **contribution-margin CPA ceiling**; margin, not platform ROAS, defines what on-target means.
- Do **not** scale on **one week** of response, inside a promo window, or into a SKU short on stock — confirm the trend on a clean window first.
- Do **not** shift budget, raise a cap, or pause anything without an explicit human approval step.

## Output

A table ranked by the marginal contribution the next dollar buys — not by average ROAS:

| Channel | Spend (30d) | Avg ROAS/CPA | Marginal read | Headroom signal | Call | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| Example row | $X | 2.6 / $38 | CPA flat as spend rose | 22% IS lost (budget) | Add | Marketing | 7 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
