import { describe, expect, it } from 'vitest';
import { formatCount, spellOut } from './format';

describe('formatCount', () => {
  it('groups thousands the way the site is written (English)', () => {
    expect(formatCount(1027)).toBe('1,027');
    expect(formatCount(947)).toBe('947');
  });
});

describe('spellOut', () => {
  it('writes small counts as words, capitalised for a sentence start', () => {
    expect(spellOut(6)).toBe('Six');
    expect(spellOut(1)).toBe('One');
  });

  it('falls back to digits above ten', () => {
    expect(spellOut(12)).toBe('12');
  });
});
