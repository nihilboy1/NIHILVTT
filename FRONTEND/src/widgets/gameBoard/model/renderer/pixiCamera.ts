import type { BoardRendererAdapter, BoardViewBox, BoardViewportSize, BoardWorldTransform } from './types';

const MIN_DIMENSION = 1;

function sanitizeViewport(viewport: BoardViewportSize): BoardViewportSize {
  return {
    width: Math.max(MIN_DIMENSION, Math.floor(viewport.width)),
    height: Math.max(MIN_DIMENSION, Math.floor(viewport.height)),
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

export function createPixiWorldTransform(params: {
  viewBox: BoardViewBox;
  viewport: BoardViewportSize;
}): BoardWorldTransform {
  const safeViewport = sanitizeViewport(params.viewport);
  const safeViewBox = sanitizeViewBox(params.viewBox);

  const scaleX = safeViewport.width / safeViewBox.width;
  const scaleY = safeViewport.height / safeViewBox.height;

  return {
    scaleX,
    scaleY,
    containerX: -safeViewBox.x * scaleX,
    containerY: -safeViewBox.y * scaleY,
  };
}

export function worldToScreenPoint(params: {
  worldX: number;
  worldY: number;
  viewBox: BoardViewBox;
  viewport: BoardViewportSize;
}): { x: number; y: number } {
  const transform = createPixiWorldTransform({
    viewBox: params.viewBox,
    viewport: params.viewport,
  });

  return {
    x: params.worldX * transform.scaleX + transform.containerX,
    y: params.worldY * transform.scaleY + transform.containerY,
  };
}

export function screenToWorldPoint(params: {
  screenX: number;
  screenY: number;
  viewBox: BoardViewBox;
  viewport: BoardViewportSize;
}): { x: number; y: number } {
  const transform = createPixiWorldTransform({
    viewBox: params.viewBox,
    viewport: params.viewport,
  });

  return {
    x: (params.screenX - transform.containerX) / transform.scaleX,
    y: (params.screenY - transform.containerY) / transform.scaleY,
  };
}

export const pixiBoardRendererAdapter: BoardRendererAdapter = {
  mode: 'pixi',
  supportsInteractions: false,
  getWorldTransform: createPixiWorldTransform,
};

