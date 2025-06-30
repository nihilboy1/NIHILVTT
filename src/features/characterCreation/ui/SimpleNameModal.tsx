import { CharacterType } from "@/shared/api/types";
import { Modal } from "../../../shared/ui/Modal";
import { useEffect, useRef, useState } from "react";

interface SimpleNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, characterType?: CharacterType) => void; // Adicionado characterType
  title: string;
  currentName?: string;
  characterType?: CharacterType; // Adicionado characterType como prop
  zIndex?: number; // Adicionado zIndex
}

export function SimpleNameModal({
  isOpen,
  onClose,
  onSave,
  title,
  currentName = "",
  characterType, // Receber characterType
  zIndex, // Receber zIndex
}: SimpleNameModalProps) {
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
      onSave(name.trim(), characterType); // Passa o characterType recebido como prop
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
      zIndex={zIndex} // Passar zIndex para o Modal base
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
            <label
              htmlFor="simpleModalNameInput"
              className="block text-sm font-medium text-accent-primary mb-1"
            >
              Nome do Personagem
            </label>
            <input
              ref={inputRef}
              id="simpleModalNameInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
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
}

//visto
