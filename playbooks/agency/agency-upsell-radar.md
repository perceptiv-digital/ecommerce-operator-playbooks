---
schema_version: 1
slug: "agency-upsell-radar"
title: "Client Upsell Radar"
summary: "Client Upsell Radar helps ecommerce operators answer: Which clients have a data-backed reason to expand budget or services right now?"
operating_question: "Which clients have a data-backed reason to expand budget or services right now?"
short_title: "Upsell Radar"
primary_persona: "agency"
personas: ["agency", "marketing"]
category: "agency-portfolio"
platforms: ["commerce", "meta-ads", "google-ads", "klaviyo", "google-search-console"]
cadence: "monthly"
difficulty: "intermediate"
manual_time_minutes_min: 45
manual_time_minutes_max: 90
shopmcp_time_minutes_min: 4
shopmcp_time_minutes_max: 10
decision_type: "client-action-packet"
evidence_level: "live-data-recommended"
public_tier: "fast-follow"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/agency-upsell-radar"
shopmcp_prompt: "Run the Client Upsell Radar play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Client Upsell Radar

## Operating Question

**Which clients have a data-backed reason to expand budget or services right now — backed by their own numbers, so the conversation is a recommendation and not a pitch?**

Every retainer book is sitting on expansion revenue nobody has surfaced, because the work to find it is buried across five tools per client and multiplied by the roster. A channel quietly capped by budget at an on-target CPA. A retention gap a new email/SMS scope would close. An organic or AI-search opportunity left on the table. A marketplace the brand should already be on. This play scans the whole portfolio and forces a defensible call on each account — **KEEP** growing what works, **REFRESH** a stale scope, **WATCH** an account that isn't ready, or **FIX** the leak first — and returns an upsell radar ranked by data-backed expansion value, where every recommendation carries the client's own number so the account lead walks into the call with proof, not optimism.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your clients' Google Ads impression share, their Meta frequency curves, their Klaviyo flow revenue, or their Search Console opportunity rows. To run this manually across a roster you have to:

1. Log into a different stack for **every client** — ad platforms, the email/SMS tool, Search Console, the store, each marketplace.
2. Pull a different "headroom" signal from each one (impression share lost to budget, frequency, flow coverage, query opportunity) and normalise it.
3. Reconcile platform-claimed performance against real store revenue and margin, because no channel sees the client's contribution profit.
4. Repeat the whole thing per account and then rank across accounts — the part that actually decides where you spend your selling energy.

**The thinking in this playbook is free. The cross-client, cross-tool data access is the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live line into each client's ad, email, search, and commerce data, that wall is where manual runs stop. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Agency Account Lead / Client Strategist
- **Also useful for:** Head of Growth or Agency Owner (where is the book's expansion revenue?), Performance Lead (which channels have scaling headroom), Retention Lead (which accounts need an email/SMS scope).
- Run it **before** quarterly business reviews, before renewal conversations, and whenever you're deciding which accounts deserve a proactive expansion proposal this month.

## When To Run It

- **Cadence:** monthly — early in the month, after the prior month's spend, orders, and email sends have fully settled.
- **Triggers:** an upcoming QBR or renewal, a client asking "what's next?", a new service line you want to sell into the book (e.g. you just added SMS or marketplace management), or a month where blended performance jumped and you want to know who can absorb more budget.
- **Pre-requisite:** confirm tracking is trustworthy per client first. Never recommend scaling spend on top of drifting attribution — you'll scale the client into a number you can't defend, and an upsell that hurts their results hurts your retention.

## Required Evidence

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — per client: revenue, orders, AOV, new vs. returning split, and **COGS / contribution margin** (blended or per product). This is the truth layer every recommendation is ranked against.
- **Meta Ads** — spend, CPA, ROAS, **frequency**, CPM, and CTR at campaign/ad-set level, last 30 days plus the prior equal period. Frequency and CPM trend tell you whether there's audience headroom to absorb more budget.
- **Google Ads** — spend, CPA, ROAS by type (Search / Shopping / Performance Max), and the critical headroom signal: **impression share lost to budget vs. lost to rank**.
- **Klaviyo (or email/SMS platform)** — active flows, flow revenue, % of total revenue from email/SMS, and which core flows exist vs. are missing (welcome, abandoned cart/checkout, browse, post-purchase, win-back).
- **Targets** — each client's target CPA, MER/ROAS, and a contribution-margin floor, so "scale" is judged against profit, not platform vanity.

## Optional Evidence

- **Google Search Console** — high-impression / low-position queries and pages: organic opportunity the client isn't capturing, and a wedge for an SEO or content scope.
- **AI-search / answer-engine visibility** — whether the brand is being cited in AI answers for its category; a fast-growing surface and a clean new-scope story.
- **Marketplace presence** — whether the brand sells on Amazon / eBay / Google Shopping where its category clearly transacts; absence is an expansion gap.
- **Stock cover** — never recommend scaling a client into a stockout; a winner with thin inventory is a WATCH, not a KEEP-and-scale.
- **Contract / scope on file** — what the client already pays for, so you don't "sell" them something they have, and so upside is framed as incremental.

## How To Pull This Evidence

- **Google Ads (budget headroom)** — pull the campaign report with the **Impression Share** columns; isolate **search impression share lost to budget**. A channel hitting target CPA while losing impression share to budget is the cleanest "raise the budget" signal there is.
- **Meta Ads (audience headroom)** — export campaign/ad-set spend with **frequency** and **CPM**; rising frequency at flat CPM means the audience is saturating (limited headroom), while low frequency with stable CPM at on-target CPA means room to scale.
- **Klaviyo (retention gap)** — list active flows and their revenue, and compare against the core-flow checklist (welcome, abandoned checkout, browse abandonment, post-purchase, win-back); a missing high-intent flow plus a high returning-customer base is a retention-scope opportunity.
- **Search Console / SEO opportunity** — export queries with high impressions and an average position of roughly 5–20: demand the client ranks for but isn't capturing, sized into an organic or AI-search content scope.
- **Marketplace gap** — check whether the brand transacts on the marketplaces its category lives on (Amazon, eBay, Google Shopping); note category fit and rough demand before calling it an opportunity.
- **Commerce + margin** — export store revenue, AOV, new-vs-returning, and **Cost per item** (carries margin but is not in the standard orders export — pull it separately and join) so every opportunity is sized in contribution profit, not top-line.
- **Gotchas:** impression share is suppressed/blank below a volume threshold, so don't read a blank as "no headroom"; PMax and Shopping blend channels, so a single ROAS hides where the budget headroom actually is; Klaviyo flow revenue uses its own attribution window and over-credits, so discount it against store truth; SEO impressions are demand, not guaranteed traffic — size opportunity conservatively; and "no marketplace presence" is only an opportunity if the category actually transacts there.
- Or skip all of this — ShopMCP spots upsell signals across the roster.

## The Decision Logic (run in this order)

1. **Gate on health and trust, per client.** If the account is trending red (CPA/MER deteriorating, revenue falling) or tracking is drifting (platform-claimed vs. store revenue diverging by more than ~15%), set it to **FIX** and stop. You do not upsell a client whose current scope is underperforming or whose numbers you can't trust — fix efficiency first.
2. **Confirm the funnel isn't leaking before recommending more spend.** A channel at on-target CPA but a store with a broken retention engine or thin margin is not a "scale spend" account; the leak gets fixed (often itself a scope) before the budget goes up.
3. **Find the scaling headroom.** Channel at or under target CPA **and** losing impression share to budget (Google) or running low frequency at stable CPM (Meta) → budget-expansion opportunity. Size the upside as incremental orders at current efficiency, labelled an estimate.
4. **Find the retention gap.** A core email/SMS flow missing (or email/SMS well under its benchmark share of revenue) on a store with enough returning-customer volume to matter → a retention-scope opportunity. Size as recoverable flow revenue, labelled an estimate.
5. **Find the organic / AI-search opportunity.** High-impression, low-position queries the client ranks for but doesn't capture, or category AI-answer absence → a content/SEO or AI-visibility scope.
6. **Find the marketplace gap.** Category clearly transacts on a marketplace the client isn't on → an expansion-channel opportunity.
7. **Overlay margin and rank by data-backed expansion value.** Re-rank every opportunity by **estimated contribution upside**, not top-line, with a confidence level. Then apply the vetoes and assign status + owner + next step.

## Manual Workflow

1. List the roster and, per client, pull the exports above for the last 30 days and the prior 30.
2. Gate each client: trending red or tracking-drifted → FIX, set aside (don't upsell).
3. For the survivors, tag each headroom signal: budget-capped channel, retention gap, SEO/AI opportunity, marketplace gap.
4. Size each opportunity in contribution upside using the client's real margin, and mark it explicitly as an estimate with a confidence level.
5. Paste the prompt below with your per-client tables.
6. Pressure-test every opportunity against the veto list, then convert the survivors into a per-client action packet ranked across the roster, each with an owner and a next step.

## Copy-Paste Prompt

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

## Decision Rules

- **KEEP (scale)** — channel at or under target CPA, contribution-positive at real margin, **and** a live headroom signal (Google impression share lost to budget, or Meta low frequency at stable CPM); recommend a budget increase sized as incremental orders at current efficiency.
- **REFRESH (new/expanded scope)** — a missing core email/SMS flow, an uncaptured SEO/AI-search opportunity, or a marketplace gap on a category that clearly transacts there; recommend the incremental scope.
- **WATCH** — directional only: efficiency is fine but no headroom signal, sample/volume too thin to size, returning-customer base too small to justify a retention scope, or stock cover too thin to scale safely.
- **KEEP (hold)** — performing inside target and already at full scope; nothing to expand this cycle, protect the account.
- **FIX** — trending red, broken/ drifting tracking, missing margin, or a leaking funnel; resolve before any upsell conversation.
- Every recommendation carries a number, source, time window, and confidence level, and every upside figure is labelled an estimate.

## Veto Rules

- Do **not** recommend scaling spend without evidence the funnel isn't leaking — fix efficiency and retention first.
- Do **not** upsell a client trending red or with broken/ drifting tracking; an upsell that hurts the client's results hurts retention.
- Do **not** present any upside as a promise — every figure is an estimate with a stated confidence level.
- Do **not** recommend scaling a winner into less than your minimum days of stock cover.
- Do **not** read a blank impression-share or low-volume signal as "no opportunity" — mark it BLIND and say what you'd need.
- Do **not** sell a client a scope they already have on file — frame upside as incremental only.
- Do **not** push budget, change scope, or send anything to the client without an explicit human approval step.

## Output Contract

A table ranked by estimated contribution upside, not top-line:

| Client | Opportunity | Evidence | Est. upside | Confidence | Next step |
|---|---|---|---|---|---|
| Example Co | Raise Google budget | Search IS lost to budget 34% at on-target CPA | +$6–9k/mo contribution (est.) | Medium | Propose +40% budget at QBR |

## Worked Example

> **Executive read:** Across the eight-account book, four clients have a clean, data-backed reason to expand and two are explicitly off-limits this cycle. The single highest-value signal is North Trail Outfitters, capped by budget on Google at an on-target CPA — the upside is incremental, not aspirational. Lumen Skincare looks like a budget upsell on the surface but its retention engine is leaking, so the recommendation is a flow scope first, not more spend.

| Client | Opportunity | Evidence | Est. upside | Confidence | Next step |
|---|---|---|---|---|---|
| North Trail Outfitters | Raise Google Search budget | Search impression share lost to budget 34% while CPA 12% under target, 58% margin | +$7.4k/mo contribution (est.) | High | Propose +45% Search budget at QBR |
| Maple & Hearth | Add SMS + win-back flow | Email = 19% of revenue, no win-back flow, 41% returning-customer base | +$4.1k/mo recovered (est.) | Medium | Scope SMS + win-back proposal |
| Driftwave Surf Co. | Launch Amazon channel | Category sells heavily on Amazon, brand absent, 63% DTC margin headroom | +$9–13k/mo new revenue (est.) | Medium | Marketplace feasibility call |
| Aster Home | Capture organic demand | 1,920 high-impression queries at avg position 8.3, no content scope | +2.6k sessions/mo (est.) | Low-Med | SEO content scope pitch |
| Lumen Skincare | FIX retention leak first | On-target Meta CPA but abandoned-checkout flow off 3 weeks; do NOT upsell spend | — | — | Repair flow, recheck next cycle |
| Copperline Coffee | FIX tracking | GA4 vs store revenue diverging 22%, CPA trending red | — | — | Tracking sanity check before any call |
| Verde Athletics | Hold | Inside target, full scope, frequency rising (audience saturating) | — | Low | No expansion this cycle; protect |
| Brightwell Pets | Scale Meta (watch stock) | Low frequency at stable CPM, on-target CPA, but 11 days stock cover | +$3k/mo (est., stock-gated) | Low | Confirm inventory, then scale |

Read: the radar deliberately separates the four expansion calls from the two FIX accounts — Lumen and Copperline would have looked like easy budget upsells on platform metrics alone, but one has a broken retention flow and the other can't be trusted on tracking, so recommending more spend there would burn results and retention. Every upside number is the client's own data sized into contribution and flagged as an estimate, which is exactly what lets the account lead open the QBR with a recommendation instead of a sales pitch.

## Common Failure Modes

- Recommending more ad spend into a funnel that's leaking on retention or margin — the budget goes up and the client's blended result goes down.
- Upselling a client who's trending red, then owning the worse number you helped create.
- Pitching upside as a promise instead of a confidence-rated estimate, and getting held to a figure you can't control.
- Reading a blank impression-share or thin-volume signal as "no opportunity" instead of marking it BLIND.
- Selling a scope the client already pays for because nobody checked the contract on file.
- Ranking opportunities by top-line revenue instead of contribution, so the agency chases a big number that's underwater at margin.
- Scaling a winner into a stockout.

## Run This Play With Live Data

**Manual version:** log into five tools per client, pull a different headroom signal from each, reconcile every platform against store revenue and margin, size each opportunity by hand, then rank across the whole roster — every month, multiplied by every account on the book.

**ShopMCP version:** connect each client's commerce, Meta, Google, Klaviyo, and Search Console once. Ask the question; ShopMCP pulls live performance, real store revenue, and margin across the roster, runs the health/trust gate per client, surfaces budget headroom, retention gaps, SEO/AI-search opportunities, and marketplace gaps, and returns the ranked, confidence-rated upsell radar. It stays **read-only** until you explicitly approve a change.

> No live line into each client's ad, email, search, and commerce data inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt across the whole book instead of one spreadsheet-afternoon per account.

Example ShopMCP prompt:

```text
Run the Client Upsell Radar play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/agency-upsell-radar?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Logging into five tools per client and normalising a different headroom signal from each.
- Reconciling every platform's claimed performance against real store revenue and margin, per account.
- Sizing each opportunity in contribution by hand and re-ranking across the roster.
- Rebuilding the same multi-tool scan every month for every account on the book.
