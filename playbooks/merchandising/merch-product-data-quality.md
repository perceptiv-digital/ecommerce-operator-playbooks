---
schema_version: 1
slug: "merch-product-data-quality"
title: "Product Data Quality"
summary: "Product Data Quality helps ecommerce operators answer: Which product data gaps are hurting sales, feed quality, or search?"
operating_question: "Which product data gaps are hurting sales, feed quality, or search?"
short_title: "Product Data Quality"
primary_persona: "merchandising"
personas: ["merchandising"]
category: "merchandising-feed"
platforms: ["commerce", "google-merchant-center"]
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
shopmcp_run_url: "https://shop-mcp.app"
shopmcp_prompt: "Run the Product Data Quality play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Product Data Quality

## Operating Question

**Which product data gaps are actually costing me sales, Shopping reach, or organic visibility right now — ranked by revenue at stake, not by how many fields are blank?**

Every catalog has thousands of empty cells. Most of them do not matter. A blank `material` attribute on a discontinued SKU with zero sessions is noise; a missing GTIN on a hero product that should be ranking in Shopping is a leak. This play audits catalog completeness **where it touches money** — titles, descriptions, images, variant data, GTIN/brand/MPN feed identifiers, category-specific attributes, and review coverage — then correlates each gap with the symptom it causes (low Merchant Center impressions, weak organic visibility, below-average conversion) and ranks the fix list by **traffic × gap impact**, never by raw count of empty fields.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your product catalog, your Merchant Center feed diagnostics, or your store analytics. To run this manually you have to:

1. Export your full product/variant table from the store (every SKU, with title length, description, image count, variant options, and the metafields that map to feed attributes).
2. Pull the **Merchant Center feed diagnostics**: which items are disapproved, which carry warnings (missing GTIN, missing brand, image-too-small, price mismatch), and which are simply not impressing.
3. Join in **traffic and conversion per PDP** so you know which gaps sit on high-value pages versus dead SKUs.
4. Reconcile the same product across three identity systems — store product ID, feed `id`, and GA4/Search Console page path — because they rarely share a key.

**The thinking in this playbook is free. The data join across catalog, feed, and analytics is the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live line into your store, Merchant Center, and analytics, that wall is where manual runs stall. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Merchandising Manager (catalog and feed quality).
- **Also useful for:** Ecommerce Manager (where is reach leaking?), SEO lead (thin PDP content), Paid Search lead (why are products being suppressed in Shopping?).
- Run it **before** a new-collection push, a Shopping/PMax scale-up, or any "why isn't this product selling?" escalation — the answer is often a data gap, not a demand problem.

## When To Run It

- **Cadence:** weekly — early in the week, after the weekend's traffic and orders have settled so per-PDP conversion is stable.
- **Triggers:** a batch of new SKUs just went live, Merchant Center disapproval count jumped, Shopping impressions dropped without a bid change, a hero product is getting sessions but not converting, or a category page looks thin in search.
- **Pre-requisite:** confirm the feed actually synced in the last 24h. Auditing a stale feed snapshot will flag "fixed" items as still broken and waste a fix cycle.

## Required Evidence

- **Commerce catalog (Shopify/Woo/BigCommerce/etc.)** — full product and variant export with, per SKU: title (and character length), description (word count / presence), image count, variant option completeness (size/colour/etc.), and the metafields that feed GTIN, brand, MPN, condition, and Google product category.
- **Google Merchant Center** — per-item product status (active / disapproved / pending), the specific **warning and error codes** (missing GTIN, missing brand/MPN, `image_link` issues, price/availability mismatch), and impressions/clicks per item or item group.
- **Traffic & conversion per PDP** — sessions and conversion rate per product page, last 28 days, plus the site-wide average CVR as a baseline to flag "below-average converters."
- **Organic visibility** — Search Console impressions/clicks/position for product URLs, or at minimum which PDPs get organic traffic at all.

## Optional Evidence

- **Category attribute requirements** — which attributes Google actually requires for *this* product type (apparel needs size/colour/gender/age group; many hardgoods do not). Prevents chasing attributes that are genuinely optional.
- **Review counts & average rating per product** — zero-review hero SKUs convert below their potential and lose star eligibility in Shopping.
- **Margin or revenue per product** — lets you re-rank ties by contribution, not just traffic.
- **Recent catalog edits / bulk-import dates** — a gap created by yesterday's import may already be queued for re-sync; don't double-fix.
- **Stock status** — a perfect data fix on an out-of-stock SKU yields nothing until it's back in stock.

## How To Pull This Evidence

- **Shopify product export** — Admin → Products → Export → "All products" as CSV (or use the Bulk editor / Admin GraphQL `products` query). Pull, per SKU/variant: title, body/description (`body_html`), image count (`images`), variant options (size/colour/etc.), and the metafields mapped to GTIN (`barcode`), brand (`vendor` or a custom metafield), and Google product category. The CSV gives you completeness flags; the variant rows give you per-option coverage.
- **GMC item attribute warnings** — Merchant Center → Products → Diagnostics (or the Content API `productstatuses` / `products` resource). Export per-item status (active / disapproved / pending) with the specific warning and error codes — `missing GTIN`, `missing brand/MPN`, `image_link` issues, `price`/`availability` mismatch — plus impressions and clicks per item so each warning carries reach.
- **Per-SKU traffic/revenue** — GA4 (Reports → Monetization → Item, or the Data API: item-scoped `itemsViewed`, `itemRevenue`, `itemsPurchased`) for sessions/revenue per product, and Search Console (Performance → Pages, or the API) for organic impressions/clicks/position on PDP URLs. This is the join that lets you rank by money instead of empty-field count — and the keys (store product ID vs. feed `id` vs. GA4/GSC page path) rarely match, so reconcile on URL handle or SKU.
- **Keyword-stuffing gotcha** — when you pull short or "keyword-poor" titles to flag, do not fix them by repeating terms. Stuffed titles depress CVR and can trip a Merchant Center misrepresentation/policy flag, turning a discovery gap into a feed-blocking one. Add real, specific terms (brand, type, key attribute); never repetition.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Confirm the feed is fresh.** If the last successful Merchant Center sync is older than ~24h, set the whole run to **FIX** (sync first) and stop — every downstream gap reading is suspect.
2. **Triage by symptom, not by field.** Classify each gap into the cost it creates: (a) **feed-blocking** — disapproval or a warning that suppresses Shopping eligibility (missing GTIN/brand/MPN, price mismatch); (b) **discovery** — thin/keyword-poor title or description, missing organic-relevant attributes, hurting GMC and organic ranking; (c) **conversion** — single/low-quality image, missing variant data, zero reviews, hurting on-page CVR.
3. **Overlay traffic.** Pull sessions (or GMC impressions) onto every gap. A gap with traffic is a leak; a gap with ~zero traffic and zero impressions is noise → **WATCH** at most.
4. **Score impact = traffic × gap severity.** A feed-blocking gap on a high-impression SKU outranks ten cosmetic gaps on the long tail. Rank the fix list by this score, descending.
5. **Sanity-check the symptom matches the gap.** Before blaming data, confirm direction: low Shopping impressions *and* a feed warning on the same SKU = real. Low impressions with a clean feed = a bid/competition problem, not a data problem → don't queue a data fix.
6. **Apply the vetoes**, then assign status + owner + recheck date. Batch the **FIX** queue by gap type (all missing-GTIN together, all single-image together) so one operator pass clears many SKUs.

## Manual Workflow

1. Export the catalog/variant table and the Merchant Center diagnostics for the same day; confirm the feed synced within 24h.
2. Compute the gap flags per SKU: title length under threshold, description missing/thin, image count low, variant fields incomplete, GTIN/brand/MPN absent, required category attributes missing, review count zero.
3. Join sessions + per-PDP CVR + GMC impressions onto each SKU so every gap carries a traffic number.
4. Drop gaps on dead SKUs (no sessions, no impressions, not a planned hero) to the bottom — they are noise.
5. Paste the prompt below with your joined table.
6. Pressure-test the ranked list against the veto list (especially: is this attribute actually required for the category? would the title edit risk keyword-stuffing?), then convert survivors into a batched action packet with owner and recheck date.

## Copy-Paste Prompt

```text
You are my merchandising/catalog analyst running the "Product Data Quality" play.

GOAL: rank the product data gaps that are actually costing sales, Shopping reach, or
organic visibility — by revenue at stake (traffic x gap impact), NOT by count of empty
fields.

I will paste: a catalog/variant table with completeness flags (title length, description,
image count, variant data, GTIN/brand/MPN, category attributes, review count), Merchant
Center feed diagnostics (disapprovals + warning codes + per-item impressions), and per-PDP
sessions + conversion rate. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical input is
the catalog completeness fields joined to per-SKU traffic/revenue (sessions, GMC impressions,
and revenue or CVR per SKU) — without that join you cannot prioritise by money instead of
empty-field count. If that join is missing, STOP and return only (a) what's missing and
(b) how to get it — never estimate it or proceed.

RULES:
- Feed-freshness gate first: if the feed sync is older than ~24h, mark FIX (sync first)
  and stop. Stale diagnostics are unreliable.
- Triage every gap into feed-blocking (suppresses Shopping eligibility), discovery (hurts
  GMC/organic ranking), or conversion (hurts on-page CVR).
- Overlay traffic on every gap. A gap with zero sessions AND zero impressions is noise,
  not a fix.
- Score = traffic x gap severity. Rank descending. A feed-blocking gap on a high-impression
  SKU beats cosmetic gaps on the long tail.
- Confirm the symptom matches the gap. Low Shopping impressions with a CLEAN feed is a
  bid/competition problem, not a data problem - do not queue a data fix for it.
- Do not recommend keyword-stuffing titles; flag any title fix that risks it.
- Respect category-optional attributes: only flag an attribute as a gap if it's required
  or commercially relevant for that product type.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked table using exactly this header row:
   | SKU / Product | Gap type | The gap | Sessions (28d) | GMC impressions | CVR vs site avg | Impact score | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision Rules

- **FIX** — a feed-blocking gap (disapproval, missing GTIN/brand/MPN, price/availability mismatch) on a SKU with real impressions or sessions, **or** a stale/un-synced feed that makes the whole audit unreliable. The fix is a known, bounded catalog edit.
- **REFRESH** — discovery or conversion gap on a trafficked PDP that is underperforming but still commercially viable: a sub-50-character or keyword-poor title, a thin description, a single low-quality image, or a zero-review hero SKU. The product deserves better data, not removal.
- **WATCH** — the gap is real but the SKU has near-zero traffic and impressions, or the symptom is directional only (e.g. impressions dipped but the feed is clean, suggesting bids/competition). Re-check after a clean window before spending an operator hour.
- **KEEP** — data is complete enough for the category, the SKU converts at or above site-average, and the feed is clean. No action.
- Every recommendation carries a number, source, time window, and confidence level.

## Veto Rules

- Data completeness is **not** an end in itself — never rank or act by raw count of empty fields. Prioritise by traffic/revenue at stake.
- A gap on a dead SKU (no sessions, no impressions, not a planned hero) is **noise** — do not queue it as a fix.
- Some attributes are genuinely **optional by category** — do not flag a missing apparel attribute (size/gender/age group) on a hardgood, or invent requirements Google does not enforce for that product type.
- Do **not** keyword-stuff titles to "fix" a short one — it hurts CVR and can trip a feed misrepresentation/policy flag. Add real, specific terms (brand, type, key attribute), not repetition.
- Do **not** treat low Shopping impressions on a clean-feed SKU as a data problem — that is a bid/competition issue and a data fix won't move it.
- Do **not** spend a fix cycle on a stale feed snapshot — re-sync and re-read first.
- Do **not** make catalog writes, bulk title/attribute edits, or feed re-submissions without explicit human approval.

## Output Contract

A ranked SKU/product table, ordered by **impact score (traffic × gap severity)**, not by gap count:

| SKU / Product | Gap type | The gap | Sessions (28d) | GMC impressions | CVR vs site avg | Impact score | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| SKU-1042 / Trail Runner | feed-blocking | Missing GTIN | 1,860 | suppressed | n/a | High | **FIX** | Merch | 2 days |

## Worked Example

> **Executive read:** Of 4,300 active SKUs, the catalog shows ~610 with at least one data gap — but only a fraction sit on traffic. The money is in three buckets: 140 SKUs missing GTIN are throwing Merchant Center warnings and dragging down Shopping reach on otherwise live products; 60 high-traffic PDPs ship with a single image and convert below site average; 30 carry sub-50-character titles. Fix the revenue-bearing ones first — the remaining ~380 gaps sit on near-zero-traffic SKUs and are noise this week.

| SKU / Product | Gap type | The gap | Sessions (28d) | GMC impressions | CVR vs site avg | Impact score | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| 140 SKUs (GTIN cohort) | feed-blocking | Missing GTIN → GMC warnings, reduced Shopping serving | 22,400 (cohort) | partially suppressed | n/a | **Highest** | **FIX** | Merch + Feed | 2 days |
| 60 PDPs (image cohort) | conversion | Single image on high-traffic PDPs | 41,000 (cohort) | healthy | **−1.4 pts** | High | **REFRESH** | Merch + Creative | 7 days |
| 30 PDPs (title cohort) | discovery | Title under 50 chars, keyword-poor | 9,300 (cohort) | moderate | −0.3 pts | Medium | **REFRESH** | Merch + SEO | 7 days |
| Hero "Summit Jacket" | conversion | Zero reviews on a top-50 traffic SKU | 3,100 | healthy | −0.9 pts | Medium | **REFRESH** | Lifecycle (review request) | 14 days |
| "Alpine Tent v1" (EOL) | feed-blocking | Missing brand + MPN | 18 | ~0 | n/a | **Noise** | **WATCH** | — | Park |
| "Wool Beanie" | discovery | Impressions down 12%, feed clean | 470 | down 12% | flat | Low | **WATCH** | Paid Search | 14 days |

Note how the ranking *inverts* the raw count: the GTIN cohort isn't the biggest by empty-field count, but it suppresses live, trafficked products in Shopping, so it leads. The EOL tent has two missing identifiers yet ranks as noise — 18 sessions don't justify the fix. And the wool beanie's impression dip is **not** a data gap (clean feed), so no catalog edit is queued.

## Common Failure Modes

- Sorting the fix list by number of empty fields instead of by traffic/revenue at stake.
- "Fixing" a short title by stuffing keywords — tanking CVR and risking a feed policy flag.
- Flagging category-optional attributes as gaps and burning hours on fields Google never required.
- Auditing a stale feed snapshot and re-fixing items that already re-synced.
- Blaming the catalog for low Shopping impressions when the feed is clean and the real cause is bids or competition.
- Pouring effort into perfect data on dead or out-of-stock SKUs.

## Run This Play With Live Data

**Manual version:** export the catalog, pull Merchant Center diagnostics, join in per-PDP sessions and Search Console, reconcile three different product-identity keys, then score and rank — every single week.

**ShopMCP version:** connect your store, Merchant Center, and analytics once. Ask the question; ShopMCP pulls the live catalog, the current feed diagnostics, and per-PDP traffic/conversion, runs the freshness gate, triages each gap into feed-blocking / discovery / conversion, scores by traffic × severity, and returns the ranked FIX/REFRESH/WATCH/KEEP table. It stays **read-only** until you explicitly approve a catalog edit or feed re-submission.

> No store, Merchant Center, or analytics connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of a multi-export spreadsheet join.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Product Data Quality play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual catalog and feed-diagnostic exports.
- Reconciling store product IDs, feed `id`, and GA4/Search Console paths by hand.
- Copy-pasting across your store, Merchant Center, and analytics every week.
- Guessing which gaps sit on traffic and which are noise.
- Rebuilding the same traffic × gap-severity scoring every week.
