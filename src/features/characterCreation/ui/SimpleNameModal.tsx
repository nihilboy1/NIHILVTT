import { CharacterType } from "@/shared/api/types";
import { Modal } from "../../../shared/ui/Modal";
import { useEffect, useRef, useState } from "react";
import { useCharacterCreation } from "../model/hooks/useCharacterCreation";
import { useModal } from "@/features/modalManager/model/contexts/ModalProvider";

// Apenas UMA definição da interface, a correta.
interface SimpleNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentName?: string;
  zIndex?: number;
}

export function SimpleNameModal({
  isOpen,
  onClose,
  title,
  currentName = "",
  zIndex,
}: SimpleNameModalProps) {
  const [name, setName] = useState(currentName);
  const inputRef = useRef<HTMLInputElement>(null);

  const { modalStack } = useModal();
  const { handleCreateCharacter } = useCharacterCreation();

  // Extrai a prop do topo da pilha de modais.
  // Esta é agora a única fonte para characterType.
  const topModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const characterType = topModal?.props?.characterType as CharacterType | undefined;

  useEffect(() => {
    if (isOpen) {
      setName(currentName);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, currentName]);

  const handleSaveClick = () => {
    if (name.trim()) {
      if (characterType) {
        handleCreateCharacter(name.trim(), characterType);
      } else {
        console.error(
          "CharacterType is undefined when trying to create character."
        );
      }
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      onConfirm={handleSaveClick}
      confirmText="Salvar"
      zIndex={zIndex}
    >
      <div>
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
              maxLength={35}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}