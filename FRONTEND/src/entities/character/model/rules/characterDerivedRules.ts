import type { Character } from "@/entities/character/model/schemas/character.schema";

import type { ProficiencyLevelEnum } from "@nihilvtt/datamodeling/primitives";
import type { z } from "zod";


export type ProficiencyLevel = z.infer<typeof ProficiencyLevelEnum>;

export function getAbilityModifier(attributeValue: number): number {
  return Math.floor((attributeValue - 10) / 2);
}

export function getPlayerProficiencyBonusFromLevel(level: number): number {
  const effectiveLevel = Math.max(1, level);
  return Math.ceil(effectiveLevel / 4) + 1;
}

export function getNpcProficiencyBonusFromChallengeRating(
  challengeRating: number,
): number {
  if (challengeRating <= 4) return 2;
  if (challengeRating <= 8) return 3;
  if (challengeRating <= 12) return 4;
  if (challengeRating <= 16) return 5;
  if (challengeRating <= 20) return 6;
  if (challengeRating <= 24) return 7;
  if (challengeRating <= 28) return 8;

  return 9;
}

export function getCharacterProficiencyBonus(character: Character): number {
  if (character.type === "Player") {
    return getPlayerProficiencyBonusFromLevel(character.level);
  }

  if (character.type === "NPC") {
    return getNpcProficiencyBonusFromChallengeRating(character.challengeRating);
  }

  return 0;
}

export function getProficiencyMultiplier(level: ProficiencyLevel): number {
  if (level === "expertise") {
    return 2;
  }

  if (level === "proficient") {
    return 1;
  }

  return 0;
}
