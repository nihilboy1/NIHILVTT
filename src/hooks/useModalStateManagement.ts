import { useState, useCallback } from 'react';

export interface ModalState {
  activeModal: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalProps: Record<string, any>;
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
    activeModal: null,
    modalProps: {},
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openModal = useCallback((modalName: string, props: Record<string, any> = {}) => {
    setModalState({ activeModal: modalName, modalProps: props });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ activeModal: null, modalProps: {} });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateModalProps = useCallback((partialProps: Record<string, any>) => {
    setModalState(prevState => ({
      ...prevState,
      modalProps: { ...prevState.modalProps, ...partialProps },
    }));
  }, []);

  return {
    ...modalState,
    openModal,
    closeModal,
    updateModalProps,
  };
};
