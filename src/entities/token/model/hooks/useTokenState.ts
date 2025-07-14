// src/entities/token/model/hooks/useTokenState.ts

import { useCallback, useState } from "react";
// 1. DE: import { type Character, type Point, type Token } from "../../../../shared/api/types";
//    PARA: Importamos o tipo do Zod e mantemos os tipos que não mudaram.
import { type Point, type Token } from "../../../../shared/api/types";
import { type Character } from "@/entities/character/model/schemas/character.schema";

import { generateUniqueId } from "../../../../shared/lib/utils/id/idUtils";
import { useCharacters } from "@/entities/character/model/contexts/CharactersContext";

export interface TokenState {
  tokensOnBoard: Token[];
  tokenInstanceCounts: Map<string, number>;
  addToken: (characterId: string, position: Point, currentHp?: number) => Token;
  removeToken: (tokenId: string) => void;
  updateTokenPosition: (tokenId: string, newPosition: Point) => void;
  updateTokenHp: (tokenId: string, newHp: number) => void;
  // 2. A função agora retorna o tipo do Zod.
  makeTokenIndependent: (tokenId: string) => Character | null;
}

export const useTokenState = (): TokenState => {
  const { characters, addCharacter, deleteCharacter } = useCharacters();
  const [tokensOnBoard, setTokensOnBoard] = useState<Token[]>([]);
  const [tokenInstanceCounts, setTokenInstanceCounts] = useState<
    Map<string, number>
  >(new Map());

  const addToken = useCallback(
    (characterId: string, position: Point, currentHp?: number): Token => {
      // 3. O 'characters.some' agora funciona sem erro, pois `characters` já é do tipo `Character[]`.
      const parentCharacterExists = characters.some(
        (char) => char.id === characterId
      );
      if (!parentCharacterExists) {
        // ... (lógica de warning)
      }
      const newTokenInstance: Token = {
        id: generateUniqueId(),
        characterId: characterId,
        sceneId: "default-scene",
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
    [characters, tokenInstanceCounts]
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
          // 4. `associatedCharacter` agora é do tipo `Character | undefined`.
          const associatedCharacter = characters.find(
            (char) => char.id === characterId
          );
          if (
            associatedCharacter &&
            associatedCharacter.name.includes("(Cópia)")
          ) {
            deleteCharacter(characterId);
          }
        } else {
          newCounts.set(characterId, currentCount - 1);
        }
        return newCounts;
      });
    },
    [tokensOnBoard, characters, deleteCharacter]
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
      if (!targetToken) return null;

      // 5. `originalCharacter` é do tipo `Character | undefined`.
      const originalCharacter = characters.find(
        (char) => char.id === targetToken.characterId
      );
      if (!originalCharacter) return null;

      // A cópia agora é do tipo do Zod.
      const copiedCharacterData: Character = JSON.parse(
        JSON.stringify(originalCharacter)
      );

      // A função `addCharacter` espera um `Partial<Omit<Character, "id">>`
      const newIndependentCharacterData: Omit<Character, "id"> = {
        ...copiedCharacterData,
        name: `${originalCharacter.name} (Cópia)`,
      };

      // `addCharacter` retorna o personagem completo, já do tipo `Character`.
      const addedCharacter = addCharacter(newIndependentCharacterData);

      setTokensOnBoard((prevTokens) =>
        prevTokens.map((token) =>
          token.id === tokenId
            ? { ...token, characterId: addedCharacter.id }
            : token
        )
      );

      setTokenInstanceCounts((prevCounts) => {
        const newCounts = new Map(prevCounts);
        const originalCharacterId = originalCharacter.id;
        const newIndependentCharacterId = addedCharacter.id; // Use the ID from the addedCharacter

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

      return addedCharacter;
    },
    [tokensOnBoard, characters, addCharacter]
  );

  return {
    tokensOnBoard,
    tokenInstanceCounts,
    addToken,
    removeToken,
    updateTokenPosition,
    updateTokenHp,
    makeTokenIndependent,
  };
};
