import React from 'react';

import { DiceRollMessage, DiceRollDetails, Message } from '@/shared/api/types';

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
  currentSender: string;
  currentSenderAliases: string[];
  currentUserId: number | null;
  senderOverridesByUserId: Record<number, string>;
}

export function MessageList({
  messages,
  messagesEndRef,
  scrollContainerRef,
  onScroll,
  currentSender,
  currentSenderAliases,
  currentUserId,
  senderOverridesByUserId,
}: MessageListProps) {
  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const MASTER_SUFFIX = ' [MESTRE]';

  const normalizeName = (value: string): string => value.trim().toLocaleLowerCase();

  const stripMasterSuffix = (value: string): string =>
    value.endsWith(MASTER_SUFFIX) ? value.slice(0, -MASTER_SUFFIX.length) : value;

  const normalizedAliases = new Set(
    [currentSender, ...currentSenderAliases]
      .filter((value) => Boolean(value && value.trim().length > 0))
      .map((value) => normalizeName(stripMasterSuffix(value))),
  );

  return (
    <div
      ref={scrollContainerRef}
      onScroll={onScroll}
      className="hide-scrollbar h-full min-h-0 space-y-3 overflow-y-auto p-4"
    >
      {messages.map((msg) => {
        const effectiveSender =
          msg.senderUserId != null ? (senderOverridesByUserId[msg.senderUserId] ?? msg.sender) : msg.sender;
        const isMasterMessage = effectiveSender.endsWith(MASTER_SUFFIX);
        const persistedSender = stripMasterSuffix(effectiveSender);
        const isOwnMessageById =
          msg.senderUserId != null && currentUserId != null && msg.senderUserId === currentUserId;
        const isOwnMessageByName = normalizedAliases.has(normalizeName(persistedSender));
        const isOwnMessage = isOwnMessageById || isOwnMessageByName;
        const displaySender = isOwnMessageById ? stripMasterSuffix(currentSender) : persistedSender;

        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`relative max-w-xs rounded-lg p-2.5 shadow md:max-w-md ${
                isOwnMessage ? 'bg-surface-2 text-text-primary' : 'bg-surface-1'
              } ${msg.isDiceRoll ? 'border border-accent-primary' : ''}`}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold">{displaySender}</span>
                <span className="ml-2 shrink-0 text-xs opacity-60">{formatTimestamp(msg.timestamp)}</span>
              </div>
              {msg.senderColor && !isMasterMessage ? (
                <span
                  className={`absolute -top-0.5 h-2 w-2 rounded-[2px] ring-2 ring-surface-0 ${
                    isOwnMessage ? '-right-0.5' : '-left-0.5'
                  }`}
                  style={{ backgroundColor: msg.senderColor }}
                  aria-hidden="true"
                />
              ) : null}
              {isMasterMessage ? (
                <span
                  className={`absolute -top-1.5 rounded px-1 py-[1px] text-[8px] font-semibold uppercase tracking-wide ring-1 ring-surface-0 ${
                    isOwnMessage ? '-right-2' : '-left-2'
                  }`}
                  style={{
                    backgroundColor: msg.senderColor ?? 'var(--color-surface-0)',
                    color: 'var(--color-surface-0)',
                  }}
                >
                  GM
                </span>
              ) : null}
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
                                ? 'bg-feedback-positive text-surface-0'
                                : diceRollDetails.naturalRollResult === 1
                                  ? 'bg-feedback-negative text-surface-0'
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
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
