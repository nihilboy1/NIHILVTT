// src/widgets/modalManager/ui/ModalManager.tsx

import { HPControlModal } from "../../../features/characterUpdateHp/ui/HPControlModal";
import { useTokens } from "../../../entities/token/model/contexts/TokenContext";
import { SimpleNameModal } from "../../../features/characterCreation/ui/SimpleNameModal";
import { ConfirmationModal } from "../../../shared/ui/ConfirmationModal";
import { useGameBoardInteractionContext } from "../../gameBoard/model/contexts/GameBoardInteractionContext";
import { SheetModal } from "../../sheetModal/ui/SheetModal";
import { useModalStore, ModalEntry } from "@/features/modalManager/model/store"; // Importar o store Zustand e a interface ModalEntry
import { ActionEditModal } from "../../../features/characterEditAction/ui/ActionEditModal"; // New import

// 1. Novas Importações: Trocamos os tipos manuais pelo CharacterSchema do Zod.
import { type Token } from "@/shared/api/types";
import { useCharactersStore } from "@/entities/character/model/store";


export function ModalManager() {
  const { handleHPChangeFromModal, handleRemoveInstanceFromBoard, handleMakeInstanceIndependent } = useGameBoardInteractionContext();
  const { modalStack, closeModal } = useModalStore();
  // `characters` agora é do tipo `CharacterSchema[]`
  const { characters } = useCharactersStore();
  const { tokensOnBoard } = useTokens();

  const topModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const shouldRenderOverlay = topModal && topModal.name !== "hpControl";

  return (
    <>
      {shouldRenderOverlay && (
        <div
          className="fixed inset-0 bg-overlay flex items-center justify-center p-4"
          onClick={() => {
            if (topModal && topModal.dismissible !== false) {
              closeModal();
            }
          }}
          style={{ zIndex: 99 }} // Overlay zIndex
        />
      )}
      {modalStack.map((modalEntry: ModalEntry, index: number) => {
        const { name, props } = modalEntry;
        const isTopModal = index === modalStack.length - 1;

        switch (name) {
          case "simpleName":
            return (
              <SimpleNameModal
                key={modalEntry.id}
                isOpen={true}
                onClose={closeModal}
                title={props.title as string}
                zIndex={100 + index} // Default modal zIndex
              />
            );

          case "sheet":
            return (
              <SheetModal
                key={props.characterId as string}
                characterId={props.characterId as string}
                isOpen={true}
                onClose={closeModal}
                zIndex={1000 + index} // Character sheet zIndex (higher than overlay)
              />
            );
          
          case "actionEdit": {
            return (
              <ActionEditModal
                key={modalEntry.id}
                isOpen={true}
                onClose={closeModal}
                actionId={props.actionId as string}
                zIndex={1500 + index} // Action edit modal zIndex (between sheet and confirmation)
              />
            );
          }

          case "hpControl":
            const selectedTokenForHP = tokensOnBoard.find(
              (t: Token) => t.id === props.tokenId
            );
            const characterForHPModal = selectedTokenForHP
              ? characters.find((c) => c.id === selectedTokenForHP.characterId)
              : null;

            return (
              props.tokenId &&
              characterForHPModal &&
              props.anchorPoint && (
                <HPControlModal
                  key={modalEntry.id}
                  tokenId={props.tokenId as string}
                  token={selectedTokenForHP || null} 
                  character={characterForHPModal} 
                  anchorPoint={props.anchorPoint as { x: number; y: number }}
                  isOpen={isTopModal}
                  onClose={closeModal}
                  onHPChange={handleHPChangeFromModal}
                  onRemoveFromBoard={handleRemoveInstanceFromBoard}
                  onMakeIndependent={handleMakeInstanceIndependent}
                  zIndex={100 + index} // Default modal zIndex
                />
              )
            );

          case "confirmationModal":
            return (
              <ConfirmationModal
                key={modalEntry.id}
                isOpen={true}
                title={props.title as string}
                content={props.content as string}
                confirmText={props.confirmText as string}
                cancelText={props.cancelText as string}
                onConfirm={props.onConfirm as () => void}
                onCancel={props.onCancel as () => void}
                zIndex={2000 + index} // Confirmation modal zIndex (highest)
              />
            );
            
          default:
            return null;
        }
      })}
    </>
  );
}
