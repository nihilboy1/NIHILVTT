import { Modal } from "../ui/Modal";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  isOpen,
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      onConfirm={onConfirm}
      confirmText={confirmText}
      cancelText={cancelText}
    >
      <div className="p-4">
        <p>{content}</p>
      </div>
    </Modal>
  );
}
