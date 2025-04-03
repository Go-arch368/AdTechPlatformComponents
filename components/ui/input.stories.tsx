import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar as DatePickerCalendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

const meta: Meta<typeof TextInputComponent> = {
  title: "Components/ui/input",
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
  },
  args: {
    disabled: false,
    size: "default",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TextInputComponent = ({ disabled, size }: { disabled?: boolean; size?: "default" | "sm" | "lg" }) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label htmlFor="text-input">Username</Label>
    <Input
      type="text"
      id="text-input"
      placeholder="Enter your username"
      disabled={disabled}
      className={size === "sm" ? "h-8" : size === "lg" ? "h-10" : ""}
    />
  </div>
);

const PasswordInputComponent = ({ disabled, size }: { disabled?: boolean; size?: "default" | "sm" | "lg" }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password-input">Password</Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          id="password-input"
          placeholder="Enter your password"
          disabled={disabled}
          className={size === "sm" ? "h-8" : size === "lg" ? "h-10" : ""}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 px-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </Button>
      </div>
    </div>
  );
};

const DateInputComponent = ({ disabled, size }: { disabled?: boolean; size?: "default" | "sm" | "lg" }) => {
  const [date, setDate] = useState<Date>();
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="date-input">Birthdate</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              size === "sm" ? "h-8" : size === "lg" ? "h-10" : ""
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <DatePickerCalendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Stories with test interactions
export const Text: Story = {
  render: (args) => <TextInputComponent {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Enter your username");

    await expect(input).toBeInTheDocument();
    await userEvent.type(input, "testuser");
    await expect(input).toHaveValue("testuser");

    if (args.disabled) {
      await expect(input).toBeDisabled();
    } else {
      await expect(input).toBeEnabled();
    }
  },
};

export const Password: Story = {
  render: (args) => <PasswordInputComponent {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Enter your password");
    const toggleButton = canvas.getByRole("button", { name: "Show" });

    await expect(input).toHaveAttribute("type", "password");
    await userEvent.click(toggleButton);
    await expect(input).toHaveAttribute("type", "text");
    await expect(canvas.getByText("Hide")).toBeInTheDocument();

    await userEvent.type(input, "secret123");
    await expect(input).toHaveValue("secret123");

    if (args.disabled) {
      await expect(input).toBeDisabled();
      await expect(toggleButton).toBeDisabled();
    }
  },
};
