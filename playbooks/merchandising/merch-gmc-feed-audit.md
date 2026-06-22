---
schema_version: 1
slug: "merch-gmc-feed-audit"
title: "GMC Feed Audit"
summary: "GMC Feed Audit helps ecommerce operators answer: Which feed issues are blocking product visibility or trust?"
operating_question: "Which feed issues are blocking product visibility or trust?"
short_title: "GMC Feed"
primary_persona: "merchandising"
personas: ["merchandising", "performance"]
category: "merchandising-feed"
platforms: ["google-merchant-center", "commerce"]
cadence: "weekly"
difficulty: "intermediate"
manual_time_minutes_min: 45
manual_time_minutes_max: 90
shopmcp_time_minutes_min: 3
shopmcp_time_minutes_max: 8
decision_type: "diagnose-and-rank"
evidence_level: "live-data-recommended"
public_tier: "launch"
flagship: true
shopmcp_ready: true
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/merch-gmc-feed-audit"
shopmcp_prompt: "Run the GMC Feed Audit play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---

# GMC Feed Audit

## Operating Question

**Which feed issues are actually blocking product visibility or trust right now — and which of them sit on SKUs that earn money, so they deserve a fix this week instead of a backlog ticket?**

A Merchant Center feed is never "clean." There are always issues. The job is not to drive the issue count to zero — it's to separate the disapprovals and item-level problems that are *suppressing revenue-bearing products from Shopping, Performance Max, and free listings* from the long tail of warnings on SKUs nobody buys. This play forces a **FIX / REFRESH / WATCH / KEEP / KILL** call on each issue cluster, ranked by **revenue at risk on the affected SKUs** and by **whether those SKUs are live in paid Shopping/PMax** — not by raw issue count, and not by issue severity alone.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no view into your Merchant Center account or your live store. The whole diagnosis hinges on two data sources that only exist behind authentication, and on *reconciling them against each other*:

1. **Merchant Center item status** — the `product_view` report (status per reporting context: ELIGIBLE / DISAPPROVED / PENDING), the `itemLevelIssues` array on each product (issue code, severity, the offending attribute, resolution path, docs URL), and account-level issues. This is several exports across multiple Merchant API surfaces, and the issue codes are cryptic (`landing_page_error`, `image_too_small`, `mismatched_availability`, `missing_gtin`).
2. **Your live store** — the *actual* price and availability on the product page right now, plus the trailing revenue per SKU. The single most common silent disapproval — **price mismatch / availability mismatch between the feed and the landing page** — is invisible unless you compare the feed value against the live store value, which no static export contains.

**The diagnostic thinking in this playbook is free. The data access — and the feed-vs-store reconciliation — is the hard part, and that is exactly what ShopMCP connects.** If your AI assistant can't read Merchant Center *and* your storefront, that wall is where a manual run stalls. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Merchandising Manager (owns the feed and product data).
- **Also useful for:** Performance Marketer (a disapproved SKU silently drains Shopping/PMax budget and tanks campaign coverage), Founder/CEO (when a hero product vanishes from Shopping overnight).
- Run it when you own the catalogue data and need a *decision* about what to fix first — not a 400-row issue dump from the Merchant Center "Needs attention" tab.

## When To Run It

- **Cadence:** weekly — early in the week, so fixes have the full week to crawl back in before the weekend's traffic.
- **Triggers:** a sudden drop in Shopping impressions or "active" product count; a Merchant Center email about disapprovals or a misrepresentation/policy strike; a feed-rules app change, a theme/template deploy, or a bulk price/availability update on the store; a new product launch or seasonal range going live; PMax coverage or impression volume falling for no campaign-side reason.
- **Pre-requisite:** confirm the **source of truth** for product data *before* you run — is price/availability driven by the store, by the raw feed file, or by a feed-rules/optimisation app (e.g. a Shopify feed app, DataFeedWatch, Feedonomics)? You cannot judge a "mismatch" until you know which layer is supposed to win.

## Required Evidence

- **Merchant Center item status** — per-SKU status by reporting context (Shopping ads / free listings / PMax), the `itemLevelIssues` array (code, severity, attribute, resolution), and the ELIGIBLE / DISAPPROVED / PENDING split. Pull the *processed* product view, not just the raw feed file — Google's processing is where attributes get rejected.
- **Account-level issues** — policy/misrepresentation/account suspension warnings. These outrank item issues: an account-level misrepresentation strike can suppress the *entire* catalogue.
- **Live store price + availability per affected SKU** — the value a shopper sees right now, to compare against the feed value. This is the mismatch test and it is non-negotiable.
- **Revenue / units per SKU (trailing 30–60 days)** — from commerce orders, so each issue can be weighted by money at risk, not treated as equal.
- **Paid-surface membership** — which affected SKUs are actually in active Shopping / Performance Max (a disapproved bestseller in PMax is an emergency; a disapproved discontinued SKU is noise).

## Optional Evidence

- **Feed-rules / optimisation app config** — to find where an attribute is being overwritten or a supplemental feed is fighting the primary.
- **Recent change log** — theme deploy, price update, feed-app rule edit, GTIN re-mapping, or bulk inventory sync, with timestamps. A disapproval that appeared the day after a deploy is a deploy bug, not a content gap.
- **Promotion calendar** — a sale price in the feed that doesn't match the live store (or a `sale_price` window that already expired) is a classic price-mismatch trigger.
- **Shopping/PMax impression and click trend per SKU** — to confirm a disapproval actually cost traffic versus a SKU that never had demand.
- **Required-attribute coverage for the vertical** — for apparel especially: `age_group`, `gender`, `color`, `size` are *required*, and missing them is a disapproval, not a warning.

## How To Pull This Evidence

- **GMC item status + issue export** — pull the processed `product_view` (status per reporting context) and the `itemLevelIssues` array via the Merchant API, or export from Merchant Center → *Products → All products* (per-SKU status) and *Diagnostics → Item issues* (issue code, severity, affected attribute, example items). The Diagnostics view groups by issue code; you still have to map each code back to the individual SKUs to weight by revenue.
- **Feed-vs-store price/availability check** — this is the #1 silent disapproval and no export contains it. Take the `price`, `sale_price`, and `availability` your feed submits, then open the live product page for each affected SKU and read what a shopper sees right now. Any gap (expired sale still in the feed, store stockout the feed hasn't caught) is a `mismatched_price` / `mismatched_availability` waiting to disapprove. Watch for an expired `sale_price` window and theme/cache staleness on the store side.
- **Shopify SKU revenue** — pull trailing 30–60d units and revenue per SKU/variant from Analytics → Reports (*Sales by product variant SKU*), the Admin/GraphQL Orders API, or an exported orders CSV summed by SKU. Join on the same SKU key the feed uses so each issue inherits a dollar figure.
- **Crawl-cycle recovery gotcha** — a corrected attribute does not clear on save. Google needs **1–3 crawl/refresh cycles** (or a feed re-fetch) to re-process and recover the item, so the export you pull the same day still shows the old disapproval. Set rechecks a cycle out and don't read a stale status as a failed fix.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Account before item.** Check account-level issues first. A misrepresentation / policy / suspension strike can suppress the whole catalogue, so no item-level fix matters until it clears → **FIX**, route to whoever owns policy/legal, stop ranking items until resolved.
2. **Errors before warnings.** Split issues by severity. **Errors suppress the item** (it is not serving on the affected surface). **Warnings still serve but are at risk**, and "pending"/"under review" is a *clock*, not a verdict. Errors on revenue SKUs are the queue; warnings on revenue SKUs are the WATCH list.
3. **Run the mismatch test — this is the #1 silent killer.** For every error, compare the **feed value vs the live store value** for price and availability. A `mismatched_price` or `mismatched_availability` disapproval is almost always a sync problem (stale feed, expired `sale_price`, a feed-rules app overwriting the store), not a "wrong product." Fixing the *source of truth* clears it; editing the feed by hand papers over it until the next sync.
4. **Weight by revenue and paid-surface membership.** Re-rank every error by trailing SKU revenue and whether it's live in Shopping/PMax. A disapproved SKU doing real revenue and sitting in an active campaign is an **emergency**; the same issue on a dead SKU is **WATCH** or **KILL the listing**, not a fire drill.
5. **Classify the fixable single-attribute issues.** Most item disapprovals are *one attribute*: missing/invalid `gtin`, generic or too-small `image`, missing `brand`/`mpn`, or (apparel) missing `age_group`/`gender`/`color`/`size`. These are **FIX**, fast, and high-leverage. Never treat them as permanent loss.
6. **Apply the vetoes**, then assign status + owner + a recheck date that respects the crawl cycle (see veto on re-judging too soon).

## Manual Workflow

1. Pull Merchant Center account-level issues and the per-SKU `product_view` (status + `itemLevelIssues`). Note today's date as your baseline.
2. Confirm the source of truth for price/availability (store vs raw feed vs feed-rules app) before judging any mismatch.
3. Split issues into **account-level**, **errors (suppressed)**, and **warnings (serving, at risk)**.
4. For every error, open the live product page and record the on-store price and availability next to the feed values — flag every mismatch.
5. Join each affected SKU to trailing revenue and paid-surface membership; rank errors by revenue at risk, not by count.
6. Paste the prompt below with your tables.
7. Pressure-test every call against the veto list, then convert survivors into an action packet with the true root cause (source-of-truth layer), owner, and a recheck date one to three crawl cycles out.

## Copy-Paste Prompt

```text
You are my Merchant Center feed analyst running the "GMC Feed Audit" play.

GOAL: decide which feed issues to FIX, REFRESH, WATCH, KEEP, or KILL this week, ranked by
revenue at risk on the affected SKUs and whether those SKUs are live in Shopping/PMax —
not by raw issue count and not by severity alone.

I will paste: Merchant Center account-level issues; a per-SKU table with status
(ELIGIBLE/DISAPPROVED/PENDING), the item-level issue code + severity + offending attribute;
the live-store price and availability for affected SKUs; trailing 30-60d revenue/units per
SKU; and which SKUs are in active Shopping/PMax. Some fields may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If GMC item-level
status/issues joined to per-SKU trailing revenue is missing, STOP and return only (a) what's
missing and (b) how to get it — never estimate it or proceed. Without per-SKU revenue you
cannot rank by money at risk, and ranking by money (not issue count) is the entire point of
this play; an issue-only list with no revenue join is not a ranking.

RULES:
- Account-level first: if there's a misrepresentation/policy/suspension issue, flag it as the
  top FIX and note that item-level fixes are blocked until it clears.
- Errors suppress the item; warnings still serve but are at risk; pending is a clock, not a
  verdict. Treat them differently.
- For every price/availability disapproval, compare feed value vs live-store value and name
  the likely source-of-truth layer (store / raw feed / feed-rules app). Do NOT recommend a
  blind feed edit if the store is the source of truth — name the sync fix.
- Rank by revenue at risk x paid-surface membership. A disapproved revenue SKU in active
  Shopping/PMax is an emergency; the same issue on a dead SKU is WATCH or KILL the listing.
- Most item disapprovals are one attribute (gtin, image, brand, mpn, or apparel
  age_group/gender/color/size). Call those out as fast FIX, never permanent loss.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked table using EXACTLY this header row and column set:
   | SKU/Product | Issue (code) | Severity | Surfaces affected | 30d revenue at risk | Root cause | Fix | Owner | Recheck |
   |---|---|---|---|---|---|---|---|---|
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose. (Root cause = the source-of-truth layer.)
3. Vetoes/caveats that downgraded any recommendation.
4. What evidence is blocked and what you'd need to upgrade a WATCH to a FIX decision.
```

## Decision Rules

- **FIX** — an **error** (item suppressed) on a SKU with real trailing revenue and/or active Shopping/PMax membership, where the cause is identified: a single missing/invalid attribute (`gtin`, `image`, `brand`, `mpn`, apparel `age_group`/`gender`/`color`/`size`), or a confirmed feed-vs-store price/availability mismatch with a known source-of-truth layer to correct. Account-level policy/misrepresentation strikes are always FIX and always top of queue.
- **REFRESH** — the SKU serves but is throttled or at risk: a **warning** (e.g. generic image, weak/missing `gtin` lowering match quality, "limited performance"/under-review), or an attribute that's *valid but poor* (thin title, missing recommended attributes) suppressing Shopping eligibility/quality on a product still worth selling.
- **WATCH** — directional or early: a brand-new SKU still in PENDING/under-review (give it the crawl cycle), a warning on a low-revenue SKU, or an issue whose revenue impact can't yet be confirmed because the window is polluted by a launch, promo, or recent stockout.
- **KEEP** — ELIGIBLE on all intended surfaces with no error and no revenue-relevant warning. Don't touch it.
- **KILL** — KILL the *listing*, not budget: a disapproved SKU that's discontinued, dead, or duplicate. Remove it from the feed so it stops inflating the issue count and the "needs attention" noise. Never the default for a disapproval.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- Do **not** bulk-edit the feed without first confirming the source of truth (store vs raw feed vs feed-rules app). A hand-edited attribute gets overwritten on the next sync and the disapproval returns — fix the layer that wins.
- Do **not** re-judge a corrected item too soon. A fixed attribute takes **1–3 crawl/refresh cycles** to re-process and recover; set the recheck date accordingly and don't declare a fix failed before then.
- Do **not** assume a "DISAPPROVED" item is gone forever. Most disapprovals are one-attribute fixes that fully recover — never write a revenue SKU off as dead on the strength of a disapproval alone.
- Do **not** rank by issue count or severity alone. Severity without revenue weighting sends the team to fix warnings on dead SKUs while a disapproved bestseller bleeds.
- Do **not** treat a price/availability mismatch as a "wrong feed value" before checking the live store — the store may be the side that's stale (cache, theme bug, expired sale).
- Do **not** push feed writes, delete listings, or trigger a manual review without explicit human approval and a confirmed root cause.

## Output Contract

A SKU / issue-cluster table ranked by **revenue at risk**, not issue count:

| SKU/Product | Issue (code) | Severity | Surfaces affected | 30d revenue at risk | Root cause | Fix | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Example SKU | mismatched_price | error | Shopping + free | $X | Feed shows sale price; store sale ended | Correct source-of-truth layer | Merch | 1–3 crawl cycles |

## Worked Example

> **Executive read:** Roughly $9.7k/mo of Shopping-eligible revenue is currently suppressed, and it's concentrated in three SKUs, not the 180-row issue list. The biggest single hit is a bestselling jacket disapproved on a *price mismatch* — the feed still carries last week's sale price while the storefront sale expired, so it's a sync fix at the feed-app layer, not a product problem. One apparel SKU is a clean missing-`size` FIX, and a discontinued SKU's image disapproval is just noise we should KILL off the feed.

| SKU/Product | Issue (code) | Severity | Surfaces affected | 30d revenue at risk | Root cause | Fix | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|
| Aurora Down Jacket (best-seller, in PMax) | `mismatched_price` | error | Shopping + free + PMax | **$6,200** | Feed carries expired `sale_price`; storefront sale ended 4 days ago; feed-rules app not re-synced | Fix sync at feed-app layer (source of truth = store), not a manual feed edit | Merch + Feed-app owner | 1–3 crawl cycles |
| Trail Runner Tee – Olive / M | `missing_required_attribute` (`size`) | error | Shopping + free | $1,850 | `size` never mapped for this variant range; apparel requires it | Add `size` mapping for the variant group | Merch | Next refresh + 1 cycle |
| Studio Tote (generic catalogue) | `image_too_small` / generic image | warning | Shopping (throttled) | $1,200 | Supplier stock image below 250px and generic; still serving but low quality | REFRESH with a proper product image (recommended attr) | Merch + Creative | 7 days |
| Classic Hoodie – Grey / S | `pending` (under review) | n/a | none yet | n/a (new SKU) | New variant added 2 days ago, still processing | WATCH — give it the crawl cycle | Merch | 3 days |
| 2019 Festival Tee (discontinued) | `image_link_broken` | error | Shopping | $0 (no sales 90d) | Dead SKU, asset 404s | KILL the listing — remove from feed | Merch | n/a |

Note how the answer *inverts* the Merchant Center "Needs attention" view: that view shows 180+ issues sorted by code; the revenue-weighted read shows that **one price-mismatch on one jacket** is most of the loss, and that the fix lives in the sync layer, not in the feed file.

## Common Failure Modes

- Editing the feed by hand to clear a mismatch when the store is the source of truth — the next sync reverts it and the disapproval comes back.
- Chasing the raw issue count to zero (fixing warnings on dead SKUs) while a disapproved bestseller stays suppressed.
- Re-judging a fix the same day and concluding it "didn't work" before the 1–3 crawl cycles have run.
- Writing off a disapproved SKU as permanently dead when it's a one-attribute fix away from recovering.
- Reading a price/availability mismatch as a feed error without opening the live product page to see which side is stale.
- Treating "pending"/"under review" as a disapproval and panicking on a brand-new SKU that just needs to finish processing.

## Run This Play With Live Data

**Manual version:** export Merchant Center item status and the item-level issue list, then open each affected product page by hand to compare feed price/availability against the live store, then join every SKU to trailing revenue in a spreadsheet — every week, for a feed that's changed by the time you finish.

**ShopMCP version:** connect Merchant Center and your store once. Ask the question; ShopMCP pulls live item status and `itemLevelIssues`, reconciles feed price/availability against the live store, joins each issue to trailing SKU revenue and Shopping/PMax membership, runs the account-before-item and error-before-warning ordering, and returns the ranked FIX/REFRESH/WATCH/KEEP/KILL table with the true source-of-truth root cause per row. It stays **read-only** until you explicitly approve a feed write, a listing removal, or a manual-review trigger.

> No Merchant Center *and* storefront connection inside your AI assistant? That's the wall every manual run hits — the mismatch test simply can't run without both sides live. ShopMCP *is* that connection, and the same playbook then runs in one prompt instead of an afternoon of tab-switching.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the GMC Feed Audit play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manual Merchant Center exports and stale issue lists.
- Opening every product page by hand to run the feed-vs-store mismatch test.
- Joining cryptic issue codes to SKU revenue and Shopping/PMax membership across separate tools.
- Rebuilding the same account-before-item, revenue-weighted triage every week.
