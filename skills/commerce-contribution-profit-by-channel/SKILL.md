---
name: commerce-contribution-profit-by-channel
description: "When an ecommerce operator needs to decide: Which channels are creating contribution profit, not just revenue? Runs the Contribution Profit by Channel play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Contribution Profit by Channel', 'Commerce', 'Google Analytics 4', 'Meta Ads', 'Google Ads', 'Tiktok Ads', 'Trading Profit'."
license: CC-BY-4.0
metadata:
  persona: Founder / CEO
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Contribution Profit by Channel

**Operating question:** Which channels are creating contribution profit, not just revenue?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce (Shopify / Woo / BigCommerce / etc.)** — orders and **net revenue by channel** (source/medium or UTM), **new vs. returning** split, AOV, discount totals, and refunds/returns for the window. This is your single source of order truth.
- **Per-unit costs** — **COGS** per product (or a blended COGS %), **pick/pack + shipping/fulfilment** cost per order, and **payment-processor fees** (typically ~2.4–2.9% + flat per transaction). Without these you cannot compute contribution — only revenue.
- **GA4** — sessions, conversions, and revenue by **default channel grouping** and source/medium, plus the **new vs. returning** dimension, to cross-check commerce attribution and expose last-click skew.
- **Meta Ads** — spend, purchases, purchase value, and ROAS at account/campaign level. Treat reported purchases as **inflated** (view-through + 7-day click).
- **Google Ads** — spend and conversion value split by **Brand vs. Non-brand/PMax/Shopping** — never blend them, because Brand harvests existing demand and Non-brand creates it.
- **TikTok Ads** — spend and reported ROAS. **Directional only**; its attribution over-credits itself most at low volume.
- **Targets** — your **contribution-margin floor** (the % below which a channel isn't worth running) and **target new-customer CAC / payback** in months.

Optional, if available:

- **Promo / discount calendar** — a promo window inflates revenue *and* compresses margin at the same time; both numbers in that window are distorted.
- **Blended MER and overall contribution margin %** — the denominator that tells you whether the *mix* is healthy even when individual last-click numbers aren't.
- **Subscription / repeat-purchase rate and LTV by acquisition channel** — turns a thin first-order contribution into a defensible payback story (or kills the illusion of one).
- **Stock cover on hero SKUs** — so a "scale this channel" verdict doesn't collide with a stockout.
- **Shipping-subsidy / free-shipping-threshold policy** — changes the fulfilment cost line materially by channel and AOV.

## How to decide — in order

1. **Anchor on order truth.** Start from commerce net revenue and the **one** real order count. Sum the three ad platforms' reported purchases — they will exceed your real orders. That gap is your over-attribution budget; do not spend contribution you can't see.
2. **Build contribution per channel.** For each channel: **Contribution $ = revenue − COGS − shipping/fulfilment − payment fees − discounts/returns − that channel's ad spend.** Then **contribution margin % = Contribution $ ÷ revenue.** If any cost line is missing, label the row **partial profit** and downgrade confidence — never present it as contribution.
3. **Contrast the three lenses.** Put **last-click platform ROAS**, **blended MER**, and **true contribution margin %** side by side per channel. Where platform ROAS looks strong but contribution margin is thin or negative, the platform lens is the liar — trust contribution.
4. **Split new vs. returning.** Re-express each channel's contribution by customer type. A channel winning almost entirely on **returning** buyers (retargeting, email, brand search, direct) is likely **harvesting** demand that prospecting, organic, or TikTok created — not creating incremental profit. Discount its credit accordingly.
5. **Flag the revenue mirages.** Any channel that ranks high on revenue but goes **contribution-negative** after COGS + spend is a KILL/REFRESH candidate regardless of how good its ROAS looks.
6. **Score against the floor and payback.** Below your contribution-margin floor with no LTV/payback rescue → KILL or REFRESH. Above the floor and contribution-positive → KEEP. Apply vetoes, then assign status, owner, and recheck date.

## The prompt to run

```text
You are my ecommerce CFO-analyst running the "Contribution Profit by Channel" play.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If per-unit costs
(COGS/cost coverage) or commerce order truth (the one real order count by channel) is
missing, STOP and return only (a) what's missing and (b) how to get it — never estimate it
or proceed.

GOAL: tell me which channels create real CONTRIBUTION PROFIT, not just revenue and not
just platform ROAS, and give each channel a KILL / REFRESH / WATCH / KEEP / FIX verdict
ranked by contribution dollars created.

I will paste: commerce revenue + orders by channel with new/returning split, COGS,
shipping/fulfilment cost, payment fees, discounts, returns, per-channel ad spend (Meta,
Google split Brand vs Non-brand/PMax, TikTok), GA4 channel revenue, and my targets. Some
cost lines may be missing.

RULES:
- Build per channel: Contribution $ = revenue - COGS - shipping/fulfilment - payment fees
  - discounts/returns - that channel's ad spend. Contribution margin % = Contribution $ /
  revenue. If a cost line is missing, label the row "partial profit" and lower confidence;
  never present partial profit as contribution.
- Show three lenses side by side per channel: last-click platform ROAS, blended MER, and
  true contribution margin %. When they disagree, trust contribution and say why.
- Split each channel into new vs returning. Do NOT credit retargeting, brand search, email,
  or direct with demand that prospecting / organic / paid social likely created. Call out
  harvesters explicitly.
- A channel that is high on revenue but contribution-negative after COGS + spend is a
  KILL/REFRESH candidate no matter how good its ROAS looks.
- Score against my contribution-margin floor and new-customer payback. A promo window
  distorts both revenue and margin - flag and discount it.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read naming the real profit channels vs the revenue mirages.
2. A ranked table using exactly this header row:
   | Channel | Revenue | Ad spend | COGS | Contribution $ | Contribution margin % | New-customer % | Platform ROAS | Verdict |
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns, and
   do not replace the table with prose.
3. Which "winners" are harvesters, and which channel actually created that demand.
4. Vetoes/caveats (partial-profit labels, attribution caveats, promo distortion) and what
   evidence would upgrade any WATCH/FIX into a confident KEEP/KILL.
```

## Decision rules

- **KILL** — channel is **contribution-negative** (Contribution $ < 0) over a settled window with full cost coverage, and it isn't a strategic demand-creator other channels depend on. The revenue and the ROAS are both irrelevant once the contribution line is red.
- **REFRESH** — contribution margin is **positive but below your floor** (e.g. under ~15–20% where your blended target is higher), with a credible lever to fix it: cut wasted spend, lift AOV, renegotiate COGS/shipping, or trim discount depth. Decaying, not dead.
- **WATCH** — directional only: a new channel still inside its **payback window**, a sample too small to trust, or a window polluted by promo/stockout. Profit unproven, not disproven.
- **KEEP** — contribution-positive, **above your contribution-margin floor**, and either creating new customers or harvesting at a margin you're happy to bank. Fund it.
- **FIX** — a cost line (COGS, shipping, fees, returns) is missing or the platform/commerce order counts diverge so far that attribution is unsafe. Resolve the data before any budget call; until then it's *partial profit* only.
- Every recommendation must include a **number, source, time window, and confidence level** — and contribution $ must show its full subtraction, not a platform ROAS dressed up as profit.

## Vetoes — stop if any apply

- **No contribution claim without cost coverage.** If COGS, shipping, fees, or returns are incomplete for a channel, label it **partial profit** and cap confidence — never call partial profit "contribution."
- **Don't credit harvesters with created demand.** Retargeting, brand search, email, and direct sit at the bottom of the funnel; last-click hands them revenue that prospecting, organic, or paid social generated. Never KILL a top-of-funnel channel on last-click contribution alone, and never KEEP a harvester as if it were a growth engine.
- **A promo window distorts both sides.** Discounts inflate revenue and crush margin simultaneously — never set a channel verdict from a promo-polluted window; wait for a clean one.
- **Don't claim causality from one platform metric** — three lenses must agree, or you must explain which one you trusted and why.
- **Don't recommend scaling a channel into a stockout, feed disapproval, or missing price/availability** on its hero SKUs.
- **Don't pause, shift budget, or change spend** without an explicit human approval step.

## Output

A trading read that names the real profit channels and the revenue mirages, plus a table ranked by **contribution dollars created** (not revenue):

| Channel | Revenue | Ad spend | COGS | Contribution $ | Contribution margin % | New-customer % | Platform ROAS | Verdict |
|---|---|---|---|---|---|---|---|---|
| Example | $X | $Y | $Z | $C | C% | N% | R.x | WATCH |

Every row carries its source, window, and confidence; any row missing a cost line is flagged **partial profit**.

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
