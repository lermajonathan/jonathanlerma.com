export type Status = 'Shipped' | 'Concept' | 'In progress' | 'Open source';

export type Work = {
  slug: string;
  title: string;
  kicker: string;
  status: Status;
  summary: string;
  tags: string[];
  /** Shown after the kicker on the home card, e.g. "6 months". */
  duration?: string;
  /** Measured results shown on the home card. Only for shipped work with real numbers. */
  results?: { value: string; label: string }[];
  /** Built-in vignette used instead of a photo on the home card. */
  visual?: 'crm' | 'signal';
};

export const work: Work[] = [
  {
    slug: 'pance',
    title: 'Pance Design System',
    kicker: 'Flagship · Open source',
    status: 'Open source',
    summary:
      'An accessible, token-driven design system for social and data-heavy products — from one JSON source to Figma, React and npm.',
    tags: ['Design system', 'Design engineering', 'Accessibility'],
  },
  {
    slug: 'altazor',
    title: 'Altazor Creative Writing Workshop',
    kicker: 'Education & Arts',
    status: 'Shipped',
    summary:
      'Turning an in-person writing workshop in Cali into a digital school with students across the Spanish-speaking world.',
    tags: ['Strategy', 'Content design', 'Platform'],
    duration: '6 months',
    results: [
      { value: '100+', label: 'published authors' },
      { value: '95%', label: 'course completion' },
      { value: '4.8/5', label: 'student rating' },
    ],
  },
  {
    slug: 'altazor-crm',
    title: 'Altazor CRM',
    kicker: 'Built with Pance',
    status: 'In progress',
    summary:
      'One tool to replace a patchwork of WhatsApp chats, Google Classroom and payment apps — the first real product on Pance.',
    tags: ['Internal tool', 'WhatsApp API', 'Pance'],
    visual: 'crm',
  },
  {
    slug: 'the-signal',
    title: 'The Signal',
    kicker: 'Healthcare',
    status: 'Concept',
    summary:
      'A decision-support dashboard that cuts EHR alert noise down to the patient changes nurses actually need to act on.',
    tags: ['Data visualization', 'Clinical UX', 'Dashboard'],
    visual: 'signal',
  },
];

export const cardCallToAction: Record<Status, string> = {
  Shipped: 'Read case study',
  'Open source': 'Read case study',
  'In progress': 'Follow the build',
  Concept: 'See the concept',
};
