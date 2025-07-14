// src/widgets/sheetModal/ui/SheetModal.tsx

import { FormProvider, useFieldArray } from "react-hook-form";
import {
  useCharacterSheetForm,
  type SaveStatus,
} from "../../../entities/character/model/hooks/useCharacterSheetForm";
import { PlayerSheetContent } from "../../../entities/character/ui/playerSheet/PlayerSheetContent";
import { InteractiveModal } from "../../../shared/ui/InteractiveModal";
import { CharacterTypeEnum } from "@/entities/character/model/schemas/character.schema";
import { useModalStore } from "@/features/modalManager/model/store";
import { useDiceRoller } from "@/features/diceRolling/model/hooks/useDiceRoller";
import { DiceFormula } from "@/shared/api/types";
import { useCharactersStore } from "@/entities/character/model/store";

interface CharacterSheetModalProps {
  characterId: string | null;
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

// Componente auxiliar para o indicador de salvamento
const SaveIndicator = ({
  status,
  isDirty,
}: {
  status: SaveStatus;
  isDirty: boolean;
}) => {
  if (status === "saving") {
    return <span className="text-xs text-text-secondary animate-pulse">•</span>;
  }
  if (status === "success") {
    return <span className="text-xs text-feedback-positive">•</span>;
  }
  // ---> ADICIONE ESTE BLOCO <---
  if (status === "error") {
    return (
      <span className="text-xs text-feedback-negative">ERRO NO SALVAMENTO</span>
    );
  }
  if (isDirty) {
    return (
      <span
        className="text-xs text-accent-secondary"
        title="Alterações não salvas"
      >
        •
      </span>
    );
  }
  return null;
};

export function SheetModal({
  characterId,
  isOpen,
  onClose,
  zIndex,
}: CharacterSheetModalProps) {
  const { characters, updateCharacter } = useCharactersStore();
  const { openModal, closeModal } = useModalStore();

  const initialCharacterData = characterId
    ? characters.find((c) => c.id === characterId) || null
    : null;

  const { form, handleSubmit, saveStatus } = useCharacterSheetForm({
    initialCharacterData: initialCharacterData,
    onSave: (updatedData) => {
      if (characterId) {
        updateCharacter(characterId, updatedData);
      }
    },
  });

  // NOVO: Invocamos o hook da feature e pegamos o nome do personagem
  const { rollDice } = useDiceRoller();
  const characterName = form.watch("name");

   // NOVO: Criamos a função de callback que será injetada para baixo
  const handleAttributeRoll = (formula: DiceFormula, attributeLabel: string) => {
    rollDice(formula, attributeLabel, "Attribute", characterName);
  };

  const { isDirty } = form.formState;
  const modalTitle = form.watch("name") || "";

  const {
    fields: hitDiceFields,
    append: appendHitDiceEntry,
    remove: removeHitDiceEntry,
  } = useFieldArray({
    control: form.control,
    name: "hitDiceEntries",
  });

  const handleEditAction = (actionId: string) => {
    console.log("SheetModal: handleEditAction called for actionId:", actionId);
    openModal("actionEdit", { actionId }, false);
  };

  const handleDeleteHitDice = (index: number) => {
    console.log("SheetModal: handleDeleteHitDice called for index:", index);
    openModal("confirmationModal", {
      title: "Confirmar Exclusão",
      content:
        "Você tem certeza que deseja remover esta linha de dados de vida?",
      onConfirm: () => {
        console.log(
          "SheetModal: Confirming hit dice deletion for index:",
          index
        );
        removeHitDiceEntry(index);
        closeModal();
        console.log(
          "SheetModal: After removeHitDiceEntry, current hitDiceFields:",
          form.getValues("hitDiceEntries")
        );
      },
      onCancel: () => {
        console.log(
          "SheetModal: Cancelling hit dice deletion for index:",
          index
        );
        closeModal();
      },
    });
  };

  if (!characterId || !initialCharacterData || !isOpen) {
    return null;
  }

  // 1. A declaração duplicada de 'modalTitle' foi removida daqui.

  return (
    <InteractiveModal
      id={`sheet-${characterId}`}
      // 2. A prop 'title' agora recebe o JSX com o título e o indicador.
      title={
        <div className="flex items-center gap-3">
          <span>{modalTitle}</span>
          <SaveIndicator status={saveStatus} isDirty={isDirty} />
        </div>
      }
      isOpen={isOpen}
      onClose={onClose}
      zIndex={zIndex}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="space-y-0.5 bg-surface-0">
          {initialCharacterData.type === CharacterTypeEnum.enum.Player ? (
            // 3. A prop 'onClose' foi removida de PlayerSheetContent.
            <PlayerSheetContent
              onEditAction={handleEditAction}
              onDeleteHitDice={handleDeleteHitDice}
              hitDiceFields={hitDiceFields}
              onAddHitDice={appendHitDiceEntry}
              onRemoveHitDice={removeHitDiceEntry}
              onAttributeRoll={handleAttributeRoll}

            />
          ) : (
            <div>
              <p className="p-4">
                A ficha de Criatura/NPC precisa ser refatorada.
              </p>
            </div>
          )}
        </form>
      </FormProvider>
    </InteractiveModal>
  );
}
