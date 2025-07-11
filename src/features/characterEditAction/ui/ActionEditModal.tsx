
import { useFormContext, useFieldArray } from "react-hook-form";
import { Modal } from "../../../shared/ui/Modal";
import { useModal } from "@/features/modalManager/model/contexts/ModalProvider";
import { type PlayerCharacterSchema } from "@/entities/character/model/schemas/character.schema";

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
  // 1. Conectamos ao formulário principal e ao array de 'actions'
  const { control, register, watch } = useFormContext<PlayerCharacterSchema>();
  const { remove } = useFieldArray({
    control,
    name: "actions",
  });
  const { openModal, closeModal } = useModal();

  // 2. Encontramos o ÍNDICE da ação que estamos editando.
  //    O índice é crucial para o react-hook-form saber qual item do array atualizar.
  const actions = watch("actions");
  const actionIndex = actions.findIndex((a) => a.id === actionId);

  // 3. O estado local 'editedAction' foi COMPLETAMENTE REMOVIDO.
  //    Os inputs agora leem e escrevem diretamente no estado global do formulário.

  const handleSave = () => {
    // 4. Salvar é simples: apenas fechamos o modal.
    // O auto-save do `useCharacterSheetForm` já cuidará de persistir a mudança.
    onClose();
  };

  const handleDelete = () => {
    openModal(
      "confirmationModal",
      {
        title: "Confirmar Exclusão",
        content: "Você tem certeza que deseja remover esta ação?",
        onConfirm: () => {
          if (actionIndex > -1) {
            // 5. Usamos a função 'remove' do useFieldArray para deletar a ação.
            remove(actionIndex);
          }
          closeModal(); // Fecha o confirmationModal
          onClose(); // Fecha o ActionEditModal
        },
        onCancel: () => {
          closeModal();
        },
      },
      true
    );
  };

  // Se a ação não for encontrada (ex: foi removida em outra aba), não renderiza nada.
  if (!isOpen || actionIndex === -1) {
    return null;
  }

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
            htmlFor={`actions.${actionIndex}.name`}
            className="block text-sm font-medium text-text-primary"
          >
            Nome
          </label>
          <input
            type="text"
            id={`actions.${actionIndex}.name`}
            // 6. Registramos o campo DIRETAMENTE no formulário usando o índice.
            {...register(`actions.${actionIndex}.name`)}
            className="mt-1 block w-full rounded-md bg-surface-1 border-surface-2 shadow-sm focus:border-accent-primary focus:ring focus:ring-accent-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor={`actions.${actionIndex}.bonus`}
            className="block text-sm font-medium text-text-primary"
          >
            Bônus
          </label>
          <input
            type="text"
            id={`actions.${actionIndex}.bonus`}
            {...register(`actions.${actionIndex}.bonus`, { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md bg-surface-1 border-surface-2 shadow-sm focus:border-accent-primary focus:ring focus:ring-accent-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor={`actions.${actionIndex}.damage`}
            className="block text-sm font-medium text-text-primary"
          >
            Dano
          </label>
          <input
            type="text"
            id={`actions.${actionIndex}.damage`}
            {...register(`actions.${actionIndex}.damage`, { valueAsNumber: true })}
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
