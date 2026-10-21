import { describe, expect, it } from 'vitest';
import { buildBrandScopeCss, collectRootDeclarations, dependentsOf } from './brand-scope.mjs';

const css = `
/* primitives */
:root { --pance-color-aqua-700: #0e7490; --pance-color-slate-900: #0f172a; }
:root { --pance-color-fg-brand: var(--pance-color-aqua-700); --pance-color-fg-default: var(--pance-color-slate-900); }
:root[data-theme='dark'] { --pance-color-fg-brand: var(--pance-color-aqua-400); }
@layer theme { :root, :host { --color-brand: var(--pance-color-fg-brand); } }
.button { --local: var(--pance-color-aqua-700); }
`;

describe('collectRootDeclarations', () => {
  it('reads light and dark :root blocks, including ones nested in @layer', () => {
    const { light, dark } = collectRootDeclarations(css);
    expect(light.get('--pance-color-fg-brand')).toBe('var(--pance-color-aqua-700)');
    expect(light.get('--color-brand')).toBe('var(--pance-color-fg-brand)');
    expect(dark.get('--pance-color-fg-brand')).toBe('var(--pance-color-aqua-400)');
  });

  it('ignores declarations outside :root', () => {
    expect(collectRootDeclarations(css).light.has('--local')).toBe(false);
  });
});

describe('dependentsOf', () => {
  const isAqua = (name) => /^--pance-color-aqua-\d+$/.test(name);

  it('finds direct and transitive aliases of the ramp', () => {
    const { light } = collectRootDeclarations(css);
    expect([...dependentsOf(light, isAqua)].sort()).toEqual(['--color-brand', '--pance-color-fg-brand']);
  });

  it('does not include the ramp itself or unrelated tokens', () => {
    const deps = dependentsOf(collectRootDeclarations(css).light, isAqua);
    expect(deps.has('--pance-color-aqua-700')).toBe(false);
    expect(deps.has('--pance-color-fg-default')).toBe(false);
  });
});

describe('buildBrandScopeCss', () => {
  const out = buildBrandScopeCss(css, { ramps: ['violet'], steps: [700] });

  it('re-declares dependents inside .brand-scope for both themes', () => {
    expect(out).toContain('.brand-scope {\n  --pance-color-fg-brand: var(--pance-color-aqua-700);');
    expect(out).toContain(
      ":root[data-theme='dark'] .brand-scope {\n  --pance-color-fg-brand: var(--pance-color-aqua-400);",
    );
  });

  it('maps the aqua ramp onto each alternative ramp', () => {
    expect(out).toContain(
      ".brand-scope[data-brand='violet'] {\n  --pance-color-aqua-700: var(--pance-color-violet-700);\n}",
    );
  });
});
