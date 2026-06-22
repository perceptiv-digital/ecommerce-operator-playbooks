---
schema_version: 1
slug: "marketing-attribution-reconciliation"
title: "Attribution Reconciliation"
summary: "Attribution Reconciliation helps ecommerce operators answer: Which source of attribution is drifting from commerce truth?"
operating_question: "Which source of attribution is drifting from commerce truth?"
short_title: "Attribution Reconciliation"
primary_persona: "marketing"
personas: ["marketing"]
category: "tracking-data-quality"
platforms: ["commerce", "google-analytics-4"]
cadence: "monthly"
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/marketing-attribution-reconciliation"
shopmcp_prompt: "Run the Attribution Reconciliation play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Attribution Reconciliation

## Operating Question

**For the same set of real orders, which attribution source is over- or under-crediting each channel — and which source should I trust for which decision this month?**

Every attribution source is looking at the *same* sales and telling you a *different* story about who caused them. Meta says it drove them. Google says it drove them. Klaviyo says it drove them. GA4 last-click hands most of the credit to brand search, email, and direct. They cannot all be right, because the orders are finite — your store settled exactly one count. This play does **not** ask whether the pixel is firing (that is the Tracking Sanity Check). It assumes orders are tracked correctly and instead measures **credit allocation**: it takes commerce orders as the fixed denominator, then quantifies how far each source's claimed conversions drift above or below that truth, channel by channel. The output is a *trust-this-source-for-X* guide and one sanctioned blended view — so the next budget conversation argues from one agreed map instead of four self-serving ones.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot open your Shopify orders, your Meta and Google conversion columns, your Klaviyo attributed-revenue report, or your GA4 channel-grouping. And even handed every export, the hard part is not arithmetic — it is knowing *why the numbers disagree by construction*:

1. Platform conversion counts are **modelled and self-credited** — each platform claims any sale it touched, so summed across platforms they exceed total orders. That overlap is the signal, not an error.
2. GA4 last-click is **rules-based**, not modelled — it gives 100% of credit to the final click, which structurally over-rewards brand search, email, and direct/dark social that merely *closed* demand other channels created.
3. View-through and click-through windows **differ per platform** (Meta 7-day click / 1-day view vs. Google's conversion window), so a window mismatch alone manufactures fake drift.

**The reasoning in this playbook is free. The four-source reconciliation against one fixed order count is the work — and the live access to pull all four is exactly what ShopMCP provides.** With no connection into commerce, Meta, Google, and GA4, a manual run stalls at the export step.

## Who Should Run It

- **Primary owner:** Head of Marketing — owns the channel-mix and budget-split narrative.
- **Also useful for:** Performance Marketer (whose ROAS gets inflated by self-credit), Finance/FP&A (who needs a defensible revenue-by-channel split), Founder/CEO (who hears three teams each claim the same sale).
- Run it **before** any quarterly budget reallocation or board deck that splits revenue by channel — never let a single platform's self-reported number become the planning baseline.

## When To Run It

- **Cadence:** monthly — attribution drift is slow and noisy; a weekly read is mostly sampling noise.
- **Triggers:** the sum of platform-claimed conversions creeping further above total orders month over month; a planned budget reallocation; a new channel (e.g. TikTok, affiliate) entering the mix; an iOS/consent or GA4 model change; two teams openly disagreeing about who drove a sales spike.
- **Pre-requisite:** run the **Tracking Sanity Check** first. If orders themselves are mis-tracked, every credit ratio below is built on sand. This play assumes the denominator is trustworthy and reconciles *credit*, not *capture*.

## Required Evidence

- **Commerce (Shopify/Woo/BigCommerce/etc.) — the denominator** — total paid, non-test, non-cancelled **orders** for the month, plus the store's own first-touch or last-touch source tag (UTM / referrer) per order. This is *truth*: the count that settled.
- **Meta Ads** — reported **purchases (conversions)** and purchase value for the same window, with the attribution setting noted (default 7-day click / 1-day view).
- **Google Ads** — reported **conversions** and value, split by Search / Shopping / PMax, with the conversion window noted.
- **GA4** — **purchases by default channel grouping** under last-click (data-driven if enabled — note which), so you can see how last-click distributes credit across Paid Social, Paid Search, Email, Organic, Direct, and Brand vs. non-brand search.
- **Email/SMS platform (Klaviyo/etc.)** — **attributed orders/revenue** and the attribution window it uses (often a generous 5-day click / 1-day open), because lifecycle tools double-count alongside ads.

## Optional Evidence

- **MTA or MMM output** if you run one — a media-mix or multi-touch model is a fourth lens; reconcile it too, never treat it as ground truth.
- **Brand vs. non-brand search split** — isolates how much of GA4's "Paid/Organic Search" credit is brand defence (demand other channels created) vs. genuine discovery.
- **New-vs-returning split per source** — returning-customer orders inflate retargeting and email credit; first-order share is the cleaner acquisition signal.
- **Promo / launch calendar** — a promo week compresses paths and shifts credit toward whichever channel sent the final click.
- **Geo-holdout or last paid-channel-off test** — the only true incrementality check; if you have one, it outranks every modelled claim.

## How To Pull This Evidence

- **Shopify total orders by channel** — Analytics → Reports → "Sales by traffic source" (or Orders export filtered to paid, non-test, non-cancelled) for the exact window; this is your fixed denominator and your per-channel store-UTM split.
- **GA4 last-click** — Reports → Acquisition → Traffic acquisition, set the attribution model to last-click and the conversion event to `purchase`, broken out by Default channel grouping for the identical dates.
- **Meta / Google claimed conversions** — Meta Ads Manager (Purchases column, note the 7-day click / 1-day view setting) and Google Ads (Conversions by Search / Shopping / PMax, note the conversion window) for the same window.
- **Window-mismatch gotcha** — each platform counts on a different click/view window (Meta 7-day click vs. Google's window vs. Klaviyo's 5-day), so pull every source over the *same calendar dates* and record each window before comparing, or you'll manufacture fake drift.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Lock the denominator.** Pull total commerce orders for the window. This single number is the truth every source is scored against. Do not proceed until it is confirmed against the Tracking Sanity Check.
2. **Sum the self-credit.** Add Meta + Google + Klaviyo (+ any platform) claimed conversions. Divide by commerce orders. The amount over 100% is the **over-claim / overlap rate** — the share of sales being credited more than once. Under ~110% means thin tracking or under-counting; **130%+** means heavy multi-claim and no single platform can be trusted as a denominator.
3. **Compute per-channel credit ratios.** For each channel, divide its claimed conversions by the commerce orders that channel actually closed (by store UTM). A ratio **>1.3 = over-crediting**; **<0.7 = under-crediting**. Name the direction per source, not just "drift."
4. **Isolate the last-click distortion.** In GA4, check what share of credit lands on **brand search, email, and direct**. If brand + direct + email exceeds ~40–50% of last-click credit, last-click is rewarding demand-harvesting, not demand-creation. Flag those channels as **over-credited by last-click**, under-credited by any touched-based source.
5. **Reconcile windows before judging drift.** If two sources use different click/view windows, normalise (or at minimum annotate) before calling drift real — a 7-day vs 1-day window gap alone can move credit 10–20%.
6. **Build the trust map and the blended view.** Decide *which source to trust for which question* (e.g. trust commerce for total, trust GA4 last-click only for closer-channels, trust Meta for prospecting reach not for closed revenue). Then state one sanctioned blended split. Apply vetoes; never reallocate on a single lens.

## Manual Workflow

1. Pull total commerce orders for the month — the fixed denominator — plus per-order source tags from the store.
2. Pull Meta, Google, Klaviyo claimed conversions and GA4 last-click channel purchases for the *identical* window; record each tool's attribution window.
3. Sum platform claims ÷ commerce orders → the over-claim rate (step 2 of the logic).
4. For each channel, compute claimed ÷ store-attributed orders → over/under-credit ratio.
5. Mark the GA4 last-click channels (brand search, email, direct) that are absorbing demand other channels created.
6. Normalise or annotate window mismatches, then paste the prompt below with your tables.
7. Convert the result into a trust map + one blended view + a recheck date — never a same-day budget move.

## Copy-Paste Prompt

```text
You are my marketing-analytics analyst running the "Attribution Reconciliation" play.

GOAL: for ONE fixed set of real orders, quantify how much each attribution source
over- or under-credits each channel, then tell me which source to trust for which
decision. The denominator is commerce orders — NOT any platform's self-report.

I will paste: total commerce orders for the window (truth), per-channel commerce
orders by store UTM, Meta/Google/Klaviyo claimed conversions, GA4 last-click
purchases by channel, and each tool's attribution window. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If total
commerce orders (the denominator/truth) is missing, STOP and return only (a) what's
missing and (b) how to get it — never estimate it or proceed. Without it you cannot
compute any source's over/under-credit ratio.

RULES:
- Treat commerce orders as the only denominator. Platform conversions are modelled
  and self-credited; they sum to MORE than total orders on purpose — that overlap is
  the over-claim rate, not an error.
- Compute (sum of platform claims / commerce orders) as the over-claim/overlap rate.
- For each channel, compute claimed conversions / store-attributed orders. Flag >1.3
  as OVER-crediting and <0.7 as UNDER-crediting; name the source and direction.
- Treat GA4 last-click as rules-based: call out brand search, email, and direct as
  channels that close demand they did not create. Do not let last-click set budget.
- Reconcile or annotate differing click/view windows before declaring drift real.
- Never recommend reallocating budget on a single attribution lens. Output a trust
  map (trust source X for decision Y) and ONE sanctioned blended view.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent data.

RETURN:
1. A 3-sentence executive read naming the most over- and most under-credited channel.
2. A reconciliation table using exactly this header row:
   | Source | Channel | Claimed conv. | Commerce orders | Credit ratio | Over/Under | Trust this source for | Confidence |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not
   replace the table with prose.
3. The over-claim/overlap rate and what it implies.
4. A trust map + one blended split, plus vetoes that downgraded any call.
```

## Decision Rules

- Use `FIX` when sources cannot be reconciled at all — the commerce denominator is unconfirmed, windows are unknown, or a source's claimed total is missing — so no credit ratio is safe.
- Use `KILL` for a *source's credibility on a specific question*, not for spend: e.g. KILL the use of platform-summed conversions as a revenue denominator once the over-claim rate clears ~130%.
- Use `REFRESH` when a source is usable but its window or model must be re-aligned (normalise Meta's 7-day click to match GA4) before its numbers enter the blended view.
- Use `WATCH` when a credit ratio sits in the 0.7–1.3 grey band or the month is too short/promo-polluted to call drift real.
- Use `KEEP` when a source reconciles to within ±15% of commerce truth for its channel and can be trusted as-is for that decision.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- **No single platform is truth.** Commerce orders are the denominator; a platform's self-reported conversions never override the store's settled order count.
- Platform conversions are **modelled and claimed, not measured** — never sum them into a revenue figure and present it as actual revenue.
- **View-through inflates.** Discount any view-through-heavy claim; a 1-day-view conversion is not a click-driven sale.
- Do **not** reallocate budget on a single attribution lens. A move needs agreement across the trust map (or an incrementality test), not one favourable source.
- Do **not** call drift real across mismatched windows — normalise the click/view window first or label the comparison invalid.
- Do **not** treat returning-customer orders credited to retargeting/email as new acquisition.
- Do **not** push any budget, creative, or lifecycle change from this play without an explicit human approval step.

## Output Contract

A per-channel reconciliation against the fixed commerce denominator, an over-claim rate, confidence labels, and a trust map plus one blended view.

Minimum table columns:

| Source | Channel | Claimed conv. | Commerce orders | Credit ratio | Over/Under | Trust this source for | Confidence |
|---|---|---|---|---|---|---|---|
| Meta Ads | Paid Social | 480 | 312 | 1.54 | Over | Prospecting reach, not closed revenue | High |

## Worked Example

> **Executive read:** Across 1,000 settled orders this month, the three platforms *claim* 1,190 conversions — a 19% over-claim where each tool credits the same sale. Meta is the worst over-crediter (1.54× its store-attributed orders) and is inflating prospecting ROAS; GA4 last-click is the inverse problem, handing brand search 22% of all credit for demand that paid social and email actually created. Trust commerce for the total, trust Meta only for reach, and do not let last-click set the budget split.

| Source | Channel | Claimed conv. | Commerce orders | Credit ratio | Over/Under | Trust this source for | Confidence |
|---|---|---|---|---|---|---|---|
| Commerce (truth) | All channels | — | **1,000** | 1.00 | denominator | Total order count, revenue | High |
| Meta Ads | Paid Social | 480 | 312 | **1.54** | Over | Prospecting reach, not closed revenue | High |
| Google Ads | Paid + Shopping | 410 | 358 | **1.15** | Slightly over | Non-brand discovery volume | High |
| Klaviyo | Email/SMS | 300 | 196 | **1.53** | Over | Flow engagement, not incremental orders | Med |
| GA4 last-click | Brand Search | 220 (22% of credit) | ~70 incremental | **~3.1** | Heavily over | Which channel *closed*, not who created demand | Med |
| GA4 last-click | Paid Social | 150 | 312 | **0.48** | Under | — (last-click starves upper-funnel) | Med |
| Blended (sanctioned) | All | — | 1,000 | 1.00 | reconciled | The one planning baseline | Med |

Sum of platform claims = 480 + 410 + 300 = **1,190 vs 1,000 orders = 19% over-claim**. Note how the answer inverts the platform view: Meta and Klaviyo each look like hero channels until you divide their claims by the orders they actually closed, and GA4 last-click's "strong" brand search is mostly demand the over-claiming channels created.

## Common Failure Modes

- Summing Meta + Google + Klaviyo conversions into a "total revenue" number — that double-counts by ~19% here and inflates blended ROAS.
- Reallocating budget toward whichever platform self-reports the highest ROAS (always the heaviest self-crediter).
- Reading GA4 last-click as causation and defunding the upper-funnel channels that actually created the demand.
- Comparing a 7-day-click source against a 1-day-view source and calling the gap "drift."
- Crediting returning-customer orders to retargeting/email and counting them as new acquisition.

## Run This Play With Live Data

**Manual version:** export commerce orders, Meta, Google, Klaviyo, and GA4 channel reports, align five different attribution windows by hand, then compute per-channel credit ratios against the order count — every month.

**ShopMCP version:** connect your store, Meta, Google, GA4, and Klaviyo once. Ask the question; ShopMCP pulls live commerce orders as the fixed denominator, each source's claimed conversions, and their windows, computes the over-claim rate and per-channel over/under-credit ratios, and returns the trust map plus one sanctioned blended view. It stays **read-only** — no budget or flow change without explicit approval.

> No commerce, Meta, Google, or GA4 connection inside your AI assistant? That platform-access gap is the wall every manual run hits. ShopMCP *is* the connection — the same reconciliation then runs in one prompt instead of a monthly spreadsheet session.

Example ShopMCP prompt:

```text
Run the Attribution Reconciliation play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/marketing-attribution-reconciliation?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual exports across commerce, Meta, Google, GA4, and Klaviyo.
- Hand-aligning five different click/view attribution windows.
- Recomputing per-channel credit ratios against the order count every month.
- Arguing budget from four self-serving numbers instead of one agreed map.
