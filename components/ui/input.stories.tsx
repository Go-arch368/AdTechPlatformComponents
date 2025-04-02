import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";

const meta: Meta = {
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


const NumberInputComponent = ({ disabled, size }: { disabled?: boolean; size?: "default" | "sm" | "lg" }) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label htmlFor="number-input">Age</Label>
    <Input
      type="number"
      id="number-input"
      placeholder="Enter your age"
      min="0"
      max="120"
      disabled={disabled}
      className={size === "sm" ? "h-8" : size === "lg" ? "h-10" : ""}
    />
  </div>
);

// Date Input Component
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
          
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
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

// Stories
export const Text: Story = {
  render: (args) => <TextInputComponent {...args} />,
};

export const Password: Story = {
  render: (args) => <PasswordInputComponent {...args} />,
};

export const Number: Story = {
  render: (args) => <NumberInputComponent {...args} />,
};

export const Date: Story = {
  render: (args) => <DateInputComponent {...args} />,
};
