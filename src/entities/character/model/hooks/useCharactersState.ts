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

export const useCharactersState = (): CharactersState => {
  const initialCharacters: Character[] = [
    {
      ...DEFAULT_CHARACTER_DATA,
      id: generateUniqueId(),
      name: "Aventureiro Padrão",
    } as PlayerCharacter,
  ];

  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [tokensOnBoard, setTokensOnBoard] = useState<Token[]>([]); // Renomeado
  const [tokenInstanceCounts, setTokenInstanceCounts] = useState<
    Map<string, number>
  >(new Map());

  const addCharacter = useCallback(
    (characterData: Omit<Character, "id">): Character => {
      const newId = generateUniqueId();

      let newCharacter: Character;

      if (characterData.type === CharacterType.PLAYER) {
        newCharacter = {
          ...DEFAULT_CHARACTER_DATA,
          ...characterData,
          id: newId,
          image: characterData.image ?? DEFAULT_TOKEN_IMAGE,
        } as PlayerCharacter;
      } else if (characterData.type === CharacterType.MONSTER_NPC) {
        newCharacter = {
          id: newId,
          name: characterData.name,
          type: CharacterType.MONSTER_NPC,
          image: characterData.image ?? DEFAULT_TOKEN_IMAGE,
          size: characterData.size ?? DEFAULT_CHARACTER_DATA.size,
          maxHp: characterData.maxHp ?? DEFAULT_CHARACTER_DATA.maxHp,
          notes: characterData.notes ?? DEFAULT_CHARACTER_DATA.notes,
          challengeRating:
            (characterData as MonsterNPCCharacter).challengeRating ?? 0,
        } as MonsterNPCCharacter;
      } else if (characterData.type === CharacterType.OBJECT) {
        newCharacter = {
          id: newId,
          name: characterData.name,
          type: CharacterType.OBJECT,
          image: characterData.image ?? DEFAULT_TOKEN_IMAGE,
          size: characterData.size ?? DEFAULT_CHARACTER_DATA.size,
          maxHp: characterData.maxHp ?? DEFAULT_CHARACTER_DATA.maxHp,
          notes: characterData.notes ?? DEFAULT_CHARACTER_DATA.notes,
          isInteractive:
            (characterData as ObjectCharacter).isInteractive ?? false,
        } as ObjectCharacter;
      } else {
        newCharacter = {
          id: newId,
          name: characterData.name,
          type: characterData.type,
          image: characterData.image ?? DEFAULT_TOKEN_IMAGE,
          size: characterData.size ?? DEFAULT_CHARACTER_DATA.size,
          maxHp: characterData.maxHp ?? DEFAULT_CHARACTER_DATA.maxHp,
          notes: characterData.notes ?? DEFAULT_CHARACTER_DATA.notes,
        } as Character;
      }

      setCharacters((prevCharacters) => {
        const updatedCharacters = [...prevCharacters, newCharacter];
        return updatedCharacters;
      });
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
        prevCharacters.map((character) =>
          character.id === characterId
            ? { ...character, ...updates }
            : character
        )
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
