# Synthetic agency roster

A fake 5-client roster so you can dry-run the agency playbooks (Roster Wasted-Spend Rollup, Portfolio Efficiency Watch, Roster Anomaly Radar) with **no real client data**.

`roster_spend.csv` — one row per client × ad platform for a 7-day window:

| Column | Meaning |
|---|---|
| `client` | fictional client name |
| `platform` | meta / google / tiktok |
| `spend_7d` | ad spend, last 7 days |
| `platform_orders` | orders the ad platform *claims* |
| `commerce_orders` | orders actually in the store (the truth — note the gap) |
| `revenue_7d` | commerce revenue attributed to the channel |
| `cogs_pct` | blended cost of goods as a fraction (for contribution math) |
| `target_cpa` | the client's target cost per acquisition |

Paste it into the [Roster Wasted-Spend Rollup](../../playbooks/agency/agency-roster-wasted-spend.md) or [Portfolio Efficiency Watch](../../playbooks/agency/agency-portfolio-mer-watch.md) prompt and watch the `platform_orders`-vs-`commerce_orders` gap (and the margins) change which client tops the list. A [sample output](../sample-outputs/agency-roster-wasted-spend.md) is included.
