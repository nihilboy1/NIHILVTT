import { create } from "zustand";

interface SelectedTokenState {
  selectedTokenId: string | null;
  setSelectedTokenId: (tokenId: string | null) => void;
}

export const useSelectedTokenStore = create<SelectedTokenState>((set) => ({
  selectedTokenId: null,
  setSelectedTokenId: (tokenId) => set({ selectedTokenId: tokenId }),
}));
