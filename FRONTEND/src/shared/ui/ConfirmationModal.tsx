import { Modal } from './Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  zIndex?: number;
}

export function ConfirmationModal({
  isOpen,
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  zIndex,
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      onConfirm={onConfirm}
      confirmText={confirmText}
      cancelText={cancelText}
      zIndex={zIndex}
    >
      <div className="p-4">
        <p>{content}</p>
      </div>
    </Modal>
  );
}
