import { create } from "zustand";
import { type Point, type Token } from "../../../../shared/api/types";
import { type Character } from "@/entities/character/model/schemas/character.schema";
import { generateUniqueId } from "../../../../shared/lib/utils/id/idUtils";
import { useCharactersStore } from "@/entities/character/model/store";

export interface TokenState {
  tokensOnBoard: Token[];
  tokenInstanceCounts: Map<string, number>;
  addToken: (characterId: string, position: Point, currentHp?: number) => Token;
  removeToken: (tokenId: string) => void;
  updateTokenPosition: (tokenId: string, newPosition: Point) => void;
  updateTokenHp: (tokenId: string, newHp: number) => void;
  makeTokenIndependent: (tokenId: string) => Character | null;
}

export const useTokenStore = create<TokenState>((set, get) => ({
  tokensOnBoard: [],
  tokenInstanceCounts: new Map(),

  addToken: (characterId, position, currentHp) => {
    const { characters } = useCharactersStore.getState(); // Access characters from the store
    const parentCharacterExists = characters.some(
      (char) => char.id === characterId
    );
    if (!parentCharacterExists) {
      console.warn(
        `Character with ID ${characterId} not found. Token will be added without a valid parent.`
      );
    }

    const newTokenInstance: Token = {
      id: generateUniqueId(),
      characterId: characterId,
      sceneId: "default-scene",
      position: position,
      currentHp: currentHp,
    };

    set((state) => ({
      tokensOnBoard: [...state.tokensOnBoard, newTokenInstance],
      tokenInstanceCounts: new Map(state.tokenInstanceCounts).set(
        characterId,
        (state.tokenInstanceCounts.get(characterId) || 0) + 1
      ),
    }));
    return newTokenInstance;
  },

  removeToken: (tokenId) => {
    const { tokensOnBoard, tokenInstanceCounts } = get(); // Read tokenInstanceCounts here
    const { characters, deleteCharacter } = useCharactersStore.getState();

    const instanceToRemove = tokensOnBoard.find((inst) => inst.id === tokenId);
    if (!instanceToRemove) return;

    const { characterId } = instanceToRemove;

    const newCounts = new Map(tokenInstanceCounts); // Create new map from the one obtained via get()
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
        deleteCharacter(characterId);
      }
    } else {
      newCounts.set(characterId, currentCount - 1);
    }

    set((state) => ({
      tokensOnBoard: state.tokensOnBoard.filter(
        (token) => token.id !== tokenId
      ),
      tokenInstanceCounts: newCounts, // Set the pre-calculated newCounts
    }));
  },

  updateTokenPosition: (tokenId, newPosition) => {
    set((state) => ({
      tokensOnBoard: state.tokensOnBoard.map((token) =>
        token.id === tokenId ? { ...token, position: newPosition } : token
      ),
    }));
  },

  updateTokenHp: (tokenId, newHp) => {
    set((state) => ({
      tokensOnBoard: state.tokensOnBoard.map((token) =>
        token.id === tokenId ? { ...token, currentHp: newHp } : token
      ),
    }));
  },

  makeTokenIndependent: (tokenId) => {
    const { tokensOnBoard, tokenInstanceCounts } = get(); // Read tokenInstanceCounts here
    const { characters, addCharacter } = useCharactersStore.getState();

    const targetToken = tokensOnBoard.find((inst) => inst.id === tokenId);
    if (!targetToken) return null;

    const originalCharacter = characters.find(
      (char) => char.id === targetToken.characterId
    );
    if (!originalCharacter) return null;

    const copiedCharacterData: Character = JSON.parse(
      JSON.stringify(originalCharacter)
    );

    const newIndependentCharacterData: Omit<Character, "id"> = {
      ...copiedCharacterData,
      name: `${originalCharacter.name} (Cópia)`,
    };

    const addedCharacter = addCharacter(newIndependentCharacterData);

    const newCounts = new Map(tokenInstanceCounts); // Create new map from the one obtained via get()
    const originalCharacterId = originalCharacter.id;
    const newIndependentCharacterId = addedCharacter.id;

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

    set((state) => ({
      tokensOnBoard: state.tokensOnBoard.map((token) =>
        token.id === tokenId
          ? { ...token, characterId: addedCharacter.id }
          : token
      ),
      tokenInstanceCounts: newCounts, // Set the pre-calculated newCounts
    }));

    return addedCharacter;
  },
}));
