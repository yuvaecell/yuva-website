// One-off script: crops the top ~34% (sky) from the About Us photo.
// Run with: node scripts/crop-about-photo.js
const sharp = require('sharp')
const path = require('path')

const input  = path.join(__dirname, '../src/assets/photos/aboutus.jpg')
const output = path.join(__dirname, '../src/assets/photos/about-us-cropped.jpg')

async function crop() {
  const meta = await sharp(input).metadata()
  const cropTop = Math.round(meta.height * 0.34)
  const cropHeight = meta.height - cropTop

  await sharp(input)
    .extract({ left: 0, top: cropTop, width: meta.width, height: cropHeight })
    .jpeg({ quality: 92 })
    .toFile(output)

  console.log(`Cropped: ${meta.width}x${meta.height} → ${meta.width}x${cropHeight} (removed top ${cropTop}px)`)
  console.log(`Saved to: ${output}`)
}

crop().catch(console.error)
