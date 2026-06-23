---
name: seo-quick-wins
description: "When an ecommerce operator needs to decide: Which organic search wins are close enough to act on now? Runs the SEO Quick Wins play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'SEO Quick Wins', 'Google Search Console', 'Seo Demand Capture'."
license: CC-BY-4.0
metadata:
  persona: SEO / Content Lead
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# SEO Quick Wins

**Operating question:** Which organic search wins are close enough to act on now?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **GSC Queries report** — query, clicks, impressions, CTR, average position, for the last 28 days. This is the demand-and-proximity layer.
- **GSC Pages report** — page, clicks, impressions, CTR, average position, same window. This is the money-page layer.
- **GSC query→page mapping** — for each striking-distance query, the URL that actually ranks for it (GSC: filter Queries by a single page, or filter Pages by a single query). You cannot write a fix without knowing the page.
- **An impressions floor** — your own threshold for "enough demand to matter." A practical default: ≥ 250 impressions / 28 days for a query, ≥ 1,000 for a page. Below the floor, ignore the position.

Optional, if available:

- **Commercial intent tag per query** — transactional ("buy", "best", "[product] for sale", model numbers) vs. informational ("how to", "what is"). Intent decides whether a rank gain becomes revenue or just traffic.
- **Money-page map** — does the ranking URL sell something, or is it a blog post? An informational page at position 6 is a *KEEP*, not a *WIN*, unless you can route its demand to a product or category.
- **Current SERP layout for the query** — is there an AI Overview, a feature box, a shopping pack, or 4 ads above the fold? CTR is set by SERP real estate as much as by your title.
- **Existing title/meta + on-page H1** — so the rewrite targets the actual query a shopper uses, not the one you wish they used.
- **Internal-link inventory to the target page** — the cheapest lever to nudge a position-11 page onto page one is usually three contextual internal links from high-authority pages.
- **Keyword volume / difficulty** — to weight a borderline win by how big the prize is once you break through.

## How to decide — in order

1. **Gate on stability and demand.** Drop any query/page below your impressions floor — no demand, no win. Drop anything whose position is visibly mid-move (check the trend, not just the 28-day average); judge it next week. A position-9 query with 80 impressions is a decoy, not an opportunity.
2. **Find the proximity layer.** Isolate queries/pages at **average position ~5–15**. This is the band where one or two positions of movement produces the largest click delta — moving from 8 to 4 can roughly triple clicks; moving from 25 to 21 changes almost nothing. Rank within the band by impressions.
3. **Split the win type.** Each opportunity is one of three shapes, and each has a *different* fix:
   - **Rank-gap win** — strong impressions, position 6–15, CTR roughly normal for that position → the page is *visible but not high enough*. Fix = on-page depth + internal links + (sometimes) a link build. Status **WIN**.
   - **Snippet/CTR win** — position 3–8 but CTR well below the expected curve for that position → the page *ranks fine but the SERP listing is weak*. Fix = title + meta rewrite to match query intent, add structured data. Fastest possible win — no rank change required. Status **WIN** (or **REFRESH** if the page body also undersells).
   - **Feature-box win** — page already ranks 1–5, a PAA / featured-snippet / AI Overview sits above it, and the query is answerable in 40–60 words → restructure the page to win the box (concise answer block, schema, clean heading). Status **WIN**.
4. **Overlay commercial intent and the money page.** Re-rank by `impressions × intent × proximity`, not impressions alone. A transactional query at position 7 outranks a higher-impression informational query at position 6 every time. If the ranking URL can't convert and can't route demand to one that can, downgrade.
5. **Apply the vetoes**, then assign status + owner + a recheck date (rank moves take 2–6 weeks to read).

## The prompt to run

```text
You are my SEO analyst running the "SEO Quick Wins" play. The goal is UPSIDE, not decay:
find organic wins already within reach and rank them by how fast they convert existing
impressions into incremental revenue.

I will paste: a GSC Queries table and a GSC Pages table (query/page, clicks, impressions,
CTR, avg position, 28-day window), a query->page mapping, my impressions floor, and where I
have it, a commercial-intent tag and a money-page flag per row. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical input is
GSC query/page data carrying impressions AND average position AND CTR together -
striking-distance math needs impressions (a position 5-15 row with no impressions isn't a
win, it's rounding error), and the snippet/CTR call needs CTR against position. If that
critical input is missing, STOP and return only (a) what's missing and (b) how to get it -
never estimate impressions, position, or CTR, and never proceed on assumed demand.

RULES:
- Only consider rows at avg position ~5-15 AND above my impressions floor. Everything else
  is no-demand or out-of-band: exclude it and say so. Do not invent demand.
- Classify each opportunity as one of: RANK-GAP (visible but not high enough -> depth +
  internal links), SNIPPET/CTR (ranks fine, CTR far below the expected curve for its
  position -> title/meta rewrite), or FEATURE-BOX (ranks 1-5, a snippet/PAA/AI Overview sits
  above -> restructure to win the box). Name the win type for every row.
- For CTR judgments, compare actual CTR to a reasonable expected CTR for that position
  (e.g. ~7-10% at position 4) and flag the gap as the evidence. Do not call a CTR "low"
  without the position-adjusted benchmark.
- Re-rank by impressions x commercial intent x proximity to a breakthrough position. A
  transactional query near the page-one cutoff beats a higher-impression informational one.
- A win must map to a money page or a page that can route demand to one. An informational
  page ranking fine with no commercial path is KEEP, not WIN.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence.

RETURN:
1. A 3-sentence executive read: total est. incremental clicks/mo within reach and the
   single fastest win.
2. A ranked table using exactly this header row:
   | Query / Page | Position | Impressions (28d) | CTR vs expected | Intent | Win type | Est. clicks gained / mo | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any row.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a WIN.
```

## Decision rules

- **WIN** — average position ~5–15 (or 1–5 with a winnable feature box), impressions above the floor, a clear win type (rank-gap / snippet-CTR / feature-box), a named single fix, and a money page (or a routable path to one). The estimated incremental clicks must beat the effort to ship the fix.
- **REFRESH** — the page is in the band and the demand is real, but the fix is bigger than a title tweak (thin body, weak match to query intent, outdated content). The win is there but it is a content job, not a quick edit.
- **WATCH** — directional only: in the band but below the impressions floor, position visibly mid-move, or the SERP layout is in flux (a new AI Overview just appeared and CTR has not settled).
- **KEEP** — already ranking well with CTR at or above the expected curve, or an informational page with no commercial path; nothing to gain from touching it.
- **FIX** — GSC is reporting incompletely, the query→page mapping is ambiguous, or a tracking/migration gap makes the position untrustworthy.
- Every recommendation carries a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- Do **not** call a position-5–15 page a win if it sits below your impressions floor — that is no demand, not a near-miss. Rank without demand is vanity.
- Do **not** count **branded queries** (your name, your product names) as wins. You already own that demand; a rank gain there is not incremental.
- Do **not** promise revenue from an **informational** ranking unless you can route its demand to a commercial page. Position ≠ purchase intent.
- Do **not** blame a low CTR on the title without checking the **SERP layout** — an AI Overview, a feature box, or an ad stack can cap organic CTR no matter how good your snippet is.
- Do **not** treat a position that is **still moving** as striking distance; a page mid-climb or mid-fall needs a stable week before you judge it.
- Do **not** ship a title rewrite without a before/after baseline and a recheck date — and never push a write, edit, or republish without explicit human approval.

## Output

A ranked striking-distance opportunity list, each row mapped to a money page, a win type, and a single named fix.

Minimum table columns:

| Query / Page | Position | Impressions (28d) | CTR vs expected | Intent | Win type | Est. clicks gained / mo | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| "merino base layer" → /collections/base-layers | 8.3 | 9,100 | 1.4% vs ~3% | Transactional | Rank-gap | +480 | WIN | SEO + Web | 21 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
