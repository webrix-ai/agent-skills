# @webrix/skills

A collection of agent skills for AI assistants with CLI and SDK capabilities.

## Installation

Install directly from the GitHub repository:

```bash
# Install from main branch
npm install github:webrix-ai/agent-skills

# Install from a specific branch
npm install github:webrix-ai/agent-skills#dev

# Install from a specific tag/version
npm install github:webrix-ai/agent-skills#v1.0.0

# Install from a specific commit
npm install github:webrix-ai/agent-skills#abc1234
```

### CLI Usage (No Installation Required)

Run commands directly from GitHub:

```bash
# From main branch
npx github:webrix-ai/agent-skills add webrix/pr-review-standards
npx github:webrix-ai/agent-skills help
npx github:webrix-ai/agent-skills list

# From specific branch (e.g., dev branch)
npx github:webrix-ai/agent-skills#dev add webrix/pr-review-standards
npx github:webrix-ai/agent-skills#dev help

# From specific tag or commit
npx github:webrix-ai/agent-skills#v1.0.0 add webrix/pr-review-standards
npx github:webrix-ai/agent-skills#abc123def help
```

### Install Globally for Shorter Commands

```bash
# Install once
npm install -g github:webrix-ai/agent-skills

# Then use short commands anywhere
skills add webrix/pr-review-standards
skills help
skills list
```

## CLI Usage

### Add a skill

Install a specific skill from a GitHub repository:

```bash
npx github:webrix-ai/agent-skills add owner/repo@skill-name
```

Install all skills from a repository:

```bash
npx github:webrix-ai/agent-skills add owner/repo
```

Examples:

```bash
# From main branch
npx github:webrix-ai/agent-skills add webrix/pr-review-standards
npx github:webrix-ai/agent-skills add webrix/agent-skills@find-skills

# From specific branch
npx github:webrix-ai/agent-skills#dev add webrix/pr-review-standards
npx github:webrix-ai/agent-skills#feature/new-skills list

# From specific tag
npx github:webrix-ai/agent-skills#v1.0.0 add webrix/agent-skills@find-skills
```

### List installed skills

```bash
npx github:webrix-ai/agent-skills list
```

### Remove a skill

```bash
npx github:webrix-ai/agent-skills remove skill-name
```

### Install skills globally

Use the `-g` flag to install skills globally to your Cursor skills directory:

```bash
npx github:webrix-ai/agent-skills add webrix/agent-skills@find-skills -g
```

## SDK Usage

Import skills data in your Node.js applications:

```javascript
import { skills, getSkillByName, getSkillBySlug } from '@webrix/skills';

console.log(`Total skills: ${skills.length}`);

const skill = getSkillByName('find-skills');
if (skill) {
  console.log(skill.description);
  console.log(skill.content);
}

const allSkillNames = skills.map(s => s.name);
console.log(allSkillNames);
```

### TypeScript Support

Full TypeScript definitions are included:

```typescript
import { SkillEntry, getSkillBySlug } from '@webrix/skills';

const skill: SkillEntry | null = getSkillBySlug('pr-review-standards');
```

### Available SDK Functions

- `skills` - Array of all available skills
- `getSkillBySlug(slug: string)` - Find a skill by its slug
- `getSkillByName(name: string)` - Find a skill by name or slug
- `getSkillNames()` - Get array of all skill names
- `getSkillSlugs()` - Get array of all skill slugs

### SkillEntry Interface

```typescript
interface SkillEntry {
  readonly slug: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly department: readonly string[];
  readonly useCases: readonly string[];
  readonly toolsRequired: readonly string[];
  readonly agentsCompatible: readonly string[];
  readonly author: string;
  readonly verified: boolean;
  readonly updatedAt: string;
  readonly exampleInput: string;
  readonly exampleOutput: string;
  readonly content: string;
  readonly version: string;
  readonly signature: string;
}
```

## Development

### Build

Generate the SDK from skills:

```bash
npm run build
```

This will:
- Parse all `skills/*/SKILL.md` files
- Extract frontmatter metadata
- Generate `dist/sdk.mjs` and `dist/sdk.d.mts`

### Project Structure

```
agent-skills/
├── bin/
│   └── cli.js          # CLI entry point
├── scripts/
│   └── generate-skills-registry.mjs
├── skills/
│   ├── find-skills/
│   │   └── SKILL.md
│   ├── pr-review-standards/
│   │   └── SKILL.md
│   └── ...
├── dist/               # Generated SDK (created by build)
│   ├── sdk.mjs
│   └── sdk.d.mts
└── package.json
```

## Contributing

1. Add your skill as a directory under `skills/`
2. Create a `SKILL.md` file with proper frontmatter
3. Run `npm run build` to regenerate the SDK
4. Submit a pull request

### Skill Frontmatter Format

```yaml
---
name: skill-slug
displayName: Human Readable Name
tagline: Short one-liner description
description: |
  Longer multiline description
department:
  - Engineering
  - Security
use_cases:
  - Testing
  - Documentation
tools_required:
  - GitHub API
agents_compatible:
  - Claude
  - Cursor
author: Your Name
verified: true
updatedAt: 2026-02-24
version: 1.0.0
exampleInput: |
  Example input
exampleOutput: |
  Example output
---

# Skill Content

Your skill documentation here...
```

## Related Documentation

- [GITHUB_INSTALL.md](./GITHUB_INSTALL.md) - Install directly from GitHub (branches, commits, tags)
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Add your own skills
- [PUBLISHING.md](./PUBLISHING.md) - Publish to npm
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture

## License

MIT
