const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace mix-blend-multiply with mix-blend-multiply dark:mix-blend-normal
      // Only if it doesn't already have dark:mix-blend-normal
      if (content.includes('mix-blend-multiply') && !content.includes('dark:mix-blend-normal')) {
        content = content.replace(/mix-blend-multiply/g, 'mix-blend-multiply dark:mix-blend-normal');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed', fullPath);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Done fixing mix-blend!');
