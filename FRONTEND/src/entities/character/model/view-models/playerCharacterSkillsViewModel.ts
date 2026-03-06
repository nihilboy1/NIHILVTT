import {
  getAbilityModifier,
  getPlayerProficiencyBonusFromLevel,
  getProficiencyMultiplier,
} from '@/entities/character/model/rules/characterDerivedRules';
import type { PlayerCharacter } from '@/entities/character/model/schemas/character.schema';

import type { ProficiencyLevelEnum } from '@nihilvtt/datamodeling/primitives';
import type { z } from 'zod';


export type ProficiencyLevel = z.infer<typeof ProficiencyLevelEnum>;

type AttributeName = keyof PlayerCharacter['attributes'];
type SkillName = keyof PlayerCharacter['proficiencies']['skills'];

const SKILL_ATTRIBUTE_MAP: Record<SkillName, AttributeName> = {
  acrobatics: 'dexterity',
  animalHandling: 'wisdom',
  arcana: 'intelligence',
  athletics: 'strength',
  deception: 'charisma',
  history: 'intelligence',
  insight: 'wisdom',
  intimidation: 'charisma',
  investigation: 'intelligence',
  medicine: 'wisdom',
  nature: 'intelligence',
  perception: 'wisdom',
  performance: 'charisma',
  persuasion: 'charisma',
  religion: 'intelligence',
  sleightOfHand: 'dexterity',
  stealth: 'dexterity',
  survival: 'wisdom',
};

export type SkillBonusViewModel = {
  proficiencyLevel: ProficiencyLevel;
  totalBonus: number;
};

export type PlayerCharacterSkillsViewModel = {
  proficiencyBonus: number;
  attributeValues: Record<AttributeName, number>;
  attributeModifiers: Record<AttributeName, number>;
  savingThrowBonuses: Record<AttributeName, SkillBonusViewModel>;
  skillBonuses: Record<SkillName, SkillBonusViewModel>;
};

function buildBonus(
  baseModifier: number,
  proficiencyLevel: ProficiencyLevel,
  proficiencyBonus: number,
): SkillBonusViewModel {
  return {
    proficiencyLevel,
    totalBonus:
      baseModifier + proficiencyBonus * getProficiencyMultiplier(proficiencyLevel),
  };
}

export function buildPlayerCharacterSkillsViewModel(
  character: Pick<PlayerCharacter, 'level' | 'attributes' | 'proficiencies'>,
): PlayerCharacterSkillsViewModel {
  const proficiencyBonus = getPlayerProficiencyBonusFromLevel(character.level);

  const attributeValues = { ...character.attributes };
  const attributeModifiers = {
    strength: getAbilityModifier(character.attributes.strength),
    dexterity: getAbilityModifier(character.attributes.dexterity),
    constitution: getAbilityModifier(character.attributes.constitution),
    intelligence: getAbilityModifier(character.attributes.intelligence),
    wisdom: getAbilityModifier(character.attributes.wisdom),
    charisma: getAbilityModifier(character.attributes.charisma),
  };

  const savingThrowBonuses = {
    strength: buildBonus(
      attributeModifiers.strength,
      character.proficiencies.savingThrows.strength,
      proficiencyBonus,
    ),
    dexterity: buildBonus(
      attributeModifiers.dexterity,
      character.proficiencies.savingThrows.dexterity,
      proficiencyBonus,
    ),
    constitution: buildBonus(
      attributeModifiers.constitution,
      character.proficiencies.savingThrows.constitution,
      proficiencyBonus,
    ),
    intelligence: buildBonus(
      attributeModifiers.intelligence,
      character.proficiencies.savingThrows.intelligence,
      proficiencyBonus,
    ),
    wisdom: buildBonus(
      attributeModifiers.wisdom,
      character.proficiencies.savingThrows.wisdom,
      proficiencyBonus,
    ),
    charisma: buildBonus(
      attributeModifiers.charisma,
      character.proficiencies.savingThrows.charisma,
      proficiencyBonus,
    ),
  };

  const skillBonuses = {
    acrobatics: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.acrobatics],
      character.proficiencies.skills.acrobatics,
      proficiencyBonus,
    ),
    animalHandling: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.animalHandling],
      character.proficiencies.skills.animalHandling,
      proficiencyBonus,
    ),
    arcana: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.arcana],
      character.proficiencies.skills.arcana,
      proficiencyBonus,
    ),
    athletics: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.athletics],
      character.proficiencies.skills.athletics,
      proficiencyBonus,
    ),
    deception: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.deception],
      character.proficiencies.skills.deception,
      proficiencyBonus,
    ),
    history: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.history],
      character.proficiencies.skills.history,
      proficiencyBonus,
    ),
    insight: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.insight],
      character.proficiencies.skills.insight,
      proficiencyBonus,
    ),
    intimidation: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.intimidation],
      character.proficiencies.skills.intimidation,
      proficiencyBonus,
    ),
    investigation: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.investigation],
      character.proficiencies.skills.investigation,
      proficiencyBonus,
    ),
    medicine: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.medicine],
      character.proficiencies.skills.medicine,
      proficiencyBonus,
    ),
    nature: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.nature],
      character.proficiencies.skills.nature,
      proficiencyBonus,
    ),
    perception: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.perception],
      character.proficiencies.skills.perception,
      proficiencyBonus,
    ),
    performance: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.performance],
      character.proficiencies.skills.performance,
      proficiencyBonus,
    ),
    persuasion: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.persuasion],
      character.proficiencies.skills.persuasion,
      proficiencyBonus,
    ),
    religion: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.religion],
      character.proficiencies.skills.religion,
      proficiencyBonus,
    ),
    sleightOfHand: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.sleightOfHand],
      character.proficiencies.skills.sleightOfHand,
      proficiencyBonus,
    ),
    stealth: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.stealth],
      character.proficiencies.skills.stealth,
      proficiencyBonus,
    ),
    survival: buildBonus(
      attributeModifiers[SKILL_ATTRIBUTE_MAP.survival],
      character.proficiencies.skills.survival,
      proficiencyBonus,
    ),
  };

  return {
    proficiencyBonus,
    attributeValues,
    attributeModifiers,
    savingThrowBonuses,
    skillBonuses,
  };
}
