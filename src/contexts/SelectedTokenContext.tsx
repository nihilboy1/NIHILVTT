import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface SelectedTokenContextType {
  selectedInstanceId: string | null;
  setSelectedInstanceId: (instanceId: string | null) => void;
}

const SelectedTokenContext = createContext<SelectedTokenContextType | undefined>(undefined);

export const SelectedTokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedInstanceId, setSelectedInstanceIdState] = useState<string | null>(null);

  const setSelectedInstanceId = useCallback((instanceId: string | null) => {
    setSelectedInstanceIdState(instanceId);
  }, []);

  return (
    <SelectedTokenContext.Provider value={{ selectedInstanceId, setSelectedInstanceId }}>
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
