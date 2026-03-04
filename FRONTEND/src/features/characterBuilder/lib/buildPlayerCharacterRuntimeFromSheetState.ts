import { PlayerCharacterStateSchema } from '@nihilvtt/datamodeling/runtime';

import type { PlayerCharacter } from '@/entities/character/model/schemas/character.schema';

export function buildPlayerCharacterRuntimeFromSheetState(
  character: Omit<PlayerCharacter, 'id' | 'type'>,
) {
  const runtimeCharacter = {
    id: crypto.randomUUID(),
    type: 'Player',
    name: character.name,
    image: character.image,
    notes: character.notes,
    controlledByUserId: null,
    build: {
      classId: character.charClass,
      originId: character.background,
      specieId: character.species,
      subclassId: character.subclass || null,
      selectedFeatIds: [],
    },
    progression: {
      currentLevel: character.level,
      pendingLevelUps: 0,
    },
    attributes: {
      base: { ...character.attributes },
    },
    hitPoints: {
      current: character.combatStats.currentHp,
      max: character.combatStats.maxHp,
      temporary: character.combatStats.tempHp ?? 0,
    },
    inspiration: character.inspiration,
    inventory: {
      items: (character.equipment ?? [])
        .filter((item) => item.name.startsWith('weapon-') || item.name.startsWith('armor-') || item.name.startsWith('gear-') || item.name.startsWith('tool-') || item.name.startsWith('musical-instrument-'))
        .map((item) => ({
          itemId: item.name,
          quantity: Math.max(1, item.quantity),
        })),
    },
    equipment: {
      bodyArmorItemId:
        (character.equipment ?? []).find((item) => item.equipped && item.name.startsWith('armor-') && item.name !== 'armor-escudo')?.name ?? null,
      shieldItemId:
        (character.equipment ?? []).find((item) => item.equipped && item.name === 'armor-escudo')?.name ?? null,
      mainHandWeaponId:
        (character.equipment ?? []).find((item) => item.equipped && item.name.startsWith('weapon-'))?.name ?? null,
      offHandWeaponId: null,
    },
    resourcePools: {
      pools: [],
    },
    activeEffects: {
      effects: [],
    },
  };

  return PlayerCharacterStateSchema.parse(runtimeCharacter);
}
