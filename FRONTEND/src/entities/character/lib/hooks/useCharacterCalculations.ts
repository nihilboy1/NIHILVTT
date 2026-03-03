import {
  getAbilityModifier,
  getPlayerProficiencyBonusFromLevel,
  getProficiencyMultiplier,
} from '@/entities/character/model/rules/characterDerivedRules';
import { PlayerCharacterCalculationsViewModel } from '@/entities/character/model/view-models/playerCharacterCalculationsViewModel';

export function useCharacterCalculations(
  character: PlayerCharacterCalculationsViewModel,
) {
  const dexModifier = getAbilityModifier(character.dexterity);
  const wisModifier = getAbilityModifier(character.wisdom);
  const proficiencyBonus = getPlayerProficiencyBonusFromLevel(character.level);
  const speedInMeters = (character.speed * 0.3).toFixed(2);
  const speedInSquares = (character.speed / 5).toFixed(2);

  const calculatedInitiative = dexModifier;
  const calculatedPassivePerception =
    10 +
    wisModifier +
    proficiencyBonus * getProficiencyMultiplier(character.perceptionProficiencyLevel);

  return {
    dexModifier,
    wisModifier,
    proficiencyBonus,
    speedInMeters,
    speedInSquares,
    calculatedInitiative,
    calculatedPassivePerception,
  };
}
