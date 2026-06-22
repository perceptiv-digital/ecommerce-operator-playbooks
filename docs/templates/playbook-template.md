---
schema_version: 1
slug: "example-playbook"
title: "Example Playbook"
summary: "Example Playbook ecommerce operating playbook."
operating_question: "What decision does this play answer?"
short_title: "Example"
primary_persona: "ecommerce"
personas: ["ecommerce"]
category: "trading-profit"
platforms: ["commerce"]
cadence: "weekly"
difficulty: "standard"
manual_time_minutes_min: 30
manual_time_minutes_max: 75
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "template"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/example-playbook"
shopmcp_prompt: "Run the Example Playbook play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Example Playbook

Use this file as the starting point for new playbooks. Replace every placeholder before submitting a PR.
