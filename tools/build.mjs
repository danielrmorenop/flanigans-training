/*
  build.mjs — makes the one-file version of the study hub.

  Run from the flanigans-study-site folder:   node tools/build.mjs
  Output:                                    Flanigans-Study-Hub-ONE-FILE.html

  The folder version (index.html + styles.css + app.js + data/day1-7.js) is the one to edit.
  Re-run this after any content change so the single file stays in sync.
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(SITE, 'Flanigans-Study-Hub-ONE-FILE.html');

const read = f => fs.readFileSync(path.join(SITE, f), 'utf8');
const inline = s => s.replace(/<\/script/gi, '<\\/script');

let html = read('index.html');

html = html.replace(/<link rel="stylesheet" href="([^"]+)">/, (_, href) => `<style>\n${read(href)}\n</style>`);
html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) => `<script>\n${inline(read(src))}\n</script>`);

if (/<link rel="stylesheet"|<script src=/.test(html)) {
  console.error('WARNING: something was not inlined. Check the tags in index.html.');
}

fs.writeFileSync(OUT, html);
const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`wrote ${path.basename(OUT)}  (${kb} KB, single file, works offline)`);
