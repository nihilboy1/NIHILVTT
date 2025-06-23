import { useCallback, useMemo, useRef } from "react";
import {
  type Token as TokenInfo,
  Tool,
  type PageSettings,
  type GridInstance,
  type Point,
} from "../../types/index"; // Caminho corrigido
import { useTokenDrag } from "../../hooks/useTokenDrag"; // Caminho corrigido
import { HealthBar } from "./HealthBar"; // Já está correto
import TokenVisual, { type TokenMetrics } from "./TokenVisual"; // Já está correto
import { parseSize } from "../../utils/tokenUtils"; // Caminho corrigido
import { getFirstName } from "../../utils/nameUtils"; // Caminho corrigido

interface BoardTokenProps {
  gridInstance: GridInstance;
  tokenInfo: TokenInfo;
  cellSize: number;
  zoomLevel: number;
  onMove: (instanceId: string, newGridX: number, newGridY: number) => void;
  activeTool: Tool;
  pageSettings: PageSettings;
  getSVGPoint: (clientX: number, clientY: number) => Point; // Changed SVGPoint to Point
  onGridInstanceSelectForHPModal?: (
    instanceId: string,
    tokenScreenRect: DOMRect | null
  ) => void;
  onGridInstanceDragStart: (instanceId: string) => void;
  onGridInstanceDragMove: (instanceId: string, visualSVGPoint: Point) => void; // Changed SVGPoint to Point
  onGridInstanceDragEnd: (instanceId: string) => void;
  isMultiSelected: boolean;
}

export function BoardToken({
  gridInstance,
  tokenInfo,
  cellSize,
  zoomLevel,
  onMove,
  activeTool,
  pageSettings,
  getSVGPoint,
  onGridInstanceSelectForHPModal,
  onGridInstanceDragStart,
  onGridInstanceDragMove,
  onGridInstanceDragEnd,
  isMultiSelected,
}: BoardTokenProps) {
  const tokenGroupRef = useRef<SVGGElement>(null);

  const handleSelectThisInstance = useCallback(
    (instanceId: string) => {
      if (onGridInstanceSelectForHPModal && tokenGroupRef.current) {
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
        onGridInstanceSelectForHPModal(instanceId, plainRect);
      }
    },
    [onGridInstanceSelectForHPModal]
  );

  const { isDragging, displayPosition, dragHandlers } = useTokenDrag({
    instanceId: gridInstance.instanceId,
    initialGridX: gridInstance.gridX,
    initialGridY: gridInstance.gridY,
    tokenSize: tokenInfo.size,
    cellSize,
    activeTool,
    pageSettings,
    getSVGPoint,
    onMove,
    onDragStart: onGridInstanceDragStart,
    onDragMove: onGridInstanceDragMove,
    onDragEnd: onGridInstanceDragEnd,
    onSelectInstance: handleSelectThisInstance,
  });

  const [sizeMultiplierX, sizeMultiplierY] = parseSize(tokenInfo.size);
  const tokenRenderWidth = sizeMultiplierX * cellSize;
  const tokenRenderHeight = sizeMultiplierY * cellSize;

  const baseStrokeWidth = Math.max(0.5, 1.5 / zoomLevel); // Ensure stroke is visible
  const strokeWidth = isMultiSelected
    ? baseStrokeWidth + Math.max(0.3, 1 / zoomLevel)
    : baseStrokeWidth;
  const strokeColor = isMultiSelected
    ? "var(--color-accent-primary)"
    : isDragging
    ? "var(--color-accent-secondary)"
    : "var(--color-border-primary)";

  // Ajustar fontSize para o nome, pode precisar de mais ajustes dependendo do visual final
  const nameplateFontSize = Math.max(8, 12 / zoomLevel);
  const cursorStyle =
    activeTool === Tool.SELECT ? (isDragging ? "grabbing" : "grab") : "default";

  const cornerRadius = Math.min(4 / zoomLevel, 4);

  const tokenMetrics: TokenMetrics = useMemo(
    () => ({
      tokenRenderWidth,
      tokenRenderHeight,
      tokenColor: tokenInfo.color,
      strokeColor,
      strokeWidth,
      cornerRadius,
      name: tokenInfo.name, // Passar o nome completo para TokenVisual
      fontSize: nameplateFontSize, // Usar o novo fontSize para o nome
    }),
    [
      tokenRenderWidth,
      tokenRenderHeight,
      tokenInfo.color,
      strokeColor,
      strokeWidth,
      cornerRadius,
      tokenInfo.name,
      nameplateFontSize,
    ]
  );

  const firstName = useMemo(
    () => getFirstName(tokenInfo.name),
    [tokenInfo.name]
  );
  // Ajustar o deslocamento vertical para que o nome fique diretamente acima do token
  // Considera a altura da fonte e um pequeno espaçamento
  const nameplateYOffset = -(nameplateFontSize + 2 / zoomLevel);

  return (
    <g
      ref={tokenGroupRef}
      transform={`translate(${displayPosition.x}, ${displayPosition.y})`}
      className="board-token-group"
      style={{ cursor: cursorStyle }}
      {...dragHandlers} // Attach onMouseDown from the hook
      filter={isDragging ? "url(#tokenDragShadow)" : "none"}
      data-instance-id={gridInstance.instanceId}
    >
      <HealthBar
        currentHp={tokenInfo.currentHp}
        maxHp={tokenInfo.maxHp}
        tokenRenderWidth={tokenRenderWidth}
        zoomLevel={zoomLevel}
      />
      <TokenVisual metrics={tokenMetrics} />
      {/* AC-1: Nome acima do token */}
      <text
        x={tokenRenderWidth / 2}
        y={
          nameplateYOffset
        } /* nameplateYOffset já é negativo, posicionando acima */
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
    </g>
  );
}


// visto