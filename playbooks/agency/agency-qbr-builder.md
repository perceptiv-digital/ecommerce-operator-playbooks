---
schema_version: 1
slug: "agency-qbr-builder"
title: "Client QBR Builder"
summary: "Client QBR Builder helps ecommerce operators answer: What goes in this client's quarterly business review?"
operating_question: "What goes in this client's quarterly business review?"
short_title: "QBR Builder"
primary_persona: "agency"
personas: ["agency", "marketing"]
category: "agency-portfolio"
platforms: ["commerce", "google-analytics-4", "meta-ads", "google-ads", "klaviyo"]
cadence: "ad-hoc"
difficulty: "intermediate"
manual_time_minutes_min: 60
manual_time_minutes_max: 120
shopmcp_time_minutes_min: 5
shopmcp_time_minutes_max: 12
decision_type: "client-action-packet"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/agency-qbr-builder"
shopmcp_prompt: "Run the Client QBR Builder play for the last quarter. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Client QBR Builder

## Operating Question

**For this client, what actually goes in the quarterly business review — the results against the targets we agreed last quarter, the three genuine wins, the three honest misses with their real cause, and a next-quarter plan with the budget asks — assembled so it survives the client's CFO reading it line by line?**

A QBR is not a victory lap and it is not a data dump. It is the single meeting each quarter where the client decides whether the relationship is worth what they pay for it. The job of this play is to turn a quarter of scattered data into a **board-ready packet**: every headline metric shown against the target you both agreed to at the *last* QBR, the wins and misses stated with defensible cause, an honest line on what was your work versus what was the market, and a forward plan the client can approve budget against. The discipline is brutal honesty wearing a calm voice — you surface the misses before the client does, you separate agency-driven movement from seasonality and market, and you never lead with a vanity revenue number that contribution profit would contradict.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant can't see this client's Shopify orders, their GA4, their Meta and Google spend, or their Klaviyo revenue — and a QBR needs all of them reconciled into one story, against a target that lives in last quarter's deck. To build this manually you have to:

1. Pull the full quarter of commerce results — revenue, orders, AOV, new vs. returning — and the same window a quarter ago, from the store, not from a platform.
2. Bolt on **contribution profit**, because revenue without margin is the number that gets an agency fired when the client's finance team finally runs it.
3. Reconcile platform-claimed conversions against real orders across every ad account, so blended MER and new-customer CAC are built on store truth rather than double-counted platform numbers.
4. Pull the email/SMS revenue share and retention/repeat-rate trend from Klaviyo.
5. Dig the **targets you agreed at the last QBR** out of an old deck or email thread — because results with no target to judge against is theatre, and a QBR that quietly drops last quarter's promises is how a client stops trusting the agency.
6. Separate what your work moved from what the market, the season, or a one-off promo moved — the hardest and most important judgement in the whole packet.

Do that and it's a one-to-two-hour build per client, every quarter, and the honest cause-attribution gets skipped under time pressure exactly when it matters most. **The framing and the honesty discipline in this playbook are free. The cross-platform data access, reconciled to store truth and held against last quarter's agreed targets, is the hard part — and that is exactly what ShopMCP connects.** The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Agency Account Director / AM who runs the client relationship and owns the QBR meeting.
- **Also useful for:** Agency Founder/COO (which accounts have a defensible story and which need a save plan), Head of Performance (the paid narrative and budget asks), the client's own marketing lead (who will re-present this internally to their CFO/board).
- Run it **before** the quarterly review meeting — early enough to pressure-test the misses and rehearse the awkward lines, not the night before.

## When To Run It

- **Cadence:** ad-hoc — once per quarter per client, plus any time the relationship needs a reset (a renewal conversation, a budget-cut threat, a new stakeholder on the client side who needs the story from scratch).
- **Triggers:** quarter-end, an upcoming renewal, a budget-increase ask you need to justify, or a client who has gone quiet and needs to see the value laid out plainly.
- **Pre-requisite:** the **targets agreed at the last QBR must exist on file**, and tracking must reconcile. A QBR with no prior target is a status update, not a business review — and a QBR built on numbers that don't reconcile to the store will get torn apart the moment the client's finance team checks one figure.

## Required Evidence

- **Quarter commerce results (this quarter vs. prior quarter, vs. the same quarter last year)** — revenue, orders, AOV, and new-vs-returning split, pulled from the store, not a platform. Year-over-year matters because it separates real growth from seasonality.
- **Contribution profit** — revenue minus COGS minus the directly attributable variable costs (ad spend, shipping, transaction fees) for the quarter, blended or by product line. This is the number that judges whether the quarter actually made the client money, and it must sit beside revenue, never behind it.
- **New-customer CAC** — paid (and ideally blended) acquisition cost for *new* customers in the quarter, against target. New-customer CAC, not blended CPA, is what tells the client whether growth is getting more or less expensive.
- **Blended MER** — total revenue ÷ total ad spend across all platforms for the quarter, against target and against the prior quarter's MER. The single cleanest read on whether paid is getting more or less efficient.
- **Retention / repeat-rate** — repeat-purchase rate and email/SMS revenue share and their trend, from Klaviyo and the store. A quarter that grew revenue while retention quietly collapsed is a future problem you must name now.
- **The targets agreed at the last QBR** — the revenue, contribution, CAC, MER, and retention numbers you both signed up to last quarter. Without these, there is nothing to judge results against and the QBR has no spine.

## Optional Evidence

- **Promotion calendar for the quarter** — a big sale window inflates revenue and MER and borrows future demand; strip or footnote it before claiming the lift as structural.
- **Market / category context** — category-wide demand softness or a competitor's pricing move; the honest separation of "we did this" from "the market did this" depends on it.
- **Channel-level paid breakdown** — Meta vs. Google vs. the rest, so a blended MER move can be traced to a specific channel rather than hand-waved.
- **Scope or budget changes mid-quarter** — a budget cut, a paused channel, or a new service line that explains part of the result and reframes who owns the miss.
- **Site / CRO or merchandising changes** — a theme change, a checkout fix, or a stockout that moved CVR or AOV independent of media.
- **Last QBR's agreed action items** — what you promised to do; closing the loop on prior commitments is half of why a client trusts the next set.

## How To Pull This Evidence

- **Quarter commerce results (Shopify/Woo/BigCommerce)** — export orders for the quarter and the prior quarter (and the same quarter last year), with revenue, order count, AOV, and the new-vs-returning customer split. Pull from the store, never from an ad platform's claimed revenue.
- **Contribution profit** — start from store revenue, subtract COGS (variant **Cost per item** carries margin but is **not** in the standard orders export — pull it separately and join), then subtract quarter ad spend, shipping, and transaction fees. Blended is fine for the headline; by-product-line is stronger if you have it.
- **New-customer CAC** — pull total paid spend for the quarter from each ad platform, divide by *new* customers acquired (from the store's new-customer count), and hold it against the target. Don't let blended CPA stand in for new-customer CAC — they answer different questions.
- **Blended MER** — total revenue ÷ total ad spend across all ad platforms for the quarter; compute the prior-quarter MER the same way so the trend is apples-to-apples.
- **Retention / repeat-rate** — from Klaviyo and the store, pull repeat-purchase rate, email/SMS revenue share, and core flow performance for the quarter and its trend across the quarter's months.
- **The last QBR's targets** — dig the agreed numbers out of last quarter's deck, the engagement plan, or the email thread where they were signed off. If they genuinely don't exist, that is itself the first finding — set provisional targets this quarter so next quarter has a spine.
- **Gotcha — reconcile to store truth first:** before any of these become QBR lines, confirm platform-claimed revenue reconciles with store orders within tolerance; a blended MER built on double-counted platform conversions will not survive the client's finance team, and a QBR caught with an inflated number loses the room for the rest of the meeting.

Or skip all of this — ShopMCP assembles the QBR from live data.

## The Decision Logic (run in this order)

1. **Recover last quarter's targets before pulling a single result.** A result with no agreed target is unscoreable — you cannot say "win" or "miss" against nothing. If the targets don't exist, that's finding number one, and the QBR's main job becomes setting them for next quarter.
2. **Gate on tracking truth.** Reconcile platform-claimed revenue against store orders. If they diverge beyond ~15%, the paid metrics (MER, CAC) are **FIX**, not reportable — label them clearly and build the narrative on the commerce numbers you *can* defend, rather than presenting a figure that collapses under one question.
3. **Build the scoreboard: every metric against its agreed target.** Revenue, contribution, new-customer CAC, blended MER, retention — each shown as target vs. actual vs. variance, with a one-word read. Contribution sits beside revenue, never behind it; a revenue beat on a contribution miss is *not* a win.
4. **Separate agency-driven from market-driven, honestly.** For every win and every miss, check year-over-year and the promo/market context before claiming or disowning it. A revenue rise that matches the category's seasonal curve is not your win; a miss caused by a mid-quarter budget cut the client imposed is not your failure. Say which is which.
5. **Pick the three genuine wins and the three honest misses.** Three of each — not ten wins and zero misses (no one believes that), not a wall of caveats. Each win earns its place by being defensibly yours; each miss names its real cause and who owns the fix.
6. **Build the next-quarter plan with budget asks.** Turn the misses and the opportunities into a concrete plan — what changes, what you need (budget, scope, client-side actions), and the target each move is meant to hit. This is what the client actually approves.
7. **Apply the vetoes**, then assemble the packet: scoreboard table, wins, misses, what changed, forward plan, and a three-sentence executive read the client can repeat to their board.

## Manual Workflow

1. Recover the targets agreed at the last QBR (revenue, contribution, new-customer CAC, blended MER, retention). If none exist, note it as the headline finding and plan to set them this quarter.
2. Pull the quarter's commerce results vs. the prior quarter and the same quarter last year; bolt on contribution profit (revenue − COGS − ad spend − shipping − fees).
3. Run the tracking gate: reconcile platform-claimed revenue against store orders. Mark any paid metric that fails as FIX and exclude it from the headline claims.
4. Compute new-customer CAC and blended MER against target; pull retention/repeat-rate and email revenue share from Klaviyo.
5. Build the scoreboard table — each metric as target vs. actual vs. variance, with a read and a next-quarter move.
6. For each line, separate agency-driven from market/seasonality using year-over-year and the promo calendar; pick the three genuine wins and three honest misses.
7. Paste the prompt below with your scoreboard and context.
8. Pressure-test every win against the vetoes (is it really yours? does contribution agree?), turn the misses into a forward plan with budget asks, and assemble the board-ready packet with the executive read on top.

## Copy-Paste Prompt

```text
You are my agency account director assembling a client's Quarterly Business Review (QBR).

GOAL: turn this client's quarter of data into a board-ready QBR packet: results against the
targets we agreed at the LAST QBR, the 3 genuine wins, the 3 honest misses with defensible
cause, an honest split of agency-driven vs market/seasonality, and a next-quarter plan with
budget asks. Client-safe, defensible, no over-claiming.

I will paste: this quarter's commerce results (revenue, orders, AOV, new vs returning),
contribution profit, new-customer CAC, blended MER, retention/repeat-rate and email revenue
share, the prior quarter and same-quarter-last-year figures, and the TARGETS we agreed at the
last QBR. I'll add promo calendar and market context where I have them. Some data may be missing.

PRE-FLIGHT: First list which inputs I provided vs. missing. If the quarter's commerce results
or the targets agreed at the last QBR are missing, STOP and ask for them — never present results
without a target to judge against.

RULES:
- Tracking gate first: if platform-claimed revenue and store orders diverge >15%, mark the
  affected paid metrics (MER, CAC) as FIX and do NOT present them as headline results.
- Show every metric against its agreed target: target vs actual vs variance, with a one-word read.
- Contribution profit sits BESIDE revenue, never behind it. A revenue beat on a contribution
  miss is not a win — say so.
- Separate agency-driven from market/seasonality for every win and miss: check year-over-year
  and promo context before claiming a win or disowning a miss. Label what's yours vs the market.
- Pick exactly 3 genuine wins and 3 honest misses. Surface the misses plainly — never bury them.
- New-customer CAC, not blended CPA, judges whether growth is getting more or less expensive.
- Build a next-quarter plan with concrete budget asks, each tied to a target it should hit.
- Every line must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data or
  over-claim a result you can't defend.

RETURN:
1. A 3-sentence executive read the client can repeat to their board.
2. A scoreboard table using exactly this header row:
   | Metric | Q target | Q actual | vs target | Read | Next-quarter move |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. The 3 genuine wins (each labelled agency-driven vs market) and the 3 honest misses (each
   with real cause and who owns the fix).
4. The next-quarter plan with budget asks, each tied to a target.
5. What evidence is blocked or unreconciled and what you'd need to make it reportable.
```

## Decision Rules

- **KEEP** — a metric that hit or beat its agreed target *and* holds up at contribution (a revenue beat that's also contribution-positive). Report it as a genuine win and say plainly it's working.
- **WATCH** — a metric near its target, or a result polluted by a promo window or a small-sample month, where the trend is unclear. Footnote the distortion and re-read on a clean window before claiming or disowning it.
- **REFRESH** — a metric that missed because of something fixable and agency-owned (creative fatigue, a flow that lapsed, a landing-page mismatch). It becomes a next-quarter move with a specific owner.
- **FIX** — a metric that can't be reported because tracking doesn't reconcile to store orders, COGS is missing so contribution can't be computed, or no target was ever agreed. Naming the gap is the action; never present a FIX metric as a result.
- **KILL** — a tactic, channel, or line of spend the quarter proved is structurally unprofitable at real margin (not just platform ROAS). It exits the plan, and the budget moves to a move with a defensible target.
- Every line must carry a **number, source, time window, and confidence level** — a "win" without all four is a claim, not a result, and a client's CFO will find the difference.

## Veto Rules

- **Never present a result without the target it's judged against.** Results with no agreed target are a status update, not a business review — recover the target or set one, but don't fake the comparison.
- **Never claim causality you can't defend.** "We grew revenue 30%" when the category grew 28% is not your win. Check year-over-year and market context before attaching your name to a number.
- **Never blur agency impact into market or seasonality.** Separate what your work moved from what the season, the market, or a one-off promo moved — in both directions, for wins and for misses.
- **Never lead with vanity revenue without contribution.** A revenue beat sitting on a contribution miss is the number that gets an agency fired one quarter later; show contribution beside revenue, every time.
- **Never present an unreconciled or partial number as a clean result.** Label partial-data and FIX metrics as exactly that — a QBR caught with one inflated figure loses the room for every figure after it.
- **Never over-claim or hide the misses.** A QBR with three wins and zero misses is not believed; surface the misses yourself, with their real cause, before the client raises them.
- **Never let the packet trigger a budget shift, scope change, or pause** without an explicit human-approved decision in the meeting.

## Output Contract

A board-ready QBR packet: a scoreboard table of every headline metric against its agreed target, then the three wins, three misses, what changed, and the next-quarter plan — topped with a three-sentence executive read.

Minimum scoreboard columns:

| Metric | Q target | Q actual | vs target | Read | Next-quarter move |
|---|---|---|---|---|---|
| Revenue | $1.20M | $1.31M | +9% | KEEP | Hold spend; protect margin |

## Worked Example

> **Executive read:** Wrenfield Coffee Roasters cleared its revenue target by 9% and held contribution profit slightly ahead of plan, so the quarter made money rather than just moving it. The real win was new-customer CAC dropping to $34 against a $40 target on the back of the new creative system, while the honest miss was repeat-purchase rate slipping to 22% against a 27% target — a retention problem that the next quarter's lifecycle build is designed to fix. Blended MER and email revenue share both landed close to plan, so the forward ask is a modest paid increase funded by the proven CAC, paired with a retention sprint rather than more top-of-funnel.

| Metric | Q target | Q actual | vs target | Read | Next-quarter move |
|---|---|---|---|---|---|
| Revenue | $1.20M | $1.31M | +9% | **KEEP** | Hold spend; protect contribution, don't chase top line |
| Contribution profit | $384k | $401k | +4% | **KEEP** | Maintain margin floor; review shipping cost creep |
| New-customer CAC | $40 | $34 | −15% (better) | **KEEP** | Scale the winning creative system; reinvest the headroom |
| Blended MER | 3.4 | 3.2 | −6% | **WATCH** | Read on a clean (non-promo) window; trace to channel |
| Repeat-purchase rate | 27% | 22% | −5pts (worse) | **REFRESH** | Build post-purchase + winback flows (lifecycle sprint) |
| Email/SMS revenue share | 28% | 26% | −2pts | **WATCH** | Lapsed deliverability check; re-warm the sending domain |

The packet inverts the lazy read: the headline revenue beat is real but the quarter's genuine story is *cheaper acquisition funding a retention problem* — and the forward plan spends the CAC win on fixing repeat rate rather than declaring victory on revenue.

## Common Failure Modes

- Presenting results with no agreed target, so "win" and "miss" are just vibes the client can dispute.
- Leading with a revenue beat that contribution profit quietly contradicts — the number that gets the agency fired a quarter later.
- Claiming a market- or season-driven rise as the agency's own work (and, just as often, disowning a self-inflicted miss as "the market").
- Showing ten wins and zero misses — a packet no client's CFO believes for a second.
- Reporting a blended MER or CAC built on platform-claimed revenue that never reconciled to store orders.
- Using blended CPA in place of new-customer CAC, so nobody can tell whether growth got more or less expensive.
- A next-quarter "plan" with no budget asks and no targets — a wish list the client can't approve against.

## Run This Play With Live Data

**Manual version:** for one client, export the quarter's commerce results and the prior quarter and the same quarter last year, bolt on contribution, reconcile every ad platform to store orders, compute new-customer CAC and blended MER and retention, dig last quarter's targets out of an old deck, separate your work from the market by hand, and assemble the whole packet — one to two hours, every quarter, per client.

**ShopMCP version:** connect the client's store, ad platforms, GA4, and Klaviyo once. Ask the question; ShopMCP pulls the live quarter against the prior quarter and year-over-year, computes contribution profit, new-customer CAC, blended MER, and retention against the targets on file, runs the tracking gate so the paid numbers reconcile to store truth, separates the promo- and season-driven movement, and returns the scoreboard, the three wins, the three honest misses, and a next-quarter plan with budget asks. It stays **read-only**: every budget shift, scope change, or client commitment is decided by you in the room, not by the tool.

> No live line into this client's commerce, ads, GA4, and Klaviyo inside your AI assistant is the wall every manual QBR build hits — which is why the honest cause-attribution and the contribution check are the first things skipped under deadline. ShopMCP *is* that connection, reconciled to store truth and held against last quarter's agreed targets, so the same playbook runs in one prompt instead of a one-to-two-hour build — and you walk into the review with a packet that survives the CFO reading it line by line.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Client QBR Builder play for this client for the last quarter. Show every headline metric
against the targets we agreed at the last QBR, separate agency-driven from market/seasonality,
give me 3 genuine wins and 3 honest misses, and a next-quarter plan with budget asks. Keep it
read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- The one-to-two-hour per-client packet build, every quarter.
- Reconciling every ad platform against store orders by hand before any number is reportable.
- Digging last quarter's agreed targets out of an old deck to have something to judge against.
- Bolting contribution profit onto revenue, and separating agency impact from market and season, under deadline pressure.
