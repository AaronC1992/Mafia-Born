/**
 * version-bump.js -- Bumps the game version in all three locations at once.
 *
 * Usage:
 *   node version-bump.js 1.39.0
 *   npm run bump -- 1.39.0
 *
 * Updates:
 *   1. package.json        -> "version": "X.Y.Z"
 *   2. game.js             -> const CURRENT_VERSION = 'X.Y.Z';
 *   3. index.html          -> all ?v=X.Y.Z cache-bust params
 */

const fs = require('fs');
const path = require('path');

const newVersion = process.argv[2];
if (!newVersion || !/^\d+\.\d+\.\d+$/.test(newVersion)) {
  console.error('Usage: node version-bump.js <major.minor.patch>');
  console.error('Example: node version-bump.js 1.39.0');
  process.exit(1);
}

const root = __dirname;
let changed = 0;

// 1. package.json
const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const oldPkg = pkg.version;
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log(`  package.json: ${oldPkg} -> ${newVersion}`);
changed++;

// 2. game.js -- CURRENT_VERSION
const gamePath = path.join(root, 'game.js');
let game = fs.readFileSync(gamePath, 'utf8');
const versionRe = /const CURRENT_VERSION = '[^']+';/;
if (versionRe.test(game)) {
  game = game.replace(versionRe, `const CURRENT_VERSION = '${newVersion}';`);
  fs.writeFileSync(gamePath, game, 'utf8');
  console.log(`  game.js CURRENT_VERSION -> ${newVersion}`);
  changed++;
} else {
  console.warn('  WARNING: Could not find CURRENT_VERSION in game.js');
}

// 3. index.html -- all ?v= cache-bust params
const htmlPath = path.join(root, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const cacheBustRe = /\?v=[\d.]+/g;
const matches = html.match(cacheBustRe);
if (matches && matches.length > 0) {
  html = html.replace(cacheBustRe, `?v=${newVersion}`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`  index.html: updated ${matches.length} cache-bust param(s) -> ?v=${newVersion}`);
  changed++;
} else {
  console.warn('  WARNING: No ?v= params found in index.html');
}

console.log(`\nDone! Updated ${changed} file(s) to v${newVersion}.`);
