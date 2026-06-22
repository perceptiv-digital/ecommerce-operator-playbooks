# eCommerce Operator OS

**Evidence-first AI playbooks for ecommerce operators.** Read them free. Run them by hand in ChatGPT or Claude. Or run them on your live store data in one prompt with ShopMCP.

![Stars](https://img.shields.io/github/stars/perceptiv-digital/ecommerce-operator-playbooks?style=social)
![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-2563eb)

> Marketing isn't a pile of prompts. Ecommerce growth is a set of operating decisions — the same plays great operators run every week. This is that playbook, written down and given away.

Each play tells an AI exactly **what evidence to gather, in what order, when to stop, what "confident" means, and what needs your approval** — so you get a defensible decision, not a confident guess.

## Install (optional) — run the plays as skills

Install all 50 as native skills in **Claude Code, Cursor, Codex, or Windsurf**:

```bash
npx skills add perceptiv-digital/ecommerce-operator-playbooks
```

Or as a Claude Code plugin — `/plugin marketplace add perceptiv-digital/ecommerce-operator-playbooks` then `/plugin install ecommerce-operator-os`. For ChatGPT, see [the custom GPT setup](docs/chatgpt-custom-gpt.md). Prefer copy-paste? Every play also works by hand — just read on.

## New here? Start in 5 minutes

1. Open the [**Tracking Sanity Check**](playbooks/ecommerce/ecom-tracking-sanity.md) — confirm you can trust your numbers before acting on them.
2. Then run the [**Weekly Trading Deck**](playbooks/ecommerce/ecom-weekly-trading-deck.md) — what happened this week, why, and the 3 things to do next.
3. Copy the play's **Copy-Paste Prompt** into ChatGPT or Claude, paste your data, done. → [How to run a play](docs/running-plays.md)

## The flagship plays

| Play | Best for | The decision it makes |
|---|---|---|
| [Wasted Spend Killer](playbooks/performance/perf-wasted-spend-killer.md) | Performance Marketer | Which spend to kill / refresh / watch / keep — at real margin |
| [Contribution Profit by Channel](playbooks/founder/commerce-contribution-profit-by-channel.md) | Founder / CEO | Which channels create profit, not just revenue |
| [Weekly Trading Deck](playbooks/ecommerce/ecom-weekly-trading-deck.md) | Head of Ecommerce | What happened this week, why, and what to do next |
| [Tracking Sanity Check](playbooks/ecommerce/ecom-tracking-sanity.md) | Head of Ecommerce | Can we trust the numbers before we act on them |
| [GMC Feed Audit](playbooks/merchandising/merch-gmc-feed-audit.md) | Merchandising Manager | Which feed issues are blocking visibility and sales |
| [Klaviyo Flow Health Check](playbooks/retention/email-flow-health-check.md) | Retention / Email Lead | Which lifecycle flows are leaking revenue |

**Browse all 50** → [catalogue](indexes/catalogue.md) · [by persona](indexes/by-persona.md) · [by category](indexes/by-category.md) · [by platform](indexes/by-platform.md) · [by cadence](indexes/by-cadence.md) · [by business question](indexes/by-business-question.md)

## Free to read and run by hand — here's the honest catch

You can run every play yourself, today, for free: open it, gather the data it asks for, and paste its prompt into ChatGPT or Claude.

The catch is the data. Most plays need numbers your AI assistant **can't see** — your Shopify orders, Meta and Google ad accounts, Klaviyo flows, Merchant Center feed. By hand, that means exporting and reconciling CSVs every week.

So we give the whole method away. The thinking is the easy part; the live-data access is the hard part — and that's what ShopMCP is for.

## What is ShopMCP?

**ShopMCP connects your store, ads, analytics, email/SMS, and finance tools to your AI assistant** — so you can ask these operating questions in plain English and get the answer from your *live* data, with no exports. It's the same plays in this repo, pre-built and run in one prompt. It is **read-only by default**: it never changes anything in your accounts without your explicit approval.

|  | By hand (free) | With ShopMCP |
|---|---|---|
| **Data** | You export and reconcile CSVs | Live and connected — no exports |
| **Time** | 30–90 min per play | 3–8 min per play |
| **Cadence** | You remember to run it | Scheduled — it runs itself |
| **Actions** | You make every change manually | Drafted for you, applied only on your approval |

→ [See ShopMCP](https://my.shop-mcp.app)

## What makes a real playbook here

Every play answers one recurring decision, names the exact evidence, uses numeric decision rules (every call carries a number, source, time window, and confidence), includes weak-data vetoes, shows a worked example with real figures, and defaults to read-only. **No two plays share boilerplate — CI enforces it.** → [The full standard](docs/playbook-standard.md)

## Star this repo

If a play saves you a spreadsheet afternoon, **star it** — it helps other operators find it, and it's the only "payment" the free playbooks ask for.

## Contributing & license

Contributions welcome — operating questions, evidence depth, platform-specific variants, examples, failure modes. We don't accept generic prompt dumps. See [contributing](.github/CONTRIBUTING.md).

Tooling is MIT licensed; the written playbooks are [CC BY 4.0](docs/content-license.md) — share and adapt them with attribution.

---

Maintained by **[Perceptiv](https://perceptiv.digital)** — the ecommerce growth agency that runs these plays for a living. Powered by **[ShopMCP](https://my.shop-mcp.app)**.
