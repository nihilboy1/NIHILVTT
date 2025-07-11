import React, { ReactNode, useEffect, useRef } from "react";
import { XMarkIcon } from "./Icons";

interface InteractiveModalProps {
  id: string;
  title: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  zIndex?: number; // Adicionado zIndex
}

export function InteractiveModal({
  id,
  title,
  isOpen,
  onClose,
  children,
  zIndex = 50, // Default zIndex
}: InteractiveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Efeito para fechar o modal com a tecla Esc
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: zIndex, // Usar o zIndex do prop
      }}
      className={`bg-surface-0 rounded-lg shadow-xl flex flex-col overflow-hidden `}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${id}`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-3 border-b`}
      >
        <h2
          id={`modal-title-${id}`}
          className="text-lg font-semibold truncate"
        >
          {title}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="p-1 rounded-full focus:outline-none focus:ring-1"
            aria-label="Fechar modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 overflow-hidden flex-grow">{children}</div>
    </div>
  );
}
