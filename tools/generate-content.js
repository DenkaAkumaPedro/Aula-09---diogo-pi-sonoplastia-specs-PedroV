const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { marked } = require('marked');

const DATA_DIR = path.resolve(__dirname, '..', 'DATA');
const OUT_FILE = path.resolve(__dirname, '..', 'src', 'content.json');

function normalizeKey(key) {
  return key.replace(/\\/g, '/');
}

function stripFrontmatter(raw) {
  const text = String(raw || '');
  if (!text.startsWith('---')) return text;
  const lines = text.split(/\r?\n/);
  if (lines[0].trim() !== '---') return text;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      return lines.slice(i + 1).join('\n').trim();
    }
  }
  return text;
}

function walk(dir, base = '') {
  const results = {};
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const full = path.join(dir, entry.name);
    const rel = normalizeKey(path.join(base, entry.name));
    if (entry.isDirectory()) {
      Object.assign(results, walk(full, rel));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      try {
        if (ext === '.md' || ext === '.txt') {
          const raw = fs.readFileSync(full, 'utf8');
          const body = stripFrontmatter(raw);
          results[rel] = {
            type: 'markdown',
            raw,
            html: marked.parse(body)
          };
        } else if (ext === '.yaml' || ext === '.yml') {
          const raw = fs.readFileSync(full, 'utf8');
          results[rel] = yaml.load(raw);
        } else {
          // For binaries/images, store relative path
          results[rel] = rel;
        }
      } catch (err) {
        console.error('Error reading', full, err);
      }
    }
  }
  return results;
}

function main() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error('DATA directory not found at', DATA_DIR);
    process.exit(1);
  }
  const content = walk(DATA_DIR);
  // Ensure output folder exists
  const outDir = path.dirname(OUT_FILE);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(content, null, 2), 'utf8');
  console.log('Wrote content JSON to', OUT_FILE);
}

main();
