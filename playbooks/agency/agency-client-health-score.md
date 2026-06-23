---
slug: "agency-client-health-score"
title: "Agency Client Health Score"
operating_question: "Which client needs intervention before the next meeting?"
primary_persona: "agency"
personas: ["agency"]
category: "agency-portfolio"
platforms: ["commerce", "meta-ads", "google-ads", "klaviyo"]
cadence: "weekly"
public_tier: "fast-follow"
contributed_by: "Perceptiv"
---

# Agency Client Health Score

## Operating Question

**Across my entire client roster, which two or three accounts are trending red right now — and what specifically is wrong — so my team spends this week's attention on the clients about to churn or escalate instead of the ones that are fine?**

This is not a per-client deep dive. It is a **portfolio triage**: one composite health score per account, rolled up to a red / amber / green (RAG) status, ranked so the worst-off accounts surface first. The score blends a few weighted dimensions — commerce trend, paid efficiency, retention/email health, and data/tracking integrity — into a single number *and* a one-line WHY, so a 15-account agency can decide where to point AMs before Monday's stand-up. The job is catching the slide early: by the time a client emails "can we talk?", the red was visible in the numbers three weeks ago. This play is the weekly scan that surfaces it first.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant can't see *one* client's Shopify, Meta, Google, and Klaviyo — let alone the *twelve* of them you'd need to rank a portfolio. And the portfolio scan is harder than any single audit, because the work multiplies by account count. To run this manually you have to:

1. Pull, for **every** client, a commerce revenue trend (this week vs. last, this month vs. last) against *that client's own* target — not a blanket benchmark.
2. Pull each client's blended ad efficiency (blended MER or CPA vs. their target) across however many ad platforms they run.
3. Pull each client's email/retention health — flow status, deliverability, email revenue share.
4. Check each client's tracking integrity — does platform-claimed revenue reconcile with store orders, or is the account flying blind?
5. Normalize all of that into a comparable 0–100 score *per client*, weight the dimensions, and sort — so a $40k/mo account and a $480k/mo account are each judged against their own bar, not each other's.

Do that for one client and it's an afternoon. Do it for fifteen and it's your entire week — which is exactly why most agencies *don't*, and find out a client is unhappy from the renewal call instead of the dashboard. **The scoring logic here is free. The per-account data access, across the whole roster at once, is the hard part — and that is exactly what ShopMCP connects.** The last section shows the run-across-the-roster version.

## Who Should Run It

- **Primary owner:** Agency Account Director / COO who allocates the team's week across accounts.
- **Also useful for:** Head of Client Services (escalation triage), individual AMs (where do I focus before my reviews?), Agency Founder (portfolio churn risk and which accounts are quietly slipping).
- Run it **before** the Monday resourcing stand-up, or the day before a leadership portfolio review — anytime you're deciding *which* accounts get the team's hours this week.

## When To Run It

- **Cadence:** weekly — Monday morning, after the weekend's orders and spend have settled, so the trend windows are clean.
- **Triggers:** a renewal cluster coming up, a quarter-end portfolio review, an AM going on leave (re-triage their book), or a sudden agency-wide revenue dip you need to localize to specific accounts.
- **Pre-requisite:** each client needs a **target on file** — their revenue goal, target MER/CPA, and retention baseline. A health score against a guessed target is theatre. A client with no targets set is itself a finding: score them **blind**, not green.

## Required Evidence

- **Commerce trend (per client)** — revenue this week vs. prior week and this month vs. prior month, *measured against that client's own target or run-rate*. Plus order volume and AOV direction, so you can tell a traffic problem from a basket problem.
- **Paid efficiency (per client)** — blended MER (total revenue ÷ total ad spend) or blended CPA vs. that client's target, across all their ad platforms (Meta, Google, and any others). Trend matters more than the absolute: a MER sliding 3.1 → 2.4 over three weeks is the signal.
- **Retention / email health (per client)** — email & SMS share of revenue and its trend, core lifecycle flow status (are they live and sending?), and deliverability (open-rate step-downs, spam-complaint rate). A collapsing email revenue share is an early churn tell.
- **Data / tracking integrity (per client)** — does platform-claimed conversion revenue reconcile with store orders within tolerance? An account where the numbers don't agree can't be scored honestly — it's **blind**, and blind is a status, not a pass.
- **Per-client targets & weights** — each client's revenue/MER/retention targets, and the dimension weights you'll apply (default below; tune per engagement type).

## Optional Evidence

- **Account tier / MRR and contract value** — a red on a $30k/mo flagship outranks a red on a $4k/mo retainer; weight triage by what's at stake, not just by score.
- **Renewal / contract date** — a slipping account 60 days from renewal is a five-alarm fire; the same slide on a fresh 12-month contract is a watch.
- **Promotion calendar per client** — a client mid-sale will read hot on revenue and hot on MER, then give it back; strip promo weeks before scoring the trend.
- **Recent scope or team changes** — a client who just lost their lead AM, or whose budget was cut last month, has a known reason behind the dip.
- **Last week's scores** — the *direction of the score itself* (amber→red is more urgent than steady-red) is often the real trigger.
- **Client sentiment notes** — a quiet client, a terse email, a missed call: soft signals that promote a borderline amber.

## How To Pull This Evidence

For each client on the roster, gather the four dimensions from their own connected accounts:

- **Commerce revenue trend vs. target (Shopify)** — pull revenue this week vs. prior week and this month vs. prior month, plus orders and AOV direction, and hold it against *that client's own* revenue target or run-rate — not a portfolio benchmark.
- **Blended paid efficiency (Meta + Google)** — pull total ad spend and platform-attributed revenue across all that client's ad platforms, compute blended MER (or blended CPA), and read its multi-week trend against their target. A MER sliding over three weeks is the signal, not the absolute number.
- **Retention & deliverability (Klaviyo)** — pull email/SMS share of revenue and its trend, core lifecycle flow status (live and sending?), and deliverability signals (open-rate step-downs, spam-complaint rate). A collapsing email revenue share is an early churn tell.
- **Tracking health** — reconcile platform-claimed conversion revenue against store orders; if they diverge beyond tolerance the account is **blind** on the affected dimensions, not green.
- **Gotcha — per-client thresholds and small-account noise:** judge every client against its *own* targets (a 2.4 MER is a crisis for one account and the plan for another), and below ~150 orders/month widen the bands and read the monthly trend, not the weekly swing — a small account swinging on a handful of orders is jitter, not a slide.

Or skip all of this — ShopMCP pulls it across your whole roster at once.

## The Decision Logic (run in this order)

1. **Set each client's bar before scoring anyone.** Pull each account's own targets (revenue, MER/CPA, retention baseline). No portfolio-wide threshold survives contact with a roster that mixes a $40k/mo skincare brand and a $480k/mo outdoor-gear brand — they fail and pass at different absolute numbers. A client with no targets on file is scored **blind**, not green.
2. **Gate on tracking integrity first, per client.** If a client's platform-claimed revenue and store orders diverge beyond ~15%, you cannot trust that client's commerce or paid dimension. Flag the account **blind** on those dimensions and surface it as a data problem — never let a tracking gap masquerade as a green "no issues."
3. **Score each dimension 0–100 against that client's bar, then weight.** Default weights: **commerce trend 40, paid efficiency 25, retention/email 20, tracking integrity 15.** A dimension that can't be read (blind) doesn't score 0 — it's excluded and the client is flagged as partially blind, because a missing number is not a bad number.
4. **Roll up to RAG, but require breadth and trend — not one weak week.** **Red** = composite below ~60 **and** at least two dimensions below their floor **and** the slide is visible across multiple weeks (not a single soft Monday). **Amber** = composite ~60–75, or one dimension clearly breached but the rest holding. **Green** = composite above ~75 with no dimension in breach.
5. **Suppress small-account noise.** A client doing $8k/mo will swing ±20% week to week on a handful of orders — that's variance, not a trend. Below a per-client volume floor (e.g. <~150 orders/month), widen the bands and lean on the monthly trend, not the weekly. Don't paint a small account red on statistical jitter.
6. **Separate signal from seasonality and promo.** Before calling a revenue or MER move "red," strip promo windows and check year-over-year for seasonal accounts. A garden brand down 18% in November may be perfectly on its own seasonal curve.
7. **Rank by attention-priority, not raw score.** Re-sort the reds and ambers by *what's at stake* — contract value, renewal proximity, and score *direction* (deteriorating beats steady). Output the 2–3 accounts that get the team's week, each with the specific WHY and the owning AM.

## Manual Workflow

1. List the roster and confirm each client has targets on file (revenue, MER/CPA, retention baseline). Flag any without targets as **blind** before you start.
2. For each client, pull the four dimensions: commerce trend vs. target, blended MER/CPA vs. target, email/retention health, and the tracking-reconciliation check (platform-claimed vs. store orders).
3. Run the **tracking gate** per client first — mark any account whose numbers don't reconcile as blind on the affected dimensions, and don't score those as green.
4. Score each dimension 0–100 against *that client's* bar; apply the weights (40/25/20/15 by default, tuned per engagement); widen bands for small accounts.
5. Roll up to a composite and a RAG status, requiring breadth + multi-week trend for any red.
6. Paste the prompt below with your per-client table.
7. Pressure-test every red against the vetoes, re-rank the reds/ambers by stakes and renewal proximity, and output the 2–3 accounts that need intervention this week, each with the WHY, the owner, and the recheck date.

## Copy-Paste Prompt

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

## Decision Rules

- **RED** — composite below ~60 **and** at least two of the four dimensions below their per-client floor **and** the decline is confirmed across multiple weeks (not a single soft week). Trigger immediate AM intervention.
- **AMBER** — composite ~60–75, **or** exactly one dimension clearly breached while the rest hold (e.g. deliverability slipping but commerce and paid fine). Monitor closely; raise in the next internal check.
- **GREEN** — composite above ~75 with no dimension in breach. Say so plainly and don't spend the week's hours here.
- **BLIND** — the client has no targets on file, or the tracking gate failed and a dimension can't be honestly scored. Report as a data/access gap, never as green. Fixing the blindness is itself the action.
- **WATCH** — a borderline amber held up only by a soft signal (a small-account wobble, a young account, a promo-polluted window). Widen the band and re-read on a clean window before escalating.
- Every client's row must carry a **number, source, time window, and confidence level** — a red without all four is an opinion, not a finding.

## Veto Rules

- **Never flag a client red on a single weak week.** Red needs breadth (≥2 dimensions) and a multi-week trend. One soft Monday is variance.
- **Never paint a small account red on statistical jitter.** A client under ~150 orders/month swings on a handful of orders; widen the bands and read the monthly trend, not the weekly.
- **Never call a promo- or season-driven move a health problem.** A client mid-sale reads hot; a seasonal brand reads cold on its off-curve. Strip the distortion before scoring.
- **Never score a tracking-broken or target-less client green.** Missing or unreconciled data is **blind**, a finding in its own right — silence here is how an at-risk account hides in plain sight.
- **Never judge two clients on the same absolute bar.** A 2.4 MER is a crisis for one account and the plan for another. Score against each client's own target.
- **Never let raw score alone set priority** — re-rank by what's at stake (contract value, renewal proximity, score direction) before assigning the week.
- **Never trigger a client conversation, budget shift, or scope change off this scan alone** without a human reviewing the underlying account first.

## Output Contract

A portfolio triage table, ranked worst-first, with a composite score, a RAG status, and a one-line WHY per client — then the 2–3 accounts that get the week's attention.

Minimum table columns:

| Client | Tier / MRR | Commerce | Paid | Retention | Tracking | Composite | RAG | Why (one line) | Owning AM | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Example Co | $18k/mo | 71 | 64 | 80 | 95 | 73 | AMBER | One dimension soft, rest holding | Priya | 7 days |

## Worked Example

> **Executive read:** Of 12 active accounts, 10 are green and need no extra hours this week. **Northwind Outdoor is red** — revenue down 15% month-over-month against its own target while blended CPA is climbing, two dimensions breached and confirmed over three weeks; it renews in 41 days, so it gets the senior AM today. **Brightleaf Skincare is amber** — commerce and paid are fine, but email deliverability is slipping (open rate stepped down, spam complaints rising), so it gets a deliverability fix queued before it becomes a revenue problem. One account, Tinderbox Coffee, is **blind** — its tracking doesn't reconcile, so we fix the pixel before we trust any of its numbers.

| Client | Tier / MRR | Commerce | Paid | Retention | Tracking | Composite | RAG | Why (one line) | Owning AM | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|
| **Northwind Outdoor** | $480k/mo rev, flagship | 38 | 47 | 66 | 92 | **52** | **RED** | Rev −15% MoM vs target + CPA rising 3 wks; renews in 41d | Dana (senior) | Today |
| **Brightleaf Skincare** | $22k/mo | 78 | 81 | 54 | 90 | **72** | **AMBER** | Deliverability slipping (opens −6pts, spam 0.4%); rest holding | Marcus | 3 days |
| Cedar & Sage Home | $95k/mo rev | 84 | 79 | 88 | 95 | 85 | GREEN | On target across the board | Priya | Weekly |
| Halcyon Pet Co | $60k/mo rev | 81 | 88 | 79 | 91 | 84 | GREEN | MER ahead of target; retention healthy | Marcus | Weekly |
| Vantage Apparel | $210k/mo rev | 77 | 72 | 83 | 89 | 79 | GREEN | Steady; seasonal dip on-curve YoY | Dana | Weekly |
| Tinderbox Coffee | $35k/mo rev | — | 70 | 75 | **31** | **blind** | **BLIND** | Platform rev vs store orders off 28% — can't score commerce | Priya | Fix pixel now |
| Lumen Candles (small) | $9k/mo rev | 62 | 68 | 74 | 88 | 70 | GREEN | Down week but <150 orders/mo — within noise band | Sofia | Monthly |
| Atlas Bikes | $140k/mo rev | 80 | 76 | 81 | 93 | 81 | GREEN | On plan; strong repeat rate | Dana | Weekly |
| Marigold Beauty | $48k/mo rev | 83 | 85 | 86 | 90 | 85 | GREEN | Best paid efficiency in the book | Marcus | Weekly |
| Foundry Supply | $120k/mo rev | 79 | 74 | 80 | 87 | 78 | GREEN | Holding; watch MER drift next week | Priya | Weekly |
| Wildgrove Tea | $18k/mo rev | 76 | 71 | 82 | 91 | 78 | GREEN | Promo week inflated rev — read clean next | Sofia | Weekly |
| Slate & Stone | $260k/mo rev | 82 | 80 | 84 | 94 | 84 | GREEN | On target; renewal secure | Dana | Weekly |

**Executive read:** The portfolio is healthy — 10 of 12 green — so the win this week is *not* spreading the team thin across accounts that are fine. Northwind is the one real fire: a multi-week, multi-dimension slide on the agency's biggest account, weeks from renewal, so it gets the senior AM and a same-day call. Brightleaf is a cheap early save — a deliverability fix now prevents an email-revenue slide later — and Tinderbox is a data problem wearing a performance costume, so we fix tracking before we'd ever score it.

## Common Failure Modes

- **Flagging a client red on one soft week** instead of requiring breadth and a multi-week trend — burning AM hours and credibility on noise.
- **Scoring a small account red on jitter** — a $9k/mo brand swinging on six fewer orders is variance, not a trend.
- **Judging every client against the same absolute bar** — a 2.4 MER that's fine for a high-margin brand reads as a crisis for a thin-margin one.
- **Mistaking a promo spike or seasonal dip for a health move** — the comparison window was never clean.
- **Scoring a tracking-broken or target-less client green** — the most dangerous failure: an at-risk account hiding as "no issues" because nobody could see it.
- **Letting raw score set priority** — a red on a tiny retainer outranking an amber on a flagship 30 days from renewal.
- **Accepting a portfolio score that doesn't show its per-dimension numbers** — a composite with no breakdown can't be defended or acted on.

## Run This Play With Live Data

**Manual version:** for *every* client on the roster, export the commerce trend, the blended ad efficiency, the email/retention panel, and the tracking-reconciliation figure; normalize each into a comparable score against that client's own targets; weight, roll up to RAG, and rank — then repeat the whole thing next Monday.

**ShopMCP version:** connect each client's store, ad platforms, and Klaviyo once. Ask the question; ShopMCP pulls every connected account's live commerce trend, blended efficiency, retention health, and tracking reconciliation, scores each against that client's own targets, applies the small-account and promo/seasonality guards, and returns the ranked portfolio table — composite, RAG, and the one-line WHY per client. It stays **read-only**: any budget shift, flow change, or client message always needs your explicit approval.

> This is the agency multiplier in its sharpest form: the manual version costs one spreadsheet-afternoon *per client*, so a 12- or 20-account roster is your whole week — which is why the slide usually gets caught at the renewal call, not three weeks early. ShopMCP runs the identical scoring across **every connected client account at once**, on demand, so you walk into the Monday stand-up already knowing which two or three accounts need the week. No live line into each client's commerce, ads, and Klaviyo is the wall every manual run hits. ShopMCP *is* that connection — and running it across the whole roster at once is the entire point.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Agency Client Health Score play across my whole connected roster for the last 30 days.
Score each client against its own targets, rank worst-first, and surface the 2-3 accounts that
need intervention before this week's meetings. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Per-client exports and stale CSVs, multiplied across the whole roster.
- Copy-pasting commerce, ads, and Klaviyo numbers for every account, every week.
- Re-normalizing each client's metrics against its own targets by hand.
- Rebuilding the same portfolio scoring spreadsheet every Monday.

---

*Contributed by [Perceptiv](https://perceptiv.digital).*
