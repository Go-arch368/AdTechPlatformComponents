import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './input.stories';
import userEvent from '@testing-library/user-event';

const { Basic, AllTypes, WithStates } = composeStories(stories);

describe('Input component (via Storybook)', () => {
  it('renders Basic input and types text', async () => {
    render(<Basic />);
    const input = screen.getByPlaceholderText('Enter your text...');
    await userEvent.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
  });

  it('renders AllTypes and types in email input', async () => {
    render(<AllTypes />);
    const emailInput = screen.getByPlaceholderText('Email input');
    await userEvent.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('disables the second input in WithStates', () => {
    render(<WithStates />);
    const disabledInput = screen.getByPlaceholderText('Disabled input');
    expect(disabledInput).toBeDisabled();
  });
});
