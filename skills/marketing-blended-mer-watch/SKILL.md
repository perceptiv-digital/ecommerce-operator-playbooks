---
name: marketing-blended-mer-watch
description: "When an ecommerce operator needs to decide: Is blended efficiency moving in the right direction? Runs the Blended MER Watch play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Blended MER Watch', 'Commerce', 'Meta Ads', 'Google Ads', 'Tiktok Ads', 'Acquisition Efficiency'."
license: CC-BY-4.0
metadata:
  persona: Head of Marketing
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Blended MER Watch

**Operating question:** Is blended efficiency moving in the right direction?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — **total** store revenue per week for the trailing 4–8 weeks, plus the **new-customer vs. returning-customer revenue split** per week. Net revenue (post-refund, post-discount) is preferred over gross.
- **Meta Ads** — total spend per week, same window boundaries. Reported purchase value is *context only*, never the revenue numerator.
- **Google Ads** — total spend per week (Search + Shopping + PMax combined), same boundaries.
- **TikTok Ads** — total spend per week, same boundaries. Treat as additive to spend but directional on attribution.
- **Contribution margin %** — COGS + payment processing + shipping + fulfillment, blended or by mix. This is what converts MER into a **breakeven MER** (≈ 1 ÷ contribution-margin %).

Optional, if available:

- **Promo / discount calendar** — flags which weeks had revenue inflated (and margin compressed) by a sale; a promo week's MER is not comparable to a clean week.
- **Email/SMS-attributed revenue share** — rising owned-channel revenue lifts blended MER with zero new paid efficiency; you want to see it isolated.
- **Returning-customer rate trend** — the single biggest silent driver of a "rising" blended MER that isn't real growth.
- **New-customer CAC and 60/90-day LTV** — lets you judge whether an aMER below breakeven is still defensible on payback.
- **Any non-ad spend you load into MER** (agency retainers, influencer flat fees) — decide once whether it's in or out, and stay consistent.

## How to decide — in order

1. **Lock the denominator and the window.** Confirm spend is *total* across all three platforms and revenue is *commerce-side total* for the identical week boundaries. A mismatched window (e.g. Meta on a rolling 7-day vs. Shopify on calendar week) silently fabricates a trend. If they can't be aligned → **FIX**.
2. **Compute breakeven MER before anything else.** Breakeven MER ≈ 1 ÷ contribution-margin %. At 40% contribution margin, breakeven MER = 2.5; at 30%, it's 3.33; at 50%, it's 2.0. Without this line, every MER reading is **FIX** — meaningless until margin context exists.
3. **Trend, don't snapshot.** Plot blended MER for ≥4 consecutive weeks. One week is noise. You are judging *direction and distance to breakeven*, not a single value.
4. **Compare blended MER to summed platform ROAS — they should diverge.** If platforms look flat (summed ROAS steady) while blended MER falls, the platforms are taking credit for demand that was already coming (returning, email, organic). The blended number is the truth.
5. **Decompose with aMER.** Split out new-customer MER. If blended MER is holding *only* because returning-customer share is climbing, aMER is the real story and new-customer acquisition is decaying underneath. Name which one moved.
6. **Measure distance to breakeven, not just slope.** A 2.8 MER falling toward a 2.3 breakeven is a different alarm than a 6.0 falling to 5.5. Rank by *how close to (or below) breakeven* the trend lands, then apply vetoes.

## The prompt to run

```text
You are my marketing-finance analyst running the "Blended MER Watch" play.

GOAL: tell me whether blended marketing efficiency is improving, holding, or eroding
toward breakeven — using commerce-side revenue, not platform-reported ROAS.

DEFINITIONS:
- Blended MER = total store revenue / total ad spend across ALL platforms, per week.
- Breakeven MER = 1 / contribution-margin %. Compute it from the margin I give you.
- aMER (new-customer MER) = total ad spend covered by NEW-customer revenue only.

I will paste a weekly table: total spend (Meta+Google+TikTok), total commerce revenue,
new vs returning revenue split, summed platform ROAS, contribution margin, and any
promo weeks. Some fields may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If total revenue,
total ad spend, or contribution-margin % is missing (these are the critical inputs that
compute breakeven MER — MER without margin is meaningless), STOP and return only (a)
what's missing and (b) how to get it — never estimate it or proceed.

RULES:
- Compute breakeven MER first. If I gave no margin, mark everything FIX — MER without a
  breakeven line is meaningless. Do not guess a margin.
- Align all spend and revenue to identical week boundaries. If windows don't match, FIX.
- Judge the 4+ week TREND and the distance to breakeven, not a single week.
- Explicitly compare blended MER vs summed platform ROAS. If ROAS is flat while blended
  MER falls, say platforms are over-crediting returning/organic/email demand.
- Split out aMER. If blended MER holds only because returning-customer share rose, say so
  and report that new-customer acquisition is decaying.
- Exclude or flag promo weeks; never compare a sale week to a clean week.
- Every row carries: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent data.

RETURN:
1. A 3-sentence executive read (direction, distance to breakeven, the real driver).
2. A weekly trend table using EXACTLY this header row, columns in this order:
   | Week | Spend (all platforms) | Revenue (commerce) | Blended MER | Summed platform ROAS | aMER | Returning share | Breakeven MER | Note |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace
   the table with prose.
3. A status (KEEP/WATCH/REFRESH/KILL/FIX) on the efficiency trend, with the veto applied.
4. What evidence is blocked and what you'd need to upgrade the call.
```

## Decision rules

- **KEEP** — blended MER is flat or rising, comfortably above breakeven (≥ ~1.2× breakeven), and aMER confirms new-customer acquisition is also healthy. The engine is efficient; don't touch the trend, scale carefully.
- **WATCH** — blended MER is drifting down but still above breakeven, or the decline sits inside one noisy/promo-polluted window. Directional only; recheck after a clean week.
- **REFRESH** — blended MER is eroding *and* aMER shows new-customer efficiency decaying while returning share props up the blended number. The acquisition layer needs creative/audience/offer work, not a budget cut.
- **KILL** — blended MER has crossed or is converging hard on breakeven (within ~5%) across ≥3 weeks at scaled spend, and aMER is below breakeven. Pull the inefficient spend down before it goes margin-negative. This is a budget decision, never a single-campaign edit.
- **FIX** — no contribution margin (so no breakeven MER), mismatched spend/revenue windows, or revenue pulled from platform "purchase value" instead of commerce. Resolve the data before judging the trend.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- **Never report MER without breakeven context** — MER without margin is meaningless. Always compute breakeven MER = 1 ÷ contribution-margin % first.
- **Do not compare a promo/sale week to a clean week** — discounts inflate revenue *and* compress margin, distorting MER in both directions.
- **Do not conflate blended MER with channel-level or platform ROAS** — a single platform's ROAS is not the blended number and cannot drive a blended call.
- **Do not read a rising blended MER as growth when returning-customer share is climbing** — owned/returning demand lifts blended MER with zero new acquisition; check aMER before celebrating.
- **Do not claim profitability from MER alone** without confirming the contribution-margin inputs (COGS, fees, shipping, fulfillment) are real, not assumed.
- **Do not recommend a budget cut or scale-up** without a human approval step; this play is read-only.

## Output

A weekly blended-MER trend table with breakeven anchored, summed platform ROAS for contrast, and aMER to expose the new-customer story:

| Week | Spend (all platforms) | Revenue (commerce) | Blended MER | Summed platform ROAS | aMER | Returning share | Breakeven MER | Note |
|---|---|---|---|---|---|---|---|---|
| W-4 | $61,200 | $189,700 | 3.10 | 2.4 | 2.55 | 38% | 2.30 | Clean week |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
