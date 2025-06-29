
export const getContrastingTextColor = (hexColor: string): string => {
  // Verifica se a string é nula/vazia, não começa com # ou não tem 7 caracteres (ex: #RRGGBB)
  if (!hexColor || !hexColor.startsWith('#') || hexColor.length !== 7) {
    return "var(--color-foreground)";
  }

  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Verifica se a conversão para número resultou em NaN (indicando hex inválido)
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return "var(--color-foreground)";
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "var(--color-raisin-black)" : "var(--color-platinum)";
};

export const parseCharacterSize = (sizeString: string): [number, number] => {
  // Usa uma regex para garantir que a string seja exatamente "NxM" onde N e M são números inteiros positivos
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
