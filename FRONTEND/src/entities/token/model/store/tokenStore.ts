import { create } from 'zustand';

import { useCharactersStore } from '@/entities/character/model/store';

import { type Point, type Token } from '../../../../shared/api/types';
import { generateUniqueId } from '../../../../shared/lib/utils/id/idUtils';

export interface TokenState {
  tokensOnBoard: Token[];
  tokenInstanceCounts: Map<string, number>;
  addToken: (characterId: string, position: Point) => Token;
  addTokenFromSession: (token: Token) => void;
  removeToken: (tokenId: string) => void;
  removeTokenFromSession: (tokenId: string) => void;
  removeTokensByCharacterIdFromSession: (characterId: string) => void;
  updateTokenPosition: (tokenId: string, newPosition: Point) => void;
  updateTokenHp: (tokenId: string, newHp: number) => void;
  replaceTokens: (tokens: Token[]) => void;
  resetTokens: () => void;
}

export const useTokenStore = create<TokenState>((set, get) => ({
  tokensOnBoard: [],
  tokenInstanceCounts: new Map(),

  addToken: (characterId, position) => {
    const { characters } = useCharactersStore.getState(); // Access characters from the store
    const parentCharacterExists = characters.some((char) => char.id === characterId);
    if (!parentCharacterExists) {
      console.warn(
        `Character with ID ${characterId} not found. Token will be added without a valid parent.`,
      );
    }

    const newTokenInstance: Token = {
      id: generateUniqueId(),
      characterId: characterId,
      sceneId: 'default-scene',
      position: position,
    };

    set((state) => ({
      tokensOnBoard: [...state.tokensOnBoard, newTokenInstance],
      tokenInstanceCounts: new Map(state.tokenInstanceCounts).set(
        characterId,
        (state.tokenInstanceCounts.get(characterId) || 0) + 1,
      ),
    }));
    return newTokenInstance;
  },

  addTokenFromSession: (token) => {
    set((state) => {
      if (state.tokensOnBoard.some((existing) => existing.id === token.id)) {
        return state;
      }
      const tokenInstanceCounts = new Map(state.tokenInstanceCounts);
      tokenInstanceCounts.set(token.characterId, (tokenInstanceCounts.get(token.characterId) || 0) + 1);
      return {
        tokensOnBoard: [...state.tokensOnBoard, token],
        tokenInstanceCounts,
      };
    });
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
      const associatedCharacter = characters.find((char) => char.id === characterId);
      if (associatedCharacter && associatedCharacter.name.includes('(Cópia)')) {
        deleteCharacter(characterId);
      }
    } else {
      newCounts.set(characterId, currentCount - 1);
    }

    set((state) => ({
      tokensOnBoard: state.tokensOnBoard.filter((token) => token.id !== tokenId),
      tokenInstanceCounts: newCounts, // Set the pre-calculated newCounts
    }));
  },

  removeTokenFromSession: (tokenId) => {
    set((state) => {
      const instanceToRemove = state.tokensOnBoard.find((inst) => inst.id === tokenId);
      if (!instanceToRemove) {
        return state;
      }
      const tokenInstanceCounts = new Map(state.tokenInstanceCounts);
      const currentCount = tokenInstanceCounts.get(instanceToRemove.characterId) || 0;
      if (currentCount <= 1) {
        tokenInstanceCounts.delete(instanceToRemove.characterId);
      } else {
        tokenInstanceCounts.set(instanceToRemove.characterId, currentCount - 1);
      }
      return {
        tokensOnBoard: state.tokensOnBoard.filter((token) => token.id !== tokenId),
        tokenInstanceCounts,
      };
    });
  },

  removeTokensByCharacterIdFromSession: (characterId) => {
    set((state) => {
      const filteredTokens = state.tokensOnBoard.filter((token) => token.characterId !== characterId);
      const tokenInstanceCounts = filteredTokens.reduce((counts, token) => {
        counts.set(token.characterId, (counts.get(token.characterId) || 0) + 1);
        return counts;
      }, new Map<string, number>());

      return {
        tokensOnBoard: filteredTokens,
        tokenInstanceCounts,
      };
    });
  },

  updateTokenPosition: (tokenId, newPosition) => {
    set((state) => ({
      tokensOnBoard: state.tokensOnBoard.map((token) =>
        token.id === tokenId ? { ...token, position: newPosition } : token,
      ),
    }));
  },

  updateTokenHp: (tokenId, newHp) => {
    const { tokensOnBoard } = get();
    const { updateCharacterHp } = useCharactersStore.getState();
    const token = tokensOnBoard.find((t) => t.id === tokenId);

    console.log(
      "TokenStore: updateTokenHp chamado para Token ID:",
      tokenId,
      "com novo HP:",
      newHp
    );

    if (token) {
      console.log(
        "TokenStore: Chamando updateCharacterHp para Character ID:",
        token.characterId,
        "com HP:",
        newHp
      );
      updateCharacterHp(token.characterId, newHp);
    } else {
      console.warn("TokenStore: Token não encontrado com ID:", tokenId);
    }
  },

  replaceTokens: (tokens) => {
    const tokenInstanceCounts = tokens.reduce((counts, token) => {
      counts.set(token.characterId, (counts.get(token.characterId) || 0) + 1);
      return counts;
    }, new Map<string, number>());

    set({ tokensOnBoard: tokens, tokenInstanceCounts });
  },

  resetTokens: () => {
    set({ tokensOnBoard: [], tokenInstanceCounts: new Map() });
  },
}));
