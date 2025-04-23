import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:brightness-110 shadow-md hover:shadow-lg",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground hover:brightness-110 shadow-md hover:shadow-lg",
        outline:
          "border-2 border-primary bg-background hover:bg-primary hover:text-white shadow-sm hover:shadow-md",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground hover:brightness-110 shadow-md hover:shadow-lg",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
        link: "text-primary underline-offset-4 hover:underline font-semibold",
        success:
          "bg-gradient-to-r from-green-600 to-green-500 text-white hover:brightness-110 shadow-md hover:shadow-lg",
        primary:
          "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-110 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
