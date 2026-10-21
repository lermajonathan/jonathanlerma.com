// Pure functions behind scripts/brand-scope.mjs (no file system access here).
//
// Problem: CSS custom properties resolve where they are declared. Pance declares
// `--pance-color-fg-brand: var(--pance-color-aqua-700)` on :root, so overriding
// `--pance-color-aqua-700` on a child element changes nothing. To let one
// attribute swap the brand ramp, every token that (transitively) aliases the
// aqua ramp must be re-declared on the scoped element as well.

const BLOCK = /([^{}]+)\{([^{}]*)\}/g;
const DECLARATION = /(--[a-z0-9-]+)\s*:\s*([^;}]+)/g;
const VAR_REFERENCE = /var\((--[a-z0-9-]+)/g;
const ROOT_SELECTOR = /(^|,)\s*:root/;
const DARK_SELECTOR = /data-theme=['"]?dark/;
const AQUA_STEP = /^--pance-color-aqua-\d+$/;

export const DEFAULT_RAMPS = ['violet', 'emerald', 'rose', 'amber'];
export const DEFAULT_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

/** Custom properties declared on :root, split into light and dark maps (name → value). */
export function collectRootDeclarations(css) {
  const light = new Map();
  const dark = new Map();
  for (const [, selector, body] of stripComments(css).matchAll(BLOCK)) {
    if (!ROOT_SELECTOR.test(selector.trim())) continue;
    const target = DARK_SELECTOR.test(selector) ? dark : light;
    for (const [, name, value] of body.matchAll(DECLARATION)) target.set(name, value.trim());
  }
  return { light, dark };
}

/** Names whose value references, directly or through other tokens, a name matching `isSource`. */
export function dependentsOf(declarations, isSource) {
  const dependents = new Set();
  const referencesTarget = (value) =>
    [...value.matchAll(VAR_REFERENCE)].some(([, ref]) => isSource(ref) || dependents.has(ref));
  let changed = true;
  while (changed) {
    changed = false;
    for (const [name, value] of declarations) {
      if (dependents.has(name) || isSource(name) || !referencesTarget(value)) continue;
      dependents.add(name);
      changed = true;
    }
  }
  return dependents;
}

const block = (selector, lines) => `${selector} {\n${lines.map((line) => `  ${line}`).join('\n')}\n}`;

export function buildBrandScopeCss(css, { ramps = DEFAULT_RAMPS, steps = DEFAULT_STEPS } = {}) {
  const { light, dark } = collectRootDeclarations(css);
  const redeclare = (declarations) =>
    [...dependentsOf(declarations, (name) => AQUA_STEP.test(name))].map(
      (name) => `${name}: ${declarations.get(name)};`,
    );

  return [
    block('.brand-scope', redeclare(light)),
    block(":root[data-theme='dark'] .brand-scope", redeclare(dark)),
    ...ramps.map((ramp) =>
      block(
        `.brand-scope[data-brand='${ramp}']`,
        steps.map((step) => `--pance-color-aqua-${step}: var(--pance-color-${ramp}-${step});`),
      ),
    ),
  ].join('\n\n');
}
