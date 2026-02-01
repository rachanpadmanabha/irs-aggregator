import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "gradient-primary text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-100 glow-primary",
        destructive:
          "gradient-danger text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-100",
        outline:
          "border-2 border-purple-200 bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:border-purple-300 hover:shadow-lg hover:scale-105",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-50 text-foreground shadow-md hover:shadow-lg hover:scale-105",
        ghost: "hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
