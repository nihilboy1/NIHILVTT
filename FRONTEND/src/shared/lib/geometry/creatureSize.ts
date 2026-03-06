const CREATURE_SIZE_TO_GRID: Record<string, [number, number]> = {
  tiny: [1, 1],
  small: [1, 1],
  medium: [1, 1],
  large: [2, 2],
  huge: [3, 3],
  gargantuan: [4, 4],
};

export function parseCreatureSizeToGrid(sizeString?: string): [number, number] {
  if (!sizeString) {
    return [1, 1];
  }

  const normalizedSize = sizeString.trim().toLowerCase();
  const mappedSize = CREATURE_SIZE_TO_GRID[normalizedSize];
  if (mappedSize) {
    return mappedSize;
  }

  const match = normalizedSize.match(/^(\d+)x(\d+)$/);
  if (!match) {
    return [1, 1];
  }

  const width = parseInt(match[1], 10);
  const height = parseInt(match[2], 10);
  if (width > 0 && height > 0) {
    return [width, height];
  }

  return [1, 1];
}

