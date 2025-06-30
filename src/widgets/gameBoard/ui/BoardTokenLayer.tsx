import React from "react";
import { useCharacters } from "../../../entities/character/model/contexts/CharactersContext";
import { BoardToken } from "../../../entities/token/ui/BoardToken";
import { Point } from "../../../shared/api/types"; // Importar Point
import { useGameBoard } from "../model/contexts/GameBoardContext";

export const BoardTokenLayer: React.FC = () => {
  const { updateTokenPosition } = useCharacters();
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
    onSetMultiSelectedTokenIds, // Nova prop
    // Removendo props relacionadas ao HPModal, pois ele será renderizado em outro lugar
    // activeHPModalTokenId,
    // onHPModalAnchorShouldUpdate,
    // onHPChange,
    // onRemoveFromBoard,
    // onMakeIndependent,
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
        return (
          <BoardToken
            key={token.id}
            token={token}
            character={character}
            cellSize={gridSettings.visualCellSize}
            zoomLevel={zoomLevel}
            onMove={(tokenId: string, newPosition: Point) =>
              updateTokenPosition(tokenId, newPosition)
            }
            activeTool={activeTool}
            pageSettings={pageSettings}
            getSVGPoint={getSVGPoint}
            // onTokenSelectForHPModal removido, pois a lógica agora é gerenciada pelo GameBoardContext
            onTokenDragStart={onTokenDragStart}
            onTokenDragMove={onTokenDragMove}
            onTokenDragEnd={onTokenDragEnd}
            isMultiSelected={multiSelectedTokenIds.includes(token.id)}
            onBoardTokenDoubleClick={handleBoardTokenDoubleClick}
            onSetMultiSelectedTokenIds={onSetMultiSelectedTokenIds}
            // As props do HPModal não são mais passadas para BoardToken
            // activeHPModalTokenId={activeHPModalTokenId}
            // onHPModalAnchorShouldUpdate={onHPModalAnchorShouldUpdate}
            // onHPChange={onHPChange}
            // onRemoveFromBoard={onRemoveFromBoard}
            // onMakeIndependent={onMakeIndependent}
          />
        );
      })}
    </>
  );
};
