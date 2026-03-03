import { create } from 'zustand';

import { performDiceRoll } from '@/features/diceRolling/lib/diceUtils';
import { DiceRollDetails, DiceRollMessage, Message, TextMessage } from '@/shared/api/types';
import { DEFAULTS } from '@/shared/config/constants';
import { generateUniqueId } from '@/shared/lib/utils/id/idUtils';

export interface ChatState {
  messages: Message[];
  sendMessage: (content: string | DiceRollDetails, sender?: string) => void;
  addIncomingMessage: (message: Message) => void;
  rollAndSendMessage: (formula: string, sender?: string) => void;
  clearMessages: () => void;
  clearAllMessages: () => void;
  replaceMessages: (messages: Message[]) => void;
  handleChatInput: (input: string, sender?: string) => void;
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

  addIncomingMessage: (message) => {
    set((state) => {
      if (state.messages.some((existing) => existing.id === message.id)) {
        return state;
      }
      return { messages: [...state.messages, message] };
    });
  },

  handleChatInput: (input: string, sender: string = DEFAULTS.PLAYER_NAME) => {
    get().sendMessage(input, sender);
  },

  clearMessages: () => {
    set({ messages: [initialWelcomeMessage] });
  },

  clearAllMessages: () => {
    set({ messages: [] });
  },

  replaceMessages: (messages) => {
    set({ messages: messages.length > 0 ? messages : [initialWelcomeMessage] });
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
