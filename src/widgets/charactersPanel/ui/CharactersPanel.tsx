import { GiAncientSword, GiNinjaHeroicStance } from "react-icons/gi";
import { useTokenStore } from "../../../entities/token/model/store/tokenStore";
import { useModalStore } from "@/features/modalManager/model/store";
import { CharacterTypeEnum } from "@/entities/character/model/schemas/character.schema";
import { useCharactersStore } from "@/entities/character/model/store";
import { CharacterCard } from "@/entities/character/ui/CharacterCard";

export function CharactersPanel() {
  const { characters, deleteCharacter } = useCharactersStore();
  const { tokenInstanceCounts } = useTokenStore();
  const { openModal, closeModal } = useModalStore();

  const handleDeleteCharacter = (characterId: string) => {
    const characterToDelete = characters.find(
      (char) => char.id === characterId
    );
    if (!characterToDelete) return;

    openModal("confirmationModal", {
      title: "Confirmar Exclusão",
      content: `Tem certeza que deseja excluir permanentemente o modelo "${
        characterToDelete.name
      }" e todas as suas ${
        tokenInstanceCounts.get(characterId) || 0
      } instâncias no tabuleiro? Esta ação não pode ser desfeita.`,
      confirmText: "Confirmar",
      cancelText: "Cancelar",
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
    <div className="flex-grow p-4 overflow-y-scroll space-y-6 hide-scrollbar">
      <div>
        <h3 className="text-lg font-semibold  mb-4">Criar Personagem</h3>
        <div className="space-y-3">
          <button
            onClick={() =>
              openModal("simpleName", {
                characterType: CharacterTypeEnum.enum.Player,
                title: "Nome do Novo Jogador",
              })
            }
            className="w-full px-4 py-3 bg-accent-primary hover:bg-accent-primary-hover font-semibold rounded-md flex items-center justify-center space-x-2 text-sm cursor-pointer"
            aria-label="Criar novo personagem jogável"
          >
            <GiNinjaHeroicStance className="w-6 h-6" />
            <span>Personagem Jogável</span>
          </button>
          <button
            onClick={() =>
              openModal("simpleName", {
                characterType: CharacterTypeEnum.enum["Monster/NPC"],
                title: "Nome do Novo Monstro/NPC",
              })
            }
            className="w-full px-4 py-3 bg-accent-primary hover:bg-accent-primary-hover font-semibold rounded-md flex items-center justify-center space-x-2 text-sm cursor-pointer"
            aria-label="Criar novo Monstro/NPC"
          >
            <GiAncientSword className="w-5 h-5" />
            <span>Monstro / NPC</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold  mb-3 mt-6 pt-4 border-t ">
          Fichas de Personagem
        </h3>
        {characters.length === 0 ? (
          <p className="text-text-secondary">
            Nenhuma ficha por aqui... Que tal criar uma? 👀
          </p>
        ) : (
          <ul className="space-y-2" aria-label="Lista de modelos de personagem">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                instanceCount={tokenInstanceCounts.get(character.id) || 0}
                openSheetModal={() =>
                  openModal("sheet", { characterId: character.id })
                }
                onDelete={handleDeleteCharacter}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
