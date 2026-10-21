// The first script on every page. It must run inline, before the first paint,
// so it can't import ./theme.ts. It re-states the same rules in plain ES5;
// theme-boot.test.ts runs it in a sandbox and checks it agrees with resolveTheme().
import { DEFAULT_THEME, STORAGE_KEY, URL_PARAM } from './theme';

export const THEME_BOOT_SCRIPT = `(function () {
  var root = document.documentElement;
  var isTheme = function (v) { return v === 'light' || v === 'dark'; };
  var theme = null;
  try { theme = new URLSearchParams(location.search).get('${URL_PARAM}'); } catch (e) {}
  if (!isTheme(theme)) { try { theme = localStorage.getItem('${STORAGE_KEY}'); } catch (e) {} }
  if (!isTheme(theme)) {
    var match = /(?:^|;)${STORAGE_KEY}=(light|dark)(?=;|$)/.exec(window.name || '');
    theme = match ? match[1] : '${DEFAULT_THEME}';
  }
  root.dataset.theme = theme;
  root.classList.add('js');
})();`;
