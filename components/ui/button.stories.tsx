import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Sun, Download, ArrowRight } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

const ResponsiveTemplate: Story = {
  render: (args) => (
    <Button {...args} className="w-full sm:w-auto" />
  ),
};

const IconTemplate: Story = {
  render: (args) => (
    <Button {...args} className="w-full sm:w-auto">
      {args.children}
    </Button>
  ),
};


export const Default = {
  ...ResponsiveTemplate,
  args: {
    variant: 'default',
    children: 'Default Button',
  },
};

export const Destructive = {
  ...ResponsiveTemplate,
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
};

export const Outline = {
  ...ResponsiveTemplate,
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Secondary = {
  ...ResponsiveTemplate,
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost = {
  ...ResponsiveTemplate,
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link = {
  ...ResponsiveTemplate,
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

