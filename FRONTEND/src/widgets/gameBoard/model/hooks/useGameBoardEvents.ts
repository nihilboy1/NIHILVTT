import { useCallback, useEffect } from 'react';

import { Point, Tool } from '../../../../shared/api/types';

interface UseGameBoardEventsProps {
  viewportRef: React.RefObject<HTMLElement | null>;
  activeTool: Tool;
  getWorldPoint: (clientX: number, clientY: number) => Point;
  isPanning: boolean;
  handlePanStart: (point: Point) => void;
  handlePanMove: (event: MouseEvent) => void;
  handlePanEnd: (event: MouseEvent) => void;
  handleRulerMouseDown: (event: React.MouseEvent<Element>) => void;
  handleRulerMouseMove: (event: MouseEvent) => void;
  handleRulerMouseUp: (event: MouseEvent) => void;
  handleRulerRightClick: (event: React.MouseEvent<Element>) => void;
  handleMarqueeMouseDown: (event: React.MouseEvent<Element>) => void;
  handleMarqueeMouseMove: (event: MouseEvent) => void;
  handleMarqueeMouseUp: (event: MouseEvent) => void;
  onBoardSelectAtPoint?: (point: Point) => boolean;
  onBoardPointerDownAtPoint?: (point: Point, event: React.MouseEvent<Element>) => boolean;
  onBackgroundClick: (() => void) | undefined;
}

export const useGameBoardEvents = ({
  viewportRef,
  activeTool,
  getWorldPoint,
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
  onBoardSelectAtPoint,
  onBoardPointerDownAtPoint,
  onBackgroundClick,
}: UseGameBoardEventsProps) => {
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<Element>) => {
      const isRMB = event.button === 2;
      const isLMB = event.button === 0;

      // If it's a background click (not on a token)
      if (isLMB) {
        if (activeTool === Tool.SELECT) {
          const point = getWorldPoint(event.clientX, event.clientY);
          const handledByPointerDown = onBoardPointerDownAtPoint?.(point, event) ?? false;
          if (handledByPointerDown) {
            return;
          }
          const pickedOnBoard = onBoardSelectAtPoint?.(point) ?? false;
          if (!pickedOnBoard && onBackgroundClick) {
            onBackgroundClick();
          }
          if (pickedOnBoard) {
            return;
          }
          handleMarqueeMouseDown(event);
        } else if (activeTool === Tool.PAN) {
          if (onBackgroundClick) {
            onBackgroundClick();
          }
          handlePanStart({ x: event.clientX, y: event.clientY });
        } else if (activeTool === Tool.RULER) {
          if (onBackgroundClick) {
            onBackgroundClick();
          }
          handleRulerMouseDown(event);
        } else if (onBackgroundClick) {
          onBackgroundClick();
        }
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
      onBoardSelectAtPoint,
      onBoardPointerDownAtPoint,
      getWorldPoint,
      handleMarqueeMouseDown,
      handlePanStart,
      handleRulerMouseDown,
      handleRulerRightClick,
    ],
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
        handlePanEnd(event);
      } else if (activeTool === Tool.RULER) {
        handleRulerMouseUp(event);
      } else if (activeTool === Tool.SELECT) {
        handleMarqueeMouseUp(event);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
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
    if (viewportRef.current) {
      viewportRef.current.classList.remove(
        'cursor-default',
        'cursor-grab',
        'cursor-grabbing',
        'cursor-pointer',
        'cursor-crosshair',
      );
      if (isPanning) {
        viewportRef.current.classList.add('cursor-grabbing');
      } else if (activeTool === Tool.PAN) {
        viewportRef.current.classList.add('cursor-grab');
      } else if (activeTool === Tool.SELECT) {
        viewportRef.current.classList.add('cursor-crosshair');
      } else if (activeTool === Tool.RULER) {
        viewportRef.current.classList.add('cursor-crosshair');
      } else {
        viewportRef.current.classList.add('cursor-default');
      }
    }
  }, [activeTool, isPanning, viewportRef]);

  return {
    handleMouseDown,
  };
};
