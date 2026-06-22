---
name: seo-schema-rich-result-readiness
description: "When an ecommerce operator needs to decide: Which structured-data gaps block ecommerce search trust? Runs the Schema and Rich Result Readiness play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Schema and Rich Result Readiness', 'Dataforseo', 'Commerce', 'Seo Demand Capture'."
license: CC-BY-4.0
metadata:
  persona: SEO / Content Lead
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Schema and Rich Result Readiness

**Operating question:** Which structured-data gaps block ecommerce search trust?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Rendered structured data per template** — the JSON-LD as Googlebot sees it (post-JavaScript) for one representative URL of each: PDP, collection/category, search/listing, homepage, blog/article, and any FAQ-bearing page. Capture the full `@type` set, not just `Product`.
- **`Product` / `Offer` field inventory per template** — presence and validity of `name`, `image`, `offers.price`, `offers.priceCurrency`, `offers.availability`, `sku`, and at least one of `gtin` / `mpn` / `brand`; plus `aggregateRating` and `review` where reviews are genuinely displayed.
- **Search Console enhancement reports** — valid / warning / error counts for **Product snippets**, **Merchant listings**, **Breadcrumb**, **Review snippets**, and **Sitelinks searchbox** if present, last 90 days.
- **Template-to-URL counts** — how many live, indexable URLs each template generates (so a single fix can be sized: "this is 1 template = 812 PDPs").
- **Traffic & value per template** — organic clicks/impressions (GSC or DataForSEO) and, where available, commerce revenue for the URLs behind each template, so fixes rank by recoverable value, not raw page count.

Optional, if available:

- **Competitor SERP feature presence** — do rival PDPs show review stars / price / merchant listings for your head terms? If the whole SERP shows stars and you don't, the gap is costing you measurable CTR, not just eligibility.
- **Rich Results Test / Schema.org validator output** per template — pinpoints the exact invalid property and value (e.g. `price: "$49.99"` rejected because the string carries a currency symbol).
- **Pending PDP/theme changes** — an imminent template rebuild may make a one-off patch wasted work.
- **Review-app coverage** — what share of products actually have reviews, so you don't mark up `aggregateRating` on products that legitimately have none.

## How to decide — in order

1. **Gate on rendering and honesty.** If the markup isn't in the rendered DOM Googlebot executes, or the on-page content doesn't match the markup, set the template to **FIX** and stop — eligibility is impossible and mismatched markup is a manual-action risk. Nothing downstream matters until this passes.
2. **Sort required from recommended.** Score each template against Google's **required** `Product`/`Offer` set first (`name`, `image`, `offers.price`, `priceCurrency`, `availability`). A missing *required* property = ineligible (FIX). A missing *recommended* property (`gtin`, `aggregateRating`, `review`) = eligible but weaker (REFRESH), never a hard block.
3. **Find the invalid-not-just-absent.** Separate "no markup" from "markup present but invalid." A malformed `price` (currency symbol or comma in the string), a non-schema `availability` value, or a `review` without `author` throws GSC errors and silently disqualifies the page — and is usually a one-line template fix.
4. **Size each gap by blast radius.** Multiply the gap by **pages on that template**. Fixing the PDP template once propagates to every product; fixing one hand-built landing page helps one URL. Always prefer the template lever.
5. **Overlay traffic and value.** Re-rank the template fixes by **organic impressions and revenue of the affected URLs**. A breadcrumb gap on a high-traffic category tree outranks a perfect FAQ schema on a page nobody visits. Eligibility you can't monetise is not a priority.
6. **Apply the vetoes**, then assign status + owner + recheck date. Remember rich results are *eligibility, not a guarantee* — frame every win as "now eligible," never "will rank."

## The prompt to run

```text
You are my technical-SEO analyst running the "Schema and Rich Result Readiness" play.

GOAL: find which structured-data gaps on my key TEMPLATES block rich-result eligibility
(merchant listings, review stars, price snippets), and rank the fixes by pages-affected x
the organic traffic and revenue of those pages -- template leverage, not page count.

I will paste, per template: the rendered JSON-LD (@type set), the Product/Offer field
inventory, Rich Results Test / Schema.org validator errors, my Search Console enhancement
counts (valid/warning/error), live URL count per template, and organic impressions/revenue
where available. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical input is
the actual RENDERED structured data on my key templates (Product/Breadcrumb/Offer/etc.) and
what is missing or invalid in it -- schema must reflect real on-page data, never marked-up
reviews, ratings, or prices I don't actually display. If that rendered markup is missing,
STOP and return only (a) what's missing and (b) how to get it (render the page as Googlebot
executes it and capture the post-JavaScript JSON-LD -- never view-source) -- never estimate
it or proceed.

RULES:
- Render gate first: if markup isn't in the rendered DOM, or the markup does not match
  what is actually displayed on the page, mark the template FIX and exclude it from
  eligibility ranking. Never endorse marking up reviews/ratings/prices not shown on-page.
- Separate REQUIRED from RECOMMENDED Product/Offer properties. A missing required property
  (name, image, offers.price, priceCurrency, availability) = ineligible (FIX). A missing
  recommended property (gtin/mpn, aggregateRating, review) = eligible-but-weaker (REFRESH).
- Distinguish "no markup" from "markup present but invalid" (e.g. price string with a
  currency symbol, non-schema availability value, review missing author). Invalid markup
  throwing GSC errors is usually a one-line template fix -- flag it as such.
- Size every gap by pages-on-template, then re-rank by organic impressions/revenue of the
  affected URLs. Prefer the template that, fixed once, recovers the most eligible value.
- Treat rich results as ELIGIBILITY, never guaranteed ranking or guaranteed snippet display.
- Every row must carry: a number, its source, the time window, and a confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked table using exactly this header row:
| Template | Pages affected | Missing/invalid property | Rich result blocked | GSC status | Organic value of affected URLs | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
table with prose.
3. Vetoes/caveats that downgraded any recommendation (especially honesty/render gates).
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **FIX** — a **required** `Product`/`Offer` property is missing or invalid (malformed `price`, bad `availability`, `review` without `author`), the markup isn't in the rendered DOM, or it claims data not displayed on-page. Eligibility is currently impossible; this is the highest-priority bucket.
- **REFRESH** — eligible today but weakened by missing **recommended** properties (`gtin`/`mpn`, `aggregateRating`, `review`) on a template whose pages have real traffic and genuinely displayed data to support them.
- **WATCH** — directional only: a gap on a low-traffic template, a GSC "warning" (not error) state, or a SERP feature you can't yet confirm competitors are winning.
- **KEEP** — template passes required + recommended checks, validates clean, GSC shows valid items, and the rich result is appearing.
- **KILL** — retire markup that is structurally unsupportable: schema for a `@type` you no longer display (e.g. `aggregateRating` on a product line whose reviews were removed), or duplicate/conflicting JSON-LD blocks fighting each other on one template.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- **Never** mark up reviews, ratings, or prices you do not genuinely display on the page. Manipulative/invisible structured data is a documented manual-action risk and a hard veto, even if it would "earn stars."
- Do **not** present rich-result eligibility as a ranking or traffic guarantee — markup makes you *eligible*; Google still decides display.
- Do **not** patch one-off pages when the gap lives in a template; fix the template or you'll re-introduce the gap on the next product.
- Do **not** treat a clean Rich Results Test on one URL as proof the whole template is valid at scale — reconcile against Search Console's aggregate counts.
- Do **not** add `aggregateRating` to products that legitimately have zero reviews to inflate coverage.
- Do **not** ship any schema/template change without an explicit human (developer) approval and a re-validation step after deploy.

## Output

A template-level fix list ranked by pages-affected × organic value, each row carrying its evidence, the rich result it unblocks, and a developer-ready action.

| Template | Pages affected | Missing/invalid property | Rich result blocked | GSC status | Organic value of affected URLs | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| PDP (default product) | 812 | `aggregateRating` + `availability` absent | Review stars + merchant listing | 812 "valid w/ warnings" | 61% of organic sessions | FIX | Dev + SEO | After deploy + 14d |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/seo-schema-rich-result-readiness) — it executes this play read-only by default and applies changes only on your approval.
