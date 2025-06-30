import { useCharacterSheetForm, UseCharacterSheetFormProps, UseCharacterSheetFormReturn } from "../../../../entities/character/model/hooks/useCharacterSheetForm";
import React, { createContext, useContext, type ReactNode } from "react";


// Criar o contexto
const SheetContext = createContext<UseCharacterSheetFormReturn | undefined>(
  undefined
);

// Componente Provedor do Contexto
interface SheetProviderProps {
  children: ReactNode;
  initialCharacterData: UseCharacterSheetFormProps["initialCharacterData"]; // Usar o tipo de props do hook
  onSave: UseCharacterSheetFormProps["onSave"]; // Usar o tipo de props do hook
}

export const SheetProvider: React.FC<SheetProviderProps> = ({
  children,
  initialCharacterData,
  onSave,
}) => {
  const sheetFormState = useCharacterSheetForm({
    initialCharacterData,
    onSave,
  });

  return (
    <SheetContext.Provider value={sheetFormState}>
      {children}
    </SheetContext.Provider>
  );
};

// Hook personalizado para consumir o contexto
export const useSheet = (): UseCharacterSheetFormReturn => {
  const context = useContext(SheetContext);
  if (context === undefined) {
    throw new Error("useSheet must be used within a SheetProvider");
  }
  return context;
};
