/**
 * Theme Configuration
 * Centralized theme settings for Owrent glassmorphism UI
 */

export const themeConfig = {
  // Theme settings
  defaultTheme: "light",
  enableSystem: true,
  storageKey: "owrent-theme",
  attribute: "data-theme",

  // Available themes
  themes: ["light", "dark"],

  // Glassmorphism settings
  glassmorphism: {
    blur: {
      light: "12px",
      dark: "12px",
    },
    opacity: {
      light: {
        background: 0.7,
        card: 0.8,
        modal: 0.85,
      },
      dark: {
        background: 0.7,
        card: 0.8,
        modal: 0.9,
      },
    },
    border: {
      light: {
        opacity: 0.18,
        cardOpacity: 0.25,
        modalOpacity: 0.3,
      },
      dark: {
        opacity: 0.1,
        cardOpacity: 0.15,
        modalOpacity: 0.2,
      },
    },
  },

  // Animation settings
  animations: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Spacing scale
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },

  // Border radius scale
  radius: {
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.625rem", // 10px
    xl: "0.875rem", // 14px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const;

export type ThemeConfig = typeof themeConfig;
