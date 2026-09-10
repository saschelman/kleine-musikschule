const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images');

async function optimizeImages() {
  console.log('Starting image optimization...');
  const files = fs.readdirSync(imagesDir);
  
  let totalSaved = 0;

  for (const file of files) {
    if (!file.match(/\.(jpe?g|png)$/i)) continue;
    
    const filePath = path.join(imagesDir, file);
    const tempPath = path.join(imagesDir, 'temp_' + file);
    
    const statsBefore = fs.statSync(filePath);
    const sizeBeforeMB = (statsBefore.size / (1024 * 1024)).toFixed(2);
    
    // Skip tiny files (< 100KB)
    if (statsBefore.size < 100 * 1024) continue;

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();
      
      let optimized = image;
      
      // Resize if too large (e.g., width > 1920)
      if (metadata.width > 1920) {
        optimized = optimized.resize(1920, null, { withoutEnlargement: true });
      }

      // Compress based on format
      if (file.match(/\.(jpe?g)$/i)) {
        optimized = optimized.jpeg({ quality: 75, mozjpeg: true });
      } else if (file.match(/\.png$/i)) {
        optimized = optimized.png({ quality: 80, compressionLevel: 9 });
      }

      await optimized.toFile(tempPath);
      
      const statsAfter = fs.statSync(tempPath);
      const sizeAfterMB = (statsAfter.size / (1024 * 1024)).toFixed(2);
      
      // Only replace if it actually saved space
      if (statsAfter.size < statsBefore.size) {
        fs.renameSync(tempPath, filePath);
        const savedMB = ((statsBefore.size - statsAfter.size) / (1024 * 1024)).toFixed(2);
        totalSaved += (statsBefore.size - statsAfter.size);
        console.log(`✅ ${file}: ${sizeBeforeMB}MB -> ${sizeAfterMB}MB (Saved ${savedMB}MB)`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`➖ ${file}: Already optimized (${sizeBeforeMB}MB)`);
      }
    } catch (err) {
      console.error(`❌ Error optimizing ${file}:`, err.message);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }
  
  console.log(`\n🎉 Optimization complete! Total space saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
}

optimizeImages();
