import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Safari shrinks the filtered area once per chained blur(). On a 64 px bar two
// 12 px blurs leave only a thin band in the middle: the rest of the glass shows
// unblurred content and the band reads as a stripe. One blur() per declaration.
const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(astro|css)$/.test(name) && !name.startsWith('brand-scope') ? [path] : [];
  });

describe('backdrop-filter', () => {
  it.each(sourceFiles('src'))('uses at most one blur() per declaration in %s', (file) => {
    const declarations = readFileSync(file, 'utf8').match(/backdrop-filter\s*:[^;]+;/g) ?? [];
    for (const declaration of declarations) {
      expect(declaration.match(/blur\(/g)?.length ?? 0, declaration).toBeLessThanOrEqual(1);
    }
  });
});
