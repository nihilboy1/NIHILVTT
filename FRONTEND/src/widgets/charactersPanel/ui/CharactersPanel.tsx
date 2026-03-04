import { GiAncientSword } from 'react-icons/gi';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useCharactersStore } from '@/entities/character/model/store';
import { CharacterCard } from '@/entities/character/ui/CharacterCard';
import { applyGameSessionEvent } from '@/features/game/model/gameSessionEventHandlers';
import {
  sendGameDuplicateCharacter,
  sendGameRemoveCharacter,
} from '@/features/game/model/gameSessionApi';
import { useGameStore } from '@/features/game/model/gameStore';
import { useSessionModalStore } from '@/features/modalManager/model/sessionModalStore';

import { useTokenStore } from '../../../entities/token/model/store/tokenStore';

export function CharactersPanel() {
  const { gameId } = useParams<{ gameId: string }>();
  const { characters, runtimeCharactersById } = useCharactersStore();
  const { tokenInstanceCounts } = useTokenStore();
  const { openModal, closeModal } = useSessionModalStore();
  const currentGame = useGameStore((state) => state.currentGame);
  const currentUserId = useAuthStore((state) => state.user?.id ?? null);
  const playerCharacters = characters.filter((character) => character.type === 'Player');

  const handleDuplicateCharacter = async (characterId: string) => {
    const parsedGameId = Number(gameId);
    const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;

    if (!isValidGameId) {
      console.error(
        'Fluxo local bloqueado: duplicação de ficha exige contexto de sessão autoritativa.',
        { characterId },
      );
      return;
    }

    try {
      const event = await sendGameDuplicateCharacter(parsedGameId, characterId);
      applyGameSessionEvent(event);
    } catch {
      console.warn('Falha ao duplicar personagem da sessão.');
    }
  };

  const handleDeleteCharacter = (characterId: string) => {
    const characterToDelete = characters.find((char) => char.id === characterId);
    if (!characterToDelete) return;
    const parsedGameId = Number(gameId);
    const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;

    openModal('confirmationModal', {
      title: 'Confirmar Exclusão',
      content: `Tem certeza que deseja excluir permanentemente o modelo "${
        characterToDelete.name
      }" e todas as suas ${
        tokenInstanceCounts.get(characterId) || 0
      } instâncias no tabuleiro? Esta ação não pode ser desfeita.`,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        if (!isValidGameId) {
          console.error(
            'Fluxo local bloqueado: remoção de ficha exige contexto de sessão autoritativa.',
            { characterId },
          );
          closeModal();
          return;
        }

        try {
          const event = await sendGameRemoveCharacter(parsedGameId, characterId);
          applyGameSessionEvent(event);
          closeModal();
        } catch {
          console.warn('Falha ao remover personagem da sessão.');
        }
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  const parsedGameId = Number(gameId);
  const isSessionContext = Number.isInteger(parsedGameId) && parsedGameId > 0;
  const isGameMaster =
    currentGame != null && currentUserId != null && currentGame.owner.id === currentUserId;

  const canCurrentUserInstantiateCharacterToken = (characterId: string): boolean => {
    if (!isSessionContext) {
      return true;
    }

    const runtimeCharacter = runtimeCharactersById[characterId] ?? null;
    if (!runtimeCharacter) {
      return isGameMaster;
    }

    if (runtimeCharacter.type !== 'Player') {
      console.error(
        'Violação de contrato de sessão: CharactersPanel deve operar apenas com fichas Player.',
        { characterId, runtimeType: runtimeCharacter.type },
      );
      return false;
    }

    if (runtimeCharacter.controlledByUserId == null) {
      return isGameMaster;
    }

    return currentUserId != null && runtimeCharacter.controlledByUserId === currentUserId;
  };

  const getCharacterDragDisabledReason = (characterId: string): string => {
    if (!isSessionContext) {
      return 'Você não pode instanciar tokens desta ficha.';
    }

    const runtimeCharacter = runtimeCharactersById[characterId] ?? null;
    if (!runtimeCharacter || runtimeCharacter.type !== 'Player' || runtimeCharacter.controlledByUserId == null) {
      return 'Somente o mestre pode instanciar tokens desta ficha.';
    }

    return 'Esta ficha pertence a outro jogador.';
  };

  return (
    <div className="hide-scrollbar flex-grow space-y-6 overflow-y-scroll p-4">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Criar Personagem</h3>
        <div className="space-y-3">
          {/* <button
            onClick={() =>
              openModal('simpleName', {
                characterType: CharacterTypeEnum.enum.Player,
                title: 'Nome do Novo Jogador',
              })
            }
            className="hover:bg-accent-primary-hover bg-accent-primary flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md px-4 py-3 text-sm font-semibold"
            aria-label="Criar novo personagem jogável"
          >
            <GiNinjaHeroicStance className="h-6 w-6" />
            <span>Personagem Jogável</span>
          </button> 
          <button
            onClick={() =>
              openModal('simpleName', {
                characterType: CharacterTypeEnum.enum.NPC,
                title: 'Nome do Novo Monstro/NPC',
              })
            }
            className="hover:bg-accent-primary-hover bg-accent-primary flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md px-4 py-3 text-sm font-semibold"
            aria-label="Criar novo Monstro/NPC"
          >
            <GiMoonClaws className="h-5 w-5" />
            <span>Monstro / NPC</span>
          </button>
          */}
          <button
            onClick={() => openModal('characterbuilderModal')}
            className="hover:bg-accent-primary-hover bg-accent-primary flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md px-4 py-3 text-sm font-semibold"
            aria-label="Construtor de Personagem"
            title="Construtor de Personagem"
          >
            <GiAncientSword className="h-5 w-5" />
            <span>Construtor de Personagem</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="mt-6 mb-3 border-t pt-4 text-lg font-semibold">Fichas de Personagem</h3>
        {playerCharacters.length === 0 ? (
          <p className="text-text-secondary">Nenhuma ficha por aqui... Que tal criar uma? 👀</p>
        ) : (
          <ul className="space-y-2" aria-label="Lista de modelos de personagem">
            {playerCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                instanceCount={tokenInstanceCounts.get(character.id) || 0}
                openSheetModal={() => openModal('sheet', { characterId: character.id })}
                onDuplicate={handleDuplicateCharacter}
                onDelete={handleDeleteCharacter}
                canDragToBoard={canCurrentUserInstantiateCharacterToken(character.id)}
                dragDisabledReason={getCharacterDragDisabledReason(character.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
