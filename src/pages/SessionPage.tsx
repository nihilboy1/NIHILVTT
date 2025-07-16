import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../shared/ui/Icons";
import { ToggleSidebarButton } from "../features/toggleSidebar/ui/ToggleSidebarButton";
import { useGameBoardInteraction } from "../widgets/gameBoard/model/hooks/useGameBoardInteraction";
import { GameBoard } from "../widgets/gameBoard/ui/GameBoard";
import { useUIStore } from "../features/layoutControls/model/store";
import { useModalStore } from "../features/modalManager/model/store";
import { ModalManager } from "../widgets/modalManager/ui/ModalManager";
import { RightSidebar } from "@/widgets/rightSidebar/ui/RightSidebar";
import { Toolbar } from "@/widgets/toolBar/ui/Toolbar";

export default function SessionPage() {
  const { closeModal } = useModalStore();

  const gameBoardRef = useRef<HTMLDivElement>(null);
  const {
    isToolbarVisible,
    setIsToolbarVisible,
    isRightSidebarVisible,
    setIsRightSidebarVisible,
  } = useUIStore();

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
  };

  return (
    <div className="flex h-screen">
      {isToolbarVisible && <Toolbar />}
      <GameBoard
        onBackgroundClick={handleBoardBackgroundClick}
        draggingVisuals={draggingVisuals}
        onTokenDragStart={handleTokenDragStart}
        onTokenDragMove={handleTokenDragMove}
        onTokenDragEnd={handleTokenDragEnd}
        multiSelectedTokenIds={multiSelectedTokenIds}
        onSetMultiSelectedTokenIds={handleSetMultiSelectedTokenIds}
        onClearMultiSelection={handleClearMultiSelection}
        onHPChange={handleHPChangeFromModal}
        onRemoveFromBoard={handleRemoveInstanceFromBoard}
        onMakeIndependent={handleMakeInstanceIndependent}
      />
      <ModalManager
        handleHPChangeFromModal={handleHPChangeFromModal}
        handleRemoveInstanceFromBoard={handleRemoveInstanceFromBoard}
        handleMakeInstanceIndependent={handleMakeInstanceIndependent}
      />

      <ToggleSidebarButton
        isVisible={isToolbarVisible}
        onClick={() => setIsToolbarVisible(true)}
        ariaLabel="Mostrar Barra de Ferramentas"
        title="Mostrar Barra de Ferramentas"
        icon={<ChevronRightIcon className="w-6 h-6 text-text-1" />}
        position="left"
      />

      <ToggleSidebarButton
        isVisible={isRightSidebarVisible}
        onClick={() => setIsRightSidebarVisible(true)}
        ariaLabel="Mostrar Barra Lateral Direita"
        title="Mostrar Barra Lateral Direita"
        icon={<ChevronLeftIcon className="w-6 h-6 text-text-1" />}
        position="right"
      />
      {isRightSidebarVisible && <RightSidebar />}
    </div>
  );
}
