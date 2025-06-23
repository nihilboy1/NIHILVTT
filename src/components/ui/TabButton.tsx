
import React from 'react';
import { SidebarTab } from '../../types'; // Assuming SidebarTab is defined in types.ts
import { type IconProps } from '../icons'; // Assuming IconProps is defined in icons.tsx

interface TabButtonProps {
  tab: SidebarTab;
  label: string;
  icon: React.ReactElement<IconProps>;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ tab, label, icon, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      aria-controls={`tabpanel-${tab.toLowerCase()}`} // For ARIA
      role="tab" // For ARIA
      id={`tab-${tab.toLowerCase()}`} // For ARIA
      className={`flex-1 py-3 px-2 flex flex-col items-center justify-center text-xs transition-colors cursor-pointer
                  ${isActive
                    ? `border-b-2 border-accent-primary bg-surface-1 `
                    : `border-b-2 text-theme-text-secondary hover:text-theme-foreground hover:bg-theme-input-bg`
                  }`}
    >
      {React.cloneElement(icon, { className: "w-5 h-5 mb-1" })}
      {label}
    </button>
  );
}
