import { useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { getStoredAccessToken } from '@/features/auth/model/authSlice';
import { useAuthStore } from '@/features/auth/model/authStore';
import { InitiativeTrack } from '@/features/combat/ui/InitiativeTrack';
import { TokenActionBar } from '@/features/combat/ui/TokenActionBar';
import { fetchGameSessionSnapshot } from '@/features/game/model/gameSessionApi';
import { applyGameSessionEvent } from '@/features/game/model/gameSessionEventHandlers';
import {
  hydrateGameSessionSnapshot,
  resetGameSessionClientState,
} from '@/features/game/model/gameSessionHydrator';
import { useGameStore } from '@/features/game/model/gameStore';
import { GameSessionRealtimeClient } from '@/features/game/model/realtime/gameSessionRealtimeClient';
import { getGameSessionWebSocketUrl } from '@/features/game/model/realtime/websocketUrl';
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

  const [isHydratingSession, setIsHydratingSession] = useState(false);
  const realtimeClientRef = useRef<GameSessionRealtimeClient | null>(null);
  const { isToolbarVisible, setIsToolbarVisible, isRightSidebarVisible, setIsRightSidebarVisible } =
    useUIStore();

  const {
    draggingVisuals,
    copiedTokenId,
    pasteTargetCell,
    selectedActionTokenId,
    pendingAttack,
    pendingMovementTokenId,
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
    handleBoardSelectAtPoint,
    handleArmAttack,
    handleCancelPendingAttack,
    handleArmMovement,
    handleCancelPendingMovement,
  } = useGameBoardInteraction();

  const handleBoardBackgroundClick = () => {
    if (pendingAttack != null || pendingMovementTokenId != null) {
      return;
    }

    const topModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
    if (topModal && topModal.name !== 'sheet') {
      closeModal();
    }
    handleClearMultiSelection();
  };

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
          try {
            hydrateGameSessionSnapshot(snapshot);
          } catch (error) {
            console.error('[gameSession] hydrate snapshot failed', { error, snapshot });
            throw error;
          }
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
          try {
            applyGameSessionEvent(event);
          } catch (error) {
            console.error('[gameSession] failed to apply event', {
              eventType: event.type,
              eventId: event.eventId,
              payload: event.payload,
              error,
            });
          }

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
      <div className="bg-surface-0 flex h-screen items-center justify-center">
        {isLoadingCurrentGame || isHydratingSession ? (
          <Spinner />
        ) : (
          <div className="border-surface-2 bg-surface-1 rounded-lg border p-6 text-center">
            <p className="text-feedback-negative mb-3 text-sm">{error || 'Jogo não encontrado.'}</p>
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
        onBoardSelectAtPoint={handleBoardSelectAtPoint}
        draggingVisuals={draggingVisuals}
        onTokenDragStart={handleTokenDragStart}
        copiedTokenId={copiedTokenId}
        pasteTargetCell={pasteTargetCell}
        pendingAttack={pendingAttack}
        pendingMovementTokenId={pendingMovementTokenId}
        onTokenDragMove={handleTokenDragMove}
        onTokenDragEnd={handleTokenDragEnd}
        multiSelectedTokenIds={multiSelectedTokenIds}
        onSetMultiSelectedTokenIds={handleSetMultiSelectedTokenIds}
        onClearMultiSelection={handleClearMultiSelection}
        onBoardPointerMove={handleBoardPointerMove}
        onBoardPointerLeave={handleBoardPointerLeave}
      />
      <SessionModalManager
        handleHPChangeFromModal={handleHPChangeFromModal}
        handleTempHpChangeFromModal={handleTempHpChangeFromModal}
      />
      <TokenActionBar
        tokenId={selectedActionTokenId}
        pendingAttack={pendingAttack}
        pendingMovementTokenId={pendingMovementTokenId}
        onArmAttack={handleArmAttack}
        onCancelAttack={handleCancelPendingAttack}
        onArmMovement={handleArmMovement}
        onCancelMovement={handleCancelPendingMovement}
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
