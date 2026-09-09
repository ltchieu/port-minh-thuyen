import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

const dataFiles = [
  path.join(rootDir, 'src', 'data', 'projects.ts'),
  path.join(rootDir, 'src', 'data', 'startups.ts'),
  path.join(rootDir, 'src', 'data', 'hero.ts'),
  path.join(rootDir, 'src', 'data', 'experiences.ts'),
  path.join(rootDir, 'src', 'data', 'about.ts')
];

let totalChecked = 0;
let missingCount = 0;

for (const file of dataFiles) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  
  // Extract all quoted paths starting with slash
  const matches = content.match(/"\/[^"]+"/g) || [];
  
  for (const m of matches) {
    const relUrl = m.replace(/^"|"$/g, '');
    // Ignore internal routes or external links
    if (!relUrl.startsWith('/uni_projects') && 
        !relUrl.startsWith('/startup-project') && 
        !relUrl.startsWith('/images') && 
        !relUrl.startsWith('/logo') && 
        !relUrl.startsWith('/font_title') &&
        !relUrl.startsWith('/Start-up project')) {
      continue;
    }

    const diskPath = path.join(publicDir, relUrl);
    totalChecked++;
    if (!fs.existsSync(diskPath)) {
      console.error(`❌ MISSING ASSET: ${relUrl} -> disk: ${diskPath}`);
      missingCount++;
    }
  }
}

console.log(`\nVerified ${totalChecked} asset path references.`);
if (missingCount === 0) {
  console.log('✅ ALL 100% OF ASSET PATH REFERENCES EXIST ON DISK!');
} else {
  console.error(`❌ Found ${missingCount} missing asset paths.`);
  process.exit(1);
}
