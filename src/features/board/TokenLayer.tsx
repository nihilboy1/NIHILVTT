import React from "react";
import { BoardToken } from "../../components/token/BoardToken";
import {
  GridInstance,
  Token,
  PageSettings,
  Point,
  Tool,
} from "../../shared/types"; // Remover vírgula extra
import { useTokens } from "../../contexts/TokensContext";

interface TokenLayerProps {
  gridInstances: GridInstance[];
  tokens: Token[];
  gridSettings: { visualCellSize: number };
  zoomLevel: number;
  activeTool: Tool;
  pageSettings: PageSettings;
  getSVGPoint: (clientX: number, clientY: number) => Point;
  onGridInstanceSelectForHPModal?: (
    instanceId: string,
    tokenScreenRect: DOMRect | null
  ) => void;
  onGridInstanceDragStart: (instanceId: string) => void;
  onGridInstanceDragMove: (instanceId: string, visualSVGPoint: Point) => void;
  onGridInstanceDragEnd: (instanceId: string) => void;
  multiSelectedInstanceIds: string[];
  onTokenDoubleClick: (instanceId: string, altKey: boolean) => void;
  selectedInstanceId: string | null; // Nova prop
  setSelectedInstanceId: (instanceId: string | null) => void; // Nova prop
}

export const TokenLayer: React.FC<TokenLayerProps> = ({
  gridInstances,
  tokens,
  gridSettings,
  zoomLevel,
  activeTool,
  pageSettings,
  getSVGPoint,
  onGridInstanceSelectForHPModal,
  onGridInstanceDragStart,
  onGridInstanceDragMove,
  onGridInstanceDragEnd,
  multiSelectedInstanceIds,
  onTokenDoubleClick,
  selectedInstanceId, // Nova prop
  setSelectedInstanceId, // Nova prop
}) => {
  const { updateGridInstancePosition } = useTokens();

  return (
    <>
      <filter id="tokenDragShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx={2.5 / zoomLevel}
          dy={3.5 / zoomLevel}
          stdDeviation={2 / zoomLevel}
          floodColor="#000000"
          floodOpacity="0.5"
        />
      </filter>
      {gridInstances.map((instance) => {
        const tokenInfo = tokens.find((t) => t.id === instance.tokenInfoId);
        if (!tokenInfo) return null;
        return (
          <BoardToken
            key={instance.instanceId}
            gridInstance={instance}
            tokenInfo={tokenInfo}
            cellSize={gridSettings.visualCellSize}
            zoomLevel={zoomLevel}
            onMove={(instanceId: string, newGridX: number, newGridY: number) =>
              updateGridInstancePosition(instanceId, newGridX, newGridY)
            }
            activeTool={activeTool}
            pageSettings={pageSettings}
            getSVGPoint={getSVGPoint}
            onGridInstanceSelectForHPModal={onGridInstanceSelectForHPModal}
            onGridInstanceDragStart={onGridInstanceDragStart}
            onGridInstanceDragMove={onGridInstanceDragMove}
            onGridInstanceDragEnd={onGridInstanceDragEnd}
            isMultiSelected={multiSelectedInstanceIds.includes(
              instance.instanceId
            )} // Manter apenas para multi-seleção
            isTokenSelected={selectedInstanceId === instance.instanceId} // Nova prop para seleção única
            onTokenDoubleClick={onTokenDoubleClick}
            selectedInstanceId={selectedInstanceId} // Passar a prop diretamente
            setSelectedInstanceId={setSelectedInstanceId} // Passar a prop diretamente
          />
        );
      })}
    </>
  );
};
