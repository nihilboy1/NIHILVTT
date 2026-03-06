import { PageSettings, Token } from '@/shared/api/types';

import {
  computeMovementRange,
  getMovementCost,
  isCellReachable,
  reconstructPathToCell,
} from './movementPathfinding';

const PAGE: PageSettings = {
  widthInUnits: 12,
  heightInUnits: 12,
  backgroundColor: '#000000',
};

function createToken(id: string, x: number, y: number): Token {
  return {
    id,
    characterId: `char-${id}`,
    sceneId: 'default-scene',
    position: { x, y },
  };
}

describe('movementPathfinding', () => {
  it('computes reachable cells with chebyshev step cost', () => {
    const result = computeMovementRange({
      startCell: { x: 5, y: 5 },
      tokenSizeInCells: [1, 1],
      movementBudgetCells: 2,
      pageSettings: PAGE,
      collisionMap: { blockedCells: [], blockedEdges: [] },
      tokensOnBoard: [createToken('moving', 5, 5)],
      tokenSizesById: { moving: [1, 1] },
      movingTokenId: 'moving',
    });

    expect(isCellReachable(result.costByCell, { x: 7, y: 7 })).toBe(true);
    expect(getMovementCost(result.costByCell, { x: 7, y: 7 })).toBe(2);
    expect(isCellReachable(result.costByCell, { x: 8, y: 8 })).toBe(false);
  });

  it('blocks movement through blocked cell and occupied cells', () => {
    const result = computeMovementRange({
      startCell: { x: 3, y: 3 },
      tokenSizeInCells: [1, 1],
      movementBudgetCells: 3,
      pageSettings: PAGE,
      collisionMap: {
        blockedCells: [{ x: 4, y: 3 }],
        blockedEdges: [],
      },
      tokensOnBoard: [createToken('moving', 3, 3), createToken('other', 3, 4)],
      tokenSizesById: { moving: [1, 1], other: [1, 1] },
      movingTokenId: 'moving',
    });

    expect(isCellReachable(result.costByCell, { x: 4, y: 3 })).toBe(false);
    expect(isCellReachable(result.costByCell, { x: 3, y: 4 })).toBe(false);
  });

  it('respects blocked edges and prevents diagonal corner-cutting', () => {
    const result = computeMovementRange({
      startCell: { x: 2, y: 2 },
      tokenSizeInCells: [1, 1],
      movementBudgetCells: 1,
      pageSettings: PAGE,
      collisionMap: {
        blockedCells: [],
        blockedEdges: [
          { from: { x: 2, y: 2 }, to: { x: 3, y: 2 } },
          { from: { x: 2, y: 2 }, to: { x: 2, y: 3 } },
        ],
      },
      tokensOnBoard: [createToken('moving', 2, 2)],
      tokenSizesById: { moving: [1, 1] },
      movingTokenId: 'moving',
    });

    expect(isCellReachable(result.costByCell, { x: 3, y: 2 })).toBe(false);
    expect(isCellReachable(result.costByCell, { x: 2, y: 3 })).toBe(false);
    expect(isCellReachable(result.costByCell, { x: 3, y: 3 })).toBe(false);
  });

  it('handles large token footprint against board limits', () => {
    const result = computeMovementRange({
      startCell: { x: 10, y: 10 },
      tokenSizeInCells: [2, 2],
      movementBudgetCells: 1,
      pageSettings: PAGE,
      collisionMap: { blockedCells: [], blockedEdges: [] },
      tokensOnBoard: [createToken('moving', 10, 10)],
      tokenSizesById: { moving: [2, 2] },
      movingTokenId: 'moving',
    });

    expect(isCellReachable(result.costByCell, { x: 11, y: 11 })).toBe(false);
    expect(isCellReachable(result.costByCell, { x: 9, y: 9 })).toBe(true);
  });

  it('reconstructs path using previous map', () => {
    const result = computeMovementRange({
      startCell: { x: 5, y: 5 },
      tokenSizeInCells: [1, 1],
      movementBudgetCells: 3,
      pageSettings: PAGE,
      collisionMap: { blockedCells: [], blockedEdges: [] },
      tokensOnBoard: [createToken('moving', 5, 5)],
      tokenSizesById: { moving: [1, 1] },
      movingTokenId: 'moving',
    });

    const path = reconstructPathToCell(result.previousByCell, { x: 5, y: 5 }, { x: 7, y: 6 });
    expect(path.length).toBeGreaterThan(0);
    expect(path[0]).toEqual({ x: 5, y: 5 });
    expect(path[path.length - 1]).toEqual({ x: 7, y: 6 });
  });
});
