
import React, { createContext, useContext, type ReactNode } from 'react';
import { useTokensState, type TokensState } from '../hooks/useTokensState'; // Import the custom hook and its return type

// Create the context
export const TokensContext = createContext<TokensState | undefined>(undefined);

// Provider component props
interface TokensProviderProps {
  children: ReactNode;
}

// Provider component
export const TokensProvider: React.FC<TokensProviderProps> = ({ children }) => {
  const tokensState = useTokensState(); // Use the custom hook

  return (
    <TokensContext.Provider value={tokensState}>
      {children}
    </TokensContext.Provider>
  );
};

// Consumer hook
export const useTokens = (): TokensState => {
  const context = useContext(TokensContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokensProvider');
  }
  return context;
};
