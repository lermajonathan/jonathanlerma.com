import vm from 'node:vm';
import { describe, expect, it } from 'vitest';
import { THEME_BOOT_SCRIPT } from './theme-boot';
import { resolveTheme } from './theme';

/** Runs the inline boot script in a sandbox and returns the theme it set. */
function runBoot({ search = '', stored = null as string | null, windowName = '', storageThrows = false }) {
  const root = { dataset: {} as Record<string, string>, classList: { add: (c: string) => (root.dataset.cls = c) } };
  const localStorage = {
    getItem: () => {
      if (storageThrows) throw new Error('blocked');
      return stored;
    },
  };
  vm.runInNewContext(THEME_BOOT_SCRIPT, {
    document: { documentElement: root },
    location: { search },
    localStorage,
    window: { name: windowName },
    URLSearchParams,
  });
  return root;
}

const cases = [
  {},
  { search: '?theme=light' },
  { search: '?theme=nope', stored: 'light' },
  { stored: 'light' },
  { stored: 'dark', windowName: 'jl-theme=light' },
  { windowName: 'x=1;jl-theme=light' },
  { storageThrows: true, windowName: 'jl-theme=light' },
  { storageThrows: true },
];

describe('THEME_BOOT_SCRIPT', () => {
  it.each(cases)('agrees with resolveTheme for %o', (input) => {
    const expected = resolveTheme({
      search: input.search,
      stored: input.storageThrows ? null : (input.stored ?? null),
      windowName: input.windowName,
    });
    expect(runBoot(input).dataset.theme).toBe(expected);
  });

  it('marks the document as having JavaScript', () => {
    expect(runBoot({}).dataset.cls).toBe('js');
  });
});
