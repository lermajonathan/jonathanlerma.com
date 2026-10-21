// @vitest-environment jsdom
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Trajectory from './Trajectory';
import { trajectory } from '../data/trajectory';

const cards = () => screen.getAllByRole('article');

describe('<Trajectory>', () => {
  it('shows every entry by default', () => {
    render(<Trajectory />);
    expect(cards()).toHaveLength(trajectory.length);
    expect(screen.getByText(`${trajectory.length} entries`)).toBeInTheDocument();
  });

  it('filters to one track and announces the new count', async () => {
    render(<Trajectory />);
    await userEvent.click(screen.getByRole('radio', { name: 'Education' }));
    const education = trajectory.filter((t) => t.track === 'education');
    expect(cards()).toHaveLength(education.length);
    cards().forEach((card) => expect(within(card).getByText('Education')).toBeInTheDocument());
    expect(screen.getByText(`${education.length} entries`)).toHaveAttribute('aria-live', 'polite');
  });
});
