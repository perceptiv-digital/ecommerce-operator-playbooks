# Changelog

## 2026-06-22

- Rewrote the 10 flagship playbooks from generated scaffold into deep, platform-specific operating plays with real metric names, numeric thresholds, ordered diagnostic logic, weak-data vetoes, and unique worked examples.
- Added a "Why You Can't Just Ask ChatGPT This" section to flagship plays — naming the live data a plain AI assistant cannot see, and positioning ShopMCP as the connection.
- Hardened the validator: flagship plays are now deep-checked (required deep sections, minimum depth, numeric content) and CI fails if two flagship plays share an identical worked example. Remaining non-flagship boilerplate is tracked as a warning.
- Demoted the generator from "owns all content" to "scaffolds new playbooks + rebuilds indexes" — it no longer overwrites authored plays, the README, or the standards.
- Rewrote the README into a product page and updated PLAYBOOK_STANDARD.md and CONTRIBUTING.md to mandate depth and ban boilerplate.

## 2026-06-22 (initial)

- Initial public foundation for eCommerce Operator OS.
- Added 50 playbooks, generated indexes, templates, standards, examples, and validation.
