import { useMemo } from 'react';

import { useCharactersStore } from '@/entities/character/model/store';
import { isPlayerCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';
import {
  buildPlayerCharacterEquipmentViewModel,
  type PlayerCharacterEquipmentViewModel,
} from '@/entities/character/model/view-models/playerCharacterEquipmentViewModel';

export function usePlayerCharacterEquipmentViewModel(
  characterId: string,
): PlayerCharacterEquipmentViewModel | null {
  const { characters, runtimeCharactersById } = useCharactersStore();
  const character = characters.find((entry) => entry.id === characterId);
  const runtimeCharacter = runtimeCharactersById[characterId] ?? null;
  const playerRuntimeCharacter = isPlayerCharacterRuntime(runtimeCharacter) ? runtimeCharacter : null;

  return useMemo(() => {
    if (!character || character.type !== 'Player') {
      return null;
    }

    return buildPlayerCharacterEquipmentViewModel(character, playerRuntimeCharacter);
  }, [character, playerRuntimeCharacter]);
}
