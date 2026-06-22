---
schema_version: 1
slug: "agency-scope-creep-watch"
title: "Retainer Scope-Creep Watch"
summary: "Retainer Scope-Creep Watch helps ecommerce operators answer: Which clients are consuming more work than their retainer covers?"
operating_question: "Which clients are consuming more work than their retainer covers?"
short_title: "Scope-Creep Watch"
primary_persona: "agency"
personas: ["agency"]
category: "agency-portfolio"
platforms: ["commerce"]
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/agency-scope-creep-watch"
shopmcp_prompt: "Run the Retainer Scope-Creep Watch play for the last month. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Retainer Scope-Creep Watch

## Operating Question

**Which clients are consuming more work than their retainer covers — badly enough that I should rescope, raise, or offboard them?**

This is the play that protects **your own** margin, not a client's store. Every agency carries one or two engagements that have quietly slid underwater: the retainer was set eighteen months ago, the client added two more stores and a third ad platform, the Slack channel never sleeps, and nobody re-priced any of it. The account "feels heavy," but feeling is not a number you can take to a renewal conversation. This play turns logged effort, retainer value, and account complexity into a single defensible **effective hourly rate** per client, compares it to your target rate at blended cost, and forces a **KILL / REFRESH / WATCH / KEEP / FIX** call on each engagement — ranked by margin you're leaking, not by how loud the client is.

The evidence here is **your internal data** — time tracking, retainer fees, blended cost rate — with store-platform signals (campaign count, SKU count, store count) used only to *explain* and *forecast* workload, never to judge the client's performance.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Harvest timesheets, your contract values in the CRM, or how many live campaigns and SKUs each client's account actually carries. To answer this manually you have to:

1. Export logged hours **per client** from your time-tracking tool for a representative window (last full month, ideally last quarter).
2. Pull each client's current **retainer fee** from contracts or your billing system — not the proposal number, the number you actually invoice.
3. Pull **account-complexity signals** (number of live campaigns, SKUs, connected stores, ad platforms) to separate a genuinely heavy account from a disorganized one.
4. Settle on a **blended cost rate** for the people doing the work, so "effective rate" means margin and not revenue.
5. Join all four, compute an effective rate per client, and rank by contribution lost.

**The thinking in this playbook is free. The data access is the hard part — and that is exactly what ShopMCP connects.** ShopMCP can surface the store-side complexity signals (campaigns, SKUs, store count, platform spread) live, so the only thing you supply by hand is the effort and the money: hours, retainer, and your cost rate. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Agency Owner / Managing Director — this is a P&L decision, not a delivery one.
- **Also useful for:** Head of Operations / Delivery Lead (capacity planning), Finance (margin and renewal pricing), Account Directors (who needs a rescope conversation).
- Run it **before** quarterly renewals, before you sign the next new client (so you know your real capacity), and whenever a delivery lead says an account "feels heavy."

## When To Run It

- **Cadence:** monthly — first week of the month, once the prior month's timesheets are closed and approved.
- **Triggers:** an upcoming renewal, a client adding a store / platform / product line, a team member flagging burnout on a specific account, a quarter where utilization is high but profit is flat.
- **Pre-requisite:** time tracking must actually be logged against clients. If your team bills in lumps or logs "admin" with no client tag, **fix the timesheets first** — this play is only as honest as the hours behind it. A month of clean data beats a quarter of guesses.

## Required Evidence

- **Logged hours per client** — total tracked hours for the window, ideally split by role (strategist, buyer, designer, AM) so you can apply the right cost rate. Last full month minimum; last quarter is more stable.
- **Retainer fee per client** — the monthly amount you actually invoice (exclude pass-through ad spend and one-off project fees; this is the recurring services fee only).
- **Blended cost rate** — your fully-loaded cost per hour of delivery time (salaries + overhead ÷ billable hours), *not* your sell rate. This is what turns effective rate into margin.
- **Target effective rate** — the rate an engagement must clear to be healthy for your agency (commonly your sell rate minus an acceptable margin, or a hard floor you've set).

## Optional Evidence (changes the answer when present)

- **Account-complexity signals** — number of live campaigns, SKUs, connected stores, and ad platforms per client. High complexity *justifies* high hours (so the fix is a price raise, not a workload cut); low complexity with high hours points at scope creep or process waste.
- **Engagement age & stage** — onboarding and launch months are legitimately heavy; a 3-year-old account at the same hours is not.
- **Strategic value** — marquee logo, case-study potential, referral engine, or a planned upsell. A loss-leader can be intentional — flag it, don't auto-cut it.
- **Out-of-scope request log** — ad-hoc asks the client made outside the SOW. Direct evidence of creep, and ammunition for the rescope conversation.
- **Contract terms** — notice period, included deliverables, and any hours cap, so a recommendation is actionable rather than aspirational.

## How To Pull This Evidence

- **Time-tracking export per client** — from Harvest / Toggl / ClickUp / Clockify, export tracked hours by client for the window, split by team member or role. This is the load-bearing input; without it you cannot judge engagement profitability.
- **Retainer value** — pull the current recurring services fee from your contracts folder or billing system (Stripe, QuickBooks, Xero). Use the invoiced number, not the original proposal.
- **Account-complexity signals** — count live campaigns, SKUs, connected stores, and ad platforms per client from the store/ad accounts you manage; these explain *why* hours are high and forecast where they go next.
- **Blended cost rate** — compute fully-loaded delivery cost per hour (team cost + overhead ÷ billable hours) once; reuse it across all clients so effective rates are comparable.
- **Gotchas:** time-tracking compliance is uneven — an account can look "cheap" only because nobody logged against it; cross-check against headcount memory. Don't double-count pass-through ad spend as agency revenue (it inflates the retainer and hides the leak). A single role's cost rate flatters or punishes the wrong account — blend it, or split hours by role. And a heavy onboarding month will make a healthy account look underwater if you pick the wrong window.
- Or skip all of this — ShopMCP surfaces account complexity and workload signals automatically.

## The Decision Logic (run in this order)

1. **Gate on effort data.** If logged hours or the retainer fee is missing for a client, set that client to **FIX** and stop there. You cannot judge engagement profitability without effort data — never estimate hours from "feel."
2. **Compute the effective rate.** Effective rate = retainer ÷ logged hours, costed at your **blended** cost rate. A client at $6,000/mo and 40 logged hours is running at $150/hr; the same client at 80 hours is at $75/hr. Always carry both the rate and the hours behind it.
3. **Compare to target at margin.** Flag any engagement whose effective rate falls **below your target rate** (or, harder, below your blended cost — that engagement is losing money on every hour). Rank the underwater clients by *contribution lost per month*, not by retainer size.
4. **Explain the load with complexity.** Overlay campaign / SKU / store / platform counts. High hours + high complexity → the work is real → the fix is a **price raise or rescope**, not "do less." High hours + low complexity → process waste or scope creep → the fix is **tighten scope / change ways of working**.
5. **Check the window.** Strip out onboarding, launch, migration, or peak-season months before calling an account underwater — a one-month spike is not a trend. Require the pattern to hold across the window.
6. **Apply the vetoes**, then assign status + owner + the specific next action (rescope / raise / offboard / keep).

## Manual Workflow

1. Export logged hours per client for the last full month (last quarter for a steadier read), split by role where you can.
2. Pull each client's current invoiced retainer and your blended cost rate.
3. Compute effective rate per client and the margin per hour at blended cost.
4. Overlay complexity signals (campaigns, SKUs, stores, platforms) to label each heavy account as "real work" vs. "scope creep / waste."
5. Strip onboarding/launch/peak months out of the judgment window.
6. Paste the prompt below with your table.
7. Pressure-test every KILL/raise against the veto list, then convert survivors into an internal action packet with owner and a recheck date. Keep it internal.

## Copy-Paste Prompt

```text
You are my agency-operations analyst running the "Retainer Scope-Creep Watch" play.
This is an INTERNAL margin review of MY agency's engagements — not a review of any
client's store performance.

GOAL: decide which client engagements to KILL (offboard), REFRESH (rescope/renegotiate),
WATCH, KEEP, or FIX, ranked by agency margin lost per month — based on logged effort vs.
retainer, not on how demanding the client feels.

I will paste: logged hours per client for the window, each client's monthly retainer,
my blended cost rate, my target effective rate, and (optionally) account-complexity
signals (campaigns, SKUs, stores, platforms) and engagement age. Some data may be missing.

RULES:
- PRE-FLIGHT: First list which inputs I provided vs. missing. If logged hours or the
  retainer fee is missing for a client, mark that client FIX and exclude it from the
  ranking — never estimate hours from feel.
- Effective rate = retainer / logged hours. Always cost it at my BLENDED cost rate, not a
  single person's rate, and state the hours behind every rate.
- Flag a client only when its effective rate is below my target rate across the window.
  Below blended cost = losing money every hour; rank these first.
- Rank underwater clients by contribution lost per month, not by retainer size.
- Overlay complexity: high hours + high complexity = real work, recommend RAISE/RESCOPE;
  high hours + low complexity = scope creep/process waste, recommend tighten-scope.
- Do not judge on one heavy month: strip onboarding, launch, migration, and peak-season
  months out of the window before calling anything underwater.
- A marquee logo or strategic loss-leader may be intentional — flag it, never auto-cut it.
- Every row must carry: a number, its source, the time window, and a confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read of where my margin is leaking.
2. A ranked table using exactly this header row:
   | Client | Retainer/mo | Hours/mo | Effective rate | vs target rate | Complexity | Status | Action | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation (window, strategic value, data gaps).
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.

Keep this internal — it is not client-facing language.
```

## Decision Rules (with numbers)

- **KILL (offboard)** — effective rate **below blended cost** across the full window, low strategic value, and complexity confirms the work is genuinely heavy (i.e. it won't get cheaper). You are paying to keep this client.
- **REFRESH (rescope / raise)** — effective rate **below target but above cost**, driven by real, complexity-justified work. The engagement is viable at the right price — take a rescope or raise to renewal.
- **WATCH** — directional only: a single heavy month, an onboarding/launch/migration window, thin or non-compliant timesheets, or a borderline rate that needs another month to confirm.
- **KEEP** — effective rate **at or above target** at blended cost, with hours proportionate to complexity. Healthy; leave it alone.
- **FIX** — logged hours or retainer missing, timesheets not tagged to the client, or pass-through spend polluting the retainer number. Repair the data before judging.
- Every recommendation carries a **number, source, time window, and confidence level.**

## Veto Rules

- Do **not** judge an engagement on one heavy month — onboarding, launch, migration, and peak-season spikes are legitimate and temporary. Require the pattern across the window.
- Do **not** auto-cut a strategic loss-leader or marquee logo — referral engines, case studies, and planned upsells can justify a sub-target rate. Flag it for a human decision, don't kill it on the number alone.
- Do **not** compute effective rate on a sell rate or a single senior's rate — it must use your **blended cost** rate, or the margin call is wrong.
- Do **not** treat thin / non-compliant timesheets as low hours — an account that looks cheap may just be under-logged. Mark it FIX, not KEEP.
- Do **not** count pass-through ad spend as agency revenue — it inflates the retainer and hides the leak.
- Do **not** turn this into client-facing language. This is an internal margin read; the rescope conversation is a separate, deliberate step.

## Output Contract

A table ranked by **agency margin lost per month**, not by retainer size:

| Client | Retainer/mo | Hours/mo | Effective rate | vs target rate | Complexity | Status | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Northwind Outdoors | $5,500 | 78 | $71/hr | −43% | 3 stores, 2 platforms | REFRESH | Rescope at renewal | Owner + AD | 30 days |

## Worked Example

> **Executive read:** Two of six engagements are dragging agency margin. Lumen Skincare is the clean problem — $4,500/mo against 96 logged hours is a $47/hr effective rate, well below our $95 blended cost, so we lose money on every hour and complexity confirms it won't get lighter; that's a rescope-or-offboard at renewal. Harbor & Co looks underwater at $82/hr but it's a launch month and a referral source, so it gets flagged, not cut.

Target effective rate: **$130/hr**. Blended cost rate: **$95/hr** (anything below this loses money).

| Client | Retainer/mo | Hours/mo | Effective rate | vs target rate | Complexity | Status | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Lumen Skincare | $4,500 | 96 | $47/hr | −64% | 1 store, heavy creative | KILL | Offboard or 2x retainer at renewal | Owner + AD | renewal |
| Northwind Outdoors | $5,500 | 78 | $71/hr | −45% | 3 stores, 2 platforms | REFRESH | Rescope at renewal | Owner + AD | 30 days |
| Harbor & Co | $6,000 | 73 | $82/hr | −37% | launch month | WATCH | Recheck post-launch | AD | 30 days |
| Birchwood Home | $7,200 | 52 | $138/hr | +6% | 1 store, simple | KEEP | Leave alone | AM | 90 days |
| Vela Activewear | $9,000 | 41 | $220/hr | +69% | 1 store, underloaded | KEEP | Capacity to upsell | AM | 30 days |
| Crest Pet Co | $3,000 | — | — | — | — | FIX | Fix timesheets | Ops | 7 days |

Lumen and Northwind look fine on revenue — they're mid-pack retainers — but on effort they're the two leaking accounts: Lumen below cost, Northwind below target with real complexity to point at. Vela, the largest logo, is the opposite: it's *underloaded* at $220/hr, which is its own signal — there's room to deepen scope and grow the account rather than leave that margin on the table.

## Common Failure Modes

- Judging an engagement by how demanding the client *feels* instead of by logged hours and rate.
- Computing effective rate on a sell rate or one senior's rate, so the "margin" isn't margin at all.
- Calling an onboarding or launch month underwater and offboarding a client who'd have been fine by month three.
- Treating an under-logged account as a cheap one and quietly subsidizing it.
- Letting pass-through ad spend inflate the retainer and mask the leak.
- Auto-cutting a strategic loss-leader that was carrying referrals or a case study.
- Walking the rescope number straight into a client call instead of deciding internally first.

## Run This Play With Live Data

**Manual version:** export per-client timesheets, pull every retainer, settle a blended cost rate, count campaigns and SKUs and stores by hand, join it all in a spreadsheet, and recompute effective rates — every month, before every renewal.

**ShopMCP version:** connect the stores and ad accounts you manage once. ShopMCP surfaces the **account-complexity and workload signals** (campaigns, SKUs, connected stores, platform spread) live, so you supply only the effort and money it can't see — logged hours, retainer, and your cost rate. Ask the question; it computes the effective rate per client, applies the target-vs-cost gate, strips the noisy windows, overlays complexity, and returns the ranked KILL/REFRESH/WATCH/KEEP/FIX packet. It stays **read-only** — this is an internal margin read, never a client-facing artifact, and it never changes anything in your accounts.

> No live line into the stores and ad accounts you manage? That's the wall every manual run hits — you end up counting campaigns and SKUs by hand. ShopMCP *is* that connection, so the complexity half of the answer fills itself in and the play runs in one prompt instead of a spreadsheet afternoon.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Retainer Scope-Creep Watch play for the last month. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Hand-counting campaigns, SKUs, stores, and platforms per client every month.
- Re-joining timesheets, retainers, and complexity in a fresh spreadsheet each renewal cycle.
- Guessing whether a heavy account is real work or scope creep.
- Rebuilding the same effective-rate model from scratch every time you re-price.
