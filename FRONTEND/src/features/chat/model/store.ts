import { create } from 'zustand';

import { performDiceRoll } from '@/features/diceRolling/lib/diceUtils';
import { DiceRollDetails, DiceRollMessage, Message, TextMessage } from '@/shared/api/types';
import { DEFAULTS } from '@/shared/config/constants';
import { generateUniqueId } from '@/shared/lib/utils/id/idUtils';

import { parseAndValidateChatCommand } from './chatCommandParser';
import { ChatCommand } from './chatCommands.schema';

export interface ChatState {
  messages: Message[];
  sendMessage: (content: string | DiceRollDetails, sender?: string) => void;
  rollAndSendMessage: (formula: string, sender?: string) => void;
  clearMessages: () => void;
  handleChatInput: (input: string, sender?: string) => void;
  processChatCommand: (command: ChatCommand, sender: string) => void; // Adicionado
}

const initialWelcomeMessage: TextMessage = {
  id: generateUniqueId(),
  sender: 'Sistema',
  text: 'Saudações, nobre aventureiro! Que os deuses da sorte guiem seus dados!',
  timestamp: new Date(),
  isDiceRoll: false,
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [initialWelcomeMessage],

  sendMessage: (content: string | DiceRollDetails, sender: string = DEFAULTS.PLAYER_NAME) => {
    const baseMessage = {
      id: generateUniqueId(),
      sender,
      timestamp: new Date(),
    };

    if (typeof content === 'string') {
      const newMessage: TextMessage = {
        ...baseMessage,
        isDiceRoll: false,
        text: content,
      };
      set((state) => ({ messages: [...state.messages, newMessage] }));
    } else {
      const newMessage: DiceRollMessage = {
        ...baseMessage,
        isDiceRoll: true,
        diceRollDetails: content,
        text: '',
      };
      set((state) => ({ messages: [...state.messages, newMessage] }));
    }
  },

  handleChatInput: (input: string, sender: string = DEFAULTS.PLAYER_NAME) => {
    const command = parseAndValidateChatCommand(input);
    const { processChatCommand, sendMessage: currentSendMessage } = get();

    if (command) {
      processChatCommand(command, sender);
    } else {
      currentSendMessage(input, sender);
    }
  },

  clearMessages: () => {
    set({ messages: [initialWelcomeMessage] });
  },

  processChatCommand: (command: ChatCommand, sender: string) => {
    const { clearMessages: currentClearMessages, sendMessage: currentSendMessage } = get();
    switch (command.type) {
      case 'simpleCommand':
        switch (command.command) {
          case 'clear':
            currentClearMessages();
            currentSendMessage('Chat limpo.', 'Sistema');
            break;
          case 'help':
            currentSendMessage(
              'Comandos disponíveis: /clear, /help, /whisper <alvo> <mensagem>',
              'Sistema',
            );
            break;
        }
        break;
      case 'textArgumentCommand':
        const whisperCommand = command;
        currentSendMessage(
          `[Sussurro para ${whisperCommand.target}]: ${whisperCommand.message}`,
          sender,
        );
        break;
      default:
        currentSendMessage(`Comando desconhecido ou tipo de comando inválido.`, 'Sistema');
        break;
    }
  },

  rollAndSendMessage: (formula: string, sender: string = DEFAULTS.PLAYER_NAME) => {
    try {
      const diceRollDetails = performDiceRoll(formula, formula, 'Generic');
      get().sendMessage(diceRollDetails, sender);
    } catch (error) {
      get().sendMessage(`Erro ao rolar dados: ${(error as Error).message}`, 'Sistema');
    }
  },
}));
