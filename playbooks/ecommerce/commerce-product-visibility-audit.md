---
schema_version: 1
slug: "commerce-product-visibility-audit"
title: "Commerce Product Visibility Audit"
summary: "Commerce Product Visibility Audit helps ecommerce operators answer: Which products are invisible across commerce, search, and feed surfaces?"
operating_question: "Which products are invisible across commerce, search, and feed surfaces?"
short_title: "Commerce Product Visibility"
primary_persona: "ecommerce"
personas: ["ecommerce", "merchandising", "seo", "agency"]
category: "merchandising-feed"
platforms: ["commerce", "google-merchant-center", "google-search-console", "dataforseo"]
cadence: "ad-hoc"
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/commerce-product-visibility-audit"
shopmcp_prompt: "Run the Commerce Product Visibility Audit play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Commerce Product Visibility Audit

## Operating Question

**Which products are invisible across commerce, search, and feed surfaces — and which of those silences is actually costing me money?**

Most catalogs have a long tail of products that simply do not exist as far as a shopper can tell: disapproved in Merchant Center, never indexed by Google, ranking on page 4, or technically visible but converting at zero. The trap is that each surface — your store admin, GMC, Search Console, organic SERPs — tells you a partial, reassuring story in isolation. A product shows "active" in the catalog while its Shopping listing is dead and its PDP has never been crawled. This play **joins all four surfaces per product**, then layers 30-day revenue so you rank the fix list by recoverable money, not by SKU count. Every product lands in a named failure mode (disapproved, low-impression, unindexed, ranking-but-no-clicks, visible-but-not-selling) with a status and an owner.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your store catalog, your Merchant Center diagnostics, your Search Console property, or live SERP rankings. To run this manually you have to:

1. Export the full product list from your store (handle, title, price, availability, 30-day revenue) — already two reports, because revenue lives in analytics/orders, not the product CSV.
2. Pull the Merchant Center products feed with **per-item approval status and disapproval reasons** (the UI shows aggregate counts; the item-level detail needs the Content API or a CSV export).
3. Pull a Search Console **page-level** export (impressions, clicks, average position) for the last 28 days — GSC's default 16-month UI sampling and the 1,000-row cap will lie to you on a large catalog.
4. Run a SERP/keyword check per priority product through a rank source like DataForSEO, because GSC only tells you about queries you *already* rank for — it is blind to demand you are completely missing.
5. **JOIN all of that on the product URL / item ID** — four sources, three different keys (handle, item ID, page URL) — and only then overlay revenue.

**The thinking in this playbook is free. The data access and the four-way join are the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live line into your store, GMC, GSC, and a SERP source, that join is where manual runs stall. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Ecommerce
- **Also useful for:** Merchandising Manager (feed and PDP fixes), SEO / Content Lead (indexation and snippet work), Agency AM / COO (client visibility reporting and scope).
- Run it when a launch underperforms, after a replatform or theme change, when Shopping impressions drop without a spend change, or as a quarterly catalog hygiene pass.

## When To Run It

- **Cadence:** ad-hoc — quarterly as hygiene, or triggered.
- **Triggers:** Merchant Center disapproval spike, a sudden GSC impressions/clicks drop on product pages, a migration or URL-structure change, a new collection that isn't selling, or a CMO asking "why isn't [hero product] showing up anywhere?"
- **Pre-requisite:** confirm your **GMC ↔ store ↔ GSC are pointed at the same domain and item IDs**. A property mismatch (e.g. GSC verified on a non-canonical host, or GMC pulling a stale feed) will make every product look "invisible" for the wrong reason. Fix the plumbing before you audit the catalog.

## Required Evidence

- **Store catalog** — product handle/ID, title, price, availability/stock, status (active/draft/archived), and the canonical PDP URL for every product you intend to judge.
- **30-day commerce revenue per product** — units and revenue from real orders, last 30 days plus the prior 30 for trend. This is the money lens that re-ranks everything.
- **Google Merchant Center** — per-item **approval status** (approved / disapproved / pending / expiring), **disapproval reason**, and whether the item is eligible for **free listings and Shopping ads** (these can differ), plus price/availability as GMC sees them so you can catch feed-vs-store mismatches.
- **Google Search Console** — **page-level** impressions, clicks, CTR, and average position for each PDP over the last 28 days; flag pages with **zero impressions** (a strong not-indexed / no-demand signal) separately from low-CTR pages.
- **Organic page presence (DataForSEO or equivalent)** — does a ranking landing page exist for the product's head term, and at what position? This catches demand you are missing entirely, which GSC cannot show you.

## Optional Evidence (changes the answer when present)

- **Contribution margin per product** — so you never spend effort recovering visibility on a zero- or negative-margin item.
- **Inventory cover / restock date** — an out-of-stock product *should* be invisible; don't flag it as a defect.
- **Indexation status** (URL Inspection / coverage report) — separates "crawled, not indexed" from "never discovered."
- **Recent changes** — launch dates, title/feed edits, theme or URL-structure changes, robots/canonical edits that could have de-indexed pages.
- **Promotion calendar** — a paused promo can suppress Shopping eligibility or impressions temporarily.

## The Decision Logic (run in this order)

Diagnose in this exact order — each step rules out a *cause* before the next, so you never prescribe a snippet fix on a product that is actually feed-disapproved.

1. **Anchor on money first.** Sort the catalog by 30-day revenue and prior-30 revenue. Anything contributing real revenue (or that recently did) is in scope; zero-revenue *and* zero-historical-demand items drop to the bottom — don't burn hours making a dead SKU visible.
2. **Feed gate (policy, not demand).** Check GMC status. A **disapproval kills BOTH the paid Shopping ad AND the free listing** for that item — it is the single highest-leverage failure because it removes the product from two surfaces at once. Bucket **(a) disapproved/blocked**. Fix the feed before anything downstream; an unfixed disapproval makes every other diagnostic moot.
3. **Approved-but-quiet (feed quality).** Item is approved but has **near-zero GMC impressions** over 30 days. This is not policy — it's relevance: weak title, uncompetitive price, missing GTIN/attributes, or wrong category. Bucket **(b) low-impression**. Distinguish this carefully from (a): low impressions ≠ disapproved.
4. **Organic existence check.** Does a landing page exist and is it indexed? **Zero GSC impressions** or no ranking page at all → bucket **(c) unindexed / thin PDP** (not crawled, blocked by robots/canonical, or content too thin to rank).
5. **Ranking-but-silent.** Page ranks (has GSC impressions and a real average position) but **CTR is far below the position benchmark** — bucket **(d) ranking, no clicks**: title/meta/snippet or search-intent mismatch (e.g., ranking for an informational term on a transactional PDP).
6. **Visible-but-not-selling.** Product is genuinely visible on all surfaces (approved, impressions, clicks) yet **30-day revenue is near zero** — bucket **(e) visible, not selling**: price, PDP quality, reviews, or stock. This is a conversion problem, not a visibility problem.
7. **Re-rank by recoverable revenue, apply vetoes, assign status + owner + recheck.** A disapproved hero product outranks a hundred invisible long-tail SKUs.

## Manual Workflow

1. Export the store catalog and the 30-day (and prior-30) revenue per product; join them on product ID into one row-per-product sheet.
2. Export the GMC product feed with per-item status, disapproval reason, and free-listing vs Shopping-ads eligibility; join on item ID.
3. Export the GSC **page-level** report (28 days) and join PDP URL → product; mark zero-impression pages explicitly.
4. For your top-revenue and top-strategic products, run a SERP/keyword check to confirm whether a ranking page exists and at what position.
5. Walk each product through the decision logic and stamp it with bucket (a)–(e).
6. Paste the prompt below with your joined table.
7. Pressure-test every recommendation against the veto list, then convert survivors into an action packet with owner and recheck date.

## Copy-Paste Prompt

```text
You are my ecommerce merchandising + technical-SEO analyst running the
"Commerce Product Visibility Audit" play.

GOAL: find which products are invisible across commerce, search, and feed surfaces,
bucket each into a named failure mode, and rank the fix list by recoverable 30-day
revenue — not by SKU count.

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
2. A ranked table: SKU/Product | GMC status | GMC impr (30d) | GSC impr / avg pos |
   Organic page? | 30d revenue | Bucket | Action | Owner | Recheck.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision Rules

- **FIX** — a feed disapproval, a missing/mismatched price or availability, a property/plumbing mismatch, or absent evidence blocks a safe call. Bucket (a) disapprovals are almost always FIX — they are the cheapest, highest-leverage recovery because one fix restores two surfaces.
- **REFRESH** — the product is recoverable but the asset is weak: an approved-but-low-impression feed item (rewrite title, fix attributes, sharpen price), a ranking-but-no-clicks page (rewrite title tag/meta to match intent), or a thin PDP worth expanding. Buckets (b) and (d) typically land here.
- **WATCH** — the signal is early or directional: a freshly launched product still being crawled and indexed, a recently fixed disapproval awaiting re-review, or a low-volume page where one week of data can't separate "no demand" from "no visibility."
- **KEEP** — visible on all surfaces, indexed, and converting inside its expected band. No action; it's only in the audit to confirm it's healthy.
- **KILL** — deprioritize visibility effort entirely: an end-of-life, out-of-stock-permanently, or structurally zero-margin product where being invisible costs nothing.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- Do **not** chase visibility on **out-of-stock** products — an unavailable item *should* be suppressed; flagging it as a defect wastes the team's time.
- Do **not** chase visibility on **zero- or negative-margin** products — recovering impressions on something you lose money selling makes the problem bigger.
- **Fix the feed disapproval first.** A GMC disapproval kills both paid and free listings, so any SEO/snippet/PDP recommendation on a disapproved item is premature — the product can't appear regardless.
- Do **not** confuse **low impressions** (a demand / relevance problem) with **disapproved** (a policy problem). They have completely different fixes and different owners.
- Do **not** treat a single surface's "active/approved" flag as proof of visibility — confirm the product actually appears with impressions on that surface.
- Do **not** make profit or recovery claims without margin coverage, or label them clearly as partial.
- Do **not** push feed edits, catalog changes, redirects, or canonical/robots changes without an explicit human approval step.

## Output Contract

A product table ranked by **recoverable 30-day revenue**, one row per product, with a named bucket per row:

| SKU/Product | GMC status | GMC impr (30d) | GSC impr / avg pos | Organic page? | 30d revenue | Bucket | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Example product | Disapproved | 0 | 40 / 11.4 | Yes (p.2) | $8,200 | (a) feed disapproval | FIX feed, then re-snippet | Merch + SEO | 3 days |

## Worked Example

> **Executive read:** About $19.7k of trailing-30-day revenue is partly or fully suppressed across five products. The headline isn't the long tail — it's the *Merino Base Layer*, a real revenue product that's been **disapproved in GMC for 12 days** (image-policy), silently killing both its paid and free Shopping listings; that single feed fix is the highest-value action in the catalog. By contrast the "Trail Runner GTX" looks broken on impressions but is simply out of stock — a veto, not a project.

| SKU/Product | GMC status | GMC impr (30d) | GSC impr / avg pos | Organic page? | 30d revenue | Bucket | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Merino Base Layer | **Disapproved** (image policy) | 0 | 1,910 / 6.2 | Yes (p.1) | **$8,240** | (a) feed disapproval | **FIX** feed image, request review | Merch | 3 days |
| Packable Down Jacket | Approved | 210 | 95 / 9.8 | Yes (p.1, low) | $5,120 | (b) low-impression / weak title | **REFRESH** title + GTIN + price | Merch + SEO | 14 days |
| Alpine 35L Pack | Approved | 6,400 | 0 / — | No page indexed | $3,180 | (c) unindexed PDP | **FIX** canonical, submit URL | SEO | 7 days |
| Thermal Gloves v2 | Approved | 3,050 | 4,700 / 4.1 | Yes (p.1) | $2,990 | (d) ranks, no clicks (1.1% CTR) | **REFRESH** title tag + meta | SEO | 14 days |
| Trail Runner GTX | Approved | 0 | 880 / 7.5 | Yes (p.1) | $190 | out of stock 22 days | **WATCH** (veto: restock first) | Merch | On restock |

Note how the answer *inverts* the catalog view: the SKU that looks healthiest in the store admin (Merino Base Layer is "active," well-ranked organically, top revenue) is the most broken on the surface that matters for new demand — and the product with the scariest "0 impressions" (Trail Runner GTX) needs no work at all, just inventory.

## Common Failure Modes

- Reading the store admin's "active" status as proof the product is visible anywhere a shopper actually looks.
- Confusing a GMC **disapproval** with **low impressions** — and prescribing an SEO fix for a policy problem (or vice versa).
- Auditing by SKU count, so a hundred dead long-tail items outrank one disapproved hero product by attention.
- Trusting the GSC UI on a large catalog, where row caps and sampling hide the zero-impression tail you're hunting for.
- Flagging an out-of-stock or discontinued product as a visibility defect.
- Joining surfaces on the wrong key (handle vs item ID vs page URL) and matching the wrong product to its data.

## Run This Play With Live Data

**Manual version:** export the catalog, the revenue report, the GMC item-level feed, and the GSC page report; reconcile three different join keys; run a SERP check per priority product; then build the four-way join by hand — every time you want a current picture.

**ShopMCP version:** connect your store, Google Merchant Center, Google Search Console, and DataForSEO once. Ask the question; ShopMCP runs the bundled **product_visibility_audit_packet** play — it pulls the live catalog, per-item GMC status and disapproval reasons, page-level GSC metrics, and SERP presence, performs the JOIN on product/item/URL for you, overlays 30-day revenue, and returns the bucketed, revenue-ranked table. It stays **read-only** until you explicitly approve a feed or catalog change.

> No store, GMC, GSC, or SERP connection inside your AI assistant? That's the wall every manual run hits — the four-way join is the work. ShopMCP *is* the connection, so the same playbook runs in one prompt instead of one spreadsheet-afternoon.

Example ShopMCP prompt:

```text
Run the Commerce Product Visibility Audit play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/commerce-product-visibility-audit?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual exports from the store, GMC, GSC, and your SERP tool.
- Reconciling three different join keys (product handle, GMC item ID, page URL) by hand.
- Item-level GMC status and disapproval reasons that the aggregate UI hides.
- The GSC row-cap and sampling blind spots on a large catalog.
- Rebuilding the same four-surface join every time you need a fresh read.
