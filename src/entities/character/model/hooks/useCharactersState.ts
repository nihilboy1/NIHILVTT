import { useCallback, useState } from "react";

import {
  CharacterType,
  type Character, // A nova interface Token (no tabuleiro)
  type MonsterNPCCharacter,
  type ObjectCharacter,
  type PlayerCharacter, // A nova interface Character (ficha de dados)
} from "../../../../shared/api/types";
import {
  DEFAULT_CHARACTER_DATA,
  DEFAULT_TOKEN_IMAGE,
  DEFAULT_MONSTER_NPC_DATA, // Importar DEFAULT_MONSTER_NPC_DATA
} from "../../../../shared/config/sheetDefaults";
import { generateUniqueId } from "../../../../shared/lib/utils/id/idUtils";

export interface CharactersState {
  characters: Character[];
  addCharacter: (characterData: Omit<Character, "id">) => Character;
  deleteCharacter: (characterId: string) => void;
  duplicateCharacter: (characterId: string) => Character | null;
  updateCharacter: (characterId: string, updates: Partial<Character>) => void;
}

  // Helper function to create a new character based on its type
  const createCharacterFromData = (characterData: Omit<Character, "id">, newId: string): Character => {
    if (characterData.type === CharacterType.PLAYER) {
      const playerCharData = characterData as Omit<PlayerCharacter, "id">;
      return {
        type: CharacterType.PLAYER, // Definir o tipo primeiro
        id: newId,
        name: playerCharData.name ?? DEFAULT_CHARACTER_DATA.name,
        image: playerCharData.image ?? DEFAULT_TOKEN_IMAGE,
        size: playerCharData.size ?? DEFAULT_CHARACTER_DATA.size,
        notes: playerCharData.notes ?? DEFAULT_CHARACTER_DATA.notes,
        attributes: playerCharData.attributes ?? DEFAULT_CHARACTER_DATA.attributes,
        proficiencyBonus: playerCharData.proficiencyBonus ?? DEFAULT_CHARACTER_DATA.proficiencyBonus,
        proficiencies: playerCharData.proficiencies ?? DEFAULT_CHARACTER_DATA.proficiencies,
        combatStats: playerCharData.combatStats ?? DEFAULT_CHARACTER_DATA.combatStats,
        level: playerCharData.level ?? DEFAULT_CHARACTER_DATA.level,
        xp: playerCharData.xp ?? DEFAULT_CHARACTER_DATA.xp,
        inspiration: playerCharData.inspiration ?? DEFAULT_CHARACTER_DATA.inspiration,
        hitDiceUsed: playerCharData.hitDiceUsed ?? DEFAULT_CHARACTER_DATA.hitDiceUsed,
        hitDiceMax: playerCharData.hitDiceMax ?? DEFAULT_CHARACTER_DATA.hitDiceMax,
        deathSavesSuccesses: playerCharData.deathSavesSuccesses ?? DEFAULT_CHARACTER_DATA.deathSavesSuccesses,
        deathSavesFailures: playerCharData.deathSavesFailures ?? DEFAULT_CHARACTER_DATA.deathSavesFailures,
        hitDiceEntries: playerCharData.hitDiceEntries ?? DEFAULT_CHARACTER_DATA.hitDiceEntries,
        actions: playerCharData.actions ?? DEFAULT_CHARACTER_DATA.actions,
        attacks: playerCharData.attacks ?? DEFAULT_CHARACTER_DATA.attacks,
        equipment: playerCharData.equipment ?? DEFAULT_CHARACTER_DATA.equipment,
        featuresAndTraits: playerCharData.featuresAndTraits ?? DEFAULT_CHARACTER_DATA.featuresAndTraits,
      }; // Removed 'as PlayerCharacter'
    } else if (characterData.type === CharacterType.MONSTER_NPC) {
      const monsterCharData = characterData as Omit<MonsterNPCCharacter, "id">;
      return {
        type: CharacterType.MONSTER_NPC, // Definir o tipo primeiro
        id: newId,
        name: monsterCharData.name ?? DEFAULT_MONSTER_NPC_DATA.name,
        image: monsterCharData.image ?? DEFAULT_TOKEN_IMAGE,
        size: monsterCharData.size ?? DEFAULT_MONSTER_NPC_DATA.size,
        notes: monsterCharData.notes ?? DEFAULT_MONSTER_NPC_DATA.notes,
        attributes: monsterCharData.attributes ?? DEFAULT_MONSTER_NPC_DATA.attributes,
        proficiencyBonus: monsterCharData.proficiencyBonus ?? DEFAULT_MONSTER_NPC_DATA.proficiencyBonus,
        proficiencies: monsterCharData.proficiencies ?? DEFAULT_MONSTER_NPC_DATA.proficiencies,
        combatStats: monsterCharData.combatStats ?? DEFAULT_MONSTER_NPC_DATA.combatStats,
        challengeRating: monsterCharData.challengeRating ?? DEFAULT_MONSTER_NPC_DATA.challengeRating,
        actions: monsterCharData.actions ?? DEFAULT_MONSTER_NPC_DATA.actions,
        attacks: monsterCharData.attacks ?? DEFAULT_MONSTER_NPC_DATA.attacks,
        equipment: monsterCharData.equipment ?? DEFAULT_MONSTER_NPC_DATA.equipment,
        featuresAndTraits: monsterCharData.featuresAndTraits ?? DEFAULT_MONSTER_NPC_DATA.featuresAndTraits,
      }; // Removed 'as MonsterNPCCharacter'
    } else if (characterData.type === CharacterType.OBJECT) {
      const objectCharData = characterData as Omit<ObjectCharacter, "id">;
      return {
        type: CharacterType.OBJECT, // Definir o tipo primeiro
        id: newId,
        name: objectCharData.name,
        image: objectCharData.image ?? DEFAULT_TOKEN_IMAGE,
        size: objectCharData.size ?? "medium",
        notes: objectCharData.notes ?? "",
        isInteractive: objectCharData.isInteractive ?? false,
      }; // Removed 'as ObjectCharacter'
    } else {
      throw new Error(`Tipo de personagem desconhecido: ${characterData.type}`);
    }
  };

  export const useCharactersState = (): CharactersState => {
    const initialCharacters: Character[] = [
      createCharacterFromData({ ...DEFAULT_CHARACTER_DATA, name: "Aventureiro Padrão", type: CharacterType.PLAYER }, generateUniqueId()),
    ];

    const [characters, setCharacters] = useState<Character[]>(initialCharacters);

    const addCharacter = useCallback(
      (characterData: Omit<Character, "id">): Character => {
        const newId = generateUniqueId();
        const newCharacter = createCharacterFromData(characterData, newId);

      setCharacters((prevCharacters) => {
        const updatedCharacters = [...prevCharacters, newCharacter];
        return updatedCharacters;
      });
      return newCharacter; // Still return the new character, but the state update is handled.
    },
    []
  );

  const deleteCharacter = useCallback((characterId: string) => {
    setCharacters((prevCharacters) =>
      prevCharacters.filter((character) => character.id !== characterId)
    );
  }, []);

  const updateCharacter = useCallback(
    (characterId: string, updates: Partial<Character>) => {
      setCharacters((prevCharacters) =>
        prevCharacters.map((character) => {
          if (character.id === characterId) {
            // Aplicar atualizações com base no tipo de personagem para manter a tipagem correta
            if (character.type === CharacterType.PLAYER) {
              return { ...character, ...(updates as Partial<PlayerCharacter>) };
            } else if (character.type === CharacterType.MONSTER_NPC) {
              return { ...character, ...(updates as Partial<MonsterNPCCharacter>) };
            } else if (character.type === CharacterType.OBJECT) {
              return { ...character, ...(updates as Partial<ObjectCharacter>) };
            }
          }
          return character;
        })
      );
    },
    []
  );


  const duplicateCharacter = useCallback(
    (characterId: string): Character | null => {
      const originalCharacter = characters.find(
        (char) => char.id === characterId
      );
      if (!originalCharacter) {
        console.error("Character não encontrado para duplicação:", characterId);
        return null;
      }

      const duplicatedCharacterData: Character = JSON.parse(
        JSON.stringify(originalCharacter)
      );

      const newId = generateUniqueId();
      const newName = `${originalCharacter.name} (Cópia)`;

      const newCharacter: Character = {
        ...duplicatedCharacterData,
        id: newId,
        name: newName,
      };

      setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
      return newCharacter;
    },
    [characters]
  );


  return {
    characters,
    addCharacter,
    deleteCharacter,
    duplicateCharacter,
    updateCharacter,
  };
};
