import { useMemo } from 'react';

import { isPlayerCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';
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
  const playerRuntimeCharacter = isPlayerCharacterRuntime(runtimeCharacter) ? runtimeCharacter : null;

  return useMemo(() => {
    if (!character || character.type !== 'Player') {
      return null;
    }

    return buildPlayerCharacterCombatViewModel(character, playerRuntimeCharacter);
  }, [character, playerRuntimeCharacter]);
}
