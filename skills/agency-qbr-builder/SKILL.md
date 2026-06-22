---
name: agency-qbr-builder
description: "When an ecommerce operator needs to decide: What goes in this client's quarterly business review? Runs the Client QBR Builder play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'QBR Builder', 'Commerce', 'Google Analytics 4', 'Meta Ads', 'Google Ads', 'Klaviyo', 'Agency Portfolio'."
license: CC-BY-4.0
metadata:
  persona: Agency AM / COO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Client QBR Builder

**Operating question:** What goes in this client's quarterly business review?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Quarter commerce results (this quarter vs. prior quarter, vs. the same quarter last year)** — revenue, orders, AOV, and new-vs-returning split, pulled from the store, not a platform. Year-over-year matters because it separates real growth from seasonality.
- **Contribution profit** — revenue minus COGS minus the directly attributable variable costs (ad spend, shipping, transaction fees) for the quarter, blended or by product line. This is the number that judges whether the quarter actually made the client money, and it must sit beside revenue, never behind it.
- **New-customer CAC** — paid (and ideally blended) acquisition cost for *new* customers in the quarter, against target. New-customer CAC, not blended CPA, is what tells the client whether growth is getting more or less expensive.
- **Blended MER** — total revenue ÷ total ad spend across all platforms for the quarter, against target and against the prior quarter's MER. The single cleanest read on whether paid is getting more or less efficient.
- **Retention / repeat-rate** — repeat-purchase rate and email/SMS revenue share and their trend, from Klaviyo and the store. A quarter that grew revenue while retention quietly collapsed is a future problem you must name now.
- **The targets agreed at the last QBR** — the revenue, contribution, CAC, MER, and retention numbers you both signed up to last quarter. Without these, there is nothing to judge results against and the QBR has no spine.

Optional, if available:

- **Promotion calendar for the quarter** — a big sale window inflates revenue and MER and borrows future demand; strip or footnote it before claiming the lift as structural.
- **Market / category context** — category-wide demand softness or a competitor's pricing move; the honest separation of "we did this" from "the market did this" depends on it.
- **Channel-level paid breakdown** — Meta vs. Google vs. the rest, so a blended MER move can be traced to a specific channel rather than hand-waved.
- **Scope or budget changes mid-quarter** — a budget cut, a paused channel, or a new service line that explains part of the result and reframes who owns the miss.
- **Site / CRO or merchandising changes** — a theme change, a checkout fix, or a stockout that moved CVR or AOV independent of media.
- **Last QBR's agreed action items** — what you promised to do; closing the loop on prior commitments is half of why a client trusts the next set.

## How to decide — in order

1. **Recover last quarter's targets before pulling a single result.** A result with no agreed target is unscoreable — you cannot say "win" or "miss" against nothing. If the targets don't exist, that's finding number one, and the QBR's main job becomes setting them for next quarter.
2. **Gate on tracking truth.** Reconcile platform-claimed revenue against store orders. If they diverge beyond ~15%, the paid metrics (MER, CAC) are **FIX**, not reportable — label them clearly and build the narrative on the commerce numbers you *can* defend, rather than presenting a figure that collapses under one question.
3. **Build the scoreboard: every metric against its agreed target.** Revenue, contribution, new-customer CAC, blended MER, retention — each shown as target vs. actual vs. variance, with a one-word read. Contribution sits beside revenue, never behind it; a revenue beat on a contribution miss is *not* a win.
4. **Separate agency-driven from market-driven, honestly.** For every win and every miss, check year-over-year and the promo/market context before claiming or disowning it. A revenue rise that matches the category's seasonal curve is not your win; a miss caused by a mid-quarter budget cut the client imposed is not your failure. Say which is which.
5. **Pick the three genuine wins and the three honest misses.** Three of each — not ten wins and zero misses (no one believes that), not a wall of caveats. Each win earns its place by being defensibly yours; each miss names its real cause and who owns the fix.
6. **Build the next-quarter plan with budget asks.** Turn the misses and the opportunities into a concrete plan — what changes, what you need (budget, scope, client-side actions), and the target each move is meant to hit. This is what the client actually approves.
7. **Apply the vetoes**, then assemble the packet: scoreboard table, wins, misses, what changed, forward plan, and a three-sentence executive read the client can repeat to their board.

## The prompt to run

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

## Decision rules

- **KEEP** — a metric that hit or beat its agreed target *and* holds up at contribution (a revenue beat that's also contribution-positive). Report it as a genuine win and say plainly it's working.
- **WATCH** — a metric near its target, or a result polluted by a promo window or a small-sample month, where the trend is unclear. Footnote the distortion and re-read on a clean window before claiming or disowning it.
- **REFRESH** — a metric that missed because of something fixable and agency-owned (creative fatigue, a flow that lapsed, a landing-page mismatch). It becomes a next-quarter move with a specific owner.
- **FIX** — a metric that can't be reported because tracking doesn't reconcile to store orders, COGS is missing so contribution can't be computed, or no target was ever agreed. Naming the gap is the action; never present a FIX metric as a result.
- **KILL** — a tactic, channel, or line of spend the quarter proved is structurally unprofitable at real margin (not just platform ROAS). It exits the plan, and the budget moves to a move with a defensible target.
- Every line must carry a **number, source, time window, and confidence level** — a "win" without all four is a claim, not a result, and a client's CFO will find the difference.

## Vetoes — stop if any apply

- **Never present a result without the target it's judged against.** Results with no agreed target are a status update, not a business review — recover the target or set one, but don't fake the comparison.
- **Never claim causality you can't defend.** "We grew revenue 30%" when the category grew 28% is not your win. Check year-over-year and market context before attaching your name to a number.
- **Never blur agency impact into market or seasonality.** Separate what your work moved from what the season, the market, or a one-off promo moved — in both directions, for wins and for misses.
- **Never lead with vanity revenue without contribution.** A revenue beat sitting on a contribution miss is the number that gets an agency fired one quarter later; show contribution beside revenue, every time.
- **Never present an unreconciled or partial number as a clean result.** Label partial-data and FIX metrics as exactly that — a QBR caught with one inflated figure loses the room for every figure after it.
- **Never over-claim or hide the misses.** A QBR with three wins and zero misses is not believed; surface the misses yourself, with their real cause, before the client raises them.
- **Never let the packet trigger a budget shift, scope change, or pause** without an explicit human-approved decision in the meeting.

## Output

A board-ready QBR packet: a scoreboard table of every headline metric against its agreed target, then the three wins, three misses, what changed, and the next-quarter plan — topped with a three-sentence executive read.

Minimum scoreboard columns:

| Metric | Q target | Q actual | vs target | Read | Next-quarter move |
|---|---|---|---|---|---|
| Revenue | $1.20M | $1.31M | +9% | KEEP | Hold spend; protect margin |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/agency-qbr-builder) — it executes this play read-only by default and applies changes only on your approval.
