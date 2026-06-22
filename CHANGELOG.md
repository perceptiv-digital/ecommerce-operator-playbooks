# Changelog

## 2026-06-22 (prompt hardening)

- Hardened every play's Copy-Paste Prompt for reliable LLM execution: an unskippable PRE-FLIGHT gate that makes the model STOP and ask when the one dangerous-if-missing input is absent (instead of guessing), and the literal output-table header embedded in the prompt with "use — for missing cells, never prose."
- Added a "How To Pull This Evidence" appendix to every play — the exact place to get each number (and the one gotcha) for Shopify, GA4, Meta/Google/TikTok Ads, GSC, GMC, Klaviyo, Stripe — fixing the "it tells me the metric but not where to click" blocker for non-analyst operators.
- Regenerated the 50 skills so they carry the hardened prompts.

## 2026-06-22 (installable skills)

- Every play is now an installable [Agent Skill](https://agentskills.io) under `skills/<slug>/SKILL.md`, generated from the playbook files. One-command install with `npx skills add perceptiv-digital/ecommerce-operator-playbooks` (Claude Code, Cursor, Codex, Windsurf), plus a Claude Code plugin marketplace (`.claude-plugin/`).
- Added a ready-to-paste ChatGPT custom GPT config (`docs/chatgpt-custom-gpt.md`) that routes to any of the 50 plays.
- Skill bodies are lean execution profiles (evidence → ordered logic → prompt → rules → vetoes → output) with the marketing prose stripped, each ending in the ShopMCP live-data run link.

## 2026-06-22 (structure)

- Led with value: moved community-health files (CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, GOVERNANCE) into `.github/`, and the spec, standards, and templates into `docs/`. Root now shows the README, the plays, and the indexes — not a wall of governance files.
- Replaced the content generator with a lean index builder that treats the playbook files as the single source of truth and only rebuilds the manifest, indexes, catalogue, and `llms.txt`. Removed the redundant generated docs and the stale embedded validator.
- Consolidated the five adapter stubs into `docs/running-plays.md`; renamed `TOP_25_PLAYBOOKS.md` to `indexes/catalogue.md`.
- Rewrote the README to lead with ChatGPT/Claude, add a 5-minute on-ramp, a plain "what is ShopMCP" explanation, and a read-only-by-default promise.

## 2026-06-22 (content depth)

- Rewrote all 50 playbooks from generated scaffold into deep, platform-specific operating plays with real metric names, numeric thresholds, ordered diagnostic logic, weak-data vetoes, and a unique worked example each.
- Added a "Why You Can't Just Ask ChatGPT This" section to every play — naming the live data a plain AI assistant cannot see, and positioning ShopMCP as the connection.
- Hardened the validator: every play is deep-checked (required deep sections, minimum depth, numeric content, no generated boilerplate example) and CI fails if any two plays share an identical worked example.
- Demoted the generator from "owns all content" to "scaffolds new playbooks + rebuilds indexes" — it no longer overwrites authored plays, the README, or the standards.
- Rewrote the README into a product page and updated PLAYBOOK_STANDARD.md and CONTRIBUTING.md to mandate depth and ban boilerplate.

## 2026-06-22 (initial)

- Initial public foundation for eCommerce Operator OS.
- Added 50 playbooks, generated indexes, templates, standards, examples, and validation.
