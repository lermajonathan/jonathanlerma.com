// Content integrity: the rules the copy has to obey, checked on every run.
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { work } from './work';
import { trajectory } from './trajectory';
import { lab, proof } from './home';
import { pance } from './pance';
import installed from '@pance/react/package.json';

describe('work', () => {
  it('has unique slugs', () => {
    const slugs = work.map((w) => w.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has a case-study page for every project', () => {
    for (const { slug } of work) expect(fs.existsSync(`src/pages/work/${slug}.astro`), slug).toBe(true);
  });

  it('only shows measured results for shipped work', () => {
    for (const w of work.filter((w) => w.results)) expect(w.status).toBe('Shipped');
  });
});

describe('trajectory', () => {
  it('uses only known tracks', () => {
    for (const t of trajectory) expect(['work', 'education', 'milestone']).toContain(t.track);
  });

  it('has unique titles (they are React keys)', () => {
    const titles = trajectory.map((t) => t.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

describe('facts', () => {
  it('advertises the Pance version that is actually installed', () => {
    expect(pance.version).toBe(installed.version);
    expect(proof[0].value).toBe(installed.version);
  });
});

describe('lab', () => {
  it('links only to secure URLs', () => {
    for (const item of lab) expect(item.url).toMatch(/^https:\/\//);
  });

  it('has an image file for every experiment', () => {
    for (const item of lab) expect(fs.existsSync(`src/assets/img/${item.image}.webp`), item.image).toBe(true);
  });
});
