import React, { useEffect, useState } from "react";
import { usePlayerSheet } from "../../../entities/character/model/contexts/CharacterSheetContext"; // Renomeado
import { type Action } from "../../../shared/api/types";
import { Modal } from "../../../shared/ui/Modal";
import { useModal } from "@/features/modalManager/model/contexts/ModalProvider";
interface ActionEditModalProps {
  isOpen: boolean;
  actionId: string;
  onClose: () => void;
  zIndex?: number;
}

export function ActionEditModal({
  isOpen,
  actionId,
  onClose,
  zIndex,
}: ActionEditModalProps) {
  const { actions, handleActionChange, handleRemoveAction } = usePlayerSheet();
  const { openModal, closeModal } = useModal();

  // Encontrar a ação mais recente do contexto com base no actionId
  const currentAction = actions.find((a: Action) => a.id === actionId); // Adicionado tipagem para 'a'

  // Estado local para a ação editada, inicializado com a ação encontrada ou um fallback
  const [editedAction, setEditedAction] = useState<Action>(
    currentAction || { id: actionId, name: "", bonus: "", damage: "" }
  );

  // Sincronizar o estado local com a ação do contexto sempre que ela mudar
  useEffect(() => {
    if (currentAction) {
      setEditedAction(currentAction);
    }
  }, [currentAction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Certifique-se de que editedAction.id não é undefined antes de salvar
    if (editedAction.id) {
      handleActionChange(editedAction.id, "name", editedAction.name);
      handleActionChange(editedAction.id, "bonus", String(editedAction.bonus || ""));
      handleActionChange(editedAction.id, "damage", String(editedAction.damage || ""));
      onClose();
    } else {
      console.error(
        "ActionEditModal: Erro: ID da ação não encontrado ao tentar salvar.",
        editedAction
      );
    }
  };

  const handleDelete = () => {
    openModal("confirmationModal", {
      title: "Confirmar Exclusão",
      content: "Você tem certeza que deseja remover esta ação?",
      onConfirm: () => {
        handleRemoveAction(actionId);
        closeModal(); // Fecha o confirmationModal
        closeModal(); // Fecha o ActionEditModal
      },
      onCancel: () => {
        closeModal(); // Fecha apenas o confirmationModal
      },
    }, true); // ConfirmationModal é dismissible
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
      zIndex={zIndex}
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
