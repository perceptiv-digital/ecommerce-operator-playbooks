---
name: merch-gmc-feed-audit
description: "When an ecommerce operator needs to decide: Which feed issues are blocking product visibility or trust? Runs the GMC Feed Audit play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'GMC Feed Audit', 'Google Merchant Center', 'Commerce', 'Merchandising Feed'."
license: CC-BY-4.0
metadata:
  persona: Merchandising Manager
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# GMC Feed Audit

**Operating question:** Which feed issues are blocking product visibility or trust?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Merchant Center item status** — per-SKU status by reporting context (Shopping ads / free listings / PMax), the `itemLevelIssues` array (code, severity, attribute, resolution), and the ELIGIBLE / DISAPPROVED / PENDING split. Pull the *processed* product view, not just the raw feed file — Google's processing is where attributes get rejected.
- **Account-level issues** — policy/misrepresentation/account suspension warnings. These outrank item issues: an account-level misrepresentation strike can suppress the *entire* catalogue.
- **Live store price + availability per affected SKU** — the value a shopper sees right now, to compare against the feed value. This is the mismatch test and it is non-negotiable.
- **Revenue / units per SKU (trailing 30–60 days)** — from commerce orders, so each issue can be weighted by money at risk, not treated as equal.
- **Paid-surface membership** — which affected SKUs are actually in active Shopping / Performance Max (a disapproved bestseller in PMax is an emergency; a disapproved discontinued SKU is noise).

Optional, if available:

- **Feed-rules / optimisation app config** — to find where an attribute is being overwritten or a supplemental feed is fighting the primary.
- **Recent change log** — theme deploy, price update, feed-app rule edit, GTIN re-mapping, or bulk inventory sync, with timestamps. A disapproval that appeared the day after a deploy is a deploy bug, not a content gap.
- **Promotion calendar** — a sale price in the feed that doesn't match the live store (or a `sale_price` window that already expired) is a classic price-mismatch trigger.
- **Shopping/PMax impression and click trend per SKU** — to confirm a disapproval actually cost traffic versus a SKU that never had demand.
- **Required-attribute coverage for the vertical** — for apparel especially: `age_group`, `gender`, `color`, `size` are *required*, and missing them is a disapproval, not a warning.

## How to decide — in order

1. **Account before item.** Check account-level issues first. A misrepresentation / policy / suspension strike can suppress the whole catalogue, so no item-level fix matters until it clears → **FIX**, route to whoever owns policy/legal, stop ranking items until resolved.
2. **Errors before warnings.** Split issues by severity. **Errors suppress the item** (it is not serving on the affected surface). **Warnings still serve but are at risk**, and "pending"/"under review" is a *clock*, not a verdict. Errors on revenue SKUs are the queue; warnings on revenue SKUs are the WATCH list.
3. **Run the mismatch test — this is the #1 silent killer.** For every error, compare the **feed value vs the live store value** for price and availability. A `mismatched_price` or `mismatched_availability` disapproval is almost always a sync problem (stale feed, expired `sale_price`, a feed-rules app overwriting the store), not a "wrong product." Fixing the *source of truth* clears it; editing the feed by hand papers over it until the next sync.
4. **Weight by revenue and paid-surface membership.** Re-rank every error by trailing SKU revenue and whether it's live in Shopping/PMax. A disapproved SKU doing real revenue and sitting in an active campaign is an **emergency**; the same issue on a dead SKU is **WATCH** or **KILL the listing**, not a fire drill.
5. **Classify the fixable single-attribute issues.** Most item disapprovals are *one attribute*: missing/invalid `gtin`, generic or too-small `image`, missing `brand`/`mpn`, or (apparel) missing `age_group`/`gender`/`color`/`size`. These are **FIX**, fast, and high-leverage. Never treat them as permanent loss.
6. **Apply the vetoes**, then assign status + owner + a recheck date that respects the crawl cycle (see veto on re-judging too soon).

## The prompt to run

```text
You are my Merchant Center feed analyst running the "GMC Feed Audit" play.

GOAL: decide which feed issues to FIX, REFRESH, WATCH, KEEP, or KILL this week, ranked by
revenue at risk on the affected SKUs and whether those SKUs are live in Shopping/PMax —
not by raw issue count and not by severity alone.

I will paste: Merchant Center account-level issues; a per-SKU table with status
(ELIGIBLE/DISAPPROVED/PENDING), the item-level issue code + severity + offending attribute;
the live-store price and availability for affected SKUs; trailing 30-60d revenue/units per
SKU; and which SKUs are in active Shopping/PMax. Some fields may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If GMC item-level
status/issues joined to per-SKU trailing revenue is missing, STOP and return only (a) what's
missing and (b) how to get it — never estimate it or proceed. Without per-SKU revenue you
cannot rank by money at risk, and ranking by money (not issue count) is the entire point of
this play; an issue-only list with no revenue join is not a ranking.

RULES:
- Account-level first: if there's a misrepresentation/policy/suspension issue, flag it as the
  top FIX and note that item-level fixes are blocked until it clears.
- Errors suppress the item; warnings still serve but are at risk; pending is a clock, not a
  verdict. Treat them differently.
- For every price/availability disapproval, compare feed value vs live-store value and name
  the likely source-of-truth layer (store / raw feed / feed-rules app). Do NOT recommend a
  blind feed edit if the store is the source of truth — name the sync fix.
- Rank by revenue at risk x paid-surface membership. A disapproved revenue SKU in active
  Shopping/PMax is an emergency; the same issue on a dead SKU is WATCH or KILL the listing.
- Most item disapprovals are one attribute (gtin, image, brand, mpn, or apparel
  age_group/gender/color/size). Call those out as fast FIX, never permanent loss.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked table using EXACTLY this header row and column set:
   | SKU/Product | Issue (code) | Severity | Surfaces affected | 30d revenue at risk | Root cause | Fix | Owner | Recheck |
   |---|---|---|---|---|---|---|---|---|
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose. (Root cause = the source-of-truth layer.)
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH to a FIX decision.
```

## Decision rules

- **FIX** — an **error** (item suppressed) on a SKU with real trailing revenue and/or active Shopping/PMax membership, where the cause is identified: a single missing/invalid attribute (`gtin`, `image`, `brand`, `mpn`, apparel `age_group`/`gender`/`color`/`size`), or a confirmed feed-vs-store price/availability mismatch with a known source-of-truth layer to correct. Account-level policy/misrepresentation strikes are always FIX and always top of queue.
- **REFRESH** — the SKU serves but is throttled or at risk: a **warning** (e.g. generic image, weak/missing `gtin` lowering match quality, "limited performance"/under-review), or an attribute that's *valid but poor* (thin title, missing recommended attributes) suppressing Shopping eligibility/quality on a product still worth selling.
- **WATCH** — directional or early: a brand-new SKU still in PENDING/under-review (give it the crawl cycle), a warning on a low-revenue SKU, or an issue whose revenue impact can't yet be confirmed because the window is polluted by a launch, promo, or recent stockout.
- **KEEP** — ELIGIBLE on all intended surfaces with no error and no revenue-relevant warning. Don't touch it.
- **KILL** — KILL the *listing*, not budget: a disapproved SKU that's discontinued, dead, or duplicate. Remove it from the feed so it stops inflating the issue count and the "needs attention" noise. Never the default for a disapproval.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- Do **not** bulk-edit the feed without first confirming the source of truth (store vs raw feed vs feed-rules app). A hand-edited attribute gets overwritten on the next sync and the disapproval returns — fix the layer that wins.
- Do **not** re-judge a corrected item too soon. A fixed attribute takes **1–3 crawl/refresh cycles** to re-process and recover; set the recheck date accordingly and don't declare a fix failed before then.
- Do **not** assume a "DISAPPROVED" item is gone forever. Most disapprovals are one-attribute fixes that fully recover — never write a revenue SKU off as dead on the strength of a disapproval alone.
- Do **not** rank by issue count or severity alone. Severity without revenue weighting sends the team to fix warnings on dead SKUs while a disapproved bestseller bleeds.
- Do **not** treat a price/availability mismatch as a "wrong feed value" before checking the live store — the store may be the side that's stale (cache, theme bug, expired sale).
- Do **not** push feed writes, delete listings, or trigger a manual review without explicit human approval and a confirmed root cause.

## Output

A SKU / issue-cluster table ranked by **revenue at risk**, not issue count:

| SKU/Product | Issue (code) | Severity | Surfaces affected | 30d revenue at risk | Root cause | Fix | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Example SKU | mismatched_price | error | Shopping + free | $X | Feed shows sale price; store sale ended | Correct source-of-truth layer | Merch | 1–3 crawl cycles |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
