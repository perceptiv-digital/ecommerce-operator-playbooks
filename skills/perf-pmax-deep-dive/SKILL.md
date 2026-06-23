---
name: perf-pmax-deep-dive
description: "When an ecommerce operator needs to decide: Is Performance Max scaling profitably or hiding waste? Runs the Performance Max Deep Dive play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Performance Max Deep Dive', 'Google Ads', 'Google Merchant Center', 'Acquisition Efficiency'."
license: CC-BY-4.0
metadata:
  persona: Performance Marketer
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Performance Max Deep Dive

**Operating question:** Is Performance Max scaling profitably or hiding waste?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Google Ads — PMax campaign level** — cost, conversions, conversion value, ROAS, and conversion **lag**, last 28–30 days plus the prior equal period.
- **Google Ads — channel/placement split** — spend and conversion value across **Search vs Shopping vs Display vs YouTube vs Gmail/Discover**. Display and Gmail are where padding hides; demand this split or the rest of the play is blind.
- **Brand vs non-brand** — brand-query conversions and value (from the search-term insights, brand-list setting, and your Brand Search / Search Console brand volume) versus everything else. This is the single most important cut.
- **New-customer data** — new-customer conversions and **new-customer value** (requires the customer-acquisition / first-party customer-list setup) vs returning.
- **Asset-group and listing-group performance** — conversions, value, and "Low / Good / Best" asset-group strength; listing-group ROAS by product/category.
- **Search-term & category insights** — the category and search-term insight report for the window.
- **Google Merchant Center** — product status, disapprovals, price/availability mismatches, and feed diagnostics for the products PMax is pushing.
- **Targets & margin** — target ROAS / CPA, contribution margin by product or blended, and your new-customer payback target.

Optional, if available:

- **Brand Search & standard Shopping impression share** — IS lost over the window, to detect PMax cannibalising your own campaigns.
- **tROAS / budget change history** — a target or budget edit resets PMax's learning; an edit inside the window invalidates trend reads.
- **Promo calendar** — a promo window inflates conversion value and borrows future demand.
- **Seasonality / demand index** — to separate "PMax scaled" from "the category got hot."
- **Asset launch dates** — to tell a genuinely fatiguing asset group from one that is simply still ramping.

## How to decide — in order

1. **Gate on conversion integrity.** If Google Ads conversions and your commerce/GA4 orders diverge by more than ~15% for the window, or a tracking/consent change landed mid-window, set the campaign to **FIX** and stop. PMax optimises toward whatever it's told converts — bad signal means bad spend.
2. **Split brand from non-brand first — before anything else.** Estimate brand share of conversions and value. If brand is a large slice (commonly 40–60%+ on accounts with strong brand demand), the blended ROAS is mostly harvest, not growth. Compute **ex-brand ROAS** and judge PMax against your target on *that* number only.
3. **Demand the channel/placement breakdown.** Pull Search/Shopping vs Display/YouTube/Gmail. If a large share of conversions is Display or Gmail at suspiciously high ROAS, suspect **view-through and low-intent padding** — discount those conversions and recompute.
4. **Check new-customer value.** Is PMax acquiring new customers, or recycling existing ones? Flat/declining new-customer count while ROAS rises = **coasting on brand and remarketing**, not scaling.
5. **Find the cannibalisation.** Did Brand Search or standard Shopping lose impression share as PMax spend rose? If PMax "wins" are conversions your other campaigns would have taken anyway, the incremental ROAS is far below the reported one.
6. **Drill assets, listing groups, and feed.** Rank asset groups and listing groups by ex-brand contribution; flag "Low" asset-group strength and any Merchant Center disapprovals starving high-intent products.
7. **Overlay margin, then apply the vetoes** and assign status + owner + recheck date. A 4.0 blended ROAS on a 30%-margin catalogue, two-thirds brand, is not the win the platform claims.

## The prompt to run

```text
You are my Google Ads analyst running the "Performance Max Deep Dive" play.

GOAL: decide whether Performance Max is scaling NEW, PROFITABLE demand or coasting on
brand and padding ROAS with low-value Display/Gmail conversions. Output a defensible
KILL / REFRESH / WATCH / KEEP / FIX call, judged on EX-BRAND, margin-adjusted economics.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the brand-vs-non-brand
split (or the inputs to estimate it, plus the channel/placement breakdown) is missing, STOP and
return only (a) what's missing and (b) how to get it — never estimate it or proceed. Without
separating brand from non-brand you cannot judge PMax, so the blended ROAS alone is not enough
to begin.

I will paste: the PMax campaign table (period + prior period), a brand/non-brand split or
the inputs to estimate one, the channel/placement split (Search/Shopping/Display/YouTube/
Gmail), new-vs-returning customer value, asset-group and listing-group performance,
search-term/category insights, Merchant Center status, and my targets and margin. Some data
may be missing.

RULES:
- Conversion-integrity gate first: if Google Ads conversions and my commerce/GA4 orders
  diverge >15%, or tracking changed mid-window, mark FIX and stop.
- Split brand from non-brand BEFORE judging. Report blended ROAS and EX-BRAND ROAS
  separately, and judge PMax only on the ex-brand number vs my target.
- Demand the channel split. If Display/Gmail carry a large, high-ROAS conversion share,
  flag likely view-through/low-intent padding and recompute discounted.
- Check new-customer value: rising ROAS with flat/declining new customers = coasting.
- Check cannibalisation: if Brand Search / standard Shopping lost impression share as PMax
  scaled, state that PMax's incremental ROAS is below the reported one.
- Never recommend scaling budget on the blended figure alone.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read (lead with blended vs ex-brand ROAS).
2. A ranked table using EXACTLY this header row:
   | Lever | Evidence (number / source / window) | Blended ROAS | Ex-brand ROAS | Status | Why | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **KILL** — only at the sub-unit level PMax actually exposes (an asset group, a listing-group node, or a product subset), where ex-brand contribution is negative over ≥28 days with adequate volume and no veto applies. You rarely KILL a whole PMax campaign; you starve its waste.
- **REFRESH** — ex-brand ROAS is decaying on fatiguing or "Low"-strength asset groups, but the audience/offer is still viable: rebuild creative assets, tighten the asset group, or split high-intent products into their own campaign.
- **WATCH** — directional or early: campaign still in its ramp, brand/non-brand split is estimated not measured, conversion lag not yet settled, or the window is polluted by a promo, tROAS change, or seasonality.
- **KEEP** — ex-brand, margin-adjusted ROAS is inside the target band, new-customer value is real, and no cannibalisation signal is present.
- **FIX** — conversion-tracking drift, a missing brand/non-brand split, an unavailable channel breakdown, or Merchant Center disapprovals make a safe call impossible.
- Every recommendation must include a **number, source, time window, and confidence level** — and must state blended ROAS and ex-brand ROAS as two separate numbers, never one.

## Vetoes — stop if any apply

- Do **not** judge PMax on blended ROAS — it bundles cheap brand harvest with the non-brand prospecting you're actually paying for. Always split brand from non-brand and decide on the ex-brand number.
- Do **not** scale PMax budget on the blended figure alone — demand the channel breakdown and the new-customer value first.
- Do **not** trust a high ROAS that is propped up by Display, Gmail, or view-through conversions — discount low-intent placements before believing the number.
- Do **not** count brand or remarketing conversions as new demand, or cannibalised Brand Search / standard Shopping conversions as incremental — net them out.
- Do **not** scale a product PMax is pushing if it has low stock, a Merchant Center disapproval, or missing price/availability.
- Do **not** act on a window containing a tROAS change, budget reset, or promo without flagging it as non-comparable.
- Do **not** make a profit claim without real margin, or recommend any budget shift, target change, exclusion, or pause without an explicit human approval step.

## Output

A table ranked by **ex-brand contribution at risk**, stating blended and ex-brand ROAS as separate columns:

| Lever | Evidence (number / source / window) | Blended ROAS | Ex-brand ROAS | Status | Why | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| PMax – Core catalogue | 4.1 ROAS blended, 58% conv brand (search-term insights, 28d) | 4.1 | 1.7 | REFRESH | Coasting on brand; ex-brand under 2.5 target | Perf | 7 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
