
import { render, screen } from '@testing-library/react';
import { Button } from './button';
import userEvent from '@testing-library/user-event';

describe('Button component', () => {
  it('renders Default Button and handles click', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Default Button</Button>);

    const button = screen.getByRole('button', { name: 'Default Button' });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();

    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders Destructive Button variant', async () => {
    const handleClick = jest.fn();
    render(
      <Button variant="destructive" onClick={handleClick}>
        Destructive Button
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Destructive Button' });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders Outline Button and checks focus', async () => {
    const handleClick = jest.fn();
    render(
      <Button variant="outline" onClick={handleClick}>
        Outline Button
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Outline Button' });
    await userEvent.click(button);
    expect(button).toHaveFocus();
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders Link Button and works', async () => {
    const handleClick = jest.fn();
    render(
      <Button variant="link" onClick={handleClick}>
        Link Button
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Link Button' });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });
});
