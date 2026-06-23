# Changelog

## 2026-06-22 (lean frontmatter)

- Trimmed every play's YAML frontmatter from about 24 fields to the 9 that actually drive the indexes and skills (slug, title, operating_question, primary_persona, personas, category, platforms, cadence, public_tier). The rest were vestigial scaffold that nothing read. This shrinks the metadata table GitHub renders at the top of each play, so the playbook itself leads.
- The generator now derives the summary and the ShopMCP block, so they no longer clutter the file. The manifest, indexes, catalogue and the 58 skills are unchanged in output.

## 2026-06-22 (public CTAs)

- Reworked every play's "Run This Play With Live Data" CTA: removed the subscriber-only `my.shop-mcp.app/playbooks/<slug>` deep links (they don't publicly route yet), reframed the example prompt as a "already a subscriber? paste this" action, and pointed new users to a clean public trial link.
- All ShopMCP CTAs now point to the public site (`https://shop-mcp.app`), use markdown links so the UTM lives in the href but isn't shown in the rendered text, and mention the free 14-day trial (no credit card). Skill pointers and the ChatGPT GPT config were updated to match.

## 2026-06-22 (final polish)

- Final QA pass: fixed the README "full library" link (it now points to the complete indexes; the curated launch set is labelled as such) and relabelled the catalogue to say it's a highlight subset of all 58 plays.
- Corrected the SEO Quick Wins decision vocabulary (WIN, not KILL), removed a stray heading inside the Tracking Setup Audit prompt (and its skill), and aligned the Scope-Creep worked example to its 10-column output contract.
- Linked the single-store fixture from the README and removed an empty examples stub.

## 2026-06-22 (agency depth)

- Took the agency persona from 2 plays to 10 — the cross-client multiplier the primary ICP wanted, visible in the free manual version: roster wasted-spend rollup, roster anomaly radar, new-client onboarding audit, tracking-setup audit, portfolio efficiency watch, QBR builder, upsell radar, and retainer scope-creep watch.
- Added a synthetic agency roster fixture (`examples/synthetic-agency/`) and a worked sample output so agencies can dry-run the roster plays with no real client data.
- Added a "ShopMCP for agencies" page answering the read-only / client-isolation / data questions, and an agency on-ramp in the README. The library is now 58 plays.

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
