import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface SelectedTokenContextType {
  selectedTokenId: string | null;
  setSelectedTokenId: (tokenId: string | null) => void;
}

const SelectedTokenContext = createContext<SelectedTokenContextType | undefined>(undefined);

export const SelectedTokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedTokenId, setSelectedTokenIdState] = useState<string | null>(null);

  const setSelectedTokenId = useCallback((tokenId: string | null) => {
    setSelectedTokenIdState(tokenId);
  }, []);

  return (
    <SelectedTokenContext.Provider value={{ selectedTokenId, setSelectedTokenId }}>
      {children}
    </SelectedTokenContext.Provider>
  );
};

export const useSelectedToken = () => {
  const context = useContext(SelectedTokenContext);
  if (context === undefined) {
    throw new Error('useSelectedToken must be used within a SelectedTokenProvider');
  }
  return context;
};
