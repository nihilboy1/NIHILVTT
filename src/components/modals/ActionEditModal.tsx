import React, { useState, useEffect } from "react";
import { usePlayerSheet } from "../../contexts/PlayerSheetContext";
import { type Action } from "../../types";
import { Modal } from "../ui/Modal";
import { useModal } from "../../contexts/ModalContext";
interface ActionEditModalProps {
  isOpen: boolean;
  actionId: string; // Alterado para receber apenas o ID da ação
  onClose: () => void;
  zIndex?: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function ActionEditModal({
  isOpen,
  actionId, // Receber actionId
  onClose,
  zIndex, // Receber zIndex
}: ActionEditModalProps) {
  const { actions, handleActionChange, handleRemoveAction } = usePlayerSheet();
  const { openModal, closeModal } = useModal();

  console.log("ActionEditModal: Renderizando com actionId:", actionId);

  // Encontrar a ação mais recente do contexto com base no actionId
  const currentAction = actions.find((a) => a.id === actionId);
  console.log("ActionEditModal: currentAction do contexto:", currentAction);

  // Estado local para a ação editada, inicializado com a ação encontrada ou um fallback
  const [editedAction, setEditedAction] = useState<Action>(
    currentAction || { id: actionId, name: "", bonus: "", damage: "" }
  );
  console.log("ActionEditModal: Estado inicial editedAction:", editedAction);

  // Sincronizar o estado local com a ação do contexto sempre que ela mudar
  useEffect(() => {
    console.log("ActionEditModal: useEffect - currentAction mudou:", currentAction);
    if (currentAction) {
      setEditedAction(currentAction);
    }
  }, [currentAction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("ActionEditModal: handleSave chamado. editedAction:", editedAction);
    // Certifique-se de que editedAction.id não é undefined antes de salvar
    if (editedAction.id) {
      console.log("ActionEditModal: Salvando ação com ID:", editedAction.id, "Nome:", editedAction.name, "Bônus:", editedAction.bonus, "Dano:", editedAction.damage);
      handleActionChange(editedAction.id, "name", editedAction.name);
      handleActionChange(editedAction.id, "bonus", editedAction.bonus || "");
      handleActionChange(editedAction.id, "damage", editedAction.damage || "");
      onClose();
    } else {
      console.error("ActionEditModal: Erro: ID da ação não encontrado ao tentar salvar.", editedAction);
    }
  };

  const handleDelete = () => {
    openModal("confirmationModal", {
      title: "Confirmar Exclusão",
      content: "Você tem certeza que deseja remover esta ação?",
      onConfirm: () => {
        console.log("ActionEditModal: Confirmando exclusão da ação com ID:", actionId);
        handleRemoveAction(actionId); // Usar actionId
        closeModal(); // Fecha o confirmationModal
        closeModal(); // Fecha o ActionEditModal
        // Não chame onClose aqui, pois closeModal já manipula a pilha de modais
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Ação"
      onConfirm={handleSave}
      confirmText="Salvar"
      cancelText="Cancelar"
      zIndex={zIndex} // Passar zIndex para o Modal
    >
      <div className="p-4">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-primary"
          >
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedAction.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-surface-1 border-surface-2 shadow-sm focus:border-accent-primary focus:ring focus:ring-accent-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="bonus"
            className="block text-sm font-medium text-text-primary"
          >
            Bônus
          </label>
          <input
            type="text"
            id="bonus"
            name="bonus"
            value={editedAction.bonus}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-surface-1 border-surface-2 shadow-sm focus:border-accent-primary focus:ring focus:ring-accent-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="damage"
            className="block text-sm font-medium text-text-primary"
          >
            Dano
          </label>
          <input
            type="text"
            id="damage"
            name="damage"
            value={editedAction.damage}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-surface-1 border-surface-2 shadow-sm focus:border-accent-primary focus:ring focus:ring-accent-primary focus:ring-opacity-50"
          />
        </div>
        <div className="flex justify-start mt-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-feedback-negative text-text-primary rounded-md hover:bg-feedback-negative-hover"
          >
            Deletar
          </button>
        </div>
      </div>
    </Modal>
  );
}
