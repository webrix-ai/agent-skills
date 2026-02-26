# Agent Skills

A collection of agent skills for AI assistants.

## Structure

This repository contains only Markdown files with YAML frontmatter. Each skill is defined in a `SKILL.md` file within its own directory under `/skills`.

```
skills/
├── skill-name-1/
│   └── SKILL.md
├── skill-name-2/
│   └── SKILL.md
└── ...
```

## Skill File Format

Each `SKILL.md` file contains:

### Frontmatter (YAML)

```yaml
---
name: skill-slug
displayName: Skill Display Name
tagline: Brief description
description: |
  Detailed description
  Can span multiple lines
department:
  - Engineering
  - AI Enablement Leaders
use_cases:
  - Use Case 1
  - Use Case 2
tools_required:
  - Tool Name MCP
agents_compatible:
  - Claude / Claude Code
  - Cursor
  - Windsurf
author: Author Name
verified: true
updatedAt: YYYY-MM-DD
version: 1.0.0
exampleInput: |
  Optional example input
exampleOutput: |
  Optional example output
---
```

### Body (Markdown)

The body contains the skill documentation, including:
- Description
- When to use
- Steps
- Examples

## Usage

This package is designed to be imported as a GitHub dependency. The consuming application is responsible for parsing the Markdown files.

```json
{
  "dependencies": {
    "@webrix/skills": "github:webrix-ai/agent-skills#branch-name"
  }
}
```

## Creating New Skills

1. Create a new directory under `/skills` with a kebab-case name
2. Add a `SKILL.md` file with the required frontmatter and documentation
3. Ensure all required fields are present
4. Submit a pull request

## License

MIT
