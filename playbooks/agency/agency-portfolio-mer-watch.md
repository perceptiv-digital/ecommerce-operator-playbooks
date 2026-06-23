---
slug: "agency-portfolio-mer-watch"
title: "Portfolio Efficiency Watch"
operating_question: "Which clients' blended efficiency is sliding toward breakeven?"
primary_persona: "agency"
personas: ["agency", "marketing"]
category: "agency-portfolio"
platforms: ["commerce", "meta-ads", "google-ads", "tiktok-ads"]
cadence: "weekly"
public_tier: "launch"
contributed_by: "Perceptiv"
---

# Portfolio Efficiency Watch

## Operating Question

**Which clients' blended efficiency is sliding toward breakeven — quietly, while the platform dashboards still look fine — so I can intervene before the client notices and before the renewal conversation?**

An agency loses clients one of two ways: a blow-up nobody saw coming, or a slow erosion that the client spots before you do. The second one is the killer. A client's blended **MER** (total revenue ÷ total ad spend) can drift down a few points a week for a month, and every individual platform dashboard still shows a green ROAS. By the time it shows up in *their* P&L, you're explaining a problem instead of having already flagged it. This play trends every client's *real* blended efficiency over four weeks against their *own breakeven MER* (≈ 1 ÷ contribution-margin %), and surfaces the accounts approaching the line — ranked by proximity to breakeven and the slope of the slide — as a **client-action packet** you can defend in a QBR.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see any of your clients' ad accounts or their stores. To run this manually across a roster you have to, **per client, every week**:

1. Pull total revenue (the store, not the platform's claimed conversion value).
2. Sum ad spend across Meta, Google, and TikTok into one number.
3. Find each client's **contribution-margin %** — which lives in their finance sheet, not any ad tool — to compute their breakeven MER.
4. Pull the **new-customer share** so you can tell real growth from a returning-customer mirage.
5. Repeat for the prior three weeks to get a trend, then do it for the next client, and the next.

**The thinking in this playbook is free. The data access — live revenue, summed spend, and per-client margin across an entire roster — is the hard part, and that is exactly what ShopMCP connects.** If your AI assistant has no live line into each client's store and ad accounts, that wall is where manual runs stop dead. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Agency lead / account director who owns the renewal.
- **Also useful for:** Performance leads (which account needs hands this week), Finance/Ops (margin-aware reporting), the founder who signs the QBR deck.
- Run it **before** your weekly internal account review, and **always** in the four weeks before any renewal or budget-increase conversation.

## When To Run It

- **Cadence:** weekly — early in the week, after the prior week's spend and orders have fully settled, so the most recent week isn't half-baked.
- **Triggers:** an upcoming renewal, a client asking "is this still working?", a budget increase you proposed, a portfolio-wide MER move, or onboarding a new client (you want a baseline from week one).
- **Pre-requisite:** confirm each client's **contribution-margin %** is current. A stale margin silently moves the breakeven line and invalidates every call below it. If margin is missing, that client is **BLIND**, not green.

## Required Evidence

- **Per-client total revenue** — from each client's store (Shopify/Woo/BigCommerce/etc.), all channels, last 4 weeks split by week. The **store's** revenue, not the sum of platform-claimed conversion values.
- **Per-client summed ad spend** — Meta + Google + TikTok rolled into one weekly number per client, last 4 weeks split by week.
- **Per-client contribution-margin %** — revenue minus COGS, shipping, payment fees, and the variable cost of fulfilment, as a percent. This sets the **breakeven MER ≈ 1 ÷ margin %**. Without it, MER is a number with no line to cross.
- **Per-client new-customer share** — new-customer revenue ÷ total revenue, by week. This separates genuine acquisition growth from a returning-customer tailwind that flatters blended MER.
- **Targets** — each client's agreed efficiency floor (target MER or its ROAS equivalent), and the margin floor in their contract or scope.

## Optional Evidence (changes the answer when present)

- **Promo calendar per client** — a sale window inflates revenue and MER for that week and borrows demand from the next; without it you'll misread a promo bump as a recovery.
- **Channel-level MER split** — to confirm whether the blended slide is one channel decaying or a broad shift; never present blended as if it were channel-clean.
- **Subscription / repeat-purchase mix** — a high-LTV repeat business can run a lower blended MER safely; a one-time-purchase business cannot.
- **Spend-pacing / budget changes** — a mid-week budget cut or a paused campaign distorts the weekly MER slope.
- **Stock and back-in-stock events** — a stockout suppresses revenue and drags MER down for reasons that have nothing to do with media efficiency.

## How To Pull This Evidence

- **Per-client total revenue** — export each store's orders for the last 4 weeks and total revenue **by week** (use the store as the source of truth, not the platform-claimed conversion value, which over-counts).
- **Per-client summed ad spend** — export weekly spend from Meta Ads Manager, Google Ads, and TikTok Ads, then **add the three into one weekly spend number** per client before computing MER. Mixing windows here is the most common error — align all three to the same week boundaries.
- **Per-client contribution-margin %** — pull from the client's finance sheet or compute it: revenue minus COGS, shipping, fees, and variable fulfilment, divided by revenue. This is **not** in any ad tool; it usually lives in a spreadsheet someone on the client side owns.
- **Per-client new-customer share** — from the store's customer report, split new-customer revenue from returning-customer revenue **by week**, then take new ÷ total.
- **Gotchas:** (1) sum spend *before* dividing — never average per-platform MERs, that's mathematically wrong; (2) align every week boundary across all sources or the trend is noise; (3) a promo week is not a trend point — flag and footnote it; (4) if a client runs heavy email/SMS revenue, blended MER will look strong even with weak paid efficiency, so read it alongside new-customer share, not alone.
- Or skip all of this — ShopMCP tracks efficiency across the whole roster.

## The Decision Logic (run in this order)

1. **Gate on margin.** For each client, confirm a current contribution-margin %. If it's missing, the client is **BLIND** — there is no breakeven line to measure against, so set FIX (get margin) and exclude them from ranking. Never invent a breakeven.
2. **Compute breakeven and headroom.** Breakeven MER ≈ 1 ÷ margin %. Headroom = current blended MER − breakeven MER. A client at 1.9 MER with a 40% margin (breakeven 2.5) is **already underwater**, even if every platform ROAS looks green.
3. **Trend the slope.** Plot blended MER across the 4 weeks. What matters is **direction and rate**: a client far above breakeven but sliding fast can be more urgent than one barely above breakeven but flat.
4. **Strip the mirages.** Before flagging a slide, check **new-customer share** and the **promo calendar**. A blended MER that holds only because returning-customer revenue rose is *not* healthy growth — it's deferred risk. A promo week is not a trend point.
5. **Rank by proximity + slope.** Order the roster by (a) how close each client is to breakeven and (b) how fast they're sliding. The top of that list is this week's intervention queue.
6. **Apply the vetoes**, then assign status + owner + recheck date per client, and write the one-line client-facing read for the accounts that need a conversation.

## Manual Workflow

1. List every client and, for each, pull the four inputs above for the last 4 weeks, **split by week**.
2. For each client, sum the three platforms' spend per week, then compute weekly blended MER = revenue ÷ summed spend.
3. Pull or confirm each client's contribution-margin %; compute breakeven MER = 1 ÷ margin %. Mark any client without margin as **BLIND**.
4. Compute headroom (current MER − breakeven) and the 4-week slope for every client.
5. Overlay new-customer share and the promo calendar to strip mirages and promo weeks.
6. Paste the prompt below with your per-client table.
7. Pressure-test every flag against the veto list, then convert the survivors into a client-action packet with owner, recheck date, and a one-line client-facing read for the at-risk accounts.

## Copy-Paste Prompt

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

## Decision Rules

- **KILL** — not used at the client level here; reserve for the underlying spend a client decision cascades into. At portfolio level, a "KILL" signal means *this engagement is structurally unprofitable* (blended MER has sat below breakeven for the whole window with no promo or stock excuse) and needs an honest scope/margin conversation, not a budget tweak.
- **REFRESH** — blended MER is sliding toward breakeven with headroom still positive, driven by a fixable efficiency problem (fatigue, rising CPMs, a weak offer); the account is viable and needs hands this week.
- **WATCH** — directional only: a single down-week, a promo-polluted window, a slope inside noise, or a client whose blended MER is propped up by returning-customer share that you want to keep an eye on.
- **KEEP** — blended MER is comfortably above breakeven, flat or rising, with healthy new-customer share. Report it; spend your hours elsewhere.
- **FIX** — a client is **BLIND** (no contribution-margin %), spend windows don't align, or a stockout/tracking gap prevents a safe call. Resolve the data before judging the efficiency.
- Every recommendation carries a **number, source, time window, and confidence level**.

## Veto Rules

- Do **not** compute a breakeven or call a client's efficiency without a contribution-margin %. **MER without margin is meaningless** — that client is BLIND, full stop.
- Do **not** treat a promo-window week as a trend point — it inflates revenue and MER and borrows next week's demand.
- Do **not** read a rising blended MER as growth when **returning-customer share** is what lifted it — that's deferred risk, not new acquisition.
- Do **not** conflate blended MER with channel-level ROAS — a green platform dashboard can sit on top of an underwater blended number.
- Do **not** average per-platform MERs; always sum spend, then divide.
- Do **not** rank on the latest week alone — proximity to breakeven *and* slope together set the queue.
- Do **not** send a budget change, pause, or client message without an explicit human approval step.

## Output Contract

A roster table ranked by proximity to breakeven and slope:

| Client | Blended MER 4wk trend | Breakeven MER | Headroom | Status | Owner |
|---|---|---|---|---|---|
| Example Co | 2.8 → 2.3 (sliding) | 2.5 | −0.2 | REFRESH | AD + Perf |

## Worked Example

> **Portfolio read:** Two of seven clients crossed below breakeven this window while their platform ROAS still showed green. Lumen Skincare is the urgent one — it slid from 3.1 to 2.4 against a 2.6 breakeven, and the hold-up the prior week was returning-customer revenue, not new growth, so the slide is real. Verdant Pantry looks stable on paper but is BLIND: no current margin, so its "fine" 2.9 MER is unverifiable.

| Client | Blended MER 4wk trend | Breakeven MER | Headroom | Status | Owner |
|---|---|---|---|---|---|
| Lumen Skincare | 3.1 → 2.9 → 2.6 → 2.4 (sliding) | 2.6 | −0.2 | REFRESH | AD + Perf |
| Harborline Apparel | 2.7 → 2.5 → 2.4 → 2.3 (slow slide) | 2.2 | +0.1 | WATCH | Perf |
| Ridgeway Outdoors | 4.6 → 4.4 → 4.5 → 4.3 (flat-ish) | 3.0 | +1.3 | KEEP | Perf |
| Kindle & Co Candles | 3.8 → 3.5 → 3.0 → 2.7 (steep slide) | 2.9 | −0.2 | REFRESH | AD + Perf |
| Verdant Pantry | 2.9 → 2.9 → 2.8 → 2.9 (flat) | — | — | FIX (BLIND) | Account |
| Northvale Pet | 5.2 → 5.0 → 5.1 → 5.4 (rising) | 3.3 | +2.1 | KEEP | Perf |
| Solace Home | 3.4 → 3.3 → 3.2 → 3.0 (promo wk 3) | 2.8 | +0.2 | WATCH | Perf |

Note how the ranking *inverts* the dashboard view. Lumen and Kindle & Co both look healthy on every platform's ROAS, yet both have crossed below breakeven on the blended number — they're this week's queue. Harborline is barely positive but sliding slowly, so it's a WATCH not a fire. Solace's week-3 dip is a flagged promo window, not a trend, so it stays a WATCH. And Verdant Pantry — the one that looks calmest — is the one you genuinely cannot judge, because without margin there is no breakeven line at all.

## Common Failure Modes

- Reading green platform ROAS as proof a client is fine, while the blended number is already underwater.
- Computing MER for a client whose margin is stale or missing, producing a confident answer with no breakeven line behind it.
- Averaging per-platform MERs instead of summing spend and dividing once.
- Mistaking a returning-customer tailwind for new-acquisition growth.
- Calling a promo-week revenue spike a recovery, then watching it reverse the next week.
- Ranking the roster on the latest week alone and missing the slow, steady slide that loses the renewal.

## Run This Play With Live Data

**Manual version:** for every client, every week — pull store revenue, sum three platforms' spend, hunt down a current contribution-margin %, pull new-customer share, repeat across four weeks to get a trend, then do the next client. An afternoon of spreadsheets that's stale before your account review starts.

**ShopMCP version:** connect each client's store plus their Meta, Google, and TikTok accounts once. Ask the question; ShopMCP pulls live revenue and summed spend per client, applies each client's margin to compute breakeven, trends blended MER across the window, strips promo weeks and returning-customer mirages, and returns the roster ranked by proximity to breakeven and slope — with the BLIND clients flagged, not guessed. It stays **read-only** until you explicitly approve any budget change or client message.

> No live line into each client's store and ad accounts inside your AI assistant? That's the wall every manual portfolio run hits. ShopMCP *is* that connection — and the same playbook then runs across the whole roster in one prompt instead of one spreadsheet-afternoon per client.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Portfolio Efficiency Watch play for the last 4 weeks. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Per-client weekly exports and the stale CSVs they become.
- Summing spend across Meta, Google, and TikTok by hand for every client.
- Chasing a current contribution-margin % before you can even draw a breakeven line.
- Rebuilding the same 4-week trend across the whole roster every single week.

---

*Contributed by [Perceptiv](https://perceptiv.digital).*
