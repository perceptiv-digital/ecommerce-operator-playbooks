---
name: ecom-ad-message-match
description: "When an ecommerce operator needs to decide: Where does ad promise fail to match landing-page reality? Runs the Ad-to-Landing-Page Message Match Audit play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Ad-to-Landing-Page Message Match', 'Meta Ads', 'Google Ads', 'Tiktok Ads', 'Commerce', 'Google Analytics 4', 'Onsite Cro'."
license: CC-BY-4.0
metadata:
  persona: Head of Ecommerce
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Ad-to-Landing-Page Message Match Audit

**Operating question:** Where does ad promise fail to match landing-page reality?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Top-spend ads (Meta / Google / TikTok)** — for the top ~10–15 ads by spend over the last 14–30 days: the **live creative** (hook, headline, primary text, offer, any price or claim shown), the **featured product**, and the **final destination URL**.
- **The live landing pages** — for each destination URL, what the page shows **right now**: headline, hero product, **live price**, **live offer/promo state**, and whether the URL lands on a PDP, collection, or homepage.
- **GA4 by ad/campaign** — **bounce rate, sessions, CVR, and AOV** for each ad's traffic, segmented by UTM/campaign and ideally split by device.
- **Commerce (Shopify/Woo/BigCommerce/etc.)** — current price and availability for each featured product, to confirm the page (not the ad) is telling the truth.
- **Benchmark** — your blended **message-matched CVR** (the CVR of ads whose page does match), so each leak can be sized against a real baseline rather than a guess.

Optional, if available:

- **Promo calendar** — start/end dates for every active offer, so you can tell an "expired-on-page" leak from a genuine creative problem.
- **Stockouts / availability log** — a featured product going out of stock produces the same bounce signature as a message mismatch; you need to rule it out.
- **Creative + page deploy dates** — to tell a brand-new ad still in learning from a mature ad with a real leak.
- **Audience/intent of each ad** — cold prospecting vs. warm retargeting, since a high bounce on cold top-of-funnel traffic is expected, not a defect.

## How to decide — in order

1. **Rank by spend, then cut the noise.** Sort ads by spend. Drop any ad with **under ~300 clicks** or under ~7 days live — too little traffic to read a bounce/CVR difference. These go to WATCH, never KILL.
2. **Resolve the real destination.** Follow each ad's final URL through redirects and UTMs to the page that actually loads. A surprising share of "mismatches" are just an ad pointing at an old URL that now 301s to the wrong place.
3. **Score the four match dimensions** for each surviving ad against its live page:
   - **Offer** — does the discount/promo in the ad exist on the page at the same value, right now?
   - **Price** — does any price shown in the creative match the live PDP price?
   - **Product** — does the page lead with the same hero product the ad features, or dump the visitor on a generic collection/homepage?
   - **Tone/intent** — does the page's headline and audience assumption match the ad's hook and the audience it targets?
4. **Correlate, don't assume.** For each mismatch, compare that ad's **bounce rate and CVR** against your **message-matched benchmark**. A mismatch with no behavioural gap is cosmetic; a mismatch with a real CVR gap is a leak worth sizing.
5. **Size the leak in orders/revenue.** `(benchmark CVR − this ad's CVR) × this ad's sessions × AOV` = revenue the mismatch is plausibly costing. Rank leaks by this number, not by how wrong they look.
6. **Apply the vetoes** (stockout, promo timing, cold-intent, small sample), then assign status + owner + recheck date.

## The prompt to run

```text
You are my ecommerce conversion analyst running the "Ad-to-Landing-Page Message Match Audit".

GOAL: find where my top-spend ads promise something the landing page doesn't deliver, and
size each mismatch by the orders it is plausibly costing — ranked by revenue at risk, not by
how wrong the copy looks.

I will paste, per ad: the live creative (hook, offer, price, claim, featured product), the
final landing-page URL and what that page shows RIGHT NOW (page type, live price, live offer,
hero product, headline), and GA4 for that ad's traffic (sessions, bounce rate, CVR, AOV). I
will also give my message-matched CVR benchmark. Some fields may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the top-spend ads'
creative/offer AND their actual landing-page destination URLs plus that traffic's bounce/CVR
is missing, STOP and return only (a) what's missing and (b) how to get it — never estimate it
or proceed. Without the destination the page shows and how that traffic behaves, you cannot
score a mismatch, so do not guess it.

RULES:
- Score each ad on four dimensions vs its live page: OFFER, PRICE, PRODUCT, TONE/INTENT.
- A mismatch only counts as a leak if the ad's bounce/CVR is materially worse than my
  message-matched benchmark. Cosmetic mismatch with no behavioural gap = note it, don't act.
- Size each leak: (benchmark CVR - this ad's CVR) x sessions x AOV. Rank by that number.
- Correlation is not proof: never recommend rebuilding a page without proposing a test first.
- Drop ads under ~300 clicks or under 7 days live to WATCH (too small to read).
- A stockout, an expired promo on the page, or cold top-of-funnel intent can mimic a
  message-match leak — flag these as alternative explanations before blaming the page.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read.
2. A ranked table using exactly this header row:
| Ad | Spend (14d) | Destination (page type) | Mismatch | Bounce vs benchmark | CVR vs benchmark | Revenue at risk | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. The single highest-confidence test to run first, with its hypothesis and success metric.
4. Vetoes/caveats that downgraded any row, and what evidence would upgrade a WATCH/FIX.
```

## Decision rules

- **KILL** — a mature, high-traffic ad (≥300 clicks, ≥7 days) pointing at a page that contradicts its core promise (e.g. dead offer, wrong price, homepage dump) **and** carrying a CVR materially below benchmark, where fixing the destination is not faster than retiring the ad.
- **FIX** — the destination itself is broken or contradictory: expired promo still advertised, price mismatch, 301 to the wrong page, or a featured product that's out of stock. The fix is on the page/URL, not the creative.
- **REFRESH** — the page is roughly on-message but the hook/tone/hero has drifted from the ad; the audience and offer are still viable, so re-point the URL or align the page headline before judging the creative.
- **WATCH** — directional only: sample under ~300 clicks, under 7 days live, or the window is polluted by a stockout or promo edge.
- **KEEP** — all four dimensions match and CVR sits inside the benchmark band.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- Do **not** treat a CVR gap as proof of a message-match problem — correlation is not causation; require a test before any page rebuild.
- Do **not** act on an ad below the ~300-click / 7-day floor; small-sample bounce and CVR are noise.
- Do **not** blame the page when a **stockout or seasonal demand swing** can produce the same bounce/CVR signature — rule those out first.
- Do **not** flag high bounce as a defect on **cold top-of-funnel intent** ads; a research-mode scroller behaves differently from warm retargeting.
- Do **not** recommend re-pointing a URL, editing a page, or pausing an ad without an explicit human approval step.

## Output

A ranked message-match leak list with a behavioural gap and a sized revenue impact per row, plus the first test to run.

| Ad | Spend (14d) | Destination (page type) | Mismatch | Bounce vs benchmark | CVR vs benchmark | Revenue at risk | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|---|---|
| Hero Serum – Broad | $3,400 | Homepage (not PDP) | Product: lands on home, ad features one SKU | +29 pts | 1.1% vs 3.0% | ~$6.2k/mo | FIX | Web + Perf | 7 days |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/ecom-ad-message-match) — it executes this play read-only by default and applies changes only on your approval.
