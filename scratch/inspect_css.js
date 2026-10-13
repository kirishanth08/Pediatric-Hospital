const fs = require('fs');
const css = fs.readFileSync('assets/css/style.css', 'utf8');

function findRules(selector) {
  const regex = new RegExp(`([^}{]*${selector}[^}{]*\\{[^}]*\\})`, 'gi');
  let match;
  while ((match = regex.exec(css)) !== null) {
    console.log('--- FOUND ---');
    console.log(match[1].trim());
  }
}

findRules('hero-grid');
findRules('hero-section');
findRules('hero-sanctuary-card');
findRules('hero-live-badge');
findRules('max-width: 360px');
