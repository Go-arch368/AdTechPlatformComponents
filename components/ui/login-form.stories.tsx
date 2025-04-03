import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { expect, userEvent, within, waitFor, fn } from '@storybook/test';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const meta: Meta = {
  title: "Components/LoginForm",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "compact"],
    },
  },
  args: {
    variant: "default",
    onSubmit: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const LoginForm = ({ variant, onSubmit }: { variant?: "default" | "compact"; onSubmit?: (data: any) => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    onSubmit?.(data);
  }

  return (
    <Card className={variant === "compact" ? "w-[350px]" : "w-[400px]"}>
      <CardHeader>
        <CardTitle className="text-center">Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="username">Username</Label>
                  <FormControl>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      {...field}
                      className={variant === "compact" ? "h-9" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className={variant === "compact" ? "h-9" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              size={variant === "compact" ? "sm" : "default"}
              data-testid="submit-button"
            >
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

// Stories
export const Default: Story = { 
  render: (args) => <LoginForm {...args} />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await expect(canvas.getByText('Login to your account')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Username')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Password')).toBeInTheDocument();
    await expect(canvas.getByTestId('submit-button')).toBeInTheDocument();

    await user.type(canvas.getByLabelText('Username'), 'testuser');
    await user.type(canvas.getByLabelText('Password'), 'securepassword123');
    await user.click(canvas.getByTestId('submit-button'));

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'securepassword123'
      });
    });
  },
};

export const Compact: Story = {
  args: {
    variant: "compact",
  },
  render: (args) => <LoginForm {...args} />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const usernameInput = canvas.getByLabelText('Username');
    const passwordInput = canvas.getByLabelText('Password');
    const submitButton = canvas.getByTestId('submit-button');

    await expect(usernameInput).toHaveClass('h-9');
    await expect(passwordInput).toHaveClass('h-9');
    await expect(submitButton).toHaveClass('h-9'); // Check compact button size

    await user.type(usernameInput, 'compactuser');
    await user.type(passwordInput, 'compactpass123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalledWith({
        username: 'compactuser',
        password: 'compactpass123'
      });
    });
  },
};

export const WithValidation: Story = {
  render: (args) => <LoginForm {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Submit empty form
    await user.click(canvas.getByTestId('submit-button'));
    
    // Wait for validation messages
    await waitFor(() => {
      expect(canvas.getByText(/Username must be at least 2 characters./i)).toBeInTheDocument();
      expect(canvas.getByText(/Password must be at least 6 characters./i)).toBeInTheDocument();
    });

    // Test partial validation
    await user.type(canvas.getByLabelText('Username'), 'a');
    await user.click(canvas.getByTestId('submit-button'));
    await expect(canvas.getByText(/Username must be at least 2 characters./i)).toBeInTheDocument();

    await user.type(canvas.getByLabelText('Username'), 'b'); // "ab" (valid)
    await user.type(canvas.getByLabelText('Password'), 'short');
    await user.click(canvas.getByTestId('submit-button'));
    await expect(canvas.queryByText(/Username must be at least 2 characters./i)).not.toBeInTheDocument();
    await expect(canvas.getByText(/Password must be at least 6 characters./i)).toBeInTheDocument();
  },
};

export const LoadingState: Story = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: { username: "", password: "" },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      args.onSubmit?.(data);
      setIsLoading(false);
    }

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="loading-username">Username</Label>
                    <FormControl>
                      <Input 
                        id="loading-username" 
                        placeholder="username" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="loading-password">Password</Label>
                    <FormControl>
                      <Input 
                        id="loading-password" 
                        type="password" 
                        placeholder="password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                data-testid="loading-button"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const submitButton = canvas.getByTestId('loading-button');
    
    await user.type(canvas.getByLabelText('Username'), 'testuser');
    await user.type(canvas.getByLabelText('Password'), 'testpass');
    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('Signing in...');
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent('Sign In');
    }, { timeout: 3000 });
  },
};