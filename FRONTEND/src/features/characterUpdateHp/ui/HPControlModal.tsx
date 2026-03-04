import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  CharacterTypeEnum,
  type Character,
} from '@/entities/character/model/schemas/character.schema';

import { useDismissable } from '../../../shared/lib/hooks/useDismissable';
import { DraggablePanel } from '../../../shared/ui/DraggablePanel';
import { FloatingPanelDragBar } from '../../../shared/ui/FloatingPanelDragBar';

interface HPControlModalProps {
  tokenId: string | null;
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
  onHPChange: (tokenId: string, mode: 'damage' | 'heal', amount: number) => void;
  onTempHpChange: (tokenId: string, amount: number) => void;
  canModifyHp?: boolean;
  canAccessContext?: boolean;
  dockSide?: 'left' | 'right';
  leftToolbarVisible?: boolean;
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
  canAccessContext = true,
  dockSide = 'right',
  leftToolbarVisible = true,
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

  if (!isOpen || !tokenId || !character || !canAccessContext) {
    return null;
  }

  const rightSafeArea = rightSidebarVisible
    ? typeof window !== 'undefined' && window.innerWidth >= 768
      ? 400
      : 336
    : 16;

  const modalStyle: React.CSSProperties = {
    zIndex: zIndex,
    maxWidth: 'calc(100vw - 2rem)',
    width: 'fit-content',
  };
  const leftSafeArea = leftToolbarVisible ? 80 : 16;
  const estimatedWidth = 336;
  const estimatedHeight = 104;
  const initialPosition = {
    x:
      typeof window !== 'undefined'
        ? dockSide === 'left'
          ? leftSafeArea
          : Math.max(leftSafeArea, window.innerWidth - estimatedWidth - rightSafeArea)
        : 16,
    y:
      typeof window !== 'undefined'
        ? Math.max(16, window.innerHeight - estimatedHeight - 16)
        : 16,
  };
  const safeArea = {
    bottom: 16,
    left: leftSafeArea,
    right: rightSafeArea,
    top: 16,
  };

  return (
    <DraggablePanel
      initialPosition={initialPosition}
      safeArea={safeArea}
      style={modalStyle}
      className="z-[100] w-fit max-w-[calc(100vw-2rem)]"
    >
      <div
        ref={modalRef}
        className="hp-control-modal-root bg-surface-1 flex w-fit max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-md border p-2 shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-label="Controle de Vida"
      >
        <FloatingPanelDragBar
          title="Arrastar controle de vida"
          insetClassName="-mx-2 -mt-2 mb-2"
        />
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
            data-no-panel-drag="true"
          />
          <button
            onClick={() => applyHpDelta('damage')}
            className="rounded-sm border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-feedback-negative focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            title="Aplicar dano"
            aria-label="Aplicar dano"
            disabled={!canModifyHp}
            data-no-panel-drag="true"
          >
            Dano
          </button>
          <button
            onClick={() => applyHpDelta('heal')}
            className="rounded-sm border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-feedback-positive focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            title="Aplicar cura"
            aria-label="Aplicar cura"
            disabled={!canModifyHp}
            data-no-panel-drag="true"
          >
            Cura
          </button>
          <button
            onClick={handleTempHpClick}
            className="rounded-sm border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-text-secondary focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            title="Conceder HP temporário"
            aria-label="Conceder HP temporário"
            disabled={!canModifyHp}
            data-no-panel-drag="true"
          >
            Temp
          </button>
        </div>
      </div>
    </DraggablePanel>
  );
}
