import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  FIXED_GAME_MAX_PLAYERS,
  FIXED_GAME_SYSTEM_LABEL,
  createGameSchema,
  type CreateGameInput,
} from '@/entities/game/model/schemas/game.schema';
import { AppButton } from '@/shared/ui/AppButton';
import { StatusAlert } from '@/shared/ui/StatusAlert';

type CreateGameFormProps = {
  isSubmitting: boolean;
  globalError: string | null;
  fieldErrors: Record<string, string>;
  onSubmit: (values: CreateGameInput) => Promise<boolean>;
};

type CreateGameFormValues = z.input<typeof createGameSchema>;

export function CreateGameForm({
  isSubmitting,
  globalError,
  fieldErrors,
  onSubmit,
}: CreateGameFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<CreateGameFormValues, unknown, CreateGameInput>({
    resolver: zodResolver(createGameSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    const entries = Object.entries(fieldErrors);
    for (const [field, message] of entries) {
      if (field === 'title' || field === 'description') {
        setError(field, { type: 'server', message });
      }
    }
  }, [fieldErrors, setError]);

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async (values) => {
        const success = await onSubmit(values);
        if (success) {
          reset({ title: '', description: '' });
        }
      })}
      noValidate
    >
      {globalError && (
        <StatusAlert tone="error">{globalError}</StatusAlert>
      )}

      <div>
        <label htmlFor="game-title" className="mb-1 block text-sm text-text-secondary">
          Nome do jogo
        </label>
        <input
          id="game-title"
          type="text"
          placeholder="Ex.: Campanha de Ravenloft"
          {...register('title')}
          className="w-full rounded-sm border border-surface-2 bg-text-primary p-2 text-surface-0"
        />
        {errors.title?.message && (
          <p className="mt-1 text-xs text-feedback-negative">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="game-description" className="mb-1 block text-sm text-text-secondary">
          Descrição (opcional)
        </label>
        <textarea
          id="game-description"
          placeholder="Resumo rápido da sessão..."
          rows={3}
          {...register('description')}
          className="w-full rounded-sm border border-surface-2 bg-text-primary p-2 text-surface-0"
        />
        {errors.description?.message && (
          <p className="mt-1 text-xs text-feedback-negative">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2 rounded-md border border-surface-2 bg-surface-0/60 p-3 text-sm text-text-secondary">
        <p>
          Sistema desta mesa:{' '}
          <span className="font-semibold text-text-primary">{FIXED_GAME_SYSTEM_LABEL}</span>
        </p>
        <p>
          Capacidade fixa desta mesa: <span className="font-semibold text-text-primary">1 mestre + 5 jogadores</span>
          {' '}(total de {FIXED_GAME_MAX_PLAYERS} participantes).
        </p>
      </div>

      <AppButton
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        loadingText="CRIANDO..."
        disabled={!isDirty || !isValid}
      >
        CRIAR JOGO
      </AppButton>
    </form>
  );
}
