---
name: email-deliverability-watch
description: "When an ecommerce operator needs to decide: Is deliverability safe enough to keep sending? Runs the Email Deliverability Watch play — gathers the named evidence, applies numeric decision rules and weak-data vetoes, and returns a defensible answer rather than a confident guess. Also use when the user mentions 'Email Deliverability', 'Klaviyo', 'Retention Ltv'."
license: CC-BY-4.0
metadata:
  persona: Retention / Email Lead
  source: perceptiv-digital/ecommerce-operator-playbooks
---

# Email Deliverability Watch

**Operating question:** Is deliverability safe enough to keep sending?

Run this as an evidence-first operating play. Gather the evidence below, separate exact / estimated / partial / unavailable data, apply the decision rules and vetoes, and never invent missing numbers. Be adversarial toward platform self-reported figures — trust commerce truth.

## Evidence to gather

- **Spam-complaint rate** — per send and rolling 7/30-day, ideally split by mailbox provider. This is the number Gmail and Yahoo enforce. Bulk-sender rule (Feb 2024, senders >5,000/day to Gmail or Yahoo): keep complaint rate **under 0.10%**; **0.30% is the hard danger line** where providers start spam-foldering you.
- **Bounce rate** — hard vs. soft, last 30 days. Hard-bounce rate above **~2%** signals a dirty or purchased list and is itself a reputation hit.
- **Authentication status** — SPF pass, DKIM signing on the sending domain, a published **DMARC** policy, and the **one-click List-Unsubscribe** header (RFC 8058). All four are now *mandatory* for bulk senders, not nice-to-haves.
- **Engagement-based segmentation** — what recency window your campaigns actually target. Are you sending to 90-day+ non-openers?
- **Sending domain / dedicated-IP reputation** — Google Postmaster domain & IP reputation (High / Medium / Low / Bad), spam-rate trend.

Optional, if available:

- **List source history** — was any segment imported, bought, or scraped rather than opted in? This is the single most common cause of a complaint spike.
- **Recent send-volume changes** — a sudden 5–10× volume jump on a young IP triggers throttling regardless of complaint rate.
- **Promo calendar** — heavy discount blasts to broad lists draw more complaints than transactional or flow email.
- **Sunset-flow status** — is a 90/120-day-unengaged suppression flow live, or is dead weight still in the sendable audience?
- **Seed-list / inbox-placement test results** — a Glock/GlockApps-style placement test tells you inbox vs. spam vs. missing per provider, which Klaviyo's open rate cannot.

## How to decide — in order

1. **Authentication first — it gates everything.** If SPF, DKIM, DMARC, or one-click List-Unsubscribe is missing or misaligned, set the program to **FIX-AUTH** and treat all downstream metrics as unreliable. Broken auth means providers can't even verify you; no complaint-rate read is trustworthy until this passes.
2. **Read the complaint rate against the hard lines.** Under 0.10% = healthy. 0.10–0.30% = elevated, **THROTTLE** and investigate. At or above 0.30% = breached the Gmail/Yahoo danger line → **PAUSE** the riskiest segment immediately, do not "send through it."
3. **Find the source of the complaints — it is almost never the creative.** Complaint spikes come from *who* you mailed, not *what* you sent. Check for a recent list import, a re-engagement blast to dormant profiles, or a sudden volume jump before blaming subject lines.
4. **Check bounce rate for list hygiene.** Hard bounces above ~2% mean invalid addresses in the sendable list — clean them and stop the bleed, because bounces compound the reputation damage complaints start.
5. **Audit engagement segmentation.** If campaigns are reaching 90-day+ non-engagers, that unengaged tail is *causing* the complaint and spam-placement problem. Pause cold; do not "use the list."
6. **Apply the vetoes**, then assign status + owner + recheck date, and define the warm-back-up plan if you paused or throttled.

## The prompt to run

```text
You are my email deliverability analyst running the "Email Deliverability Watch" play.

GOAL: decide whether it is safe to KEEP SENDING this week, or whether to THROTTLE,
PAUSE a cold segment, or FIX authentication first — based only on the reputation
numbers mailbox providers actually enforce, not Klaviyo open/click rates.

I will paste: Klaviyo complaint rate and bounce rate (per send and 30-day, by provider
if I have it), Google Postmaster domain/IP reputation, my SPF/DKIM/DMARC/one-click
List-Unsubscribe status, and my campaign segment recency windows. Some data may be missing.

Required inputs for this play are: spam-complaint rate, bounce rate, and authentication
status (SPF/DKIM/DMARC). The spam-complaint rate is the critical input — without it you
cannot judge whether it is safe to keep sending.

PRE-FLIGHT: First list which required inputs I provided vs. missing. If the spam-complaint
rate is missing, STOP and return only (a) what's missing and (b) how to get it — never
estimate it or proceed.

RULES:
- Authentication gates everything. If SPF, DKIM, DMARC, or one-click List-Unsubscribe is
  missing or misaligned, return FIX-AUTH and treat complaint/open metrics as unreliable.
- Hold complaint rate to the bulk-sender lines: <0.10% healthy, 0.10-0.30% THROTTLE and
  investigate, >=0.30% PAUSE the riskiest segment now. State which line each send is on.
- Hard-bounce rate above ~2% = dirty list; flag for cleaning.
- A complaint spike is a WHO problem (list source / dormant tail / volume jump), not a
  WHAT problem (creative). Name the suspected source before recommending a creative change.
- If campaigns reach 90-day+ non-engagers, name that tail as the likely cause and
  recommend pause-cold + a sunset flow. Do not recommend mailing the cold list to "use" it.
- Every row must carry: a number, source, time window, and confidence level.
- Separate exact / estimated / partial / unavailable evidence. Do not invent missing data.

RETURN:
1. A 3-sentence executive read: is it safe to keep sending, yes or no, and why.
2. A table using exactly this header row:
   | Segment / Send | Complaint % | Bounce % | Auth status | Engagement window | Status | Owner | Recheck |
   Use "—" for any cell you cannot fill. Do not add or drop columns, and do not replace the
   table with prose.
3. The single highest-priority fix and the warm-back-up plan if anything is paused.
4. What evidence is blocked and what you'd need to upgrade a WATCH/FIX to a clear send/no-send.
```

## Decision rules

- **KEEP** — complaint rate under 0.10%, hard bounces under ~2%, all four auth checks (SPF/DKIM/DMARC/one-click unsubscribe) passing, and campaigns targeting engaged recency windows.
- **WATCH** — complaint rate in the 0.10–0.30% band, or a one-provider open-rate dip with no complaint movement yet, or a young IP/domain still warming with thin history. Directional; recheck before scaling volume.
- **REFRESH** — deliverability is fine but engagement is decaying (slipping open rates on engaged segments); tighten recency windows and re-permission, don't just keep mailing wider.
- **THROTTLE** — complaint rate elevated (0.10–0.30%) or a volume jump on a young IP; cut send volume and narrow to your most-engaged segment while you find the source.
- **PAUSE COLD** — complaint rate at or above 0.30%, *or* a clear unengaged/imported tail is driving complaints; stop sending to that segment now and sunset it.
- **FIX-AUTH** — SPF, DKIM, DMARC, or one-click List-Unsubscribe missing or misaligned; fix the domain before any other call, because no metric is trustworthy until it passes.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Vetoes — stop if any apply

- A deliverability problem **invalidates every flow and campaign performance read above it** — do not let anyone optimize subject lines or flow timing on a program that is being spam-foldered. Fix placement first.
- Do **not** keep blasting the unengaged list to "use" it or "win it back" — that audience is the *cause* of the complaint and reputation problem, not a recovery lever.
- **Fix authentication before anything else.** A complaint or open-rate number measured under broken SPF/DKIM/DMARC is not a real number.
- Do **not** treat a single bad send as a trend — check the *source* (a one-off import or re-engagement blast can spike complaints once without indicating a systemic decline). One data point is a check-the-source signal, not a pause-the-program signal.
- Do **not** scale send volume on a domain or dedicated IP that is still warming — reputation needs gradual ramp, not a step change.
- Do **not** execute a pause, suppression, segment edit, or sunset flow without an explicit human approval step.

## Output

A weekly send/no-send verdict with per-segment status, the single highest-priority fix, and a warm-back-up plan for anything paused.

| Segment / Send | Complaint % | Bounce % | Auth status | Engagement window | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| Weekly campaign – engaged 60d | 0.06% | 0.9% | SPF/DKIM/DMARC pass | Opened in 60d | KEEP | Email Lead | 7 days |

---

Run this on your **live** store data in one prompt — [start a free 14-day trial of ShopMCP](https://shop-mcp.app?utm_source=skill&utm_medium=skill&utm_campaign=ecommerce_operator_os) (no credit card). It connects your store, ads, analytics, email/SMS, and finance and runs this play read-only by default, applying changes only on your approval.
