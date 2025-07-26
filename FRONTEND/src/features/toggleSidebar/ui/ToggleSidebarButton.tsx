import React from 'react';

interface ToggleSidebarButtonProps {
  isVisible: boolean;
  onClick: () => void;
  ariaLabel: string;
  title: string;
  icon: React.ReactNode;
  position: 'left' | 'right';
}

export function ToggleSidebarButton({
  isVisible,
  onClick,
  ariaLabel,
  title,
  icon,
  position,
}: ToggleSidebarButtonProps) {
  const baseClasses = "border border-surface-2 hover:bg-accent-primary-hover absolute top-1/2 -translate-y-1/2 bg-surface-1 p-2 shadow-lg z-10";
  const positionClasses = position === 'left'
    ? "left-0 border-l-0 rounded-r-md"
    : "right-0 border-r-0 rounded-l-md";

  if (isVisible) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${positionClasses}`}
      aria-label={ariaLabel}
      title={title}
    >
      {icon}
    </button>
  );
}
