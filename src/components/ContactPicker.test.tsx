// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ContactPicker from './ContactPicker';

const props = { email: 'design@jonathanlerma.com', calendly: 'https://calendly.com/lermajonathan' };
const emailLink = () => screen.getByRole('link', { name: /email me/i });

describe('<ContactPicker>', () => {
  it('starts on design-system work', () => {
    render(<ContactPicker {...props} />);
    expect(emailLink()).toHaveAttribute('href', 'mailto:design@jonathanlerma.com?subject=Design%20system%20project');
  });

  it('changes the email subject and the reply copy with the chosen intent', async () => {
    render(<ContactPicker {...props} />);
    await userEvent.click(screen.getByRole('radio', { name: /a senior role/i }));
    expect(emailLink()).toHaveAttribute('href', 'mailto:design@jonathanlerma.com?subject=Senior%20design%20role');
    expect(screen.getByText(/US Eastern time/)).toBeInTheDocument();
  });

  it('always shows the address as text, because mailto links can fail', () => {
    render(<ContactPicker {...props} />);
    expect(screen.getByText('design@jonathanlerma.com')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /book a 30-minute call/i })).toHaveAttribute('href', props.calendly);
  });
});
