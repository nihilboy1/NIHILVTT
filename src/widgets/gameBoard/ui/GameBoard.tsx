import React from "react";
import { GameBoardContent } from "./GameBoardContent";
import { DraggingVisuals, Point } from "../../../shared/api/types";
import { HPModalRenderer } from "./HPModalRenderer";
import { GameBoardProvider, useGameBoard } from "../model/contexts/GameBoardContext"; // Importar GameBoardProvider e useGameBoard


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
  onTokenSelectForHPModal?: (
    tokenId: string,
    tokenScreenRect: DOMRect | null
  ) => void; // Adicionado
}

export const GameBoard: React.FC<GameBoardProps> = (props) => {
  // Os hooks useBoardSettings, useUI, useCharacters, useTokens, useModal
  // agora são consumidos dentro do GameBoardProvider, então não são necessários aqui.
  // isPageAndGridSettingsModalOpen e setIsPageAndGridSettingsModalOpen também são gerenciados pelo contexto.

  return (
    <GameBoardProvider
      onTokenSelectForHPModal={props.onTokenSelectForHPModal}
      onBackgroundClick={props.onBackgroundClick}
      draggingVisuals={props.draggingVisuals}
      onTokenDragStart={props.onTokenDragStart}
      onTokenDragMove={props.onTokenDragMove}
      onTokenDragEnd={props.onTokenDragEnd}
      multiSelectedTokenIds={props.multiSelectedTokenIds}
      onSetMultiSelectedTokenIds={props.onSetMultiSelectedTokenIds}
      onClearMultiSelection={props.onClearMultiSelection}
      onHPChange={props.onHPChange}
      onRemoveFromBoard={props.onRemoveFromBoard}
      onMakeIndependent={props.onMakeIndependent}
    >
      <GameBoardOrchestrator />
    </GameBoardProvider>
  );
};

const GameBoardOrchestrator: React.FC = () => { // Remover props aqui
  const { updateTokenPosition } = useGameBoard(); // Apenas o que é usado diretamente aqui

  return (
    <>
      <GameBoardContent updateTokenPosition={updateTokenPosition} />
      <HPModalRenderer />
    </>
  );
};
