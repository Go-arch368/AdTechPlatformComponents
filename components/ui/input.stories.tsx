import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { userEvent, within, expect } from "@storybook/test";

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Enter your text...");
    await userEvent.click(input);
    await expect(input).toBeVisible();
    await userEvent.type(input, "Hello World!");
    await expect(input).toHaveValue("Hello World!");
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
  
      const textInput = canvas.getByPlaceholderText("Text input");
      const emailInput = canvas.getByPlaceholderText("Email input");
      const passwordInput = canvas.getByPlaceholderText("Password input");
      const numberInput = canvas.getByPlaceholderText("Number input");
  
      await userEvent.type(textInput, "Some text");
      await expect(textInput).toHaveValue("Some text");
  
      await userEvent.type(emailInput, "test@example.com");
      await expect(emailInput).toHaveValue("test@example.com");
  
      await userEvent.type(passwordInput, "password123");
      await expect(passwordInput).toHaveValue("password123");
  
      await userEvent.type(numberInput, "12345");
      await expect(numberInput).toHaveValue(12345); 
      
    },
  };
  

export const WithStates: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      <Input placeholder="Normal state" className="w-full" />
      <Input placeholder="Disabled input" disabled className="w-full" />
      <Input
        placeholder="Error state"
        className="w-full border-destructive"
        aria-invalid="true"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const normalInput = canvas.getByPlaceholderText("Normal state");
    const disabledInput = canvas.getByPlaceholderText("Disabled input");
    const errorInput = canvas.getByPlaceholderText("Error state");

    await userEvent.click(normalInput);
    await expect(normalInput).toHaveFocus();
    await userEvent.type(normalInput, "Test");
    await expect(normalInput).toHaveValue("Test");
    await expect(disabledInput).toBeDisabled();
    await expect(errorInput).toHaveAttribute("aria-invalid", "true");
  },
};
