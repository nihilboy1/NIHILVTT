import { useMemo } from 'react';

import { useCharactersStore } from '@/entities/character/model/store';
import {
  buildPlayerCharacterCombatViewModel,
  type PlayerCharacterCombatViewModel,
} from '@/entities/character/model/view-models/playerCharacterCombatViewModel';

export function usePlayerCharacterCombatViewModel(
  characterId: string,
): PlayerCharacterCombatViewModel | null {
  const { characters, runtimeCharactersById } = useCharactersStore();
  const character = characters.find((entry) => entry.id === characterId);
  const runtimeCharacter = runtimeCharactersById[characterId] ?? null;

  return useMemo(() => {
    if (!character || character.type !== 'Player') {
      return null;
    }

    return buildPlayerCharacterCombatViewModel(character, runtimeCharacter);
  }, [character, runtimeCharacter]);
}
