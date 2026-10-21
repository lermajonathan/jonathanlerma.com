// Everything the site says about Pance. Numbers come from the Pance repo
// (docs/extraction audit, October 2026); the version is read from the
// installed package so the footer can never claim a release we don't use.
import panceReact from '@pance/react/package.json';
import { formatCount } from '../lib/format';

export const pance = {
  version: panceReact.version,
  docs: 'https://pance-ds.jonathanlerma.com',
  repo: 'https://github.com/lermajonathan/pance-ds',
  npmReact: 'https://www.npmjs.com/package/@pance/react',
  npmTokens: 'https://www.npmjs.com/package/@pance/tokens',
  figma: 'https://www.figma.com/community/file/1694091498392766646',
} as const;

export const facts = {
  tokens: 947,
  figmaVariables: 878,
  figmaComponents: 88,
  figmaVariants: 1027,
  reactComponents: '45+',
  docPages: 71,
  axeBefore: 975,
  axeAfter: 36,
  axePages: 20,
  contrastPairs: 202,
  keyboardTests: 35,
  icons: 70,
  phosphorIcons: '1,000+',
} as const;

export const flagshipFacts = [
  {
    value: formatCount(facts.tokens),
    text: 'Design tokens in three tiers — primitives, semantic, components — in the W3C DTCG format.',
  },
  { value: facts.reactComponents, text: 'React components with one model: severity × variant × size.' },
  {
    value: `${facts.axeBefore} → ${facts.axeAfter}`,
    text: `axe violations across ${facts.axePages} pages. The ${facts.axeAfter} left are WCAG-exempt.`,
  },
  { value: String(facts.contrastPairs), text: 'Contrast pairs tested on every push, in light and dark.' },
];

export const auditFindings = [
  { value: '2.15 : 1', label: 'Warning buttons', text: 'White text on amber-500. AA needs 4.5 : 1.' },
  {
    value: '3.68 : 1',
    label: 'Primary buttons',
    text: 'White on aqua-600 at 13–16 px semibold — not “large text”, so it fails.',
  },
  {
    value: 'None',
    label: 'Dialog semantics',
    text: 'Modals and drawers had no role, no focus trap, no Escape, no focus return.',
  },
  {
    value: '3',
    label: 'Invisible styles',
    text: 'Class names built from string pieces that Tailwind never generated. Outlined alerts had no border.',
  },
];

export const decisions = [
  {
    id: 'Decision',
    title: 'One source of truth',
    text: 'The token JSON in the repo is canonical. Figma variables are generated from it — never the other way round.',
  },
  {
    id: 'Decision',
    title: 'Solid fills at step 700',
    text: 'Every filled control carries white text at 5 : 1 or better. Aqua stays the brand in outlines, links and focus.',
  },
  {
    id: 'Decision',
    title: 'Severity × variant × size',
    text: `One model for ${facts.reactComponents} components: what it means, how loud it is, how big it is. Fewer props to learn.`,
  },
  {
    id: 'Decision',
    title: 'Open, but curated',
    text: 'MIT licensed and open to proposals. Every change that lands — or is declined — is approved by the maintainer.',
  },
  {
    id: 'DDR-DS-018',
    title: 'Leading and trailing icons',
    text: 'Button takes both, so “Download ▾” needs no custom component. Additive, shipped in 1.4.0 with matching Figma properties.',
  },
  {
    id: 'DDR-DS-019',
    title: 'Four gradient tokens, no more',
    text: 'brand, hero, surface-soft and fade — a new token type with light and dark values, contrast-tested at every stop.',
  },
];

export const qualityGates = [
  {
    name: 'axe-core',
    text: `${facts.axePages} pages × 2 viewports on every push. ${facts.axeBefore} violations down to ${facts.axeAfter}, all WCAG-exempt.`,
  },
  {
    name: 'Contrast test',
    text: `${facts.contrastPairs} text and control pairs per mode — 4.5 : 1 for text, 3 : 1 for controls and focus.`,
  },
  {
    name: 'Keyboard & ARIA',
    text: `${facts.keyboardTests} tests: dialog, menu button, combobox, tabs, radio group, tooltip, disclosure.`,
  },
  { name: 'lint:tokens', text: 'Blocks hard-coded colours and magic pixel sizes in components.' },
  { name: 'Visual regression', text: 'Base commit vs. pull request on the same runner. No committed screenshots.' },
  { name: 'Package test', text: 'Installs @pance/react and @pance/tokens in a fresh project and checks they render.' },
];

export const releases = [
  { version: '1.1.0', text: 'First release on npm: tokens and React, ESM, types, precompiled CSS.' },
  { version: '1.2.0', text: 'Built-in strings become props with English defaults — translatable, no i18n dependency.' },
  { version: '1.3.0', text: 'One mature release: dates, theme, feedback, forms, table features, charts.' },
  { version: '1.4.0', text: 'Button trailing icon (DDR-DS-018) and the finished Figma library.' },
  { version: '1.4.1', text: 'Fixes only: 24 px pointer targets, panels that stay on screen.' },
  { version: '1.5.0', text: 'Gradient tokens (DDR-DS-019) and the docs on their own domain.' },
];

export const libraryStats = [
  { value: formatCount(facts.tokens), label: 'Design tokens' },
  { value: formatCount(facts.figmaVariables), label: 'Figma variables' },
  { value: formatCount(facts.figmaVariants), label: `Figma variants across ${facts.figmaComponents} components` },
  { value: String(facts.docPages), label: 'Generated documentation pages' },
  { value: String(facts.icons), label: `Icons — a curated selection of Phosphor’s ${facts.phosphorIcons}` },
];
