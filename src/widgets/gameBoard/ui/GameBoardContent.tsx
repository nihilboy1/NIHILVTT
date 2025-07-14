import React from "react";
import { BoardTokenLayer } from "./BoardTokenLayer";
import { GridLayer } from "./GridLayer";
import { MarqueeLayer } from "../../../features/boardMarqueeSelection/ui/MarqueeLayer";
import { RulerLayer } from "../../../features/boardRuler/ui/RulerLayer";
import { PageSettingsModal } from "../../../features/boardSettings/ui/PageSettingsModal";
import { GameBoardSideOption } from "./GameBoardSideOption";
import { useUI } from "@/features/layoutControls/model/contexts/UIProvider";
import {
  GridSettings,
  MarqueeSelectionState,
  PageSettings,
  Point,
  RulerPathState,
  Token,
  Tool,
} from "@/shared/api/types";
import { type Character } from "@/entities/character/model/schemas/character.schema";

interface GameBoardContentProps {
  svgRef: React.RefObject<SVGSVGElement>;
  viewBox: { x: number; y: number; width: number; height: number };
  zoomLevel: number;
  getSVGPoint: (clientX: number, clientY: number) => Point;
  handleWheel: (event: React.WheelEvent<SVGSVGElement>) => void;
  handleDragOver: (event: React.DragEvent<SVGSVGElement>) => void;
  handleCharacterDrop: (event: React.DragEvent<SVGSVGElement>) => void;
  handleMouseDown: (event: React.MouseEvent<SVGSVGElement>) => void;
  handleBoardTokenDoubleClick: (tokenId: string, altKey: boolean) => void;
  isPageAndGridSettingsModalOpen: boolean;
  setIsPageAndGridSettingsModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  multiSelectBoundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  onTokenDragStart: (tokenId: string) => void;
  onTokenDragMove: (tokenId: string, visualSVGPoint: Point) => void;
  onTokenDragEnd: (tokenId: string) => void;
  multiSelectedTokenIds: string[];
  onSetMultiSelectedTokenIds: (ids: string[]) => void;
  characters: Character[];
  tokensOnBoard: Token[];
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  activeTool: Tool;
  updateTokenPosition: (tokenId: string, newPosition: Point) => void;
  marqueeSelection: MarqueeSelectionState;
  rulerPath: RulerPathState;
}

export const GameBoardContent: React.FC<GameBoardContentProps> = ({
  svgRef,
  viewBox,
  zoomLevel,
  getSVGPoint,
  handleWheel,
  handleDragOver,
  handleCharacterDrop,
  handleMouseDown,
  handleBoardTokenDoubleClick,
  isPageAndGridSettingsModalOpen,
  setIsPageAndGridSettingsModalOpen,
  multiSelectBoundingBox,
  onTokenDragStart,
  onTokenDragMove,
  onTokenDragEnd,
  multiSelectedTokenIds,
  onSetMultiSelectedTokenIds,
  characters,
  tokensOnBoard,
  gridSettings,
  pageSettings,
  activeTool,
  updateTokenPosition,
  marqueeSelection,
  rulerPath,
}) => {
  const { isRightSidebarVisible } = useUI();

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
        <GridLayer
          gridSettings={gridSettings}
          pageSettings={pageSettings}
          zoomLevel={zoomLevel}
        />

        <BoardTokenLayer
          updateTokenPosition={updateTokenPosition}
          tokensOnBoard={tokensOnBoard}
          characters={characters}
          gridSettings={gridSettings}
          zoomLevel={zoomLevel}
          activeTool={activeTool}
          pageSettings={pageSettings}
          getSVGPoint={getSVGPoint}
          onTokenDragStart={onTokenDragStart}
          onTokenDragMove={onTokenDragMove}
          onTokenDragEnd={onTokenDragEnd}
          multiSelectedTokenIds={multiSelectedTokenIds}
          handleBoardTokenDoubleClick={handleBoardTokenDoubleClick}
          onSetMultiSelectedTokenIds={onSetMultiSelectedTokenIds}
        />

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

        <MarqueeLayer marqueeSelection={marqueeSelection} zoomLevel={zoomLevel} />
        <RulerLayer rulerPath={rulerPath} zoomLevel={zoomLevel} gridSettings={gridSettings} />
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
