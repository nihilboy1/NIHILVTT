import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import type { CreateGameInput } from '@/entities/game/model/schemas/game.schema';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useGameStore } from '@/features/game/model/gameStore';
import { CreateGameForm } from '@/features/game/ui/CreateGameForm';
import { AppButton } from '@/shared/ui/AppButton';
import { CardSection } from '@/shared/ui/CardSection';
import { PageShell } from '@/shared/ui/PageShell';
import { Spinner } from '@/shared/ui/Spinner';

export default function NewGamePage() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthStore();
  const { isCreatingGame, error, fieldErrors, createGame, clearError } = useGameStore();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [isLoading, user, navigate]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return null;
  }

  const handleCreateGame = async (values: CreateGameInput) => {
    const created = await createGame(values);
    if (created) {
      navigate(`/game/${created.id}`);
      return true;
    }
    return false;
  };

  return (
    <PageShell className="flex items-center justify-center p-4 text-text-primary sm:p-8" withSquares={false}>
      <CardSection className="w-full max-w-2xl border-transparent bg-surface-1/90 surface-elevated-shadow backdrop-blur-md">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h1 className="iceberg-regular text-4xl text-text-primary">Criar Novo Jogo</h1>
            <p className="mt-1 text-sm text-text-secondary">
              Configure os dados iniciais do seu jogo.
            </p>
          </div>
          <AppButton variant="secondary" onClick={() => navigate('/dashboard')}>
            Voltar
          </AppButton>
        </div>

        <CreateGameForm
          isSubmitting={isCreatingGame}
          globalError={error}
          fieldErrors={fieldErrors}
          onSubmit={handleCreateGame}
        />
      </CardSection>
    </PageShell>
  );
}
