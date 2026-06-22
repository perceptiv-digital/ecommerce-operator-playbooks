---
schema_version: 1
slug: "perf-google-search-term-audit"
title: "Google Ads Search-Term Audit"
summary: "Google Ads Search-Term Audit helps ecommerce operators answer: Which search terms are wasting spend or cannibalising intent?"
operating_question: "Which search terms are wasting spend or cannibalising intent?"
short_title: "Google Ads Search-Term"
primary_persona: "performance"
personas: ["performance"]
category: "acquisition-efficiency"
platforms: ["google-ads"]
cadence: "weekly"
difficulty: "standard"
manual_time_minutes_min: 30
manual_time_minutes_max: 75
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/perf-google-search-term-audit"
shopmcp_prompt: "Run the Google Ads Search-Term Audit play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Google Ads Search-Term Audit

## Operating Question

**Which actual search queries are draining budget on zero-return traffic, and which are quietly inflating one campaign's ROAS by stealing intent that belongs to another?**

The Search Terms report is the only place Google shows you the *real* words people typed — not the keywords you bid on, but what your broad and phrase match actually matched against. Left unaudited, this is where a smart-shopping account bleeds: low-intent modifiers (`free`, `cheap`, `DIY`, `jobs`) pulling clicks at full CPC, brand queries leaking into generic campaigns and making them look profitable, and the same term self-competing across three campaigns. This play turns the raw report into a defensible weekly set of **negative-keyword adds, match-type tightenings, and KEEP decisions** — each one quantified in wasted spend, and each one ranked so you fix the biggest leak first.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your Google Ads account, so it cannot see the one report this play lives in. To run it manually you have to:

1. Open Google Ads → Campaigns → Insights & reports → **Search terms**, set the date range, and add the columns most operators leave off: **Conv. value**, **Conversions**, **Cost / conv.**, **Search Lost IS (rank)**, and the **Campaign** and **Match type** dimensions.
2. Export the report and join it, by hand, against which campaign each term fired in — because the same query (`[brand] discount code`) firing in a *brand* campaign is fine and firing in a *generic* campaign is a leak, and the export flattens that distinction.
3. Cross-check the conversion column against your real orders, because Google attributes on a click or view window that can credit a sale to a research term that actually converted days later through a different path.
4. Decide a defensible click and spend floor before negating anything, so you don't kill a term that simply hasn't had enough impressions to prove itself.

**The judgement in this playbook is free. The blocker is live access to the Search Terms report joined to campaign, match type, and real orders — which is exactly what ShopMCP connects.** If your assistant can't see Google Ads, that's the wall manual runs hit; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Performance Marketer
- **Also useful for:** Head of Ecommerce (where is paid budget leaking?), an agency account manager preparing a weekly client note.
- Run it yourself — it's a 30-to-45-minute spreadsheet job once the export is in hand — but bring the negative-keyword list to whoever owns account structure if shared negative lists are involved.

## When To Run It

- **Cadence:** weekly — Search Terms accumulate fast on broad match, and a single new bad match can burn a four-figure sum before a monthly review catches it.
- **Triggers:** a CPC or CPA creep with flat conversions, after enabling broad match or a new Smart Bidding strategy (both widen the queries you match), after a new product or collection launch (fresh keywords pull fresh junk), or when a generic campaign's ROAS suddenly looks "too good."
- **Pre-requisite:** confirm conversion tracking is firing and the conversion window is known. A term that looks dead at a 1-day window may convert at 14 days — you need to know which window you're reading before you negate anything.

## Required Evidence

- **Search Terms report** — every term with **Cost, Clicks, Impressions, Conversions, Conv. value, Cost/conv.**, last 30–90 days (use 90 for lower-volume accounts so terms clear the click floor). This is the spine of the play; without it there is no audit.
- **Campaign + Ad group dimension per term** — so you can see the *same* term firing across multiple campaigns (self-competition) and tell brand-vs-generic leakage apart.
- **Match type per term** — broad / phrase / exact that triggered the match, so a tightening recommendation knows what it's tightening from.
- **Your targets** — target CPA or target ROAS, and your average order value, so a "wasted spend" call is measured against a real threshold, not a gut feel.

## Optional Evidence

- **Conversion window / attribution model** — changes whether a research term is "zero-return" or "converts on a lag." Decisive for the KEEP-vs-KILL call.
- **Real orders by term or landing page** (from your store / GA4) — to sanity-check Google's claimed conversions against actual revenue.
- **Existing negative-keyword lists** — so you don't re-add a negative or, worse, find a positive keyword is being blocked by a stale list.
- **Brand vs. non-brand campaign map** — which campaigns are *supposed* to capture brand demand, so leakage into generic is obvious.
- **PMax / Shopping presence** — these channels hide most of their search terms; note the blind spot so you don't claim a clean account when half of it is opaque.

## How To Pull This Evidence

- **Google Ads → Search terms report export.** Open Google Ads → Campaigns → Insights & reports → **Search terms**. Add the columns most operators leave off — **Conversions**, **Conv. value**, **Cost/conv.** — and segment by **Campaign** and **Match type**. Set the date range to 30–90 days (use 90 for lower-volume accounts so terms clear the click floor), then **Download → CSV**.
- **The date window / conversion-lag gotcha.** Pick a window wide enough that conversions have time to land. A term that looks dead at a 1-day attribution window may convert at 14 days, so a too-short window or a too-tight conversion window makes profitable research terms look like pure waste — know which window you're reading before you negate anything.
- **The PMax / Shopping search-term blind spot.** PMax and Standard Shopping hide most of their search terms — the export will under-report the queries actually driving that spend. Treat any audit over an account with meaningful PMax/Shopping budget as partial, and say so rather than declaring the account clean.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Set the floors first.** Pick a minimum click threshold (e.g. ≥ 20 clicks, or ≥ 1× target CPA in spend) below which a term is **WATCH**, never KILL. A term with 4 clicks and 0 conversions is noise, not evidence.
2. **Catch the zero-return leaks.** Terms over your spend floor with **0 conversions and spend ≥ target CPA** → negative-keyword candidates → **KILL**. Rank these by cost descending; the top five are usually most of the waste.
3. **Sweep the low-intent modifiers.** Scan every term for `free`, `cheap`, `discount` (when you don't discount), `DIY`, `used`, `jobs`, `salary`, `how to make` — these signal a searcher who will not buy. Negate the modifier as a phrase negative so it stops matching across the account, not just the one term.
4. **Find brand leakage.** Any term containing your brand that is firing in a **non-brand / generic** campaign is inflating that campaign's apparent ROAS with demand it didn't create. Add the brand term as a negative to the generic campaign and let the brand campaign claim it. The generic campaign's "real" ROAS is what's left after you remove it.
5. **Spot self-competition.** The same term firing across two or more campaigns means they're bidding against each other in the same auction. Decide the one rightful owner; negate the term in the others.
6. **Protect the laggards.** Before negating any term with *some* conversions, check the conversion window. An upper-funnel/research term (`best [category] for [use-case]`) that converts on a 14-day lag is a **KEEP**, not a leak — negating it starves the funnel.
7. **Apply the vetoes**, then write each row as a negative-keyword add, a match-type tightening, or a KEEP — with the wasted-spend number attached.

## Manual Workflow

1. In Google Ads, open the **Search terms** report; set the date range to 30–90 days; add **Conversions, Conv. value, Cost/conv.** columns and segment by **Campaign** and **Match type**.
2. Export to CSV. Sort by **Cost descending** — you audit money, not alphabetised terms.
3. Flag three buckets: (a) cost ≥ target CPA with 0 conversions, (b) low-intent modifier present, (c) brand term in a non-brand campaign.
4. Pivot the same term across campaigns to surface self-competition.
5. For every term that *did* convert, note the conversion lag before deciding anything.
6. Paste the prompt below with your sorted table and targets.
7. Pressure-test each KILL against the veto list, then write the negative list (with match type) and the tightening actions, each tagged with the spend it recovers.

## Copy-Paste Prompt

```text
You are my Google Ads analyst running the "Google Ads Search-Term Audit" play.

GOAL: from my Search Terms report, decide which terms to negate (KILL), tighten match
type on (REFRESH), keep (KEEP), watch (WATCH), or flag as untrustworthy (FIX) — ranked
by wasted spend recovered, not by clicks.

I will paste: a Search Terms export with Term, Campaign, Match type, Cost, Clicks,
Conversions, Conv. value, Cost/conv.; plus my target CPA / target ROAS and AOV. Some
columns may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical input is
the Search Terms report with spend AND conversions per term over a window with enough clicks
to judge it (don't negate on tiny samples — conversions may lag). If that critical input is
missing, STOP and return only (a) what's missing and (b) how to get it (Google Ads →
Campaigns → Insights & reports → Search terms, with Conversions and Conv. value columns added
over a 30–90 day window) — never estimate it or proceed.

RULES:
- Set a floor: any term under 20 clicks OR under 1x my target CPA in spend is WATCH,
  never KILL. Too small a sample is not evidence.
- KILL (negate) a term only when: spend >= target CPA, 0 conversions, and it clears the
  click floor, and no lag/veto applies.
- Flag low-intent modifiers (free, cheap, DIY, used, jobs, salary, "how to make") and
  recommend a phrase negative so it stops matching account-wide.
- Detect brand terms firing in NON-brand campaigns: call out the inflated ROAS, and state
  the campaign's ROAS BEFORE and AFTER removing the brand spend/revenue.
- Detect the same term firing across multiple campaigns (self-competition); name the
  rightful owner and negate it elsewhere.
- Before negating a term with ANY conversions, check the conversion lag. Research terms
  that convert on a 14-day window are KEEP, not KILL.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Note that PMax and Shopping
  hide most search terms — say so rather than implying the audit is complete.

RETURN:
1. A 3-sentence executive read with total wasted spend identified.
2. A ranked table using exactly this header row:
| Term | Campaign | Match | Cost (window) | Conv | Cost/conv vs target | Action | Spend recovered | Confidence |
Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
table with prose.
3. The negative-keyword list, grouped by match type and target campaign.
4. Vetoes/caveats and what evidence (lag window, real orders, PMax terms) is blocked.
```

## Decision Rules

- **KILL (negate)** — term cleared the click floor (≥ ~20 clicks or ≥ 1× target CPA spend), spend ≥ target CPA, **0 conversions**, no lag/veto. Add as exact or phrase negative depending on how broadly it should stop matching.
- **REFRESH (tighten match)** — the keyword is relevant but broad/phrase match is pulling junk variants around it; tighten to phrase or exact and add the bad variants as negatives, rather than killing the keyword outright.
- **WATCH** — directional only: term under the click floor, or a low-intent modifier with too few clicks to negate confidently, or a window polluted by a promo.
- **KEEP** — converting within the target CPA/ROAS band, *or* a research term that converts on a known lag, *or* a brand term firing in its correct brand campaign.
- **FIX** — conversion tracking is unclear, the conversion window is unknown, or PMax/Shopping opacity means you can't see the terms driving the spend.
- Every recommendation must include a **number, source, time window, and confidence level** — e.g. "$640 cost, 0 conv, 30-day window, high confidence" beats "this term looks bad."

## Veto Rules

- Do **not** negate a term on too few clicks — a small sample with 0 conversions is not proof of a bad term; hold it at WATCH until it clears the floor.
- Do **not** negate a converting research/upper-funnel term without checking the **conversion window** — some convert on a 14-day lag and look dead at a 1-day view.
- Do **not** treat the audit as complete when **PMax or Shopping** carry meaningful spend — they hide most of their search terms, so name the blind spot rather than implying coverage.
- Do **not** negate so broadly that you starve a match type — one over-eager phrase negative can block dozens of profitable long-tail variants.
- Do **not** credit a generic campaign's ROAS without checking for **brand leakage** inflating it.
- Do **not** push any negative, pause, or budget change live without an explicit human approval step.

## Output Contract

A ranked table of negative-keyword adds, match-type tightenings, and KEEP calls — each with the spend it recovers and the evidence behind it.

Minimum table columns:

| Term | Campaign | Match | Cost (window) | Conv | Cost/conv vs target | Action | Spend recovered | Confidence |
|---|---|---|---|---|---|---|---|---|
| free [product] | Shopping – Generic | Broad | $640 (30d) | 0 | n/a (0 conv) | KILL → phrase negative | ~$640/mo | High |

## Worked Example

> **Executive read:** The audit surfaced roughly $1,180/month of recoverable waste. The cleanest win is $640 spent across `free [product]` broad-match variants with zero orders — a phrase negative kills it account-wide. A bigger structural issue is `[brand] discount code` leaking into the generic Shopping campaign: it inflates that campaign's ROAS from a real 2.1 to a flattering 4.3, so the campaign looks like a winner it isn't. One research term stays — it converts on a 14-day lag and is doing its job.

| Term | Campaign | Match | Cost (30d) | Conv | Cost/conv vs target ($28) | Action | Spend recovered | Confidence |
|---|---|---|---|---|---|---|---|---|
| free [product] (+ "free shipping [product]") | Shopping – Generic | Broad | $640 | 0 | n/a (0 conv) | **KILL** → phrase negative `free` | ~$640/mo | High |
| cheap [product] alternative | Search – Non-brand | Phrase | $210 | 0 | n/a (0 conv) | **KILL** → exact negative | ~$210/mo | High |
| [brand] discount code | Search – Generic (should be Brand) | Broad | $330 (rev $1,420) | 9 | −18% | **REFRESH** → negate in Generic, let Brand claim it | ROAS corrected 4.3→2.1 | High |
| [product] for [use-case] | Search – Non-brand | Phrase | $190 | 0 at 1-day / 3 at 14-day | −5% at 14d | **KEEP** (converts on lag) | n/a | Medium |
| [competitor] vs [product] | Search – Generic | Broad | $96 | 1 | +12% | **WATCH** (only 14 clicks) | n/a | Low |
| running shoes | Shopping – Generic & Search – Generic | Broad | $280 combined | 5 | +3% | **REFRESH** → self-competition; assign to Shopping, negate in Search | tighter auction | Medium |

Note how the audit *inverts* the dashboard: the Generic Search campaign that looked best by ROAS (4.3) was borrowing brand demand, and a term showing 0 conversions at the default 1-day window is actually a profitable KEEP once the 14-day lag is read.

## Common Failure Modes

- Negating a term on 5 clicks and 0 conversions — that's noise, not a verdict.
- Reading conversions at a 1-day window and killing research terms that convert on a 14-day lag.
- Praising a generic campaign's ROAS without noticing it's inflated by leaked brand queries.
- Declaring the account "clean" while PMax and Shopping hide most of their search terms.
- Adding a phrase negative so broad it blocks profitable long-tail variants you wanted to keep.
- Letting the same term self-compete across campaigns and calling the combined CPC "the market."

## Run This Play With Live Data

**Manual version:** open the Search Terms report, add the hidden conversion columns, export, sort by cost, hand-join each term to its campaign and match type, cross-check the conversion lag, and rebuild the whole pivot — every week.

**ShopMCP version:** connect Google Ads once. Ask the question; ShopMCP pulls the live Search Terms report already joined to campaign, match type, and conversions, applies the click and spend floors, flags low-intent modifiers and brand leakage, surfaces self-competition, and returns the ranked negative-keyword list with the spend each add recovers. It stays **read-only** — it drafts the negatives and tightenings but does not push them until you explicitly approve.

> No Google Ads connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same audit then runs in one prompt instead of one spreadsheet-afternoon.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Google Ads Search-Term Audit play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Pulling the Search Terms export and re-adding the conversion columns Google hides by default.
- Hand-joining each term to its campaign and match type to spot brand leakage and self-competition.
- Manually checking conversion lag before deciding a term is "dead."
- Rebuilding the same negative-keyword audit pivot every single week.
