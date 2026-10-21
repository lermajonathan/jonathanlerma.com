import { useState } from 'react';
import { RadioCard } from '@pance/react';
import { mailtoLink } from '../lib/contact';
import { iconPaths } from './ui/icon-paths';
import './ContactPicker.css';

const intents = [
  {
    value: 'consulting',
    label: 'Design system work',
    description: 'An audit, a new system or a team that needs one',
    subject: 'Design system project',
    reply:
      'Tell me about your product, your team and where the system hurts today. I’ll reply within one business day with a few questions and a suggested first step.',
  },
  {
    value: 'role',
    label: 'A senior role',
    description: 'Full-time or long-term contract, remote',
    subject: 'Senior design role',
    reply:
      'Share the role, the team and what success looks like in the first six months. I’m based in Cali (UTC−5), so I work full days with US Eastern time.',
  },
  {
    value: 'other',
    label: 'Something else',
    description: 'A collaboration, a talk or just to say hello',
    subject: 'Hello Jonathan',
    reply: 'Whatever it is, I read every message myself.',
  },
] as const;

type Intent = (typeof intents)[number];

export default function ContactPicker({ email, calendly }: { email: string; calendly: string }) {
  const [current, setCurrent] = useState<Intent>(intents[0]);

  return (
    <div className="picker">
      <fieldset className="picker-set" data-spec="RadioCard × 3 · @pance/react">
        <legend className="mono">What brings you here?</legend>
        <div className="picker-grid">
          {intents.map((intent) => (
            <RadioCard
              key={intent.value}
              checked={current.value === intent.value}
              onChange={() => setCurrent(intent)}
              label={intent.label}
              description={intent.description}
            />
          ))}
        </div>
      </fieldset>
      <p className="picker-reply" aria-live="polite">
        {current.reply}
      </p>
      <div className="picker-actions">
        <a className="btn btn-primary" href={mailtoLink(email, current.subject)}>
          Email me
          <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true">
            <path fill="currentColor" d={iconPaths.arrow} />
          </svg>
        </a>
        <a className="btn btn-ghost" href={calendly}>
          Book a 30-minute call
        </a>
        {/* Shown as text too: mailto links don't work for every visitor. */}
        <span className="picker-email mono">{email}</span>
      </div>
    </div>
  );
}
