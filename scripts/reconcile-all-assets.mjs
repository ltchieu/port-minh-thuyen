import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const srcDir = path.join(rootDir, 'src');

function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function sanitizeSegment(segment, isFile = false) {
  let ext = '';
  let baseName = segment;

  if (isFile) {
    ext = path.extname(segment);
    baseName = segment.slice(0, -ext.length);
  }

  let clean = removeAccents(baseName)
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-_]+|[-_]+$/g, '')
    .toLowerCase();

  if (!clean) clean = 'file';

  return isFile ? (clean + ext.toLowerCase()) : clean;
}

const FOLDER_MAP = {
  'Art Direction (tên clients + final execution + rationale)': 'art-direction',
  'ICP (tên clients + final executions +pdf link)': 'icp',
  'ICP Final Presentation - GROUP 5 CAPITOL_CHRIS_S FRIDAY CLASS': 'icp-final-presentation',
  'Internship (key insights + presentation pdf + grade)': 'internship',
  'Professional Communication Studio (tên clients + link PDF + điểm số)': 'professional-comm-studio',
  'Story Telling For Advertising': 'storytelling-advertising',
  'TV and Screen Culture (Tên show +link pdf + điểm số)': 'tv-screen-culture',
  'Start-up project': 'startup-project',
  'Carne Gemstone': 'carne-gemstone',
  '1 số concept hình, nội dung caption và hashtag': 'concept-images-captions',
  'Staff member': 'staff-members',
  'The Crystal Journal': 'the-crystal-journal',
  'Feedbacks của khách do đơn tự bán được': 'customer-feedback',
  'Hình ảnh chụp đăng lên page cùng 1 số bài viết tương tác cao chuyển hóa thành đơn ko cần chạy quảng cáo': 'high-engagement-posts',
  'Hoa Học Trò Magazine': 'hoa-hoc-tro-magazine',
  'LocalFashionBrandProjects': 'local-fashion-brand-projects',
  'QuickBrief03': 'quick-brief-03',
  'QuickBrief05': 'quick-brief-05',
  'WhoGivesACrap': 'who-gives-a-crap',
  'quick_brief01': 'quick-brief-01'
};

// Map of canonical old relative path (lowercase, normalized) -> new clean web relative path
const stringReplacementPairs = [];

function sanitizePublicTree(currentDir, currentRelDir = '') {
  const items = fs.readdirSync(currentDir);

  for (const item of items) {
    const fullPath = path.join(currentDir, item);
    const stat = fs.statSync(fullPath);
    const isFile = stat.isFile();

    const oldRelPath = currentRelDir ? `${currentRelDir}/${item}` : item;
    const cleanSegment = FOLDER_MAP[item] || sanitizeSegment(item, isFile);
    const newRelPath = currentRelDir ? `${currentRelDir}/${cleanSegment}` : cleanSegment;

    const newFullPath = path.join(currentDir, cleanSegment);

    if (oldRelPath !== newRelPath) {
      stringReplacementPairs.push({
        oldRel: '/' + oldRelPath,
        newRel: '/' + newRelPath
      });

      if (isFile) {
        fs.copyFileSync(fullPath, newFullPath);
        fs.unlinkSync(fullPath);
      } else {
        if (!fs.existsSync(newFullPath)) {
          fs.mkdirSync(newFullPath, { recursive: true });
        }
        sanitizePublicTree(fullPath, newRelPath);
        // Clean up old dir if empty
        try {
          fs.rmSync(fullPath, { recursive: true, force: true });
        } catch (e) {}
      }
    } else if (!isFile) {
      sanitizePublicTree(fullPath, newRelPath);
    }
  }
}

console.log('🔄 Sanitizing public directory structure...');
sanitizePublicTree(publicDir);
console.log('✅ Public directory structure sanitized.');

// Next, scan all files in public/ to build exact disk map
const allDiskFiles = [];
function collectDiskFiles(d, rel = '') {
  fs.readdirSync(d).forEach(item => {
    const p = path.join(d, item);
    const relP = rel ? `${rel}/${item}` : item;
    if (fs.statSync(p).isDirectory()) {
      collectDiskFiles(p, relP);
    } else {
      allDiskFiles.push('/' + relP);
    }
  });
}
collectDiskFiles(publicDir);

console.log(`Discovered ${allDiskFiles.length} files on disk in public/.`);

// Function to find best matching clean webp/asset path on disk for any code string
function findBestDiskMatch(codePath) {
  let target = codePath.trim();
  if (!target.startsWith('/')) target = '/' + target;

  // Direct match check
  if (allDiskFiles.includes(target)) return target;

  // Check if .webp version exists
  const ext = path.extname(target);
  if (ext && ext.toLowerCase() !== '.webp') {
    const webpVersion = target.slice(0, -ext.length) + '.webp';
    if (allDiskFiles.includes(webpVersion)) return webpVersion;
  }

  // Normalize codePath to sanitized form to compare with disk files
  const parts = target.split('/');
  const cleanParts = parts.map((seg, idx) => {
    if (!seg) return '';
    const isFile = idx === parts.length - 1;
    return FOLDER_MAP[seg] || sanitizeSegment(seg, isFile);
  });
  let sanitizedUrl = cleanParts.join('/');

  if (allDiskFiles.includes(sanitizedUrl)) return sanitizedUrl;

  const sanExt = path.extname(sanitizedUrl);
  if (sanExt && sanExt.toLowerCase() !== '.webp') {
    const sanWebp = sanitizedUrl.slice(0, -sanExt.length) + '.webp';
    if (allDiskFiles.includes(sanWebp)) return sanWebp;
  }

  // Case-insensitive / fuzzy match
  const lowerSan = sanitizedUrl.toLowerCase();
  const found = allDiskFiles.find(f => f.toLowerCase() === lowerSan);
  if (found) return found;

  const lowerSanWebp = (sanExt ? sanitizedUrl.slice(0, -sanExt.length) + '.webp' : sanitizedUrl).toLowerCase();
  const foundWebp = allDiskFiles.find(f => f.toLowerCase() === lowerSanWebp);
  if (foundWebp) return foundWebp;

  return null;
}

// Update all src data files to match exact disk paths
console.log('📝 Reconciling code references in src/data/...');
const dataFiles = [
  path.join(rootDir, 'src', 'data', 'projects.ts'),
  path.join(rootDir, 'src', 'data', 'startups.ts'),
  path.join(rootDir, 'src', 'data', 'hero.ts'),
  path.join(rootDir, 'src', 'data', 'experiences.ts'),
  path.join(rootDir, 'src', 'data', 'about.ts')
];

let totalReconciled = 0;

dataFiles.forEach(dataFile => {
  if (!fs.existsSync(dataFile)) return;
  let content = fs.readFileSync(dataFile, 'utf8');

  // Find all string literals with quotes
  const matches = content.match(/"\/[^"]+"/g) || [];
  let modified = false;

  for (const m of matches) {
    const rawUrl = m.replace(/^"|"$/g, '');
    const matchedDiskFile = findBestDiskMatch(rawUrl);

    if (matchedDiskFile && matchedDiskFile !== rawUrl) {
      content = content.split(`"${rawUrl}"`).join(`"${matchedDiskFile}"`);
      modified = true;
      totalReconciled++;
    }
  }

  if (modified) {
    fs.writeFileSync(dataFile, content, 'utf8');
    console.log(`  ✓ Updated ${path.relative(rootDir, dataFile)}`);
  }
});

console.log(`✅ Successfully reconciled ${totalReconciled} asset reference(s).`);
