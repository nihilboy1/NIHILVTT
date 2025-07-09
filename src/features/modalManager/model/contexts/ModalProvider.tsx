import React, { createContext, useContext, type ReactNode } from "react";
import {
  useModalStateManagement,
  UseModalStateManagementReturn,
} from "../hooks/useModalStateManagement";

// Criar o contexto
const ModalContext = createContext<UseModalStateManagementReturn | undefined>(
  undefined
);

// Componente Provedor do Contexto
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const modalStateManagement = useModalStateManagement();

  return (
    <ModalContext.Provider value={modalStateManagement}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook personalizado para consumir o contexto
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
