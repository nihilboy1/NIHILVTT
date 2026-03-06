import type { PageSettings, Point, Token } from '@/shared/api/types';

const MIN_DIMENSION = 1;

export type BoardViewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BoardViewportSize = {
  width: number;
  height: number;
};

export type GridRoundMode = 'floor' | 'round';

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

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

export function worldPointToGridCell(params: {
  worldPoint: Point;
  cellSize: number;
  roundMode?: GridRoundMode;
}): Point {
  const safeCellSize = Math.max(1, params.cellSize);
  const roundMode = params.roundMode ?? 'floor';
  const roundFn = roundMode === 'round' ? Math.round : Math.floor;

  return {
    x: roundFn(params.worldPoint.x / safeCellSize),
    y: roundFn(params.worldPoint.y / safeCellSize),
  };
}

export function clampGridCellToBoard(params: {
  gridCell: Point;
  pageSettings: PageSettings;
  tokenSizeInCells?: [number, number];
}): Point {
  const [tokenWidth, tokenHeight] = params.tokenSizeInCells ?? [1, 1];
  const safeTokenWidth = Math.max(1, Math.ceil(tokenWidth));
  const safeTokenHeight = Math.max(1, Math.ceil(tokenHeight));

  return {
    x: Math.max(0, Math.min(params.gridCell.x, params.pageSettings.widthInUnits - safeTokenWidth)),
    y: Math.max(
      0,
      Math.min(params.gridCell.y, params.pageSettings.heightInUnits - safeTokenHeight),
    ),
  };
}

export function isWorldPointInsideBoard(params: {
  worldPoint: Point;
  pageSettings: PageSettings;
  cellSize: number;
}): boolean {
  const safeCellSize = Math.max(1, params.cellSize);
  const pageWidth = params.pageSettings.widthInUnits * safeCellSize;
  const pageHeight = params.pageSettings.heightInUnits * safeCellSize;

  return (
    params.worldPoint.x >= 0 &&
    params.worldPoint.x <= pageWidth &&
    params.worldPoint.y >= 0 &&
    params.worldPoint.y <= pageHeight
  );
}

export function getTokenWorldRect(params: {
  token: Pick<Token, 'position'>;
  sizeInCells: [number, number];
  cellSize: number;
}): Rect {
  const [width, height] = params.sizeInCells;
  const safeCellSize = Math.max(1, params.cellSize);

  return {
    x: params.token.position.x * safeCellSize,
    y: params.token.position.y * safeCellSize,
    width: Math.max(1, width) * safeCellSize,
    height: Math.max(1, height) * safeCellSize,
  };
}

export function doRectsIntersect(a: Rect, b: Rect): boolean {
  return !(
    a.x > b.x + b.width ||
    a.x + a.width < b.x ||
    a.y > b.y + b.height ||
    a.y + a.height < b.y
  );
}

export function getMarqueeRect(params: { startPoint: Point; currentPoint: Point }): Rect {
  return {
    x: Math.min(params.startPoint.x, params.currentPoint.x),
    y: Math.min(params.startPoint.y, params.currentPoint.y),
    width: Math.abs(params.startPoint.x - params.currentPoint.x),
    height: Math.abs(params.startPoint.y - params.currentPoint.y),
  };
}
