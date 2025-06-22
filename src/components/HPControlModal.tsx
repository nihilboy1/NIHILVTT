import React, { useState, useEffect, useRef, useCallback } from "react";
import { type Token as TokenInfo, type Point } from "../types"; // TokenInfo might be needed if HP is directly on instance
import { EjectIcon } from "./icons"; // BranchIcon removed

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

  /**
   * Efeito para INICIALIZAR o valor do input de HP quando o modal abre
   * ou quando o token sendo visualizado é alterado.
   */
  useEffect(() => {
    if (isOpen && tokenInfo) {
      // Sempre que o modal abrir ou o tokenInfo mudar,
      // definimos o valor do input para ser o HP atual do token.
      setEditableHP(String(tokenInfo.currentHp ?? 0));
    }
  }, [isOpen, tokenInfo]); // <-- DEPENDÊNCIAS CORRIGIDAS: reage apenas à abertura ou à troca de token.

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        const targetElement = event.target as HTMLElement;
        if (!targetElement.closest(".board-token-group")) {
          onClose();
        }
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

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
    let newCalculatedHP = currentActualHp;

    const trimmedInput = editableHP.trim();

    if (trimmedInput.startsWith("+") || trimmedInput.startsWith("-")) {
      const isPositive = trimmedInput.startsWith("+");
      const valueStr = trimmedInput.substring(1);
      const value = parseInt(valueStr, 10);

      if (!isNaN(value) && value >= 0) {
        newCalculatedHP = isPositive
          ? currentActualHp + value
          : currentActualHp - value;
      } else {
        setEditableHP(String(currentActualHp));
        return;
      }
    } else {
      const value = parseInt(trimmedInput, 10);
      if (!isNaN(value)) {
        newCalculatedHP = value;
      } else {
        setEditableHP(String(currentActualHp));
        return;
      }
    }

    const validatedHP = Math.max(0, Math.min(newCalculatedHP, maxHp));
    onHPChange(validatedHP); // This will update the TokenInfo linked to the instance
    setEditableHP(String(validatedHP));
  }, [editableHP, tokenInfo, onHPChange]);

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
      className={`bg-theme-input-bg bg-opacity-90 p-1.5 rounded-md shadow-lg border border-theme-border-inactive flex items-center space-x-1.5`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-xs text-theme-text-secondary mr-0.5 select-none">
        HP:
      </span>
      <input
        ref={inputRef}
        type="text"
        value={editableHP}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={handleInputBlur}
        className="w-12 h-7 p-1 bg-theme-background border border-theme-border-inactive rounded-sm text-theme-foreground text-sm focus:ring-1 focus:ring-theme-border-active hide-arrows"
        aria-label="Vida Atual"
        style={{ MozAppearance: "textfield" }}
        inputMode="tel"
      />
      <span className="text-theme-text-secondary text-sm select-none">/</span>
      <span className="text-theme-foreground text-sm font-medium min-w-[20px] text-center select-none">
        {tokenInfo.maxHp ?? "N/A"}
      </span>

      {showMakeIndependentButton && (
        <button
          onClick={handleMakeIndependentClick}
          className="ml-1 p-1 text-theme-text-secondary hover:text-theme-accent-primary focus:outline-none focus:ring-1 focus:ring-theme-accent-primary rounded-full flex items-center justify-center w-6 h-6"
          title="Tornar Instância Independente (Cria Cópia da Ficha)"
          aria-label="Tornar instância independente"
        >
          <span className="font-bold text-sm">I</span>
        </button>
      )}

      <button
        onClick={handleRemoveClick}
        className="ml-1 p-1 text-theme-text-secondary hover:text-theme-accent-negative focus:outline-none focus:ring-1 focus:ring-theme-accent-negative rounded-full"
        title="Remover do Tabuleiro"
        aria-label="Remover instância do tabuleiro"
      >
        <EjectIcon className="w-4 h-4" />
      </button>
      <style>{`
        .hide-arrows::-webkit-outer-spin-button,
        .hide-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default HPControlModal;
