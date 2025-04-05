import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "../navbar";

const meta: Meta<typeof Navbar> = {
  title: "Components/Atoms/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  argTypes: {
    showLogin: {
      control: "boolean",
      description: "Show the Login button",
      defaultValue: true,
    },
    showLogout: {
      control: "boolean",
      description: "Show the Logout button",
      defaultValue: true,
    },
    onLoginClick: { action: "Login clicked", description: "Triggered when Login is clicked" },
    onLogoutClick: { action: "Logout clicked", description: "Triggered when Logout is clicked" },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Header navigation bar with logo and optional login/logout buttons.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    showLogin: true,
    showLogout: true,
  },
};
