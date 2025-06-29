import { useCallback } from "react";
import { Point, Token, GridSettings, PageSettings } from "../shared/types";
import { parseTokenSize } from "../utils/board/boardUtils";

interface UseTokenDropProps {
  getSVGPoint: (clientX: number, clientY: number) => Point;
  tokens: Token[];
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  addGridInstance: (tokenInfoId: string, gridX: number, gridY: number) => void;
}

export const useTokenDrop = ({
  getSVGPoint,
  tokens,
  gridSettings,
  pageSettings,
  addGridInstance,
}: UseTokenDropProps) => {
  const handleDragOver = useCallback(
    (event: React.DragEvent<SVGSVGElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const handleTokenDrop = useCallback(
    (event: React.DragEvent<SVGSVGElement>) => {
      event.preventDefault();
      const tokenInfoId = event.dataTransfer.getData(
        "application/vtt-token-info-id"
      );
      if (tokenInfoId) {
        const sheet = tokens.find((t) => t.id === tokenInfoId);
        if (!sheet) return;

        const dropPoint = getSVGPoint(event.clientX, event.clientY);
        const cellSize = gridSettings.visualCellSize;
        const pageActualWidth = pageSettings.widthInUnits * cellSize;
        const pageActualHeight = pageSettings.heightInUnits * cellSize;
        if (
          dropPoint.x < 0 ||
          dropPoint.x > pageActualWidth ||
          dropPoint.y < 0 ||
          dropPoint.y > pageActualHeight
        )
          return;

        const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(sheet.size);
        let gridX = Math.floor(dropPoint.x / cellSize);
        let gridY = Math.floor(dropPoint.y / cellSize);

        gridX = Math.max(
          0,
          Math.min(
            gridX,
            pageSettings.widthInUnits - Math.ceil(sizeMultiplierX)
          )
        );
        gridY = Math.max(
          0,
          Math.min(
            gridY,
            pageSettings.heightInUnits - Math.ceil(sizeMultiplierY)
          )
        );

        addGridInstance(tokenInfoId, gridX, gridY);
      }
    },
    [getSVGPoint, tokens, gridSettings, pageSettings, addGridInstance]
  );

  return {
    handleDragOver,
    handleTokenDrop,
  };
};
