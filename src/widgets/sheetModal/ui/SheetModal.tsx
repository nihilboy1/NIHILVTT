// src/widgets/sheetModal/ui/SheetModal.tsx

import { FormProvider } from "react-hook-form";
import {
  useCharacterSheetForm,
  type SaveStatus,
} from "../../../entities/character/model/hooks/useCharacterSheetForm";
import { InteractiveModal } from "../../../shared/ui/InteractiveModal";
import { CharacterTypeEnum } from "@/entities/character/model/schemas/character.schema";
import { useModalStore } from "@/features/modalManager/model/store";
import { useCharactersStore } from "@/entities/character/model/store";
import { PlayerSheetContent } from "@/widgets/characterSheet/playerSheet/PlayerSheetContent";

interface SheetModalProps {
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
}: SheetModalProps) {
  const { characters, updateCharacter } = useCharactersStore();
  const { openModal } = useModalStore();

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

  const { isDirty } = form.formState;
  const modalTitle = form.watch("name") || "";

  const handleEditAction = (actionId: string) => {
    console.log("SheetModal: handleEditAction called for actionId:", actionId);
    openModal("actionEdit", { actionId }, false);
  };

  // A lógica de handleDeleteHitDice será inlined
  // const handleDeleteHitDice = (index: number) => { ... };

  if (!characterId || !initialCharacterData || !isOpen) {
    return null;
  }

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
              characterId={characterId} // Passar characterId
              onEditAction={handleEditAction}
              // A lógica de handleDeleteHitDice foi movida para HealthAndCombatWidget
              // As props de hitDice e actions não são mais necessárias aqui
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
