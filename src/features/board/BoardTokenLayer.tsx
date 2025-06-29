import React from "react";
import { BoardToken } from "../../components/token/BoardToken";
import { useGameBoard } from "../../contexts/GameBoardContext";
import { useCharacters } from "../../contexts/CharactersContext";
import { Point } from "../../shared/api/types"; // Importar Point

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
    onTokenSelectForHPModal,
    onTokenDragStart,
    onTokenDragMove,
    onTokenDragEnd,
    multiSelectedTokenIds,
    handleBoardTokenDoubleClick,
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
            onTokenSelectForHPModal={onTokenSelectForHPModal}
            onTokenDragStart={onTokenDragStart}
            onTokenDragMove={onTokenDragMove}
            onTokenDragEnd={onTokenDragEnd}
            isMultiSelected={multiSelectedTokenIds.includes(
              token.id
            )}
            onBoardTokenDoubleClick={handleBoardTokenDoubleClick}
          />
        );
      })}
    </>
  );
};
