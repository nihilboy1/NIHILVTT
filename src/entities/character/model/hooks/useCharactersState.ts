// src/entities/character/model/hooks/useCharactersState.ts
import {
  characterSchema,
  Character,
  CharacterTypeEnum,
} from "../schemas/character.schema";
import { z } from "zod";

import { useCallback, useState } from "react";
import {
  DEFAULT_PLAYER_DATA,
  DEFAULT_MONSTER_DATA,
} from "@/shared/config/sheetDefaults";
import { generateUniqueId } from "@/shared/lib/utils/id/idUtils";
import { deepMerge } from "@/shared/lib/utils/object/objectUtils";

export interface CharactersState {
  characters: Character[];
  addCharacter: (characterData: Partial<Omit<Character, "id">>) => Character;
  deleteCharacter: (characterId: string) => void;
  updateCharacter: (characterId: string, updates: Partial<Character>) => void;
  duplicateCharacter: (characterId: string) => Character | null;
}

const createNewCharacter = (
  characterData: Partial<Omit<Character, "id">>
): Character => {
  const newId = generateUniqueId();
  const type = characterData.type || CharacterTypeEnum.enum.Player;

  // 1. Define a base de dados de acordo com o tipo
  let baseData;
  if (type === CharacterTypeEnum.enum.Player) {
    baseData = { ...DEFAULT_PLAYER_DATA, id: newId, type };
  } else {
    // Apenas monstros/NPCs são criados com dados padrão por enquanto
    baseData = {
      ...DEFAULT_MONSTER_DATA,
      id: newId,
      type: CharacterTypeEnum.enum["Monster/NPC"],
    };
  }

  // 2. Mescla a base com os dados parciais fornecidos
  const mergedData = deepMerge(baseData, characterData as object);

  try {
    // 3. Valida e retorna o objeto usando o schema.
    // Isso GARANTE para o TypeScript que o tipo está correto e resolve o erro.
    return characterSchema.parse(mergedData);
  } catch (e) {
    console.error("Falha ao criar personagem. Objeto inválido:", mergedData);

    // --- ADICIONE ESTE BLOCO PARA VER OS DETALHES ---
    if (e instanceof z.ZodError) {
      console.error(
        "DETALHES DO ERRO (de z.treeifyError):",
        JSON.stringify(z.treeifyError(e), null, 2)
      );
    } else {
      console.error("ERRO INESPERADO:", e);
    }
    // --- FIM DO BLOCO ADICIONADO ---

    return characterSchema.parse(baseData);
  }
};

export const useCharactersState = (): CharactersState => {
  const [characters, setCharacters] = useState<Character[]>(() => [
    createNewCharacter({
      type: CharacterTypeEnum.enum.Player,
      name: "Aventureiro Padrão",
    }),
  ]);

  const addCharacter = useCallback((data: Partial<Omit<Character, "id">>) => {
    const newCharacter = createNewCharacter(data);
    setCharacters((prev) => [...prev, newCharacter]);
    return newCharacter;
  }, []);

  const deleteCharacter = useCallback((characterId: string) => {
    setCharacters((prev) => prev.filter((char) => char.id !== characterId));
  }, []);

  const updateCharacter = useCallback(
    (characterId: string, updates: Partial<Character>) => {
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
