// src/widgets/sheetModal/ui/SheetModal.tsx

import { CharacterTypeEnum } from "@/entities/character/model/schemas/character.schema";
import { useCharactersStore } from "@/entities/character/model/store";
import { usePlayerCharacterViewModel } from "@/entities/character/lib/hooks/usePlayerCharacterViewModel";
import { useUIStore } from "@/features/layoutControls/model/store";
import { PlayerSheetContent } from "@/widgets/characterSheet/playerSheet/PlayerSheetContent";

import { InteractiveModal } from "../../../shared/ui/InteractiveModal";

interface SheetModalProps {
  characterId: string | null;
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

export function SheetModal({
  characterId,
  isOpen,
  onClose,
  zIndex,
}: SheetModalProps) {
  const { characters } = useCharactersStore();
  const playerViewModel = usePlayerCharacterViewModel(characterId);
  const isRightSidebarVisible = useUIStore((state) => state.isRightSidebarVisible);

  const initialCharacterData = characterId
    ? characters.find((c) => c.id === characterId) || null
    : null;

  const modalTitle = playerViewModel?.name ?? initialCharacterData?.name ?? "";
  const rightSafeArea = isRightSidebarVisible ? 384 : 0;

  if (!characterId || !initialCharacterData || !isOpen) {
    return null;
  }

  return (
    <InteractiveModal
      id={`sheet-${characterId}`}
      title={modalTitle}
      isOpen={isOpen}
      onClose={onClose}
      zIndex={zIndex}
      draggable
      initialOffsetX={-180}
      dialogClassName="w-[min(78vw,54rem)] max-w-[calc(100vw-2rem)]"
      contentClassName="p-2.5"
      safeArea={{ right: rightSafeArea }}
    >
      <div className="flex h-[min(78vh,50rem)] min-h-0 w-[min(74vw,50rem)] max-w-full flex-col space-y-0.5 bg-surface-0/30">
        {initialCharacterData.type === CharacterTypeEnum.enum.Player ? (
          <PlayerSheetContent
            characterId={characterId}
            viewModel={playerViewModel}
          />
        ) : (
          <div>
            <p className="p-4">
              A ficha de Criatura/NPC precisa ser refatorada.
            </p>
          </div>
        )}
      </div>
    </InteractiveModal>
  );
}
