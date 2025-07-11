// src/entities/character/model/hooks/useCharactersState.ts
import {
  type CharacterSchema,
  characterSchema,
} from "../schemas/character.schema";
import { z } from "zod";

import { useCallback, useState } from "react";
import { CharacterType } from "@/shared/api/types";
import {
  DEFAULT_PLAYER_DATA,
  DEFAULT_MONSTER_DATA,
} from "@/shared/config/sheetDefaults";
import { generateUniqueId } from "@/shared/lib/utils/id/idUtils";
import { deepMerge } from "@/shared/lib/utils/object/objectUtils";

export interface CharactersState {
  characters: CharacterSchema[];
  addCharacter: (
    characterData: Partial<Omit<CharacterSchema, "id">>
  ) => CharacterSchema;
  deleteCharacter: (characterId: string) => void;
  updateCharacter: (
    characterId: string,
    updates: Partial<CharacterSchema>
  ) => void;
  duplicateCharacter: (characterId: string) => CharacterSchema | null;
}

const createNewCharacter = (
  characterData: Partial<Omit<CharacterSchema, "id">>
): CharacterSchema => {
  const newId = generateUniqueId();
  // Garante que o tipo padrão é PLAYER se nenhum for fornecido
  const type = characterData.type || CharacterType.PLAYER;

  if (type === CharacterType.PLAYER) {
    // 1. Cria uma base segura com os padrões, ID e tipo corretos.
    const baseData = { ...DEFAULT_PLAYER_DATA, id: newId, type };
    // 2. Usa deepMerge para mesclar de forma segura quaisquer dados aninhados.
    return deepMerge(baseData, characterData as object);
  }

  // Lógica para Monstros/NPCs (também corrigida com deepMerge)
  const baseMonsterData = {
    ...DEFAULT_MONSTER_DATA,
    id: newId,
    type: type as typeof CharacterType.MONSTER_NPC,
  };
  return deepMerge(baseMonsterData, characterData as object);
};

export const useCharactersState = (): CharactersState => {
  const [characters, setCharacters] = useState<CharacterSchema[]>(() => [
    createNewCharacter({
      type: CharacterType.PLAYER,
      name: "Aventureiro Padrão",
    }),
  ]);

  const addCharacter = useCallback(
    (data: Partial<Omit<CharacterSchema, "id">>) => {
      const newCharacter = createNewCharacter(data);
      setCharacters((prev) => [...prev, newCharacter]);
      return newCharacter;
    },
    []
  );

  const deleteCharacter = useCallback((characterId: string) => {
    setCharacters((prev) => prev.filter((char) => char.id !== characterId));
  }, []);

  const updateCharacter = useCallback(
    (characterId: string, updates: Partial<CharacterSchema>) => {
      setCharacters((prev) =>
        prev.map((char) => {
          if (char.id === characterId) {
            const updatedObject = deepMerge(char, updates);

            try {
              return characterSchema.parse(updatedObject);
            } catch (e) {
              console.error("--- ZOD VALIDATION FAILED ---");

              if (e instanceof z.ZodError) {
                console.error(
                  "DETALHES DO ERRO (de e.flatten()):",
                  JSON.stringify(e.flatten(), null, 2)
                );
              } else {
                console.error("ERRO INESPERADO:", e);
              }

              console.log(
                "--- OBJETO QUE FALHOU NA VALIDAÇÃO (de updatedObject) ---"
              );
              console.log(updatedObject);
              return char;
            }
          }
          return char;
        })
      );
    },
    []
  );

  const duplicateCharacter = useCallback(
    (characterId: string) => {
      const original = characters.find((char) => char.id === characterId);
      if (!original) return null;

      const newCharacter = createNewCharacter({
        ...original,
        name: `${original.name} (Cópia)`,
      });

      setCharacters((prev) => [...prev, newCharacter]);
      return newCharacter;
    },
    [characters]
  );

  return {
    characters,
    addCharacter,
    deleteCharacter,
    updateCharacter,
    duplicateCharacter,
  };
};
