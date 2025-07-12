import { DiceRollDetails, DiceRollMessage, Message, TextMessage } from "@/shared/api/types";
import { DEFAULT_PLAYER_NAME } from "../../../../shared/config/constants";
import { generateUniqueId } from "../../../../shared/lib/utils/id/idUtils";
import { useCallback, useState } from "react";
import { performDiceRoll } from "@/utils/dice/diceUtils";
import { parseAndValidateChatCommand } from "../lib/chatCommandParser";
import { ChatCommand } from "../schemas/chatCommands.schema";

export interface ChatState {
  messages: Message[];
  sendMessage: (content: string | DiceRollDetails, sender?: string) => void;
  rollAndSendMessage: (formula: string, sender?: string) => void;
  clearMessages: () => void;
  handleChatInput: (input: string, sender?: string) => void; // Novo método para lidar com o input do chat
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
    [],
  );

  const handleChatInput = useCallback(
    (input: string, sender: string = DEFAULT_PLAYER_NAME) => {
      const command = parseAndValidateChatCommand(input);

      if (command) {
        // É um comando válido, processar
        processChatCommand(command, sender);
      } else {
        // Não é um comando ou é um comando inválido, enviar como mensagem de texto
        sendMessage(input, sender);
      }
    },
    [sendMessage]
  );

  const clearMessages = useCallback(() => {
    setMessages([initialWelcomeMessage]);
  }, [initialWelcomeMessage]);

  const processChatCommand = useCallback(
    (command: ChatCommand, sender: string) => {
      switch (command.type) {
        case 'simpleCommand':
          switch (command.command) {
            case 'clear':
              clearMessages();
              sendMessage("Chat limpo.", "Sistema");
              break;
            case 'help':
              sendMessage("Comandos disponíveis: /clear, /help, /whisper <alvo> <mensagem>", "Sistema");
              break;
          }
          break;
        case 'textArgumentCommand':
          const whisperCommand = command; // 'command' is now correctly narrowed to TextArgumentCommand
          sendMessage(`[Sussurro para ${whisperCommand.target}]: ${whisperCommand.message}`, sender);
          break;
        default:
          sendMessage(`Comando desconhecido ou tipo de comando inválido.`, "Sistema");
          break;
      }
    },
    [clearMessages, sendMessage]
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

  return { messages, sendMessage, rollAndSendMessage, clearMessages, handleChatInput };
};
