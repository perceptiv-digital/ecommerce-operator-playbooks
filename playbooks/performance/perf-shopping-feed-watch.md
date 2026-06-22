---
schema_version: 1
slug: "perf-shopping-feed-watch"
title: "Shopping Feed Watch"
summary: "Shopping Feed Watch helps ecommerce operators answer: Which shopping feed issues are hurting paid performance?"
operating_question: "Which shopping feed issues are hurting paid performance?"
short_title: "Shopping Feed"
primary_persona: "performance"
personas: ["performance", "merchandising"]
category: "merchandising-feed"
platforms: ["google-merchant-center", "commerce"]
cadence: "daily"
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
shopmcp_run_url: "https://shop-mcp.app"
shopmcp_prompt: "Run the Shopping Feed Watch play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Shopping Feed Watch

## Operating Question

**Which shopping feed issues are actively costing me paid Shopping/PMax revenue right now — ranked by ad spend and revenue at risk, not by issue count?**

This is the daily paid-side feed triage, not a merchandising trust audit. The question is narrow on purpose: of everything Merchant Center is flagging this morning, *which flags are turning off ads on products I actually spend money on?* A disapproval on a $1,500/week Shopping hero is a five-alarm fire — the ads are dark and the revenue clock is running. A disapproval on a dead SKU you haven't bid on in months is noise. This play ranks strictly by **spend and revenue at risk**, so the first row is always the most expensive bleed, and most of the Merchant Center issue list gets correctly ignored.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Merchant Center diagnostics, your Google Ads spend by product, or your live storefront prices. To answer this manually you have to stitch together three systems that don't talk to each other:

1. **Merchant Center** — the Products / Needs attention view for disapproved and "limited" items, plus the specific issue code (invalid GTIN, image crawl failure, price mismatch, policy strike).
2. **Google Ads** — last 7–30 day spend, impressions, and revenue **at the item-ID / product level** (Shopping reports → Products, or the Performance Max product report), so you can tell a $1.5k/week hero from a $0/week zombie.
3. **Your storefront** — the *live* price and availability for each flagged item, because half of all "limited" suppressions are a feed value disagreeing with the store after a price change or a sellout.

The diagnosis is the easy part. The brutal part is the join: matching a Merchant Center item ID to its Google Ads spend to its real store price, every morning, before the disapproval has cost you a full day of revenue. **The thinking here is free; the cross-system join is the work — and that is exactly what ShopMCP wires together.** The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Performance Marketer (the person whose Shopping/PMax budget is bleeding).
- **Also useful for:** Merchandising / Catalog Manager (owns the source-of-truth product data the fix lands in), Head of Ecommerce (revenue-at-risk visibility).
- Run it **before** the daily standup or budget check, so a disapproved hero is escalated within hours, not discovered at the weekly review when three days of revenue are already gone.

## When To Run It

- **Cadence:** daily — first thing, ideally right after the overnight Merchant Center refresh (feeds typically re-fetch and re-evaluate every 24h, so morning is when last night's breakage surfaces).
- **Triggers:** a price change or promo push went live yesterday; a feed-app or app-sync update shipped; Shopping/PMax impressions or spend dropped overnight with no bid change; a Merchant Center account-level warning email landed.
- **Pre-requisite:** confirm the feed actually re-fetched in the last 24h. Judging "disapprovals" against a feed that failed to crawl two nights ago tells you about stale data, not today's reality.

## Required Evidence

- **Merchant Center — item status** for every product: approved / disapproved / "limited", the **specific issue code** (e.g. invalid GTIN, image too small / crawl failed, mismatched price, mismatched availability, landing-page mismatch, policy violation), and the destination (Shopping ads vs free listings).
- **Google Ads — product-level spend** for the trailing 7 and 30 days: cost, impressions, clicks, conversions, conversion value **by item ID**. This is the ranking key. Without it you cannot separate an emergency from noise.
- **Storefront — live price and availability** for each flagged item, pulled fresh from the store (not the feed), to adjudicate every price/availability mismatch.
- **Impression / impression-share trend** per top-spend product over the last 7 days, to catch heroes that quietly lost visibility overnight without a hard disapproval.

## Optional Evidence

- **Competitor price benchmarks** (Merchant Center price competitiveness / best-sellers reports) — to tell a feed error apart from losing the auction on price.
- **Feed-rule / supplemental-feed change log and app-sync timestamps** — to pin "what broke" to a specific deploy.
- **Promo calendar** — a sale price live on the store but not yet in the feed is the single most common mismatch cause.
- **Contribution margin** per hero SKU — so revenue-at-risk can be expressed as profit-at-risk when you escalate.

## How To Pull This Evidence

- **GMC item status (Products / Diagnostics).** In Merchant Center, open **Products → All products** (or **Products → Diagnostics → Item issues**) and filter to *Disapproved* and *Limited*. Add the **Item ID**, **issue title + code**, and **destination** columns, then export the list — that export is the spine you join everything else onto.
- **Price / availability — feed vs store check.** For each flagged "mismatch", read the **feed value** from the GMC item detail (the price/availability GMC ingested) and open the **live product page** to read the real store value. Compare them by hand; the disagreement, not the GMC flag, tells you which layer is wrong and which is canonical.
- **Google Ads Shopping spend by product.** In Google Ads, go to **Campaigns → Insights & reports → Reports**, build a **Shopping product** report (or use the Performance Max product report), pull **cost, impressions, conversions, conv. value by Item ID** for the trailing 7 and 30 days, and export. Join it to the GMC export on Item ID — this is the spend ranking key.
- **Crawl-cycle recovery gotcha.** A fix doesn't clear instantly: GMC re-fetches and re-evaluates on its crawl cycle (typically ~24h, up to 1–3 cycles). An item still showing *Disapproved* minutes after the edit means *not yet re-crawled*, not *fix failed* — check the **last fetch timestamp**, don't re-edit, and set the recheck date to the next cycle.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Confirm the feed is fresh.** Check the last successful fetch/crawl timestamp. If the feed hasn't re-evaluated in >24h, the disapproval list is stale → treat the whole run as **FIX** (fix the sync) before judging individual SKUs.
2. **Rank by spend, not by issue count.** Sort every flagged item by trailing-7-day Google Ads spend, descending. The top of this list is your entire job; the long tail of zero-spend flags is noise and gets a single **WATCH**-or-ignore line.
3. **Triage the spent-on disapprovals.** For each flagged item with real spend: is it hard-**disapproved** (ads dark, $/day bleeding) or **"limited"** (ads throttled, partial visibility)? Disapproved + high spend = emergency. Quantify lost revenue/day = recent daily revenue from that item before the flag.
4. **Adjudicate the price/availability mismatches.** For every "mismatch" suppression, compare **feed value vs live store value**. Identify the source of truth — store, primary feed, or feed app — *before* anyone bulk-edits. A wrong bulk edit to the wrong layer doubles the outage.
5. **Separate feed errors from auction losses.** A top-spend product that lost impressions but has **no disapproval and no mismatch** is probably an auction/price problem (competitor undercut, bid/budget), not a feed defect. Route it out of this play and into bid/price review — do not "fix the feed" for an auction loss.
6. **Apply the vetoes**, then assign status + owner + recheck date keyed to the refresh cycle (not to your impatience).

## Manual Workflow

1. Open Merchant Center → Products → Needs attention. Note the last successful fetch timestamp first.
2. Export the disapproved + "limited" item list with issue codes.
3. In Google Ads, pull the product-level report (cost, impressions, conv. value by item ID) for the last 7 and 30 days.
4. Join the two on item ID and **sort by 7-day spend, descending**. Drop everything with zero trailing spend to the bottom.
5. For the top spent-on flags, open each product on the live store and compare price/availability against the feed value to adjudicate mismatches.
6. Estimate lost revenue/day for each disapproved hero from its pre-flag daily revenue.
7. Paste the prompt below with your joined table, then pressure-test against the vetoes and assign owner + recheck date.

## Copy-Paste Prompt

```text
You are my paid-Shopping feed analyst running the "Shopping Feed Watch" play.

GOAL: tell me which Merchant Center feed issues are actively costing me Shopping/PMax
revenue right now, ranked by ad spend and revenue at risk — NOT by issue count. Most
flagged items will be zero-spend noise; surface the few that are bleeding money.

I will paste: a Merchant Center disapproved/"limited" list with issue codes, Google Ads
product-level spend/impressions/conversion value by item ID (7d and 30d), and live store
price/availability for flagged items. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical input is
GMC item status for the actively-advertised SKUs joined to their ad spend / revenue at risk
(the spend-ranked join is what lets you prioritise by money, not issue count). If that
critical input is missing, STOP and return only (a) what's missing and (b) how to get it —
never estimate spend, revenue at risk, or which SKUs are actively advertised, and never
proceed on issue count alone.

RULES:
- Rank strictly by trailing-7-day ad spend and revenue at risk. A disapproved $1,500/week
  hero is an emergency; a disapproved zero-spend SKU is noise — say so and move on.
- First check feed freshness. If the feed has not re-fetched in >24h, the disapproval list
  is stale: mark the run FIX (fix the sync) before judging individual SKUs.
- For each spent-on disapproval, classify as hard-disapproved (ads dark) vs "limited" (ads
  throttled) and estimate lost revenue/day from its pre-flag daily revenue.
- For every price/availability mismatch, compare feed value vs LIVE STORE value and name the
  likely source of truth (store / primary feed / feed app) before any bulk edit.
- If a top-spend product lost impressions but has NO disapproval and NO mismatch, flag it as
  a likely auction/price loss, not a feed error — route it out of this play.
- Recovery takes 1-3 crawl/refresh cycles. Do not re-judge a just-fixed item as still broken.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read leading with total revenue/day at risk.
2. A ranked table using exactly this header row:
   | Item (ID) | 7d spend | Issue + code | Ads state | Est. lost rev/day | Source of truth | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to confirm a FIX vs an auction loss.
```

## Decision Rules

- **FIX** — a spent-on product is disapproved or "limited" by a feed/data defect (invalid GTIN, image crawl fail, price/availability mismatch, landing-page mismatch, policy strike), the fix is in *your* data, and recovery is worth the bleed. Also FIX the whole run if the feed itself failed to re-fetch in >24h.
- **KILL** — only when the product itself should not be advertised (genuinely discontinued / permanently out of stock); pull it from the feed rather than chasing the disapproval. Never KILL a temporarily-broken hero.
- **REFRESH** — a still-serving product is decaying (slipping impression share, rising CPCs) for a fixable data reason — thin title/attributes, stale image, missing GTIN that's *warning* not yet disapproving — where improving the feed entry is credible.
- **WATCH** — directional or early: a low-spend flag, a "limited" item with trivial spend, or a just-submitted fix still inside its crawl/refresh window. Never the resting state for a high-spend disapproval.
- **KEEP** — approved, serving, inside its target spend/return band, no risk signal.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- **A disapproved zero-spend SKU is noise, not an emergency.** Do not let issue count drive priority over spend-at-risk; a long disapproval list with no spend behind it is not a fire.
- **Don't re-judge a just-fixed item too soon.** Fixes take 1–3 crawl/refresh cycles to clear; a still-"disapproved" status one hour after the edit means *not yet re-crawled*, not *failed fix*.
- **Confirm the source of truth before any bulk edit.** Store vs primary feed vs feed app — editing the wrong layer (or the feed when the store is canonical) re-breaks it on the next sync.
- **Impression loss is not automatically a feed error.** It can be auction or competitor-price pressure; don't "fix the feed" for an item that has no disapproval and no mismatch.
- **Don't claim a revenue-at-risk number without product-level spend.** Account-blended spend cannot tell a hero from a zombie.
- **No bulk price/availability writes, feed-rule edits, or item removals without explicit human approval.**

## Output Contract

A product table ranked by **ad spend / revenue at risk**, not by issue count:

| Item (ID) | 7d spend | Issue + code | Ads state | Est. lost rev/day | Source of truth | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Trail Runner GTX (SKU-4471) | $1,500 | Invalid GTIN | Disapproved (dark) | ~$640 | Store catalog | **FIX** | Perf + Catalog | Next crawl |

## Worked Example

> **Executive read:** About $810/day of Shopping revenue is at risk this morning, concentrated in one item. The Trail Runner GTX hero ($1,500/week spend) went fully disapproved overnight on an invalid GTIN after a catalog edit — ads are dark and it's bleeding ~$640/day, so it's the only true emergency. A yesterday price-drop promo also left 12 SKUs "limited" on a feed-vs-store price mismatch (feed still shows the old price), and a separate bestseller lost impression share with no feed flag at all — that one is a competitor price cut, not our problem to fix in the feed.

| Item (ID) | 7d spend | Issue + code | Ads state | Est. lost rev/day | Source of truth | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Trail Runner GTX (SKU-4471) | $1,500 | Invalid GTIN (after catalog edit) | Disapproved — dark | ~$640 | Store catalog | **FIX** | Perf + Catalog | Next crawl (~24h) |
| Spring Sale cohort (12 SKUs) | $1,180 | Price mismatch: feed $89 vs store $69 | "Limited" — throttled | ~$150 | Store (promo is canonical) | **FIX** | Catalog | After re-fetch |
| Merino Base Layer (SKU-2210) | $720 | None — impr. share −34% / 7d | Serving | ~$0 (auction) | n/a | **WATCH** | Perf (bid/price) | 3 days |
| Last-season Parka (SKU-0093) | $0 | Disapproved — out of stock | Dark | $0 | Store | **KILL** (drop from feed) | Catalog | When restocked |
| Canvas Tote (SKU-3320) | $4 | Missing GTIN (warning) | Serving | ~$0 | Feed | **REFRESH** | Catalog | 14 days |

Note how the ranking inverts the Merchant Center view: the account shows 15 flagged items, but only the top two carry real money. The disapproved Parka (zero spend) and the missing-GTIN Tote ($4 spend) are at the bottom where they belong, and the bestseller's impression drop is explicitly routed *out* of the feed-fix lane because nothing in the feed is wrong.

## Common Failure Modes

- Working the Merchant Center list top-to-bottom by issue severity instead of by spend — fixing zero-revenue disapprovals while a $1.5k/week hero stays dark.
- Bulk-editing the feed to "correct" a mismatch when the **store** was the source of truth, re-breaking every item on the next sync.
- Re-flagging a just-fixed SKU as still broken because you checked before the next crawl cycle ran.
- Treating an impression-share drop with no disapproval as a feed defect when it's a competitor price cut or a budget/bid issue.
- Quoting a "revenue at risk" figure off account-blended spend, with no product-level number behind it.

## Run This Play With Live Data

**Manual version:** export the Merchant Center disapproval list, pull the Google Ads product-level spend report, open each flagged hero on the live store to adjudicate the price, join it all on item ID, and re-rank by spend — every morning before the disapproval costs you another day.

**ShopMCP version:** connect Merchant Center, Google Ads, and your store once. Ask the question; ShopMCP pulls live item-status diagnostics, item-level spend and revenue, and the real store price together, ranks the flags by spend-at-risk, adjudicates each mismatch against the canonical source, and returns the FIX / KILL / REFRESH / WATCH / KEEP table with lost revenue/day. It stays **read-only** until you explicitly approve a feed edit or item change.

> No Merchant Center, Google Ads, or store connection inside your AI assistant? That's the wall every manual run hits — you can diagnose a disapproval, but you can't see which item bleeds $640/day until you've joined three systems by hand. ShopMCP *is* that join, and the same playbook runs in one prompt instead of a morning of exports.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Shopping Feed Watch play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual Merchant Center and Google Ads exports re-pulled every morning.
- The item-ID join across feed diagnostics, ad spend, and live store price.
- Guessing whether a flag is an emergency or zero-spend noise.
- Editing the wrong data layer because the source of truth was never confirmed.
