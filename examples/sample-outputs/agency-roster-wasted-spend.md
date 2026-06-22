# Sample output — Roster Wasted-Spend Rollup

The [Roster Wasted-Spend Rollup](../../playbooks/agency/agency-roster-wasted-spend.md) play run across a 5-client roster for the last 7 days, using [`examples/synthetic-agency/roster_spend.csv`](../synthetic-agency/roster_spend.csv). This is what the play returns.

> **Executive read:** ~$4.6k of weekly spend is at risk across the roster, concentrated in two clients. Belmonte Coffee has a clean kill — $1,240 on Meta with **zero** commerce orders in 7 days. Tinderbox Goods looks fine on platform ROAS but is underwater at a 48% COGS once you re-rank by contribution. Aurelia and Marlowe are healthy; Northwind needs a tracking check before any client call (10% platform-vs-commerce order gap).

| Client | Platform spend (7d) | Commerce orders | Real ROAS @ margin | Spend at risk | Top leak | Status | Owner |
|---|---|---|---|---|---|---|---|
| Belmonte Coffee | $4,540 | 38 | 0.7 (Meta 0.0) | $1,240 | Meta: $1,240, 0 orders, mature | **KILL** (Meta) | AM + Perf |
| Tinderbox Goods | $5,500 | 32 | 1.0 @ 48% COGS | $3,400 | Meta prospecting underwater at margin | **REFRESH** | Perf |
| Northwind Outdoors | $7,250 | 74 | unsafe | — | platform↔commerce order gap ~10% | **FIX** (tracking) | Analytics |
| Aurelia Skincare | $7,100 | 78 | 2.3 @ 42% COGS | — | within target band | **KEEP** | — |
| Marlowe & Field | $4,100 | 53 | 3.1 @ 30% COGS | — | within target band | **KEEP** | — |

**Next actions:** kill Belmonte's catch-all Meta campaign today; rebuild Tinderbox's Meta prospecting offer (do **not** scale it); run the [Tracking Sanity Check](../../playbooks/ecommerce/ecom-tracking-sanity.md) on Northwind before Thursday's call. Re-check the roster next Monday.

*Numbers are illustrative, generated from the synthetic fixture — your run will reflect your clients' live data.*
