import React from "react";
import { RulerPointData } from "../../../shared/api/types";
import { calculateDistanceInMeters } from "../../../shared/lib/utils/board/boardUtils";
import { useGameBoard } from "../../../widgets/gameBoard/model/contexts/GameBoardContext";

export const RulerLayer: React.FC = () => {
  const { rulerPath, zoomLevel, gridSettings } = useGameBoard();
  const rulerLineStrokeWidth = 2.5 / zoomLevel;
  const rulerWaypointRadius = 6 / zoomLevel;
  const rulerTextFontSize = 12 / zoomLevel;
  const rulerTextBgPadding = 5 / zoomLevel;
  const rulerTextBgRx = 3 / zoomLevel;

  return (
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
              stroke="var(--color-accent-primary)"
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
            fill="var(--color-accent-primary)"
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
          const textContent = wp.cumulativeDistanceMeters.toFixed(1) + "m";
          const estimatedTextWidth =
            textContent.length * rulerTextFontSize * 0.55;
          const textBgWidth = estimatedTextWidth + rulerTextBgPadding * 2;
          const textBgHeight = rulerTextFontSize + rulerTextBgPadding * 1.5;
          const textX = wp.point.x;
          const textY =
            wp.point.y - rulerWaypointRadius - textBgHeight / 2 - 2 / zoomLevel;
          waypointTextElement = (
            <g key={`wp-text-group-${index}`}>
              <rect
                x={textX - textBgWidth / 2}
                y={textY - textBgHeight * 0.65}
                width={textBgWidth}
                height={textBgHeight}
                fill="var(--color-accent-primary)"
                rx={rulerTextBgRx}
                ry={rulerTextBgRx}
              />
              <text
                x={textX}
                y={textY}
                fontSize={rulerTextFontSize}
                fill="var(--color-text-primary)"
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
              stroke="var(--color-accent-secondary)"
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
              const textBgWidth = estimatedTextWidth + rulerTextBgPadding * 2;
              const textBgHeight = rulerTextFontSize + rulerTextBgPadding * 1.5;
              const textX = rulerPath.liveEndPoint.x + 10 / zoomLevel;
              const textY = rulerPath.liveEndPoint.y - 10 / zoomLevel;
              return (
                <g>
                  <rect
                    x={textX - rulerTextBgPadding}
                    y={textY - textBgHeight * 0.65}
                    width={textBgWidth}
                    height={textBgHeight}
                    fill="var(--color-accent-secondary)"
                    rx={rulerTextBgRx}
                    ry={rulerTextBgRx}
                  />
                  <text
                    x={textX}
                    y={textY}
                    fontSize={rulerTextFontSize}
                    fill="var(--color-text-primary)"
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
  );
};
