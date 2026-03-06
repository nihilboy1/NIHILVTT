// src/widgets/sheetModal/ui/SheetModal.tsx

import { PHB2024MONSTERS } from '@nihilvtt/datamodeling/data';

import { usePlayerCharacterViewModel } from "@/entities/character/lib/hooks/usePlayerCharacterViewModel";
import { adaptMonsterCatalogToSheetModel } from '@/entities/character/model/adapters/sessionCharacterAdapter';
import { CharacterTypeEnum } from "@/entities/character/model/schemas/character.schema";
import { useCharactersStore } from "@/entities/character/model/store";
import { useUIStore } from "@/features/layoutControls/model/store";
import { MonsterSheetContent } from "@/widgets/characterSheet/monsterNpcSheet/MonsterSheetContent";
import { PlayerSheetContent } from "@/widgets/characterSheet/playerSheet/PlayerSheetContent";

import { InteractiveModal } from "../../../shared/ui/InteractiveModal";

interface SheetModalProps {
  characterId?: string | null;
  monsterId?: string | null;
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

export function SheetModal({
  characterId,
  monsterId,
  isOpen,
  onClose,
  zIndex,
}: SheetModalProps) {
  const { characters } = useCharactersStore();
  const playerViewModel = usePlayerCharacterViewModel(characterId ?? null);
  const isRightSidebarVisible = useUIStore((state) => state.isRightSidebarVisible);

  const initialCharacterData = characterId
    ? characters.find((c) => c.id === characterId) || null
    : null;
  const catalogMonster = monsterId
    ? PHB2024MONSTERS.find((monster) => monster.id === monsterId) ?? null
    : null;
  const catalogMonsterSheetCharacter = catalogMonster
    ? adaptMonsterCatalogToSheetModel(catalogMonster)
    : null;

  const modalTitle =
    playerViewModel?.name ??
    initialCharacterData?.name ??
    catalogMonsterSheetCharacter?.name ??
    "";
  const rightSafeArea = isRightSidebarVisible ? 384 : 0;

  if (!isOpen) {
    return null;
  }

  if (!characterId && !catalogMonsterSheetCharacter) {
    return null;
  }

  if (characterId && !initialCharacterData) {
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
        {initialCharacterData?.type === CharacterTypeEnum.enum.Player ? (
          <PlayerSheetContent
            characterId={initialCharacterData.id}
            viewModel={playerViewModel}
          />
        ) : initialCharacterData?.type === CharacterTypeEnum.enum.NPC ? (
          <MonsterSheetContent character={initialCharacterData} />
        ) : catalogMonsterSheetCharacter ? (
          <MonsterSheetContent character={catalogMonsterSheetCharacter} />
        ) : (
          <div className="p-4 text-sm text-text-secondary">
            Objetos ainda não possuem ficha dedicada.
          </div>
        )}
      </div>
    </InteractiveModal>
  );
}
