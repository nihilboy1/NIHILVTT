import { useCharacters } from "../../../../entities/character/model/contexts/CharactersContext";
import { useTokens } from "../../../../entities/token/model/contexts/TokenContext";
import { useMarqueeSelection } from "../../../../features/boardMarqueeSelection/model/hooks/useMarqueeSelection";
import { useRuler } from "../../../../features/boardRuler/model/hooks/useRuler";
import { useBoardSettingsStore } from "../../../../features/boardSettings/model/store";
import { useCharacterDrop } from "../../../../features/characterDropOnBoard/model/hooks/useCharacterDrop";
import { useModal } from "@/features/modalManager/model/contexts/ModalProvider";
import { useUI } from "@/features/layoutControls/model/contexts/UIProvider";

// 1. MUDANÇA NA IMPORTAÇÃO: Trocamos 'Character' por 'CharacterSchema'
import {
  type DraggingVisuals,
  type GridSettings,
  type MarqueeSelectionState,
  type PageSettings,
  type Point,
  type RulerPathState,
  type Token,
  type Tool,
} from "../../../../shared/api/types";
import { type Character } from "@/entities/character/model/schemas/character.schema";
import { useGameBoardEvents } from "../hooks/useGameBoardEvents";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { parseCharacterSize } from "@/entities/character/lib/utils/characterUtils";
import { useZoomAndPan } from "@/entities/board/model/hooks/useZoomAndPan";

interface GameBoardProviderProps {
  children: ReactNode;
  onTokenSelectForHPModal?: (
    tokenId: string,
    tokenScreenRect: DOMRect | null
  ) => void;
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
  activeHPModalTokenId: string | null;
  onHPModalAnchorShouldUpdate: (
    tokenId: string | null, // Permitir null para fechar o modal
    newScreenRect: DOMRect | null
  ) => void;
  onTokenSelectForHPModal?: (
    tokenId: string,
    tokenScreenRect: DOMRect | null
  ) => void;
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
  characters: Character[];
  tokensOnBoard: Token[];
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  activeTool: Tool;
  updateTokenPosition: (tokenId: string, newPosition: Point) => void; // Adicionado
}

const GameBoardContext = createContext<GameBoardContextType | undefined>(
  undefined
);

export const GameBoardProvider: React.FC<GameBoardProviderProps> = ({
  children,
  onTokenSelectForHPModal,
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
  const { characters } = useCharacters();
  const { tokensOnBoard, addToken, updateTokenPosition } = useTokens(); // Adicionado updateTokenPosition
  const { gridSettings, pageSettings, rulerPlacementMode, rulerPersists } =
    useBoardSettingsStore();
  const { activeTool } = useUI();
  const { openModal } = useModal();

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
      // Alterado para string | null
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

  // Modificando onSetMultiSelectedTokenIds para gerenciar o HPModal
  const handleSetMultiSelectedTokenIds = useCallback(
    (ids: string[]) => {
      onSetMultiSelectedTokenIds(ids); // Chama a função original

      if (ids.length === 1) {
        setActiveHPModalTokenId(ids[0]);
      } else {
        setActiveHPModalTokenId(null); // Limpa o HPModal se mais de um ou nenhum token for selecionado
      }
    },
    [onSetMultiSelectedTokenIds]
  );

  const handleClearMultiSelection = useCallback(() => {
    onClearMultiSelection();
    setActiveHPModalTokenId(null); // Limpa o HPModal ao limpar a seleção
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
    onSetMultiSelectedTokenIds: handleSetMultiSelectedTokenIds, // Usando a nova função
    onClearMultiSelection: handleClearMultiSelection, // Usando a nova função
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
    onClearMultiSelection: handleClearMultiSelection, // Usando a nova função
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
    onSetMultiSelectedTokenIds: handleSetMultiSelectedTokenIds, // Usando a nova função
    onClearMultiSelection: handleClearMultiSelection, // Usando a nova função
    onHPChange, // Adicionado
    onRemoveFromBoard, // Adicionado
    onMakeIndependent, // Adicionado
    characters,
    tokensOnBoard,
    gridSettings,
    pageSettings,
    activeTool,
    updateTokenPosition, // Adicionado
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
