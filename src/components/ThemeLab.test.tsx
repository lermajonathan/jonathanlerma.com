// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ThemeLab from './ThemeLab';

const scope = (container: HTMLElement) => container.querySelector('.brand-scope');

describe('<ThemeLab>', () => {
  it('starts on the Aqua brand, with no override attribute', () => {
    const { container } = render(<ThemeLab />);
    expect(scope(container)).not.toHaveAttribute('data-brand');
    expect(screen.getByText('<div class="brand-scope">')).toBeInTheDocument();
  });

  it('swaps the ramp with a single attribute and shows the matching code', async () => {
    const { container } = render(<ThemeLab />);
    await userEvent.click(screen.getByRole('radio', { name: 'Violet' }));
    expect(scope(container)).toHaveAttribute('data-brand', 'violet');
    expect(screen.getByText('<div class="brand-scope" data-brand="violet">')).toBeInTheDocument();
  });
});
