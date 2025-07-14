import { create } from "zustand";

import { z } from "zod";
import {
  DEFAULT_PLAYER_DATA,
  DEFAULT_MONSTER_DATA,
} from "@/shared/config/sheetDefaults";
import { generateUniqueId } from "@/shared/lib/utils/id/idUtils";
import { deepMerge } from "@/shared/lib/utils/object/objectUtils";
import { Character, characterSchema, CharacterTypeEnum } from "./schemas/character.schema";

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

  let baseData;
  if (type === CharacterTypeEnum.enum.Player) {
    baseData = { ...DEFAULT_PLAYER_DATA, id: newId, type };
  } else {
    baseData = {
      ...DEFAULT_MONSTER_DATA,
      id: newId,
      type: CharacterTypeEnum.enum["Monster/NPC"],
    };
  }

  const mergedData = deepMerge(baseData, characterData as object);

  try {
    return characterSchema.parse(mergedData);
  } catch (e) {
    console.error("Falha ao criar personagem. Objeto inválido:", mergedData);
    if (e instanceof z.ZodError) {
      console.error(
        "DETALHES DO ERRO (de z.treeifyError):",
        JSON.stringify(z.treeifyError(e), null, 2)
      );
    } else {
      console.error("ERRO INESPERADO:", e);
    }
    return characterSchema.parse(baseData);
  }
};

export const useCharactersStore = create<CharactersState>((set, get) => ({
  characters: [
    createNewCharacter({
      type: CharacterTypeEnum.enum.Player,
      name: "Aventureiro Padrão",
    }),
  ],

  addCharacter: (data) => {
    const newCharacter = createNewCharacter(data);
    set((state) => ({ characters: [...state.characters, newCharacter] }));
    return newCharacter;
  },

  deleteCharacter: (characterId) => {
    set((state) => ({
      characters: state.characters.filter((char) => char.id !== characterId),
    }));
  },

  updateCharacter: (characterId, updates) => {
    set((state) => ({
      characters: state.characters.map((char) => {
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
      }),
    }));
  },

  duplicateCharacter: (characterId) => {
    const original = get().characters.find((char) => char.id === characterId);
    if (!original) return null;

    const newCharacter = createNewCharacter({
      ...original,
      name: `${original.name} (Cópia)`,
    });

    set((state) => ({ characters: [...state.characters, newCharacter] }));
    return newCharacter;
  },
}));
