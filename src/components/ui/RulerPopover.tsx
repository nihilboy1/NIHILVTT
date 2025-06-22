

import React, { useEffect, useRef, useState } from 'react';
import { RulerPlacementMode } from '../../types/index'; // Caminho corrigido

interface RulerPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: RulerPlacementMode;
  onSetMode: (mode: RulerPlacementMode) => void;
  rulerPersistsPath: boolean;
  onToggleRulerPersistPath: () => void;
  targetRef: React.RefObject<HTMLButtonElement | null>; // Referência ao botão que aciona o popover
}

const RulerPopover: React.FC<RulerPopoverProps> = ({
  isOpen,
  onClose,
  currentMode,
  onSetMode,
  rulerPersistsPath,
  onToggleRulerPersistPath,
  targetRef,
}) => {
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
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, targetRef]);


  if (!isOpen) {
    return null;
  }

  // Classes CSS para os botões de opção
  const baseButtonClass = "w-full text-left px-4 py-2 text-sm text-foreground transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50";
  const selectedButtonClass = `bg-accent-primary text-accent-primary-text`;
  const unselectedButtonClass = `hover:bg-accent-secondary`;


  return (
    <div
      ref={popoverRef}
      className="bg-surface-1 fixed border border-border-inactive rounded-md shadow-xl z-[60] w-56" // z-index alto e largura aumentada para o checkbox
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      role="dialog" // Papel semântico para o popover
      aria-label="Opções de Posicionamento da Régua" 
    >
      <div > 
        <button
          onClick={() => {
            onSetMode(RulerPlacementMode.SNAP_TO_CENTER);
            onClose(); // Fecha após a seleção
          }}
          className={`${baseButtonClass} rounded-t-md ${currentMode === RulerPlacementMode.SNAP_TO_CENTER ? selectedButtonClass : unselectedButtonClass}`}
          aria-pressed={currentMode === RulerPlacementMode.SNAP_TO_CENTER} // Indica se está selecionado
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
          className={`${baseButtonClass} ${currentMode === RulerPlacementMode.FREE_PLACEMENT ? selectedButtonClass : unselectedButtonClass}`}
          aria-pressed={currentMode === RulerPlacementMode.FREE_PLACEMENT}
          role="option"
          aria-selected={currentMode === RulerPlacementMode.FREE_PLACEMENT}
        >
          Posicionamento Livre {/* Traduzido */}
        </button>
        
        {/* Divisor */}
        <div className="border-t border-border-inactive my-1"></div>

        {/* Opção para persistir o caminho da régua */}
        <label 
          htmlFor="persistRulerPath" 
          className="flex items-center px-3 py-2 text-sm text-foreground cursor-pointer hover:bg-accent-secondary rounded-b-md"
        >
          <input
            type="checkbox"
            id="persistRulerPath"
            checked={rulerPersistsPath}
            onChange={onToggleRulerPersistPath}
            className="mr-2 h-4 w-4 rounded border-border-inactive text-accent-primary focus:ring-accent-primary bg-input-bg"
          />
          Manter marcação ao soltar {/* Traduzido */}
        </label>
      </div>
    </div>
  );
};

export default RulerPopover;
