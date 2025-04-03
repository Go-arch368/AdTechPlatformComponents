import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { expect, userEvent, within } from "@storybook/test";
import { fn } from '@storybook/test';

const meta: Meta<typeof Badge> = {
  title: "Components/ui/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    variant: "default",
    children: "Badge",
    onClick: fn() // Add mock function for click tests
  },
  argTypes: {
    variant: {
      control: "select",
      description: "Badge variants",
      options: ["default", "destructive", "outline", "secondary"]
    },
    children: {
      control: "text",
      description: "Badge content"
    },
    className: {
      control: "text",
      description: "Additional CSS classes"
    },
    onClick: {
      action: "clicked",
      description: "Click handler"
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base variants with test interactions
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText(args.children as string);
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass(/bg-primary/);
  }
};

export const Outline: Story = {
  args: { variant: "outline" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Badge");
    await expect(badge).toHaveClass(/border/);
  }
};

export const Destructive: Story = {
  args: { variant: "destructive" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Badge");
    await expect(badge).toHaveClass(/bg-destructive/);
  }
};

export const Secondary: Story = {
  args: { variant: "secondary" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Badge");
    await expect(badge).toHaveClass(/bg-secondary/);
  }
};

// Responsive Layout Stories with viewport tests
export const ResponsiveBadge: Story = {
  args: {
    children: "Responsive Badge",
    className: "text-sm md:text-base lg:text-lg"
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    },
    chromatic: { viewports: [320, 768, 1024] }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Responsive Badge");
    await expect(badge).toBeInTheDocument();
  }
};

// Interactive Badge with click test
export const ClickableBadge: Story = {
  args: {
    children: "Click me",
    className: "cursor-pointer hover:opacity-80 transition-opacity"
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Click me");
    await expect(badge).toHaveClass('cursor-pointer');
    await userEvent.click(badge);
    await expect(args.onClick).toHaveBeenCalled();
  }
};

// Badge with long text and truncation test
export const LongTextBadge: Story = {
  args: {
    children: "This is a longer badge text that should truncate",
    className: "max-w-[100px] truncate"
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText(/longer badge text/);
    await expect(badge).toHaveStyle('text-overflow: ellipsis');
  }
};

// Visual regression tests for different viewports
export const MobileBadge: Story = {
  args: {
    variant: "default",
    children: "Mobile",
    className: "px-2 py-1 text-xs"
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    chromatic: { disable: false } // Enable for visual testing
  }
};

export const TabletBadge: Story = {
  args: {
    variant: "secondary",
    children: "Tablet",
    className: "px-3 py-1.5 text-sm"
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    chromatic: { disable: false }
  }
};

export const DesktopBadge: Story = {
  args: {
    variant: "outline",
    children: "Desktop",
    className: "px-4 py-2 text-base"
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    chromatic: { disable: false }
  }
};