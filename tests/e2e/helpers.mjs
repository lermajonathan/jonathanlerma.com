// Shared setup for the integration suite: serve dist/ and drive a real browser.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright';

export const DIST = path.resolve('dist');
export const PAGES = ['/', '/work/pance/', '/work/altazor/', '/work/altazor-crm/', '/work/the-signal/', '/404.html'];
export const THEMES = ['dark', 'light'];
export const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 390, height: 844 },
];

const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

/** Resolves a URL path to a file in dist/, the way GitHub Pages does (directories serve index.html). */
export function fileFor(urlPath) {
  let file = path.join(DIST, decodeURIComponent(urlPath.split(/[?#]/)[0]));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  return fs.existsSync(file) ? file : null;
}

export async function startServer() {
  if (!fs.existsSync(DIST)) throw new Error('dist/ not found — run `npm run build` first.');
  const server = http.createServer((req, res) => {
    const file = fileFor(req.url ?? '/');
    if (!file) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((resolve) => server.listen(0, resolve));
  return { origin: `http://localhost:${server.address().port}`, close: () => server.close() };
}

export async function launch() {
  return chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
}

/** A browser context whose pages open with the given theme already chosen. */
export async function contextWithTheme(browser, theme, viewport, options = {}) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce', ...options });
  await context.addInitScript((value) => {
    try {
      localStorage.setItem('jl-theme', value);
    } catch {}
  }, theme);
  return context;
}

/** Scrolls the page top to bottom so lazy images and client:visible islands load. */
export async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
}

export function htmlFiles(dir = DIST) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}
