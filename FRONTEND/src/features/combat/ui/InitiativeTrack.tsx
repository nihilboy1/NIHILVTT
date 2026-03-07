import { useMemo, useState } from 'react';

import { useCharactersStore } from '@/entities/character/model/store';
import { useTokenStore } from '@/entities/token/model/store/tokenStore';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useCombatStore } from '@/features/combat/model/store';
import {
  sendGameAdvanceCombatTurn,
  sendGameEndCombat,
  sendGameStartCombat,
} from '@/features/game/model/gameSessionApi';
import { applyGameSessionEvent } from '@/features/game/model/gameSessionEventHandlers';
import { useGameStore } from '@/features/game/model/gameStore';
import { useUIStore } from '@/features/layoutControls/model/store';
import { cn } from '@/shared/lib/utils/cn';
import { AppButton } from '@/shared/ui/AppButton';
import { DraggablePanel } from '@/shared/ui/DraggablePanel';
import { FloatingPanelDragBar } from '@/shared/ui/FloatingPanelDragBar';

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
  const runtimeCharactersById = useCharactersStore((state) => state.runtimeCharactersById);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = currentGame?.owner.id === currentUser?.id;
  const gameId = currentGame?.id ?? null;

  const aliveSelectedTokenIds = useMemo(() => {
    const uniqueSelectedTokenIds = Array.from(new Set(selectedTokenIds));
    return uniqueSelectedTokenIds.filter((tokenId) => {
      const token = tokensOnBoard.find((entry) => entry.id === tokenId);
      if (!token) {
        return false;
      }

      const runtimeCharacter = runtimeCharactersById[token.characterId];
      if (!runtimeCharacter) {
        return true;
      }

      const hasDeadCondition = runtimeCharacter.activeEffects.effects.some(
        (effect) => effect.linkedCondition === 'dead',
      );
      return !hasDeadCondition;
    });
  }, [runtimeCharactersById, selectedTokenIds, tokensOnBoard]);

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

  const canStartCombat =
    isOwner && !combatState && aliveSelectedTokenIds.length >= 2 && gameId != null;
  const canControlCombat = isOwner && combatState && gameId != null;

  const handleStartCombat = async () => {
    if (!gameId || !canStartCombat || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const event = await sendGameStartCombat(gameId, aliveSelectedTokenIds);
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
      className="border-surface-2 bg-surface-1/95 pointer-events-auto z-40 flex w-[min(30rem,calc(100vw-2rem))] flex-col gap-3 rounded-xl border p-3 shadow-lg backdrop-blur-sm"
      initialPosition={{ x: isToolbarVisible ? 80 : 16, y: 16 }}
      safeArea={{
        left: isToolbarVisible ? 80 : 16,
        top: 16,
        right: isRightSidebarVisible ? 400 : 16,
        bottom: 16,
      }}
    >
      <FloatingPanelDragBar title={combatState ? 'Combate ativo' : 'Combate'} />
      {!combatState ? (
        <div className="flex items-center justify-between gap-3">
          <div className="text-text-secondary/80 flex min-w-0 flex-1 flex-col rounded-lg px-1 py-0.5">
            <p className="text-text-secondary text-xs font-semibold tracking-[0.2em] uppercase">
              Combate
            </p>
            <p className="text-text-primary text-sm">
              {aliveSelectedTokenIds.length} tokens vivos selecionados
            </p>
          </div>
          <AppButton disabled={isSubmitting} onClick={() => void handleStartCombat()}>
            Iniciar combate
          </AppButton>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-3">
            <div className="text-text-secondary/80 flex min-w-0 flex-1 flex-col rounded-lg px-1 py-0.5">
              <p className="text-text-primary text-sm font-semibold">Rodada {combatState.round}</p>
            </div>
            {canControlCombat ? (
              <div className="flex items-center gap-2">
                <AppButton disabled={isSubmitting} onClick={() => void handleAdvanceTurn()}>
                  Próximo turno
                </AppButton>
                <AppButton
                  disabled={isSubmitting}
                  variant="danger"
                  onClick={() => void handleEndCombat()}
                >
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
          <div className="border-surface-2 bg-surface-0/80 text-text-secondary grid grid-cols-3 gap-2 rounded-lg border p-2 text-xs">
            <div className="bg-surface-1 rounded-md px-2 py-1">
              <span className="block text-[0.65rem] tracking-[0.14em] uppercase">Ação</span>
              <span className="text-text-primary font-semibold">
                {combatState.turnResources.actionAvailable ? 'Disponível' : 'Gasta'}
              </span>
            </div>
            <div className="bg-surface-1 rounded-md px-2 py-1">
              <span className="block text-[0.65rem] tracking-[0.14em] uppercase">Ação bônus</span>
              <span className="text-text-primary font-semibold">
                {combatState.turnResources.bonusActionAvailable ? 'Disponível' : 'Gasta'}
              </span>
            </div>
            <div className="bg-surface-1 rounded-md px-2 py-1">
              <span className="block text-[0.65rem] tracking-[0.14em] uppercase">Movimento</span>
              <span className="text-text-primary font-semibold">
                {combatState.turnResources.remainingMovementCells}/
                {combatState.turnResources.totalMovementCells}
              </span>
            </div>
          </div>
        </>
      )}
    </DraggablePanel>
  );
}
