import type { ProficiencyLevel } from '@/entities/character/model/rules/characterDerivedRules';
import { getArmorClassFromEquipment } from '@/entities/character/model/rules/itemDerivedRules';
import { getBaseWalkSpeedFromSpecieId } from '@/entities/character/model/rules/specieDerivedRules';
import type {
  HitDiceEntry,
  PlayerCharacter,
} from '@/entities/character/model/schemas/character.schema';
import type { PlayerCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';

export type PlayerCharacterCombatViewModel = {
  level: number;
  strength: number;
  dexterity: number;
  wisdom: number;
  perceptionProficiencyLevel: ProficiencyLevel;
  speed: number;
  armorClass: number;
  shieldEquipped: boolean;
  currentHp: number;
  tempHp: number;
  maxHp: number;
  hitDiceEntries: HitDiceEntry[];
};

export function buildPlayerCharacterCombatViewModel(
  character: PlayerCharacter,
  runtimeCharacter?: PlayerCharacterRuntime | null,
): PlayerCharacterCombatViewModel {
  return {
    level: runtimeCharacter?.progression.currentLevel ?? character.level,
    strength: runtimeCharacter?.attributes.base.strength ?? character.attributes.strength,
    dexterity: runtimeCharacter?.attributes.base.dexterity ?? character.attributes.dexterity,
    wisdom: runtimeCharacter?.attributes.base.wisdom ?? character.attributes.wisdom,
    perceptionProficiencyLevel: character.proficiencies.skills.perception,
    speed: runtimeCharacter
      ? getBaseWalkSpeedFromSpecieId(
          runtimeCharacter.build.specieId,
          character.combatStats.speed,
        )
      : character.combatStats.speed,
    armorClass: runtimeCharacter
      ? getArmorClassFromEquipment(
          runtimeCharacter.equipment.bodyArmorItemId,
          runtimeCharacter.equipment.shieldItemId,
          runtimeCharacter.attributes.base.dexterity,
          character.combatStats.armorClass,
        )
      : character.combatStats.armorClass,
    shieldEquipped: runtimeCharacter
      ? runtimeCharacter.equipment.shieldItemId !== null
      : (character.combatStats.shieldEquipped ?? false),
    currentHp: runtimeCharacter?.hitPoints.current ?? character.combatStats.currentHp,
    tempHp: runtimeCharacter?.hitPoints.temporary ?? character.combatStats.tempHp ?? 0,
    maxHp: runtimeCharacter ? runtimeCharacter.hitPoints.max : character.combatStats.maxHp,
    hitDiceEntries: character.hitDiceEntries,
  };
}
