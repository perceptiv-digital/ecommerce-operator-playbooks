---
name: agency-upsell-radar
description: "When an ecommerce operator needs to decide: Which clients have a data-backed reason to expand budget or services right now? Runs the Client Upsell Radar play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Upsell Radar', 'Commerce', 'Meta Ads', 'Google Ads', 'Klaviyo', 'Google Search Console', 'Agency Portfolio'."
license: CC-BY-4.0
metadata:
  persona: Agency AM / COO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Client Upsell Radar

**Operating question:** Which clients have a data-backed reason to expand budget or services right now?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — per client: revenue, orders, AOV, new vs. returning split, and **COGS / contribution margin** (blended or per product). This is the truth layer every recommendation is ranked against.
- **Meta Ads** — spend, CPA, ROAS, **frequency**, CPM, and CTR at campaign/ad-set level, last 30 days plus the prior equal period. Frequency and CPM trend tell you whether there's audience headroom to absorb more budget.
- **Google Ads** — spend, CPA, ROAS by type (Search / Shopping / Performance Max), and the critical headroom signal: **impression share lost to budget vs. lost to rank**.
- **Klaviyo (or email/SMS platform)** — active flows, flow revenue, % of total revenue from email/SMS, and which core flows exist vs. are missing (welcome, abandoned cart/checkout, browse, post-purchase, win-back).
- **Targets** — each client's target CPA, MER/ROAS, and a contribution-margin floor, so "scale" is judged against profit, not platform vanity.

Optional, if available:

- **Google Search Console** — high-impression / low-position queries and pages: organic opportunity the client isn't capturing, and a wedge for an SEO or content scope.
- **AI-search / answer-engine visibility** — whether the brand is being cited in AI answers for its category; a fast-growing surface and a clean new-scope story.
- **Marketplace presence** — whether the brand sells on Amazon / eBay / Google Shopping where its category clearly transacts; absence is an expansion gap.
- **Stock cover** — never recommend scaling a client into a stockout; a winner with thin inventory is a WATCH, not a KEEP-and-scale.
- **Contract / scope on file** — what the client already pays for, so you don't "sell" them something they have, and so upside is framed as incremental.

## How to decide — in order

1. **Gate on health and trust, per client.** If the account is trending red (CPA/MER deteriorating, revenue falling) or tracking is drifting (platform-claimed vs. store revenue diverging by more than ~15%), set it to **FIX** and stop. You do not upsell a client whose current scope is underperforming or whose numbers you can't trust — fix efficiency first.
2. **Confirm the funnel isn't leaking before recommending more spend.** A channel at on-target CPA but a store with a broken retention engine or thin margin is not a "scale spend" account; the leak gets fixed (often itself a scope) before the budget goes up.
3. **Find the scaling headroom.** Channel at or under target CPA **and** losing impression share to budget (Google) or running low frequency at stable CPM (Meta) → budget-expansion opportunity. Size the upside as incremental orders at current efficiency, labelled an estimate.
4. **Find the retention gap.** A core email/SMS flow missing (or email/SMS well under its benchmark share of revenue) on a store with enough returning-customer volume to matter → a retention-scope opportunity. Size as recoverable flow revenue, labelled an estimate.
5. **Find the organic / AI-search opportunity.** High-impression, low-position queries the client ranks for but doesn't capture, or category AI-answer absence → a content/SEO or AI-visibility scope.
6. **Find the marketplace gap.** Category clearly transacts on a marketplace the client isn't on → an expansion-channel opportunity.
7. **Overlay margin and rank by data-backed expansion value.** Re-rank every opportunity by **estimated contribution upside**, not top-line, with a confidence level. Then apply the vetoes and assign status + owner + next step.

## The prompt to run

```text
You are my agency client strategist running the "Client Upsell Radar" play.

GOAL: scan my client roster and decide which clients have a data-backed reason to expand
budget or services right now, ranked by estimated contribution upside — so each call is a
recommendation backed by the client's own numbers, not a pitch.

I will paste, per client: commerce revenue/orders/AOV/margin, Meta and Google ad
performance (including Google impression share lost to budget and Meta frequency), Klaviyo
flow coverage and revenue, optional Search Console / AI-search / marketplace signals, and
each client's targets. Some data may be missing.

RULES:
- PRE-FLIGHT: First list which inputs I have per client. If a client's efficiency/headroom
  signals are missing, mark them BLIND — never recommend scaling spend without evidence the
  funnel isn't leaking.
- Health/trust gate first: if a client is trending red (CPA/MER deteriorating, revenue
  falling) or platform-claimed performance and store revenue diverge >15%, mark that client
  FIX and exclude it from any upsell — never upsell into a leaking or untrusted funnel.
- Scaling headroom only when efficiency is on target AND a headroom signal exists (Google
  impression share lost to budget, or Meta low frequency at stable CPM). No headroom signal
  = no "raise budget" recommendation.
- Retention gap = a missing core flow or email/SMS well under benchmark share on a store
  with real returning-customer volume.
- Size every opportunity in contribution upside using the client's real margin, label it
  explicitly as an ESTIMATE, and attach a confidence level. An upsell that hurts the
  client's results hurts retention — be conservative.
- Every row must carry: a number, its source, the time window, and a confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read across the roster.
2. A ranked table using exactly this header row:
   | Client | Opportunity | Evidence | Est. upside | Confidence | Next step |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the table with prose.
3. Vetoes/caveats that downgraded or excluded any client.
4. Which clients are BLIND or FIX and what evidence you'd need to upgrade them to a recommendation.
```

## Decision rules

- **KEEP (scale)** — channel at or under target CPA, contribution-positive at real margin, **and** a live headroom signal (Google impression share lost to budget, or Meta low frequency at stable CPM); recommend a budget increase sized as incremental orders at current efficiency.
- **REFRESH (new/expanded scope)** — a missing core email/SMS flow, an uncaptured SEO/AI-search opportunity, or a marketplace gap on a category that clearly transacts there; recommend the incremental scope.
- **WATCH** — directional only: efficiency is fine but no headroom signal, sample/volume too thin to size, returning-customer base too small to justify a retention scope, or stock cover too thin to scale safely.
- **KEEP (hold)** — performing inside target and already at full scope; nothing to expand this cycle, protect the account.
- **FIX** — trending red, broken/ drifting tracking, missing margin, or a leaking funnel; resolve before any upsell conversation.
- Every recommendation carries a number, source, time window, and confidence level, and every upside figure is labelled an estimate.

## Vetoes — stop if any apply

- Do **not** recommend scaling spend without evidence the funnel isn't leaking — fix efficiency and retention first.
- Do **not** upsell a client trending red or with broken/ drifting tracking; an upsell that hurts the client's results hurts retention.
- Do **not** present any upside as a promise — every figure is an estimate with a stated confidence level.
- Do **not** recommend scaling a winner into less than your minimum days of stock cover.
- Do **not** read a blank impression-share or low-volume signal as "no opportunity" — mark it BLIND and say what you'd need.
- Do **not** sell a client a scope they already have on file — frame upside as incremental only.
- Do **not** push budget, change scope, or send anything to the client without an explicit human approval step.

## Output

A table ranked by estimated contribution upside, not top-line:

| Client | Opportunity | Evidence | Est. upside | Confidence | Next step |
|---|---|---|---|---|---|
| Example Co | Raise Google budget | Search IS lost to budget 34% at on-target CPA | +$6–9k/mo contribution (est.) | Medium | Propose +40% budget at QBR |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/agency-upsell-radar) — it executes this play read-only by default and applies changes only on your approval.
