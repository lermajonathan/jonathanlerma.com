import { describe, expect, it } from 'vitest';
import { entriesLabel, filterByTrack, type TrajectoryEntry } from './trajectory';

const entries: TrajectoryEntry[] = [
  { date: '2026', track: 'milestone', title: 'A', text: '' },
  { date: '2024', track: 'education', title: 'B', text: '' },
  { date: '2014', track: 'work', title: 'C', text: '' },
  { date: '2008', track: 'education', title: 'D', text: '' },
];

describe('filterByTrack', () => {
  it('returns everything for "all", in the original order', () => {
    expect(filterByTrack(entries, 'all').map((e) => e.title)).toEqual(['A', 'B', 'C', 'D']);
  });

  it('keeps only the chosen track', () => {
    expect(filterByTrack(entries, 'education').map((e) => e.title)).toEqual(['B', 'D']);
  });
});

describe('entriesLabel', () => {
  it('uses the singular for one entry', () => {
    expect(entriesLabel(1)).toBe('1 entry');
  });

  it('uses the plural otherwise', () => {
    expect(entriesLabel(0)).toBe('0 entries');
    expect(entriesLabel(9)).toBe('9 entries');
  });
});
