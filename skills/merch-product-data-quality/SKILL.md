---
name: merch-product-data-quality
description: "When an ecommerce operator needs to decide: Which product data gaps are hurting sales, feed quality, or search? Runs the Product Data Quality play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Product Data Quality', 'Commerce', 'Google Merchant Center', 'Merchandising Feed'."
license: CC-BY-4.0
metadata:
  persona: Merchandising Manager
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Product Data Quality

**Operating question:** Which product data gaps are hurting sales, feed quality, or search?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce catalog (Shopify/Woo/BigCommerce/etc.)** — full product and variant export with, per SKU: title (and character length), description (word count / presence), image count, variant option completeness (size/colour/etc.), and the metafields that feed GTIN, brand, MPN, condition, and Google product category.
- **Google Merchant Center** — per-item product status (active / disapproved / pending), the specific **warning and error codes** (missing GTIN, missing brand/MPN, `image_link` issues, price/availability mismatch), and impressions/clicks per item or item group.
- **Traffic & conversion per PDP** — sessions and conversion rate per product page, last 28 days, plus the site-wide average CVR as a baseline to flag "below-average converters."
- **Organic visibility** — Search Console impressions/clicks/position for product URLs, or at minimum which PDPs get organic traffic at all.

Optional, if available:

- **Category attribute requirements** — which attributes Google actually requires for *this* product type (apparel needs size/colour/gender/age group; many hardgoods do not). Prevents chasing attributes that are genuinely optional.
- **Review counts & average rating per product** — zero-review hero SKUs convert below their potential and lose star eligibility in Shopping.
- **Margin or revenue per product** — lets you re-rank ties by contribution, not just traffic.
- **Recent catalog edits / bulk-import dates** — a gap created by yesterday's import may already be queued for re-sync; don't double-fix.
- **Stock status** — a perfect data fix on an out-of-stock SKU yields nothing until it's back in stock.

## How to decide — in order

1. **Confirm the feed is fresh.** If the last successful Merchant Center sync is older than ~24h, set the whole run to **FIX** (sync first) and stop — every downstream gap reading is suspect.
2. **Triage by symptom, not by field.** Classify each gap into the cost it creates: (a) **feed-blocking** — disapproval or a warning that suppresses Shopping eligibility (missing GTIN/brand/MPN, price mismatch); (b) **discovery** — thin/keyword-poor title or description, missing organic-relevant attributes, hurting GMC and organic ranking; (c) **conversion** — single/low-quality image, missing variant data, zero reviews, hurting on-page CVR.
3. **Overlay traffic.** Pull sessions (or GMC impressions) onto every gap. A gap with traffic is a leak; a gap with ~zero traffic and zero impressions is noise → **WATCH** at most.
4. **Score impact = traffic × gap severity.** A feed-blocking gap on a high-impression SKU outranks ten cosmetic gaps on the long tail. Rank the fix list by this score, descending.
5. **Sanity-check the symptom matches the gap.** Before blaming data, confirm direction: low Shopping impressions *and* a feed warning on the same SKU = real. Low impressions with a clean feed = a bid/competition problem, not a data problem → don't queue a data fix.
6. **Apply the vetoes**, then assign status + owner + recheck date. Batch the **FIX** queue by gap type (all missing-GTIN together, all single-image together) so one operator pass clears many SKUs.

## The prompt to run

```text
You are my merchandising/catalog analyst running the "Product Data Quality" play.

GOAL: rank the product data gaps that are actually costing sales, Shopping reach, or
organic visibility — by revenue at stake (traffic x gap impact), NOT by count of empty
fields.

I will paste: a catalog/variant table with completeness flags (title length, description,
image count, variant data, GTIN/brand/MPN, category attributes, review count), Merchant
Center feed diagnostics (disapprovals + warning codes + per-item impressions), and per-PDP
sessions + conversion rate. Some data may be missing.

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
2. A ranked table: SKU/Product | Gap type | The gap | Sessions (28d) | GMC impressions |
   CVR vs site avg | Impact score | Status | Owner | Recheck.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **FIX** — a feed-blocking gap (disapproval, missing GTIN/brand/MPN, price/availability mismatch) on a SKU with real impressions or sessions, **or** a stale/un-synced feed that makes the whole audit unreliable. The fix is a known, bounded catalog edit.
- **REFRESH** — discovery or conversion gap on a trafficked PDP that is underperforming but still commercially viable: a sub-50-character or keyword-poor title, a thin description, a single low-quality image, or a zero-review hero SKU. The product deserves better data, not removal.
- **WATCH** — the gap is real but the SKU has near-zero traffic and impressions, or the symptom is directional only (e.g. impressions dipped but the feed is clean, suggesting bids/competition). Re-check after a clean window before spending an operator hour.
- **KEEP** — data is complete enough for the category, the SKU converts at or above site-average, and the feed is clean. No action.
- Every recommendation carries a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Data completeness is **not** an end in itself — never rank or act by raw count of empty fields. Prioritise by traffic/revenue at stake.
- A gap on a dead SKU (no sessions, no impressions, not a planned hero) is **noise** — do not queue it as a fix.
- Some attributes are genuinely **optional by category** — do not flag a missing apparel attribute (size/gender/age group) on a hardgood, or invent requirements Google does not enforce for that product type.
- Do **not** keyword-stuff titles to "fix" a short one — it hurts CVR and can trip a feed misrepresentation/policy flag. Add real, specific terms (brand, type, key attribute), not repetition.
- Do **not** treat low Shopping impressions on a clean-feed SKU as a data problem — that is a bid/competition issue and a data fix won't move it.
- Do **not** spend a fix cycle on a stale feed snapshot — re-sync and re-read first.
- Do **not** make catalog writes, bulk title/attribute edits, or feed re-submissions without explicit human approval.

## Output

A ranked SKU/product table, ordered by **impact score (traffic × gap severity)**, not by gap count:

| SKU / Product | Gap type | The gap | Sessions (28d) | GMC impressions | CVR vs site avg | Impact score | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| SKU-1042 / Trail Runner | feed-blocking | Missing GTIN | 1,860 | suppressed | n/a | High | **FIX** | Merch | 2 days |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/merch-product-data-quality) — it executes this play read-only by default and applies changes only on your approval.
