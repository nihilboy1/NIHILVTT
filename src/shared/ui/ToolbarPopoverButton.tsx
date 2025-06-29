import React, { useRef } from "react";
import { Tool } from "../api/types";
import { ToolbarButton } from "./ToolbarButton";

interface ToolbarPopoverButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean; // Se este botão representa a ferramenta ativa principal

  popoverComponent: React.ElementType;
  popoverProps: any; // Props específicas para o componente do popover
  activeTool: Tool; // Do UIContext
  setActiveTool: (tool: Tool) => void; // Do UIContext
  toolType: Tool; // O tipo de ferramenta associado a este botão
  activePopover: "ruler" | "dice" | null; // Do estado do Toolbar
  setActivePopover: React.Dispatch<
    React.SetStateAction<"ruler" | "dice" | null>
  >; // Do estado do Toolbar
  popoverName: "ruler" | "dice"; // Nome para identificar este popover
}

export function ToolbarPopoverButton({
  label,
  icon,
  isActive,
  popoverComponent: Popover,
  popoverProps,
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
    <div className="w-full relative">
      <ToolbarButton
        ref={buttonRef}
        label={label}
        icon={icon}
        isActive={isActive}
        isToggled={activePopover === popoverName}
        onClick={handleClick}
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
