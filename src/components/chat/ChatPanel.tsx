import React, { useState, useRef, useEffect } from "react";
import { DEFAULT_PLAYER_NAME } from "../../constants";
import { useChat } from "../../contexts/ChatContext";
import { useCommandHistory } from "../../hooks/useCommandHistory";
import {
  findCommand,
  getAllCommands,
  type CommandContext,
} from "../../lib/chatCommands";
import { ChatCommandPopover } from "./ChatCommandPopover";
import { MessageList } from "./MessageList";

// inclui a caixa do chat, o popover de comandos e o formulário de envio
export function ChatPanel() {
  const { messages, sendMessage, rollAndSendMessage } = useChat();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isCommandPopoverOpen, setIsCommandPopoverOpen] = useState(false);
  const [commandError, setCommandError] = useState<string | null>(null);

  const { addCommandToHistory, navigateHistory, resetHistoryNavigation } =
    useCommandHistory();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const finalizeCommandExecution = (executedCommandText?: string) => {
    if (executedCommandText) {
      addCommandToHistory(executedCommandText);
    }
    setInputText("");
    setIsCommandPopoverOpen(false);
    setCommandError(null);
    resetHistoryNavigation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);

    if (text.startsWith("/")) {
      setIsCommandPopoverOpen(true);
    } else {
      setIsCommandPopoverOpen(false);
    }
    if (commandError) {
      setCommandError(null);
    }
    if (text !== inputText) {
      resetHistoryNavigation();
    }
  };

  const handleCommandSelect = (commandString: string) => {
    setInputText(commandString);
    setIsCommandPopoverOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
      setTimeout(
        () =>
          inputRef.current?.setSelectionRange(
            commandString.length,
            commandString.length
          ),
        0
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputText.trim();

    if (!trimmedInput) return;

    if (trimmedInput.startsWith("/")) {
      const parts = trimmedInput.split(" ");
      const commandName = parts[0].toLowerCase();
      const args = parts.slice(1);

      const commandDefinition = findCommand(commandName);

      if (commandDefinition) {
        if (commandDefinition.validateArgs) {
          const errorMessage = commandDefinition.validateArgs(args);
          if (errorMessage) {
            setCommandError(errorMessage);
            return;
          }
        }
        const commandContext: CommandContext = {
          rollAndSendMessage,
          sendMessage,
          getAllCommands,
        };
        commandDefinition.execute(args, commandContext);
        finalizeCommandExecution(trimmedInput);
      } else {
        setCommandError(
          `Comando desconhecido: ${commandName}. Digite /help para uma lista de comandos.`
        );
      }
    } else {
      sendMessage(trimmedInput, DEFAULT_PLAYER_NAME);
      finalizeCommandExecution();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isCommandPopoverOpen) {
      if (e.key === "Enter") {
        setIsCommandPopoverOpen(false);
        return;
      } else if (["ArrowUp", "ArrowDown", "Escape"].includes(e.key)) {
        return;
      }
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const direction = e.key === "ArrowUp" ? "up" : "down";
      const historyEntry = navigateHistory(direction, inputText);
      if (historyEntry !== null) {
        setInputText(historyEntry);
        setTimeout(
          () =>
            inputRef.current?.setSelectionRange(
              historyEntry.length,
              historyEntry.length
            ),
          0
        );
      }
    } else if (e.key === "Escape") {
      if (isCommandPopoverOpen) {
        setIsCommandPopoverOpen(false);
      }
    }
  };

  return (
    <>
      <MessageList messages={messages} messagesEndRef={messagesEndRef} />

      <ChatCommandPopover
        isOpen={isCommandPopoverOpen}
        onClose={() => setIsCommandPopoverOpen(false)}
        targetInputRef={inputRef}
        onCommandSelect={handleCommandSelect}
        inputValue={inputText}
      />

      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex space-x-2 ">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Digite uma mensagem ou /comando..."
            className="flex-grow p-2 border border-text-secondary rounded-md  "
            aria-label="Entrada de mensagem do chat"
            aria-autocomplete="list"
            aria-expanded={isCommandPopoverOpen}
            autoComplete="off"
            aria-controls={
              isCommandPopoverOpen ? "command-suggestions" : undefined
            }
          />
          <button
            type="submit"
            className="px-4 py-2 bg-accent-primary cursor-pointer hover:bg-accent-primary-hover font-semibold rounded-md transition-colors"
          >
            Enviar
          </button>
        </div>
        <p
          className={` text-xs text-text-secondary mt-1.5  min-h-[3rem] `}
          role="alert"
          aria-live="assertive"
        >
          {commandError}
        </p>
      </form>
    </>
  );
}
// ESTILO AJUSTADO
