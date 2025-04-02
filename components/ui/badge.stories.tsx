import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"
import { action } from "@storybook/addon-actions"

const meta: Meta<typeof Badge> = {
    title: "Components/ui/Badge",
    component: Badge,
    tags: ["autodocs"],
    parameters: {
        layout: "centered"
    },
    args: {
        variant: "default",
        children: "Badge"
    },
    argTypes: {
        variant: {
            control: "select",
            description: "Badge variants",
            options: [
                "default",
                "destructive",
                "outline",
                "secondary"
            ]
        },
        children: {
            control: "text",
            description: "Badge content"
        },
        className: {
            control: "text",
            description: "Additional CSS classes"
        }
    }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>

// Base variants
export const Default: Story = {}

export const Outline: Story = {
    args: { variant: "outline" }
}

export const Destructive: Story = {
    args: { variant: "destructive" }
}

export const Secondary: Story = {
    args: { variant: "secondary" }
}

// Responsive Layout Stories
export const ResponsiveBadge: Story = {
    args: {
        children: "Responsive Badge",
        className: "text-sm md:text-base lg:text-lg"
    },
    parameters: {
        viewport: {
            defaultViewport: 'responsive'
        }
    }
}

export const MobileBadge: Story = {
    args: {
        variant: "default",
        children: "Mobile",
        className: "px-2 py-1 text-xs"
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
}

export const TabletBadge: Story = {
    args: {
        variant: "secondary",
        children: "Tablet",
        className: "px-3 py-1.5 text-sm"
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet'
        }
    }
}

export const DesktopBadge: Story = {
    args: {
        variant: "outline",
        children: "Desktop",
        className: "px-4 py-2 text-base"
    },
    parameters: {
        viewport: {
            defaultViewport: 'desktop'
        }
    }
}

// Interactive Badge
export const ClickableBadge: Story = {
    args: {
        children: "Click me",
        onClick: action("badge-clicked"),
        className: "cursor-pointer hover:opacity-80 transition-opacity"
    }
}

// Badge with long text
export const LongTextBadge: Story = {
    args: {
        children: "This is a longer badge text that should truncate",
        className: "max-w-[100px] truncate"
    }
}