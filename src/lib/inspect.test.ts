import { describe, expect, it } from 'vitest';
import { inspectKeyAction } from './inspect';

const key = (k: string, extra: Partial<Parameters<typeof inspectKeyAction>[0]> = {}) =>
  inspectKeyAction({ key: k, inspecting: false, typing: false, modifier: false, ...extra });

describe('inspectKeyAction', () => {
  it('toggles with I, in either case', () => {
    expect(key('i')).toBe('toggle');
    expect(key('I')).toBe('toggle');
  });

  it('closes with Escape, but only while inspecting', () => {
    expect(key('Escape', { inspecting: true })).toBe('close');
    expect(key('Escape')).toBeNull();
  });

  it('stays out of the way while the visitor types', () => {
    expect(key('i', { typing: true })).toBeNull();
  });

  it('ignores browser shortcuts such as Cmd+I', () => {
    expect(key('i', { modifier: true })).toBeNull();
  });

  it('ignores every other key', () => {
    expect(key('a')).toBeNull();
  });
});
