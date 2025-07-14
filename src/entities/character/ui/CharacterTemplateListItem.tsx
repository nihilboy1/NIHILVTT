import React, { useRef, useState } from "react";
import { characterTypeTranslations } from "../../../shared/config/constants";
import { DotsThreeVerticalIcon } from "../../../shared/ui/Icons";
import { OptionsPopover } from "../../../shared/ui/OptionsPopover";
import { Character } from "../model/schemas/character.schema";
import { useCharactersStore } from "../model/store";

interface CharacterTemplateListItemProps {
  character: Character;
  instanceCount: number;
  openSheetModal: (characterId: string) => void;
  onDelete: (characterId: string) => void; // New prop for deletion
}

export function CharacterTemplateListItem({
  character,
  instanceCount,
  openSheetModal,
  onDelete, // Destructure new prop
}: CharacterTemplateListItemProps) {
  const { duplicateCharacter } = useCharactersStore(); // Renomeado

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const popoverAnchorRef = useRef<HTMLButtonElement>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLLIElement>,
    characterId: string
  ) => {
    event.dataTransfer.setData("application/vtt-character-id", characterId); // Renomeado
    event.dataTransfer.effectAllowed = "move";
    event.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (event: React.DragEvent<HTMLLIElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const handleOpenPopover = (event: React.MouseEvent) => {
    event.stopPropagation(); // Impede que o clique no botão feche o popover imediatamente
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleDuplicate = () => {
    duplicateCharacter(character.id);
    handleClosePopover();
  };

  const handleDeleteClick = () => {
    handleClosePopover(); // Fecha o popover antes de abrir o modal
    onDelete(character.id); // Call the new onDelete prop
  };

  return (
    <li
      className="bg-surface-3 p-3 rounded-md flex justify-between items-center shadow duration-150  "
      title={`Arraste '${character.name}' para o tabuleiro para criar uma instância, ou clique para abrir a ficha.`}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, character.id)}
      onDragEnd={handleDragEnd}
      aria-label={`Modelo de personagem ${character.name}. Tipo: ${
        characterTypeTranslations[character.type]
      }. Tamanho: ${character.size}. ${instanceCount} instâncias no tabuleiro.`}
    >
      <div
        className="hover:bg-surface-0 flex items-center space-x-3 flex-grow cursor-pointer rounded -ml-1 pl-5 -my-1 py-1"
        onClick={() => openSheetModal(character.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openSheetModal(character.id);
        }}
        aria-describedby={`character-details-${character.id}`}
      >
        <img
          src={character.image}
          alt={`Imagem do personagem ${character.name}`}
          className="w-10 h-10 rounded-sm flex-shrink-0 shadow-sm object-cover " // Adicionado object-cover para garantir que a imagem preencha o espaço
          aria-hidden="true"
        />
        <div
          className="overflow-hidden"
          id={`character-details-${character.id}`}
        >
          <span className=" font-bold block " title={character.name}>
            {character.name}
          </span>
          <span className="text-xs text-text-secondary block mb-1">
            {characterTypeTranslations[character.type]} - {character.size}
            {instanceCount > 0 && (
              <span className="italic text-text-secondary">
                {" "}
                ({instanceCount} no tabuleiro)
              </span>
            )}
          </span>
        </div>
      </div>
      <button
        ref={popoverAnchorRef}
        onClick={handleOpenPopover}
        className="hover:bg-accent-primary p-1 ml-2 flex-shrink-0 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accent-primary"
        aria-label={`Mais opções para o modelo de personagem ${character.name}`}
        title={`Mais opções para o modelo de personagem ${character.name}`}
      >
        <DotsThreeVerticalIcon />
      </button>

      <OptionsPopover
        isOpen={isPopoverOpen}
        onClose={handleClosePopover}
        targetRef={popoverAnchorRef}
      >
        <ul className="min-w-[150px] ">
          <li>
            <button
              onClick={handleDuplicate}
              className=" block w-full text-left px-3 py-2 text-sm hover:bg-accent-secondary rounded-md"
              role="menuitem"
            >
              Duplicar Personagem
            </button>
          </li>
          <li>
            <button
              onClick={handleDeleteClick}
              className="hover:bg-feedback-negative-hover block w-full text-left px-3 py-2 text-sm  rounded-md"
              role="menuitem"
            >
              Excluir Personagem
            </button>
          </li>
        </ul>
      </OptionsPopover>
    </li>
  );
}

// visto
