// Renders Open Graph images (1200×630) from the built pages' heroes.
// Run after `astro build`: node scripts/og.mjs
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = 'dist';
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};
const srv = http
  .createServer((q, r) => {
    let p = path.join(root, decodeURIComponent(q.url.split('?')[0]));
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
    if (!fs.existsSync(p)) {
      r.writeHead(404);
      return r.end();
    }
    r.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' });
    fs.createReadStream(p).pipe(r);
  })
  .listen(0);
await new Promise((r) => srv.on('listening', r));
const port = srv.address().port;
const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
});
const pages = {
  default: '/',
  pance: '/work/pance/',
  altazor: '/work/altazor/',
  'altazor-crm': '/work/altazor-crm/',
  'the-signal': '/work/the-signal/',
};
fs.mkdirSync('public/og', { recursive: true });
for (const [name, url] of Object.entries(pages)) {
  const pg = await ctx.newPage();
  await pg.goto(`http://localhost:${port}${url}`, { waitUntil: 'networkidle' });
  await pg.addStyleTag({
    content:
      '.nav,.crumbs,.case-links,.case-meta,.hero-cta,.hero-meta,.proof{display:none!important} body::before{display:none} .hero{padding-top:56px!important} .case-hero{padding-top:64px!important}' +
      (name === 'default' ? '' : ' .case-intro{margin-top:28px!important}'),
  });
  await pg.waitForTimeout(700);
  await pg.screenshot({ path: `public/og/${name}.png` });
  await pg.close();
}
await b.close();
srv.close();
console.log('og images written');
