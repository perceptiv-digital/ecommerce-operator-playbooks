---
schema_version: 1
slug: "commerce-contribution-profit-by-channel"
title: "Contribution Profit by Channel"
summary: "Contribution Profit by Channel helps ecommerce operators answer: Which channels are creating contribution profit, not just revenue?"
operating_question: "Which channels are creating contribution profit, not just revenue?"
short_title: "Contribution Profit by Channel"
primary_persona: "founder"
personas: ["founder", "ecommerce", "marketing"]
category: "trading-profit"
platforms: ["commerce", "google-analytics-4", "meta-ads", "google-ads", "tiktok-ads"]
cadence: "weekly"
difficulty: "intermediate"
manual_time_minutes_min: 45
manual_time_minutes_max: 90
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: true
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://shop-mcp.app"
shopmcp_prompt: "Run the Contribution Profit by Channel play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Contribution Profit by Channel

## Operating Question

**Which channels are actually creating contribution profit — not just revenue, and not just a flattering platform ROAS — so I can fund the channels that grow the business and starve the ones that only look good?**

Revenue lies and platform ROAS lies louder. A channel can top the revenue chart and still be losing money once COGS, shipping, payment fees, returns, discounts, and its own ad spend come out. This play rebuilds the P&L one channel at a time down to **contribution dollars** and **contribution margin %**, then sets the founder's verdict — **KILL / REFRESH / WATCH / KEEP / FIX** — on each channel ranked by contribution created, not by the topline it reports.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into your store, your GA4, or your three ad accounts — and even if it did, the question is structurally adversarial, because every source is incentivised to overstate its own contribution. To answer it manually you have to:

1. Pull revenue **by channel** from commerce or GA4 — and decide whether you trust last-click source/medium at all.
2. Pull spend **per channel** from Meta, Google, and TikTok, each in its own attribution window and currency of self-credit.
3. Subtract the costs no ad platform can see: **COGS, pick/pack/shipping, payment-processor fees, discount codes, and refunds/returns** — line by line.
4. Split every channel into **new vs. returning** revenue, because a channel that only wins on returning buyers may be *harvesting* demand other channels paid to create.
5. Reconcile the three ad platforms' summed "purchases" against your one true order count, which will be smaller than the sum.

**The reasoning here is free. The data plumbing — five sources, three attribution models, and a margin build that no platform hands you — is the entire job.** That plumbing is exactly what ShopMCP connects. Where your assistant has no live feed, that is where manual runs stall; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Founder / CEO — this is a capital-allocation decision, not a reporting task.
- **Also useful for:** Head of Ecommerce (channel P&L ownership), Head of Marketing / Performance (defending or reallocating budget), Finance / FP&A (tying channel calls back to the real P&L).
- Run it **before** the monthly budget allocation, before raising or cutting a channel's spend, and before any board or investor update that quotes "ROAS" or "what's working."

## When To Run It

- **Cadence:** weekly for a read, with the full margin build done **monthly** (matched to your COGS / returns close so the cost data is real, not estimated).
- **Triggers:** blended MER moving against you while individual channels still report "good" ROAS; a channel asking for more budget; a margin or AOV slip; onboarding a new channel; planning next quarter's spend mix.
- **Pre-requisite:** confirm COGS coverage and a settled returns window first. Running this on incomplete cost data produces *partial profit*, not contribution profit — label it as such or you will defund a profitable channel by accident.

## Required Evidence

- **Commerce (Shopify / Woo / BigCommerce / etc.)** — orders and **net revenue by channel** (source/medium or UTM), **new vs. returning** split, AOV, discount totals, and refunds/returns for the window. This is your single source of order truth.
- **Per-unit costs** — **COGS** per product (or a blended COGS %), **pick/pack + shipping/fulfilment** cost per order, and **payment-processor fees** (typically ~2.4–2.9% + flat per transaction). Without these you cannot compute contribution — only revenue.
- **GA4** — sessions, conversions, and revenue by **default channel grouping** and source/medium, plus the **new vs. returning** dimension, to cross-check commerce attribution and expose last-click skew.
- **Meta Ads** — spend, purchases, purchase value, and ROAS at account/campaign level. Treat reported purchases as **inflated** (view-through + 7-day click).
- **Google Ads** — spend and conversion value split by **Brand vs. Non-brand/PMax/Shopping** — never blend them, because Brand harvests existing demand and Non-brand creates it.
- **TikTok Ads** — spend and reported ROAS. **Directional only**; its attribution over-credits itself most at low volume.
- **Targets** — your **contribution-margin floor** (the % below which a channel isn't worth running) and **target new-customer CAC / payback** in months.

## Optional Evidence

- **Promo / discount calendar** — a promo window inflates revenue *and* compresses margin at the same time; both numbers in that window are distorted.
- **Blended MER and overall contribution margin %** — the denominator that tells you whether the *mix* is healthy even when individual last-click numbers aren't.
- **Subscription / repeat-purchase rate and LTV by acquisition channel** — turns a thin first-order contribution into a defensible payback story (or kills the illusion of one).
- **Stock cover on hero SKUs** — so a "scale this channel" verdict doesn't collide with a stockout.
- **Shipping-subsidy / free-shipping-threshold policy** — changes the fulfilment cost line materially by channel and AOV.

## How To Pull This Evidence

- **Commerce revenue + orders by channel** — Shopify Admin → Analytics → Reports → "Sales by traffic source/referrer" (or Woo/BigCommerce equivalent) for net revenue, orders, discounts, and returns by the window. Gotcha: this is your one true order count — anchor on it, not the ad platforms' summed purchases.
- **COGS / cost coverage** — set **Cost per item** on each variant in Shopify (Products → variant → Cost per item), then read it via the "Profit" / "Cost of goods sold" report. Gotcha: **Shopify COGS isn't in standard order CSV exports** — if Cost per item is blank, COGS reads as $0 and every contribution number is fiction.
- **Shipping/fulfilment + payment fees** — pull pick/pack and shipping cost per order from your 3PL/fulfilment export, and payment-processor fees from Shopify Payments → Payouts (or your gateway's fee report, ~2.4–2.9% + flat). Gotcha: these never appear in any ad platform's dashboard — you must add them by hand.
- **GA4 channel revenue + new/returning** — GA4 → Reports → Acquisition → Traffic acquisition, dimensioned by **Default channel grouping** and source/medium, with the New/Returning dimension. Gotcha: GA4's last-click channel grouping won't reconcile to commerce — use it to expose last-click skew, not as order truth.
- **Meta / Google / TikTok ad spend** — export spend, purchases, purchase value, and ROAS per channel: Meta Ads Manager (Export), Google Ads (split **Brand vs Non-brand/PMax/Shopping**), TikTok Ads Manager. Gotcha: each uses its own attribution window and over-credits itself — treat reported purchases as inflated, spend as the only hard number.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Anchor on order truth.** Start from commerce net revenue and the **one** real order count. Sum the three ad platforms' reported purchases — they will exceed your real orders. That gap is your over-attribution budget; do not spend contribution you can't see.
2. **Build contribution per channel.** For each channel: **Contribution $ = revenue − COGS − shipping/fulfilment − payment fees − discounts/returns − that channel's ad spend.** Then **contribution margin % = Contribution $ ÷ revenue.** If any cost line is missing, label the row **partial profit** and downgrade confidence — never present it as contribution.
3. **Contrast the three lenses.** Put **last-click platform ROAS**, **blended MER**, and **true contribution margin %** side by side per channel. Where platform ROAS looks strong but contribution margin is thin or negative, the platform lens is the liar — trust contribution.
4. **Split new vs. returning.** Re-express each channel's contribution by customer type. A channel winning almost entirely on **returning** buyers (retargeting, email, brand search, direct) is likely **harvesting** demand that prospecting, organic, or TikTok created — not creating incremental profit. Discount its credit accordingly.
5. **Flag the revenue mirages.** Any channel that ranks high on revenue but goes **contribution-negative** after COGS + spend is a KILL/REFRESH candidate regardless of how good its ROAS looks.
6. **Score against the floor and payback.** Below your contribution-margin floor with no LTV/payback rescue → KILL or REFRESH. Above the floor and contribution-positive → KEEP. Apply vetoes, then assign status, owner, and recheck date.

## Manual Workflow

1. Set the window (full settled month recommended) and pull commerce net revenue, orders, new/returning, discounts, and returns by channel.
2. Pull spend per channel from Meta, Google (split Brand vs. Non-brand), and TikTok; pull GA4 channel revenue and new/returning as a cross-check.
3. Assemble the cost lines: COGS per order, shipping/fulfilment per order, payment fees, discounts, returns. Flag any channel where a cost line is missing as **partial profit**.
4. Compute **Contribution $** and **contribution margin %** per channel, and lay platform ROAS / blended MER / contribution margin % side by side.
5. Add the **new-customer %** column and identify which "winners" are pure harvesters.
6. Paste the prompt below with your tables; pressure-test every KILL against the veto list, then write the action packet with owner and recheck date.

## Copy-Paste Prompt

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

## Decision Rules

- **KILL** — channel is **contribution-negative** (Contribution $ < 0) over a settled window with full cost coverage, and it isn't a strategic demand-creator other channels depend on. The revenue and the ROAS are both irrelevant once the contribution line is red.
- **REFRESH** — contribution margin is **positive but below your floor** (e.g. under ~15–20% where your blended target is higher), with a credible lever to fix it: cut wasted spend, lift AOV, renegotiate COGS/shipping, or trim discount depth. Decaying, not dead.
- **WATCH** — directional only: a new channel still inside its **payback window**, a sample too small to trust, or a window polluted by promo/stockout. Profit unproven, not disproven.
- **KEEP** — contribution-positive, **above your contribution-margin floor**, and either creating new customers or harvesting at a margin you're happy to bank. Fund it.
- **FIX** — a cost line (COGS, shipping, fees, returns) is missing or the platform/commerce order counts diverge so far that attribution is unsafe. Resolve the data before any budget call; until then it's *partial profit* only.
- Every recommendation must include a **number, source, time window, and confidence level** — and contribution $ must show its full subtraction, not a platform ROAS dressed up as profit.

## Veto Rules

- **No contribution claim without cost coverage.** If COGS, shipping, fees, or returns are incomplete for a channel, label it **partial profit** and cap confidence — never call partial profit "contribution."
- **Don't credit harvesters with created demand.** Retargeting, brand search, email, and direct sit at the bottom of the funnel; last-click hands them revenue that prospecting, organic, or paid social generated. Never KILL a top-of-funnel channel on last-click contribution alone, and never KEEP a harvester as if it were a growth engine.
- **A promo window distorts both sides.** Discounts inflate revenue and crush margin simultaneously — never set a channel verdict from a promo-polluted window; wait for a clean one.
- **Don't claim causality from one platform metric** — three lenses must agree, or you must explain which one you trusted and why.
- **Don't recommend scaling a channel into a stockout, feed disapproval, or missing price/availability** on its hero SKUs.
- **Don't pause, shift budget, or change spend** without an explicit human approval step.

## Output Contract

A trading read that names the real profit channels and the revenue mirages, plus a table ranked by **contribution dollars created** (not revenue):

| Channel | Revenue | Ad spend | COGS | Contribution $ | Contribution margin % | New-customer % | Platform ROAS | Verdict |
|---|---|---|---|---|---|---|---|---|
| Example | $X | $Y | $Z | $C | C% | N% | R.x | WATCH |

Every row carries its source, window, and confidence; any row missing a cost line is flagged **partial profit**.

## Worked Example

> **Executive read:** Last month's revenue leaderboard says Meta Retargeting and Google Brand are the stars — but on contribution they're harvesting demand that Meta Prospecting and Organic created. The real growth engine is Prospecting + Non-brand/PMax, which look mediocre on ROAS yet carry the new-customer load at a defensible margin; **Email is the only clean KEEP** (near-zero cost), while **TikTok is contribution-negative** and a KILL/REFRESH once COGS and spend are subtracted. Re-fund Prospecting and Non-brand from the TikTok cut; do not "reward" Retargeting and Brand for revenue they didn't create.

| Channel | Revenue | Ad spend | COGS | Contribution $ | Contribution margin % | New-customer % | Platform ROAS | Verdict |
|---|---|---|---|---|---|---|---|---|
| Meta Prospecting | $58,400 | $19,300 | $20,440 | $9,180 | 16% | 81% | 3.0 | **KEEP** (growth engine) |
| Meta Retargeting | $41,200 | $5,100 | $14,420 | $17,360 | 42% | 12% | 8.1 | **WATCH** (harvester) |
| Google Brand | $33,600 | $2,800 | $11,760 | $16,240 | 48% | 9% | 12.0 | **WATCH** (harvester) |
| Google Non-brand / PMax | $46,900 | $17,800 | $16,415 | $9,135 | 19% | 74% | 2.6 | **KEEP** (creates demand) |
| TikTok | $21,700 | $14,200 | $7,595 | −$2,535 | −12% | 68% | 1.5 | **KILL / REFRESH** |
| Email / Klaviyo | $29,500 | $410 | $10,325 | $17,165 | 58% | 6% | 71.9 | **KEEP** (low-cost) |
| Organic / Direct | $52,100 | $0 | $18,235 | $30,415 | 58% | 44% | n/a | **KEEP** (under-credited) |

*Costs above are simplified to COGS + ad spend for readability; a full run also subtracts shipping/fulfilment, payment fees, discounts, and returns, which trims every contribution-margin % by roughly 8–14 points and can flip a thin channel like Meta Prospecting closer to its floor.* Note how the contribution view **inverts** the ROAS chart: TikTok's "fine" 1.5 ROAS is a loss, Retargeting's 8.1 ROAS is mostly harvested margin, and the highest *new-customer* contributors (Prospecting, Non-brand, Organic) are the ones the platform dashboards undersell.

## Common Failure Modes

- Reading the revenue or ROAS leaderboard as a profit ranking, and funding the channel that's actually contribution-negative.
- Crediting retargeting / brand / email / direct for demand that prospecting, organic, or paid social created — then cutting the channel that fed them.
- Calling a number "contribution" when COGS, shipping, fees, or returns are missing (it's partial profit).
- Setting a verdict from a promo-window month, where revenue is inflated and margin is crushed at the same time.
- Summing three platforms' reported purchases and treating it as your real order count.
- Judging a new channel before its payback window closes and killing a future winner.

## Run This Play With Live Data

**Manual version:** pull revenue by channel from commerce and GA4, spend from three ad platforms, then hand-build COGS, shipping, fees, discounts, and returns into a contribution model — and redo the whole margin build every month as costs settle.

**ShopMCP version:** connect your store, GA4, Meta, Google, and TikTok once. Ask the question; ShopMCP pulls live revenue, real order counts, and per-channel spend, layers in COGS and fee data to compute **Contribution $ and contribution margin %** per channel, splits new vs. returning, contrasts platform ROAS against blended MER against true contribution, flags the harvesters and the revenue mirages, and returns the ranked KILL/REFRESH/WATCH/KEEP table. It stays **read-only** until you explicitly approve any budget change.

> No store, GA4, or ad-platform connection inside your AI assistant? That's the wall every manual run hits — and it hits hardest here, where the answer needs five sources reconciled against each other. ShopMCP *is* that connection, and the same play then runs in one prompt instead of a month-end spreadsheet build.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Contribution Profit by Channel play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual exports and stale CSVs across commerce, GA4, and three ad platforms.
- Hand-building the COGS / shipping / fees / returns margin model every month.
- Reconciling three platforms' inflated purchase counts against one real order count.
- Guessing which channel actually created the demand a harvester is taking credit for.
