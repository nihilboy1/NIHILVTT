import React, { useEffect } from "react";
import { XMarkIcon } from "../icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void; // Função para o botão de confirmação
  confirmText?: string; // Texto do botão de confirmação
  cancelText?: string; // Texto do botão de cancelar
  hideFooter?: boolean; // Oculta o rodapé com os botões
  zIndex?: number; // Adicionado zIndex
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirmar", // Texto padrão para o botão de confirmação
  cancelText = "Cancelar", // Texto padrão para o botão de cancelar
  hideFooter = false, // Por padrão, o rodapé é visível
  zIndex, // Receber zIndex
}: ModalProps) {
  useEffect(() => {
    // Manipulador para fechar o modal com a tecla 'Escape'
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    // Limpa o event listener quando o componente é desmontado ou antes de re-executar o efeito
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Não renderiza nada se o modal não estiver aberto

  return (
    <div
      className="fixed inset-0 bg-overlay flex items-center justify-center p-4" // Overlay de fundo
      onClick={onClose} // Fecha o modal ao clicar fora da área de conteúdo
      role="dialog" // Semântica para acessibilidade
      aria-modal="true" // Indica que o conteúdo fora do modal está inerte
      aria-labelledby="modal-title" // Associa o título ao modal para acessibilidade
      style={{ zIndex: zIndex }} // Aplicar zIndex
    >
      <div
        className="bg-surface-0 p-6 rounded-lg shadow-xl max-w-md w-full" // Container do conteúdo do modal
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal feche-o
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-2xl font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="bg-surface-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-feedback-negative cursor-pointer hover:bg-feedback-negative"
            aria-label="Fechar modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        {children} {/* Conteúdo do modal injetado aqui */}
        {!hideFooter && (
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="text-surface-0 cursor-pointer bg-surface-2 border border-surface-0 px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-1 focus:ring-accent-primary hover:border-feedback-negative-hover hover:text-text-primary hover:bg-feedback-negative-hover"
            >
              {cancelText}
            </button>
            {onConfirm && ( // Renderiza o botão de confirmação apenas se onConfirm for fornecido
              <button
                onClick={onConfirm}
                className="text-surface-0 cursor-pointer bg-accent-secondary border border-surface-0 px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-1 focus:ring-accent-primary hover:border-accent-primary-hover hover:text-text-primary hover:bg-accent-primary-hover"
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
