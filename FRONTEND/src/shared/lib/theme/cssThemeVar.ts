function parseCssColorToHex(value: string): string | null {
  const raw = value.trim();
  if (raw.length === 0) {
    return null;
  }

  if (raw.startsWith('#')) {
    const hex = raw.slice(1);
    if (/^[0-9a-fA-F]{6}$/.test(hex)) {
      return `#${hex.toUpperCase()}`;
    }

    if (/^[0-9a-fA-F]{3}$/.test(hex)) {
      const expanded = hex
        .split('')
        .map((part) => `${part}${part}`)
        .join('')
        .toUpperCase();
      return `#${expanded}`;
    }

    return null;
  }

  const rgbMatch = raw.match(/^rgba?\(([^)]+)\)$/i);
  if (!rgbMatch) {
    return null;
  }

  const parts = rgbMatch[1]?.split(',').map((part) => Number.parseInt(part.trim(), 10)) ?? [];
  if (parts.length < 3) {
    return null;
  }

  const [r, g, b] = parts;
  if ([r, g, b].some((channel) => Number.isNaN(channel) || channel < 0 || channel > 255)) {
    return null;
  }

  return `#${(((r & 255) << 16) | ((g & 255) << 8) | (b & 255)).toString(16).padStart(6, '0').toUpperCase()}`;
}

export function readRequiredThemeHexColor(cssVarName: string): string {
  if (typeof window === 'undefined') {
    throw new Error(
      `Violação de contrato de tema: window indisponível para leitura de ${cssVarName}.`,
    );
  }

  const styles = window.getComputedStyle(document.documentElement);
  const rawValue = styles.getPropertyValue(cssVarName).trim();
  if (rawValue.length === 0) {
    throw new Error(`Violação de contrato de tema: CSS var obrigatória ausente (${cssVarName}).`);
  }

  const hex = parseCssColorToHex(rawValue);
  if (!hex) {
    throw new Error(
      `Violação de contrato de tema: CSS var com cor inválida para hex (${cssVarName}=${rawValue}).`,
    );
  }

  return hex;
}
