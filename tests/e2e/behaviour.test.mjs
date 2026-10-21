// What a visitor does: theme choice carries across pages, nothing errors, pages stay light.
import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { PAGES, VIEWPORTS, launch, scrollThrough, startServer } from './helpers.mjs';

const PAGE_BUDGET_KB = 1200;
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

const themeOf = (page) => page.evaluate(() => document.documentElement.dataset.theme);

test('first visit opens in dark mode', async () => {
  const page = await browser.newPage();
  await page.goto(server.origin + '/');
  assert.equal(await themeOf(page), 'dark');
  await page.close();
});

for (const storage of ['available', 'blocked']) {
  test(`a light-mode choice follows the visitor to other pages (storage ${storage})`, async () => {
    const context = await browser.newContext();
    if (storage === 'blocked') {
      await context.addInitScript(() => {
        Object.defineProperty(window, 'localStorage', {
          get() {
            throw new Error('blocked');
          },
        });
      });
    }
    const page = await context.newPage();
    await page.goto(server.origin + '/');
    await page.click('[data-theme-toggle]');
    assert.equal(await themeOf(page), 'light');

    await page.click('.links a[href*="/work/pance"]');
    await page.waitForLoadState('networkidle');
    assert.equal(await themeOf(page), 'light', 'Pance page');

    await page.click('.wordmark');
    await page.waitForLoadState('networkidle');
    assert.equal(await themeOf(page), 'light', 'back on the home page');
    await context.close();
  });
}

test('inspect mode toggles with the I key and closes with Escape', async () => {
  const page = await browser.newPage();
  await page.goto(server.origin + '/');
  const inspecting = () => page.evaluate(() => document.documentElement.hasAttribute('data-inspect'));
  await page.keyboard.press('i');
  assert.equal(await inspecting(), true);
  assert.equal(await page.getAttribute('[data-inspect-toggle]', 'aria-pressed'), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await inspecting(), false);
  await page.close();
});

test('no page logs a JavaScript error', async () => {
  const errors = [];
  const page = await browser.newPage();
  page.on('pageerror', (error) => errors.push(`${page.url()}: ${error.message}`));
  page.on('console', (message) => message.type() === 'error' && errors.push(`${page.url()}: ${message.text()}`));
  for (const path of PAGES.filter((p) => p !== '/404.html')) {
    await page.goto(server.origin + path, { waitUntil: 'networkidle' });
    await scrollThrough(page);
  }
  await page.close();
  assert.deepEqual(errors, []);
});

test(`every page weighs under ${PAGE_BUDGET_KB} KB on a desktop screen`, async () => {
  const over = [];
  for (const path of PAGES) {
    const page = await browser.newPage({ viewport: VIEWPORTS[0] });
    let bytes = 0;
    page.on('response', async (response) => {
      try {
        bytes += (await response.body()).length;
      } catch {}
    });
    await page.goto(server.origin + path, { waitUntil: 'networkidle' });
    await scrollThrough(page);
    const kb = Math.round(bytes / 1024);
    if (kb > PAGE_BUDGET_KB) over.push(`${path}: ${kb} KB`);
    await page.close();
  }
  assert.deepEqual(over, []);
});

test('content is readable without JavaScript', async () => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(server.origin + '/');
  const hidden = await page.$$eval(
    '[data-reveal]',
    (els) => els.filter((el) => getComputedStyle(el).opacity === '0').length,
  );
  assert.equal(hidden, 0);
  await context.close();
});
