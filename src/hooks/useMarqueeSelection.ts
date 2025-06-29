import { useState, useCallback } from "react";
import {
  MarqueeSelectionState,
  Point,
  GridInstance,
  Token,
} from "../shared/types";
import { parseTokenSize } from "../utils/board/boardUtils";
import { GridSettings } from "../shared/types";

interface UseMarqueeSelectionProps {
  activeTool: string; // Tool.SELECT
  getSVGPoint: (clientX: number, clientY: number) => Point;
  gridInstances: GridInstance[];
  tokens: Token[];
  gridSettings: GridSettings;
  onSetMultiSelectedInstanceIds: (ids: string[]) => void;
  onClearMultiSelection: () => void;
}

export const useMarqueeSelection = ({
  activeTool,
  getSVGPoint,
  gridInstances,
  tokens,
  gridSettings,
  onSetMultiSelectedInstanceIds,
  onClearMultiSelection,
}: UseMarqueeSelectionProps) => {
  const [marqueeSelection, setMarqueeSelection] =
    useState<MarqueeSelectionState>({
      isActive: false,
      startPoint: null,
      currentPoint: null,
    });

  const handleMarqueeMouseDown = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      if (activeTool !== "SELECT") return;
      onClearMultiSelection();
      const startPt = getSVGPoint(event.clientX, event.clientY);
      setMarqueeSelection({
        isActive: true,
        startPoint: startPt,
        currentPoint: startPt,
      });
    },
    [activeTool, getSVGPoint, onClearMultiSelection]
  );

  const handleMarqueeMouseMove = useCallback(
    (event: MouseEvent) => {
      if (marqueeSelection.isActive && activeTool === "SELECT") {
        const currentPt = getSVGPoint(event.clientX, event.clientY);
        setMarqueeSelection((prev) => ({ ...prev, currentPoint: currentPt }));
      }
    },
    [marqueeSelection.isActive, activeTool, getSVGPoint]
  );

  const handleMarqueeMouseUp = useCallback(() => {
    if (
      marqueeSelection.isActive &&
      marqueeSelection.startPoint &&
      marqueeSelection.currentPoint &&
      activeTool === "SELECT"
    ) {
      const { startPoint, currentPoint } = marqueeSelection;
      const marqueeSvgX = Math.min(startPoint.x, currentPoint.x);
      const marqueeSvgY = Math.min(startPoint.y, currentPoint.y);
      const marqueeWidth = Math.abs(startPoint.x - currentPoint.x);
      const marqueeHeight = Math.abs(startPoint.y - currentPoint.y);

      const selectedIds: string[] = [];
      gridInstances.forEach((instance) => {
        const tokenInfo = tokens.find((t) => t.id === instance.tokenInfoId);
        if (!tokenInfo) return;

        const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(
          tokenInfo.size
        );
        const tokenSvgX = instance.gridX * gridSettings.visualCellSize;
        const tokenSvgY = instance.gridY * gridSettings.visualCellSize;
        const tokenWidth = sizeMultiplierX * gridSettings.visualCellSize;
        const tokenHeight = sizeMultiplierY * gridSettings.visualCellSize;

        const intersects = !(
          marqueeSvgX > tokenSvgX + tokenWidth ||
          marqueeSvgX + marqueeWidth < tokenSvgX ||
          marqueeSvgY > tokenSvgY + tokenHeight ||
          marqueeSvgY + marqueeHeight < tokenSvgY
        );

        if (intersects) {
          selectedIds.push(instance.instanceId);
        }
      });
      onSetMultiSelectedInstanceIds(selectedIds);
      setMarqueeSelection({
        isActive: false,
        startPoint: null,
        currentPoint: null,
      });
    }
  }, [
    marqueeSelection,
    activeTool,
    gridInstances,
    tokens,
    gridSettings.visualCellSize,
    onSetMultiSelectedInstanceIds,
  ]);

  const clearMarquee = useCallback(() => {
    setMarqueeSelection({
      isActive: false,
      startPoint: null,
      currentPoint: null,
    });
  }, []);

  return {
    marqueeSelection,
    handleMarqueeMouseDown,
    handleMarqueeMouseMove,
    handleMarqueeMouseUp,
    clearMarquee,
  };
};
