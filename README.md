# eCommerce Operator OS

Evidence-first AI playbooks for ecommerce operators.

The public repo is maintained by Perceptiv and powered by ShopMCP. Use the playbooks manually in ChatGPT, Claude, Codex, Cursor, or any AI assistant. Run the live-data versions in ShopMCP when you want the same play to pull evidence from your connected commerce stack.

## Why This Exists

Marketing is not a pile of prompts. Ecommerce growth is a set of operating decisions:

- Are we on pace?
- What is wasting spend?
- Can we trust the tracking?
- Which products are invisible, overstocked, or underperforming?
- Which customers, flows, or clients need attention?

Each playbook tells an AI what evidence to gather, what order to inspect it in, when to stop, what confidence means, and what action needs approval.

## Start Here

| Play | Best for | What it answers |
|---|---|---|
| [Contribution Profit by Channel](playbooks/founder/commerce-contribution-profit-by-channel.md) | Founder / CEO | Which channels are creating contribution profit, not just revenue? |
| [Weekly Trading Deck](playbooks/ecommerce/ecom-weekly-trading-deck.md) | Head of Ecommerce | What happened this week, why, and what should the operator do next? |
| [Tracking Sanity Check](playbooks/ecommerce/ecom-tracking-sanity.md) | Head of Ecommerce | Can we trust the tracking before making growth decisions? |
| [Commerce Product Visibility Audit](playbooks/ecommerce/commerce-product-visibility-audit.md) | Head of Ecommerce | Which products are invisible across commerce, search, and feed surfaces? |
| [Wasted Spend Killer](playbooks/performance/perf-wasted-spend-killer.md) | Performance Marketer | Which spend should be killed, refreshed, watched, or kept? |

See [TOP_25_PLAYBOOKS.md](TOP_25_PLAYBOOKS.md) for the first launch set.

## Browse

- [By category](indexes/by-category.md)
- [By persona](indexes/by-persona.md)
- [By platform](indexes/by-platform.md)
- [By cadence](indexes/by-cadence.md)
- [By business question](indexes/by-business-question.md)
- [Machine-readable manifest](indexes/manifest.json)

## Manual vs ShopMCP

Manual playbooks are free and useful. They ask you to gather the evidence, paste the prompt, check the output, and decide what to do.

ShopMCP removes the operational friction. It connects to your commerce, ads, analytics, lifecycle, finance, and product systems, then runs Perceptiv-style playbooks against live evidence.

The repo teaches the play. ShopMCP runs the play.

## Quality Bar

Every playbook must:

1. Answer one recurring ecommerce operating question.
2. Name the evidence sources required for a confident answer.
3. Include numeric decision rules.
4. Include weak-data vetoes.
5. Produce a clear output contract.
6. Default to read-only analysis unless explicit approval is required.

Read [PLAYBOOK_STANDARD.md](PLAYBOOK_STANDARD.md) and [GOVERNANCE.md](GOVERNANCE.md).

## Contributing

We accept operating questions, evidence improvements, platform-specific variants, examples, and failure modes. We do not accept generic prompt dumps.

Start with [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Code and validation scripts are MIT licensed. Written playbook content is available under CC BY 4.0. See [LICENSE](LICENSE) and [CONTENT_LICENSE.md](CONTENT_LICENSE.md).
