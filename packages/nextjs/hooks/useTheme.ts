"use client";

import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

/**
 * Custom hook for theme management with glassmorphism support
 * Extends next-themes with additional utilities
 */
export const useTheme = () => {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the actual theme being displayed
  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : undefined;

  // Check if dark mode is active
  const isDark = currentTheme === "dark";

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // Get glassmorphism CSS variables for current theme
  const getGlassStyles = (variant: "default" | "card" | "modal" = "default") => {
    if (!mounted) return {};

    const baseStyles = {
      backdropFilter: "blur(var(--glass-blur))",
      WebkitBackdropFilter: "blur(var(--glass-blur))",
    };

    switch (variant) {
      case "card":
        return {
          ...baseStyles,
          background: "var(--card-glass-bg)",
          border: "1px solid var(--card-glass-border)",
          boxShadow: "var(--card-glass-shadow)",
          borderRadius: "var(--radius-2xl)",
        };
      case "modal":
        return {
          ...baseStyles,
          background: "var(--modal-glass-bg)",
          border: "1px solid var(--modal-glass-border)",
          boxShadow: "var(--glass-shadow)",
          borderRadius: "var(--radius-3xl)",
        };
      default:
        return {
          ...baseStyles,
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--glass-shadow)",
        };
    }
  };

  return {
    theme,
    setTheme,
    systemTheme,
    resolvedTheme,
    currentTheme,
    isDark,
    toggleTheme,
    mounted,
    getGlassStyles,
  };
};
