---
name: agency-client-health-score
description: "When an ecommerce operator needs to decide: Which client needs intervention before the next meeting? Runs the Agency Client Health Score play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Agency Client Health Score', 'Commerce', 'Meta Ads', 'Google Ads', 'Klaviyo', 'Agency Portfolio'."
license: CC-BY-4.0
metadata:
  persona: Agency AM / COO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Agency Client Health Score

**Operating question:** Which client needs intervention before the next meeting?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce trend (per client)** — revenue this week vs. prior week and this month vs. prior month, *measured against that client's own target or run-rate*. Plus order volume and AOV direction, so you can tell a traffic problem from a basket problem.
- **Paid efficiency (per client)** — blended MER (total revenue ÷ total ad spend) or blended CPA vs. that client's target, across all their ad platforms (Meta, Google, and any others). Trend matters more than the absolute: a MER sliding 3.1 → 2.4 over three weeks is the signal.
- **Retention / email health (per client)** — email & SMS share of revenue and its trend, core lifecycle flow status (are they live and sending?), and deliverability (open-rate step-downs, spam-complaint rate). A collapsing email revenue share is an early churn tell.
- **Data / tracking integrity (per client)** — does platform-claimed conversion revenue reconcile with store orders within tolerance? An account where the numbers don't agree can't be scored honestly — it's **blind**, and blind is a status, not a pass.
- **Per-client targets & weights** — each client's revenue/MER/retention targets, and the dimension weights you'll apply (default below; tune per engagement type).

Optional, if available:

- **Account tier / MRR and contract value** — a red on a $30k/mo flagship outranks a red on a $4k/mo retainer; weight triage by what's at stake, not just by score.
- **Renewal / contract date** — a slipping account 60 days from renewal is a five-alarm fire; the same slide on a fresh 12-month contract is a watch.
- **Promotion calendar per client** — a client mid-sale will read hot on revenue and hot on MER, then give it back; strip promo weeks before scoring the trend.
- **Recent scope or team changes** — a client who just lost their lead AM, or whose budget was cut last month, has a known reason behind the dip.
- **Last week's scores** — the *direction of the score itself* (amber→red is more urgent than steady-red) is often the real trigger.
- **Client sentiment notes** — a quiet client, a terse email, a missed call: soft signals that promote a borderline amber.

## How to decide — in order

1. **Set each client's bar before scoring anyone.** Pull each account's own targets (revenue, MER/CPA, retention baseline). No portfolio-wide threshold survives contact with a roster that mixes a $40k/mo skincare brand and a $480k/mo outdoor-gear brand — they fail and pass at different absolute numbers. A client with no targets on file is scored **blind**, not green.
2. **Gate on tracking integrity first, per client.** If a client's platform-claimed revenue and store orders diverge beyond ~15%, you cannot trust that client's commerce or paid dimension. Flag the account **blind** on those dimensions and surface it as a data problem — never let a tracking gap masquerade as a green "no issues."
3. **Score each dimension 0–100 against that client's bar, then weight.** Default weights: **commerce trend 40, paid efficiency 25, retention/email 20, tracking integrity 15.** A dimension that can't be read (blind) doesn't score 0 — it's excluded and the client is flagged as partially blind, because a missing number is not a bad number.
4. **Roll up to RAG, but require breadth and trend — not one weak week.** **Red** = composite below ~60 **and** at least two dimensions below their floor **and** the slide is visible across multiple weeks (not a single soft Monday). **Amber** = composite ~60–75, or one dimension clearly breached but the rest holding. **Green** = composite above ~75 with no dimension in breach.
5. **Suppress small-account noise.** A client doing $8k/mo will swing ±20% week to week on a handful of orders — that's variance, not a trend. Below a per-client volume floor (e.g. <~150 orders/month), widen the bands and lean on the monthly trend, not the weekly. Don't paint a small account red on statistical jitter.
6. **Separate signal from seasonality and promo.** Before calling a revenue or MER move "red," strip promo windows and check year-over-year for seasonal accounts. A garden brand down 18% in November may be perfectly on its own seasonal curve.
7. **Rank by attention-priority, not raw score.** Re-sort the reds and ambers by *what's at stake* — contract value, renewal proximity, and score *direction* (deteriorating beats steady). Output the 2–3 accounts that get the team's week, each with the specific WHY and the owning AM.

## The prompt to run

```text
You are my agency portfolio analyst running the "Agency Client Health Score" play.

GOAL: across my whole client roster, rank the 2-3 accounts that need intervention BEFORE
this week's client meetings. Output one composite health score per client, a red/amber/green
status, and a one-line WHY. This is portfolio triage, not a single-client deep dive.

I will paste, per client: commerce revenue trend vs their own target, blended MER/CPA vs
their target, email/retention health (flow status, deliverability, email revenue share),
and a tracking-reconciliation figure (platform-claimed revenue vs store orders). I'll also
give each client's targets, monthly order volume, account tier/MRR, and renewal date where
I have them. Some data will be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical input is
per-client multi-dimension data over a trend window - commerce trend, paid efficiency,
retention/email health, and tracking integrity, read across multiple weeks (a one-week dip
is not red). If that per-client multi-dimension trend data is missing for a client, mark
them BLIND (not green) and say what's needed - never score a client green on missing data.

RULES:
- Judge every client against ITS OWN targets, never a blanket benchmark. A $40k/mo and a
  $480k/mo account are not scored on the same absolute numbers.
- Tracking gate FIRST, per client: if platform-claimed revenue and store orders diverge
  >~15%, mark that client BLIND on the affected dimensions. Blind is a status, never a
  green pass. A client with no targets on file is also BLIND, not green.
- Score four dimensions 0-100 against each client's bar, then weight: commerce trend 40,
  paid efficiency 25, retention/email 20, tracking integrity 15. A dimension that can't be
  read is excluded (not scored 0) and the client is flagged partially blind.
- RED requires breadth AND trend: composite <~60, at least two dimensions below floor, and
  a slide visible across multiple weeks - never one weak week. AMBER = ~60-75 or one clear
  breach with the rest holding. GREEN = >~75, nothing in breach.
- Suppress small-account noise: below ~150 orders/month, widen the bands and read the
  monthly trend, not the weekly swing. Don't paint a small client red on jitter.
- Strip promo windows and check seasonality before calling a move real.
- Every client's row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read naming the accounts that need the week's attention.
2. A portfolio table ranked worst-first, using exactly this header row:
   | Client | Tier / MRR | Commerce | Paid | Retention | Tracking | Composite | RAG | Why (one line) | Owning AM | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. The 2-3 accounts to intervene on, re-ranked by stakes + renewal proximity, each with the
   specific reason and the recommended first action.
4. Which accounts are BLIND (data gap) and what's needed to score them honestly.
```

## Decision rules

- **RED** — composite below ~60 **and** at least two of the four dimensions below their per-client floor **and** the decline is confirmed across multiple weeks (not a single soft week). Trigger immediate AM intervention.
- **AMBER** — composite ~60–75, **or** exactly one dimension clearly breached while the rest hold (e.g. deliverability slipping but commerce and paid fine). Monitor closely; raise in the next internal check.
- **GREEN** — composite above ~75 with no dimension in breach. Say so plainly and don't spend the week's hours here.
- **BLIND** — the client has no targets on file, or the tracking gate failed and a dimension can't be honestly scored. Report as a data/access gap, never as green. Fixing the blindness is itself the action.
- **WATCH** — a borderline amber held up only by a soft signal (a small-account wobble, a young account, a promo-polluted window). Widen the band and re-read on a clean window before escalating.
- Every client's row must carry a **number, source, time window, and confidence level** — a red without all four is an opinion, not a finding.

## Vetoes — stop if any apply

- **Never flag a client red on a single weak week.** Red needs breadth (≥2 dimensions) and a multi-week trend. One soft Monday is variance.
- **Never paint a small account red on statistical jitter.** A client under ~150 orders/month swings on a handful of orders; widen the bands and read the monthly trend, not the weekly.
- **Never call a promo- or season-driven move a health problem.** A client mid-sale reads hot; a seasonal brand reads cold on its off-curve. Strip the distortion before scoring.
- **Never score a tracking-broken or target-less client green.** Missing or unreconciled data is **blind**, a finding in its own right — silence here is how an at-risk account hides in plain sight.
- **Never judge two clients on the same absolute bar.** A 2.4 MER is a crisis for one account and the plan for another. Score against each client's own target.
- **Never let raw score alone set priority** — re-rank by what's at stake (contract value, renewal proximity, score direction) before assigning the week.
- **Never trigger a client conversation, budget shift, or scope change off this scan alone** without a human reviewing the underlying account first.

## Output

A portfolio triage table, ranked worst-first, with a composite score, a RAG status, and a one-line WHY per client — then the 2–3 accounts that get the week's attention.

Minimum table columns:

| Client | Tier / MRR | Commerce | Paid | Retention | Tracking | Composite | RAG | Why (one line) | Owning AM | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Example Co | $18k/mo | 71 | 64 | 80 | 95 | 73 | AMBER | One dimension soft, rest holding | Priya | 7 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
