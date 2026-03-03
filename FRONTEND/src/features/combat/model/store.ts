import { create } from 'zustand';

import type { CombatState } from '@/shared/api/types';

interface CombatStoreState {
  combatState: CombatState | null;
  setCombatState: (combatState: CombatState | null) => void;
  clearCombatState: () => void;
}

export const useCombatStore = create<CombatStoreState>((set) => ({
  combatState: null,
  setCombatState: (combatState) => set({ combatState }),
  clearCombatState: () => set({ combatState: null }),
}));
