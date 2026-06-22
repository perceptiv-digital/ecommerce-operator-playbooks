# ShopMCP for agencies

These playbooks are written for operators who run many stores. Running them by hand across a roster means exporting and reconciling data from every client's Shopify, ad, analytics, and email accounts — every week. ShopMCP connects all of them so you run a play across the whole roster in one prompt.

## The questions agencies ask before connecting client accounts

**Is it read-only?** Yes, by default. ShopMCP reads and analyses; it does not change anything in a client's accounts on its own. Any write-like action (pausing a campaign, editing a product, sending a message) requires an explicit, per-action approval and a preview of exactly what will change. Every play in this repo is `default_mode: read-only`.

**Are clients isolated?** Each client is a separate workspace. You connect a client's accounts to their workspace; plays run per client or rolled up across the roster, and access is scoped per workspace.

**What does it connect to?** Shopify and other storefronts, Meta / Google / TikTok ads, Google Merchant Center, GA4, Search Console, Klaviyo and other email/SMS, Stripe, and more. See the platform list in the [catalogue](../indexes/catalogue.md) and each play's **Required Evidence**.

**What does it cost, and how is data handled?** ShopMCP has per-operator and multi-client agency plans. For current plans, data handling, and security details, see [shop-mcp.app](https://shop-mcp.app) — it's free for 14 days, no credit card. This repo deliberately doesn't restate pricing or security specifics so they can't go stale — check the source.

## The agency plays

Browse them via the [agency persona index](../indexes/by-persona.md):

- **[Roster Wasted-Spend Rollup](../playbooks/agency/agency-roster-wasted-spend.md)** — which clients are bleeding ad spend this week, ranked by contribution at risk.
- **[Roster Anomaly Radar](../playbooks/agency/agency-roster-anomaly-watch.md)** — which client needs a human this morning, across the whole book.
- **[Client Health Score](../playbooks/agency/agency-client-health-score.md)** — weekly red/amber/green triage before the next meeting.
- **[New-Client Onboarding Audit](../playbooks/agency/agency-new-client-audit.md)** — the week-one fix list for a store you just took on.
- **[Client Tracking Setup Audit](../playbooks/agency/agency-tracking-setup-audit.md)** — can we trust this client's tracking before we report or scale?
- **[Portfolio Efficiency Watch](../playbooks/agency/agency-portfolio-mer-watch.md)** — which clients' blended efficiency is sliding toward breakeven.
- **[Client QBR Builder](../playbooks/agency/agency-qbr-builder.md)** — a board-ready quarterly review from the client's data.
- **[Retention Intelligence Packet](../playbooks/agency/agency-retention-intelligence-packet.md)** — what to tell a client about retention risk.
- **[Client Upsell Radar](../playbooks/agency/agency-upsell-radar.md)** — which clients have a data-backed reason to expand.
- **[Retainer Scope-Creep Watch](../playbooks/agency/agency-scope-creep-watch.md)** — which clients are underwater against their retainer (your own margin).

**Dry-run before connecting anything.** Try the roster plays against the [synthetic roster fixture](../examples/synthetic-agency/) — a fake 5-client book — so you can see the deliverable with no real client data.
