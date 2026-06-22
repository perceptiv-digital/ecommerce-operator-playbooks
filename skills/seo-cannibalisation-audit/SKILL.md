---
name: seo-cannibalisation-audit
description: "When an ecommerce operator needs to decide: Which pages compete with each other for the same search demand? Runs the SEO Cannibalisation Audit play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'SEO Cannibalisation', 'Google Search Console', 'Seo Demand Capture'."
license: CC-BY-4.0
metadata:
  persona: SEO / Content Lead
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# SEO Cannibalisation Audit

**Operating question:** Which pages compete with each other for the same search demand?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **GSC Queries × Pages cross-tab** — for each query, *every* URL on your site that receives impressions, with clicks, impressions, average position, and CTR, over the last **90 days** (28 days is too short to see oscillation; 16 months is the GSC ceiling if you want seasonality).
- **Page-level position history** — average position **week by week** for each candidate URL on the shared query, so you can see Google swapping which page it ranks.
- **Impression share within the cluster** — what percent of the query's total impressions each URL captures (e.g. 40 / 35 / 25). Even split across non-winning positions is the cannibalisation fingerprint.

Optional, if available:

- **The live SERP for the query** — does the result reflect different *intent* (a how-to vs. a buy page)? If so it may not be cannibalisation at all.
- **Canonical tags** on each candidate URL — a wrong or missing canonical is often the actual root cause.
- **Internal anchor text** pointing to each URL — if your own links send the head term to the weaker page, that's a fix, not a redirect.
- **Commerce value per URL** — sessions → revenue, so you consolidate *toward* the page that actually converts, not just the one with more impressions.
- **Publish / last-modified dates** — to tell a stale legacy post from the current canonical asset.

## How to decide — in order

1. **Confirm it's the same intent, not just the same words.** Read the query and the live SERP. A "how to clean X" informational query and a "buy X" commercial query are *different demand* — two pages serving them is correct, not cannibalisation. If intent differs, status is **KEEP both** and stop. This is the most common false positive.
2. **Confirm multiple URLs actually share the impressions.** Require **≥2 URLs each holding ≥15% of the query's impressions** over 90 days. One URL at 92% and another at 3% is not a split — that's normal long-tail noise.
3. **Confirm Google is alternating, not settled.** Check week-by-week position history. **Real cannibalisation oscillates** — URL A ranks one week, URL B the next, neither holding. If one URL is stably ranked and the others are pinned far below, it's weak duplication, not active swapping → **WATCH**, fix later.
4. **Exclude brand and navigational queries.** Your homepage, a brand PLP, and a brand PDP all ranking for "[brand] [product]" is healthy site presence, not cannibalisation. Never consolidate these.
5. **Name the rightful canonical winner.** Pick the URL with the **best intent match + highest commercial value + strongest existing authority** — usually the category PLP for a commercial head term, not the blog post that happens to rank.
6. **Check signals before reaching for a redirect.** Inspect canonicals and internal anchor text. If the loser canonicals to itself and your internal links point the head term at it, a **signal fix** may resolve the split with zero redirect risk. Only escalate to a 301 when the pages are genuinely redundant.
7. **Apply the vetoes**, then assign status + owner + recheck date.

## The prompt to run

```text
You are my technical-SEO analyst running the "SEO Cannibalisation Audit" play.

GOAL: find queries where MULTIPLE URLs from my own site compete for the same search
demand, name the rightful canonical winner per cluster, and decide for each loser:
CONSOLIDATE (301), DIFFERENTIATE intent, DE-OPTIMISE, or FIX signals (canonical/internal links).

I will paste a GSC export: for each query, every URL with clicks, impressions, average
position, CTR over 90 days, plus week-by-week position history where I have it. Some
data may be missing.

RULES:
- Same words is not cannibalisation. If the live SERP / intent for the competing URLs
  differs (e.g. a how-to vs a buy page), mark KEEP BOTH and explain why.
- Require >=2 URLs each holding >=15% of that query's impressions before calling a split.
- Confirm OSCILLATION in position history (Google swapping which URL it shows). A stably
  ranked URL with others pinned far below is WATCH, not a redirect.
- Exclude brand/navigational queries — multi-ranking there is normal.
- Pick the canonical winner by intent match + commercial value + existing authority,
  not just by impression count.
- Before recommending a 301, check canonical tags and internal anchor text; prefer a
  signal fix when the pages are not truly redundant. Redirects lose some equity — only
  consolidate when the upside is clear.
- Every row must carry a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent data.

RETURN:
1. A 3-sentence executive read.
2. A cluster table: Query | Competing URLs (impression share) | Position behaviour |
   Canonical winner | Loser action | Status | Owner | Recheck.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH to a decision.
```

## Decision rules

- **CONSOLIDATE (KILL the loser via 301)** — ≥2 URLs each ≥15% impression share on one non-brand query, confirmed position oscillation over ≥90 days, genuinely redundant intent, and a clear canonical winner; redirect the loser(s) into the winner.
- **REFRESH** — the cluster is real but the rightful winner is the *weaker-performing* page today; differentiate or strengthen the winner (title, H1, internal links, depth) rather than redirecting, then re-measure.
- **WATCH** — a split exists on paper but one URL is stably ranked while others sit far below (no active oscillation), or the sample is under the 15% / 90-day floor. Directional only.
- **KEEP** — distinct search intent across the URLs (informational vs. transactional), or a brand/navigational query where multi-ranking is expected. Do not merge.
- **FIX** — the root cause is a wrong/missing canonical or mis-pointed internal anchor text, not redundant content. Correct the signal first; a 301 would be premature.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** merge pages that serve genuinely different intent — a how-to guide and a PLP both ranking for "[product] [attribute]" is healthy coverage, not cannibalisation.
- Do **not** issue a 301 before checking canonical tags and internal anchor text; a signal fix is reversible and a redirect is not.
- Do **not** consolidate when the upside is unclear — redirects leak some link equity, so only merge when one strong page clearly beats two weak ones.
- Do **not** treat brand or navigational multi-ranking as a problem; your own brand terms surfacing several pages is normal.
- Do **not** pick the canonical winner on impression count alone — weigh intent match and commercial value, or you'll redirect buyers into a blog post.
- Do **not** execute redirects, canonical edits, or page deletions without an explicit human approval step.

## Output

A cannibalisation cluster list: each shared query, the competing URLs and their impression split, the position behaviour, the named canonical winner, and the action for each loser.

| Query | Competing URLs (impression share) | Position behaviour | Canonical winner | Loser action | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| running shoes waterproof | PLP 41% / blog 34% / tag 25% | All oscillating pos 7–11 | PLP | 301 blog + tag → PLP | CONSOLIDATE | SEO + Dev | 30 days |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/seo-cannibalisation-audit) — it executes this play read-only by default and applies changes only on your approval.
