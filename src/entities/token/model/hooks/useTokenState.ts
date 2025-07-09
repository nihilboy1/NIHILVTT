import { useCallback, useState } from "react";
import {
  type Character,
  type Point,
  type Token,
} from "../../../../shared/api/types";
import { generateUniqueId } from "../../../../shared/lib/utils/id/idUtils";
import { useCharacters } from "@/entities/character/model/contexts/CharactersContext";

export interface TokenState {
  tokensOnBoard: Token[];
  tokenInstanceCounts: Map<string, number>;
  addToken: (
    characterId: string,
    position: Point,
    currentHp?: number
  ) => Token;
  removeToken: (tokenId: string) => void;
  updateTokenPosition: (tokenId: string, newPosition: Point) => void;
  updateTokenHp: (tokenId: string, newHp: number) => void;
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
      const parentCharacterExists = characters.some(
        (char: Character) => char.id === characterId
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
          const associatedCharacter = characters.find(
            (char: Character) => char.id === characterId
          );
          if (
            associatedCharacter &&
            associatedCharacter.name.includes("(Cópia)")
          ) {
            deleteCharacter(characterId); // Use deleteCharacter from CharactersContext
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
      if (!targetToken) {
        console.error("Token not found for making independent:", tokenId);
        return null;
      }

      const originalCharacter = characters.find(
        (char: Character) => char.id === targetToken.characterId
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

      const addedCharacter = addCharacter(newIndependentCharacter); // Use addCharacter from CharactersContext

      setTokensOnBoard((prevTokens) =>
        prevTokens.map((token) =>
          token.id === tokenId
            ? { ...token, characterId: addedCharacter.id, name: addedCharacter.name } // Update token's name
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
