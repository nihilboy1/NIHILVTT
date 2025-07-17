import { PlayerCharacter } from "@/entities/character/model/schemas/character.schema";
import { getModifier, getProficiencyBonusFromLevel } from "@/entities/character/lib/utils/characterUtils";

export function useCharacterCalculations(character: PlayerCharacter) {
  const level = character.level;
  const dexterity = character.attributes.dexterity;
  const wisdom = character.attributes.wisdom;
  const isPerceptionProficient = character.proficiencies.skills.perception;
  const speed = character.combatStats.speed;

  const dexModifier = getModifier(dexterity);
  const wisModifier = getModifier(wisdom);
  const proficiencyBonus = getProficiencyBonusFromLevel(level);
  const speedInMeters = (speed * 0.3).toFixed(2);
  const speedInSquares = (speed / 5).toFixed(2);

  const calculatedInitiative = dexModifier;
  const calculatedPassivePerception =
    10 + wisModifier + (isPerceptionProficient ? proficiencyBonus : 0);

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
