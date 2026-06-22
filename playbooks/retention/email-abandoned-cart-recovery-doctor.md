---
schema_version: 1
slug: "email-abandoned-cart-recovery-doctor"
title: "Abandoned Cart Recovery Doctor"
summary: "Abandoned Cart Recovery Doctor helps ecommerce operators answer: Is abandoned-cart recovery leaving money behind?"
operating_question: "Is abandoned-cart recovery leaving money behind?"
short_title: "Abandoned Cart Recovery Doctor"
primary_persona: "retention"
personas: ["retention", "ecommerce"]
category: "retention-ltv"
platforms: ["klaviyo", "commerce"]
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
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/email-abandoned-cart-recovery-doctor"
shopmcp_prompt: "Run the Abandoned Cart Recovery Doctor play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Abandoned Cart Recovery Doctor

## Operating Question

**Is my abandoned-checkout and cart/browse recovery system leaving recoverable revenue on the table — because it fires on the wrong trigger, touches too late, runs too few messages, or buys conversions I would have won for free?**

Abandoned-cart recovery is usually the single highest-revenue-per-send flow in the account, which is exactly why it rots quietly. A flow that "works" can still be capturing half of what a healthy one would: firing 4+ hours after abandon instead of inside the first hour, sending one email where it should send a 3–4 touch email-plus-SMS series, double-counting revenue that the post-purchase flow would have earned anyway, or handing a 15% code to every cart when most of those carts would have converted at full price. This play diagnoses the recovery system end to end and forces a **KILL / REFRESH / WATCH / KEEP / FIX** call on each defect — ranked by recoverable revenue per month, not by how the flow "looks" in the Klaviyo dashboard.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Klaviyo flow analytics or your Shopify checkout events, so it cannot tell you the one thing that matters most: **what trigger your flow is actually listening to, and whether it is firing at all.** To run this manually you have to:

1. Open each recovery flow in Klaviyo and read the **trigger metric** by hand — is it `Checkout Started`, `Added to Cart`, `Placed Order` (suppression), or the older `Started Checkout`? After Shopify's checkout extensibility migration, many flows silently broke or now fire on the wrong event.
2. Pull the **per-message** open / click / placed-order / revenue numbers for every step, plus the time delay on each, because the flow-level summary hides which touch is doing the work.
3. Reconcile Klaviyo's **attributed** recovery revenue against actual Shopify orders, because Klaviyo's default 5-day click / view attribution overlaps with your post-purchase and browse flows and inflates the number.
4. Separate the **discount-driven** recoveries from the full-price ones to see how much margin you are giving away to carts that would have converted regardless.

**The diagnostic thinking here is free. The data access — reading the live trigger, the per-step timing, and the real Shopify orders behind Klaviyo's attribution — is the hard part, and that is exactly what ShopMCP connects.** If your assistant has no live line into Klaviyo and your store, that wall is where every manual run stops. The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Retention / Email Lead
- **Also useful for:** Head of Ecommerce (recoverable revenue sizing), CRM/Lifecycle Manager (flow rebuild), Founder/CEO at small accounts (this flow alone can be 10–20% of email-attributed revenue)
- Run it **before** you touch the flow — never reflexively add a discount or a message without first proving the trigger fires and the timing is wrong.

## When To Run It

- **Cadence:** monthly — recovery rate drifts slowly as deliverability, traffic mix, and Shopify checkout updates erode it.
- **Triggers:** a Shopify checkout / theme migration, a Klaviyo flow edit, recovery revenue dropping month over month, a sudden gap between sessions-that-add-to-cart and recovered orders, or onboarding a store you've never audited.
- **Pre-requisite:** confirm the flow's **trigger metric is live and firing** (check "people in flow" is still incrementing daily). A flow that stopped firing reads as a "low recovery rate" and sends you chasing copy when the real problem is plumbing.

## Required Evidence

- **Klaviyo flow config** — for every recovery flow (Abandoned Checkout, Abandoned Cart / Added-to-Cart, Browse Abandonment): the **trigger metric name**, each message's **time delay**, channel (email / SMS), the conditional split logic, and whether a discount is attached to each step.
- **Klaviyo per-message analytics** — last 30–90 days, **per step**: recipients, open rate, click rate, placed-order rate, and **placed-order value** (attributed revenue). Flow-level totals are not enough.
- **Klaviyo flow-level summary** — **recovery rate** (orders ÷ people who entered the flow) and **revenue per recipient** for each flow.
- **Commerce (Shopify/Woo/BigCommerce)** — number of **checkouts started / carts created** in the window, completed orders, AOV, and the count of orders that used a recovery **discount code**.
- **Benchmarks / targets** — your recovery-rate target and a revenue-per-recipient floor (industry reference: abandoned **checkout** flows typically clear **$2–4 per recipient**; cart/browse run lower).

## Optional Evidence

- **Deliverability by step** — spam-complaint rate, bounce rate, and inbox placement; a late-step deliverability collapse looks like "the series is too long" but isn't.
- **SMS consent coverage** — what % of abandoners have a valid SMS consent, to size the upside of adding an SMS touch.
- **Discount-code redemption split** — full-price vs discounted recovered orders, and margin per code.
- **Klaviyo attribution settings** — the click/view attribution window (default 5-day click / 1-day view) and flow-priority / suppression order, to judge revenue overlap.
- **Promo calendar** — a site-wide sale window suppresses or distorts recovery economics for that period.

## How To Pull This Evidence

- **Flow trigger metric (abandoned-checkout / cart / browse):** in Klaviyo, open each flow → click the trigger card at the top to read the exact trigger metric (`Checkout Started`, `Added to Cart` / `Started Checkout`, `Viewed Product`). Confirm it's live by checking the "people in flow" count is still incrementing daily — a stalled count means the trigger broke, often in a Shopify checkout-extensibility migration.
- **Per-message performance:** Klaviyo → Flows → the flow → **Analytics** tab, switched to the per-message (per-step) view, not the flow summary. Read recipients, open rate, click rate, placed-order rate, and placed-order value for each step.
- **Timing:** read the **time delay** on each step directly from the flow builder (the delay block before each message), so you can see how long after abandon the first touch fires and the spacing of the series.
- **Recovery rate & revenue per recipient:** from the flow-level Analytics summary — recovery rate = placed orders ÷ people who entered the flow; revenue per recipient = attributed placed-order value ÷ recipients. Pull the same 30–90 day window for every flow.
- **Attribution-window gotcha:** before you trust Klaviyo's attributed revenue, check Account → Settings → **Attribution** for the conversion window (default 5-day click / 1-day view). That window overlaps your post-purchase and browse flows, so the same order can be credited to multiple flows — reconcile against real Shopify orders before sizing recovered revenue, or you'll double-count.
- Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Verify the trigger fires, and fires on the right event.** Open each recovery flow and read the trigger metric. Abandoned *checkout* should trigger on `Checkout Started`; cart recovery on `Added to Cart`; browse on `Viewed Product`. If "people in flow" hasn't incremented in days, or the flow still listens to a deprecated `Started Checkout` event post-migration, set it to **FIX** and stop — every downstream number is meaningless until it fires.
2. **Check for double-counting.** Confirm each flow suppresses people who already entered a higher-priority flow and who placed an order. If the abandoned-cart and abandoned-checkout flows both fire on the same session, or Klaviyo's 5-day attribution is crediting orders the post-purchase/browse flow earned, mark the inflated flow **FIX** and judge it on de-duplicated Shopify orders only.
3. **Audit first-touch timing.** Best practice is the first message inside **~1 hour** of abandon. If step 1 fires at **4h+**, that delay alone is usually the biggest recoverable lever → **REFRESH** (move the first touch to ≤1h).
4. **Count the series.** A single email is under-built. Healthy recovery is a **3–4 message** series across email + SMS over ~48–72h. One or two touches with no SMS → **REFRESH** (add steps / add channel where consent exists).
5. **Grade the rate and revenue per recipient.** Recovery rate well under benchmark, or revenue per recipient below the **$2–4** checkout floor, with the trigger confirmed live → real underperformance, not a tracking artifact → **REFRESH**.
6. **Test the discount dependence.** If recoveries are overwhelmingly discount-code orders, you may be paying margin for carts that would convert anyway. Recommend a **no-discount or delayed-discount first touch test** before assuming the code is load-bearing → **REFRESH** with margin caveat, never a blanket "add a bigger code."
7. **Apply the vetoes**, then assign status + owner + recheck date, ranked by recoverable revenue per month.

## Manual Workflow

1. List every recovery flow in Klaviyo and record each one's **trigger metric** and live firing status (is "people in flow" still climbing?).
2. For each flow, export **per-message** analytics (recipients, open, click, placed-order, revenue) and the **time delay** on every step for the last 30–90 days.
3. Pull Shopify checkouts-started, completed orders, AOV, and discount-code usage for the same window; reconcile against Klaviyo's attributed revenue to expose overlap.
4. Compute **recovery rate** and **revenue per recipient** per flow; compare to the $2–4 checkout benchmark.
5. Build the **defect list** (wrong trigger, late first touch, too-few messages, no SMS, discount over-reliance) using the decision logic order.
6. Paste the prompt below with your tables.
7. Pressure-test every recommendation against the veto list, then convert survivors into an action packet with owner and recheck date.

## Copy-Paste Prompt

```text
You are my retention/lifecycle analyst running the "Abandoned Cart Recovery Doctor" play
for a Klaviyo + Shopify (or Woo/BigCommerce) store.

GOAL: diagnose the abandoned-checkout, abandoned-cart, and browse-abandonment recovery
system and decide what to KILL, REFRESH, WATCH, KEEP, or FIX, ranked by recoverable
revenue per month — not by how the flow looks in the Klaviyo dashboard.

I will paste: each recovery flow's trigger metric and per-step time delays + channels,
per-message analytics (recipients, open, click, placed-order rate, revenue), flow-level
recovery rate and revenue per recipient, Shopify checkouts-started / orders / AOV /
discount-code usage, and my benchmarks. Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. The critical input is
confirmation that each recovery flow is firing on the correct trigger (e.g. Checkout Started
vs the deprecated Started Checkout, and not Added to Cart) PLUS its recovery rate and
revenue-per-recipient — a flow firing on a broken or wrong trigger earns nothing, so every
downstream number is meaningless without it. If that critical input is missing, STOP and
return only (a) what's missing and (b) how to get it — never estimate it or proceed.

RULES:
- Trigger gate first: if a flow's trigger metric is wrong (e.g. deprecated Started Checkout
  vs Checkout Started after Shopify checkout extensibility) or it has stopped firing, mark
  it FIX and exclude it from rate/revenue judgments until it fires correctly.
- De-dup before crediting revenue: if two flows fire on the same session, or Klaviyo's
  5-day click attribution overlaps the post-purchase/browse flow, judge on de-duplicated
  Shopify orders, not Klaviyo's attributed number.
- First-touch timing: flag any first message sent later than ~1 hour after abandon.
- Series depth: flag single-email flows and flows with no SMS step where consent exists;
  healthy is a 3-4 touch email+SMS series over ~48-72h.
- Benchmark revenue per recipient against $2-4 for abandoned checkout (cart/browse lower).
- Discount: do NOT reflexively recommend a bigger/earlier code. If recoveries are mostly
  discounted, recommend a no-discount or delayed-discount first-touch TEST to protect margin.
- Every row must carry a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 2-3 sentence executive read.
2. A ranked table using exactly this header row:
   | Defect | Flow | Evidence (number + source + window) | Recoverable $/mo (est) | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. Vetoes/caveats that downgraded any recommendation (esp. thin sample, attribution overlap,
   discount-margin risk).
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision Rules

- **KILL** — a redundant or harmful touch only: e.g. a duplicate flow firing on the same session as a higher-priority flow, or a late, deliverability-damaging final email with near-zero incremental placed orders and a rising spam-complaint rate. Killing the *flow* outright is almost never right — recovery is the highest-value flow you own.
- **REFRESH** — the flow fires correctly but underperforms a fixable lever: first touch at 4h+ (move to ≤1h), single-email series (add steps / add SMS), revenue per recipient under the $2–4 checkout floor, or discount over-reliance (test no-discount first touch).
- **WATCH** — directional only: a thin sample (fewer than ~300 flow entries in the window), a window polluted by a site-wide promo, or a brand-new flow without enough completed sends to judge.
- **KEEP** — trigger confirmed live and on the right event, first touch ≤1h, a multi-step email+SMS series, recovery rate and revenue per recipient at or above benchmark, no margin leak.
- **FIX** — the trigger is wrong or not firing, the browse/cart flow is missing entirely, Klaviyo attribution overlaps another flow and inflates revenue, or discount/AOV evidence is missing.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- Do **not** trust a low recovery rate until you have confirmed the trigger fires — the flow may be firing on `Added to Cart` vs `Checkout Started`, or have silently broken in a Shopify checkout migration. Verify firing first.
- Do **not** credit Klaviyo's attributed recovery revenue at face value when the 5-day attribution window overlaps your post-purchase or browse flows — that overlap inflates recovery and would double-count if you also credit the other flow.
- Do **not** reflexively add or enlarge a discount. Test a no-discount (or delayed-discount) first touch before assuming the code is load-bearing — most discounted carts include carts that would have converted at full price, and you are giving margin away.
- Do **not** judge a flow on a thin sample — under ~300 entries in the window is **WATCH**, not a decision.
- Do **not** add series length blindly when the late steps show a climbing spam-complaint or bounce rate — that is a deliverability fix, not a "send more" fix.
- Do **not** apply any flow edit, message change, discount, or send without an explicit human approval step.

## Output Contract

A recovery-system risk map ranked by recoverable revenue per month, with the defect, its evidence, the call, and the next check date.

| Defect | Flow | Evidence (number + source + window) | Recoverable $/mo (est) | Status | Owner | Recheck |
|---|---|---|---|---|---|---|
| First touch at 4h | Abandoned Checkout | 6.0% recovery, $1.80/recipient (Klaviyo, 30d) | $X,XXX | REFRESH | Retention | 14 days |

## Worked Example

> **Executive read:** The abandoned-checkout flow is a single email firing 4 hours after abandon, recovering 6.0% of entries at $1.80 per recipient — roughly half the $2–4 benchmark. Moving the first touch to 1 hour, adding a second email and an SMS step (62% of abandoners have consent), and reordering the series models **+$4,300/month** in incremental recovered revenue at current AOV. Separately, there is **no browse-abandonment flow at all**, and 81% of recovered orders used the standing 15% code — so we are leaking margin on carts that likely convert without it. Fix the trigger-adjacent gaps first, then test discount removal on the first touch.

| Defect | Flow | Evidence (number + source + window) | Recoverable $/mo (est) | Status | Owner | Recheck |
|---|---|---|---|---|---|---|
| First touch fires at 4h, not ≤1h | Abandoned Checkout | 6.0% recovery vs 11% target; $1.80/recipient (Klaviyo, last 30d) | $2,600 | **REFRESH** | Retention | 14 days |
| Single email — no step 2, no SMS | Abandoned Checkout | 1 message; 62% of entries have SMS consent (Klaviyo, 30d) | $1,700 | **REFRESH** | Retention | 14 days |
| Browse-abandonment flow missing | Browse Abandonment | 9,400 `Viewed Product` sessions, 0 in any flow (Shopify + Klaviyo, 30d) | $1,100 | **FIX** | Retention | 30 days |
| 81% of recoveries are discount-code orders | Abandoned Checkout | 81% used STAY15 (Shopify orders, 30d) | margin, not revenue | **REFRESH** (test no-discount touch 1) | Retention + Finance | 21 days |
| Cart flow double-fires with checkout flow | Abandoned Cart | Same session enters both; Klaviyo 5-day attr overlaps (Klaviyo, 30d) | overstated, not real | **FIX** | Retention | 7 days |
| Final email (step 3) hurts inbox | Abandoned Checkout (planned) | 0.34% spam-complaint on last step in pilot (Klaviyo, 30d) | n/a — suppress | **KILL** (that touch only) | Retention | 14 days |

The point is that the dashboard "recovery rate" understated the opportunity: the flow looked merely below-target, but the real wins were a broken first-touch delay, a missing channel, an entirely absent browse flow, and a margin leak hiding inside an otherwise-fine revenue number.

## Common Failure Modes

- Reading "low recovery rate" as a copy problem when the trigger is wrong or the flow stopped firing after a Shopify checkout migration.
- Crediting Klaviyo's attributed revenue without de-duplicating against post-purchase and browse flows (the 5-day attribution window overlaps).
- Reflexively adding a bigger discount and giving away margin on carts that would have converted at full price.
- Adding more messages when the late-step problem is actually deliverability (rising spam complaints), not series length.
- Judging the flow on a thin sample, or on a window polluted by a site-wide sale.
- Optimizing the abandoned-checkout flow while a browse-abandonment flow doesn't exist at all.

## Run This Play With Live Data

**Manual version:** open every recovery flow in Klaviyo, read each trigger metric by hand, export per-message timing and analytics, pull Shopify checkouts and discount usage, reconcile against Klaviyo's attribution, and rebuild the recovery-rate math — every month, per store.

**ShopMCP version:** connect Klaviyo and your store once. Ask the question; ShopMCP reads the **live trigger metric** for each recovery flow (catching the `Checkout Started` vs deprecated `Started Checkout` break Shopify migrations cause), pulls per-step timing and per-message analytics, reconciles attributed revenue against real Shopify orders to strip out double-counting, sizes the discount-margin leak, and returns the ranked FIX/REFRESH/KEEP map. It stays **read-only** until you explicitly approve a flow change.

> No Klaviyo or Shopify connection inside your AI assistant? That's the wall every manual run hits — you literally cannot see which event the flow is listening to. ShopMCP *is* the connection, and the same playbook then runs in one prompt instead of an afternoon of flow-by-flow exports.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Abandoned Cart Recovery Doctor play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Opening every flow by hand to read the live trigger metric and per-step delays.
- Exporting per-message Klaviyo analytics and stale CSVs.
- Reconciling Klaviyo's attributed revenue against real Shopify orders to kill double-counting.
- Rebuilding the recovery-rate and discount-margin math every month, per store.
