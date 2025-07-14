import React from "react";
import { BoardToken } from "../../../entities/token/ui/BoardToken";
import { Point } from "../../../shared/api/types";
import { useGameBoard } from "../model/contexts/GameBoardContext"; // Importar useGameBoard

interface BoardTokenLayerProps {
  updateTokenPosition: (tokenId: string, newPosition: Point) => void;
}

export const BoardTokenLayer: React.FC<BoardTokenLayerProps> = ({ updateTokenPosition }) => {
  const {
    tokensOnBoard,
    characters,
    gridSettings,
    zoomLevel,
    activeTool,
    pageSettings,
    getSVGPoint,
    onTokenDragStart,
    onTokenDragMove,
    onTokenDragEnd,
    multiSelectedTokenIds,
    handleBoardTokenDoubleClick,
    onSetMultiSelectedTokenIds,
  } = useGameBoard();

  return (
    <>
      <filter id="tokenDragShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx={2.5 / zoomLevel}
          dy={3.5 / zoomLevel}
          stdDeviation={2 / zoomLevel}
          floodColor="#000000"
          floodOpacity="0.5"
        />
      </filter>
      
      {tokensOnBoard.map((token) => {
        const character = characters.find((c) => c.id === token.characterId);
        if (!character) return null;

        let inspirationValue = false; 

        if (character.type === 'Player') {
          inspirationValue = character.inspiration ?? false;
        }
        
        const characterForToken = {
          ...character,
          inspiration: inspirationValue,
        };

        return (
          <BoardToken
            key={`${token.id}-${token.characterId}`}
            token={token}
            character={characterForToken}
            cellSize={gridSettings.visualCellSize}
            zoomLevel={zoomLevel}
            onMove={(tokenId: string, newPosition: Point) =>
              updateTokenPosition(tokenId, newPosition)
            }
            activeTool={activeTool}
            pageSettings={pageSettings}
            getSVGPoint={getSVGPoint}
            onTokenDragStart={onTokenDragStart}
            onTokenDragMove={onTokenDragMove}
            onTokenDragEnd={onTokenDragEnd}
            isMultiSelected={multiSelectedTokenIds.includes(token.id)}
            onBoardTokenDoubleClick={handleBoardTokenDoubleClick}
            onSetMultiSelectedTokenIds={onSetMultiSelectedTokenIds}
          />
        );
      })}
    </>
  );
};
