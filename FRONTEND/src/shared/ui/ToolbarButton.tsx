import React from 'react';

import { cn } from '@/shared/lib/utils/cn';

export interface ToolbarButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'active' | 'toggled' | 'hide';
}

function ToolbarButtonComponent(
  { label, icon, onClick, variant = 'default' }: ToolbarButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const baseClasses =
    'border-surface-0 ml-[0.2rem] w-[90%] rounded-md border p-4 flex items-center justify-center transition-colors duration-150 ease-in-out cursor-pointer focus:outline-none';

  const variantClasses = {
    default: 'hover:bg-accent-primary-hover',
    active: 'bg-accent-primary text-accent-primary-text hover:bg-accent-primary-hover',
    toggled: 'bg-accent-secondary text-accent-primary-text hover:bg-accent-primary-hover',
    hide: 'hover:bg-accent-primary-hover mt-auto',
  };

  return (
    <button
      ref={ref}
      title={label}
      aria-label={label}
      aria-pressed={variant === 'active' || variant === 'toggled'}
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant])}
    >
      {icon}
    </button>
  );
}

ToolbarButtonComponent.displayName = 'ToolbarButton';

export const ToolbarButton = React.forwardRef(ToolbarButtonComponent);
