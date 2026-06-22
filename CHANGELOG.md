# Changelog

## 2026-06-22

- Rewrote all 50 playbooks from generated scaffold into deep, platform-specific operating plays with real metric names, numeric thresholds, ordered diagnostic logic, weak-data vetoes, and a unique worked example each.
- Added a "Why You Can't Just Ask ChatGPT This" section to every play — naming the live data a plain AI assistant cannot see, and positioning ShopMCP as the connection.
- Hardened the validator: every play is deep-checked (required deep sections, minimum depth, numeric content, no generated boilerplate example) and CI fails if any two plays share an identical worked example.
- Demoted the generator from "owns all content" to "scaffolds new playbooks + rebuilds indexes" — it no longer overwrites authored plays, the README, or the standards.
- Rewrote the README into a product page and updated PLAYBOOK_STANDARD.md and CONTRIBUTING.md to mandate depth and ban boilerplate.

## 2026-06-22 (initial)

- Initial public foundation for eCommerce Operator OS.
- Added 50 playbooks, generated indexes, templates, standards, examples, and validation.
