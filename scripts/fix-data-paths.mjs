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

// Index all disk files in public/
const diskFilesMap = new Map(); // lowercaseRelative -> actualRelative
function indexDisk(d, currentRel = '') {
  fs.readdirSync(d).forEach(item => {
    const p = path.join(d, item);
    const rel = currentRel ? `${currentRel}/${item}` : item;
    if (fs.statSync(p).isDirectory()) {
      indexDisk(p, rel);
    } else {
      diskFilesMap.set(('/' + rel).toLowerCase(), '/' + rel);
    }
  });
}
indexDisk(publicDir);
console.log(`Indexed ${diskFilesMap.size} actual files in public/.\n`);

function convertPathToSanitized(rawUrl) {
  const parts = rawUrl.split('/');
  const sanitizedParts = parts.map((part, idx) => {
    if (!part) return '';
    const isFile = (idx === parts.length - 1);
    return FOLDER_MAP[part] || sanitizeSegment(part, isFile);
  });
  let cleanUrl = sanitizedParts.join('/');

  // If exact cleanUrl is on disk, return it
  if (diskFilesMap.has(cleanUrl.toLowerCase())) {
    return diskFilesMap.get(cleanUrl.toLowerCase());
  }

  // If .png / .jpg extension, check if .webp version exists on disk
  const ext = path.extname(cleanUrl);
  if (ext && ext.toLowerCase() !== '.webp') {
    const webpUrl = cleanUrl.slice(0, -ext.length) + '.webp';
    if (diskFilesMap.has(webpUrl.toLowerCase())) {
      return diskFilesMap.get(webpUrl.toLowerCase());
    }
  }

  // Fuzzy filename search within parent directory on disk
  const dirPath = cleanUrl.substring(0, cleanUrl.lastIndexOf('/'));
  const fileName = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1);

  for (const [lowerDiskPath, actualDiskPath] of diskFilesMap.entries()) {
    if (lowerDiskPath.startsWith(dirPath.toLowerCase())) {
      const diskFileName = actualDiskPath.substring(actualDiskPath.lastIndexOf('/') + 1);
      // match stems
      const diskStem = diskFileName.slice(0, -path.extname(diskFileName).length).toLowerCase();
      const fileStem = fileName.slice(0, -(ext ? ext.length : 0)).toLowerCase();
      if (diskStem === fileStem || diskStem.includes(fileStem) || fileStem.includes(diskStem)) {
        return actualDiskPath;
      }
    }
  }

  return cleanUrl;
}

// Update all src data files
const dataFiles = [
  path.join(rootDir, 'src', 'data', 'projects.ts'),
  path.join(rootDir, 'src', 'data', 'startups.ts'),
  path.join(rootDir, 'src', 'data', 'hero.ts'),
  path.join(rootDir, 'src', 'data', 'experiences.ts'),
  path.join(rootDir, 'src', 'data', 'about.ts')
];

let totalReconciled = 0;

dataFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  const matches = content.match(/"\/[^"]+"/g) || [];

  for (const m of matches) {
    const rawUrl = m.replace(/^"|"$/g, '');
    if (!rawUrl.startsWith('/uni_projects') &&
        !rawUrl.startsWith('/startup-project') &&
        !rawUrl.startsWith('/Start-up project') &&
        !rawUrl.startsWith('/images') &&
        !rawUrl.startsWith('/logo') &&
        !rawUrl.startsWith('/font_title')) {
      continue;
    }

    const sanitizedUrl = convertPathToSanitized(rawUrl);
    if (sanitizedUrl && sanitizedUrl !== rawUrl) {
      content = content.split(`"${rawUrl}"`).join(`"${sanitizedUrl}"`);
      modified = true;
      totalReconciled++;
    }
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`  ✓ Updated references in ${path.relative(rootDir, file)}`);
  }
});

console.log(`\n✅ Reconciled ${totalReconciled} path reference(s) to sanitized disk paths.`);
