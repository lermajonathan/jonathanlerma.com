// Theme rules for the whole site.
// Dark is the default. A visitor's choice travels between pages through
// three channels, in order of priority: the URL (?theme=), localStorage,
// and window.name (which survives same-tab navigation even when storage
// is blocked, e.g. inside an embedded preview).

export type Theme = 'light' | 'dark';

export const DEFAULT_THEME: Theme = 'dark';
export const STORAGE_KEY = 'jl-theme';
export const URL_PARAM = 'theme';

const WINDOW_NAME_ENTRY = new RegExp(`(?:^|;)${STORAGE_KEY}=(light|dark)(?=;|$)`);
const EXTERNAL_OR_FRAGMENT = /^(#|[a-z][a-z0-9+.-]*:|\/\/)/i;

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

export function resolveTheme(sources: { search?: string; stored?: string | null; windowName?: string }): Theme {
  const fromUrl = new URLSearchParams(sources.search ?? '').get(URL_PARAM);
  if (isTheme(fromUrl)) return fromUrl;
  if (isTheme(sources.stored)) return sources.stored;
  return readThemeFromWindowName(sources.windowName ?? '') ?? DEFAULT_THEME;
}

export function readThemeFromWindowName(windowName: string): Theme | null {
  const match = WINDOW_NAME_ENTRY.exec(windowName);
  return match ? (match[1] as Theme) : null;
}

export function writeThemeToWindowName(windowName: string, theme: Theme): string {
  const others = windowName.split(';').filter((entry) => entry !== '' && !entry.startsWith(`${STORAGE_KEY}=`));
  return [...others, `${STORAGE_KEY}=${theme}`].join(';');
}

/** Adds ?theme= to an internal link. External links, fragments and mail/tel links are returned unchanged. */
export function withThemeParam(href: string, theme: Theme, baseUrl: string): string {
  if (EXTERNAL_OR_FRAGMENT.test(href)) return href;
  const url = new URL(href, baseUrl);
  url.searchParams.set(URL_PARAM, theme);
  const [pathPart] = href.split(/[?#]/);
  return `${pathPart}${url.search}${url.hash}`;
}
