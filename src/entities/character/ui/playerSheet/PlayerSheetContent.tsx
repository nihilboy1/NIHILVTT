import { useState } from "react";

import { ActionEditModal } from "../../../../features/characterEditAction/ui/ActionEditModal";
import { PlayerCharacter } from "../../../../shared/api/types";
import { useModal } from "../../../../widgets/modalManager/model/contexts/ModalProvider";
import { usePlayerSheet } from "../../model/contexts/CharacterSheetContext"; // Renomeado
import { PlayerSheetConfigTab } from "./configTab/PlayerSheetConfigTab";
import { PlayerSheetDetailsTab } from "./detailsTab/PlayerSheetDetailsTab";
import { PlayerSheetTabs } from "./PlayerSheetTabs";
import { PrincipalTab } from "./principalTab/PrincipalTab";

type PlayerSheetTab = "principal" | "detalhes" | "configuracoes";

interface PlayerSheetContentProps {
  characterId: string;
  updateCharacter: (
    characterId: string,
    updates: Partial<PlayerCharacter>
  ) => void;
  onClose: () => void;
  editingCharacterImage: string;
  setEditingCharacterImage: (image: string) => void;
  editingCharacterSize: string;
  setEditingCharacterSize: (size: string) => void;
  editingCharacterNotes: string;
  setEditingCharacterNotes: (notes: string) => void;
  editingInspiration: boolean;
  setEditingInspiration: (inspiration: boolean) => void;
  hasCharacterSheetChanged: boolean;
}

export function PlayerSheetContent({
  characterId,
  updateCharacter,
  onClose,
  editingCharacterImage,
  setEditingCharacterImage,
  editingCharacterSize,
  setEditingCharacterSize,
  editingCharacterNotes,
  setEditingCharacterNotes,
  editingInspiration,
  setEditingInspiration,
  hasCharacterSheetChanged,
}: PlayerSheetContentProps) {
  const { getUpdatedPlayerCharacter } = usePlayerSheet(); // Renomeado
  const { modalStack, closeModal } = useModal();
  const [playerSheetActiveTab, setPlayerSheetActiveTab] =
    useState<PlayerSheetTab>("principal");

  // Helper para obter o modal ativo e suas props
  const activeModalEntry =
    modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const activeModalName = activeModalEntry?.name;
  const activeModalProps = activeModalEntry?.props;

  return (
    <>
      <PlayerSheetTabs
        activeTab={playerSheetActiveTab}
        onTabChange={setPlayerSheetActiveTab}
      />

      {playerSheetActiveTab === "principal" ? (
        <PrincipalTab />
      ) : playerSheetActiveTab === "detalhes" ? (
        <PlayerSheetDetailsTab
          editingCharacterNotes={editingCharacterNotes}
          setEditingCharacterNotes={setEditingCharacterNotes}
          editingInspiration={editingInspiration}
          setEditingInspiration={setEditingInspiration}
        />
      ) : (
        <PlayerSheetConfigTab
          editingCharacterImage={editingCharacterImage}
          setEditingCharacterImage={setEditingCharacterImage}
          editingCharacterSize={editingCharacterSize}
          setEditingCharacterSize={setEditingCharacterSize}
        />
      )}

      <div className="pt-2 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-accent-secondary hover:bg-accent-secondary-hover text-text-primary font-semibold rounded-md "
        >
          Cancelar
        </button>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            const updatedPlayerCharacter = getUpdatedPlayerCharacter(); // Renomeado
            updateCharacter(characterId, updatedPlayerCharacter);
            onClose();
          }}
          className="px-4 py-2 text-text-primary font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!hasCharacterSheetChanged}
        >
          Salvar
        </button>
      </div>

      {activeModalName === "actionEdit" && activeModalProps?.actionId && (
        <ActionEditModal
          isOpen={true}
          actionId={activeModalProps.actionId}
          onClose={() => {
            closeModal();
          }}
          zIndex={200}
        />
      )}
    </>
  );
}
