# Contributing

Thanks for helping build the best open library of ecommerce operating playbooks.

We accept operating questions, sharper evidence checklists, platform-specific depth, better decision logic, real failure modes, and worked examples. We reject generic prompt dumps.

## What a great contribution looks like

- It answers **one** recurring ecommerce operating decision.
- It is deep and specific: real metric names, numeric thresholds, the ordered diagnostic an expert uses.
- It includes a **Worked Example** with realistic numbers unique to the play.
- It names the live data a plain AI assistant cannot see (the "Why You Can't Just Ask ChatGPT This" section).
- It is **runnable manually**, end to end, with no ShopMCP account.
- It is **read-only by default**; any write needs an explicit approval step.

## Not accepted

- Generic prompts or "act as an expert" wrappers.
- Boilerplate that reuses another playbook's Decision Rules, Veto Rules, or Worked Example.
- Unsupported benchmarks, invented causality, or vendor spam.
- Anything that asks an AI to write to a live system without approval.

## How to add or improve a playbook

1. Read [the playbook standard](../docs/playbook-standard.md) and the reference play: [perf-wasted-spend-killer.md](../playbooks/performance/perf-wasted-spend-killer.md).
2. Start from [the playbook template](../docs/templates/playbook-template.md). Set `contributed_by: "Your Agency"` in the frontmatter and the `*Contributed by [Your Agency](https://youragency.com).*` line at the bottom. Run `npm run bootstrap` to rebuild the indexes.
3. Write real depth. Match the reference play's standard.
4. Run `npm run validate` — every play is deep-checked and must have a unique worked example.
5. Open a PR using the template.

## Become a contributing partner

Specialist agencies (retention, PPC, SEO, CRO, feed, analytics) can own a lane in this library. You contribute a few deep plays in your specialty and they ship with your byline and a dofollow link, here and on the [Partners page](../PARTNERS.md). The method stays open (CC BY) and the credit is yours. See the [contributor brief](../docs/contributor-brief.md).
