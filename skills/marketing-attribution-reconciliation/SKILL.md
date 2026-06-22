---
name: marketing-attribution-reconciliation
description: "When an ecommerce operator needs to decide: Which source of attribution is drifting from commerce truth? Runs the Attribution Reconciliation play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Attribution Reconciliation', 'Commerce', 'Google Analytics 4', 'Tracking Data Quality'."
license: CC-BY-4.0
metadata:
  persona: Head of Marketing
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Attribution Reconciliation

**Operating question:** Which source of attribution is drifting from commerce truth?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce (Shopify/Woo/BigCommerce/etc.) — the denominator** — total paid, non-test, non-cancelled **orders** for the month, plus the store's own first-touch or last-touch source tag (UTM / referrer) per order. This is *truth*: the count that settled.
- **Meta Ads** — reported **purchases (conversions)** and purchase value for the same window, with the attribution setting noted (default 7-day click / 1-day view).
- **Google Ads** — reported **conversions** and value, split by Search / Shopping / PMax, with the conversion window noted.
- **GA4** — **purchases by default channel grouping** under last-click (data-driven if enabled — note which), so you can see how last-click distributes credit across Paid Social, Paid Search, Email, Organic, Direct, and Brand vs. non-brand search.
- **Email/SMS platform (Klaviyo/etc.)** — **attributed orders/revenue** and the attribution window it uses (often a generous 5-day click / 1-day open), because lifecycle tools double-count alongside ads.

Optional, if available:

- **MTA or MMM output** if you run one — a media-mix or multi-touch model is a fourth lens; reconcile it too, never treat it as ground truth.
- **Brand vs. non-brand search split** — isolates how much of GA4's "Paid/Organic Search" credit is brand defence (demand other channels created) vs. genuine discovery.
- **New-vs-returning split per source** — returning-customer orders inflate retargeting and email credit; first-order share is the cleaner acquisition signal.
- **Promo / launch calendar** — a promo week compresses paths and shifts credit toward whichever channel sent the final click.
- **Geo-holdout or last paid-channel-off test** — the only true incrementality check; if you have one, it outranks every modelled claim.

## How to decide — in order

1. **Lock the denominator.** Pull total commerce orders for the window. This single number is the truth every source is scored against. Do not proceed until it is confirmed against the Tracking Sanity Check.
2. **Sum the self-credit.** Add Meta + Google + Klaviyo (+ any platform) claimed conversions. Divide by commerce orders. The amount over 100% is the **over-claim / overlap rate** — the share of sales being credited more than once. Under ~110% means thin tracking or under-counting; **130%+** means heavy multi-claim and no single platform can be trusted as a denominator.
3. **Compute per-channel credit ratios.** For each channel, divide its claimed conversions by the commerce orders that channel actually closed (by store UTM). A ratio **>1.3 = over-crediting**; **<0.7 = under-crediting**. Name the direction per source, not just "drift."
4. **Isolate the last-click distortion.** In GA4, check what share of credit lands on **brand search, email, and direct**. If brand + direct + email exceeds ~40–50% of last-click credit, last-click is rewarding demand-harvesting, not demand-creation. Flag those channels as **over-credited by last-click**, under-credited by any touched-based source.
5. **Reconcile windows before judging drift.** If two sources use different click/view windows, normalise (or at minimum annotate) before calling drift real — a 7-day vs 1-day window gap alone can move credit 10–20%.
6. **Build the trust map and the blended view.** Decide *which source to trust for which question* (e.g. trust commerce for total, trust GA4 last-click only for closer-channels, trust Meta for prospecting reach not for closed revenue). Then state one sanctioned blended split. Apply vetoes; never reallocate on a single lens.

## The prompt to run

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

## Decision rules

- Use `FIX` when sources cannot be reconciled at all — the commerce denominator is unconfirmed, windows are unknown, or a source's claimed total is missing — so no credit ratio is safe.
- Use `KILL` for a *source's credibility on a specific question*, not for spend: e.g. KILL the use of platform-summed conversions as a revenue denominator once the over-claim rate clears ~130%.
- Use `REFRESH` when a source is usable but its window or model must be re-aligned (normalise Meta's 7-day click to match GA4) before its numbers enter the blended view.
- Use `WATCH` when a credit ratio sits in the 0.7–1.3 grey band or the month is too short/promo-polluted to call drift real.
- Use `KEEP` when a source reconciles to within ±15% of commerce truth for its channel and can be trusted as-is for that decision.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- **No single platform is truth.** Commerce orders are the denominator; a platform's self-reported conversions never override the store's settled order count.
- Platform conversions are **modelled and claimed, not measured** — never sum them into a revenue figure and present it as actual revenue.
- **View-through inflates.** Discount any view-through-heavy claim; a 1-day-view conversion is not a click-driven sale.
- Do **not** reallocate budget on a single attribution lens. A move needs agreement across the trust map (or an incrementality test), not one favourable source.
- Do **not** call drift real across mismatched windows — normalise the click/view window first or label the comparison invalid.
- Do **not** treat returning-customer orders credited to retargeting/email as new acquisition.
- Do **not** push any budget, creative, or lifecycle change from this play without an explicit human approval step.

## Output

A per-channel reconciliation against the fixed commerce denominator, an over-claim rate, confidence labels, and a trust map plus one blended view.

Minimum table columns:

| Source | Channel | Claimed conv. | Commerce orders | Credit ratio | Over/Under | Trust this source for | Confidence |
|---|---|---|---|---|---|---|---|
| Meta Ads | Paid Social | 480 | 312 | 1.54 | Over | Prospecting reach, not closed revenue | High |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
