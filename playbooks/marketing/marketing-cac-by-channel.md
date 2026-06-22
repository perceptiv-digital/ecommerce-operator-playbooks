---
schema_version: 1
slug: "marketing-cac-by-channel"
title: "New-Customer CAC by Channel"
summary: "New-Customer CAC by Channel helps ecommerce operators answer: Which channels are acquiring new customers at acceptable cost?"
operating_question: "Which channels are acquiring new customers at acceptable cost?"
short_title: "New-Customer CAC by Channel"
primary_persona: "marketing"
personas: ["marketing", "founder", "performance"]
category: "acquisition-efficiency"
platforms: ["commerce", "google-analytics-4", "meta-ads", "google-ads", "tiktok-ads"]
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/marketing-cac-by-channel"
shopmcp_prompt: "Run the New-Customer CAC by Channel play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# New-Customer CAC by Channel

## Operating Question

**Which channels are acquiring *new* customers at an acceptable cost — judged on commerce truth and contribution margin, not on the CPA each ad platform reports for itself?**

Every channel grades its own homework. Meta, Google, and TikTok each count a "conversion" whenever someone who saw their ad later buys — including loyal customers who would have repurchased anyway. That inflates a channel's apparent efficiency and quietly buries your real cost of *acquisition*. This play separates the two questions every growth budget actually turns on: **how many genuinely first-time customers did each channel buy, and at what cost per head against a margin-and-payback-derived target.** The output is a ranked **KILL / REFRESH / WATCH / KEEP / FIX** call per channel, sized by new-customer CAC versus what a new customer is actually worth.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Shopify new-vs-returning split, your GA4 source/medium, or your three ad accounts — and without all four, the central calculation is impossible. The whole play hinges on a number no single platform will give you:

> **New-customer CAC = channel spend ÷ first-time customers acquired** — where "first-time" comes from your *commerce* customer record, never from the platform's conversion count.

To run it manually you must:

1. Export spend by channel from Meta, Google, and TikTok for matched date windows.
2. Export orders from your store **tagged new vs. returning** (Shopify's `customer.orders_count`, or the equivalent), then attribute those new customers back to a channel via GA4 source/medium or last-touch UTMs.
3. Divide spend by *new* customers — not platform conversions — to get true CAC.
4. Build the target: first-order contribution margin, LTV, and payback months. CAC means nothing without it.

**The reasoning here is free. The data plumbing — three ad APIs, GA4, and a commerce new-vs-returning join — is the wall.** That join is precisely what ShopMCP removes; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Marketing
- **Also useful for:** Founder/CEO (where does growth budget actually buy customers?), Performance Marketer (channel-level reallocation), Finance (sanity-checking CAC against payback).
- Run it **before** the weekly budget meeting and before any "scale Meta / cut TikTok" decision.

## When To Run It

- **Cadence:** weekly — early in the week, once the prior week's orders and refunds have settled.
- **Triggers:** blended CAC or MER drifting up, a channel asking for a budget increase, a new channel passing its first month, or a board/investor question about acquisition efficiency.
- **Pre-requisite:** confirm your store actually flags new vs. returning correctly, and that GA4 source/medium isn't dominated by `(direct)` / `(not set)`. If new-vs-returning is broken, this play can't run — fix that first.

## Required Evidence

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — orders for the window, each tagged **new vs. returning customer**, with order value and the source/UTM that drove the order. This is the spine of the play.
- **GA4** — sessions and purchases by **source/medium / default channel grouping**, plus the new-vs-returning user dimension, to attribute new customers to channels where the store's own tagging is thin.
- **Meta Ads** — spend by campaign/objective, plus platform-reported purchases and CPA (so you can show the gap against commerce truth).
- **Google Ads** — spend split by **Brand Search vs. non-brand Search vs. Shopping vs. PMax** (brand and non-brand behave completely differently here), with platform conversions.
- **TikTok Ads** — spend and platform CPA. Treat as **directional** at low volume.
- **Targets** — first-order **contribution margin** per new customer, **LTV** (or a defensible repeat-rate proxy), and an allowable **payback window** in months. From these, derive the per-channel CAC target.

## Optional Evidence

- **New-customer LTV by acquiring channel** — brand search and Meta prospecting often buy very different long-term customers; if you have cohort LTV by first-touch channel, the target should vary by channel.
- **Promo calendar** — a discount window pulls in cheap one-time buyers and flatters CAC while poisoning LTV.
- **Attribution model / lookback window in use** — last-click vs. data-driven; a 7-day vs. 28-day window swaps the winner.
- **Repeat-purchase / payback curve** — lets you judge a CAC above first-order margin against months-to-payback instead of rejecting it outright.
- **Creative/launch dates** — to tell a genuinely expensive channel apart from one still in learning.

## The Decision Logic (run in this order)

1. **Confirm the new-vs-returning split is real.** If the store can't reliably flag first-time customers, or GA4 source/medium is mostly `(direct)`/`(not set)`, you can't compute new-customer CAC → mark the affected channels **FIX** and stop there. Everything downstream depends on this.
2. **Compute commerce-truth new-customer CAC per channel** = channel spend ÷ *new* customers attributed to that channel. Put it **side by side** with the platform's own CPA. The gap between them is the headline of this play.
3. **Build the target before judging.** Per-channel CAC target derives from first-order contribution margin, LTV, and payback. Rule of thumb: **CAC < first-order contribution = instant payback** (scale-worthy). Otherwise judge against **LTV/CAC ≥ ~3** and **payback ≤ your allowable window** (commonly 3–6 months for DTC).
4. **Separate harvesting from acquiring.** A channel can show a tiny CAC because it mostly bills you for customers you already had — classic for **brand search** and **retargeting/email**. If a channel's "new" customers are actually <~20% first-time, it's a harvest line, not an acquisition engine → judge it as efficiency, never as growth.
5. **Gate on sample size.** A channel with fewer than ~25–30 new customers in the window is statistically noisy → **WATCH**, never KILL or scale on it.
6. **Apply the vetoes**, then assign status + owner + recheck date, ranked by **new customers acquired × (target CAC − actual CAC)** — i.e. where reallocation moves the most profitable acquisition.

## Manual Workflow

1. Pick the window (28–30 days smooths weekly noise for CAC; use the prior equal period for trend).
2. Export spend by channel from Meta, Google (split brand/non-brand/Shopping/PMax), and TikTok.
3. Export commerce orders tagged new vs. returning; attribute new customers to channels via GA4 source/medium or last-touch UTM.
4. For each channel, compute **new-customer CAC** and place it next to **platform CPA**; note the new-customer share.
5. Build the CAC target from first-order contribution, LTV, and payback months.
6. Paste the prompt below with your channel table and targets.
7. Pressure-test each call against the veto list, then convert survivors into an action packet with owner and recheck date.

## Copy-Paste Prompt

```text
You are my growth-marketing analyst running the "New-Customer CAC by Channel" play.

GOAL: decide which channels to KILL, REFRESH, WATCH, KEEP, or FIX for NEW-CUSTOMER
acquisition — ranked by where reallocation buys the most profitable new customers.

CORE DISTINCTION YOU MUST HOLD:
- New-customer CAC = channel spend / FIRST-TIME customers (from my commerce new-vs-returning
  data). This is the number that matters.
- Platform CPA = what Meta/Google/TikTok report; it counts returning buyers and inflates
  apparent efficiency. Always show both, side by side, and explain the gap.

I will paste: spend by channel; commerce orders tagged new vs returning with source/UTM;
GA4 source/medium; platform CPA; and my targets (first-order contribution margin, LTV,
allowable payback months). Some data may be missing.

RULES:
- If new-vs-returning tagging or GA4 source/medium is unreliable, mark the affected
  channels FIX and exclude them from KILL/scale calls. Do not guess CAC.
- Judge each channel's new-customer CAC against a target derived from MY margin/LTV/payback,
  not against platform CPA. CAC < first-order contribution = instant payback. Otherwise
  test LTV/CAC >= ~3 and payback <= my allowable window.
- Flag channels where new-customer share is low (<~20%) as HARVEST, not acquisition
  (brand search, retargeting, email typically). Do not credit them as growth.
- WATCH any channel with <~25-30 new customers in the window; the sample is too small.
- Do not claim causality from last-click alone; name the attribution window and its bias.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked table: Channel | Spend | New customers | New-cust CAC | Platform CPA |
   New-cust share | Target CAC | LTV/CAC or payback | Status | Owner | Recheck.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision Rules

- **KILL** — new-customer CAC ≥ ~1.5× target with ≥25–30 new customers over ≥28 days, LTV/CAC well under 3, payback beyond your window, and no learning-phase or tracking veto.
- **REFRESH** — CAC drifting above target but the channel still genuinely acquires (healthy new-customer share, viable audience/offer); fix creative, targeting, or landing before cutting.
- **WATCH** — directional only: under ~25–30 new customers, in learning phase, or the window is polluted by a promo or stockout.
- **KEEP** — new-customer CAC inside the target band, LTV/CAC ≥ ~3 (or CAC < first-order contribution), and a real first-time-customer share.
- **FIX** — new-vs-returning tagging broken, GA4 source/medium unreliable, or no margin/LTV target available — CAC can't be computed or can't be judged.
- Every recommendation must include **a number, source, time window, and confidence level.**

## Veto Rules

- Do **not** judge a channel on platform CPA — platform conversions count returning buyers as new and overstate acquisition efficiency. Use commerce new-customer truth.
- Do **not** state a CAC verdict without an LTV-and-payback target; raw CAC with no context is meaningless.
- Do **not** trust last-click alone — last-click and short lookback windows over-credit retargeting, brand search, and email, and under-credit top-of-funnel prospecting.
- Do **not** KILL or scale a channel on fewer than ~25–30 new customers; the sample is noise.
- Do **not** read a promo-window CAC as normal — discounts buy cheap one-time buyers and depress LTV.
- Do **not** shift budget, pause a channel, or change creative without an explicit human approval step.

## Output Contract

A table ranked by where reallocation buys the most profitable new customers:

| Channel | Spend (30d) | New customers | New-cust CAC | Platform CPA | New-cust share | Target CAC | LTV/CAC or payback | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Meta – Prospecting | $X | N | $XX | $XX | XX% | $XX | X.X / X mo | WATCH | Marketing | 14 days |

## Worked Example

> **Executive read:** Meta looks like the efficiency winner at $28 platform CPA, but its true new-customer CAC is **$61** — most of its "conversions" were returning buyers — and at a $55 target it's underwater for *acquisition*. The real new-customer engine is Google non-brand at **$44 CAC** (inside target, healthy first-time share) and that's where the next budget dollar should go. Brand search at $9 CAC is almost entirely returning customers: it's a harvest line, not growth — do not credit it for acquisition or scale it expecting new buyers.

| Channel | Spend (30d) | New customers | New-cust CAC | Platform CPA | New-cust share | Target CAC | LTV/CAC | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Google – Non-brand Search | $14,300 | 325 | **$44** | $39 | 78% | $55 | 3.6 | **KEEP / scale** | Marketing | 14 days |
| Meta – Prospecting | $22,000 | 361 | **$61** | $28 | 71% | $55 | 2.4 | **REFRESH** | Marketing + Creative | 7 days |
| Google – Brand Search | $2,100 | 18 | $117 | $9 | 9% | $55 | n/a (harvest) | **KEEP (harvest)** | Marketing | 30 days |
| TikTok – TopFunnel | $3,800 | 21 | $181 | $52 | 88% | $55 | 0.9 | **WATCH** | Marketing | 14 days |
| Meta – Retargeting | $4,600 | 12 | $383 | $19 | 11% | $55 | n/a (harvest) | **WATCH (harvest)** | Marketing | 14 days |

Note how the platform view *inverts* under commerce truth: Meta Prospecting looks 2× more efficient than Google by platform CPA ($28 vs $39), but on real new-customer CAC Google wins ($44 vs $61). Brand and retargeting post the lowest CPAs of all yet acquire almost no new customers — they bill you for demand you already owned.

## Common Failure Modes

- Treating platform CPA as new-customer CAC and over-funding the channel that double-counts returning buyers the hardest.
- Declaring a CAC "good" or "bad" with no margin, LTV, or payback target to judge it against.
- Crediting brand search, retargeting, or email as acquisition when their new-customer share proves they're harvesting existing demand.
- Letting last-click attribution silently hand all the credit to bottom-funnel channels.
- Acting on a channel with a dozen new customers, or inside a promo window that bought cheap one-time buyers.

## Run This Play With Live Data

**Manual version:** export spend from three ad platforms, pull commerce orders tagged new vs. returning, join them to GA4 source/medium, divide by *new* customers, then build a margin-and-payback target — every week, before the numbers are stale.

**ShopMCP version:** connect your store, GA4, and Meta/Google/TikTok once. Ask the question; ShopMCP pulls live spend, joins it to the commerce new-vs-returning customer record, computes true new-customer CAC beside platform CPA, flags harvest channels, and ranks the KILL/REFRESH/WATCH/KEEP call against your margin-and-payback target. It stays **read-only** until you explicitly approve a budget move.

> No store + GA4 + three-ad-account connection inside your AI assistant? That's the wall every manual run hits — the new-vs-returning join is impossible without platform access. ShopMCP *is* that access, and the same playbook runs in one prompt instead of a spreadsheet afternoon.

Example ShopMCP prompt:

```text
Run the New-Customer CAC by Channel play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/marketing-cac-by-channel?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual exports from three ad platforms, GA4, and your store every week.
- The fragile new-vs-returning-to-channel join that makes true CAC possible.
- Mistaking platform CPA for real acquisition cost.
- Rebuilding the same margin-and-payback target sheet every cycle.
