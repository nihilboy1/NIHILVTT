import { DiceRollDetails, DiceRollMessage, Message, TextMessage } from "@/shared/api/types";
import { DEFAULT_PLAYER_NAME } from "../../../../shared/config/constants";
import { generateUniqueId } from "../../../../shared/lib/utils/id/idUtils";
import { useCallback, useState } from "react";
import { performDiceRoll } from "@/utils/dice/diceUtils"; // Importar performDiceRoll

export interface ChatState {
  messages: Message[];
  sendMessage: (content: string | DiceRollDetails, sender?: string) => void;
  rollAndSendMessage: (formula: string, sender?: string) => void; // Adicionado
  clearMessages: () => void;
}

export const useChatState = (): ChatState => {
  const initialWelcomeMessage: TextMessage = {
    id: generateUniqueId(),
    sender: "Sistema",
    text: "Saudações, nobre aventureiro! Que os deuses da sorte guiem seus dados!",
    timestamp: new Date(),
    isDiceRoll: false,
  };

  const [messages, setMessages] = useState<Message[]>([initialWelcomeMessage]);

  const sendMessage = useCallback(
    (
      content: string | DiceRollDetails,
      sender: string = DEFAULT_PLAYER_NAME
    ) => {
      const baseMessage = {
        id: generateUniqueId(),
        sender,
        timestamp: new Date(),
      };

      if (typeof content === "string") {
        const newMessage: TextMessage = {
          ...baseMessage,
          isDiceRoll: false,
          text: content,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        // A propriedade 'text' para DiceRollMessage pode ser uma string vazia ou uma mensagem genérica,
        // pois o conteúdo detalhado da rolagem será renderizado pelo componente de exibição.
        const newMessage: DiceRollMessage = {
          ...baseMessage,
          isDiceRoll: true,
          diceRollDetails: content, // 'content' já é DiceRollDetails completa
          text: "", // Ou uma string como "Rolagem de dados"
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    },
    []
  );

  const rollAndSendMessage = useCallback(
    (formula: string, sender: string = DEFAULT_PLAYER_NAME) => {
      try {
        const diceRollDetails = performDiceRoll(formula, formula, "Generic"); // Usar "Generic" como categoria padrão
        sendMessage(diceRollDetails, sender);
      } catch (error) {
        sendMessage(`Erro ao rolar dados: ${(error as Error).message}`, "Sistema");
      }
    },
    [sendMessage]
  );

  const clearMessages = useCallback(() => {
    setMessages([initialWelcomeMessage]);
  }, []); // initialWelcomeMessage é uma constante, não precisa ser dependência

  return { messages, sendMessage, rollAndSendMessage, clearMessages };
};
