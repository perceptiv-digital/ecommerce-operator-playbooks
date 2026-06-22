---
name: commerce-product-visibility-audit
description: "When an ecommerce operator needs to decide: Which products are invisible across commerce, search, and feed surfaces? Runs the Commerce Product Visibility Audit play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Commerce Product Visibility', 'Commerce', 'Google Merchant Center', 'Google Search Console', 'Dataforseo', 'Merchandising Feed'."
license: CC-BY-4.0
metadata:
  persona: Head of Ecommerce
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Commerce Product Visibility Audit

**Operating question:** Which products are invisible across commerce, search, and feed surfaces?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Store catalog** — product handle/ID, title, price, availability/stock, status (active/draft/archived), and the canonical PDP URL for every product you intend to judge.
- **30-day commerce revenue per product** — units and revenue from real orders, last 30 days plus the prior 30 for trend. This is the money lens that re-ranks everything.
- **Google Merchant Center** — per-item **approval status** (approved / disapproved / pending / expiring), **disapproval reason**, and whether the item is eligible for **free listings and Shopping ads** (these can differ), plus price/availability as GMC sees them so you can catch feed-vs-store mismatches.
- **Google Search Console** — **page-level** impressions, clicks, CTR, and average position for each PDP over the last 28 days; flag pages with **zero impressions** (a strong not-indexed / no-demand signal) separately from low-CTR pages.
- **Organic page presence (DataForSEO or equivalent)** — does a ranking landing page exist for the product's head term, and at what position? This catches demand you are missing entirely, which GSC cannot show you.

Optional, if available:

- **Contribution margin per product** — so you never spend effort recovering visibility on a zero- or negative-margin item.
- **Inventory cover / restock date** — an out-of-stock product *should* be invisible; don't flag it as a defect.
- **Indexation status** (URL Inspection / coverage report) — separates "crawled, not indexed" from "never discovered."
- **Recent changes** — launch dates, title/feed edits, theme or URL-structure changes, robots/canonical edits that could have de-indexed pages.
- **Promotion calendar** — a paused promo can suppress Shopping eligibility or impressions temporarily.

## How to decide — in order

Diagnose in this exact order — each step rules out a *cause* before the next, so you never prescribe a snippet fix on a product that is actually feed-disapproved.

1. **Anchor on money first.** Sort the catalog by 30-day revenue and prior-30 revenue. Anything contributing real revenue (or that recently did) is in scope; zero-revenue *and* zero-historical-demand items drop to the bottom — don't burn hours making a dead SKU visible.
2. **Feed gate (policy, not demand).** Check GMC status. A **disapproval kills BOTH the paid Shopping ad AND the free listing** for that item — it is the single highest-leverage failure because it removes the product from two surfaces at once. Bucket **(a) disapproved/blocked**. Fix the feed before anything downstream; an unfixed disapproval makes every other diagnostic moot.
3. **Approved-but-quiet (feed quality).** Item is approved but has **near-zero GMC impressions** over 30 days. This is not policy — it's relevance: weak title, uncompetitive price, missing GTIN/attributes, or wrong category. Bucket **(b) low-impression**. Distinguish this carefully from (a): low impressions ≠ disapproved.
4. **Organic existence check.** Does a landing page exist and is it indexed? **Zero GSC impressions** or no ranking page at all → bucket **(c) unindexed / thin PDP** (not crawled, blocked by robots/canonical, or content too thin to rank).
5. **Ranking-but-silent.** Page ranks (has GSC impressions and a real average position) but **CTR is far below the position benchmark** — bucket **(d) ranking, no clicks**: title/meta/snippet or search-intent mismatch (e.g., ranking for an informational term on a transactional PDP).
6. **Visible-but-not-selling.** Product is genuinely visible on all surfaces (approved, impressions, clicks) yet **30-day revenue is near zero** — bucket **(e) visible, not selling**: price, PDP quality, reviews, or stock. This is a conversion problem, not a visibility problem.
7. **Re-rank by recoverable revenue, apply vetoes, assign status + owner + recheck.** A disapproved hero product outranks a hundred invisible long-tail SKUs.

## The prompt to run

```text
You are my ecommerce merchandising + technical-SEO analyst running the
"Commerce Product Visibility Audit" play.

GOAL: find which products are invisible across commerce, search, and feed surfaces,
bucket each into a named failure mode, and rank the fix list by recoverable 30-day
revenue — not by SKU count.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the per-product
join inputs — GMC status + GSC impressions/position + commerce revenue — are missing (in
particular GMC status, without which you cannot tell a disapproval from low demand), STOP
and return only (a) what's missing and (b) how to get it — never estimate it or proceed.

I will paste a joined product table with, per product: title, price, availability,
30-day and prior-30 revenue, GMC status + disapproval reason + free-listing/Shopping
eligibility, GSC page-level impressions/clicks/CTR/avg position (28d), and whether an
organic ranking page exists and at what position. Some fields may be missing.

DIAGNOSE IN THIS ORDER (stop at the first cause that applies):
- Money first: items with zero current AND prior revenue drop to the bottom.
- (a) DISAPPROVED in GMC -> feed/policy. A disapproval kills BOTH the paid Shopping
  listing AND the free listing. Fix feed before any downstream diagnosis.
- (b) Approved but near-zero GMC impressions -> feed quality: title, price
  competitiveness, GTIN/attributes, category. NOT the same as disapproved.
- (c) Zero GSC impressions or no ranking page -> not indexed / thin PDP.
- (d) Ranks (real impressions + position) but CTR far below the position benchmark
  -> title/snippet/intent mismatch.
- (e) Visible on all surfaces but ~zero revenue -> conversion problem (price/PDP/stock),
  NOT a visibility problem.

RULES:
- Do not confuse "low impressions" (demand/relevance) with "disapproved" (policy).
- Do not recommend chasing visibility on out-of-stock or zero/negative-margin products.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent data.

RETURN:
1. A 3-sentence executive read led by total recoverable revenue at risk.
2. A ranked table using EXACTLY this header row:
   | SKU/Product | GMC status | GMC impr (30d) | GSC impr / avg pos | Organic page? | 30d revenue | Bucket | Action | Owner | Recheck |
   |---|---|---|---|---|---|---|---|---|---|
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns,
   and do not replace the table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **FIX** — a feed disapproval, a missing/mismatched price or availability, a property/plumbing mismatch, or absent evidence blocks a safe call. Bucket (a) disapprovals are almost always FIX — they are the cheapest, highest-leverage recovery because one fix restores two surfaces.
- **REFRESH** — the product is recoverable but the asset is weak: an approved-but-low-impression feed item (rewrite title, fix attributes, sharpen price), a ranking-but-no-clicks page (rewrite title tag/meta to match intent), or a thin PDP worth expanding. Buckets (b) and (d) typically land here.
- **WATCH** — the signal is early or directional: a freshly launched product still being crawled and indexed, a recently fixed disapproval awaiting re-review, or a low-volume page where one week of data can't separate "no demand" from "no visibility."
- **KEEP** — visible on all surfaces, indexed, and converting inside its expected band. No action; it's only in the audit to confirm it's healthy.
- **KILL** — deprioritize visibility effort entirely: an end-of-life, out-of-stock-permanently, or structurally zero-margin product where being invisible costs nothing.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- Do **not** chase visibility on **out-of-stock** products — an unavailable item *should* be suppressed; flagging it as a defect wastes the team's time.
- Do **not** chase visibility on **zero- or negative-margin** products — recovering impressions on something you lose money selling makes the problem bigger.
- **Fix the feed disapproval first.** A GMC disapproval kills both paid and free listings, so any SEO/snippet/PDP recommendation on a disapproved item is premature — the product can't appear regardless.
- Do **not** confuse **low impressions** (a demand / relevance problem) with **disapproved** (a policy problem). They have completely different fixes and different owners.
- Do **not** treat a single surface's "active/approved" flag as proof of visibility — confirm the product actually appears with impressions on that surface.
- Do **not** make profit or recovery claims without margin coverage, or label them clearly as partial.
- Do **not** push feed edits, catalog changes, redirects, or canonical/robots changes without an explicit human approval step.

## Output

A product table ranked by **recoverable 30-day revenue**, one row per product, with a named bucket per row:

| SKU/Product | GMC status | GMC impr (30d) | GSC impr / avg pos | Organic page? | 30d revenue | Bucket | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Example product | Disapproved | 0 | 40 / 11.4 | Yes (p.2) | $8,200 | (a) feed disapproval | FIX feed, then re-snippet | Merch + SEO | 3 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
