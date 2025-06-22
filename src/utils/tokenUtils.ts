
export const getContrastingTextColor = (hexColor: string): string => {
  if (!hexColor) return "var(--color-foreground)";
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "var(--color-raisin-black)" : "var(--color-platinum)";
};

export const parseSize = (sizeString: string): [number, number] => {
  const parts = sizeString.split('x').map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[0] > 0 && parts[1] > 0) {
    return [parts[0], parts[1]];
  }
  return [1, 1]; 
};
