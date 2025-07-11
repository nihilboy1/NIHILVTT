import { useRef } from "react";
import { useSelectedToken } from "../entities/token/model/contexts/SelectedTokenContext";
import { ChevronLeftIcon, ChevronRightIcon } from "../shared/ui/Icons";
import { ToggleSidebarButton } from "../features/toggleSidebar/ui/ToggleSidebarButton";
import { GameBoardInteractionProvider } from "../widgets/gameBoard/model/contexts/GameBoardInteractionContext";
import { useGameBoardInteraction } from "../widgets/gameBoard/model/hooks/useGameBoardInteraction";
import { GameBoard } from "../widgets/gameBoard/ui/GameBoard";
import { useUI } from "../features/layoutControls/model/contexts/UIProvider"; // Importar useUI
import { useModal } from "../features/modalManager/model/contexts/ModalProvider";
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
      <ToggleSidebarButton
        isVisible={isToolbarVisible}
        onClick={() => setIsToolbarVisible(true)}
        ariaLabel="Mostrar Barra de Ferramentas"
        title="Mostrar Barra de Ferramentas"
        icon={<ChevronRightIcon className="w-6 h-6 text-text-1" />}
        position="left"
      />

      {/* Botão para mostrar a RightSidebar */}
      <ToggleSidebarButton
        isVisible={isRightSidebarVisible}
        onClick={() => setIsRightSidebarVisible(true)}
        ariaLabel="Mostrar Barra Lateral Direita"
        title="Mostrar Barra Lateral Direita"
        icon={<ChevronLeftIcon className="w-6 h-6 text-text-1" />}
        position="right"
      />
    </GameBoardInteractionProvider>
  );
}
