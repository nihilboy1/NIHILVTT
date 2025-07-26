import React, { useEffect, useRef, useState } from 'react';

import { useChatStore } from '@/features/chat/model/store';
import { DEFAULTS } from '@/shared/config/constants';

import { useCommandHistory } from '../../../shared/lib/hooks/useCommandHistory';
import { findCommand, getAllCommands, type CommandContext } from '../lib/chatCommands';

import { ChatInput } from './ChatInput'; // Importar o novo componente
import { MessageList } from './MessageList';

// inclui a caixa do chat, o popover de comandos e o formulário de envio
export function ChatPanel() {
  const { messages, sendMessage, rollAndSendMessage, clearMessages, handleChatInput } =
    useChatStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isCommandPopoverOpen, setIsCommandPopoverOpen] = useState(false);
  const [commandError, setCommandError] = useState<string | null>(null);

  const { addCommandToHistory, navigateHistory, resetHistoryNavigation } = useCommandHistory();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const finalizeCommandExecution = (executedCommandText?: string) => {
    if (executedCommandText) {
      addCommandToHistory(executedCommandText);
    }
    setInputText('');
    setIsCommandPopoverOpen(false);
    setCommandError(null);
    resetHistoryNavigation();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputText.trim();

    if (!trimmedInput) return;

    if (trimmedInput.startsWith('/')) {
      const parts = trimmedInput.split(' ');
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
          clearMessages,
          getAllCommands,
        };
        commandDefinition.execute(args, commandContext);
        finalizeCommandExecution(trimmedInput);
      } else {
        setCommandError(
          `Comando desconhecido: ${commandName}. Digite /help para uma lista de comandos.`,
        );
      }
    } else {
      handleChatInput(trimmedInput, DEFAULTS.PLAYER_NAME);
      finalizeCommandExecution();
    }
  };

  return (
    <>
      <MessageList messages={messages} messagesEndRef={messagesEndRef} />

      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        handleSubmit={handleSubmit}
        isCommandPopoverOpen={isCommandPopoverOpen}
        setIsCommandPopoverOpen={setIsCommandPopoverOpen}
        commandError={commandError}
        resetHistoryNavigation={resetHistoryNavigation}
        navigateHistory={navigateHistory}
      />
    </>
  );
}
