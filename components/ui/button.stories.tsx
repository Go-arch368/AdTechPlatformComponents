import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { userEvent, within, expect ,fn } from "@storybook/test";


const meta: Meta<typeof Button> = {
  title: "Components/Atoms/Button",
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'destructive', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;


const Template: Story = {
  render: (args) => <Button {...args} />,
};

export const Default: Story = {
  ...Template,
  args: {
    children: 'Default Button',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Default Button' });

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
    await expect(button).toBeEnabled();
  },
};


export const Primary: Story = {
  ...Template,
  args: {
    variant: 'default',
    children: 'Primary Button',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Primary Button' });

    await userEvent.hover(button);
    await new Promise((r) => setTimeout(r, 200)); 
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};


export const Destructive: Story = {
  ...Template,
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Destructive Button' });

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
  parameters: {
    chromatic: { delay: 500 },
  },
};


export const Outline: Story = {
  ...Template,
  args: {
    variant: 'outline',
    children: 'Outline Button',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Outline Button' });

    await userEvent.click(button);
    await expect(button).toHaveFocus();
    await expect(args.onClick).toHaveBeenCalled();
  },
};


export const Ghost: Story = {
  ...Template,
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Ghost Button' });

    await userEvent.hover(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Link: Story = {
  ...Template,
  args: {
    variant: 'link',
    children: 'Link Button',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Link Button' });

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
