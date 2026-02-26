#!/usr/bin/env node

/**
 * Example: Using @webrix/skills installed from GitHub
 * 
 * Install: npm install github:webrix-ai/agent-skills
 * Or specific branch: npm install github:webrix-ai/agent-skills#dev
 */

import { skills, getSkillByName, getSkillBySlug, getSkillNames } from '@webrix/skills';

console.log('=== Using @webrix/skills from GitHub ===\n');

// Example 1: Get total skills
console.log(`Total skills available: ${skills.length}\n`);

// Example 2: List all skill names
console.log('All skills:');
getSkillNames().forEach((name, index) => {
  console.log(`  ${index + 1}. ${name}`);
});
console.log('');

// Example 3: Get a specific skill by slug
const findSkill = getSkillBySlug('find-skills');
if (findSkill) {
  console.log('--- Skill: find-skills ---');
  console.log(`Name: ${findSkill.name}`);
  console.log(`Author: ${findSkill.author}`);
  console.log(`Description: ${findSkill.description}`);
  console.log('');
}

// Example 4: Filter skills by department
const engineeringSkills = skills.filter(skill => 
  skill.department.includes('Engineering')
);
console.log(`Engineering skills: ${engineeringSkills.length}`);
engineeringSkills.slice(0, 3).forEach(skill => {
  console.log(`  - ${skill.name}`);
});
console.log('');

// Example 5: Search by use case
const securitySkills = skills.filter(skill =>
  skill.useCases.some(useCase => 
    useCase.toLowerCase().includes('security')
  )
);
console.log(`Security-related skills: ${securitySkills.length}`);
console.log('');

// Example 6: Get verified skills
const verifiedSkills = skills.filter(skill => skill.verified);
console.log(`Verified skills: ${verifiedSkills.length}/${skills.length}`);
console.log('');

// Example 7: Export to JSON
console.log('Skills can be exported to JSON for other uses:');
const skillsCatalog = skills.map(skill => ({
  name: skill.name,
  slug: skill.slug,
  tagline: skill.tagline,
  verified: skill.verified
}));
console.log(JSON.stringify(skillsCatalog.slice(0, 2), null, 2));

console.log('\n✅ Successfully loaded skills from GitHub!');
