---
schema_version: 1
slug: "agency-new-client-audit"
title: "New-Client Onboarding Audit"
summary: "New-Client Onboarding Audit helps ecommerce operators answer: What is the state of this new client's account, and what do we fix in week one?"
operating_question: "What is the state of this new client's account, and what do we fix in week one?"
short_title: "New-Client Audit"
primary_persona: "agency"
personas: ["agency", "ecommerce"]
category: "agency-portfolio"
platforms: ["commerce", "google-analytics-4", "meta-ads", "google-ads", "klaviyo", "google-merchant-center"]
cadence: "ad-hoc"
difficulty: "intermediate"
manual_time_minutes_min: 60
manual_time_minutes_max: 120
shopmcp_time_minutes_min: 5
shopmcp_time_minutes_max: 12
decision_type: "client-action-packet"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: false
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/agency-new-client-audit"
shopmcp_prompt: "Run the New-Client Onboarding Audit play. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# New-Client Onboarding Audit

## Operating Question

**You just signed a new ecommerce client and got access to their accounts yesterday. What is actually true about the state of this account — tracking, feed, lifecycle, paid waste — and what do you fix in week one, before you promise anything you can't yet evidence?**

Week one sets the tone for the whole engagement. The trap is that a new account *looks* fine from the outside — the store is live, ads are spending, emails are sending — while underneath, the conversion pixel is firing twice, the product feed has 40% of the catalogue disapproved, the welcome flow has been switched off since a theme migration, and a Performance Max campaign is quietly eating budget on branded traffic the client would have got for free. This play forces a structured, **read-only** sweep across the five things that break most often on a handover, ends with a prioritised **week-one fix list**, a **do-not-touch-until-mapped** list, and a short set of **red flags to raise on the kickoff call** — each call carrying a status of **KILL / REFRESH / WATCH / KEEP / FIX**. You change nothing. You map first, diagnose second, and you only commit to wins you can already see in the data.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant can't see the client's Shopify admin, their GA4 property, Meta Ads Manager, Google Ads, Klaviyo, or Google Merchant Center — and the onboarding audit is *specifically* the moment when you have five freshly-granted logins and no idea which of them is lying to you. To run this manually you have to:

1. Get access to (and confirm the right scope on) five or six platforms — a chase that itself eats days, because the client invariably grants the wrong store, the personal ad account instead of the business one, or read-only GA4 when you needed property-edit to see settings.
2. Export and reconcile orders across Shopify and GA4 to find the tracking drift, then dig into the page source or Tag Assistant to check whether the pixel and CAPI are both present and deduplicated.
3. Pull the Merchant Center diagnostics, sort disapprovals by impact, and cross-reference them against the client's actual top-selling SKUs (not just the alphabetical first 50).
4. Open every Klaviyo flow to see which are live vs. draft, which are actually *sending*, and what their deliverability looks like — then do a quick paid-waste scan across two ad platforms.

**The thinking in this playbook is free. The data access is the hard part — and that is exactly what ShopMCP connects.** When your AI assistant has no live line into the client's store, analytics, ads, feed, and email, that wall is where every manual onboarding audit stalls. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Account Manager or Onboarding Lead at the agency.
- **Also useful for:** the Performance Marketer who'll inherit the paid accounts, the Lifecycle/Email specialist, and the Agency Owner/COO who needs to know what they just took on.
- Run it **once, in the first 3–5 working days** of a new engagement — after access is granted, before the kickoff call where you set expectations.

## When To Run It

- **Cadence:** ad-hoc — once per new client, at the start of the engagement. (For ongoing weekly triage across the roster, run the **Agency Client Health Score** instead; this play is the deep one-time baseline that feeds it.)
- **Triggers:** a signed contract and freshly-granted account access; also worth re-running if you inherit accounts mid-engagement from a previous agency, or after a major platform migration the client did before you arrived.
- **Pre-requisite:** confirm you have the *right* accounts at the *right* scope first. Auditing the wrong ad account or a stale GA4 property produces confident nonsense. If access is partial, this play tells you exactly what to chase rather than guessing around the gap.

## Required Evidence

- **Commerce (Shopify/Woo/BigCommerce/etc.)** — total orders and revenue for the last 30 and 90 days, AOV, new-vs-returning split, top products by revenue, and the store's checkout/theme setup. This is the source of truth everything else is reconciled against; without it, the audit cannot run.
- **Analytics (GA4)** — sessions, conversions, purchase events, and revenue for the same windows, plus the data-stream/tag configuration. Needed to measure tracking drift against commerce.
- **Paid (Meta Ads and/or Google Ads)** — spend, conversions, conversion value, campaign types (Search / Shopping / PMax on Google; prospecting vs. retargeting on Meta), and branded-search exposure. Needed for the paid-waste scan.
- **Targets and context** — the client's own stated CPA/ROAS/MER targets if they have them, blended margin or COGS if available, and any known recent migrations, promos, or platform changes.

At minimum this play needs **commerce truth plus at least one of analytics / ads / email**. With only one platform you can describe a corner of the account, not audit it.

## Optional Evidence (changes the answer when present)

- **Klaviyo (or other ESP)** — which core flows exist, whether they're live and sending, list size, recent campaign send/open/click, and deliverability signals (spam-rate, sending domain authentication). Lets the lifecycle dimension move from "unknown" to a real finding.
- **Google Merchant Center** — product-feed status and the disapproval breakdown, ideally joinable to top-selling SKUs. Lets the feed-health dimension produce a ranked, revenue-weighted finding instead of a raw disapproval count.
- **Search Console / branded-search data** — to size how much paid branded spend is cannibalising free clicks.
- **Stock cover** for top products — a winner that's about to stock out changes which "quick win" is safe to promise.
- **Prior-agency context** — what the last team last touched, so you don't re-break a deliberate setup.

## How To Pull This Evidence

- **Tracking trust** — export Shopify orders for the last 30 days and compare the order/revenue count against GA4's `purchase` events for the same window in the *store's timezone*; more than ~10–15% drift means the data layer is broken. Then load the storefront with the platform's Tag Assistant / Pixel Helper and confirm the Meta Pixel **and** Conversions API both fire on purchase and share the same `event_id` (no `event_id` = no deduplication = inflated conversions). Gotcha: a freshly-granted GA4 property often shows a *thresholding* gap or "data not available yet" for the first 24–48 hours — don't read that as zero conversions.
- **Feed health (GMC)** — open Merchant Center → Products → Diagnostics, sort disapprovals by *impressions* or clicks, not alphabetically, then map them to the client's top revenue SKUs from the commerce export. Gotcha: "pending review" on a feed you just got access to is normal for 1–3 days and is **not** a disapproval — don't raise it as a red flag.
- **Lifecycle (Klaviyo)** — check the four core flows (welcome, abandoned-cart/checkout, browse-abandonment, post-purchase) for **live status AND recent sends in the activity log** — a flow can be "Live" but have zero recipients because its trigger or filter is broken. Then check the account's sending-domain authentication and recent spam-complaint rate. Gotcha: a flow toggled "Live" the day you got access has no send history yet; judge it on configuration, not on a 0-send count.
- **Paid waste (fresh account)** — scan the last 30 days for obvious zero-return spend: campaigns spending with literally 0 conversions over 14+ days, branded-search or PMax spend on terms the client owns organically, and duplicate/abandoned campaigns from a prior agency still live. Gotcha: on a freshly-granted ad account the conversion column may read 0 simply because *your* access predates conversion-tracking visibility, or because conversions are attributed in a linked account you can't see yet — confirm the tracking link before calling spend "wasted."
- Or skip all of this — ShopMCP audits a connected account in minutes.

## The Decision Logic (run in this order)

1. **Confirm access and scope before anything.** List which platforms you actually have, at what scope. If commerce truth is missing, or you have fewer than commerce-plus-one platform, set the missing areas to **FIX (access)** and audit only what you can defend. Never infer the account's state from a platform you can't see.
2. **Establish tracking trust first — it gates everything downstream.** Reconcile commerce orders against GA4 purchases and confirm pixel + CAPI present and deduplicated. If drift exceeds ~15% or dedup is broken, mark tracking **FIX** and treat every paid/analytics number below as *unsafe to act on* until it's repaired. You cannot judge paid waste on numbers you don't trust.
3. **Score feed health against revenue, not volume.** A 200-SKU disapproval list matters far less than 3 disapproved hero SKUs that drive 40% of revenue. Rank disapprovals by the revenue of the SKU behind them; raise the revenue-weighted ones as **FIX**, leave the long tail as **WATCH**.
4. **Audit lifecycle by what's actually sending.** A "Live" flow with no recent recipients is **FIX**, not KEEP. Missing core flows are **REFRESH** (build them). Deliverability problems (poor authentication, high spam rate) outrank flow gaps — a great flow into the spam folder is worth nothing.
5. **Find the obvious paid leaks — conservatively.** Only flag zero-return spend you can defend: 0 conversions over 14+ days with real clicks, or branded cannibalisation you can size. Anything ambiguous on a fresh account is **WATCH** with an access caveat, never KILL on day three.
6. **Pick the top 3–5 quick wins, then split the output.** Rank findings by *impact × confidence × speed*. Produce three lists: the **week-one fix list** (what you'll do now), the **do-not-touch-until-mapped list** (working setups you don't yet understand), and the **kickoff red flags** (what the client needs to hear).

## Manual Workflow

1. Confirm access and scope across commerce, analytics, ads, email, and feed. Write down what's missing — that list is itself a deliverable.
2. Pull the commerce export (30/90 days) as the source of truth: orders, revenue, AOV, top SKUs, new-vs-returning.
3. Run the tracking-trust reconciliation (commerce vs. GA4) and the pixel/CAPI dedup check. If it fails, flag FIX and caveat everything downstream.
4. Pull GMC diagnostics, sort by impact, and join disapprovals to top SKUs.
5. Open every Klaviyo core flow for live-and-sending status and check deliverability.
6. Scan Meta and Google for obvious zero-return spend and branded cannibalisation.
7. Paste the prompt below with your tables.
8. Rank findings by impact × confidence × speed, then split into week-one fixes, do-not-touch, and kickoff red flags — each with an owner and a confidence level.

## Copy-Paste Prompt

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

## Decision Rules (with numbers)

- **FIX** — tracking drift between commerce and GA4 > ~15%, pixel/CAPI dedup broken (no shared `event_id`), a disapproved SKU in the top-revenue decile, a "Live" flow with 0 recent sends, or broken sending-domain authentication. These are the week-one repairs.
- **REFRESH** — a core lifecycle flow is missing entirely (no welcome, no abandoned-checkout), or feed attributes are weak but not disapproved. Build or improve, don't just toggle.
- **KILL** — paid spend with 0 conversions over ≥14 days with ≥300 real clicks **and** confirmed-working tracking, or branded-search/PMax spend you can prove is cannibalising free organic clicks. Only after access and tracking are verified.
- **WATCH** — anything ambiguous on a freshly-granted account: a 0-conversion column you suspect is an access/attribution artefact, a flow toggled live the day you got access, a feed in "pending review."
- **KEEP** — a setup that is demonstrably working and within the client's stated targets; leave it alone and note it as a baseline.
- Every recommendation carries a **number, source, time window, and confidence level** — on a handover, an unsourced claim is how you set a target you can't hit.

## Veto Rules

- Do **not** change, pause, or edit anything before the account is mapped. This is a read-only audit; week one is for understanding, not surgery.
- Do **not** infer the account's state from a platform you can't see — flag the missing access explicitly and audit only what you can defend.
- Do **not** promise a win you can't yet evidence. "We'll lift ROAS 30%" before you've confirmed tracking is how you lose trust in month two.
- Do **not** call paid spend "wasted" until you've confirmed the conversion-tracking link actually reports into the account you can see.
- Do **not** judge a flow KEEP on "Live" status alone — require evidence it is sending to real recipients.
- Do **not** raise a "pending review" feed or a 24–48h-old GA4 gap as a red flag; those are normal fresh-access artefacts.

## Output Contract

A findings table, ranked by severity then impact:

| Area | Finding | Severity | Week-1 action | Owner | Confidence |
|---|---|---|---|---|---|
| Tracking | GA4 purchases trail Shopify orders by 18% (30d) | FIX | Repair data layer; add CAPI dedup | Analytics | High |

Followed by: a **do-not-touch-until-mapped** list, and a **top-3 kickoff red flags** list.

## Worked Example (real numbers)

> **Executive read:** New client "Lumen & Field" (home fragrance, ~$340k/yr) handed over five accounts on day one. The headline problem is trust: GA4 purchases trail Shopify orders by 23% and the Meta Pixel fires without a deduplicated CAPI, so every paid number is currently unsafe to act on. The fastest real win is the abandoned-checkout flow — it's been "Live" but silent since their March theme migration, leaving recoverable revenue on the table — and a PMax campaign is spending on their own brand name for clicks they already own organically.

| Area | Finding | Severity | Week-1 action | Owner | Confidence |
|---|---|---|---|---|---|
| Tracking | GA4 purchases (1,042 / 30d) trail Shopify orders (1,353 / 30d) by 23% | FIX | Repair GA4 data layer; verify purchase event | Analytics | High |
| Tracking | Meta Pixel fires on purchase but no matching CAPI `event_id` — no dedup | FIX | Stand up CAPI with shared `event_id` | Analytics + Perf | High |
| Feed | 4 of top-20 revenue SKUs disapproved in GMC ("missing GTIN"), ~$2,900/mo blocked | FIX | Add GTINs to hero SKUs, resubmit | Feed | High |
| Lifecycle | Abandoned-checkout flow "Live" but 0 sends since 14 Mar (trigger broke at migration) | FIX | Rebuild trigger; QA send | Email | High |
| Lifecycle | No browse-abandonment flow exists | REFRESH | Build after checkout flow is fixed | Email | Med |
| Paid | PMax spends $1,180/30d largely on branded queries the brand ranks #1 for organically | KILL | Exclude brand terms / pause branded PMax | Perf | Med |
| Paid | Meta retargeting shows 0 conversions/30d — suspected attribution-link gap, not true waste | WATCH | Confirm pixel link before any pause | Perf | Low |
| Email | Sending domain unauthenticated (no DMARC); 0.42% spam rate trending up | FIX | Authenticate domain (SPF/DKIM/DMARC) | Email | High |

**Do not touch until mapped:** the Google Ads Shopping campaign (4.1 ROAS reported, but tracking is unverified — leave until trust is fixed); the welcome flow (KEEP — sending normally, 38% open rate); the live promo running until month-end (don't disrupt mid-flight).

**Top-3 kickoff red flags:** (1) "Your conversion tracking under-reports by ~23%, so the paid ROAS you've been judging is optimistic — we fix this first." (2) "Your cart-recovery emails have been silent since March; that's recoverable revenue we'll restore in week one." (3) "You're paying to advertise on your own brand name; we'll stop that and reallocate."

## Common Failure Modes

- Judging paid spend on a fresh account before confirming the conversion-tracking link — and "killing" spend that was actually converting in an account you couldn't see.
- Reporting a flow as healthy because it says "Live," when it hasn't sent to a real recipient in months.
- Counting raw feed disapprovals instead of weighting them by the revenue of the SKU behind each one.
- Mistaking a normal 24–48h fresh-GA4 gap or a "pending review" feed for a genuine problem and burning kickoff credibility on a non-issue.
- Promising a specific lift on the kickoff call before tracking is trustworthy enough to baseline it.
- Touching a working setup you don't yet understand and silently breaking a deliberate configuration from the prior team.

## Run This Play With Live Data

**Manual version:** chase access to five or six platforms, export and reconcile orders against GA4, eyeball the pixel in Tag Assistant, sort GMC diagnostics by hand, open every Klaviyo flow one by one, and scan two ad accounts for leaks — all in the first few days, while the kickoff clock is running.

**ShopMCP version:** the client connects their store, analytics, ads, feed, and email once. You ask the question; ShopMCP pulls live commerce truth, runs the tracking-trust reconciliation and pixel/CAPI dedup check, ranks feed disapprovals by SKU revenue, reports which Klaviyo flows are actually sending and how deliverability looks, scans paid for defensible zero-return spend, and returns the ranked findings table plus the do-not-touch and kickoff-red-flag lists. It stays **read-only** for the whole audit — nothing is changed until you explicitly approve a fix after the account is mapped.

> No store, analytics, ads, feed, or email connection inside your AI assistant? That's the wall every manual onboarding audit hits. ShopMCP *is* the connection — and the same playbook then runs in one prompt instead of a week of access-chasing and spreadsheet reconciliation.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the New-Client Onboarding Audit play. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- The multi-day access chase and the reconciliation of orders against GA4 by hand.
- Eyeballing the pixel and CAPI in Tag Assistant and guessing whether dedup is working.
- Sorting GMC disapprovals manually and joining them to top SKUs.
- Opening every Klaviyo flow one at a time to see which are actually sending.
- Guessing which fresh-account numbers are safe enough to act on versus an access artefact.
