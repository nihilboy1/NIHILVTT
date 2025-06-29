import { useCallback, useMemo, useRef } from "react";
import { useSelectedToken } from "../../contexts/SelectedTokenContext";
import { useBoardTokenDrag } from "../../hooks/useBoardTokenDrag";
import {
  Tool,
  type Token,
  type PageSettings,
  type Point,
  type Character,
} from "../../shared/api/types";
import { getFirstName } from "../../shared/lib/utils/nameUtils";
import { parseCharacterSize } from "../../shared/lib/utils/characterUtils";
import { HealthBar } from "./HealthBar";
import { TokenVisual, type TokenVisualMetrics } from "./TokenVisual"; // Renomeado

interface BoardTokenProps {
  token: Token;
  character: Character;
  cellSize: number;
  zoomLevel: number;
  onMove: (tokenId: string, newPosition: Point) => void;
  activeTool: Tool;
  pageSettings: PageSettings;
  getSVGPoint: (clientX: number, clientY: number) => Point;
  onTokenSelectForHPModal?: (
    tokenId: string,
    tokenScreenRect: DOMRect | null
  ) => void;
  onTokenDragStart: (tokenId: string) => void;
  onTokenDragMove: (tokenId: string, visualSVGPoint: Point) => void;
  onTokenDragEnd: (tokenId: string) => void;
  isMultiSelected: boolean;
  onBoardTokenDoubleClick: (tokenId: string, altKey: boolean) => void;
}

export function BoardToken({
  token,
  character,
  cellSize,
  zoomLevel,
  onMove,
  activeTool,
  pageSettings,
  getSVGPoint,
  onTokenSelectForHPModal,
  onTokenDragStart,
  onTokenDragMove,
  onTokenDragEnd,
  isMultiSelected,
  onBoardTokenDoubleClick,
}: BoardTokenProps) {
  const tokenGroupRef = useRef<SVGGElement>(null);
  const { selectedTokenId, setSelectedTokenId } = useSelectedToken();

  const handleSelectThisToken = useCallback(
    (tokenId: string) => {
      if (activeTool !== Tool.SELECT) {
        return;
      }

      setSelectedTokenId(tokenId);

      if (onTokenSelectForHPModal && tokenGroupRef.current) {
        const screenRect = tokenGroupRef.current.getBoundingClientRect();
        const plainRect = screenRect
          ? ({
              x: screenRect.x,
              y: screenRect.y,
              width: screenRect.width,
              height: screenRect.height,
              top: screenRect.top,
              right: screenRect.right,
              bottom: screenRect.bottom,
              left: screenRect.left,
              toJSON: () => ({}),
            } as DOMRect)
          : null;
        onTokenSelectForHPModal(tokenId, plainRect);
      }
    },
    [activeTool, setSelectedTokenId, onTokenSelectForHPModal]
  );

  const handleDoubleClick = useCallback(
    (event: React.MouseEvent<SVGGElement>) => {
      onBoardTokenDoubleClick(token.id, event.altKey);
    },
    [token.id, onBoardTokenDoubleClick]
  );

  const { isDragging, displayPosition, dragHandlers } = useBoardTokenDrag({
    tokenId: token.id,
    initialPosition: token.position,
    characterSize: character.size,
    cellSize,
    activeTool,
    pageSettings,
    getSVGPoint,
    onMove,
    onDragStart: onTokenDragStart,
    onDragMove: onTokenDragMove,
    onDragEnd: onTokenDragEnd,
    onSelectToken: handleSelectThisToken,
  });

  const [sizeMultiplierX, sizeMultiplierY] = parseCharacterSize(character.size);
  const tokenRenderWidth = sizeMultiplierX * cellSize;
  const tokenRenderHeight = sizeMultiplierY * cellSize;

  const baseStrokeWidth = Math.max(0.5, 1.5 / zoomLevel);
  const isSelected = selectedTokenId === token.id || isMultiSelected;

  const strokeWidth = isSelected
    ? baseStrokeWidth + Math.max(0.3, 1 / zoomLevel)
    : baseStrokeWidth;
  const strokeColor = isSelected
    ? "var(--color-accent-primary)"
    : isDragging
    ? "var(--color-accent-secondary)"
    : "var(--color-border-base)";

  const nameplateFontSize = Math.max(8, 12 / zoomLevel);
  const cursorStyle =
    activeTool === Tool.SELECT
      ? isDragging
        ? "grabbing"
        : "pointer"
      : "default";

  const padding = 1 / zoomLevel;

  const tokenMetrics: TokenVisualMetrics = useMemo(
    () => ({
      tokenRenderWidth,
      tokenRenderHeight,
      imageUrl: character.image,
      name: character.name,
      fontSize: nameplateFontSize,
    }),
    [tokenRenderWidth, tokenRenderHeight, character.image, character.name, nameplateFontSize]
  );

  const firstName = useMemo(() => getFirstName(character.name), [character.name]);
  const nameplateYOffset =
    tokenRenderHeight + nameplateFontSize / 2 + 5 / zoomLevel;

  return (
    <g
      ref={tokenGroupRef}
      transform={`translate(${displayPosition.x}, ${displayPosition.y})`}
      className="board-token-group"
      style={{ cursor: cursorStyle }}
      {...dragHandlers}
      onDoubleClick={handleDoubleClick}
      filter={isDragging ? "url(#tokenDragShadow)" : "none"}
      data-token-id={token.id}
    >
      <HealthBar
        currentHp={token.currentHp}
        maxHp={character.maxHp}
        tokenRenderWidth={tokenRenderWidth}
        zoomLevel={zoomLevel}
      />
      <TokenVisual metrics={tokenMetrics} />
      <text
        x={tokenRenderWidth / 2}
        y={nameplateYOffset}
        fontSize={nameplateFontSize}
        textAnchor="middle"
        dominantBaseline="alphabetic"
        fontWeight="bold"
        className="select-none"
        pointerEvents="none"
        style={{ filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.7))" }}
      >
        {firstName}
      </text>
      {isSelected && (
        <rect
          x={-padding}
          y={-padding}
          width={tokenRenderWidth + 2 * padding}
          height={tokenRenderHeight + 2 * padding}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      )}
    </g>
  );
}
