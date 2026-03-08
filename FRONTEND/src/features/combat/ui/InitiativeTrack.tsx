import { type DragEvent, useMemo, useState } from 'react';

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
import { Modal } from '@/shared/ui/Modal';

interface InitiativeTrackProps {
  selectedTokenIds: string[];
}

type CombatSetupMode = 'freeForAll' | 'teams';

const DEFAULT_TEAM_IDS = ['team-1', 'team-2'];

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
  const [isModeModalOpen, setIsModeModalOpen] = useState(false);
  const [isTeamsModalOpen, setIsTeamsModalOpen] = useState(false);
  const [plannerTeamIds, setPlannerTeamIds] = useState<string[]>(DEFAULT_TEAM_IDS);
  const [plannerTeamAssignments, setPlannerTeamAssignments] = useState<Record<string, string>>({});
  const [plannerTeamSequence, setPlannerTeamSequence] = useState(3);
  const [draggingTokenId, setDraggingTokenId] = useState<string | null>(null);
  const [startCombatError, setStartCombatError] = useState<string | null>(null);

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

  const selectedTokenRows = useMemo(
    () =>
      aliveSelectedTokenIds.map((tokenId) => {
        const token = tokensOnBoard.find((entry) => entry.id === tokenId);
        const character = token
          ? characters.find((entry) => entry.id === token.characterId)
          : undefined;

        return {
          tokenId,
          label: character?.name ?? tokenId,
          imageUrl: character?.image ?? null,
        };
      }),
    [aliveSelectedTokenIds, characters, tokensOnBoard],
  );

  const teamTokenIdsMap = useMemo(() => {
    const next = new Map<string, string[]>();
    plannerTeamIds.forEach((teamId) => {
      next.set(teamId, []);
    });

    selectedTokenRows.forEach(({ tokenId }) => {
      const assignedTeamId = plannerTeamAssignments[tokenId];
      if (!assignedTeamId || !next.has(assignedTeamId)) {
        return;
      }
      next.get(assignedTeamId)?.push(tokenId);
    });

    return next;
  }, [plannerTeamAssignments, plannerTeamIds, selectedTokenRows]);

  const selectedTokenMetaById = useMemo(
    () =>
      new Map(
        selectedTokenRows.map((row) => [row.tokenId, { label: row.label, imageUrl: row.imageUrl }]),
      ),
    [selectedTokenRows],
  );

  const unassignedTokenRows = useMemo(
    () =>
      selectedTokenRows.filter(({ tokenId }) => {
        const assignedTeamId = plannerTeamAssignments[tokenId];
        return !assignedTeamId || !plannerTeamIds.includes(assignedTeamId);
      }),
    [plannerTeamAssignments, plannerTeamIds, selectedTokenRows],
  );

  const isTeamDistributionValid = useMemo(
    () =>
      selectedTokenRows.every(({ tokenId }) => {
        const assignedTeamId = plannerTeamAssignments[tokenId];
        return assignedTeamId != null && plannerTeamIds.includes(assignedTeamId);
      }),
    [plannerTeamAssignments, plannerTeamIds, selectedTokenRows],
  );

  const autoBalanceTeamAssignments = (
    tokenIds: string[],
    teamIds: string[],
  ): Record<string, string> => {
    const assignments: Record<string, string> = {};
    tokenIds.forEach((tokenId, index) => {
      const nextTeamId = teamIds[index % teamIds.length];
      if (!nextTeamId) {
        return;
      }
      assignments[tokenId] = nextTeamId;
    });
    return assignments;
  };

  const resetTeamPlanner = (tokenIds: string[]) => {
    const nextTeamIds = [...DEFAULT_TEAM_IDS];
    setPlannerTeamIds(nextTeamIds);
    setPlannerTeamSequence(3);
    setPlannerTeamAssignments(autoBalanceTeamAssignments(tokenIds, nextTeamIds));
  };

  const closeStartCombatModals = () => {
    setIsModeModalOpen(false);
    setIsTeamsModalOpen(false);
  };

  const resolveApiErrorMessage = (error: unknown): string => {
    if (
      error != null &&
      typeof error === 'object' &&
      'formError' in error &&
      typeof (error as { formError?: unknown }).formError === 'string'
    ) {
      return (error as { formError: string }).formError;
    }

    return 'Falha ao iniciar combate.';
  };

  const submitStartCombat = async (
    mode: CombatSetupMode,
    teams?: Array<{ teamId: string; tokenIds: string[] }>,
  ) => {
    if (!gameId || !canStartCombat || isSubmitting) {
      return;
    }

    setStartCombatError(null);
    setIsSubmitting(true);
    try {
      const event = await sendGameStartCombat(gameId, aliveSelectedTokenIds, mode, teams);
      applyGameSessionEvent(event);
      closeStartCombatModals();
    } catch (error) {
      setStartCombatError(resolveApiErrorMessage(error));
      console.warn('Falha ao iniciar combate.', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenStartCombatFlow = () => {
    if (!canStartCombat || isSubmitting) {
      return;
    }

    setStartCombatError(null);
    setIsModeModalOpen(true);
  };

  const handleSelectStartMode = (mode: CombatSetupMode) => {
    if (!canStartCombat || isSubmitting) {
      return;
    }

    if (mode === 'freeForAll') {
      void submitStartCombat('freeForAll');
      return;
    }

    resetTeamPlanner(aliveSelectedTokenIds);
    setIsModeModalOpen(false);
    setIsTeamsModalOpen(true);
  };

  const handleAssignTokenToTeam = (tokenId: string, teamId: string) => {
    setPlannerTeamAssignments((prev) => ({
      ...prev,
      [tokenId]: teamId,
    }));
  };

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleTokenDragStart = (tokenId: string) => {
    setDraggingTokenId(tokenId);
  };

  const handleTokenDragEnd = () => {
    setDraggingTokenId(null);
  };

  const handleTeamDrop = (teamId: string) => {
    if (!draggingTokenId) {
      return;
    }

    handleAssignTokenToTeam(draggingTokenId, teamId);
    setDraggingTokenId(null);
  };

  const handleUnassignedDrop = () => {
    if (!draggingTokenId) {
      return;
    }

    setPlannerTeamAssignments((prev) => {
      if (!(draggingTokenId in prev)) {
        return prev;
      }
      const next = { ...prev };
      delete next[draggingTokenId];
      return next;
    });
    setDraggingTokenId(null);
  };

  const handleAutoBalanceTeams = () => {
    setPlannerTeamAssignments(autoBalanceTeamAssignments(aliveSelectedTokenIds, plannerTeamIds));
  };

  const handleAddTeam = () => {
    const nextTeamId = `team-${plannerTeamSequence}`;
    setPlannerTeamSequence((prev) => prev + 1);
    setPlannerTeamIds((prev) => [...prev, nextTeamId]);
  };

  const handleRemoveTeam = (teamId: string) => {
    if (plannerTeamIds.length <= 2) {
      return;
    }

    const assignedTokenIds = teamTokenIdsMap.get(teamId) ?? [];
    if (assignedTokenIds.length > 0) {
      return;
    }

    setPlannerTeamIds((prev) => prev.filter((entry) => entry !== teamId));
  };

  const handleConfirmTeamsStart = async () => {
    if (!isTeamDistributionValid) {
      setStartCombatError('Distribua todos os tokens em um time antes de iniciar o combate.');
      return;
    }

    const teams = plannerTeamIds
      .map((teamId) => ({
        teamId,
        tokenIds: teamTokenIdsMap.get(teamId) ?? [],
      }))
      .filter((team) => team.tokenIds.length > 0);

    await submitStartCombat('teams', teams);
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
      className="border-surface-2 bg-surface-1/95 pointer-events-auto z-40 flex w-[min(44rem,calc(100vw-2rem))] flex-col gap-3 rounded-xl border p-3 shadow-lg backdrop-blur-sm"
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
            {startCombatError ? (
              <p className="text-feedback-negative mt-1 text-xs">{startCombatError}</p>
            ) : null}
          </div>
          <AppButton disabled={isSubmitting} onClick={handleOpenStartCombatFlow}>
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

      <Modal
        isOpen={isModeModalOpen}
        onClose={() => setIsModeModalOpen(false)}
        title="Modo de combate"
        hideFooter
      >
        <div className="space-y-4">
          <p className="text-text-secondary text-sm">
            Escolha como os participantes selecionados entram no combate.
          </p>
          <div className="grid gap-3">
            <button
              type="button"
              className="border-surface-2 bg-surface-0 hover:border-accent-primary rounded-lg border p-3 text-left transition-colors"
              onClick={() => handleSelectStartMode('freeForAll')}
              disabled={isSubmitting}
            >
              <p className="text-text-primary text-sm font-semibold">Todos contra todos</p>
              <p className="text-text-secondary mt-1 text-xs">
                Ninguém é aliado; cada token combate por conta própria.
              </p>
            </button>
            <button
              type="button"
              className="border-surface-2 bg-surface-0 hover:border-accent-primary rounded-lg border p-3 text-left transition-colors"
              onClick={() => handleSelectStartMode('teams')}
              disabled={isSubmitting}
            >
              <p className="text-text-primary text-sm font-semibold">Combate por times</p>
              <p className="text-text-secondary mt-1 text-xs">
                Aliado = mesmo teamId. Você organiza os times antes de iniciar.
              </p>
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isTeamsModalOpen}
        onClose={() => setIsTeamsModalOpen(false)}
        title="Organizar times"
        hideFooter
        modalClassName="max-w-[90vw]"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-text-secondary text-sm">
              Distribua {aliveSelectedTokenIds.length} tokens nos times antes de iniciar.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <AppButton
                variant="secondary"
                onClick={handleAutoBalanceTeams}
                disabled={isSubmitting}
              >
                Auto-balance inicial
              </AppButton>
              <AppButton variant="secondary" onClick={handleAddTeam} disabled={isSubmitting}>
                Novo time
              </AppButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div
              className={cn(
                'border-surface-2 bg-surface-0 flex h-full min-h-[18rem] flex-col rounded-lg border p-3',
                draggingTokenId ? 'border-accent-primary/80' : null,
              )}
              onDragOver={handleDragOver}
              onDrop={handleUnassignedDrop}
              style={{ minWidth: '18rem', flex: 1 }}
            >
              <p className="text-text-primary mb-1 text-sm font-semibold">Tokens sem time</p>
              <p className="text-text-secondary mb-2 text-xs">
                Arraste os tokens para um bloco de time. Para remover de um time, arraste de volta
                para esta area.
              </p>
              <div className="flex flex-wrap gap-2">
                {unassignedTokenRows.map(({ tokenId, label, imageUrl }) => (
                  <button
                    key={tokenId}
                    type="button"
                    draggable={!isSubmitting}
                    onDragStart={() => handleTokenDragStart(tokenId)}
                    onDragEnd={handleTokenDragEnd}
                    className={cn(
                      'border-surface-2 bg-surface-1 text-text-primary inline-flex cursor-grab items-center gap-2 rounded-md border px-3.5 py-2.5 text-base font-medium active:cursor-grabbing',
                      draggingTokenId === tokenId ? 'opacity-50' : null,
                    )}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={label}
                        className="border-surface-2 h-10 w-10 rounded-full border object-cover"
                        draggable={false}
                      />
                    ) : (
                      <span className="bg-surface-2 text-text-primary inline-flex h-10 w-10 items-center justify-center rounded-full text-[1rem] font-bold">
                        {label.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <span>{label}</span>
                  </button>
                ))}
                {unassignedTokenRows.length === 0 ? (
                  <p className="text-text-secondary text-xs">
                    Todos os tokens ja foram atribuidos.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="border-surface-2 bg-surface-0 rounded-lg border p-3">
              <p className="text-text-primary mb-2 text-sm font-semibold">Blocos de times</p>
              <div className="flex flex-row flex-wrap gap-3">
                {plannerTeamIds.map((teamId) => {
                  const tokenIds = teamTokenIdsMap.get(teamId) ?? [];
                  const canRemove = plannerTeamIds.length > 2 && tokenIds.length === 0;
                  return (
                    <div
                      key={teamId}
                      className={cn(
                        'border-surface-2 bg-surface-1 flex min-w-[14rem] flex-col rounded-md border p-2',
                        draggingTokenId ? 'border-accent-primary/80' : null,
                      )}
                      onDragOver={handleDragOver}
                      onDrop={() => handleTeamDrop(teamId)}
                      style={{ minHeight: '14rem' }}
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <span className="text-text-primary text-xs font-semibold">{teamId}</span>
                        <button
                          type="button"
                          className="text-text-secondary disabled:text-text-secondary/40 text-xs"
                          onClick={() => handleRemoveTeam(teamId)}
                          disabled={!canRemove || isSubmitting}
                        >
                          Remover
                        </button>
                      </div>
                      <p className="text-text-secondary text-xs">
                        {tokenIds.length} participante(s)
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {tokenIds.map((tokenId) => {
                          const tokenMeta = selectedTokenMetaById.get(tokenId);
                          const tokenLabel = tokenMeta?.label ?? tokenId;
                          const tokenImageUrl = tokenMeta?.imageUrl ?? null;

                          return (
                            <button
                              key={tokenId}
                              type="button"
                              draggable={!isSubmitting}
                              onDragStart={() => handleTokenDragStart(tokenId)}
                              onDragEnd={handleTokenDragEnd}
                              className={cn(
                                'border-surface-2 bg-surface-0 text-text-primary inline-flex cursor-grab items-center gap-2 rounded-md border px-3.5 py-2.5 text-base font-medium active:cursor-grabbing',
                                draggingTokenId === tokenId ? 'opacity-50' : null,
                              )}
                            >
                              {tokenImageUrl ? (
                                <img
                                  src={tokenImageUrl}
                                  alt={tokenLabel}
                                  className="border-surface-2 h-10 w-10 rounded-full border object-cover"
                                  draggable={false}
                                />
                              ) : (
                                <span className="bg-surface-2 text-text-primary inline-flex h-10 w-10 items-center justify-center rounded-full text-[1rem] font-bold">
                                  {tokenLabel.slice(0, 1).toUpperCase()}
                                </span>
                              )}
                              <span>{tokenLabel}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {startCombatError ? (
            <p className="text-feedback-negative text-xs">{startCombatError}</p>
          ) : null}

          <div className="flex justify-end gap-2">
            <AppButton
              variant="secondary"
              onClick={() => setIsTeamsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </AppButton>
            <AppButton
              onClick={() => void handleConfirmTeamsStart()}
              disabled={!isTeamDistributionValid || isSubmitting}
            >
              Iniciar combate
            </AppButton>
          </div>
        </div>
      </Modal>
    </DraggablePanel>
  );
}
