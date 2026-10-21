import { describe, expect, it } from 'vitest';
import { clamp01, readingProgress } from './progress';

describe('clamp01', () => {
  it('clamps to the 0–1 range', () => {
    expect(clamp01(-0.5)).toBe(0);
    expect(clamp01(0.25)).toBe(0.25);
    expect(clamp01(3)).toBe(1);
  });
});

describe('readingProgress', () => {
  // An element 1000 px tall; the "reading line" sits at 60 % of an 800 px viewport (480 px).
  it('is 0 before the element reaches the reading line', () => {
    expect(readingProgress({ top: 600, height: 1000, viewport: 800 })).toBe(0);
  });

  it('grows as the element passes the reading line', () => {
    expect(readingProgress({ top: -20, height: 1000, viewport: 800 })).toBeCloseTo(0.5);
  });

  it('is 1 once the whole element has passed', () => {
    expect(readingProgress({ top: -2000, height: 1000, viewport: 800 })).toBe(1);
  });

  it('accepts a custom reading line', () => {
    expect(readingProgress({ top: 0, height: 100, viewport: 100, line: 0.5 })).toBeCloseTo(0.5);
  });

  it('never divides by zero', () => {
    expect(readingProgress({ top: 0, height: 0, viewport: 800 })).toBe(1);
  });
});
