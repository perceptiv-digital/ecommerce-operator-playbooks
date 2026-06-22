---
name: perf-shopping-feed-watch
description: "When an ecommerce operator needs to decide: Which shopping feed issues are hurting paid performance? Runs the Shopping Feed Watch play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Shopping Feed', 'Google Merchant Center', 'Commerce', 'Merchandising Feed'."
license: CC-BY-4.0
metadata:
  persona: Performance Marketer
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Shopping Feed Watch

**Operating question:** Which shopping feed issues are hurting paid performance?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Merchant Center — item status** for every product: approved / disapproved / "limited", the **specific issue code** (e.g. invalid GTIN, image too small / crawl failed, mismatched price, mismatched availability, landing-page mismatch, policy violation), and the destination (Shopping ads vs free listings).
- **Google Ads — product-level spend** for the trailing 7 and 30 days: cost, impressions, clicks, conversions, conversion value **by item ID**. This is the ranking key. Without it you cannot separate an emergency from noise.
- **Storefront — live price and availability** for each flagged item, pulled fresh from the store (not the feed), to adjudicate every price/availability mismatch.
- **Impression / impression-share trend** per top-spend product over the last 7 days, to catch heroes that quietly lost visibility overnight without a hard disapproval.

Optional, if available:

- **Competitor price benchmarks** (Merchant Center price competitiveness / best-sellers reports) — to tell a feed error apart from losing the auction on price.
- **Feed-rule / supplemental-feed change log and app-sync timestamps** — to pin "what broke" to a specific deploy.
- **Promo calendar** — a sale price live on the store but not yet in the feed is the single most common mismatch cause.
- **Contribution margin** per hero SKU — so revenue-at-risk can be expressed as profit-at-risk when you escalate.

## How to decide — in order

1. **Confirm the feed is fresh.** Check the last successful fetch/crawl timestamp. If the feed hasn't re-evaluated in >24h, the disapproval list is stale → treat the whole run as **FIX** (fix the sync) before judging individual SKUs.
2. **Rank by spend, not by issue count.** Sort every flagged item by trailing-7-day Google Ads spend, descending. The top of this list is your entire job; the long tail of zero-spend flags is noise and gets a single **WATCH**-or-ignore line.
3. **Triage the spent-on disapprovals.** For each flagged item with real spend: is it hard-**disapproved** (ads dark, $/day bleeding) or **"limited"** (ads throttled, partial visibility)? Disapproved + high spend = emergency. Quantify lost revenue/day = recent daily revenue from that item before the flag.
4. **Adjudicate the price/availability mismatches.** For every "mismatch" suppression, compare **feed value vs live store value**. Identify the source of truth — store, primary feed, or feed app — *before* anyone bulk-edits. A wrong bulk edit to the wrong layer doubles the outage.
5. **Separate feed errors from auction losses.** A top-spend product that lost impressions but has **no disapproval and no mismatch** is probably an auction/price problem (competitor undercut, bid/budget), not a feed defect. Route it out of this play and into bid/price review — do not "fix the feed" for an auction loss.
6. **Apply the vetoes**, then assign status + owner + recheck date keyed to the refresh cycle (not to your impatience).

## The prompt to run

```text
You are my paid-Shopping feed analyst running the "Shopping Feed Watch" play.

GOAL: tell me which Merchant Center feed issues are actively costing me Shopping/PMax
revenue right now, ranked by ad spend and revenue at risk — NOT by issue count. Most
flagged items will be zero-spend noise; surface the few that are bleeding money.

I will paste: a Merchant Center disapproved/"limited" list with issue codes, Google Ads
product-level spend/impressions/conversion value by item ID (7d and 30d), and live store
price/availability for flagged items. Some data may be missing.

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
2. A ranked table: Item (ID) | 7d spend | Issue + code | Ads state | Est. lost rev/day |
   Source of truth | Status | Owner | Recheck.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to confirm a FIX vs an auction loss.
```

## Decision rules

- **FIX** — a spent-on product is disapproved or "limited" by a feed/data defect (invalid GTIN, image crawl fail, price/availability mismatch, landing-page mismatch, policy strike), the fix is in *your* data, and recovery is worth the bleed. Also FIX the whole run if the feed itself failed to re-fetch in >24h.
- **KILL** — only when the product itself should not be advertised (genuinely discontinued / permanently out of stock); pull it from the feed rather than chasing the disapproval. Never KILL a temporarily-broken hero.
- **REFRESH** — a still-serving product is decaying (slipping impression share, rising CPCs) for a fixable data reason — thin title/attributes, stale image, missing GTIN that's *warning* not yet disapproving — where improving the feed entry is credible.
- **WATCH** — directional or early: a low-spend flag, a "limited" item with trivial spend, or a just-submitted fix still inside its crawl/refresh window. Never the resting state for a high-spend disapproval.
- **KEEP** — approved, serving, inside its target spend/return band, no risk signal.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- **A disapproved zero-spend SKU is noise, not an emergency.** Do not let issue count drive priority over spend-at-risk; a long disapproval list with no spend behind it is not a fire.
- **Don't re-judge a just-fixed item too soon.** Fixes take 1–3 crawl/refresh cycles to clear; a still-"disapproved" status one hour after the edit means *not yet re-crawled*, not *failed fix*.
- **Confirm the source of truth before any bulk edit.** Store vs primary feed vs feed app — editing the wrong layer (or the feed when the store is canonical) re-breaks it on the next sync.
- **Impression loss is not automatically a feed error.** It can be auction or competitor-price pressure; don't "fix the feed" for an item that has no disapproval and no mismatch.
- **Don't claim a revenue-at-risk number without product-level spend.** Account-blended spend cannot tell a hero from a zombie.
- **No bulk price/availability writes, feed-rule edits, or item removals without explicit human approval.**

## Output

A product table ranked by **ad spend / revenue at risk**, not by issue count:

| Item (ID) | 7d spend | Issue + code | Ads state | Est. lost rev/day | Source of truth | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Trail Runner GTX (SKU-4471) | $1,500 | Invalid GTIN | Disapproved (dark) | ~$640 | Store catalog | **FIX** | Perf + Catalog | Next crawl |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/perf-shopping-feed-watch) — it executes this play read-only by default and applies changes only on your approval.
