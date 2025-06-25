import React, { createContext, useContext, type ReactNode } from 'react';
import { useTokenSheetForm, type UseTokenSheetFormReturn, type UseTokenSheetFormProps } from '../hooks/useTokenSheetForm'; // Importar o tipo de retorno e props do hook

// Criar o contexto
const SheetContext = createContext<UseTokenSheetFormReturn | undefined>(undefined);

// Componente Provedor do Contexto
interface SheetProviderProps {
  children: ReactNode;
  initialTokenData: UseTokenSheetFormProps['initialTokenData']; // Usar o tipo de props do hook
  onSave: UseTokenSheetFormProps['onSave']; // Usar o tipo de props do hook
}

export const SheetProvider: React.FC<SheetProviderProps> = ({ children, initialTokenData, onSave }) => {
  const sheetFormState = useTokenSheetForm({ initialTokenData, onSave });

  return (
    <SheetContext.Provider value={sheetFormState}>
      {children}
    </SheetContext.Provider>
  );
};

// Hook personalizado para consumir o contexto
export const useSheet = (): UseTokenSheetFormReturn => {
  const context = useContext(SheetContext);
  if (context === undefined) {
    throw new Error('useSheet must be used within a SheetProvider');
  }
  return context;
};
