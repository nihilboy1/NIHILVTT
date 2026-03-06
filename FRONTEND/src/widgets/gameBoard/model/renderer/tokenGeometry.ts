import type { Point, Token } from '@/shared/api/types';

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TokenGridBounds = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export function getTokenGridBounds(params: {
  token: Pick<Token, 'position'>;
  sizeInCells: [number, number];
}): TokenGridBounds {
  const [width, height] = params.sizeInCells;
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);

  return {
    minX: params.token.position.x,
    minY: params.token.position.y,
    maxX: params.token.position.x + safeWidth - 1,
    maxY: params.token.position.y + safeHeight - 1,
  };
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
  return !(a.x > b.x + b.width || a.x + a.width < b.x || a.y > b.y + b.height || a.y + a.height < b.y);
}

export function getMarqueeRect(params: { startPoint: Point; currentPoint: Point }): Rect {
  return {
    x: Math.min(params.startPoint.x, params.currentPoint.x),
    y: Math.min(params.startPoint.y, params.currentPoint.y),
    width: Math.abs(params.startPoint.x - params.currentPoint.x),
    height: Math.abs(params.startPoint.y - params.currentPoint.y),
  };
}

export function getChebyshevDistanceBetweenTokenBounds(
  firstBounds: TokenGridBounds,
  secondBounds: TokenGridBounds,
): number {
  const deltaX =
    firstBounds.minX > secondBounds.maxX
      ? firstBounds.minX - secondBounds.maxX
      : secondBounds.minX > firstBounds.maxX
        ? secondBounds.minX - firstBounds.maxX
        : 0;
  const deltaY =
    firstBounds.minY > secondBounds.maxY
      ? firstBounds.minY - secondBounds.maxY
      : secondBounds.minY > firstBounds.maxY
        ? secondBounds.minY - firstBounds.maxY
        : 0;

  return Math.max(deltaX, deltaY);
}

