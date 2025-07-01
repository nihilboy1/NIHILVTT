import { HPControlModal } from "../../../features/characterUpdateHp/ui/HPControlModal";

import { useCharacters } from "../../../entities/character/model/contexts/CharactersContext"; // Renomeado
import { SimpleNameModal } from "../../../features/characterCreation/ui/SimpleNameModal";
import {
  CharacterType,
  type Character,
  type PlayerCharacter,
  type Token,
} from "../../../shared/api/types";
import {
  DEFAULT_PLAYER_INSPIRATION,
  DEFAULT_PLAYER_LEVEL,
  DEFAULT_TOKEN_HP,
  DEFAULT_TOKEN_SIZE,
} from "../../../shared/config/constants";
import { DEFAULT_TOKEN_IMAGE } from "../../../shared/config/sheetDefaults";
import { ConfirmationModal } from "../../../shared/ui/ConfirmationModal";
import { useGameBoardInteractionContext } from "../../gameBoard/model/contexts/GameBoardInteractionContext";
import { SheetProvider } from "../../sheetModal/model/contexts/SheetContext";
import { SheetModal } from "../../sheetModal/ui/SheetModal";
import { useModal } from "../model/contexts/ModalProvider";
import { ModalEntry } from "../model/hooks/useModalStateManagement"; // Importar ModalEntry
import { ActionEditModal } from "../../../features/characterEditAction/ui/ActionEditModal";
import { PlayerSheetProvider } from "../../../entities/character/model/contexts/CharacterSheetContext";

export function ModalManager() {
  const {
    handleHPChangeFromModal,
    handleRemoveInstanceFromBoard,
    handleMakeInstanceIndependent,
  } = useGameBoardInteractionContext();
  const { modalStack, openModal, closeModal } = useModal();
  const { characters, tokensOnBoard, addCharacter, updateCharacter } =
    useCharacters(); // Renomeado

  const handleSaveNewTokenName = (
    name: string,
    characterTypeFromModal?: CharacterType
  ) => {
    const activeModalEntry =
      modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
    const activeModalProps = activeModalEntry?.props;
    const typeToUse = characterTypeFromModal || activeModalProps?.characterType;

    if (!typeToUse) {
      console.error("handleSaveNewTokenName: characterType is missing.");
      return;
    }

    let newSheetData: Omit<Character, "id">;

    if (typeToUse === CharacterType.PLAYER) {
      newSheetData = {
        name: name,
        type: CharacterType.PLAYER,
        image: DEFAULT_TOKEN_IMAGE,
        size: DEFAULT_TOKEN_SIZE,
        maxHp: DEFAULT_TOKEN_HP,
        notes: "",
        species: "",
        charClass: "",
        subclass: "",
        level: DEFAULT_PLAYER_LEVEL,
        background: "",
        inspiration: DEFAULT_PLAYER_INSPIRATION,
        armorClass: 10,
        shieldEquipped: false,
        tempHp: 0,
        hitDiceUsed: 0,
        hitDiceMax: DEFAULT_PLAYER_LEVEL,
        deathSavesSuccesses: 0,
        deathSavesFailures: 0,
      } as Omit<PlayerCharacter, "id">;
    } else {
      newSheetData = {
        name: name,
        type: typeToUse,
        image: DEFAULT_TOKEN_IMAGE,
        size: DEFAULT_TOKEN_SIZE,
        maxHp: DEFAULT_TOKEN_HP,
        notes: "",
      } as Omit<Character, "id">;
    }
    const newCharacter = addCharacter(newSheetData);
    closeModal();
    openModal("sheet", { characterId: newCharacter.id }, false); // Abrir ficha como não dismissible
  };

  console.log("ModalManager: modalStack atual:", modalStack);

  const topModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const shouldRenderOverlay = topModal && topModal.name !== "hpControl"; // Renderiza overlay apenas se não for HPControlModal

  return (
    <>
      {shouldRenderOverlay && (
        <div
          className="fixed inset-0 bg-overlay flex items-center justify-center p-4"
          onClick={() => {
            if (topModal && topModal.dismissible !== false) { // Só fecha se o modal superior for dismissible
              closeModal();
            }
          }}
          style={{ zIndex: 99 }} // Z-index para o overlay, abaixo dos modais
        />
      )}
      {modalStack.map((modalEntry: ModalEntry, index: number) => {
        const { name, props, dismissible } = modalEntry;
        const isTopModal = index === modalStack.length - 1;

        console.log(`ModalManager: Renderizando ${name} (isTopModal: ${isTopModal}, dismissible: ${dismissible})`);

        switch (name) {
          case "simpleName":
            return (
              <SimpleNameModal
                key={modalEntry.id}
                isOpen={true} // Alterado para sempre estar aberto quando na pilha
                onClose={closeModal}
                onSave={handleSaveNewTokenName}
                title={props.title as string}
                characterType={props.type as CharacterType}
                zIndex={100 + index}
              />
            );
          case "sheet":
            console.log(`ModalManager: SheetModal - isOpen: ${true}, zIndex: ${100 + index}`);
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
            console.log(`ModalManager: ActionEditModal - isOpen: ${true}, zIndex: ${100 + index}`);
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
            console.log(`ModalManager: HPControlModal - isOpen: ${isTopModal}, zIndex: ${100 + index}`);
            const selectedTokenForHP = tokensOnBoard.find(
              // Renomeado
              (t: Token) => t.id === props.tokenId
            );
            const characterForHPModal = selectedTokenForHP
              ? characters.find(
                  // Renomeado
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
            console.log(`ModalManager: ConfirmationModal - isOpen: ${true}, zIndex: ${200 + index}`);
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
