import React, { useEffect, useRef } from 'react';

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
  cancelButtonClassName?: string;
  confirmButtonClassName?: string;
  confirmDisabled?: boolean;
  overlayClassName?: string;
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
  cancelButtonClassName,
  confirmButtonClassName,
  confirmDisabled = false,
  overlayClassName,
}: ModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useDismissable(modalContentRef, isOpen, onClose);

  useEffect(() => {
    if (!isOpen) {
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
        previouslyFocusedElementRef.current = null;
      }
      return;
    }

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

    const modalNode = modalContentRef.current;
    if (!modalNode) {
      return;
    }

    const focusableElements = modalNode.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    const firstFocusable = focusableElements[0];
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      modalNode.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') {
      return;
    }

    const modalNode = modalContentRef.current;
    if (!modalNode) {
      return;
    }

    const focusableElements = Array.from(
      modalNode.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

    if (focusableElements.length === 0) {
      e.preventDefault();
      modalNode.focus();
      return;
    }

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement | null;

    if (e.shiftKey) {
      if (activeElement === firstFocusable || !modalNode.contains(activeElement)) {
        e.preventDefault();
        lastFocusable.focus();
      }
      return;
    }

    if (activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center ${fullscreen ? 'p-0' : 'p-4'} ${overlayClassName || 'bg-black/50'}`}
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
        tabIndex={-1}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="modal-title" className="text-2xl font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="bg-surface-2 focus:ring-feedback-negative hover:bg-feedback-negative cursor-pointer rounded-full p-1 focus:ring-2 focus:outline-none"
            aria-label="Fechar modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className={`${fullscreen ? 'flex-1 overflow-auto hide-scrollbar' : ''}`}>
          {children} {/* Conteúdo do modal injetado aqui */}
        </div>
        {!hideFooter && (
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className={
                cancelButtonClassName ||
                'text-surface-0 bg-surface-2 border-surface-0 focus:ring-offset-surface-1 focus:ring-accent-primary hover:border-feedback-negative-hover hover:text-text-primary hover:bg-feedback-negative-hover cursor-pointer rounded-md border px-4 py-2 font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none'
              }
            >
              {cancelText}
            </button>
            {onConfirm && (
              <button
                onClick={onConfirm}
                disabled={confirmDisabled}
                className={
                  confirmButtonClassName ||
                  'text-surface-0 bg-accent-secondary border-surface-0 focus:ring-offset-surface-1 focus:ring-accent-primary hover:border-accent-primary-hover hover:text-text-primary hover:bg-accent-primary-hover cursor-pointer rounded-md border px-4 py-2 font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60'
                }
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
