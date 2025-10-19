import React from "react";
import { cn } from "../../utils/scaffold-eth/common";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

/**
 * Button - Versatile button component with multiple variants and sizes
 *
 * Variants:
 * - default: Primary action button
 * - outline: Secondary action button
 * - ghost: Tertiary action button
 * - destructive: Dangerous action button
 *
 * Sizes:
 * - sm: Small (0.5rem 0.75rem)
 * - md: Medium (0.625rem 1rem) - default
 * - lg: Large (0.75rem 1.5rem)
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", children, className, disabled, type = "button", ...props }, ref) => {
    const baseStyles =
      "rounded-lg font-medium transition-all duration-150 ease-out inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

    const variantStyles = {
      default: "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50",
      outline: "border border-border bg-transparent hover:bg-accent disabled:opacity-50",
      ghost: "bg-transparent hover:bg-accent disabled:opacity-50",
      destructive: "bg-destructive text-destructive-foreground hover:opacity-90 disabled:opacity-50",
    };

    const sizeStyles = {
      sm: "text-sm px-3 py-2 h-8",
      md: "text-base px-4 py-2.5 h-10",
      lg: "text-base px-6 py-3 h-12",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          disabled && "cursor-not-allowed",
          className,
        )}
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
