import { PageSettings, Point, Tool } from "../../../../../shared/api/types";
import { parseTokenSize } from "../../../../../shared/lib/utils/board/boardUtils";
import { useCallback, useEffect, useState } from "react";

const CLICK_THRESHOLD_MS = 200;

interface UseTokenDragProps { // Renomeado
  tokenId: string; // Renomeado
  initialPosition: Point; // Renomeado
  characterSize: string; // Renomeado
  cellSize: number;
  activeTool: Tool;
  pageSettings: PageSettings;
  getSVGPoint: (clientX: number, clientY: number) => Point;
  onMove: (tokenId: string, newPosition: Point) => void; // Renomeado
  onDragStart: (tokenId: string) => void; // Renomeado
  onDragMove: (tokenId: string, visualSVGPoint: Point) => void; // Renomeado
  onDragEnd: (tokenId: string) => void; // Renomeado
  onSelectToken: (tokenId: string) => void; // Renomeado
}

export const useTokenDrag = ({
  tokenId,
  initialPosition,
  characterSize,
  cellSize,
  activeTool,
  pageSettings,
  getSVGPoint,
  onMove,
  onDragStart,
  onDragMove,
  onDragEnd,
  onSelectToken,
}: UseTokenDragProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartMouseOffset, setDragStartMouseOffset] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentVisualPosition, setCurrentVisualPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [clickStartTimestamp, setClickStartTimestamp] = useState<number | null>(
    null
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGGElement>) => {
      if (activeTool !== Tool.SELECT || event.button !== 0) return;

      event.stopPropagation();
      setClickStartTimestamp(Date.now());

      const initialSVGPoint = getSVGPoint(event.clientX, event.clientY);
      const tokenCurrentSvgX = initialPosition.x * cellSize; // Usar initialPosition
      const tokenCurrentSvgY = initialPosition.y * cellSize; // Usar initialPosition

      setDragStartMouseOffset({
        x: initialSVGPoint.x - tokenCurrentSvgX,
        y: initialSVGPoint.y - tokenCurrentSvgY,
      });
      // Set initial visual position to where the token actually is, not where the mouse is.
      setCurrentVisualPosition({ x: tokenCurrentSvgX, y: tokenCurrentSvgY });
    },
    [activeTool, initialPosition, cellSize, getSVGPoint] // Renomeado
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!dragStartMouseOffset || !currentVisualPosition) return;

      if (!isDragging) {
        // First move after mousedown
        setIsDragging(true);
        onDragStart(tokenId); // Renomeado
        document.body.style.cursor = "grabbing";
      }

      const mouseSVGPoint = getSVGPoint(event.clientX, event.clientY);
      const newVisualPos = {
        x: mouseSVGPoint.x - dragStartMouseOffset.x,
        y: mouseSVGPoint.y - dragStartMouseOffset.y,
      };

      setCurrentVisualPosition(newVisualPos);
      onDragMove(tokenId, newVisualPos); // Renomeado
    };

    const handleMouseUp = (event: MouseEvent) => {
      const timeSinceClickStart = clickStartTimestamp
        ? Date.now() - clickStartTimestamp
        : Infinity;
      setClickStartTimestamp(null);

      if (document.body.style.cursor === "grabbing") {
        document.body.style.cursor = "default";
      }

      if (isDragging) {
        if (currentVisualPosition) {
          const [sizeMultiplierX, sizeMultiplierY] =
            parseTokenSize(characterSize); // Renomeado
          let finalGridX = Math.round(currentVisualPosition.x / cellSize);
          let finalGridY = Math.round(currentVisualPosition.y / cellSize);

          finalGridX = Math.max(
            0,
            Math.min(
              finalGridX,
              pageSettings.widthInUnits - Math.ceil(sizeMultiplierX)
            )
          );
          finalGridY = Math.max(
            0,
            Math.min(
              finalGridY,
              pageSettings.heightInUnits - Math.ceil(sizeMultiplierY)
            )
          );
          onMove(tokenId, { x: finalGridX, y: finalGridY }); // Renomeado
        }
        onDragEnd(tokenId); // Renomeado
      } else if (
        activeTool === Tool.SELECT &&
        timeSinceClickStart < CLICK_THRESHOLD_MS &&
        event.button === 0
      ) {
        // Chamar onSelectToken apenas se a ferramenta for SELECT
        onSelectToken(tokenId); // Renomeado
      }

      setIsDragging(false);
      setDragStartMouseOffset(null);
      setCurrentVisualPosition(null);
    };

    if (dragStartMouseOffset) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (document.body.style.cursor === "grabbing") {
        document.body.style.cursor = "default";
      }
    };
  }, [
    isDragging,
    dragStartMouseOffset,
    currentVisualPosition,
    clickStartTimestamp,
    tokenId, // Renomeado
    characterSize, // Renomeado
    cellSize,
    pageSettings,
    activeTool,
    getSVGPoint,
    onMove,
    onDragStart,
    onDragMove,
    onDragEnd,
    onSelectToken, // Renomeado
  ]);

  const displayPosition =
    isDragging && currentVisualPosition
      ? currentVisualPosition
      : { x: initialPosition.x * cellSize, y: initialPosition.y * cellSize }; // Usar initialPosition

  return {
    isDragging,
    displayPosition,
    dragHandlers: {
      onMouseDown: handleMouseDown,
    },
  };
};
