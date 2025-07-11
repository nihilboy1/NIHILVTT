// src/widgets/sheetModal/ui/SheetModal.tsx

import { FormProvider } from "react-hook-form";
import { useCharacters } from "../../../entities/character/model/contexts/CharactersContext";
import { useCharacterSheetForm, type SaveStatus } from "../../../entities/character/model/hooks/useCharacterSheetForm";
import { PlayerSheetContent } from "../../../entities/character/ui/playerSheet/PlayerSheetContent";
import { InteractiveModal } from "../../../shared/ui/InteractiveModal";
import { CharacterType } from "@/entities/character/model/schemas/character.schema";

interface CharacterSheetModalProps {
  characterId: string | null;
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

// Componente auxiliar para o indicador de salvamento
const SaveIndicator = ({ status, isDirty }: { status: SaveStatus, isDirty: boolean }) => {
  if (status === 'saving') {
    return <span className="text-xs text-text-secondary animate-pulse">Salvando...</span>;
  }
  if (status === 'success') {
    return <span className="text-xs text-green-400">Salvo!</span>;
  }
  if (isDirty) {
    return <span className="text-xs text-yellow-400" title="Alterações não salvas">•</span>;
  }
  return null;
};

export function SheetModal({
  characterId,
  isOpen,
  onClose,
  zIndex,
}: CharacterSheetModalProps) {
  const { characters, updateCharacter } = useCharacters();

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
  const modalTitle = form.watch('name') || "";

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
          {initialCharacterData.type === CharacterType.PLAYER ? (
            // 3. A prop 'onClose' foi removida de PlayerSheetContent.
            <PlayerSheetContent />
          ) : (
            <div>
              <p className="p-4">A ficha de Criatura/NPC precisa ser refatorada.</p>
            </div>
          )}
        </form>
      </FormProvider>
    </InteractiveModal>
  );
}