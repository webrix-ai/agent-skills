# @webrix/skills

A collection of agent skills for AI assistants.

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
