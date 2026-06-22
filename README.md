# eCommerce Operator OS

**Evidence-first AI playbooks for ecommerce operators. Free to read. One prompt to run.**

![Stars](https://img.shields.io/github/stars/perceptiv-digital/ecommerce-operator-playbooks?style=social)
![Playbooks](https://img.shields.io/badge/playbooks-50%2B-2563eb)
![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-lightgrey)
![Maintained by Perceptiv](https://img.shields.io/badge/maintained%20by-Perceptiv-111827)

> Marketing isn't a pile of prompts. Ecommerce growth is a set of operating decisions — the same plays great operators run every week. This is that playbook, written down and given away.

Each play tells an AI exactly **what evidence to gather, in what order to inspect it, when to stop, what "confident" means, and what needs human approval** — so you get a defensible decision, not a confident guess.

## Three ways to use it

1. **Read the play.** Every playbook is a complete operating workflow. No account, no catch.
2. **Run it manually** in ChatGPT, Claude, Cursor, or Codex — paste your exports, paste the prompt.
3. **Run it on live data with [ShopMCP](https://my.shop-mcp.app)** — the same play, in one prompt, against your connected commerce stack.

## The honest catch (and why these are free)

Most of these plays need data your AI assistant simply **cannot see** — your Meta Ads account, Google Ads, Shopify orders, Klaviyo flows, Merchant Center feed. Run manually, that means exporting CSVs and reconciling them by hand, every week.

So we give the whole method away. The thinking is the easy part; the **live-data access is the hard part** — and that's exactly what ShopMCP connects. Read the meat for free. When you want it run against your real numbers in one prompt, that's ShopMCP. No gates, no "premium step 4."

## Start here — the flagship plays

| Play | Best for | The decision it makes |
|---|---|---|
| [Wasted Spend Killer](playbooks/performance/perf-wasted-spend-killer.md) | Performance Marketer | Which spend to kill / refresh / watch / keep — at real margin |
| [Contribution Profit by Channel](playbooks/founder/commerce-contribution-profit-by-channel.md) | Founder / CEO | Which channels create profit, not just revenue |
| [Weekly Trading Deck](playbooks/ecommerce/ecom-weekly-trading-deck.md) | Head of Ecommerce | What happened this week, why, and what to do next |
| [Tracking Sanity Check](playbooks/ecommerce/ecom-tracking-sanity.md) | Head of Ecommerce | Can we trust the numbers before we act on them |
| [GMC Feed Audit](playbooks/merchandising/merch-gmc-feed-audit.md) | Merchandising Manager | Which feed issues are blocking visibility and sales |
| [Klaviyo Flow Health Check](playbooks/retention/email-flow-health-check.md) | Retention / Email Lead | Which lifecycle flows are leaking revenue |

See [TOP_25_PLAYBOOKS.md](TOP_25_PLAYBOOKS.md) for the full launch set, or browse:

- [By persona](indexes/by-persona.md) · [By category](indexes/by-category.md) · [By platform](indexes/by-platform.md) · [By cadence](indexes/by-cadence.md) · [By business question](indexes/by-business-question.md)
- [Machine-readable manifest](indexes/manifest.json) · [llms.txt](llms.txt)

## What makes a real playbook here

Every play must:

1. Answer one recurring ecommerce operating decision.
2. Name the exact evidence required, with real metric names.
3. Use numeric decision rules — every call carries a number, a source, a time window, and a confidence level.
4. Include weak-data vetoes that stop a wrong decision.
5. Show a worked example with real figures.
6. Default to read-only analysis. Writes need explicit approval.

**No two playbooks share boilerplate.** CI enforces it. See [PLAYBOOK_STANDARD.md](PLAYBOOK_STANDARD.md) and [GOVERNANCE.md](GOVERNANCE.md).

## Manual vs ShopMCP

|  | Manual | With ShopMCP |
|---|---|---|
| **Data** | You export and reconcile CSVs | Live, connected commerce / ads / analytics / lifecycle / finance |
| **Time** | 30–90 min per play | 3–8 min per play |
| **Cadence** | You remember to run it | Scheduled — it runs itself |
| **Action** | Copy results into tools by hand | Approved, gated write-back |

The repo teaches the play. ShopMCP runs the play.

## Star this repo

If a play saves you a spreadsheet afternoon, **star the repo** — it helps other operators find it, and it's the only "payment" the free playbooks ask for.

## Contributing

We accept operating questions, evidence depth, platform-specific variants, examples, and failure modes. We do not accept generic prompt dumps. Start with [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Validation scripts and tooling are MIT licensed. Written playbook content is available under CC BY 4.0. See [LICENSE](LICENSE) and [CONTENT_LICENSE.md](CONTENT_LICENSE.md).

---

Maintained by **[Perceptiv](https://perceptiv.digital)** — the ecommerce growth agency that runs these plays for a living. Powered by **[ShopMCP](https://my.shop-mcp.app)**.
