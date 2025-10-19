/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */
"use client";

import React, { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */

/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */

/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */

/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */

/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */

/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */

/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */

/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */

/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */

/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */

/**
 * AuthModal Component
 *
 * A glassmorphism-styled modal for authentication flows.
 * This component can be used for custom authentication UI if needed.
 *
 * Requirements: 11.3, 11.4, 11.5
 */

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const AuthModal = ({ isOpen, onClose, title, children }: AuthModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Trap focus within modal
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleTab as any);
    firstElement?.focus();

    return () => {
      modal.removeEventListener("keydown", handleTab as any);
    };
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-base-300/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md glass-modal p-6 animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="modal-title" className="text-2xl font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-base-200/50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

/**
 * AuthButton Component
 *
 * A glassmorphism-styled button for authentication actions.
 * Supports different variants: primary, secondary, ghost.
 *
 * Requirements: 11.4
 */

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const AuthButton = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: AuthButtonProps) => {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "btn btn-primary shadow-md hover:shadow-lg",
    secondary: "btn btn-secondary shadow-sm hover:shadow-md",
    ghost: "btn btn-ghost hover:bg-base-200/50",
  };

  const sizeStyles = {
    sm: "btn-sm text-sm px-3 py-2",
    md: "text-base px-4 py-2.5",
    lg: "btn-lg text-base px-6 py-3",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

/**
 * AuthInput Component
 *
 * A glassmorphism-styled input field for authentication forms.
 *
 * Requirements: 11.3, 11.5
 */

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const AuthInput = ({ label, error, helperText, className = "", id, ...props }: AuthInputProps) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-2.5 rounded-lg glass bg-base-100/50 border border-base-300/30 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
          error ? "border-error focus:ring-error" : ""
        } ${className}`}
        aria-invalid={error ? true : false}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="text-sm opacity-70">
          {helperText}
        </p>
      )}
    </div>
  );
};
