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

const baseSections = [
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
  "## Common Failure Modes",
  "## Run This Play With Live Data",
];

// Flagship plays are the launch set. They must be genuinely deep, not boilerplate.
const flagshipSections = ["## Why You Can't Just Ask ChatGPT This", "## Worked Example"];

const errors = [];
const warnings = [];

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

const workedExamples = new Map(); // normalized worked example -> [slugs] (flagship anti-boilerplate gate)
const goodExamples = new Map(); // normalized legacy example -> count (boilerplate warning)

for (const play of manifest.playbooks) {
  for (const field of required) {
    if (play[field] === undefined || play[field] === null || play[field] === "") {
      errors.push(`${play.slug || "unknown"} missing ${field}`);
    }
  }
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

  const file = path.join(root, play.path);
  if (!fs.existsSync(file)) {
    errors.push(`${play.slug} file missing: ${play.path}`);
    continue;
  }
  const text = fs.readFileSync(file, "utf8");

  for (const section of baseSections) {
    if (!text.includes(section)) errors.push(`${play.slug} missing section ${section}`);
  }

  // Every play needs a concrete example — new deep style or legacy style.
  const hasWorked = text.includes("## Worked Example");
  const hasGood = text.includes("## Good Output Example");
  if (!hasWorked && !hasGood) {
    errors.push(`${play.slug} missing a worked/good example section`);
  }

  const ctaCount = (text.match(/^## Run This Play With Live Data$/gm) || []).length;
  if (ctaCount !== 1) {
    errors.push(`${play.slug} must include exactly one live-data CTA section`);
  }

  const decisionRules = sectionBody(text, "## Decision Rules");
  if (!/number, source, time window, and confidence level/.test(decisionRules)) {
    errors.push(`${play.slug} decision rules must require numbers and evidence`);
  }

  if (play.flagship) {
    for (const section of flagshipSections) {
      if (!text.includes(section)) {
        errors.push(`FLAGSHIP ${play.slug} missing required deep section ${section}`);
      }
    }
    const body = bodyOf(text);
    if (body.length < 2500) {
      errors.push(`FLAGSHIP ${play.slug} body too thin (${body.length} chars) — flagship plays must be deep`);
    }
    const digits = (body.match(/\d/g) || []).length;
    if (digits < 20) {
      errors.push(`FLAGSHIP ${play.slug} has too few concrete numbers (${digits}) — flagship plays must be numeric`);
    }
    const we = normalize(sectionBody(text, "## Worked Example"));
    if (we) {
      if (!workedExamples.has(we)) workedExamples.set(we, []);
      workedExamples.get(we).push(play.slug);
    }
  }

  if (hasGood) {
    const ge = normalize(sectionBody(text, "## Good Output Example"));
    goodExamples.set(ge, (goodExamples.get(ge) || 0) + 1);
  }
}

// Hard gate: no two flagship plays may share an identical worked example.
for (const [, slugs] of workedExamples) {
  if (slugs.length > 1) {
    errors.push(`Flagship playbooks share an identical worked example (boilerplate): ${slugs.join(", ")}`);
  }
}

// Warn: remaining boilerplate among non-flagship plays (debt to be rewritten).
for (const [, count] of goodExamples) {
  if (count > 1) {
    warnings.push(`${count} playbooks still share an identical "Good Output Example" block — boilerplate to be rewritten.`);
  }
}

const slugs = new Set();
for (const play of manifest.playbooks) {
  if (slugs.has(play.slug)) errors.push(`duplicate slug ${play.slug}`);
  slugs.add(play.slug);
}

if (warnings.length) {
  console.warn(`WARNINGS:\n${warnings.join("\n")}`);
}
if (errors.length) {
  console.error(`ERRORS:\n${errors.join("\n")}`);
  process.exit(1);
}
const flagshipCount = manifest.playbooks.filter((p) => p.flagship).length;
console.log(`Validated ${manifest.playbooks.length} playbooks (${flagshipCount} flagship deep-checked)`);
