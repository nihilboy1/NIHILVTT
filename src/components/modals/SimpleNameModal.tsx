import React, { useState, useEffect, useRef } from "react";
import Modal from "../ui/Modal"; // Usar o componente Modal base
import { TokenType } from "../../types/index"; // Importar TokenType
import { labelClass, inputClass } from "../../styles/formClasses"; // Importar classes de formulário

interface SimpleNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, tokenType?: TokenType) => void; // Adicionado tokenType
  title: string;
  currentName?: string;
  tokenType?: TokenType; // Adicionado tokenType como prop
}

const SimpleNameModal: React.FC<SimpleNameModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  currentName = "",
  tokenType, // Receber tokenType
}) => {
  const [name, setName] = useState(currentName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(currentName);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, currentName]);

  const handleSaveClick = () => {
    if (name.trim()) {
      onSave(name.trim(), tokenType); // Passa o tokenType recebido como prop
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      onConfirm={handleSaveClick} // Passa a função de salvar para o modal base
      confirmText="Salvar" // Define o texto do botão de confirmação
    >
      <div>
        {" "}
        {/* Envolver o conteúdo com a ref */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveClick();
          }}
        >
          <div className="mb-4">
            <label htmlFor="simpleModalNameInput" className={labelClass}>
              Nome do Personagem
            </label>
            <input
              ref={inputRef}
              id="simpleModalNameInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
              minLength={1}
              placeholder="Digite o nome"
              maxLength={35} /* Adicionado maxLength */
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SimpleNameModal;
