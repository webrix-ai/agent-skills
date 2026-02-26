#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const executeCommand = promisify(exec);

const CURSOR_SKILLS_PATH = process.env.CURSOR_SKILLS_PATH || join(process.env.HOME || process.env.USERPROFILE, '.cursor', 'skills');

function showHelp() {
  console.log(`
@webrix/skills - Manage agent skills

USAGE:
  npx github:webrix-ai/agent-skills <command> [options]
  
  Or install globally for shorter commands:
  npm install -g github:webrix-ai/agent-skills
  skills <command> [options]

COMMANDS:
  add <package>     Install a skill from GitHub (format: owner/repo@skill or owner/repo)
  list              List all installed skills
  remove <name>     Remove an installed skill
  help              Show this help message

EXAMPLES:
  npx github:webrix-ai/agent-skills add webrix/pr-review-standards
  npx github:webrix-ai/agent-skills add webrix/agent-skills@find-skills
  npx github:webrix-ai/agent-skills list
  
  Or with global install:
  skills add webrix/pr-review-standards
  skills list

OPTIONS:
  -g, --global      Install to global Cursor skills directory
  -y, --yes         Skip confirmation prompts
  `);
}

async function downloadSkillFromGithub(packageIdentifier, options = {}) {
  const [ownerRepo, skillName] = packageIdentifier.includes('@') 
    ? packageIdentifier.split('@')
    : [packageIdentifier, null];
  
  const [owner, repo] = ownerRepo.split('/');
  
  if (!owner || !repo) {
    throw new Error('Invalid package format. Use: owner/repo or owner/repo@skill-name');
  }

  const targetDirectory = options.global ? CURSOR_SKILLS_PATH : join(process.cwd(), '.cursor', 'skills');
  
  if (!existsSync(targetDirectory)) {
    mkdirSync(targetDirectory, { recursive: true });
  }

  if (skillName) {
    console.log(`Installing skill "${skillName}" from ${owner}/${repo}...`);
    
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/skills/${skillName}/SKILL.md`;
    
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'webrix-skills-cli'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch skill: ${response.statusText}`);
      }

      const data = await response.json();
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      
      const skillDirectory = join(targetDirectory, skillName);
      if (!existsSync(skillDirectory)) {
        mkdirSync(skillDirectory, { recursive: true });
      }
      
      const skillFilePath = join(skillDirectory, 'SKILL.md');
      writeFileSync(skillFilePath, content, 'utf-8');
      
      console.log(`✓ Installed skill "${skillName}" to ${skillDirectory}`);
    } catch (error) {
      console.error(`Error downloading skill: ${error.message}`);
      process.exit(1);
    }
  } else {
    console.log(`Cloning all skills from ${owner}/${repo}...`);
    
    const temporaryDirectory = join(targetDirectory, `temp-${Date.now()}`);
    
    try {
      const cloneUrl = `https://github.com/${owner}/${repo}.git`;
      await executeCommand(`git clone --depth 1 ${cloneUrl} "${temporaryDirectory}"`);
      
      const skillsSourceDirectory = join(temporaryDirectory, 'skills');
      
      if (existsSync(skillsSourceDirectory)) {
        const skills = readdirSync(skillsSourceDirectory, { withFileTypes: true })
          .filter(entry => entry.isDirectory());
        
        for (const skill of skills) {
          const sourceSkillPath = join(skillsSourceDirectory, skill.name);
          const targetSkillPath = join(targetDirectory, skill.name);
          
          cpSync(sourceSkillPath, targetSkillPath, { recursive: true });
          console.log(`✓ Installed skill "${skill.name}"`);
        }
        
        rmSync(temporaryDirectory, { recursive: true, force: true });
        console.log(`\n✓ Installed ${skills.length} skills from ${owner}/${repo}`);
      } else {
        throw new Error('No skills directory found in repository');
      }
    } catch (error) {
      console.error(`Error cloning repository: ${error.message}`);
      
      if (existsSync(temporaryDirectory)) {
        rmSync(temporaryDirectory, { recursive: true, force: true });
      }
      
      process.exit(1);
    }
  }
}

function listSkills(options = {}) {
  const targetDirectory = options.global ? CURSOR_SKILLS_PATH : join(process.cwd(), '.cursor', 'skills');
  
  if (!existsSync(targetDirectory)) {
    console.log('No skills installed.');
    return;
  }

  const skills = readdirSync(targetDirectory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .filter(entry => existsSync(join(targetDirectory, entry.name, 'SKILL.md')));

  if (skills.length === 0) {
    console.log('No skills installed.');
    return;
  }

  console.log(`\nInstalled skills (${skills.length}):\n`);
  skills.forEach(skill => {
    console.log(`  • ${skill.name}`);
  });
  console.log('');
}

function removeSkill(skillName, options = {}) {
  const targetDirectory = options.global ? CURSOR_SKILLS_PATH : join(process.cwd(), '.cursor', 'skills');
  const skillDirectory = join(targetDirectory, skillName);
  
  if (!existsSync(skillDirectory)) {
    console.error(`Skill "${skillName}" not found.`);
    process.exit(1);
  }

  rmSync(skillDirectory, { recursive: true, force: true });
  console.log(`✓ Removed skill "${skillName}"`);
}

async function main() {
  const arguments_ = process.argv.slice(2);
  
  if (arguments_.length === 0 || arguments_[0] === 'help' || arguments_[0] === '--help' || arguments_[0] === '-h') {
    showHelp();
    process.exit(0);
  }

  const command = arguments_[0];
  const isGlobal = arguments_.includes('-g') || arguments_.includes('--global');
  const isYes = arguments_.includes('-y') || arguments_.includes('--yes');
  
  const options = { global: isGlobal, yes: isYes };

  switch (command) {
    case 'add': {
      const packageArgument = arguments_[1];
      if (!packageArgument) {
        console.error('Error: Missing package argument');
        console.log('Usage: webrix-skills add <owner/repo> or <owner/repo@skill-name>');
        process.exit(1);
      }
      await downloadSkillFromGithub(packageArgument, options);
      break;
    }
    case 'list': {
      listSkills(options);
      break;
    }
    case 'remove': {
      const skillName = arguments_[1];
      if (!skillName) {
        console.error('Error: Missing skill name');
        console.log('Usage: webrix-skills remove <skill-name>');
        process.exit(1);
      }
      removeSkill(skillName, options);
      break;
    }
    default: {
      console.error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
    }
  }
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
