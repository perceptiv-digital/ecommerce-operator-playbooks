---
name: email-abandoned-cart-recovery-doctor
description: "When an ecommerce operator needs to decide: Is abandoned-cart recovery leaving money behind? Runs the Abandoned Cart Recovery Doctor play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Abandoned Cart Recovery Doctor', 'Klaviyo', 'Commerce', 'Retention Ltv'."
license: CC-BY-4.0
metadata:
  persona: Retention / Email Lead
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Abandoned Cart Recovery Doctor

**Operating question:** Is abandoned-cart recovery leaving money behind?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Klaviyo flow config** — for every recovery flow (Abandoned Checkout, Abandoned Cart / Added-to-Cart, Browse Abandonment): the **trigger metric name**, each message's **time delay**, channel (email / SMS), the conditional split logic, and whether a discount is attached to each step.
- **Klaviyo per-message analytics** — last 30–90 days, **per step**: recipients, open rate, click rate, placed-order rate, and **placed-order value** (attributed revenue). Flow-level totals are not enough.
- **Klaviyo flow-level summary** — **recovery rate** (orders ÷ people who entered the flow) and **revenue per recipient** for each flow.
- **Commerce (Shopify/Woo/BigCommerce)** — number of **checkouts started / carts created** in the window, completed orders, AOV, and the count of orders that used a recovery **discount code**.
- **Benchmarks / targets** — your recovery-rate target and a revenue-per-recipient floor (industry reference: abandoned **checkout** flows typically clear **$2–4 per recipient**; cart/browse run lower).

Optional, if available:

- **Deliverability by step** — spam-complaint rate, bounce rate, and inbox placement; a late-step deliverability collapse looks like "the series is too long" but isn't.
- **SMS consent coverage** — what % of abandoners have a valid SMS consent, to size the upside of adding an SMS touch.
- **Discount-code redemption split** — full-price vs discounted recovered orders, and margin per code.
- **Klaviyo attribution settings** — the click/view attribution window (default 5-day click / 1-day view) and flow-priority / suppression order, to judge revenue overlap.
- **Promo calendar** — a site-wide sale window suppresses or distorts recovery economics for that period.

## How to decide — in order

1. **Verify the trigger fires, and fires on the right event.** Open each recovery flow and read the trigger metric. Abandoned *checkout* should trigger on `Checkout Started`; cart recovery on `Added to Cart`; browse on `Viewed Product`. If "people in flow" hasn't incremented in days, or the flow still listens to a deprecated `Started Checkout` event post-migration, set it to **FIX** and stop — every downstream number is meaningless until it fires.
2. **Check for double-counting.** Confirm each flow suppresses people who already entered a higher-priority flow and who placed an order. If the abandoned-cart and abandoned-checkout flows both fire on the same session, or Klaviyo's 5-day attribution is crediting orders the post-purchase/browse flow earned, mark the inflated flow **FIX** and judge it on de-duplicated Shopify orders only.
3. **Audit first-touch timing.** Best practice is the first message inside **~1 hour** of abandon. If step 1 fires at **4h+**, that delay alone is usually the biggest recoverable lever → **REFRESH** (move the first touch to ≤1h).
4. **Count the series.** A single email is under-built. Healthy recovery is a **3–4 message** series across email + SMS over ~48–72h. One or two touches with no SMS → **REFRESH** (add steps / add channel where consent exists).
5. **Grade the rate and revenue per recipient.** Recovery rate well under benchmark, or revenue per recipient below the **$2–4** checkout floor, with the trigger confirmed live → real underperformance, not a tracking artifact → **REFRESH**.
6. **Test the discount dependence.** If recoveries are overwhelmingly discount-code orders, you may be paying margin for carts that would convert anyway. Recommend a **no-discount or delayed-discount first touch test** before assuming the code is load-bearing → **REFRESH** with margin caveat, never a blanket "add a bigger code."
7. **Apply the vetoes**, then assign status + owner + recheck date, ranked by recoverable revenue per month.

## The prompt to run

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
2. A ranked table: Defect | Flow | Evidence (number+source+window) | Recoverable $/mo (est) |
   Status | Owner | Recheck.
3. Vetoes/caveats that downgraded any recommendation (esp. thin sample, attribution overlap,
   discount-margin risk).
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a decision.
```

## Decision rules

- **KILL** — a redundant or harmful touch only: e.g. a duplicate flow firing on the same session as a higher-priority flow, or a late, deliverability-damaging final email with near-zero incremental placed orders and a rising spam-complaint rate. Killing the *flow* outright is almost never right — recovery is the highest-value flow you own.
- **REFRESH** — the flow fires correctly but underperforms a fixable lever: first touch at 4h+ (move to ≤1h), single-email series (add steps / add SMS), revenue per recipient under the $2–4 checkout floor, or discount over-reliance (test no-discount first touch).
- **WATCH** — directional only: a thin sample (fewer than ~300 flow entries in the window), a window polluted by a site-wide promo, or a brand-new flow without enough completed sends to judge.
- **KEEP** — trigger confirmed live and on the right event, first touch ≤1h, a multi-step email+SMS series, recovery rate and revenue per recipient at or above benchmark, no margin leak.
- **FIX** — the trigger is wrong or not firing, the browse/cart flow is missing entirely, Klaviyo attribution overlaps another flow and inflates revenue, or discount/AOV evidence is missing.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- Do **not** trust a low recovery rate until you have confirmed the trigger fires — the flow may be firing on `Added to Cart` vs `Checkout Started`, or have silently broken in a Shopify checkout migration. Verify firing first.
- Do **not** credit Klaviyo's attributed recovery revenue at face value when the 5-day attribution window overlaps your post-purchase or browse flows — that overlap inflates recovery and would double-count if you also credit the other flow.
- Do **not** reflexively add or enlarge a discount. Test a no-discount (or delayed-discount) first touch before assuming the code is load-bearing — most discounted carts include carts that would have converted at full price, and you are giving margin away.
- Do **not** judge a flow on a thin sample — under ~300 entries in the window is **WATCH**, not a decision.
- Do **not** add series length blindly when the late steps show a climbing spam-complaint or bounce rate — that is a deliverability fix, not a "send more" fix.
- Do **not** apply any flow edit, message change, discount, or send without an explicit human approval step.

## Output

A recovery-system risk map ranked by recoverable revenue per month, with the defect, its evidence, the call, and the next check date.

| Defect | Flow | Evidence (number + source + window) | Recoverable $/mo (est) | Status | Owner | Recheck |
|---|---|---|---|---|---|---|
| First touch at 4h | Abandoned Checkout | 6.0% recovery, $1.80/recipient (Klaviyo, 30d) | $X,XXX | REFRESH | Retention | 14 days |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/email-abandoned-cart-recovery-doctor) — it executes this play read-only by default and applies changes only on your approval.
