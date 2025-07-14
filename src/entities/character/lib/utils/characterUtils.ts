// src/entities/character/lib/utils/sheetUtils.ts

/**
 * Calcula o modificador de atributo com base no valor do atributo.
 * @param attributeValue O valor numérico do atributo (ex: 14).
 * @returns O modificador de atributo (ex: 2 para 14).
 */
export function getModifier(attributeValue: number): number {
  return Math.floor((attributeValue - 10) / 2);
}

/**
 * Calcula o bônus de proficiência de um personagem com base em seu nível.
 * A fórmula segue a tabela oficial de D&D 5e:
 * Níveis 1-4: +2
 * Níveis 5-8: +3
 * Níveis 9-12: +4
 * Níveis 13-16: +5
 * Níveis 17-20: +6
 * * @param level O nível do personagem (deve ser 1 ou maior).
 * @returns O bônus de proficiência calculado.
 */
export const getProficiencyBonusFromLevel = (level: number): number => {
  // Garante que o nível não seja menor que 1 para evitar resultados inesperados.
  const effectiveLevel = Math.max(1, level);

  // A fórmula matemática para a progressão do bônus de proficiência.
  return Math.ceil(effectiveLevel / 4) + 1;
};

/**
 * Calcula o bônus de proficiência de uma criatura com base em seu Nível de Desafio (CR).
 * A fórmula segue a tabela oficial do Guia do Mestre de D&D 5e.
 * * @param challengeRating O Nível de Desafio (CR) da criatura.
 * @returns O bônus de proficiência calculado.
 */
export const getProficiencyBonusFromCR = (challengeRating: number): number => {
  if (challengeRating <= 4) return 2;
  if (challengeRating <= 8) return 3;
  if (challengeRating <= 12) return 4;
  if (challengeRating <= 16) return 5;
  if (challengeRating <= 20) return 6;
  if (challengeRating <= 24) return 7;
  if (challengeRating <= 28) return 8;

  // Para CR 29 ou maior
  return 9;
};

export const calculateProficiencyBonus = (character: Character): number => {
  if (character.type === 'Player') {
    return getProficiencyBonusFromLevel(character.level);
  }
  if (character.type === 'Monster/NPC') {
    return getProficiencyBonusFromCR(character.challengeRating);
  }
  // Objetos ou outros tipos não têm bônus de proficiência.
  return 0;
};
/**
 * Calcula o bônus total de uma perícia.
 * @param isProficient Indica se o personagem é proficiente na perícia.
 * @param attributeModifier O modificador do atributo base da perícia.
 * @param proficiencyBonus O bônus de proficiência do personagem.
 * @returns O bônus total da perícia.
 */
export function getSkillBonus(
  isProficient: boolean,
  attributeModifier: number,
  proficiencyBonus: number
): number {
  return attributeModifier + (isProficient ? proficiencyBonus : 0);
}

/**
 * Calcula o valor da iniciativa.
 * @param dexterityModifier O modificador de Destreza do personagem.
 * @returns O valor da iniciativa.
 */
export function getInitiative(dexterityModifier: number): number {
  return dexterityModifier; // Em D&D 5e, a iniciativa é o modificador de Destreza
}

/**
 * Calcula o valor da Percepção Passiva.
 * @param wisdomModifier O modificador de Sabedoria do personagem.
 * @param perceptionProficiency Indica se o personagem é proficiente em Percepção.
 * @param proficiencyBonus O bônus de proficiência do personagem.
 * @returns O valor da Percepção Passiva.
 */
export function getPassivePerception(
  wisdomModifier: number,
  perceptionProficiency: boolean,
  proficiencyBonus: number
): number {
  return 10 + wisdomModifier + (perceptionProficiency ? proficiencyBonus : 0);
}
// src/shared/lib/utils/inputUtils.ts

import type React from "react";
import { Character } from "../../model/schemas/character.schema";

// A função agora é exportada para que outros arquivos possam usá-la
export function handleNumericInputKeyDown(
  e: React.KeyboardEvent<HTMLInputElement>,
  range: { min: number; max: number }
) {
  const { key, ctrlKey, metaKey, altKey } = e;
  const isModifierKey = ctrlKey || metaKey || altKey;
  const isNavigationOrEditKey = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Home",
    "End",
  ].includes(key);

  if (isModifierKey || isNavigationOrEditKey) {
    return;
  }

  const inputElement = e.target as HTMLInputElement;
  const { value, selectionStart, selectionEnd } = inputElement;
  const predictedValue =
    value.substring(0, selectionStart ?? 0) +
    key +
    value.substring(selectionEnd ?? 0);

  if (predictedValue === "") {
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

export const getContrastingTextColor = (hexColor: string): string => {
  // Verifica se a string é nula/vazia, não começa com # ou não tem 7 caracteres (ex: #RRGGBB)
  if (!hexColor || !hexColor.startsWith("#") || hexColor.length !== 7) {
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
  return luminance > 0.5
    ? "var(--color-raisin-black)"
    : "var(--color-platinum)";
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
