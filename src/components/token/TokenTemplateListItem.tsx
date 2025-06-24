
import React, { useState, useRef } from 'react';
import { type Token as TokenInfo } from '../../types/index'; // Caminho corrigido
import { EllipsisVerticalIcon } from '../icons'; // Caminho corrigido
import { useTokens } from '../../contexts/TokensContext'; // Caminho corrigido
import OptionsPopover from '../ui/OptionsPopover'; // Caminho corrigido
import { useModal } from '../../contexts/ModalContext'; // Caminho corrigido
import { tokenTypeTranslations } from '../../constants'; // Manter importação se ainda for usada para o texto do tipo

interface TokenTemplateListItemProps {
  tokenInfo: TokenInfo;
  instanceCount: number;
  openTokenSheetModal: (tokenInfoId: string) => void;
}

export function TokenTemplateListItem({ 
  tokenInfo, 
  instanceCount, 
  openTokenSheetModal 
}: TokenTemplateListItemProps) {
  const { deleteToken, duplicateToken } = useTokens();
  const { openModal, closeModal } = useModal();

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const popoverAnchorRef = useRef<HTMLButtonElement>(null);

  const handleDragStart = (event: React.DragEvent<HTMLLIElement>, tokenInfoId: string) => {
    event.dataTransfer.setData('application/vtt-token-info-id', tokenInfoId);
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (event: React.DragEvent<HTMLLIElement>) => {
    event.currentTarget.style.opacity = '1';
  };

  const handleOpenPopover = (event: React.MouseEvent) => {
    event.stopPropagation(); // Impede que o clique no botão feche o popover imediatamente
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleDuplicate = () => {
    duplicateToken(tokenInfo.id);
    handleClosePopover();
  };

  const handleDeleteClick = () => {
    handleClosePopover(); // Fecha o popover antes de abrir o modal
    openModal('confirmationModal', { // Passa o nome do modal e as props separadamente
      title: 'Confirmar Exclusão',
      content: `Tem certeza que deseja excluir permanentemente o modelo "${tokenInfo.name}" e todas as suas ${instanceCount} instâncias no tabuleiro? Esta ação não pode ser desfeita.`,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        deleteToken(tokenInfo.id);
        closeModal();
      },
      onCancel: () => {
        closeModal();
      }
    });
  };

  return (
    <li
      className="bg-surface-3 p-3 rounded-md flex justify-between items-center shadow duration-150  "
      title={`Arraste '${tokenInfo.name}' para o tabuleiro para criar uma instância, ou clique para abrir a ficha.`}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, tokenInfo.id)}
      onDragEnd={handleDragEnd}
      aria-label={`Modelo de token ${tokenInfo.name}. Tipo: ${tokenTypeTranslations[tokenInfo.type]}. Tamanho: ${tokenInfo.size}. ${instanceCount} instâncias no tabuleiro.`}
    >
      <div
        className="hover:bg-surface-0 flex items-center space-x-3 flex-grow cursor-pointer rounded -ml-1 pl-5 -my-1 py-1"
        onClick={() => openTokenSheetModal(tokenInfo.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openTokenSheetModal(tokenInfo.id); }}
        aria-describedby={`token-details-${tokenInfo.id}`}
      >
        <img
            src={tokenInfo.image}
            alt={`Imagem do token ${tokenInfo.name}`}
            className="w-8 h-8 rounded-sm flex-shrink-0 shadow-sm object-cover" // Adicionado object-cover para garantir que a imagem preencha o espaço
            aria-hidden="true"
        />
        <div className="overflow-hidden" id={`token-details-${tokenInfo.id}`}>
          <span className=" font-medium block truncate" title={tokenInfo.name}>{tokenInfo.name}</span>
          <span className="text-xs text-text-secondary block">
            {tokenTypeTranslations[tokenInfo.type]} - {tokenInfo.size}
            {instanceCount > 0 && <span className="italic text-text-secondary"> ({instanceCount} no tabuleiro)</span>}
          </span>
        </div>
      </div>
      <button
        ref={popoverAnchorRef}
        onClick={handleOpenPopover}
        className="hover:bg-accent-primary p-1 ml-2 flex-shrink-0 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accent-primary"
        aria-label={`Mais opções para o modelo de token ${tokenInfo.name}`}
        title={`Mais opções para o modelo de token ${tokenInfo.name}`}
      >
        <EllipsisVerticalIcon />
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
