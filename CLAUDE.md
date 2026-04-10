# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

HakFoo is a personal Claude Code skill collection. Each skill is a Markdown file that defines a reusable "做事方法" (way of working) — such as commit conventions, PR templates, debugging checklists, or refactoring steps.

## Repository Structure

```
├── README.md                    # Project philosophy (in Chinese)
├── .claude-plugin/
│   └── marketplace.json         # Plugin manifest for Claude Code marketplace
└── skills/
    └── {skill-name}/
        └── skill.md             # Skill definition with YAML frontmatter
```

## Skill Format

Each skill is a Markdown file with YAML frontmatter:

```yaml
---
name: skill-name
description: "When to trigger this skill — triggers are stated in Chinese"
metadata:
  version: "0.0.1"
---

# Skill Title

## Scope
When to use, when NOT to use.

## Red Lines (Priority-ordered constraints)
Must-check rules, written imperatively.

## Toolbox
Optional techniques — analogy, story, questions, etc.

## Execution
Step-by-step workflow.

## Acceptance
How to verify output quality.
```

## Marketplace Configuration

The `.claude-plugin/marketplace.json` follows the [Claude Code marketplace schema](https://anthropic.com/claude-code/marketplace.schema.json). Each skill directory is registered as a plugin with its skills array pointing to subdirectories.

## Adding a New Skill

1. Create directory: `mkdir skills/{skill-name}`
2. Write `skills/{skill-name}/skill.md` with proper YAML frontmatter
3. Add entry to `.claude-plugin/marketplace.json` plugins array (new plugin) or skills array (add to existing)
4. No build step required — Claude loads skills directly from Markdown

## Design Principles

From README.md:
- **有招必有名** — Every skill must have a clear name; if you can't name it, you don't understand it
- **招式是用来传承的** — Write the "why" before the "how"
- **红线优先于工具** — Red lines (constraints) are non-negotiable; toolbox items are optional
- **形式自由** — Output format is determined by the content, not forced structure

## No Build/Test/Lint

This repository contains only Markdown documentation. No build system, tests, or linting is configured. Changes are verified by:
- Valid YAML frontmatter
- Markdown renders correctly
- Skill description is clear enough for Claude to trigger appropriately
