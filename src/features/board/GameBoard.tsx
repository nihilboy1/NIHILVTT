import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  type DraggingVisuals,
  type GridInstance,
  type Point,
  type Token as TokenInfo,
} from "../../shared/types";
import { useTokens } from "../../contexts/TokensContext";
import { useBoardSettings } from "../../contexts/BoardSettingsContext";
import { useUI } from "../../contexts/UIContext";
import { useModal } from "../../contexts/ModalContext";
import { useZoomAndPan } from "../../hooks/useZoomAndPan";
import { useRuler } from "../../hooks/useRuler";
import { useMarqueeSelection } from "../../hooks/useMarqueeSelection";
import { useTokenDrop } from "../../hooks/useTokenDrop";
import { useGameBoardEvents } from "../../hooks/useGameBoardEvents";
import { GridLayer } from "./GridLayer";
import { TokenLayer } from "./TokenLayer";
import { RulerLayer } from "./RulerLayer";
import { MarqueeLayer } from "./MarqueeLayer";
import { GameBoardUI } from "./GameBoardUI";
import { parseTokenSize } from "../../utils/board/boardUtils";

interface GameBoardProps {
  onGridInstanceSelectForHPModal?: (
    instanceId: string,
    tokenScreenRect: DOMRect | null
  ) => void;
  onBackgroundClick?: () => void;
  activeHPModalInstanceId: string | null;
  onHPModalAnchorShouldUpdate?: (
    instanceId: string,
    newScreenRect: DOMRect | null
  ) => void;
  draggingVisuals: DraggingVisuals;
  onGridInstanceDragStart: (instanceId: string) => void;
  onGridInstanceDragMove: (instanceId: string, visualSVGPoint: Point) => void;
  onGridInstanceDragEnd: (instanceId: string) => void;
  multiSelectedInstanceIds: string[];
  onSetMultiSelectedInstanceIds: (ids: string[]) => void;
  onClearMultiSelection: () => void;
  selectedInstanceId: string | null;
  setSelectedInstanceId: (instanceId: string | null) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  onGridInstanceSelectForHPModal,
  onBackgroundClick,
  activeHPModalInstanceId,
  onHPModalAnchorShouldUpdate,
  draggingVisuals,
  onGridInstanceDragStart,
  onGridInstanceDragMove,
  onGridInstanceDragEnd,
  multiSelectedInstanceIds,
  onSetMultiSelectedInstanceIds,
  onClearMultiSelection,
  selectedInstanceId,
  setSelectedInstanceId,
}) => {
  const { tokens, gridInstances, addGridInstance } = useTokens();
  const { gridSettings, pageSettings, rulerPlacementMode, rulerPersists } =
    useBoardSettings();
  const { activeTool } = useUI();
  const { openModal } = useModal();

  const svgRef = useRef<SVGSVGElement>(null);
  const [isPageAndGridSettingsModalOpen, setIsPageAndGridSettingsModalOpen] =
    useState(false);

  const {
    viewBox,
    zoomLevel,
    isPanning,
    getSVGPoint,
    handleWheel,
    handlePanStart,
    handlePanMove,
    handlePanEnd,
    handleZoomIn,
    handleZoomOut,
  } = useZoomAndPan({ svgRef, pageSettings, gridSettings });

  const {
    rulerPath,
    handleRulerMouseDown,
    handleRulerMouseMove,
    handleRulerMouseUp,
    handleRulerRightClick,
  } = useRuler({
    activeTool,
    rulerPlacementMode,
    rulerPersists,
    gridSettings,
    getSVGPoint,
  });

  const {
    marqueeSelection,
    handleMarqueeMouseDown,
    handleMarqueeMouseMove,
    handleMarqueeMouseUp,
  } = useMarqueeSelection({
    activeTool,
    getSVGPoint,
    gridInstances,
    tokens,
    gridSettings,
    onSetMultiSelectedInstanceIds,
    onClearMultiSelection,
  });

  const { handleDragOver, handleTokenDrop } = useTokenDrop({
    getSVGPoint,
    tokens,
    gridSettings,
    pageSettings,
    addGridInstance,
  });

  const { handleMouseDown } = useGameBoardEvents({
    svgRef,
    activeTool,
    isPanning,
    handlePanStart,
    handlePanMove,
    handlePanEnd,
    handleRulerMouseDown,
    handleRulerMouseMove,
    handleRulerMouseUp,
    handleRulerRightClick,
    handleMarqueeMouseDown,
    handleMarqueeMouseMove,
    handleMarqueeMouseUp,
    onBackgroundClick,
    onClearMultiSelection,
    activeHPModalInstanceId,
  });

  const handleTokenDoubleClick = useCallback(
    (instanceId: string, altKey: boolean) => {
      if (altKey) {
        const instance = gridInstances.find(
          (gi) => gi.instanceId === instanceId
        );
        if (instance) {
          openModal("sheet", { tokenId: instance.tokenInfoId });
        } else {
          console.error("Instance not found for double-click:", instanceId);
        }
      }
    },
    [openModal, gridInstances]
  );

  const getInstanceScreenRect = useCallback(
    (
      instance: GridInstance,
      tokenInfo: TokenInfo | undefined,
      liveSVGPoint?: Point
    ): DOMRect | null => {
      if (!svgRef.current || !tokenInfo) return null;

      const svgGlobalRect = svgRef.current.getBoundingClientRect();
      const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(tokenInfo.size);

      let instanceWorldX, instanceWorldY;
      if (liveSVGPoint) {
        instanceWorldX = liveSVGPoint.x;
        instanceWorldY = liveSVGPoint.y;
      } else {
        instanceWorldX = instance.gridX * gridSettings.visualCellSize;
        instanceWorldY = instance.gridY * gridSettings.visualCellSize;
      }

      const instanceWorldWidth = sizeMultiplierX * gridSettings.visualCellSize;
      const instanceWorldHeight = sizeMultiplierY * gridSettings.visualCellSize;

      const screenX =
        (instanceWorldX - viewBox.x) * zoomLevel + svgGlobalRect.left;
      const screenY =
        (instanceWorldY - viewBox.y) * zoomLevel + svgGlobalRect.top;
      const screenWidth = instanceWorldWidth * zoomLevel;
      const screenHeight = instanceWorldHeight * zoomLevel;

      return {
        x: screenX,
        y: screenY,
        width: screenWidth,
        height: screenHeight,
        top: screenY,
        right: screenX + screenWidth,
        bottom: screenY + screenHeight,
        left: screenX,
        toJSON: () => ({}),
      } as DOMRect;
    },
    [viewBox, zoomLevel, gridSettings.visualCellSize, svgRef]
  );

  useEffect(() => {
    if (activeHPModalInstanceId && onHPModalAnchorShouldUpdate) {
      const instanceToUpdate = gridInstances.find(
        (gi: GridInstance) => gi.instanceId === activeHPModalInstanceId
      );
      if (instanceToUpdate) {
        const tokenInfo = tokens.find(
          (t: TokenInfo) => t.id === instanceToUpdate.tokenInfoId
        );
        let livePointForCalc: Point | undefined = undefined;
        if (
          draggingVisuals.instanceId === activeHPModalInstanceId &&
          draggingVisuals.visualSVGPoint
        ) {
          livePointForCalc = draggingVisuals.visualSVGPoint;
        }
        const newScreenRect = getInstanceScreenRect(
          instanceToUpdate,
          tokenInfo,
          livePointForCalc
        );
        onHPModalAnchorShouldUpdate(activeHPModalInstanceId, newScreenRect);
      }
    }
  }, [
    viewBox,
    zoomLevel,
    activeHPModalInstanceId,
    gridInstances,
    tokens,
    draggingVisuals,
    onHPModalAnchorShouldUpdate,
    getInstanceScreenRect,
  ]);

  let multiSelectBoundingBox = null;
  if (multiSelectedInstanceIds.length > 0) {
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    let hasValidToken = false;

    multiSelectedInstanceIds.forEach((instanceId) => {
      const instance = gridInstances.find((gi) => gi.instanceId === instanceId);
      if (instance) {
        const tokenInfo = tokens.find((ti) => ti.id === instance.tokenInfoId);
        if (tokenInfo) {
          hasValidToken = true;
          const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(
            tokenInfo.size
          );
          const tokenWorldX = instance.gridX * gridSettings.visualCellSize;
          const tokenWorldY = instance.gridY * gridSettings.visualCellSize;
          const tokenWorldWidth = sizeMultiplierX * gridSettings.visualCellSize;
          const tokenWorldHeight =
            sizeMultiplierY * gridSettings.visualCellSize;

          minX = Math.min(minX, tokenWorldX);
          minY = Math.min(minY, tokenWorldY);
          maxX = Math.max(maxX, tokenWorldX + tokenWorldWidth);
          maxY = Math.max(maxY, tokenWorldY + tokenWorldHeight);
        }
      }
    });

    if (hasValidToken) {
      multiSelectBoundingBox = {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }
  }

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
        onDrop={handleTokenDrop}
      >
        <GridLayer
          gridSettings={gridSettings}
          pageSettings={pageSettings}
          zoomLevel={zoomLevel}
        />
        <TokenLayer
          gridInstances={gridInstances}
          tokens={tokens}
          gridSettings={gridSettings}
          zoomLevel={zoomLevel}
          activeTool={activeTool}
          pageSettings={pageSettings}
          getSVGPoint={getSVGPoint}
          onGridInstanceSelectForHPModal={onGridInstanceSelectForHPModal}
          onGridInstanceDragStart={onGridInstanceDragStart}
          onGridInstanceDragMove={onGridInstanceDragMove}
          onGridInstanceDragEnd={onGridInstanceDragEnd}
          multiSelectedInstanceIds={multiSelectedInstanceIds}
          onTokenDoubleClick={handleTokenDoubleClick}
          selectedInstanceId={selectedInstanceId}
          setSelectedInstanceId={setSelectedInstanceId}
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
        <MarqueeLayer
          marqueeSelection={marqueeSelection}
          zoomLevel={zoomLevel}
        />
        <RulerLayer
          rulerPath={rulerPath}
          zoomLevel={zoomLevel}
          gridSettings={gridSettings}
        />
      </svg>
      <GameBoardUI
        zoomLevel={zoomLevel}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        isPageAndGridSettingsModalOpen={isPageAndGridSettingsModalOpen}
        setIsPageAndGridSettingsModalOpen={setIsPageAndGridSettingsModalOpen}
      />
    </div>
  );
};
