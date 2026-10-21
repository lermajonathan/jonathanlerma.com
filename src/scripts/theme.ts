// Theme toggle and persistence. The initial theme is set by THEME_BOOT_SCRIPT in <head>.
import { STORAGE_KEY, isTheme, withThemeParam, writeThemeToWindowName, type Theme } from '../lib/theme';

const root = document.documentElement;
const currentTheme = (): Theme => (isTheme(root.dataset.theme) ? root.dataset.theme : 'dark');

const storageWorks = (() => {
  try {
    localStorage.setItem('jl-probe', '1');
    const ok = localStorage.getItem('jl-probe') === '1';
    localStorage.removeItem('jl-probe');
    return ok;
  } catch {
    return false;
  }
})();

/** Only when storage is blocked: carry the choice to the next page in the link itself. */
function carryThemeInLinks(theme: Theme) {
  if (storageWorks) return;
  document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
    link.setAttribute('href', withThemeParam(link.getAttribute('href') ?? '', theme, location.href));
  });
}

function persist(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage blocked: window.name and links still carry it */
  }
  try {
    window.name = writeThemeToWindowName(window.name, theme);
  } catch {
    /* some embedded contexts forbid writing window.name */
  }
  carryThemeInLinks(theme);
}

function syncToggles(theme: Theme) {
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.dataset.mode = theme;
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });
}

function setTheme(theme: Theme) {
  root.dataset.theme = theme;
  persist(theme);
  syncToggles(theme);
}

setTheme(currentTheme());
document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
  button.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
});
