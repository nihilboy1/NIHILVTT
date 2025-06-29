import { useCallback, useEffect, useState } from "react";
import { GridSettings, PageSettings, Point } from "../shared/api/types";
import {
  INITIAL_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
  ZOOM_SENSITIVITY,
} from "../shared/config/constants";
import { calculateInitialViewBox } from "../shared/lib/utils/board/boardUtils";

interface UseZoomAndPanProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  pageSettings: PageSettings;
  gridSettings: GridSettings;
}

export const useZoomAndPan = ({
  svgRef,
  pageSettings,
  gridSettings,
}: UseZoomAndPanProps) => {
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: 1000,
    height: 800,
  });
  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM_LEVEL);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState<Point | null>(null);

  const getViewportDimensions = useCallback(() => {
    if (svgRef.current) {
      return {
        width: svgRef.current.clientWidth,
        height: svgRef.current.clientHeight,
      };
    }
    return { width: 1000, height: 800 };
  }, [svgRef]);

  useEffect(() => {
    const viewport = getViewportDimensions();
    setViewBox(
      calculateInitialViewBox(
        pageSettings,
        gridSettings,
        viewport.width,
        viewport.height,
        INITIAL_ZOOM_LEVEL
      )
    );
    setZoomLevel(INITIAL_ZOOM_LEVEL);
  }, [
    pageSettings.widthInUnits,
    pageSettings.heightInUnits,
    gridSettings.visualCellSize,
    getViewportDimensions,
    pageSettings,
    gridSettings,
  ]);

  useEffect(() => {
    const viewport = getViewportDimensions();
    const newWidth = viewport.width / zoomLevel;
    const newHeight = viewport.height / zoomLevel;
    setViewBox((prev) => ({
      x: prev.x + (prev.width - newWidth) / 2,
      y: prev.y + (prev.height - newHeight) / 2,
      width: newWidth,
      height: newHeight,
    }));
  }, [zoomLevel, getViewportDimensions]);

  const getSVGPoint = useCallback(
    (clientX: number, clientY: number): Point => {
      if (!svgRef.current) return { x: 0, y: 0 };
      const svgRect = svgRef.current.getBoundingClientRect();
      const svgRectLeft = Math.round(svgRect.left);
      const svgRectTop = Math.round(svgRect.top);
      const svgX = clientX - svgRectLeft;
      const svgY = clientY - svgRectTop;
      const worldX = viewBox.x + svgX / zoomLevel;
      const worldY = viewBox.y + svgY / zoomLevel;
      return { x: worldX, y: worldY };
    },
    [viewBox.x, viewBox.y, zoomLevel, svgRef]
  );

  const handleWheel = useCallback(
    (event: React.WheelEvent<SVGSVGElement>) => {
      event.preventDefault();
      if (!svgRef.current) return;
      if ((event.target as SVGElement).closest(".board-token-group")) return;

      const newZoomFactor = 1 - event.deltaY * ZOOM_SENSITIVITY;
      const newZoomLevelUnclamped = zoomLevel * newZoomFactor;
      const newZoomLevel = Math.max(
        MIN_ZOOM_LEVEL,
        Math.min(MAX_ZOOM_LEVEL, newZoomLevelUnclamped)
      );
      if (newZoomLevel === zoomLevel) return;

      const svgRect = svgRef.current.getBoundingClientRect();
      const mouseX = event.clientX - Math.round(svgRect.left);
      const mouseY = event.clientY - Math.round(svgRect.top);
      const worldXBeforeZoom = viewBox.x + mouseX / zoomLevel;
      const worldYBeforeZoom = viewBox.y + mouseY / zoomLevel;
      const newViewBoxWidth = svgRect.width / newZoomLevel;
      const newViewBoxHeight = svgRect.height / newZoomLevel;
      const newViewBoxX = worldXBeforeZoom - mouseX / newZoomLevel;
      const newViewBoxY = worldYBeforeZoom - mouseY / newZoomLevel;
      setZoomLevel(newZoomLevel);
      setViewBox({
        x: newViewBoxX,
        y: newViewBoxY,
        width: newViewBoxWidth,
        height: newViewBoxHeight,
      });
    },
    [viewBox, zoomLevel, svgRef]
  );

  const handlePanStart = useCallback(
    (point: Point) => {
      setIsPanning(true);
      setLastPanPoint(point);
      if (svgRef.current) svgRef.current.classList.add("cursor-grabbing");
    },
    [svgRef]
  );

  const handlePanMove = useCallback(
    (event: MouseEvent) => {
      if (isPanning && lastPanPoint) {
        const dx = event.clientX - lastPanPoint.x;
        const dy = event.clientY - lastPanPoint.y;
        setViewBox((prev) => ({
          ...prev,
          x: prev.x - dx / zoomLevel,
          y: prev.y - dy / zoomLevel,
        }));
        setLastPanPoint({ x: event.clientX, y: event.clientY });
      }
    },
    [isPanning, lastPanPoint, zoomLevel]
  );

  const handlePanEnd = useCallback(() => {
    setIsPanning(false);
    setLastPanPoint(null);
    if (svgRef.current) svgRef.current.classList.remove("cursor-grabbing");
  }, [svgRef]);

  const ZOOM_BUTTON_STEP = 0.1;
  const handleZoomIn = useCallback(
    () =>
      setZoomLevel((prev) => Math.min(MAX_ZOOM_LEVEL, prev + ZOOM_BUTTON_STEP)),
    []
  );
  const handleZoomOut = useCallback(
    () =>
      setZoomLevel((prev) => Math.max(MIN_ZOOM_LEVEL, prev - ZOOM_BUTTON_STEP)),
    []
  );

  return {
    viewBox,
    zoomLevel,
    isPanning,
    getSVGPoint,
    handleWheel,
    handlePanStart,
    handlePanMove,
    handlePanEnd,
    handleZoomIn,
    handleZoomOut,
  };
};
