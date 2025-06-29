import { useCallback, useMemo, useRef } from "react";
import {
  type Token as TokenInfo,
  Tool,
  type PageSettings,
  type GridInstance,
  type Point,
} from "../../shared/types/index"; // Caminho corrigido
import { useTokenDrag } from "../../hooks/useTokenDrag"; // Caminho corrigido
import { HealthBar } from "./HealthBar"; // Já está correto
import { TokenVisual, type TokenMetrics } from "./TokenVisual"; // Já está correto
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
  isMultiSelected: boolean; // Manter para compatibilidade com multi-seleção via marquee
  isTokenSelected: boolean; // Nova prop para seleção única
  onTokenDoubleClick: (instanceId: string, altKey: boolean) => void; // Nova prop para double click
  selectedInstanceId: string | null; // Manter para passar para useTokenDrag
  setSelectedInstanceId: (instanceId: string | null) => void; // Manter para passar para useTokenDrag
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
  isMultiSelected, // Manter para compatibilidade
  isTokenSelected, // Nova prop
  onTokenDoubleClick, // Adicionar nova prop
  setSelectedInstanceId, // Manter para passar para useTokenDrag
}: BoardTokenProps) {
  const tokenGroupRef = useRef<SVGGElement>(null);

  const handleSelectThisInstance = useCallback(
    (instanceId: string) => {
      // Apenas selecionar e abrir o popover de HP se a ferramenta for SELECT
      if (activeTool !== Tool.SELECT) {
        return;
      }

      setSelectedInstanceId(instanceId); // Definir o token selecionado

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
    [activeTool, setSelectedInstanceId, onGridInstanceSelectForHPModal] // Adicionar activeTool e setSelectedInstanceId
  );

  const handleDoubleClick = useCallback(
    (event: React.MouseEvent<SVGGElement>) => {
      onTokenDoubleClick(gridInstance.instanceId, event.altKey);
    },
    [gridInstance.instanceId, onTokenDoubleClick]
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
    onSelectInstance: handleSelectThisInstance, // Voltar a usar handleSelectThisInstance
  });

  const [sizeMultiplierX, sizeMultiplierY] = parseSize(tokenInfo.size);
  const tokenRenderWidth = sizeMultiplierX * cellSize;
  const tokenRenderHeight = sizeMultiplierY * cellSize;

  const baseStrokeWidth = Math.max(0.5, 1.5 / zoomLevel); // Ensure stroke is visible
  const isSelected = isTokenSelected || isMultiSelected; // Determinar se o token está selecionado

  const strokeWidth = isSelected
    ? baseStrokeWidth + Math.max(0.3, 1 / zoomLevel) // Reverter para largura original, mas com baseStrokeWidth
    : baseStrokeWidth;
  const strokeColor = isSelected
    ? "var(--color-accent-primary)" // Reverter para cor original
    : isDragging
    ? "var(--color-accent-secondary)"
    : "var(--color-border-base)";

  // Ajustar fontSize para o nome, pode precisar de mais ajustes dependendo do visual final
  const nameplateFontSize = Math.max(8, 12 / zoomLevel);
  const cursorStyle =
    activeTool === Tool.SELECT
      ? isDragging
        ? "grabbing"
        : "pointer"
      : "default";

  const padding = 1 / zoomLevel; // Reduzir o padding para aproximar a borda do token

  const tokenMetrics: TokenMetrics = useMemo(
    () => ({
      tokenRenderWidth,
      tokenRenderHeight,
      imageUrl: tokenInfo.image, // Passar a URL da imagem
      name: tokenInfo.name, // Passar o nome completo para TokenVisual
      fontSize: nameplateFontSize, // Usar o novo fontSize para o nome
    }),
    [
      tokenRenderWidth,
      tokenRenderHeight,
      tokenInfo.image, // Adicionar image ao array de dependências
      tokenInfo.name,
      nameplateFontSize,
    ]
  );

  const firstName = useMemo(
    () => getFirstName(tokenInfo.name),
    [tokenInfo.name]
  );
  // Ajustar o deslocamento vertical para que o nome fique diretamente abaixo do token
  // Considera a altura da fonte e um pequeno espaçamento
  const nameplateYOffset =
    tokenRenderHeight + nameplateFontSize / 2 + 5 / zoomLevel; // Aumentar o espaçamento

  return (
    <g
      ref={tokenGroupRef}
      transform={`translate(${displayPosition.x}, ${displayPosition.y})`}
      className="board-token-group"
      style={{ cursor: cursorStyle }}
      {...dragHandlers} // Attach onMouseDown from the hook
      onDoubleClick={handleDoubleClick} // Adicionar o handler de double click
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
      {/* Retângulo de seleção - agora desenhado por último para ficar por cima */}
      {isSelected && (
        <rect
          x={-padding}
          y={-padding}
          width={tokenRenderWidth + 2 * padding}
          height={tokenRenderHeight + 2 * padding}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          // Remover rx e ry para tornar quadrado
        />
      )}
    </g>
  );
}
