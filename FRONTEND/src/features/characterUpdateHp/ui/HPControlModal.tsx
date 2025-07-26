// src/features/characterUpdateHp/ui/HPControlModal.tsx

import React, { useCallback, useEffect, useRef, useState } from 'react';

// 1. MUDANÇA NA IMPORTAÇÃO: Removemos o 'Character' antigo e importamos o 'CharacterSchema' do Zod.
import {
  CharacterTypeEnum,
  type Character,
} from '@/entities/character/model/schemas/character.schema';
import { calculateNewHP } from '@/entities/token/model/utils/hpUtils';

import { type Point, type Token } from '../../../shared/api/types';
import { useDismissable } from '../../../shared/lib/hooks/useDismissable';
import { DetatchIcon, XMarkIcon } from '../../../shared/ui/Icons';

interface HPControlModalProps {
  tokenId: string | null;
  character: Character | null;
  token: Token | null;
  anchorPoint: Point | null;
  isOpen: boolean;
  onClose: () => void;
  onHPChange: (tokenId: string, newHP: number) => void;
  onRemoveFromBoard: (tokenId: string) => void;
  onMakeIndependent: (tokenId: string) => void;
  zIndex?: number;
}

export const HP_MODAL_ESTIMATED_HEIGHT_REM = 2.5;

export function HPControlModal({
  tokenId,
  character,
  token,
  anchorPoint,
  isOpen,
  onClose,
  onHPChange,
  onRemoveFromBoard,
  onMakeIndependent,
  zIndex,
}: HPControlModalProps) {
  const [editableHP, setEditableHP] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && character) {
      if (
        character.type === CharacterTypeEnum.enum.Player ||
        character.type === CharacterTypeEnum.enum['Monster/NPC']
      ) {
        setEditableHP(String(character.combatStats.currentHp));
      } else {
        setEditableHP('0');
      }
    } else if (!character && isOpen) {
      // Se não houver personagem, fechar o modal
      onClose();
    }
  }, [isOpen, character, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    console.log('HPControlModal: handleSubmit chamado.');
    if (!character || !token) {
      // Verificar também o token
      setEditableHP('0');
      console.log('HPControlModal: handleSubmit - Caractere ou token ausente.');
      return;
    }

    let maxHp: number;
    let currentActualHp: number;

    if (
      character.type === CharacterTypeEnum.enum.Player ||
      character.type === CharacterTypeEnum.enum['Monster/NPC']
    ) {
      maxHp = character.combatStats.maxHp;
      currentActualHp = parseInt(editableHP, 10); // currentActualHp é o valor digitado no input
    } else {
      // Para ObjectCharacter ou outros tipos sem combatStats
      setEditableHP('0');
      return;
    }

    const newHP = calculateNewHP(editableHP, currentActualHp, maxHp);

    if (newHP !== null) {
      if (tokenId) {
        onHPChange(tokenId, newHP);
        console.log('HPControlModal: onHPChange chamado com Token ID:', tokenId, 'Novo HP:', newHP);
      }
    } else {
      setEditableHP(String(character.combatStats.currentHp));
      console.log(
        'HPControlModal: Entrada inválida, revertendo para HP do personagem:',
        character.combatStats.currentHp,
      );
    }
  }, [editableHP, character, onHPChange, tokenId, token]);

  const handleCloseAndSave = useCallback(() => {
    handleSubmit();
    onClose();
  }, [handleSubmit, onClose]);

  useDismissable(modalRef, isOpen, handleCloseAndSave);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableHP(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
      onClose();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleInputBlur = () => {
    handleSubmit();
  };

  const handleRemoveClick = () => {
    if (tokenId) {
      onRemoveFromBoard(tokenId);
    }
  };

  const handleMakeIndependentClick = () => {
    if (tokenId) {
      onMakeIndependent(tokenId);
    }
  };

  if (!isOpen || !tokenId || !character || !anchorPoint) {
    return null;
  }

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: `${anchorPoint.y}px`,
    left: `${anchorPoint.x}px`,
    zIndex: zIndex,
    height: `${HP_MODAL_ESTIMATED_HEIGHT_REM}rem`,
  };

  const showMakeIndependentButton = true;

  return (
    <div
      ref={modalRef}
      style={modalStyle}
      className={`bg-surface-1 flex items-center space-x-1.5 rounded-md border p-1.5 shadow-lg`}
      role="dialog"
      aria-modal="true"
      aria-label="Controle de Vida"
    >
      <span className="mr-1 text-xs select-none">{'HP:'}</span>
      <input
        ref={inputRef}
        type="text"
        value={editableHP}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={handleInputBlur}
        className="hide-arrows h-7 w-12 rounded-sm border p-1 text-center text-sm focus:ring-1"
        aria-label="Vida Atual"
        inputMode="tel"
      />
      <span className="text-text-secondary text-sm select-none">/</span>
      <span
        data-testid="max-hp-display"
        className="min-w-[1.25rem] text-center text-sm font-medium select-none"
      >
        {character.type === CharacterTypeEnum.enum.Player ||
        character.type === CharacterTypeEnum.enum['Monster/NPC']
          ? character.combatStats.maxHp
          : 'N/A'}
      </span>

      {showMakeIndependentButton && (
        <button
          onClick={handleMakeIndependentClick}
          className="hover:bg-accent-primary text-text-secondary focus:ring-accent-primary ml-1 flex h-[1.5rem] w-[1.5rem] cursor-pointer items-center justify-center rounded-full p-1 focus:ring-1 focus:outline-none"
          title="Tornar Token Independente"
          aria-label="Tornar instância independente"
        >
          <DetatchIcon />
        </button>
      )}

      <button
        onClick={handleRemoveClick}
        className="hover:bg-accent-primary text-text-secondary focus:ring-accent-primary ml-1 flex h-[1.5rem] w-[1.5rem] cursor-pointer items-center justify-center rounded-full p-1 focus:ring-1 focus:outline-none"
        title="Remover do Tabuleiro"
        aria-label="Remover instância do tabuleiro"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
