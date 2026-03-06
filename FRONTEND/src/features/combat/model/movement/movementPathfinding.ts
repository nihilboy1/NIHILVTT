import { PageSettings, Point, Token } from '@/shared/api/types';

export interface GridEdgeBlock {
  from: Point;
  to: Point;
}

export interface CollisionMap {
  blockedCells: Point[];
  blockedEdges: GridEdgeBlock[];
}

export interface MovementRangeInput {
  startCell: Point;
  tokenSizeInCells: [number, number];
  movementBudgetCells: number;
  pageSettings: PageSettings;
  collisionMap: CollisionMap;
  tokensOnBoard: Token[];
  tokenSizesById: Record<string, [number, number]>;
  movingTokenId: string;
}

export interface MovementRangeResult {
  reachableCells: Point[];
  costByCell: Record<string, number>;
  previousByCell: Record<string, Point | null>;
}

const CARDINAL_DIRECTIONS: Point[] = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

const ALL_DIRECTIONS: Point[] = [
  ...CARDINAL_DIRECTIONS,
  { x: -1, y: -1 },
  { x: -1, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
];

function cellKey(cell: Point): string {
  return `${cell.x}:${cell.y}`;
}

function edgeKey(a: Point, b: Point): string {
  const first = cellKey(a);
  const second = cellKey(b);
  return first < second ? `${first}|${second}` : `${second}|${first}`;
}

function getFootprintCells(anchor: Point, sizeInCells: [number, number]): Point[] {
  const [width, height] = sizeInCells;
  const cells: Point[] = [];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      cells.push({ x: anchor.x + x, y: anchor.y + y });
    }
  }

  return cells;
}

function isWithinBoardBounds(
  anchor: Point,
  sizeInCells: [number, number],
  pageSettings: PageSettings,
): boolean {
  const [width, height] = sizeInCells;

  return (
    anchor.x >= 0 &&
    anchor.y >= 0 &&
    anchor.x + width <= pageSettings.widthInUnits &&
    anchor.y + height <= pageSettings.heightInUnits
  );
}

function toEdgeBlockSet(blockedEdges: GridEdgeBlock[]): Set<string> {
  const set = new Set<string>();

  blockedEdges.forEach((edge) => {
    const deltaX = Math.abs(edge.from.x - edge.to.x);
    const deltaY = Math.abs(edge.from.y - edge.to.y);
    if (deltaX + deltaY !== 1) {
      return;
    }
    set.add(edgeKey(edge.from, edge.to));
  });

  return set;
}

function buildOccupiedCells(
  tokensOnBoard: Token[],
  tokenSizesById: Record<string, [number, number]>,
  movingTokenId: string,
): Set<string> {
  const occupied = new Set<string>();

  tokensOnBoard.forEach((token) => {
    if (token.id === movingTokenId) {
      return;
    }

    const size = tokenSizesById[token.id] ?? [1, 1];
    const footprint = getFootprintCells(token.position, size);
    footprint.forEach((cell) => occupied.add(cellKey(cell)));
  });

  return occupied;
}

function canCrossEdges(params: {
  from: Point;
  to: Point;
  tokenSizeInCells: [number, number];
  blockedEdgeKeys: Set<string>;
}): boolean {
  const delta = {
    x: params.to.x - params.from.x,
    y: params.to.y - params.from.y,
  };

  const fromFootprint = getFootprintCells(params.from, params.tokenSizeInCells);
  const fromFootprintSet = new Set(fromFootprint.map((cell) => cellKey(cell)));

  for (const destinationCell of getFootprintCells(params.to, params.tokenSizeInCells)) {
    const sourceCell = { x: destinationCell.x - delta.x, y: destinationCell.y - delta.y };
    if (!fromFootprintSet.has(cellKey(sourceCell))) {
      continue;
    }

    if (
      Math.abs(sourceCell.x - destinationCell.x) + Math.abs(sourceCell.y - destinationCell.y) !==
      1
    ) {
      continue;
    }

    if (params.blockedEdgeKeys.has(edgeKey(sourceCell, destinationCell))) {
      return false;
    }
  }

  return true;
}

function canOccupyAnchor(params: {
  anchor: Point;
  tokenSizeInCells: [number, number];
  pageSettings: PageSettings;
  blockedCellKeys: Set<string>;
  occupiedCellKeys: Set<string>;
}): boolean {
  if (!isWithinBoardBounds(params.anchor, params.tokenSizeInCells, params.pageSettings)) {
    return false;
  }

  const footprint = getFootprintCells(params.anchor, params.tokenSizeInCells);
  for (const cell of footprint) {
    const key = cellKey(cell);
    if (params.blockedCellKeys.has(key) || params.occupiedCellKeys.has(key)) {
      return false;
    }
  }

  return true;
}

function canStepToAnchor(params: {
  from: Point;
  to: Point;
  tokenSizeInCells: [number, number];
  pageSettings: PageSettings;
  blockedCellKeys: Set<string>;
  blockedEdgeKeys: Set<string>;
  occupiedCellKeys: Set<string>;
}): boolean {
  if (
    !canOccupyAnchor({
      anchor: params.to,
      tokenSizeInCells: params.tokenSizeInCells,
      pageSettings: params.pageSettings,
      blockedCellKeys: params.blockedCellKeys,
      occupiedCellKeys: params.occupiedCellKeys,
    })
  ) {
    return false;
  }

  return canCrossEdges({
    from: params.from,
    to: params.to,
    tokenSizeInCells: params.tokenSizeInCells,
    blockedEdgeKeys: params.blockedEdgeKeys,
  });
}

export function reconstructPathToCell(
  previousByCell: Record<string, Point | null>,
  startCell: Point,
  targetCell: Point,
): Point[] {
  const startKey = cellKey(startCell);
  const targetKey = cellKey(targetCell);

  if (targetKey === startKey) {
    return [startCell];
  }

  if (!(targetKey in previousByCell)) {
    return [];
  }

  const path: Point[] = [];
  let current: Point | null = targetCell;

  while (current) {
    path.push(current);
    const previous: Point | null = previousByCell[cellKey(current)] ?? null;
    current = previous;
  }

  path.reverse();
  if (path.length === 0 || cellKey(path[0]) !== startKey) {
    return [];
  }

  return path;
}

export function computeMovementRange(input: MovementRangeInput): MovementRangeResult {
  const budget = Math.max(0, Math.floor(input.movementBudgetCells));
  const blockedCellKeys = new Set(input.collisionMap.blockedCells.map((cell) => cellKey(cell)));
  const blockedEdgeKeys = toEdgeBlockSet(input.collisionMap.blockedEdges);
  const occupiedCellKeys = buildOccupiedCells(
    input.tokensOnBoard,
    input.tokenSizesById,
    input.movingTokenId,
  );

  const costByCell = new Map<string, number>();
  const previousByCell = new Map<string, Point | null>();
  const queue: Point[] = [];

  const startKey = cellKey(input.startCell);
  costByCell.set(startKey, 0);
  previousByCell.set(startKey, null);
  queue.push(input.startCell);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      continue;
    }

    const currentCost = costByCell.get(cellKey(current));
    if (currentCost == null || currentCost >= budget) {
      continue;
    }

    for (const direction of ALL_DIRECTIONS) {
      const next = { x: current.x + direction.x, y: current.y + direction.y };
      const isDiagonal = direction.x !== 0 && direction.y !== 0;

      if (
        isDiagonal &&
        (!canStepToAnchor({
          from: current,
          to: { x: current.x + direction.x, y: current.y },
          tokenSizeInCells: input.tokenSizeInCells,
          pageSettings: input.pageSettings,
          blockedCellKeys,
          blockedEdgeKeys,
          occupiedCellKeys,
        }) ||
          !canStepToAnchor({
            from: current,
            to: { x: current.x, y: current.y + direction.y },
            tokenSizeInCells: input.tokenSizeInCells,
            pageSettings: input.pageSettings,
            blockedCellKeys,
            blockedEdgeKeys,
            occupiedCellKeys,
          }))
      ) {
        continue;
      }

      if (
        !canStepToAnchor({
          from: current,
          to: next,
          tokenSizeInCells: input.tokenSizeInCells,
          pageSettings: input.pageSettings,
          blockedCellKeys,
          blockedEdgeKeys,
          occupiedCellKeys,
        })
      ) {
        continue;
      }

      const nextKey = cellKey(next);
      const nextCost = currentCost + 1;
      const previousCost = costByCell.get(nextKey);
      if (previousCost != null && previousCost <= nextCost) {
        continue;
      }

      costByCell.set(nextKey, nextCost);
      previousByCell.set(nextKey, current);
      queue.push(next);
    }
  }

  const reachableCells: Point[] = [];
  const serializedCostByCell: Record<string, number> = {};
  const serializedPreviousByCell: Record<string, Point | null> = {};

  costByCell.forEach((cost, key) => {
    serializedCostByCell[key] = cost;
    const [xRaw, yRaw] = key.split(':');
    const x = Number(xRaw);
    const y = Number(yRaw);
    if (Number.isInteger(x) && Number.isInteger(y)) {
      reachableCells.push({ x, y });
    }
  });

  previousByCell.forEach((previous, key) => {
    serializedPreviousByCell[key] = previous;
  });

  return {
    reachableCells,
    costByCell: serializedCostByCell,
    previousByCell: serializedPreviousByCell,
  };
}

export function isCellReachable(costByCell: Record<string, number>, cell: Point): boolean {
  return cellKey(cell) in costByCell;
}

export function getMovementCost(costByCell: Record<string, number>, cell: Point): number | null {
  const value = costByCell[cellKey(cell)];
  return Number.isInteger(value) ? value : null;
}
