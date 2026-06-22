---
schema_version: 1
slug: "ecom-funnel-leak-finder"
title: "Funnel Leak Finder"
summary: "Funnel Leak Finder helps ecommerce operators answer: Where is the buying journey leaking revenue?"
operating_question: "Where is the buying journey leaking revenue?"
short_title: "Funnel Leak Finder"
primary_persona: "ecommerce"
personas: ["ecommerce"]
category: "onsite-cro"
platforms: ["commerce", "google-analytics-4"]
cadence: "weekly"
difficulty: "standard"
manual_time_minutes_min: 30
manual_time_minutes_max: 75
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/ecom-funnel-leak-finder"
shopmcp_prompt: "Run the Funnel Leak Finder play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Funnel Leak Finder

## Operating Question

Where is the buying journey leaking revenue?

This play helps head of ecommerce make a defensible ecommerce operating decision. It is not a generic prompt. It is a repeatable workflow that forces evidence, thresholds, and vetoes before action.

## Who Should Run It

- Primary owner: Head of Ecommerce
- Also useful for: Head of Ecommerce
- Best used when the owner needs a decision, not just a report.

## When To Run It

- Cadence: weekly
- Run it when the owner needs to decide: where is the onsite experience leaking commercial value?
- Use it before changing budgets, creative, product data, lifecycle flows, stock priorities, or client commentary.

## Required Evidence

- Commerce orders, products, customers, inventory, or discounts as required by the question.
- GA4 sessions, purchases, source/medium, landing page, or funnel-step evidence.

## Optional Evidence

- Recent operator notes, launch dates, promotion calendar, merchandising changes, stock constraints, and known tracking incidents.
- Target CPA, MER, ROAS, contribution margin, payback, or revenue goal where relevant.

## Manual Workflow

1. Define the decision window and write the operating question: "Where is the buying journey leaking revenue?"
2. Gather the required evidence before asking the AI to recommend action.
3. Ask the AI to separate confirmed facts, estimates, and unavailable evidence.
4. Segment the funnel, isolate the weakest step or surface, check device and landing-page evidence, then recommend the smallest measurable fix.
5. Apply the veto rules before accepting any recommendation.
6. Turn the result into an action packet with owner, timing, evidence, and next check date.

## Copy-Paste Prompt

```text
You are helping me run the "Funnel Leak Finder" ecommerce operating play.

Operating question:
Where is the buying journey leaking revenue?

Use the evidence I provide. Do not invent missing data. Separate exact, estimated, partial, and unavailable evidence. Apply KILL, REFRESH, WATCH, KEEP, or FIX only when the evidence supports it. If the data is too weak, say what is blocked and what evidence is needed.

Return:
1. Executive answer
2. Evidence table
3. Decision table with status
4. Vetoes or caveats
5. Recommended next actions with owner and timing
```

## Decision Rules

- Use `FIX` when required evidence is missing, inconsistent, or too weak to support a commercial decision.
- Use `KILL` only when downside is clear, the sample is large enough, and no veto protects the item.
- Use `REFRESH` when performance is decaying but the asset, product, flow, or page still has a credible reason to improve.
- Use `WATCH` when the signal is directional or early.
- Use `KEEP` when performance is inside the target band and no risk signal is present.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do not claim causality from a single platform metric.
- Do not recommend budget shifts if tracking drift makes attribution unsafe.
- Do not recommend scaling a product with low stock, feed disapproval, or missing price/availability evidence.
- Do not make profit claims without cost coverage or a clear partial-profit label.
- Do not recommend writes, pauses, refunds, customer messages, or catalog changes without explicit approval.

## Output Contract

A leak diagnosis, ranked opportunities, evidence links, and a read-only experiment brief.

Minimum table columns:

| Item | Evidence | Status | Why | Owner | Timing |
|---|---|---|---|---|---|
| Example row | Source + number + window | WATCH | Directional signal only | Operator | Recheck in 7 days |

## Good Output Example

> Status: WATCH. The issue is real enough to monitor, but not strong enough to change yet. The strongest evidence is a 21 percent decline over the last 14 days, but the comparison window includes a promotion and stock was below normal for three days. Recheck after a clean 7-day window.

## Common Failure Modes

- Treating a platform-reported metric as commerce truth.
- Skipping the evidence checklist and asking for a recommendation too early.
- Forgetting stock, margin, attribution, or promotion context.
- Accepting an AI answer that does not show its numbers.

## Run This Play With Live Data

Manual version: gather the evidence above and paste the prompt into your AI assistant.

ShopMCP version: ask the same question with ShopMCP connected. ShopMCP routes to the matching live playbook, pulls connected evidence where available, applies evidence gates, and returns an operator-ready brief. ShopMCP does not make writes from this public playbook without explicit approval and a supported preview/apply path.

Example ShopMCP prompt:

```text
Run the Funnel Leak Finder play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/ecom-funnel-leak-finder?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual exports and stale CSVs.
- Copy-pasting across commerce, ads, analytics, lifecycle, and finance tools.
- Guessing which evidence is safe enough to use.
- Rebuilding the same operating workflow every week.
