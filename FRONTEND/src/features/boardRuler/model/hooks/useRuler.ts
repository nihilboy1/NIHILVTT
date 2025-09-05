import { useCallback, useState } from 'react';

import { calculateDistanceInMeters } from '../../../../entities/board/model/utils/boardUtils';
import {
  GridSettings,
  Point,
  RulerPathState,
  RulerPlacementMode,
  RulerPointData,
} from '../../../../shared/api/types';

interface UseRulerProps {
  activeTool: string; // Tool.RULER
  rulerPlacementMode: RulerPlacementMode;
  rulerPersists: boolean;
  gridSettings: GridSettings;
  getSVGPoint: (clientX: number, clientY: number) => Point;
}

export function useRuler({
  activeTool,
  rulerPlacementMode,
  rulerPersists,
  gridSettings,
  getSVGPoint,
}: UseRulerProps) {
  const [rulerPath, setRulerPath] = useState<RulerPathState>({
    isActive: false,
    points: [],
    liveEndPoint: null,
  });

  const snapToGridCenter = useCallback((point: Point, cellSize: number): Point => {
    const gridX = Math.floor(point.x / cellSize);
    const gridY = Math.floor(point.y / cellSize);
    const centerX = gridX * cellSize + cellSize / 2;
    const centerY = gridY * cellSize + cellSize / 2;
    return { x: centerX, y: centerY };
  }, []);

  const handleRulerMouseDown = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      if (activeTool !== 'RULER') return;

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
    },
    [activeTool, getSVGPoint, rulerPlacementMode, snapToGridCenter, gridSettings.visualCellSize],
  );

  const handleRulerMouseMove = useCallback(
    (event: MouseEvent) => {
      if (rulerPath.isActive && activeTool === 'RULER') {
        const currentPointSvg = getSVGPoint(event.clientX, event.clientY);
        const currentPoint =
          rulerPlacementMode === RulerPlacementMode.SNAP_TO_CENTER
            ? snapToGridCenter(currentPointSvg, gridSettings.visualCellSize)
            : currentPointSvg;
        setRulerPath((prev) => ({ ...prev, liveEndPoint: currentPoint }));
      }
    },
    [
      rulerPath.isActive,
      activeTool,
      getSVGPoint,
      rulerPlacementMode,
      snapToGridCenter,
      gridSettings.visualCellSize,
    ],
  );

  const handleRulerMouseUp = useCallback(
    (event: MouseEvent) => {
      if (activeTool !== 'RULER' || event.button !== 0) return;

      let finalPointsArray = [...rulerPath.points];
      if (rulerPath.liveEndPoint && rulerPath.points.length > 0) {
        const lastFixedPointData = rulerPath.points[rulerPath.points.length - 1];
        const distanceToWaypoint = calculateDistanceInMeters(
          lastFixedPointData.point,
          rulerPath.liveEndPoint,
          gridSettings.visualCellSize,
          gridSettings.metersPerSquare,
        );
        const newCumulativeDistance =
          lastFixedPointData.cumulativeDistanceMeters + distanceToWaypoint;
        finalPointsArray.push({
          point: rulerPath.liveEndPoint,
          cumulativeDistanceMeters: newCumulativeDistance,
        });
      } else if (rulerPath.liveEndPoint && rulerPath.points.length === 0) {
        finalPointsArray = [{ point: rulerPath.liveEndPoint, cumulativeDistanceMeters: 0 }];
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
    },
    [
      activeTool,
      rulerPath,
      gridSettings.visualCellSize,
      gridSettings.metersPerSquare,
      rulerPersists,
    ],
  );

  const handleRulerRightClick = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      event.preventDefault();
      if (activeTool === 'RULER' && rulerPath.isActive) {
        if (!rulerPath.liveEndPoint || rulerPath.points.length === 0) return;
        const lastFixedPointData = rulerPath.points[rulerPath.points.length - 1];
        const distanceToWaypoint = calculateDistanceInMeters(
          lastFixedPointData.point,
          rulerPath.liveEndPoint,
          gridSettings.visualCellSize,
          gridSettings.metersPerSquare,
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
      }
    },
    [activeTool, rulerPath, gridSettings.visualCellSize, gridSettings.metersPerSquare],
  );

  const clearRuler = useCallback(() => {
    setRulerPath({ isActive: false, points: [], liveEndPoint: null });
  }, []);

  return {
    rulerPath,
    handleRulerMouseDown,
    handleRulerMouseMove,
    handleRulerMouseUp,
    handleRulerRightClick,
    clearRuler,
  };
}
