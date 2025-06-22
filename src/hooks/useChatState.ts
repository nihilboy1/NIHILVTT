
import { useState, useCallback } from 'react';
import { type Message, type TextMessage, type DiceRollMessage, type DiceRollDetails } from '../types';
import { DEFAULT_PLAYER_NAME } from '../constants';
import { rollDiceInternal } from '../utils/dice/diceUtils'; // Importar a função

export interface ChatState {
  messages: Message[];
  sendMessage: (content: string | DiceRollDetails, sender?: string) => void;
  rollAndSendMessage: (notation: string) => void;
}

export const useChatState = (): ChatState => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-welcome-' + Date.now(),
      sender: 'Sistema',
      text: 'Saudações, nobre aventureiro! Que os deuses da sorte guiem seus dados!',
      timestamp: new Date(),
      isDiceRoll: false,
    } as TextMessage, // Explicitly cast as TextMessage
  ]);

  const sendMessage = useCallback(
    (content: string | DiceRollDetails, sender: string = DEFAULT_PLAYER_NAME) => {
      const baseMessage = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        sender,
        timestamp: new Date(),
      };

      if (typeof content === 'string') {
        const newMessage: TextMessage = {
          ...baseMessage,
          isDiceRoll: false,
          text: content,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
      } else {
        const summary = `Rolou ${content.notation}: [${content.rolls.join(', ')}]`
          + (content.modifierOperator && content.modifierValue !== undefined ? ` ${content.modifierOperator} ${content.modifierValue}` : '')
          + ` = ${content.finalResult}`;
        
        const newMessage: DiceRollMessage = {
          ...baseMessage,
          isDiceRoll: true,
          diceRollDetails: { ...content },
          text: summary, // O campo 'text' ainda é útil para um resumo da rolagem
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
    },
    []
  );

  const rollAndSendMessage = useCallback((notation: string) => {
    const rollDetailsOrError = rollDiceInternal(notation);
    if ('error' in rollDetailsOrError) {
      sendMessage(rollDetailsOrError.error, 'Sistema');
    } else {
      sendMessage(rollDetailsOrError, DEFAULT_PLAYER_NAME);
    }
  }, [sendMessage]); // Removido rollDiceInternal das dependências, pois não é mais um useCallback local

  return { messages, sendMessage, rollAndSendMessage };
};
