---
schema_version: 1
slug: "perf-creative-fatigue-list"
title: "Creative Fatigue List"
summary: "Creative Fatigue List helps ecommerce operators answer: Which ads are fatigued enough to refresh before they drain spend?"
operating_question: "Which ads are fatigued enough to refresh before they drain spend?"
short_title: "Creative Fatigue"
primary_persona: "performance"
personas: ["performance", "marketing"]
category: "acquisition-efficiency"
platforms: ["meta-ads", "tiktok-ads", "google-ads"]
cadence: "weekly"
difficulty: "intermediate"
manual_time_minutes_min: 45
manual_time_minutes_max: 90
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: true
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/perf-creative-fatigue-list"
shopmcp_prompt: "Run the Creative Fatigue List play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Creative Fatigue List

## Operating Question

**Which ads are fatigued enough to refresh now — before the algorithm keeps feeding them spend on momentum that's already gone?**

Fatigue is the slow death of a winner. An ad that drove a 3.2 ROAS at launch doesn't fall off a cliff; it bleeds out over two or three weeks while the platform, optimizing on a trailing window, keeps pouring budget into it. By the time CPA crosses your target the damage is already booked. This play produces a **ranked refresh list** — which creatives are genuinely fatigued (not immature, not saturated, not a landing-page problem), ordered by how much spend each one is exposing — so you refresh the ones that matter and leave the rest alone.

The single most expensive mistake here is misdiagnosis: refreshing a creative that was actually still in learning, or shipping new creative to "fix" what is really a checkout problem. Most of this play is about telling those apart.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no eyes on your ad accounts. Fatigue lives in metrics that only exist *per ad, over time, against that ad's own history* — and none of them sit in a single export:

1. You need each ad's **launch baseline** (its first 3–7 days of CTR, hook rate, CPM) to measure decay against. That baseline isn't a column you can download; you have to reconstruct it from a historical date range per ad.
2. Frequency, first-time-impression ratio, and 3-second/hook rate live in **different breakdowns** in Meta Ads Manager — you assemble them ad by ad.
3. TikTok reports thumbstop and hold differently again, and Google has no real "frequency" concept on Search at all.
4. You then have to overlay **spend exposure** so the list is ranked by money at risk, not by the scariest-looking percentage.

**The thinking in this playbook is free. Reconstructing per-ad baselines and stitching breakdowns together every week is the tax — and that's exactly what ShopMCP removes.** If your AI assistant has no live line into Meta and TikTok, that's the wall manual runs hit. The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Performance Marketer (paid social / creative buyer).
- **Also useful for:** Creative Strategist (feeds the next round of concepts), Head of Marketing (production-capacity planning).
- Run it **before** you brief the next creative batch — the refresh list *is* the brief. A fatigue audit with no creative pipeline behind it just generates anxiety.

## When To Run It

- **Cadence:** weekly on Meta/TikTok (creative cycles are fast); biweekly is fine for low-volume accounts.
- **Triggers:** account-level CTR softening, a CPM creep you can't explain by auction seasonality, a top ad's frequency crossing ~3.0 on a prospecting audience, or "ROAS is slipping but I didn't change anything."
- **Pre-requisite:** confirm tracking is stable first. Fatigue and a broken pixel/CAPI both look like "CTR and CVR are down" — never diagnose creative on top of a measurement break.

## Required Evidence

- **Meta Ads — per ad, last 7 days vs. that ad's own launch window (first 3–7 days):** impressions, **frequency**, **link CTR** (not all-clicks CTR), CPM, spend, purchases, CPA, and where available **first-time-impression ratio** and **video hook rate (3-second / thumbstop)** and **hold rate (ThruPlay or 15s)**. Per-ad launch date.
- **TikTok Ads — per ad, 7-day vs. launch:** spend, CPM, CTR, **2-second / 6-second video views (hook)**, completion / hold, CPA. Treat as directional below ~50 conversions.
- **Google Ads — per asset / per ad where it applies:** spend, CTR, conversions, CPA. Frequency/hook don't translate on Search; this is mainly relevant for Demand Gen / YouTube and image assets. Don't force Meta-style fatigue language onto Search RSAs.
- **Targets:** target CPA / ROAS, and your fatigue thresholds (the defaults in The Decision Logic are a starting point — calibrate to the account).

## Optional Evidence

- **Per-ad launch dates and last-edit dates** — a creative edit or a budget step-change resets learning; an "old" ad that was edited 4 days ago is not mature.
- **Audience size and overlap** — a 200k prospecting audience saturates far faster than a 5M one; rising frequency means different things at each.
- **Promo calendar** — sale windows spike frequency and CPM and compress CVR; fatigue read on a promo week is unreliable.
- **Site/checkout CVR and product stock** — to rule out "it's not the creative, it's the landing page / it's out of stock."
- **Creative metadata** (concept, format, hook type) — so the refresh brief knows *what* to iterate, not just *that* to iterate.

## How To Pull This Evidence

- **Meta ad-level export:** in Ads Manager, set the **Ad** level, window to the **last 7 days**, and use the Export → table. Pull **frequency**, **link CTR**, **CPM**, **first-time-impression ratio** (Reach & Frequency breakdown — "first-time impression ratio"), and **3-second video views / hook rate** (add the Video Engagement column set). Add spend, purchases, and CPA in the same export so the ranking column travels with the fatigue signals.
- **TikTok ad-level export:** in TikTok Ads Manager, export at the **Ad** level for the last 7 days with **CTR**, **CPM**, **2-second / 6-second video views** (the hook proxy), **video completion / hold rate**, plus spend and CPA. TikTok has no "first-time ratio" — use frequency-equivalent reach decay instead.
- **The ad's launch-week baseline:** for each ad, re-run the same ad-level export filtered to its **first 3–7 days live** (set the date range to the launch window). This is the number you measure decay against — there is no single "baseline" column, so you reconstruct it per ad.
- **Gotchas:** use **link CTR**, not all-clicks CTR (all-clicks inflates with reactions/comments). Watch for **attribution-window mismatches** between the two date ranges. A creative edit or budget step-change **resets learning** — an "old" ad edited 4 days ago is not mature. Promo weeks distort frequency/CPM/CVR, so a launch window that overlaps a sale gives a polluted baseline.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

Diagnosis order matters more than any single threshold. Run top to bottom and stop at the first that fits.

1. **Maturity gate first.** Is the ad actually mature? If it has **under ~50 conversions** or was launched / materially edited in the **last ~7 days**, it is still in learning — early CTR wobble is noise. → **WATCH**, never REFRESH. Refreshing here resets the algorithm and destroys a possible winner.
2. **Confirm decay against the ad's OWN baseline, not the account average.** Compare current 7-day to that ad's launch window:
   - **Link CTR down ~30%+** from its launch baseline, **and**
   - **Frequency rising above ~2.5–3.0** (7-day, prospecting), **and/or**
   - **First-time-impression ratio falling** (you're re-hitting the same people), **and/or**
   - **CPM creeping up** at the same targeting/bid (auction is charging you more to reach a tiring audience).
   Two or more of these moving together is real fatigue. One alone is a watch, not a verdict.
3. **For video, check the top of the funnel.** A falling **hook rate / 3-second-view (thumbstop)** means the opener stopped earning attention — the clearest, earliest fatigue signal on Reels/TikTok. **Hold rate** dropping too means the whole creative is tiring. Hook-rate decay usually leads CTR decay by several days.
4. **Separate fatigue from saturation.** If CTR is roughly intact but frequency and CPM are climbing and first-time-impression ratio is collapsing, the *creative* may be fine — the *audience* is exhausted. That's **broaden / duplicate into a fresh audience**, not "make a new ad." Same creative, new people.
5. **Rule out the landing/offer trap.** If **CTR and hook are healthy but CVR collapsed**, this is NOT fatigue. Healthy clicks that stop converting = a landing page, price, offer, or stock problem. → **FIX** (route to web/merchandising), do not REFRESH the creative. This is the most common false positive in the whole play.
6. **Rank survivors by spend exposure.** A genuinely fatigued ad spending $5,000/week outranks one spending $200/week — even if the $200 ad's CTR fell harder in percentage terms. Sort the REFRESH list by 7-day spend so production effort goes where the money is leaking.
7. **Apply the vetoes**, then assign status + owner + recheck date.

## Manual Workflow

1. In Meta Ads Manager, set the window to the **last 7 days**, breakdown by **ad**, and add columns: Frequency, CTR (link), CPM, Spend, Purchases, CPA, plus (under the video metrics set) 3-second video plays / hook rate and ThruPlay.
2. For each ad with meaningful spend, pull its **launch window** (first 3–7 days after it went live) into a second view to get the baseline CTR / CPM / hook. Record both numbers.
3. Repeat for TikTok using its video-view metrics. For Google, only pull Demand Gen/YouTube assets — skip Search.
4. Tag each ad's maturity (conversions to date, launch/edit date) so the maturity gate (step 1) is applied before anything else.
5. Compute the deltas: CTR vs. launch (%), frequency level, CPM trend, hook/hold trend.
6. Paste the prompt below with your per-ad table. Let it run the diagnosis order and separate fatigue from saturation vs. landing problems.
7. Pressure-test each REFRESH against the vetoes, then turn the survivors into a refresh brief: which ad, which signal, what to change, owner, recheck date.

## Copy-Paste Prompt

```text
You are my paid-social creative analyst running the "Creative Fatigue List" play.

GOAL: produce a ranked refresh list — which ads are genuinely FATIGUED and should be
REFRESHED before they drain more spend — ranked by spend exposure, not by the size of
the percentage drop. Cleanly separate fatigue from (a) immaturity, (b) audience
saturation, and (c) a landing/offer/stock problem.

I will paste a per-ad table (mostly Meta, some TikTok) with, per ad: 7-day spend,
frequency, link CTR now vs. its launch baseline, CPM trend, hook rate / hold (video),
CPA trend, conversions to date, and launch/edit date. Some fields may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical
inputs are per-ad frequency, link CTR now vs. the ad's OWN launch baseline, 7-day
spend, and enough conversions/sample to clear the maturity gate (so learning-phase ads
are never called fatigued). If any critical input is missing, STOP and return only
(a) what's missing and (b) how to get it — never estimate it or proceed.

DIAGNOSIS ORDER (stop at the first that fits, per ad):
1. Maturity gate: if <~50 conversions OR launched/edited in last ~7 days -> WATCH (in
   learning). Never call it fatigued.
2. Real fatigue = decay vs. that ad's OWN launch baseline: link CTR down ~30%+ AND
   frequency > ~2.5-3.0 (7d prospecting) AND/OR CPM creeping up AND/OR first-time-
   impression ratio falling. Two+ signals together = REFRESH. One alone = WATCH.
3. Video: a falling hook rate / 3-sec view (thumbstop) is the earliest fatigue signal;
   falling hold rate confirms it.
4. Saturation, not fatigue: CTR ~intact but frequency + CPM rising and first-time ratio
   collapsing -> broaden/duplicate into a NEW audience (same creative), not a new ad.
5. Landing/offer trap: CTR and hook healthy but CVR collapsed -> NOT fatigue. Route to
   FIX (landing/offer/stock). Do not refresh the creative.
6. Rank the REFRESH list by 7-day spend exposure.

RULES:
- Compare each ad to its own baseline, never to the account average.
- Every row must carry a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent data.
- Below ~50 conversions or thin spend, downgrade to WATCH and say why.

RETURN:
1. A 2-3 sentence executive read (total spend on the REFRESH list; the single biggest leak).
2. A ranked table using exactly this header row:
   | Ad | Spend (7d) | Frequency | CTR vs launch | CPM trend | Hook/hold | CPA trend | Signal | Status | Action |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace
   the table with prose. Status is one of REFRESH/WATCH/KEEP/FIX.
3. Vetoes/caveats that downgraded any call.
4. What evidence is blocked and what would upgrade a WATCH to a decision.
```

## Decision Rules

- **REFRESH** — a *mature* ad (≥~50 conversions, launched/unedited ≥~7 days) showing **two or more** fatigue signals against its **own launch baseline**: link CTR down ~30%+, frequency above ~2.5–3.0 on prospecting, CPM creeping at flat targeting, first-time-impression ratio falling, or (video) hook/hold rate decaying. Ship new creative.
- **WATCH** — directional or early: still in learning, only one fatigue signal present, sample under ~50 conversions, or the window is polluted by a promo/stockout. Recheck after a clean 7-day window.
- **KEEP** — frequency, CTR, hook, and CPA all inside the normal band against baseline. A high-frequency ad that is *still hitting target CPA* is not a problem yet — frequency is a leading indicator, not a verdict.
- **FIX** — clicks/hook are healthy but CVR collapsed (landing/offer/stock), or tracking drift makes the read unsafe. This is not a creative job; route it elsewhere.
- **KILL** — reserved for an ad that is both fatigued *and* has no refreshable angle left (concept exhausted across multiple iterations). Most fatigue ends in REFRESH, not KILL — the audience still wants the product, just not *this* execution.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do **not** call an ad fatigued while it is **in learning** (under ~50 conversions) or on **thin spend** — early metric swings are sample noise, and refreshing resets the algorithm.
- Do **not** treat a **CVR collapse with healthy CTR/hook** as fatigue — that is a landing-page, offer, price, or stock problem. Refreshing creative will not fix it.
- Do **not** read fatigue off a **promo window or sale period** — discounts distort frequency, CPM, and CVR. Wait for a clean window.
- Do **not** call **rising frequency alone** fatigue if CPA is still on target — frequency is a leading signal, not proof of decay.
- Do **not** compare an ad to the **account average** instead of its own launch baseline — a hook-driven UGC ad and a static promo ad have completely different healthy CTR levels.
- Do **not** confuse **saturation with fatigue** — when the creative is fine but the audience is exhausted, broaden/duplicate; don't burn production capacity on a new ad.
- Do **not** pause, duplicate, shift budget, or launch anything without an explicit human approval step.

## Output Contract

A refresh list ranked by **spend exposure**, with the diagnosed signal and the specific action for each ad:

| Ad | Spend (7d) | Frequency | CTR vs launch | CPM trend | Hook/hold | CPA trend | Signal | Status | Action |
|---|---|---|---|---|---|---|---|---|---|
| Example ad | $X | 2.4 | −12% | flat | stable | on target | one weak signal | WATCH | Recheck in 7 days |

## Worked Example

> **Executive read:** $11,300 of last-week prospecting spend sits on ads showing real fatigue, concentrated in one creative. "UGC Testimonial v2" ($5,200/wk) is the priority refresh — hook rate has fallen by half and frequency is at 3.6 while CPA drifted +34%. The "Founder Story" ad looks fatigued on CTR but is actually a landing problem (clicks healthy, CVR halved), so it goes to web, not to the creative team. The new "Bundle Promo" ad is still in learning — leave it alone.

| Ad | Spend (7d) | Frequency | CTR vs launch | CPM trend | Hook/hold | CPA trend | Signal | Status | Action |
|---|---|---|---|---|---|---|---|---|---|
| UGC Testimonial v2 (Meta, prospecting) | $5,200 | 3.6 | −38% | +22% | hook 6.1%→3.0% | +34% | Hook + CTR decay, freq high, CPM up — classic fatigue | **REFRESH** | Brief 3 new hooks on same concept; recheck 7d |
| Static Promo Carousel (Meta, prospecting) | $3,100 | 3.1 | −31% | +14% | n/a (static) | +19% | CTR decay + frequency + CPM, mature | **REFRESH** | New angle/visual; recheck 7d |
| Saturation Set – Lookalike 1% (Meta) | $2,400 | 4.2 | −9% | +28% | hook stable | +21% | CTR ~intact, freq+CPM up, first-time ratio falling | **WATCH→broaden** | Duplicate same creative into a fresh/broader audience |
| Founder Story (Meta, prospecting) | $1,900 | 2.3 | −6% | flat | hook stable | +41% | Clicks healthy, CVR halved | **FIX** | Route to web — landing/offer issue, not creative |
| Bundle Promo (Meta, 5 days old) | $1,200 | 1.8 | −4% | flat | hook stable | on target | 38 conversions, in learning | **WATCH** | Leave in learning; recheck at maturity |
| TopFunnel Spark Ad (TikTok) | $640 | n/a | −22% | +9% | 2s view 28%→24% | +12% | Mild thumbstop decay, low volume | **WATCH** | Directional only; recheck after more volume |

Note how the ranking *inverts* the percentage view: the Founder Story ad has the worst CPA trend (+41%) but is correctly the one ad the creative team should *not* touch — its clicks are fine, so it's a checkout problem, not fatigue. The real money is in the two top rows.

## Common Failure Modes

- **Refreshing a learning-phase ad** — early CTR noise read as fatigue; the refresh resets the algorithm and kills a would-be winner.
- **Comparing to the account average instead of the ad's own baseline** — a UGC hook ad and a static promo have totally different healthy CTRs; the average flags the wrong ones.
- **Calling rising frequency "fatigue" while CPA is still on target** — frequency leads, it doesn't convict. Wait for a second signal.
- **Treating a CVR collapse as a creative problem** — shipping three new ads to fix a broken checkout or an out-of-stock hero product.
- **Reading fatigue off a promo week** — discounts inflate frequency and CPM and crush CVR; the whole window is contaminated.
- **Ranking by percentage drop, not spend** — burning a week of production on a $200 ad while a $5k ad keeps bleeding.

## Run This Play With Live Data

**Manual version:** for every ad with spend, reconstruct its launch baseline from a historical date range, stitch frequency + CTR + CPM + hook/hold out of separate Meta breakdowns, repeat on TikTok, tag maturity, compute the deltas, then rank by spend — every week, before each creative brief.

**ShopMCP version:** connect Meta and TikTok once. Ask the question; ShopMCP pulls each ad's live 7-day metrics *and* its own launch-window baseline, runs the maturity gate and the fatigue-vs-saturation-vs-landing diagnosis, and returns the refresh list ranked by spend exposure with the signal named per ad. It stays **read-only** — it never pauses or duplicates an ad until you explicitly approve.

> No Meta or TikTok connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the per-ad baseline reconstruction that eats the afternoon becomes one prompt.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Creative Fatigue List play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Reconstructing each ad's launch baseline by hand from historical date ranges.
- Stitching frequency, CTR, CPM, and hook/hold out of separate Meta and TikTok breakdowns.
- Manually tagging which ads are mature vs. still in learning.
- Re-ranking the list by spend exposure and rebuilding the same audit every week.
