
import { useCharacters } from "../../../contexts/CharactersContext";
import { PlayerSheetContent } from "./PlayerSheetContent";
import { useCharacterSheetForm } from "../../../hooks/useCharacterSheetForm";
import { PlayerCharacter, CharacterType, Character } from "../../../shared/api/types";
import { InteractiveModal } from "../../../shared/ui/InteractiveModal";
import { PlayerSheetProvider } from "../../../contexts/CharacterSheetContext"; // Renomeado
import { CreatureSheet } from "../creature/CreatureSheet";

const ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT = 700;

interface CharacterSheetModalProps {
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
}: CharacterSheetModalProps) {
  const { characters, updateCharacter } = useCharacters(); // Renomeado para characters e updateCharacter
  const initialCharacterData = characterId
    ? characters.find((c: Character) => c.id === characterId) || null
    : null;

  const {
    editingCharacterImage,
    setEditingCharacterImage,
    editingCharacterSize,
    setEditingCharacterSize,
    editingCharacterType,
    setEditingCharacterType,
    editingCharacterNotes,
    setEditingCharacterNotes,
    editingInspiration,
    setEditingInspiration,
    hasCharacterSheetChanged,
    handleSave,
  } = useCharacterSheetForm({
    initialCharacterData: initialCharacterData,
    onSave: (updatedData) => {
      if (characterId) {
        if (initialCharacterData?.type !== CharacterType.PLAYER) {
          updateCharacter(characterId, updatedData);
          onClose();
        }
      }
    },
  });

  // Estados para controlar as dimensões do modal
  const MIN_SHEET_WIDTH = 400;
  const MIN_SHEET_HEIGHT = 300;
  const MAX_SHEET_WIDTH = 900;
  const MAX_SHEET_HEIGHT = 800;

  // Posição inicial centralizada com um pequeno offset
  const initialPosition = {
    x: Math.max(
      0,
      (window.innerWidth -
        (initialCharacterData?.type === CharacterType.PLAYER ? 750 : 450)) /
        2 +
        30
    ),
    y: Math.max(
      0,
      (window.innerHeight -
        (initialCharacterData?.type === CharacterType.PLAYER
          ? ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT
          : 620)) /
        2 +
        30
    ),
  };

  // Largura e altura iniciais baseadas no tipo de personagem
  const initialModalWidth =
    initialCharacterData?.type === CharacterType.PLAYER ? 750 : 450;
  const initialModalHeight =
    initialCharacterData?.type === CharacterType.PLAYER
      ? ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT
      : 620;

  if (!characterId || editingCharacterType === null || !isOpen) {
    return null;
  }

  const modalTitle =
    editingCharacterType === CharacterType.PLAYER
      ? `${initialCharacterData?.name || ""}`
      : `Ficha de ${initialCharacterData?.name || ""}`;

  const minimizedModalTitle = initialCharacterData?.name || "";

  return (
    <InteractiveModal
      id={`sheet-${characterId}`}
      title={modalTitle}
      minimizedTitle={minimizedModalTitle}
      isOpen={isOpen}
      onClose={onClose}
      initialPosition={initialPosition}
      initialWidth={initialModalWidth}
      initialHeight={initialModalHeight}
      minWidth={MIN_SHEET_WIDTH}
      minHeight={MIN_SHEET_HEIGHT}
      maxWidth={MAX_SHEET_WIDTH}
      maxHeight={MAX_SHEET_HEIGHT}
      zIndex={zIndex}
    >
      <form onSubmit={handleSave} className="space-y-0.5 bg-surface-0 ">
        {editingCharacterType === CharacterType.PLAYER &&
        initialCharacterData?.type === CharacterType.PLAYER ? (
          <PlayerSheetProvider
            initialCharacter={initialCharacterData as PlayerCharacter}
            setCharacter={(updatedPlayerCharacter: PlayerCharacter) => { // Adicionado tipagem
              if (characterId) {
                updateCharacter(characterId, updatedPlayerCharacter);
              }
            }}
          >
            <PlayerSheetContent
              characterId={characterId}
              updateCharacter={updateCharacter}
              onClose={onClose}
              editingCharacterImage={editingCharacterImage}
              setEditingCharacterImage={setEditingCharacterImage}
              editingCharacterSize={editingCharacterSize}
              setEditingCharacterSize={setEditingCharacterSize}
              editingCharacterNotes={editingCharacterNotes}
              setEditingCharacterNotes={setEditingCharacterNotes}
              editingInspiration={editingInspiration}
              setEditingInspiration={setEditingInspiration}
              hasCharacterSheetChanged={hasCharacterSheetChanged}
            />
          </PlayerSheetProvider>
        ) : (
            <CreatureSheet
              editingCharacterName={initialCharacterData?.name || ""}
              setEditingCharacterName={(name) => {
                if (initialCharacterData) {
                  updateCharacter(initialCharacterData.id, { ...initialCharacterData, name });
                }
              }}
              editingCharacterType={editingCharacterType}
              setEditingCharacterType={setEditingCharacterType}
              editingMaxHp={initialCharacterData?.maxHp?.toString() || ""}
              setEditingMaxHp={(hp) => {
                if (initialCharacterData) {
                  updateCharacter(initialCharacterData.id, {
                    ...initialCharacterData,
                    maxHp: parseInt(hp),
                  });
                }
              }}
              editingCharacterNotes={editingCharacterNotes}
              setEditingCharacterNotes={setEditingCharacterNotes}
              editingCharacterImage={editingCharacterImage}
              setEditingCharacterImage={setEditingCharacterImage}
              editingCharacterSize={editingCharacterSize}
              setEditingCharacterSize={setEditingCharacterSize}
            />
        )}
      </form>
    </InteractiveModal>
  );
}
