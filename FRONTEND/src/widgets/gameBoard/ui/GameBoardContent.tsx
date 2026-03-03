import React from "react";

import { type Character } from "@/entities/character/model/schemas/character.schema";
import { useUIStore } from "@/features/layoutControls/model/store";
import {
  GridSettings,
  MarqueeSelectionState,
  PageSettings,
  PendingAttackSelection,
  Point,
  RulerPathState,
  Token,
  Tool,
} from "@/shared/api/types";

import { MarqueeLayer } from "../../../features/boardMarqueeSelection/ui/MarqueeLayer";
import { RulerLayer } from "../../../features/boardRuler/ui/RulerLayer";
import { PageSettingsModal } from "../../../features/boardSettings/ui/PageSettingsModal";

import { BoardTokenLayer } from "./BoardTokenLayer";
import { GameBoardSideOption } from "./GameBoardSideOption";
import { GridLayer } from "./GridLayer";


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
  canManageBoardSettings: boolean;
  multiSelectBoundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  copiedTokenId: string | null;
  pasteTargetCell: Point | null;
  pendingAttack: PendingAttackSelection | null;
  onTokenDragStart: (tokenId: string) => void;
  onTokenDragMove: (tokenId: string, visualSVGPoint: Point) => void;
  onTokenDragEnd: (tokenId: string) => void;
  multiSelectedTokenIds: string[];
  onSetMultiSelectedTokenIds: (ids: string[]) => void;
  onBoardPointerMove: (svgPoint: Point) => void;
  onBoardPointerLeave: () => void;
  characters: Character[];
  tokensOnBoard: Token[];
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  activeTool: Tool;
  updateTokenPosition: (tokenId: string, newPosition: Point) => void;
  marqueeSelection: MarqueeSelectionState;
  rulerPath: RulerPathState;
}

export function GameBoardContent({
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
  canManageBoardSettings,
  multiSelectBoundingBox,
  copiedTokenId,
  pasteTargetCell,
  pendingAttack,
  onTokenDragStart,
  onTokenDragMove,
  onTokenDragEnd,
  multiSelectedTokenIds,
  onSetMultiSelectedTokenIds,
  onBoardPointerMove,
  onBoardPointerLeave,
  characters,
  tokensOnBoard,
  gridSettings,
  pageSettings,
  activeTool,
  updateTokenPosition,
  marqueeSelection,
  rulerPath,
}:GameBoardContentProps) {
  const { isRightSidebarVisible } = useUIStore();

  const handleBoardMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const worldPoint = getSVGPoint(event.clientX, event.clientY);
    const cellSize = gridSettings.visualCellSize;
    const snappedCell = {
      x: Math.max(0, Math.min(Math.floor(worldPoint.x / cellSize), pageSettings.widthInUnits - 1)),
      y: Math.max(0, Math.min(Math.floor(worldPoint.y / cellSize), pageSettings.heightInUnits - 1)),
    };

    onBoardPointerMove(snappedCell);
  };

  const pendingAttackToken = pendingAttack
    ? tokensOnBoard.find((token) => token.id === pendingAttack.attackerTokenId) ?? null
    : null;
  const pendingAttackRadius =
    pendingAttackToken && gridSettings.metersPerSquare > 0
      ? ((pendingAttack?.attack.rangeMeters ?? 0) / gridSettings.metersPerSquare) *
        gridSettings.visualCellSize
      : null;
  const pendingAttackCenter = pendingAttackToken
    ? {
        x: (pendingAttackToken.position.x + 0.5) * gridSettings.visualCellSize,
        y: (pendingAttackToken.position.y + 0.5) * gridSettings.visualCellSize,
      }
    : null;

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
        onMouseMove={handleBoardMouseMove}
        onMouseLeave={() => onBoardPointerLeave()}
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
          copiedTokenId={copiedTokenId}
          onTokenDragMove={onTokenDragMove}
          onTokenDragEnd={onTokenDragEnd}
          multiSelectedTokenIds={multiSelectedTokenIds}
          handleBoardTokenDoubleClick={handleBoardTokenDoubleClick}
          onSetMultiSelectedTokenIds={onSetMultiSelectedTokenIds}
        />

        {pasteTargetCell && copiedTokenId && (
          <rect
            x={pasteTargetCell.x * gridSettings.visualCellSize}
            y={pasteTargetCell.y * gridSettings.visualCellSize}
            width={gridSettings.visualCellSize}
            height={gridSettings.visualCellSize}
            fill="var(--color-accent-primary)"
            fillOpacity="0.12"
            stroke="var(--color-accent-primary)"
            strokeWidth={1.5 / zoomLevel}
            strokeDasharray={`${6 / zoomLevel} ${4 / zoomLevel}`}
          />
        )}

        {pendingAttackCenter && pendingAttackRadius != null && (
          <circle
            cx={pendingAttackCenter.x}
            cy={pendingAttackCenter.y}
            r={pendingAttackRadius}
            fill="var(--color-accent-primary)"
            fillOpacity="0.08"
            stroke="var(--color-accent-primary)"
            strokeWidth={1.5 / zoomLevel}
            strokeOpacity="0.55"
            strokeDasharray={`${8 / zoomLevel} ${6 / zoomLevel}`}
          />
        )}

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
        canManageBoardSettings={canManageBoardSettings}
      />

      {canManageBoardSettings ? (
        <PageSettingsModal
          isOpen={isPageAndGridSettingsModalOpen}
          onClose={() => setIsPageAndGridSettingsModalOpen(false)}
        />
      ) : null}
    </div>
  );
};
