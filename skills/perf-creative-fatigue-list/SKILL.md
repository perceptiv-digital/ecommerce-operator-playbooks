---
name: perf-creative-fatigue-list
description: "When an ecommerce operator needs to decide: Which ads are fatigued enough to refresh before they drain spend? Runs the Creative Fatigue List play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Creative Fatigue List', 'Meta Ads', 'Tiktok Ads', 'Google Ads', 'Acquisition Efficiency'."
license: CC-BY-4.0
metadata:
  persona: Performance Marketer
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Creative Fatigue List

**Operating question:** Which ads are fatigued enough to refresh before they drain spend?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Meta Ads — per ad, last 7 days vs. that ad's own launch window (first 3–7 days):** impressions, **frequency**, **link CTR** (not all-clicks CTR), CPM, spend, purchases, CPA, and where available **first-time-impression ratio** and **video hook rate (3-second / thumbstop)** and **hold rate (ThruPlay or 15s)**. Per-ad launch date.
- **TikTok Ads — per ad, 7-day vs. launch:** spend, CPM, CTR, **2-second / 6-second video views (hook)**, completion / hold, CPA. Treat as directional below ~50 conversions.
- **Google Ads — per asset / per ad where it applies:** spend, CTR, conversions, CPA. Frequency/hook don't translate on Search; this is mainly relevant for Demand Gen / YouTube and image assets. Don't force Meta-style fatigue language onto Search RSAs.
- **Targets:** target CPA / ROAS, and your fatigue thresholds (the defaults in The Decision Logic are a starting point — calibrate to the account).

Optional, if available:

- **Per-ad launch dates and last-edit dates** — a creative edit or a budget step-change resets learning; an "old" ad that was edited 4 days ago is not mature.
- **Audience size and overlap** — a 200k prospecting audience saturates far faster than a 5M one; rising frequency means different things at each.
- **Promo calendar** — sale windows spike frequency and CPM and compress CVR; fatigue read on a promo week is unreliable.
- **Site/checkout CVR and product stock** — to rule out "it's not the creative, it's the landing page / it's out of stock."
- **Creative metadata** (concept, format, hook type) — so the refresh brief knows *what* to iterate, not just *that* to iterate.

## How to decide — in order

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

## The prompt to run

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

## Decision rules

- **REFRESH** — a *mature* ad (≥~50 conversions, launched/unedited ≥~7 days) showing **two or more** fatigue signals against its **own launch baseline**: link CTR down ~30%+, frequency above ~2.5–3.0 on prospecting, CPM creeping at flat targeting, first-time-impression ratio falling, or (video) hook/hold rate decaying. Ship new creative.
- **WATCH** — directional or early: still in learning, only one fatigue signal present, sample under ~50 conversions, or the window is polluted by a promo/stockout. Recheck after a clean 7-day window.
- **KEEP** — frequency, CTR, hook, and CPA all inside the normal band against baseline. A high-frequency ad that is *still hitting target CPA* is not a problem yet — frequency is a leading indicator, not a verdict.
- **FIX** — clicks/hook are healthy but CVR collapsed (landing/offer/stock), or tracking drift makes the read unsafe. This is not a creative job; route it elsewhere.
- **KILL** — reserved for an ad that is both fatigued *and* has no refreshable angle left (concept exhausted across multiple iterations). Most fatigue ends in REFRESH, not KILL — the audience still wants the product, just not *this* execution.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** call an ad fatigued while it is **in learning** (under ~50 conversions) or on **thin spend** — early metric swings are sample noise, and refreshing resets the algorithm.
- Do **not** treat a **CVR collapse with healthy CTR/hook** as fatigue — that is a landing-page, offer, price, or stock problem. Refreshing creative will not fix it.
- Do **not** read fatigue off a **promo window or sale period** — discounts distort frequency, CPM, and CVR. Wait for a clean window.
- Do **not** call **rising frequency alone** fatigue if CPA is still on target — frequency is a leading signal, not proof of decay.
- Do **not** compare an ad to the **account average** instead of its own launch baseline — a hook-driven UGC ad and a static promo ad have completely different healthy CTR levels.
- Do **not** confuse **saturation with fatigue** — when the creative is fine but the audience is exhausted, broaden/duplicate; don't burn production capacity on a new ad.
- Do **not** pause, duplicate, shift budget, or launch anything without an explicit human approval step.

## Output

A refresh list ranked by **spend exposure**, with the diagnosed signal and the specific action for each ad:

| Ad | Spend (7d) | Frequency | CTR vs launch | CPM trend | Hook/hold | CPA trend | Signal | Status | Action |
|---|---|---|---|---|---|---|---|---|---|
| Example ad | $X | 2.4 | −12% | flat | stable | on target | one weak signal | WATCH | Recheck in 7 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
