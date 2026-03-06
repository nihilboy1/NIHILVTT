import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuthStore } from '@/features/auth/model/authStore';
import { useBoardZoomStore } from '@/features/boardZoom/model/store'; // Import the new zoom store
import { useCombatStore } from '@/features/combat/model/store';
import {
  sendGameCreateToken,
  sendGameMoveToken,
  sendGameSpawnMonster,
} from '@/features/game/model/gameSessionApi';
import { useGameStore } from '@/features/game/model/gameStore';
import { canUserControlToken } from '@/features/game/model/tokenControlPolicy';
import { useSessionModalStore } from '@/features/modalManager/model/sessionModalStore';

import { useBoardStore } from '../../../entities/board/model/store';
import { parseCharacterSize } from '../../../entities/character/lib/utils/characterUtils';
import { useCharactersStore } from '../../../entities/character/model/store';
import { useTokenStore } from '../../../entities/token/model/store/tokenStore';
import { parseTokenSize } from '../../../entities/token/model/utils/tokenUtils';
import { useMarqueeSelection } from '../../../features/boardMarqueeSelection/model/hooks/useMarqueeSelection';
import { useRuler } from '../../../features/boardRuler/model/hooks/useRuler';
import { useBoardSettingsStore } from '../../../features/boardSettings/model/store';
import { useCharacterDrop } from '../../../features/characterDropOnBoard/model/hooks/useCharacterDrop';
import { useUIStore } from '../../../features/layoutControls/model/store';
import { PendingAttackSelection, Point, Token } from '../../../shared/api/types';
import { useGameBoardEvents } from '../model/hooks/useGameBoardEvents';
import {
  clampGridCellToBoard,
  pickTopmostTokenIdAtWorldPoint,
  worldPointToGridCell,
} from '../model/renderer';

import { GameBoardContent } from './GameBoardContent';

interface GameBoardProps {
  onBackgroundClick?: () => void;
  onBoardSelectAtPoint?: (worldPoint: Point) => boolean;
  draggingVisuals: { tokenId: string | null; visualWorldPoint: Point | null };
  copiedTokenId: string | null;
  pasteTargetCell: Point | null;
  pendingAttack: PendingAttackSelection | null;
  onTokenDragStart: (tokenId: string) => void;
  onTokenDragMove: (tokenId: string, visualWorldPoint: Point) => void;
  onTokenDragEnd: (tokenId: string) => void;
  multiSelectedTokenIds: string[];
  onSetMultiSelectedTokenIds: (ids: string[]) => void;
  onClearMultiSelection: () => void;
  onBoardPointerMove: (worldPoint: Point) => void;
  onBoardPointerLeave: () => void;
}

export function GameBoard({
  onBackgroundClick,
  onBoardSelectAtPoint,
  draggingVisuals,
  copiedTokenId,
  pasteTargetCell,
  pendingAttack,
  onTokenDragStart,
  onTokenDragMove,
  onTokenDragEnd,
  multiSelectedTokenIds,
  onSetMultiSelectedTokenIds,
  onClearMultiSelection,
  onBoardPointerMove,
  onBoardPointerLeave,
}: GameBoardProps) {
  const { gameId } = useParams<{ gameId: string }>();
  const { characters } = useCharactersStore();
  const runtimeCharactersById = useCharactersStore((state) => state.runtimeCharactersById);
  const { tokensOnBoard, updateTokenPosition } = useTokenStore();
  const { gridSettings, pageSettings, rulerPlacementMode, rulerPersists } = useBoardSettingsStore();
  const { activeTool } = useUIStore();
  const { openModal } = useSessionModalStore();
  const currentGame = useGameStore((state) => state.currentGame);
  const currentUserId = useAuthStore((state) => state.user?.id ?? null);
  const combatState = useCombatStore((state) => state.combatState);
  const activeCombatTurnTokenId =
    combatState && combatState.participants.length > 0
      ? (combatState.participants[combatState.turnIndex]?.tokenId ?? null)
      : null;
  const activeCombatNextTurnTokenId =
    combatState && combatState.participants.length > 1
      ? (combatState.participants[(combatState.turnIndex + 1) % combatState.participants.length]
          ?.tokenId ?? null)
      : null;
  const combatParticipantTokenIds = useMemo(
    () => combatState?.participants.map((participant) => participant.tokenId) ?? [],
    [combatState],
  );
  const activeCombatTurnCanMove =
    combatState == null || combatState.turnResources.remainingMovementCells > 0;
  const isGameMaster =
    currentGame != null && currentUserId != null && currentGame.owner.id === currentUserId;
  const canCurrentUserInstantiateCharacterToken = useCallback(
    (characterId: string) => {
      if (isGameMaster) {
        return true;
      }

      const runtimeCharacter = runtimeCharactersById[characterId] ?? null;
      if (!runtimeCharacter) {
        console.error('Violação de contrato de sessão: token em mesa sem runtime compartilhado.', {
          characterId,
        });
        return false;
      }

      return canUserControlToken({
        gameOwnerUserId: currentGame?.owner.id,
        currentUserId,
        runtimeCharacter,
      });
    },
    [currentGame?.owner.id, currentUserId, isGameMaster, runtimeCharactersById],
  );
  const controllableTokenIds = tokensOnBoard
    .filter((token) => {
      if (isGameMaster) {
        return true;
      }

      const runtimeCharacter = runtimeCharactersById[token.characterId] ?? null;
      if (!runtimeCharacter) {
        console.error('Violação de contrato de sessão: token em mesa sem runtime compartilhado.', {
          tokenId: token.id,
          characterId: token.characterId,
        });
        return false;
      }

      return canUserControlToken({
        gameOwnerUserId: currentGame?.owner.id,
        currentUserId,
        runtimeCharacter,
      });
    })
    .map((token) => token.id);

  const handleTokenMove = useCallback(
    (tokenId: string, newPosition: Point) => {
      const parsedGameId = Number(gameId);
      const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
      if (!isValidGameId) {
        return;
      }

      updateTokenPosition(tokenId, newPosition);
      void sendGameMoveToken(parsedGameId, tokenId, newPosition.x, newPosition.y)
        .then(() => {})
        .catch(() => {
          console.warn('Falha ao sincronizar movimento de token com o servidor.');
        });
    },
    [gameId, updateTokenPosition],
  );

  const handleTokenCreate = useCallback(
    (characterId: string, position: Point) => {
      const parsedGameId = Number(gameId);
      const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
      if (!isValidGameId) {
        return;
      }

      void sendGameCreateToken(parsedGameId, characterId, 'default-scene', position.x, position.y)
        .then(() => {})
        .catch((error) => {
          const message =
            typeof error === 'object' &&
            error !== null &&
            'formError' in error &&
            typeof (error as { formError?: unknown }).formError === 'string'
              ? (error as { formError: string }).formError
              : 'Falha ao criar token no servidor.';
          toast.error(message);
        });
    },
    [gameId],
  );

  const handleMonsterSpawnFromCatalog = useCallback(
    (monsterId: string, position: Point) => {
      const parsedGameId = Number(gameId);
      const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
      if (!isValidGameId) {
        return;
      }

      void sendGameSpawnMonster(parsedGameId, monsterId, {
        sceneId: 'default-scene',
        x: position.x,
        y: position.y,
      })
        .then(() => {})
        .catch(() => {
          toast.error('Falha ao instanciar monstro no tabuleiro.');
        });
    },
    [gameId],
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const lastAutoCenteredTurnKeyRef = useRef<string | null>(null);
  const pixiDragRef = useRef<{
    tokenId: string;
    offsetX: number;
    offsetY: number;
    started: boolean;
  } | null>(null);
  const [isPageAndGridSettingsModalOpen, setIsPageAndGridSettingsModalOpen] = useState(false);
  const canManageBoardSettings =
    currentGame != null && currentUserId != null && currentGame.owner.id === currentUserId;

  const {
    viewBox,
    isPanning,
    getWorldPoint,
    handlePanStart,
    handlePanMove,
    handlePanEnd,
    centerViewOnPoint,
    setViewportRef,
    setGridSettings,
    setPageSettings,
    initializeViewBox,
  } = useBoardStore();

  const { zoomLevel, handleWheel, setZoomLevel } = useBoardZoomStore(); // Get zoomLevel and handleWheel from useBoardZoomStore

  useEffect(() => {
    setViewportRef(viewportRef);
  }, [setViewportRef, viewportRef]);

  useEffect(() => {
    setGridSettings(gridSettings);
  }, [gridSettings, setGridSettings]);

  useEffect(() => {
    setPageSettings(pageSettings);
  }, [pageSettings, setPageSettings]);

  useEffect(() => {
    initializeViewBox(setZoomLevel);
  }, [initializeViewBox, setZoomLevel]);

  useEffect(() => {
    if (combatState == null || activeCombatTurnTokenId == null) {
      lastAutoCenteredTurnKeyRef.current = null;
      return;
    }

    if (isPanning) {
      return;
    }

    const turnKey = `${combatState.round}:${combatState.turnIndex}`;
    if (lastAutoCenteredTurnKeyRef.current === turnKey) {
      return;
    }

    const activeToken = tokensOnBoard.find((token) => token.id === activeCombatTurnTokenId);
    if (!activeToken) {
      return;
    }

    const activeCharacter = characters.find(
      (character) => character.id === activeToken.characterId,
    );
    if (!activeCharacter) {
      return;
    }

    const [sizeMultiplierX, sizeMultiplierY] = parseCharacterSize(activeCharacter.size);
    const activeTokenCenter = {
      x: (activeToken.position.x + sizeMultiplierX / 2) * gridSettings.visualCellSize,
      y: (activeToken.position.y + sizeMultiplierY / 2) * gridSettings.visualCellSize,
    };

    centerViewOnPoint(activeTokenCenter);
    lastAutoCenteredTurnKeyRef.current = turnKey;
  }, [
    activeCombatTurnTokenId,
    centerViewOnPoint,
    characters,
    combatState,
    gridSettings.visualCellSize,
    isPanning,
    tokensOnBoard,
  ]);

  const getWorldPointWithZoom = useCallback(
    (clientX: number, clientY: number) => {
      return getWorldPoint(clientX, clientY, zoomLevel);
    },
    [getWorldPoint, zoomLevel],
  );

  const {
    rulerPath,
    handleRulerMouseDown,
    handleRulerMouseMove,
    handleRulerMouseUp,
    handleRulerRightClick,
  } = useRuler({
    activeTool,
    rulerPlacementMode,
    rulerPersists,
    gridSettings,
    getWorldPoint: getWorldPointWithZoom,
  });

  const handleSetMultiSelectedTokenIds = useCallback(
    (ids: string[]) => {
      onSetMultiSelectedTokenIds(ids);
    },
    [onSetMultiSelectedTokenIds],
  );

  const handleClearMultiSelection = useCallback(() => {
    onClearMultiSelection();
  }, [onClearMultiSelection]);

  const { marqueeSelection, handleMarqueeMouseDown, handleMarqueeMouseMove, handleMarqueeMouseUp } =
    useMarqueeSelection({
      activeTool,
      isSelectionLocked: pendingAttack != null,
      getWorldPoint: getWorldPointWithZoom,
      tokensOnBoard,
      characters,
      gridSettings,
      onSetMultiSelectedTokenIds: handleSetMultiSelectedTokenIds,
      onClearMultiSelection: handleClearMultiSelection,
    });

  const { handleDragOver, handleCharacterDrop } = useCharacterDrop({
    getWorldPoint: getWorldPointWithZoom,
    characters,
    gridSettings,
    pageSettings,
    addToken: handleTokenCreate,
    spawnMonsterFromCatalog: handleMonsterSpawnFromCatalog,
    canSpawnMonsterFromCompendium: isGameMaster,
    canCreateTokenForCharacter: canCurrentUserInstantiateCharacterToken,
  });

  const handlePanMoveWithZoom = useCallback(
    (event: MouseEvent) => {
      handlePanMove(event, zoomLevel);
    },
    [handlePanMove, zoomLevel],
  );

  const handleBoardPointerDownAtPoint = useCallback(
    (point: Point, event: React.MouseEvent<Element>) => {
      if (event.button !== 0 || activeTool !== 'SELECT' || pendingAttack != null) {
        return false;
      }

      const tokenId = pickTopmostTokenIdAtWorldPoint({
        worldPoint: point,
        cellSize: gridSettings.visualCellSize,
        tokensOnBoard,
        preferredTopTokenIds: multiSelectedTokenIds,
        getTokenSizeInCells: (token) => {
          const character = characters.find((entry) => entry.id === token.characterId);
          return parseTokenSize(character?.size);
        },
      });

      if (!tokenId) {
        return false;
      }

      const isControllableToken = controllableTokenIds.includes(tokenId);
      const isCombatParticipantToken = combatParticipantTokenIds.includes(tokenId);
      const canTokenMoveInCombat =
        !isCombatParticipantToken ||
        (activeCombatTurnTokenId === tokenId && activeCombatTurnCanMove);
      const canDragToken = isControllableToken && canTokenMoveInCombat;

      if (!canDragToken) {
        return false;
      }

      const token = tokensOnBoard.find((entry) => entry.id === tokenId);
      if (!token) {
        return false;
      }

      const tokenWorldX = token.position.x * gridSettings.visualCellSize;
      const tokenWorldY = token.position.y * gridSettings.visualCellSize;
      pixiDragRef.current = {
        tokenId,
        offsetX: point.x - tokenWorldX,
        offsetY: point.y - tokenWorldY,
        started: false,
      };
      return true;
    },
    [
      activeCombatTurnCanMove,
      activeCombatTurnTokenId,
      activeTool,
      characters,
      combatParticipantTokenIds,
      controllableTokenIds,
      gridSettings.visualCellSize,
      multiSelectedTokenIds,
      pendingAttack,
      tokensOnBoard,
    ],
  );

  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (!pixiDragRef.current) {
        return;
      }
      const drag = pixiDragRef.current;
      const point = getWorldPointWithZoom(event.clientX, event.clientY);
      if (!drag.started) {
        drag.started = true;
        onTokenDragStart(drag.tokenId);
        document.body.style.cursor = 'grabbing';
      }
      onTokenDragMove(drag.tokenId, {
        x: point.x - drag.offsetX,
        y: point.y - drag.offsetY,
      });
    };

    const handleGlobalMouseUp = (event: MouseEvent) => {
      if (!pixiDragRef.current || event.button !== 0) {
        return;
      }

      const drag = pixiDragRef.current;
      const point = getWorldPointWithZoom(event.clientX, event.clientY);
      const newVisualPos = {
        x: point.x - drag.offsetX,
        y: point.y - drag.offsetY,
      };
      if (drag.started) {
        const token = tokensOnBoard.find((entry) => entry.id === drag.tokenId);
        if (token) {
          const character = characters.find((entry) => entry.id === token.characterId);
          const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(character?.size);
          const snappedGridCell = worldPointToGridCell({
            worldPoint: newVisualPos,
            cellSize: gridSettings.visualCellSize,
            roundMode: 'round',
          });
          const boundedGridCell = clampGridCellToBoard({
            gridCell: snappedGridCell,
            pageSettings,
            tokenSizeInCells: [sizeMultiplierX, sizeMultiplierY],
          });
          handleTokenMove(drag.tokenId, boundedGridCell);
        }
        onTokenDragEnd(drag.tokenId);
      } else {
        onBoardSelectAtPoint?.(point);
      }
      pixiDragRef.current = null;
      if (document.body.style.cursor === 'grabbing') {
        document.body.style.cursor = 'default';
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      if (document.body.style.cursor === 'grabbing') {
        document.body.style.cursor = 'default';
      }
    };
  }, [
    characters,
    getWorldPointWithZoom,
    gridSettings.visualCellSize,
    handleTokenMove,
    onBoardSelectAtPoint,
    onTokenDragStart,
    onTokenDragEnd,
    onTokenDragMove,
    pageSettings,
    tokensOnBoard,
  ]);

  const { handleMouseDown } = useGameBoardEvents({
    viewportRef,
    activeTool,
    getWorldPoint: getWorldPointWithZoom,
    isPanning,
    handlePanStart,
    handlePanMove: handlePanMoveWithZoom,
    handlePanEnd,
    handleRulerMouseDown,
    handleRulerMouseMove,
    handleRulerMouseUp,
    handleRulerRightClick,
    handleMarqueeMouseDown,
    handleMarqueeMouseMove,
    handleMarqueeMouseUp,
    onBoardSelectAtPoint,
    onBoardPointerDownAtPoint: handleBoardPointerDownAtPoint,
    onBackgroundClick,
  });

  const handleBoardTokenDoubleClick = useCallback(
    (tokenId: string, altKey: boolean) => {
      if (altKey) {
        const token = tokensOnBoard.find((t: Token) => t.id === tokenId);
        if (token) {
          openModal('sheet', { characterId: token.characterId });
        } else {
          console.error('Token not found for double-click:', tokenId);
        }
      }
    },
    [openModal, tokensOnBoard],
  );

  let multiSelectBoundingBox = null;
  if (multiSelectedTokenIds.length > 0) {
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    let hasValidToken = false;

    multiSelectedTokenIds.forEach((tokenId) => {
      const token = tokensOnBoard.find((t: Token) => t.id === tokenId);
      if (token) {
        const character = characters.find((c) => c.id === token.characterId);
        if (character) {
          hasValidToken = true;
          const [sizeMultiplierX, sizeMultiplierY] = parseCharacterSize(character.size);
          const tokenWorldX = token.position.x * gridSettings.visualCellSize;
          const tokenWorldY = token.position.y * gridSettings.visualCellSize;
          const tokenWorldWidth = sizeMultiplierX * gridSettings.visualCellSize;
          const tokenWorldHeight = sizeMultiplierY * gridSettings.visualCellSize;

          minX = Math.min(minX, tokenWorldX);
          minY = Math.min(minY, tokenWorldY);
          maxX = Math.max(maxX, tokenWorldX + tokenWorldWidth);
          maxY = Math.max(maxY, tokenWorldY + tokenWorldHeight);
        }
      }
    });

    if (hasValidToken) {
      multiSelectBoundingBox = {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }
  }

  return (
    <>
      <GameBoardContent
        viewportRef={viewportRef}
        viewBox={viewBox}
        getWorldPoint={getWorldPointWithZoom}
        handleWheel={handleWheel}
        handleDragOver={handleDragOver}
        handleCharacterDrop={handleCharacterDrop}
        handleMouseDown={handleMouseDown}
        handleBoardTokenDoubleClick={handleBoardTokenDoubleClick}
        draggingVisuals={draggingVisuals}
        isPageAndGridSettingsModalOpen={isPageAndGridSettingsModalOpen}
        setIsPageAndGridSettingsModalOpen={setIsPageAndGridSettingsModalOpen}
        canManageBoardSettings={canManageBoardSettings}
        multiSelectBoundingBox={multiSelectBoundingBox}
        copiedTokenId={copiedTokenId}
        pasteTargetCell={pasteTargetCell}
        pendingAttack={pendingAttack}
        multiSelectedTokenIds={multiSelectedTokenIds}
        onBoardPointerMove={onBoardPointerMove}
        onBoardPointerLeave={onBoardPointerLeave}
        characters={characters}
        tokensOnBoard={tokensOnBoard}
        gridSettings={gridSettings}
        pageSettings={pageSettings}
        marqueeSelection={marqueeSelection}
        rulerPath={rulerPath}
        activeCombatTurnTokenId={activeCombatTurnTokenId}
        activeCombatNextTurnTokenId={activeCombatNextTurnTokenId}
        combatParticipantTokenIds={combatParticipantTokenIds}
      />
    </>
  );
}
