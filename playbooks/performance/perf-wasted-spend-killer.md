---
slug: "perf-wasted-spend-killer"
title: "Wasted Spend Killer"
operating_question: "Which spend should be killed, refreshed, watched, or kept?"
primary_persona: "performance"
personas: ["performance", "marketing"]
category: "acquisition-efficiency"
platforms: ["meta-ads", "google-ads", "tiktok-ads", "commerce"]
cadence: "weekly"
public_tier: "launch"
---

# Wasted Spend Killer

## Operating Question

**Which paid spend should I kill, refresh, watch, or keep this week — with enough evidence to defend the call to a CFO?**

Every week, paid budgets quietly leak into campaigns that look alive inside the ad platform but produce no profitable orders. The ad platform is the worst possible judge of this: it over-counts its own conversions, never sees your margin, and never knows you were out of stock. This play forces a defensible **KILL / REFRESH / WATCH / KEEP / FIX** call on each unit of spend, ranked by *contribution profit at risk* — not by spend, and not by platform ROAS.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Meta Ads Manager, your Google Ads account, or your Shopify orders. To run this manually you have to:

1. Export 3–5 CSVs every week (Meta by ad, Google by campaign **and** the Search Terms report, TikTok, Shopify orders with COGS).
2. Align the date windows so they actually compare.
3. Reconcile platform-*claimed* conversions against *real* orders, because Meta and Google both double-count.
4. Bolt on margin, because no ad platform knows your COGS.

**The thinking in this playbook is free. The data access is the hard part — and that is exactly what ShopMCP connects.** If your AI assistant has no live line into Meta/Google/Shopify, that wall is where manual runs stop. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Performance Marketer
- **Also useful for:** Head of Marketing (budget reallocation), Founder/CEO (where is money leaking?)
- Run it **before** your weekly budget review, or whenever blended MER moves more than ~10% week over week.

## When To Run It

- **Cadence:** weekly — Monday, after the weekend's spend and orders have settled.
- **Triggers:** blended MER drop, a CPA spike, a new campaign maturing past learning, an upcoming budget decision.
- **Pre-requisite:** run a **Tracking Sanity Check** first. Never kill spend on top of drifting attribution — you'll kill the wrong thing.

## Required Evidence

- **Meta Ads** — spend, purchases, purchase value, CPA, ROAS, frequency, CPM, CTR, CVR, at **campaign and ad-set/ad level**, last 14–30 days plus the prior equal period.
- **Google Ads** — spend, conversions, conversion value, split by **type (Search / Shopping / Performance Max)**; the **Search Terms report**; **Impression Share lost to budget vs. lost to rank**.
- **TikTok Ads** — spend, CPA, ROAS. Treat as **directional only** — longer, messier attribution and a weaker signal at low volume.
- **Commerce (Shopify/Woo/BigCommerce/etc.)** — actual orders by source/UTM, new vs. returning split, AOV, and **COGS / contribution margin** per product or blended.
- **Targets** — your target CPA, MER, or ROAS, and a contribution-margin floor.

## Optional Evidence (changes the answer when present)

- **Stock cover** for top products — never scale a winner into a stockout.
- **Promo calendar** — a promo window inflates ROAS and borrows future demand.
- **Learning-phase status / recent edits** — a budget or creative edit resets learning.
- **Creative launch dates** — to tell genuine fatigue apart from an immature ad.

## How To Pull This Evidence

- **Meta Ads Manager** — set Columns to **Performance**, add a breakdown **by ad**, then **export the CSV**.
- **Google Ads** — pull the **campaign** report plus the **Search Terms report**; add the **Impression Share** columns (lost to budget vs. lost to rank).
- **TikTok Ads** — export campaign-level spend, CPA, and ROAS (treat as directional only).
- **Shopify** — export **orders by source/UTM**, then add **COGS**: variant **Cost per item** carries margin but is **not** in the standard orders export, so pull it separately and join.
- Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this exact order)

1. **Gate on trust.** If platform-claimed conversions and commerce orders diverge by more than ~15% for a channel, set that channel to **FIX** and stop there. Fix tracking before touching budget.
2. **Protect immaturity.** Anything still in learning (Meta: under ~50 conversions in 7 days) is too early to judge → **WATCH**, never KILL.
3. **Find the zero-return leaks.** Spend ≥ 1.5× your target CPA over ≥14 days, **0 commerce-attributed orders**, and ≥ ~300 clicks (enough traffic that you'd expect at least one order) → **KILL** candidate.
4. **Decompose the decayers.** For anything over target CPA, break the move into **CPM × CTR × CVR × AOV**:
   - CTR falling at flat CPM → **creative fatigue** → REFRESH.
   - CVR or AOV collapsing → **landing-page / offer / stock** problem → FIX or REFRESH, *not* "kill the campaign."
   - CPM spiking at stable CTR → **auction/audience** pressure → WATCH or narrow.
5. **Overlay margin.** Re-rank by **contribution lost**, not spend. 2.0 ROAS on a 70%-margin product is healthy; 2.0 ROAS on a 25%-margin product is underwater. **Platform ROAS is not profit.**
6. **Apply the vetoes**, then assign status + owner + recheck date.

## Manual Workflow

1. Pull the exports above for the last 14 days and the prior 14 (use 30/30 for low-volume accounts).
2. Reconcile platform conversions vs. commerce orders per channel. If drift exceeds the gate, mark FIX and stop on that channel.
3. Tag each spend unit's maturity (learning vs. mature).
4. Build the **leak list** (rule 3) and the **decay list** (rule 4); overlay margin (rule 5).
5. Paste the prompt below with your tables.
6. Pressure-test every KILL against the veto list, then convert the survivors into an action packet with owner and recheck date.

## Copy-Paste Prompt

```text
You are my performance-marketing analyst running the "Wasted Spend Killer" play.

GOAL: decide which spend to KILL, REFRESH, WATCH, KEEP, or FIX this week, ranked by
contribution profit at risk — not by spend, and not by platform ROAS.

I will paste: Meta/Google/TikTok spend tables, my commerce orders by source, COGS or
contribution margin, and my targets. Some data may be missing.

RULES:
- PRE-FLIGHT: First list which required inputs I provided vs. missing. If commerce order truth (real attributed orders) is missing, STOP and return only (a) what's missing and (b) how to get it — never estimate commerce truth from a platform or proceed.
- Trust gate first: if platform-claimed conversions and my commerce orders diverge >15%
  for a channel, mark that channel FIX and exclude it from KILL decisions.
- Protect learning-phase and small samples (<~300 clicks): WATCH, never KILL.
- KILL only when: >=14 days, spend >= 1.5x target CPA, 0 commerce orders, >=300 clicks,
  not in learning, and no stock/promo veto applies.
- For over-target campaigns, decompose the move into CPM x CTR x CVR x AOV and name the
  driver. CTR drop at flat CPM = fatigue (REFRESH). CVR/AOV drop = landing/offer/stock.
- Re-rank everything by contribution lost using my real margin. State platform ROAS and
  real margin-adjusted ROAS separately.
- Every row must carry: a number, its source, the time window, and a confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked table using exactly this header row:
   | Spend unit | Platform | Spend (14d) | Orders (commerce) | CPA vs target | Real ROAS @ margin | Driver | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the table with prose.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision Rules (with numbers)

- **KILL** — ≥14 days, spend ≥ 1.5× target CPA, 0 commerce-attributed orders, ≥300 clicks, not in learning, no stock/promo veto.
- **REFRESH** — over target CPA driven by CTR decline at stable CPM (fatigue), or CVR drop traced to creative/landing mismatch, where the audience/offer is still viable.
- **WATCH** — directional only: in learning, sample under ~300 clicks or under ~1× target-CPA of spend, or the window is polluted by promo/stockout.
- **KEEP** — inside the target CPA/MER band **and** contribution-positive at real margin.
- **FIX** — tracking drift, missing COGS, or a feed/stock block prevents a safe call.
- Every recommendation carries a number, source, time window, and confidence level.

## Veto Rules

- Do **not** KILL on platform ROAS alone — require commerce-side orders and real margin.
- Do **not** KILL learning-phase or sub-300-click campaigns.
- Do **not** KILL or scale during or immediately after a promo window (inflated and borrowed demand).
- Do **not** scale a winner into less than your minimum days of stock cover.
- Do **not** act on a channel that failed the tracking gate.
- Do **not** pause, shift budget, or edit anything without an explicit human approval step.

## Output Contract

A table ranked by **contribution at risk**, not spend:

| Spend unit | Platform | Spend (14d) | Orders (commerce) | CPA vs target | Real ROAS @ margin | Driver | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Prospecting – Broad | Meta | $4,120 | 6 | +210% | 0.8 | CVR collapse, LP mismatch | REFRESH | Perf + Web | 7 days |

## Worked Example (real numbers)

> **Executive read:** $11.4k of last-14-day spend is at risk. One Meta campaign ($1,240, zero orders) is a clean KILL; the bigger problem is a prospecting campaign that looks "fine" at 1.9 platform ROAS but is underwater at 28% margin. Google Shopping is over target only because of a tracking gap — fix before judging.

| Spend unit | Platform | Spend (14d) | Orders (commerce) | CPA vs target | Real ROAS @ margin | Driver | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Retargeting – Catch-all | Meta | $1,240 | 0 | n/a (0 orders) | 0.0 | 312 clicks, no orders, mature | **KILL** | Perf | Today |
| Prospecting – Broad | Meta | $4,120 | 31 | +18% | 1.9 platform / **0.9 @ 28%** | Margin-negative; CVR slipping | **REFRESH** | Perf + Web | 7 days |
| Brand – Search | Google | $980 | 96 | −40% | 6.2 @ 60% | Within band, profitable | **KEEP** | Perf | 14 days |
| Shopping – All products | Google | $3,300 | 41 (GA4 says 58) | +60% | unsafe | GA4↔Shopify drift 29% | **FIX** | Perf + Analytics | Now |
| TopFunnel – New creative | TikTok | $1,150 | 4 | +35% | 1.3 | In learning, 7 days old | **WATCH** | Perf | 7 days |
| PMax – Catch-all | Google | $640 | 12 | +5% | 2.1 @ 45% | Blended; can't see channel split | **WATCH** | Perf | 14 days |

Note how the answer *inverts* the platform view: Meta's "best" campaign by ROAS (Prospecting, 1.9) is the real loser at margin, and the over-target Shopping campaign is a tracking artifact, not a spend problem.

## Common Failure Modes

- Killing on platform ROAS while real margin says the opposite.
- Killing a learning-phase campaign and resetting the algorithm.
- Treating a PMax/Shopping blended number as if it were channel-clean.
- Calling a promo-window spike a "win" when it just pulled demand forward.
- Acting while GA4, Meta, and Shopify orders disagree.

## Run This Play With Live Data

**Manual version:** export five CSVs, align the windows, reconcile platform conversions against real orders, bolt on margin — every single week.

**ShopMCP version:** connect Meta, Google, TikTok, and your store once. Ask the question; ShopMCP pulls live spend, real commerce orders, and margin, runs the tracking gate and the CPM×CTR×CVR×AOV decomposition, and returns the ranked KILL/REFRESH/WATCH/KEEP table. It stays **read-only** until you explicitly approve a pause or budget change.

> No Meta, Google, or Shopify connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of one spreadsheet-afternoon.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Wasted Spend Killer play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual exports and stale CSVs.
- Copy-pasting across Meta, Google, TikTok, analytics, and your store.
- Guessing which evidence is safe enough to act on.
- Rebuilding the same reconciliation every week.
