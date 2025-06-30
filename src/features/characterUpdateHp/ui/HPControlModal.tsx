import React, { useCallback, useEffect, useRef, useState } from "react";
import { type Character, type Point } from "../../../shared/api/types"; // Importar Character
import useDismissable from "../../../shared/lib/hooks/useDismissable";
import { calculateNewHP } from "../../../shared/lib/utils/hpUtils";
import { DetatchIcon, XMarkIcon } from "../../../shared/ui/Icons";

interface HPControlModalProps {
  tokenId: string | null; // ID do Token no tabuleiro
  character: Character | null; // A ficha de personagem vinculada a este token
  anchorPoint: Point | null;
  isOpen: boolean;
  onClose: () => void;
  onHPChange: (tokenId: string, newHP: number) => void; // Atualizar HP no Token
  onRemoveFromBoard: (tokenId: string) => void; // Remove o Token do tabuleiro
  onMakeIndependent: (tokenId: string) => void; // Torna o Token independente
  zIndex?: number;
}

export const HP_MODAL_ESTIMATED_HEIGHT_REM = 2.5;

export function HPControlModal({
  tokenId,
  character,
  anchorPoint,
  isOpen,
  onClose,
  onHPChange,
  onRemoveFromBoard,
  onMakeIndependent,
  zIndex,
}: HPControlModalProps) {
  const [editableHP, setEditableHP] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Este useEffect sincroniza o HP do token com o estado local do input
    // Ele deve ser executado apenas quando o modal abre ou o token muda,
    // não durante a digitação do usuário para evitar "flickering".
    if (isOpen && character && character.maxHp !== undefined) {
      // Usar character.maxHp para inicializar
      setEditableHP(String(character.maxHp)); // Inicializar com maxHp do Character
    } else if (!character && isOpen) {
      // Se o character for nulo e o modal estiver aberto, feche-o.
      onClose();
    }
  }, [isOpen, character, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (
      !character ||
      character.maxHp === undefined // Apenas maxHp no Character
    ) {
      setEditableHP(String(character?.maxHp ?? 0));
      return;
    }

    // Para o HP atual, precisaremos do Token real, não apenas do Character.
    // Por enquanto, vamos assumir que o HP atual é o que está no input,
    // e que a validação será feita com base no maxHp do Character.
    // A lógica de `currentHp` no `Token` será tratada no `useCharactersState`.
    const currentActualHp = parseInt(editableHP, 10); // Usar o valor do input como HP atual
    const maxHp = character.maxHp;

    const newHP = calculateNewHP(editableHP, currentActualHp, maxHp);

    if (newHP !== null) {
      if (tokenId) {
        // Passar tokenId para onHPChange
        onHPChange(tokenId, newHP);
      }
      setEditableHP(String(newHP));
    } else {
      // Se a entrada for inválida, redefina para o HP atual (do input)
      setEditableHP(String(character.maxHp)); // Corrected line
    }
  }, [editableHP, character, onHPChange, tokenId]); // Adicionado tokenId

  const handleCloseAndSave = useCallback(() => {
    handleSubmit();
    onClose();
  }, [handleSubmit, onClose]);

  useDismissable(modalRef, isOpen, handleCloseAndSave);

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
  };

  const handleRemoveClick = () => {
    if (tokenId) {
      onRemoveFromBoard(tokenId);
    }
  };

  const handleMakeIndependentClick = () => {
    if (tokenId) {
      onMakeIndependent(tokenId);
    }
  };

  if (!isOpen || !tokenId || !character || !anchorPoint) {
    return null;
  }

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: `${anchorPoint.y}px`,
    left: `${anchorPoint.x}px`,
    zIndex: zIndex,
    height: `${HP_MODAL_ESTIMATED_HEIGHT_REM}rem`,
  };

  const showMakeIndependentButton = true;

  return (
    <div
      ref={modalRef}
      style={modalStyle}
      className={`bg-surface-1  p-1.5 rounded-md shadow-lg border flex items-center space-x-1.5`}
      role="dialog"
      aria-modal="true"
      aria-label="Controle de Vida"
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
        className="text-sm font-medium min-w-[1.25rem] text-center select-none"
      >
        {character.maxHp ?? "N/A"}
      </span>

      {showMakeIndependentButton && (
        <button
          onClick={handleMakeIndependentClick}
          className="hover:bg-accent-primary cursor-pointer ml-1 p-1 text-text-secondary  focus:outline-none focus:ring-1 focus:ring-accent-primary rounded-full flex items-center justify-center w-[1.5rem] h-[1.5rem]"
          title="Tornar Token Independente"
          aria-label="Tornar instância independente"
        >
          <DetatchIcon />
        </button>
      )}

      <button
        onClick={handleRemoveClick}
        className="hover:bg-accent-primary cursor-pointer ml-1 p-1 text-text-secondary  focus:outline-none focus:ring-1 focus:ring-accent-primary rounded-full flex items-center justify-center w-[1.5rem] h-[1.5rem]"
        title="Remover do Tabuleiro"
        aria-label="Remover instância do tabuleiro"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

//visto
