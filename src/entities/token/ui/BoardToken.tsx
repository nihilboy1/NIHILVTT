import { useCallback, useMemo, useRef } from "react";
import {
  Tool,
  type PageSettings,
  type Point,
  type Token,
} from "../../../shared/api/types";
import { getFirstName } from "../../../shared/lib/utils/nameUtils";
import { useSelectedTokenStore } from "../model/store/selectedTokenStore";
import { HealthBar } from "./HealthBar";
import { TokenVisual, TokenVisualMetrics } from "./TokenVisual";
import { Character, CharacterTypeEnum } from "@/entities/character/model/schemas/character.schema";
import { parseCharacterSize } from "@/entities/character/lib/utils/characterUtils";
import { useTokenDrag } from "../model/hooks/useTokenDrag";

interface BoardTokenProps {
  token: Token;
  character: Character;
  cellSize: number;
  zoomLevel: number;
  onMove: (tokenId: string, newPosition: Point) => void;
  activeTool: Tool;
  pageSettings: PageSettings;
  getSVGPoint: (clientX: number, clientY: number) => Point;
  onTokenDragStart: (tokenId: string) => void;
  onTokenDragMove: (tokenId: string, visualSVGPoint: Point) => void;
  onTokenDragEnd: (tokenId: string) => void;
  isMultiSelected: boolean;
  onBoardTokenDoubleClick: (tokenId: string, altKey: boolean) => void;
  // Removendo props relacionadas ao HPModal, pois ele será renderizado em outro lugar
  // activeHPModalTokenId: string | null;
  // onHPModalAnchorShouldUpdate: (
  //   tokenId: string,
  //   newScreenRect: DOMRect | null
  // ) => void;
  // onHPChange: (tokenId: string, newHP: number) => void;
  // onRemoveFromBoard: (tokenId: string) => void;
  // onMakeIndependent: (tokenId: string) => void;
  onSetMultiSelectedTokenIds: (ids: string[]) => void;
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
  onTokenDragStart,
  onTokenDragMove,
  onTokenDragEnd,
  isMultiSelected,
  onBoardTokenDoubleClick,
  onSetMultiSelectedTokenIds,
}: BoardTokenProps) {
  const tokenGroupRef = useRef<SVGGElement>(null);
  const { selectedTokenId, setSelectedTokenId } = useSelectedTokenStore();

  const handleSelectThisToken = useCallback(
    (tokenId: string) => {
      if (activeTool !== Tool.SELECT) {
        return;
      }
      setSelectedTokenId(tokenId);
      onSetMultiSelectedTokenIds([tokenId]);
    },
    [activeTool, setSelectedTokenId, onSetMultiSelectedTokenIds]
  );

  const { isDragging, displayPosition, dragHandlers } = useTokenDrag({
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

  // O useEffect para atualizar a posição do HPModal não é mais necessário aqui
  // pois o HPModal não será renderizado neste componente.
  // useEffect(() => {
  //   if (token.id === activeHPModalTokenId && tokenGroupRef.current) {
  //     const screenRect = tokenGroupRef.current.getBoundingClientRect();
  //     const plainRect = screenRect
  //       ? ({
  //           x: screenRect.x,
  //           y: screenRect.y,
  //           width: screenRect.width,
  //           height: screenRect.height,
  //           top: screenRect.top,
  //           right: screenRect.right,
  //           bottom: screenRect.bottom,
  //           left: screenRect.left,
  //           toJSON: () => ({}),
  //         } as DOMRect)
  //       : null;
  //     onHPModalAnchorShouldUpdate(token.id, plainRect);
  //   }
  // }, [
  //   token.id,
  //   activeHPModalTokenId,
  //   onHPModalAnchorShouldUpdate,
  //   displayPosition,
  //   zoomLevel,
  // ]);

  const handleDoubleClick = useCallback(
    (event: React.MouseEvent<SVGGElement>) => {
      onBoardTokenDoubleClick(token.id, event.altKey);
    },
    [token.id, onBoardTokenDoubleClick]
  );

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
    [
      tokenRenderWidth,
      tokenRenderHeight,
      character.image,
      character.name,
      nameplateFontSize,
    ]
  );

  const firstName = useMemo(
    () => getFirstName(character.name),
    [character.name]
  );
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
      {/* Renderiza HealthBar apenas para PlayerCharacter ou MonsterNPCCharacter */}
      {(character.type === CharacterTypeEnum.enum.Player ||
        character.type === CharacterTypeEnum.enum["Monster/NPC"]) && (
        <HealthBar
          currentHp={token.currentHp}
          maxHp={character.combatStats.maxHp}
          tokenRenderWidth={tokenRenderWidth}
          zoomLevel={zoomLevel}
        />
      )}
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
