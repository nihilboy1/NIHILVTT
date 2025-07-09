import React from "react";
import { useGameBoard } from "../model/contexts/GameBoardContext"; // Apenas useGameBoard
import { BoardTokenLayer } from "./BoardTokenLayer";
import { GridLayer } from "./GridLayer";

import { MarqueeLayer } from "../../../features/boardMarqueeSelection/ui/MarqueeLayer";
import { RulerLayer } from "../../../features/boardRuler/ui/RulerLayer";
import { PageSettingsModal } from "../../../features/boardSettings/ui/PageSettingsModal";
import { GameBoardSideOption } from "./GameBoardSideOption";
import { useUI } from "@/features/layoutControls/model/contexts/UIProvider";

// GameBoardContent não precisa de props, pois tudo vem do contexto
export const GameBoardContent: React.FC = () => {
  const {
    svgRef,
    viewBox,
    zoomLevel,
    handleWheel,
    handleMouseDown,
    handleDragOver,
    handleCharacterDrop,
    multiSelectBoundingBox,
    isPageAndGridSettingsModalOpen,
    setIsPageAndGridSettingsModalOpen,
    // activeHPModalTokenId, // Não é mais necessário aqui, pois o HPModal será renderizado em GameBoardPage
    // onHPModalAnchorShouldUpdate, // Não é mais necessário aqui
    // onHPChange, // Não é mais necessário aqui
    // onRemoveFromBoard, // Não é mais necessário aqui
    // onMakeIndependent, // Não é mais necessário aqui
  } = useGameBoard();

  const { isRightSidebarVisible } = useUI(); // Obter estado de visibilidade da RightSidebar

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
        <BoardTokenLayer />
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
