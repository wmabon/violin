"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-amber-700 text-white hover:bg-amber-800 focus:ring-amber-500 shadow-sm",
      secondary:
        "bg-stone-800 text-white hover:bg-stone-900 focus:ring-stone-500 shadow-sm",
      outline:
        "border-2 border-amber-700 text-amber-700 hover:bg-amber-50 focus:ring-amber-500",
      ghost: "text-stone-700 hover:bg-stone-100 focus:ring-stone-500",
      link: "text-amber-700 hover:text-amber-800 underline-offset-4 hover:underline focus:ring-amber-500",
    };

    const sizes = {
      sm: "text-sm px-3 py-1.5 rounded-md",
      md: "text-base px-5 py-2.5 rounded-lg",
      lg: "text-lg px-8 py-3.5 rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
