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

function sanitizeName(name, isFile = false) {
  let ext = '';
  let baseName = name;

  if (isFile) {
    ext = path.extname(name);
    baseName = name.slice(0, -ext.length);
  }

  let cleanBase = removeAccents(baseName)
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-_]+|[-_]+$/g, '')
    .toLowerCase();

  if (!cleanBase) cleanBase = 'file';

  return isFile ? (cleanBase + ext.toLowerCase()) : cleanBase;
}

const FOLDER_OVERRIDES = {
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

const fileEntries = [];

function walk(dir, currentRelDir = '') {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    const isFile = stat.isFile();

    const oldRelPath = currentRelDir ? `${currentRelDir}/${item}` : item;
    const cleanSegment = FOLDER_OVERRIDES[item] || sanitizeName(item, isFile);
    const newRelPath = currentRelDir ? `${currentRelDir}/${cleanSegment}` : cleanSegment;

    if (isFile) {
      fileEntries.push({
        oldRel: '/' + oldRelPath,
        newRel: '/' + newRelPath,
        oldFull: fullPath,
        newFull: path.join(publicDir, newRelPath.replace(/\//g, path.sep))
      });
    } else {
      walk(fullPath, newRelPath);
    }
  }
}

function runSanitization() {
  console.log('🔍 Collecting all files in public/...');
  walk(publicDir);

  console.log(`Found ${fileEntries.length} files in public/.\n`);

  // Build replacement map for src code references
  const urlReplacements = new Map();

  for (const entry of fileEntries) {
    urlReplacements.set(entry.oldRel, entry.newRel);

    // Also support matching non-webp extension versions if code still referenced png/jpg
    const ext = path.extname(entry.oldRel);
    if (ext) {
      const stem = entry.oldRel.slice(0, -ext.length);
      const newExt = path.extname(entry.newRel);
      const newStem = entry.newRel.slice(0, -newExt.length);

      // Map original un-webp'd paths (e.g. .png, .jpg) to clean .webp path
      ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG', '.JPG'].forEach(origExt => {
        urlReplacements.set(stem + origExt, entry.newRel);
      });
    }
  }

  // Step 1: Copy files to new clean paths & remove old ones
  console.log('📁 Copying assets to clean sanitized paths...');
  let movedCount = 0;

  for (const entry of fileEntries) {
    if (entry.oldFull === entry.newFull) continue;

    const targetDir = path.dirname(entry.newFull);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.copyFileSync(entry.oldFull, entry.newFull);
    fs.unlinkSync(entry.oldFull);
    movedCount++;
  }
  console.log(`  ✓ Moved ${movedCount} files to clean paths.`);

  // Step 2: Remove old empty directories in public/
  console.log('🧹 Cleaning up old empty directories...');
  function removeEmptyDirs(dir) {
    if (!fs.existsSync(dir)) return;
    let items = fs.readdirSync(dir);
    for (const item of items) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) {
        removeEmptyDirs(full);
      }
    }
    items = fs.readdirSync(dir);
    if (items.length === 0 && dir !== publicDir) {
      try {
        fs.rmdirSync(dir);
      } catch (e) {}
    }
  }
  removeEmptyDirs(publicDir);

  // Step 3: Update source files in src/
  console.log('\n📝 Updating code references in src/...');
  const srcFiles = [];
  function getSrcFiles(d) {
    fs.readdirSync(d).forEach((f) => {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) getSrcFiles(p);
      else if (['.ts', '.tsx', '.js', '.jsx', '.css', '.json', '.html', '.md'].includes(path.extname(p))) {
        srcFiles.push(p);
      }
    });
  }
  getSrcFiles(srcDir);

  let updatedCount = 0;
  const sortedOldUrls = Array.from(urlReplacements.keys()).sort((a, b) => b.length - a.length);

  for (const srcFile of srcFiles) {
    let content = fs.readFileSync(srcFile, 'utf8');
    let modified = false;

    for (const oldUrl of sortedOldUrls) {
      const newUrl = urlReplacements.get(oldUrl);
      if (content.includes(oldUrl)) {
        content = content.split(oldUrl).join(newUrl);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(srcFile, content, 'utf8');
      console.log(`  ✓ Updated references in ${path.relative(rootDir, srcFile)}`);
      updatedCount++;
    }
  }

  console.log(`✅ Updated ${updatedCount} source code files.\n`);
}

runSanitization();
