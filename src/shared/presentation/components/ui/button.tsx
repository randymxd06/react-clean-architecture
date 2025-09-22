import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-blue-600 text-white shadow hover:bg-blue-700 focus:ring-blue-500",
                destructive:
                    "bg-red-600 text-white shadow-sm hover:bg-red-700 focus:ring-red-500",
                outline:
                    "border border-gray-300 bg-background shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:ring-blue-500",
                secondary:
                    "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus:ring-gray-500",
                ghost: "hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",
                link: "text-blue-600 underline-offset-4 hover:underline focus:ring-blue-500",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
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
    VariantProps<typeof buttonVariants> { }

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

export { Button }