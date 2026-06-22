---
schema_version: 1
slug: "agency-tracking-setup-audit"
title: "Client Tracking Setup Audit"
summary: "Client Tracking Setup Audit helps ecommerce operators answer: Can we trust this client's tracking before we report on it or scale spend?"
operating_question: "Can we trust this client's tracking before we report on it or scale spend?"
short_title: "Tracking Setup Audit"
primary_persona: "agency"
personas: ["agency", "performance"]
category: "agency-portfolio"
platforms: ["commerce", "google-analytics-4", "meta-ads", "google-ads", "klaviyo"]
cadence: "ad-hoc"
difficulty: "intermediate"
manual_time_minutes_min: 45
manual_time_minutes_max: 90
shopmcp_time_minutes_min: 4
shopmcp_time_minutes_max: 10
decision_type: "client-action-packet"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/agency-tracking-setup-audit"
shopmcp_prompt: "Run the Client Tracking Setup Audit play. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# Client Tracking Setup Audit

## Operating Question

**Can we trust this client's tracking *setup* before we put our name on a report or pour budget into it?**

This is the audit you run **once, on the way in** — at onboarding, before the first reporting cycle, or before a budget step-up — not the weekly drift check you run forever after. The difference matters. The weekly **Tracking Sanity Check** asks "did the numbers move this week?" This play asks the deeper, structural question: **is the measurement architecture itself sound, or did we just inherit a leaking foundation from the last agency?** A client account is a black box on day one. The pixel might be missing. The CAPI might be firing without deduplication, double-counting every order. The conversion actions in Google Ads might count three different "purchase" events. Test orders might still be inflating the store. None of that shows up as week-over-week drift — it's baked into the baseline, and if you report on top of it you are vouching for someone else's broken setup. This play produces a **setup scorecard**, an **ordered fix sequence**, and a single defensible line: *what is safe to report on now, and what is frozen until repaired.* It is mostly a **FIX** play by design — on a fresh account, that is the honest answer.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no line into the client's Shopify admin, their GA4 property, their Meta Ads Manager, their Google Ads account, or their Klaviyo — and on a brand-new client you often don't have full access yourself yet. To audit the *setup* manually you have to:

1. Pull the store's real orders for a reference window and strip test orders, $0 orders, cancelled/fully-refunded orders, and (per your definition) draft and POS orders — this is the **truth denominator** every other number is judged against.
2. Inspect whether the Meta pixel **and** the Conversions API are both present, and whether they share an `event_id` so server and browser events deduplicate instead of double-counting.
3. Reconcile GA4 `purchase` events against the store's real orders to size the structural drift, then read the same gap on Meta, Google Ads, and Klaviyo, each with its own attribution window.
4. Open each platform's conversion-action / conversion-event definitions and check they aren't counting the same purchase two or three ways, and that consent mode and UTM governance aren't quietly poisoning the baseline.

**The audit logic below is free. The cross-account data access — across five tools, on a client you just inherited — is the wall**, and that wall is exactly where manual onboarding audits stall. ShopMCP is the line into all five sources; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Agency Account Lead / Analytics lead — owns the "can we vouch for this?" sign-off before the relationship produces a single report.
- **Also useful for:** Performance Marketer (won't scale spend onto a phantom conversion baseline), Agency Owner (reputational risk — your logo is on the deck), the client's own in-house marketer (inherits the fix list).
- Run it **before** the first reporting cycle and **before** any budget step-up. Treat the output as an onboarding deliverable and a gate, not a routine status update.

## When To Run It

- **Cadence:** ad-hoc — at **client onboarding**, before the first monthly report, before a budget scale-up, or after a re-platform / theme migration / GTM rebuild on an existing client.
- **Triggers:** a new logo signs; you're handed an account by a previous agency; the client's finance numbers have never matched their dashboard; you're about to 2–3× spend and need the conversion baseline to be real first; a re-platform or checkout migration just shipped.
- **Hard rule:** never publish a client report or approve a spend increase on top of an un-audited setup. On a fresh account you do not yet know which platform is lying or by how much — and the first report sets the trust baseline for the whole relationship.

## Required Evidence

- **Commerce truth (Shopify / Woo / BigCommerce)** — total **paid orders** and order count for a reference window (last 30 days is typical), with test orders, $0 orders, and cancelled/fully-refunded orders excluded; order timestamps in **store time zone**; store **currency**. This is the truth denominator the whole audit is judged against.
- **Meta pixel + CAPI state** — is the browser **pixel** present, is the **Conversions API** live, and do they share a dedup key (`event_id`)? Plus `purchases` and value with the **attribution setting stated** (default 7-day click / 1-day view over-claims view-through orders the store never sees).
- **GA4** — `purchase` event count (or `ecommerce purchases`) and revenue for the same window, plus `session_default_channel_group` and `source / medium` to expose `(direct) / (none)` bloat and self-referral inflation.
- **Google Ads** — `conversions` and conversion value **per conversion action**, so you can catch a native "Purchase" firing alongside a GA4-imported "Purchase" alongside a legacy action — three counts of one order.
- **Klaviyo** — flow + campaign **attributed orders** and value (default 5-day click / 1-day open), which legitimately overlap with paid and must never be summed with other sources as if exclusive.
- **Targets / context for labelling drift** — your accepted healthy band (under 5% drift), and any known modelled/consent baseline for the account.

## Optional Evidence

- **Consent / CMP state** — consent-mode v2 status, % of sessions consented, ad-blocker share — to separate an *expected* modelled gap from a real structural break.
- **Tag/deploy history** — recent GTM, theme, checkout, pixel, or CAPI changes with dates, especially anything the previous agency shipped, so an inherited break can be dated.
- **Server-side setup** — whether Meta CAPI / GA4 server-side / a server container is live, its dedup key, and its event match quality.
- **Subscription / recurring app** — does a recurring charge re-fire `purchase`? (a classic duplicate-transaction source that compounds monthly).
- **UTM convention doc** — does the client (or the prior agency) have a UTM standard, and do live email/SMS/paid links actually follow it?

## How To Pull This Evidence

- **Commerce truth (Shopify order count)** — Admin → Orders, filter to **Paid** financial status, then exclude test, $0, and cancelled/fully-refunded orders; set the range in **store time zone**. Gotcha: Shopify's headline "Total orders" includes cancelled and test orders — count the filtered list, not the top-line number, or your denominator is already wrong.
- **Meta pixel + CAPI presence and dedup** — in Events Manager check the dataset shows **both** "Browser" and "Server" for the Purchase event, and that they're being **deduplicated** (matched `event_id` / event name). Gotcha: server-side live *without* dedup doesn't fix under-counting — it doubles it, and the account looks like it's "over-performing."
- **GA4 ↔ Shopify purchase drift** — pull GA4 `purchase` count for the identical window and compute `drift % = (GA4 − commerce truth) / commerce truth`. Gotcha: pick one GA4 metric (events vs. sessions-with-transactions vs. key-event count) and hold it; consent-modelled purchases inflate the event total above the store.
- **Consent mode / CMP** — confirm consent mode v2 is configured and read the consented-session share; a large structural shortfall on browser-tagged sources usually traces here. Gotcha: an over-aggressive banner blocking tags before consent can *under-report* every source at once and look like a tracking outage.
- **Conversion-action / event definitions across Meta, Google, and Klaviyo** — list every conversion action in Google Ads, the optimized Purchase event in Meta, and Klaviyo's attribution model, side by side. Gotcha: a GA4-imported "Purchase" counted alongside a native pixel "Purchase" double-counts in Google Ads; only listing each action separately reveals it.
- **Server-side vs. browser** — confirm whether each Purchase is firing browser-only, server-only, or both-with-dedup, and which is the source of record. Gotcha: "both, no dedup" over-counts; "server only" can silently under-count if the browser fallback was removed.
- **Duplicate / recurring purchase events** — check for a thank-you page reachable on refresh, a subscription/recurring app re-firing `purchase`, or a GTM tag plus a theme snippet both firing. Signature: the source sits materially *above* commerce truth on a stable account.
- **Test-order filtering** — confirm internal/QA orders and gateway test transactions are excluded on **both** the store side and every reporting source identically; an unfiltered handful inflates one side only and reads as drift.
- Or skip all of this — ShopMCP reconciles a connected account automatically.

## The Decision Logic (run in this order)

1. **Lock commerce truth first.** Establish the client's real paid-order count and revenue for the reference window, test/$0/cancelled/refunded excluded. Every check below is judged against this number, never against another platform. Nothing else is "truth." If you cannot get this number, the audit cannot run — stop and request store access.
2. **Audit pixel/CAPI presence and dedup.** Is the Meta pixel present? Is CAPI live? Do they deduplicate on `event_id`? Missing pixel → **FIX** (nothing is being measured). Both firing without dedup → **FIX** (everything is double-counted). Both with clean dedup → **KEEP**.
3. **Size the GA4 ↔ Shopify structural drift.** Apply the bands against commerce truth: **under 5% healthy → KEEP; 5–15% caution → WATCH/REFRESH; over 15% unsafe → FIX, and no reporting may use that source until repaired.** This is the headline number that decides whether you can report at all.
4. **Separate a real break from an expected modelled gap.** Meta/Google view-through and modelled conversions, Klaviyo's open-window attribution, and GA4 consent modelling are *designed* to exceed the store count. A gap that matches the known consent/modelled baseline is **WATCH**, not a broken-setup **FIX**. Only call FIX when the gap exceeds what the model alone explains. (A single bad day is not a setup break — judge the window, not a spike.)
5. **Walk the structural culprits**, in this order: **duplicate/recurring purchase events** (source above truth) → **conversion-action definitions** counting one order multiple ways across Meta/Google/Klaviyo → **consent-mode / iOS / ad-blocker shortfall** (source below truth) → **server-side vs. browser** dedup gap → **UTM governance** (fat `(direct)/(none)`, untagged email/SMS/paid links) → **unfiltered test orders**.
6. **Rank the repairs by what they unblock, not by drift size.** The fix that lets you report on the channel the client is about to fund comes before a larger drift on a channel nobody touches. Then assign status + owner + recheck, and state the single line: **what is safe to report on now, and what is frozen until a named fix lands.**

## Manual Workflow

1. Set the reference window (last 30 days is typical) and write down the store's **time zone and currency** — most "drift" on a new account is really a window/TZ artifact.
2. Pull commerce truth: real paid orders + revenue, test/$0/cancelled/refunded excluded. This is the denominator for everything that follows.
3. Inspect the Meta dataset for pixel **and** CAPI presence and confirm they deduplicate on `event_id`.
4. Pull GA4 purchases, Meta purchases (note the attribution setting), Google Ads conversions (per action), and Klaviyo attributed orders for the *identical* window.
5. Compute GA4↔Shopify drift and each source's gap vs. commerce truth; apply the 5% / 15% bands.
6. List every conversion action / event definition across Meta, Google, and Klaviyo side by side and flag any one-order-counted-twice.
7. Label each gap **real structural break** or **expected modelled/consent gap** before calling FIX; confirm test orders are filtered identically everywhere.
8. Paste the prompt below with your numbers; have it return the setup scorecard + an ordered fix sequence.
9. Convert FIX rows into an owner-assigned onboarding packet — biggest report-blocker first — with a recheck date after a clean window, and write the one-line "safe to report / not safe" verdict for the kickoff deck.

## Copy-Paste Prompt

```text
You are my agency's analytics lead running the "Client Tracking Setup Audit" play — the
one-time onboarding audit that decides whether we can put our name on a report or scale
this client's spend.

PRE-FLIGHT: First list which inputs I provided vs. missing. If the client's commerce
order count (the truth denominator) is missing, STOP and ask for it — never compute drift
without it.

GOAL: audit whether this client's tracking SETUP is sound — pixel/CAPI present and
deduplicated, GA4 reconciles to real orders, consent mode configured, conversion actions
not double-counting, test orders filtered — and tell me what is safe to report on now and
what is frozen until repaired. On a fresh account this is mostly a FIX play.

I will paste: commerce orders (real paid count + revenue, test/$0/cancelled/refunded
excluded), Meta pixel/CAPI state, GA4 purchases, Meta purchases (with attribution
setting), Google Ads conversions (per conversion action), Klaviyo attributed orders,
consent/CMP state, store time zone and currency, and any inherited tag/checkout changes.
Some data may be missing.

RULES:
- Commerce truth is the ONLY denominator. Never judge one platform by another platform.
- Pixel/CAPI: missing pixel = FIX (nothing measured); both firing without event_id dedup
  = FIX (everything double-counted); both with clean dedup = KEEP.
- For each source compute drift % vs commerce truth and band it:
  under 5% = healthy (KEEP), 5-15% = caution (WATCH/REFRESH), over 15% = unsafe (FIX).
  Do NOT report attribution or approve a spend scale-up using any source above 15% drift.
- Distinguish a REAL structural break from an EXPECTED modelled/consent gap. Only call FIX
  when the gap exceeds what the model alone explains. One bad day is not a setup break.
- For any source over 5%, name the likely cause in this order: duplicate/recurring
  purchase events (source ABOVE truth) -> conversion-action definitions double-counting
  across Meta/Google/Klaviyo -> consent/iOS/ad-blocker shortfall (source BELOW truth) ->
  server-side vs browser dedup gap -> UTM governance / fat direct bucket -> unfiltered
  test orders.
- Never trust a single platform's self-report as truth.
- Every row must carry a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent data.

RETURN:
1. A 2-3 sentence executive read: can we report on this client yet, yes/no, and what's frozen.
2. A setup scorecard using EXACTLY this header:
   ## Output Contract
   | Check | Status | Drift/issue | Risk | Fix | Owner |
   |---|---|---|---|---|---|
   Use "—" for any cell you cannot fill from the evidence. Do not add or drop columns, and
   do not replace the table with prose.
3. Per-check notes (real structural break vs expected modelled gap).
4. An ORDERED fix sequence — biggest report-blocker first — with owner and recheck, and a
   one-line verdict on what is safe to report vs not.
```

## Decision Rules

- **KEEP** — the check passes: pixel + CAPI present and deduplicated, drift under 5% against commerce truth, conversion actions clean, test orders filtered. Safe to report on this source.
- **WATCH** — drift 5–15%, *or* a larger gap fully explained by a known modelled/consent baseline (expected, not broken). Report with a footnote; monitor; do not yet rebuild.
- **REFRESH** — drift 5–15% traced to a fixable hygiene issue (a few untagged links, one mislabelled UTM, a stale channel grouping) where a light correction closes the gap before the first report.
- **FIX** — drift over 15%, a missing pixel, undeduplicated CAPI, a double-counting conversion action, or unfiltered test orders. This source is **frozen for reporting and scaling** until repaired.
- **KILL** — retire a setup artifact that should not exist: a duplicate/legacy pixel, an orphaned conversion action double-counting purchases, a dead UTM convention inherited from the prior agency still polluting reports.
- Every recommendation must include a **number, source, time window, and confidence level** — a "tracking looks off" with no drift %, no window, and no source is not an audit finding.

## Veto Rules

- **Never report attribution or scale spend above 15% drift on a channel.** Reconcile or freeze it first — full stop. The first report sets the trust baseline for the whole relationship.
- **Never treat a single platform's self-report as truth.** Commerce orders are the only denominator; Meta/Google/GA4/Klaviyo are claimants, not judges.
- **Never confuse modelled vs. measured.** A gap that matches the known view-through/consent baseline is an expected modelled gap (WATCH), not a broken setup (FIX) — "fixing" it wastes a sprint and can break legitimate modelling.
- **Never call a setup broken off one bad day.** A single anomalous day is not a structural break — audit the window, label the baseline, then judge.
- **Never add attributed orders across sources** (Meta + Google + Klaviyo + GA4) as if exclusive — overlapping attribution windows double-count the same order.
- **Never declare a check "fixed" without a clean recheck window** free of the migration, promo, or deploy that polluted the original audit.
- **Never recommend writes, pixel deletions, UTM rewrites, or tag changes without explicit human approval** and a preview of what changes — especially on a client account you've just been handed.

## Output Contract

A **setup scorecard**, per-check notes, confidence labels, and an **ordered fix sequence** (biggest report-blocker first), closing with a one-line verdict on what is safe to report vs. not.

Minimum table columns:

| Check | Status | Drift/issue | Risk | Fix | Owner |
|---|---|---|---|---|---|
| Example: GA4 ↔ Shopify purchase drift | FIX | +22% vs 1,000 paid orders (30d) | Over-reports revenue; inflates blended ROAS | Remove double-fired purchase tag | Analytics |

## Worked Example

> **Executive read:** We **cannot** report on Northwind Outfitters yet. Commerce truth for the 30-day window is **2,418 paid orders / $396,700**. The Meta pixel is live but CAPI is firing without dedup, GA4 over-counts by 22% from a double-fired purchase tag, and Google Ads carries a duplicate conversion action — all three block the first report. Klaviyo and consent mode reconcile and are safe to cite. Fix the Google Ads duplicate and the GA4 tag before the kickoff deck; everything else can be footnoted.

| Check | Status | Drift/issue | Risk | Fix | Owner |
|---|---|---|---|---|---|
| Commerce truth locked | KEEP | 2,418 paid orders / $396,700 (Shopify, 30d) | — denominator established | Hold as the only truth source | Analytics |
| Meta pixel present | KEEP | Browser Purchase firing (Meta, 30d) | Low — base signal exists | None | — |
| Meta CAPI + dedup | FIX | Server + browser both firing, no `event_id` match | Doubles Meta purchases; phantom ROAS | Add shared `event_id`, enable dedup | Web + Analytics |
| GA4 ↔ Shopify drift | FIX | +22% (2,950 GA4 vs 2,418 paid) | Over-reports revenue across every deck | Remove double-fired theme purchase tag | Analytics |
| Consent mode v2 | WATCH | 84% sessions consented; ~6% modelled gap | Expected, not a break | Footnote the modelled gap | Analytics |
| Conversion actions (Google Ads) | FIX | Native + GA4-imported Purchase both counting | +19% inflated conversions; over-funds Shopping | Retire the imported duplicate action | Perf |
| Klaviyo attribution model | KEEP | 611 attributed (5-day click), subset reconciles | Low — within expected overlap | Cite as subset, never sum | Lifecycle |
| Test-order filtering | REFRESH | 14 QA orders excluded on store, not in GA4 | Minor inflation, one-sided | Add internal-traffic filter in GA4 | Analytics |

The audit *inverts* the optimistic onboarding story: the account "looks like it's over-performing" precisely because the over-counting is structural — undeduplicated CAPI, a double-fired GA4 tag, and a duplicate Google conversion action all push reported numbers above the 2,418 real orders. Report on top of that and you'd vouch for a 20%+ phantom uplift on day one. The fix order is set by what each repair unblocks — the Google Ads duplicate first because the client wants to scale Shopping, then the GA4 tag because it touches every deck.

## Common Failure Modes

- Treating an inherited account's reported conversions as truth instead of the store's real paid orders.
- Shipping the first client report on top of an un-audited setup, then having finance numbers expose the gap in month two.
- Reading "server-side is live" as "tracking is fixed" when CAPI without dedup actually *doubles* the count.
- Calling an expected modelled/consent gap a broken setup and burning onboarding time chasing a non-bug.
- Summing Meta + Google + Klaviyo + GA4 attributed orders and "explaining" why they exceed real orders, when the answer is overlapping attribution.
- Missing a duplicate Google Ads conversion action because each platform looks internally consistent — they only disagree against the store.
- Declaring the setup clean off a single good day, or condemning it off a single bad one, instead of judging the window.
- Accepting a "tracking looks off" finding with no drift %, no window, and no real-break-vs-modelled-gap label.

## Run This Play With Live Data

**Manual version:** get partial access to a client you just inherited, export the store's real orders, inspect the Meta dataset for pixel-and-CAPI-with-dedup, pull GA4 / Google Ads / Klaviyo each with its own attribution quirk, align time zones and currency, size the drift against commerce truth, list every conversion action by hand, and label each gap real-break-vs-modelled — all before you're allowed to publish a single report.

**ShopMCP version:** connect the client's store, GA4, Meta, Google Ads, and Klaviyo once. Ask the question; ShopMCP pulls real paid orders as the denominator, checks pixel/CAPI presence and dedup, sizes the GA4↔Shopify drift into bands, lists conversion-action definitions across platforms, separates expected modelled gaps from genuine setup breaks, and returns the **setup scorecard** plus an ordered fix sequence. It stays **read-only** — it will never delete a pixel, rewrite a UTM, or change a tag on the client's account without an explicit approval step and a preview.

> No store, GA4, Meta, Google, or Klaviyo connection inside your AI assistant? That's the wall every onboarding audit hits — you cannot vouch for tracking you cannot read, least of all on an account you were handed yesterday. ShopMCP *is* the connection across all five, so the audit that decides whether you can report on a client runs in one prompt instead of a multi-tab access-chasing afternoon.

Example ShopMCP prompt:

```text
Run the Client Tracking Setup Audit play. Keep it read-only.
```

Run URL:

https://my.shop-mcp.app/playbooks/agency-tracking-setup-audit?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os

What ShopMCP removes:

- Chasing partial access across five tools on a client you just onboarded.
- Re-deriving each platform's attribution window, dedup state, and currency/time-zone quirk by hand.
- Guessing whether a gap is a structural break or an expected modelled/consent gap.
- Hand-listing every conversion action to catch the one that double-counts.
