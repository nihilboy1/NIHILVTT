import { GiAncientSword } from 'react-icons/gi';

import { CharacterTypeEnum } from '@/entities/character/model/schemas/character.schema';
import { useCharactersStore } from '@/entities/character/model/store';
import { CharacterCard } from '@/entities/character/ui/CharacterCard';
import { useSessionModalStore } from '@/features/modalManager/model/sessionModalStore';

import { useTokenStore } from '../../../entities/token/model/store/tokenStore';

export function CharactersPanel() {
  const { characters, deleteCharacter } = useCharactersStore();
  const { tokenInstanceCounts } = useTokenStore();
  const { openModal, closeModal } = useSessionModalStore();

  const handleDeleteCharacter = (characterId: string) => {
    const characterToDelete = characters.find((char) => char.id === characterId);
    if (!characterToDelete) return;

    openModal('confirmationModal', {
      title: 'Confirmar Exclusão',
      content: `Tem certeza que deseja excluir permanentemente o modelo "${
        characterToDelete.name
      }" e todas as suas ${
        tokenInstanceCounts.get(characterId) || 0
      } instâncias no tabuleiro? Esta ação não pode ser desfeita.`,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        deleteCharacter(characterId);
        closeModal();
      },
      onCancel: () => {
        closeModal();
      },
    });
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
          </button> */}
          <button
            onClick={() =>
              openModal('simpleName', {
                characterType: CharacterTypeEnum.enum['Monster/NPC'],
                title: 'Nome do Novo Monstro/NPC',
              })
            }
            className="hover:bg-accent-primary-hover bg-accent-primary flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md px-4 py-3 text-sm font-semibold"
            aria-label="Criar novo Monstro/NPC"
          >
            <GiAncientSword className="h-5 w-5" />
            <span>Monstro / NPC</span>
          </button>
          <button
            onClick={() => openModal('characterbuilderModal')}
            className="hover:bg-accent-primary-hover bg-accent-primary flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md px-4 py-3 text-sm font-semibold"
            aria-label="Criar Personagens (Avançado)"
          >
            <span>Criador de Personagens (Avançado)</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="mt-6 mb-3 border-t pt-4 text-lg font-semibold">Fichas de Personagem</h3>
        {characters.length === 0 ? (
          <p className="text-text-secondary">Nenhuma ficha por aqui... Que tal criar uma? 👀</p>
        ) : (
          <ul className="space-y-2" aria-label="Lista de modelos de personagem">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                instanceCount={tokenInstanceCounts.get(character.id) || 0}
                openSheetModal={() => openModal('sheet', { characterId: character.id })}
                onDelete={handleDeleteCharacter}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
