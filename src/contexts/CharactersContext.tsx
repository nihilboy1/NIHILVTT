
import React, { createContext, useContext, type ReactNode } from 'react';
import { useCharactersState, type CharactersState } from '../hooks/useCharactersState'; // Import the custom hook and its return type

// Create the context
export const CharactersContext = createContext<CharactersState | undefined>(undefined);

// Provider component props
interface CharactersProviderProps {
  children: ReactNode;
}

// Provider component
export const CharactersProvider: React.FC<CharactersProviderProps> = ({ children }) => {
  const charactersState = useCharactersState(); // Use the custom hook

  return (
    <CharactersContext.Provider value={charactersState}>
      {children}
    </CharactersContext.Provider>
  );
};

// Consumer hook
export const useCharacters = (): CharactersState => {
  const context = useContext(CharactersContext);
  if (context === undefined) {
    throw new Error('useCharacters must be used within a CharactersProvider');
  }
  return context;
};
