const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // Backgrounds
  { regex: /bg-white(?!\/)/g, replace: 'bg-white dark:bg-slate-900' },
  { regex: /bg-slate-50/g, replace: 'bg-slate-50 dark:bg-slate-950' },
  { regex: /bg-slate-100/g, replace: 'bg-slate-100 dark:bg-slate-800' },
  { regex: /bg-slate-200/g, replace: 'bg-slate-200 dark:bg-slate-700' },
  // Text colors
  { regex: /text-slate-800/g, replace: 'text-slate-800 dark:text-slate-100' },
  { regex: /text-slate-900/g, replace: 'text-slate-900 dark:text-white' },
  { regex: /text-slate-700/g, replace: 'text-slate-700 dark:text-slate-200' },
  { regex: /text-slate-600/g, replace: 'text-slate-600 dark:text-slate-300' },
  { regex: /text-slate-500/g, replace: 'text-slate-500 dark:text-slate-400' },
  // Borders
  { regex: /border-slate-100/g, replace: 'border-slate-100 dark:border-slate-800' },
  { regex: /border-slate-200/g, replace: 'border-slate-200 dark:border-slate-700' },
  { regex: /border-slate-300/g, replace: 'border-slate-300 dark:border-slate-600' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      for (const { regex, replace } of replacements) {
        // Simple heuristic to avoid duplicating dark: classes if script runs multiple times
        // We will just do a blind replace, but make sure not to replace if already replaced.
        // A safer way is negative lookahead to ensure dark: equivalent isn't right after it, 
        // but for a one-off script, this is fine.
        
        // Let's refine the regex to avoid replacing if it already has the dark mode class attached
        // This is a bit tricky, but since we haven't added them yet, it's safe for the first run.
        content = content.replace(regex, (match) => {
           // check if match is followed by ' dark:'
           return match; // Actually, replace all occurrences of `class="bg-white"` with `class="bg-white dark:bg-slate-900"`
        });
      }
      
      // Let's do a simple string replace for all unique occurrences to avoid regex overlapping issues.
      // Wait, using a string replace with split/join is safer.
      
      let newContent = content;
      
      // A more robust way to add dark mode classes without duplication
      const classMappings = {
        'bg-white': 'dark:bg-slate-900',
        'bg-slate-50': 'dark:bg-slate-950',
        'bg-slate-100': 'dark:bg-slate-800',
        'bg-slate-200': 'dark:bg-slate-700',
        'text-slate-900': 'dark:text-white',
        'text-slate-800': 'dark:text-slate-100',
        'text-slate-700': 'dark:text-slate-200',
        'text-slate-600': 'dark:text-slate-300',
        'text-slate-500': 'dark:text-slate-400',
        'border-slate-100': 'dark:border-slate-800',
        'border-slate-200': 'dark:border-slate-700',
        'border-slate-300': 'dark:border-slate-600'
      };

      // We regex match the class="" or className="" contents
      newContent = newContent.replace(/className=(["'])(.*?)\1/g, (match, quote, classNames) => {
        let classes = classNames.split(/\s+/);
        let newClasses = [...classes];
        
        for (let cls of classes) {
          if (classMappings[cls] && !classes.includes(classMappings[cls])) {
             newClasses.push(classMappings[cls]);
          }
        }
        
        return `className=${quote}${newClasses.join(' ')}${quote}`;
      });
      
      // Also handle template literals className={`...`}
      newContent = newContent.replace(/className=\{`([^`]+)`\}/g, (match, classNames) => {
         let classes = classNames.split(/\s+/);
         let newClasses = [...classes];
         
         for (let cls of classes) {
           // ignore conditional classes or dynamic ones if they perfectly match the key
           if (classMappings[cls] && !classes.includes(classMappings[cls])) {
              newClasses.push(classMappings[cls]);
           }
         }
         return `className={\`${newClasses.join(' ')}\`}`;
      });

      if (originalContent !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

console.log('Starting dark mode codebase update...');
processDirectory(srcDir);
console.log('Done!');
