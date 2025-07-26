// src/features/characterCreation/model/hooks/useCharacterCreation.ts

import { useCallback } from 'react';

import {
  DEFAULT_MONSTER_DATA,
  DEFAULT_PLAYER_DATA,
} from '@/entities/character/config/sheetDefaults';
import { CharacterTypeEnum } from '@/entities/character/model/schemas/character.schema';
import { useCharactersStore } from '@/entities/character/model/store';

export function useCharacterCreation() {
  const { addCharacter } = useCharactersStore();

  // As funções agora aceitam um 'name' como argumento
  const createPlayerCharacter = useCallback(
    (name: string) => {
      addCharacter({
        ...DEFAULT_PLAYER_DATA,
        type: CharacterTypeEnum.enum.Player,
        name, // Usa o nome fornecido pelo modal
      });
    },
    [addCharacter],
  );

  const createMonsterNpc = useCallback(
    (name: string) => {
      addCharacter({
        ...DEFAULT_MONSTER_DATA,
        type: CharacterTypeEnum.enum['Monster/NPC'],
        name, // Usa o nome fornecido pelo modal
      });
    },
    [addCharacter],
  );

  return { createPlayerCharacter, createMonsterNpc };
}
