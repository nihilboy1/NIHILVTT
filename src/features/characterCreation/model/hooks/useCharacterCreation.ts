// src/features/characterCreation/model/hooks/useCharacterCreation.ts

import { useCallback } from 'react';
import { useCharacters } from "@/entities/character/model/contexts/CharactersContext";
import {
  DEFAULT_PLAYER_DATA,
  DEFAULT_MONSTER_DATA,
} from "@/shared/config/sheetDefaults";
import { CharacterType } from "@/shared/api/types";

export function useCharacterCreation() {
  const { addCharacter } = useCharacters();

  // As funções agora aceitam um 'name' como argumento
  const createPlayerCharacter = useCallback((name: string) => {
    addCharacter({
      ...DEFAULT_PLAYER_DATA,
      type: CharacterType.PLAYER,
      name, // Usa o nome fornecido pelo modal
    });
  }, [addCharacter]);

  const createMonsterNpc = useCallback((name: string) => {
    addCharacter({
      ...DEFAULT_MONSTER_DATA,
      type: CharacterType.MONSTER_NPC,
      name, // Usa o nome fornecido pelo modal
    });
  }, [addCharacter]);

  return { createPlayerCharacter, createMonsterNpc };
}