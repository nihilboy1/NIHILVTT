import { create } from 'zustand';

import { GridSettings, PageSettings, Point } from '@/shared/api/types';
import { ZOOM_CONFIG } from '@/shared/config/constants';
import { calculateInitialViewBox } from '@/entities/board/model/utils/boardUtils';

interface BoardState {
  svgRef: SVGSVGElement | null;
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  viewBox: { x: number; y: number; width: number; height: number };
  isPanning: boolean;
  lastPanPoint: Point | null;
  centerAnimationFrameId: number | null;
}

interface BoardActions {
  setSvgRef: (ref: React.RefObject<SVGSVGElement | null>) => void;
  setGridSettings: (settings: GridSettings) => void;
  setPageSettings: (settings: PageSettings) => void;
  initializeViewBox: (setZoomLevel: (level: number) => void) => void;
  getSVGPoint: (clientX: number, clientY: number, zoomLevel: number) => Point;
  handlePanStart: (point: Point) => void;
  handlePanMove: (event: MouseEvent, zoomLevel: number) => void;
  handlePanEnd: () => void;
  getViewportDimensions: () => { width: number; height: number };
  centerViewOnPoint: (point: Point, durationMs?: number) => void;
}

export const useBoardStore = create<BoardState & BoardActions>()((set, get) => ({
  svgRef: null,
  gridSettings: { visualCellSize: 50, lineColor: '#788475', metersPerSquare: 1.5 }, // Default values
  pageSettings: { widthInUnits: 30, heightInUnits: 30, backgroundColor: '#FFFFFF' }, // Default values
  viewBox: { x: 0, y: 0, width: 1000, height: 800 },
  isPanning: false,
  lastPanPoint: null,
  centerAnimationFrameId: null,

  setSvgRef: (ref) => set({ svgRef: ref.current }),
  setGridSettings: (settings) => set({ gridSettings: settings }),
  setPageSettings: (settings) => set({ pageSettings: settings }),

  getViewportDimensions: () => {
    const svgElement = get().svgRef;
    if (svgElement) {
      return {
        width: svgElement.clientWidth,
        height: svgElement.clientHeight,
      };
    }
    return { width: 1000, height: 800 };
  },

  initializeViewBox: (setZoomLevel) => {
    const { pageSettings, gridSettings } = get();
    const viewport = get().getViewportDimensions();
    set(() => ({
      viewBox: calculateInitialViewBox(
        pageSettings,
        gridSettings,
        viewport.width,
        viewport.height,
        ZOOM_CONFIG.INITIAL,
      ),
    }));
    setZoomLevel(ZOOM_CONFIG.INITIAL);
  },

  getSVGPoint: (clientX: number, clientY: number, zoomLevel: number): Point => {
    const { svgRef, viewBox } = get();
    if (!svgRef) return { x: 0, y: 0 };
    const svgRect = svgRef.getBoundingClientRect();
    const svgRectLeft = Math.round(svgRect.left);
    const svgRectTop = Math.round(svgRect.top);
    const svgX = clientX - svgRectLeft;
    const svgY = clientY - svgRectTop;
    const worldX = viewBox.x + svgX / zoomLevel;
    const worldY = viewBox.y + svgY / zoomLevel;
    return { x: worldX, y: worldY };
  },

  handlePanStart: (point: Point) => {
    const svgElement = get().svgRef;
    const { centerAnimationFrameId } = get();
    if (centerAnimationFrameId != null) {
      cancelAnimationFrame(centerAnimationFrameId);
    }
    set(() => ({
      isPanning: true,
      lastPanPoint: point,
      centerAnimationFrameId: null,
    }));
    if (svgElement) svgElement.classList.add('cursor-grabbing');
  },

  handlePanMove: (event: MouseEvent, zoomLevel: number) => {
    const { isPanning, lastPanPoint } = get();
    if (isPanning && lastPanPoint) {
      const dx = event.clientX - lastPanPoint.x;
      const dy = event.clientY - lastPanPoint.y;
      set((state) => ({
        viewBox: {
          ...state.viewBox,
          x: state.viewBox.x - dx / zoomLevel,
          y: state.viewBox.y - dy / zoomLevel,
        },
        lastPanPoint: { x: event.clientX, y: event.clientY },
      }));
    }
  },

  handlePanEnd: () => {
    const svgElement = get().svgRef;
    set(() => ({
      isPanning: false,
      lastPanPoint: null,
    }));
    if (svgElement) svgElement.classList.remove('cursor-grabbing');
  },

  centerViewOnPoint: (point, durationMs = 420) => {
    const { isPanning, centerAnimationFrameId } = get();
    if (isPanning) {
      return;
    }

    if (centerAnimationFrameId != null) {
      cancelAnimationFrame(centerAnimationFrameId);
    }

    const startViewBox = get().viewBox;
    const targetViewBox = {
      ...startViewBox,
      x: point.x - startViewBox.width / 2,
      y: point.y - startViewBox.height / 2,
    };

    if (durationMs <= 0) {
      set({ viewBox: targetViewBox, centerAnimationFrameId: null });
      return;
    }

    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(progress);

      set(() => ({
        viewBox: {
          ...startViewBox,
          x: startViewBox.x + (targetViewBox.x - startViewBox.x) * eased,
          y: startViewBox.y + (targetViewBox.y - startViewBox.y) * eased,
        },
      }));

      if (progress < 1) {
        const nextFrame = requestAnimationFrame(tick);
        set({ centerAnimationFrameId: nextFrame });
        return;
      }

      set({ centerAnimationFrameId: null });
    };

    const frameId = requestAnimationFrame(tick);
    set({ centerAnimationFrameId: frameId });
  },
}));
