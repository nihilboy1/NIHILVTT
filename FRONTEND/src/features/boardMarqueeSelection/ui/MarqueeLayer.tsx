import { MarqueeSelectionState } from "../../../shared/api/types";
interface MarqueeLayerProps {
  marqueeSelection: MarqueeSelectionState;
  zoomLevel: number;
}

export function MarqueeLayer({
  marqueeSelection,
  zoomLevel,
}: MarqueeLayerProps) {
  const marqueeRectProps =
    marqueeSelection.isActive &&
    marqueeSelection.startPoint &&
    marqueeSelection.currentPoint
      ? {
          x: Math.min(
            marqueeSelection.startPoint.x,
            marqueeSelection.currentPoint.x,
          ),
          y: Math.min(
            marqueeSelection.startPoint.y,
            marqueeSelection.currentPoint.y,
          ),
          width: Math.abs(
            marqueeSelection.startPoint.x - marqueeSelection.currentPoint.x,
          ),
          height: Math.abs(
            marqueeSelection.startPoint.y - marqueeSelection.currentPoint.y,
          ),
        }
      : null;

  return (
    <>
      {marqueeRectProps && (
        <rect
          {...marqueeRectProps}
          fill="var(--color-accent-primary)"
          fillOpacity="0.8"
          stroke="var(--color-accent-primary)"
          strokeWidth={1 / zoomLevel}
          strokeDasharray={`${4 / zoomLevel} ${2 / zoomLevel}`}
        />
      )}
    </>
  );
}
