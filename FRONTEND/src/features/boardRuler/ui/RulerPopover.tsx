import React, { useEffect, useRef, useState } from "react";

import { RulerPlacementMode } from "../../../shared/api/types"; // Caminho corrigido

interface RulerPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: RulerPlacementMode;
  onSetMode: (mode: RulerPlacementMode) => void;
  rulerPersistsPath: boolean;
  onToggleRulerPersistPath: () => void;
  targetRef: React.RefObject<HTMLButtonElement | null>; // Referência ao botão que aciona o popover
}

export function RulerPopover({
  isOpen,
  onClose,
  currentMode,
  onSetMode,
  rulerPersistsPath,
  onToggleRulerPersistPath,
  targetRef,
}: RulerPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 }); // Posição do popover

  // Calcula a posição do popover em relação ao botão alvo
  useEffect(() => {
    if (targetRef.current && isOpen) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top, // Alinha com o topo do botão
        left: rect.right + 8, // Posiciona à direita do botão com um pequeno espaçamento
      });
    }
  }, [targetRef, isOpen]);

  // Fecha o popover ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) && // Click fora do popover
        targetRef.current &&
        !targetRef.current.contains(event.target as Node) // E fora do botão que o abriu
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, targetRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={popoverRef}
      className="bg-surface-1 fixed border rounded-md shadow-xl z-[60] w-56" // z-index alto e largura aumentada para o checkbox
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      role="dialog" // Papel semântico para o popover
      aria-label="Opções de Posicionamento da Régua"
    >
      <div>
        <button
          onClick={() => {
            onSetMode(RulerPlacementMode.SNAP_TO_CENTER);
            onClose(); // Fecha após a seleção
          }}
          className={`w-full text-left px-4 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50 rounded-t-md ${
            currentMode === RulerPlacementMode.SNAP_TO_CENTER
              ? "bg-accent-primary"
              : "hover:bg-accent-secondary"
          }`}
          role="option"
          aria-selected={currentMode === RulerPlacementMode.SNAP_TO_CENTER}
        >
          Fixar no Centro da Grade {/* Traduzido */}
        </button>
        <button
          onClick={() => {
            onSetMode(RulerPlacementMode.FREE_PLACEMENT);
            onClose(); // Fecha após a seleção
          }}
          className={`w-full text-left px-4 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-primary  ${
            currentMode === RulerPlacementMode.FREE_PLACEMENT
              ? "bg-accent-primary"
              : "hover:bg-accent-secondary"
          }`}
          role="option"
          aria-selected={currentMode === RulerPlacementMode.FREE_PLACEMENT}
        >
          Posicionamento Livre {/* Traduzido */}
        </button>

        {/* Divisor */}
        <div className="border-t my-1"></div>

        {/* Opção para persistir o caminho da régua */}
        <label
          htmlFor="persistRulerPath"
          className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent-secondary rounded-b-md"
        >
          <input
            type="checkbox"
            id="persistRulerPath"
            checked={rulerPersistsPath}
            onChange={onToggleRulerPersistPath}
            className="mr-2 h-4 w-4 rounded text-accent-primary focus:ring-accent-primary"
          />
          Manter marcação ao soltar {/* Traduzido */}
        </label>
      </div>
    </div>
  );
}
