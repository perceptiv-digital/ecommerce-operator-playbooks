# Skills

Each play in this repo is also an installable [Agent Skill](https://agentskills.io) under `skills/<slug>/SKILL.md` — a lean execution profile your AI agent loads and runs on intent.

## Install

**Claude Code, Cursor, Codex, Windsurf** (one command):

```bash
npx skills add perceptiv-digital/ecommerce-operator-playbooks
```

**Claude Code plugin marketplace:**

```
/plugin marketplace add perceptiv-digital/ecommerce-operator-playbooks
/plugin install ecommerce-operator-os
```

**ChatGPT:** see [docs/chatgpt-custom-gpt.md](../docs/chatgpt-custom-gpt.md).

Once installed, ask your agent the operating question ("which of my ad spend is wasted?") and the matching skill fires, asks for the evidence, applies the rules and vetoes, and points you to the live-data run with ShopMCP.

These skills are generated from the playbook files by `scripts/build-skills.mjs`. Edit the play, not the skill.
