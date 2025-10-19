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
 * - Light and dark mode variants with CSS custom properties
 * - Optional hover enhancement with shadow system (Requirements 17.3, 17.4)
 * - Rounded corners with 3xl border radius
 * - Performance-optimized shadow transitions (Requirements 17.5)
 *
 * Shadow System:
 * - Uses --shadow-glass CSS custom property for consistent depth
 * - Automatically adapts to light/dark mode
 * - Hover states use --shadow-glass-hover for enhanced depth
 */
export const CardGlass: React.FC<CardGlassProps> = ({ children, className, hover = false, onClick }) => {
  const baseStyles = "rounded-3xl border transition-all duration-300 ease-out";

  // Light mode styles with shadow system (Requirements 17.1, 17.3)
  const lightStyles = "bg-black/[0.03] border-black/10 shadow-glass";
  const lightHoverStyles = hover ? "hover:bg-black/[0.06] hover:border-black/20 hover:shadow-glass-hover" : "";

  // Dark mode styles with shadow system (Requirements 17.2, 17.3)
  const darkStyles = "dark:bg-white/[0.03] dark:border-white/10";
  const darkHoverStyles = hover ? "dark:hover:bg-white/[0.06] dark:hover:border-white/20" : "";

  // Backdrop filter with fallback
  const backdropStyles =
    "backdrop-blur-[16px] supports-[backdrop-filter]:bg-black/[0.03] dark:supports-[backdrop-filter]:bg-white/[0.03]";

  // Fallback for browsers without backdrop-filter support
  const fallbackStyles = "supports-[not(backdrop-filter)]:bg-white/95 dark:supports-[not(backdrop-filter)]:bg-black/95";

  // Performance optimization: will-change for hover states (Requirements 17.5)
  const performanceStyles = hover ? "will-change-[box-shadow,transform]" : "";

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
        performanceStyles,
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
