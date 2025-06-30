import { Point, Tool } from "../../../../shared/api/types";
import { useCallback, useEffect } from "react";

interface UseGameBoardEventsProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  activeTool: Tool;
  isPanning: boolean;
  handlePanStart: (point: Point) => void;
  handlePanMove: (event: MouseEvent) => void;
  handlePanEnd: () => void;
  handleRulerMouseDown: (event: React.MouseEvent<SVGSVGElement>) => void;
  handleRulerMouseMove: (event: MouseEvent) => void;
  handleRulerMouseUp: (event: MouseEvent) => void;
  handleRulerRightClick: (event: React.MouseEvent<SVGSVGElement>) => void;
  handleMarqueeMouseDown: (event: React.MouseEvent<SVGSVGElement>) => void;
  handleMarqueeMouseMove: (event: MouseEvent) => void;
  handleMarqueeMouseUp: (event: MouseEvent) => void;
  onBackgroundClick: (() => void) | undefined;
  onClearMultiSelection: () => void;
}

export const useGameBoardEvents = ({
  svgRef,
  activeTool,
  isPanning,
  handlePanStart,
  handlePanMove,
  handlePanEnd,
  handleRulerMouseDown,
  handleRulerMouseMove,
  handleRulerMouseUp,
  handleRulerRightClick,
  handleMarqueeMouseDown,
  handleMarqueeMouseMove,
  handleMarqueeMouseUp,
  onBackgroundClick,
}: UseGameBoardEventsProps) => {
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      const isRMB = event.button === 2;
      const isLMB = event.button === 0;
      const targetElement = event.target as SVGElement;
      const isTokenClick = targetElement.closest(".board-token-group");

      // If it's a token click, let useBoardTokenDrag handle it.
      if (isTokenClick) return;

      // If it's a background click (not on a token)
      if (isLMB) {
        // Always call onBackgroundClick for a left-click on the background
        if (onBackgroundClick) {
          onBackgroundClick();
        }

        if (activeTool === Tool.SELECT) {
          handleMarqueeMouseDown(event);
        } else if (activeTool === Tool.PAN) {
          handlePanStart({ x: event.clientX, y: event.clientY });
        } else if (activeTool === Tool.RULER) {
          handleRulerMouseDown(event);
        }
        // No 'else' needed here, as onBackgroundClick is already called
      }

      if (isRMB) {
        event.preventDefault();
        if (activeTool === Tool.RULER) {
          handleRulerRightClick(event);
        } else {
          handlePanStart({ x: event.clientX, y: event.clientY });
        }
        return;
      }
    },
    [
      activeTool,
      onBackgroundClick,
      handleMarqueeMouseDown,
      handlePanStart,
      handleRulerMouseDown,
      handleRulerRightClick,
    ]
  );

  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (isPanning) {
        handlePanMove(event);
      } else if (activeTool === Tool.RULER) {
        handleRulerMouseMove(event);
      } else if (activeTool === Tool.SELECT) {
        handleMarqueeMouseMove(event);
      }
    };

    const handleGlobalMouseUp = (event: MouseEvent) => {
      if (isPanning) {
        handlePanEnd();
      } else if (activeTool === Tool.RULER) {
        handleRulerMouseUp(event);
      } else if (activeTool === Tool.SELECT) {
        handleMarqueeMouseUp(event);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [
    activeTool,
    isPanning,
    handlePanMove,
    handlePanEnd,
    handleRulerMouseMove,
    handleRulerMouseUp,
    handleMarqueeMouseMove,
    handleMarqueeMouseUp,
  ]);

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
        svgRef.current.classList.add("cursor-crosshair");
      } else if (activeTool === Tool.RULER) {
        svgRef.current.classList.add("cursor-crosshair");
      } else {
        svgRef.current.classList.add("cursor-default");
      }
    }
  }, [activeTool, isPanning, svgRef]);

  return {
    handleMouseDown,
  };
};
