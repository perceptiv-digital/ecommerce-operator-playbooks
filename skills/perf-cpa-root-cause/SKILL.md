---
name: perf-cpa-root-cause
description: "When an ecommerce operator needs to decide: Why did CPA spike and what should be checked first? Runs the CPA Spike Root Cause Explainer play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'CPA Spike Root Cause Explainer', 'Commerce', 'Meta Ads', 'Google Ads', 'Tiktok Ads', 'Acquisition Efficiency'."
license: CC-BY-4.0
metadata:
  persona: Performance Marketer
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# CPA Spike Root Cause Explainer

**Operating question:** Why did CPA spike and what should be checked first?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **The CPA move itself** — CPA this period vs. the prior equal period, per channel and ideally per campaign. State the windows explicitly.
- **The decomposition terms** — **CPM, CTR, and CVR** (or click-to-order rate) for the same two windows. Without these three you cannot attribute the move; you are guessing.
- **Platform-reported conversions** — purchases/conversions as the ad platform counts them, per channel, for both windows.
- **Real commerce orders** — orders by source/UTM from Shopify/Woo/BigCommerce for the same windows, so you can reconcile against platform claims.
- **Site & checkout CVR** — store-side sessions → orders, ideally split add-to-cart → checkout → purchase, so a checkout break is visible.
- **Targets** — your target CPA (and MER/ROAS) so "spike" is measured against a number, not a vibe.

Optional, if available:

- **Tracking/deploy log** — pixel, CAPI, GA4, or GTM changes; theme or checkout deploys; consent-banner edits. The first thing that breaks attribution.
- **Stock / availability** for the products these campaigns drive — an out-of-stock bestseller craters CVR with the ads untouched.
- **Promo calendar** — a promo that ended last week inflated the *prior* window, so this week only looks like a spike.
- **Campaign edit / learning-phase log** — a budget or creative change resets learning and distorts CPA for days.
- **Auction context** — seasonal demand, a competitor surge, or audience saturation (rising frequency) that lifts CPM.

## How to decide — in order

Walk these five in sequence. Stop at the first one that explains the move — do not skip ahead to creative.

1. **Tracking / attribution break (check FIRST).** Did conversions stop being *recorded*? Compare platform-reported conversions to real commerce orders. If platform conversions fell but commerce orders held roughly flat — or platform-vs-commerce drift jumped past ~15% versus its normal baseline — the "spike" is a measurement artifact. Look for a pixel/CAPI/GA4/GTM change, a checkout or consent-banner deploy, or iOS/ad-blocker signal loss. **Verdict: FIX. Do not touch budgets or creative.**
2. **CVR — site, checkout, or stock.** If tracking is clean, ask whether you stopped *converting* the clicks you already paid for. CPA rises when CVR falls even if every ad metric is perfect. Pull store-side CVR for both windows; a same-week drop (e.g. 2.x% → 1.x%) localizes to the **site, not the ad** — a checkout regression, a broken discount code, a price/shipping change, or an out-of-stock hero product. **Verdict: FIX/REFRESH the site or offer; leave the campaign alone.**
3. **CTR — creative fatigue.** Only now look at the ad. If **CPM is roughly flat but CTR has declined**, the auction is fine and the creative has stopped earning the click — classic fatigue, usually with rising frequency. **Verdict: REFRESH creative.**
4. **CPM — auction / audience pressure.** If **CTR held but CPM rose**, you are paying more for the same impressions: seasonality (Q4, a holiday), a competitor entering your auction, or a narrow audience saturating (frequency climbing). The ad is doing its job; the market got more expensive. **Verdict: WATCH, or broaden/adjust targeting — rarely KILL.**
5. **A real efficiency decline.** If none of the above moved and CPA is genuinely, durably above target across a clean window, it is a real performance problem. Re-rank by contribution at risk and decide KILL vs. REFRESH on the unit. **Verdict: KILL or REFRESH on the merits.**

## The prompt to run

```text
You are my performance-marketing analyst running the "CPA Spike Root Cause Explainer" play.

GOAL: explain why CPA spiked by decomposing the move, and tell me what to check FIRST —
in the correct diagnostic order, so I don't blame creative for a tracking or site problem.

DECOMPOSITION: CPA ~= CPM / (CTR x CVR). A CPA move is one of these terms moving, or a
fifth cause underneath them: conversions stopped being recorded.

I will paste, per channel, for THIS period and the PRIOR equal period: CPA, CPM, CTR,
platform-reported conversions, real commerce orders, site/checkout CVR, current stock,
promo calendar, recent campaign edits, and my target CPA. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical inputs
are the CPM, CTR, and CVR decomposition terms for BOTH periods AND the tracking check
(platform-reported conversions vs. real commerce orders) plus site/checkout CVR — you
cannot rule out a tracking break or a site leak without them, and you must not blame the
ad before both are ruled out. If any critical input is missing, STOP and return only
(a) what's missing and (b) how to get it — never estimate it or proceed.

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
2. A decomposition table using EXACTLY this header row:
   | Channel | CPA Δ | CPM Δ | CTR Δ | CVR Δ | Term that moved |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace
   the table with prose.
3. A decision table: Item | Evidence (number, source, window, confidence) | Status | First check | Owner | Recheck.
4. Vetoes/caveats that downgraded any call.
5. What evidence is blocked and what would upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **FIX** — the move traces to a tracking break (platform conversions diverging from commerce orders) or to a site/checkout/stock CVR collapse. The campaign is not the problem; do not reallocate budget on top of it.
- **REFRESH** — CTR has decayed at flat CPM (creative fatigue), or CVR slipped to a creative/landing mismatch, while the audience and offer remain viable.
- **WATCH** — the spike is CPM-driven (auction/seasonality/saturation) with CTR intact, or it rests on a single noisy 7-day window. Directional, not yet actionable.
- **KEEP** — CPA is inside the target band on a clean window and no decomposition term has moved adversely.
- **KILL** — reserved for step 5: a real, durable efficiency decline on a clean, well-tracked window with adequate sample, and no veto protecting the unit.
- Every recommendation must include a **number, source, time window, and confidence level** — and must name *which* decomposition term moved, not just "CPA went up."

## Vetoes — stop if any apply

- **Never blame the creative before ruling out tracking and site CVR.** Steps 1 and 2 come first; a REFRESH that skips them is a guess.
- Do not act on a single noisy week — one 7-day window is not a trend; confirm on 14d before you KILL or REFRESH.
- Do not call it a spike inside or just after a **promo window** — the promo inflated the comparison baseline on one side.
- Do not judge CPA on a campaign that had a **budget/creative edit or a learning reset** in the window; the algorithm is mid-recalibration.
- Do not treat **a single platform's CPA as commerce truth** — reconcile platform-reported conversions against real orders first.
- Do not recommend pauses, budget shifts, creative swaps, or catalog changes without an explicit human approval step.

## Output

Two tables: a **decomposition** that shows which term moved, then a **decision** table ranked by impact.

Decomposition (this period vs. prior equal period):

| Channel | CPA Δ | CPM Δ | CTR Δ | CVR Δ | Term that moved |
|---|---|---|---|---|---|
| Meta – Prospecting | +45% | +2% | −3% | −38% | CVR (site) |

Decision:

| Item | Evidence (number, source, window, confidence) | Status | First check | Owner | Recheck |
|---|---|---|---|---|---|
| Meta – Prospecting | CVR 2.4%→1.5%, Shopify, 7d vs 7d, high | FIX | Checkout deploy on the 14th | Web + Perf | 3 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
