const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

async function generateFavicons() {
  console.log('🎨 Generating favicons from logo.png...\n');
  
  const logoPath = path.join(__dirname, '../public/logo.png');
  
  // Check if logo exists
  if (!fs.existsSync(logoPath)) {
    console.error('❌ Logo file not found at:', logoPath);
    process.exit(1);
  }

  try {
    // Generate different sizes
    for (const { size, name } of sizes) {
      const outputPath = path.join(__dirname, '../public', name);
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (32x32 for compatibility)
    const faviconPath = path.join(__dirname, '../public/favicon.ico');
    await sharp(logoPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(faviconPath);
    console.log(`✓ Generated favicon.ico (32x32)`);

    console.log('\n✅ All favicons generated successfully!');
    console.log('\n📁 Generated files:');
    console.log('   - favicon.ico');
    sizes.forEach(({ name }) => console.log(`   - ${name}`));
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
