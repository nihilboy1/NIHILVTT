import React from "react";
import { useGameBoard } from "../model/contexts/GameBoardContext";

export const GridLayer: React.FC = () => {
  const { gridSettings, pageSettings, zoomLevel } = useGameBoard();
  const gridStrokeWidth = 0.5 / zoomLevel;
  const dynamicGridStrokeWidth = Math.min(0.8, Math.max(0.2, gridStrokeWidth));
  const pageBorderStrokeWidth = Math.max(0.5, 1 / zoomLevel);
  const pageActualWidth =
    pageSettings.widthInUnits * gridSettings.visualCellSize;
  const pageActualHeight =
    pageSettings.heightInUnits * gridSettings.visualCellSize;
  const originMarkerScreenOffset = 20;
  const originMarkerWorldOffset = originMarkerScreenOffset / zoomLevel;

  return (
    <>
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
          fill="var(--color-accent-primary)"
          className="select-none"
        >
          0,0
        </text>
      </g>
    </>
  );
};
