---
schema_version: 1
slug: "perf-pmax-deep-dive"
title: "Performance Max Deep Dive"
summary: "Performance Max Deep Dive helps ecommerce operators answer: Is Performance Max scaling profitably or hiding waste?"
operating_question: "Is Performance Max scaling profitably or hiding waste?"
short_title: "Performance Max Deep Dive"
primary_persona: "performance"
personas: ["performance"]
category: "acquisition-efficiency"
platforms: ["google-ads", "google-merchant-center"]
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/perf-pmax-deep-dive"
shopmcp_prompt: "Run the Performance Max Deep Dive play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Performance Max Deep Dive

## Operating Question

**Is Performance Max actually scaling new, profitable demand — or is it coasting on brand traffic and padding the ROAS with low-value Display and Gmail conversions?**

PMax is a black box by design: one campaign, one ROAS number, and Google deciding behind the curtain how much of your budget flows to Search, Shopping, Display, YouTube, and Gmail. The single blended ROAS it reports is the most dangerous number in your account, because it bundles cheap, near-certain **brand** conversions (which you'd have won for free) with the expensive **non-brand** prospecting you actually paid PMax to do. This play pierces the opacity: it splits brand from non-brand, forces the channel/placement breakdown, isolates new-customer value, and finds where PMax is cannibalising your Brand Search and standard Shopping campaigns — so you can tell scaling apart from coasting before you add another dollar.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot open your Google Ads account or your Merchant Center feed, and PMax hides most of what matters even from operators who *can*. To run this manually you have to:

1. Pull the PMax campaign's blended numbers, then reconstruct the brand/non-brand split that Google does not give you in one report — usually by cross-referencing the search-term insights, the brand-list setting, and your own brand-query volume from a Brand Search campaign or Search Console.
2. Reassemble the channel/placement split, which PMax actively withholds — you need the `campaign.advertising_channel_type` breakdowns, the asset-group reporting, and (for the Shopping slice) the listing-group view, then stitch them together.
3. Mine the search-term *insights* and category report (PMax gives categories, not raw terms) to see what demand it actually bought.
4. Overlay new-vs-returning customer value, Merchant Center disapprovals, and your real margin — none of which live inside the PMax ROAS.

**The thinking in this playbook is free. The data access — and the de-blackboxing — is the hard part, and that is exactly what ShopMCP connects.** If your AI assistant has no live line into Google Ads and Merchant Center, that wall is where every manual run stops. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Performance Marketer
- **Also useful for:** Head of Ecommerce (is paid growth real or borrowed?), Founder/CEO (is PMax a growth engine or a brand-harvesting tax?).
- Run it **before** you raise the PMax budget or tROAS target, and whenever a stakeholder quotes the blended PMax ROAS as proof the channel is "working."

## When To Run It

- **Cadence:** weekly — early in the week, once the prior week's conversions have largely settled (PMax conversion lag can run 3–5 days on considered purchases).
- **Triggers:** a PMax budget-increase request; blended PMax ROAS rising while total-account new-customer count is flat or falling (the classic coasting signature); a Brand Search campaign losing impression share to "another campaign"; a Merchant Center disapproval spike; onboarding a new PMax campaign past its ~6-week ramp.
- **Pre-requisite:** confirm the **brand list / brand exclusions** setting and your conversion-tracking are stable. If brand exclusions changed in the window, the brand/non-brand split is not comparable period-over-period — note it before judging.

## Required Evidence

- **Google Ads — PMax campaign level** — cost, conversions, conversion value, ROAS, and conversion **lag**, last 28–30 days plus the prior equal period.
- **Google Ads — channel/placement split** — spend and conversion value across **Search vs Shopping vs Display vs YouTube vs Gmail/Discover**. Display and Gmail are where padding hides; demand this split or the rest of the play is blind.
- **Brand vs non-brand** — brand-query conversions and value (from the search-term insights, brand-list setting, and your Brand Search / Search Console brand volume) versus everything else. This is the single most important cut.
- **New-customer data** — new-customer conversions and **new-customer value** (requires the customer-acquisition / first-party customer-list setup) vs returning.
- **Asset-group and listing-group performance** — conversions, value, and "Low / Good / Best" asset-group strength; listing-group ROAS by product/category.
- **Search-term & category insights** — the category and search-term insight report for the window.
- **Google Merchant Center** — product status, disapprovals, price/availability mismatches, and feed diagnostics for the products PMax is pushing.
- **Targets & margin** — target ROAS / CPA, contribution margin by product or blended, and your new-customer payback target.

## Optional Evidence

- **Brand Search & standard Shopping impression share** — IS lost over the window, to detect PMax cannibalising your own campaigns.
- **tROAS / budget change history** — a target or budget edit resets PMax's learning; an edit inside the window invalidates trend reads.
- **Promo calendar** — a promo window inflates conversion value and borrows future demand.
- **Seasonality / demand index** — to separate "PMax scaled" from "the category got hot."
- **Asset launch dates** — to tell a genuinely fatiguing asset group from one that is simply still ramping.

## How To Pull This Evidence

- **PMax brand/non-brand split** — Google does not give it directly. Reconstruct it: read the PMax **search-term insights** (Campaigns → Insights → "What's driving your performance" / search-term insights) to see brand-query share, cross-reference the campaign's **brand-list / brand-exclusions** setting, and triangulate against your Brand Search campaign volume or Search Console brand-query volume. Operators who run the Google Ads API or PMax **scripts** can dump search-term insights to a sheet and tag brand vs non-brand programmatically — far faster than the UI.
- **Channel/placement breakdown** — PMax withholds a clean Search/Shopping/Display/YouTube/Gmail split in the standard view. Approximate it from the **asset-group reporting**, the listing-group view for the Shopping slice, and the placement/channel data exposed via the Google Ads API or a PMax script; stitch the slices together to estimate where spend and conversion value actually landed.
- **Search-term & category insights** — pull the **category** and **search-term insight** report for the window (Insights tab, or via API). Remember PMax reports categories and insight terms, not the full raw search-term table — treat it as directional.
- **New-customer value** — requires the **customer-acquisition / first-party customer-list** setup (Google Ads → Audiences → your customer list, with "new customer" conversion goal configured). Pull new-customer conversions and **new-customer value** vs returning from the customer-acquisition report; without the customer-list match you only get a new-customer *count*, not value.
- **The opacity gotcha** — every one of these is a partial, lagging, deliberately fragmented view: PMax shows you categories not terms, asset-group slices not a true channel ledger, and an estimated brand share not a measured one. Stitch them, label what is estimated vs measured, and never report the reassembly as exact.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Gate on conversion integrity.** If Google Ads conversions and your commerce/GA4 orders diverge by more than ~15% for the window, or a tracking/consent change landed mid-window, set the campaign to **FIX** and stop. PMax optimises toward whatever it's told converts — bad signal means bad spend.
2. **Split brand from non-brand first — before anything else.** Estimate brand share of conversions and value. If brand is a large slice (commonly 40–60%+ on accounts with strong brand demand), the blended ROAS is mostly harvest, not growth. Compute **ex-brand ROAS** and judge PMax against your target on *that* number only.
3. **Demand the channel/placement breakdown.** Pull Search/Shopping vs Display/YouTube/Gmail. If a large share of conversions is Display or Gmail at suspiciously high ROAS, suspect **view-through and low-intent padding** — discount those conversions and recompute.
4. **Check new-customer value.** Is PMax acquiring new customers, or recycling existing ones? Flat/declining new-customer count while ROAS rises = **coasting on brand and remarketing**, not scaling.
5. **Find the cannibalisation.** Did Brand Search or standard Shopping lose impression share as PMax spend rose? If PMax "wins" are conversions your other campaigns would have taken anyway, the incremental ROAS is far below the reported one.
6. **Drill assets, listing groups, and feed.** Rank asset groups and listing groups by ex-brand contribution; flag "Low" asset-group strength and any Merchant Center disapprovals starving high-intent products.
7. **Overlay margin, then apply the vetoes** and assign status + owner + recheck date. A 4.0 blended ROAS on a 30%-margin catalogue, two-thirds brand, is not the win the platform claims.

## Manual Workflow

1. Pull the PMax campaign table for the last 28 days and the prior 28 (cost, conv, value, ROAS, conv lag).
2. Run the conversion-integrity gate against GA4/commerce orders. If it fails, mark FIX and stop.
3. Reconstruct the brand/non-brand split (search-term insights + brand list + brand-query volume) and compute ex-brand ROAS.
4. Pull the channel/placement split and the new-vs-returning customer value; flag Display/Gmail-heavy conversion mixes.
5. Pull asset-group strength, listing-group ROAS, search-term/category insights, and Merchant Center status.
6. Pull Brand Search / standard Shopping impression-share lost to assess cannibalisation.
7. Paste the prompt below with your tables; overlay margin and re-rank.
8. Pressure-test every recommendation against the veto list, then convert survivors into an action packet with owner and recheck date.

## Copy-Paste Prompt

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

## Decision Rules

- **KILL** — only at the sub-unit level PMax actually exposes (an asset group, a listing-group node, or a product subset), where ex-brand contribution is negative over ≥28 days with adequate volume and no veto applies. You rarely KILL a whole PMax campaign; you starve its waste.
- **REFRESH** — ex-brand ROAS is decaying on fatiguing or "Low"-strength asset groups, but the audience/offer is still viable: rebuild creative assets, tighten the asset group, or split high-intent products into their own campaign.
- **WATCH** — directional or early: campaign still in its ramp, brand/non-brand split is estimated not measured, conversion lag not yet settled, or the window is polluted by a promo, tROAS change, or seasonality.
- **KEEP** — ex-brand, margin-adjusted ROAS is inside the target band, new-customer value is real, and no cannibalisation signal is present.
- **FIX** — conversion-tracking drift, a missing brand/non-brand split, an unavailable channel breakdown, or Merchant Center disapprovals make a safe call impossible.
- Every recommendation must include a **number, source, time window, and confidence level** — and must state blended ROAS and ex-brand ROAS as two separate numbers, never one.

## Veto Rules

- Do **not** judge PMax on blended ROAS — it bundles cheap brand harvest with the non-brand prospecting you're actually paying for. Always split brand from non-brand and decide on the ex-brand number.
- Do **not** scale PMax budget on the blended figure alone — demand the channel breakdown and the new-customer value first.
- Do **not** trust a high ROAS that is propped up by Display, Gmail, or view-through conversions — discount low-intent placements before believing the number.
- Do **not** count brand or remarketing conversions as new demand, or cannibalised Brand Search / standard Shopping conversions as incremental — net them out.
- Do **not** scale a product PMax is pushing if it has low stock, a Merchant Center disapproval, or missing price/availability.
- Do **not** act on a window containing a tROAS change, budget reset, or promo without flagging it as non-comparable.
- Do **not** make a profit claim without real margin, or recommend any budget shift, target change, exclusion, or pause without an explicit human approval step.

## Output Contract

A table ranked by **ex-brand contribution at risk**, stating blended and ex-brand ROAS as separate columns:

| Lever | Evidence (number / source / window) | Blended ROAS | Ex-brand ROAS | Status | Why | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| PMax – Core catalogue | 4.1 ROAS blended, 58% conv brand (search-term insights, 28d) | 4.1 | 1.7 | REFRESH | Coasting on brand; ex-brand under 2.5 target | Perf | 7 days |

## Worked Example

> **Executive read:** PMax reports a healthy-looking **4.1 blended ROAS**, but the search-term insights show roughly **58% of conversions are brand queries** the account would have won for free. Strip brand out and the real engine is running at **1.7 ex-brand ROAS against a 2.5 target** — PMax is harvesting brand demand and remarketing, not scaling new customers (new-customer value is down 6% while spend is up 22%). Do not raise the budget; rebuild the weak asset group, push brand exclusions, and split high-intent products into standard Shopping before re-testing.

| Lever | Evidence (number / source / window) | Blended ROAS | Ex-brand ROAS | Status | Why | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| PMax – Core catalogue (whole) | $18,400 spend, 4.1 ROAS, 58% conv brand (Ads + search-term insights, 28d) | 4.1 | **1.7** | **REFRESH** | Ex-brand below 2.5 target; coasting on brand | Perf | 7 days |
| └ Display + Gmail slice | 31% of conv value, 6.8 reported ROAS, 71% view-through (channel split, 28d) | 6.8 | ~1.1 disc. | **WATCH** | Padding the blend; discount view-through | Perf | 14 days |
| └ New-customer value | New-cust value −6% vs prior, spend +22% (cust-acq report, 28d vs prior) | — | — | **REFRESH** | Not acquiring; recycling existing demand | Perf | 7 days |
| └ Brand Search cannibalisation | Brand Search IS lost to "another campaign" +14pts (28d) | — | — | **FIX** | Add brand exclusions; net out before judging incremental | Perf | Now |
| └ Asset group "Summer-Hero" | "Low" strength, ex-brand ROAS 0.9, 0 new images 60d (asset report, 28d) | 2.2 | 0.9 | **REFRESH** | Fatigued, under-built assets | Perf + Creative | 7 days |
| └ Listing group "Clearance SKUs" | 3 of 12 SKUs disapproved, $1,900 spend, 0.6 ROAS (GMC + listing groups, 28d) | 0.6 | 0.6 | **FIX** | Feed disapprovals starving spend | Perf + Merch | Now |

Note how the answer *inverts* the platform view: the campaign that looks like the account's best performer at 4.1 ROAS is actually running below target once brand and view-through padding are stripped out — and the "scaling" story collapses the moment you look at new-customer value.

## Common Failure Modes

- Quoting the blended PMax ROAS as proof of performance without ever splitting brand from non-brand.
- Accepting the campaign-level number because PMax "won't give" the channel split — and not insisting on the asset-group/listing-group/insight reports that approximate it.
- Counting Display and Gmail view-through conversions at face value.
- Calling rising ROAS "scaling" while new-customer value is flat or falling.
- Missing that PMax's conversions were stolen from your own Brand Search and standard Shopping campaigns.
- Scaling a product PMax favours straight into a Merchant Center disapproval or a stockout.

## Run This Play With Live Data

**Manual version:** pull the PMax table, reconstruct the brand/non-brand split Google won't hand you, stitch together the channel/asset-group/listing-group reports, overlay new-customer value, cannibalisation, feed status, and margin — every single week, per campaign.

**ShopMCP version:** connect Google Ads and Merchant Center once. Ask the question; ShopMCP pulls the live PMax economics, estimates the brand/non-brand split, reassembles the channel and asset-group/listing-group breakdowns, overlays new-customer value and feed status, runs the conversion-integrity gate, and returns the ranked table with **blended vs ex-brand ROAS** side by side. It stays **read-only** until you explicitly approve a budget, target, or exclusion change.

> No Google Ads or Merchant Center connection inside your AI assistant? That's the wall every manual PMax run hits — the black box stays a black box. ShopMCP *is* the connection, and the same de-blackboxing playbook then runs in one prompt instead of an afternoon of stitched-together reports.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Performance Max Deep Dive play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual exports and the weekly re-stitching of PMax's deliberately fragmented reports.
- Hand-reconstructing the brand/non-brand split Google doesn't expose.
- Copy-pasting across Google Ads, Merchant Center, analytics, and your margin sheet.
- Guessing whether a high ROAS is real demand or Display/Gmail padding.
