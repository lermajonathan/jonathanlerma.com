import { describe, expect, it } from 'vitest';
import { mailtoLink } from './contact';

describe('mailtoLink', () => {
  it('builds a mailto with an encoded subject', () => {
    expect(mailtoLink('design@jonathanlerma.com', 'Design system project')).toBe(
      'mailto:design@jonathanlerma.com?subject=Design%20system%20project',
    );
  });

  it('encodes characters that would break the query', () => {
    expect(mailtoLink('a@b.co', 'Q&A: roles?')).toBe('mailto:a@b.co?subject=Q%26A%3A%20roles%3F');
  });
});
