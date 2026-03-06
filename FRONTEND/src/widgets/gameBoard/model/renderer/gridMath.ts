import type { PageSettings, Point } from '@/shared/api/types';

export type GridRoundMode = 'floor' | 'round';

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
    y: Math.max(0, Math.min(params.gridCell.y, params.pageSettings.heightInUnits - safeTokenHeight)),
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

