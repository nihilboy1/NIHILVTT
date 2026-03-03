import { useMemo } from 'react';

import { useCharactersStore } from '@/entities/character/model/store';
import {
  buildPlayerCharacterViewModel,
  buildPlayerCharacterViewModelFromRuntime,
  type PlayerCharacterViewModel,
} from '@/entities/character/model/view-models/playerCharacterViewModel';

export function usePlayerCharacterViewModel(
  characterId: string | null,
): PlayerCharacterViewModel | null {
  const { characters, runtimeCharactersById } = useCharactersStore();
  const character = characterId
    ? characters.find((entry) => entry.id === characterId)
    : undefined;
  const runtimeCharacter = characterId ? runtimeCharactersById[characterId] ?? null : null;

  return useMemo(() => {
    if (runtimeCharacter) {
      return buildPlayerCharacterViewModelFromRuntime(runtimeCharacter);
    }

    if (!character || character.type !== 'Player') {
      return null;
    }

    return buildPlayerCharacterViewModel(character);
  }, [character, runtimeCharacter]);
}
