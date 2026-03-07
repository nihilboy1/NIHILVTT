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

const QUICK_PRESET_VALUES = [1, 5, 10, 20];

type HpActionMode = 'damage' | 'heal' | 'temp';

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
  const [activeMode, setActiveMode] = useState<HpActionMode>('damage');
  const [amountByMode, setAmountByMode] = useState<Record<HpActionMode, number>>({
    damage: 1,
    heal: 1,
    temp: 1,
  });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!character && isOpen) {
      onClose();
    }
  }, [isOpen, character, onClose]);

  const activeAmount = amountByMode[activeMode];

  const updateModeAmount = useCallback((mode: HpActionMode, nextValue: number) => {
    setAmountByMode((current) => ({
      ...current,
      [mode]: Math.max(1, Math.trunc(nextValue)),
    }));
  }, []);

  const applyHpDelta = useCallback(
    (direction: 'damage' | 'heal', amount: number) => {
      if (!character || !tokenId) {
        return;
      }

      if (
        character.type !== CharacterTypeEnum.enum.Player &&
        character.type !== CharacterTypeEnum.enum.NPC
      ) {
        return;
      }

      onHPChange(tokenId, direction, amount);
    },
    [character, onHPChange, tokenId],
  );

  useDismissable(modalRef, isOpen, onClose);

  const handleTempHpClick = () => {
    if (!tokenId) {
      return;
    }

    onTempHpChange(tokenId, amountByMode.temp);
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
    y: typeof window !== 'undefined' ? Math.max(16, window.innerHeight - estimatedHeight - 16) : 16,
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
        <FloatingPanelDragBar title="Arrastar controle de vida" insetClassName="-mx-2 -mt-2 mb-2" />
        <div className="flex items-center gap-2">
          <span
            className="text-text-secondary max-w-[10rem] truncate text-xs font-semibold tracking-[0.08em] uppercase select-none"
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
          <span className="text-text-secondary ml-1 text-[0.65rem] font-semibold tracking-[0.08em] uppercase select-none">
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
            <span className="text-text-secondary ml-auto text-[0.65rem] font-semibold tracking-[0.08em] uppercase select-none">
              Somente o mestre
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-sm border" data-no-panel-drag="true">
            <button
              type="button"
              onClick={() => updateModeAmount(activeMode, activeAmount - 1)}
              className="text-text-secondary px-2 py-1 text-sm font-semibold focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Diminuir valor"
              title="Diminuir valor"
              disabled={!canModifyHp}
            >
              -
            </button>
            <span
              className="text-text-primary min-w-[2.2rem] px-1 text-center text-sm font-semibold select-none"
              data-testid="hp-active-amount"
            >
              {activeAmount}
            </span>
            <button
              type="button"
              onClick={() => updateModeAmount(activeMode, activeAmount + 1)}
              className="text-text-secondary px-2 py-1 text-sm font-semibold focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Aumentar valor"
              title="Aumentar valor"
              disabled={!canModifyHp}
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-1" data-no-panel-drag="true">
            {QUICK_PRESET_VALUES.map((preset) => (
              <button
                key={`hp-preset-${preset}`}
                type="button"
                onClick={() => updateModeAmount(activeMode, preset)}
                className="text-text-secondary rounded-sm border px-1.5 py-1 text-[0.65rem] font-semibold focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={`Definir valor ${preset}`}
                title={`Definir valor ${preset}`}
                disabled={!canModifyHp}
              >
                +{preset}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setActiveMode('damage');
              applyHpDelta('damage', amountByMode.damage);
            }}
            className="text-feedback-negative rounded-sm border px-2 py-1 text-[0.65rem] font-semibold tracking-[0.08em] uppercase focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            title="Aplicar dano"
            aria-label="Aplicar dano"
            disabled={!canModifyHp}
            data-no-panel-drag="true"
          >
            Dano
          </button>
          <button
            onClick={() => {
              setActiveMode('heal');
              applyHpDelta('heal', amountByMode.heal);
            }}
            className="text-feedback-positive rounded-sm border px-2 py-1 text-[0.65rem] font-semibold tracking-[0.08em] uppercase focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            title="Aplicar cura"
            aria-label="Aplicar cura"
            disabled={!canModifyHp}
            data-no-panel-drag="true"
          >
            Cura
          </button>
          <button
            onClick={() => {
              setActiveMode('temp');
              handleTempHpClick();
            }}
            className="text-text-secondary rounded-sm border px-2 py-1 text-[0.65rem] font-semibold tracking-[0.08em] uppercase focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
