import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  CharacterTypeEnum,
  type Character,
} from '@/entities/character/model/schemas/character.schema';

import { useDismissable } from '../../../shared/lib/hooks/useDismissable';

interface HPControlModalProps {
  tokenId: string | null;
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
  onHPChange: (tokenId: string, mode: 'damage' | 'heal', amount: number) => void;
  onTempHpChange: (tokenId: string, amount: number) => void;
  canModifyHp?: boolean;
  rightSidebarVisible?: boolean;
  zIndex?: number;
}

export const HP_MODAL_ESTIMATED_HEIGHT_REM = 3.25;

export function HPControlModal({
  tokenId,
  character,
  isOpen,
  onClose,
  onHPChange,
  onTempHpChange,
  canModifyHp = true,
  rightSidebarVisible = false,
  zIndex,
}: HPControlModalProps) {
  const [hpDelta, setHpDelta] = useState<string>('1');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && character) {
      setHpDelta('1');
    } else if (!character && isOpen) {
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

  const applyHpDelta = useCallback(
    (direction: 'damage' | 'heal') => {
      if (!character || !tokenId) {
        setHpDelta('1');
        return;
      }

      if (
        character.type !== CharacterTypeEnum.enum.Player &&
        character.type !== CharacterTypeEnum.enum.NPC
      ) {
        setHpDelta('1');
        return;
      }

      const amount = Number(hpDelta.trim());
      if (!Number.isInteger(amount) || amount < 1) {
        setHpDelta('1');
        return;
      }

      onHPChange(tokenId, direction, amount);
    },
    [character, hpDelta, onHPChange, tokenId],
  );

  useDismissable(modalRef, isOpen, onClose);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHpDelta(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleTempHpClick = () => {
    if (!tokenId) {
      return;
    }

    const amount = Number(hpDelta.trim());
    if (!Number.isInteger(amount) || amount < 1) {
      setHpDelta('1');
      return;
    }

    onTempHpChange(tokenId, amount);
  };

  if (!isOpen || !tokenId || !character) {
    return null;
  }

  const rightInset = rightSidebarVisible
    ? typeof window !== 'undefined' && window.innerWidth >= 768
      ? '25rem'
      : '21rem'
    : '1rem';

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    right: rightInset,
    bottom: '1rem',
    zIndex: zIndex,
    minHeight: `${HP_MODAL_ESTIMATED_HEIGHT_REM}rem`,
    maxWidth: 'min(32rem, calc(100vw - 2rem))',
  };

  return (
    <div
      ref={modalRef}
      style={modalStyle}
      className="hp-control-modal-root bg-surface-1 flex min-w-[26rem] flex-col gap-2 rounded-md border p-2 shadow-lg"
      role="dialog"
      aria-modal="true"
      aria-label="Controle de Vida"
    >
      <div className="flex items-center gap-2">
        <span
          className="max-w-[10rem] truncate text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary select-none"
          title={character.name}
        >
          {character.name}
        </span>
        <span className="text-xs select-none">HP:</span>
        <span
          data-testid="current-hp-display"
          className="min-w-[2.5rem] text-center text-sm font-semibold select-none"
        >
          {character.type === CharacterTypeEnum.enum.Player ||
          character.type === CharacterTypeEnum.enum.NPC
            ? character.combatStats.currentHp
            : 'N/A'}
        </span>
        <span className="text-text-secondary text-sm select-none">/</span>
        <span
          data-testid="max-hp-display"
          className="min-w-[1.5rem] text-center text-sm font-medium select-none"
        >
          {character.type === CharacterTypeEnum.enum.Player ||
          character.type === CharacterTypeEnum.enum.NPC
            ? character.combatStats.maxHp
            : 'N/A'}
        </span>
        <span className="ml-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-text-secondary select-none">
          THP:
        </span>
        <span
          data-testid="temp-hp-display"
          className="min-w-[1.5rem] text-center text-sm font-medium select-none"
        >
          {character.type === CharacterTypeEnum.enum.Player ||
          character.type === CharacterTypeEnum.enum.NPC
            ? character.combatStats.tempHp
            : 'N/A'}
        </span>
        {!canModifyHp ? (
          <span className="ml-auto text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-text-secondary select-none">
            Somente o mestre
          </span>
        ) : null}
      </div>
      <div className="flex items-center gap-1.5">
        <input
          ref={inputRef}
          type="number"
          min={1}
          step={1}
          value={hpDelta}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="hp-control-modal-input hide-arrows h-7 w-16 rounded-sm border p-1 text-center text-sm focus:ring-1"
          aria-label="Quantidade para aplicar"
          inputMode="numeric"
          disabled={!canModifyHp}
        />
        <button
          onClick={() => applyHpDelta('damage')}
          className="rounded-sm border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-feedback-negative focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          title="Aplicar dano"
          aria-label="Aplicar dano"
          disabled={!canModifyHp}
        >
          Dano
        </button>
        <button
          onClick={() => applyHpDelta('heal')}
          className="rounded-sm border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-feedback-positive focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          title="Aplicar cura"
          aria-label="Aplicar cura"
          disabled={!canModifyHp}
        >
          Cura
        </button>
        <button
          onClick={handleTempHpClick}
          className="rounded-sm border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-text-secondary focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          title="Conceder HP temporário"
          aria-label="Conceder HP temporário"
          disabled={!canModifyHp}
        >
          Temp
        </button>
      </div>
    </div>
  );
}
