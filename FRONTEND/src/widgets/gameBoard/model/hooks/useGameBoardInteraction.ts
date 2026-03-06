import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useCharactersStore } from "@/entities/character/model/store";
import { useAuthStore } from "@/features/auth/model/authStore";
import { useBoardSettingsStore } from "@/features/boardSettings/model/store";
import { useCombatStore } from "@/features/combat/model/store";
import {
  sendGameCharacterHpUpdate,
  sendGameCharacterTempHpUpdate,
  sendGameDuplicateCharacterWithToken,
  sendGameRemoveTokens,
  sendGameRemoveToken,
  sendGameResolveAttack,
} from "@/features/game/model/gameSessionApi";
import { useGameStore } from "@/features/game/model/gameStore";
import { canUserControlToken } from '@/features/game/model/tokenControlPolicy';
import { useUIStore } from "@/features/layoutControls/model/store";
import { ModalEntry } from "@/features/modalManager/model/baseModalConfig";
import { useSessionModalStore } from "@/features/modalManager/model/sessionModalStore";

import { useSelectedTokenStore } from "../../../../entities/token/model/store/selectedTokenStore";
import { useTokenStore } from "../../../../entities/token/model/store/tokenStore";
import { parseTokenSize } from "../../../../entities/token/model/utils/tokenUtils";
import {
  Tool,
  type AttackEntry,
  type PendingAttackSelection,
  type Point as AppPoint,
  type DraggingVisuals,
  type Token,
} from "../../../../shared/api/types";
import {
  getChebyshevDistanceBetweenTokenBounds,
  getTokenGridBounds,
  pickTopmostTokenIdAtWorldPoint,
} from "../renderer";



interface CopiedTokenSnapshot {
  tokenId: string;
  characterId: string;
  sceneId: string;
  position: AppPoint;
}

function isCombatParticipant(
  combatState: ReturnType<typeof useCombatStore.getState>['combatState'],
  tokenId: string | null,
): boolean {
  if (!combatState || !tokenId) {
    return false;
  }

  return combatState.participants.some((participant) => participant.tokenId === tokenId);
}

function getActiveCombatTurnTokenId(
  combatState: ReturnType<typeof useCombatStore.getState>['combatState'],
): string | null {
  if (!combatState || combatState.participants.length === 0) {
    return null;
  }

  return combatState.participants[combatState.turnIndex]?.tokenId ?? null;
}

function isTargetWithinAttackRange(
  attacker: Token,
  target: Token,
  rangeMeters: number,
  metersPerSquare: number,
  attackerSize: string,
  targetSize: string,
): boolean {
  if (rangeMeters <= 0 || metersPerSquare <= 0) {
    return false;
  }

  const [attackerWidth, attackerHeight] = parseTokenSize(attackerSize);
  const [targetWidth, targetHeight] = parseTokenSize(targetSize);
  const attackerBounds = getTokenGridBounds({
    token: attacker,
    sizeInCells: [attackerWidth, attackerHeight],
  });
  const targetBounds = getTokenGridBounds({
    token: target,
    sizeInCells: [targetWidth, targetHeight],
  });
  const distanceSquares = getChebyshevDistanceBetweenTokenBounds(attackerBounds, targetBounds);
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
    visualWorldPoint: AppPoint
  ) => void;
  handleTokenDragEnd: (tokenId: string) => void;
  handleSetMultiSelectedTokenIds: (ids: string[]) => void;
  handleClearMultiSelection: () => void;
  handleBoardPointerMove: (worldPoint: AppPoint) => void;
  handleBoardPointerLeave: () => void;
  handleBoardSelectAtPoint: (worldPoint: AppPoint) => boolean;
  handleArmAttack: (attack: AttackEntry) => void;
  handleCancelPendingAttack: () => void;
}

export const useGameBoardInteraction = (): UseGameBoardInteractionReturn => {
  const { gameId } = useParams<{ gameId: string }>();
  const { characters, runtimeCharactersById } = useCharactersStore();
  const { tokensOnBoard } = useTokenStore();
  const metersPerSquare = useBoardSettingsStore((state) => state.gridSettings.metersPerSquare);
  const activeTool = useUIStore((state) => state.activeTool);
  const activePopover = useUIStore((state) => state.activePopover);
  const setActiveTool = useUIStore((state) => state.setActiveTool);
  const currentGame = useGameStore((state) => state.currentGame);
  const combatState = useCombatStore((state) => state.combatState);
  const user = useAuthStore((state) => state.user);
  const { modalStack, openModal, closeModalByName, updateModalProps } = useSessionModalStore();
  const { selectedTokenId, setSelectedTokenId } = useSelectedTokenStore();

  const [draggingVisuals, setDraggingVisuals] = useState<DraggingVisuals>({
    tokenId: null,
    visualWorldPoint: null,
  });
  const [preDragHPModalTokenId, setPreDragHPModalTokenId] = useState<string | null>(null);
  const [multiSelectedTokenIds, setMultiSelectedTokenIds] = useState<string[]>([]);
  const [copiedTokenSnapshot, setCopiedTokenSnapshot] = useState<CopiedTokenSnapshot | null>(null);
  const [pasteTargetCell, setPasteTargetCell] = useState<AppPoint | null>(null);
  const [pendingAttack, setPendingAttack] = useState<PendingAttackSelection | null>(null);

  // Helper para obter o modal ativo e suas props
  const activeModalEntry =
    modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const activeModalName = activeModalEntry?.name;
  const activeModalProps = activeModalEntry?.props;
  const activeCombatTurnTokenId = getActiveCombatTurnTokenId(combatState);
  const isGameMaster = currentGame?.owner.id === user?.id;

  const canCurrentUserControlToken = useCallback(
    (tokenId: string | null) => {
      if (!tokenId || !currentGame || !user) {
        return false;
      }

      if (currentGame.owner.id === user.id) {
        return true;
      }

      const token = tokensOnBoard.find((entry: Token) => entry.id === tokenId);
      if (!token) {
        return false;
      }

      const runtimeCharacter = runtimeCharactersById[token.characterId] ?? null;
      if (!runtimeCharacter) {
        console.error(
          'Violação de contrato de sessão: token em mesa sem runtime compartilhado.',
          { tokenId, characterId: token.characterId },
        );
        return false;
      }

      return canUserControlToken({
        gameOwnerUserId: currentGame.owner.id,
        currentUserId: user.id,
        runtimeCharacter,
      });
    },
    [currentGame, runtimeCharactersById, tokensOnBoard, user],
  );

  const canCurrentUserAccessTokenContext = useCallback(
    (tokenId: string | null) => {
      void tokenId;
      return isGameMaster;
    },
    [isGameMaster],
  );

  const handleClearMultiSelection = useCallback(() => {
    setMultiSelectedTokenIds([]);
    setSelectedTokenId(null);
    setPendingAttack(null);
  }, [setSelectedTokenId]);

  const handleArmAttack = useCallback(
    (attack: AttackEntry) => {
      if (!selectedTokenId) {
        return;
      }

      if (!canCurrentUserControlToken(selectedTokenId)) {
        return;
      }

      if (
        isCombatParticipant(combatState, selectedTokenId) &&
        activeCombatTurnTokenId !== selectedTokenId
      ) {
        toast.error('Aguarde o seu turno para agir no combate.');
        return;
      }

      setPendingAttack({
        attackerTokenId: selectedTokenId,
        attack,
        targetTokenId: null,
      });
      setActiveTool(Tool.SELECT);
      setMultiSelectedTokenIds([selectedTokenId]);
      closeModalByName('hpControl');
    },
    [activeCombatTurnTokenId, canCurrentUserControlToken, closeModalByName, combatState, selectedTokenId, setActiveTool],
  );

  const handleCancelPendingAttack = useCallback(() => {
    const attackerTokenId = pendingAttack?.attackerTokenId ?? selectedTokenId ?? null;
    setPendingAttack(null);
    if (attackerTokenId) {
      setSelectedTokenId(attackerTokenId);
      setMultiSelectedTokenIds([attackerTokenId]);
    }
  }, [pendingAttack, selectedTokenId, setSelectedTokenId]);

  const handleTokenSelectForHPModal = useCallback(
    (tokenId: string, tokenScreenRect: DOMRect | null) => {
      void tokenScreenRect;
      if (activeTool !== Tool.SELECT) {
        return;
      }

      setSelectedTokenId(tokenId);
      setMultiSelectedTokenIds([]);

      const isHpControlAlreadyOpenForToken = modalStack.some(
        (modal: ModalEntry) =>
          modal.name === "hpControl" && modal.props.tokenId === tokenId
      );

      if (isHpControlAlreadyOpenForToken) {
        return;
      }

      if (!canCurrentUserAccessTokenContext(tokenId)) {
        return;
      }

      if (activeModalName === "hpControl") {
        updateModalProps({ tokenId });
        return;
      }

      openModal("hpControl", { tokenId });
    },
    [
      activeTool,
      canCurrentUserAccessTokenContext,
      openModal,
      modalStack,
      setSelectedTokenId,
      setMultiSelectedTokenIds,
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
        .then(() => {})
        .catch((error) => {
          console.warn("Falha ao sincronizar HP do personagem com o servidor.");
          const message =
            typeof error === 'object' &&
            error !== null &&
            'formError' in error &&
            typeof (error as { formError?: unknown }).formError === 'string'
              ? (error as { formError: string }).formError
              : 'Falha ao sincronizar HP do personagem com o servidor.';
          toast.error(message);
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
        .then(() => {})
        .catch((error) => {
          console.warn("Falha ao sincronizar HP temporário do personagem com o servidor.");
          const message =
            typeof error === 'object' &&
            error !== null &&
            'formError' in error &&
            typeof (error as { formError?: unknown }).formError === 'string'
              ? (error as { formError: string }).formError
              : 'Falha ao sincronizar HP temporário do personagem com o servidor.';
          toast.error(message);
        });
    },
    [tokensOnBoard, characters, gameId, currentGame, user]
  );

  const removeTokenAuthoritative = useCallback(
    async (tokenId: string) => {
      const parsedGameId = Number(gameId);
      const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
      if (!isValidGameId) {
        return;
      }

      try {
        await sendGameRemoveToken(parsedGameId, tokenId);
      } catch {
        console.warn("Falha ao remover token no servidor.");
      }
    },
    [gameId]
  );

  const removeTokensAuthoritative = useCallback(
    async (tokenIds: string[]) => {
      const parsedGameId = Number(gameId);
      const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
      if (!isValidGameId || tokenIds.length === 0) {
        return;
      }

      try {
        await sendGameRemoveTokens(parsedGameId, tokenIds);
      } catch {
        console.warn("Falha ao remover tokens no servidor.");
      }
    },
    [gameId],
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
    (tokenId: string) => {
      if (
        activeModalName === "hpControl" &&
        activeModalProps?.tokenId === tokenId
      ) {
        setPreDragHPModalTokenId(tokenId);
        closeModalByName("hpControl");
      }
      setDraggingVisuals((prev: DraggingVisuals) => ({ ...prev, tokenId }));
      handleClearMultiSelection();
    },
    [activeModalName, activeModalProps, closeModalByName, handleClearMultiSelection]
  );

  const handleTokenDragMove = useCallback(
    (tokenId: string, visualWorldPoint: AppPoint) => {
      setDraggingVisuals((prev: DraggingVisuals) => {
        if (prev.tokenId === tokenId) {
          return { tokenId, visualWorldPoint };
        }
        return prev;
      });
    },
    []
  );

  const handleTokenDragEnd = useCallback(
    (tokenId: string) => {
      const tokenExists = tokensOnBoard.find((t: Token) => t.id === tokenId);
      if (tokenExists && preDragHPModalTokenId === tokenId) {
        openModal("hpControl", { tokenId });
      }
      setPreDragHPModalTokenId(null);
      setDraggingVisuals({ tokenId: null, visualWorldPoint: null });
    },
    [preDragHPModalTokenId, openModal, tokensOnBoard]
  );

  const handleSetMultiSelectedTokenIds = useCallback(
    (ids: string[]) => {
      if (pendingAttack && ids.length !== 1) {
        toast.error('Selecione um alvo válido.');
        setSelectedTokenId(pendingAttack.attackerTokenId);
        setMultiSelectedTokenIds([pendingAttack.attackerTokenId]);
        return;
      }

      if (pendingAttack && ids.length === 1) {
        const targetTokenId = ids[0];
        if (selectedTokenId !== pendingAttack.attackerTokenId) {
          setPendingAttack(null);
          setSelectedTokenId(targetTokenId);
          setMultiSelectedTokenIds([targetTokenId]);
          if (activeModalName === "hpControl") {
            updateModalProps({ tokenId: targetTokenId });
          }
          return;
        }

        const attackerCanStillAct =
          !isCombatParticipant(combatState, pendingAttack.attackerTokenId) ||
          activeCombatTurnTokenId === pendingAttack.attackerTokenId;
        if (!attackerCanStillAct) {
          setPendingAttack(null);
          setSelectedTokenId(targetTokenId);
          setMultiSelectedTokenIds([targetTokenId]);
          if (activeModalName === "hpControl") {
            updateModalProps({ tokenId: targetTokenId });
          }
          return;
        }

        if (targetTokenId === pendingAttack.attackerTokenId) {
          toast.error('Você não pode ser alvo desse efeito.');
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
        const attackerCharacter = characters.find((character) => character.id === attackerToken.characterId);
        const targetCharacter = characters.find((character) => character.id === targetToken.characterId);
        if (!attackerCharacter || !targetCharacter) {
          console.error('Violação de contrato de sessão: token sem personagem para validação de alcance.', {
            attackerTokenId: attackerToken.id,
            attackerCharacterId: attackerToken.characterId,
            attackerCharacterFound: Boolean(attackerCharacter),
            targetTokenId: targetToken.id,
            targetCharacterId: targetToken.characterId,
            targetCharacterFound: Boolean(targetCharacter),
          });
          toast.error('Falha ao validar alcance do ataque. Recarregue a sessão.');
          setPendingAttack(null);
          setMultiSelectedTokenIds([]);
          setSelectedTokenId(null);
          return;
        }
        const attackerSize = attackerCharacter.size;
        const targetSize = targetCharacter.size;

        const isWithinRange = isTargetWithinAttackRange(
          attackerToken,
          targetToken,
          pendingAttack.attack.rangeMeters,
          metersPerSquare,
          attackerSize,
          targetSize,
        );

        if (!isWithinRange) {
          toast.error('Alvo fora do alcance deste ataque.');
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
          .then(() => {
            setPendingAttack(null);
            setSelectedTokenId(null);
            setMultiSelectedTokenIds([]);
            closeModalByName('hpControl');
          })
          .catch((error) => {
            const message =
              typeof error === 'object' &&
              error !== null &&
              'formError' in error &&
              typeof (error as { formError?: unknown }).formError === 'string'
                ? (error as { formError: string }).formError
                : 'Falha ao resolver ataque no servidor.';
            toast.error(message);
            setPendingAttack(null);
            setMultiSelectedTokenIds([pendingAttack.attackerTokenId]);
            setSelectedTokenId(pendingAttack.attackerTokenId);
          });
        return;
      }

      setMultiSelectedTokenIds(ids);

      if (ids.length === 1) {
        setSelectedTokenId(ids[0]);
        const token = tokensOnBoard.find((t: Token) => t.id === ids[0]);
        const isHpControlAlreadyOpenForToken = modalStack.some(
          (modal: ModalEntry) => modal.name === "hpControl" && modal.props.tokenId === ids[0]
        );
        const canAccessTokenContext = canCurrentUserAccessTokenContext(ids[0]);

        if (token && canAccessTokenContext && !isHpControlAlreadyOpenForToken) {
          if (activeModalName === "hpControl") {
            updateModalProps({ tokenId: ids[0] });
          } else {
            openModal("hpControl", { tokenId: ids[0] });
          }
        } else if (!canAccessTokenContext && activeModalName === "hpControl") {
          closeModalByName("hpControl");
        }
      } else {
        setSelectedTokenId(null);
        if (activeModalName === "hpControl") {
          closeModalByName("hpControl");
        }
      }
    },
    [
      activeModalName,
      activeCombatTurnTokenId,
      canCurrentUserAccessTokenContext,
      closeModalByName,
      combatState,
      gameId,
      selectedTokenId,
      setSelectedTokenId,
      openModal,
      tokensOnBoard,
      modalStack,
      updateModalProps,
      pendingAttack,
      metersPerSquare,
      characters,
    ]
  );

  // Efeitos de limpeza e gerenciamento de estado
  useEffect(() => {
    const currentHPModalTokenId =
      activeModalName === "hpControl" && typeof activeModalProps?.tokenId === 'string'
        ? activeModalProps.tokenId
        : null;
    const sheetModalEntry = modalStack.find((modal) => modal.name === "sheet") ?? null;
    const currentSheetId = sheetModalEntry?.props.characterId;

    if (
      activeModalName === "hpControl" &&
      currentHPModalTokenId &&
      (
        !tokensOnBoard.find(
          (t: Token) => t.id === currentHPModalTokenId
        ) ||
        !canCurrentUserAccessTokenContext(currentHPModalTokenId)
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
      setDraggingVisuals({ tokenId: null, visualWorldPoint: null });
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
        const attackerCanStillAct =
          !isCombatParticipant(combatState, pendingAttack.attackerTokenId) ||
          activeCombatTurnTokenId === pendingAttack.attackerTokenId;
        const attackerStillExists = tokensOnBoard.some(
        (t: Token) => t.id === pendingAttack.attackerTokenId,
      );
        const targetStillExists =
          pendingAttack.targetTokenId == null ||
          tokensOnBoard.some((t: Token) => t.id === pendingAttack.targetTokenId);

        if (!attackerStillExists || !targetStillExists || !attackerCanStillAct) {
          setPendingAttack(null);
        }
      }
  }, [
    characters,
    tokensOnBoard,
    activeModalName,
    activeCombatTurnTokenId,
    canCurrentUserAccessTokenContext,
    closeModalByName,
    combatState,
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
      const selectedToken = tokensOnBoard.find(
        (t: Token) => t.id === activeModalProps.tokenId
      );
      const isTokenBeingDragged =
        draggingVisuals.tokenId === activeModalProps.tokenId &&
        draggingVisuals.visualWorldPoint !== null;

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

  const handleBoardPointerMove = useCallback((worldPoint: AppPoint) => {
    setPasteTargetCell(worldPoint);
  }, []);

  const handleBoardPointerLeave = useCallback(() => {
    setPasteTargetCell(null);
  }, []);

  const handleBoardSelectAtPoint = useCallback(
    (worldPoint: AppPoint) => {
      const tokenId = pickTopmostTokenIdAtWorldPoint({
        worldPoint,
        cellSize: useBoardSettingsStore.getState().gridSettings.visualCellSize,
        tokensOnBoard,
        preferredTopTokenIds: multiSelectedTokenIds,
        getTokenSizeInCells: (token) => {
          const character = characters.find((entry) => entry.id === token.characterId);
          return parseTokenSize(character?.size);
        },
      });

      if (tokenId) {
        handleSetMultiSelectedTokenIds([tokenId]);
        return true;
      }

      if (pendingAttack) {
        toast.error('Selecione um alvo válido.');
        setSelectedTokenId(pendingAttack.attackerTokenId);
        setMultiSelectedTokenIds([pendingAttack.attackerTokenId]);
        return false;
      }

      handleClearMultiSelection();
      return false;
    },
    [characters, handleClearMultiSelection, handleSetMultiSelectedTokenIds, multiSelectedTokenIds, pendingAttack, setSelectedTokenId, tokensOnBoard],
  );

  const clearCopiedToken = useCallback(() => {
    setCopiedTokenSnapshot(null);
    setPasteTargetCell(null);
  }, []);

  const notifyBoardShortcutMasterOnly = useCallback(() => {
    toast.error("Somente o mestre pode usar copiar, colar ou excluir tokens.");
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

      if (event.key === 'Escape' && pendingAttack) {
        event.preventDefault();
        handleCancelPendingAttack();
        return;
      }

      if (copiedTokenSnapshot && !isPasteShortcut && !isModifierOnly) {
        clearCopiedToken();
      }

      if (shouldIgnoreBoardShortcut()) {
        return;
      }

      if (shortcutKeyPressed && normalizedKey === 'c') {
        const isMaster = currentGame?.owner.id === user?.id;
        if (!isMaster) {
          event.preventDefault();
          clearCopiedToken();
          notifyBoardShortcutMasterOnly();
          return;
        }

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
        const isMaster = currentGame?.owner.id === user?.id;
        if (!isMaster) {
          event.preventDefault();
          clearCopiedToken();
          notifyBoardShortcutMasterOnly();
          return;
        }

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
          event.preventDefault();
          notifyBoardShortcutMasterOnly();
          return;
        }

        if (selectedTokenId) {
          void removeTokenAuthoritative(selectedTokenId);
          setSelectedTokenId(null);
          closeModalByName('hpControl');
        } else if (multiSelectedTokenIds.length > 0) {
          void removeTokensAuthoritative([...multiSelectedTokenIds]);
          handleClearMultiSelection();
        } else if (
          activeModalName === 'hpControl' &&
          activeModalProps?.tokenId &&
          typeof activeModalProps.tokenId === 'string'
        ) {
          void removeTokenAuthoritative(activeModalProps.tokenId);
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
    removeTokensAuthoritative,
    removeTokenAuthoritative,
    handleClearMultiSelection,
    closeModalByName,
    selectedTokenId,
    setSelectedTokenId,
    shouldIgnoreBoardShortcut,
    tokensOnBoard,
    user,
    notifyBoardShortcutMasterOnly,
    pendingAttack,
    handleCancelPendingAttack,
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
    multiSelectedTokenIds,
    handleTokenSelectForHPModal,
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
  };
};
