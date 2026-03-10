#!/usr/bin/env node
// Simple HTML validation script for RoadMarket
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let errors = 0;
let warnings = 0;

function findHtmlFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    if (entry.isDirectory()) files.push(...findHtmlFiles(full));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function validate(file) {
  const content = fs.readFileSync(file, 'utf-8');
  const rel = path.relative(ROOT, file);

  if (!content.includes('<!DOCTYPE html>')) {
    console.log(`  WARN: ${rel} — missing DOCTYPE`);
    warnings++;
  }
  if (!content.includes('</html>')) {
    console.log(`  ERROR: ${rel} — missing closing </html> tag`);
    errors++;
  }
  if (!content.includes('<meta charset')) {
    console.log(`  WARN: ${rel} — missing charset meta tag`);
    warnings++;
  }
  if (!content.includes('<meta name="viewport"')) {
    console.log(`  WARN: ${rel} — missing viewport meta tag`);
    warnings++;
  }
  if (content.includes('YOUR_PUBLISHABLE_KEY') || content.includes('YOUR_FRONTEND_API')) {
    console.log(`  WARN: ${rel} — contains placeholder API keys`);
    warnings++;
  }
}

console.log('Validating HTML files...\n');
const files = findHtmlFiles(ROOT);
files.forEach(validate);

console.log(`\nResults: ${files.length} file(s), ${errors} error(s), ${warnings} warning(s)`);
if (errors > 0) process.exit(1);
