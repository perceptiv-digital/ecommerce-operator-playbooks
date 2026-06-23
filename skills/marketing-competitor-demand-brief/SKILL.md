---
name: marketing-competitor-demand-brief
description: "When an ecommerce operator needs to decide: Which competitor demand signals deserve a response? Runs the Competitor Demand Brief play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Competitor Demand Brief', 'Dataforseo', 'Google Search Console', 'Seo Demand Capture'."
license: CC-BY-4.0
metadata:
  persona: Head of Marketing
  contributed_by: Perceptiv
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Competitor Demand Brief

**Operating question:** Which competitor demand signals deserve a response?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **DataForSEO — competitor movement.** For each named competitor: newly ranked keywords (last 30 days), keywords where they gained ≥3 positions, the keyword gap vs. your domain (terms they rank top-10 for and you don't), and **SERP features won** (featured snippet, PAA, shopping pack, image/video). Capture **monthly search volume** and a **keyword-intent label** (transactional / commercial / informational / navigational) per term.
- **Google Search Console — your footing.** Query and page report for the trailing 28 days plus the prior 28: clicks, impressions, average position, and CTR. This is the only source that tells you where you *already* rank and could move cheaply.
- **Your competitor set** — 3–6 real domains you actually compete with for revenue, not aspirational ones.

Optional, if available:

- **Commercial value per term** — your AOV and conversion rate for the category a query maps to, so volume can be expressed as recoverable revenue, not raw searches.
- **Domain authority / link gap** — your DR vs. the competitor's, and referring-domain counts on the ranking page, to sanity-check feasibility.
- **Existing coverage** — whether you already have a thin PLP, blog post, or collection that could be upgraded instead of built from zero.
- **Promo / seasonality calendar** — a competitor spike that's really a seasonal or campaign artifact, not durable demand.
- **AI Overview / answer-engine presence** — whether the query now resolves inside an AI answer, which changes the click economics.

## How to decide — in order

1. **Scope the field.** Pull competitor movement for your 3–6 real competitors over the trailing 30 days. Drop anything that isn't a *new* rank, a *gained* position (≥3), or a *won* SERP feature — you're triaging change, not the whole keyword universe.
2. **Label intent first, before volume.** Tag each surviving term transactional / commercial / informational / navigational. **Intent gates everything downstream** — a 9,000-search informational term can be worth less than a 700-search transactional one. Park pure-informational gains unless they feed a cluster you're already building.
3. **Apply the volume floor.** Require ≥500 monthly searches (use ~250 for high-AOV / niche catalogs) *and* a credible trend — a one-month blip on clickstream-modeled volume is not demand.
4. **Check your own footing in GSC.** For every candidate, look up where you already rank. Already impressions at position 8–20 → cheap win, *upgrade* the existing page. No presence at all and competitor sits top-3 with high DR → expensive, downgrade feasibility.
5. **Score feasibility honestly.** Compare your DR and the SERP's link profile to the incumbent. If the page-1 results are all DR 70+ with hundreds of referring domains and you're DR 35, that's a multi-quarter fight — WATCH, don't commit this month.
6. **Map signal → response type.** Transactional gap with a winnable SERP → PLP / collection + supporting content. Branded-comparison query rising → a comparison / "vs" page. Informational cluster with intent that eventually converts → content only if it ladders to a money page. Then assign status, owner, and a recheck date.

## The prompt to run

```text
You are my competitive-demand analyst running the "Competitor Demand Brief" play.

GOAL: from a list of competitor SERP/keyword movements, decide which signals deserve a
response this month, ranked by recoverable commercial value — NOT by raw search volume,
and NOT by how dramatic the competitor's move looks.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If real monthly search
volume AND a commercial-intent label for each competitor signal — plus my own feasibility/
authority footing (GSC position, DR) — is missing, STOP and return only (a) what's missing and
(b) how to get it — never estimate it or proceed. Don't react to a vanity, low-intent, or
single-blip competitor move; without real volume and intent you cannot tell demand from noise.

I will paste two tables:
(A) Competitor movement from DataForSEO: term, competitor, position change, monthly search
    volume, intent label, SERP features won.
(B) My own footing from Google Search Console: term/page, my avg position, impressions,
    clicks, CTR, trailing 28d vs prior 28d.
Some rows may be missing one side. Do not invent the missing side.

RULES:
- Label intent BEFORE ranking. Transactional/commercial beats informational at equal volume.
  Park pure-informational gains unless they feed a cluster I'm already building.
- Apply a volume floor: ignore terms under ~500 monthly searches (250 for niche/high-AOV)
  or with only a single-month blip and no trend.
- Cross-check my GSC footing. If I already rank position 8-20 on a term, treat it as a cheap
  UPGRADE, not a new build. If I have zero footing and the competitor is top-3 on a high-DR
  SERP, downgrade feasibility to WATCH.
- Map each kept signal to a response type: PLP/collection, comparison/"vs" page, content
  cluster, or technical/SERP-feature play.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not claim demand is "real"
  off a single tool's modeled volume.

RETURN:
1. A 3-sentence executive read: the 2-3 signals worth funding and what to ignore.
2. A ranked table using exactly this header row:
   | Signal | Competitor | Their move | Volume & intent | My GSC footing | Feasibility | Response type | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. The "deliberately ignored" list with one-line reasons (this is the point of the play).
4. What evidence is blocked and what you'd need to upgrade a WATCH to a build decision.
```

## Decision rules

- **KEEP / BUILD** — transactional or commercial intent, ≥500 monthly searches (≥250 niche) with a credible trend, and a winnable SERP (your DR within reach of page 1, or existing GSC footing at position 8–20). Ship a PLP, collection, or comparison page.
- **REFRESH / UPGRADE** — you already rank position 8–20 in GSC and a competitor just gained on the same term; strengthen the existing page rather than building new.
- **WATCH** — directional only: real intent but you have no footing and the SERP is dominated by high-DR incumbents, or the volume is a single-month blip, or the term sits inside an AI Overview that suppresses clicks.
- **KILL / IGNORE** — informational or navigational intent with no path to a money page, volume below the floor, or a competitor move that's a seasonal/promo artifact. Record it as deliberately ignored.
- **FIX** — location/language mismatch, GSC property gap, or volume sources that disagree by more than ~2× make a safe call impossible until the data is reconciled.
- Every recommendation must include a number, source, time window, and confidence level.

## Vetoes — stop if any apply

- Not every competitor move warrants a response — a gained position or a new page is *not*, by itself, evidence of recoverable demand. Require the intent and volume gates.
- Do **not** commit to a build before checking feasibility — verify your domain authority and the SERP's link profile against the incumbent first.
- Do **not** treat a single tool's clickstream-modeled volume as truth; demand must be real volume with a trend, not a one-month vanity spike.
- Do **not** rank an informational gain above a transactional one just because the search volume is larger — transactional/commercial intent beats informational.
- Do **not** green-light a target where you have no footing without confirming it in your own GSC — verify where you already have a position before claiming a cheap win.
- Do **not** queue content, change product data, or shift budget without an explicit human approval step.

## Output

A triaged competitor-demand brief: a ranked list of signals worth a response, each with evidence, feasibility, a response type, and a status — plus an explicit "ignored" list.

| Signal | Competitor | Their move | Volume & intent | My GSC footing | Feasibility | Response type | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| "[category] for [use-case]" | competitor-b.com | New, pos. 4 | 2,400/mo · transactional | none | Medium | PLP + buyer guide | **BUILD** | SEO + Merch | 30 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
