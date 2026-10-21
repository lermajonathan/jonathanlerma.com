// WCAG 2.2 AA (plus axe best practices) on every page, theme and viewport.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { after, before, test } from 'node:test';
import { PAGES, THEMES, VIEWPORTS, contextWithTheme, launch, scrollThrough, startServer } from './helpers.mjs';

const axeSource = fs.readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
let server;
let browser;

before(async () => {
  server = await startServer();
  browser = await launch();
});
after(async () => {
  await browser?.close();
  server?.close();
});

for (const theme of THEMES) {
  for (const viewport of VIEWPORTS) {
    test(`no axe violations · ${theme} · ${viewport.name}`, async () => {
      const context = await contextWithTheme(browser, theme, viewport);
      const failures = [];
      for (const path of PAGES) {
        const page = await context.newPage();
        await page.goto(server.origin + path, { waitUntil: 'networkidle' });
        await scrollThrough(page);
        await page.addScriptTag({ content: axeSource });
        const violations = await page.evaluate(
          async (tags) => (await window.axe.run(document, { runOnly: { type: 'tag', values: tags } })).violations,
          TAGS,
        );
        for (const v of violations)
          failures.push(`${path}: ${v.id} (${v.nodes.length}) ${v.nodes[0]?.target.join(' ')}`);
        await page.close();
      }
      await context.close();
      assert.deepEqual(failures, []);
    });
  }
}
