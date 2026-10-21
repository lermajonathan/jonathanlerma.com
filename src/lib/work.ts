type HasSlug = { slug: string };

export function getWork<T extends HasSlug>(list: readonly T[], slug: string): T {
  const found = list.find((item) => item.slug === slug);
  if (!found) throw new Error(`Unknown work slug "${slug}"`);
  return found;
}

export function nextWork<T extends HasSlug>(list: readonly T[], slug: string): T {
  const index = list.indexOf(getWork(list, slug));
  return list[(index + 1) % list.length];
}
