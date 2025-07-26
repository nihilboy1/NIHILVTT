import { uuidv4 } from "zod";
import { create } from "zustand";

import { ModalEntry, ModalState } from "./baseModalConfig";

export const useAuthModalStore = create<ModalState>((set) => ({
  modalStack: [],

  openModal: (modalName, props = {}, dismissible = true) => {
    set((prevState) => {
      const newModalEntry: ModalEntry = {
        id: `${modalName}-${uuidv4()}`,
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
    set((prevState) => ({
      modalStack: prevState.modalStack.slice(0, -1),
    }));
  },

  updateModalProps: (partialProps) => {
    set((prevState) => {
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
