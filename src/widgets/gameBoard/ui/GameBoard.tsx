import React from "react";
import { GameBoardProvider } from "../model/contexts/GameBoardContext";
import { GameBoardContent } from "./GameBoardContent";
import { DraggingVisuals, Point } from "../../../shared/api/types";
import { HPModalRenderer } from "./HPModalRenderer"; // Importar o novo componente

interface GameBoardProps {
  onBackgroundClick?: () => void;
  draggingVisuals: DraggingVisuals;
  onTokenDragStart: (tokenId: string) => void;
  onTokenDragMove: (tokenId: string, visualSVGPoint: Point) => void;
  onTokenDragEnd: (tokenId: string) => void;
  multiSelectedTokenIds: string[];
  onSetMultiSelectedTokenIds: (ids: string[]) => void;
  onClearMultiSelection: () => void;
  onHPChange: (tokenId: string, newHP: number) => void;
  onRemoveFromBoard: (tokenId: string) => void;
  onMakeIndependent: (tokenId: string) => void;
}

export const GameBoard: React.FC<GameBoardProps> = (props) => {
  return (
    <GameBoardProvider {...props}>
      <GameBoardContent />
      <HPModalRenderer /> {/* Renderizar o HPModalRenderer aqui */}
    </GameBoardProvider>
  );
};
