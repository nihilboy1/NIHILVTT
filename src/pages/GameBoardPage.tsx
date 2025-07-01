import { useRef } from "react";
import { useSelectedToken } from "../entities/token/model/contexts/SelectedTokenContext";
import { ChevronLeftIcon, ChevronRightIcon } from "../shared/ui/Icons"; // Importar ícones
import { GameBoardInteractionProvider } from "../widgets/gameBoard/model/contexts/GameBoardInteractionContext";
import { useGameBoardInteraction } from "../widgets/gameBoard/model/hooks/useGameBoardInteraction";
import { GameBoard } from "../widgets/gameBoard/ui/GameBoard";
import { useUI } from "../widgets/layoutControls/model/contexts/UIProvider"; // Importar useUI
import { useModal } from "../widgets/modalManager/model/contexts/ModalProvider";
import { ModalManager } from "../widgets/modalManager/ui/ModalManager";

export function GameBoardPage() {
  const { closeModal } = useModal();
  useSelectedToken(); // Apenas chamar o hook para garantir que o contexto esteja disponível

  const gameBoardRef = useRef<HTMLDivElement>(null);
  const {
    isToolbarVisible,
    setIsToolbarVisible,
    isRightSidebarVisible,
    setIsRightSidebarVisible,
  } = useUI(); // Obter estados e setters de visibilidade

  const {
    draggingVisuals,
    multiSelectedTokenIds,
    handleHPChangeFromModal,
    handleRemoveInstanceFromBoard,
    handleMakeInstanceIndependent,
    handleTokenDragStart,
    handleTokenDragMove,
    handleTokenDragEnd,
    handleSetMultiSelectedTokenIds,
    handleClearMultiSelection,
  } = useGameBoardInteraction({ gameBoardRef });

  const handleBoardBackgroundClick = () => {
    closeModal();
    handleClearMultiSelection();
    // Ao clicar no background, handleClearMultiSelection já desativa o HPModal
  };

  return (
    <GameBoardInteractionProvider
      gameBoardRef={gameBoardRef}
      handleHPChangeFromModal={handleHPChangeFromModal}
      handleRemoveInstanceFromBoard={handleRemoveInstanceFromBoard}
      handleMakeInstanceIndependent={handleMakeInstanceIndependent}
    >
      <GameBoard
        onBackgroundClick={handleBoardBackgroundClick}
        draggingVisuals={draggingVisuals}
        onTokenDragStart={handleTokenDragStart}
        onTokenDragMove={handleTokenDragMove}
        onTokenDragEnd={handleTokenDragEnd}
        multiSelectedTokenIds={multiSelectedTokenIds}
        onSetMultiSelectedTokenIds={handleSetMultiSelectedTokenIds}
        onClearMultiSelection={handleClearMultiSelection}
        onHPChange={handleHPChangeFromModal} // Passar a função do useGameBoardInteraction
        onRemoveFromBoard={handleRemoveInstanceFromBoard} // Passar a função do useGameBoardInteraction
        onMakeIndependent={handleMakeInstanceIndependent} // Passar a função do useGameBoardInteraction
      />
      <ModalManager />

      {/* Botão para mostrar a Toolbar */}
      {!isToolbarVisible && (
        <button
          onClick={() => setIsToolbarVisible(true)}
          className="border border-l-0 border-surface-2 hover:bg-accent-primary-hover  absolute top-1/2 left-0 -translate-y-1/2 bg-surface-1 p-2 rounded-r-md shadow-lg z-10"
          aria-label="Mostrar Barra de Ferramentas"
          title="Mostrar Barra de Ferramentas"
        >
          <ChevronRightIcon className="w-6 h-6 text-text-1" />
        </button>
      )}

      {/* Botão para mostrar a RightSidebar */}
      {!isRightSidebarVisible && (
        <button
          onClick={() => setIsRightSidebarVisible(true)}
          className="border border-r-0 border-surface-2 hover:bg-accent-primary-hover  absolute top-1/2 right-0 -translate-y-1/2 bg-surface-0 p-2 rounded-l-md shadow-lg z-10"
          aria-label="Mostrar Barra Lateral Direita"
          title="Mostrar Barra Lateral Direita"
        >
          <ChevronLeftIcon className="w-6 h-6 text-text-1" />
        </button>
      )}
    </GameBoardInteractionProvider>
  );
}
