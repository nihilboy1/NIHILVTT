import { getMonsterTermLabelPtBr } from '@nihilvtt/datamodeling/shared';

const METERS_PER_FOOT = 0.3;

export function translateMonsterTermToPtBr(value: string | undefined): string {
  if (!value) {
    return '-';
  }

  const raw = value.trim();
  if (raw.length === 0) {
    return '-';
  }

  const translated = getMonsterTermLabelPtBr(raw);
  if (translated) {
    return translated;
  }

  throw new Error(`Violacao de contrato de glossario: termo sem traducao PT-BR (${raw}).`);
}

export function translateMonsterListToPtBr(values: string[] | undefined): string {
  if (!values || values.length === 0) {
    return '-';
  }

  return values.map((value) => translateMonsterTermToPtBr(value)).join(', ');
}

function formatMetersValue(meters: number): string {
  const roundedToTenth = Math.round(meters * 10) / 10;
  if (Number.isInteger(roundedToTenth)) {
    return `${roundedToTenth}m`;
  }

  return `${roundedToTenth.toFixed(1)}m`;
}

export function convertFeetToMetersDisplay(feet: number): string {
  return formatMetersValue(feet * METERS_PER_FOOT);
}

export function replaceFeetTokensWithMeters(value: string): string {
  return value.replace(/(\d+(?:\.\d+)?)\s*ft\b/gi, (match, rawFeet: string) => {
    const feet = Number(rawFeet);
    if (!Number.isFinite(feet)) {
      return match;
    }

    return convertFeetToMetersDisplay(feet);
  });
}

export function translateSpeedSummaryToPtBr(summary: string | undefined): string {
  if (!summary) {
    return '-';
  }

  const segments = summary
    .split(',')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  if (segments.length === 0) {
    return '-';
  }

  return segments
    .map((segment) => {
      const parts = segment.split(' ');
      if (parts.length === 0) {
        return segment;
      }

      const translatedMode = translateMonsterTermToPtBr(parts[0]);
      if (parts.length === 1) {
        return translatedMode;
      }

      const convertedValue = replaceFeetTokensWithMeters(parts.slice(1).join(' '));
      return `${translatedMode} ${convertedValue}`;
    })
    .join(', ');
}
