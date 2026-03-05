import React from "react";

import { type Character } from "@/entities/character/model/schemas/character.schema";
import { parseCharacterSize } from "@/entities/character/lib/utils/characterUtils";
import { useUIStore } from "@/features/layoutControls/model/store";
import aimCursorUrl from "@/shared/assets/aim.png";
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
  activeCombatTurnTokenId: string | null;
  activeCombatNextTurnTokenId: string | null;
  combatParticipantTokenIds: string[];
  activeCombatTurnCanMove: boolean;
  controllableTokenIds: string[];
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
  activeCombatTurnTokenId,
  activeCombatNextTurnTokenId,
  combatParticipantTokenIds,
  activeCombatTurnCanMove,
  controllableTokenIds,
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
  const pendingAttackAreaCells =
    pendingAttackToken && pendingAttack && gridSettings.metersPerSquare > 0
      ? (() => {
          const attackerCharacter = characters.find(
            (character) => character.id === pendingAttackToken.characterId,
          );
          const [attackerWidth, attackerHeight] = attackerCharacter
            ? parseCharacterSize(attackerCharacter.size)
            : [1, 1];

          const rangeSquares = Math.floor(
            (pendingAttack.attack.rangeMeters + Number.EPSILON) / gridSettings.metersPerSquare,
          );
          if (rangeSquares <= 0) {
            return [] as Point[];
          }

          const attackerMinX = pendingAttackToken.position.x;
          const attackerMinY = pendingAttackToken.position.y;
          const attackerMaxX = attackerMinX + attackerWidth - 1;
          const attackerMaxY = attackerMinY + attackerHeight - 1;
          const cells: Point[] = [];

          for (let y = attackerMinY - rangeSquares; y <= attackerMaxY + rangeSquares; y += 1) {
            for (let x = attackerMinX - rangeSquares; x <= attackerMaxX + rangeSquares; x += 1) {
              if (
                x < 0 ||
                y < 0 ||
                x >= pageSettings.widthInUnits ||
                y >= pageSettings.heightInUnits
              ) {
                continue;
              }

              const distanceX =
                x < attackerMinX ? attackerMinX - x : x > attackerMaxX ? x - attackerMaxX : 0;
              const distanceY =
                y < attackerMinY ? attackerMinY - y : y > attackerMaxY ? y - attackerMaxY : 0;
              const isAttackerCell = distanceX === 0 && distanceY === 0;
              const chebyshevDistance = Math.max(distanceX, distanceY);

              if (!isAttackerCell && chebyshevDistance <= rangeSquares) {
                cells.push({ x, y });
              }
            }
          }

          return cells;
        })()
      : [];

  return (
    <div className="flex-grow bg-surface-0 relative overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{
          cursor: pendingAttack ? `url(${aimCursorUrl}) 32 32, crosshair` : "default",
        }}
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
          activeCombatTurnTokenId={activeCombatTurnTokenId}
          activeCombatNextTurnTokenId={activeCombatNextTurnTokenId}
          combatParticipantTokenIds={combatParticipantTokenIds}
          activeCombatTurnCanMove={activeCombatTurnCanMove}
          controllableTokenIds={controllableTokenIds}
          pendingAttack={pendingAttack}
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

        {pendingAttackAreaCells.map((cell) => (
          <rect
            key={`pending-attack-cell-${cell.x}-${cell.y}`}
            x={cell.x * gridSettings.visualCellSize}
            y={cell.y * gridSettings.visualCellSize}
            width={gridSettings.visualCellSize}
            height={gridSettings.visualCellSize}
            pointerEvents="none"
            fill="var(--color-accent-primary)"
            fillOpacity="0.10"
            stroke="var(--color-accent-primary)"
            strokeWidth={1 / zoomLevel}
            strokeOpacity="0.55"
            strokeDasharray={`${4 / zoomLevel} ${3 / zoomLevel}`}
          />
        ))}

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
