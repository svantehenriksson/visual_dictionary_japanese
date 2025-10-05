#!/usr/bin/env node
/*
  Generates src/topics.generated.js by scanning images in public/* subfolders.
  - Includes only image files (png, jpg, jpeg, webp, gif, jfif, svg)
  - Each subfolder under public becomes a topic
  - English comes from filenames (hyphens/underscores to spaces)
  - Japanese placeholder mirrors English; edit later if needed
*/

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'public');
const srcDir = path.join(projectRoot, 'src');
const outFile = path.join(srcDir, 'topics.generated.js');

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.jfif', '.svg']);

function isImage(file) {
  return IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase());
}

function toEnglishName(basename) {
  return basename
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function toTitle(str) {
  return str.replace(/\b\w/g, (m) => m.toUpperCase());
}

function buildTopicNameFromFolder(folder) {
  // Simple English-only topic name from folder name; edit later as needed.
  return `${toTitle(folder)} — Auto`;
}

function main() {
  if (!fs.existsSync(publicDir)) {
    console.error('public directory not found at', publicDir);
    process.exit(1);
  }

  const entries = fs.readdirSync(publicDir, { withFileTypes: true });
  const folders = entries.filter((e) => e.isDirectory());

  const topics = [];

  for (const dirent of folders) {
    const folder = dirent.name;

    // Skip CRA/system folders that are not vocabulary topics
    if (['static'].includes(folder)) continue;

    const folderAbs = path.join(publicDir, folder);
    const files = fs.readdirSync(folderAbs, { withFileTypes: true })
      .filter((f) => f.isFile() && isImage(f.name))
      .map((f) => f.name)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    if (files.length === 0) continue;

    const wordsAndImages = files.map((file) => {
      const base = path.parse(file).name; // without extension
      const en = toEnglishName(base);
      return {
        en,
        fi: en, // placeholder for Japanese; edit manually after generation
        img: `${folder}/${file}`,
      };
    });

    topics.push({
      name: buildTopicNameFromFolder(folder),
      wordsAndImages,
    });
  }

  const header = `// AUTO-GENERATED FILE. Do not edit directly.\n// Run: npm run gen:topics\n\n`;
  const contents = `${header}export const generatedTopics = ${JSON.stringify(topics, null, 2)};\n`;

  fs.writeFileSync(outFile, contents, 'utf8');
  console.log(`Wrote ${outFile} with ${topics.length} topics.`);
}

main();


