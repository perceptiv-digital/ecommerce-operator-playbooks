---
slug: "email-deliverability-watch"
title: "Email Deliverability Watch"
operating_question: "Is deliverability safe enough to keep sending?"
primary_persona: "retention"
personas: ["retention"]
category: "retention-ltv"
platforms: ["klaviyo"]
cadence: "weekly"
public_tier: "fast-follow"
---

# Email Deliverability Watch

## Operating Question

**Is our inbox placement safe enough to keep sending this week — or are complaint rate, bounces, or broken authentication about to get the whole program filtered to spam?**

Deliverability is the gate that sits above every other email metric. Open rate, click rate, flow revenue, campaign revenue — all of it is meaningless if the mailbox providers stopped putting you in the inbox. Klaviyo will happily report a "23% open rate" on a send that Gmail quietly routed to spam for 60% of recipients. This play forces a weekly **KEEP SENDING / THROTTLE / PAUSE COLD / FIX-AUTH** call on your sending reputation, driven by the only numbers Gmail and Yahoo actually enforce: spam-complaint rate, bounce rate, authentication, and whether you're still mailing people who stopped engaging months ago.

## Why You Can't Just Ask ChatGPT This

A plain AI assistant has no view into your Klaviyo deliverability tab, your sending domain's DNS records, or Google Postmaster Tools. To run this manually you have to:

1. Pull Klaviyo's deliverability report — spam-complaint rate and bounce rate per send, segmented by mailbox provider, for the trailing 30 days.
2. Cross-check against **Google Postmaster Tools** and **Yahoo's sender dashboard**, because Klaviyo only sees *its own* feedback-loop complaints — the provider sees the real number.
3. Run a live DNS lookup on your sending domain to confirm SPF, DKIM, DMARC, and the one-click List-Unsubscribe header are all present and aligned.
4. Reconstruct your engagement-segmentation rules to confirm you aren't blasting 180-day-dormant profiles that drag the whole domain's reputation down.

**The reasoning here is free. The access — Klaviyo + Postmaster + DNS, reconciled — is the work,** and that is exactly what ShopMCP connects. If your AI assistant has no live line into Klaviyo and your sending domain, that wall is where every manual run stops. The last section shows the one-prompt version.

## Who Should Run It

- **Primary owner:** Retention / Email Lead
- **Also useful for:** Lifecycle/CRM Manager (segmentation and sunset logic), Head of Growth (the program's revenue is hostage to this number), whoever owns DNS (authentication fixes touch the domain).
- Run it **before** any large campaign send or new flow launch, and **before** importing or re-activating any list you didn't grow yourself.

## When To Run It

- **Cadence:** weekly — same morning each week, after the prior week's sends have fully reported complaints (feedback loops lag 24–72 hours).
- **Triggers:** a spam-complaint spike, a sudden open-rate cliff on one provider only, a list import or lapsed-list re-engagement, moving onto a new dedicated IP, or any "why did revenue drop with no traffic change" question.
- **Pre-requisite:** confirm Klaviyo's complaint and bounce reporting is actually populated for the window. A brand-new dedicated IP or a just-migrated domain has no reputation history yet — judge it as *warming*, not *failing*.

## Required Evidence

- **Spam-complaint rate** — per send and rolling 7/30-day, ideally split by mailbox provider. This is the number Gmail and Yahoo enforce. Bulk-sender rule (Feb 2024, senders >5,000/day to Gmail or Yahoo): keep complaint rate **under 0.10%**; **0.30% is the hard danger line** where providers start spam-foldering you.
- **Bounce rate** — hard vs. soft, last 30 days. Hard-bounce rate above **~2%** signals a dirty or purchased list and is itself a reputation hit.
- **Authentication status** — SPF pass, DKIM signing on the sending domain, a published **DMARC** policy, and the **one-click List-Unsubscribe** header (RFC 8058). All four are now *mandatory* for bulk senders, not nice-to-haves.
- **Engagement-based segmentation** — what recency window your campaigns actually target. Are you sending to 90-day+ non-openers?
- **Sending domain / dedicated-IP reputation** — Google Postmaster domain & IP reputation (High / Medium / Low / Bad), spam-rate trend.

## Optional Evidence

- **List source history** — was any segment imported, bought, or scraped rather than opted in? This is the single most common cause of a complaint spike.
- **Recent send-volume changes** — a sudden 5–10× volume jump on a young IP triggers throttling regardless of complaint rate.
- **Promo calendar** — heavy discount blasts to broad lists draw more complaints than transactional or flow email.
- **Sunset-flow status** — is a 90/120-day-unengaged suppression flow live, or is dead weight still in the sendable audience?
- **Seed-list / inbox-placement test results** — a Glock/GlockApps-style placement test tells you inbox vs. spam vs. missing per provider, which Klaviyo's open rate cannot.

## How To Pull This Evidence

- **Klaviyo Deliverability tab** (Analytics → Deliverability) — read the **spam-complaint rate** and **bounce rate** per send and over the trailing 7/30 days, plus the **sending reputation** indicator. Filter to campaign sends, not flows, when isolating a spike. *Gotcha:* Klaviyo only sees its own feedback-loop complaints, so its complaint number runs low — treat it as a floor, not the truth.
- **Google Postmaster Tools** (postmaster.google.com) — read domain and IP **reputation** (High / Medium / Low / Bad) and the **spam-rate** trend for Gmail recipients. *Gotcha:* it only populates above ~100–200 Gmail sends/day, data lags 1–2 days, and it covers Gmail only — pair it with Yahoo's sender dashboard for the other half of the inbox.
- **DMARC/SPF/DKIM check** — run `dig TXT yourdomain.com` and a DMARC/DKIM checker (e.g. MXToolbox or dmarcian), and confirm Klaviyo's domain settings show all three aligned plus the one-click List-Unsubscribe header. *Gotcha:* a record that *exists* isn't the same as one that *aligns* — SPF can pass while DKIM signs the wrong domain, so verify the `From:` domain matches.
- **List-growth-vs-unsub** — compare net new subscribers against unsubscribes and spam-complaints for the window in Klaviyo's growth/list reports. *Gotcha:* a list that's growing on paper can still be rotting if unsubs and complaints are outrunning engaged net-new — segment by source to find the leak.

Or skip all of this — ShopMCP pulls it live.

## The Decision Logic (run in this order)

1. **Authentication first — it gates everything.** If SPF, DKIM, DMARC, or one-click List-Unsubscribe is missing or misaligned, set the program to **FIX-AUTH** and treat all downstream metrics as unreliable. Broken auth means providers can't even verify you; no complaint-rate read is trustworthy until this passes.
2. **Read the complaint rate against the hard lines.** Under 0.10% = healthy. 0.10–0.30% = elevated, **THROTTLE** and investigate. At or above 0.30% = breached the Gmail/Yahoo danger line → **PAUSE** the riskiest segment immediately, do not "send through it."
3. **Find the source of the complaints — it is almost never the creative.** Complaint spikes come from *who* you mailed, not *what* you sent. Check for a recent list import, a re-engagement blast to dormant profiles, or a sudden volume jump before blaming subject lines.
4. **Check bounce rate for list hygiene.** Hard bounces above ~2% mean invalid addresses in the sendable list — clean them and stop the bleed, because bounces compound the reputation damage complaints start.
5. **Audit engagement segmentation.** If campaigns are reaching 90-day+ non-engagers, that unengaged tail is *causing* the complaint and spam-placement problem. Pause cold; do not "use the list."
6. **Apply the vetoes**, then assign status + owner + recheck date, and define the warm-back-up plan if you paused or throttled.

## Manual Workflow

1. Pull Klaviyo's deliverability report (complaint rate, bounce rate per send) for the last 30 days; pull Google Postmaster domain/IP reputation and spam-rate trend for the same window.
2. Run a DNS lookup (`dig TXT yourdomain.com`, a DMARC checker, and Klaviyo's domain settings) to confirm SPF, DKIM, DMARC, and one-click List-Unsubscribe all pass and align.
3. Map complaint and bounce rates against the 0.10% / 0.30% / 2% thresholds; flag any provider-specific cliff.
4. List your campaign send segments and their recency windows; identify any unengaged (90-day+) tail still receiving sends.
5. Identify the *source* of any complaint spike — import, re-engagement blast, volume jump — before touching creative.
6. Paste the prompt below with your tables, pressure-test against the vetoes, and convert the result into an action packet with owner, recheck date, and a warm-back-up plan if you throttled or paused.

## Copy-Paste Prompt

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

## Decision Rules

- **KEEP** — complaint rate under 0.10%, hard bounces under ~2%, all four auth checks (SPF/DKIM/DMARC/one-click unsubscribe) passing, and campaigns targeting engaged recency windows.
- **WATCH** — complaint rate in the 0.10–0.30% band, or a one-provider open-rate dip with no complaint movement yet, or a young IP/domain still warming with thin history. Directional; recheck before scaling volume.
- **REFRESH** — deliverability is fine but engagement is decaying (slipping open rates on engaged segments); tighten recency windows and re-permission, don't just keep mailing wider.
- **THROTTLE** — complaint rate elevated (0.10–0.30%) or a volume jump on a young IP; cut send volume and narrow to your most-engaged segment while you find the source.
- **PAUSE COLD** — complaint rate at or above 0.30%, *or* a clear unengaged/imported tail is driving complaints; stop sending to that segment now and sunset it.
- **FIX-AUTH** — SPF, DKIM, DMARC, or one-click List-Unsubscribe missing or misaligned; fix the domain before any other call, because no metric is trustworthy until it passes.
- Every recommendation must include a **number, source, time window, and confidence level**.

## Veto Rules

- A deliverability problem **invalidates every flow and campaign performance read above it** — do not let anyone optimize subject lines or flow timing on a program that is being spam-foldered. Fix placement first.
- Do **not** keep blasting the unengaged list to "use" it or "win it back" — that audience is the *cause* of the complaint and reputation problem, not a recovery lever.
- **Fix authentication before anything else.** A complaint or open-rate number measured under broken SPF/DKIM/DMARC is not a real number.
- Do **not** treat a single bad send as a trend — check the *source* (a one-off import or re-engagement blast can spike complaints once without indicating a systemic decline). One data point is a check-the-source signal, not a pause-the-program signal.
- Do **not** scale send volume on a domain or dedicated IP that is still warming — reputation needs gradual ramp, not a step change.
- Do **not** execute a pause, suppression, segment edit, or sunset flow without an explicit human approval step.

## Output Contract

A weekly send/no-send verdict with per-segment status, the single highest-priority fix, and a warm-back-up plan for anything paused.

| Segment / Send | Complaint % | Bounce % | Auth status | Engagement window | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| Weekly campaign – engaged 60d | 0.06% | 0.9% | SPF/DKIM/DMARC pass | Opened in 60d | KEEP | Email Lead | 7 days |

## Worked Example

> **Executive read:** No — it is not safe to keep sending to the imported segment. A cold list import pushed the all-sends complaint rate to **0.34%**, past Gmail's 0.30% danger line, while DMARC was never published, so providers can't fully verify us. Pause the cold import now, publish DMARC, sunset the 90-day-unengaged tail, and warm volume back up gradually over two weeks; the engaged 60-day segment is clean and can keep sending.

| Segment / Send | Complaint % | Bounce % | Auth status | Engagement window | Status | Owner | Recheck |
|---|---|---|---|---|---|---|---|
| Cold list import – Apr blast | **0.34%** | 3.1% | **DMARC missing** | No engagement data | **PAUSE COLD** | Email + DNS | Now |
| Domain authentication | — | — | SPF/DKIM pass, **DMARC absent**, one-click unsub present | — | **FIX-AUTH** | DNS owner | 48 hrs |
| 90-day-unengaged tail | 0.21% | 1.8% | inherits domain | Opened 90–180d ago | **PAUSE COLD → sunset** | Email Lead | Now |
| Weekly campaign – engaged 60d | 0.06% | 0.7% | SPF/DKIM pass | Opened in 60d | **KEEP** | Email Lead | 7 days |
| Welcome flow | 0.03% | 0.4% | SPF/DKIM pass | Active subscribers | **KEEP** | Email Lead | 14 days |
| Win-back flow – re-engagement | 0.18% | 1.4% | SPF/DKIM pass | 120d dormant | **THROTTLE** | Email Lead | 7 days |

Note how the verdict separates the *cause* from the *casualties*: the engaged 60-day segment and welcome flow are perfectly healthy and keep sending, while the imported cold list — not the creative — is what breached the threshold and dragged the domain's reputation down.

## Common Failure Modes

- Trusting Klaviyo's open rate as proof of inbox placement — a spam-foldered send can still show opens from prefetching and the unengaged who do dig you out of spam.
- Reacting to one bad send as a trend instead of checking whether a one-off import or blast caused it.
- "Re-engaging" a dormant list with a big blast — the exact move that spikes complaints and craters reputation.
- Optimizing subject lines and send times while the real problem is missing DMARC or a dirty list.
- Scaling volume on a freshly migrated domain or new dedicated IP before it has warmed.
- Ignoring the per-provider split — a clean blended number can hide a Gmail-only spam-placement cliff.

## Run This Play With Live Data

**Manual version:** pull Klaviyo's deliverability report, cross-check Google Postmaster, run a DNS lookup for SPF/DKIM/DMARC/one-click unsubscribe, map every send against the 0.10% / 0.30% / 2% lines, and trace any spike back to its source — every week, by hand.

**ShopMCP version:** connect Klaviyo and your sending domain once. Ask the question; ShopMCP pulls live complaint and bounce rates, reads your authentication status, checks engagement windows on your sendable segments, runs the threshold gates and the authentication-first decision logic, and returns the ranked KEEP / THROTTLE / PAUSE COLD / FIX-AUTH verdict. It stays **read-only** until you explicitly approve a pause, suppression, or sunset flow.

> No Klaviyo or sending-domain connection inside your AI assistant? That's the wall every manual deliverability check hits. ShopMCP *is* the connection — the same playbook then runs in one prompt instead of a Postmaster-plus-DNS-plus-spreadsheet morning.

Already a ShopMCP subscriber? Open ShopMCP in your AI assistant and paste:

```text
Run the Email Deliverability Watch play for the last 30 days. Keep it read-only.
```

New to ShopMCP? [Start a free 14-day trial](https://shop-mcp.app?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os) — no credit card required. Connect your stack once and run this play (and 50+ more) in a single prompt.

What ShopMCP removes:

- Manually reconciling Klaviyo complaint data against Google Postmaster's real number.
- Hand-running DNS lookups to confirm SPF, DKIM, DMARC, and one-click List-Unsubscribe.
- Guessing which segment's recency window is dragging down domain reputation.
- Rebuilding the same complaint-rate-vs-threshold check every single week.
