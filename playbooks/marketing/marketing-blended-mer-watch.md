---
schema_version: 1
slug: "marketing-blended-mer-watch"
title: "Blended MER Watch"
summary: "Blended MER Watch helps ecommerce operators answer: Is blended efficiency moving in the right direction?"
operating_question: "Is blended efficiency moving in the right direction?"
short_title: "Blended MER"
primary_persona: "marketing"
personas: ["marketing", "founder"]
category: "acquisition-efficiency"
platforms: ["commerce", "meta-ads", "google-ads", "tiktok-ads"]
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/marketing-blended-mer-watch"
shopmcp_prompt: "Run the Blended MER Watch play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Blended MER Watch

## Operating Question

**Is my blended marketing efficiency actually improving, holding, or quietly eroding toward breakeven — and can I prove it without leaning on platform-reported ROAS?**

Blended MER (Marketing Efficiency Ratio) is the only acquisition number a CFO trusts: total revenue ÷ total ad spend across every platform, for the whole business. Platform ROAS lies upward — Meta, Google, and TikTok each claim the same returning-customer and email-driven order, so you can sum their dashboards and feel safe while the *blended* number slides. This play trends blended MER week over week, anchors it against a **breakeven MER derived from contribution margin**, and splits out **new-customer MER (aMER)** so a rising returning-customer share can't disguise stalled growth. The output is a defensible **KEEP / WATCH / REFRESH / KILL / FIX** call on the efficiency trend — not a vanity dashboard screenshot.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Shopify revenue, your Meta/Google/TikTok spend, or your COGS — and blended MER is *defined* by summing across exactly those silos. To run it manually you have to:

1. Pull **total** ad spend from three ad platforms for the same week boundaries (Sun–Sat or your fiscal week — pick one and never drift).
2. Pull **total** store revenue for the identical window from commerce, not from any ad platform's "purchase value."
3. Compute **breakeven MER** = 1 ÷ contribution-margin % — which means you first need a real contribution margin (COGS + payment fees + shipping + pick/pack), not gross margin off the top of your head.
4. Split revenue into **new vs. returning** customers to derive aMER, because that split is where platform ROAS does its double-counting.
5. Repeat for 4+ consecutive weeks so a *trend* exists, not a single noisy point.

**The arithmetic is trivial. The cross-silo data pull is the entire job — and that is exactly what ShopMCP connects.** With no live line into commerce + all three ad platforms, a manual run stalls at step 1. Hold that thought; the last section is the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Marketing
- **Also useful for:** Founder/CEO (is the growth engine getting more or less efficient?), Head of Finance (is acquisition staying above breakeven?)
- Run it **before** the weekly growth/leadership sync, and **before** any "let's increase the budget" or "let's cut spend" decision — blended MER is the number that should gate both.

## When To Run It

- **Cadence:** weekly — same day each week (Monday morning on the prior completed Sun–Sat), so the window boundaries never shift under you.
- **Triggers:** a budget-increase request, a soft-revenue week, a CFO asking "are we still profitable on acquisition?", or any week platform ROAS looks flat but cash feels tight.
- **Pre-requisite:** lock your **contribution margin** and your **week definition** first. If margin is unknown you cannot compute breakeven MER, and MER without a breakeven line is just a number floating in space.

## Required Evidence

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — **total** store revenue per week for the trailing 4–8 weeks, plus the **new-customer vs. returning-customer revenue split** per week. Net revenue (post-refund, post-discount) is preferred over gross.
- **Meta Ads** — total spend per week, same window boundaries. Reported purchase value is *context only*, never the revenue numerator.
- **Google Ads** — total spend per week (Search + Shopping + PMax combined), same boundaries.
- **TikTok Ads** — total spend per week, same boundaries. Treat as additive to spend but directional on attribution.
- **Contribution margin %** — COGS + payment processing + shipping + fulfillment, blended or by mix. This is what converts MER into a **breakeven MER** (≈ 1 ÷ contribution-margin %).

## Optional Evidence

- **Promo / discount calendar** — flags which weeks had revenue inflated (and margin compressed) by a sale; a promo week's MER is not comparable to a clean week.
- **Email/SMS-attributed revenue share** — rising owned-channel revenue lifts blended MER with zero new paid efficiency; you want to see it isolated.
- **Returning-customer rate trend** — the single biggest silent driver of a "rising" blended MER that isn't real growth.
- **New-customer CAC and 60/90-day LTV** — lets you judge whether an aMER below breakeven is still defensible on payback.
- **Any non-ad spend you load into MER** (agency retainers, influencer flat fees) — decide once whether it's in or out, and stay consistent.

## The Decision Logic (run in this order)

1. **Lock the denominator and the window.** Confirm spend is *total* across all three platforms and revenue is *commerce-side total* for the identical week boundaries. A mismatched window (e.g. Meta on a rolling 7-day vs. Shopify on calendar week) silently fabricates a trend. If they can't be aligned → **FIX**.
2. **Compute breakeven MER before anything else.** Breakeven MER ≈ 1 ÷ contribution-margin %. At 40% contribution margin, breakeven MER = 2.5; at 30%, it's 3.33; at 50%, it's 2.0. Without this line, every MER reading is **FIX** — meaningless until margin context exists.
3. **Trend, don't snapshot.** Plot blended MER for ≥4 consecutive weeks. One week is noise. You are judging *direction and distance to breakeven*, not a single value.
4. **Compare blended MER to summed platform ROAS — they should diverge.** If platforms look flat (summed ROAS steady) while blended MER falls, the platforms are taking credit for demand that was already coming (returning, email, organic). The blended number is the truth.
5. **Decompose with aMER.** Split out new-customer MER. If blended MER is holding *only* because returning-customer share is climbing, aMER is the real story and new-customer acquisition is decaying underneath. Name which one moved.
6. **Measure distance to breakeven, not just slope.** A 2.8 MER falling toward a 2.3 breakeven is a different alarm than a 6.0 falling to 5.5. Rank by *how close to (or below) breakeven* the trend lands, then apply vetoes.

## Manual Workflow

1. Fix your week definition (e.g. Sun–Sat) and pull total spend per week from Meta, Google, and TikTok for the trailing 4–8 weeks.
2. Pull total commerce revenue per week for the identical windows, plus the new vs. returning split.
3. Compute contribution margin %, then breakeven MER (1 ÷ margin %). Write it down as a fixed line.
4. Build the weekly table: blended MER, summed platform ROAS, aMER, returning-customer share — week over week.
5. Flag any promo or stockout weeks so you don't compare a sale week to a clean one.
6. Paste the prompt below with your table; pressure-test the read against the veto list; convert into an action with owner and recheck date.

## Copy-Paste Prompt

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
2. A weekly trend table: Week | Spend | Revenue | Blended MER | Summed platform ROAS |
   aMER | Returning share | Breakeven MER | Note.
3. A status (KEEP/WATCH/REFRESH/KILL/FIX) on the efficiency trend, with the veto applied.
4. What evidence is blocked and what you'd need to upgrade the call.
```

## Decision Rules

- **KEEP** — blended MER is flat or rising, comfortably above breakeven (≥ ~1.2× breakeven), and aMER confirms new-customer acquisition is also healthy. The engine is efficient; don't touch the trend, scale carefully.
- **WATCH** — blended MER is drifting down but still above breakeven, or the decline sits inside one noisy/promo-polluted window. Directional only; recheck after a clean week.
- **REFRESH** — blended MER is eroding *and* aMER shows new-customer efficiency decaying while returning share props up the blended number. The acquisition layer needs creative/audience/offer work, not a budget cut.
- **KILL** — blended MER has crossed or is converging hard on breakeven (within ~5%) across ≥3 weeks at scaled spend, and aMER is below breakeven. Pull the inefficient spend down before it goes margin-negative. This is a budget decision, never a single-campaign edit.
- **FIX** — no contribution margin (so no breakeven MER), mismatched spend/revenue windows, or revenue pulled from platform "purchase value" instead of commerce. Resolve the data before judging the trend.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- **Never report MER without breakeven context** — MER without margin is meaningless. Always compute breakeven MER = 1 ÷ contribution-margin % first.
- **Do not compare a promo/sale week to a clean week** — discounts inflate revenue *and* compress margin, distorting MER in both directions.
- **Do not conflate blended MER with channel-level or platform ROAS** — a single platform's ROAS is not the blended number and cannot drive a blended call.
- **Do not read a rising blended MER as growth when returning-customer share is climbing** — owned/returning demand lifts blended MER with zero new acquisition; check aMER before celebrating.
- **Do not claim profitability from MER alone** without confirming the contribution-margin inputs (COGS, fees, shipping, fulfillment) are real, not assumed.
- **Do not recommend a budget cut or scale-up** without a human approval step; this play is read-only.

## Output Contract

A weekly blended-MER trend table with breakeven anchored, summed platform ROAS for contrast, and aMER to expose the new-customer story:

| Week | Spend (all platforms) | Revenue (commerce) | Blended MER | Summed platform ROAS | aMER | Returning share | Breakeven MER | Note |
|---|---|---|---|---|---|---|---|---|
| W-4 | $61,200 | $189,700 | 3.10 | 2.4 | 2.55 | 38% | 2.30 | Clean week |

## Worked Example

> **Executive read:** Summed platform ROAS has sat dead flat at 2.4 for four straight weeks, so the ad dashboards look fine — but commerce-side **blended MER fell 3.10 → 2.60** over the same window, and breakeven is **2.30**. The whole "stability" is returning-customer share climbing 38% → 47% while **aMER dropped 2.55 → 2.05 (now below breakeven)**: new-customer acquisition is the leak, and real efficiency is within 13% of breakeven. Status REFRESH the acquisition layer (creative/audience/offer), not a blunt budget cut — and re-baseline after the next clean, promo-free week.

| Week | Spend (all platforms) | Revenue (commerce) | Blended MER | Summed platform ROAS | aMER | Returning share | Breakeven MER | Note |
|---|---|---|---|---|---|---|---|---|
| W-4 | $61,200 | $189,700 | **3.10** | 2.4 | 2.55 | 38% | 2.30 | Clean week |
| W-3 | $63,800 | $186,000 | **2.92** | 2.4 | 2.38 | 41% | 2.30 | Clean week |
| W-2 | $66,400 | $179,300 | **2.70** | 2.4 | 2.18 | 44% | 2.30 | 15%-off promo Thu–Sun |
| W-1 | $68,100 | $177,000 | **2.60** | 2.4 | 2.05 | 47% | 2.30 | Clean week; aMER < breakeven |

Note how the platform view (2.4 ROAS, flat) and the blended view (3.10 → 2.60, falling toward 2.30) tell *opposite* stories — and aMER dropping below breakeven while returning share climbs is the tell that the platforms are over-crediting demand the brand already owned. The W-2 promo week is flagged so its compressed margin isn't mistaken for a structural step-down.

## Common Failure Modes

- Reading summed platform ROAS as "efficiency is fine" while blended MER quietly erodes underneath it.
- Reporting a blended MER with no breakeven line, so nobody can tell if it's good or underwater.
- Comparing a promo week to a clean week and calling the revenue bump (or the margin dip) a trend.
- Celebrating a rising blended MER that's only rising because returning-customer share grew — aMER would have shown stalled acquisition.
- Using a platform's reported "purchase value" as the revenue numerator instead of commerce-side total, which re-imports the double-counting you were trying to escape.
- Judging a single week instead of a 4+ week trend.

## Run This Play With Live Data

**Manual version:** pull total weekly spend from three ad platforms and total weekly revenue from commerce on identical window boundaries, compute contribution margin and breakeven MER, split new vs. returning, and rebuild the 4-week trend — every week, by hand.

**ShopMCP version:** connect your store and Meta, Google, and TikTok once. Ask the question; ShopMCP pulls total spend across all three platforms and commerce-side total revenue on aligned weekly windows, computes breakeven MER from your margin, isolates new-customer aMER and returning share, and returns the blended-MER trend table with the platform-ROAS contrast already drawn. It stays **read-only** until you explicitly approve any budget move.

> No commerce + Meta + Google + TikTok connection inside your AI assistant? That cross-silo wall is where blended MER becomes impossible to compute manually — the number is *defined* by summing platforms you can't otherwise see together. ShopMCP *is* that connection, and the same play runs in one prompt instead of a four-platform spreadsheet pull.

Example ShopMCP prompt:

```text
Run the Blended MER Watch play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/marketing-blended-mer-watch?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Aligning three ad platforms and commerce to identical weekly windows by hand.
- Re-deriving contribution margin and breakeven MER every week.
- Splitting new vs. returning revenue to compute aMER manually.
- Rebuilding the 4-week blended-MER trend from fresh CSV exports each week.
