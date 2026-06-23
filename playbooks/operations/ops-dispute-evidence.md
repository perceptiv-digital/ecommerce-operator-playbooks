---
slug: "ops-dispute-evidence"
title: "Stripe Dispute Evidence Pack"
operating_question: "What evidence is needed to respond to this dispute safely?"
primary_persona: "operations"
personas: ["operations"]
category: "ops-risk"
platforms: ["stripe", "commerce"]
cadence: "triggered"
public_tier: "launch"
contributed_by: "Perceptiv"
---

# Stripe Dispute Evidence Pack

## Operating Question

**A chargeback just landed. What evidence do I assemble — keyed to the dispute reason code — to give this case a real chance of winning, or do I accept it and stop wasting money fighting?**

A Stripe dispute is not a customer-service ticket; it is a structured argument adjudicated by the cardholder's issuing bank against a fixed rubric. The bank only weighs evidence that maps to the **reason code** it filed under. A flawless tracking number is worthless on a `fraudulent` dispute, and a perfect AVS match is worthless on a `product_not_received` dispute. This play forces a **FIGHT (assemble the matching pack) vs. ACCEPT (concede and preserve the fee)** decision per dispute, sized on expected value — recovery probability times the amount at stake, minus the time and the non-refundable dispute fee — never on how angry the chargeback makes you.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant cannot see your Stripe dispute object, your carrier's delivery scan, or the order's AVS/CVV result. To build a winning pack manually you have to:

1. Open the dispute in the Stripe Dashboard and read the **reason code** and the **`evidence_details.due_by` deadline** — the two fields that dictate everything downstream.
2. Pull the original charge to recover the **AVS result (`line1_check`, `zip_check`)**, the **CVC check**, the customer IP, and the card fingerprint.
3. Cross to your store/OMS for the order: shipping address, the address the customer typed, the fulfillment record, and the support thread.
4. Cross to your carrier (USPS/UPS/FedEx/DHL) for the **tracking number, the delivery-confirmation scan, and signature/POD** if one exists.
5. Match all of it together — billing vs. shipping, IP geo vs. delivery city, order date vs. ship date — and only submit the fields that map to this reason code.

**The reasoning in this playbook is free. Stitching Stripe + carrier + store + support into one timed pack before the deadline is the hard part — and that is exactly what ShopMCP connects.** If your assistant has no live line into Stripe and your store, that wall is where manual runs stall. Hold that thought; the last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Ops / Dispatch Lead — owns fulfillment records, tracking, and the carrier relationship.
- **Also useful for:** Finance / Payments (fee exposure, win-rate trend), Customer Support (owns the comms thread that wins `product_unacceptable` cases), Founder on a thin team.
- Run it the moment a `charge.dispute.created` webhook or Stripe email arrives — **not** the day before the deadline.

## When To Run It

- **Cadence:** triggered — one run per dispute, the day it opens.
- **Triggers:** a new Stripe dispute or inquiry; an early-fraud-warning (EFW/RDR) you can pre-empt with a refund before it becomes a chargeback; a spike in disputes from one product or SKU that warrants a batch review.
- **Hard pre-requisite:** note the **`due_by` deadline** before anything else. Stripe's submission window is typically ~7–21 days depending on the card network and dispute type; **a late or missing submission is an automatic, unappealable loss.** Build the calendar reminder first, assemble second.

## Required Evidence

- **Stripe dispute object** — the **reason code** (`fraudulent`, `product_not_received`, `product_unacceptable`, `duplicate`, `subscription_canceled`, `credit_not_processed`, `unrecognized`), the **amount**, the **`evidence_details.due_by`** timestamp, and whether it is an inquiry (no fee yet) or a full chargeback.
- **Original charge** — AVS result (`address_line1_check`, `address_zip_check`), `cvc_check`, customer IP, card brand/funding, card fingerprint, and the charge timestamp.
- **The order (store/OMS)** — order ID, the shipping address the customer entered, the billing address, line items, order total, and the customer's prior order count on that email/card.
- **Reason-code-specific core** (this is the whole game):
  - `product_not_received` → **carrier tracking number + a delivery-confirmation scan + the shipping address matching the order**; signature/POD if the carrier captured one.
  - `fraudulent` → **AVS + CVC match**, customer IP and device, the billing/shipping address match, prior successful order history on the same customer, and any customer communication acknowledging the purchase.
  - `product_unacceptable` / `not_as_described` → **product photos as shipped, the exact listing description/spec, the refund-and-returns policy as it appeared at checkout**, and the full support thread.

## Optional Evidence

- **Signed delivery / photo-on-doorstep** from the carrier — converts a "shipped" claim into a "received" proof; the single highest-leverage upgrade on `product_not_received`.
- **Customer comms** — emails, chat, SMS, or a review where the buyer confirms receipt or use of the item.
- **Refund/cancellation timeline** — proof you already refunded (kills a `duplicate` or `credit_not_processed` case instantly) or that no cancellation was requested in the window.
- **Repeat-customer / loyalty signal** — a long order history with matching AVS is strong context on `fraudulent`.
- **3-D Secure / SCA authentication** — if the charge carried a liability shift, the bank often must eat a `fraudulent` claim; surface it immediately.

## How To Pull This Evidence

- **Stripe dispute reason code + deadline** — Stripe Dashboard → **Payments → Disputes** → open the dispute. The reason code sits at the top of the dispute; the submission deadline is the `evidence_details.due_by` timestamp. Copy both before touching anything else — they decide which evidence counts and how long you have.
- **Shopify order / fulfilment / tracking** — Shopify admin → **Orders** → the matching order. Read the shipping address and billing address the customer entered, the fulfilment status, and the carrier tracking number; click through to the carrier (USPS/UPS/FedEx/DHL) for the delivery-confirmation scan and signature/POD.
- **Customer comms** — pull the email, chat, or SMS thread from your support inbox (Gmail, Zendesk, Gorgias, etc.) where the buyer confirms receipt, use, or the purchase itself — the field that wins `product_unacceptable` and friendly-fraud cases.
- **AVS / CVV** — open the original charge in Stripe (**Payments → the charge**) and read `address_line1_check`, `address_zip_check`, and `cvc_check`, plus the customer IP and card fingerprint — the core of any `fraudulent` defence.
- **Never-fabricate gotcha:** copy these values exactly as the systems report them. Never alter, backdate, or "clean up" a scan time, an address, or an AVS result — fraudulent representment can cost you the whole Stripe account, not just the case. If a field is genuinely missing, mark it missing; do not estimate it.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Clock first.** Read `due_by`. If under 48 hours, drop everything and assemble now — a strong pack submitted late loses 100% of the time. Set the calendar reminder before you read another field.
2. **Read the reason code and lock the rubric.** The code names the *only* evidence the bank will weigh. Write down the 3–4 required fields for that code and ignore everything else — a generic pack that pads a `fraudulent` case with tracking numbers signals weakness and loses.
3. **Screen for friendly fraud.** If the order shipped to a verified address with AVS/CVC match and prior history but the buyer claims `fraudulent`, this is almost certainly **friendly fraud (first-party misuse)** — fight it with the match evidence, not with a fraud-prevention narrative. Different playbook from true stolen-card fraud.
4. **Assemble the matching pack and grade strength.** Pull each required field. Grade the case **STRONG** (every core field present and consistent), **THIN** (core present but a gap — e.g., tracking but no delivery scan), or **WEAK** (a core field is missing or contradicts, e.g., no AVS match on a fraud claim).
5. **Run the expected-value gate.** Estimate recovery probability from the grade (STRONG ≈ 60–75%, THIN ≈ 25–40%, WEAK ≈ <15% — networks publish nothing official; calibrate against your own win history). Compute `EV = P(win) × amount − fee − staff_time`. The **dispute fee (~$15) is non-refundable whether you win or lose**, so a low-value WEAK case is negative-EV by construction.
6. **Decide FIGHT vs. ACCEPT, then apply the vetoes**, assign an owner, and set the submission date ahead of `due_by`.

## Manual Workflow

1. Open the dispute in Stripe → record reason code, amount, and `due_by`. Set a reminder 2 days before `due_by`.
2. Pull the original charge → AVS, CVC, IP, fingerprint, charge time.
3. Pull the order from your store/OMS → addresses entered, line items, prior order count, support thread.
4. Pull the carrier record → tracking, delivery scan, signature/POD (for any "not received" claim).
5. Map evidence to the reason-code rubric (step 2 of the Decision Logic). Discard anything off-rubric.
6. Grade STRONG / THIN / WEAK and compute expected value.
7. Paste the prompt below with your dispute facts; pressure-test the FIGHT calls against the veto list; submit the survivors through Stripe before the deadline.

## Copy-Paste Prompt

```text
You are my payments-disputes analyst running the "Stripe Dispute Evidence Pack" play.

GOAL: for each Stripe dispute, assemble ONLY the evidence that maps to its reason code,
grade the case, and decide FIGHT vs. ACCEPT on expected value — never on emotion.

I will paste, per dispute: the Stripe reason code, amount, due_by deadline, the AVS/CVC
result, customer IP, the shipping/billing addresses entered, prior order count, carrier
tracking + delivery scan + signature if any, product photos/listing, the returns policy
shown at checkout, and the support thread. Some fields may be missing.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the dispute reason
code, the order/fulfilment record, or the submission deadline (due_by) is missing, STOP and
return only (a) what's missing and (b) how to get it — never estimate it or proceed. The
reason code dictates which evidence wins and a missed deadline is an automatic loss, so
none of these three can be inferred.

RULES:
- Deadline gate first: surface due_by for every dispute. A late submission is an automatic
  loss — flag anything under 48 hours as URGENT.
- Reason code dictates evidence. Map to the rubric and DISCARD off-rubric items:
  - product_not_received -> tracking + delivery confirmation + address match (+ signature/POD)
  - fraudulent -> AVS + CVC match + IP/device + billing/shipping match + prior order history
  - product_unacceptable/not_as_described -> product photos + listing + returns policy at
    checkout + support thread
- Detect friendly fraud: a "fraudulent" claim with AVS/CVC match, matching address, and prior
  history is first-party misuse — fight with the match evidence, do not pad it.
- Grade each case STRONG / THIN / WEAK on completeness and consistency of the CORE fields.
- Expected value: EV = P(win) x amount - dispute_fee(~$15, non-refundable) - staff_time.
  Recommend ACCEPT when EV is negative; do not fight a low-value WEAK case.
- Every row must carry: a number, source, time window, and confidence level.
- Never fabricate, alter, or backdate evidence. Separate exact / estimated / unavailable.

RETURN:
1. A 2-3 sentence executive read.
2. A per-dispute table using exactly this header row:
   | Dispute | Reason code | Amount | Due in | Core evidence present | Grade | Win prob | EV | Decision | Owner |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. The exact evidence list to attach for each FIGHT, in Stripe's field order.
4. Vetoes/caveats and what missing field would change the call.
```

## Decision Rules

- **FIGHT — STRONG** — every core field for the reason code is present and internally consistent (e.g., `product_not_received` with tracking + a carrier delivery scan + matching ship address), win probability ~60–75%, and `amount × P(win)` clears the fee and staff time. Assemble and submit.
- **FIGHT — THIN** — core present with one gap (tracking but no delivery scan; AVS match but no prior history). Submit only on higher-value disputes where positive EV survives a ~25–40% win probability.
- **ACCEPT** — a core field is missing or contradicts the claim (no AVS match on `fraudulent`; no tracking on `product_not_received`), OR the math is negative-EV (low amount, WEAK grade, ~$15 non-refundable fee makes fighting cost more than it recovers). Concede and move on.
- **PRE-EMPT** — an early-fraud-warning or inquiry where a fast refund avoids a recorded chargeback and protects your dispute ratio with the card networks. Refund before it escalates.
- **ESCALATE** — friendly fraud or 3-D Secure liability shift that needs a different response track than a standard pack.
- Every recommendation must include a **number, source, time window, and confidence level** — e.g., "delivery scan 2026-06-09 14:02, USPS tracking, charge was 2026-06-04, high confidence."

## Veto Rules

- Do **not** fight a dispute whose recovery (amount × win probability) is less than the time cost plus the ~$15 non-refundable dispute fee — a $22 WEAK case is a guaranteed net loss whether you win or lose.
- Do **not** submit a generic, all-evidence pack — the reason code dictates the evidence, and off-rubric padding signals a weak case and loses.
- Do **not** fabricate, alter, backdate, or "clean up" any evidence — fraudulent representment is a card-network violation that can cost you the account, not just the case.
- Do **not** miss the `due_by` deadline — a late or unsubmitted response is an automatic, unappealable loss, regardless of how strong the pack is.
- Do **not** treat friendly fraud (first-party misuse with matching AVS/history) as stolen-card fraud — the evidence and framing differ.
- Do **not** auto-refund a high-value dispute you can win just to make it disappear, and do **not** auto-submit, refund, or message a customer without explicit human approval.

## Output Contract

A per-dispute decision queue ranked by deadline urgency, each row carrying the reason code, the matching evidence, a grade, the expected-value math, and an owner.

| Dispute | Reason code | Amount | Due in | Core evidence present | Grade | Win prob | EV | Decision | Owner |
|---|---|---|---|---|---|---|---|---|---|
| dp_1A | product_not_received | $180 | 9 days | Tracking + delivery scan + addr match | STRONG | 70% | +$111 | **FIGHT** | Dispatch |

## Worked Example

> **Executive read:** Two open disputes, $202 at stake. The $180 `product_not_received` case is a clean FIGHT — USPS delivery scan, matching address, and the order-confirmation email form a STRONG pack worth roughly +$111 in expected value. The $22 `fraudulent` case has no AVS match and no prior history; at a ~12% win probability the math is negative once the non-refundable fee lands, so we ACCEPT it and refund nothing further. Both deadlines are calendared two days early.

| Dispute | Reason code | Amount | Due in | Core evidence present | Grade | Win prob | EV | Decision | Owner |
|---|---|---|---|---|---|---|---|---|---|
| dp_88Kq | product_not_received | $180 | 9 days | USPS tracking + delivery scan 06-09 + ship addr matches order + confirmation email | STRONG | 70% | $180×0.70 − $15 − $9 = **+$102** | **FIGHT** | Dispatch |
| dp_44Lm | fraudulent | $22 | 6 days | No AVS match, IP geo ≠ billing state, first order on this card, no comms | WEAK | 12% | $22×0.12 − $15 = **−$12.4** | **ACCEPT** | Finance |
| dp_71Rs | product_unacceptable | $96 | 11 days | Product photos + listing spec, but returns policy at checkout not captured | THIN | 35% | $96×0.35 − $15 − $9 = **+$9.6** | **FIGHT** | Support |

Note how the decision *ignores* outrage: the $22 "fraud" feels the most unjust, yet fighting it is a guaranteed loss because the fee alone exceeds the expected recovery — while the unglamorous "package didn't arrive" case is the one worth the work.

## Common Failure Modes

- Submitting the same generic evidence bundle on every dispute regardless of reason code — the fastest way to lose winnable cases.
- Discovering the deadline with hours left and submitting an incomplete pack, or missing it entirely (automatic loss).
- Fighting low-value disputes on principle while the ~$15 fee and your own time quietly turn every "win" into a net loss.
- Treating friendly fraud (buyer-claims-fraud with a perfect AVS/history match) as a fraud-prevention failure instead of a representment case.
- Padding a `fraudulent` defense with tracking numbers, or a `product_not_received` defense with AVS results — off-rubric evidence the bank discards.
- Conceding a STRONG, high-value case because the chargeback notice "looked official" and felt final.

## Run This Play With Live Data

**Manual version:** open the dispute in Stripe, copy the reason code and deadline, pull the charge for AVS/CVC, cross to your store for the order and addresses, cross to the carrier for tracking and the delivery scan, match it all by hand, and submit only the on-rubric fields — per dispute, against the clock.

**ShopMCP version:** connect Stripe and your store once. Point ShopMCP at the dispute; it reads the reason code and `due_by`, pulls the charge's AVS/CVC and the matching order and fulfillment record, maps evidence to the reason-code rubric, grades the case, computes the expected-value FIGHT/ACCEPT call, and hands back the exact attachment list in Stripe's field order. It stays **read-only** — it never submits a response, refunds, or messages a customer until you explicitly approve.

> No live Stripe and store connection inside your AI assistant? That's the wall every manual dispute run hits — the evidence lives in four systems and the deadline is ticking. ShopMCP *is* that connection, so the same playbook runs in one prompt instead of a four-tab scramble.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Stripe Dispute Evidence Pack play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manually opening each dispute and transcribing the reason code, amount, and deadline.
- Cross-referencing Stripe charges, store orders, support threads, and carrier scans by hand.
- Guessing the win probability and whether a low-value dispute is even worth fighting.
- Rebuilding the reason-code-to-evidence mapping from scratch on every single chargeback.

---

*Contributed by [Perceptiv](https://perceptiv.digital).*
