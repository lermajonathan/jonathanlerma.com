import { describe, expect, it } from 'vitest';
import { getWork, nextWork } from './work';

const list = [
  { slug: 'a', title: 'A' },
  { slug: 'b', title: 'B' },
  { slug: 'c', title: 'C' },
];

describe('getWork', () => {
  it('finds a project by slug', () => {
    expect(getWork(list, 'b').title).toBe('B');
  });

  it('fails loudly when the slug does not exist', () => {
    expect(() => getWork(list, 'zzz')).toThrow(/Unknown work slug "zzz"/);
  });
});

describe('nextWork', () => {
  it('returns the following project', () => {
    expect(nextWork(list, 'a').slug).toBe('b');
  });

  it('wraps around after the last project', () => {
    expect(nextWork(list, 'c').slug).toBe('a');
  });
});
