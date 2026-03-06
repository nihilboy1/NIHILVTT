import { PHB2024CLASSES, PHB2024ORIGINS, PHB2024SPECIES } from '@nihilvtt/datamodeling/data';

import { getPlayerProficiencyBonusFromLevel } from '@/entities/character/model/rules/characterDerivedRules';
import type { PlayerCharacter } from '@/entities/character/model/schemas/character.schema';
import type { PlayerCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';

export type PlayerCharacterViewModel = {
  id: string;
  name: string;
  image: string;
  notes: string;
  inspiration: boolean;
  level: number;
  proficiencyBonus: number;
  classLabel: string;
  subclassLabel: string;
  backgroundLabel: string;
  speciesLabel: string;
};

function getClassDisplayName(classId: string | null | undefined): string {
  if (!classId) {
    return '-';
  }

  const characterClass = PHB2024CLASSES.find((entry) => entry.id === classId);
  if (!characterClass) {
    return classId;
  }

  return characterClass.name[1] ?? characterClass.name[0] ?? characterClass.id;
}

function getOriginDisplayName(originId: string | null | undefined): string {
  if (!originId) {
    return '-';
  }

  const origin = PHB2024ORIGINS.find((entry) => entry.id === originId);
  if (!origin) {
    return originId;
  }

  return origin.name[0] ?? origin.name[1] ?? origin.id;
}

function getSpecieDisplayName(specieId: string | null | undefined): string {
  if (!specieId) {
    return '-';
  }

  const specie = PHB2024SPECIES.find((entry) => entry.id === specieId);
  if (!specie) {
    return specieId;
  }

  return specie.name[0] ?? specie.name[1] ?? specie.id;
}

export function buildPlayerCharacterViewModel(
  character: PlayerCharacter,
): PlayerCharacterViewModel {
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    notes: character.notes ?? '',
    inspiration: character.inspiration,
    level: character.level,
    proficiencyBonus: getPlayerProficiencyBonusFromLevel(character.level),
    classLabel: character.charClass || '-',
    subclassLabel: character.subclass || '-',
    backgroundLabel: character.background || '-',
    speciesLabel: character.species || '-',
  };
}

export function buildPlayerCharacterViewModelFromRuntime(
  character: PlayerCharacterRuntime,
): PlayerCharacterViewModel {
  return {
    id: character.id,
    name: character.name,
    image: character.image ?? '',
    notes: character.notes ?? '',
    inspiration: character.inspiration,
    level: character.progression.currentLevel,
    proficiencyBonus: getPlayerProficiencyBonusFromLevel(
      character.progression.currentLevel,
    ),
    classLabel: getClassDisplayName(character.build.classId),
    subclassLabel: character.build.subclassId ?? '-',
    backgroundLabel: getOriginDisplayName(character.build.originId),
    speciesLabel: getSpecieDisplayName(character.build.specieId),
  };
}
