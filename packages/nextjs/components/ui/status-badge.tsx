import React from "react";
import { cn } from "../../utils/scaffold-eth/common";

export type DealStatus = "POSTED" | "SCORING" | "BIDDING" | "APPROVED" | "SETTLING" | "COMPLETED" | "REFUNDED";

export interface StatusBadgeProps {
  status: DealStatus;
  className?: string;
}

/**
 * StatusBadge - Color-coded status indicator for deals
 *
 * Features:
 * - Color-coded states for each deal status
 * - Rounded-full shape
 * - Light and dark mode support
 * - Consistent border and background styling
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig: Record<DealStatus, { bg: string; text: string; border: string }> = {
    POSTED: {
      bg: "bg-blue-500/10",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-500/30",
    },
    SCORING: {
      bg: "bg-purple-500/10",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-500/30",
    },
    BIDDING: {
      bg: "bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/30",
    },
    APPROVED: {
      bg: "bg-green-500/10",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-500/30",
    },
    SETTLING: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-500/30",
    },
    COMPLETED: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/30",
    },
    REFUNDED: {
      bg: "bg-red-500/10",
      text: "text-red-600 dark:text-red-400",
      border: "border-red-500/30",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        config.bg,
        config.text,
        config.border,
        className,
      )}
    >
      {status}
    </span>
  );
};
