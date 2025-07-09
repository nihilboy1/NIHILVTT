import { HPControlModal } from "../../../features/characterUpdateHp/ui/HPControlModal";

import { useCharacters } from "../../../entities/character/model/contexts/CharactersContext";
import { useTokens } from "../../../entities/token/model/contexts/TokenContext";
import { SimpleNameModal } from "../../../features/characterCreation/ui/SimpleNameModal";
import {
  CharacterType,
  type Character,
  type PlayerCharacter,
  type Token,
} from "../../../shared/api/types";

import { ConfirmationModal } from "../../../shared/ui/ConfirmationModal";
import { useGameBoardInteractionContext } from "../../gameBoard/model/contexts/GameBoardInteractionContext";
import { SheetProvider } from "../../sheetModal/model/contexts/SheetContext";
import { SheetModal } from "../../sheetModal/ui/SheetModal";
import { ActionEditModal } from "../../../features/characterEditAction/ui/ActionEditModal";
import { PlayerSheetProvider } from "../../../entities/character/model/contexts/CharacterSheetContext";
import { useModal } from "@/features/modalManager/model/contexts/ModalProvider";
import { ModalEntry } from "@/features/modalManager/model/hooks/useModalStateManagement";

export function ModalManager() {
  const {
    handleHPChangeFromModal,
    handleRemoveInstanceFromBoard,
    handleMakeInstanceIndependent,
  } = useGameBoardInteractionContext();
  const { modalStack, closeModal } = useModal();
  const { characters, updateCharacter } = useCharacters();
  const { tokensOnBoard } = useTokens();

  const topModal =
    modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const shouldRenderOverlay = topModal && topModal.name !== "hpControl"; // Renderiza overlay apenas se não for HPControlModal

  return (
    <>
      {shouldRenderOverlay && (
        <div
          className="fixed inset-0 bg-overlay flex items-center justify-center p-4"
          onClick={() => {
            if (topModal && topModal.dismissible !== false) {
              // Só fecha se o modal superior for dismissible
              closeModal();
            }
          }}
          style={{ zIndex: 99 }} // Z-index para o overlay, abaixo dos modais
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
                isOpen={true} // Alterado para sempre estar aberto quando na pilha
                onClose={closeModal}
                title={props.title as string}
                zIndex={100 + index}
              />
            );
          case "sheet":
            const foundCharacter = characters.find(
              // Renomeado
              (c: Character) => c.id === props.characterId
            );
            const initialCharacterData =
              foundCharacter && foundCharacter.type === CharacterType.PLAYER
                ? (foundCharacter as PlayerCharacter)
                : null;

            return (
              <SheetProvider
                key={props.characterId as string}
                initialCharacterData={initialCharacterData}
                onSave={(updatedData: Partial<Character>) => {
                  if (props.characterId) {
                    updateCharacter(props.characterId as string, updatedData); // Renomeado
                    closeModal();
                  }
                }}
              >
                <SheetModal
                  characterId={props.characterId as string}
                  isOpen={true}
                  onClose={closeModal}
                  zIndex={100 + index}
                />
              </SheetProvider>
            );
          case "actionEdit": {
            const characterForActionEdit = characters.find(
              (c: Character) => c.id === props.characterId
            );

            if (
              characterForActionEdit &&
              characterForActionEdit.type === CharacterType.PLAYER
            ) {
              return (
                <PlayerSheetProvider
                  key={modalEntry.id}
                  initialCharacter={characterForActionEdit as PlayerCharacter}
                  setCharacter={(updatedPlayerCharacter) => {
                    if (props.characterId) {
                      updateCharacter(
                        props.characterId as string,
                        updatedPlayerCharacter
                      );
                    }
                  }}
                >
                  <ActionEditModal
                    isOpen={true}
                    actionId={props.actionId as string}
                    onClose={closeModal}
                    zIndex={100 + index}
                  />
                </PlayerSheetProvider>
              );
            }
            return null;
          }
          case "hpControl":
            const selectedTokenForHP = tokensOnBoard.find(
              (t: Token) => t.id === props.tokenId
            );
            const characterForHPModal = selectedTokenForHP
              ? characters.find(
                  (c: Character) => c.id === selectedTokenForHP.characterId
                )
              : null;

            return (
              props.tokenId &&
              characterForHPModal &&
              props.anchorPoint && (
                <HPControlModal
                  key={modalEntry.id}
                  tokenId={props.tokenId as string}
                  character={characterForHPModal}
                  anchorPoint={props.anchorPoint as { x: number; y: number }}
                  isOpen={isTopModal}
                  onClose={closeModal}
                  onHPChange={(tokenId, newHP) => {
                    // Renomeado
                    if (tokenId) {
                      handleHPChangeFromModal(tokenId as string, newHP); // Renomeado
                    }
                  }}
                  onRemoveFromBoard={handleRemoveInstanceFromBoard}
                  onMakeIndependent={handleMakeInstanceIndependent}
                  zIndex={100 + index}
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
                zIndex={200 + index}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
