---
name: marketing-cac-by-channel
description: "When an ecommerce operator needs to decide: Which channels are acquiring new customers at acceptable cost? Runs the New-Customer CAC by Channel play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'New-Customer CAC by Channel', 'Commerce', 'Google Analytics 4', 'Meta Ads', 'Google Ads', 'Tiktok Ads', 'Acquisition Efficiency'."
license: CC-BY-4.0
metadata:
  persona: Head of Marketing
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# New-Customer CAC by Channel

**Operating question:** Which channels are acquiring new customers at acceptable cost?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — orders for the window, each tagged **new vs. returning customer**, with order value and the source/UTM that drove the order. This is the spine of the play.
- **GA4** — sessions and purchases by **source/medium / default channel grouping**, plus the new-vs-returning user dimension, to attribute new customers to channels where the store's own tagging is thin.
- **Meta Ads** — spend by campaign/objective, plus platform-reported purchases and CPA (so you can show the gap against commerce truth).
- **Google Ads** — spend split by **Brand Search vs. non-brand Search vs. Shopping vs. PMax** (brand and non-brand behave completely differently here), with platform conversions.
- **TikTok Ads** — spend and platform CPA. Treat as **directional** at low volume.
- **Targets** — first-order **contribution margin** per new customer, **LTV** (or a defensible repeat-rate proxy), and an allowable **payback window** in months. From these, derive the per-channel CAC target.

Optional, if available:

- **New-customer LTV by acquiring channel** — brand search and Meta prospecting often buy very different long-term customers; if you have cohort LTV by first-touch channel, the target should vary by channel.
- **Promo calendar** — a discount window pulls in cheap one-time buyers and flatters CAC while poisoning LTV.
- **Attribution model / lookback window in use** — last-click vs. data-driven; a 7-day vs. 28-day window swaps the winner.
- **Repeat-purchase / payback curve** — lets you judge a CAC above first-order margin against months-to-payback instead of rejecting it outright.
- **Creative/launch dates** — to tell a genuinely expensive channel apart from one still in learning.

## How to decide — in order

1. **Confirm the new-vs-returning split is real.** If the store can't reliably flag first-time customers, or GA4 source/medium is mostly `(direct)`/`(not set)`, you can't compute new-customer CAC → mark the affected channels **FIX** and stop there. Everything downstream depends on this.
2. **Compute commerce-truth new-customer CAC per channel** = channel spend ÷ *new* customers attributed to that channel. Put it **side by side** with the platform's own CPA. The gap between them is the headline of this play.
3. **Build the target before judging.** Per-channel CAC target derives from first-order contribution margin, LTV, and payback. Rule of thumb: **CAC < first-order contribution = instant payback** (scale-worthy). Otherwise judge against **LTV/CAC ≥ ~3** and **payback ≤ your allowable window** (commonly 3–6 months for DTC).
4. **Separate harvesting from acquiring.** A channel can show a tiny CAC because it mostly bills you for customers you already had — classic for **brand search** and **retargeting/email**. If a channel's "new" customers are actually <~20% first-time, it's a harvest line, not an acquisition engine → judge it as efficiency, never as growth.
5. **Gate on sample size.** A channel with fewer than ~25–30 new customers in the window is statistically noisy → **WATCH**, never KILL or scale on it.
6. **Apply the vetoes**, then assign status + owner + recheck date, ranked by **new customers acquired × (target CAC − actual CAC)** — i.e. where reallocation moves the most profitable acquisition.

## The prompt to run

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

PRE-FLIGHT: First list which required inputs I provided vs. missing. If NEW (first-time)
customers per channel from my commerce new-vs-returning record — alongside channel spend —
is missing (platform CPA is NOT a substitute), STOP and return only (a) what's missing and
(b) how to get it — never estimate it or proceed. Without commerce new-vs-returning,
new-customer CAC is wrong.

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
2. A ranked table using EXACTLY this header row:
   | Channel | Spend (30d) | New customers | New-cust CAC | Platform CPA | New-cust share | Target CAC | LTV/CAC or payback | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace
   the table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **KILL** — new-customer CAC ≥ ~1.5× target with ≥25–30 new customers over ≥28 days, LTV/CAC well under 3, payback beyond your window, and no learning-phase or tracking veto.
- **REFRESH** — CAC drifting above target but the channel still genuinely acquires (healthy new-customer share, viable audience/offer); fix creative, targeting, or landing before cutting.
- **WATCH** — directional only: under ~25–30 new customers, in learning phase, or the window is polluted by a promo or stockout.
- **KEEP** — new-customer CAC inside the target band, LTV/CAC ≥ ~3 (or CAC < first-order contribution), and a real first-time-customer share.
- **FIX** — new-vs-returning tagging broken, GA4 source/medium unreliable, or no margin/LTV target available — CAC can't be computed or can't be judged.
- Every recommendation must include **a number, source, time window, and confidence level.**

## Vetoes — stop if any apply

- Do **not** judge a channel on platform CPA — platform conversions count returning buyers as new and overstate acquisition efficiency. Use commerce new-customer truth.
- Do **not** state a CAC verdict without an LTV-and-payback target; raw CAC with no context is meaningless.
- Do **not** trust last-click alone — last-click and short lookback windows over-credit retargeting, brand search, and email, and under-credit top-of-funnel prospecting.
- Do **not** KILL or scale a channel on fewer than ~25–30 new customers; the sample is noise.
- Do **not** read a promo-window CAC as normal — discounts buy cheap one-time buyers and depress LTV.
- Do **not** shift budget, pause a channel, or change creative without an explicit human approval step.

## Output

A table ranked by where reallocation buys the most profitable new customers:

| Channel | Spend (30d) | New customers | New-cust CAC | Platform CPA | New-cust share | Target CAC | LTV/CAC or payback | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Meta – Prospecting | $X | N | $XX | $XX | XX% | $XX | X.X / X mo | WATCH | Marketing | 14 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
