---
schema_version: 1
slug: "email-winback-builder"
title: "Winback Builder"
summary: "Winback Builder helps ecommerce operators answer: Which dormant customers are worth trying to win back?"
operating_question: "Which dormant customers are worth trying to win back?"
short_title: "Winback Builder"
primary_persona: "retention"
personas: ["retention"]
category: "retention-ltv"
platforms: ["commerce", "klaviyo"]
cadence: "monthly"
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/email-winback-builder"
shopmcp_prompt: "Run the Winback Builder play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Winback Builder

## Operating Question

**Which dormant customers are actually worth paying to win back this month — and which should I stop mailing entirely to protect my sending reputation?**

Every store accumulates a graveyard of customers who bought once or twice and went quiet. The lazy move is to dump all of them into one "we miss you, here's 20% off" blast. That is two mistakes at once: you discount the people who were going to reorder anyway, and you wake up a spam-trap of dead addresses that drags your whole list's deliverability down. This play splits the dormant base into **win-back-worthy**, **watch**, and **sunset** by crossing each customer's *prior value* against *their category's natural purchase cycle* — so "lapsed" means "past the point they should have reordered," not an arbitrary 90 days — then sizes the offer against margin so the win-back actually earns money.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant can reason about win-back theory all day, but it cannot see who your dormant customers are. To run this for real you have to assemble four things it has no access to:

1. **Order history per customer** from Shopify/Woo/BigCommerce — first order date, last order date, order count, lifetime revenue, and the product categories they bought.
2. **A category-specific reorder cadence** — coffee and supplements churn through in 30–45 days; skincare runs 60–90; mattresses and outerwear are 1–3 years. You compute the *expected* reorder gap per category, then flag who has blown past it.
3. **Klaviyo engagement state** per profile — last open, last click, days since last engagement — because deliverability, not the offer, decides whether mailing the deeply unengaged is safe.
4. **Contribution margin** per product/category, so the offer depth can be justified against the gross profit a reactivation actually brings in.

**The reasoning here is free. Stitching customer order history to category cadence to Klaviyo engagement to margin is the hard part — and that is exactly the wall a disconnected assistant hits.** Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Retention / Email Lead
- **Also useful for:** Ecommerce Manager (which segments to discount vs. protect), Founder/CEO (how much dormant LTV is genuinely recoverable), Deliverability owner (list hygiene / sunset policy).
- Run it when you are about to build or refresh a win-back flow, or before any "reactivation campaign" goes out — so the send list is segmented and suppressed, not blasted.

## When To Run It

- **Cadence:** monthly — dormancy is a slow-moving population; weekly re-segmentation just adds noise.
- **Triggers:** a planned win-back campaign, a deliverability scare (rising spam complaints, a dip in inbox placement), a quarter where new-customer acquisition is expensive and reactivation looks cheaper, or a list-cleaning / Klaviyo cost-tier review.
- **Pre-requisite:** confirm your **purchase-event tracking and Klaviyo profile sync are healthy** first. If "last order date" or "last engaged" is stale, every dormancy and cadence calc downstream is wrong — segment on bad timestamps and you sunset live customers.

## Required Evidence

- **Commerce customer ledger** — per customer: first order date, last order date, total orders, lifetime net revenue, AOV, and the categories/products purchased. Pull the **full dormant base**, not a sample.
- **Category reorder cadence** — for each major category, the typical gap between repeat orders (from your own repeat-purchase data, or a defensible category benchmark). This defines the "expected reorder window" per customer.
- **Klaviyo engagement** — per profile: subscribed status, last open, last click, days since last engagement, and current deliverability signals (spam-complaint rate, bounce rate, recent inbox-placement trend).
- **Contribution margin** — gross margin per category or blended, plus any fixed cost of the offer (free-ship threshold, sample insert), so offer depth can be tested against profit.
- **A reactivation-value assumption** — your historic win-back reactivation rate (% of mailed lapsed who reorder) and the expected near-term value of a reactivated customer.

## Optional Evidence

- **Acquisition source / first-order channel** — paid-acquired one-timers behave differently from organic repeat buyers; useful for prioritising.
- **Product-level reason-to-return** — a consumable they're due to run out of, or a new-arrivals hook in their category.
- **Prior win-back results** — open/click/conversion and unsubscribe/complaint rates from past reactivation sends, to calibrate the offer and the suppression line.
- **Discount sensitivity** — whether this base historically converts on a soft nudge vs. only on depth, so you don't over-discount.
- **Sunset / suppression history** — who you've already suppressed, to avoid re-mailing addresses you deliberately retired.

## How To Pull This Evidence

- **Lapsed segments by last-order date + prior LTV** — In Shopify, build a customer segment with `last_order_date` older than your cutoff and export with `amount_spent` / `number_of_orders` (Customers → Segments, or the Admin API `customers` + `orders` endpoints). In Klaviyo, create a segment on "Placed Order zero times in the last N days" and pull each profile's historic-revenue and order-count properties; join the two exports on email.
- **Category reorder cycle** — Compute it from your own data: pull repeat-purchase pairs per category (each customer's gap between consecutive orders of the same category) and take the median. No repeat history yet? Use a defensible category benchmark (consumables 30–45d, skincare 60–90d, durables 1–3y) and mark it estimated.
- **Engagement for sunset** — From Klaviyo, export each profile's last-open and last-click timestamps (or the "engaged in last N days" predictive/segment fields). Days-since-last-engagement is what decides who is sunset-bound, independent of the offer.
- **Margin for offer** — Pull contribution margin per category from your product/COGS data (Shopify cost-per-item on variants, or your finance sheet), so offer depth can be tested against gross profit rather than guessed.
- **Deliverability gotcha** — Klaviyo's "last open" is unreliable post-Apple Mail Privacy Protection (MPP auto-opens inflate opens). Lean on **clicks**, complaint rate, and bounce rate for the sunset call, not opens alone — or you'll keep mailing addresses that only *look* engaged.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Gate on data freshness.** If "last order date" or "last engaged" is stale or the Klaviyo↔commerce profile sync is broken, mark the whole run **FIX** and stop. You cannot segment dormancy on timestamps you don't trust.
2. **Define lapsed per category, not by a flat day count.** A customer is **lapsed** only when their gap since last order exceeds the *expected reorder window for their category* (e.g. coffee at 45 days vs. skincare at 90). Someone 70 days out on a 90-day cycle is **not** lapsed — they're due, and discounting them is pure margin leakage.
3. **Score recoverable value.** Rank lapsed customers by `prior LTV × reactivation-rate assumption`. A 2-order, $240-LTV customer who lapsed 6 weeks ago outranks a 1-order, $35 customer who vanished 11 months ago — recency of lapse and prior value both matter.
4. **Split off the deliverability risk (sunset).** Anyone deeply unengaged — no open/click in **>270 days**, especially single-order low-value profiles — goes to **KILL** (sunset / suppress). Mailing them buys nothing and risks your inbox placement for everyone else.
5. **Size the offer against margin.** The justified discount is the depth where `expected reactivation value × reactivation rate > offer cost`. High-margin categories can carry a real incentive; thin-margin SKUs should get a soft nudge (new arrivals, restock reminder, free shipping) before any percentage-off.
6. **Apply the vetoes**, then assign each segment a status, an owner, and a recheck date.

## Manual Workflow

1. Export the full dormant customer ledger (orders, dates, LTV, categories) and the Klaviyo engagement export; confirm the timestamps are fresh.
2. Compute each customer's days-since-last-order and compare it to the expected reorder window for their dominant category. Flag the genuinely lapsed.
3. Score the lapsed list by `prior LTV × your reactivation-rate assumption`; sort high to low.
4. Carve out the **sunset** group (>270 days unengaged, low value, single order) — these get suppressed, not mailed.
5. For the win-back-worthy tier, model offer depth against category margin and your reactivation assumption.
6. Paste the prompt below with your tables; pressure-test every "mail them" call against the veto list, then turn it into a segment plan with owner and recheck date.

## Copy-Paste Prompt

```text
You are my retention/CRM analyst running the "Winback Builder" play.

GOAL: split my dormant customers into WIN-BACK-WORTHY, WATCH, and SUNSET, and recommend an
offer depth per worthy segment that is justified by margin — without blasting everyone and
without discounting customers who were going to reorder anyway.

I will paste: my dormant customer ledger (first/last order date, order count, lifetime
revenue, categories), my category reorder cadences, Klaviyo engagement (last open/click,
days since engaged, complaint/bounce signals), and my contribution margin. Some data may
be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the critical input
is missing — lapsed customers with their prior value AND the category's natural reorder
cycle (lapsed = past their expected reorder window, not an arbitrary 90 days), plus
engagement state to identify sunset candidates — STOP and return only (a) what's missing
and (b) how to get it — never estimate it or proceed.

RULES:
- Freshness gate first: if last-order-date or last-engaged timestamps look stale or the
  commerce<->Klaviyo sync is broken, mark the run FIX and stop. Do not segment on bad dates.
- "Lapsed" is category-relative: a customer is lapsed only when their gap since last order
  exceeds the expected reorder window for THEIR category. Do not flag someone who is merely
  due to reorder on a long natural cycle.
- Score recoverable value as prior LTV x my reactivation-rate assumption. Prioritise
  high-value, recently-lapsed over old, low-value, single-order churned.
- SUNSET (suppress, do not mail) anyone deeply unengaged: no open/click in >270 days,
  especially single-order low-value profiles. Protect deliverability over reach.
- Offer depth must clear margin: recommend the smallest incentive where
  expected reactivation value x reactivation rate > offer cost. Prefer a soft nudge on
  thin-margin categories before any percentage-off.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked segment table using exactly this header row:
   | Segment | Size | Avg prior LTV | Days lapsed (vs cadence) | Engagement | Recoverable value | Recommended offer | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation (esp. anything sunset for deliverability).
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision Rules

- **KEEP / build the win-back** — lapsed past their category's reorder window, prior LTV above your blended customer average, still showing some engagement (opened or clicked in the last ~180 days), and the modelled offer clears margin. These are the customers worth a 2-message win-back.
- **WATCH** — lapsed but thin or noisy signal: a small segment (under ~50 profiles, where reactivation-rate math is unreliable), or near the edge of their reorder window, or value just below the build line. Hold, re-segment next cycle; don't over-discount on a noisy read.
- **REFRESH** — a previously mailed win-back that's decaying (open/click sliding, conversions thinning) but the audience is still viable: change the hook or offer rather than retiring the segment.
- **KILL (sunset / suppress)** — deeply unengaged (no open/click in >270 days), low prior value, single order. Suppress from sends to protect deliverability; do not mail.
- **FIX** — stale timestamps, broken commerce↔Klaviyo sync, or missing margin/cadence data make a safe segmentation impossible.
- Every recommendation carries a number, source, time window, and confidence level.

## Veto Rules

- Do **not** blast all dormant customers in one send — it spikes complaints and bounces and wrecks deliverability for your engaged list too. Segment and suppress first.
- Do **not** discount a customer who is merely partway through a long natural reorder cycle; you'd give margin away on an order you were getting for free.
- Do **not** set offer depth deeper than margin justifies — a "win" that loses contribution profit is not a win.
- Do **not** keep mailing the deeply unengaged for "reach." Past ~270 days with no engagement, reach is a liability, not an asset.
- Do **not** act on thin segments (under ~50 profiles) as if the reactivation rate were reliable.
- Do **not** push any segment live, apply suppressions, or send a discount without an explicit human approval step.

## Output Contract

A dormant-base segmentation that says who to win back, with what offer, who to sunset, and why — each row defensible by number, source, window, and confidence.

| Segment | Size | Avg prior LTV | Days lapsed (vs cadence) | Engagement | Recoverable value | Recommended offer | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| High-value, recently lapsed | 180 | $240 | +35d past 60d cycle | Opened <90d | ~$8.6k @ 20% react. | 2-msg, modest 10% | **KEEP** | Retention | 30 days |

## Worked Example

> **Executive read:** Of 1,200 lapsed customers, only one segment is worth paying to win back: ~180 high-value, recently-lapsed buyers (avg prior LTV $240, ~35 days past their 60-day reorder window) — a focused 2-message win-back with a modest 10% offer reactivates an estimated $8–9k of contribution at a 20% rate, comfortably above offer cost. The bigger story is defensive: ~600 deeply unengaged single-order profiles (>270 days, no opens) should be **suppressed, not mailed** — blasting them would tank deliverability for the whole list. Everyone in between is a watch, not a discount.

| Segment | Size | Avg prior LTV | Days lapsed (vs cadence) | Engagement | Recoverable value | Recommended offer | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| High-value, recently lapsed | 180 | $240 | +35d past 60d cycle | Opened <90d | ~$8.6k @ 20% react. | 2-msg flow, modest **10%** | **KEEP** | Retention | 30 days |
| Mid-value, single order | 240 | $95 | +60d past 90d cycle | Opened 90–180d | ~$2.3k @ 10% react. | Soft nudge: new arrivals, free ship | **WATCH** | Retention | 30 days |
| Long-cycle, not yet lapsed | 180 | $310 | −20d (still inside cycle) | Engaged | n/a — due to reorder | **No offer** — let them reorder | **WATCH** | Retention | next cycle |
| Deeply unengaged, 1 order | 600 | $34 | +200d+ past cycle | No open/click >270d | ~$0 | **Suppress / sunset** | Retention + Deliverability | — |

Note how the answer *inverts* the blast instinct: only 15% of the dormant base (180 of 1,200) gets a discounted win-back, half the base gets suppressed to protect the inbox, and a high-LTV group is deliberately left alone because they were never actually lapsed.

## Common Failure Modes

- Defining "lapsed" as a flat 90 days and discounting customers who were simply mid-cycle on a long reorder cadence.
- Blasting the entire dormant base in one send and torching deliverability to win back a handful.
- Setting the offer by gut ("everyone gets 20%") instead of testing depth against category margin.
- Never sunsetting — letting dead, complaining addresses sit on the list and drag inbox placement down.
- Treating a tiny segment's reactivation rate as reliable and over-investing in a noisy read.
- Segmenting on stale `last_order` / `last_engaged` timestamps and sunsetting customers who actually just bought.

## Run This Play With Live Data

**Manual version:** export the customer ledger and the Klaviyo engagement file, hand-compute days-since-order against a per-category reorder window, score by LTV, carve out the sunset group, and model the offer against margin — every month, in a spreadsheet.

**ShopMCP version:** connect your store and Klaviyo once. Ask the question; ShopMCP pulls the live customer ledger, applies the category-relative lapsed definition, crosses it with Klaviyo engagement and your margin, and returns the ranked **win-back / watch / sunset** segmentation with a margin-justified offer per worthy segment. It stays **read-only** — it will not create a segment, apply a suppression, or send anything without your explicit approval.

> No live line into your store *and* Klaviyo inside your AI assistant? That's the wall every manual run hits — you can reason about win-back all day but you can't see who's actually lapsed, who's deliverability poison, or what offer your margin can carry. ShopMCP *is* that connection, and the same playbook runs in one prompt instead of a monthly spreadsheet session.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Winback Builder play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual exports of the customer ledger and Klaviyo engagement file.
- Hand-computing days-since-order against a per-category reorder window.
- Stitching commerce LTV to engagement state to margin across separate tools.
- Rebuilding the same segmentation and sunset logic every month.
