import { useRef } from "react";
import { GameBoard } from "../features/board/GameBoard";
import { useSelectedToken } from "../contexts/SelectedTokenContext";
import { useGameBoardInteraction } from "../hooks/useGameBoardInteraction";
import { GameBoardInteractionProvider } from "../contexts/GameBoardInteractionContext";
import { ModalManager } from "../widgets/ModalManager";
import { useModal } from "../app/providers/ModalProvider";

export function GameBoardPage() {
  const { closeModal } = useModal();
  useSelectedToken(); // Apenas chamar o hook para garantir que o contexto esteja disponível

  const gameBoardRef = useRef<HTMLDivElement>(null);

  const {
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
  } = useGameBoardInteraction({ gameBoardRef });

  const handleBoardBackgroundClick = () => {
    closeModal();
    handleClearMultiSelection();
  };

  return (
    <GameBoardInteractionProvider
      gameBoardRef={gameBoardRef}
      handleHPChangeFromModal={handleHPChangeFromModal}
      handleRemoveInstanceFromBoard={handleRemoveInstanceFromBoard}
      handleMakeInstanceIndependent={handleMakeInstanceIndependent}
    >
      <GameBoard
        onTokenSelectForHPModal={handleTokenSelectForHPModal} // Renomeado
        onBackgroundClick={handleBoardBackgroundClick}
        activeHPModalTokenId={null} // Renomeado
        onHPModalAnchorShouldUpdate={handleHPModalAnchorShouldUpdate}
        draggingVisuals={draggingVisuals}
        onTokenDragStart={handleTokenDragStart} // Renomeado
        onTokenDragMove={handleTokenDragMove} // Renomeado
        onTokenDragEnd={handleTokenDragEnd} // Renomeado
        multiSelectedTokenIds={multiSelectedTokenIds} // Renomeado
        onSetMultiSelectedTokenIds={handleSetMultiSelectedTokenIds} // Renomeado
        onClearMultiSelection={handleClearMultiSelection}
      />
      <ModalManager />
    </GameBoardInteractionProvider>
  );
}
