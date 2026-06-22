import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const personas = {
  founder: "Founder / CEO",
  ecommerce: "Head of Ecommerce",
  marketing: "Head of Marketing",
  performance: "Performance Marketer",
  retention: "Retention / Email Lead",
  seo: "SEO / Content Lead",
  merchandising: "Merchandising Manager",
  operations: "Ops / Dispatch Lead",
  agency: "Agency AM / COO",
};

const categories = {
  "trading-profit": {
    label: "Trading and profit",
    question: "Are we making the right commercial decision?",
    method:
      "Start with commerce truth, separate revenue from profit, check the date window, then explain the movement in plain operator language.",
    output:
      "A short trading read, a metric table, the main driver, the confidence level, and the next action.",
  },
  "acquisition-efficiency": {
    label: "Acquisition efficiency",
    question: "Which spend, creative, or channel decision needs action?",
    method:
      "Pull spend and outcome evidence, protect learning-phase campaigns, compare against targets, then rank action by commercial impact.",
    output:
      "A ranked KILL / REFRESH / WATCH / KEEP table with evidence, owner, and measurement window.",
  },
  "tracking-data-quality": {
    label: "Tracking and data quality",
    question: "Can we trust the numbers before making a decision?",
    method:
      "Compare commerce truth against analytics, ad, lifecycle, and UTM evidence. Stop when source drift makes the conclusion unsafe.",
    output:
      "A source reconciliation table, broken tracking notes, confidence labels, and a repair sequence.",
  },
  "onsite-cro": {
    label: "Onsite CRO",
    question: "Where is the onsite experience leaking commercial value?",
    method:
      "Segment the funnel, isolate the weakest step or surface, check device and landing-page evidence, then recommend the smallest measurable fix.",
    output:
      "A leak diagnosis, ranked opportunities, evidence links, and a read-only experiment brief.",
  },
  "retention-ltv": {
    label: "Retention and LTV",
    question: "Which customer, flow, or cohort needs attention?",
    method:
      "Start with customer and lifecycle evidence, separate deliverability from offer or audience problems, then prioritize by recoverable value.",
    output:
      "A retention risk map with flow/cohort actions, blocked evidence, and the next check date.",
  },
  "merchandising-feed": {
    label: "Merchandising and feed",
    question: "Which products are invisible, risky, overstocked, or underperforming?",
    method:
      "Join product, feed, inventory, sales, and search evidence. Prioritize products where action is both possible and commercially useful.",
    output:
      "A SKU or product table with FIX / REFRESH / WATCH / KEEP decisions and evidence per row.",
  },
  "seo-demand-capture": {
    label: "SEO and demand capture",
    question: "Where can organic or search demand be recovered?",
    method:
      "Use search evidence first, layer commerce value where available, then rank by recoverability instead of generic traffic volume.",
    output:
      "A search opportunity list with query/page evidence, confidence, and a content or technical action.",
  },
  "ops-risk": {
    label: "Ops and risk",
    question: "What operational issue needs attention today?",
    method:
      "Inspect exceptions, orders, fulfilment, refunds, disputes, returns, and payment signals. Recommend action only when evidence is complete enough.",
    output:
      "An exception queue with owner, timing, risk, evidence, and approval notes.",
  },
  "agency-portfolio": {
    label: "Agency portfolio",
    question: "Which client needs attention before the next meeting?",
    method:
      "Convert client evidence into AM-ready notes, separating actual intervention needs from missing-data noise.",
    output:
      "A client action packet with status, evidence, owner, client-safe commentary, and follow-up play.",
  },
};

const plays = [
  ["founder-pace-to-target", "Pace to Target", "founder", ["founder"], "trading-profit", ["commerce"], "daily", "Are we on pace to hit the target, and what must change today?"],
  ["founder-anomaly-watch", "Revenue Anomaly Watch", "founder", ["founder"], "trading-profit", ["commerce", "google-analytics-4"], "triggered", "What changed enough to explain the revenue anomaly?"],
  ["commerce-contribution-profit-by-channel", "Contribution Profit by Channel", "founder", ["founder", "ecommerce", "marketing"], "trading-profit", ["commerce", "google-analytics-4", "meta-ads", "google-ads", "tiktok-ads"], "weekly", "Which channels are creating contribution profit, not just revenue?"],
  ["founder-promo-postmortem", "Promo Post-Mortem", "founder", ["founder", "ecommerce", "marketing"], "trading-profit", ["commerce"], "ad-hoc", "Did the promotion create incremental value or just pull forward demand?"],
  ["founder-cash-runway-snapshot", "Cash and Payout Snapshot", "founder", ["founder"], "trading-profit", ["stripe", "commerce"], "weekly", "What does cash, payout, refund, and sales evidence say about runway pressure?"],
  ["ecom-weekly-trading-deck", "Weekly Trading Deck", "ecommerce", ["ecommerce", "founder"], "trading-profit", ["commerce", "google-analytics-4"], "weekly", "What happened this week, why, and what should the operator do next?"],
  ["ecom-funnel-leak-finder", "Funnel Leak Finder", "ecommerce", ["ecommerce"], "onsite-cro", ["commerce", "google-analytics-4"], "weekly", "Where is the buying journey leaking revenue?"],
  ["ecom-checkout-health", "Checkout Health Watch", "ecommerce", ["ecommerce", "operations"], "onsite-cro", ["commerce", "google-analytics-4"], "weekly", "Is checkout conversion healthy enough to trust demand generation?"],
  ["ecom-tracking-sanity", "Tracking Sanity Check", "ecommerce", ["ecommerce", "performance", "marketing"], "tracking-data-quality", ["commerce", "google-analytics-4", "meta-ads", "google-ads", "klaviyo"], "weekly", "Can we trust the tracking before making growth decisions?"],
  ["commerce-product-visibility-audit", "Commerce Product Visibility Audit", "ecommerce", ["ecommerce", "merchandising", "seo", "agency"], "merchandising-feed", ["commerce", "google-merchant-center", "google-search-console", "dataforseo"], "ad-hoc", "Which products are invisible across commerce, search, and feed surfaces?"],
  ["perf-morning-dashboard", "Performance Morning Dashboard", "performance", ["performance"], "acquisition-efficiency", ["meta-ads", "google-ads", "tiktok-ads"], "daily", "What needs attention in paid media this morning?"],
  ["perf-wasted-spend-killer", "Wasted Spend Killer", "performance", ["performance", "marketing"], "acquisition-efficiency", ["meta-ads", "google-ads", "tiktok-ads", "commerce"], "weekly", "Which spend should be killed, refreshed, watched, or kept?"],
  ["perf-creative-fatigue-list", "Creative Fatigue List", "performance", ["performance", "marketing"], "acquisition-efficiency", ["meta-ads", "tiktok-ads", "google-ads"], "weekly", "Which ads are fatigued enough to refresh before they drain spend?"],
  ["perf-google-search-term-audit", "Google Ads Search-Term Audit", "performance", ["performance"], "acquisition-efficiency", ["google-ads"], "weekly", "Which search terms are wasting spend or cannibalising intent?"],
  ["marketing-blended-mer-watch", "Blended MER Watch", "marketing", ["marketing", "founder"], "acquisition-efficiency", ["commerce", "meta-ads", "google-ads", "tiktok-ads"], "weekly", "Is blended efficiency moving in the right direction?"],
  ["marketing-cac-by-channel", "New-Customer CAC by Channel", "marketing", ["marketing", "founder", "performance"], "acquisition-efficiency", ["commerce", "google-analytics-4", "meta-ads", "google-ads", "tiktok-ads"], "weekly", "Which channels are acquiring new customers at acceptable cost?"],
  ["email-flow-health-check", "Klaviyo Flow Health Check", "retention", ["retention"], "retention-ltv", ["klaviyo", "commerce"], "weekly", "Which lifecycle flows are underperforming or broken?"],
  ["email-monday-recap", "Email Monday Recap", "retention", ["retention", "marketing"], "retention-ltv", ["klaviyo", "commerce"], "weekly", "What changed in email and retention last week?"],
  ["merch-gmc-feed-audit", "GMC Feed Audit", "merchandising", ["merchandising", "performance"], "merchandising-feed", ["google-merchant-center", "commerce"], "weekly", "Which feed issues are blocking product visibility or trust?"],
  ["merch-stockout-priority", "Stockout Priority List", "merchandising", ["merchandising", "operations"], "merchandising-feed", ["commerce"], "daily", "Which stockouts create the most commercial risk?"],
  ["merch-product-data-quality", "Product Data Quality", "merchandising", ["merchandising"], "merchandising-feed", ["commerce", "google-merchant-center"], "weekly", "Which product data gaps are hurting sales, feed quality, or search?"],
  ["seo-quick-wins", "SEO Quick Wins", "seo", ["seo"], "seo-demand-capture", ["google-search-console"], "weekly", "Which organic search wins are close enough to act on now?"],
  ["seo-content-decay", "SEO Content Decay Watch", "seo", ["seo", "marketing"], "seo-demand-capture", ["google-search-console", "google-analytics-4"], "weekly", "Which pages are losing demand and are worth refreshing?"],
  ["ops-dispute-evidence", "Stripe Dispute Evidence Pack", "operations", ["operations"], "ops-risk", ["stripe", "commerce"], "triggered", "What evidence is needed to respond to this dispute safely?"],
  ["agency-retention-intelligence-packet", "Retention Intelligence Packet", "agency", ["agency", "retention"], "agency-portfolio", ["commerce", "klaviyo", "attentive"], "weekly", "What should the agency tell this client about retention risk and next actions?"],
  ["founder-yoy-pulse", "Year-over-Year Pulse", "founder", ["founder"], "trading-profit", ["commerce"], "weekly", "What is materially different versus the same period last year?"],
  ["commerce-profit-readiness-audit", "Profit Readiness Audit", "founder", ["founder"], "trading-profit", ["commerce"], "monthly", "Do we have enough cost evidence to answer profit questions safely?"],
  ["founder-promo-profit-doctor", "Promo Profit Doctor", "founder", ["founder", "ecommerce", "marketing"], "trading-profit", ["commerce"], "monthly", "Which promotions look good on revenue but weak on profit?"],
  ["ecom-pdp-improvement-list", "PDP Improvement List", "ecommerce", ["ecommerce", "merchandising"], "onsite-cro", ["commerce", "google-analytics-4"], "weekly", "Which product pages should be improved first?"],
  ["ecom-stockout-impact", "Stockout Lost-Revenue Impact", "ecommerce", ["ecommerce", "merchandising", "operations"], "merchandising-feed", ["commerce", "google-analytics-4"], "daily", "Which stockouts are costing the most demand or revenue?"],
  ["ecom-ad-message-match", "Ad-to-Landing-Page Message Match Audit", "ecommerce", ["ecommerce", "marketing", "performance"], "onsite-cro", ["meta-ads", "google-ads", "tiktok-ads", "commerce", "google-analytics-4"], "weekly", "Where does ad promise fail to match landing-page reality?"],
  ["ecom-promo-effectiveness", "Promo Effectiveness", "ecommerce", ["ecommerce", "marketing"], "trading-profit", ["commerce"], "ad-hoc", "Did the promotion improve customer quality, margin, or conversion?"],
  ["marketing-attribution-reconciliation", "Attribution Reconciliation", "marketing", ["marketing"], "tracking-data-quality", ["commerce", "google-analytics-4"], "monthly", "Which source of attribution is drifting from commerce truth?"],
  ["marketing-brand-cannibalisation", "Brand Cannibalisation Audit", "marketing", ["marketing", "performance"], "acquisition-efficiency", ["google-ads", "google-search-console"], "monthly", "Are paid campaigns buying demand that organic search would have captured?"],
  ["marketing-marginal-budget-allocator", "Marginal Budget Allocator", "marketing", ["marketing", "founder", "performance"], "acquisition-efficiency", ["commerce", "meta-ads", "google-ads", "tiktok-ads"], "weekly", "Where should the next marginal dollar go?"],
  ["marketing-competitor-demand-brief", "Competitor Demand Brief", "marketing", ["marketing", "seo", "performance"], "seo-demand-capture", ["dataforseo", "google-search-console"], "monthly", "Which competitor demand signals deserve a response?"],
  ["perf-cpa-root-cause", "CPA Spike Root Cause Explainer", "performance", ["performance", "marketing"], "acquisition-efficiency", ["commerce", "meta-ads", "google-ads", "tiktok-ads"], "weekly", "Why did CPA spike and what should be checked first?"],
  ["perf-shopping-feed-watch", "Shopping Feed Watch", "performance", ["performance", "merchandising"], "merchandising-feed", ["google-merchant-center", "commerce"], "daily", "Which shopping feed issues are hurting paid performance?"],
  ["perf-pmax-deep-dive", "Performance Max Deep Dive", "performance", ["performance"], "acquisition-efficiency", ["google-ads", "google-merchant-center"], "weekly", "Is Performance Max scaling profitably or hiding waste?"],
  ["email-deliverability-watch", "Email Deliverability Watch", "retention", ["retention"], "retention-ltv", ["klaviyo"], "weekly", "Is deliverability safe enough to keep sending?"],
  ["email-abandoned-cart-recovery-doctor", "Abandoned Cart Recovery Doctor", "retention", ["retention", "ecommerce"], "retention-ltv", ["klaviyo", "commerce"], "monthly", "Is abandoned-cart recovery leaving money behind?"],
  ["email-vip-watch", "VIP Cohort Watch", "retention", ["retention", "founder"], "retention-ltv", ["commerce", "klaviyo"], "monthly", "Are VIP customers becoming less active or less valuable?"],
  ["email-winback-builder", "Winback Builder", "retention", ["retention"], "retention-ltv", ["commerce", "klaviyo"], "monthly", "Which dormant customers are worth trying to win back?"],
  ["email-replenishment-timing", "Replenishment Timing", "retention", ["retention", "merchandising"], "retention-ltv", ["commerce", "klaviyo"], "monthly", "When should replenishment messages be sent by product or category?"],
  ["merch-dead-stock-watch", "Dead Stock Watch", "merchandising", ["merchandising", "founder", "operations"], "merchandising-feed", ["commerce"], "weekly", "Which products are tying up cash without enough demand?"],
  ["merch-least-profitable-products", "Least Profitable Products", "merchandising", ["merchandising", "founder", "marketing"], "merchandising-feed", ["commerce"], "weekly", "Which products create the weakest known profit?"],
  ["seo-cannibalisation-audit", "SEO Cannibalisation Audit", "seo", ["seo"], "seo-demand-capture", ["google-search-console"], "monthly", "Which pages compete with each other for the same search demand?"],
  ["seo-schema-rich-result-readiness", "Schema and Rich Result Readiness", "seo", ["seo", "ecommerce", "marketing"], "seo-demand-capture", ["dataforseo", "commerce"], "monthly", "Which structured-data gaps block ecommerce search trust?"],
  ["ops-daily-standup", "Ops Daily Standup", "operations", ["operations"], "ops-risk", ["commerce"], "daily", "What order, fulfilment, refund, or exception queue needs action today?"],
  ["agency-client-health-score", "Agency Client Health Score", "agency", ["agency"], "agency-portfolio", ["commerce", "meta-ads", "google-ads", "klaviyo"], "weekly", "Which client needs intervention before the next meeting?"],
];

const flagship = new Set([
  "merch-gmc-feed-audit",
  "commerce-product-visibility-audit",
  "ecom-tracking-sanity",
  "perf-wasted-spend-killer",
  "perf-creative-fatigue-list",
  "email-flow-health-check",
  "agency-retention-intelligence-packet",
  "ecom-weekly-trading-deck",
  "commerce-contribution-profit-by-channel",
  "seo-content-decay",
]);

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function write(file, content) {
  const target = path.join(root, file);
  ensureDir(target);
  fs.writeFileSync(target, `${content.trim()}\n`);
}

function slugTitle(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function yamlList(values) {
  return `[${values.map((value) => `"${value}"`).join(", ")}]`;
}

function playObject(row, index) {
  const [slug, title, primaryPersona, playPersonas, category, platforms, cadence, question] = row;
  const phase = index < 25 ? "launch" : "fast-follow";
  return {
    schema_version: 1,
    slug,
    title,
    summary: `${title} helps ecommerce operators answer: ${question}`,
    short_title: title.replace(/ Audit| Watch| Check| List| Packet| Dashboard| Deck/g, ""),
    path: `playbooks/${primaryPersona}/${slug}.md`,
    github_url: `https://github.com/perceptiv-digital/ecommerce-operator-playbooks/blob/main/playbooks/${primaryPersona}/${slug}.md`,
    raw_url: `https://raw.githubusercontent.com/perceptiv-digital/ecommerce-operator-playbooks/main/playbooks/${primaryPersona}/${slug}.md`,
    cta_url: `https://my.shop-mcp.app/playbooks/${slug}?utm_source=github&utm_medium=playbook&utm_campaign=ecommerce_operator_os`,
    primary_persona: primaryPersona,
    primary_persona_label: personas[primaryPersona],
    personas: playPersonas,
    persona_labels: playPersonas.map((persona) => personas[persona]),
    category,
    category_label: categories[category].label,
    platforms,
    cadence,
    difficulty: flagship.has(slug) ? "intermediate" : "standard",
    manual_time_minutes: flagship.has(slug) ? { min: 45, max: 90 } : { min: 30, max: 75 },
    shopmcp_time_minutes: { min: 3, max: 8 },
    decision_type: category === "agency-portfolio" ? "client-action-packet" : "diagnose-and-rank",
    evidence_level: "live-data-recommended",
    public_tier: phase,
    flagship: flagship.has(slug),
    shopmcp_ready: true,
    operating_question: question,
  };
}

const playbooks = plays.map(playObject);

for (const play of playbooks) {
  play.required_evidence = requiredEvidence(play).map((label) => ({
    source: "public-evidence-checklist",
    label,
    freshness: "matching-period",
  }));
  play.optional_evidence = [
    {
      source: "operator-context",
      label: "Promotions, stock notes, launch dates, known tracking incidents, and target metrics.",
      freshness: "current",
    },
  ];
  play.shopmcp = {
    ready: true,
    run_url: `https://my.shop-mcp.app/playbooks/${play.slug}`,
    cta_url: play.cta_url,
    required_connections: play.platforms,
    optional_connections: [],
    first_run_read_only: true,
    prompt: `Run the ${play.title} play for the last 30 days. Keep it read-only.`,
  };
}

function frontmatter(play) {
  return `---
schema_version: ${play.schema_version ?? 1}
slug: "${play.slug}"
title: "${play.title}"
summary: "${play.summary ?? `${play.title} ecommerce operating playbook.`}"
operating_question: "${play.operating_question ?? "What decision does this play answer?"}"
short_title: "${play.short_title}"
primary_persona: "${play.primary_persona}"
personas: ${yamlList(play.personas)}
category: "${play.category}"
platforms: ${yamlList(play.platforms)}
cadence: "${play.cadence}"
difficulty: "${play.difficulty}"
manual_time_minutes_min: ${play.manual_time_minutes?.min ?? 30}
manual_time_minutes_max: ${play.manual_time_minutes?.max ?? 75}
shopmcp_time_minutes_min: ${play.shopmcp_time_minutes?.min ?? 3}
shopmcp_time_minutes_max: ${play.shopmcp_time_minutes?.max ?? 8}
decision_type: "${play.decision_type}"
evidence_level: "${play.evidence_level}"
public_tier: "${play.public_tier}"
flagship: ${play.flagship ? "true" : "false"}
shopmcp_ready: ${play.shopmcp_ready ? "true" : "false"}
default_mode: "read-only"
approved_writes_supported: false
shopmcp_run_url: "https://my.shop-mcp.app/playbooks/${play.slug}"
shopmcp_prompt: "Run the ${play.title} play for the last 30 days. Keep it read-only."
status_vocab: ["KILL", "REFRESH", "WATCH", "KEEP", "FIX"]
---`;
}

function requiredEvidence(play) {
  const labels = play.platforms.map((platform) => {
    if (platform === "commerce") return "Commerce orders, products, customers, inventory, or discounts as required by the question.";
    if (platform === "google-analytics-4") return "GA4 sessions, purchases, source/medium, landing page, or funnel-step evidence.";
    if (platform === "google-merchant-center") return "Google Merchant Center product status, disapprovals, price, availability, and feed diagnostics.";
    if (platform === "google-search-console") return "Google Search Console query, page, click, impression, CTR, and position evidence.";
    if (platform === "klaviyo") return "Klaviyo flow, campaign, list, deliverability, profile, or attributed value evidence.";
    if (platform === "attentive") return "Attentive subscriber, journey, event, and deliverability readiness evidence where connected.";
    if (platform === "stripe") return "Stripe payment, charge, payout, invoice, dispute, or subscription evidence.";
    if (platform === "dataforseo") return "SERP, keyword, competitor, page, or structured-data evidence from DataForSEO.";
    if (platform.includes("ads")) return `${slugTitle(platform)} spend, conversion, campaign, ad group, creative, and performance evidence.`;
    return `${slugTitle(platform)} evidence relevant to the operating question.`;
  });
  return [...new Set(labels)];
}

function manualSteps(play) {
  const cat = categories[play.category];
  return [
    `Define the decision window and write the operating question: "${play.operating_question}"`,
    "Gather the required evidence before asking the AI to recommend action.",
    "Ask the AI to separate confirmed facts, estimates, and unavailable evidence.",
    cat.method,
    "Apply the veto rules before accepting any recommendation.",
    "Turn the result into an action packet with owner, timing, evidence, and next check date.",
  ];
}

function playbookMarkdown(play) {
  const evidence = requiredEvidence(play);
  const cat = categories[play.category];
  const steps = manualSteps(play);
  return `${frontmatter(play)}

# ${play.title}

## Operating Question

${play.operating_question}

This play helps ${play.primary_persona_label.toLowerCase()} make a defensible ecommerce operating decision. It is not a generic prompt. It is a repeatable workflow that forces evidence, thresholds, and vetoes before action.

## Who Should Run It

- Primary owner: ${play.primary_persona_label}
- Also useful for: ${play.persona_labels.join(", ")}
- Best used when the owner needs a decision, not just a report.

## When To Run It

- Cadence: ${play.cadence}
- Run it when the owner needs to decide: ${cat.question.toLowerCase()}
- Use it before changing budgets, creative, product data, lifecycle flows, stock priorities, or client commentary.

## Required Evidence

${evidence.map((item) => `- ${item}`).join("\n")}

## Optional Evidence

- Recent operator notes, launch dates, promotion calendar, merchandising changes, stock constraints, and known tracking incidents.
- Target CPA, MER, ROAS, contribution margin, payback, or revenue goal where relevant.

## Manual Workflow

${steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Copy-Paste Prompt

\`\`\`text
You are helping me run the "${play.title}" ecommerce operating play.

Operating question:
${play.operating_question}

Use the evidence I provide. Do not invent missing data. Separate exact, estimated, partial, and unavailable evidence. Apply KILL, REFRESH, WATCH, KEEP, or FIX only when the evidence supports it. If the data is too weak, say what is blocked and what evidence is needed.

Return:
1. Executive answer
2. Evidence table
3. Decision table with status
4. Vetoes or caveats
5. Recommended next actions with owner and timing
\`\`\`

## Decision Rules

- Use \`FIX\` when required evidence is missing, inconsistent, or too weak to support a commercial decision.
- Use \`KILL\` only when downside is clear, the sample is large enough, and no veto protects the item.
- Use \`REFRESH\` when performance is decaying but the asset, product, flow, or page still has a credible reason to improve.
- Use \`WATCH\` when the signal is directional or early.
- Use \`KEEP\` when performance is inside the target band and no risk signal is present.
- Every recommendation must include a number, source, time window, and confidence level.

## Veto Rules

- Do not claim causality from a single platform metric.
- Do not recommend budget shifts if tracking drift makes attribution unsafe.
- Do not recommend scaling a product with low stock, feed disapproval, or missing price/availability evidence.
- Do not make profit claims without cost coverage or a clear partial-profit label.
- Do not recommend writes, pauses, refunds, customer messages, or catalog changes without explicit approval.

## Output Contract

${cat.output}

Minimum table columns:

| Item | Evidence | Status | Why | Owner | Timing |
|---|---|---|---|---|---|
| Example row | Source + number + window | WATCH | Directional signal only | Operator | Recheck in 7 days |

## Good Output Example

> Status: WATCH. The issue is real enough to monitor, but not strong enough to change yet. The strongest evidence is a 21 percent decline over the last 14 days, but the comparison window includes a promotion and stock was below normal for three days. Recheck after a clean 7-day window.

## Common Failure Modes

- Treating a platform-reported metric as commerce truth.
- Skipping the evidence checklist and asking for a recommendation too early.
- Forgetting stock, margin, attribution, or promotion context.
- Accepting an AI answer that does not show its numbers.

## Run This Play With Live Data

Manual version: gather the evidence above and paste the prompt into your AI assistant.

ShopMCP version: ask the same question with ShopMCP connected. ShopMCP routes to the matching live playbook, pulls connected evidence where available, applies evidence gates, and returns an operator-ready brief. ShopMCP does not make writes from this public playbook without explicit approval and a supported preview/apply path.

Example ShopMCP prompt:

\`\`\`text
Run the ${play.title} play for the last 30 days. Keep it read-only.
\`\`\`

Run URL:

${play.cta_url}

What ShopMCP removes:

- Manual exports and stale CSVs.
- Copy-pasting across commerce, ads, analytics, lifecycle, and finance tools.
- Guessing which evidence is safe enough to use.
- Rebuilding the same operating workflow every week.
`;
}

function table(rows) {
  return rows
    .map((play) => `| [${play.title}](../${play.path}) | ${play.primary_persona_label} | ${play.category_label} | ${play.platforms.join(", ")} | ${play.cadence} |`)
    .join("\n");
}

function rootTable(rows) {
  return rows
    .map((play) => `| [${play.title}](${play.path}) | ${play.primary_persona_label} | ${play.category_label} | ${play.platforms.join(", ")} | ${play.cadence} |`)
    .join("\n");
}

function readme() {
  const hero = playbooks.filter((play) => play.flagship).slice(0, 5);
  return `# eCommerce Operator OS

Evidence-first AI playbooks for ecommerce operators.

The public repo is maintained by Perceptiv and powered by ShopMCP. Use the playbooks manually in ChatGPT, Claude, Codex, Cursor, or any AI assistant. Run the live-data versions in ShopMCP when you want the same play to pull evidence from your connected commerce stack.

## Why This Exists

Marketing is not a pile of prompts. Ecommerce growth is a set of operating decisions:

- Are we on pace?
- What is wasting spend?
- Can we trust the tracking?
- Which products are invisible, overstocked, or underperforming?
- Which customers, flows, or clients need attention?

Each playbook tells an AI what evidence to gather, what order to inspect it in, when to stop, what confidence means, and what action needs approval.

## Start Here

| Play | Best for | What it answers |
|---|---|---|
${hero.map((play) => `| [${play.title}](${play.path}) | ${play.primary_persona_label} | ${play.operating_question} |`).join("\n")}

See [TOP_25_PLAYBOOKS.md](TOP_25_PLAYBOOKS.md) for the first launch set.

## Browse

- [By category](indexes/by-category.md)
- [By persona](indexes/by-persona.md)
- [By platform](indexes/by-platform.md)
- [By cadence](indexes/by-cadence.md)
- [By business question](indexes/by-business-question.md)
- [Machine-readable manifest](indexes/manifest.json)

## Manual vs ShopMCP

Manual playbooks are free and useful. They ask you to gather the evidence, paste the prompt, check the output, and decide what to do.

ShopMCP removes the operational friction. It connects to your commerce, ads, analytics, lifecycle, finance, and product systems, then runs Perceptiv-style playbooks against live evidence.

The repo teaches the play. ShopMCP runs the play.

## Quality Bar

Every playbook must:

1. Answer one recurring ecommerce operating question.
2. Name the evidence sources required for a confident answer.
3. Include numeric decision rules.
4. Include weak-data vetoes.
5. Produce a clear output contract.
6. Default to read-only analysis unless explicit approval is required.

Read [PLAYBOOK_STANDARD.md](PLAYBOOK_STANDARD.md) and [GOVERNANCE.md](GOVERNANCE.md).

## Contributing

We accept operating questions, evidence improvements, platform-specific variants, examples, and failure modes. We do not accept generic prompt dumps.

Start with [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Code and validation scripts are MIT licensed. Written playbook content is available under CC BY 4.0. See [LICENSE](LICENSE) and [CONTENT_LICENSE.md](CONTENT_LICENSE.md).
`;
}

function top25() {
  const launch = playbooks.filter((play) => play.public_tier === "launch");
  return `# Top 25 eCommerce Operator Playbooks

These are the launch playbooks. Each one is useful manually and designed to map to a ShopMCP live-data workflow.

| Play | Persona | Category | Platforms | Cadence |
|---|---|---|---|---|
${rootTable(launch)}
`;
}

function standards() {
  write("PLAYBOOK_STANDARD.md", `# Playbook Standard

A playbook is not a prompt. A playbook is an operating workflow for a specific ecommerce decision.

Required anatomy:

1. The play
2. When to run it
3. What you need
4. Manual playbook
5. Copy-paste prompt
6. Decision rules
7. Veto rules
8. Output contract
9. Good output example
10. Common failure modes
11. Run this play with live data

Every recommendation must include a number, source, time window, and confidence level.
`);
  write("GOVERNANCE.md", `# Governance

This repo is maintained by Perceptiv.

## What We Optimize For

- Useful manual value.
- Evidence-first thinking.
- Ecommerce operator judgment.
- Read-only defaults.
- Clear ShopMCP upgrade paths without bait-and-switch.

## What We Reject

- Generic prompt dumps.
- Unsupported revenue or causality claims.
- Vendor spam.
- Fake benchmarks.
- Unsafe write automation.
- Playbooks that require private customer data to understand.
`);
  write("CONTRIBUTING.md", `# Contributing

Thanks for helping improve eCommerce Operator OS.

## Good Contributions

- A recurring ecommerce operating question.
- A sharper evidence checklist.
- A platform-specific variant.
- A better output contract.
- A failure mode from real operator work.
- A synthetic example that teaches the play.

## Not Accepted

- Generic prompts.
- "Act as an expert" wrappers.
- Vendor pitches.
- Unsupported benchmarks.
- Advice that asks an AI to write to a live system without approval.

## Playbook Proposal Format

1. What decision does this help an operator make?
2. Who owns the decision?
3. What evidence is required?
4. What can go wrong if evidence is missing?
5. What should the output look like?
6. How would ShopMCP remove manual friction?
`);
  write("standards/evidence-rules.md", `# Evidence Rules

- Commerce truth beats platform-reported attribution for sales and orders.
- Profit requires cost coverage or a clear partial label.
- Tracking drift must be fixed before attribution decisions.
- Low sample sizes should produce WATCH or FIX, not KILL.
- Missing evidence must be named, not guessed.
`);
  write("standards/status-vocabulary.md", `# Status Vocabulary

- KILL: Stop or remove when evidence is strong and no veto applies.
- REFRESH: Improve or rotate within a short window.
- WATCH: Directional signal; keep monitoring.
- KEEP: Performing within target and no material risk.
- FIX: Data, setup, tracking, product, or evidence issue blocks the decision.
`);
  write("standards/approval-before-write.md", `# Approval Before Write

Public playbooks default to read-only analysis.

Any write-like action must provide:

- Exact item ids or names.
- Before and after values.
- Count of affected items.
- Risk note.
- Explicit approval step.

ShopMCP may support approved writes for some tools and platforms. This repo must not imply universal write-back.
`);
  write("standards/ecommerce-metrics.md", `# Ecommerce Metrics

Common metrics:

- Revenue
- Gross margin
- Contribution profit
- AOV
- CAC
- MER
- ROAS
- CVR
- LTV
- Repeat purchase rate
- Refund rate
- Stock cover
- Feed approval rate
`);
  write("standards/weak-data-vetoes.md", `# Weak-Data Vetoes

Stop or downgrade the recommendation when:

- The comparison window is polluted by stockouts, launches, or promotions.
- GA4 and commerce orders drift materially.
- Cost coverage is too weak for profit claims.
- The sample is too small for a KILL decision.
- The product cannot be acted on because inventory, feed, or catalog status blocks it.
`);
}

function templates() {
  write("templates/playbook-template.md", `${frontmatter({
    slug: "example-playbook",
    title: "Example Playbook",
    short_title: "Example",
    primary_persona: "ecommerce",
    personas: ["ecommerce"],
    category: "trading-profit",
    platforms: ["commerce"],
    cadence: "weekly",
    difficulty: "standard",
    manual_time: "30-75 min",
    shopmcp_time: "3-8 min",
    decision_type: "diagnose-and-rank",
    evidence_level: "live-data-recommended",
    public_tier: "template",
    flagship: false,
    shopmcp_ready: true,
  })}

# Example Playbook

Use this file as the starting point for new playbooks. Replace every placeholder before submitting a PR.
`);
  write("templates/evidence-checklist-template.md", `# Evidence Checklist Template

- Decision window:
- Commerce truth source:
- Optional analytics source:
- Optional ad source:
- Optional lifecycle source:
- Known vetoes:
- Missing evidence:
`);
  write("templates/output-contract-template.md", `# Output Contract Template

1. Executive answer
2. Evidence table
3. Decision table
4. Vetoes and caveats
5. Owner and timing
6. Next check date
`);
  write("templates/companion-app-card-template.json", JSON.stringify({
    slug: "example-playbook",
    title: "Example Playbook",
    operating_question: "What decision does this play answer?",
    persona: "Head of Ecommerce",
    category: "Trading and profit",
    platforms: ["commerce"],
    manual_time: "30-75 min",
    shopmcp_time: "3-8 min",
  }, null, 2));
}

function examples() {
  write("examples/synthetic-store/README.md", `# Synthetic Store

Use these tiny examples to test prompts without exposing customer data.
`);
  write("examples/synthetic-store/orders.csv", `order_id,date,source,revenue,cogs,new_customer
1001,2026-06-01,google_ads,180,91,true
1002,2026-06-01,email,96,42,false
1003,2026-06-02,meta_ads,142,88,true
`);
  write("examples/sample-outputs/wasted-spend-killer.md", `# Sample Output: Wasted Spend Killer

| Item | Evidence | Status | Why | Owner | Timing |
|---|---|---|---|---|---|
| Campaign A | $1,240 spend, 0 orders, 30 days | KILL | Spend is material and no commerce return is visible | Performance | Today |
| Campaign B | CPA up 22%, stock cover 8 days | WATCH | Performance signal is weak because stock is constrained | Performance + Merch | 7 days |
`);
  write("examples/good-vs-weak-outputs/README.md", `# Good vs Weak Outputs

Good outputs show evidence, status, confidence, and an owner. Weak outputs give generic advice without numbers.
`);
}

function adapters() {
  for (const adapter of ["chatgpt", "claude", "codex", "cursor"]) {
    write(`adapters/${adapter}/README.md`, `# ${slugTitle(adapter)} Adapter

Copy a playbook prompt into ${slugTitle(adapter)} and paste the evidence requested by the play.

Always ask the model to separate exact, estimated, partial, and unavailable evidence.
`);
  }
  write("adapters/shopmcp/README.md", `# ShopMCP Adapter

ShopMCP is the live-data execution layer for these playbooks.

Suggested prompt pattern:

\`\`\`text
Run the [playbook title] play for [date window]. Keep it read-only.
\`\`\`

ShopMCP should only write to connected systems when the specific tool supports approved writes and the operator confirms the preview.
`);
}

function repoFiles() {
  write("README.md", readme());
  write("TOP_25_PLAYBOOKS.md", top25());
  standards();
  templates();
  examples();
  adapters();
  write("LICENSE", `MIT License

Copyright (c) 2026 Perceptiv

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`);
  write("CONTENT_LICENSE.md", `# Content License

Written playbook content is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).

You can share and adapt the playbooks with attribution to Perceptiv and a link back to this repository.
`);
  write("CHANGELOG.md", `# Changelog

## 2026.06.22

- Initial public foundation for eCommerce Operator OS.
- Added 50 playbooks, generated indexes, templates, standards, examples, and validation.
`);
  write(".gitignore", `node_modules/
.DS_Store
dist/
`);
  write("package.json", JSON.stringify({
    name: "ecommerce-operator-playbooks",
    private: true,
    version: "0.1.0",
    description: "Evidence-first AI playbooks for ecommerce operators.",
    scripts: {
      bootstrap: "node scripts/bootstrap.mjs",
      validate: "node scripts/validate.mjs",
    },
  }, null, 2));
  write("CODE_OF_CONDUCT.md", `# Code of Conduct

Be useful, specific, and respectful. This project is for ecommerce operators and contributors who want better evidence-driven playbooks.
`);
  write("SECURITY.md", `# Security Policy

This repository contains public playbook content, templates, examples, and validation scripts.

Do not submit customer data, private benchmarks, API keys, access tokens, exports, screenshots with account identifiers, or proprietary internal logic.

If you find a security issue in the repository automation, open a private security advisory on GitHub or contact Perceptiv privately.

Public playbooks must remain read-only by default. Any write-like recommendation must require an explicit operator approval step and a supported preview/apply path.
`);
  write(".github/pull_request_template.md", `## What Changed

## Playbook Or Evidence Question

## Checklist

- [ ] This improves a recurring ecommerce operating decision.
- [ ] Required evidence is named clearly.
- [ ] Missing or weak data produces a veto, downgrade, or FIX status.
- [ ] No private customer data, API credentials, or internal ShopMCP logic is included.
- [ ] The ShopMCP mention is a live-data execution path, not a generic ad.
`);
  write(".github/ISSUE_TEMPLATE/playbook_request.md", `---
name: Playbook request
about: Request a new ecommerce operating playbook
title: "[Playbook request]: "
labels: playbook-request
---

## Operating question

## Persona

## Evidence required

## Output needed
`);
  write(".github/ISSUE_TEMPLATE/improve_playbook.md", `---
name: Improve a playbook
about: Suggest a sharper method, evidence source, or failure mode
title: "[Improve]: "
labels: improvement
---

## Playbook

## Improvement

## Why it matters
`);
  write(".github/workflows/validate.yml", `name: Validate

on:
  push:
  pull_request:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm run validate
`);
  write("assets/social-preview.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="640" viewBox="0 0 1280 640" role="img" aria-labelledby="title desc">
  <title id="title">eCommerce Operator OS</title>
  <desc id="desc">Evidence-first AI playbooks for ecommerce operators, by Perceptiv and ShopMCP.</desc>
  <rect width="1280" height="640" fill="#0f172a"/>
  <rect x="72" y="72" width="1136" height="496" rx="28" fill="#f8fafc"/>
  <text x="128" y="172" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#2563eb">Perceptiv presents</text>
  <text x="128" y="278" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="800" fill="#111827">eCommerce Operator OS</text>
  <text x="128" y="350" font-family="Arial, Helvetica, sans-serif" font-size="36" fill="#334155">Evidence-first AI playbooks for real commerce decisions.</text>
  <text x="128" y="452" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#475569">Manual in ChatGPT or Claude. Live-data execution in ShopMCP.</text>
  <text x="128" y="522" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#111827">github.com/perceptiv-digital/ecommerce-operator-playbooks</text>
</svg>
`);
  write("assets/playbook-map.md", `# Playbook Map

The repo is organized around business decisions, not tool features.

1. Trading and profit
2. Acquisition efficiency
3. Tracking and data quality
4. Onsite CRO
5. Retention and LTV
6. Merchandising and feed
7. SEO and demand capture
8. Ops and risk
9. Agency portfolio

Each public playbook teaches the operating workflow. ShopMCP runs the matching live-data workflow where the required connections are available.
`);
}

function indexes() {
  const manifest = {
    name: "eCommerce Operator OS",
    repo: "perceptiv-digital/ecommerce-operator-playbooks",
    generated_at: new Date().toISOString(),
    playbook_count: playbooks.length,
    playbooks,
  };
  write("indexes/manifest.json", JSON.stringify(manifest, null, 2));
  write("llms.txt", `# eCommerce Operator OS

Evidence-first AI playbooks for ecommerce operators.

Start with:

- README.md
- TOP_25_PLAYBOOKS.md
- PLAYBOOK_STANDARD.md
- indexes/manifest.json
`);
  write("llms-full.txt", `# eCommerce Operator OS Full Index

${playbooks.map((play) => `- ${play.title}: ${play.operating_question} (${play.path})`).join("\n")}
`);

  const byCategory = Object.keys(categories)
    .map((category) => {
      const rows = playbooks.filter((play) => play.category === category);
      return `## ${categories[category].label}

| Play | Persona | Category | Platforms | Cadence |
|---|---|---|---|---|
${table(rows)}`;
    })
    .join("\n\n");
  write("indexes/by-category.md", `# Playbooks by Category

${byCategory}`);

  const byPersona = Object.keys(personas)
    .map((persona) => {
      const rows = playbooks.filter((play) => play.personas.includes(persona));
      return `## ${personas[persona]}

| Play | Persona | Category | Platforms | Cadence |
|---|---|---|---|---|
${table(rows)}`;
    })
    .join("\n\n");
  write("indexes/by-persona.md", `# Playbooks by Persona

${byPersona}`);

  const allPlatforms = [...new Set(playbooks.flatMap((play) => play.platforms))].sort();
  const byPlatform = allPlatforms
    .map((platform) => {
      const rows = playbooks.filter((play) => play.platforms.includes(platform));
      return `## ${slugTitle(platform)}

| Play | Persona | Category | Platforms | Cadence |
|---|---|---|---|---|
${table(rows)}`;
    })
    .join("\n\n");
  write("indexes/by-platform.md", `# Playbooks by Platform

${byPlatform}`);

  const cadences = [...new Set(playbooks.map((play) => play.cadence))].sort();
  const byCadence = cadences
    .map((cadence) => {
      const rows = playbooks.filter((play) => play.cadence === cadence);
      return `## ${slugTitle(cadence)}

| Play | Persona | Category | Platforms | Cadence |
|---|---|---|---|---|
${table(rows)}`;
    })
    .join("\n\n");
  write("indexes/by-cadence.md", `# Playbooks by Cadence

${byCadence}`);

  write("indexes/by-business-question.md", `# Playbooks by Business Question

${playbooks.map((play) => `- [${play.operating_question}](../${play.path})`).join("\n")}
`);
}

function validator() {
  write("scripts/validate.mjs", `import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "indexes/manifest.json"), "utf8"));
const required = [
  "schema_version",
  "slug",
  "title",
  "summary",
  "path",
  "primary_persona",
  "personas",
  "category",
  "platforms",
  "cadence",
  "decision_type",
  "evidence_level",
  "operating_question",
  "public_tier",
  "shopmcp_ready",
  "required_evidence",
  "shopmcp"
];

const errors = [];
if (manifest.playbook_count !== manifest.playbooks.length) {
  errors.push("manifest playbook_count does not match playbooks length");
}
if (manifest.playbooks.length < 50) {
  errors.push("expected at least 50 playbooks");
}
for (const play of manifest.playbooks) {
  for (const field of required) {
    if (play[field] === undefined || play[field] === null || play[field] === "") {
      errors.push(\`\${play.slug || "unknown"} missing \${field}\`);
    }
  }
  const file = path.join(root, play.path);
  if (play.path !== \`playbooks/\${play.primary_persona}/\${play.slug}.md\`) {
    errors.push(\`\${play.slug} path does not match persona and slug\`);
  }
  if (!play.shopmcp?.run_url?.endsWith(\`/playbooks/\${play.slug}\`)) {
    errors.push(\`\${play.slug} ShopMCP run_url must use the same slug\`);
  }
  if (play.shopmcp?.first_run_read_only !== true) {
    errors.push(\`\${play.slug} ShopMCP first run must default to read-only\`);
  }
  if (!Array.isArray(play.required_evidence) || play.required_evidence.length === 0) {
    errors.push(\`\${play.slug} needs structured required_evidence\`);
  }
  if (!fs.existsSync(file)) {
    errors.push(\`\${play.slug} file missing: \${play.path}\`);
    continue;
  }
  const text = fs.readFileSync(file, "utf8");
  for (const section of [
    "## Operating Question",
    "## Who Should Run It",
    "## When To Run It",
    "## Required Evidence",
    "## Optional Evidence",
    "## Manual Workflow",
    "## Copy-Paste Prompt",
    "## Decision Rules",
    "## Veto Rules",
    "## Output Contract",
    "## Good Output Example",
    "## Common Failure Modes",
    "## Run This Play With Live Data"
  ]) {
    if (!text.includes(section)) {
      errors.push(\`\${play.slug} missing section \${section}\`);
    }
  }
  const ctaCount = (text.match(/^## Run This Play With Live Data$/gm) || []).length;
  if (ctaCount !== 1) {
    errors.push(\`\${play.slug} must include exactly one live-data CTA section\`);
  }
  const decisionRules = text.split("## Decision Rules")[1]?.split("## Veto Rules")[0] || "";
  if (!/number, source, time window, and confidence level/.test(decisionRules)) {
    errors.push(\`\${play.slug} decision rules must require numbers and evidence\`);
  }
}

const slugs = new Set();
for (const play of manifest.playbooks) {
  if (slugs.has(play.slug)) errors.push(\`duplicate slug \${play.slug}\`);
  slugs.add(play.slug);
}

if (errors.length) {
  console.error(errors.join("\\n"));
  process.exit(1);
}
console.log(\`Validated \${manifest.playbooks.length} playbooks\`);
`);
}

function playbookFiles() {
  for (const play of playbooks) {
    write(play.path, playbookMarkdown(play));
  }
}

repoFiles();
playbookFiles();
indexes();
validator();

console.log(`Generated ${playbooks.length} playbooks in ${root}`);
