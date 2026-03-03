import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useCharactersStore } from "@/entities/character/model/store";
import { useUIStore } from "@/features/layoutControls/model/store";
import { useBoardSettingsStore } from "@/features/boardSettings/model/store";
import { ModalEntry } from "@/features/modalManager/model/baseModalConfig";
import { useSessionModalStore } from "@/features/modalManager/model/sessionModalStore";
import { applyGameSessionEvent } from "@/features/game/model/gameSessionEventHandlers";
import {
  sendGameCharacterHpUpdate,
  sendGameCharacterTempHpUpdate,
  sendGameDuplicateCharacterWithToken,
  sendGameRemoveToken,
  sendGameResolveAttack,
} from "@/features/game/model/gameSessionApi";
import { useAuthStore } from "@/features/auth/model/authStore";
import { useGameStore } from "@/features/game/model/gameStore";

import { useSelectedTokenStore } from "../../../../entities/token/model/store/selectedTokenStore";
import { useTokenStore } from "../../../../entities/token/model/store/tokenStore";
import {
  Tool,
  type AttackEntry,
  type PendingAttackSelection,
  type Point as AppPoint,
  type DraggingVisuals,
  type Token,
} from "../../../../shared/api/types";



interface CopiedTokenSnapshot {
  tokenId: string;
  characterId: string;
  sceneId: string;
  position: AppPoint;
}

function isTargetWithinAttackRange(
  attacker: Token,
  target: Token,
  rangeMeters: number,
  metersPerSquare: number,
): boolean {
  if (rangeMeters <= 0 || metersPerSquare <= 0) {
    return false;
  }

  const deltaX = Math.abs(attacker.position.x - target.position.x);
  const deltaY = Math.abs(attacker.position.y - target.position.y);
  const distanceSquares = Math.max(deltaX, deltaY);
  const distanceMeters = distanceSquares * metersPerSquare;

  return distanceMeters <= rangeMeters;
}

interface UseGameBoardInteractionReturn {
  draggingVisuals: DraggingVisuals;
  copiedTokenId: string | null;
  pasteTargetCell: AppPoint | null;
  selectedActionTokenId: string | null;
  pendingAttack: PendingAttackSelection | null;
  multiSelectedTokenIds: string[];
  handleTokenSelectForHPModal: (
    tokenId: string,
    tokenScreenRect: DOMRect | null
  ) => void;
  handleHPChangeFromModal: (tokenId: string, mode: 'damage' | 'heal', amount: number) => void;
  handleTempHpChangeFromModal: (tokenId: string, amount: number) => void;
  handleTokenDragStart: (tokenId: string) => void;
  handleTokenDragMove: (
    tokenId: string,
    visualSVGPoint: AppPoint
  ) => void;
  handleTokenDragEnd: (tokenId: string) => void;
  handleSetMultiSelectedTokenIds: (ids: string[]) => void;
  handleClearMultiSelection: () => void;
  handleBoardPointerMove: (svgPoint: AppPoint) => void;
  handleBoardPointerLeave: () => void;
  handleArmAttack: (attack: AttackEntry) => void;
  handleCancelPendingAttack: () => void;
}

export const useGameBoardInteraction = (): UseGameBoardInteractionReturn => {
  const { gameId } = useParams<{ gameId: string }>();
  const { characters } = useCharactersStore();
  const { tokensOnBoard } = useTokenStore();
  const metersPerSquare = useBoardSettingsStore((state) => state.gridSettings.metersPerSquare);
  const { activeTool, activePopover } = useUIStore();
  const currentGame = useGameStore((state) => state.currentGame);
  const user = useAuthStore((state) => state.user);
  const { modalStack, openModal, closeModalByName, updateModalProps } = useSessionModalStore();
  const { selectedTokenId, setSelectedTokenId } = useSelectedTokenStore();

  const [draggingVisuals, setDraggingVisuals] = useState<DraggingVisuals>({
    tokenId: null, // Renomeado
    visualSVGPoint: null,
  });
  const [preDragHPModalTokenId, setPreDragHPModalTokenId] = useState<
    // Renomeado
    string | null
  >(null);
  const [multiSelectedTokenIds, setMultiSelectedTokenIds] = useState<
    // Renomeado
    string[]
  >([]);
  const [copiedTokenSnapshot, setCopiedTokenSnapshot] = useState<CopiedTokenSnapshot | null>(null);
  const [pasteTargetCell, setPasteTargetCell] = useState<AppPoint | null>(null);
  const [pendingAttack, setPendingAttack] = useState<PendingAttackSelection | null>(null);

  // Helper para obter o modal ativo e suas props
  const activeModalEntry =
    modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const activeModalName = activeModalEntry?.name;
  const activeModalProps = activeModalEntry?.props;

  const handleClearMultiSelection = useCallback(() => {
    setMultiSelectedTokenIds([]); // Renomeado
    setSelectedTokenId(null); // Renomeado
    setPendingAttack(null);
  }, [setSelectedTokenId]);

  const handleArmAttack = useCallback(
    (attack: AttackEntry) => {
      if (!selectedTokenId) {
        return;
      }

      setPendingAttack({
        attackerTokenId: selectedTokenId,
        attack,
        targetTokenId: null,
      });
      setMultiSelectedTokenIds([selectedTokenId]);
      closeModalByName('hpControl');
    },
    [closeModalByName, selectedTokenId],
  );

  const handleCancelPendingAttack = useCallback(() => {
    setPendingAttack(null);
    if (selectedTokenId) {
      setMultiSelectedTokenIds([selectedTokenId]);
    }
  }, [selectedTokenId]);

  const handleTokenSelectForHPModal = useCallback(
    // Renomeado
    (tokenId: string, _tokenScreenRect: DOMRect | null) => {
      // Renomeado
      if (activeTool !== Tool.SELECT) {
        return;
      }

      setSelectedTokenId(tokenId); // Renomeado
      setMultiSelectedTokenIds([]); // Renomeado

      const isHpControlAlreadyOpenForToken = modalStack.some(
        (modal: ModalEntry) =>
          modal.name === "hpControl" && modal.props.tokenId === tokenId // Renomeado
      );

      if (isHpControlAlreadyOpenForToken) {
        return;
      }

      if (activeModalName === "hpControl") {
        updateModalProps({ tokenId });
        return;
      }

      openModal("hpControl", { tokenId }); // Renomeado
    },
    [
      activeTool,
      openModal,
      modalStack,
      setSelectedTokenId, // Renomeado
      setMultiSelectedTokenIds, // Renomeado
      activeModalName,
      updateModalProps,
    ]
  );

  const handleHPChangeFromModal = useCallback(
    (tokenId: string, mode: 'damage' | 'heal', amount: number) => {
      const isMaster = currentGame?.owner.id === user?.id;
      if (!isMaster) {
        console.warn('Apenas o mestre pode alterar HP em jogo.');
        return;
      }

      const token = tokensOnBoard.find(
        (t: Token) => t.id === tokenId
      );
      if (!token) {
        return;
      }

      const character = characters.find(
        (c) => c.id === token.characterId
      );
      if (!character || !("combatStats" in character)) {
        return;
      }

      const parsedGameId = Number(gameId);
      const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
      if (!isValidGameId) {
        return;
      }

      void sendGameCharacterHpUpdate(parsedGameId, token.characterId, mode, amount)
        .then((event) => {
          applyGameSessionEvent(event);
        })
        .catch(() => {
          console.warn("Falha ao sincronizar HP do personagem com o servidor.");
        });
    },
    [tokensOnBoard, characters, gameId, currentGame, user]
  );

  const handleTempHpChangeFromModal = useCallback(
    (tokenId: string, amount: number) => {
      const isMaster = currentGame?.owner.id === user?.id;
      if (!isMaster) {
        console.warn('Apenas o mestre pode alterar HP temporário em jogo.');
        return;
      }

      const token = tokensOnBoard.find(
        (t: Token) => t.id === tokenId
      );
      if (!token) {
        return;
      }

      const character = characters.find(
        (c) => c.id === token.characterId
      );
      if (!character || !("combatStats" in character)) {
        return;
      }

      const parsedGameId = Number(gameId);
      const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
      if (!isValidGameId) {
        return;
      }

      void sendGameCharacterTempHpUpdate(parsedGameId, token.characterId, amount)
        .then((event) => {
          applyGameSessionEvent(event);
        })
        .catch(() => {
          console.warn("Falha ao sincronizar HP temporário do personagem com o servidor.");
        });
    },
    [tokensOnBoard, characters, gameId, currentGame, user]
  );

  const removeTokenAuthoritative = useCallback(
    (tokenId: string) => {
      const parsedGameId = Number(gameId);
      const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
      if (!isValidGameId) {
        return;
      }

      void sendGameRemoveToken(parsedGameId, tokenId)
        .then((event) => {
          applyGameSessionEvent(event);
        })
        .catch(() => {
          console.warn("Falha ao remover token no servidor.");
        });
    },
    [gameId]
  );

  const duplicateCopiedTokenAuthoritative = useCallback(async () => {
    if (!copiedTokenSnapshot) {
      return;
    }

    const parsedGameId = Number(gameId);
    const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
    if (!isValidGameId) {
      return;
    }

    const selectedToken = selectedTokenId
      ? tokensOnBoard.find((token: Token) => token.id === selectedTokenId)
      : null;
    const fallbackBasePosition =
      selectedToken && selectedToken.sceneId === copiedTokenSnapshot.sceneId
        ? selectedToken.position
        : copiedTokenSnapshot.position;
    const nextPosition = pasteTargetCell ?? {
      x: fallbackBasePosition.x + 1,
      y: fallbackBasePosition.y,
    };

    try {
      const createCloneTokenEvent = await sendGameDuplicateCharacterWithToken(
        parsedGameId,
        copiedTokenSnapshot.characterId,
        copiedTokenSnapshot.sceneId,
        nextPosition.x,
        nextPosition.y,
      );
      applyGameSessionEvent(createCloneTokenEvent);

      const createdToken = createCloneTokenEvent.payload?.token;
      const createdTokenId =
        createdToken && typeof createdToken === 'object' && 'id' in createdToken
          ? createdToken.id
          : null;

      if (typeof createdTokenId === 'string' && createdTokenId.trim() !== '') {
        setSelectedTokenId(createdTokenId);
        setMultiSelectedTokenIds([createdTokenId]);
        closeModalByName('hpControl');
        openModal('hpControl', { tokenId: createdTokenId });
      }
    } catch {
      console.warn('Falha ao duplicar token no servidor.');
    }
  }, [
    closeModalByName,
    copiedTokenSnapshot,
    gameId,
    openModal,
    selectedTokenId,
    setSelectedTokenId,
    tokensOnBoard,
    pasteTargetCell,
  ]);

  const handleTokenDragStart = useCallback(
    // Renomeado
    (tokenId: string) => {
      // Renomeado
      if (
        activeModalName === "hpControl" &&
        activeModalProps?.tokenId === tokenId // Renomeado
      ) {
        setPreDragHPModalTokenId(tokenId); // Renomeado
        closeModalByName("hpControl");
      }
      setDraggingVisuals((prev: DraggingVisuals) => ({ ...prev, tokenId })); // Renomeado
      handleClearMultiSelection();
    },
    [activeModalName, activeModalProps, closeModalByName, handleClearMultiSelection]
  );

  const handleTokenDragMove = useCallback(
    // Renomeado
    (tokenId: string, visualSVGPoint: AppPoint) => {
      // Renomeado
      setDraggingVisuals((prev: DraggingVisuals) => {
        if (prev.tokenId === tokenId) {
          // Renomeado
          return { tokenId, visualSVGPoint }; // Renomeado
        }
        return prev;
      });
    },
    []
  );

  const handleTokenDragEnd = useCallback(
    // Renomeado
    (tokenId: string) => {
      // Renomeado
      const tokenExists = tokensOnBoard.find(
        // Renomeado
        (t: Token) => t.id === tokenId // Renomeado
      );
      if (tokenExists && preDragHPModalTokenId === tokenId) {
        // Renomeado
        openModal("hpControl", { tokenId });
      }
      setPreDragHPModalTokenId(null); // Renomeado
      setDraggingVisuals({ tokenId: null, visualSVGPoint: null }); // Renomeado
    },
    [
      preDragHPModalTokenId, // Renomeado
      openModal,
      tokensOnBoard, // Renomeado
      modalStack,
    ]
  );

  const handleSetMultiSelectedTokenIds = useCallback(
    // Renomeado
    (ids: string[]) => {
      if (pendingAttack && ids.length === 1) {
        const targetTokenId = ids[0];

        if (targetTokenId === pendingAttack.attackerTokenId) {
          setSelectedTokenId(pendingAttack.attackerTokenId);
          setMultiSelectedTokenIds([pendingAttack.attackerTokenId]);
          return;
        }

        const parsedGameId = Number(gameId);
        const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
        if (!isValidGameId) {
          return;
        }

        const attackerToken = tokensOnBoard.find(
          (token: Token) => token.id === pendingAttack.attackerTokenId,
        );
        const targetToken = tokensOnBoard.find((token: Token) => token.id === targetTokenId);
        if (!attackerToken || !targetToken) {
          return;
        }

        const isWithinRange = isTargetWithinAttackRange(
          attackerToken,
          targetToken,
          pendingAttack.attack.rangeMeters,
          metersPerSquare,
        );

        if (!isWithinRange) {
          setMultiSelectedTokenIds([pendingAttack.attackerTokenId]);
          setSelectedTokenId(pendingAttack.attackerTokenId);
          return;
        }

        setPendingAttack((prev) =>
          prev == null ? null : { ...prev, targetTokenId },
        );
        setSelectedTokenId(pendingAttack.attackerTokenId);
        setMultiSelectedTokenIds([pendingAttack.attackerTokenId, targetTokenId]);
        closeModalByName('hpControl');

        void sendGameResolveAttack(
          parsedGameId,
          pendingAttack.attackerTokenId,
          targetTokenId,
          pendingAttack.attack.id,
          pendingAttack.attack.label,
          pendingAttack.attack.attackBonus,
          pendingAttack.attack.damageFormula,
        )
          .then((event) => {
            applyGameSessionEvent(event);
            setPendingAttack(null);
            setSelectedTokenId(targetTokenId);
            setMultiSelectedTokenIds([targetTokenId]);
            openModal('hpControl', { tokenId: targetTokenId });
          })
          .catch(() => {
            console.warn('Falha ao resolver ataque no servidor.');
            setPendingAttack(null);
            setMultiSelectedTokenIds([pendingAttack.attackerTokenId]);
            setSelectedTokenId(pendingAttack.attackerTokenId);
          });
        return;
      }

      setMultiSelectedTokenIds(ids); // Renomeado

      if (ids.length === 1) {
        setSelectedTokenId(ids[0]); // Renomeado
        const token = tokensOnBoard.find((t: Token) => t.id === ids[0]);
        const isHpControlAlreadyOpenForToken = modalStack.some(
          (modal: ModalEntry) => modal.name === "hpControl" && modal.props.tokenId === ids[0]
        );

        if (token && !isHpControlAlreadyOpenForToken) {
          if (activeModalName === "hpControl") {
            updateModalProps({ tokenId: ids[0] });
          } else {
            openModal("hpControl", { tokenId: ids[0] });
          }
        }
      } else {
        setSelectedTokenId(null); // Renomeado
        if (activeModalName === "hpControl") {
          closeModalByName("hpControl");
        }
      }
    },
    [
      activeModalName,
      closeModalByName,
      gameId,
      setSelectedTokenId, // Renomeado
      openModal,
      tokensOnBoard, // Renomeado
      modalStack,
      updateModalProps,
      pendingAttack,
      metersPerSquare,
    ]
  );

  // Efeitos de limpeza e gerenciamento de estado
  useEffect(() => {
    const currentHPModalTokenId = // Renomeado
      activeModalName === "hpControl" ? activeModalProps?.tokenId : null; // Renomeado
    const sheetModalEntry = modalStack.find((modal) => modal.name === "sheet") ?? null;
    const currentSheetId = sheetModalEntry?.props.characterId; // Renomeado

    if (
      activeModalName === "hpControl" &&
      currentHPModalTokenId && // Renomeado
      !tokensOnBoard.find(
        (t: Token) => t.id === currentHPModalTokenId
      )
    ) {
      closeModalByName("hpControl");
    }
    if (
      typeof currentSheetId === "string" &&
      !characters.find((c) => c.id === currentSheetId)
    ) {
      closeModalByName("sheet");
    }
    if (
      draggingVisuals.tokenId &&
      !tokensOnBoard.find(
        (t: Token) => t.id === draggingVisuals.tokenId
      )
    ) {
      setDraggingVisuals({ tokenId: null, visualSVGPoint: null });
    }
    if (
      preDragHPModalTokenId &&
      !tokensOnBoard.find(
        (t: Token) => t.id === preDragHPModalTokenId
      )
    ) {
      setPreDragHPModalTokenId(null);
    }
    setMultiSelectedTokenIds(
      (
        prev: string[]
      ) =>
        prev.filter(
          (id: string) => tokensOnBoard.some((t: Token) => t.id === id)
        )
    );
    if (
      selectedTokenId &&
      !tokensOnBoard.some(
        (t: Token) => t.id === selectedTokenId
      )
    ) {
      setSelectedTokenId(null);
    }
    if (pendingAttack) {
      const attackerStillExists = tokensOnBoard.some(
        (t: Token) => t.id === pendingAttack.attackerTokenId,
      );
      const targetStillExists =
        pendingAttack.targetTokenId == null ||
        tokensOnBoard.some((t: Token) => t.id === pendingAttack.targetTokenId);

      if (!attackerStillExists || !targetStillExists) {
        setPendingAttack(null);
      }
    }
  }, [
    characters,
    tokensOnBoard,
    activeModalName,
    closeModalByName,
    draggingVisuals.tokenId,
    preDragHPModalTokenId,
    activeModalProps?.tokenId,
    modalStack,
    selectedTokenId,
    setSelectedTokenId,
    pendingAttack,
  ]);

  // Limpar seleção ao trocar de ferramenta e fechar apenas o HP control contextual.
  useEffect(() => {
    if (activeTool !== Tool.SELECT) {
      handleClearMultiSelection();
      if (activeModalName === "hpControl") {
        closeModalByName("hpControl");
      }
    }
  }, [activeModalName, activeTool, handleClearMultiSelection, closeModalByName]);

  useEffect(() => {
    if (activeModalName === "hpControl" && activeModalProps?.tokenId) {
      // Renomeado
      const selectedToken = tokensOnBoard.find(
        (t: Token) => t.id === activeModalProps.tokenId
      );
      const isTokenBeingDragged =
        draggingVisuals.tokenId === activeModalProps.tokenId &&
        draggingVisuals.visualSVGPoint !== null;

      if (
        !isTokenBeingDragged &&
        (!selectedToken || activeTool !== Tool.SELECT)
      ) {
        closeModalByName("hpControl");
      }
    }
  }, [
    tokensOnBoard,
    activeTool,
    activeModalName,
    activeModalProps,
    draggingVisuals,
    closeModalByName,
  ]);

  const shouldIgnoreBoardShortcut = useCallback(() => {
    const activeEl = document.activeElement;
    const activeDialog = activeEl?.closest('[role="dialog"]');

    if (
      activeEl &&
      (activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT' ||
        activeEl.tagName === 'BUTTON' ||
        activeEl.getAttribute('contenteditable') === 'true')
    ) {
      if (!activeEl.closest('.hp-control-modal-root')) {
        return true;
      }
    }

    if (activeDialog && !activeEl?.closest('.hp-control-modal-root')) {
      return true;
    }

    if (activePopover && activeModalName !== 'hpControl') {
      return true;
    }

    return false;
  }, [activeModalName, activePopover]);

  const handleBoardPointerMove = useCallback((svgPoint: AppPoint) => {
    setPasteTargetCell(svgPoint);
  }, []);

  const handleBoardPointerLeave = useCallback(() => {
    setPasteTargetCell(null);
  }, []);

  const clearCopiedToken = useCallback(() => {
    setCopiedTokenSnapshot(null);
    setPasteTargetCell(null);
  }, []);

  // Handle DELETE / COPY / PASTE key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcutKeyPressed = event.ctrlKey || event.metaKey;
      const normalizedKey = event.key.toLowerCase();
      const isPasteShortcut = shortcutKeyPressed && normalizedKey === 'v';
      const isModifierOnly =
        event.key === 'Control' ||
        event.key === 'Meta' ||
        event.key === 'Alt' ||
        event.key === 'Shift';

      if (copiedTokenSnapshot && !isPasteShortcut && !isModifierOnly) {
        clearCopiedToken();
      }

      if (shouldIgnoreBoardShortcut()) {
        return;
      }

      if (shortcutKeyPressed && normalizedKey === 'c') {
        const activeTokenId =
          selectedTokenId ??
          (activeModalName === 'hpControl' && typeof activeModalProps?.tokenId === 'string'
            ? activeModalProps.tokenId
            : null);

        if (!activeTokenId) {
          return;
        }

        const tokenToCopy = tokensOnBoard.find((token: Token) => token.id === activeTokenId);
        if (!tokenToCopy) {
          return;
        }

        setCopiedTokenSnapshot({
          tokenId: tokenToCopy.id,
          characterId: tokenToCopy.characterId,
          sceneId: tokenToCopy.sceneId,
          position: tokenToCopy.position,
        });
        event.preventDefault();
        return;
      }

      if (isPasteShortcut) {
        if (!copiedTokenSnapshot) {
          return;
        }

        event.preventDefault();
        void duplicateCopiedTokenAuthoritative();
        return;
      }

      if (event.key === 'Delete') {
        const isMaster = currentGame?.owner.id === user?.id;
        if (!isMaster) {
          return;
        }

        if (selectedTokenId) {
          removeTokenAuthoritative(selectedTokenId);
          setSelectedTokenId(null);
          closeModalByName('hpControl');
        } else if (multiSelectedTokenIds.length > 0) {
          multiSelectedTokenIds.forEach((id: string) => removeTokenAuthoritative(id));
          handleClearMultiSelection();
        } else if (
          activeModalName === 'hpControl' &&
          activeModalProps?.tokenId &&
          typeof activeModalProps.tokenId === 'string'
        ) {
          removeTokenAuthoritative(activeModalProps.tokenId);
          closeModalByName('hpControl');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    activeModalName,
    activeModalProps,
    copiedTokenSnapshot,
    clearCopiedToken,
    currentGame,
    duplicateCopiedTokenAuthoritative,
    multiSelectedTokenIds,
    removeTokenAuthoritative,
    handleClearMultiSelection,
    closeModalByName,
    selectedTokenId,
    setSelectedTokenId,
    shouldIgnoreBoardShortcut,
    tokensOnBoard,
    user,
  ]);

  // Prevent default behavior for Alt key to avoid browser menu focus
  useEffect(() => {
    const handleLeftMouseDown = (event: MouseEvent) => {
      if (event.button === 0 && copiedTokenSnapshot) {
        clearCopiedToken();
      }
    };

    window.addEventListener('mousedown', handleLeftMouseDown);
    return () => {
      window.removeEventListener('mousedown', handleLeftMouseDown);
    };
  }, [copiedTokenSnapshot, clearCopiedToken]);

  useEffect(() => {
    const handleAltKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleAltKeyDown);
    return () => {
      window.removeEventListener("keydown", handleAltKeyDown);
    };
  }, []);

  return {
    draggingVisuals,
    copiedTokenId: copiedTokenSnapshot?.tokenId ?? null,
    pasteTargetCell,
    selectedActionTokenId: pendingAttack?.attackerTokenId ?? selectedTokenId,
    pendingAttack,
    multiSelectedTokenIds, // Renomeado
    handleTokenSelectForHPModal, // Renomeado
    handleHPChangeFromModal,
    handleTempHpChangeFromModal,
    handleTokenDragStart, // Renomeado
    handleTokenDragMove, // Renomeado
    handleTokenDragEnd, // Renomeado
    handleSetMultiSelectedTokenIds, // Renomeado
    handleClearMultiSelection,
    handleBoardPointerMove,
    handleBoardPointerLeave,
    handleArmAttack,
    handleCancelPendingAttack,
  };
};
