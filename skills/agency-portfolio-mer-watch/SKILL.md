---
name: agency-portfolio-mer-watch
description: "When an ecommerce operator needs to decide: Which clients' blended efficiency is sliding toward breakeven? Runs the Portfolio Efficiency Watch play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Portfolio Efficiency', 'Commerce', 'Meta Ads', 'Google Ads', 'Tiktok Ads', 'Agency Portfolio'."
license: CC-BY-4.0
metadata:
  persona: Agency AM / COO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Portfolio Efficiency Watch

**Operating question:** Which clients' blended efficiency is sliding toward breakeven?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Per-client total revenue** — from each client's store (Shopify/Woo/BigCommerce/etc.), all channels, last 4 weeks split by week. The **store's** revenue, not the sum of platform-claimed conversion values.
- **Per-client summed ad spend** — Meta + Google + TikTok rolled into one weekly number per client, last 4 weeks split by week.
- **Per-client contribution-margin %** — revenue minus COGS, shipping, payment fees, and the variable cost of fulfilment, as a percent. This sets the **breakeven MER ≈ 1 ÷ margin %**. Without it, MER is a number with no line to cross.
- **Per-client new-customer share** — new-customer revenue ÷ total revenue, by week. This separates genuine acquisition growth from a returning-customer tailwind that flatters blended MER.
- **Targets** — each client's agreed efficiency floor (target MER or its ROAS equivalent), and the margin floor in their contract or scope.

Optional, if available:

- **Promo calendar per client** — a sale window inflates revenue and MER for that week and borrows demand from the next; without it you'll misread a promo bump as a recovery.
- **Channel-level MER split** — to confirm whether the blended slide is one channel decaying or a broad shift; never present blended as if it were channel-clean.
- **Subscription / repeat-purchase mix** — a high-LTV repeat business can run a lower blended MER safely; a one-time-purchase business cannot.
- **Spend-pacing / budget changes** — a mid-week budget cut or a paused campaign distorts the weekly MER slope.
- **Stock and back-in-stock events** — a stockout suppresses revenue and drags MER down for reasons that have nothing to do with media efficiency.

## How to decide — in order

1. **Gate on margin.** For each client, confirm a current contribution-margin %. If it's missing, the client is **BLIND** — there is no breakeven line to measure against, so set FIX (get margin) and exclude them from ranking. Never invent a breakeven.
2. **Compute breakeven and headroom.** Breakeven MER ≈ 1 ÷ margin %. Headroom = current blended MER − breakeven MER. A client at 1.9 MER with a 40% margin (breakeven 2.5) is **already underwater**, even if every platform ROAS looks green.
3. **Trend the slope.** Plot blended MER across the 4 weeks. What matters is **direction and rate**: a client far above breakeven but sliding fast can be more urgent than one barely above breakeven but flat.
4. **Strip the mirages.** Before flagging a slide, check **new-customer share** and the **promo calendar**. A blended MER that holds only because returning-customer revenue rose is *not* healthy growth — it's deferred risk. A promo week is not a trend point.
5. **Rank by proximity + slope.** Order the roster by (a) how close each client is to breakeven and (b) how fast they're sliding. The top of that list is this week's intervention queue.
6. **Apply the vetoes**, then assign status + owner + recheck date per client, and write the one-line client-facing read for the accounts that need a conversation.

## The prompt to run

```text
You are my agency portfolio analyst running the "Portfolio Efficiency Watch" play.

GOAL: surface which clients' BLENDED efficiency (total revenue / total ad spend, summed
across platforms) is sliding toward their own breakeven MER — ranked by proximity to
breakeven and the slope of the slide — so I can intervene before the client notices and
before the renewal.

I will paste, per client: weekly total revenue (from the store), weekly summed ad spend
(Meta + Google + TikTok), contribution-margin %, and weekly new-customer share, for the
last 4 weeks. Some inputs may be missing.

RULES:
- PRE-FLIGHT: First list which inputs I have per client. If a client's contribution-margin %
  is missing, mark them BLIND — MER without margin is meaningless; never compute a breakeven
  without it.
- Breakeven MER ≈ 1 / margin %. Headroom = current blended MER − breakeven MER. A client can
  be above target ROAS on every platform and still be below breakeven blended — say so.
- Sum spend BEFORE dividing. Never average per-platform MERs.
- Trend the slope across all 4 weeks; report direction and rate, not just the latest week.
- Strip mirages: if blended MER holds only because new-customer share fell and returning
  revenue rose, flag it as deferred risk, not growth. A promo week is not a trend point.
- Rank the roster by proximity to breakeven AND slope. Top of the list = this week's queue.
- Every row must carry: a number, its source, the time window, and a confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence portfolio read.
2. A ranked table using exactly this header row:
   | Client | Blended MER 4wk trend | Breakeven MER | Headroom | Status | Owner |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the table with prose.
3. For each at-risk client, one client-facing sentence I could read aloud in a QBR.
4. Vetoes/caveats that downgraded any flag, and which clients are BLIND and why.
```

## Decision rules

- **KILL** — not used at the client level here; reserve for the underlying spend a client decision cascades into. At portfolio level, a "KILL" signal means *this engagement is structurally unprofitable* (blended MER has sat below breakeven for the whole window with no promo or stock excuse) and needs an honest scope/margin conversation, not a budget tweak.
- **REFRESH** — blended MER is sliding toward breakeven with headroom still positive, driven by a fixable efficiency problem (fatigue, rising CPMs, a weak offer); the account is viable and needs hands this week.
- **WATCH** — directional only: a single down-week, a promo-polluted window, a slope inside noise, or a client whose blended MER is propped up by returning-customer share that you want to keep an eye on.
- **KEEP** — blended MER is comfortably above breakeven, flat or rising, with healthy new-customer share. Report it; spend your hours elsewhere.
- **FIX** — a client is **BLIND** (no contribution-margin %), spend windows don't align, or a stockout/tracking gap prevents a safe call. Resolve the data before judging the efficiency.
- Every recommendation carries a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- Do **not** compute a breakeven or call a client's efficiency without a contribution-margin %. **MER without margin is meaningless** — that client is BLIND, full stop.
- Do **not** treat a promo-window week as a trend point — it inflates revenue and MER and borrows next week's demand.
- Do **not** read a rising blended MER as growth when **returning-customer share** is what lifted it — that's deferred risk, not new acquisition.
- Do **not** conflate blended MER with channel-level ROAS — a green platform dashboard can sit on top of an underwater blended number.
- Do **not** average per-platform MERs; always sum spend, then divide.
- Do **not** rank on the latest week alone — proximity to breakeven *and* slope together set the queue.
- Do **not** send a budget change, pause, or client message without an explicit human approval step.

## Output

A roster table ranked by proximity to breakeven and slope:

| Client | Blended MER 4wk trend | Breakeven MER | Headroom | Status | Owner |
|---|---|---|---|---|---|
| Example Co | 2.8 → 2.3 (sliding) | 2.5 | −0.2 | REFRESH | AD + Perf |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/agency-portfolio-mer-watch) — it executes this play read-only by default and applies changes only on your approval.
