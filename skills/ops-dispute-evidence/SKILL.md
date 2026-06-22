---
name: ops-dispute-evidence
description: "When an ecommerce operator needs to decide: What evidence is needed to respond to this dispute safely? Runs the Stripe Dispute Evidence Pack play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Stripe Dispute Evidence Pack', 'Stripe', 'Commerce', 'Ops Risk'."
license: CC-BY-4.0
metadata:
  persona: Ops / Dispatch Lead
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Stripe Dispute Evidence Pack

**Operating question:** What evidence is needed to respond to this dispute safely?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Stripe dispute object** — the **reason code** (`fraudulent`, `product_not_received`, `product_unacceptable`, `duplicate`, `subscription_canceled`, `credit_not_processed`, `unrecognized`), the **amount**, the **`evidence_details.due_by`** timestamp, and whether it is an inquiry (no fee yet) or a full chargeback.
- **Original charge** — AVS result (`address_line1_check`, `address_zip_check`), `cvc_check`, customer IP, card brand/funding, card fingerprint, and the charge timestamp.
- **The order (store/OMS)** — order ID, the shipping address the customer entered, the billing address, line items, order total, and the customer's prior order count on that email/card.
- **Reason-code-specific core** (this is the whole game):
  - `product_not_received` → **carrier tracking number + a delivery-confirmation scan + the shipping address matching the order**; signature/POD if the carrier captured one.
  - `fraudulent` → **AVS + CVC match**, customer IP and device, the billing/shipping address match, prior successful order history on the same customer, and any customer communication acknowledging the purchase.
  - `product_unacceptable` / `not_as_described` → **product photos as shipped, the exact listing description/spec, the refund-and-returns policy as it appeared at checkout**, and the full support thread.

Optional, if available:

- **Signed delivery / photo-on-doorstep** from the carrier — converts a "shipped" claim into a "received" proof; the single highest-leverage upgrade on `product_not_received`.
- **Customer comms** — emails, chat, SMS, or a review where the buyer confirms receipt or use of the item.
- **Refund/cancellation timeline** — proof you already refunded (kills a `duplicate` or `credit_not_processed` case instantly) or that no cancellation was requested in the window.
- **Repeat-customer / loyalty signal** — a long order history with matching AVS is strong context on `fraudulent`.
- **3-D Secure / SCA authentication** — if the charge carried a liability shift, the bank often must eat a `fraudulent` claim; surface it immediately.

## How to decide — in order

1. **Clock first.** Read `due_by`. If under 48 hours, drop everything and assemble now — a strong pack submitted late loses 100% of the time. Set the calendar reminder before you read another field.
2. **Read the reason code and lock the rubric.** The code names the *only* evidence the bank will weigh. Write down the 3–4 required fields for that code and ignore everything else — a generic pack that pads a `fraudulent` case with tracking numbers signals weakness and loses.
3. **Screen for friendly fraud.** If the order shipped to a verified address with AVS/CVC match and prior history but the buyer claims `fraudulent`, this is almost certainly **friendly fraud (first-party misuse)** — fight it with the match evidence, not with a fraud-prevention narrative. Different playbook from true stolen-card fraud.
4. **Assemble the matching pack and grade strength.** Pull each required field. Grade the case **STRONG** (every core field present and consistent), **THIN** (core present but a gap — e.g., tracking but no delivery scan), or **WEAK** (a core field is missing or contradicts, e.g., no AVS match on a fraud claim).
5. **Run the expected-value gate.** Estimate recovery probability from the grade (STRONG ≈ 60–75%, THIN ≈ 25–40%, WEAK ≈ <15% — networks publish nothing official; calibrate against your own win history). Compute `EV = P(win) × amount − fee − staff_time`. The **dispute fee (~$15) is non-refundable whether you win or lose**, so a low-value WEAK case is negative-EV by construction.
6. **Decide FIGHT vs. ACCEPT, then apply the vetoes**, assign an owner, and set the submission date ahead of `due_by`.

## The prompt to run

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

## Decision rules

- **FIGHT — STRONG** — every core field for the reason code is present and internally consistent (e.g., `product_not_received` with tracking + a carrier delivery scan + matching ship address), win probability ~60–75%, and `amount × P(win)` clears the fee and staff time. Assemble and submit.
- **FIGHT — THIN** — core present with one gap (tracking but no delivery scan; AVS match but no prior history). Submit only on higher-value disputes where positive EV survives a ~25–40% win probability.
- **ACCEPT** — a core field is missing or contradicts the claim (no AVS match on `fraudulent`; no tracking on `product_not_received`), OR the math is negative-EV (low amount, WEAK grade, ~$15 non-refundable fee makes fighting cost more than it recovers). Concede and move on.
- **PRE-EMPT** — an early-fraud-warning or inquiry where a fast refund avoids a recorded chargeback and protects your dispute ratio with the card networks. Refund before it escalates.
- **ESCALATE** — friendly fraud or 3-D Secure liability shift that needs a different response track than a standard pack.
- Every recommendation must include a **number, source, time window, and confidence level** — e.g., "delivery scan 2026-06-09 14:02, USPS tracking, charge was 2026-06-04, high confidence."

## Vetoes — stop if any apply

- Do **not** fight a dispute whose recovery (amount × win probability) is less than the time cost plus the ~$15 non-refundable dispute fee — a $22 WEAK case is a guaranteed net loss whether you win or lose.
- Do **not** submit a generic, all-evidence pack — the reason code dictates the evidence, and off-rubric padding signals a weak case and loses.
- Do **not** fabricate, alter, backdate, or "clean up" any evidence — fraudulent representment is a card-network violation that can cost you the account, not just the case.
- Do **not** miss the `due_by` deadline — a late or unsubmitted response is an automatic, unappealable loss, regardless of how strong the pack is.
- Do **not** treat friendly fraud (first-party misuse with matching AVS/history) as stolen-card fraud — the evidence and framing differ.
- Do **not** auto-refund a high-value dispute you can win just to make it disappear, and do **not** auto-submit, refund, or message a customer without explicit human approval.

## Output

A per-dispute decision queue ranked by deadline urgency, each row carrying the reason code, the matching evidence, a grade, the expected-value math, and an owner.

| Dispute | Reason code | Amount | Due in | Core evidence present | Grade | Win prob | EV | Decision | Owner |
|---|---|---|---|---|---|---|---|---|---|
| dp_1A | product_not_received | $180 | 9 days | Tracking + delivery scan + addr match | STRONG | 70% | +$111 | **FIGHT** | Dispatch |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
