import { PageSettings, Point, Tool } from "../../../shared/api/types";
import { parseTokenSize } from "../../../shared/lib/utils/board/boardUtils";
import { useCallback, useEffect, useState } from "react";

const CLICK_THRESHOLD_MS = 200;

interface UseTokenDragProps {
  tokenId: string;
  initialPosition: Point;
  characterSize: string;
  cellSize: number;
  activeTool: Tool;
  pageSettings: PageSettings;
  getSVGPoint: (clientX: number, clientY: number) => Point;
  onMove: (tokenId: string, newPosition: Point) => void;
  onDragStart: (tokenId: string) => void;
  onDragMove: (tokenId: string, visualSVGPoint: Point) => void;
  onDragEnd: (tokenId: string) => void;
  onSelectToken: (tokenId: string) => void;
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
      const tokenCurrentSvgX = initialPosition.x * cellSize;
      const tokenCurrentSvgY = initialPosition.y * cellSize;

      setDragStartMouseOffset({
        x: initialSVGPoint.x - tokenCurrentSvgX,
        y: initialSVGPoint.y - tokenCurrentSvgY,
      });
      setCurrentVisualPosition({ x: tokenCurrentSvgX, y: tokenCurrentSvgY });
    },
    [activeTool, initialPosition, cellSize, getSVGPoint]
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!dragStartMouseOffset || !currentVisualPosition) return;

      if (!isDragging) {
        setIsDragging(true);
        onDragStart(tokenId);
        document.body.style.cursor = "grabbing";
      }

      const mouseSVGPoint = getSVGPoint(event.clientX, event.clientY);
      const newVisualPos = {
        x: mouseSVGPoint.x - dragStartMouseOffset.x,
        y: mouseSVGPoint.y - dragStartMouseOffset.y,
      };

      setCurrentVisualPosition(newVisualPos);
      onDragMove(tokenId, newVisualPos);
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
            parseTokenSize(characterSize);
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
          onMove(tokenId, { x: finalGridX, y: finalGridY });
        }
        onDragEnd(tokenId);
      } else if (
        activeTool === Tool.SELECT &&
        timeSinceClickStart < CLICK_THRESHOLD_MS &&
        event.button === 0
      ) {
        onSelectToken(tokenId);
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
    tokenId,
    characterSize,
    cellSize,
    pageSettings,
    activeTool,
    getSVGPoint,
    onMove,
    onDragStart,
    onDragMove,
    onDragEnd,
    onSelectToken,
  ]);

  const displayPosition =
    isDragging && currentVisualPosition
      ? currentVisualPosition
      : { x: initialPosition.x * cellSize, y: initialPosition.y * cellSize };

  return {
    isDragging,
    displayPosition,
    dragHandlers: {
      onMouseDown: handleMouseDown,
    },
  };
};
