import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, readThemeFromWindowName, resolveTheme, withThemeParam, writeThemeToWindowName } from './theme';

describe('resolveTheme', () => {
  it('defaults to dark when nothing is known', () => {
    expect(resolveTheme({})).toBe('dark');
    expect(DEFAULT_THEME).toBe('dark');
  });

  it('prefers the URL over storage and window name', () => {
    expect(resolveTheme({ search: '?theme=light', stored: 'dark', windowName: 'jl-theme=dark' })).toBe('light');
  });

  it('uses storage when the URL says nothing', () => {
    expect(resolveTheme({ search: '', stored: 'light', windowName: 'jl-theme=dark' })).toBe('light');
  });

  it('falls back to the window name when storage is empty', () => {
    expect(resolveTheme({ stored: null, windowName: 'other;jl-theme=light' })).toBe('light');
  });

  it('ignores values that are not a theme', () => {
    expect(resolveTheme({ search: '?theme=sepia', stored: 'blue', windowName: 'jl-theme=pink' })).toBe('dark');
  });
});

describe('window name channel', () => {
  it('reads the theme out of a shared window name', () => {
    expect(readThemeFromWindowName('foo=1;jl-theme=light;bar=2')).toBe('light');
    expect(readThemeFromWindowName('')).toBeNull();
  });

  it('writes the theme without disturbing other values', () => {
    expect(writeThemeToWindowName('foo=1', 'light')).toBe('foo=1;jl-theme=light');
  });

  it('replaces a previous theme instead of appending a second one', () => {
    expect(writeThemeToWindowName('jl-theme=dark;foo=1', 'light')).toBe('foo=1;jl-theme=light');
  });
});

describe('withThemeParam', () => {
  const base = 'https://example.com/work/pance/index.html';

  it('adds the theme to an internal relative link', () => {
    expect(withThemeParam('../../index.html#work', 'light', base)).toBe('../../index.html?theme=light#work');
  });

  it('replaces an existing theme param', () => {
    expect(withThemeParam('/work/pance/?theme=dark', 'light', base)).toBe('/work/pance/?theme=light');
  });

  it('keeps other query params', () => {
    expect(withThemeParam('/a/?x=1', 'dark', base)).toBe('/a/?x=1&theme=dark');
  });

  it.each(['#contact', 'mailto:design@jonathanlerma.com', 'https://github.com/x', '//cdn.example.com/a.js', 'tel:+57'])(
    'leaves %s untouched',
    (href) => {
      expect(withThemeParam(href, 'light', base)).toBe(href);
    },
  );
});
