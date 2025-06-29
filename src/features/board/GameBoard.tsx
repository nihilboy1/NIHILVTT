import React from "react";
import {
  GameBoardProvider,
  useGameBoard,
} from "../../contexts/GameBoardContext";
import { type DraggingVisuals, type Point } from "../../shared/api/types";
import { GameBoardUI } from "./GameBoardUI";
import { GridLayer } from "./GridLayer";
import { MarqueeLayer } from "./MarqueeLayer";
import { RulerLayer } from "./RulerLayer";
import { BoardTokenLayer } from "./BoardTokenLayer"; // Renomeado

interface GameBoardProps {
  onTokenSelectForHPModal?: ( // Renomeado
    tokenId: string, // Renomeado
    tokenScreenRect: DOMRect | null
  ) => void;
  onBackgroundClick?: () => void;
  activeHPModalTokenId: string | null; // Renomeado
  onHPModalAnchorShouldUpdate?: (
    tokenId: string, // Renomeado
    newScreenRect: DOMRect | null
  ) => void;
  draggingVisuals: DraggingVisuals;
  onTokenDragStart: (tokenId: string) => void; // Renomeado
  onTokenDragMove: (tokenId: string, visualSVGPoint: Point) => void; // Renomeado
  onTokenDragEnd: (tokenId: string) => void; // Renomeado
  multiSelectedTokenIds: string[]; // Renomeado
  onSetMultiSelectedTokenIds: (ids: string[]) => void; // Renomeado
  onClearMultiSelection: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = (props) => {
  return (
    <GameBoardProvider {...props}>
      <GameBoardContent />
    </GameBoardProvider>
  );
};

const GameBoardContent: React.FC = () => {
  const {
    svgRef,
    viewBox,
    zoomLevel,
    handleWheel,
    handleMouseDown,
    handleDragOver,
    handleCharacterDrop, // Renomeado
    multiSelectBoundingBox,
  } = useGameBoard();

  return (
    <div className="flex-grow bg-surface-0 relative overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        onContextMenu={(e) => e.preventDefault()}
        onDragOver={handleDragOver}
        onDrop={handleCharacterDrop} // Renomeado
      >
        <GridLayer />
        <BoardTokenLayer /> {/* Renomeado */}
        {multiSelectBoundingBox && (
          <rect
            x={multiSelectBoundingBox.x}
            y={multiSelectBoundingBox.y}
            width={multiSelectBoundingBox.width}
            height={multiSelectBoundingBox.height}
            fill="none"
            stroke="var(--color-accent-primary)"
            strokeWidth={1.5 / zoomLevel}
            strokeOpacity="1.0"
          />
        )}
        <MarqueeLayer />
        <RulerLayer />
      </svg>
      <GameBoardUI />
    </div>
  );
};
