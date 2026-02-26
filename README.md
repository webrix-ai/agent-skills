# Agent Skills Repository

A collection of agent skills for AI assistants. This repository contains only Markdown files with YAML frontmatter - no JavaScript or package configuration needed.

## Structure

```
skills/
├── skill-name-1/
│   └── SKILL.md
├── skill-name-2/
│   └── SKILL.md
└── ...
```

## Skill File Format

Each `SKILL.md` file contains YAML frontmatter followed by Markdown documentation:

```markdown
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

# Skill Name

Skill documentation here...
```

## Usage

This repository is designed to be synced into the `mcp-s-home` project using the sync script:

```bash
cd mcp-s-home
npm run sync-skills
```

This copies all skill files into `mcp-s-home/src/skills/data/` where they are parsed and loaded by the application.

## Adding New Skills

1. Create a new directory under `/skills` with a kebab-case name
2. Add a `SKILL.md` file with the required frontmatter and documentation
3. Ensure all required fields are present:
   - `name` (slug)
   - `displayName`
   - `tagline`
   - `description`
   - `department` (array)
   - `use_cases` (array)
   - `tools_required` (array)
   - `agents_compatible` (array)
   - `author`
   - `verified` (boolean)
   - `updatedAt` (date)
   - `version`
4. Run `npm run sync-skills` in the mcp-s-home project to sync changes
5. Commit and push to GitHub

## Development Workflow

1. Clone both repositories as sibling directories:
   ```
   GitHub/
   ├── agent-skills/
   └── mcp-s-home/
   ```

2. Make changes to skills in `agent-skills/skills/`

3. Sync to mcp-s-home:
   ```bash
   cd mcp-s-home
   npm run sync-skills
   ```

4. Test in mcp-s-home (dev server will hot-reload)

5. Commit changes in both repositories

## Benefits of This Approach

- ✅ **Simple**: Just Markdown files, no build process
- ✅ **Git-friendly**: Easy to review diffs and track changes
- ✅ **No dependencies**: No package.json or node_modules
- ✅ **Direct sync**: Files are copied directly, no module resolution
- ✅ **Fast**: No npm install needed
- ✅ **Clean separation**: Skills repo stays focused on content

## License

MIT
