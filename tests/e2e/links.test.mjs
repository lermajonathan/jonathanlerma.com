// Every internal link and asset reference in the built site points at a real file.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { DIST, fileFor, htmlFiles } from './helpers.mjs';

const REFERENCE = /\s(?:href|src)="([^"]+)"|\ssrcset="([^"]+)"/g;

function internalReferences(html) {
  const refs = [];
  for (const [, single, srcset] of html.matchAll(REFERENCE)) {
    const values = single ? [single] : srcset.split(',').map((part) => part.trim().split(/\s+/)[0]);
    refs.push(...values.filter((value) => value.startsWith('/') && !value.startsWith('//')));
  }
  return refs;
}

test('internal links and assets resolve', () => {
  const broken = [];
  for (const file of htmlFiles()) {
    const page = '/' + path.relative(DIST, file);
    for (const ref of internalReferences(fs.readFileSync(file, 'utf8'))) {
      if (!fileFor(ref)) broken.push(`${page} → ${ref}`);
    }
  }
  assert.deepEqual(broken, []);
});

test('in-page anchors point at an element with that id', () => {
  const missing = [];
  const home = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const ids = new Set([...home.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id));
  for (const file of htmlFiles()) {
    for (const [, anchor] of fs.readFileSync(file, 'utf8').matchAll(/href="\/?#([^"]+)"/g)) {
      if (!ids.has(anchor)) missing.push(`${path.relative(DIST, file)} → #${anchor}`);
    }
  }
  assert.deepEqual(missing, []);
});
