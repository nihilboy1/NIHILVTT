import { create } from 'zustand';

import { useBoardStore } from '@/entities/board/model/store'; // Import useBoardStore
import { ZOOM_CONFIG } from '@/shared/config/constants';

interface BoardZoomState {
  zoomLevel: number;
}

interface BoardZoomActions {
  handleWheel: (event: React.WheelEvent<SVGSVGElement>) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  setZoomLevel: (level: number) => void;
}

export const useBoardZoomStore = create<BoardZoomState & BoardZoomActions>()((set, get) => ({
  zoomLevel: ZOOM_CONFIG.INITIAL,

  setZoomLevel: (level) => set({ zoomLevel: level }),

  handleWheel: (event: React.WheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    const { svgRef, viewBox } = useBoardStore.getState();
    const currentZoomLevel = get().zoomLevel;

    if (!svgRef) return;
    if ((event.target as SVGElement).closest('.board-token-group')) return;

    const newZoomFactor = 1 - event.deltaY * ZOOM_CONFIG.SENSITIVITY;
    const newZoomLevelUnclamped = currentZoomLevel * newZoomFactor;
    const newZoomLevel = Math.max(
      ZOOM_CONFIG.MIN,
      Math.min(ZOOM_CONFIG.MAX, newZoomLevelUnclamped),
    );
    if (newZoomLevel === currentZoomLevel) return;

    const svgRect = svgRef.getBoundingClientRect();
    const mouseX = event.clientX - Math.round(svgRect.left);
    const mouseY = event.clientY - Math.round(svgRect.top);
    const worldXBeforeZoom = viewBox.x + mouseX / currentZoomLevel;
    const worldYBeforeZoom = viewBox.y + mouseY / currentZoomLevel;
    const newViewBoxWidth = svgRect.width / newZoomLevel;
    const newViewBoxHeight = svgRect.height / newZoomLevel;
    const newViewBoxX = worldXBeforeZoom - mouseX / newZoomLevel;
    const newViewBoxY = worldYBeforeZoom - mouseY / newZoomLevel;

    useBoardStore.setState(() => ({
      viewBox: {
        x: newViewBoxX,
        y: newViewBoxY,
        width: newViewBoxWidth,
        height: newViewBoxHeight,
      },
    }));
    set({ zoomLevel: newZoomLevel });
  },

  handleZoomIn: () => {
    const ZOOM_BUTTON_STEP = 0.1;
    set((state) => {
      const newZoomLevel = Math.min(ZOOM_CONFIG.MAX, state.zoomLevel + ZOOM_BUTTON_STEP);
      const { getViewportDimensions } = useBoardStore.getState();
      const viewport = getViewportDimensions();
      const newWidth = viewport.width / newZoomLevel;
      const newHeight = viewport.height / newZoomLevel;

      useBoardStore.setState((boardState) => ({
        viewBox: {
          x: boardState.viewBox.x + (boardState.viewBox.width - newWidth) / 2,
          y: boardState.viewBox.y + (boardState.viewBox.height - newHeight) / 2,
          width: newWidth,
          height: newHeight,
        },
      }));
      return { zoomLevel: newZoomLevel };
    });
  },

  handleZoomOut: () => {
    const ZOOM_BUTTON_STEP = 0.1;
    set((state) => {
      const newZoomLevel = Math.max(ZOOM_CONFIG.MIN, state.zoomLevel - ZOOM_BUTTON_STEP);
      const { getViewportDimensions } = useBoardStore.getState();
      const viewport = getViewportDimensions();
      const newWidth = viewport.width / newZoomLevel;
      const newHeight = viewport.height / newZoomLevel;

      useBoardStore.setState((boardState) => ({
        viewBox: {
          x: boardState.viewBox.x + (boardState.viewBox.width - newWidth) / 2,
          y: boardState.viewBox.y + (boardState.viewBox.height - newHeight) / 2,
          width: newWidth,
          height: newHeight,
        },
      }));
      return { zoomLevel: newZoomLevel };
    });
  },
}));
