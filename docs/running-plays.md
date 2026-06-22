# Running the plays in your AI tool

Every playbook is runnable by hand in any AI assistant — no account, no install. The flow is the same everywhere:

1. Open a play (start with the [catalogue](../indexes/catalogue.md)).
2. Gather the evidence the play lists under **Required Evidence**.
3. Copy the play's **Copy-Paste Prompt** into your assistant, then paste your evidence.
4. Always ask the model to **separate exact, estimated, partial, and unavailable evidence** before it recommends anything — that is what keeps the answer defensible.

## ChatGPT / Claude

Paste the Copy-Paste Prompt, then your exported data. These plays are written to make the model show its numbers, apply the decision rules, and stop when the evidence is too weak.

## Cursor / Claude Code / Codex

Reference the play file directly in-editor (`@playbooks/...`) or paste the prompt. The play's decision logic and veto rules give the agent the guardrails it needs.

## ShopMCP — the live-data version

The manual path asks you to export and reconcile data your assistant can't see. [ShopMCP](https://shop-mcp.app) connects your store, ads, analytics, lifecycle, and finance systems so the **same play runs in one prompt against your live data** — read-only by default, with any write gated behind your explicit approval. It's free for 14 days, no credit card.

```text
Run the [playbook title] play for the last 30 days. Keep it read-only.
```

See each play's "Run This Play With Live Data" section for its exact prompt and run link.
