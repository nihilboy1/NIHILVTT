import { useState, useCallback } from 'react';

export interface ModalEntry {
  id: string; // Adicionar ID única para cada entrada de modal
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
}

export interface ModalState {
  modalStack: ModalEntry[];
}

export interface UseModalStateManagementReturn extends ModalState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModal: (modalName: string, props?: Record<string, any>) => void;
  closeModal: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateModalProps: (partialProps: Record<string, any>) => void;
}

export const useModalStateManagement = (): UseModalStateManagementReturn => {
  const [modalState, setModalState] = useState<ModalState>({
    modalStack: [],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openModal = useCallback((modalName: string, props: Record<string, any> = {}) => {
    setModalState(prevState => {

      // se um modal de ficha já estiver aberto, não abra outro.
      if (modalName === 'sheet') {
        const isSheetAlreadyOpen = prevState.modalStack.some(
          (modal) => modal.name === 'sheet'
        );
        if (isSheetAlreadyOpen) {
          return prevState; // não faz nada se a ficha já estiver aberta
        }
      }

      const newModalEntry: ModalEntry = {
        id: `${modalName}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Gerar ID única
        name: modalName,
        props,
      };

      const newModalStack = [...prevState.modalStack, newModalEntry];
      return {
        modalStack: newModalStack,
      };
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prevState => ({
      modalStack: prevState.modalStack.slice(0, -1), // Remove o último modal da pilha
    }));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateModalProps = useCallback((partialProps: Record<string, any>) => {
    setModalState(prevState => {
      const newModalStack = [...prevState.modalStack];
      if (newModalStack.length > 0) {
        const topModalIndex = newModalStack.length - 1;
        newModalStack[topModalIndex] = {
          ...newModalStack[topModalIndex],
          props: { ...newModalStack[topModalIndex].props, ...partialProps },
        };
      }
      return { modalStack: newModalStack };
    });
  }, []);

  return {
    ...modalState,
    openModal,
    closeModal,
    updateModalProps,
  };
};
