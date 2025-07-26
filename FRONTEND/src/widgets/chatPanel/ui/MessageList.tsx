import React from 'react';

import { DiceRollMessage, Message, DiceRollDetails } from '@/shared/api/types';
import { DEFAULTS } from '@/shared/config/constants';

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

// chat propriamente dito, apenas a lista de mensagens
// Este componente exibe a lista de mensagens, formatando cada mensagem com base no remetente
export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="hide-scrollbar flex-grow space-y-3 overflow-y-scroll p-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex flex-col ${
            msg.sender === DEFAULTS.PLAYER_NAME ? 'items-end' : 'items-start'
          }`}
        >
          <div
            className={`max-w-xs rounded-lg p-2.5 shadow md:max-w-md ${
              msg.isDiceRoll
                ? `bg-accent-secondary text-text-primary`
                : msg.sender === DEFAULTS.PLAYER_NAME
                  ? `bg-surface-2 text-text-primary`
                  : `bg-surface-1`
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold opacity-80">{msg.sender}</span>
              <span className="ml-2 text-xs opacity-60">{formatTimestamp(msg.timestamp)}</span>
            </div>
            {msg.isDiceRoll ? (
              <div className="text-sm">
                {(() => {
                  const diceRollDetails = (msg as DiceRollMessage).diceRollDetails;

                  const getCategoryPrefix = (category: DiceRollDetails['category']) => {
                    switch (category) {
                      case 'Attribute':
                        return 'Teste de Atributo: ';
                      case 'Skill':
                        return 'Teste de Perícia: ';
                      case 'Saving Throw':
                        return 'Salvaguarda: ';
                      case 'Attack':
                        return 'Ataque: ';
                      case 'Damage':
                        return 'Dano: ';
                      case 'Generic':
                      default:
                        return 'Rolagem: ';
                    }
                  };

                  return (
                    <>
                      <span className="font-semibold">
                        {getCategoryPrefix(diceRollDetails.category)}
                        {diceRollDetails.rollName}
                      </span>
                      <div className="mt-1 text-sm">
                        <span className="italic">Resultados: </span>
                        <span className="mx-1 font-medium">{'['}</span>
                        {diceRollDetails.parts.map((part, index) => (
                          <React.Fragment key={index}>
                            {typeof part === 'number' ? (
                              <span className="text-text-secondary font-bold">
                                {part >= 0 ? `+${part}` : part}
                              </span>
                            ) : (
                              <span
                                className={`font-bold ${
                                  part.result === 20
                                    ? 'text-feedback-positive'
                                    : part.result === 1
                                      ? 'text-feedback-negative'
                                      : ''
                                }`}
                              >
                                {part.result}
                              </span>
                            )}
                            {index < diceRollDetails.parts.length - 1 ? (
                              <span className="font-medium">, </span>
                            ) : (
                              ''
                            )}
                          </React.Fragment>
                        ))}
                        <span className="mx-1 font-medium">{']'}</span>
                        <span className="mx-1">=</span>
                        <div
                          className={`mt-1 inline-block rounded p-1 px-2.5 shadow-inner ${
                            diceRollDetails.naturalRollResult === 20
                              ? `bg-feedback-positive text-surface-0`
                              : diceRollDetails.naturalRollResult === 1
                                ? `bg-feedback-negative text-surface-0`
                                : 'bg-surface-0'
                          }`}
                        >
                          <span className="text-lg font-bold">{diceRollDetails.finalResult}</span>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <p className="text-sm break-words whitespace-pre-line">{msg.text}</p>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
