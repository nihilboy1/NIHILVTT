import { useState, useCallback } from 'react';

const MAX_COMMAND_HISTORY_LENGTH = 50;

interface UseCommandHistoryReturn {
  commandHistory: string[];
  addCommandToHistory: (command: string) => void;
  navigateHistory: (direction: 'up' | 'down', currentInputValue: string) => string | null;
  resetHistoryNavigation: () => void;
}

export function useCommandHistory(initialHistory: string[] = []): UseCommandHistoryReturn {
  const [history, setHistory] = useState<string[]>(initialHistory);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentTypedCommand, setCurrentTypedCommand] = useState<string>('');

  const addCommandToHistory = useCallback((command: string) => {
    setHistory((prev) => {
      const newHistory = [command.trim(), ...prev.filter((cmd) => cmd.trim() !== command.trim())];
      return newHistory.slice(0, MAX_COMMAND_HISTORY_LENGTH);
    });
    setHistoryIndex(-1);
    setCurrentTypedCommand('');
  }, []);

  const navigateHistory = useCallback(
    (direction: 'up' | 'down', currentInputValue: string): string | null => {
      if (history.length === 0 && direction === 'up') return null;
      if (historyIndex === -1 && direction === 'down') return null;

      let newIndex = historyIndex;
      let entryToSet: string | null = null;

      if (direction === 'up') {
        if (historyIndex === -1) {
          setCurrentTypedCommand(currentInputValue);
          newIndex = 0;
        } else {
          newIndex = Math.min(historyIndex + 1, history.length - 1);
        }
      } else {
        newIndex = historyIndex - 1;
      }

      setHistoryIndex(newIndex);

      if (newIndex === -1) {
        entryToSet = currentTypedCommand;
      } else if (history[newIndex] !== undefined) {
        entryToSet = history[newIndex];
      }
      return entryToSet;
    },
    [history, historyIndex, currentTypedCommand],
  );

  const resetHistoryNavigation = useCallback(() => {
    setHistoryIndex(-1);
  }, []);

  return {
    commandHistory: history,
    addCommandToHistory,
    navigateHistory,
    resetHistoryNavigation,
  };
}
