export const parseTokenSize = (sizeString?: string): [number, number] => {
  if (!sizeString) return [1, 1];

  const match = sizeString.trim().match(/^(\d+)x(\d+)$/);
  if (match) {
    const width = parseInt(match[1]);
    const height = parseInt(match[2]);
    if (width > 0 && height > 0) {
      return [width, height];
    }
  }
  return [1, 1];
};
