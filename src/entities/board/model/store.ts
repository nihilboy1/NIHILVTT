import { create } from 'zustand';
import {
  GridSettings,
  PageSettings,
  Point,
} from "@/shared/api/types";
import { calculateInitialViewBox } from "@/shared/lib/utils/board/boardUtils";
import { INITIAL_ZOOM_LEVEL } from "@/shared/config/constants"; // Import INITIAL_ZOOM_LEVEL

interface BoardState {
  svgRef: SVGSVGElement | null;
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  viewBox: { x: number; y: number; width: number; height: number };
  isPanning: boolean;
  lastPanPoint: Point | null;
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
}

export const useBoardStore = create<BoardState & BoardActions>()(
  (set, get) => ({
    svgRef: null,
    gridSettings: { visualCellSize: 50, lineColor: "#788475", metersPerSquare: 1.5 }, // Default values
    pageSettings: { widthInUnits: 30, heightInUnits: 30, backgroundColor: "#FFFFFF" }, // Default values
    viewBox: { x: 0, y: 0, width: 1000, height: 800 },
    isPanning: false,
    lastPanPoint: null,

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
          INITIAL_ZOOM_LEVEL
        ),
      }));
      setZoomLevel(INITIAL_ZOOM_LEVEL);
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
      set(() => ({
        isPanning: true,
        lastPanPoint: point,
      }));
      if (svgElement) svgElement.classList.add("cursor-grabbing");
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
      if (svgElement) svgElement.classList.remove("cursor-grabbing");
    },
  })
);
