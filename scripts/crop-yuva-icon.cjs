// One-off script — run once: node scripts/crop-yuva-icon.cjs
// Crops YuvaSSCBS_Logo_3.png down to just the circular icon mark,
// removing the "YUVA / SSCBS" text that sits below.
const sharp = require('sharp')
const path = require('path')

const input = path.resolve(__dirname, '../src/assets/logos/YuvaSSCBS_Logo_3.png')
const output = path.resolve(__dirname, '../src/assets/logos/yuva-icon-only.png')

sharp(input)
  .extract({ left: 65, top: 3, width: 370, height: 370 })
  .resize(300, 300, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toFile(output)
  .then(() => console.log('Saved:', output))
  .catch(err => { console.error(err); process.exit(1) })
