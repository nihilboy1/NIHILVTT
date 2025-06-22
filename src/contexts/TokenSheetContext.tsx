import React, { createContext, useContext, type ReactNode } from 'react';
import { useTokenSheetForm, type UseTokenSheetFormReturn, type UseTokenSheetFormProps } from '../hooks/useTokenSheetForm'; // Importar o tipo de retorno e props do hook

// Criar o contexto
const TokenSheetContext = createContext<UseTokenSheetFormReturn | undefined>(undefined);

// Componente Provedor do Contexto
interface TokenSheetProviderProps {
  children: ReactNode;
  initialTokenData: UseTokenSheetFormProps['initialTokenData']; // Usar o tipo de props do hook
  onSave: UseTokenSheetFormProps['onSave']; // Usar o tipo de props do hook
}

export const TokenSheetProvider: React.FC<TokenSheetProviderProps> = ({ children, initialTokenData, onSave }) => {
  const tokenSheetFormState = useTokenSheetForm({ initialTokenData, onSave });

  return (
    <TokenSheetContext.Provider value={tokenSheetFormState}>
      {children}
    </TokenSheetContext.Provider>
  );
};

// Hook personalizado para consumir o contexto
export const useTokenSheet = (): UseTokenSheetFormReturn => {
  const context = useContext(TokenSheetContext);
  if (context === undefined) {
    throw new Error('useTokenSheet must be used within a TokenSheetProvider');
  }
  return context;
};
