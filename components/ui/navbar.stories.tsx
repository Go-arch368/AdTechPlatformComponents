import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import Navbar from "../navbar";

const meta: Meta<typeof Navbar> = {
  title: "Components/Atoms/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  argTypes: {
    onLogin: { action: "onLogin fired" },
    onLogout: { action: "onLogout fired" },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    
    const loginBtn = await canvas.findByText(/login/i);
    await userEvent.click(loginBtn);

   
    const logoutBtn = await canvas.findByText(/logout/i);
    await userEvent.click(logoutBtn);
  },
};
