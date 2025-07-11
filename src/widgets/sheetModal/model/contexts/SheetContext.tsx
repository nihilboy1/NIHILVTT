// src/widgets/sheetModal/model/contexts/SheetContext.tsx

import React, { createContext, useContext, type ReactNode } from "react";
// 1. Importações necessárias do RHF e do seu schema
import { type UseFormReturn } from "react-hook-form";
import { type CharacterSchema } from '@/entities/character/model/schemas/character.schema';

import { useCharacterSheetForm, type UseCharacterSheetFormProps } from "../../../../entities/character/model/hooks/useCharacterSheetForm";

// 2. Definimos um novo tipo para o valor do nosso contexto.
// Ele representa o que o `useCharacterSheetForm` AGORA retorna.
type CharacterSheetFormContextType = {
  form: UseFormReturn<CharacterSchema>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

// 3. Criamos o contexto com o novo tipo.
const SheetContext = createContext<CharacterSheetFormContextType | undefined>(
  undefined
);

// Componente Provedor do Contexto
interface SheetProviderProps {
  children: ReactNode;
  initialCharacterData: UseCharacterSheetFormProps["initialCharacterData"];
  onSave: UseCharacterSheetFormProps["onSave"];
}

export const SheetProvider: React.FC<SheetProviderProps> = ({
  children,
  initialCharacterData,
  onSave,
}) => {
  // O nome 'formMethods' é mais descritivo do que 'sheetFormState' agora.
  const formMethods = useCharacterSheetForm({
    initialCharacterData,
    onSave,
  });

  return (
    <SheetContext.Provider value={formMethods}>
      {children}
    </SheetContext.Provider>
  );
};

// 4. O hook para consumir o contexto agora retorna o novo tipo.
export const useSheet = (): CharacterSheetFormContextType => {
  const context = useContext(SheetContext);
  if (context === undefined) {
    throw new Error("useSheet must be used within a SheetProvider");
  }
  return context;
};