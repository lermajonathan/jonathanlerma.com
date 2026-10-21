import { facts, pance } from './pance';
import { formatCount } from '../lib/format';

export const proof = [
  { value: pance.version, label: 'Pance on npm' },
  { value: formatCount(facts.figmaVariants), label: 'Figma variants' },
  { value: formatCount(facts.tokens), label: 'Design tokens' },
  { value: 'AA', label: 'WCAG 2.2, tested in CI' },
  { value: '12+', label: 'Years · SaaS, EdTech, B2B' },
];

export const principles = [
  {
    title: 'Written decisions.',
    text: 'Every system choice is a short, numbered decision record your team can read later.',
  },
  { title: 'Figma and code, in sync.', text: 'One token source feeds both, so they can’t drift apart.' },
  { title: 'Accessible by default.', text: 'WCAG 2.2 AA is checked by machines in CI, not by memory.' },
  { title: 'Across time zones.', text: 'Full working days with US Eastern time, overlap with European afternoons.' },
];

export const services = [
  {
    n: '01',
    title: 'Design system audit',
    time: '2–3 weeks',
    text: 'Tokens, components, accessibility, documentation and Figma-to-code drift, measured — not guessed. You get a prioritized report and a roadmap your team can act on.',
    deliverables: ['Contrast & ARIA audit', 'Figma ↔ code drift map', 'Prioritized roadmap'],
  },
  {
    n: '02',
    title: 'Design system build',
    time: '8–16 weeks',
    text: 'W3C DTCG tokens as the single source of truth, a Figma library that mirrors code, accessible React components, docs and CI quality gates.',
    deliverables: ['Tokens → Figma + CSS + npm', 'Component library', 'Docs site & governance'],
  },
  {
    n: '03',
    title: 'Embedded design engineering',
    time: 'Monthly',
    text: 'I join your product team to design and build the hard parts: data-heavy screens, complex flows and the components behind them. Async-first, with full overlap with US Eastern time.',
    deliverables: ['Product UI in code', 'Decision records', 'Weekly async reviews'],
  },
];

export const lab = [
  {
    title: 'Chakra',
    type: 'Design system',
    image: 'chakra',
    url: 'https://chakra.jonathanlerma.com/',
    text: 'A quiet, inclusive interface language for spiritual practice apps.',
  },
  {
    title: 'Kafka',
    type: 'Design system',
    image: 'kafka',
    url: 'https://kafkads.jonathanlerma.com/',
    text: 'Typography-first components that present long-form writing with care.',
  },
  {
    title: 'Emily',
    type: 'SaaS app',
    image: 'emily',
    url: 'https://emily.jonathanlerma.com',
    text: 'A word editor built for writers, from first draft to manuscript.',
  },
  {
    title: 'Well of Words',
    type: 'Experiment',
    image: 'well-of-words',
    url: 'https://pozo-de-palabras.jonathanlerma.com',
    text: 'A playground where poetry and geometry meet. Finish famous poems or build your own verses.',
  },
] as const;

export type LabImage = (typeof lab)[number]['image'];
