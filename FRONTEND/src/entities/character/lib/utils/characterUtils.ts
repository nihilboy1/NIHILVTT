


export function getModifier(attributeValue: number): number {
  return Math.floor((attributeValue - 10) / 2);
}


export const getProficiencyBonusFromLevel = (level: number): number => {
  
  const effectiveLevel = Math.max(1, level);

  
  return Math.ceil(effectiveLevel / 4) + 1;
};


export const getProficiencyBonusFromCR = (challengeRating: number): number => {
  if (challengeRating <= 4) return 2;
  if (challengeRating <= 8) return 3;
  if (challengeRating <= 12) return 4;
  if (challengeRating <= 16) return 5;
  if (challengeRating <= 20) return 6;
  if (challengeRating <= 24) return 7;
  if (challengeRating <= 28) return 8;

  
  return 9;
};

export const calculateProficiencyBonus = (character: Character): number => {
  if (character.type === 'Player') {
    return getProficiencyBonusFromLevel(character.level);
  }
  if (character.type === 'NPC') {
    return getProficiencyBonusFromCR(character.challengeRating);
  }
  
  return 0;
};

export function getSkillBonus(
  isProficient: boolean,
  attributeModifier: number,
  proficiencyBonus: number,
): number {
  return attributeModifier + (isProficient ? proficiencyBonus : 0);
}


export function getInitiative(dexterityModifier: number): number {
  return dexterityModifier; 
}


export function getPassivePerception(
  wisdomModifier: number,
  perceptionProficiency: boolean,
  proficiencyBonus: number,
): number {
  return 10 + wisdomModifier + (perceptionProficiency ? proficiencyBonus : 0);
}


import type React from 'react';

import { Character } from '../../model/schemas/character.schema';


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
  if (isNaN(numValue) || numValue < range.min || numValue > range.max) {
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

  
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return 'var(--color-foreground)';
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'var(--color-raisin-black)' : 'var(--color-platinum)';
};

export const parseCharacterSize = (sizeString: string): [number, number] => {
  
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
