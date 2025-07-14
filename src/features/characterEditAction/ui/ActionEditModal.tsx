import React from 'react';
import { InteractiveModal } from '../../../shared/ui/InteractiveModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { actionSchema } from '../../../entities/character/model/schemas/character.schema';

type ActionFormInputs = z.infer<typeof actionSchema>;

interface ActionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionId: string;
  zIndex?: number;
  initialData?: ActionFormInputs;
}

export const ActionEditModal: React.FC<ActionEditModalProps> = ({
  isOpen,
  onClose,
  actionId,
  zIndex,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActionFormInputs>({
    resolver: zodResolver(actionSchema),
    defaultValues: initialData || { id: actionId, name: '', bonus: '', damage: '' },
  });

  const onSubmit = (data: ActionFormInputs) => {
    console.log("Form submitted:", data);
    // Here you would typically save the data, e.g., to a backend or global state
    onClose();
  };

  return (
    <InteractiveModal
      id={`action-edit-${actionId}`}
      title={`Editar Ação: ${actionId}`}
      isOpen={isOpen}
      onClose={onClose}
      zIndex={zIndex}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 bg-gray-800 text-white rounded-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome da Ação</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="bonus" className="block text-sm font-medium text-gray-300">Bônus (opcional)</label>
          <input
            type="text"
            id="bonus"
            {...register("bonus")}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.bonus && <p className="mt-1 text-sm text-red-400">{errors.bonus.message}</p>}
        </div>

        <div>
          <label htmlFor="damage" className="block text-sm font-medium text-gray-300">Dano (opcional)</label>
          <input
            type="text"
            id="damage"
            {...register("damage")}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.damage && <p className="mt-1 text-sm text-red-400">{errors.damage.message}</p>}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Salvar Ação
          </button>
        </div>
      </form>
    </InteractiveModal>
  );
};
