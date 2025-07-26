import { type GridSettings, type PageSettings, type Point } from '../../../../shared/api/types';
export const calculateInitialViewBox = (
  pageSettings: PageSettings,
  gridSettings: GridSettings,
  viewportPixelWidth: number,
  viewportPixelHeight: number,
  initialZoom: number,
) => {
  const pageActualWidth = pageSettings.widthInUnits * gridSettings.visualCellSize;
  const pageActualHeight = pageSettings.heightInUnits * gridSettings.visualCellSize;
  const viewBoxWidth = viewportPixelWidth / initialZoom;
  const viewBoxHeight = viewportPixelHeight / initialZoom;
  const x = (pageActualWidth - viewBoxWidth) / 2;
  const y = (pageActualHeight - viewBoxHeight) / 2;
  return { x, y, width: viewBoxWidth, height: viewBoxHeight };
};

export const calculateDistanceInMeters = (
  p1: Point,
  p2: Point,
  cellSize: number,
  metersPerCell: number,
): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const worldDistance = Math.sqrt(dx * dx + dy * dy);
  const cellDistance = worldDistance / cellSize;
  return cellDistance * metersPerCell;
};
