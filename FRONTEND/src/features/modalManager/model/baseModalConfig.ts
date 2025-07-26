export interface ModalEntry {
  id: string;
  name: string;
  props: Record<string, unknown>;
  dismissible?: boolean;
}

export interface ModalState {
  modalStack: ModalEntry[];
  openModal: (
    modalName: string,
    props?: Record<string, unknown>,
    dismissible?: boolean
  ) => void;
  closeModal: () => void;
    updateModalProps: (partialProps: Record<string, unknown>) => void;
}
