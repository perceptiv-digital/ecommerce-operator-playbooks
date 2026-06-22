---
name: agency-new-client-audit
description: "When an ecommerce operator needs to decide: What is the state of this new client's account, and what do we fix in week one? Runs the New-Client Onboarding Audit play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'New-Client Audit', 'Commerce', 'Google Analytics 4', 'Meta Ads', 'Google Ads', 'Klaviyo', 'Google Merchant Center', 'Agency Portfolio'."
license: CC-BY-4.0
metadata:
  persona: Agency AM / COO
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# New-Client Onboarding Audit

**Operating question:** What is the state of this new client's account, and what do we fix in week one?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — total orders and revenue for the last 30 and 90 days, AOV, new-vs-returning split, top products by revenue, and the store's checkout/theme setup. This is the source of truth everything else is reconciled against; without it, the audit cannot run.
- **Analytics (GA4)** — sessions, conversions, purchase events, and revenue for the same windows, plus the data-stream/tag configuration. Needed to measure tracking drift against commerce.
- **Paid (Meta Ads and/or Google Ads)** — spend, conversions, conversion value, campaign types (Search / Shopping / PMax on Google; prospecting vs. retargeting on Meta), and branded-search exposure. Needed for the paid-waste scan.
- **Targets and context** — the client's own stated CPA/ROAS/MER targets if they have them, blended margin or COGS if available, and any known recent migrations, promos, or platform changes.

At minimum this play needs **commerce truth plus at least one of analytics / ads / email**. With only one platform you can describe a corner of the account, not audit it.

Optional, if available:

- **Klaviyo (or other ESP)** — which core flows exist, whether they're live and sending, list size, recent campaign send/open/click, and deliverability signals (spam-rate, sending domain authentication). Lets the lifecycle dimension move from "unknown" to a real finding.
- **Google Merchant Center** — product-feed status and the disapproval breakdown, ideally joinable to top-selling SKUs. Lets the feed-health dimension produce a ranked, revenue-weighted finding instead of a raw disapproval count.
- **Search Console / branded-search data** — to size how much paid branded spend is cannibalising free clicks.
- **Stock cover** for top products — a winner that's about to stock out changes which "quick win" is safe to promise.
- **Prior-agency context** — what the last team last touched, so you don't re-break a deliberate setup.

## How to decide — in order

1. **Confirm access and scope before anything.** List which platforms you actually have, at what scope. If commerce truth is missing, or you have fewer than commerce-plus-one platform, set the missing areas to **FIX (access)** and audit only what you can defend. Never infer the account's state from a platform you can't see.
2. **Establish tracking trust first — it gates everything downstream.** Reconcile commerce orders against GA4 purchases and confirm pixel + CAPI present and deduplicated. If drift exceeds ~15% or dedup is broken, mark tracking **FIX** and treat every paid/analytics number below as *unsafe to act on* until it's repaired. You cannot judge paid waste on numbers you don't trust.
3. **Score feed health against revenue, not volume.** A 200-SKU disapproval list matters far less than 3 disapproved hero SKUs that drive 40% of revenue. Rank disapprovals by the revenue of the SKU behind them; raise the revenue-weighted ones as **FIX**, leave the long tail as **WATCH**.
4. **Audit lifecycle by what's actually sending.** A "Live" flow with no recent recipients is **FIX**, not KEEP. Missing core flows are **REFRESH** (build them). Deliverability problems (poor authentication, high spam rate) outrank flow gaps — a great flow into the spam folder is worth nothing.
5. **Find the obvious paid leaks — conservatively.** Only flag zero-return spend you can defend: 0 conversions over 14+ days with real clicks, or branded cannibalisation you can size. Anything ambiguous on a fresh account is **WATCH** with an access caveat, never KILL on day three.
6. **Pick the top 3–5 quick wins, then split the output.** Rank findings by *impact × confidence × speed*. Produce three lists: the **week-one fix list** (what you'll do now), the **do-not-touch-until-mapped list** (working setups you don't yet understand), and the **kickoff red flags** (what the client needs to hear).

## The prompt to run

```text
You are my agency onboarding analyst running the "New-Client Onboarding Audit" play.

GOAL: produce a read-only week-one audit of a brand-new client's account across five
areas — tracking trust, feed health, lifecycle/email, paid waste, and the top 3-5 quick
wins — then split the result into a week-one fix list, a do-not-touch-until-mapped list,
and the red flags to raise on the kickoff call.

I will paste: commerce orders/revenue, GA4 conversions, Meta/Google spend tables, GMC
feed diagnostics, and Klaviyo flow status. Some of these may be missing.

RULES:
- PRE-FLIGHT: First list which inputs I have access to vs. missing. If I lack access to the
  client's commerce data plus at least one of analytics/ads/email, STOP and list exactly
  what access to request — never guess the account's state.
- Establish tracking trust first. If commerce orders and GA4 purchases diverge >15%, or
  pixel/CAPI dedup is broken, mark tracking FIX and treat all paid/analytics numbers below
  as unsafe to act on until repaired.
- Score feed disapprovals by the REVENUE of the SKU behind them, not by raw count.
- Judge Klaviyo flows by whether they are actually SENDING, not just "Live". Deliverability
  problems outrank missing flows.
- Flag paid waste conservatively: only zero-return spend you can defend (0 conversions over
  14+ days with real clicks, or sized branded cannibalisation). Ambiguous = WATCH with an
  access caveat, never KILL on a fresh account.
- Never recommend changing anything before the account is mapped. This run is read-only.
- Every finding must carry: a number, its source, the time window, and a confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read of the account's overall state.
2. A findings table using exactly this header row:
   | Area | Finding | Severity | Week-1 action | Owner | Confidence |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. A do-not-touch-until-mapped list (working setups you don't yet understand).
4. The top 3 red flags to raise on the kickoff call.
5. What evidence is blocked and exactly what access I should request to upgrade it.
```

## Decision rules

- **FIX** — tracking drift between commerce and GA4 > ~15%, pixel/CAPI dedup broken (no shared `event_id`), a disapproved SKU in the top-revenue decile, a "Live" flow with 0 recent sends, or broken sending-domain authentication. These are the week-one repairs.
- **REFRESH** — a core lifecycle flow is missing entirely (no welcome, no abandoned-checkout), or feed attributes are weak but not disapproved. Build or improve, don't just toggle.
- **KILL** — paid spend with 0 conversions over ≥14 days with ≥300 real clicks **and** confirmed-working tracking, or branded-search/PMax spend you can prove is cannibalising free organic clicks. Only after access and tracking are verified.
- **WATCH** — anything ambiguous on a freshly-granted account: a 0-conversion column you suspect is an access/attribution artefact, a flow toggled live the day you got access, a feed in "pending review."
- **KEEP** — a setup that is demonstrably working and within the client's stated targets; leave it alone and note it as a baseline.
- Every recommendation carries a **number, source, time window, and confidence level** — on a handover, an unsourced claim is how you set a target you can't hit.

## Vetoes — stop if any apply

- Do **not** change, pause, or edit anything before the account is mapped. This is a read-only audit; week one is for understanding, not surgery.
- Do **not** infer the account's state from a platform you can't see — flag the missing access explicitly and audit only what you can defend.
- Do **not** promise a win you can't yet evidence. "We'll lift ROAS 30%" before you've confirmed tracking is how you lose trust in month two.
- Do **not** call paid spend "wasted" until you've confirmed the conversion-tracking link actually reports into the account you can see.
- Do **not** judge a flow KEEP on "Live" status alone — require evidence it is sending to real recipients.
- Do **not** raise a "pending review" feed or a 24–48h-old GA4 gap as a red flag; those are normal fresh-access artefacts.

## Output

A findings table, ranked by severity then impact:

| Area | Finding | Severity | Week-1 action | Owner | Confidence |
|---|---|---|---|---|---|
| Tracking | GA4 purchases trail Shopify orders by 18% (30d) | FIX | Repair data layer; add CAPI dedup | Analytics | High |

Followed by: a **do-not-touch-until-mapped** list, and a **top-3 kickoff red flags** list.

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/agency-new-client-audit) — it executes this play read-only by default and applies changes only on your approval.
