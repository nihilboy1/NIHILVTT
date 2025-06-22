
import React, { createContext, useContext, type ReactNode } from 'react';
import { useUIState, type UIState } from '../hooks/useUIState'; // Import the custom hook

const UIContext = createContext<UIState | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const uiState = useUIState(); // Use the custom hook

  return (
    <UIContext.Provider value={uiState}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIState => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
