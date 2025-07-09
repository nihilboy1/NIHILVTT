import React, { useCallback, useEffect, useRef, useState } from "react";
import { type Character, type Point, CharacterType, type Token } from "../../../shared/api/types"; // Importar Character e Token
import useDismissable from "../../../shared/lib/hooks/useDismissable";
import { calculateNewHP } from "../../../shared/lib/utils/hpUtils";
import { DetatchIcon, XMarkIcon } from "../../../shared/ui/Icons";

interface HPControlModalProps {
  tokenId: string | null; // ID do Token no tabuleiro
  character: Character | null; // A ficha de personagem vinculada a este token
  token: Token | null; // O token real no tabuleiro
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
  token, // Adicionado o prop token
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
    if (isOpen && token && character) { // Usar token para currentHp
      if (character.type === CharacterType.PLAYER || character.type === CharacterType.MONSTER_NPC) {
        setEditableHP(String(token.currentHp ?? character.combatStats.maxHp)); // Inicializar com currentHp do Token, ou maxHp do Character como fallback
      } else {
        setEditableHP("0"); // Para ObjectCharacter ou outros tipos sem maxHp
      }
    } else if (!token && isOpen) { // Se o token for nulo e o modal estiver aberto, feche-o.
      onClose();
    }
  }, [isOpen, token, character, onClose]); // Adicionado token às dependências

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (!character || !token) { // Verificar também o token
      setEditableHP("0");
      return;
    }

    let maxHp: number;
    let currentActualHp: number;

    if (character.type === CharacterType.PLAYER || character.type === CharacterType.MONSTER_NPC) {
      maxHp = character.combatStats.maxHp;
      currentActualHp = parseInt(editableHP, 10); // currentActualHp é o valor digitado no input
    } else {
      // Para ObjectCharacter ou outros tipos sem combatStats
      setEditableHP("0");
      return;
    }

    const newHP = calculateNewHP(editableHP, currentActualHp, maxHp);

    if (newHP !== null) {
      if (tokenId) {
        onHPChange(tokenId, newHP);
      }
      // Não atualize editableHP aqui, pois ele deve ser sincronizado pelo useEffect com o estado do token
      // setEditableHP(String(newHP)); // Removido para evitar dessincronização
    } else {
      setEditableHP(String(token.currentHp ?? maxHp)); // Reverter para o HP atual do token ou maxHp
    }
  }, [editableHP, character, token, onHPChange, tokenId]); // Adicionado token às dependências

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
        {(character.type === CharacterType.PLAYER || character.type === CharacterType.MONSTER_NPC) ? character.combatStats.maxHp : "N/A"}
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
