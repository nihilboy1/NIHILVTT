import { useMemo } from 'react';

import { useCharactersStore } from '@/entities/character/model/store';
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

  return useMemo(() => {
    if (!character || character.type !== 'Player') {
      return null;
    }

    return buildPlayerCharacterEquipmentViewModel(character, runtimeCharacter);
  }, [character, runtimeCharacter]);
}
