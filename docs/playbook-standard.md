# Playbook Standard

A playbook is not a prompt. A playbook is an operating workflow for one specific ecommerce decision — deep enough that a senior operator recognises their own judgement in it.

The reference implementation is [perf-wasted-spend-killer.md](../playbooks/performance/perf-wasted-spend-killer.md). Match its depth.

## Required anatomy

1. **Operating Question** — one recurring decision, in the operator's words.
2. **Why You Can't Just Ask ChatGPT This** — the live data a plain AI assistant cannot see, and the manual cost of getting it.
3. **Who / When To Run It** — owner, cadence, triggers, pre-requisites.
4. **Required + Optional Evidence** — named sources, real metric names, freshness.
5. **The Decision Logic** — the ordered diagnostic an expert actually follows.
6. **Manual Workflow** — runnable today with exports and an AI assistant.
7. **Copy-Paste Prompt** — specific to this play; never a generic wrapper.
8. **Decision Rules** — numeric thresholds. Every recommendation carries a number, source, time window, and confidence level.
9. **Veto Rules** — weak-data and commercial vetoes that stop a wrong call.
10. **Output Contract** — the exact table and columns the play returns.
11. **Worked Example** — realistic numbers unique to this play, plus a short executive read.
12. **Common Failure Modes.**
13. **Run This Play With Live Data** — the manual-vs-ShopMCP contrast, one CTA, read-only default.
14. **Credit** — `contributed_by` in the frontmatter and a `*Contributed by [Agency](url).*` line at the bottom, so the author is credited everywhere the play travels.

## Hard rules

- **No shared boilerplate.** Two playbooks must never share Decision Rules, Veto Rules, or a Worked Example. CI deep-checks every play and fails the build if any two share an identical worked example.
- **Give away the full method.** The moat is live-data access (integrations), not the words. A playbook must be 100% useful to read and run manually, with no ShopMCP account.
- **Read-only by default.** Any write-like action needs an explicit approval step and a supported preview/apply path.
- **Numbers or it didn't happen.** Thresholds, examples, and outputs carry real figures, sources, and time windows.
- **Credit the author.** Every play names its contributing agency in `contributed_by` and the footer. CI checks the footer is present.
