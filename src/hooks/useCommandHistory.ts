
import { useState, useCallback } from 'react';

const MAX_COMMAND_HISTORY_LENGTH = 50;

interface UseCommandHistoryReturn {
  commandHistory: string[];
  addCommandToHistory: (command: string) => void;
  navigateHistory: (direction: 'up' | 'down', currentInputValue: string) => string | null;
  resetHistoryNavigation: () => void;
}

export const useCommandHistory = (initialHistory: string[] = []): UseCommandHistoryReturn => {
  const [history, setHistory] = useState<string[]>(initialHistory);
  const [historyIndex, setHistoryIndex] = useState<number>(-1); // -1 means user is typing new, not browsing history
  const [currentTypedCommand, setCurrentTypedCommand] = useState<string>(""); // Stores what user typed before browsing

  const addCommandToHistory = useCallback((command: string) => {
    setHistory(prev => {
      const newHistory = [command.trim(), ...prev.filter(cmd => cmd.trim() !== command.trim())];
      return newHistory.slice(0, MAX_COMMAND_HISTORY_LENGTH);
    });
    setHistoryIndex(-1); 
    setCurrentTypedCommand(""); 
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down', currentInputValue: string): string | null => {
    if (history.length === 0 && direction === 'up') return null; // No history to navigate up to
    if (historyIndex === -1 && direction === 'down') return null; // Can't go "down" further if at current typed

    let newIndex = historyIndex;
    let entryToSet: string | null = null;

    if (direction === 'up') {
      if (historyIndex === -1) { 
        setCurrentTypedCommand(currentInputValue); // Save current input before moving into history
        newIndex = 0;
      } else {
        newIndex = Math.min(historyIndex + 1, history.length - 1);
      }
    } else { // 'down'
      newIndex = historyIndex - 1;
    }

    setHistoryIndex(newIndex);

    if (newIndex === -1) { 
      entryToSet = currentTypedCommand;
    } else if (history[newIndex] !== undefined) {
      entryToSet = history[newIndex];
    }
    return entryToSet;
  }, [history, historyIndex, currentTypedCommand]);

  const resetHistoryNavigation = useCallback(() => {
    // Called when input changes not via history navigation (e.g., typing normally)
    setHistoryIndex(-1);
    // setCurrentTypedCommand(""); // Don't clear buffer here, only when a command is submitted or history traversed fully "down"
  }, []);

  return {
    commandHistory: history,
    addCommandToHistory,
    navigateHistory,
    resetHistoryNavigation,
  };
};
