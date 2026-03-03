import type { ProficiencyLevelEnum } from '@nihilvtt/datamodeling/primitives';
import type { z } from 'zod';

import type { PlayerCharacter } from '@/entities/character/model/schemas/character.schema';

export type ProficiencyLevel = z.infer<typeof ProficiencyLevelEnum>;

export type PlayerCharacterCalculationsViewModel = {
  level: number;
  dexterity: number;
  wisdom: number;
  perceptionProficiencyLevel: ProficiencyLevel;
  speed: number;
};

export function buildPlayerCharacterCalculationsViewModel(
  character: Pick<PlayerCharacter, 'level'> & {
    attributes: Pick<PlayerCharacter['attributes'], 'dexterity' | 'wisdom'>;
    proficiencies: {
      skills: Pick<PlayerCharacter['proficiencies']['skills'], 'perception'>;
    };
    combatStats: Pick<PlayerCharacter['combatStats'], 'speed'>;
  },
): PlayerCharacterCalculationsViewModel {
  return {
    level: character.level,
    dexterity: character.attributes.dexterity,
    wisdom: character.attributes.wisdom,
    perceptionProficiencyLevel: character.proficiencies.skills.perception,
    speed: character.combatStats.speed,
  };
}
