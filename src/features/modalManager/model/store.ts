import { create } from 'zustand';

export interface ModalEntry {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
  dismissible?: boolean;
}

export interface ModalState {
  modalStack: ModalEntry[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModal: (modalName: string, props?: Record<string, any>, dismissible?: boolean) => void;
  closeModal: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateModalProps: (partialProps: Record<string, any>) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalStack: [],

  openModal: (modalName, props = {}, dismissible = true) => {
    set(prevState => {
      if (modalName === 'sheet') {
        const isSheetAlreadyOpen = prevState.modalStack.some(
          (modal) => modal.name === 'sheet'
        );
        if (isSheetAlreadyOpen) {
          return prevState;
        }
      }

      const newModalEntry: ModalEntry = {
        id: `${modalName}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: modalName,
        props,
        dismissible,
      };

      const newModalStack = [...prevState.modalStack, newModalEntry];
      return {
        modalStack: newModalStack,
      };
    });
  },

  closeModal: () => {
    set(prevState => ({
      modalStack: prevState.modalStack.slice(0, -1),
    }));
  },

  updateModalProps: (partialProps) => {
    set(prevState => {
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
  },
}));
