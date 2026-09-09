import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// CLI Arguments
const args = process.argv.slice(2);
const deleteOriginal = args.includes('--delete-original');
const updateRefs = args.includes('--update-refs');

// Parse quality option e.g. --quality=80 or --quality 80
let quality = 80;
const qualityArg = args.find(arg => arg.startsWith('--quality='));
if (qualityArg) {
  quality = parseInt(qualityArg.split('=')[1], 10) || 80;
} else {
  const qualityIdx = args.indexOf('--quality');
  if (qualityIdx !== -1 && args[qualityIdx + 1]) {
    quality = parseInt(args[qualityIdx + 1], 10) || 80;
  }
}

// Target directories to search for images
const targetDirs = [
  path.join(rootDir, 'public'),
  path.join(rootDir, 'src')
];

// File extensions to convert
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.tif']);

// Helper: Format bytes to human readable string
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Recursively find files matching extension check
function findImageFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip ignored directories
      if (['node_modules', 'dist', '.git'].includes(file)) continue;
      findImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        fileList.push(filePath);
      }
    }
  }

  return fileList;
}

// Helper to replace image references in source files
function updateCodeReferences(convertedMap) {
  console.log('\n🔄 Updating image references in src/...');
  const srcDir = path.join(rootDir, 'src');
  const srcFiles = [];

  function findSrcFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        findSrcFiles(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json', '.html', '.md'].includes(ext)) {
          srcFiles.push(filePath);
        }
      }
    }
  }

  findSrcFiles(srcDir);

  let updatedCount = 0;

  for (const srcFile of srcFiles) {
    let content = fs.readFileSync(srcFile, 'utf8');
    let modified = false;

    for (const [oldRelPath, newRelPath] of convertedMap.entries()) {
      // Escape special characters for regex
      const escapedOldPath = oldRelPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedOldPath, 'g');

      if (regex.test(content)) {
        content = content.replace(regex, newRelPath);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(srcFile, content, 'utf8');
      const relativeSrc = path.relative(rootDir, srcFile);
      console.log(`  ✓ Updated references in: ${relativeSrc}`);
      updatedCount++;
    }
  }

  console.log(`✅ Updated ${updatedCount} source files with new .webp references.`);
}

async function convertImages() {
  console.log('🚀 Starting Image to WebP Conversion...');
  console.log(`⚙️ Options: Quality=${quality}, Delete Original=${deleteOriginal}, Update Code References=${updateRefs}\n`);

  let allImages = [];
  for (const dir of targetDirs) {
    findImageFiles(dir, allImages);
  }

  if (allImages.length === 0) {
    console.log('✨ No images found to convert.');
    return;
  }

  console.log(`Found ${allImages.length} image(s) to convert:\n`);

  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  let convertedCount = 0;
  let errorCount = 0;

  const convertedMap = new Map(); // Maps old relative path -> new relative webp path

  for (const imgPath of allImages) {
    const ext = path.extname(imgPath);
    const webpPath = imgPath.slice(0, -ext.length) + '.webp';
    const relativeOld = path.relative(rootDir, imgPath).replace(/\\/g, '/');
    const relativeNew = path.relative(rootDir, webpPath).replace(/\\/g, '/');

    // Store reference mapping for public files (e.g. "images/pic.png" or "/images/pic.png")
    // Also store filename-based replacements
    const publicOld = relativeOld.startsWith('public/') ? relativeOld.substring(7) : relativeOld;
    const publicNew = relativeNew.startsWith('public/') ? relativeNew.substring(7) : relativeNew;
    convertedMap.set(publicOld, publicNew);
    convertedMap.set('/' + publicOld, '/' + publicNew);
    convertedMap.set(path.basename(imgPath), path.basename(webpPath));

    try {
      const origStat = fs.statSync(imgPath);
      const origSize = origStat.size;

      // Perform sharp conversion
      await sharp(imgPath)
        .webp({ quality })
        .toFile(webpPath);

      const webpStat = fs.statSync(webpPath);
      const webpSize = webpStat.size;

      totalOriginalSize += origSize;
      totalWebpSize += webpSize;
      convertedCount++;

      const savings = origSize > webpSize ? (((origSize - webpSize) / origSize) * 100).toFixed(1) : 0;
      console.log(`  [${convertedCount}/${allImages.length}] ${relativeOld}`);
      console.log(`     └─ ${formatBytes(origSize)} ➔ ${formatBytes(webpSize)} (${savings}% saved)`);

      if (deleteOriginal && imgPath !== webpPath) {
        fs.unlinkSync(imgPath);
      }
    } catch (err) {
      errorCount++;
      console.error(`  ❌ Failed to convert ${relativeOld}:`, err.message);
    }
  }

  console.log('\n=================== Summary ===================');
  console.log(`Total images processed: ${convertedCount}`);
  if (errorCount > 0) console.log(`Errors: ${errorCount}`);
  console.log(`Original total size: ${formatBytes(totalOriginalSize)}`);
  console.log(`WebP total size:     ${formatBytes(totalWebpSize)}`);

  const totalSaved = totalOriginalSize - totalWebpSize;
  const totalSavingsPct = totalOriginalSize > 0 ? ((totalSaved / totalOriginalSize) * 100).toFixed(1) : 0;
  console.log(`Total space saved:   ${formatBytes(Math.max(0, totalSaved))} (${totalSavingsPct}%)`);
  console.log('===============================================\n');

  if (updateRefs) {
    updateCodeReferences(convertedMap);
  }
}

convertImages().catch((err) => {
  console.error('Fatal error during image conversion:', err);
  process.exit(1);
});
