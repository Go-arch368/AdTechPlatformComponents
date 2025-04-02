import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { action } from "@storybook/addon-actions"

const meta: Meta<typeof Button> = {
    title: "Components/ui/button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        layout: "centered"
    },
    argTypes: {
        variant: {
            control: "select",
            description: "Button variants",
            options: [
                "default",
                "destructive",
                "outline",
                "secondary",
                "ghost",
                "link",
            ]
        },
        size: {
            control: "select",
            description: "button sizes",
            options: ["default", "sm", "lg", "icon"]
        },
        disabled: {
            control: "boolean"
        },
        onClick: {
            action: "clicked",
            description: "Function called when the default button is clicked"
        },
        children: {
            control: "text",
            description: "Content to be displayed inside the button"
        },
        className: {
            control: "text",
            description: "Custom tailwind css classes to apply to the button"
        }
    }
}

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        variant: "default",
        size: "sm",
        disabled: false,
        onClick: action("default click"),
        children: "Default button",
        className: "shadow-lg"
    },
}

export const Destructive: Story = {
    args: {
        variant: "destructive",
        size: "sm",
        disabled: false,
        onClick: action("Destructive click"),
        children: "Destructive button",
        className: "shadow-lg"
    },
}

export const Ghost: Story = {
    args: {
        variant: "ghost",
        size: "sm",
        disabled: false,
        onClick: action("ghost click"),
        children: "Ghost button",
        className: "shadow-lg"
    },
}

export const Outline: Story = {
    args: {
        variant: "outline",
        size: "sm",
        disabled: false,
        onClick: action("outline click"),
        children: "Outline button",
        className: "shadow-lg"
    },
}

export const Secondary: Story = {
    args: {
        variant: "secondary",
        size: "sm",
        disabled: false,
        onClick: action("secondary click"),
        children: "Secondary button",
        className: "shadow-lg"
    },
}

export const Link: Story = {
    args: {
        variant: "link",
        size: "sm",
        disabled: false,
        onClick: action("link click"),
        children: "Link button",
        className: "shadow-lg"
    },
}

// Responsive Layout Stories
export const ResponsiveLayouts: Story = {
    args: {
        variant: "default",
        children: "Responsive Button",
        className: "w-full md:w-auto lg:w-64"
    },
    parameters: {
        viewport: {
            defaultViewport: 'responsive'
        }
    }
}

export const MobileView: Story = {
    args: {
        variant: "default",
        size: "sm",
        children: "Mobile Button",
        className: "w-full"
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
}

export const TabletView: Story = {
    args: {
        variant: "secondary",
        size: "default",
        children: "Tablet Button",
        className: "w-48"
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet'
        }
    }
}

export const DesktopView: Story = {
    args: {
        variant: "outline",
        size: "lg",
        children: "Desktop Button",
        className: "w-64"
    },
    parameters: {
        viewport: {
            defaultViewport: 'desktop'
        }
    }
}