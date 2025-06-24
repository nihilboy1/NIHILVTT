
import React, { createContext, useContext, type ReactNode } from 'react';
import { useBoardSettingsState, type BoardSettingsState } from '../hooks/useBoardSettingsState'; // Import the custom hook

export const BoardSettingsContext = createContext<BoardSettingsState | undefined>(undefined);

export const BoardSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const boardSettingsState = useBoardSettingsState(); // Use the custom hook

  return (
    <BoardSettingsContext.Provider value={boardSettingsState}>
      {children}
    </BoardSettingsContext.Provider>
  );
};

export const useBoardSettings = (): BoardSettingsState => {
  const context = useContext(BoardSettingsContext);
  if (context === undefined) {
    throw new Error('useBoardSettings must be used within a BoardSettingsProvider');
  }
  return context;
};
