import React from "react";
import { type Message, type DiceRollMessage } from "../../shared/types/index";
import { DEFAULT_PLAYER_NAME } from "../../constants";

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

// chat pripriamente dito, apenas a lista de mensagens
// Este componente exibe a lista de mensagens, formatando cada mensagem com base no remetente
export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-grow p-4 space-y-3 overflow-y-scroll hide-scrollbar">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex flex-col ${
            msg.sender === DEFAULT_PLAYER_NAME ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`max-w-xs md:max-w-md p-2.5 rounded-lg shadow ${
              msg.isDiceRoll
                ? `bg-accent-secondary text-text-primary`
                : msg.sender === DEFAULT_PLAYER_NAME
                ? `bg-surface-2 text-text-primary`
                : `bg-surface-1`
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold opacity-80">
                {msg.sender}
              </span>
              <span className="text-xs opacity-60 ml-2">
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
            {msg.isDiceRoll ? (
              <div className="text-sm">
                {(() => {
                  const diceRollDetails = (msg as DiceRollMessage)
                    .diceRollDetails;

                  const modifierElement =
                    diceRollDetails.modifierOperator &&
                    diceRollDetails.modifierValue !== undefined ? (
                      <span className="italic">
                        {" "}
                        {diceRollDetails.modifierOperator}{" "}
                        {diceRollDetails.modifierValue}
                      </span>
                    ) : null;

                  return (
                    <>
                      {/* TypeScript agora sabe que msg é do tipo DiceRollMessage aqui */}
                      <span className="italic">
                        Rolou {diceRollDetails.notation}:
                      </span>
                      <span className="mx-1 font-medium">{"["}</span>
                      {diceRollDetails.rolls.map((roll, index) => (
                        <span
                          key={index}
                          className={`font-bold ${
                            roll === 20
                              ? "text-feedback-positive"
                              : roll === 1
                              ? "text-feedback-negative"
                              : ""
                          }`}
                        >
                          {roll}
                          {index < diceRollDetails.rolls.length - 1 ? (
                            <span className="font-medium">, </span>
                          ) : (
                            ""
                          )}
                        </span>
                      ))}
                      <span className="mx-1 font-medium">{"]"}</span>

                      {modifierElement}

                      <span className="mx-1">=</span>
                      <div
                        className={`inline-block mt-1 p-1 px-2.5 rounded shadow-inner ${
                          diceRollDetails.finalResult === 20
                            ? ` bg-feedback-positive text-surface-0 `
                            : diceRollDetails.finalResult === 1
                            ? `bg-feedback-negative text-surface-0`
                            : "bg-surface-0"
                        }`}
                      >
                        <span className="font-bold text-lg">
                          {diceRollDetails.finalResult}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <p className="text-sm break-words whitespace-pre-line">
                {msg.text}
              </p>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
// ESTILO AJUSTADO
