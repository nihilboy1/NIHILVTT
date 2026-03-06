import { useState } from 'react';

import { toast } from 'sonner';

import { usePlayerCharacter } from '@/entities/character/lib/hooks/usePlayerCharacter';
import {
  CharacterTypeEnum,
  characterTypeTranslations,
} from '@/entities/character/model/schemas/character.schema';
import { isPlayerCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';
import { useCharactersStore } from '@/entities/character/model/store';
import { PlayerCharacterViewModel } from '@/entities/character/model/view-models/playerCharacterViewModel';
import { useAuthStore } from '@/features/auth/model/authStore';
import { sendGameUpdateCharacterController } from '@/features/game/model/gameSessionApi';
import { applyGameSessionEvent } from '@/features/game/model/gameSessionEventHandlers';
import { useGameStore } from '@/features/game/model/gameStore';

interface PlayerSheetConfigTabProps {
  characterId: string;
  viewModel: PlayerCharacterViewModel | null;
}

export function PlayerSheetConfigTab({ characterId, viewModel }: PlayerSheetConfigTabProps) {
  const character = usePlayerCharacter(characterId);
  const runtimeCharacter = useCharactersStore((state) => state.runtimeCharactersById[characterId] ?? null);
  const playerRuntimeCharacter = isPlayerCharacterRuntime(runtimeCharacter) ? runtimeCharacter : null;
  const currentGame = useGameStore((state) => state.currentGame);
  const currentUser = useAuthStore((state) => state.user);
  const [isUpdatingController, setIsUpdatingController] = useState(false);
  const imageValue = viewModel?.image?.trim() ? viewModel.image : 'Sem imagem configurada.';
  const isGameMaster = currentGame != null && currentUser != null && currentGame.owner.id === currentUser.id;
  const controllerOptions = currentGame?.players ?? [];
  const controlledByUserIdValue = playerRuntimeCharacter?.controlledByUserId ?? null;
  const currentControllerLabel =
    controlledByUserIdValue == null
      ? 'Mestre'
      : controlledByUserIdValue === currentGame?.owner.id
        ? currentGame.owner.name
        : controllerOptions.find((player) => player.id === controlledByUserIdValue)?.name ?? `Jogador #${controlledByUserIdValue}`;

  const handleControllerChange = async (nextValue: string) => {
    if (!currentGame || !isGameMaster || isUpdatingController) {
      return;
    }

    const nextControlledByUserId =
      nextValue === 'unassigned'
        ? null
        : Number(nextValue);

    if (nextValue !== 'unassigned' && !Number.isInteger(nextControlledByUserId)) {
      return;
    }

    setIsUpdatingController(true);
    try {
      const event = await sendGameUpdateCharacterController(currentGame.id, characterId, nextControlledByUserId);
      applyGameSessionEvent(event);
    } catch {
      toast.error('Falha ao atualizar controlador do personagem.');
    } finally {
      setIsUpdatingController(false);
    }
  };

  return (
    <div className="hide-scrollbar flex h-full min-h-0 flex-col space-y-3 overflow-y-auto rounded-lg bg-surface-1/75 p-2.5">
      <div className="rounded-lg bg-surface-0/30 p-2.5">
        <p className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
          URL da Imagem do Personagem
        </p>
        <div className="rounded-md bg-surface-1 px-2.5 py-2 text-sm text-text-primary break-all">
          {imageValue}
        </div>
      </div>
      <div className="rounded-lg bg-surface-0/30 p-2.5">
        <p className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
          Tamanho do Personagem (Tabuleiro)
        </p>
        <div className="rounded-md bg-surface-1 px-2.5 py-2 text-sm text-text-primary">
          {character?.size ?? '1x1'}
        </div>
      </div>
      <div className="rounded-lg bg-surface-0/30 p-2.5">
        <p className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
          Tipo do Personagem
        </p>
        <div className="rounded-md bg-surface-1 px-2.5 py-2 text-sm text-text-primary opacity-80">
          {characterTypeTranslations[CharacterTypeEnum.enum.Player]}
        </div>
      </div>
      <div className="rounded-lg bg-surface-0/30 p-2.5">
        <p className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
          Controlador do Personagem
        </p>
        {playerRuntimeCharacter ? (
          isGameMaster ? (
            <select
              className="w-full rounded-md border border-surface-2 bg-surface-1 px-2.5 py-2 text-sm text-text-primary"
              disabled={isUpdatingController}
              value={controlledByUserIdValue == null ? 'unassigned' : String(controlledByUserIdValue)}
              onChange={(event) => {
                void handleControllerChange(event.target.value);
              }}
            >
              <option value="unassigned">Sem dono (controle do mestre)</option>
              {controllerOptions
                .filter((player) => !player.isOwner)
                .map((player) => (
                  <option key={player.id} value={String(player.id)}>
                    {player.name}
                  </option>
                ))}
            </select>
          ) : (
            <div className="rounded-md bg-surface-1 px-2.5 py-2 text-sm text-text-primary">
              {currentControllerLabel}
            </div>
          )
        ) : (
          <div className="rounded-md bg-surface-1 px-2.5 py-2 text-sm text-text-primary opacity-80">
            Controle autoritativo disponível apenas para personagens de sessão.
          </div>
        )}
      </div>
    </div>
  );
}
