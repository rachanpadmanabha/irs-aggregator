import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-300 shadow-md backdrop-blur-sm",
  {
    variants: {
      variant: {
        default:
          "gradient-primary border-transparent text-white hover:shadow-lg hover:scale-110 glow-primary",
        secondary:
          "border-transparent bg-gradient-to-r from-gray-100 to-gray-50 text-foreground hover:from-gray-200 hover:to-gray-100 hover:shadow-lg",
        destructive:
          "gradient-danger border-transparent text-white hover:shadow-lg hover:scale-110",
        outline: "text-foreground border-purple-200 bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:scale-105 hover:shadow-md",
        success:
          "gradient-success border-transparent text-white hover:shadow-lg hover:scale-110 glow-success",
        warning:
          "gradient-warning border-transparent text-white hover:shadow-lg hover:scale-110 glow-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
