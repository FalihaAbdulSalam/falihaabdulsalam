import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const rootDir = path.resolve(import.meta.dirname, '..');
const distIndexPath = path.join(rootDir, 'dist', 'index.html');
const ssrEntryPath = path.join(rootDir, '.prerender', 'prerender.js');
const ROOT_MARKER = '<div id="root"></div>';

if (!fs.existsSync(distIndexPath)) {
  throw new Error(`prerender: ${distIndexPath} is missing — run "vite build" first.`);
}
if (!fs.existsSync(ssrEntryPath)) {
  throw new Error(`prerender: ${ssrEntryPath} is missing — run the SSR build first.`);
}

const { render } = await import(pathToFileURL(ssrEntryPath).href);
const appHtml = render();

if (typeof appHtml !== 'string' || appHtml.trim().length < 500) {
  throw new Error('prerender: rendered markup looks empty — aborting instead of shipping a blank page.');
}

const template = fs.readFileSync(distIndexPath, 'utf8');
if (!template.includes(ROOT_MARKER)) {
  throw new Error(`prerender: could not find ${ROOT_MARKER} in dist/index.html.`);
}

fs.writeFileSync(
  distIndexPath,
  template.replace(ROOT_MARKER, `<div id="root">${appHtml}</div>`),
  'utf8',
);

console.log(`prerender: injected ${appHtml.length.toLocaleString()} characters into dist/index.html`);
