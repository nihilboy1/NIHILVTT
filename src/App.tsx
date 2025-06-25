import { useState, useCallback, useEffect, useRef } from "react";
import { Toolbar } from "./components/layout/Toolbar"; // Atualizado
import { GameBoard } from "./features/board/GameBoard"; // Atualizado
import { RightSidebar } from "./components/layout/RightSidebar"; // Atualizado
import {
  HPControlModal,
  HP_MODAL_ESTIMATED_HEIGHT,
} from "./components/modals/HPControlModal"; // Atualizado
import { SimpleNameModal } from "./components/modals/SimpleNameModal"; // Atualizado
import { SheetModal } from "./components/modals/SheetModal";
import { ConfirmationModal } from "./components/modals/ConfirmationModal";
import {
  Tool,
  TokenType,
  type Point as AppPoint,
  type DraggingVisuals,
  type Token as TokenInfo,
  type GridInstance, // Adicionado para tipagem
  type PlayerToken, // Adicionado para tipagem
} from "./types/index"; // Atualizado
import {
  DEFAULT_TOKEN_COLOR,
  DEFAULT_TOKEN_SIZE,
  DEFAULT_TOKEN_HP,
  DEFAULT_PLAYER_LEVEL,
  DEFAULT_PLAYER_INSPIRATION,
  DEFAULT_TOKEN_IMAGE, // Importar DEFAULT_TOKEN_IMAGE
} from "./constants";
import { ChevronLeftIcon, ChevronRightIcon } from "./components/icons";
import { useTokens } from "./contexts/TokensContext";
import { useUI } from "./contexts/UIContext";
import { useModal } from "./contexts/ModalContext";
import { SheetProvider } from "./contexts/SheetContext"; // Importar SheetProvider

export default function App() {
  const {
    tokens,
    gridInstances,
    addToken,
    updateToken,
    removeGridInstance,
    makeGridInstanceIndependent,
  } = useTokens();

  const {
    isToolbarVisible,
    setIsToolbarVisible,
    isRightSidebarVisible,
    setIsRightSidebarVisible,
    activeTool,
  } = useUI();

  const { activeModal, modalProps, openModal, closeModal, updateModalProps } =
    useModal();

  const gameBoardRef = useRef<HTMLDivElement>(null);

  const [draggingVisuals, setDraggingVisuals] = useState<DraggingVisuals>({
    instanceId: null,
    visualSVGPoint: null,
  });
  const [preDragHPModalInstanceId, setPreDragHPModalInstanceId] = useState<
    string | null
  >(null);
  const [multiSelectedInstanceIds, setMultiSelectedInstanceIds] = useState<
    string[]
  >([]);

  useEffect(() => {
    const currentHPModalInstanceId =
      activeModal === "hpControl" ? modalProps.instanceId : null;
    const currentSheetId =
      activeModal === "sheet" ? modalProps.tokenId : null;

    // Fechar modal de HP se a instância alvo for removida
    if (
      activeModal === "hpControl" &&
      currentHPModalInstanceId &&
      !gridInstances.find(
        (gi: GridInstance) => gi.instanceId === currentHPModalInstanceId
      )
    ) {
      closeModal();
    }
    // Fechar TokenSheet se o TokenInfo alvo for deletado
    if (
      activeModal === "sheet" &&
      currentSheetId &&
      !tokens.find((t: TokenInfo) => t.id === currentSheetId)
    ) {
      closeModal();
    }
    // Limpar visuais de arrasto se a instância for removida
    if (
      draggingVisuals.instanceId &&
      !gridInstances.find(
        (gi: GridInstance) => gi.instanceId === draggingVisuals.instanceId
      )
    ) {
      setDraggingVisuals({ instanceId: null, visualSVGPoint: null });
    }
    // Limpar seleção pré-arrasto se a instância for removida
    if (
      preDragHPModalInstanceId &&
      !gridInstances.find(
        (gi: GridInstance) => gi.instanceId === preDragHPModalInstanceId
      )
    ) {
      setPreDragHPModalInstanceId(null);
    }
    // Limpar IDs multi-selecionados se algum deles for removido
    setMultiSelectedInstanceIds((prev: string[]) =>
      prev.filter((id: string) =>
        gridInstances.some((gi: GridInstance) => gi.instanceId === id)
      )
    );
  }, [
    tokens,
    gridInstances,
    activeModal,
    closeModal,
    draggingVisuals.instanceId,
    preDragHPModalInstanceId,
    modalProps.instanceId,
    modalProps.tokenId,
  ]);

  useEffect(() => {
    if (activeModal === "hpControl" && modalProps.instanceId) {
      const selectedInstance = gridInstances.find(
        (gi: GridInstance) => gi.instanceId === modalProps.instanceId
      );
      const isInstanceBeingDragged =
        draggingVisuals.instanceId === modalProps.instanceId &&
        draggingVisuals.visualSVGPoint !== null;

      if (
        !isInstanceBeingDragged &&
        (!selectedInstance || activeTool !== Tool.SELECT)
      ) {
        closeModal();
      }
    }
  }, [
    gridInstances,
    activeTool,
    activeModal,
    modalProps,
    draggingVisuals,
    closeModal,
  ]);

  const handleSaveNewTokenName = (
    name: string,
    tokenTypeFromModal?: TokenType
  ) => {
    console.log("handleSaveNewTokenName chamado com:", {
      name,
      tokenTypeFromModal,
    });
    // Usar o tokenType vindo diretamente do modal, que é mais confiável
    const typeToUse = tokenTypeFromModal || modalProps.tokenType; // Mantendo o fallback para modalProps.tokenType por segurança, embora modalProps.type seja o correto agora.

    if (!typeToUse) {
      console.error("handleSaveNewTokenName: tokenType is missing.");
      return;
    }

    let newSheetData: Omit<TokenInfo, "id">;

    if (typeToUse === TokenType.PLAYER) {
      newSheetData = {
        name: name,
        type: TokenType.PLAYER,
        image: DEFAULT_TOKEN_IMAGE,
        color: DEFAULT_TOKEN_COLOR,
        size: DEFAULT_TOKEN_SIZE,
        currentHp: DEFAULT_TOKEN_HP,
        maxHp: DEFAULT_TOKEN_HP,
        notes: "",
        species: "",
        charClass: "",
        subclass: "",
        level: DEFAULT_PLAYER_LEVEL,
        background: "",
        inspiration: DEFAULT_PLAYER_INSPIRATION,
        armorClass: 10,
        shieldEquipped: false,
        tempHp: 0,
        hitDiceUsed: 0,
        hitDiceMax: DEFAULT_PLAYER_LEVEL,
        deathSavesSuccesses: 0,
        deathSavesFailures: 0,
      } as Omit<TokenInfo, "id">; // Assert as Omit<PlayerToken, "id"> which is compatible with Omit<TokenInfo, "id">
    } else {
      newSheetData = {
        name: name,
        type: typeToUse,
        image: DEFAULT_TOKEN_IMAGE,
        color: DEFAULT_TOKEN_COLOR,
        size: DEFAULT_TOKEN_SIZE,
        currentHp: DEFAULT_TOKEN_HP,
        maxHp: DEFAULT_TOKEN_HP,
        notes: "",
      } as Omit<TokenInfo, "id">; // Assert as Omit<BaseToken, "id"> which is compatible with Omit<TokenInfo, "id">
    }
    const newTokenInfo = addToken(newSheetData);
    console.log("Novo token criado:", newTokenInfo);
    closeModal();
    openModal("sheet", { tokenId: newTokenInfo.id });
  };

  const calculateHPModalAnchorPoint = (
    tokenScreenRect: DOMRect | null
  ): AppPoint | null => {
    if (!tokenScreenRect) return null;
    const modalXOffset = 5;
    const modalYOffset =
      -(HP_MODAL_ESTIMATED_HEIGHT / 2) + tokenScreenRect.height / 2 - 15;
    return {
      x: tokenScreenRect.right + modalXOffset,
      y: tokenScreenRect.top + modalYOffset,
    };
  };

  const handleClearMultiSelection = useCallback(() => {
    setMultiSelectedInstanceIds([]);
  }, []);

  const handleGridInstanceSelectForHPModal = useCallback(
    (instanceId: string, tokenScreenRect: DOMRect | null) => {
      const anchor = calculateHPModalAnchorPoint(tokenScreenRect);
      openModal("hpControl", { instanceId, anchorPoint: anchor });
      handleClearMultiSelection(); // Clear multi-selection when single selecting
    },
    [openModal, handleClearMultiSelection]
  );

  const handleHPChangeFromModal = useCallback(
    (instanceId: string, newHP: number) => {
      const instance = gridInstances.find(
        (gi: GridInstance) => gi.instanceId === instanceId
      );
      if (instance) {
        const tokenInfo = tokens.find(
          (t: TokenInfo) => t.id === instance.tokenInfoId
        );
        if (tokenInfo) {
          const maxHp = tokenInfo.maxHp ?? newHP;
          const validatedHP = Math.max(0, Math.min(newHP, maxHp));
          updateToken(instance.tokenInfoId, { currentHp: validatedHP });
        }
      }
    },
    [gridInstances, tokens, updateToken]
  );

  const handleRemoveInstanceFromBoard = useCallback(
    (instanceId: string) => {
      removeGridInstance(instanceId);
      if (activeModal === "hpControl" && modalProps.instanceId === instanceId) {
        closeModal();
      }
      setMultiSelectedInstanceIds((prev: string[]) =>
        prev.filter((id: string) => id !== instanceId)
      );
    },
    [removeGridInstance, activeModal, modalProps, closeModal]
  );

  const handleMakeInstanceIndependent = useCallback(
    (instanceId: string) => {
      const newIndependentTokenInfo = makeGridInstanceIndependent(instanceId);
      if (newIndependentTokenInfo) {
        closeModal();
      }
    },
    [makeGridInstanceIndependent, closeModal]
  );

  const handleHPModalAnchorShouldUpdate = useCallback(
    (_instanceId: string, newScreenRect: DOMRect | null) => {
      const newAnchor = calculateHPModalAnchorPoint(newScreenRect);

      if (activeModal === "hpControl") {
        const currentAnchor = modalProps.anchorPoint as AppPoint | null;

        // Só atualiza se o anchor realmente mudou de valor ou de null para valor / valor para null
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
    [activeModal, updateModalProps, modalProps.anchorPoint]
  );

  useEffect(() => {
    const currentHPModalInstanceId =
      activeModal === "hpControl" ? modalProps.instanceId : null;
    const currentSheetId =
      activeModal === "sheet" ? modalProps.tokenId : null;

    // Fechar modal de HP se a instância alvo for removida
    if (
      activeModal === "hpControl" &&
      currentHPModalInstanceId &&
      !gridInstances.find(
        (gi: GridInstance) => gi.instanceId === currentHPModalInstanceId
      )
    ) {
      closeModal();
    }
    // Fechar TokenSheet se o TokenInfo alvo for deletado
    if (
      activeModal === "sheet" &&
      currentSheetId &&
      !tokens.find((t: TokenInfo) => t.id === currentSheetId)
    ) {
      closeModal();
    }
    // Limpar visuais de arrasto se a instância for removida
    if (
      draggingVisuals.instanceId &&
      !gridInstances.find(
        (gi: GridInstance) => gi.instanceId === draggingVisuals.instanceId
      )
    ) {
      setDraggingVisuals({ instanceId: null, visualSVGPoint: null });
    }
    // Limpar seleção pré-arrasto se a instância for removida
    if (
      preDragHPModalInstanceId &&
      !gridInstances.find(
        (gi: GridInstance) => gi.instanceId === preDragHPModalInstanceId
      )
    ) {
      setPreDragHPModalInstanceId(null);
    }
    // Limpar IDs multi-selecionados se algum deles for removido
    setMultiSelectedInstanceIds((prev: string[]) =>
      prev.filter((id: string) =>
        gridInstances.some((gi: GridInstance) => gi.instanceId === id)
      )
    );
  }, [
    tokens,
    gridInstances,
    activeModal,
    closeModal,
    draggingVisuals.instanceId,
    preDragHPModalInstanceId,
    modalProps.instanceId,
    modalProps.tokenId,
  ]);

  useEffect(() => {
    if (activeModal === "hpControl" && modalProps.instanceId) {
      const selectedInstance = gridInstances.find(
        (gi: GridInstance) => gi.instanceId === modalProps.instanceId
      );
      const isInstanceBeingDragged =
        draggingVisuals.instanceId === modalProps.instanceId &&
        draggingVisuals.visualSVGPoint !== null;

      if (
        !isInstanceBeingDragged &&
        (!selectedInstance || activeTool !== Tool.SELECT)
      ) {
        closeModal();
      }
    }
  }, [
    gridInstances,
    activeTool,
    activeModal,
    modalProps,
    draggingVisuals,
    closeModal,
  ]);

  const handleGridInstanceDragStart = useCallback(
    (instanceId: string) => {
      if (activeModal === "hpControl" && modalProps.instanceId === instanceId) {
        setPreDragHPModalInstanceId(instanceId);
        closeModal();
      }
      setDraggingVisuals((prev: DraggingVisuals) => ({ ...prev, instanceId }));
      handleClearMultiSelection(); // Clear multi-selection when dragging a token
    },
    [activeModal, modalProps, closeModal, handleClearMultiSelection]
  );

  const handleGridInstanceDragMove = useCallback(
    (instanceId: string, visualSVGPoint: AppPoint) => {
      setDraggingVisuals((prev: DraggingVisuals) => {
        if (prev.instanceId === instanceId) {
          return { instanceId, visualSVGPoint };
        }
        return prev;
      });
    },
    []
  );

  const handleGridInstanceDragEnd = useCallback(
    (instanceId: string) => {
      const instanceExists = gridInstances.find(
        (gi: GridInstance) => gi.instanceId === instanceId
      );
      if (instanceExists && preDragHPModalInstanceId === instanceId) {
        const domElement = gameBoardRef.current?.querySelector(
          `[data-instance-id="${instanceId}"]`
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
          instanceId,
          anchorPoint: plainRect
            ? calculateHPModalAnchorPoint(plainRect)
            : null,
        });
      }
      setPreDragHPModalInstanceId(null);
      setDraggingVisuals({ instanceId: null, visualSVGPoint: null });
    },
    [preDragHPModalInstanceId, openModal, gridInstances]
  );

  // Handle DELETE key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if a modal input is focused (e.g., TokenSheetModal, SimpleNameModal, HPControlModal input)
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT")
      ) {
        // Specifically allow DELETE if it's the HPControlModal's input for quick HP edits.
        // However, the main purpose here is to delete the token itself.
        // So, if HP modal input is focused, we might skip deletion.
        // For now, let's assume if any input has focus, we don't delete.
        // This can be refined if needed.
        if (!activeEl.closest(".hp-control-modal-input")) {
          // A way to identify hp modal input if needed.
          //return; // Or, more simply, just check if any input/textarea is active
        }
      }
      if (event.key === "Delete") {
        if (multiSelectedInstanceIds.length > 0) {
          multiSelectedInstanceIds.forEach((id: string) =>
            removeGridInstance(id)
          );
          handleClearMultiSelection();
        } else if (activeModal === "hpControl" && modalProps.instanceId) {
          removeGridInstance(modalProps.instanceId);
          closeModal(); // HP modal will close due to other useEffect
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeModal,
    modalProps,
    multiSelectedInstanceIds,
    removeGridInstance,
    handleClearMultiSelection,
    closeModal,
  ]);

  const showButtonStyle =
    "fixed top-1/2 -translate-y-1/2 z-30 p-2 bg-surface-1 hover:bg-border-base rounded-md shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-border-strong";

  const selectedGridInstance =
    activeModal === "hpControl" && modalProps.instanceId
      ? gridInstances.find(
          (gi: GridInstance) => gi.instanceId === modalProps.instanceId
        )
      : null;
  const tokenInfoForHPModal = selectedGridInstance
    ? tokens.find((t: TokenInfo) => t.id === selectedGridInstance.tokenInfoId)
    : null;

  const handleBoardBackgroundClick = () => {
    closeModal(); // Fechar qualquer modal aberto
    handleClearMultiSelection();
  };

  const handleSetMultiSelectedInstanceIds = useCallback(
    (ids: string[]) => {
      setMultiSelectedInstanceIds(ids);
      if (ids.length > 0) {
        closeModal(); // Fechar modal de seleção única de HP se multi-selecionando
      }
    },
    [closeModal]
  );

  return (
    <div
      className="flex h-screen w-screen bg-surface-0 overflow-hidden"
      ref={gameBoardRef}
    >
      {isToolbarVisible ? (
        <Toolbar />
      ) : (
        <button
          onClick={() => setIsToolbarVisible(true)}
          className={`${showButtonStyle} left-2 cursor-pointer hover:bg-accent-primary`}
          aria-label="Mostrar Barra de Ferramentas"
        >
          <ChevronRightIcon className=" w-6 h-6 text-text-primary" />
        </button>
      )}

      <GameBoard
        onGridInstanceSelectForHPModal={handleGridInstanceSelectForHPModal}
        onBackgroundClick={handleBoardBackgroundClick}
        activeHPModalInstanceId={
          activeModal === "hpControl" ? modalProps.instanceId : null
        }
        onHPModalAnchorShouldUpdate={handleHPModalAnchorShouldUpdate}
        draggingVisuals={draggingVisuals}
        onGridInstanceDragStart={handleGridInstanceDragStart}
        onGridInstanceDragMove={handleGridInstanceDragMove}
        onGridInstanceDragEnd={handleGridInstanceDragEnd}
        multiSelectedInstanceIds={multiSelectedInstanceIds}
        onSetMultiSelectedInstanceIds={handleSetMultiSelectedInstanceIds}
        onClearMultiSelection={handleClearMultiSelection}
      />

      {isRightSidebarVisible ? (
        <RightSidebar
        // openTokenCreationModal={openTokenCreationModal} // Removido
        // openTokenSheetModal={openTokenSheetModal} // Removido
        />
      ) : (
        <button
          onClick={() => setIsRightSidebarVisible(true)}
          className={`${showButtonStyle} right-2 cursor-pointer hover:bg-accent-primary`}
          aria-label="Mostrar Barra Lateral Direita"
        >
          <ChevronLeftIcon className="w-6 h-6 text-text-primary" />
        </button>
      )}

      {activeModal === "simpleName" && (
        <SimpleNameModal
          isOpen={true}
          onClose={closeModal}
          onSave={handleSaveNewTokenName}
          title={modalProps.title}
          tokenType={modalProps.type as TokenType} // Corrigido para usar modalProps.type
        />
      )}

      {activeModal === "sheet" && (
        <SheetProvider
          initialTokenData={(() => {
            const foundToken = tokens.find(
              (t: TokenInfo) => t.id === modalProps.tokenId
            );
            return foundToken && foundToken.type === TokenType.PLAYER
              ? (foundToken as PlayerToken)
              : null;
          })()}
          onSave={(updatedData: Partial<TokenInfo>) => {
            if (modalProps.tokenId) {
              updateToken(modalProps.tokenId, updatedData);
              closeModal();
            }
          }}
        >
          <SheetModal tokenId={modalProps.tokenId} onClose={closeModal} />
        </SheetProvider>
      )}

      {activeModal === "hpControl" &&
        modalProps.instanceId &&
        tokenInfoForHPModal &&
        modalProps.anchorPoint && (
          <HPControlModal
            instanceId={modalProps.instanceId}
            tokenInfo={tokenInfoForHPModal}
            anchorPoint={modalProps.anchorPoint}
            isOpen={true}
            onClose={closeModal}
            onHPChange={(newHP) => {
              if (modalProps.instanceId) {
                handleHPChangeFromModal(modalProps.instanceId, newHP);
              }
            }}
            onRemoveFromBoard={handleRemoveInstanceFromBoard}
            onMakeIndependent={handleMakeInstanceIndependent}
          />
        )}

      {activeModal === "confirmationModal" && (
        <ConfirmationModal
          isOpen={true}
          title={modalProps.title}
          content={modalProps.content}
          confirmText={modalProps.confirmText}
          cancelText={modalProps.cancelText}
          onConfirm={modalProps.onConfirm}
          onCancel={modalProps.onCancel}
        />
      )}
    </div>
  );
}
