---
name: marketing-brand-cannibalisation
description: "When an ecommerce operator needs to decide: Are paid campaigns buying demand that organic search would have captured? Runs the Brand Cannibalisation Audit play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Brand Cannibalisation', 'Google Ads', 'Google Search Console', 'Acquisition Efficiency'."
license: CC-BY-4.0
metadata:
  persona: Head of Marketing
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Brand Cannibalisation Audit

**Operating question:** Are paid campaigns buying demand that organic search would have captured?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Google Ads — Search Terms report**, brand queries only, last 30 days plus the prior 30: spend, clicks, impressions, conversions, conversion value, CPC, and search-term match against your brand exact/phrase keywords.
- **Google Ads — Auction Insights** per brand campaign: which domains appear, their **impression share** and **overlap rate** on your brand terms. This is the single most important input — it tells you whether the spend is defensive.
- **Search Console — brand queries**, same window: **average position**, **clicks**, **impressions**, and **organic CTR**. Confirm you actually hold position 1.0, not 1.4 averaged across a long tail.
- **Brand keyword list** — the explicit set of terms you count as "brand" (your name, common misspellings, name + product, name + "discount code"). Cannibalisation differs sharply across these.

Optional, if available:

- **Live SERP screenshots** (mobile + desktop) for your top 3–5 brand terms — to catch "rank #1 but pushed below the fold" cases that GSC position alone hides.
- **A geo or time holdout result** if you've ever paused brand in a region — this is the only true incrementality proof and overrides every estimate below.
- **Contribution margin** on brand-driven orders — to express cannibalised spend as profit recovered, not just spend cut.
- **Promo / launch calendar** — a sale or PR spike inflates brand demand and changes the paid-vs-organic split for that window.
- **Affiliate / coupon-site activity** on brand terms — coupon affiliates bidding on your brand are a different leak with a different fix.

## How to decide — in order

1. **Gate on tracking and rank confidence.** If brand conversions are drifting between Ads and GA4, or your GSC brand position is averaged across a noisy long tail (so you can't confirm a true #1), set the campaign to **FIX** and stop. You cannot size cannibalisation on an unstable organic baseline.
2. **Check for defenders first (the veto that protects spend).** Open auction insights per brand term. On any term where a competitor holds meaningful impression share, the paid click is plausibly incremental → that slice is **KEEP / defensive**, never a KILL candidate. Quantify it: what share of brand impressions face a competitor ad?
3. **Confirm you actually own organic #1.** For the remaining no-competitor terms, verify GSC average position ≤ 1.3 **and** a healthy organic CTR. If you don't hold the top organic spot, organic would *not* have captured the click cleanly → **WATCH**, not KILL.
4. **Check SERP layout, not just position.** Even at organic #1, if shopping tiles, sitelinks, or an AI overview push your organic result below the fold on mobile, the paid click buys visibility you'd otherwise lose → downgrade to **WATCH / REFRESH**.
5. **Size the cannibalised slice.** For terms that survive 2–4 (own #1, no competitor, organic above the fold), estimate cannibalised spend = brand spend on those terms × estimated organic-recapture rate. Label it an **estimate** — the honest range, not a point claim.
6. **Rank by cannibalised spend and assign status + owner + the holdout test** that would convert the estimate into proof.

## The prompt to run

```text
You are my paid-search analyst running the "Brand Cannibalisation Audit" play.

GOAL: estimate how much of my brand-term paid spend is cannibalising free organic
clicks vs. how much is genuinely defensive/incremental, then rank brand campaigns or
ad groups by estimated cannibalised spend.

I will paste: my brand keyword list, the Google Ads Search Terms report for brand
queries (spend, clicks, conversions, value), Search Console for the same queries
(avg position, clicks, impressions, organic CTR), and auction insights per brand
campaign (competitor domains + impression share). Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical
input is brand-term paid spend/impressions AND organic brand ranking + competitor
presence on those SERPs — without competitor presence you can't tell defensible from
cannibalised. If that critical input is missing, STOP and return only (a) what's
missing and (b) how to get it — never estimate it or proceed.

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
2. A ranked table using exactly this header row:
| Brand campaign / term | Brand spend (30d) | My organic position | Competitor on SERP? (impr share) | SERP layout | Est. cannibalised $ | Status | Owner | Holdout to confirm |
Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the table with prose.
3. Vetoes/caveats that protected any spend or downgraded any recommendation.
4. The exact holdout test (geo or time) that would turn the top estimate into proof.
```

## Decision rules

- **KILL / scale down** — own organic position ≤ 1.3, **no** competitor on the SERP, organic result above the fold, ≥30 days of data, and the estimated cannibalised slice is material. Cut in stages, never all at once.
- **REFRESH** — brand spend justified but inefficiently structured: bidding on terms that should be a tightly-controlled exact-match brand campaign, or paying to defend a buried SERP that better organic sitelinks/structured data would fix more cheaply.
- **WATCH** — directional only: organic position not confidently #1, SERP layout pushes organic below the fold, a competitor intermittently appears, or the window is polluted by a promo/PR spike.
- **KEEP** — competitor holds meaningful impression share on the term, so the paid click is plausibly incremental and defensive. This spend is doing a job.
- **FIX** — conversion tracking drift, an unstable/averaged GSC brand position, or missing auction-insights data prevents a safe estimate.
- Every recommendation carries a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** call spend cannibalised where a competitor holds meaningful brand impression share — that paid click is defensive and likely incremental.
- Do **not** call spend cannibalised unless you confirm you hold organic position #1 *and* sit above the fold on mobile — GSC position alone is not enough.
- Do **not** present a modelled recapture rate as fact. Cannibalised-spend figures are **estimates** until a geo/time holdout proves them.
- Do **not** cut all brand spend at once. Going dark on brand can invite competitor encroachment and a higher CPC to win the term back later — stage the cut and watch auction insights.
- Do **not** size cannibalisation on a noisy/averaged GSC brand position; brand position varies by query and by day.
- Do **not** pause, shift budget, or change campaign structure without an explicit human approval step.

## Output

A table ranked by **estimated cannibalised spend**, with the defensible slice and the confirming holdout test called out:

| Brand campaign / term | Brand spend (30d) | My organic position | Competitor on SERP? (impr share) | SERP layout | Est. cannibalised $ | Status | Owner | Holdout to confirm |
|---|---|---|---|---|---|---|---|---|
| Brand exact – core name | $2,100 | 1.0 | No (most terms) | Organic above fold | ~$1,365 (est., ±15%) | REFRESH | Head of Mktg + Perf | 4-week geo holdout |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
