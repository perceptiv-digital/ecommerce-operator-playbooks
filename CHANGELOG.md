# Changelog

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
