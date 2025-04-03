import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "@/components/ui/stack";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "@/components/ui/button";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end", "stretch"],
    },
    className: {
      control: { type: "text" },
    },
  },
  args: {
    spacing: "md",
    align: "stretch",
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

export const Basic: Story = {
  render: (args) => (
    <Stack {...args} className="p-4 border rounded-lg w-[300px]">
      <div className="p-4 bg-muted rounded">Item 1</div>
      <div className="p-4 bg-muted rounded">Item 2</div>
      <div className="p-4 bg-muted rounded">Item 3</div>
    </Stack>
  ),
};

export const CardStack: Story = {
  render: (args) => (
    <Stack {...args} className="w-[400px]">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>User profile information</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>Account settings</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>Notification preferences</CardContent>
      </Card>
    </Stack>
  ),
};

export const FormLayout: Story = {
  render: (args) => (
    <Stack {...args} className="w-[350px] p-6 border rounded-lg">
      <h3 className="text-lg font-semibold">Create Account</h3>
      <div className="grid gap-2">
        <label className="text-sm">Email</label>
        <input
          data-testid="email-input"
          className="p-2 border rounded"
          placeholder="email@example.com"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm">Password</label>
        <input
          type="password"
          data-testid="password-input"
          className="p-2 border rounded"
          placeholder="••••••••"
        />
      </div>
      <Button data-testid="signup-button" className="mt-2">
        Sign Up
      </Button>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simulate typing in the email field
    await userEvent.type(canvas.getByTestId("email-input"), "test@example.com");
    expect(canvas.getByTestId("email-input")).toHaveValue("test@example.com");

    // Simulate typing in the password field
    await userEvent.type(canvas.getByTestId("password-input"), "password123");
    expect(canvas.getByTestId("password-input")).toHaveValue("password123");

    // Simulate clicking the Sign Up button
    await userEvent.click(canvas.getByTestId("signup-button"));
  },
};

export const ResponsiveStack: Story = {
  render: (args) => (
    <Stack {...args} className="w-full max-w-md p-4 border rounded-lg">
      <div className="p-4 bg-muted rounded">Header</div>
      <Stack spacing="sm" className="md:flex-row md:gap-8">
        <div className="p-4 bg-muted rounded flex-1">Sidebar</div>
        <div className="p-4 bg-muted rounded flex-2">Main Content</div>
      </Stack>
      <div className="p-4 bg-muted rounded">Footer</div>
    </Stack>
  ),
  parameters: {
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

export const SpacingVariants: Story = {
  render: () => (
    <Stack spacing="lg" className="w-[300px]">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((spacing) => (
        <Stack key={spacing} spacing={spacing} className="p-2 border rounded">
          <span className="text-sm font-medium">{spacing.toUpperCase()} spacing</span>
          <div className="flex gap-2">
            <div className="p-2 bg-muted rounded"></div>
            <div className="p-2 bg-muted rounded"></div>
            <div className="p-2 bg-muted rounded"></div>
          </div>
        </Stack>
      ))}
    </Stack>
  ),
};
