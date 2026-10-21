import type { TrajectoryEntry } from '../lib/trajectory';
import { facts } from './pance';
import { formatCount } from '../lib/format';

// Ordered newest first.
export const trajectory: TrajectoryEntry[] = [
  {
    date: 'Oct 2026',
    track: 'milestone',
    title: 'Pance 1.5.0 and its own home',
    org: 'Open source',
    text: 'Docs moved from Figma Make to GitHub Pages at pance-ds.jonathanlerma.com. 1.5.0 adds four gradient tokens, tested for contrast at every stop.',
  },
  {
    date: 'Oct 2026',
    track: 'milestone',
    title: 'Pance on Figma Community',
    org: 'Open source',
    text: `The full Figma library — ${facts.figmaComponents} components, ${formatCount(facts.figmaVariants)} variants, Light and Dark variables — published for free.`,
  },
  {
    date: 'Oct 2026',
    track: 'milestone',
    title: 'First npm release',
    org: '@pance/react · @pance/tokens',
    text: 'Released through GitHub Actions with trusted publishing and provenance — no stored tokens.',
  },
  {
    date: '2024 — 2026',
    track: 'education',
    title: 'Google UX Design Professional Certificate',
    org: 'Coursera · Google',
    text: 'End-to-end UX process, from research to prototyping and usability testing.',
  },
  {
    date: '2014 — today',
    track: 'work',
    title: 'Senior UX/UI Designer',
    org: 'SaaS · Education technology · B2B',
    text: 'Twelve-plus years leading design for web applications and design systems, translating complex business requirements and data into products people can use.',
  },
  {
    date: 'Enterprise',
    track: 'work',
    title: 'Field operations web apps',
    org: 'Baker Hughes',
    text: 'Led the design of web applications that raised field productivity for oil-and-gas crews — built to keep working in low-connectivity environments.',
  },
  {
    date: '2012 — 2013',
    track: 'education',
    title: 'Front-end foundations',
    org: 'Adobe · Symetria and Platzi',
    text: 'HTML5, CSS3 and jQuery, then web design and development — the start of designing in code.',
  },
  {
    date: '2009 — 2011',
    track: 'education',
    title: 'AA in Web Design',
    org: 'Instituto Nacional de Informática · Tucumán, Argentina',
    text: 'Web design technologies and the technical side of the craft.',
  },
  {
    date: '2004 — 2008',
    track: 'education',
    title: 'BFA in Graphic Design',
    org: 'Academia de Dibujo Profesional · Cali',
    text: 'Visual design and research methods. Graduated with honors; thesis on inclusive digital experiences for aging populations.',
  },
];
