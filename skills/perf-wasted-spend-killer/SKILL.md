---
name: perf-wasted-spend-killer
description: "When an ecommerce operator needs to decide: Which spend should be killed, refreshed, watched, or kept? Runs the Wasted Spend Killer play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Wasted Spend Killer', 'Meta Ads', 'Google Ads', 'Tiktok Ads', 'Commerce', 'Acquisition Efficiency'."
license: CC-BY-4.0
metadata:
  persona: Performance Marketer
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Wasted Spend Killer

**Operating question:** Which spend should be killed, refreshed, watched, or kept?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Meta Ads** — spend, purchases, purchase value, CPA, ROAS, frequency, CPM, CTR, CVR, at **campaign and ad-set/ad level**, last 14–30 days plus the prior equal period.
- **Google Ads** — spend, conversions, conversion value, split by **type (Search / Shopping / Performance Max)**; the **Search Terms report**; **Impression Share lost to budget vs. lost to rank**.
- **TikTok Ads** — spend, CPA, ROAS. Treat as **directional only** — longer, messier attribution and a weaker signal at low volume.
- **Commerce (Shopify/Woo/BigCommerce/etc.)** — actual orders by source/UTM, new vs. returning split, AOV, and **COGS / contribution margin** per product or blended.
- **Targets** — your target CPA, MER, or ROAS, and a contribution-margin floor.

Optional, if available:

- **Stock cover** for top products — never scale a winner into a stockout.
- **Promo calendar** — a promo window inflates ROAS and borrows future demand.
- **Learning-phase status / recent edits** — a budget or creative edit resets learning.
- **Creative launch dates** — to tell genuine fatigue apart from an immature ad.

## How to decide — in order

1. **Gate on trust.** If platform-claimed conversions and commerce orders diverge by more than ~15% for a channel, set that channel to **FIX** and stop there. Fix tracking before touching budget.
2. **Protect immaturity.** Anything still in learning (Meta: under ~50 conversions in 7 days) is too early to judge → **WATCH**, never KILL.
3. **Find the zero-return leaks.** Spend ≥ 1.5× your target CPA over ≥14 days, **0 commerce-attributed orders**, and ≥ ~300 clicks (enough traffic that you'd expect at least one order) → **KILL** candidate.
4. **Decompose the decayers.** For anything over target CPA, break the move into **CPM × CTR × CVR × AOV**:
   - CTR falling at flat CPM → **creative fatigue** → REFRESH.
   - CVR or AOV collapsing → **landing-page / offer / stock** problem → FIX or REFRESH, *not* "kill the campaign."
   - CPM spiking at stable CTR → **auction/audience** pressure → WATCH or narrow.
5. **Overlay margin.** Re-rank by **contribution lost**, not spend. 2.0 ROAS on a 70%-margin product is healthy; 2.0 ROAS on a 25%-margin product is underwater. **Platform ROAS is not profit.**
6. **Apply the vetoes**, then assign status + owner + recheck date.

## The prompt to run

```text
You are my performance-marketing analyst running the "Wasted Spend Killer" play.

GOAL: decide which spend to KILL, REFRESH, WATCH, KEEP, or FIX this week, ranked by
contribution profit at risk — not by spend, and not by platform ROAS.

I will paste: Meta/Google/TikTok spend tables, my commerce orders by source, COGS or
contribution margin, and my targets. Some data may be missing.

RULES:
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
2. A ranked table: Spend unit | Platform | Spend (14d) | Orders (commerce) | CPA vs target |
   Real ROAS @ margin | Driver | Status | Owner | Recheck.
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **KILL** — ≥14 days, spend ≥ 1.5× target CPA, 0 commerce-attributed orders, ≥300 clicks, not in learning, no stock/promo veto.
- **REFRESH** — over target CPA driven by CTR decline at stable CPM (fatigue), or CVR drop traced to creative/landing mismatch, where the audience/offer is still viable.
- **WATCH** — directional only: in learning, sample under ~300 clicks or under ~1× target-CPA of spend, or the window is polluted by promo/stockout.
- **KEEP** — inside the target CPA/MER band **and** contribution-positive at real margin.
- **FIX** — tracking drift, missing COGS, or a feed/stock block prevents a safe call.
- Every recommendation carries a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Do **not** KILL on platform ROAS alone — require commerce-side orders and real margin.
- Do **not** KILL learning-phase or sub-300-click campaigns.
- Do **not** KILL or scale during or immediately after a promo window (inflated and borrowed demand).
- Do **not** scale a winner into less than your minimum days of stock cover.
- Do **not** act on a channel that failed the tracking gate.
- Do **not** pause, shift budget, or edit anything without an explicit human approval step.

## Output

A table ranked by **contribution at risk**, not spend:

| Spend unit | Platform | Spend (14d) | Orders (commerce) | CPA vs target | Real ROAS @ margin | Driver | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Prospecting – Broad | Meta | $4,120 | 6 | +210% | 0.8 | CVR collapse, LP mismatch | REFRESH | Perf + Web | 7 days |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/perf-wasted-spend-killer) — it executes this play read-only by default and applies changes only on your approval.
