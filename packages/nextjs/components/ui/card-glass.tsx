import React from "react";
import { cn } from "../../utils/scaffold-eth/common";

export interface CardGlassProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

/**
 * CardGlass - Primary glassmorphism container component
 *
 * Features:
 * - Backdrop blur effect with fallback for unsupported browsers
 * - Light and dark mode variants
 * - Optional hover enhancement
 * - Rounded corners with 3xl border radius
 */
export const CardGlass: React.FC<CardGlassProps> = ({ children, className, hover = false, onClick }) => {
  const baseStyles = "rounded-3xl border transition-all duration-300 ease-out";

  // Light mode styles
  const lightStyles = "bg-black/[0.03] border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
  const lightHoverStyles = hover
    ? "hover:bg-black/[0.06] hover:border-black/20 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
    : "";

  // Dark mode styles
  const darkStyles = "dark:bg-white/[0.03] dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.12)]";
  const darkHoverStyles = hover
    ? "dark:hover:bg-white/[0.06] dark:hover:border-white/20 dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)]"
    : "";

  // Backdrop filter with fallback
  const backdropStyles =
    "backdrop-blur-[16px] supports-[backdrop-filter]:bg-black/[0.03] dark:supports-[backdrop-filter]:bg-white/[0.03]";

  // Fallback for browsers without backdrop-filter support
  const fallbackStyles = "supports-[not(backdrop-filter)]:bg-white/95 dark:supports-[not(backdrop-filter)]:bg-black/95";

  return (
    <div
      className={cn(
        baseStyles,
        lightStyles,
        lightHoverStyles,
        darkStyles,
        darkHoverStyles,
        backdropStyles,
        fallbackStyles,
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
