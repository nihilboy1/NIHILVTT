import { type PageSettings, type GridSettings, type Point } from '../../types/index'; // Ajustar o caminho do tipo

export const parseTokenSize = (sizeString?: string): [number, number] => {
  if (!sizeString) return [1,1];
  const parts = sizeString.split('x').map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[0] > 0 && parts[1] > 0) {
    return [parts[0], parts[1]];
  }
  return [1, 1];
};

export const calculateInitialViewBox = (
  pageSettings: PageSettings, 
  gridSettings: GridSettings, 
  viewportPixelWidth: number, 
  viewportPixelHeight: number, 
  initialZoom: number
) => {
  const pageActualWidth = pageSettings.widthInUnits * gridSettings.visualCellSize;
  const pageActualHeight = pageSettings.heightInUnits * gridSettings.visualCellSize;
  const viewBoxWidth = viewportPixelWidth / initialZoom;
  const viewBoxHeight = viewportPixelHeight / initialZoom;
  const x = (pageActualWidth - viewBoxWidth) / 2;
  const y = (pageActualHeight - viewBoxHeight) / 2;
  return { x, y, width: viewBoxWidth, height: viewBoxHeight };
};

export const calculateDistanceInMeters = (p1: Point, p2: Point, cellSize: number, metersPerCell: number): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const worldDistance = Math.sqrt(dx * dx + dy * dy);
  const cellDistance = worldDistance / cellSize;
  return cellDistance * metersPerCell;
};
