---
name: agency-tracking-setup-audit
description: "When an ecommerce operator needs to decide: Can we trust this client's tracking before we report on it or scale spend? Runs the Client Tracking Setup Audit play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Tracking Setup Audit', 'Commerce', 'Google Analytics 4', 'Meta Ads', 'Google Ads', 'Klaviyo', 'Agency Portfolio'."
license: CC-BY-4.0
metadata:
  persona: Agency AM / COO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Client Tracking Setup Audit

**Operating question:** Can we trust this client's tracking before we report on it or scale spend?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce truth (Shopify / Woo / BigCommerce)** — total **paid orders** and order count for a reference window (last 30 days is typical), with test orders, $0 orders, and cancelled/fully-refunded orders excluded; order timestamps in **store time zone**; store **currency**. This is the truth denominator the whole audit is judged against.
- **Meta pixel + CAPI state** — is the browser **pixel** present, is the **Conversions API** live, and do they share a dedup key (`event_id`)? Plus `purchases` and value with the **attribution setting stated** (default 7-day click / 1-day view over-claims view-through orders the store never sees).
- **GA4** — `purchase` event count (or `ecommerce purchases`) and revenue for the same window, plus `session_default_channel_group` and `source / medium` to expose `(direct) / (none)` bloat and self-referral inflation.
- **Google Ads** — `conversions` and conversion value **per conversion action**, so you can catch a native "Purchase" firing alongside a GA4-imported "Purchase" alongside a legacy action — three counts of one order.
- **Klaviyo** — flow + campaign **attributed orders** and value (default 5-day click / 1-day open), which legitimately overlap with paid and must never be summed with other sources as if exclusive.
- **Targets / context for labelling drift** — your accepted healthy band (under 5% drift), and any known modelled/consent baseline for the account.

Optional, if available:

- **Consent / CMP state** — consent-mode v2 status, % of sessions consented, ad-blocker share — to separate an *expected* modelled gap from a real structural break.
- **Tag/deploy history** — recent GTM, theme, checkout, pixel, or CAPI changes with dates, especially anything the previous agency shipped, so an inherited break can be dated.
- **Server-side setup** — whether Meta CAPI / GA4 server-side / a server container is live, its dedup key, and its event match quality.
- **Subscription / recurring app** — does a recurring charge re-fire `purchase`? (a classic duplicate-transaction source that compounds monthly).
- **UTM convention doc** — does the client (or the prior agency) have a UTM standard, and do live email/SMS/paid links actually follow it?

## How to decide — in order

1. **Lock commerce truth first.** Establish the client's real paid-order count and revenue for the reference window, test/$0/cancelled/refunded excluded. Every check below is judged against this number, never against another platform. Nothing else is "truth." If you cannot get this number, the audit cannot run — stop and request store access.
2. **Audit pixel/CAPI presence and dedup.** Is the Meta pixel present? Is CAPI live? Do they deduplicate on `event_id`? Missing pixel → **FIX** (nothing is being measured). Both firing without dedup → **FIX** (everything is double-counted). Both with clean dedup → **KEEP**.
3. **Size the GA4 ↔ Shopify structural drift.** Apply the bands against commerce truth: **under 5% healthy → KEEP; 5–15% caution → WATCH/REFRESH; over 15% unsafe → FIX, and no reporting may use that source until repaired.** This is the headline number that decides whether you can report at all.
4. **Separate a real break from an expected modelled gap.** Meta/Google view-through and modelled conversions, Klaviyo's open-window attribution, and GA4 consent modelling are *designed* to exceed the store count. A gap that matches the known consent/modelled baseline is **WATCH**, not a broken-setup **FIX**. Only call FIX when the gap exceeds what the model alone explains. (A single bad day is not a setup break — judge the window, not a spike.)
5. **Walk the structural culprits**, in this order: **duplicate/recurring purchase events** (source above truth) → **conversion-action definitions** counting one order multiple ways across Meta/Google/Klaviyo → **consent-mode / iOS / ad-blocker shortfall** (source below truth) → **server-side vs. browser** dedup gap → **UTM governance** (fat `(direct)/(none)`, untagged email/SMS/paid links) → **unfiltered test orders**.
6. **Rank the repairs by what they unblock, not by drift size.** The fix that lets you report on the channel the client is about to fund comes before a larger drift on a channel nobody touches. Then assign status + owner + recheck, and state the single line: **what is safe to report on now, and what is frozen until a named fix lands.**

## The prompt to run

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

## Decision rules

- **KEEP** — the check passes: pixel + CAPI present and deduplicated, drift under 5% against commerce truth, conversion actions clean, test orders filtered. Safe to report on this source.
- **WATCH** — drift 5–15%, *or* a larger gap fully explained by a known modelled/consent baseline (expected, not broken). Report with a footnote; monitor; do not yet rebuild.
- **REFRESH** — drift 5–15% traced to a fixable hygiene issue (a few untagged links, one mislabelled UTM, a stale channel grouping) where a light correction closes the gap before the first report.
- **FIX** — drift over 15%, a missing pixel, undeduplicated CAPI, a double-counting conversion action, or unfiltered test orders. This source is **frozen for reporting and scaling** until repaired.
- **KILL** — retire a setup artifact that should not exist: a duplicate/legacy pixel, an orphaned conversion action double-counting purchases, a dead UTM convention inherited from the prior agency still polluting reports.
- Every recommendation must include a **number, source, time window, and confidence level** — a "tracking looks off" with no drift %, no window, and no source is not an audit finding.

## Vetoes — stop if any apply

- **Never report attribution or scale spend above 15% drift on a channel.** Reconcile or freeze it first — full stop. The first report sets the trust baseline for the whole relationship.
- **Never treat a single platform's self-report as truth.** Commerce orders are the only denominator; Meta/Google/GA4/Klaviyo are claimants, not judges.
- **Never confuse modelled vs. measured.** A gap that matches the known view-through/consent baseline is an expected modelled gap (WATCH), not a broken setup (FIX) — "fixing" it wastes a sprint and can break legitimate modelling.
- **Never call a setup broken off one bad day.** A single anomalous day is not a structural break — audit the window, label the baseline, then judge.
- **Never add attributed orders across sources** (Meta + Google + Klaviyo + GA4) as if exclusive — overlapping attribution windows double-count the same order.
- **Never declare a check "fixed" without a clean recheck window** free of the migration, promo, or deploy that polluted the original audit.
- **Never recommend writes, pixel deletions, UTM rewrites, or tag changes without explicit human approval** and a preview of what changes — especially on a client account you've just been handed.

## Output

A **setup scorecard**, per-check notes, confidence labels, and an **ordered fix sequence** (biggest report-blocker first), closing with a one-line verdict on what is safe to report vs. not.

Minimum table columns:

| Check | Status | Drift/issue | Risk | Fix | Owner |
|---|---|---|---|---|---|
| Example: GA4 ↔ Shopify purchase drift | FIX | +22% vs 1,000 paid orders (30d) | Over-reports revenue; inflates blended ROAS | Remove double-fired purchase tag | Analytics |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/agency-tracking-setup-audit) — it executes this play read-only by default and applies changes only on your approval.
