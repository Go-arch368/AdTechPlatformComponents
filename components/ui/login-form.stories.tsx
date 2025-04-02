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
    onSubmit: { action: "submitted" },
  },
  args: {
    variant: "default",
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
            <Button type="submit" className="w-full" size={variant === "compact" ? "sm" : "default"}>
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
};

export const Compact: Story = {
  args: {
    variant: "compact",
  },
  render: (args) => <LoginForm {...args} />,
};

export const WithValidation: Story = {
  render: (args) => <LoginForm {...args} />,
  parameters: {
    docs: {
      description: {
        story: "This version shows form validation in action. Try submitting with empty fields.",
      },
    },
  },
};

export const ResponsiveLogin: Story = {
  render: (args) => (
    <div className="flex justify-center p-4">
      <LoginForm {...args} />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const LoadingState: Story = {
  render: (args) => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    });

    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(data: z.infer<typeof formSchema>) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
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
                    <Label>Username</Label>
                    <FormControl>
                      <Input placeholder="username" {...field} />
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
                    <Label>Password</Label>
                    <FormControl>
                      <Input type="password" placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  },
};