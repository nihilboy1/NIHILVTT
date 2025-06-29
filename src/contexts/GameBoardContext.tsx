import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useGameBoardEvents } from "../hooks/useGameBoardEvents";
import { useMarqueeSelection } from "../hooks/useMarqueeSelection";
import { useRuler } from "../hooks/useRuler";
import { useCharacterDrop } from "../hooks/useCharacterDrop";
import { useZoomAndPan } from "../hooks/useZoomAndPan";
import {
  type DraggingVisuals,
  type Token,
  type GridSettings,
  type MarqueeSelectionState,
  type PageSettings,
  type Point,
  type RulerPathState,
  type Character,
  type Tool,
} from "../shared/api/types";
import { parseCharacterSize } from "../shared/lib/utils/characterUtils";
import { useBoardSettings } from "./BoardSettingsContext";
import { useCharacters } from "./CharactersContext";
import { useUI } from "../app/providers/UIProvider";
import { useModal } from "../app/providers/ModalProvider";

interface GameBoardProviderProps {
  children: ReactNode;
  onTokenSelectForHPModal?: (
    tokenId: string,
    tokenScreenRect: DOMRect | null
  ) => void;
  onBackgroundClick?: () => void;
  activeHPModalTokenId: string | null;
  onHPModalAnchorShouldUpdate?: (
    tokenId: string,
    newScreenRect: DOMRect | null
  ) => void;
  draggingVisuals: DraggingVisuals;
  onTokenDragStart: (tokenId: string) => void;
  onTokenDragMove: (tokenId: string, visualSVGPoint: Point) => void;
  onTokenDragEnd: (tokenId: string) => void;
  multiSelectedTokenIds: string[];
  onSetMultiSelectedTokenIds: (ids: string[]) => void;
  onClearMultiSelection: () => void;
}

interface GameBoardContextType {
  svgRef: React.RefObject<SVGSVGElement>;
  viewBox: { x: number; y: number; width: number; height: number };
  zoomLevel: number;
  isPanning: boolean;
  getSVGPoint: (clientX: number, clientY: number) => Point;
  handleWheel: (event: React.WheelEvent<SVGSVGElement>) => void;
  handlePanStart: (point: Point) => void;
  handlePanMove: (event: MouseEvent) => void;
  handlePanEnd: (event: React.MouseEvent<SVGSVGElement>) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  rulerPath: RulerPathState;
  handleRulerMouseDown: (event: React.MouseEvent<SVGSVGElement>) => void;
  handleRulerMouseMove: (event: MouseEvent) => void;
  handleRulerMouseUp: (event: MouseEvent) => void;
  handleRulerRightClick: (event: React.MouseEvent<SVGSVGElement>) => void;
  marqueeSelection: MarqueeSelectionState;
  handleMarqueeMouseDown: (event: React.MouseEvent<SVGSVGElement>) => void;
  handleMarqueeMouseMove: (event: MouseEvent) => void;
  handleMarqueeMouseUp: () => void;
  handleDragOver: (event: React.DragEvent<SVGSVGElement>) => void;
  handleCharacterDrop: (event: React.DragEvent<SVGSVGElement>) => void;
  handleMouseDown: (event: React.MouseEvent<SVGSVGElement>) => void;
  handleBoardTokenDoubleClick: (tokenId: string, altKey: boolean) => void;
  getTokenScreenRect: (
    token: Token,
    character: Character | undefined,
    liveSVGPoint?: Point
  ) => DOMRect | null;
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
  onTokenSelectForHPModal?: (
    tokenId: string,
    tokenScreenRect: DOMRect | null
  ) => void;
  onBackgroundClick?: () => void;
  activeHPModalTokenId: string | null;
  onHPModalAnchorShouldUpdate?: (
    tokenId: string,
    newScreenRect: DOMRect | null
  ) => void;
  draggingVisuals: DraggingVisuals;
  onTokenDragStart: (tokenId: string) => void;
  onTokenDragMove: (tokenId: string, visualSVGPoint: Point) => void;
  onTokenDragEnd: (tokenId: string) => void;
  multiSelectedTokenIds: string[];
  onSetMultiSelectedTokenIds: (ids: string[]) => void;
  onClearMultiSelection: () => void;
  characters: Character[];
  tokensOnBoard: Token[];
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  activeTool: Tool;
}

const GameBoardContext = createContext<GameBoardContextType | undefined>(
  undefined
);

export const GameBoardProvider: React.FC<GameBoardProviderProps> = ({
  children,
  onTokenSelectForHPModal,
  onBackgroundClick,
  activeHPModalTokenId,
  onHPModalAnchorShouldUpdate,
  draggingVisuals,
  onTokenDragStart,
  onTokenDragMove,
  onTokenDragEnd,
  multiSelectedTokenIds,
  onSetMultiSelectedTokenIds,
  onClearMultiSelection,
}) => {
  const { characters, tokensOnBoard, addToken } = useCharacters();
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
    tokensOnBoard,
    characters,
    gridSettings,
    onSetMultiSelectedTokenIds,
    onClearMultiSelection,
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
    onClearMultiSelection,
  });

  const handleBoardTokenDoubleClick = useCallback(
    (tokenId: string, altKey: boolean) => {
      if (altKey) {
        const token = tokensOnBoard.find(
          (t) => t.id === tokenId
        );
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
      const [sizeMultiplierX, sizeMultiplierY] = parseCharacterSize(character.size);

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
      const screenY =
        (tokenWorldY - viewBox.y) * zoomLevel + svgGlobalRect.top;
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
          (c: Character) => c.id === tokenToUpdate.characterId
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
      const token = tokensOnBoard.find((t) => t.id === tokenId);
      if (token) {
        const character = characters.find((c) => c.id === token.characterId);
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

  const contextValue: GameBoardContextType = {
    svgRef,
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
    rulerPath,
    handleRulerMouseDown,
    handleRulerMouseMove,
    handleRulerMouseUp,
    handleRulerRightClick,
    marqueeSelection,
    handleMarqueeMouseDown,
    handleMarqueeMouseMove,
    handleMarqueeMouseUp,
    handleDragOver,
    handleCharacterDrop,
    handleMouseDown,
    handleBoardTokenDoubleClick,
    getTokenScreenRect,
    isPageAndGridSettingsModalOpen,
    setIsPageAndGridSettingsModalOpen,
    multiSelectBoundingBox,
    onTokenSelectForHPModal,
    onBackgroundClick,
    activeHPModalTokenId,
    onHPModalAnchorShouldUpdate,
    draggingVisuals,
    onTokenDragStart,
    onTokenDragMove,
    onTokenDragEnd,
    multiSelectedTokenIds,
    onSetMultiSelectedTokenIds,
    onClearMultiSelection,
    characters,
    tokensOnBoard,
    gridSettings,
    pageSettings,
    activeTool,
  };

  return (
    <GameBoardContext.Provider value={contextValue}>
      {children}
    </GameBoardContext.Provider>
  );
};

export const useGameBoard = () => {
  const context = useContext(GameBoardContext);
  if (context === undefined) {
    throw new Error("useGameBoard must be used within a GameBoardProvider");
  }
  return context;
};
