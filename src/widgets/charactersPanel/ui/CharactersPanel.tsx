import { GiAncientSword, GiNinjaHeroicStance } from "react-icons/gi";
import { useCharacters } from "../../../entities/character/model/contexts/CharactersContext";
import { useTokens } from "../../../entities/token/model/contexts/TokenContext";
import { CharacterTemplateListItem } from "../../../entities/character/ui/CharacterTemplateListItem";
import { Character, CharacterType } from "../../../shared/api/types";
import { useModal } from "@/features/modalManager/model/contexts/ModalProvider";

// painel de personagens geral
export function CharactersPanel() {
  const { characters } = useCharacters();
  const { tokenInstanceCounts } = useTokens(); // Renomeado
  const { openModal } = useModal();

  return (
    <div className="flex-grow p-4 overflow-y-scroll space-y-6 hide-scrollbar">
      <div>
        <h3 className="text-lg font-semibold  mb-4">
          Criar Personagem
        </h3>
        <div className="space-y-3">
          <button
            onClick={() =>
              openModal("simpleName", {
                characterType: CharacterType.PLAYER, // Renomeado
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
                characterType: CharacterType.MONSTER_NPC, // Renomeado
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
            Nenhuma ficha por aqui...
            Que tal criar uma? 👀
          </p>
        ) : (
          <ul className="space-y-2" aria-label="Lista de modelos de personagem">
            {characters.map((character: Character) => (
              <CharacterTemplateListItem
                key={character.id}
                character={character}
                instanceCount={tokenInstanceCounts.get(character.id) || 0} // Renomeado
                openSheetModal={() =>
                  openModal("sheet", { characterId: character.id })
                }
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
