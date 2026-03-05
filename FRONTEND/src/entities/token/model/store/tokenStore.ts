import { create } from 'zustand';

import { type Point, type Token } from '../../../../shared/api/types';

export interface TokenState {
  tokensOnBoard: Token[];
  tokenInstanceCounts: Map<string, number>;
  addTokenFromSession: (token: Token) => void;
  removeTokenFromSession: (tokenId: string) => void;
  removeTokensByCharacterIdFromSession: (characterId: string) => void;
  updateTokenPosition: (tokenId: string, newPosition: Point) => void;
  replaceTokens: (tokens: Token[]) => void;
  resetTokens: () => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  tokensOnBoard: [],
  tokenInstanceCounts: new Map(),

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
