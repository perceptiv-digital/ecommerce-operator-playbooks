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
      errors.push(`${play.slug || "unknown"} missing ${field}`);
    }
  }
  const file = path.join(root, play.path);
  if (play.path !== `playbooks/${play.primary_persona}/${play.slug}.md`) {
    errors.push(`${play.slug} path does not match persona and slug`);
  }
  if (!play.shopmcp?.run_url?.endsWith(`/playbooks/${play.slug}`)) {
    errors.push(`${play.slug} ShopMCP run_url must use the same slug`);
  }
  if (play.shopmcp?.first_run_read_only !== true) {
    errors.push(`${play.slug} ShopMCP first run must default to read-only`);
  }
  if (!Array.isArray(play.required_evidence) || play.required_evidence.length === 0) {
    errors.push(`${play.slug} needs structured required_evidence`);
  }
  if (!fs.existsSync(file)) {
    errors.push(`${play.slug} file missing: ${play.path}`);
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
      errors.push(`${play.slug} missing section ${section}`);
    }
  }
  const ctaCount = (text.match(/^## Run This Play With Live Data$/gm) || []).length;
  if (ctaCount !== 1) {
    errors.push(`${play.slug} must include exactly one live-data CTA section`);
  }
  const decisionRules = text.split("## Decision Rules")[1]?.split("## Veto Rules")[0] || "";
  if (!/number, source, time window, and confidence level/.test(decisionRules)) {
    errors.push(`${play.slug} decision rules must require numbers and evidence`);
  }
}

const slugs = new Set();
for (const play of manifest.playbooks) {
  if (slugs.has(play.slug)) errors.push(`duplicate slug ${play.slug}`);
  slugs.add(play.slug);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${manifest.playbooks.length} playbooks`);
