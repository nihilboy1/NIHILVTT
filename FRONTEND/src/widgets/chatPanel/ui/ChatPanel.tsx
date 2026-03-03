import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/model/authStore';
import { useChatStore } from '@/features/chat/model/store';
import { applyGameSessionEvent } from '@/features/game/model/gameSessionEventHandlers';
import { sendGameChatMessage, sendGameDiceRoll } from '@/features/game/model/gameSessionApi';
import { useGameStore } from '@/features/game/model/gameStore';
import { DEFAULTS } from '@/shared/config/constants';

import { useCommandHistory } from '../../../shared/lib/hooks/useCommandHistory';
import { findCommand, getAllCommands, type CommandContext } from '../lib/chatCommands';

import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';

export function ChatPanel() {
  const BOTTOM_OFFSET_THRESHOLD = 32;
  const { messages, sendMessage, rollAndSendMessage, clearMessages } = useChatStore();
  const { gameId } = useParams<{ gameId: string }>();
  const user = useAuthStore((state) => state.user);
  const currentGame = useGameStore((state) => state.currentGame);

  const activeSender = useMemo(() => {
    const parsedGameId = Number(gameId);
    const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
    const isCurrentGameContext = isValidGameId && currentGame?.id === parsedGameId;

    const membershipNickname = isCurrentGameContext
      ? currentGame.players.find((player) => player.id === user?.id)?.name
      : null;

    return membershipNickname ?? user?.name ?? DEFAULTS.PLAYER_NAME;
  }, [currentGame, gameId, user?.id, user?.name]);

  const senderAliases = useMemo(() => {
    const aliases = new Set<string>();
    if (activeSender) aliases.add(activeSender);
    if (user?.name) aliases.add(user.name);

    const parsedGameId = Number(gameId);
    const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
    const isCurrentGameContext = isValidGameId && currentGame?.id === parsedGameId;
    if (isCurrentGameContext && user?.id != null) {
      const gameMemberName = currentGame.players.find((player) => player.id === user.id)?.name;
      if (gameMemberName) aliases.add(gameMemberName);
    }

    return Array.from(aliases);
  }, [activeSender, currentGame, gameId, user?.id, user?.name]);

  const senderOverridesByUserId = useMemo(() => {
    const parsedGameId = Number(gameId);
    const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
    const isCurrentGameContext = isValidGameId && currentGame?.id === parsedGameId;

    if (!isCurrentGameContext) {
      return {} as Record<number, string>;
    }

    return currentGame.players.reduce<Record<number, string>>((acc, player) => {
      acc[player.id] = player.isOwner ? `${player.name} [MESTRE]` : player.name;
      return acc;
    }, {});
  }, [currentGame, gameId]);

  const [inputText, setInputText] = useState('');
  const messageListRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);

  const [isCommandPopoverOpen, setIsCommandPopoverOpen] = useState(false);
  const [commandError, setCommandError] = useState<string | null>(null);

  const { addCommandToHistory, navigateHistory, resetHistoryNavigation } = useCommandHistory();

  const getIsAtBottom = () => {
    const container = messageListRef.current;
    if (!container) return true;
    const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    return distanceToBottom <= BOTTOM_OFFSET_THRESHOLD;
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
    setIsAtBottom(true);
    setShowJumpToLatest(false);
  };

  const handleMessageListScroll = () => {
    const atBottom = getIsAtBottom();
    setIsAtBottom(atBottom);
    if (atBottom) {
      setShowJumpToLatest(false);
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom('auto');
      return;
    }
    setShowJumpToLatest(true);
  }, [messages, isAtBottom]);

  const finalizeCommandExecution = (executedCommandText?: string) => {
    if (executedCommandText) {
      addCommandToHistory(executedCommandText);
    }
    setInputText('');
    setIsCommandPopoverOpen(false);
    setCommandError(null);
    resetHistoryNavigation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

        const parsedGameId = Number(gameId);
        const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;

        if (commandName === '/roll') {
          if (!isValidGameId) {
            setCommandError('Sessão de jogo inválida para rolagem.');
            return;
          }

          const notation = args.join('').replace(/\s+/g, '').toLowerCase();
          try {
            const event = await sendGameDiceRoll(parsedGameId, notation, notation, 'Generic');
            applyGameSessionEvent(event);
            finalizeCommandExecution(trimmedInput);
          } catch (error) {
            const message =
              typeof error === 'object' &&
              error !== null &&
              'formError' in error &&
              typeof (error as { formError?: unknown }).formError === 'string'
                ? (error as { formError: string }).formError
                : 'Falha ao rolar dados. Tente novamente.';
            setCommandError(message);
          }
          return;
        }

        const commandContext: CommandContext = {
          rollAndSendMessage: (formula, sender) => rollAndSendMessage(formula, sender ?? activeSender),
          sendMessage: (content, sender) => sendMessage(content, sender ?? activeSender),
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
      const parsedGameId = Number(gameId);
      const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;

      if (!isValidGameId) {
        setCommandError('Sessão de jogo inválida para envio de mensagem.');
        return;
      }

      try {
        const event = await sendGameChatMessage(parsedGameId, trimmedInput);
        applyGameSessionEvent(event);
        finalizeCommandExecution();
      } catch {
        setCommandError('Falha ao enviar mensagem. Tente novamente.');
      }
    }
  };

  return (
    <>
      <div className="relative min-h-0 flex-grow">
        <MessageList
          messages={messages}
          messagesEndRef={messagesEndRef}
          scrollContainerRef={messageListRef}
          onScroll={handleMessageListScroll}
          currentSender={activeSender}
          currentSenderAliases={senderAliases}
          currentUserId={user?.id ?? null}
          senderOverridesByUserId={senderOverridesByUserId}
        />
        {showJumpToLatest ? (
          <div className="pointer-events-none absolute bottom-4 right-4 z-10">
            <button
              type="button"
              onClick={() => scrollToBottom('smooth')}
              aria-label="Ir para mensagens mais recentes"
              title="Mensagens mais recentes"
              className="pointer-events-auto rounded-md bg-surface-2 px-3 py-1.5 text-xs font-semibold text-text-primary shadow hover:bg-accent-secondary"
            >
              ↓
            </button>
          </div>
        ) : null}
      </div>

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
