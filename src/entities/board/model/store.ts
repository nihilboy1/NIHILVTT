import { create } from 'zustand';
import {
  GridSettings,
  PageSettings,
  Point,
} from "@/shared/api/types";
import {
  INITIAL_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
  ZOOM_SENSITIVITY,
} from "@/shared/config/constants";
import { calculateInitialViewBox } from "@/shared/lib/utils/board/boardUtils";

interface BoardState {
  svgRef: SVGSVGElement | null;
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  viewBox: { x: number; y: number; width: number; height: number };
  zoomLevel: number;
  isPanning: boolean;
  lastPanPoint: Point | null;
}

interface BoardActions {
  setSvgRef: (ref: React.RefObject<SVGSVGElement | null>) => void;
  setGridSettings: (settings: GridSettings) => void;
  setPageSettings: (settings: PageSettings) => void;
  initializeViewBox: () => void;
  updateViewBoxOnZoom: () => void;
  getSVGPoint: (clientX: number, clientY: number) => Point;
  handleWheel: (event: React.WheelEvent<SVGSVGElement>) => void;
  handlePanStart: (point: Point) => void;
  handlePanMove: (event: MouseEvent) => void;
  handlePanEnd: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  getViewportDimensions: () => { width: number; height: number };
}

export const useBoardStore = create<BoardState & BoardActions>()(
  (set, get) => ({
    svgRef: null,
    gridSettings: { visualCellSize: 50, lineColor: "#788475", metersPerSquare: 1.5 }, // Default values
    pageSettings: { widthInUnits: 30, heightInUnits: 30, backgroundColor: "#FFFFFF" }, // Default values
    viewBox: { x: 0, y: 0, width: 1000, height: 800 },
    zoomLevel: INITIAL_ZOOM_LEVEL,
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

    initializeViewBox: () => {
      const { pageSettings, gridSettings } = get();
      const viewport = get().getViewportDimensions(); // Access via get()
      set(() => ({
        viewBox: calculateInitialViewBox(
          pageSettings,
          gridSettings,
          viewport.width,
          viewport.height,
          INITIAL_ZOOM_LEVEL
        ),
        zoomLevel: INITIAL_ZOOM_LEVEL,
      }));
    },

    updateViewBoxOnZoom: () => {
      const { zoomLevel } = get();
      const viewport = get().getViewportDimensions(); // Access via get()
      const newWidth = viewport.width / zoomLevel;
      const newHeight = viewport.height / zoomLevel;
      set((state) => ({ // Keep state here as it's used in state.viewBox.x and state.viewBox.y
        viewBox: {
          x: state.viewBox.x + (state.viewBox.width - newWidth) / 2,
          y: state.viewBox.y + (state.viewBox.height - newHeight) / 2,
          width: newWidth,
          height: newHeight,
        },
      }));
    },

    getSVGPoint: (clientX: number, clientY: number): Point => {
      const { svgRef, viewBox, zoomLevel } = get();
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

    handleWheel: (event: React.WheelEvent<SVGSVGElement>) => {
      event.preventDefault();
      const { svgRef, viewBox, zoomLevel } = get();
      if (!svgRef) return;
      if ((event.target as SVGElement).closest(".board-token-group")) return;

      const newZoomFactor = 1 - event.deltaY * ZOOM_SENSITIVITY;
      const newZoomLevelUnclamped = zoomLevel * newZoomFactor;
      const newZoomLevel = Math.max(
        MIN_ZOOM_LEVEL,
        Math.min(MAX_ZOOM_LEVEL, newZoomLevelUnclamped)
      );
      if (newZoomLevel === zoomLevel) return;

      const svgRect = svgRef.getBoundingClientRect();
      const mouseX = event.clientX - Math.round(svgRect.left);
      const mouseY = event.clientY - Math.round(svgRect.top);
      const worldXBeforeZoom = viewBox.x + mouseX / zoomLevel;
      const worldYBeforeZoom = viewBox.y + mouseY / zoomLevel;
      const newViewBoxWidth = svgRect.width / newZoomLevel;
      const newViewBoxHeight = svgRect.height / newZoomLevel;
      const newViewBoxX = worldXBeforeZoom - mouseX / newZoomLevel;
      const newViewBoxY = worldYBeforeZoom - mouseY / newZoomLevel;

      set(() => ({
        zoomLevel: newZoomLevel,
        viewBox: {
          x: newViewBoxX,
          y: newViewBoxY,
          width: newViewBoxWidth,
          height: newViewBoxHeight,
        },
      }));
    },

    handlePanStart: (point: Point) => {
      const svgElement = get().svgRef;
      set(() => ({
        isPanning: true,
        lastPanPoint: point,
      }));
      if (svgElement) svgElement.classList.add("cursor-grabbing");
    },

    handlePanMove: (event: MouseEvent) => {
      const { isPanning, lastPanPoint, zoomLevel } = get();
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

    handleZoomIn: () => {
      const ZOOM_BUTTON_STEP = 0.1;
      set(({ zoomLevel }) => ({
        zoomLevel: Math.min(MAX_ZOOM_LEVEL, zoomLevel + ZOOM_BUTTON_STEP),
      }));
      get().updateViewBoxOnZoom();
    },

    handleZoomOut: () => {
      const ZOOM_BUTTON_STEP = 0.1;
      set(({ zoomLevel }) => ({
        zoomLevel: Math.max(MIN_ZOOM_LEVEL, zoomLevel - ZOOM_BUTTON_STEP),
      }));
      get().updateViewBoxOnZoom();
    },
  })
);
