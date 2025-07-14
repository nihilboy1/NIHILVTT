import { DiceFormula, RollCategory, SidebarTab } from "@/shared/api/types";
import rollNotificationSound from "@/shared/assets/sounds/rollNotification.wav";
import { useCallback } from "react";
import { performDiceRoll } from "../../lib/diceUtils";
import { useUIStore } from "@/features/layoutControls/model/store";
import { useChatStore } from "@/features/chat/model/store";

export function useDiceRoller() {
  const { sendMessage } = useChatStore();
  const { setActiveSidebarTab } = useUIStore();

  const rollDice = useCallback(
    (
      formula: DiceFormula,
      rollName: string,
      category: RollCategory,
      sender: string
    ) => {
      try {
        const diceRollDetails = performDiceRoll(formula, rollName, category);
        sendMessage(diceRollDetails, sender);
        setActiveSidebarTab(SidebarTab.CHAT);

        const audio = new Audio(rollNotificationSound);
        audio.volume = 0.03; 
        audio.play();
      } catch (error) {
        console.error("Erro ao rolar dados:", error);
        sendMessage(`Erro ao rolar dados: ${(error as Error).message}`, "Sistema");
      }
    },
    [sendMessage, setActiveSidebarTab]
  );

  return { rollDice };
}
