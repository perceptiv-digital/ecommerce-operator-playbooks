import fs from "node:fs";
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
  "shopmcp",
];

// Every play must carry the full operating-playbook anatomy. A playbook is not a prompt.
const requiredSections = [
  "## Operating Question",
  "## Why You Can't Just Ask ChatGPT This",
  "## Who Should Run It",
  "## When To Run It",
  "## Required Evidence",
  "## Optional Evidence",
  "## Manual Workflow",
  "## Copy-Paste Prompt",
  "## Decision Rules",
  "## Veto Rules",
  "## Output Contract",
  "## Worked Example",
  "## Common Failure Modes",
  "## Run This Play With Live Data",
];

const errors = [];

if (manifest.playbook_count !== manifest.playbooks.length) {
  errors.push("manifest playbook_count does not match playbooks length");
}
if (manifest.playbooks.length < 50) {
  errors.push("expected at least 50 playbooks");
}

function sectionBody(text, header) {
  const i = text.indexOf(header);
  if (i === -1) return "";
  const rest = text.slice(i + header.length);
  const next = rest.indexOf("\n## ");
  return (next === -1 ? rest : rest.slice(0, next)).trim();
}
function normalize(s) {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
}
function bodyOf(text) {
  const parts = text.split(/^---\s*$/m);
  return parts.length >= 3 ? parts.slice(2).join("---") : text;
}

const workedExamples = new Map(); // normalized worked example -> [slugs] (anti-boilerplate gate)

for (const play of manifest.playbooks) {
  for (const field of required) {
    if (play[field] === undefined || play[field] === null || play[field] === "") {
      errors.push(`${play.slug || "unknown"} missing ${field}`);
    }
  }
  if (play.path !== `playbooks/${play.primary_persona}/${play.slug}.md`) {
    errors.push(`${play.slug} path does not match persona and slug`);
  }
  if (!play.shopmcp?.run_url) {
    errors.push(`${play.slug} missing ShopMCP run_url`);
  }
  if (play.shopmcp?.first_run_read_only !== true) {
    errors.push(`${play.slug} ShopMCP first run must default to read-only`);
  }
  if (!Array.isArray(play.required_evidence) || play.required_evidence.length === 0) {
    errors.push(`${play.slug} needs structured required_evidence`);
  }

  const file = path.join(root, play.path);
  if (!fs.existsSync(file)) {
    errors.push(`${play.slug} file missing: ${play.path}`);
    continue;
  }
  const text = fs.readFileSync(file, "utf8");

  for (const section of requiredSections) {
    if (!text.includes(section)) errors.push(`${play.slug} missing section ${section}`);
  }

  const ctaCount = (text.match(/^## Run This Play With Live Data$/gm) || []).length;
  if (ctaCount !== 1) {
    errors.push(`${play.slug} must include exactly one live-data CTA section`);
  }

  const decisionRules = sectionBody(text, "## Decision Rules");
  if (!/number, source, time window, and confidence level/.test(decisionRules)) {
    errors.push(`${play.slug} decision rules must require numbers and evidence`);
  }

  // Depth gates: a real playbook is substantial and numeric, not a stub.
  const body = bodyOf(text);
  if (body.length < 2500) {
    errors.push(`${play.slug} body too thin (${body.length} chars) — playbooks must be deep`);
  }
  const digits = (body.match(/\d/g) || []).length;
  if (digits < 20) {
    errors.push(`${play.slug} has too few concrete numbers (${digits}) — playbooks must be numeric`);
  }

  // Anti-boilerplate: no banned generated example, and unique worked examples.
  if (/21 percent decline/.test(text)) {
    errors.push(`${play.slug} still contains the generated boilerplate example`);
  }
  const we = normalize(sectionBody(text, "## Worked Example"));
  if (we) {
    if (!workedExamples.has(we)) workedExamples.set(we, []);
    workedExamples.get(we).push(play.slug);
  }
}

// Hard gate: no two plays may share an identical worked example.
for (const [, slugs] of workedExamples) {
  if (slugs.length > 1) {
    errors.push(`Playbooks share an identical worked example (boilerplate): ${slugs.join(", ")}`);
  }
}

const slugs = new Set();
for (const play of manifest.playbooks) {
  if (slugs.has(play.slug)) errors.push(`duplicate slug ${play.slug}`);
  slugs.add(play.slug);
}

if (errors.length) {
  console.error(`ERRORS:\n${errors.join("\n")}`);
  process.exit(1);
}
console.log(`Validated ${manifest.playbooks.length} playbooks — all deep-checked, unique worked examples`);
