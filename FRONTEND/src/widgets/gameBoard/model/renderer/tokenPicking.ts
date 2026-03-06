import type { Point, Token } from '@/shared/api/types';

import { worldPointToGridCell } from './gridMath';
import { getTokenGridBounds } from './tokenGeometry';

function isGridCellInsideBounds(cell: Point, bounds: ReturnType<typeof getTokenGridBounds>): boolean {
  return cell.x >= bounds.minX && cell.x <= bounds.maxX && cell.y >= bounds.minY && cell.y <= bounds.maxY;
}

export function pickTopmostTokenIdAtWorldPoint(params: {
  worldPoint: Point;
  cellSize: number;
  tokensOnBoard: Token[];
  getTokenSizeInCells: (token: Token) => [number, number];
  preferredTopTokenIds?: string[];
}): string | null {
  const cell = worldPointToGridCell({
    worldPoint: params.worldPoint,
    cellSize: params.cellSize,
    roundMode: 'floor',
  });

  const preferredTopTokenIds = params.preferredTopTokenIds ?? [];
  if (preferredTopTokenIds.length > 0) {
    const tokenById = new Map(params.tokensOnBoard.map((token) => [token.id, token]));
    for (let index = preferredTopTokenIds.length - 1; index >= 0; index -= 1) {
      const preferredTokenId = preferredTopTokenIds[index];
      if (!preferredTokenId) {
        continue;
      }

      const token = tokenById.get(preferredTokenId);
      if (!token) {
        continue;
      }

      const bounds = getTokenGridBounds({
        token,
        sizeInCells: params.getTokenSizeInCells(token),
      });

      if (isGridCellInsideBounds(cell, bounds)) {
        return token.id;
      }
    }
  }

  for (let index = params.tokensOnBoard.length - 1; index >= 0; index -= 1) {
    const token = params.tokensOnBoard[index];
    const bounds = getTokenGridBounds({
      token,
      sizeInCells: params.getTokenSizeInCells(token),
    });

    if (isGridCellInsideBounds(cell, bounds)) {
      return token.id;
    }
  }

  return null;
}
