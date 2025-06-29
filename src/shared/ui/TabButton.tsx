import React from "react";
import { SidebarTab } from "../api/types"; // Assuming SidebarTab is defined in types.ts
import { cn } from "../lib/utils/cn";
import { type IconProps } from "./Icons"; // Assuming IconProps is defined in icons.tsx

interface TabButtonProps {
  tab: SidebarTab;
  label: string;
  icon: React.ReactElement<IconProps>;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({
  tab,
  label,
  icon,
  isActive,
  onClick,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      aria-controls={`tabpanel-${tab.toLowerCase()}`} // For ARIA
      role="tab" // For ARIA
      id={`tab-${tab.toLowerCase()}`} // For ARIA
      className={cn(
        "flex-1 py-3 px-2 flex flex-col items-center justify-center text-xs cursor-pointer border-b-2",
        isActive ? "border-accent-primary " : "bg-surface-0 hover:bg-surface-3"
      )}
    >
      {React.cloneElement(icon, {
        className: "w-5 h-5 mb-1",
        "aria-hidden": true,
      })}
      {label}
    </button>
  );
}
