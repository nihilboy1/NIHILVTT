import { create } from 'zustand';

import { useBoardStore } from '@/entities/board/model/store'; // Import useBoardStore
import { ZOOM_CONFIG } from '@/shared/config/constants';
import {
  clientToViewportPoint,
  computeCenteredZoomViewBox,
  computeZoomedViewBoxAtViewportPoint,
} from '@/shared/lib/board/boardMath';

interface BoardZoomState {
  zoomLevel: number;
}

interface BoardZoomActions {
  handleWheel: (event: React.WheelEvent<Element>) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  setZoomLevel: (level: number) => void;
}

function deriveZoomLevelFromViewBox(params: {
  viewportWidth: number;
  viewBoxWidth: number;
  fallbackZoomLevel: number;
}): number {
  const safeViewportWidth = Math.max(1, params.viewportWidth);
  const safeViewBoxWidth = Math.max(1, params.viewBoxWidth);
  const derivedZoomLevel = safeViewportWidth / safeViewBoxWidth;

  if (!Number.isFinite(derivedZoomLevel) || derivedZoomLevel <= 0) {
    return params.fallbackZoomLevel;
  }

  return derivedZoomLevel;
}

function resolveViewportFromElement(
  element: Element | null,
): { width: number; height: number } | null {
  if (!(element instanceof Element)) {
    return null;
  }

  const rect = element.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  if (width <= 1 || height <= 1) {
    return null;
  }

  return { width, height };
}

export const useBoardZoomStore = create<BoardZoomState & BoardZoomActions>()((set, get) => ({
  zoomLevel: ZOOM_CONFIG.INITIAL,

  setZoomLevel: (level) => set({ zoomLevel: level }),

  handleWheel: (event: React.WheelEvent<Element>) => {
    event.preventDefault();
    const { viewportRef, viewBox } = useBoardStore.getState();
    const fallbackZoomLevel = get().zoomLevel;

    const eventViewport = resolveViewportFromElement(event.currentTarget);
    const fallbackRect = viewportRef?.getBoundingClientRect();
    const width = eventViewport?.width ?? Math.max(1, Math.floor(fallbackRect?.width ?? 0));
    const height = eventViewport?.height ?? Math.max(1, Math.floor(fallbackRect?.height ?? 0));
    if (width <= 1 || height <= 1) {
      return;
    }
    const currentZoomLevel = deriveZoomLevelFromViewBox({
      viewportWidth: width,
      viewBoxWidth: viewBox.width,
      fallbackZoomLevel,
    });
    const newZoomFactor = 1 - event.deltaY * ZOOM_CONFIG.SENSITIVITY;
    const newZoomLevelUnclamped = currentZoomLevel * newZoomFactor;
    const newZoomLevel = Math.max(
      ZOOM_CONFIG.MIN,
      Math.min(ZOOM_CONFIG.MAX, newZoomLevelUnclamped),
    );
    if (newZoomLevel === currentZoomLevel) return;

    const mousePoint = clientToViewportPoint({
      clientX: event.clientX,
      clientY: event.clientY,
      viewportLeft:
        (eventViewport ? event.currentTarget.getBoundingClientRect().left : fallbackRect?.left) ??
        0,
      viewportTop:
        (eventViewport ? event.currentTarget.getBoundingClientRect().top : fallbackRect?.top) ?? 0,
    });
    const nextViewBox = computeZoomedViewBoxAtViewportPoint({
      currentViewBox: viewBox,
      currentZoomLevel,
      newZoomLevel,
      viewportPoint: mousePoint,
      viewport: {
        width,
        height,
      },
    });

    useBoardStore.setState(() => ({
      viewBox: nextViewBox,
    }));
    set({ zoomLevel: newZoomLevel });
  },

  handleZoomIn: () => {
    const ZOOM_BUTTON_STEP = 0.1;
    set((state) => {
      const { getViewportDimensions } = useBoardStore.getState();
      const { viewportRef } = useBoardStore.getState();
      const rect = viewportRef?.getBoundingClientRect();
      const viewport = {
        width: Math.max(1, getViewportDimensions().width, Math.floor(rect?.width ?? 0)),
        height: Math.max(1, getViewportDimensions().height, Math.floor(rect?.height ?? 0)),
      };
      if (viewport.width <= 1 || viewport.height <= 1) {
        return state;
      }
      const { viewBox } = useBoardStore.getState();
      const currentZoomLevel = deriveZoomLevelFromViewBox({
        viewportWidth: viewport.width,
        viewBoxWidth: viewBox.width,
        fallbackZoomLevel: state.zoomLevel,
      });
      const newZoomLevel = Math.min(ZOOM_CONFIG.MAX, currentZoomLevel + ZOOM_BUTTON_STEP);

      useBoardStore.setState((boardState) => ({
        viewBox: computeCenteredZoomViewBox({
          currentViewBox: boardState.viewBox,
          viewport,
          newZoomLevel,
        }),
      }));
      return { zoomLevel: newZoomLevel };
    });
  },

  handleZoomOut: () => {
    const ZOOM_BUTTON_STEP = 0.1;
    set((state) => {
      const { getViewportDimensions } = useBoardStore.getState();
      const { viewportRef } = useBoardStore.getState();
      const rect = viewportRef?.getBoundingClientRect();
      const viewport = {
        width: Math.max(1, getViewportDimensions().width, Math.floor(rect?.width ?? 0)),
        height: Math.max(1, getViewportDimensions().height, Math.floor(rect?.height ?? 0)),
      };
      if (viewport.width <= 1 || viewport.height <= 1) {
        return state;
      }
      const { viewBox } = useBoardStore.getState();
      const currentZoomLevel = deriveZoomLevelFromViewBox({
        viewportWidth: viewport.width,
        viewBoxWidth: viewBox.width,
        fallbackZoomLevel: state.zoomLevel,
      });
      const newZoomLevel = Math.max(ZOOM_CONFIG.MIN, currentZoomLevel - ZOOM_BUTTON_STEP);

      useBoardStore.setState((boardState) => ({
        viewBox: computeCenteredZoomViewBox({
          currentViewBox: boardState.viewBox,
          viewport,
          newZoomLevel,
        }),
      }));
      return { zoomLevel: newZoomLevel };
    });
  },
}));
