import React, { useRef } from 'react';

import ReactDOM from 'react-dom';

import { useDismissable } from '../lib/hooks/useDismissable';

import { XMarkIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  hideFooter?: boolean;
  zIndex?: number;
  modalClassName?: string;
  fullscreen?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  fullscreen = false,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  hideFooter = false,
  zIndex,
  modalClassName = '',
}: ModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useDismissable(modalContentRef, isOpen, onClose);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center ${fullscreen ? 'p-0' : 'p-4'}`}
      style={{ zIndex: zIndex ? zIndex - 1 : 99 }} // Overlay zIndex, slightly lower than modal content
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={-1}
    >
      <div
        ref={modalContentRef}
        className={`bg-surface-1 w-full ${
          fullscreen
            ? 'm-0 flex h-full max-h-screen max-w-full flex-col rounded-none'
            : 'max-w-md rounded-lg'
        } p-6 shadow-xl ${modalClassName}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{ zIndex: zIndex || 100 }} // Modal content zIndex
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="modal-title" className="text-2xl font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="bg-surface-2 focus:ring-feedback-negative hover:bg-feedback-negative cursor-pointer rounded-full p-1 focus:ring-2 focus:outline-none"
            aria-label="Fechar modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className={`${fullscreen ? 'flex-1 overflow-auto' : ''}`}>
          {children} {/* Conteúdo do modal injetado aqui */}
        </div>
        {!hideFooter && (
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="text-surface-0 bg-surface-2 border-surface-0 focus:ring-offset-surface-1 focus:ring-accent-primary hover:border-feedback-negative-hover hover:text-text-primary hover:bg-feedback-negative-hover cursor-pointer rounded-md border px-4 py-2 font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {cancelText}
            </button>
            {onConfirm && (
              <button
                onClick={onConfirm}
                className="text-surface-0 bg-accent-secondary border-surface-0 focus:ring-offset-surface-1 focus:ring-accent-primary hover:border-accent-primary-hover hover:text-text-primary hover:bg-accent-primary-hover cursor-pointer rounded-md border px-4 py-2 font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
