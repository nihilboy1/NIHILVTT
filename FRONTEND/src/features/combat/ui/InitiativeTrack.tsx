import { useMemo, useState } from 'react';

import { useUIStore } from '@/features/layoutControls/model/store';
import { DraggablePanel } from '@/shared/ui/DraggablePanel';

import { useAuthStore } from '@/features/auth/model/authStore';
import { useGameStore } from '@/features/game/model/gameStore';
import {
  sendGameAdvanceCombatTurn,
  sendGameEndCombat,
  sendGameStartCombat,
} from '@/features/game/model/gameSessionApi';
import { applyGameSessionEvent } from '@/features/game/model/gameSessionEventHandlers';
import { useCharactersStore } from '@/entities/character/model/store';
import { useTokenStore } from '@/entities/token/model/store/tokenStore';
import { useCombatStore } from '@/features/combat/model/store';
import { AppButton } from '@/shared/ui/AppButton';
import { FloatingPanelDragBar } from '@/shared/ui/FloatingPanelDragBar';
import { cn } from '@/shared/lib/utils/cn';

interface InitiativeTrackProps {
  selectedTokenIds: string[];
}

function getParticipantLabel(
  tokenId: string,
  tokensOnBoard: ReturnType<typeof useTokenStore.getState>['tokensOnBoard'],
  characters: ReturnType<typeof useCharactersStore.getState>['characters'],
): string {
  const token = tokensOnBoard.find((entry) => entry.id === tokenId);
  if (!token) {
    return tokenId;
  }

  const character = characters.find((entry) => entry.id === token.characterId);
  if (!character) {
    return tokenId;
  }

  return character.name;
}

export function InitiativeTrack({ selectedTokenIds }: InitiativeTrackProps) {
  const currentGame = useGameStore((state) => state.currentGame);
  const currentUser = useAuthStore((state) => state.user);
  const isToolbarVisible = useUIStore((state) => state.isToolbarVisible);
  const isRightSidebarVisible = useUIStore((state) => state.isRightSidebarVisible);
  const combatState = useCombatStore((state) => state.combatState);
  const tokensOnBoard = useTokenStore((state) => state.tokensOnBoard);
  const characters = useCharactersStore((state) => state.characters);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = currentGame?.owner.id === currentUser?.id;
  const gameId = currentGame?.id ?? null;

  const participantLabels = useMemo(() => {
    if (!combatState) {
      return [];
    }

    return combatState.participants.map((participant, index) => ({
      ...participant,
      label: getParticipantLabel(participant.tokenId, tokensOnBoard, characters),
      isCurrentTurn: index === combatState.turnIndex,
    }));
  }, [characters, combatState, tokensOnBoard]);

  const canStartCombat = isOwner && !combatState && selectedTokenIds.length >= 2 && gameId != null;
  const canControlCombat = isOwner && combatState && gameId != null;

  const handleStartCombat = async () => {
    if (!gameId || !canStartCombat || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const event = await sendGameStartCombat(gameId, selectedTokenIds);
      applyGameSessionEvent(event);
    } catch {
      console.warn('Falha ao iniciar combate.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdvanceTurn = async () => {
    if (!gameId || !canControlCombat || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const event = await sendGameAdvanceCombatTurn(gameId);
      applyGameSessionEvent(event);
    } catch {
      console.warn('Falha ao avançar turno do combate.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndCombat = async () => {
    if (!gameId || !canControlCombat || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const event = await sendGameEndCombat(gameId);
      applyGameSessionEvent(event);
    } catch {
      console.warn('Falha ao encerrar combate.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!canStartCombat && !combatState) {
    return null;
  }

  return (
    <DraggablePanel
      className="pointer-events-auto z-40 flex w-[min(30rem,calc(100vw-2rem))] flex-col gap-3 rounded-xl border border-surface-2 bg-surface-1/95 p-3 shadow-lg backdrop-blur-sm"
      initialPosition={{ x: isToolbarVisible ? 80 : 16, y: 16 }}
      safeArea={{
        left: isToolbarVisible ? 80 : 16,
        top: 16,
        right: isRightSidebarVisible ? 400 : 16,
        bottom: 16,
      }}
    >
      <FloatingPanelDragBar title="Arrastar painel de combate" />
      {!combatState ? (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex flex-1 flex-col rounded-lg px-1 py-0.5 text-text-secondary/80">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">Combate</p>
            <p className="text-sm text-text-primary">{selectedTokenIds.length} tokens selecionados</p>
          </div>
          <AppButton disabled={isSubmitting} onClick={() => void handleStartCombat()}>
            Iniciar combate
          </AppButton>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex flex-1 flex-col rounded-lg px-1 py-0.5 text-text-secondary/80">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">Combate ativo</p>
              <p className="text-sm font-semibold text-text-primary">Rodada {combatState.round}</p>
            </div>
            {canControlCombat ? (
              <div className="flex items-center gap-2">
                <AppButton disabled={isSubmitting} onClick={() => void handleAdvanceTurn()}>
                  Próximo turno
                </AppButton>
                <AppButton disabled={isSubmitting} variant="danger" onClick={() => void handleEndCombat()}>
                  Encerrar
                </AppButton>
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {participantLabels.map((participant) => (
              <div
                key={participant.tokenId}
                className={cn(
                  'rounded-lg border px-2 py-1 text-xs',
                  participant.isCurrentTurn
                    ? 'border-accent-primary bg-accent-primary/15 text-text-primary'
                    : 'border-surface-2 bg-surface-0 text-text-secondary',
                )}
              >
                <span className="font-semibold">{participant.label}</span>{' '}
                <span>({participant.initiativeTotal})</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-lg border border-surface-2 bg-surface-0/80 p-2 text-xs text-text-secondary">
            <div className="rounded-md bg-surface-1 px-2 py-1">
              <span className="block text-[0.65rem] uppercase tracking-[0.14em]">Ação</span>
              <span className="font-semibold text-text-primary">
                {combatState.turnResources.actionAvailable ? 'Disponível' : 'Gasta'}
              </span>
            </div>
            <div className="rounded-md bg-surface-1 px-2 py-1">
              <span className="block text-[0.65rem] uppercase tracking-[0.14em]">Ação bônus</span>
              <span className="font-semibold text-text-primary">
                {combatState.turnResources.bonusActionAvailable ? 'Disponível' : 'Gasta'}
              </span>
            </div>
            <div className="rounded-md bg-surface-1 px-2 py-1">
              <span className="block text-[0.65rem] uppercase tracking-[0.14em]">Movimento</span>
              <span className="font-semibold text-text-primary">
                {combatState.turnResources.remainingMovementCells}/{combatState.turnResources.totalMovementCells}
              </span>
            </div>
          </div>
        </>
      )}
    </DraggablePanel>
  );
}
