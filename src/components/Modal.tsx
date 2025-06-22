import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
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
      className="fixed inset-0 bg-surface-1 bg-opacity-75 flex items-center justify-center z-50 p-4" // Overlay de fundo
      onClick={onClose} // Fecha o modal ao clicar fora da área de conteúdo
      role="dialog" // Semântica para acessibilidade
      aria-modal="true" // Indica que o conteúdo fora do modal está inerte
      aria-labelledby="modal-title" // Associa o título ao modal para acessibilidade
    >
      <div
        className="bg-surface-1 p-6 rounded-lg shadow-xl max-w-md w-full " // Container do conteúdo do modal
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal feche-o
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-2xl font-semibold">
            {title}
          </h2>
        </div>
        {children} {/* Conteúdo do modal injetado aqui */}
      </div>
    </div>
  );
};

export default Modal;
