import { useMemo } from 'react';

import { isPlayerCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';
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
  const playerRuntimeCharacter = isPlayerCharacterRuntime(runtimeCharacter) ? runtimeCharacter : null;

  return useMemo(() => {
    if (playerRuntimeCharacter) {
      return buildPlayerCharacterViewModelFromRuntime(playerRuntimeCharacter);
    }

    if (!character || character.type !== 'Player') {
      return null;
    }

    return buildPlayerCharacterViewModel(character);
  }, [character, playerRuntimeCharacter]);
}
