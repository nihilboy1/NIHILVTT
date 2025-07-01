import { DiceFormula, RollCategory, SidebarTab } from "@/shared/api/types";
import rollNotificationSound from "@/shared/assets/sounds/rollNotification.wav";
import { useChat } from "@/widgets/chatPanel/model/contexts/ChatContext";
import { useUI } from "@/widgets/layoutControls/model/contexts/UIProvider";
import { useCallback } from "react";
import { performDiceRoll } from "@/utils/dice/diceUtils"; // Importar a nova função

export function useDiceRoller() {
  const { sendMessage } = useChat();
  const { setActiveSidebarTab } = useUI();

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
