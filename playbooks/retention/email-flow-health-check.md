---
schema_version: 1
slug: "email-flow-health-check"
title: "Klaviyo Flow Health Check"
summary: "Klaviyo Flow Health Check helps ecommerce operators answer: Which lifecycle flows are underperforming or broken?"
operating_question: "Which lifecycle flows are underperforming or broken?"
short_title: "Klaviyo Flow Health"
primary_persona: "retention"
personas: ["retention"]
category: "retention-ltv"
platforms: ["klaviyo", "commerce"]
cadence: "weekly"
difficulty: "intermediate"
manual_time_minutes_min: 45
manual_time_minutes_max: 90
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: true
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/email-flow-health-check"
shopmcp_prompt: "Run the Klaviyo Flow Health Check play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Klaviyo Flow Health Check

## Operating Question

Which lifecycle flows are underperforming or broken?

This play helps retention / email lead make a defensible ecommerce operating decision. It is not a generic prompt. It is a repeatable workflow that forces evidence, thresholds, and vetoes before action.

## Who Should Run It

- Primary owner: Retention / Email Lead
- Also useful for: Retention / Email Lead
- Best used when the owner needs a decision, not just a report.

## When To Run It

- Cadence: weekly
- Run it when the owner needs to decide: which customer, flow, or cohort needs attention?
- Use it before changing budgets, creative, product data, lifecycle flows, stock priorities, or client commentary.

## Required Evidence

- Klaviyo flow, campaign, list, deliverability, profile, or attributed value evidence.
- Commerce orders, products, customers, inventory, or discounts as required by the question.

## Optional Evidence

- Recent operator notes, launch dates, promotion calendar, merchandising changes, stock constraints, and known tracking incidents.
- Target CPA, MER, ROAS, contribution margin, payback, or revenue goal where relevant.

## Manual Workflow

1. Define the decision window and write the operating question: "Which lifecycle flows are underperforming or broken?"
2. Gather the required evidence before asking the AI to recommend action.
3. Ask the AI to separate confirmed facts, estimates, and unavailable evidence.
4. Start with customer and lifecycle evidence, separate deliverability from offer or audience problems, then prioritize by recoverable value.
5. Apply the veto rules before accepting any recommendation.
6. Turn the result into an action packet with owner, timing, evidence, and next check date.

## Copy-Paste Prompt

```text
You are helping me run the "Klaviyo Flow Health Check" ecommerce operating play.

Operating question:
Which lifecycle flows are underperforming or broken?

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

A retention risk map with flow/cohort actions, blocked evidence, and the next check date.

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
Run the Klaviyo Flow Health Check play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/email-flow-health-check?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual exports and stale CSVs.
- Copy-pasting across commerce, ads, analytics, lifecycle, and finance tools.
- Guessing which evidence is safe enough to use.
- Rebuilding the same operating workflow every week.
