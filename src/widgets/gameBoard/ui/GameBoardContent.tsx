import React from "react";
import { BoardTokenLayer } from "./BoardTokenLayer";
import { GridLayer } from "./GridLayer";
import { MarqueeLayer } from "../../../features/boardMarqueeSelection/ui/MarqueeLayer";
import { RulerLayer } from "../../../features/boardRuler/ui/RulerLayer";
import { PageSettingsModal } from "../../../features/boardSettings/ui/PageSettingsModal";
import { GameBoardSideOption } from "./GameBoardSideOption";
import { useUI } from "@/features/layoutControls/model/contexts/UIProvider";
import { useGameBoard } from "../model/contexts/GameBoardContext"; // Importar useGameBoard
import { Point } from "@/shared/api/types"; // Importar Point, pois updateTokenPosition a usa

interface GameBoardContentProps {
  updateTokenPosition: (tokenId: string, newPosition: Point) => void;
}

export const GameBoardContent: React.FC<GameBoardContentProps> = ({ updateTokenPosition }) => {
  const { isRightSidebarVisible } = useUI();
  const {
    svgRef,
    viewBox,
    zoomLevel,
    handleWheel,
    handleMouseDown,
    handleDragOver,
    handleCharacterDrop,
    rulerPath,
    marqueeSelection,
    multiSelectBoundingBox,
    isPageAndGridSettingsModalOpen,
    setIsPageAndGridSettingsModalOpen,
  } = useGameBoard(); // Consumir o contexto GameBoard aqui

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
        onDrop={handleCharacterDrop}
      >
        <GridLayer />
        
        <BoardTokenLayer updateTokenPosition={updateTokenPosition} />
        
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

        <MarqueeLayer marqueeSelection={marqueeSelection} />
        <RulerLayer rulerPath={rulerPath} />
      </svg>

      <GameBoardSideOption
        isRightSidebarVisible={isRightSidebarVisible}
        setIsPageAndGridSettingsModalOpen={setIsPageAndGridSettingsModalOpen}
      />

      <PageSettingsModal
        isOpen={isPageAndGridSettingsModalOpen}
        onClose={() => setIsPageAndGridSettingsModalOpen(false)}
      />
    </div>
  );
};
