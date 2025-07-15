import { create } from 'zustand';
import { DiceFormula, RollCategory, SidebarTab } from '@/shared/api/types';
import rollNotificationSound from '@/shared/assets/sounds/rollNotification.wav';
import { performDiceRoll } from '../lib/diceUtils';
import { useUIStore } from '@/features/layoutControls/model/store';
import { useChatStore } from '@/features/chat/model/store';

interface DiceRollingState {
  rollDice: (
    formula: DiceFormula,
    rollName: string,
    category: RollCategory,
    sender: string
  ) => void;
}

export const useDiceRollingStore = create<DiceRollingState>(() => ({
  rollDice: (formula, rollName, category, sender) => {
    const { sendMessage } = useChatStore.getState();
    const { setActiveSidebarTab } = useUIStore.getState();

    try {
      const diceRollDetails = performDiceRoll(formula, rollName, category);
      sendMessage(diceRollDetails, sender);
      setActiveSidebarTab(SidebarTab.CHAT);

      const audio = new Audio(rollNotificationSound);
      audio.volume = 0.03;
      audio.play();
    } catch (error) {
      console.error('Erro ao rolar dados:', error);
      sendMessage(`Erro ao rolar dados: ${(error as Error).message}`, 'Sistema');
    }
  },
}));
