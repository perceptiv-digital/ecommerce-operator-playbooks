---
schema_version: 1
slug: "agency-roster-wasted-spend"
title: "Roster Wasted-Spend Rollup"
summary: "Roster Wasted-Spend Rollup helps ecommerce operators answer: Which clients across my roster are wasting the most ad spend this week?"
operating_question: "Which clients across my roster are wasting the most ad spend this week?"
short_title: "Roster Wasted Spend"
primary_persona: "agency"
personas: ["agency", "performance"]
category: "agency-portfolio"
platforms: ["commerce", "meta-ads", "google-ads", "tiktok-ads"]
cadence: "weekly"
difficulty: "intermediate"
manual_time_minutes_min: 45
manual_time_minutes_max: 90
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "client-action-packet"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://shop-mcp.app"
shopmcp_prompt: "Run the Roster Wasted-Spend Rollup play for the last 7 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Roster Wasted-Spend Rollup

## Operating Question

**Which clients across my roster are wasting the most ad spend this week — ranked so my AM and performance team know exactly where to spend Monday morning?**

A single brand runs the Wasted Spend Killer on its own account. An agency runs it on twelve accounts at once, on a Monday, before standups — and the only question that matters is *triage*: where is the money leaking hardest, which client gets the team's hours this week, and which accounts are quietly fine. This play rolls the single-store wasted-spend logic up across the **whole roster** and ranks **clients** (not campaigns) by **contribution profit at risk**, so the week's labor lands where it recovers the most margin. The output is a one-screen action packet your AM can take straight into a client call.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see twelve Meta Ads accounts, twelve Google Ads accounts, and twelve different storefronts. The single-store version of this problem is already painful; the roster version multiplies it by your client count. To run this manually you have to:

1. Export 3–5 CSVs **per client** every week (Meta by campaign, Google campaign + Search Terms, TikTok, plus each store's orders with COGS) — that's 30–60 files across a 12-client roster.
2. Align every client's date windows, because each store sits in a different timezone and each platform reports its own way.
3. Reconcile each platform's *claimed* conversions against each store's *real* orders — separately, one client at a time, because Meta and Google both over-count.
4. Bolt margin onto each client, because no ad platform knows any client's COGS — and every client's margin is different.
5. Then, and only then, rank clients against each other so you can decide where the team works this week.

**The thinking in this playbook is free. The data access — multiplied across your whole roster — is the wall.** That is exactly what ShopMCP connects: one line into every connected client account at once. If your AI assistant has no live feed into each client's Meta/Google/store, the roster rollup is where manual runs collapse into a spreadsheet afternoon. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Agency AM / account lead (the person who owns the client relationship and the week's plan).
- **Also useful for:** Head of Performance (where to deploy media buyers), Agency COO/Owner (where margin is leaking across the book), Client-facing strategists (defensible weekly narrative).
- Run it **before** your Monday roster standup, so the team walks in with a ranked worklist instead of "let's check accounts."

## When To Run It

- **Cadence:** weekly — Monday morning, after the weekend's spend and orders have settled across every client's timezone.
- **Triggers:** start of the work week; a roster-wide budget cycle; onboarding a batch of new accounts; a quarter-end margin review; any week where blended roster MER moves materially.
- **Pre-requisite:** each client must have passed a **Tracking Sanity Check** recently. A client whose platform-vs-commerce attribution is drifting cannot be ranked safely — it gets marked **blind**, not "clean." Never rank a client into a KILL/KEEP slot on top of drifting attribution; you'll send the team to fix the wrong account.

## Required Evidence

Per client on the roster:

- **Meta Ads** — spend, purchases, purchase value, CPA, ROAS, last 7 days plus the prior equal 7 (use 14/14 for low-volume accounts), at campaign level.
- **Google Ads** — spend, conversions, conversion value, split by **type (Search / Shopping / Performance Max)**; the **Search Terms report**; Impression Share lost to budget vs. rank.
- **TikTok Ads** — spend, CPA, ROAS. **Directional only** — longer, messier attribution and a weak signal at agency-typical low weekly volume.
- **Commerce (Shopify/Woo/BigCommerce/etc.)** — actual **orders** by source/UTM and **COGS / contribution margin** per client. This is the order-truth anchor; without it a client cannot be ranked.
- **Per-client targets** — each client's target CPA, MER, or ROAS, and a contribution-margin floor. These differ by client; do not apply one roster-wide target.

## Optional Evidence (changes the answer when present)

- **Per-client stock cover** for top products — never recommend scaling a client into a stockout.
- **Per-client promo calendar** — a promo window inflates that client's ROAS and borrows future demand; it distorts the ranking if not flagged.
- **Learning-phase status / recent edits** per account — a budget or creative edit resets learning and makes a client look worse than it is.
- **Client tier / retainer size** — used to break ties on owner assignment and urgency, not to change the math.
- **Creative launch dates** — to tell genuine fatigue apart from an immature campaign inside a client.

## How To Pull This Evidence

- **Meta** — for each client's ad account, set Columns to **Performance**, export campaign-level CSV; repeat per client and tag every row with the client name so the roster join is possible.
- **Google** — per client, pull the **campaign** report plus the **Search Terms report** and the **Impression Share** columns (lost to budget vs. rank); Shopping/PMax blend channels, so note which rows are not channel-clean.
- **TikTok** — per client, export campaign-level spend, CPA, ROAS; treat as directional and never let it drive a roster ranking on its own.
- **Each store** — export **orders by source/UTM**, then add **COGS**: variant **Cost per item** carries margin but is **not** in the standard orders export, so pull it separately and join — per client, with each client's own margin.
- **The gotcha:** the hard part is not any single export — it's that you must repeat all of the above N times (once per client) **and** keep each client's window, timezone, target, and margin straight so you don't cross-contaminate accounts when you rank them against each other. One misaligned window silently mis-ranks the roster.
- Or skip all of this — ShopMCP pulls it across your whole roster at once.

## The Decision Logic (run in this order)

1. **Per-client tracking gate, first.** For each client, compare platform-claimed conversions against commerce orders. If they diverge by more than ~15% for that client's channels, mark the client **BLIND** and exclude it from the ranking — it gets a FIX action, not a rank slot. Never estimate a blind client's order truth from platform ROAS.
2. **Protect immaturity, per client.** Within a client, anything still in learning (Meta: under ~50 conversions in 7 days) or under ~300 clicks is too early to judge → that spend is WATCH inside the client, never KILL, and it does not inflate the client's "at risk" number.
3. **Find each client's zero-return leaks.** Per client, sum spend that is ≥ 1.5× that client's target CPA over the window with **0 commerce-attributed orders** and ≥ ~300 clicks → that is the client's clean leak. This is the floor of the client's spend-at-risk.
4. **Decompose each client's over-target spend at REAL margin.** For spend over target CPA, judge it on **contribution margin, not platform ROAS**. A client at 2.5 platform ROAS on 25% margin is underwater; a client at 1.8 platform ROAS on 70% margin is fine. Add the margin-negative-but-not-zero-order spend to the client's at-risk total.
5. **Compute spend-at-risk per client and rank the roster.** Spend-at-risk = zero-return leak (rule 3) + margin-negative over-target spend (rule 4), expressed as **contribution dollars at risk**. Rank **clients** by this number, descending. This ranking — not spend, not platform ROAS — is the week's worklist.
6. **Apply the vetoes**, assign each ranked client a status, a top-leak label, an owner, and a recheck date.

## Manual Workflow

1. Pull the per-client exports above for the last 7 days and the prior 7 (use 14/14 for low-volume accounts), tagging every row with its client.
2. For each client, run the tracking gate (rule 1). Any client over the drift threshold is marked **BLIND** and set aside for a FIX action — do not rank it.
3. For each surviving client, tag learning-phase and sub-300-click spend so it does not count toward at-risk.
4. For each client, build the zero-return leak total (rule 3) and the margin-negative over-target total (rule 4), using **that client's** target and margin.
5. Sum each client's spend-at-risk and sort the roster descending.
6. Paste the prompt below with your per-client tables.
7. Pressure-test every KILL/REFRESH against the veto list, then convert the ranked roster into an action packet — one row per client, with owner and recheck date — for the Monday standup.

## Copy-Paste Prompt

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

## Decision Rules

These run per client, then drive the roster ranking. Every recommendation carries a **number, source, time window, and confidence level** — an unsourced rank is not actionable across a roster.

- **KILL** (top leak label) — the client's spend-at-risk is dominated by a clean zero-return leak: spend ≥ 1.5× that client's target CPA, 0 commerce-attributed orders, ≥300 clicks, mature, no stock/promo veto. The client ranks high and the owner has an obvious first move.
- **REFRESH** — the client's at-risk spend is driven by over-target margin-negative campaigns where the audience/offer is still viable (fatigue or landing/offer mismatch), not zero-order dead weight. Recoverable with creative/LP work.
- **WATCH** — directional only: the client's apparent waste sits in learning-phase, sub-300-click, or promo-polluted spend, so the number isn't yet safe to act on.
- **KEEP** — the client is inside its target CPA/MER band **and** contribution-positive at its real margin; little to no spend at risk. It does not need the team's hours this week.
- **FIX** (BLIND clients) — tracking drift, missing COGS, or a feed/stock block prevents a safe rank. The action is to fix attribution, not to move budget.

## Veto Rules

- Do **not** rank or KILL a client on platform ROAS alone — require commerce-side orders and that client's real margin.
- Do **not** count a client's learning-phase or sub-300-click spend toward its spend-at-risk.
- Do **not** rank a client that failed its tracking gate — mark it **BLIND** and FIX, never treat a blind client as clean or estimate its orders.
- Do **not** rank or scale a client during or immediately after a promo window — promo inflates ROAS and borrows future demand, distorting the roster order.
- Do **not** recommend scaling any client into less than its minimum days of stock cover.
- Do **not** apply one roster-wide target or margin — every client is judged against its own.
- Do **not** pause, shift budget, or edit anything in any client account without an explicit human approval step.

## Output Contract

A table ranked by **contribution at risk**, one row per client (BLIND clients listed separately):

| Client | Platform spend (7d) | Commerce orders | Real ROAS @ margin | Spend at risk | Top leak | Status | Owner |
|---|---|---|---|---|---|---|---|
| Northwind Outfitters | $18,400 | 214 | 1.1 @ 32% | $6,200 | Meta prospecting margin-negative | REFRESH | Priya |

## Worked Example

> **Executive read:** Across the roster, $19.6k of contribution is at risk this week, and it is heavily concentrated — Lumen Skincare alone accounts for nearly half of it from a single zero-order Meta retargeting leak, so it gets the first hour Monday. Harborline Pet is the bigger trap: it looks healthy at 2.4 platform ROAS but is underwater at its 24% margin, so the team should rebuild creative, not celebrate. Brightwood Coffee is BLIND on a 31% GA4-vs-store drift and must be fixed before it can be ranked at all.

| Client | Platform spend (7d) | Commerce orders | Real ROAS @ margin | Spend at risk | Top leak | Status | Owner |
|---|---|---|---|---|---|---|---|
| Lumen Skincare | $14,250 | 96 | 0.7 @ 58% | $8,900 | Meta retargeting, 0 orders on $3.1k | KILL | Devin |
| Harborline Pet Co. | $9,870 | 188 | 0.9 @ 24% | $5,300 | Prospecting margin-negative at 2.4 platform ROAS | REFRESH | Priya |
| Cedar & Field Home | $6,540 | 71 | 1.3 @ 41% | $3,100 | Google Shopping over-target, CTR fading | REFRESH | Marco |
| Aria Activewear | $11,200 | 247 | 2.6 @ 49% | $1,300 | Mostly in-band; one TikTok adset in learning | WATCH | Marco |
| Brightwood Coffee | $4,980 | 52 (GA4 says 74) | unsafe | — | 31% GA4↔store drift | BLIND / FIX | Devin |

Note how the ranking *inverts* the platform view: Harborline's 2.4 platform ROAS would look like the roster's winner, but at its real 24% margin it is the second-biggest leak. Brightwood never enters the ranking — its number is an attribution artifact, so the honest move is to set it aside as BLIND rather than send a buyer to "fix spend" that may not be wasted at all.

## Common Failure Modes

- Ranking clients by spend or platform ROAS instead of by contribution at risk — the loudest account is rarely the leakiest.
- Applying one roster-wide target/margin and mis-ranking every client whose economics differ.
- Treating a BLIND (tracking-drift) client as clean and sending the team to "fix spend" that isn't actually wasted.
- Letting a client's learning-phase or promo-window spend inflate its at-risk number and jump it up the roster.
- Crossing client windows/timezones in the manual join, so one account's weekend bleeds into another's ranking.
- Calling a promo-window ROAS spike a "healthy" client when it just pulled demand forward.

## Run This Play With Live Data

**Manual version:** export three-to-five CSVs **per client**, align every client's window and timezone, reconcile each platform's conversions against each store's real orders, bolt on each client's own margin, then rank the roster — every single Monday, multiplied by your client count.

**ShopMCP version:** connect each client's Meta, Google, TikTok, and store once. Ask the question; ShopMCP pulls live spend, real commerce orders, and per-client margin across your **whole roster at once**, runs the tracking gate per client, marks the BLIND ones, computes each client's contribution-at-risk, and returns the ranked KILL/REFRESH/WATCH/KEEP/FIX roster packet your AM takes into standup. It stays **read-only** until you explicitly approve a change in any client account.

> Running the single-store Wasted Spend Killer twelve times by hand is the wall every agency hits. ShopMCP *is* the connection to every client at once — and the same playbook then runs in one prompt instead of a Monday-morning spreadsheet marathon.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Roster Wasted-Spend Rollup play for the last 7 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Repeating the same five-CSV export N times, once per client.
- Keeping every client's window, timezone, target, and margin straight in one spreadsheet.
- Reconciling each platform's claimed conversions against each store's real orders, client by client.
- Re-deciding every Monday which client's evidence is even safe enough to rank.
