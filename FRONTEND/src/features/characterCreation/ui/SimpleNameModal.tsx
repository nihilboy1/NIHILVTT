// src/features/characterCreation/ui/SimpleNameModal.tsx

import { useEffect, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { CharacterTypeEnum } from "@/entities/character/model/schemas/character.schema";
import { useSessionModalStore } from "@/features/modalManager/model/sessionModalStore";

import { Modal } from "../../../shared/ui/Modal";
import { useCharacterCreation } from "../model/hooks/useCharacterCreation";
import { simpleNameSchema, type SimpleNameSchema } from "../model/schemas/simpleName.schema";

type CharacterType = z.infer<typeof CharacterTypeEnum>

interface SimpleNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentName?: string;
  zIndex?: number;
}

export function SimpleNameModal({
  isOpen,
  onClose,
  title,
  currentName = "",
  zIndex,
}: SimpleNameModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SimpleNameSchema>({
    resolver: zodResolver(simpleNameSchema),
    defaultValues: { name: currentName },
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const { modalStack } = useSessionModalStore();
  // 1. Desestruturamos as novas funções do hook
  const { createPlayerCharacter, createMonsterNpc } = useCharacterCreation();

  const topModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const characterType = topModal?.props?.characterType as CharacterType | undefined;

  useEffect(() => {
    if (isOpen) {
      reset({ name: currentName });
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, currentName, reset]);

  const onSubmit = (data: SimpleNameSchema) => {
    if (characterType === CharacterTypeEnum.enum.Player) {
      createPlayerCharacter(data.name.trim());
      onClose();
    } else if (characterType === CharacterTypeEnum.enum["Monster/NPC"]) {
      createMonsterNpc(data.name.trim());
      onClose();
    } else {
      console.error("CharacterType indefinido ao tentar criar personagem.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      onConfirm={handleSubmit(onSubmit)}
      confirmText="Salvar"
      zIndex={zIndex}
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="simpleModalNameInput" className="block text-sm font-medium text-accent-primary mb-1">
              Nome do Personagem
            </label>
            <input
              id="simpleModalNameInput"
              type="text"
              {...register("name")}
              className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
              placeholder="Digite o nome"
            />
            {errors.name && (
              <p className="text-feedback-negative text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
