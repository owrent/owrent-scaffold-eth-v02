/**
 * Accessibility Utilities
 *
 * Helper functions for implementing accessibility features
 * Requirements: 14.1, 14.2, 14.3, 14.4, 14.5
 */

/**
 * Generate a unique ID for ARIA relationships
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 */
export const generateAriaId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Announce message to screen readers
 * @param message - Message to announce
 * @param priority - Priority level (polite or assertive)
 */
export const announceToScreenReader = (message: string, priority: "polite" | "assertive" = "polite"): void => {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Check if user prefers reduced motion
 * @returns True if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Trap focus within a container (for modals, dropdowns)
 * @param container - Container element
 * @returns Cleanup function
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  };

  container.addEventListener("keydown", handleKeyDown);

  // Focus first element
  firstFocusable?.focus();

  // Return cleanup function
  return () => {
    container.removeEventListener("keydown", handleKeyDown);
  };
};

/**
 * Get accessible label for wallet address
 * @param address - Wallet address
 * @returns Accessible label
 */
export const getWalletAddressLabel = (address: string): string => {
  if (!address) return "No wallet connected";

  const start = address.slice(0, 6);
  const end = address.slice(-4);

  return `Wallet address ${start} ... ${end}. Full address: ${address}`;
};

/**
 * Format number for screen readers
 * @param value - Number value
 * @param decimals - Number of decimals
 * @returns Formatted string
 */
export const formatNumberForScreenReader = (value: number, decimals: number = 2): string => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Get ARIA label for theme toggle
 * @param isDark - Current theme is dark
 * @returns ARIA label
 */
export const getThemeToggleLabel = (isDark: boolean): string => {
  return `Switch to ${isDark ? "light" : "dark"} mode`;
};

/**
 * Handle escape key to close modals/dropdowns
 * @param callback - Function to call on escape
 * @returns Cleanup function
 */
export const handleEscapeKey = (callback: () => void): (() => void) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      callback();
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
};

/**
 * Get ARIA label for loading state
 * @param isLoading - Loading state
 * @param loadingText - Text to show when loading
 * @param loadedText - Text to show when loaded
 * @returns ARIA label
 */
export const getLoadingLabel = (
  isLoading: boolean,
  loadingText: string = "Loading",
  loadedText: string = "Loaded",
): string => {
  return isLoading ? loadingText : loadedText;
};

/**
 * Validate ARIA attributes
 * @param element - Element to validate
 * @returns Validation errors
 */
export const validateAriaAttributes = (element: HTMLElement): string[] => {
  const errors: string[] = [];

  // Check for aria-labelledby without matching ID
  const labelledBy = element.getAttribute("aria-labelledby");
  if (labelledBy && !document.getElementById(labelledBy)) {
    errors.push(`aria-labelledby references non-existent ID: ${labelledBy}`);
  }

  // Check for aria-describedby without matching ID
  const describedBy = element.getAttribute("aria-describedby");
  if (describedBy && !document.getElementById(describedBy)) {
    errors.push(`aria-describedby references non-existent ID: ${describedBy}`);
  }

  // Check for aria-controls without matching ID
  const controls = element.getAttribute("aria-controls");
  if (controls && !document.getElementById(controls)) {
    errors.push(`aria-controls references non-existent ID: ${controls}`);
  }

  return errors;
};
