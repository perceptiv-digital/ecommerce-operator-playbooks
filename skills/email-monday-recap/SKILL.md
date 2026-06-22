---
name: email-monday-recap
description: "When an ecommerce operator needs to decide: What changed in email and retention last week? Runs the Email Monday Recap play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Email Monday Recap', 'Klaviyo', 'Commerce', 'Retention Ltv'."
license: CC-BY-4.0
metadata:
  persona: Retention / Email Lead
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Email Monday Recap

**Operating question:** What changed in email and retention last week?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Klaviyo campaigns** — for last week and the prior week: recipients, **clicks / click rate**, **placed-order rate**, **revenue**, and **revenue per recipient** per send. Opens are recorded but treated as untrusted.
- **Klaviyo flows** — revenue and placed-order rate **per flow** (Welcome, Browse Abandon, Abandoned Cart/Checkout, Post-Purchase, Winback, SMS flows), last week vs prior week, kept **separate** from campaign totals.
- **List health** — new subscribers, unsubscribes, spam complaints, suppressions → **net subscriber change** and **net growth %**.
- **Deliverability** — spam-complaint rate, hard + soft bounce rate, and the engaged-segment definition you're actually mailing.
- **Commerce (Shopify/Woo/BigCommerce/etc.)** — **total store revenue** for the same week, so you can compute email + SMS as a **share of total**, plus actual placed orders to sanity-check Klaviyo's attributed number.

Optional, if available:

- **Promo / campaign calendar** — a sitewide sale or a double-send day inflates a week's email share and borrows from next week.
- **Send volume** — last week's number of campaigns and total emails sent; revenue can rise purely because you sent more, which is not a quality win.
- **Segment definitions for the worst send** — was the loser mailed to a stale "all subscribers" audience instead of an engaged 30/60/90-day segment?
- **SMS split** — if SMS revenue is bundled into "email + SMS," pull the SMS line separately; the two channels have different unsubscribe economics.
- **Prior 4-week baseline** — one week is noisy; a 4-week trailing average tells you whether a move is signal or just Tuesday.

## How to decide — in order

1. **Reconcile the headline first.** Compare Klaviyo-attributed revenue to the store's actual placed orders for the week. If the attribution window was changed or the gap is implausibly large, mark the recap **FIX** and stop — don't narrate a tracking artifact as a retention story.
2. **Split campaign from flow.** Pull the two apart. Flow revenue is a baseline that runs whether or not you sent; campaign revenue is this week's discretionary work. A week can look "up" on flows alone (more traffic = more abandoned-cart triggers) while your campaigns quietly underperformed. **Never credit a flow's baseline to a campaign.**
3. **Compute share of total, then context it.** Email + SMS as a % of total store revenue is the north-star line. But a *rise* can be bad (total revenue fell, email held) and a *fall* can be fine (a paid push grew the denominator). Read the share **and** the absolute, never the share alone.
4. **Rank sends by placed-order rate and revenue per recipient — not opens, not raw revenue.** The biggest-revenue campaign is often just the biggest list blast. Revenue per recipient and placed-order rate find the send that actually *earned* its audience. Identify the top send and the bottom send.
5. **Diagnose the bottom send.** Walk click rate → placed-order rate → revenue per recipient. Low click rate = **creative/subject/offer** problem. Healthy clicks but low placed-order rate = **audience or landing/offer mismatch** (often a stale segment). This is where most weekly damage hides.
6. **Check the list and deliverability floor.** Net growth negative, or spam-complaint rate over ~0.10%, or bounces climbing → that becomes an action regardless of revenue, because it caps every future send.
7. **Apply the vetoes, then write the narrative + exactly three actions** with owner and recheck date.

## The prompt to run

```text
You are my retention/email analyst writing the weekly "Email Monday Recap" narrative.

GOAL: tell me what changed in email + retention last week and give me EXACTLY three
actions. This is a recap across campaigns AND flows, not a single-flow audit.

I will paste: Klaviyo campaign performance (last week + prior week), Klaviyo flow
performance per flow, list growth (new subs, unsubs, complaints, suppressions),
deliverability (spam-complaint rate, bounce rate), and total store revenue for the week.
Some data may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the campaign-vs-flow
revenue split with placed-order rate per send (NOT opens — Apple MPP makes opens unreliable),
or deliverability (spam-complaint rate, bounce rate) is missing, STOP and return only (a)
what's missing and (b) how to get it — never estimate it or proceed.

RULES:
- Use clicks, placed-order rate, and revenue per recipient. IGNORE open rate entirely —
  Apple Mail Privacy Protection makes opens unreliable. Do not rank or diagnose on opens.
- Separate CAMPAIGN revenue from FLOW revenue. Never credit a flow's steady baseline to
  this week's campaigns. Report them on two separate lines.
- Report email + SMS as a % of total store revenue, AND the absolute revenue. A share move
  can be caused by the denominator (total revenue) moving, so always show both.
- Rank sends by placed-order rate and revenue per recipient, not by raw revenue.
- One week is noisy: flag anything that could be promo timing, a double-send, or a
  single-week blip rather than a trend.
- Reconcile Klaviyo attributed revenue against actual placed orders. If attribution looks
  broken, mark the recap FIX and stop.
- Every claim must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read (what changed and why it matters).
2. A metrics table using EXACTLY this header row:
   | Metric | Last week | Prior week | WoW | Source | Confidence |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not
   replace the table with prose.
3. EXACTLY three prioritized actions: Action | Status | Why | Owner | Recheck.
4. Vetoes/caveats that downgraded any read.
5. What evidence is blocked and what you'd need to upgrade it.
```

## Decision rules

- **FIX** — Klaviyo↔store revenue reconciliation fails, attribution window was changed mid-week, or conversion tracking gapped. You cannot narrate retention on top of broken tracking.
- **KILL** — retire or stop a recurring send/segment only when it has lost money or eroded the list over a meaningful sample (e.g. a recurring campaign mailing a stale segment that drives complaints and near-zero placed-order rate across 3+ sends).
- **REFRESH** — a send or flow is decaying (placed-order rate or revenue per recipient sliding) but the audience and offer are still viable: rework subject/creative/segment, don't scrap it.
- **WATCH** — the move is one week old, inside normal variance, or polluted by a promo/double-send; monitor across a clean window before acting.
- **KEEP** — share of revenue, placed-order rate, and net list growth are inside their target bands with no deliverability flag.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- Do **not** rank, diagnose, or write an action off **open rate** — Apple MPP auto-opens make it unreliable post-2021.
- Do **not** treat a **single week** as a trend; one good or bad send is noise until a clean second week confirms it.
- Do **not** credit a **flow's baseline** revenue to this week's campaign work (or vice versa) — separate the two lines or the read is false.
- Do **not** call an email-share rise a "win" without checking the **denominator**: total store revenue may simply have dropped.
- Do **not** read **Klaviyo attributed revenue** as commerce truth when the attribution window overlaps paid/other channels — it inflates email's credit.
- Do **not** discount **promo-timed** weeks against normal weeks; a sale or double-send borrows demand and skews the share.
- Do **not** push send volume to "grow revenue" while spam-complaint rate is over ~0.10% — you'll burn the list and the sending reputation.
- Do **not** trigger any send, segment change, flow edit, or suppression without explicit human approval.

## Output

A weekly recap: a three-sentence narrative, a metrics table, and exactly three actions with owner and recheck date.

Metrics table (minimum columns):

| Metric | Last week | Prior week | WoW | Source | Confidence |
|---|---|---|---|---|---|
| Email + SMS % of total revenue | 24% | 28% | −4 pts | Klaviyo + Shopify | High |
| Campaign revenue | $— | $— | — | Klaviyo | High |
| Flow revenue | $— | $— | — | Klaviyo | High |
| Net list growth | +— | +— | — | Klaviyo | High |
| Spam-complaint rate | —% | —% | — | Klaviyo | High |

---

Run this on your **live** store data in one prompt: connect Shopify, ads, analytics, email/SMS, and finance with [ShopMCP](https://my.shop-mcp.app/playbooks/email-monday-recap) — it executes this play read-only by default and applies changes only on your approval.
