import { useState, useCallback, useEffect, useRef } from "react";
import { Toolbar } from "./components/layout/Toolbar"; // Atualizado
import { GameBoard } from "./features/board/GameBoard"; // Atualizado
import { RightSidebar } from "./components/layout/RightSidebar"; // Atualizado
import {
  HPControlModal,
  HP_MODAL_ESTIMATED_HEIGHT_REM,
} from "./components/modals/HPControlModal"; // Atualizado
import { SimpleNameModal } from "./components/modals/SimpleNameModal"; // Atualizado
import { SheetModal } from "./components/modals/SheetModal";
import { ConfirmationModal } from "./components/modals/ConfirmationModal";
import { ActionEditModal } from "./components/modals/ActionEditModal";
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
} from "./constants";
import { DEFAULT_TOKEN_IMAGE } from "./constants/sheetDefaults"; // Importar DEFAULT_TOKEN_IMAGE do local correto
import { ChevronLeftIcon, ChevronRightIcon } from "./components/icons";
import { useTokens } from "./contexts/TokensContext";
import { useUI } from "./contexts/UIContext";
import { useModal } from "./contexts/ModalContext";
import { SheetProvider } from "./contexts/SheetContext"; // Importar SheetProvider
import { PlayerSheetProvider } from "./contexts/PlayerSheetContext";

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

  const { modalStack, openModal, closeModal, updateModalProps } =
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

  // Helper para obter o modal ativo e suas props
  const activeModalEntry = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const activeModalName = activeModalEntry?.name;
  const activeModalProps = activeModalEntry?.props;

  useEffect(() => {
    const currentHPModalInstanceId =
      activeModalName === "hpControl" ? activeModalProps?.instanceId : null;
    const currentSheetId =
      activeModalName === "sheet" ? activeModalProps?.tokenId : null;

    // Fechar modal de HP se a instância alvo for removida
    if (
      activeModalName === "hpControl" &&
      currentHPModalInstanceId &&
      !gridInstances.find(
        (gi: GridInstance) => gi.instanceId === currentHPModalInstanceId
      )
    ) {
      closeModal();
    }
    // Fechar TokenSheet se o TokenInfo alvo for deletado
    if (
      activeModalName === "sheet" &&
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
    activeModalName,
    closeModal,
    draggingVisuals.instanceId,
    preDragHPModalInstanceId,
    activeModalProps?.instanceId,
    activeModalProps?.tokenId,
  ]);

  useEffect(() => {
    if (activeModalName === "hpControl" && activeModalProps?.instanceId) {
      const selectedInstance = gridInstances.find(
        (gi: GridInstance) => gi.instanceId === activeModalProps.instanceId
      );
      const isInstanceBeingDragged =
        draggingVisuals.instanceId === activeModalProps.instanceId &&
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
    activeModalName,
    activeModalProps,
    draggingVisuals,
    closeModal,
  ]);

  const handleSaveNewTokenName = (
    name: string,
    tokenTypeFromModal?: TokenType
  ) => {
    // Usar o tokenType vindo diretamente do modal, que é mais confiável
    const typeToUse = tokenTypeFromModal || activeModalProps?.tokenType; // Mantendo o fallback para activeModalProps?.tokenType por segurança, embora activeModalProps?.type seja o correto agora.

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
    closeModal();
    openModal("sheet", { tokenId: newTokenInfo.id });
  };

  const calculateHPModalAnchorPoint = (
    tokenScreenRect: DOMRect | null
  ): AppPoint | null => {
    if (!tokenScreenRect) return null;
    const modalXOffset = 5;
    const modalYOffset =
      -(HP_MODAL_ESTIMATED_HEIGHT_REM * 16 / 2) + tokenScreenRect.height / 2 - 15; // Convertendo rem para px (1rem = 16px)
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
      // Verificar se um modal de HP para este token já está aberto
      const isHpControlAlreadyOpenForToken = modalStack.some(
        (modal) =>
          modal.name === 'hpControl' &&
          modal.props.instanceId === instanceId
      );

      if (isHpControlAlreadyOpenForToken) {
        return; // Não faz nada se o modal já estiver aberto
      }

      const anchor = calculateHPModalAnchorPoint(tokenScreenRect);
      openModal("hpControl", { instanceId, anchorPoint: anchor });
      handleClearMultiSelection(); // Clear multi-selection when single selecting
    },
    [openModal, handleClearMultiSelection, modalStack] // Adicionar modalStack às dependências
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
      if (activeModalName === "hpControl" && activeModalProps?.instanceId === instanceId) {
        closeModal();
      }
      setMultiSelectedInstanceIds((prev: string[]) =>
        prev.filter((id: string) => id !== instanceId)
      );
    },
    [removeGridInstance, activeModalName, activeModalProps, closeModal]
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

      if (activeModalName === "hpControl") {
        const currentAnchor = activeModalProps?.anchorPoint as AppPoint | null;

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
    [activeModalName, updateModalProps, activeModalProps?.anchorPoint]
  );

  useEffect(() => {
    const currentHPModalInstanceId =
      activeModalName === "hpControl" ? activeModalProps?.instanceId : null;
    const currentSheetId =
      activeModalName === "sheet" ? activeModalProps?.tokenId : null;

    // Fechar modal de HP se a instância alvo for removida
    if (
      activeModalName === "hpControl" &&
      currentHPModalInstanceId &&
      !gridInstances.find(
        (gi: GridInstance) => gi.instanceId === currentHPModalInstanceId
      )
    ) {
      closeModal();
    }
    // Fechar TokenSheet se o TokenInfo alvo for deletado
    if (
      activeModalName === "sheet" &&
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
    activeModalName,
    closeModal,
    draggingVisuals.instanceId,
    preDragHPModalInstanceId,
    activeModalProps?.instanceId,
    activeModalProps?.tokenId,
  ]);

  useEffect(() => {
    if (activeModalName === "hpControl" && activeModalProps?.instanceId) {
      const selectedInstance = gridInstances.find(
        (gi: GridInstance) => gi.instanceId === activeModalProps.instanceId
      );
      const isInstanceBeingDragged =
        draggingVisuals.instanceId === activeModalProps.instanceId &&
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
    activeModalName,
    activeModalProps,
    draggingVisuals,
    closeModal,
  ]);

  const handleGridInstanceDragStart = useCallback(
    (instanceId: string) => {
      if (activeModalName === "hpControl" && activeModalProps?.instanceId === instanceId) {
        setPreDragHPModalInstanceId(instanceId);
        closeModal();
      }
      setDraggingVisuals((prev: DraggingVisuals) => ({ ...prev, instanceId }));
      handleClearMultiSelection(); // Clear multi-selection when dragging a token
    },
    [activeModalName, activeModalProps, closeModal, handleClearMultiSelection]
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
        } else if (activeModalName === "hpControl" && activeModalProps?.instanceId) {
          removeGridInstance(activeModalProps.instanceId);
          closeModal(); // HP modal will close due to other useEffect
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
    multiSelectedInstanceIds,
    removeGridInstance,
    handleClearMultiSelection,
    closeModal,
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

  const showButtonStyle =
    "fixed top-1/2 -translate-y-1/2 z-30 p-2 bg-surface-1 hover:bg-border-base rounded-md shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-border-strong";

 
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
      className="flex h-screen w-screen bg-surface-0 overflow-hidden relative" // Adicionado 'relative' para ser o offsetParent
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
          activeModalName === "hpControl" ? activeModalProps?.instanceId : null
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

      {modalStack.map((modalEntry, index) => {
        const { name, props } = modalEntry;
        const isTopModal = index === modalStack.length - 1;

        switch (name) {
          case "simpleName":
            return (
              <SimpleNameModal
                key={modalEntry.id} // Usar o ID único
                isOpen={isTopModal}
                onClose={closeModal}
                onSave={handleSaveNewTokenName}
                title={props.title}
                tokenType={props.type as TokenType}
                zIndex={100 + index}
                containerRef={gameBoardRef as React.RefObject<HTMLDivElement>}
              />
            );
          case "sheet":
            const foundToken = tokens.find(
              (t: TokenInfo) => t.id === props.tokenId
            );
            const initialTokenData =
              foundToken && foundToken.type === TokenType.PLAYER
                ? (foundToken as PlayerToken)
                : null;

            return (
              <SheetProvider
                key={props.tokenId} // Usar tokenId como chave para forçar a remontagem
                initialTokenData={initialTokenData}
                onSave={(updatedData: Partial<TokenInfo>) => {
                  if (props.tokenId) {
                    updateToken(props.tokenId, updatedData);
                    closeModal();
                  }
                }}
              >
                <SheetModal
                  tokenId={props.tokenId}
                  isOpen={true}
                  onClose={closeModal}
                  zIndex={100 + index} // Ficha com zIndex base
                  containerRef={gameBoardRef as React.RefObject<HTMLDivElement>}
                />
              </SheetProvider>
            );
          case "actionEdit":
            // ActionEditModal será renderizado dentro de PlayerSheetContent
            return null;
          case "hpControl":
            const selectedGridInstanceForHP = gridInstances.find(
              (gi: GridInstance) => gi.instanceId === props.instanceId
            );
            const tokenInfoForHPModal = selectedGridInstanceForHP
              ? tokens.find(
                  (t: TokenInfo) => t.id === selectedGridInstanceForHP.tokenInfoId
                )
              : null;

            return (
              props.instanceId &&
              tokenInfoForHPModal &&
              props.anchorPoint && (
                <HPControlModal
                  key={modalEntry.id} // Usar o ID único
                  instanceId={props.instanceId}
                  tokenInfo={tokenInfoForHPModal}
                  anchorPoint={props.anchorPoint}
                  isOpen={isTopModal}
                  onClose={closeModal}
                  onHPChange={(newHP) => {
                    if (props.instanceId) {
                      handleHPChangeFromModal(props.instanceId, newHP);
                    }
                  }}
                  onRemoveFromBoard={handleRemoveInstanceFromBoard}
                  onMakeIndependent={handleMakeInstanceIndependent}
                  zIndex={100 + index} // HPControlModal pode ficar com zIndex base ou ajustado se necessário
                  containerRef={gameBoardRef as React.RefObject<HTMLDivElement>}
                />
              )
            );
          case "confirmationModal":
            return (
              <ConfirmationModal
                key={modalEntry.id} // Usar o ID único
                isOpen={true} // Manter o modal de confirmação visível
                title={props.title}
                content={props.content}
                confirmText={props.confirmText}
                cancelText={props.cancelText}
                onConfirm={props.onConfirm}
                onCancel={props.onCancel}
                zIndex={200 + index} // ConfirmationModal acima de todos
                containerRef={gameBoardRef as React.RefObject<HTMLDivElement>}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
