import { z } from 'zod';

import { Character, PlayerCharacter, characterSchema } from '@/entities/character/model/schemas/character.schema';
import { DEFAULT_PLAYER_DATA, DEFAULT_TOKEN_IMAGE } from '@/entities/character/config/sheetDefaults';
import {
  playerCharacterRuntimeSchema,
  type PlayerCharacterRuntime,
} from '@/entities/character/model/schemas/playerCharacterRuntime.schema';
import { getArmorClassFromEquipment } from '@/entities/character/model/rules/itemDerivedRules';
import { getBaseWalkSpeedFromSpecieId } from '@/entities/character/model/rules/specieDerivedRules';
import { generateUniqueId } from '@/shared/lib/utils/id/idUtils';

export type NormalizedCharacterEntry = {
  character: Character;
  runtimeCharacter: PlayerCharacterRuntime | null;
};

const deepCloneDefaultPlayer = (): Omit<PlayerCharacter, 'id' | 'type'> =>
  JSON.parse(JSON.stringify(DEFAULT_PLAYER_DATA)) as Omit<PlayerCharacter, 'id' | 'type'>;

function adaptRuntimePlayerCharacterToSheetModel(character: PlayerCharacterRuntime): PlayerCharacter {
  const base = deepCloneDefaultPlayer();

  const sheetCharacter: PlayerCharacter = {
    ...base,
    id: character.id,
    type: 'Player',
    name: character.name,
    image: character.image ?? DEFAULT_TOKEN_IMAGE,
    notes: character.notes ?? '',
    attributes: { ...character.attributes.base },
    combatStats: {
      ...base.combatStats,
      currentHp: character.hitPoints.current,
      maxHp: character.hitPoints.max,
      tempHp: character.hitPoints.temporary,
      armorClass: getArmorClassFromEquipment(
        character.equipment.bodyArmorItemId,
        character.equipment.shieldItemId,
        character.attributes.base.dexterity,
        base.combatStats.armorClass,
      ),
      speed: getBaseWalkSpeedFromSpecieId(
        character.build.specieId,
        base.combatStats.speed,
      ),
      shieldEquipped: character.equipment.shieldItemId !== null,
    },
    level: character.progression.currentLevel,
    inspiration: character.inspiration,
    charClass: character.build.classId,
    subclass: character.build.subclassId ?? '',
    background: character.build.originId,
    species: character.build.specieId,
    equipment: character.inventory.items.map((item) => ({
      id: generateUniqueId(),
      name: item.itemId,
      quantity: item.quantity,
      equipped:
        item.itemId === character.equipment.bodyArmorItemId ||
        item.itemId === character.equipment.shieldItemId ||
        item.itemId === character.equipment.mainHandWeaponId ||
        item.itemId === character.equipment.offHandWeaponId,
    })),
  };

  return sheetCharacter;
}

export function parseRuntimePlayerCharacter(
  entry: unknown,
): PlayerCharacterRuntime | null {
  const runtimeParsed = playerCharacterRuntimeSchema.safeParse(entry);
  return runtimeParsed.success ? runtimeParsed.data : null;
}

export function normalizeCharacterEntry(
  entry: unknown,
): NormalizedCharacterEntry | null {
  const runtimeCharacter = parseRuntimePlayerCharacter(entry);
  if (!runtimeCharacter) {
    return null;
  }

  return {
    character: adaptRuntimePlayerCharacterToSheetModel(runtimeCharacter),
    runtimeCharacter,
  };
}

export function requireNormalizedCharacterEntry(
  entry: unknown,
  context: string,
): NormalizedCharacterEntry {
  const runtimeParsed = playerCharacterRuntimeSchema.safeParse(entry);
  if (!runtimeParsed.success) {
    const formattedError = JSON.stringify(z.treeifyError(runtimeParsed.error), null, 2);
    console.error(`Violação de contrato de sessão em ${context}. Payload recebido:`, entry);
    console.error(`Detalhes da validação em ${context}:`, formattedError);
    throw new Error(`Violação de contrato de sessão em ${context}: PlayerCharacterState inválido.`);
  }

  return {
    character: adaptRuntimePlayerCharacterToSheetModel(runtimeParsed.data),
    runtimeCharacter: runtimeParsed.data,
  };
}

export function normalizeCharacterForStore(entry: unknown): Character | null {
  const runtimeEntry = normalizeCharacterEntry(entry);
  if (runtimeEntry) {
    return runtimeEntry.character;
  }

  const sheetModelParsed = characterSchema.safeParse(entry);
  return sheetModelParsed.success ? sheetModelParsed.data : null;
}

export function parseSessionCharacter(entry: unknown): Character | null {
  return normalizeCharacterEntry(entry)?.character ?? null;
}
