import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { ArrowRight, Download, Sun } from "lucide-react";

const meta = {
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
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/* ---------- Base Templates ---------- */
const ResponsiveTemplate: Story = {
  render: (args) => (
    <div className="w-[300px] sm:w-auto"> {/* Constrained on mobile, auto on desktop */}
      <Button {...args} className="w-full sm:w-auto" /> {/* Responsive width */}
    </div>
  ),
};

/* ---------- Variant Stories ---------- */
export const Default: Story = {
  ...ResponsiveTemplate,
  args: {
    children: 'Default Button',
  },
};

export const Primary: Story = {
  ...ResponsiveTemplate,
  args: {
    variant: 'default',
    children: 'Primary Button',
  },
};

export const Destructive: Story = {
  ...ResponsiveTemplate,
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
};

export const Outline: Story = {
  ...ResponsiveTemplate,
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  ...ResponsiveTemplate,
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  ...ResponsiveTemplate,
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};


export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
    className: 'w-full sm:w-auto',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
    className: 'w-full sm:w-auto',
  },
};

export const IconButton: Story = {
  args: {
    size: 'icon',
    children: <Sun className="size-4" />,
  },
};


export const Disabled: Story = {
  ...ResponsiveTemplate,
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};


export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px] sm:w-auto">
      <Button className="w-full sm:w-auto">
        <Download className="mr-2 size-4" />
        Download
      </Button>
      <Button variant="outline" className="w-full sm:w-auto">
        Continue <ArrowRight className="ml-2 size-4" />
      </Button>
    </div>
  ),
};


export const DarkModeComparison = {
  render: () => (
    <div className="space-y-8">
      <div className="light p-6 rounded-lg bg-background">
        <h3 className="mb-4 text-sm font-medium">Light Mode</h3>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="default">Primary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
      
      <div className="dark p-6 rounded-lg bg-background">
        <h3 className="mb-4 text-sm font-medium">Dark Mode</h3>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="default">Primary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'light' },
  },
};