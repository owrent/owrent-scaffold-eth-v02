import { ComponentType, SVGProps } from "react";
import { cn } from "~~/utils/scaffold-eth/common";

/**
 * Icon Component
 *
 * A wrapper component for Heroicons that ensures consistent sizing,
 * styling, and accessibility across the application.
 *
 * @example
 * // Basic usage
 * <Icon icon={HomeIcon} />
 *
 * @example
 * // With custom size
 * <Icon icon={PlusIcon} size="sm" />
 *
 * @example
 * // Icon-only button (requires aria-label)
 * <button aria-label="Close dialog">
 *   <Icon icon={XMarkIcon} />
 * </button>
 *
 * @example
 * // Decorative icon (with adjacent text)
 * <button>
 *   <Icon icon={PlusIcon} aria-hidden="true" />
 *   <span>Create Deal</span>
 * </button>
 */

export interface IconProps {
  /** The Heroicon component to render */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Size variant - maps to standard icon sizes */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for icon-only buttons (required if not aria-hidden) */
  "aria-label"?: string;
  /** Mark icon as decorative (use when icon has adjacent text) */
  "aria-hidden"?: boolean;
}

const sizeMap = {
  sm: "h-4 w-4", // 16px - buttons, status indicators
  md: "h-5 w-5", // 20px - navigation, default
  lg: "h-6 w-6", // 24px - cards, feature icons
  xl: "h-8 w-8", // 32px - large buttons
  "2xl": "h-12 w-12", // 48px - empty states
};

export const Icon = ({ icon: IconComponent, size = "md", className = "", ...props }: IconProps) => {
  return <IconComponent className={cn(sizeMap[size], className)} {...props} />;
};
