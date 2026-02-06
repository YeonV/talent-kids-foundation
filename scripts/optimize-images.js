/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const AMBASSADORS_DIR = path.join(__dirname, '..', 'public', 'ambassadors');
const QUALITY = 82;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;

async function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function optimizeImage(filePath) {
  const originalSize = await getFileSize(filePath);
  const tempPath = filePath + '.tmp';
  
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    let resized = false;
    let dimensions = `${metadata.width}x${metadata.height}`;
    
    // Resize if dimensions exceed maximum
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      await image
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ 
          quality: QUALITY, 
          progressive: true, 
          mozjpeg: true 
        })
        .toFile(tempPath);
      
      resized = true;
      const resizedMetadata = await sharp(tempPath).metadata();
      dimensions = `${metadata.width}x${metadata.height} → ${resizedMetadata.width}x${resizedMetadata.height}`;
    } else {
      await image
        .jpeg({ 
          quality: QUALITY, 
          progressive: true, 
          mozjpeg: true 
        })
        .toFile(tempPath);
    }
    
    const optimizedSize = await getFileSize(tempPath);
    
    // Only replace if the optimized version is smaller
    if (optimizedSize < originalSize) {
      fs.renameSync(tempPath, filePath);
      const saved = originalSize - optimizedSize;
      const percentage = ((saved / originalSize) * 100).toFixed(1);
      return {
        success: true,
        originalSize,
        optimizedSize,
        saved,
        percentage,
        resized,
        dimensions
      };
    } else {
      // Remove temp file if it's not smaller
      fs.unlinkSync(tempPath);
      return {
        success: false,
        message: 'Already optimized',
        dimensions
      };
    }
  } catch (error) {
    // Clean up temp file if it exists
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    throw error;
  }
}

async function findAllImages(dir) {
  const images = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...await findAllImages(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.jpg')) {
      images.push(fullPath);
    }
  }
  
  return images;
}

async function main() {
  console.log('🖼️  Finding all ambassador images...\n');
  
  const images = await findAllImages(AMBASSADORS_DIR);
  console.log(`Found ${images.length} images to optimize\n`);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let optimizedCount = 0;
  let skippedCount = 0;
  let resizedCount = 0;
  
  for (let i = 0; i < images.length; i++) {
    const imagePath = images[i];
    const relativePath = path.relative(AMBASSADORS_DIR, imagePath);
    
    process.stdout.write(`[${i + 1}/${images.length}] ${relativePath}... `);
    
    try {
      const result = await optimizeImage(imagePath);
      
      if (result.success) {
        totalOriginalSize += result.originalSize;
        totalOptimizedSize += result.optimizedSize;
        optimizedCount++;
        if (result.resized) {
          resizedCount++;
          console.log(`✓ Saved ${formatBytes(result.saved)} (${result.percentage}%) [Resized: ${result.dimensions}]`);
        } else {
          console.log(`✓ Saved ${formatBytes(result.saved)} (${result.percentage}%)`);
        }
      } else {
        skippedCount++;
        console.log(`⊘ ${result.message}`);
      }
    } catch (error) {
      console.log(`✗ Error: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Optimization Summary');
  console.log('='.repeat(60));
  console.log(`Total images processed: ${images.length}`);
  console.log(`Optimized: ${optimizedCount}`);
  console.log(`Resized (>1920px): ${resizedCount}`);
  console.log(`Skipped: ${skippedCount}`);
  
  if (optimizedCount > 0) {
    const totalSaved = totalOriginalSize - totalOptimizedSize;
    const totalPercentage = ((totalSaved / totalOriginalSize) * 100).toFixed(1);
    console.log(`Original size: ${formatBytes(totalOriginalSize)}`);
    console.log(`Optimized size: ${formatBytes(totalOptimizedSize)}`);
    console.log(`Total saved: ${formatBytes(totalSaved)} (${totalPercentage}%)`);
  }
  
  console.log('='.repeat(60));
  console.log('✨ Done!');
}

main().catch(console.error);
