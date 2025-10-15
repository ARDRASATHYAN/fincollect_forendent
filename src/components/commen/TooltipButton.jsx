"use client";
import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";


/**
 * TooltipButton
 * @param {string} label - Tooltip text shown on hover
 * @param {ReactNode} children - The button or icon inside
 * @param {function} onClick - Button click handler
 * @param {string} className - Custom Tailwind classes
 */
export default function TooltipButton({
  label,
  children,
  onClick,
  className = "",
}) {
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={`px-2 py-1 rounded transition ${className}`}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  );
}
