import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { actionSchema } from '../../../entities/character/model/schemas/character.schema';
import { InteractiveModal } from '../../../shared/ui/InteractiveModal';

type ActionFormInputs = z.infer<typeof actionSchema>;

interface ActionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionId: string;
  zIndex?: number;
  initialData?: ActionFormInputs;
}

export function ActionEditModal({
  isOpen,
  onClose,
  actionId,
  zIndex,
  initialData,
}: ActionEditModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActionFormInputs>({
    resolver: zodResolver(actionSchema),
    defaultValues: initialData || {
      id: actionId,
      name: '',
      bonus: '',
      damage: '',
    },
  });

  const onSubmit = (_data: ActionFormInputs) => {
    void _data;
    // Here you would typically save the data, e.g., to global state
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-surface-1 text-text-primary space-y-4 rounded-lg p-4"
      >
        <div>
          <label htmlFor="name" className="text-text-secondary block text-sm font-medium">
            Nome da Ação
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="border-surface-3 bg-surface-2 focus:border-accent-primary focus:ring-accent-primary/50 mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none"
          />
          {errors.name && (
            <p className="text-feedback-negative mt-1 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="bonus" className="text-text-secondary block text-sm font-medium">
            Bônus (opcional)
          </label>
          <input
            type="text"
            id="bonus"
            {...register('bonus')}
            className="border-surface-3 bg-surface-2 focus:border-accent-primary focus:ring-accent-primary/50 mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none"
          />
          {errors.bonus && (
            <p className="text-feedback-negative mt-1 text-sm">{errors.bonus.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="damage" className="text-text-secondary block text-sm font-medium">
            Dano (opcional)
          </label>
          <input
            type="text"
            id="damage"
            {...register('damage')}
            className="border-surface-3 bg-surface-2 focus:border-accent-primary focus:ring-accent-primary/50 mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none"
          />
          {errors.damage && (
            <p className="text-feedback-negative mt-1 text-sm">{errors.damage.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="border-surface-3 bg-surface-2 hover:bg-surface-3 text-text-primary focus:ring-accent-primary/50 rounded-md border px-4 py-2 focus:ring-2 focus:outline-none"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-accent-primary hover:bg-accent-primary-hover text-text-primary focus:ring-accent-primary/50 rounded-md px-4 py-2 focus:ring-2 focus:outline-none"
          >
            Salvar Ação
          </button>
        </div>
      </form>
    </InteractiveModal>
  );
}
