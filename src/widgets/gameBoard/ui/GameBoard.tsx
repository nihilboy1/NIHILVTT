import React, { useCallback, useEffect, useRef, useState } from "react";
import { GameBoardContent } from "./GameBoardContent";
import { DraggingVisuals, Point, Token } from "../../../shared/api/types";
import { HPModalRenderer } from "./HPModalRenderer";
import { useBoardStore } from "../../../entities/board/model/store";
import { useBoardSettingsStore } from "../../../features/boardSettings/model/store";
import { useUIStore } from "../../../features/layoutControls/model/store";
import { useTokens } from "../../../entities/token/model/contexts/TokenContext";
import { useCharactersStore } from "../../../entities/character/model/store";
import { useModalStore } from "../../../features/modalManager/model/store";
import { useMarqueeSelection } from "../../../features/boardMarqueeSelection/model/hooks/useMarqueeSelection";
import { useRuler } from "../../../features/boardRuler/model/hooks/useRuler";
import { useCharacterDrop } from "../../../features/characterDropOnBoard/model/hooks/useCharacterDrop";
import { useGameBoardEvents } from "../model/hooks/useGameBoardEvents";
import { parseCharacterSize } from "../../../entities/character/lib/utils/characterUtils";
import { type Character } from "@/entities/character/model/schemas/character.schema";


interface GameBoardProps {
  onBackgroundClick?: () => void;
  draggingVisuals: DraggingVisuals;
  onTokenDragStart: (tokenId: string) => void;
  onTokenDragMove: (tokenId: string, visualSVGPoint: Point) => void;
  onTokenDragEnd: (tokenId: string) => void;
  multiSelectedTokenIds: string[];
  onSetMultiSelectedTokenIds: (ids: string[]) => void;
  onClearMultiSelection: () => void;
  onHPChange: (tokenId: string, newHP: number) => void;
  onRemoveFromBoard: (tokenId: string) => void;
  onMakeIndependent: (tokenId: string) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  onBackgroundClick,
  draggingVisuals,
  onTokenDragStart,
  onTokenDragMove,
  onTokenDragEnd,
  multiSelectedTokenIds,
  onSetMultiSelectedTokenIds,
  onClearMultiSelection,
  onHPChange,
  onRemoveFromBoard,
  onMakeIndependent,
}) => {
  const { characters } = useCharactersStore();
  const { tokensOnBoard, addToken, updateTokenPosition } = useTokens();
  const { gridSettings, pageSettings, rulerPlacementMode, rulerPersists } =
    useBoardSettingsStore();
  const { activeTool } = useUIStore();
  const { openModal } = useModalStore();

  const svgRef = useRef<SVGSVGElement>(null);
  const [isPageAndGridSettingsModalOpen, setIsPageAndGridSettingsModalOpen] =
    useState(false);

  // Estado para controlar o HPModal
  const [activeHPModalTokenId, setActiveHPModalTokenId] = useState<
    string | null
  >(null);
  const hpModalAnchorRectRef = useRef<DOMRect | null>(null);

  const onHPModalAnchorShouldUpdate = useCallback(
    (tokenId: string | null, newScreenRect: DOMRect | null) => {
      if (activeHPModalTokenId === tokenId) {
        hpModalAnchorRectRef.current = newScreenRect;
      }
    },
    [activeHPModalTokenId]
  );

  const {
    viewBox,
    zoomLevel,
    isPanning,
    getSVGPoint,
    handleWheel,
    handlePanStart,
    handlePanMove,
    handlePanEnd,
    setSvgRef,
    setGridSettings,
    setPageSettings,
    initializeViewBox,
  } = useBoardStore();

  useEffect(() => {
    setSvgRef(svgRef);
  }, [svgRef, setSvgRef]);

  useEffect(() => {
    setGridSettings(gridSettings);
  }, [gridSettings, setGridSettings]);

  useEffect(() => {
    setPageSettings(pageSettings);
  }, [pageSettings, setPageSettings]);

  useEffect(() => {
    initializeViewBox();
  }, [initializeViewBox]);

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

  const handleSetMultiSelectedTokenIds = useCallback(
    (ids: string[]) => {
      onSetMultiSelectedTokenIds(ids);

      if (ids.length === 1) {
        setActiveHPModalTokenId(ids[0]);
      } else {
        setActiveHPModalTokenId(null);
      }
    },
    [onSetMultiSelectedTokenIds]
  );

  const handleClearMultiSelection = useCallback(() => {
    onClearMultiSelection();
    setActiveHPModalTokenId(null);
  }, [onClearMultiSelection]);

  const {
    marqueeSelection,
    handleMarqueeMouseDown,
    handleMarqueeMouseMove,
    handleMarqueeMouseUp,
  } = useMarqueeSelection({
    activeTool,
    getSVGPoint,
    tokensOnBoard,
    characters,
    gridSettings,
    onSetMultiSelectedTokenIds: handleSetMultiSelectedTokenIds,
    onClearMultiSelection: handleClearMultiSelection,
  });

  const { handleDragOver, handleCharacterDrop } = useCharacterDrop({
    getSVGPoint,
    characters,
    gridSettings,
    pageSettings,
    addToken,
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
    onClearMultiSelection: handleClearMultiSelection,
  });

  const handleBoardTokenDoubleClick = useCallback(
    (tokenId: string, altKey: boolean) => {
      if (altKey) {
        const token = tokensOnBoard.find((t: Token) => t.id === tokenId);
        if (token) {
          openModal("sheet", { characterId: token.characterId });
        } else {
          console.error("Token not found for double-click:", tokenId);
        }
      }
    },
    [openModal, tokensOnBoard]
  );

  const getTokenScreenRect = useCallback(
    (
      token: Token,
      character: Character | undefined,
      liveSVGPoint?: Point
    ): DOMRect | null => {
      if (!svgRef.current || !character) return null;

      const svgGlobalRect = svgRef.current.getBoundingClientRect();
      const [sizeMultiplierX, sizeMultiplierY] = parseCharacterSize(
        character.size
      );

      let tokenWorldX, tokenWorldY;
      if (liveSVGPoint) {
        tokenWorldX = liveSVGPoint.x;
        tokenWorldY = liveSVGPoint.y;
      } else {
        tokenWorldX = token.position.x * gridSettings.visualCellSize;
        tokenWorldY = token.position.y * gridSettings.visualCellSize;
      }

      const tokenWorldWidth = sizeMultiplierX * gridSettings.visualCellSize;
      const tokenWorldHeight = sizeMultiplierY * gridSettings.visualCellSize;

      const screenX =
        (tokenWorldX - viewBox.x) * zoomLevel + svgGlobalRect.left;
      const screenY = (tokenWorldY - viewBox.y) * zoomLevel + svgGlobalRect.top;
      const screenWidth = tokenWorldWidth * zoomLevel;
      const screenHeight = tokenWorldHeight * zoomLevel;

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
    if (activeHPModalTokenId && onHPModalAnchorShouldUpdate) {
      const tokenToUpdate = tokensOnBoard.find(
        (t: Token) => t.id === activeHPModalTokenId
      );
      if (tokenToUpdate) {
        const character = characters.find(
          (c) => c.id === tokenToUpdate.characterId
        );
        let livePointForCalc: Point | undefined = undefined;
        if (
          draggingVisuals.tokenId === activeHPModalTokenId &&
          draggingVisuals.visualSVGPoint
        ) {
          livePointForCalc = draggingVisuals.visualSVGPoint;
        }
        const newScreenRect = getTokenScreenRect(
          tokenToUpdate,
          character,
          livePointForCalc
        );
        onHPModalAnchorShouldUpdate(activeHPModalTokenId, newScreenRect);
      }
    }
  }, [
    viewBox,
    zoomLevel,
    activeHPModalTokenId,
    tokensOnBoard,
    characters,
    draggingVisuals,
    onHPModalAnchorShouldUpdate,
    getTokenScreenRect,
  ]);

  let multiSelectBoundingBox = null;
  if (multiSelectedTokenIds.length > 0) {
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    let hasValidToken = false;

    multiSelectedTokenIds.forEach((tokenId) => {
      const token = tokensOnBoard.find((t: Token) => t.id === tokenId);
      if (token) {
        const character = characters.find(
          (c) => c.id === token.characterId
        );
        if (character) {
          hasValidToken = true;
          const [sizeMultiplierX, sizeMultiplierY] = parseCharacterSize(
            character.size
          );
          const tokenWorldX = token.position.x * gridSettings.visualCellSize;
          const tokenWorldY = token.position.y * gridSettings.visualCellSize;
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
    <>
      <GameBoardContent
        svgRef={svgRef}
        viewBox={viewBox}
        zoomLevel={zoomLevel}
        getSVGPoint={getSVGPoint}
        handleWheel={handleWheel}
        handleDragOver={handleDragOver}
        handleCharacterDrop={handleCharacterDrop}
        handleMouseDown={handleMouseDown}
        handleBoardTokenDoubleClick={handleBoardTokenDoubleClick}
        isPageAndGridSettingsModalOpen={isPageAndGridSettingsModalOpen}
        setIsPageAndGridSettingsModalOpen={setIsPageAndGridSettingsModalOpen}
        multiSelectBoundingBox={multiSelectBoundingBox}
        onTokenDragStart={onTokenDragStart}
        onTokenDragMove={onTokenDragMove}
        onTokenDragEnd={onTokenDragEnd}
        multiSelectedTokenIds={multiSelectedTokenIds}
        onSetMultiSelectedTokenIds={handleSetMultiSelectedTokenIds}
        characters={characters}
        tokensOnBoard={tokensOnBoard}
        gridSettings={gridSettings}
        pageSettings={pageSettings}
        activeTool={activeTool}
        updateTokenPosition={updateTokenPosition}
        marqueeSelection={marqueeSelection}
        rulerPath={rulerPath}
      />
      <HPModalRenderer
        activeHPModalTokenId={activeHPModalTokenId}
        onHPModalAnchorShouldUpdate={onHPModalAnchorShouldUpdate}
        onHPChange={onHPChange}
        onRemoveFromBoard={onRemoveFromBoard}
        onMakeIndependent={onMakeIndependent}
        tokensOnBoard={tokensOnBoard}
        characters={characters}
        getTokenScreenRect={getTokenScreenRect}
        zoomLevel={zoomLevel}
        viewBox={viewBox}
        gridSettings={gridSettings}
      />
    </>
  );
};
