import { useCallback, useEffect, useState } from "react";
import { useCharacters } from "../../../../entities/character/model/contexts/CharactersContext"; // Renomeado
import { useSelectedToken } from "../../../../entities/token/model/contexts/SelectedTokenContext";
import { HP_MODAL_ESTIMATED_HEIGHT_REM } from "../../../../features/characterUpdateHp/ui/HPControlModal";
import {
  Tool,
  type Point as AppPoint, // Renomeado de GridInstance
  type Character,
  type DraggingVisuals,
  type Token, // Renomeado de GridInstance
} from "../../../../shared/api/types";
import { useUI } from "../../../layoutControls/model/contexts/UIProvider";
import { useModal } from "../../../modalManager/model/contexts/ModalProvider";
import { ModalEntry } from "../../../modalManager/model/hooks/useModalStateManagement";

interface UseGameBoardInteractionProps {
  gameBoardRef: React.RefObject<HTMLDivElement>;
}

interface UseGameBoardInteractionReturn {
  draggingVisuals: DraggingVisuals;
  multiSelectedTokenIds: string[]; // Renomeado
  handleTokenSelectForHPModal: (
    // Renomeado
    tokenId: string, // Renomeado
    tokenScreenRect: DOMRect | null
  ) => void;
  handleHPChangeFromModal: (tokenId: string, newHP: number) => void; // Renomeado
  handleRemoveInstanceFromBoard: (tokenId: string) => void; // Renomeado
  handleMakeInstanceIndependent: (tokenId: string) => void; // Renomeado
  handleHPModalAnchorShouldUpdate: (
    _tokenId: string, // Renomeado
    newScreenRect: DOMRect | null
  ) => void;
  handleTokenDragStart: (tokenId: string) => void; // Renomeado
  handleTokenDragMove: (
    // Renomeado
    tokenId: string, // Renomeado
    visualSVGPoint: AppPoint
  ) => void;
  handleTokenDragEnd: (tokenId: string) => void; // Renomeado
  handleSetMultiSelectedTokenIds: (ids: string[]) => void; // Renomeado
  handleClearMultiSelection: () => void;
}

export const useGameBoardInteraction = ({
  gameBoardRef,
}: UseGameBoardInteractionProps): UseGameBoardInteractionReturn => {
  const {
    characters, // Renomeado
    tokensOnBoard, // Renomeado
    removeToken, // Renomeado
    updateTokenHp, // Adicionado
    makeTokenIndependent, // Renomeado
  } = useCharacters(); // Renomeado
  const { activeTool } = useUI();
  const { modalStack, openModal, closeModal, updateModalProps } = useModal();
  const { selectedTokenId, setSelectedTokenId } = useSelectedToken(); // Renomeado

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

  // Helper para obter o modal ativo e suas props
  const activeModalEntry =
    modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const activeModalName = activeModalEntry?.name;
  const activeModalProps = activeModalEntry?.props;

  const handleClearMultiSelection = useCallback(() => {
    setMultiSelectedTokenIds([]); // Renomeado
    setSelectedTokenId(null); // Renomeado
  }, [setSelectedTokenId]);

  const calculateHPModalAnchorPoint = useCallback(
    (tokenScreenRect: DOMRect | null): AppPoint | null => {
      if (!tokenScreenRect) return null;

      const HP_MODAL_ESTIMATED_WIDTH_PX = 10 * 16; // Ajustar estimativa para 10rem (160px)

      const modalX =
        tokenScreenRect.x +
        tokenScreenRect.width / 2 -
        HP_MODAL_ESTIMATED_WIDTH_PX / 2;

      const marginAboveHPBar = 20;
      const totalOffsetFromTokenTop =
        HP_MODAL_ESTIMATED_HEIGHT_REM * 16 + marginAboveHPBar;

      const modalY = tokenScreenRect.y - totalOffsetFromTokenTop;

      return {
        x: modalX,
        y: modalY,
      };
    },
    []
  );

  const handleTokenSelectForHPModal = useCallback(
    // Renomeado
    (tokenId: string, tokenScreenRect: DOMRect | null) => {
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

      const anchor = calculateHPModalAnchorPoint(tokenScreenRect);
      openModal("hpControl", { tokenId, anchorPoint: anchor }); // Renomeado
    },
    [
      activeTool,
      openModal,
      modalStack,
      setSelectedTokenId, // Renomeado
      setMultiSelectedTokenIds, // Renomeado
      calculateHPModalAnchorPoint,
    ]
  );

  const handleHPChangeFromModal = useCallback(
    (tokenId: string, newHP: number) => {
      // Renomeado
      const token = tokensOnBoard.find(
        // Renomeado
        (t: Token) => t.id === tokenId // Renomeado
      );
      if (token) {
        const character = characters.find(
          // Renomeado
          (c: Character) => c.id === token.characterId // Renomeado
        );
        if (character) {
          const maxHp = character.maxHp ?? newHP; // Usar character.maxHp
          const validatedHP = Math.max(0, Math.min(newHP, maxHp));
          updateTokenHp(tokenId, validatedHP); // Renomeado
        }
      }
    },
    [tokensOnBoard, characters, updateTokenHp] // Renomeado
  );

  const handleRemoveInstanceFromBoard = useCallback(
    (tokenId: string) => {
      // Renomeado
      removeToken(tokenId); // Renomeado
      if (
        activeModalName === "hpControl" &&
        activeModalProps?.tokenId === tokenId // Renomeado
      ) {
        closeModal();
      }
      setMultiSelectedTokenIds(
        (
          prev: string[] // Renomeado
        ) => prev.filter((id: string) => id !== tokenId) // Renomeado
      );
      if (selectedTokenId === tokenId) {
        // Renomeado
        setSelectedTokenId(null); // Renomeado
      }
    },
    [
      removeToken, // Renomeado
      activeModalName,
      activeModalProps,
      closeModal,
      selectedTokenId, // Renomeado
      setSelectedTokenId, // Renomeado
    ]
  );

  const handleMakeInstanceIndependent = useCallback(
    (tokenId: string) => {
      // Renomeado
      const newIndependentCharacter = makeTokenIndependent(tokenId); // Renomeado
      if (newIndependentCharacter) {
        closeModal();
      }
    },
    [makeTokenIndependent, closeModal] // Renomeado
  );

  const handleHPModalAnchorShouldUpdate = useCallback(
    (_tokenId: string, newScreenRect: DOMRect | null) => {
      // Renomeado
      const newAnchor = calculateHPModalAnchorPoint(newScreenRect);

      if (activeModalName === "hpControl") {
        const currentAnchor = activeModalProps?.anchorPoint as AppPoint | null;

        if (
          (newAnchor &&
            currentAnchor &&
            (newAnchor.x !== currentAnchor.x ||
              newAnchor.y !== currentAnchor.y)) ||
          (newAnchor && !currentAnchor) ||
          (!newAnchor && currentAnchor)
        ) {
          updateModalProps({ anchorPoint: newAnchor });
        }
      }
    },
    [
      activeModalName,
      updateModalProps,
      activeModalProps?.anchorPoint,
      calculateHPModalAnchorPoint,
    ]
  );

  const handleTokenDragStart = useCallback(
    // Renomeado
    (tokenId: string) => {
      // Renomeado
      if (
        activeModalName === "hpControl" &&
        activeModalProps?.tokenId === tokenId // Renomeado
      ) {
        setPreDragHPModalTokenId(tokenId); // Renomeado
        closeModal();
      }
      setDraggingVisuals((prev: DraggingVisuals) => ({ ...prev, tokenId })); // Renomeado
      handleClearMultiSelection();
    },
    [activeModalName, activeModalProps, closeModal, handleClearMultiSelection]
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
        const domElement = gameBoardRef.current?.querySelector(
          `[data-token-id="${tokenId}"]` // Renomeado
        );
        const screenRect = domElement?.getBoundingClientRect() ?? null;
        const plainRect = screenRect
          ? ({
              x: screenRect.x,
              y: screenRect.y,
              width: screenRect.width,
              height: screenRect.height,
              top: screenRect.top,
              right: screenRect.right,
              bottom: screenRect.bottom,
              left: screenRect.left,
              toJSON: () => ({}),
            } as DOMRect)
          : null;
        openModal("hpControl", {
          tokenId, // Renomeado
          anchorPoint: plainRect
            ? calculateHPModalAnchorPoint(plainRect)
            : null,
        });
      }
      setPreDragHPModalTokenId(null); // Renomeado
      setDraggingVisuals({ tokenId: null, visualSVGPoint: null }); // Renomeado
    },
    [
      preDragHPModalTokenId, // Renomeado
      openModal,
      tokensOnBoard, // Renomeado
      calculateHPModalAnchorPoint,
      gameBoardRef,
    ]
  );

  const handleSetMultiSelectedTokenIds = useCallback(
    // Renomeado
    (ids: string[]) => {
      setMultiSelectedTokenIds(ids); // Renomeado

      if (ids.length === 1) {
        setSelectedTokenId(ids[0]); // Renomeado
        const token = tokensOnBoard.find((t) => t.id === ids[0]); // Renomeado
        if (token) {
          const domElement = gameBoardRef.current?.querySelector(
            `[data-token-id="${ids[0]}"]` // Renomeado
          );
          const screenRect = domElement?.getBoundingClientRect() ?? null;
          const anchor = calculateHPModalAnchorPoint(screenRect);
          openModal("hpControl", { tokenId: ids[0], anchorPoint: anchor }); // Renomeado
        }
      } else {
        setSelectedTokenId(null); // Renomeado
        closeModal();
      }
    },
    [
      closeModal,
      setSelectedTokenId, // Renomeado
      openModal,
      tokensOnBoard, // Renomeado
      calculateHPModalAnchorPoint,
      gameBoardRef,
    ]
  );

  // Efeitos de limpeza e gerenciamento de estado
  useEffect(() => {
    const currentHPModalTokenId = // Renomeado
      activeModalName === "hpControl" ? activeModalProps?.tokenId : null; // Renomeado
    const currentSheetId =
      activeModalName === "sheet" ? activeModalProps?.characterId : null; // Renomeado

    if (
      activeModalName === "hpControl" &&
      currentHPModalTokenId && // Renomeado
      !tokensOnBoard.find(
        // Renomeado
        (t: Token) => t.id === currentHPModalTokenId // Renomeado
      )
    ) {
      closeModal();
    }
    if (
      activeModalName === "sheet" &&
      currentSheetId &&
      !characters.find((c: Character) => c.id === currentSheetId) // Renomeado
    ) {
      closeModal();
    }
    if (
      draggingVisuals.tokenId && // Renomeado
      !tokensOnBoard.find(
        // Renomeado
        (t: Token) => t.id === draggingVisuals.tokenId // Renomeado
      )
    ) {
      setDraggingVisuals({ tokenId: null, visualSVGPoint: null }); // Renomeado
    }
    if (
      preDragHPModalTokenId && // Renomeado
      !tokensOnBoard.find(
        // Renomeado
        (t: Token) => t.id === preDragHPModalTokenId // Renomeado
      )
    ) {
      setPreDragHPModalTokenId(null); // Renomeado
    }
    setMultiSelectedTokenIds(
      (
        prev: string[] // Renomeado
      ) =>
        prev.filter(
          (id: string) => tokensOnBoard.some((t: Token) => t.id === id) // Renomeado
        )
    );
    if (
      selectedTokenId && // Renomeado
      !tokensOnBoard.some(
        // Renomeado
        (t: Token) => t.id === selectedTokenId // Renomeado
      )
    ) {
      setSelectedTokenId(null); // Renomeado
    }
  }, [
    characters, // Renomeado
    tokensOnBoard, // Renomeado
    activeModalName,
    closeModal,
    draggingVisuals.tokenId, // Renomeado
    preDragHPModalTokenId, // Renomeado
    activeModalProps?.tokenId, // Renomeado
    activeModalProps?.characterId, // Renomeado
    selectedTokenId, // Renomeado
    setSelectedTokenId, // Renomeado
  ]);

  // Limpar seleção e fechar modal de HP ao trocar de ferramenta
  useEffect(() => {
    if (activeTool !== Tool.SELECT) {
      handleClearMultiSelection();
      closeModal();
    }
  }, [activeTool, handleClearMultiSelection, closeModal]);

  useEffect(() => {
    if (activeModalName === "hpControl" && activeModalProps?.tokenId) {
      // Renomeado
      const selectedToken = tokensOnBoard.find(
        // Renomeado
        (t: Token) => t.id === activeModalProps.tokenId // Renomeado
      );
      const isTokenBeingDragged = // Renomeado
        draggingVisuals.tokenId === activeModalProps.tokenId && // Renomeado
        draggingVisuals.visualSVGPoint !== null;

      if (
        !isTokenBeingDragged && // Renomeado
        (!selectedToken || activeTool !== Tool.SELECT) // Renomeado
      ) {
        closeModal();
      }
    }
  }, [
    tokensOnBoard, // Renomeado
    activeTool,
    activeModalName,
    activeModalProps,
    draggingVisuals,
    closeModal,
  ]);

  // Handle DELETE key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT")
      ) {
        if (!activeEl.closest(".hp-control-modal-input")) {
          return;
        }
      }
      if (event.key === "Delete") {
        if (selectedTokenId) {
          // Renomeado
          removeToken(selectedTokenId); // Renomeado
          setSelectedTokenId(null); // Renomeado
          closeModal();
        } else if (multiSelectedTokenIds.length > 0) {
          // Renomeado
          multiSelectedTokenIds.forEach(
            (
              id: string // Renomeado
            ) => removeToken(id) // Renomeado
          );
          handleClearMultiSelection();
        } else if (
          activeModalName === "hpControl" &&
          activeModalProps?.tokenId // Renomeado
        ) {
          removeToken(activeModalProps.tokenId); // Renomeado
          closeModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeModalName,
    activeModalProps,
    multiSelectedTokenIds, // Renomeado
    removeToken, // Renomeado
    handleClearMultiSelection,
    closeModal,
    selectedTokenId, // Renomeado
    setSelectedTokenId, // Renomeado
  ]);

  // Prevent default behavior for Alt key to avoid browser menu focus
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
    multiSelectedTokenIds, // Renomeado
    handleTokenSelectForHPModal, // Renomeado
    handleHPChangeFromModal,
    handleRemoveInstanceFromBoard,
    handleMakeInstanceIndependent,
    handleHPModalAnchorShouldUpdate,
    handleTokenDragStart, // Renomeado
    handleTokenDragMove, // Renomeado
    handleTokenDragEnd, // Renomeado
    handleSetMultiSelectedTokenIds, // Renomeado
    handleClearMultiSelection,
  };
};
