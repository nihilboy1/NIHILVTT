import React, { useState, useEffect, useRef, useCallback } from "react";
import { type Token as TokenInfo, type Point } from "../../types"; // TokenInfo might be needed if HP is directly on instance
import { DetatchIcon, EjectIcon } from "../icons"; // BranchIcon removed
import { calculateNewHP } from "../../utils/hpUtils";
import useDismissable from "../../hooks/useDismissable";

interface HPControlModalProps {
  instanceId: string | null; // ID of the GridInstance
  tokenInfo: TokenInfo | null; // The TokenInfo sheet linked to this instance
  anchorPoint: Point | null;
  isOpen: boolean;
  onClose: () => void;
  onHPChange: (newHP: number) => void; // Will update HP on the linked TokenInfo
  onRemoveFromBoard: (instanceId: string) => void; // Removes the GridInstance
  onMakeIndependent: (instanceId: string) => void; // Makes the GridInstance independent
}

export const HP_MODAL_ESTIMATED_HEIGHT = 40;

const HPControlModal: React.FC<HPControlModalProps> = ({
  instanceId,
  tokenInfo,
  anchorPoint,
  isOpen,
  onClose,
  onHPChange,
  onRemoveFromBoard,
  onMakeIndependent,
}) => {
  const [editableHP, setEditableHP] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Este useEffect sincroniza o HP do token com o estado local do input
    // Ele deve ser executado apenas quando o modal abre ou o tokenInfo muda,
    // não durante a digitação do usuário para evitar "flickering".
    if (isOpen && tokenInfo && tokenInfo.currentHp !== undefined) {
      setEditableHP(String(tokenInfo.currentHp));
    } else if (!tokenInfo && isOpen) {
      // Se o tokenInfo for nulo e o modal estiver aberto, feche-o.
      onClose();
    }
  }, [isOpen, tokenInfo, onClose]); // Removido editableHP das dependências

  useEffect(() => {
    if (isOpen) {
      // Ainda precisamos disso para foco, separado da lógica de dismiss
      setTimeout(() => {
        inputRef.current?.focus();
        // Removido .select() para evitar seleção automática do texto
      }, 0);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (
      !tokenInfo ||
      tokenInfo.currentHp === undefined ||
      tokenInfo.maxHp === undefined
    ) {
      setEditableHP(String(tokenInfo?.currentHp ?? 0));
      return;
    }

    const currentActualHp = tokenInfo.currentHp;
    const maxHp = tokenInfo.maxHp;

    const newHP = calculateNewHP(editableHP, currentActualHp, maxHp);

    if (newHP !== null) {
      onHPChange(newHP);
      setEditableHP(String(newHP));
    } else {
      // Se a entrada for inválida, redefina para o HP atual
      setEditableHP(String(currentActualHp));
    }
  }, [editableHP, tokenInfo, onHPChange]);

  const handleCloseAndSave = useCallback(() => {
    handleSubmit();
    onClose();
  }, [handleSubmit, onClose]);

  useDismissable(modalRef, isOpen, handleCloseAndSave); // Removido "board-token-group" para permitir dismiss no grid

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableHP(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
      onClose();
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleInputBlur = () => {
    handleSubmit();
    // Do not call onClose() here, allow click on Eject/Branch button
  };

  const handleRemoveClick = () => {
    if (instanceId) {
      onRemoveFromBoard(instanceId);
      // onClose() will be called by App.tsx if needed
    }
  };

  const handleMakeIndependentClick = () => {
    if (instanceId) {
      onMakeIndependent(instanceId);
      // onClose() will be called by App.tsx
    }
  };

  if (!isOpen || !instanceId || !tokenInfo || !anchorPoint) {
    return null;
  }

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: `${anchorPoint.y}px`,
    left: `${anchorPoint.x}px`,
    zIndex: 100,
    height: `${HP_MODAL_ESTIMATED_HEIGHT}px`,
  };

  const showMakeIndependentButton = true;

  return (
    <div
      ref={modalRef}
      style={modalStyle}
      className={`bg-surface-1  p-1.5 rounded-md shadow-lg border flex items-center space-x-1.5`}
      role="dialog"
      aria-modal="true"
      aria-label="Controle de Vida" // Adicionado para acessibilidade
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-xs select-none mr-1">{"HP:"}</span>
      <input
        ref={inputRef}
        type="text"
        value={editableHP}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={handleInputBlur}
        className="w-12 h-7 p-1 text-center border rounded-sm text-sm focus:ring-1 hide-arrows "
        aria-label="Vida Atual"
        inputMode="tel"
      />
      <span className="text-text-secondary text-sm select-none">/</span>
      <span
        data-testid="max-hp-display"
        className="text-foreground text-sm font-medium min-w-[20px] text-center select-none"
      >
        {tokenInfo.maxHp ?? "N/A"}
      </span>

      {showMakeIndependentButton && (
        <button
          onClick={handleMakeIndependentClick}
          className="hover:bg-accent-primary cursor-pointer ml-1 p-1 text-text-secondary  focus:outline-none focus:ring-1 focus:ring-accent-primary rounded-full flex items-center justify-center w-6 h-6"
          title="Tornar Token Independente"
          aria-label="Tornar instância independente"
        >
          <DetatchIcon />
        </button>
      )}

      <button
        onClick={handleRemoveClick}
        className="hover:bg-accent-primary cursor-pointer ml-1 p-1 text-text-secondary  focus:outline-none focus:ring-1 focus:ring-accent-primary rounded-full flex items-center justify-center w-6 h-6"
        title="Remover do Tabuleiro"
        aria-label="Remover instância do tabuleiro"
      >
        <EjectIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default HPControlModal;
