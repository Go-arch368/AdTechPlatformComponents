import { cn } from "@/lib/utils"

type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  spacing?: "xs" | "sm" | "md" | "lg" | "xl"
  align?: "start" | "center" | "end" | "stretch"
}

export function Stack({
  className,
  spacing = "md",
  align = "stretch",
  children,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        {
          "gap-1": spacing === "xs",
          "gap-2": spacing === "sm",
          "gap-4": spacing === "md",
          "gap-6": spacing === "lg",
          "gap-8": spacing === "xl",
        },
        {
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
          "items-stretch": align === "stretch",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}