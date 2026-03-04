import { useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { fetchGameSessionSnapshot } from '@/features/game/model/gameSessionApi';
import { applyGameSessionEvent } from '@/features/game/model/gameSessionEventHandlers';
import { hydrateGameSessionSnapshot, resetGameSessionClientState } from '@/features/game/model/gameSessionHydrator';
import { useGameStore } from '@/features/game/model/gameStore';
import { GameSessionRealtimeClient } from '@/features/game/model/realtime/gameSessionRealtimeClient';
import { getGameSessionWebSocketUrl } from '@/features/game/model/realtime/websocketUrl';
import { useAuthStore } from '@/features/auth/model/authStore';
import { getStoredAccessToken } from '@/features/auth/model/authSlice';
import { AppButton } from '@/shared/ui/AppButton';
import { Spinner } from '@/shared/ui/Spinner';
import { RightSidebar } from '@/widgets/rightSidebar/ui/RightSidebar';
import { Toolbar } from '@/widgets/toolBar/ui/Toolbar';

import { useUIStore } from '../features/layoutControls/model/store';
import { useSessionModalStore } from '../features/modalManager/model/sessionModalStore';
import { ToggleSidebarButton } from '../features/toggleSidebar/ui/ToggleSidebarButton';
import { ChevronLeftIcon, ChevronRightIcon } from '../shared/ui/Icons';
import { useGameBoardInteraction } from '../widgets/gameBoard/model/hooks/useGameBoardInteraction';
import { GameBoard } from '../widgets/gameBoard/ui/GameBoard';
import { SessionModalManager } from '../widgets/sessionModalManager/ui/SessionModalManager';
import { TokenActionBar } from '@/features/combat/ui/TokenActionBar';
import { InitiativeTrack } from '@/features/combat/ui/InitiativeTrack';
import { useCombatStore } from '@/features/combat/model/store';
import { useTokenStore } from '@/entities/token/model/store/tokenStore';
import { useCharactersStore } from '@/entities/character/model/store';

export default function GamePage() {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();
  const {
    currentGame,
    isLoadingCurrentGame,
    isLeavingGame,
    loadCurrentGameById,
    leaveGameById,
    applyMemberRevokedEvent,
    removeMyJoinRequestsForGame,
    removeGameFromList,
    setCurrentGame,
    error,
    clearError,
  } = useGameStore();
  const user = useAuthStore((state) => state.user);
  const { closeModal, modalStack } = useSessionModalStore();
  const combatState = useCombatStore((state) => state.combatState);
  const tokensOnBoard = useTokenStore((state) => state.tokensOnBoard);
  const runtimeCharactersById = useCharactersStore((state) => state.runtimeCharactersById);

  const [isHydratingSession, setIsHydratingSession] = useState(false);
  const realtimeClientRef = useRef<GameSessionRealtimeClient | null>(null);
  const { isToolbarVisible, setIsToolbarVisible, isRightSidebarVisible, setIsRightSidebarVisible } =
    useUIStore();

  const {
    copiedTokenId,
    pasteTargetCell,
    selectedActionTokenId,
    pendingAttack,
    multiSelectedTokenIds,
    handleHPChangeFromModal,
    handleTempHpChangeFromModal,
    handleTokenDragStart,
    handleTokenDragMove,
    handleTokenDragEnd,
    handleSetMultiSelectedTokenIds,
    handleClearMultiSelection,
    handleBoardPointerMove,
    handleBoardPointerLeave,
    handleArmAttack,
    handleCancelPendingAttack,
  } = useGameBoardInteraction();

  const handleBoardBackgroundClick = () => {
    const topModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
    if (topModal && topModal.name !== 'sheet') {
      closeModal();
    }
    handleClearMultiSelection();
  };

  const activeCombatTurnTokenId =
    combatState && combatState.participants.length > 0
      ? combatState.participants[combatState.turnIndex]?.tokenId ?? null
      : null;
  const selectedCombatParticipant =
    selectedActionTokenId != null &&
    combatState?.participants.some((participant) => participant.tokenId === selectedActionTokenId);
  const isGameMaster = currentGame != null && user != null && currentGame.owner.id === user.id;
  const selectedActionToken = selectedActionTokenId
    ? tokensOnBoard.find((token) => token.id === selectedActionTokenId) ?? null
    : null;
  const selectedRuntimeCharacter = selectedActionToken
    ? runtimeCharactersById[selectedActionToken.characterId] ?? null
    : null;
  const currentUserControlsSelectedToken =
    user != null &&
    currentGame != null &&
    (
      selectedRuntimeCharacter == null
        ? false
        : selectedRuntimeCharacter.type === 'NPC'
          ? currentGame.owner.id === user.id
        : selectedRuntimeCharacter.controlledByUserId == null
          ? currentGame.owner.id === user.id
          : selectedRuntimeCharacter.controlledByUserId === user.id
    );
  const combatLockReason =
    !isGameMaster &&
    currentUserControlsSelectedToken &&
    selectedCombatParticipant &&
    selectedActionTokenId !== activeCombatTurnTokenId
      ? 'Aguarde o seu turno para agir no combate.'
      : null;

  useEffect(() => {
    let isCancelled = false;

    const loadGameSession = async () => {
      if (!gameId) {
        navigate('/dashboard', { replace: true });
        return;
      }

      const parsedId = Number(gameId);
      if (!Number.isInteger(parsedId) || parsedId <= 0) {
        navigate('/dashboard', { replace: true });
        return;
      }

      clearError();
      setIsHydratingSession(true);

      const loadedGame = await loadCurrentGameById(parsedId);
      if (!loadedGame || isCancelled) {
        if (!isCancelled) {
          resetGameSessionClientState();
          setIsHydratingSession(false);
        }
        return;
      }

      try {
        const snapshot = await fetchGameSessionSnapshot(parsedId);
        if (!isCancelled) {
          hydrateGameSessionSnapshot(snapshot);
        }
      } catch {
        if (!isCancelled) {
          resetGameSessionClientState();
        }
      } finally {
        if (!isCancelled) {
          setIsHydratingSession(false);
        }
      }
    };

    void loadGameSession();

    return () => {
      isCancelled = true;
    };
  }, [gameId, navigate, loadCurrentGameById, clearError]);

  useEffect(() => {
    if (!currentGame || isHydratingSession) {
      return;
    }

    const realtimeClient = new GameSessionRealtimeClient(
      {
        onEvent: (event) => {
          applyGameSessionEvent(event);

          if (event.type !== 'MEMBER_REVOKED') {
            return;
          }

          const payload = event.payload as { memberUserId?: unknown };
          const revokedMemberUserId =
            typeof payload?.memberUserId === 'number' ? payload.memberUserId : null;
          if (revokedMemberUserId == null) {
            return;
          }

          applyMemberRevokedEvent(event.gameId, revokedMemberUserId);

          if (user?.id === revokedMemberUserId) {
            resetGameSessionClientState();
            setCurrentGame(null);
            removeMyJoinRequestsForGame(event.gameId);
            removeGameFromList(event.gameId);
            navigate('/dashboard', { replace: true });
          }
        },
      },
      getGameSessionWebSocketUrl(),
      getStoredAccessToken,
    );

    realtimeClientRef.current = realtimeClient;
    realtimeClient.connect(currentGame.id);

    return () => {
      realtimeClient.disconnect();
      realtimeClientRef.current = null;
    };
  }, [
    currentGame,
    isHydratingSession,
    applyMemberRevokedEvent,
    navigate,
    removeMyJoinRequestsForGame,
    removeGameFromList,
    setCurrentGame,
    user?.id,
  ]);

  if (isLoadingCurrentGame || isHydratingSession || !currentGame) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-0">
        {isLoadingCurrentGame || isHydratingSession ? (
          <Spinner />
        ) : (
          <div className="rounded-lg border border-surface-2 bg-surface-1 p-6 text-center">
            <p className="mb-3 text-sm text-feedback-negative">{error || 'Jogo não encontrado.'}</p>
            <AppButton variant="secondary" onClick={() => navigate('/dashboard')}>
              Voltar para o dashboard
            </AppButton>
          </div>
        )}
      </div>
    );
  }

  const handleLeaveGame = async () => {
    const left = await leaveGameById(currentGame.id);
    if (left) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="relative flex h-screen">
      {isToolbarVisible && <Toolbar />}
      <GameBoard
        onBackgroundClick={handleBoardBackgroundClick}
        onTokenDragStart={handleTokenDragStart}
        copiedTokenId={copiedTokenId}
        pasteTargetCell={pasteTargetCell}
        pendingAttack={pendingAttack}
        onTokenDragMove={handleTokenDragMove}
        onTokenDragEnd={handleTokenDragEnd}
        multiSelectedTokenIds={multiSelectedTokenIds}
        onSetMultiSelectedTokenIds={handleSetMultiSelectedTokenIds}
        onClearMultiSelection={handleClearMultiSelection}
        onBoardPointerMove={handleBoardPointerMove}
        onBoardPointerLeave={handleBoardPointerLeave}
        combatLockReason={combatLockReason}
      />
      <SessionModalManager
        handleHPChangeFromModal={handleHPChangeFromModal}
        handleTempHpChangeFromModal={handleTempHpChangeFromModal}
      />
      <TokenActionBar
        tokenId={selectedActionTokenId}
        pendingAttack={pendingAttack}
        onArmAttack={handleArmAttack}
        onCancelAttack={handleCancelPendingAttack}
      />
      <InitiativeTrack selectedTokenIds={multiSelectedTokenIds} />

      <ToggleSidebarButton
        isVisible={isToolbarVisible}
        onClick={() => setIsToolbarVisible(true)}
        ariaLabel="Mostrar Barra de Ferramentas"
        title="Mostrar Barra de Ferramentas"
        icon={<ChevronRightIcon className="text-text-1 h-6 w-6" />}
        position="left"
      />

      <ToggleSidebarButton
        isVisible={isRightSidebarVisible}
        onClick={() => setIsRightSidebarVisible(true)}
        ariaLabel="Mostrar Barra Lateral Direita"
        title="Mostrar Barra Lateral Direita"
        icon={<ChevronLeftIcon className="text-text-1 h-6 w-6" />}
        position="right"
      />
      {isRightSidebarVisible && (
        <RightSidebar
          currentGame={currentGame}
          isLeavingGame={isLeavingGame}
          onLeaveGame={() => {
            void handleLeaveGame();
          }}
        />
      )}
    </div>
  );
}
