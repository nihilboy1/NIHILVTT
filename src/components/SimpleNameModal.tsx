import React, { useState, useEffect, useRef } from "react";
import { XMarkIcon } from "./icons";
import { TokenType } from "../types"; // Importar TokenType

interface SimpleNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, tokenType?: TokenType) => void; // Adicionado tokenType
  title: string;
  currentName?: string;
  tokenType?: TokenType; // Adicionado tokenType como prop
}

export function SimpleNameModal({
  isOpen,
  onClose,
  onSave,
  title,
  currentName = "",
  tokenType,
}: SimpleNameModalProps) {
  const [name, setName] = useState(currentName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(currentName);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, currentName]);

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

  const handleSaveClick = () => {
    if (name.trim()) {
      onSave(name.trim(), tokenType); // Passa o tokenType recebido como prop
    } else {
      inputRef.current?.focus();
    }
  };

  if (!isOpen) return null;

  const labelClass = "block text-sm font-medium text-theme-accent-primary mb-1";
  const inputClass =
    "w-full p-2 bg-theme-input-bg border border-theme-border-inactive rounded-md focus:ring-1 focus:ring-theme-border-active focus:border-theme-border-active text-theme-foreground placeholder-theme-text-secondary";
  const buttonPositiveClass =
    "px-4 py-2 bg-theme-accent-positive hover:bg-theme-accent-positive-hover text-theme-accent-positive-text font-semibold rounded-md transition-colors";
  const buttonSecondaryClass =
    "px-4 py-2 bg-theme-accent-secondary hover:bg-theme-accent-secondary-hover text-theme-accent-secondary-text font-semibold rounded-md transition-colors";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60] p-4"
      onClick={onClose} // Fecha ao clicar no overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="simple-modal-title"
    >
      <div
        className="bg-theme-toolbar-bg p-5 rounded-lg shadow-xl max-w-sm w-full text-theme-foreground"
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal feche-o
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            id="simple-modal-title"
            className="text-xl font-semibold text-theme-foreground"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-theme-text-secondary hover:text-theme-accent-primary p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-theme-border-active"
            aria-label="Fechar"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
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
              maxLength={35}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={buttonSecondaryClass}
            >
              Cancelar
            </button>
            <button type="submit" className={buttonPositiveClass}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
