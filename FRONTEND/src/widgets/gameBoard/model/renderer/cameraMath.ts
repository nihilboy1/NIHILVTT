import type { Point } from '@/shared/api/types';

import type { BoardViewBox, BoardViewportSize } from './types';

const MIN_DIMENSION = 1;

function sanitizeViewport(viewport: BoardViewportSize): BoardViewportSize {
  return {
    width: Math.max(MIN_DIMENSION, viewport.width),
    height: Math.max(MIN_DIMENSION, viewport.height),
  };
}

function sanitizeViewBox(viewBox: BoardViewBox): BoardViewBox {
  return {
    x: viewBox.x,
    y: viewBox.y,
    width: Math.max(MIN_DIMENSION, viewBox.width),
    height: Math.max(MIN_DIMENSION, viewBox.height),
  };
}

export function clientToViewportPoint(params: {
  clientX: number;
  clientY: number;
  viewportLeft: number;
  viewportTop: number;
}): Point {
  return {
    x: params.clientX - Math.round(params.viewportLeft),
    y: params.clientY - Math.round(params.viewportTop),
  };
}

export function viewportToWorldPoint(params: {
  viewportPoint: Point;
  viewBox: BoardViewBox;
  viewport: BoardViewportSize;
}): Point {
  const safeViewport = sanitizeViewport(params.viewport);
  const safeViewBox = sanitizeViewBox(params.viewBox);

  return {
    x: safeViewBox.x + (params.viewportPoint.x / safeViewport.width) * safeViewBox.width,
    y: safeViewBox.y + (params.viewportPoint.y / safeViewport.height) * safeViewBox.height,
  };
}

export function computeCenteredZoomViewBox(params: {
  currentViewBox: BoardViewBox;
  viewport: BoardViewportSize;
  newZoomLevel: number;
}): BoardViewBox {
  const safeViewport = sanitizeViewport(params.viewport);
  const safeNewZoomLevel = Math.max(MIN_DIMENSION / 1000, params.newZoomLevel);

  const newWidth = safeViewport.width / safeNewZoomLevel;
  const newHeight = safeViewport.height / safeNewZoomLevel;

  return {
    x: params.currentViewBox.x + (params.currentViewBox.width - newWidth) / 2,
    y: params.currentViewBox.y + (params.currentViewBox.height - newHeight) / 2,
    width: newWidth,
    height: newHeight,
  };
}

export function computeZoomedViewBoxAtViewportPoint(params: {
  currentViewBox: BoardViewBox;
  currentZoomLevel: number;
  newZoomLevel: number;
  viewportPoint: Point;
  viewport: BoardViewportSize;
}): BoardViewBox {
  const safeViewport = sanitizeViewport(params.viewport);
  const safeCurrentZoomLevel = Math.max(MIN_DIMENSION / 1000, params.currentZoomLevel);
  const safeNewZoomLevel = Math.max(MIN_DIMENSION / 1000, params.newZoomLevel);

  const worldXBeforeZoom = params.currentViewBox.x + params.viewportPoint.x / safeCurrentZoomLevel;
  const worldYBeforeZoom = params.currentViewBox.y + params.viewportPoint.y / safeCurrentZoomLevel;
  const newViewBoxWidth = safeViewport.width / safeNewZoomLevel;
  const newViewBoxHeight = safeViewport.height / safeNewZoomLevel;

  return {
    x: worldXBeforeZoom - params.viewportPoint.x / safeNewZoomLevel,
    y: worldYBeforeZoom - params.viewportPoint.y / safeNewZoomLevel,
    width: newViewBoxWidth,
    height: newViewBoxHeight,
  };
}

export function applyPanDeltaToViewBox(params: {
  viewBox: BoardViewBox;
  deltaClientX: number;
  deltaClientY: number;
  zoomLevel: number;
}): BoardViewBox {
  const safeZoomLevel = Math.max(MIN_DIMENSION / 1000, params.zoomLevel);

  return {
    ...params.viewBox,
    x: params.viewBox.x - params.deltaClientX / safeZoomLevel,
    y: params.viewBox.y - params.deltaClientY / safeZoomLevel,
  };
}

