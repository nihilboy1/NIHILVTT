import React, { useRef, useState } from 'react';

import {
  Character,
  characterTypeTranslations,
} from '@/entities/character/model/schemas/character.schema';
import { useCharactersStore } from '@/entities/character/model/store';
import { DotsThreeVerticalIcon } from '@/shared/ui/Icons';
import { OptionsPopover } from '@/shared/ui/OptionsPopover';

interface CharacterCardProps {
  character: Character;
  instanceCount: number;
  openSheetModal: (characterId: string) => void;
  onDelete: (characterId: string) => void;
}

export function CharacterCard({
  character,
  instanceCount,
  openSheetModal,
  onDelete,
}: CharacterCardProps) {
  const { duplicateCharacter } = useCharactersStore();

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const popoverAnchorRef = useRef<HTMLButtonElement>(null);

  const handleDragStart = (event: React.DragEvent<HTMLLIElement>, characterId: string) => {
    event.dataTransfer.setData('application/vtt-character-id', characterId);
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (event: React.DragEvent<HTMLLIElement>) => {
    event.currentTarget.style.opacity = '1';
  };

  const handleOpenPopover = (event: React.MouseEvent) => {
    event.stopPropagation();
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
    handleClosePopover();
    onDelete(character.id);
  };

  return (
    <li
      className="bg-surface-3 flex items-center justify-between rounded-md p-3 shadow duration-150"
      title={`Arraste '${character.name}' para o tabuleiro para criar uma instância, ou clique para abrir a ficha.`}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, character.id)}
      onDragEnd={handleDragEnd}
      aria-label={`Modelo de personagem ${character.name}. Tipo: ${
        characterTypeTranslations[character.type]
      }. Tamanho: ${character.size}. ${instanceCount} instâncias no tabuleiro.`}
    >
      <div
        className="hover:bg-surface-0 -my-1 -ml-1 flex flex-grow cursor-pointer items-center space-x-3 rounded py-1 pl-5"
        onClick={() => openSheetModal(character.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') openSheetModal(character.id);
        }}
        aria-describedby={`character-details-${character.id}`}
      >
        <img
          src={character.image}
          alt={`Imagem do personagem ${character.name}`}
          className="h-10 w-10 flex-shrink-0 rounded-sm object-cover shadow-sm"
          aria-hidden="true"
        />
        <div className="overflow-hidden" id={`character-details-${character.id}`}>
          <span className="block font-bold" title={character.name}>
            {character.name}
          </span>
          <span className="text-text-secondary mb-1 block text-xs">
            {characterTypeTranslations[character.type]} - {character.size}
            {instanceCount > 0 && (
              <span className="text-text-secondary italic"> ({instanceCount} no tabuleiro)</span>
            )}
          </span>
        </div>
      </div>
      <button
        ref={popoverAnchorRef}
        onClick={handleOpenPopover}
        className="hover:bg-accent-primary focus:ring-accent-primary ml-2 flex-shrink-0 rounded-full p-1 focus:ring-1 focus:ring-offset-1 focus:outline-none"
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
        <ul className="min-w-[150px]">
          <li>
            <button
              onClick={handleDuplicate}
              className="hover:bg-accent-secondary block w-full rounded-md px-3 py-2 text-left text-sm"
              role="menuitem"
            >
              Duplicar Personagem
            </button>
          </li>
          <li>
            <button
              onClick={handleDeleteClick}
              className="hover:bg-feedback-negative-hover block w-full rounded-md px-3 py-2 text-left text-sm"
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
