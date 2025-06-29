import { useCallback, useState } from "react";
import {
  type DiceRollDetails,
  type DiceRollMessage,
  type Message,
  type TextMessage,
} from "../shared/api/types";
import { DEFAULT_PLAYER_NAME } from "../shared/config/constants";
import { rollDiceInternal } from "../shared/lib/utils/dice/diceUtils";
import { generateUniqueId } from "../shared/lib/utils/id/idUtils";

export interface ChatState {
  messages: Message[];
  sendMessage: (content: string | DiceRollDetails, sender?: string) => void;
  rollAndSendMessage: (notation: string) => void;
  clearMessages: () => void; // Adicionar esta linha
}

export const useChatState = (): ChatState => {
  const initialWelcomeMessage: TextMessage = {
    id: generateUniqueId(),
    sender: "Sistema",
    text: "Saudações, nobre aventureiro! Que os deuses da sorte guiem seus dados!",
    timestamp: new Date(),
    isDiceRoll: false,
  };

  const [messages, setMessages] = useState<Message[]>([initialWelcomeMessage]); // Usar a mensagem inicial

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
        const summary =
          `Rolou ${content.notation}: [${content.rolls.join(", ")}]` +
          (content.modifierOperator && content.modifierValue !== undefined
            ? ` ${content.modifierOperator} ${content.modifierValue}`
            : "") +
          ` = ${content.finalResult}`;

        const newMessage: DiceRollMessage = {
          ...baseMessage,
          isDiceRoll: true,
          diceRollDetails: { ...content },
          text: summary,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    },
    []
  );

  const rollAndSendMessage = useCallback(
    (notation: string) => {
      const rollDetailsOrError = rollDiceInternal(notation);
      if ("error" in rollDetailsOrError) {
        sendMessage(rollDetailsOrError.error, "Sistema");
      } else {
        sendMessage(rollDetailsOrError, DEFAULT_PLAYER_NAME);
      }
    },
    [sendMessage]
  ); // Removido rollDiceInternal das dependências, pois não é mais um useCallback local

  const clearMessages = useCallback(() => {
    setMessages([initialWelcomeMessage]); // Limpa as mensagens e adiciona a mensagem inicial novamente
  }, [initialWelcomeMessage]); // Dependência para useCallback

  return { messages, sendMessage, rollAndSendMessage, clearMessages }; // Retornar clearMessages
};
