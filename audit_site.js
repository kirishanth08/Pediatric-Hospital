const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const imageToPages = {};

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const imgRegex = /src=["'](assets\/images\/[^"']+)["']/g;
  const bgRegex = /url\(["']?(assets\/images\/[^"')]+)["']?\)/g;
  
  let match;
  const list = [];
  while ((match = imgRegex.exec(content)) !== null) {
    if (!match[1].endsWith('first_steps_logo.svg') && !match[1].includes('avatar_liam_chen.jpg') && !match[1].includes('avatar_dashboard_dr_carter.jpg')) list.push(match[1]);
  }
  while ((match = bgRegex.exec(content)) !== null) {
    if (!match[1].endsWith('first_steps_logo.svg') && !match[1].includes('avatar_liam_chen.jpg') && !match[1].includes('avatar_dashboard_dr_carter.jpg')) list.push(match[1]);
  }
  
  for (const img of list) {
    if (!imageToPages[img]) imageToPages[img] = [];
    imageToPages[img].push(file);
  }
});

console.log('--- AUDIT: CHECKING FOR DUPLICATE CONTENT IMAGES ---');
let duplicates = 0;
for (const [img, pages] of Object.entries(imageToPages)) {
  const uniquePages = [...new Set(pages)];
  if (uniquePages.length > 1) {
    console.log('DUPLICATE:', img, 'used in:', uniquePages.join(', '));
    duplicates++;
  } else {
    console.log('OK (Unique):', img, '->', uniquePages[0]);
  }
}

if (duplicates === 0) {
  console.log('\nSUCCESS! ZERO duplicate images across all pages.');
} else {
  console.log('\nFAILED: Found ' + duplicates + ' duplicate images.');
}
