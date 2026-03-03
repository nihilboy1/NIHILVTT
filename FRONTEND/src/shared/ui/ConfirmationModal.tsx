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
  destructive?: boolean;
  confirmDisabled?: boolean;
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
  destructive = false,
  confirmDisabled = false,
}: ConfirmationModalProps) {
  const cancelClassName = destructive
    ? 'text-surface-0 bg-surface-2 border-surface-0 focus:ring-offset-surface-1 focus:ring-accent-primary hover:border-surface-0 hover:text-text-primary hover:bg-surface-3 cursor-pointer rounded-md border px-4 py-2 font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none'
    : 'text-surface-0 bg-surface-2 border-surface-0 focus:ring-offset-surface-1 focus:ring-accent-primary hover:border-text-primary hover:text-text-primary hover:bg-surface-3 cursor-pointer rounded-md border px-4 py-2 font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none';

  const confirmClassName = destructive
    ? 'text-text-primary bg-feedback-negative border-surface-0 focus:ring-offset-surface-1 focus:ring-feedback-negative hover:border-feedback-negative-hover hover:bg-feedback-negative-hover cursor-pointer rounded-md border px-4 py-2 font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60'
    : undefined;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      onConfirm={onConfirm}
      confirmText={confirmText}
      cancelText={cancelText}
      zIndex={zIndex}
      cancelButtonClassName={cancelClassName}
      confirmButtonClassName={confirmClassName}
      confirmDisabled={confirmDisabled}
    >
      <div className="p-4">
        <p>{content}</p>
      </div>
    </Modal>
  );
}
