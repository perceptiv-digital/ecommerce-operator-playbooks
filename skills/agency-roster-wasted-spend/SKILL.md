---
name: agency-roster-wasted-spend
description: "When an ecommerce operator needs to decide: Which clients across my roster are wasting the most ad spend this week? Runs the Roster Wasted-Spend Rollup play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Roster Wasted-Spend Rollup', 'Commerce', 'Meta Ads', 'Google Ads', 'Tiktok Ads', 'Agency Portfolio'."
license: CC-BY-4.0
metadata:
  persona: Agency AM / COO
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Roster Wasted-Spend Rollup

**Operating question:** Which clients across my roster are wasting the most ad spend this week?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

Per client on the roster:

- **Meta Ads** — spend, purchases, purchase value, CPA, ROAS, last 7 days plus the prior equal 7 (use 14/14 for low-volume accounts), at campaign level.
- **Google Ads** — spend, conversions, conversion value, split by **type (Search / Shopping / Performance Max)**; the **Search Terms report**; Impression Share lost to budget vs. rank.
- **TikTok Ads** — spend, CPA, ROAS. **Directional only** — longer, messier attribution and a weak signal at agency-typical low weekly volume.
- **Commerce (Shopify/Woo/BigCommerce/etc.)** — actual **orders** by source/UTM and **COGS / contribution margin** per client. This is the order-truth anchor; without it a client cannot be ranked.
- **Per-client targets** — each client's target CPA, MER, or ROAS, and a contribution-margin floor. These differ by client; do not apply one roster-wide target.

Optional, if available:

- **Per-client stock cover** for top products — never recommend scaling a client into a stockout.
- **Per-client promo calendar** — a promo window inflates that client's ROAS and borrows future demand; it distorts the ranking if not flagged.
- **Learning-phase status / recent edits** per account — a budget or creative edit resets learning and makes a client look worse than it is.
- **Client tier / retainer size** — used to break ties on owner assignment and urgency, not to change the math.
- **Creative launch dates** — to tell genuine fatigue apart from an immature campaign inside a client.

## How to decide — in order

1. **Per-client tracking gate, first.** For each client, compare platform-claimed conversions against commerce orders. If they diverge by more than ~15% for that client's channels, mark the client **BLIND** and exclude it from the ranking — it gets a FIX action, not a rank slot. Never estimate a blind client's order truth from platform ROAS.
2. **Protect immaturity, per client.** Within a client, anything still in learning (Meta: under ~50 conversions in 7 days) or under ~300 clicks is too early to judge → that spend is WATCH inside the client, never KILL, and it does not inflate the client's "at risk" number.
3. **Find each client's zero-return leaks.** Per client, sum spend that is ≥ 1.5× that client's target CPA over the window with **0 commerce-attributed orders** and ≥ ~300 clicks → that is the client's clean leak. This is the floor of the client's spend-at-risk.
4. **Decompose each client's over-target spend at REAL margin.** For spend over target CPA, judge it on **contribution margin, not platform ROAS**. A client at 2.5 platform ROAS on 25% margin is underwater; a client at 1.8 platform ROAS on 70% margin is fine. Add the margin-negative-but-not-zero-order spend to the client's at-risk total.
5. **Compute spend-at-risk per client and rank the roster.** Spend-at-risk = zero-return leak (rule 3) + margin-negative over-target spend (rule 4), expressed as **contribution dollars at risk**. Rank **clients** by this number, descending. This ranking — not spend, not platform ROAS — is the week's worklist.
6. **Apply the vetoes**, assign each ranked client a status, a top-leak label, an owner, and a recheck date.

## The prompt to run

```text
You are my agency performance analyst running the "Roster Wasted-Spend Rollup" play
across my whole client roster.

GOAL: rank my CLIENTS by contribution profit at risk this week — not by spend, and not
by platform ROAS — so my AM/performance team knows which accounts get this week's hours.

I will paste, per client: Meta/Google/TikTok spend tables, that client's commerce orders
by source, that client's COGS or contribution margin, and that client's targets. Each
client has its own target and its own margin. Some clients' data may be missing.

RULES:
- PRE-FLIGHT: First list which required inputs I provided vs. missing. If a client's
  commerce order truth is missing, mark that client BLIND and exclude from ranking —
  never estimate it from platform ROAS or proceed.
- Per-client tracking gate first: if a client's platform-claimed conversions and its
  commerce orders diverge >15%, mark that client BLIND, exclude it from the ranking, and
  give it a FIX action instead of a rank slot.
- Within each client, protect learning-phase and sub-300-click spend: WATCH, never KILL,
  and it does NOT count toward that client's spend-at-risk.
- For each client, compute spend-at-risk = (a) spend >= 1.5x that client's target CPA with
  0 commerce orders and >=300 clicks [zero-return leak] PLUS (b) over-target spend that is
  margin-negative at that client's REAL contribution margin. Judge on real margin, never
  on platform ROAS.
- Rank CLIENTS by total contribution-dollars at risk, descending. State each client's
  platform ROAS and real margin-adjusted ROAS separately.
- Every row must carry: a number, its source, the time window, and a confidence level.
- Respect each client's own target and margin — never apply one roster-wide target.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.
- Flag any client in a promo window — promo inflates ROAS and distorts the ranking.

RETURN:
1. A 3-sentence executive read for the agency lead: where the week's hours should go.
2. A roster table ranked by contribution at risk, using exactly this header row:
   | Client | Platform spend (7d) | Commerce orders | Real ROAS @ margin | Spend at risk | Top leak | Status | Owner |
   Use "—" for any cell you cannot fill; do not add/drop columns or replace the table with prose.
3. A separate short list of BLIND clients (failed the tracking gate) and what to fix.
4. Vetoes/caveats that downgraded any client, and what evidence would upgrade a WATCH/BLIND.
```

## Decision rules

These run per client, then drive the roster ranking. Every recommendation carries a **number, source, time window, and confidence level** — an unsourced rank is not actionable across a roster.

- **KILL** (top leak label) — the client's spend-at-risk is dominated by a clean zero-return leak: spend ≥ 1.5× that client's target CPA, 0 commerce-attributed orders, ≥300 clicks, mature, no stock/promo veto. The client ranks high and the owner has an obvious first move.
- **REFRESH** — the client's at-risk spend is driven by over-target margin-negative campaigns where the audience/offer is still viable (fatigue or landing/offer mismatch), not zero-order dead weight. Recoverable with creative/LP work.
- **WATCH** — directional only: the client's apparent waste sits in learning-phase, sub-300-click, or promo-polluted spend, so the number isn't yet safe to act on.
- **KEEP** — the client is inside its target CPA/MER band **and** contribution-positive at its real margin; little to no spend at risk. It does not need the team's hours this week.
- **FIX** (BLIND clients) — tracking drift, missing COGS, or a feed/stock block prevents a safe rank. The action is to fix attribution, not to move budget.

## Vetoes — stop if any apply

- Do **not** rank or KILL a client on platform ROAS alone — require commerce-side orders and that client's real margin.
- Do **not** count a client's learning-phase or sub-300-click spend toward its spend-at-risk.
- Do **not** rank a client that failed its tracking gate — mark it **BLIND** and FIX, never treat a blind client as clean or estimate its orders.
- Do **not** rank or scale a client during or immediately after a promo window — promo inflates ROAS and borrows future demand, distorting the roster order.
- Do **not** recommend scaling any client into less than its minimum days of stock cover.
- Do **not** apply one roster-wide target or margin — every client is judged against its own.
- Do **not** pause, shift budget, or edit anything in any client account without an explicit human approval step.

## Output

A table ranked by **contribution at risk**, one row per client (BLIND clients listed separately):

| Client | Platform spend (7d) | Commerce orders | Real ROAS @ margin | Spend at risk | Top leak | Status | Owner |
|---|---|---|---|---|---|---|---|
| Northwind Outfitters | $18,400 | 214 | 1.1 @ 32% | $6,200 | Meta prospecting margin-negative | REFRESH | Priya |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
