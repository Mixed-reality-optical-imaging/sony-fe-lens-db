import fs from 'node:fs';
import path from 'node:path';

// Preserve upstream notices verbatim for the runtime packages in the lockfile.
const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const blocks = [
  'THIRD-PARTY NOTICES / 第三方许可声明',
  'Runtime dependency notices from the installed, locked package versions.\nThird-party packages retain their own licenses. Regenerate after npm ci or dependency updates with npm run licenses:generate.',
];
let count = 0;
for (const [directory, entry] of Object.entries(lock.packages)) {
  if (!directory || entry.dev) continue;
  const pkg = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));
  if (pkg.version !== entry.version) throw new Error(`Version mismatch: ${directory}`);
  const notices = fs.readdirSync(directory).filter((name) => /^(licen[sc]e|copying|notice)(\.|$)/i.test(name));
  if (!notices.length) throw new Error(`Missing license notice: ${directory}`);
  blocks.push(`${'='.repeat(72)}\n${pkg.name} ${pkg.version} — ${entry.license ?? 'See notice'}\nhttps://www.npmjs.com/package/${pkg.name}`);
  for (const file of notices) blocks.push(`${file}\n\n${fs.readFileSync(path.join(directory, file), 'utf8').trim()}`);
  count += 1;
}
fs.writeFileSync('public/THIRD_PARTY_NOTICES.txt', blocks.join('\n\n') + '\n');
console.log(`Preserved license notices for ${count} runtime packages.`);
