import React, { useRef } from 'react';

import { Tool } from '../api/types';

import { ToolbarButton } from './ToolbarButton';

interface ToolbarPopoverButtonProps {
  label: string;
  icon: React.ReactNode;

  popoverComponent: React.ElementType;
  popoverProps: Record<string, unknown>;
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  toolType: Tool;
  activePopover: 'ruler' | 'dice' | null;
  setActivePopover: React.Dispatch<React.SetStateAction<'ruler' | 'dice' | null>>;
  popoverName: 'ruler' | 'dice';
}

export function ToolbarPopoverButton({
  label,
  icon,
  popoverComponent: Popover,
  popoverProps,
  activeTool,
  setActiveTool,
  toolType,
  activePopover,
  setActivePopover,
  popoverName,
}: ToolbarPopoverButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setActiveTool(toolType);
    setActivePopover((prev) => (prev === popoverName ? null : popoverName));
  };

  return (
    <div className="relative w-full">
      <ToolbarButton
        ref={buttonRef}
        label={label}
        icon={icon}
        onClick={handleClick}
        variant={
          activePopover === popoverName ? 'toggled' : activeTool === toolType ? 'active' : 'default'
        }
      />
      {activePopover === popoverName && buttonRef.current && (
        <Popover
          isOpen={activePopover === popoverName}
          onClose={() => setActivePopover(null)}
          targetRef={buttonRef}
          {...popoverProps}
        />
      )}
    </div>
  );
}
