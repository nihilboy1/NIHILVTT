import { useState, useCallback, useEffect } from 'react';
import { Tool, type PageSettings, type Point } from '../types'; // Changed SVGPoint to Point

const CLICK_THRESHOLD_MS = 200;

interface UseTokenDragProps {
  instanceId: string;
  initialGridX: number;
  initialGridY: number;
  tokenSize: string;
  cellSize: number;
  activeTool: Tool;
  pageSettings: PageSettings;
  getSVGPoint: (clientX: number, clientY: number) => Point; // Changed SVGPoint to Point
  onMove: (instanceId: string, newGridX: number, newGridY: number) => void;
  onDragStart: (instanceId: string) => void;
  onDragMove: (instanceId: string, visualSVGPoint: Point) => void; // Changed SVGPoint to Point
  onDragEnd: (instanceId: string) => void;
  onSelectInstance: (instanceId: string) => void;
}

const parseTokenSizeForDrag = (sizeString: string): [number, number] => {
  const parts = sizeString.split('x').map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[0] > 0 && parts[1] > 0) {
    return [parts[0], parts[1]];
  }
  return [1, 1];
};

export const useTokenDrag = ({
  instanceId,
  initialGridX,
  initialGridY,
  tokenSize,
  cellSize,
  activeTool,
  pageSettings,
  getSVGPoint,
  onMove,
  onDragStart,
  onDragMove,
  onDragEnd,
  onSelectInstance,
}: UseTokenDragProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartMouseOffset, setDragStartMouseOffset] = useState<{ x: number; y: number } | null>(null);
  const [currentVisualPosition, setCurrentVisualPosition] = useState<{ x: number; y: number } | null>(null);
  const [clickStartTimestamp, setClickStartTimestamp] = useState<number | null>(null);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGGElement>) => {
      if (activeTool !== Tool.SELECT || event.button !== 0) return;

      event.stopPropagation();
      setClickStartTimestamp(Date.now());

      const initialSVGPoint = getSVGPoint(event.clientX, event.clientY);
      const tokenCurrentSvgX = initialGridX * cellSize;
      const tokenCurrentSvgY = initialGridY * cellSize;

      setDragStartMouseOffset({
        x: initialSVGPoint.x - tokenCurrentSvgX,
        y: initialSVGPoint.y - tokenCurrentSvgY,
      });
      // Set initial visual position to where the token actually is, not where the mouse is.
      setCurrentVisualPosition({ x: tokenCurrentSvgX, y: tokenCurrentSvgY });
    },
    [activeTool, initialGridX, initialGridY, cellSize, getSVGPoint]
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!dragStartMouseOffset || !currentVisualPosition) return;

      if (!isDragging) { // First move after mousedown
        setIsDragging(true);
        onDragStart(instanceId);
        document.body.style.cursor = 'grabbing';
      }

      const mouseSVGPoint = getSVGPoint(event.clientX, event.clientY);
      const newVisualX = mouseSVGPoint.x - dragStartMouseOffset.x;
      const newVisualY = mouseSVGPoint.y - dragStartMouseOffset.y;
      const newVisualPos = { x: newVisualX, y: newVisualY };
      
      setCurrentVisualPosition(newVisualPos);
      onDragMove(instanceId, newVisualPos);
    };

    const handleMouseUp = (event: MouseEvent) => {
      const timeSinceClickStart = clickStartTimestamp ? Date.now() - clickStartTimestamp : Infinity;
      setClickStartTimestamp(null);

      if (document.body.style.cursor === 'grabbing') {
        document.body.style.cursor = 'default';
      }

      if (isDragging) {
        if (currentVisualPosition) {
          const [sizeMultiplierX, sizeMultiplierY] = parseTokenSizeForDrag(tokenSize);
          let finalGridX = Math.round(currentVisualPosition.x / cellSize);
          let finalGridY = Math.round(currentVisualPosition.y / cellSize);
          
          finalGridX = Math.max(0, Math.min(finalGridX, pageSettings.widthInUnits - Math.ceil(sizeMultiplierX)));
          finalGridY = Math.max(0, Math.min(finalGridY, pageSettings.heightInUnits - Math.ceil(sizeMultiplierY)));
          onMove(instanceId, finalGridX, finalGridY);
        }
        onDragEnd(instanceId);
      } else if (activeTool === Tool.SELECT && timeSinceClickStart < CLICK_THRESHOLD_MS && event.button === 0) {
        onSelectInstance(instanceId);
      }

      setIsDragging(false);
      setDragStartMouseOffset(null);
      setCurrentVisualPosition(null); 
    };

    if (dragStartMouseOffset) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (document.body.style.cursor === 'grabbing') {
        document.body.style.cursor = 'default';
      }
    };
  }, [
    isDragging,
    dragStartMouseOffset,
    currentVisualPosition,
    clickStartTimestamp,
    instanceId,
    tokenSize,
    cellSize,
    pageSettings,
    activeTool,
    getSVGPoint,
    onMove,
    onDragStart,
    onDragMove,
    onDragEnd,
    onSelectInstance,
  ]);

  const displayPosition =
    isDragging && currentVisualPosition
      ? currentVisualPosition
      : { x: initialGridX * cellSize, y: initialGridY * cellSize };

  return {
    isDragging,
    displayPosition,
    dragHandlers: {
      onMouseDown: handleMouseDown,
    },
  };
};