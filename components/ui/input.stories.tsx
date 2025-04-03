import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Components/Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["text", "email", "password", "number"],
      control: { type: "select" },
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    className: {
      control: "text",
    },
  },
  args: {
    type: "text",
    disabled: false,
    placeholder: "Enter your text...",
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;


export const Basic: Story = {
  args: {
    placeholder: "Enter your text...",
    className: "w-full max-w-sm",
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-2xl mx-auto">
      <Input type="text" placeholder="Text input" className="w-full max-w-xs" />
      <Input type="email" placeholder="Email input" className="w-full max-w-xs" />
      <Input type="password" placeholder="Password input" className="w-full max-w-xs" />
      <Input type="number" placeholder="Number input" className="w-full max-w-xs" />
    </div>
  ),
};


export const WithStates: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      <Input placeholder="Normal state" className="w-full" />
      <Input placeholder="Disabled input" disabled className="w-full" />
      <Input placeholder="Error state" className="w-full border-destructive" aria-invalid="true" />
    </div>
  ),
};
