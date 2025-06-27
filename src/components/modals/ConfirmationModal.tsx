import { Modal } from "../ui/Modal";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  zIndex?: number; // Adicionado zIndex
  containerRef?: React.RefObject<HTMLDivElement | null>; // Adicionado containerRef
}

export function ConfirmationModal({
  isOpen,
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  zIndex, // Receber zIndex
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      onConfirm={onConfirm}
      confirmText={confirmText}
      cancelText={cancelText}
      zIndex={zIndex} // Passar zIndex para o Modal base
    >
      <div className="p-4">
        <p>{content}</p>
      </div>
    </Modal>
  );
}
