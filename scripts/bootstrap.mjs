// Index generator for eCommerce Operator OS.
//
// The authored playbook files under playbooks/ are the single source of truth.
// This script parses their frontmatter and (re)builds only the DERIVED artifacts:
// the machine-readable manifest, the human indexes, the launch catalogue, and the
// llms.txt entry points. It never writes playbook bodies, the README, or the docs —
// those are hand-authored. Run it after adding or editing a play:  npm run bootstrap
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const playbooksDir = path.join(root, "playbooks");

const personaLabels = {
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

const categoryLabels = {
  "trading-profit": "Trading and profit",
  "acquisition-efficiency": "Acquisition efficiency",
  "tracking-data-quality": "Tracking and data quality",
  "onsite-cro": "Onsite CRO",
  "retention-ltv": "Retention and LTV",
  "merchandising-feed": "Merchandising and feed",
  "seo-demand-capture": "SEO and demand capture",
  "ops-risk": "Ops and risk",
  "agency-portfolio": "Agency portfolio",
};

function slugTitle(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function evidenceLabel(platform) {
  const map = {
    commerce: "Commerce orders, products, customers, inventory, or discounts as required by the question.",
    "google-analytics-4": "GA4 sessions, purchases, source/medium, landing page, or funnel-step evidence.",
    "google-merchant-center": "Google Merchant Center product status, disapprovals, price, availability, and feed diagnostics.",
    "google-search-console": "Google Search Console query, page, click, impression, CTR, and position evidence.",
    klaviyo: "Klaviyo flow, campaign, list, deliverability, profile, or attributed value evidence.",
    attentive: "Attentive subscriber, journey, event, and deliverability readiness evidence where connected.",
    stripe: "Stripe payment, charge, payout, invoice, dispute, or subscription evidence.",
    dataforseo: "SERP, keyword, competitor, page, or structured-data evidence from DataForSEO.",
  };
  if (map[platform]) return map[platform];
  if (platform.includes("ads")) return `${slugTitle(platform)} spend, conversion, campaign, ad group, creative, and performance evidence.`;
  return `${slugTitle(platform)} evidence relevant to the operating question.`;
}

function parseValue(raw) {
  const v = raw.trim();
  if (v === "") return "";
  if (v === "true") return true;
  if (v === "false") return false;
  if (/^-?\d+$/.test(v)) return Number(v);
  if (v.startsWith("[")) {
    try {
      return JSON.parse(v);
    } catch {
      return v;
    }
  }
  if (v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1);
  return v;
}

function parseFrontmatter(text) {
  const parts = text.split(/^---\s*$/m);
  if (parts.length < 3) throw new Error("missing frontmatter");
  const fm = {};
  for (const line of parts[1].split("\n")) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (m) fm[m[1]] = parseValue(m[2]);
  }
  return fm;
}

function listPlayFiles() {
  const files = [];
  for (const persona of fs.readdirSync(playbooksDir)) {
    const dir = path.join(playbooksDir, persona);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".md")) files.push(path.join(persona, f));
    }
  }
  return files.sort();
}

function buildPlay(rel) {
  const fm = parseFrontmatter(fs.readFileSync(path.join(playbooksDir, rel), "utf8"));
  const platforms = fm.platforms || [];
  const requiredEvidence = [...new Set(platforms.map(evidenceLabel))].map((label) => ({
    source: "public-evidence-checklist",
    label,
    freshness: "matching-period",
  }));
  // The play file carries only the 9 fields that drive indexes and skills.
  // Everything else (summary, the shopmcp block) is derived here, so it does
  // not clutter the frontmatter table GitHub renders at the top of each play.
  return {
    schema_version: 1,
    slug: fm.slug,
    title: fm.title,
    summary: `${fm.title} helps ecommerce operators answer: ${fm.operating_question}`,
    operating_question: fm.operating_question,
    path: `playbooks/${rel}`,
    primary_persona: fm.primary_persona,
    primary_persona_label: personaLabels[fm.primary_persona] || fm.primary_persona,
    personas: fm.personas || [fm.primary_persona],
    persona_labels: (fm.personas || [fm.primary_persona]).map((p) => personaLabels[p] || p),
    category: fm.category,
    category_label: categoryLabels[fm.category] || fm.category,
    platforms,
    cadence: fm.cadence,
    public_tier: fm.public_tier,
    required_evidence: requiredEvidence,
    shopmcp: {
      ready: true,
      run_url: "https://shop-mcp.app",
      required_connections: platforms,
      first_run_read_only: true,
      prompt: `Run the ${fm.title} play for the last 30 days. Keep it read-only.`,
    },
  };
}

function write(rel, content) {
  const target = path.join(root, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${content.trim()}\n`);
}

function tableRows(rows, prefix) {
  return rows
    .map(
      (p) =>
        `| [${p.title}](${prefix}${p.path}) | ${p.primary_persona_label} | ${p.category_label} | ${p.platforms.join(", ")} | ${p.cadence} |`,
    )
    .join("\n");
}

const playbooks = listPlayFiles().map(buildPlay);
const errors = playbooks.filter((p) => !p.slug || !p.title).map((p) => p.path);
if (errors.length) {
  console.error(`Frontmatter parse failures:\n${errors.join("\n")}`);
  process.exit(1);
}

// --- manifest (machine-readable single source of truth) ---
write(
  "indexes/manifest.json",
  JSON.stringify(
    {
      name: "eCommerce Operator OS",
      repo: "perceptiv-digital/ecommerce-operator-playbooks",
      generated_at: new Date().toISOString(),
      playbook_count: playbooks.length,
      playbooks,
    },
    null,
    2,
  ),
);

// --- launch catalogue ---
const launch = playbooks.filter((p) => p.public_tier === "launch");
write(
  "indexes/catalogue.md",
  `# Playbook Catalogue — Launch Set

The ${launch.length} launch playbooks — a curated highlight set. The **full library of ${playbooks.length} plays** lives in the [persona](by-persona.md), [category](by-category.md), [platform](by-platform.md), [cadence](by-cadence.md), and [business question](by-business-question.md) indexes.

| Play | Persona | Category | Platforms | Cadence |
|---|---|---|---|---|
${tableRows(launch, "../")}`,
);

// --- indexes ---
function indexBy(title, file, groups) {
  const body = groups
    .map(
      ([heading, rows]) =>
        `## ${heading}\n\n| Play | Persona | Category | Platforms | Cadence |\n|---|---|---|---|---|\n${tableRows(rows, "../")}`,
    )
    .join("\n\n");
  write(`indexes/${file}`, `# ${title}\n\n${body}`);
}

indexBy(
  "Playbooks by Persona",
  "by-persona.md",
  Object.keys(personaLabels).map((p) => [personaLabels[p], playbooks.filter((x) => x.personas.includes(p))]).filter(([, r]) => r.length),
);
indexBy(
  "Playbooks by Category",
  "by-category.md",
  Object.keys(categoryLabels).map((c) => [categoryLabels[c], playbooks.filter((x) => x.category === c)]).filter(([, r]) => r.length),
);
indexBy(
  "Playbooks by Platform",
  "by-platform.md",
  [...new Set(playbooks.flatMap((p) => p.platforms))].sort().map((pl) => [slugTitle(pl), playbooks.filter((x) => x.platforms.includes(pl))]),
);
indexBy(
  "Playbooks by Cadence",
  "by-cadence.md",
  [...new Set(playbooks.map((p) => p.cadence))].sort().map((cd) => [slugTitle(cd), playbooks.filter((x) => x.cadence === cd)]),
);
write(
  "indexes/by-business-question.md",
  `# Playbooks by Business Question\n\n${playbooks.map((p) => `- [${p.operating_question}](../${p.path})`).join("\n")}`,
);

// --- llms.txt entry points ---
write(
  "llms.txt",
  `# eCommerce Operator OS

Evidence-first AI playbooks for ecommerce operators. Free to read, one prompt to run.

Start with:

- README.md
- indexes/catalogue.md
- docs/playbook-standard.md
- indexes/manifest.json`,
);
write(
  "llms-full.txt",
  `# eCommerce Operator OS — full index\n\n${playbooks.map((p) => `- ${p.title}: ${p.operating_question} (${p.path})`).join("\n")}`,
);

console.log(`Rebuilt indexes for ${playbooks.length} playbooks (${launch.length} in launch set).`);
