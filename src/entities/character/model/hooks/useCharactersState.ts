import { useCallback, useState } from "react";

import {
  CharacterType,
  type Character, // A nova interface Token (no tabuleiro)
  type MonsterNPCCharacter,
  type ObjectCharacter,
  type PlayerCharacter, // A nova interface Character (ficha de dados)
  type Point,
  type Token, // A nova interface Token (no tabuleiro)
} from "../../../../shared/api/types";
import {
  DEFAULT_CHARACTER_DATA,
  DEFAULT_TOKEN_IMAGE,
  DEFAULT_MONSTER_NPC_DATA, // Importar DEFAULT_MONSTER_NPC_DATA
} from "../../../../shared/config/sheetDefaults";
import { generateUniqueId } from "../../../../shared/lib/utils/id/idUtils";

export interface CharactersState {
  characters: Character[];
  tokensOnBoard: Token[]; // Renomeado de gridInstances
  tokenInstanceCounts: Map<string, number>; // Renomeado de gridInstanceCounts
  addCharacter: (characterData: Omit<Character, "id">) => Character;
  deleteCharacter: (characterId: string) => void;
  duplicateCharacter: (characterId: string) => Character | null;
  updateCharacter: (characterId: string, updates: Partial<Character>) => void;
  addToken: (
    // Adiciona uma instância de Token no tabuleiro
    characterId: string,
    position: Point, // Usar Point para posição
    currentHp?: number // Adicionar currentHp para o Token
  ) => Token;
  removeToken: (tokenId: string) => void; // Renomeado de removeGridInstance
  updateTokenPosition: (
    // Renomeado de updateGridInstancePosition
    tokenId: string,
    newPosition: Point
  ) => void;
  updateTokenHp: (tokenId: string, newHp: number) => void; // Ad Novo: Atualiza HP de um Token
  makeTokenIndependent: (tokenId: string) => Character | null; // Renomeado de makeGridInstanceIndependent
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
    const [tokensOnBoard, setTokensOnBoard] = useState<Token[]>([]); // Renomeado
    const [tokenInstanceCounts, setTokenInstanceCounts] = useState<
      Map<string, number>
    >(new Map());

    const addCharacter = useCallback(
      (characterData: Omit<Character, "id">): Character => {
        const newId = generateUniqueId();
        const newCharacter = createCharacterFromData(characterData, newId);

      setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
      return newCharacter;
    },
    []
  );

  const deleteCharacter = useCallback((characterId: string) => {
    setCharacters((prevCharacters) =>
      prevCharacters.filter((character) => character.id !== characterId)
    );
    setTokensOnBoard((prevTokens) =>
      prevTokens.filter((token) => token.characterId !== characterId)
    );
    setTokenInstanceCounts((prevCounts) => {
      const newCounts = new Map(prevCounts);
      newCounts.delete(characterId);
      return newCounts;
    });
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

  const addToken = useCallback(
    (characterId: string, position: Point, currentHp?: number): Token => {
      const parentCharacterExists = characters.some(
        (char) => char.id === characterId
      );
      if (!parentCharacterExists) {
        const stillReferencedByInstances =
          (tokenInstanceCounts.get(characterId) || 0) > 0;
        if (!stillReferencedByInstances) {
          console.warn(
            `Character with id ${characterId} not found and no existing instances. Cannot create Token.`
          );
        }
      }
      const newTokenInstance: Token = {
        id: generateUniqueId(),
        characterId: characterId,
        sceneId: "default-scene", // TODO: Obter o ID da cena atual
        position: position,
        currentHp: currentHp,
      };
      setTokensOnBoard((prevTokens) => [...prevTokens, newTokenInstance]);
      setTokenInstanceCounts((prevCounts) => {
        const newCounts = new Map(prevCounts);
        newCounts.set(characterId, (newCounts.get(characterId) || 0) + 1);
        return newCounts;
      });
      return newTokenInstance;
    },
    [characters]
  );

  const removeToken = useCallback(
    (tokenId: string) => {
      const instanceToRemove = tokensOnBoard.find(
        (inst) => inst.id === tokenId
      );
      if (!instanceToRemove) return;

      const { characterId } = instanceToRemove;

      setTokensOnBoard((prevTokens) =>
        prevTokens.filter((token) => token.id !== tokenId)
      );

      setTokenInstanceCounts((prevCounts) => {
        const newCounts = new Map(prevCounts);
        const currentCount = newCounts.get(characterId) || 0;
        if (currentCount <= 1) {
          newCounts.delete(characterId);
          const associatedCharacter = characters.find(
            (char) => char.id === characterId
          );
          if (
            associatedCharacter &&
            associatedCharacter.name.includes("(Cópia)")
          ) {
            setCharacters((prevCharacters) =>
              prevCharacters.filter((char) => char.id !== characterId)
            );
          }
        } else {
          newCounts.set(characterId, currentCount - 1);
        }
        return newCounts;
      });
    },
    [tokensOnBoard, characters]
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

  const updateTokenPosition = useCallback(
    (tokenId: string, newPosition: Point) => {
      setTokensOnBoard((prevTokens) =>
        prevTokens.map((token) =>
          token.id === tokenId ? { ...token, position: newPosition } : token
        )
      );
    },
    []
  );

  const updateTokenHp = useCallback((tokenId: string, newHp: number) => {
    setTokensOnBoard((prevTokens) =>
      prevTokens.map((token) =>
        token.id === tokenId ? { ...token, currentHp: newHp } : token
      )
    );
  }, []);

  const makeTokenIndependent = useCallback(
    (tokenId: string): Character | null => {
      const targetToken = tokensOnBoard.find((inst) => inst.id === tokenId);
      if (!targetToken) {
        console.error("Token not found for making independent:", tokenId);
        return null;
      }

      const originalCharacter = characters.find(
        (char) => char.id === targetToken.characterId
      );
      if (!originalCharacter) {
        console.error(
          "Original Character not found for token:",
          targetToken.characterId
        );
        return null;
      }

      const copiedCharacterData = JSON.parse(JSON.stringify(originalCharacter));

      const newIndependentCharacter: Character = {
        ...copiedCharacterData,
        id: generateUniqueId(),
        name: `${originalCharacter.name} (Cópia)`,
      };

      setCharacters((prevCharacters) => [
        ...prevCharacters,
        newIndependentCharacter,
      ]);

      setTokensOnBoard((prevTokens) =>
        prevTokens.map((token) =>
          token.id === tokenId
            ? { ...token, characterId: newIndependentCharacter.id }
            : token
        )
      );

      setTokenInstanceCounts((prevCounts) => {
        const newCounts = new Map(prevCounts);
        const originalCharacterId = originalCharacter.id;
        const newIndependentCharacterId = newIndependentCharacter.id;

        const originalCount = newCounts.get(originalCharacterId) || 0;
        if (originalCount <= 1) {
          newCounts.delete(originalCharacterId);
        } else {
          newCounts.set(originalCharacterId, originalCount - 1);
        }

        newCounts.set(
          newIndependentCharacterId,
          (newCounts.get(newIndependentCharacterId) || 0) + 1
        );

        return newCounts;
      });

      return newIndependentCharacter;
    },
    [tokensOnBoard, characters]
  );

  return {
    characters,
    tokensOnBoard,
    tokenInstanceCounts,
    addCharacter,
    deleteCharacter,
    duplicateCharacter,
    updateCharacter,
    addToken,
    removeToken,
    updateTokenPosition,
    updateTokenHp,
    makeTokenIndependent,
  };
};
