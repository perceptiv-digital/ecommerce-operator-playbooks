---
name: perf-google-search-term-audit
description: "When an ecommerce operator needs to decide: Which search terms are wasting spend or cannibalising intent? Runs the Google Ads Search-Term Audit play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Google Ads Search-Term', 'Google Ads', 'Acquisition Efficiency'."
license: CC-BY-4.0
metadata:
  persona: Performance Marketer
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Google Ads Search-Term Audit

**Operating question:** Which search terms are wasting spend or cannibalising intent?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Search Terms report** — every term with **Cost, Clicks, Impressions, Conversions, Conv. value, Cost/conv.**, last 30–90 days (use 90 for lower-volume accounts so terms clear the click floor). This is the spine of the play; without it there is no audit.
- **Campaign + Ad group dimension per term** — so you can see the *same* term firing across multiple campaigns (self-competition) and tell brand-vs-generic leakage apart.
- **Match type per term** — broad / phrase / exact that triggered the match, so a tightening recommendation knows what it's tightening from.
- **Your targets** — target CPA or target ROAS, and your average order value, so a "wasted spend" call is measured against a real threshold, not a gut feel.

Optional, if available:

- **Conversion window / attribution model** — changes whether a research term is "zero-return" or "converts on a lag." Decisive for the KEEP-vs-KILL call.
- **Real orders by term or landing page** (from your store / GA4) — to sanity-check Google's claimed conversions against actual revenue.
- **Existing negative-keyword lists** — so you don't re-add a negative or, worse, find a positive keyword is being blocked by a stale list.
- **Brand vs. non-brand campaign map** — which campaigns are *supposed* to capture brand demand, so leakage into generic is obvious.
- **PMax / Shopping presence** — these channels hide most of their search terms; note the blind spot so you don't claim a clean account when half of it is opaque.

## How to decide — in order

1. **Set the floors first.** Pick a minimum click threshold (e.g. ≥ 20 clicks, or ≥ 1× target CPA in spend) below which a term is **WATCH**, never KILL. A term with 4 clicks and 0 conversions is noise, not evidence.
2. **Catch the zero-return leaks.** Terms over your spend floor with **0 conversions and spend ≥ target CPA** → negative-keyword candidates → **KILL**. Rank these by cost descending; the top five are usually most of the waste.
3. **Sweep the low-intent modifiers.** Scan every term for `free`, `cheap`, `discount` (when you don't discount), `DIY`, `used`, `jobs`, `salary`, `how to make` — these signal a searcher who will not buy. Negate the modifier as a phrase negative so it stops matching across the account, not just the one term.
4. **Find brand leakage.** Any term containing your brand that is firing in a **non-brand / generic** campaign is inflating that campaign's apparent ROAS with demand it didn't create. Add the brand term as a negative to the generic campaign and let the brand campaign claim it. The generic campaign's "real" ROAS is what's left after you remove it.
5. **Spot self-competition.** The same term firing across two or more campaigns means they're bidding against each other in the same auction. Decide the one rightful owner; negate the term in the others.
6. **Protect the laggards.** Before negating any term with *some* conversions, check the conversion window. An upper-funnel/research term (`best [category] for [use-case]`) that converts on a 14-day lag is a **KEEP**, not a leak — negating it starves the funnel.
7. **Apply the vetoes**, then write each row as a negative-keyword add, a match-type tightening, or a KEEP — with the wasted-spend number attached.

## The prompt to run

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

## Decision rules

- **KILL (negate)** — term cleared the click floor (≥ ~20 clicks or ≥ 1× target CPA spend), spend ≥ target CPA, **0 conversions**, no lag/veto. Add as exact or phrase negative depending on how broadly it should stop matching.
- **REFRESH (tighten match)** — the keyword is relevant but broad/phrase match is pulling junk variants around it; tighten to phrase or exact and add the bad variants as negatives, rather than killing the keyword outright.
- **WATCH** — directional only: term under the click floor, or a low-intent modifier with too few clicks to negate confidently, or a window polluted by a promo.
- **KEEP** — converting within the target CPA/ROAS band, *or* a research term that converts on a known lag, *or* a brand term firing in its correct brand campaign.
- **FIX** — conversion tracking is unclear, the conversion window is unknown, or PMax/Shopping opacity means you can't see the terms driving the spend.
- Every recommendation must include a **number, source, time window, and confidence level** — e.g. "$640 cost, 0 conv, 30-day window, high confidence" beats "this term looks bad."

## Vetoes — stop if any apply

- Do **not** negate a term on too few clicks — a small sample with 0 conversions is not proof of a bad term; hold it at WATCH until it clears the floor.
- Do **not** negate a converting research/upper-funnel term without checking the **conversion window** — some convert on a 14-day lag and look dead at a 1-day view.
- Do **not** treat the audit as complete when **PMax or Shopping** carry meaningful spend — they hide most of their search terms, so name the blind spot rather than implying coverage.
- Do **not** negate so broadly that you starve a match type — one over-eager phrase negative can block dozens of profitable long-tail variants.
- Do **not** credit a generic campaign's ROAS without checking for **brand leakage** inflating it.
- Do **not** push any negative, pause, or budget change live without an explicit human approval step.

## Output

A ranked table of negative-keyword adds, match-type tightenings, and KEEP calls — each with the spend it recovers and the evidence behind it.

Minimum table columns:

| Term | Campaign | Match | Cost (window) | Conv | Cost/conv vs target | Action | Spend recovered | Confidence |
|---|---|---|---|---|---|---|---|---|
| free [product] | Shopping – Generic | Broad | $640 (30d) | 0 | n/a (0 conv) | KILL → phrase negative | ~$640/mo | High |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/perf-google-search-term-audit) — it executes this play read-only by default and applies changes only on your approval.
