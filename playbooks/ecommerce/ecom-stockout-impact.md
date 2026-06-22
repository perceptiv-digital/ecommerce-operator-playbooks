---
schema_version: 1
slug: "ecom-stockout-impact"
title: "Stockout Lost-Revenue Impact"
summary: "Stockout Lost-Revenue Impact helps ecommerce operators answer: Which stockouts are costing the most demand or revenue?"
operating_question: "Which stockouts are costing the most demand or revenue?"
short_title: "Stockout Lost-Revenue Impact"
primary_persona: "ecommerce"
personas: ["ecommerce", "merchandising", "operations"]
category: "merchandising-feed"
platforms: ["commerce", "google-analytics-4"]
cadence: "daily"
difficulty: "standard"
manual_time_minutes_min: 30
manual_time_minutes_max: 75
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "fast-follow"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/ecom-stockout-impact"
shopmcp_prompt: "Run the Stockout Lost-Revenue Impact play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Stockout Lost-Revenue Impact

## Operating Question

**Which of my current and recent stockouts have already cost the most demand or contribution profit — and which ones aren't worth chasing?**

This play measures *realised* loss from products that are out of stock or near-empty right now, so you can rank the bleed and escalate the few SKUs that matter. It is not the prevention play (forecasting which winners are *about* to run dry is a separate workflow). Here you take SKUs that already went dark, reconstruct what they would have sold, and turn that into a dollar figure a Head of Ecommerce can take to ops and demand its restock be expedited. The output is a ranked **lost-contribution** list, not a vague "we had some stockouts" note.

## Why You Can't Just Ask ChatGPT This

A bare AI assistant can reason about stockout math, but it cannot see your store or your analytics. To run this for real you have to:

1. Pull the **current inventory snapshot** (which SKUs/variants are at 0 or below your safety floor) from Shopify/Woo/BigCommerce.
2. Pull a **clean trailing sell-rate** per SKU from order history — *excluding* the days the item was already out of stock, or your units/day will be artificially depressed by the very gap you're measuring.
3. Pull **GA4 PDP sessions** for each dead product page to see how much live demand is still hitting a Sold Out button.
4. Cross-check whether **paid spend is still routing to the OOS page** (a feed or campaign nobody paused).
5. Bolt on **contribution margin per unit**, because revenue lost is not profit lost.

**The reasoning is free; the five live joins are the work — and that is exactly what ShopMCP wires together.** If your assistant has no live line into your store and GA4, that missing connection is where every manual run stalls. The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Head of Ecommerce
- **Also useful for:** Merchandising Manager (restock prioritisation), Ops / Dispatch Lead (expedite vs. wait on the incoming PO), Performance Marketer (kill spend pointing at dead PDPs)
- Run it **before** the daily stand-up or the weekly buy/restock meeting, so the escalation list is dollar-ranked, not gut-ranked.

## When To Run It

- **Cadence:** daily — out-of-stocks are a flow problem, and a SKU that's been dark four days has already done four days of damage.
- **Triggers:** a hero SKU hitting 0, a supplier delay, a viral spike that drained a variant, an unexplained revenue dip the day after, or a buy meeting that needs a priority order.
- **Pre-requisite:** confirm the **inventory feed is fresh** (synced within the last few hours) and that "out of stock" means truly zero sellable, not a held/allocated quantity. A stale or misread inventory number poisons every downstream estimate.

## Required Evidence

- **Commerce inventory** — current on-hand / sellable quantity per SKU and variant, plus the **timestamp each item dropped to 0** (or fell below its safety floor). This defines *days out of stock*.
- **Commerce order history** — units sold per SKU over a **clean trailing window** (28–56 days is typical), with the OOS days removed, so sell-rate reflects real demand, not the gap.
- **Contribution margin per unit** — selling price minus COGS minus variable fulfilment, per SKU or a category default. Revenue lost ≠ profit lost.
- **GA4 PDP traffic** — sessions/day still landing on each out-of-stock product page over the last 7–14 days (the live demand signal that the gap is actively turning shoppers away).
- **Restock state** — incoming PO quantity and expected restock/ETA date per affected SKU.

## Optional Evidence

- **Back-in-stock signups** on the OOS PDP — demand that is partially *deferred*, not fully lost, and will recover some revenue on restock.
- **Substitute / sibling variant availability** — if the size-M is dead but size-L and size-S are in stock, much of that demand reroutes rather than evaporates.
- **Paid spend still pointing at the OOS page** — active ads or feed entries driving paid clicks into a Sold Out button (pure waste, separate from the lost-sales math).
- **Promo / launch calendar** — to avoid crediting (or blaming) the gap for a swing that a promotion actually caused.
- **Seasonality / day-of-week shape** — so a Monday-vs-weekend sell-rate isn't read as a trend.

## How To Pull This Evidence

- **Shopify inventory snapshot** — Admin → Products → Inventory, or export the inventory CSV, to flag every variant at 0 or below its safety floor. *Gotcha:* the export shows current on-hand but not the timestamp each variant hit 0 — reconstruct the drop date from the inventory adjustment history (or a daily snapshot you've been keeping), because guessing it skews days-out-of-stock.
- **Shopify sell-through / sales-by-variant report** — Analytics → Reports → "Sales by product variant SKU" over a trailing 28–56 day window gives units sold per SKU. *Gotcha:* you must exclude the OOS days from the denominator yourself; the canned report averages over the whole window and quietly deflates the very sell-rate you're trying to measure.
- **Days out of stock** — derive it from the inventory adjustment log or your own daily snapshots, not from the order gap. *Gotcha:* "no orders" ≠ "out of stock" — a SKU can go quiet for demand reasons; only the inventory timeline tells you when sellable quantity actually hit 0.
- **GA4 OOS PDP traffic** — GA4 → Reports → Pages and screens (or Explore), filter `page_path` to each dead product URL, pull sessions/day for the last 7–14 days. *Gotcha:* GA4's default 1–2 day processing lag and any consent-mode/sampling gaps undercount recent sessions — read it as a live-demand signal, not an exact count, and note the sampling.
- **Margin** — selling price minus COGS minus variable fulfilment per SKU, from your cost sheet or Shopify's per-variant cost field (Inventory → Cost per item). *Gotcha:* Shopify's "cost per item" is often unset or stale and rarely includes pick/pack/ship — fall back to a category default and label it estimated rather than treating a blank as zero.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Confirm the gap is real.** Inventory feed fresh, quantity truly 0/below floor, and the drop timestamp is trustworthy. If inventory is stale or ambiguous, mark the SKU **FIX** and stop — don't estimate loss on a number you don't trust.
2. **Qualify velocity.** Compute trailing sell-rate (units/day) on a **clean window with OOS days removed**. If the SKU is erratic or low-velocity (roughly < ~1 unit/day or a wildly spiky history), it is **WATCH** at most — a confident loss figure isn't defensible.
3. **Size the realised loss.** For qualifying SKUs: `lost units = clean sell-rate × days out of stock`; `lost contribution = lost units × contribution margin/unit`. This dollar figure, not the unit count, is the ranking key.
4. **Discount for recoverable demand.** Subtract what substitution (in-stock siblings) and back-in-stock signups will recover. Never double-count the same lost sale across a variant group — attribute it once.
5. **Add the live-demand and waste overlays.** High current GA4 PDP sessions on a dead page = the gap is actively bleeding *now* → escalate. Paid spend still routing there = an immediate, separate **FIX** (pause the ad/feed), independent of restock timing.
6. **Check the restock clock, then assign status.** If a PO lands within ~48h, expediting may be moot → **WATCH** and let it arrive. If the ETA is far out or unknown on a high-loss SKU, **REFRESH** (expedite / substitute / reallocate). Then apply the vetoes and attach owner + recheck.

## Manual Workflow

1. Export the current inventory snapshot and flag every SKU/variant at 0 or below its safety floor, with the timestamp it went dark.
2. Pull order history and compute each flagged SKU's trailing sell-rate **with the OOS days excluded** from the denominator.
3. Pull GA4 PDP sessions/day for each dead product page (last 7–14 days).
4. Join margin per unit, incoming-PO ETA, back-in-stock signups, and sibling-variant stock onto each row.
5. Compute `sell-rate × days out × margin` per SKU, then net out substitution and deferred demand.
6. Paste the prompt below with your table; pressure-test each escalation against the vetoes; convert survivors into an action packet with owner and recheck date.

## Copy-Paste Prompt

```text
You are my ecommerce inventory analyst running the "Stockout Lost-Revenue Impact" play.

GOAL: rank my current and recent out-of-stock SKUs by REALISED lost contribution profit,
and tell me which ones are worth escalating versus letting ride.

I will paste: a list of out-of-stock SKUs with the date each went to 0, a clean trailing
sell-rate per SKU (units/day, with OOS days already excluded), contribution margin per unit,
GA4 PDP sessions/day on each dead page, incoming-PO ETA, back-in-stock signups, and
sibling-variant stock. Some fields may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the per-SKU clean
sell-rate (over a clean pre-stockout window with OOS days excluded), the days out of stock,
or the contribution margin per unit is missing, STOP and return only (a) what's missing and
(b) how to get it — never estimate it or proceed.

RULES:
- Lost units = clean sell-rate x days out of stock. Lost contribution = lost units x margin/unit.
  Rank by lost CONTRIBUTION, not units and not revenue.
- Do NOT value lost demand on erratic or low-velocity SKUs (roughly <1 unit/day or spiky history):
  mark WATCH and say the estimate is not defensible.
- Net out recoverable demand: subtract substitution to in-stock siblings and back-in-stock
  signups. Never double-count the same lost sale across a variant group.
- If paid spend is still pointing at an out-of-stock page, flag it as immediate waste (FIX)
  separate from the lost-sales math.
- If a restock PO lands within ~48h, treat expediting as low-value (WATCH); escalate only when
  ETA is far out or unknown on a high-loss SKU.
- If the inventory number is stale or ambiguous, mark FIX and do not estimate loss on it.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read (total lost contribution + the top offender).
2. A ranked table using exactly this header row:
   | SKU | Days OOS | Clean sell-rate | Lost units | Margin/unit | Lost contribution | Live PDP sessions/day | Recoverable | Restock ETA | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the table with prose.
3. Vetoes/caveats that downgraded any row.
4. What evidence is blocked and what would upgrade a WATCH/FIX to a confident escalation.
```

## Decision Rules

- **REFRESH (escalate)** — high lost contribution (clean velocity × days out × margin), restock ETA far out or unknown, and recoverable demand doesn't cover the gap → expedite the PO, source a substitute, or reroute demand to a sibling.
- **FIX** — the inventory number is stale/ambiguous, OR paid spend is still pointing at the dead PDP (pause that ad/feed now, independent of restock).
- **WATCH** — directional only: low or erratic velocity, a tiny number of days out, or a restock landing within ~48h that makes expediting moot.
- **KEEP** — back in stock, fully recovered via siblings, or the loss is immaterial after netting recoverable demand.
- **KILL** — discontinue chasing a chronically OOS SKU with thin velocity and no margin case; stop spending attention (and any ad budget) on it.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do **not** assign a dollar loss to erratic or sub-~1-unit/day SKUs — the sell-rate is too noisy to defend.
- Do **not** double-count demand across a variant group when an in-stock sibling absorbs it.
- Do **not** treat back-in-stock-signup demand as fully lost — it is partially deferred and recovers on restock.
- Do **not** escalate or expedite before checking the incoming-PO ETA; a restock inside ~48h usually beats a rush order.
- Do **not** compute sell-rate over a window that includes the OOS days — it deflates the very number you're measuring.
- Do **not** trigger a restock, expedite, ad pause, or catalog change without explicit human approval.

## Output Contract

A SKU-level table ranked by **lost contribution**, with status and evidence per row:

| SKU | Days OOS | Clean sell-rate | Lost units | Margin/unit | Lost contribution | Live PDP sessions/day | Recoverable | Restock ETA | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Example variant | 3 | 8/day | 24 | $14 | $336 | 180 | sibling absorbs ~40% | 6 days | REFRESH | Merch | 24h |

## Worked Example

> **Executive read:** Three active stockouts have cost roughly **$1,290 in contribution over the last week**, concentrated almost entirely in one SKU. The *Trail Runner Sock — Black/M* has been dead 4 days at ~12 units/day and $18 margin (~$864 lost) while still pulling ~300 PDP sessions/day, and its restock PO isn't due for 9 days — expedite it or push shoppers to the in-stock Grey/M. The other two are noise: one is a low-velocity long-tail SKU we should not value, and the third already has a sibling absorbing demand.

| SKU | Days OOS | Clean sell-rate | Lost units | Margin/unit | Lost contribution | Live PDP sessions/day | Recoverable | Restock ETA | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Trail Runner Sock — Black/M | 4 | 12/day | 48 | $18 | **$864** | ~300 | BIS signups ~15% | 9 days | **REFRESH** | Merch + Ops | 24h |
| Trail Runner Sock — Black/M (ad set) | 4 | — | — | — | — | — | — | — | **FIX** | Perf | Now |
| Merino Beanie — Charcoal | 3 | 9/day | 27 | $16 | $432 (gross) | ~110 | Grey sibling absorbs ~70% → ~$130 net | 2 days | **WATCH** | Merch | 48h |
| Enamel Pin — Retro Logo | 6 | 0.4/day | ~2 | $5 | ~$10 | ~12 | n/a | unknown | **WATCH** | Merch | 7 days |

Note how ranking by **contribution** inverts the panic order: the beanie *looks* expensive at $432 gross, but a near-identical in-stock sibling recovers most of it, so its net loss (~$130) and 2-day restock make it a WATCH — while the sock, still drawing 300 live sessions a day with a 9-day ETA, is the only real escalation. The separate FIX row is paid spend still firing at the dead sock page: pure waste, fixed by pausing the ad, with nothing to do with the restock.

## Common Failure Modes

- Computing sell-rate over a window that *includes* the stockout days, so the loss is understated.
- Valuing lost demand on a low-velocity long-tail SKU and inflating the headline number.
- Double-counting a lost sale across Black/M and Grey/M when the sibling actually caught it.
- Treating back-in-stock signups as permanently lost rather than deferred.
- Escalating a rush restock on a SKU whose normal PO lands in 36 hours.
- Quoting lost *revenue* instead of lost *contribution*, then over-escalating a thin-margin item.

## Run This Play With Live Data

**Manual version:** export the inventory snapshot, reconstruct a clean sell-rate per SKU, pull GA4 PDP sessions, join margin and restock ETAs, and net out substitution — every day, before the gap costs another day of sales.

**ShopMCP version:** connect your store and GA4 once. Ask the question; ShopMCP reads the live inventory snapshot, reconstructs each SKU's clean trailing sell-rate with OOS days already excluded, overlays live PDP sessions and any paid spend still routing to dead pages, applies margin, and returns the ranked lost-contribution table. It stays **read-only** until you explicitly approve an expedite, reallocation, or ad pause.

> No store or GA4 connection inside your AI assistant? That's the wall every manual run hits. ShopMCP *is* the connection — the same playbook then runs in one prompt instead of a five-export morning.

Example ShopMCP prompt:

```text
Run the Stockout Lost-Revenue Impact play for the last 30 days. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/ecom-stockout-impact?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Manual inventory exports and stale stock snapshots.
- Rebuilding a clean, OOS-excluded sell-rate per SKU by hand.
- Copy-pasting between your store, GA4, and your margin sheet.
- Hunting for the ad set or feed entry still pointing at a Sold Out page.
