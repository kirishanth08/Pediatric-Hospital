const fs = require('fs');

const htmlFiles = ['index.html', 'services.html', 'about.html', 'doctors.html', 'contact.html', 'appointment.html', 'blog.html', 'dashboard.html'];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Check for inline styles with fixed widths
  const matches = content.match(/style="[^"]*(width:\s*[3-9]\d{2}px|min-width:\s*[3-9]\d{2}px)[^"]*"/gi);
  if (matches) {
    console.log(`${file} has large inline widths:`, matches);
  }
});
