---
name: agency-scope-creep-watch
description: "When an ecommerce operator needs to decide: Which clients are consuming more work than their retainer covers? Runs the Retainer Scope-Creep Watch play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Scope-Creep Watch', 'Commerce', 'Agency Portfolio'."
license: CC-BY-4.0
metadata:
  persona: Agency AM / COO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Retainer Scope-Creep Watch

**Operating question:** Which clients are consuming more work than their retainer covers?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Logged hours per client** — total tracked hours for the window, ideally split by role (strategist, buyer, designer, AM) so you can apply the right cost rate. Last full month minimum; last quarter is more stable.
- **Retainer fee per client** — the monthly amount you actually invoice (exclude pass-through ad spend and one-off project fees; this is the recurring services fee only).
- **Blended cost rate** — your fully-loaded cost per hour of delivery time (salaries + overhead ÷ billable hours), *not* your sell rate. This is what turns effective rate into margin.
- **Target effective rate** — the rate an engagement must clear to be healthy for your agency (commonly your sell rate minus an acceptable margin, or a hard floor you've set).

Optional, if available:

- **Account-complexity signals** — number of live campaigns, SKUs, connected stores, and ad platforms per client. High complexity *justifies* high hours (so the fix is a price raise, not a workload cut); low complexity with high hours points at scope creep or process waste.
- **Engagement age & stage** — onboarding and launch months are legitimately heavy; a 3-year-old account at the same hours is not.
- **Strategic value** — marquee logo, case-study potential, referral engine, or a planned upsell. A loss-leader can be intentional — flag it, don't auto-cut it.
- **Out-of-scope request log** — ad-hoc asks the client made outside the SOW. Direct evidence of creep, and ammunition for the rescope conversation.
- **Contract terms** — notice period, included deliverables, and any hours cap, so a recommendation is actionable rather than aspirational.

## How to decide — in order

1. **Gate on effort data.** If logged hours or the retainer fee is missing for a client, set that client to **FIX** and stop there. You cannot judge engagement profitability without effort data — never estimate hours from "feel."
2. **Compute the effective rate.** Effective rate = retainer ÷ logged hours, costed at your **blended** cost rate. A client at $6,000/mo and 40 logged hours is running at $150/hr; the same client at 80 hours is at $75/hr. Always carry both the rate and the hours behind it.
3. **Compare to target at margin.** Flag any engagement whose effective rate falls **below your target rate** (or, harder, below your blended cost — that engagement is losing money on every hour). Rank the underwater clients by *contribution lost per month*, not by retainer size.
4. **Explain the load with complexity.** Overlay campaign / SKU / store / platform counts. High hours + high complexity → the work is real → the fix is a **price raise or rescope**, not "do less." High hours + low complexity → process waste or scope creep → the fix is **tighten scope / change ways of working**.
5. **Check the window.** Strip out onboarding, launch, migration, or peak-season months before calling an account underwater — a one-month spike is not a trend. Require the pattern to hold across the window.
6. **Apply the vetoes**, then assign status + owner + the specific next action (rescope / raise / offboard / keep).

## The prompt to run

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

## Decision rules

- **KILL (offboard)** — effective rate **below blended cost** across the full window, low strategic value, and complexity confirms the work is genuinely heavy (i.e. it won't get cheaper). You are paying to keep this client.
- **REFRESH (rescope / raise)** — effective rate **below target but above cost**, driven by real, complexity-justified work. The engagement is viable at the right price — take a rescope or raise to renewal.
- **WATCH** — directional only: a single heavy month, an onboarding/launch/migration window, thin or non-compliant timesheets, or a borderline rate that needs another month to confirm.
- **KEEP** — effective rate **at or above target** at blended cost, with hours proportionate to complexity. Healthy; leave it alone.
- **FIX** — logged hours or retainer missing, timesheets not tagged to the client, or pass-through spend polluting the retainer number. Repair the data before judging.
- Every recommendation carries a **number, source, time window, and confidence level.**

## Vetoes — stop if any apply

- Do **not** judge an engagement on one heavy month — onboarding, launch, migration, and peak-season spikes are legitimate and temporary. Require the pattern across the window.
- Do **not** auto-cut a strategic loss-leader or marquee logo — referral engines, case studies, and planned upsells can justify a sub-target rate. Flag it for a human decision, don't kill it on the number alone.
- Do **not** compute effective rate on a sell rate or a single senior's rate — it must use your **blended cost** rate, or the margin call is wrong.
- Do **not** treat thin / non-compliant timesheets as low hours — an account that looks cheap may just be under-logged. Mark it FIX, not KEEP.
- Do **not** count pass-through ad spend as agency revenue — it inflates the retainer and hides the leak.
- Do **not** turn this into client-facing language. This is an internal margin read; the rescope conversation is a separate, deliberate step.

## Output

A table ranked by **agency margin lost per month**, not by retainer size:

| Client | Retainer/mo | Hours/mo | Effective rate | vs target rate | Complexity | Status | Action | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Northwind Outdoors | $5,500 | 78 | $71/hr | −43% | 3 stores, 2 platforms | REFRESH | Rescope at renewal | Owner + AD | 30 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
