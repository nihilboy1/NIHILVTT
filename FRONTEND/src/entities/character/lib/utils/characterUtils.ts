import type React from 'react';

import { parseCreatureSizeToGrid } from '@/shared/lib/geometry/creatureSize';

export function handleNumericInputKeyDown(
  e: React.KeyboardEvent<HTMLInputElement>,
  range: { min: number; max: number },
) {
  const { key, ctrlKey, metaKey, altKey } = e;
  const isModifierKey = ctrlKey || metaKey || altKey;
  const isNavigationOrEditKey = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    'Home',
    'End',
  ].includes(key);

  if (isModifierKey || isNavigationOrEditKey) {
    return;
  }

  const inputElement = e.target as HTMLInputElement;
  const { value, selectionStart, selectionEnd } = inputElement;
  const predictedValue =
    value.substring(0, selectionStart ?? 0) + key + value.substring(selectionEnd ?? 0);

  if (predictedValue === '') {
    return;
  }

  if (!/^\d$/.test(key)) {
    e.preventDefault();
    return;
  }

  const numValue = Number(predictedValue);
  if (Number.isNaN(numValue) || numValue < range.min || numValue > range.max) {
    e.preventDefault();
  }
}

export const getContrastingTextColor = (hexColor: string | null | undefined): string => {
  if (!hexColor || !hexColor.startsWith('#') || hexColor.length !== 7) {
    return 'var(--color-foreground)';
  }

  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return 'var(--color-foreground)';
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'var(--color-raisin-black)' : 'var(--color-platinum)';
};

export const parseCharacterSize = (sizeString: string): [number, number] => {
  return parseCreatureSizeToGrid(sizeString);
};
