import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  INITIAL_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  ZOOM_SENSITIVITY,
} from "../../constants";
import {
  Tool,
  RulerPlacementMode,
  type Point,
  type RulerPathState,
  type RulerPointData,
  type Token as TokenInfo,
  type DraggingVisuals,
  type GridInstance,
  type MarqueeSelectionState,
} from "../../types/index"; // Ajustar o caminho do tipo
import { PageConfigIcon } from "../../components/icons"; // Ajustar o caminho do componente
import { PageSettingsModal } from "../../components/modals/PageSettingsModal"; // Ajustar o caminho do componente
import { BoardToken } from "../../components/token/BoardToken"; // Ajustar o caminho do componente
import { useTokens } from "../../contexts/TokensContext"; // Ajustar o caminho do contexto
import { useBoardSettings } from "../../contexts/BoardSettingsContext"; // Ajustar o caminho do contexto
import { useUI } from "../../contexts/UIContext"; // Ajustar o caminho do contexto
import {
  parseTokenSize,
  calculateInitialViewBox,
  calculateDistanceInMeters,
} from "../../utils/board/boardUtils"; // Importar as funções utilitárias

interface GameBoardProps {
  onGridInstanceSelectForHPModal?: (
    instanceId: string,
    tokenScreenRect: DOMRect | null
  ) => void;
  onBackgroundClick?: () => void;
  activeHPModalInstanceId?: string | null;
  onHPModalAnchorShouldUpdate?: (
    instanceId: string,
    newScreenRect: DOMRect | null
  ) => void;
  draggingVisuals: DraggingVisuals;
  onGridInstanceDragStart: (instanceId: string) => void;
  onGridInstanceDragMove: (instanceId: string, visualSVGPoint: Point) => void;
  onGridInstanceDragEnd: (instanceId: string) => void;
  multiSelectedInstanceIds: string[];
  onSetMultiSelectedInstanceIds: (ids: string[]) => void;
  onClearMultiSelection: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  onGridInstanceSelectForHPModal,
  onBackgroundClick,
  activeHPModalInstanceId,
  onHPModalAnchorShouldUpdate,
  draggingVisuals,
  onGridInstanceDragStart,
  onGridInstanceDragMove,
  onGridInstanceDragEnd,
  multiSelectedInstanceIds,
  onSetMultiSelectedInstanceIds,
  onClearMultiSelection,
}) => {
  const { tokens, gridInstances, addGridInstance, updateGridInstancePosition } =
    useTokens();
  const { gridSettings, pageSettings, rulerPlacementMode, rulerPersists } =
    useBoardSettings();
  const { activeTool } = useUI();

  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: 1000,
    height: 800,
  });
  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM_LEVEL);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState<Point | null>(null);
  const [isPageAndGridSettingsModalOpen, setIsPageAndGridSettingsModalOpen] =
    useState(false);
  const [rulerPath, setRulerPath] = useState<RulerPathState>({
    isActive: false,
    points: [],
    liveEndPoint: null,
  });
  const [marqueeSelection, setMarqueeSelection] =
    useState<MarqueeSelectionState>({
      isActive: false,
      startPoint: null,
      currentPoint: null,
    });

  const getViewportDimensions = useCallback(() => {
    if (svgRef.current) {
      return {
        width: svgRef.current.clientWidth,
        height: svgRef.current.clientHeight,
      };
    }
    return { width: 1000, height: 800 };
  }, []);

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
    [viewBox.x, viewBox.y, zoomLevel]
  );

  const getInstanceScreenRect = useCallback(
    (
      instance: GridInstance,
      tokenInfo: TokenInfo | undefined,
      liveSVGPoint?: Point
    ): DOMRect | null => {
      if (!svgRef.current || !tokenInfo) return null;

      const svgGlobalRect = svgRef.current.getBoundingClientRect();
      const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(tokenInfo.size);

      let instanceWorldX, instanceWorldY;
      if (liveSVGPoint) {
        instanceWorldX = liveSVGPoint.x;
        instanceWorldY = liveSVGPoint.y;
      } else {
        instanceWorldX = instance.gridX * gridSettings.visualCellSize;
        instanceWorldY = instance.gridY * gridSettings.visualCellSize;
      }

      const instanceWorldWidth = sizeMultiplierX * gridSettings.visualCellSize;
      const instanceWorldHeight = sizeMultiplierY * gridSettings.visualCellSize;

      const screenX =
        (instanceWorldX - viewBox.x) * zoomLevel + svgGlobalRect.left;
      const screenY =
        (instanceWorldY - viewBox.y) * zoomLevel + svgGlobalRect.top;
      const screenWidth = instanceWorldWidth * zoomLevel;
      const screenHeight = instanceWorldHeight * zoomLevel;

      return {
        x: screenX,
        y: screenY,
        width: screenWidth,
        height: screenHeight,
        top: screenY,
        right: screenX + screenWidth,
        bottom: screenY + screenHeight,
        left: screenX,
        toJSON: () => ({}),
      } as DOMRect;
    },
    [viewBox, zoomLevel, gridSettings.visualCellSize]
  );

  useEffect(() => {
    if (activeHPModalInstanceId && onHPModalAnchorShouldUpdate) {
      const instanceToUpdate = gridInstances.find(
        (gi: GridInstance) => gi.instanceId === activeHPModalInstanceId
      );
      if (instanceToUpdate) {
        const tokenInfo = tokens.find(
          (t: TokenInfo) => t.id === instanceToUpdate.tokenInfoId
        );
        let livePointForCalc: Point | undefined = undefined;
        if (
          draggingVisuals.instanceId === activeHPModalInstanceId &&
          draggingVisuals.visualSVGPoint
        ) {
          livePointForCalc = draggingVisuals.visualSVGPoint;
        }
        const newScreenRect = getInstanceScreenRect(
          instanceToUpdate,
          tokenInfo,
          livePointForCalc
        );
        onHPModalAnchorShouldUpdate(activeHPModalInstanceId, newScreenRect);
      }
    }
  }, [
    viewBox,
    zoomLevel,
    activeHPModalInstanceId,
    gridInstances,
    tokens,
    draggingVisuals,
    onHPModalAnchorShouldUpdate,
    getInstanceScreenRect,
  ]);

  const snapToGridCenter = useCallback(
    (point: Point, cellSize: number): Point => {
      const gridX = Math.floor(point.x / cellSize);
      const gridY = Math.floor(point.y / cellSize);
      const centerX = gridX * cellSize + cellSize / 2;
      const centerY = gridY * cellSize + cellSize / 2;
      return { x: centerX, y: centerY };
    },
    []
  );

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    const isRMB = event.button === 2;
    const isLMB = event.button === 0;
    const targetElement = event.target as SVGElement;
    const isTokenClick = targetElement.closest(".board-token-group");

    if (activeHPModalInstanceId && isLMB && !isTokenClick) {
      event.preventDefault();
      return;
    }

    if (isTokenClick) return;

    if (isLMB && !activeHPModalInstanceId) {
      if (activeTool === Tool.SELECT) {
        if (onBackgroundClick) onBackgroundClick();
        onClearMultiSelection();
        const startPt = getSVGPoint(event.clientX, event.clientY);
        setMarqueeSelection({
          isActive: true,
          startPoint: startPt,
          currentPoint: startPt,
        });
      } else if (activeTool === Tool.PAN) {
        setIsPanning(true);
        setLastPanPoint({ x: event.clientX, y: event.clientY });
        if (svgRef.current) svgRef.current.classList.add("cursor-grabbing");
      } else if (activeTool === Tool.RULER) {
        const startPointSvg = getSVGPoint(event.clientX, event.clientY);
        const startPoint =
          rulerPlacementMode === RulerPlacementMode.SNAP_TO_CENTER
            ? snapToGridCenter(startPointSvg, gridSettings.visualCellSize)
            : startPointSvg;
        setRulerPath({
          isActive: true,
          points: [{ point: startPoint, cumulativeDistanceMeters: 0 }],
          liveEndPoint: startPoint,
        });
      } else {
        if (onBackgroundClick) onBackgroundClick();
      }
    }

    if (isRMB) {
      event.preventDefault();
      if (activeTool === Tool.RULER && rulerPath.isActive) {
        if (!rulerPath.liveEndPoint || rulerPath.points.length === 0) return;
        const lastFixedPointData =
          rulerPath.points[rulerPath.points.length - 1];
        const distanceToWaypoint = calculateDistanceInMeters(
          lastFixedPointData.point,
          rulerPath.liveEndPoint,
          gridSettings.visualCellSize,
          gridSettings.metersPerSquare
        );
        const newCumulativeDistance =
          lastFixedPointData.cumulativeDistanceMeters + distanceToWaypoint;
        const newWaypoint: RulerPointData = {
          point: rulerPath.liveEndPoint,
          cumulativeDistanceMeters: newCumulativeDistance,
        };
        setRulerPath((prev) => ({
          ...prev,
          points: [...prev.points, newWaypoint],
        }));
      } else {
        setIsPanning(true);
        setLastPanPoint({ x: event.clientX, y: event.clientY });
        if (svgRef.current) svgRef.current.classList.add("cursor-grabbing");
      }
      return;
    }

    if (isLMB) {
      if (activeTool === Tool.PAN) {
        setIsPanning(true);
        setLastPanPoint({ x: event.clientX, y: event.clientY });
        if (svgRef.current) svgRef.current.classList.add("cursor-grabbing");
      } else if (activeTool === Tool.RULER) {
        const startPointSvg = getSVGPoint(event.clientX, event.clientY);
        const startPoint =
          rulerPlacementMode === RulerPlacementMode.SNAP_TO_CENTER
            ? snapToGridCenter(startPointSvg, gridSettings.visualCellSize)
            : startPointSvg;
        setRulerPath({
          isActive: true,
          points: [{ point: startPoint, cumulativeDistanceMeters: 0 }],
          liveEndPoint: startPoint,
        });
      }
    }
  };

  const handleMouseMove = useCallback(
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
      } else if (rulerPath.isActive && activeTool === Tool.RULER) {
        const currentPointSvg = getSVGPoint(event.clientX, event.clientY);
        const currentPoint =
          rulerPlacementMode === RulerPlacementMode.SNAP_TO_CENTER
            ? snapToGridCenter(currentPointSvg, gridSettings.visualCellSize)
            : currentPointSvg;
        setRulerPath((prev) => ({ ...prev, liveEndPoint: currentPoint }));
      } else if (marqueeSelection.isActive && activeTool === Tool.SELECT) {
        const currentPt = getSVGPoint(event.clientX, event.clientY);
        setMarqueeSelection((prev) => ({ ...prev, currentPoint: currentPt }));
      }
    },
    [
      isPanning,
      lastPanPoint,
      zoomLevel,
      activeTool,
      getSVGPoint,
      gridSettings.visualCellSize,
      rulerPath.isActive,
      snapToGridCenter,
      rulerPlacementMode,
      marqueeSelection.isActive,
    ]
  );

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (isPanning) {
        setIsPanning(false);
        setLastPanPoint(null);
        if (svgRef.current) svgRef.current.classList.remove("cursor-grabbing");
      }

      if (
        rulerPath.isActive &&
        activeTool === Tool.RULER &&
        event.button === 0
      ) {
        let finalPointsArray = [...rulerPath.points];
        if (rulerPath.liveEndPoint && rulerPath.points.length > 0) {
          const lastFixedPoint = rulerPath.points[rulerPath.points.length - 1];
          if (
            rulerPath.liveEndPoint.x !== lastFixedPoint.point.x ||
            rulerPath.liveEndPoint.y !== lastFixedPoint.point.y ||
            (rulerPath.points.length === 1 &&
              rulerPath.points[0].point.x === lastFixedPoint.point.x &&
              rulerPath.points[0].point.y === lastFixedPoint.point.y)
          ) {
            const distanceToFinalPoint = calculateDistanceInMeters(
              lastFixedPoint.point,
              rulerPath.liveEndPoint,
              gridSettings.visualCellSize,
              gridSettings.metersPerSquare
            );
            const cumulativeAtFinalPoint =
              lastFixedPoint.cumulativeDistanceMeters + distanceToFinalPoint;
            finalPointsArray.push({
              point: rulerPath.liveEndPoint,
              cumulativeDistanceMeters: cumulativeAtFinalPoint,
            });
          }
        } else if (rulerPath.liveEndPoint && rulerPath.points.length === 0) {
          finalPointsArray = [
            { point: rulerPath.liveEndPoint, cumulativeDistanceMeters: 0 },
          ];
        }

        if (rulerPersists) {
          setRulerPath({
            isActive: false,
            points: finalPointsArray,
            liveEndPoint: null,
          });
        } else {
          setRulerPath({ isActive: false, points: [], liveEndPoint: null });
        }
      }

      if (
        marqueeSelection.isActive &&
        marqueeSelection.startPoint &&
        marqueeSelection.currentPoint &&
        activeTool === Tool.SELECT
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
    },
    [
      isPanning,
      activeTool,
      rulerPath,
      gridSettings.visualCellSize,
      gridSettings.metersPerSquare,
      rulerPersists,
      marqueeSelection,
      tokens,
      gridInstances,
      onSetMultiSelectedInstanceIds,
    ]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleWheel = (event: React.WheelEvent<SVGSVGElement>) => {
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
  };

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.classList.remove(
        "cursor-default",
        "cursor-grab",
        "cursor-grabbing",
        "cursor-pointer",
        "cursor-crosshair"
      );
      if (isPanning) {
        svgRef.current.classList.add("cursor-grabbing");
      } else if (activeTool === Tool.PAN) {
        svgRef.current.classList.add("cursor-grab");
      } else if (activeTool === Tool.SELECT) {
        svgRef.current.classList.add(
          marqueeSelection.isActive ? "cursor-crosshair" : "cursor-default"
        );
      } else if (activeTool === Tool.RULER) {
        svgRef.current.classList.add("cursor-crosshair");
      } else {
        svgRef.current.classList.add("cursor-default");
      }
    }
  }, [activeTool, isPanning, marqueeSelection.isActive]);

  useEffect(() => {
    if (activeTool !== Tool.RULER && rulerPath.points.length > 0) {
      setRulerPath({ isActive: false, points: [], liveEndPoint: null });
    }
    if (activeTool !== Tool.SELECT && marqueeSelection.isActive) {
      setMarqueeSelection({
        isActive: false,
        startPoint: null,
        currentPoint: null,
      });
    }
  }, [activeTool, rulerPath.points.length, marqueeSelection.isActive]);

  const handleDragOver = (event: React.DragEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleTokenDrop = (event: React.DragEvent<SVGSVGElement>) => {
    event.preventDefault();
    const tokenInfoId = event.dataTransfer.getData(
      "application/vtt-token-info-id"
    );
    if (tokenInfoId) {
      const tokenSheet = tokens.find((t) => t.id === tokenInfoId);
      if (!tokenSheet) return;

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

      const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(
        tokenSheet.size
      );
      let gridX = Math.floor(dropPoint.x / cellSize);
      let gridY = Math.floor(dropPoint.y / cellSize);

      gridX = Math.max(
        0,
        Math.min(gridX, pageSettings.widthInUnits - Math.ceil(sizeMultiplierX))
      );
      gridY = Math.max(
        0,
        Math.min(gridY, pageSettings.heightInUnits - Math.ceil(sizeMultiplierY))
      );

      addGridInstance(tokenInfoId, gridX, gridY);
    }
  };

  const gridStrokeWidth = 0.5 / zoomLevel;
  const dynamicGridStrokeWidth = Math.min(0.8, Math.max(0.2, gridStrokeWidth));
  const rulerLineStrokeWidth = 2.5 / zoomLevel;
  const rulerWaypointRadius = 6 / zoomLevel;
  const rulerTextFontSize = 12 / zoomLevel;
  const pageBorderStrokeWidth = Math.max(0.5, 1 / zoomLevel);
  const pageActualWidth =
    pageSettings.widthInUnits * gridSettings.visualCellSize;
  const pageActualHeight =
    pageSettings.heightInUnits * gridSettings.visualCellSize;
  const originMarkerScreenOffset = 20;
  const originMarkerWorldOffset = originMarkerScreenOffset / zoomLevel;
  const rulerTextBgPadding = 5 / zoomLevel;
  const rulerTextBgRx = 3 / zoomLevel;
  const ZOOM_BUTTON_STEP = 0.1;
  const handleZoomIn = () =>
    setZoomLevel((prev) => Math.min(MAX_ZOOM_LEVEL, prev + ZOOM_BUTTON_STEP));
  const handleZoomOut = () =>
    setZoomLevel((prev) => Math.max(MIN_ZOOM_LEVEL, prev - ZOOM_BUTTON_STEP));

  const marqueeRectProps =
    marqueeSelection.isActive &&
    marqueeSelection.startPoint &&
    marqueeSelection.currentPoint
      ? {
          x: Math.min(
            marqueeSelection.startPoint.x,
            marqueeSelection.currentPoint.x
          ),
          y: Math.min(
            marqueeSelection.startPoint.y,
            marqueeSelection.currentPoint.y
          ),
          width: Math.abs(
            marqueeSelection.startPoint.x - marqueeSelection.currentPoint.x
          ),
          height: Math.abs(
            marqueeSelection.startPoint.y - marqueeSelection.currentPoint.y
          ),
        }
      : null;

  let multiSelectBoundingBox = null;
  if (multiSelectedInstanceIds.length > 0) {
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    let hasValidToken = false;

    multiSelectedInstanceIds.forEach((instanceId) => {
      const instance = gridInstances.find((gi) => gi.instanceId === instanceId);
      if (instance) {
        const tokenInfo = tokens.find((ti) => ti.id === instance.tokenInfoId);
        if (tokenInfo) {
          hasValidToken = true;
          const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(
            tokenInfo.size
          );
          const tokenWorldX = instance.gridX * gridSettings.visualCellSize;
          const tokenWorldY = instance.gridY * gridSettings.visualCellSize;
          const tokenWorldWidth = sizeMultiplierX * gridSettings.visualCellSize;
          const tokenWorldHeight =
            sizeMultiplierY * gridSettings.visualCellSize;

          minX = Math.min(minX, tokenWorldX);
          minY = Math.min(minY, tokenWorldY);
          maxX = Math.max(maxX, tokenWorldX + tokenWorldWidth);
          maxY = Math.max(maxY, tokenWorldY + tokenWorldHeight);
        }
      }
    });

    if (hasValidToken) {
      multiSelectBoundingBox = {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }
  }

  return (
    <div className="flex-grow bg-surface-0 relative overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        onContextMenu={(e) => e.preventDefault()}
        onDragOver={handleDragOver}
        onDrop={handleTokenDrop}
      >
        <defs>
          <pattern
            id="gridPattern"
            width={gridSettings.visualCellSize}
            height={gridSettings.visualCellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSettings.visualCellSize} 0 L 0 0 0 ${gridSettings.visualCellSize}`}
              fill="none"
              stroke={gridSettings.lineColor}
              strokeOpacity="0.4"
              strokeWidth={dynamicGridStrokeWidth}
            />
          </pattern>
          <filter
            id="pageDropShadow"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feDropShadow
              dx={2 / zoomLevel}
              dy={2 / zoomLevel}
              stdDeviation={3 / zoomLevel}
              floodColor="#000000"
              floodOpacity="0.3"
            />
          </filter>
          <filter
            id="tokenDragShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx={2.5 / zoomLevel}
              dy={3.5 / zoomLevel}
              stdDeviation={2 / zoomLevel}
              floodColor="#000000"
              floodOpacity="0.5"
            />
          </filter>
        </defs>

        <rect
          x="0"
          y="0"
          width={pageActualWidth}
          height={pageActualHeight}
          fill={pageSettings.backgroundColor}
          filter="url(#pageDropShadow)"
        />
        <rect
          x="0"
          y="0"
          width={pageActualWidth}
          height={pageActualHeight}
          fill="url(#gridPattern)"
          strokeWidth={pageBorderStrokeWidth}
        />
        <g
          transform={`translate(${-originMarkerWorldOffset}, ${-originMarkerWorldOffset})`}
        >
          <circle
            cx="0"
            cy="0"
            r={8 / zoomLevel}
            strokeWidth={pageBorderStrokeWidth}
          />
          <text
            x={12 / zoomLevel}
            y={3 / zoomLevel}
            fontSize={10 / zoomLevel}
            fill="var(--color-accent-primary)" // cor do
            className="select-none"
          >
            0,0
          </text>
        </g>

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
              onMove={(
                instanceId: string,
                newGridX: number,
                newGridY: number
              ) => updateGridInstancePosition(instanceId, newGridX, newGridY)}
              activeTool={activeTool}
              pageSettings={pageSettings}
              getSVGPoint={getSVGPoint}
              onGridInstanceSelectForHPModal={onGridInstanceSelectForHPModal}
              onGridInstanceDragStart={onGridInstanceDragStart}
              onGridInstanceDragMove={onGridInstanceDragMove}
              onGridInstanceDragEnd={onGridInstanceDragEnd}
              isMultiSelected={multiSelectedInstanceIds.includes(
                instance.instanceId
              )}
            />
          );
        })}

        {multiSelectBoundingBox && (
          <rect
            x={multiSelectBoundingBox.x}
            y={multiSelectBoundingBox.y}
            width={multiSelectBoundingBox.width}
            height={multiSelectBoundingBox.height}
            fill="none"
            stroke="var(--color-accent-primary)"
            strokeWidth={1.5 / zoomLevel}
            strokeOpacity="0.5"
          />
        )}

        {marqueeRectProps && (
          <rect
            {...marqueeRectProps}
            fill="var(--color-accent-primary)" // cor do bloco de seleção
            fillOpacity="0.8" /* Equivalente a CC em hexadecimal (204/255) */
            stroke="var(--color-accent-primary)" // cor do tracejado da ferramenta de seleção
            strokeWidth={1 / zoomLevel}
            strokeDasharray={`${4 / zoomLevel} ${2 / zoomLevel}`}
          />
        )}

        {rulerPath.points.length > 0 && (
          <g>
            {rulerPath.points.map((wp: RulerPointData, index: number) => {
              let segmentLine = null;
              if (index > 0) {
                const prevWp = rulerPath.points[index - 1];
                segmentLine = (
                  <line
                    key={`segment-${index}`}
                    x1={prevWp.point.x}
                    y1={prevWp.point.y}
                    x2={wp.point.x}
                    y2={wp.point.y}
                    stroke="var(--color-accent-primary)" // cor da linha fixada da regua
                    strokeWidth={rulerLineStrokeWidth}
                  />
                );
              }
              const waypointMarker = (
                <circle
                  key={`waypoint-marker-${index}`}
                  cx={wp.point.x}
                  cy={wp.point.y}
                  r={rulerWaypointRadius}
                  fill="var(--color-accent-primary)" // cor da bolinha do ponto fixado da regua
                  strokeWidth={0.5 / zoomLevel}
                />
              );
              let waypointTextElement = null;
              const showTextCondition =
                (rulerPath.points.length === 1 &&
                  !rulerPath.isActive &&
                  wp.cumulativeDistanceMeters > 0) ||
                (rulerPath.points.length > 1 && index > 0) ||
                (rulerPath.points.length > 1 &&
                  index === 0 &&
                  wp.cumulativeDistanceMeters === 0 &&
                  rulerPath.points[1]?.cumulativeDistanceMeters > 0) ||
                (index === 0 &&
                  rulerPath.points.length === 1 &&
                  rulerPath.isActive &&
                  wp.cumulativeDistanceMeters === 0);
              if (showTextCondition) {
                const textContent =
                  wp.cumulativeDistanceMeters.toFixed(1) + "m";
                const estimatedTextWidth =
                  textContent.length * rulerTextFontSize * 0.55;
                const textBgWidth = estimatedTextWidth + rulerTextBgPadding * 2;
                const textBgHeight =
                  rulerTextFontSize + rulerTextBgPadding * 1.5;
                const textX = wp.point.x;
                const textY =
                  wp.point.y -
                  rulerWaypointRadius -
                  textBgHeight / 2 -
                  2 / zoomLevel;
                waypointTextElement = (
                  <g key={`wp-text-group-${index}`}>
                    <rect
                      x={textX - textBgWidth / 2}
                      y={textY - textBgHeight * 0.65}
                      width={textBgWidth}
                      height={textBgHeight}
                      fill="var(--color-accent-secondary)" // cor do background do ponto fixado da regua
                      rx={rulerTextBgRx}
                      ry={rulerTextBgRx}
                    />
                    <text
                      x={textX}
                      y={textY}
                      fontSize={rulerTextFontSize}
                      fill="var(--color-text-secondary)" // cor do texto do ponto fixado da regua
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="select-none"
                    >
                      {textContent}
                    </text>
                  </g>
                );
              }
              return (
                <React.Fragment key={`wp-group-${index}`}>
                  {segmentLine}
                  {waypointMarker}
                  {waypointTextElement}
                </React.Fragment>
              );
            })}
            {rulerPath.isActive &&
              rulerPath.liveEndPoint &&
              rulerPath.points.length > 0 && (
                <>
                  <line
                    x1={rulerPath.points[rulerPath.points.length - 1].point.x}
                    y1={rulerPath.points[rulerPath.points.length - 1].point.y}
                    x2={rulerPath.liveEndPoint.x}
                    y2={rulerPath.liveEndPoint.y}
                    stroke="var(--color-accent-primary)" // cor da linha da regua enquanto arrasta
                    strokeWidth={rulerLineStrokeWidth}
                    strokeDasharray={`${6 / zoomLevel},${3 / zoomLevel}`}
                  />
                  {(() => {
                    const lastFixedPoint =
                      rulerPath.points[rulerPath.points.length - 1];
                    const currentTotalDistance =
                      lastFixedPoint.cumulativeDistanceMeters +
                      calculateDistanceInMeters(
                        lastFixedPoint.point,
                        rulerPath.liveEndPoint!,
                        gridSettings.visualCellSize,
                        gridSettings.metersPerSquare
                      );
                    const textContent = currentTotalDistance.toFixed(1) + "m";
                    const estimatedTextWidth =
                      textContent.length * rulerTextFontSize * 0.55;
                    const textBgWidth =
                      estimatedTextWidth + rulerTextBgPadding * 2;
                    const textBgHeight =
                      rulerTextFontSize + rulerTextBgPadding * 1.5;
                    const textX = rulerPath.liveEndPoint.x + 10 / zoomLevel;
                    const textY = rulerPath.liveEndPoint.y - 10 / zoomLevel;
                    return (
                      <g>
                        <rect
                          x={textX - rulerTextBgPadding}
                          y={textY - textBgHeight * 0.65}
                          width={textBgWidth}
                          height={textBgHeight}
                          fill="var(--color-accent-primary)" // background da caixinha de medição da regua enquanto arrasta
                          rx={rulerTextBgRx}
                          ry={rulerTextBgRx}
                        />
                        <text
                          x={textX}
                          y={textY}
                          fontSize={rulerTextFontSize}
                          fill="var(--color-text-primary)" // texto da caixinha de medição da regua enquanto arrasta
                          textAnchor="start"
                          dominantBaseline="middle"
                          className="select-none"
                        >
                          {textContent}
                        </text>
                      </g>
                    );
                  })()}
                </>
              )}
          </g>
        )}
      </svg>
      <div className="bg-surface-0 absolute top-2 right-2 flex flex-col items-end space-y-2 rounded">
        <button
          onClick={() => setIsPageAndGridSettingsModalOpen(true)}
          className="hover:bg-accent-primary-hover p-2  rounded-md shadow-md  focus:outline-none focus:ring-2  cursor-pointer"
          aria-label="Configurações da Página e Grade"
          title="Configurações da Página e Grade"
        >
          <PageConfigIcon className="w-6 h-6 p-[0.1rem]" />
        </button>
        <div className="bg-opacity-80 p-2 rounded-md shadow-md flex flex-col items-center space-y-2 w-10">
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= MAX_ZOOM_LEVEL}
            className=" hover:bg-accent-primary-hover zoom-control-button p-1 rounded  disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2  cursor-pointer"
            aria-label="Aumentar zoom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </button>
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= MIN_ZOOM_LEVEL}
            className="hover:bg-accent-primary-hover zoom-control-button p-1 rounded  disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2  cursor-pointer"
            aria-label="Diminuir zoom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className="text-[0.6rem]">Zoom</span>
          <div className="bg-surface-3 text-xs px-2 p-1 rounded border -mt-[0.4rem]">
            {zoomLevel.toFixed(2)}x
          </div>
        </div>
      </div>
      <PageSettingsModal
        isOpen={isPageAndGridSettingsModalOpen}
        onClose={() => setIsPageAndGridSettingsModalOpen(false)}
      />
    </div>
  );
};
