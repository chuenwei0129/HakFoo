#!/usr/bin/env bun

import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const SKILLS_DIR = join(ROOT, "skills");

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

async function loadJson(path: string): Promise<any> {
  if (!existsSync(path)) {
    throw new ValidationError(`missing file: ${relative(ROOT, path)}`);
  }

  try {
    return await Bun.file(path).json();
  } catch (error) {
    throw new ValidationError(
      `invalid json in ${relative(ROOT, path)}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

async function loadText(path: string): Promise<string> {
  if (!existsSync(path)) {
    throw new ValidationError(`missing file: ${relative(ROOT, path)}`);
  }

  return Bun.file(path).text();
}

function parseFrontmatter(path: string, text: string): Record<string, string> {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    throw new ValidationError(`${relative(ROOT, path)} is missing YAML frontmatter`);
  }

  const fields: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("metadata:")) {
      continue;
    }

    const fieldMatch = trimmed.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (fieldMatch) {
      fields[fieldMatch[1]] = fieldMatch[2].trim().replace(/^['"]|['"]$/g, "");
    }
  }

  for (const requiredKey of ["name", "description"]) {
    if (!fields[requiredKey]) {
      throw new ValidationError(
        `${relative(ROOT, path)} is missing required frontmatter field '${requiredKey}'`,
      );
    }
  }

  return fields;
}

async function validateSkillDirectory(path: string): Promise<void> {
  const skillFile = join(path, "SKILL.md");
  const skillText = await loadText(skillFile);
  const frontmatter = parseFrontmatter(skillFile, skillText);

  const agentsYaml = join(path, "agents", "openai.yaml");
  if (existsSync(agentsYaml)) {
    const yamlText = await loadText(agentsYaml);
    if (!yamlText.includes(`$${frontmatter.name}`)) {
      throw new ValidationError(
        `${relative(ROOT, agentsYaml)} default prompt should mention $${frontmatter.name}`,
      );
    }
  }
}

async function validateClaudeMarketplace(): Promise<void> {
  const marketplace = await loadJson(join(ROOT, ".claude-plugin", "marketplace.json"));
  if (!Array.isArray(marketplace.plugins) || marketplace.plugins.length === 0) {
    throw new ValidationError(".claude-plugin/marketplace.json must contain a non-empty plugins array");
  }

  for (const plugin of marketplace.plugins) {
    if (!plugin.source) {
      throw new ValidationError("each Claude plugin entry must include a source path");
    }

    const sourcePath = resolve(ROOT, plugin.source);
    if (!existsSync(sourcePath)) {
      throw new ValidationError(`Claude plugin source does not exist: ${plugin.source}`);
    }
  }
}

async function validateCodexPlugin(): Promise<void> {
  const plugin = await loadJson(join(ROOT, ".codex-plugin", "plugin.json"));
  if (plugin.name !== "hakfoo") {
    throw new ValidationError(".codex-plugin/plugin.json name must stay in sync with plugin id 'hakfoo'");
  }

  if (!plugin.skills) {
    throw new ValidationError(".codex-plugin/plugin.json must define a skills path");
  }

  const skillsPath = resolve(ROOT, String(plugin.skills).replace(/^\.\//, ""));
  if (!existsSync(skillsPath)) {
    throw new ValidationError(`Codex skills path does not exist: ${plugin.skills}`);
  }
}

async function validateDocs(): Promise<void> {
  const claudeText = await loadText(join(ROOT, "CLAUDE.md"));
  if (claudeText.includes("skill.md")) {
    throw new ValidationError("CLAUDE.md still references skill.md; use SKILL.md consistently");
  }

  if (!existsSync(join(ROOT, "AGENTS.md"))) {
    throw new ValidationError("AGENTS.md is required for Codex-facing repository guidance");
  }
}

async function main(): Promise<void> {
  if (!existsSync(SKILLS_DIR)) {
    throw new ValidationError("skills/ directory is missing");
  }

  const skillDirs = readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(SKILLS_DIR, entry.name))
    .sort();

  if (skillDirs.length === 0) {
    throw new ValidationError("skills/ must contain at least one skill directory");
  }

  for (const skillDir of skillDirs) {
    await validateSkillDirectory(skillDir);
  }

  await validateClaudeMarketplace();
  await validateCodexPlugin();
  await validateDocs();
}

try {
  await main();
  console.log("Validation passed.");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Validation failed: ${message}`);
  process.exit(1);
}
