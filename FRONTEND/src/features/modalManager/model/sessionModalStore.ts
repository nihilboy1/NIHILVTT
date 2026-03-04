import { uuidv4 } from "zod";
import { create } from "zustand";

import { ModalEntry, ModalState } from "./baseModalConfig";

export const useSessionModalStore = create<ModalState>((set) => ({
  modalStack: [],

  openModal: (modalName, props = {}, dismissible = true) => {
    set((prevState) => {
      if (modalName === "sheet") {
        const existingSheetIndex = prevState.modalStack.findIndex(
          (modal) => modal.name === "sheet"
        );
        if (existingSheetIndex >= 0) {
          const nextModalStack = [...prevState.modalStack];
          nextModalStack[existingSheetIndex] = {
            ...nextModalStack[existingSheetIndex],
            props,
            dismissible,
          };

          return {
            modalStack: nextModalStack,
          };
        }
      }

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

  closeModalByName: (modalName) => {
    set((prevState) => {
      const targetIndex = [...prevState.modalStack]
        .map((modal) => modal.name)
        .lastIndexOf(modalName);

      if (targetIndex === -1) {
        return prevState;
      }

      return {
        modalStack: prevState.modalStack.filter((_, index) => index !== targetIndex),
      };
    });
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
