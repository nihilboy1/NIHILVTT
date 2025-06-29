import { HPControlModal } from "../components/modals/HPControlModal";
import { SimpleNameModal } from "../components/modals/SimpleNameModal";

import { SheetModal } from "../components/sheets/player/SheetModal";
import { DEFAULT_TOKEN_IMAGE } from "../constants/sheetDefaults";
import { useGameBoardInteractionContext } from "../contexts/GameBoardInteractionContext";
import { SheetProvider } from "../contexts/SheetContext";
import { useCharacters } from "../contexts/CharactersContext"; // Renomeado
import {
  CharacterType,
  type Token,
  type PlayerCharacter,
  type Character,
} from "../shared/api/types";
import {
  DEFAULT_PLAYER_INSPIRATION,
  DEFAULT_PLAYER_LEVEL,
  DEFAULT_TOKEN_HP,
  DEFAULT_TOKEN_SIZE,
} from "../shared/config/constants";
import { ConfirmationModal } from "../shared/ui/ConfirmationModal";
import { useModal } from "../app/providers/ModalProvider";
import { ModalEntry } from "../app/providers/useModalStateManagement"; // Importar ModalEntry

export function ModalManager() {
  const {
    handleHPChangeFromModal,
    handleRemoveInstanceFromBoard,
    handleMakeInstanceIndependent,
  } = useGameBoardInteractionContext();
  const { modalStack, openModal, closeModal } = useModal();
  const { characters, tokensOnBoard, addCharacter, updateCharacter } = useCharacters(); // Renomeado

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
    openModal("sheet", { characterId: newCharacter.id });
  };

  return (
    <>
      {modalStack.map((modalEntry: ModalEntry, index: number) => {
        const { name, props } = modalEntry;
        const isTopModal = index === modalStack.length - 1;

        // Renderiza apenas o modal no topo da pilha
        if (!isTopModal) {
          return null;
        }

        switch (name) {
          case "simpleName":
            return (
              <SimpleNameModal
                key={modalEntry.id}
                isOpen={isTopModal}
                onClose={closeModal}
                onSave={handleSaveNewTokenName}
                title={props.title as string}
                characterType={props.type as CharacterType}
                zIndex={100 + index}
              />
            );
          case "sheet":
            const foundCharacter = characters.find( // Renomeado
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
          case "actionEdit":
            return null;
          case "hpControl":
            const selectedTokenForHP = tokensOnBoard.find( // Renomeado
              (t: Token) => t.id === props.tokenId
            );
            const characterForHPModal = selectedTokenForHP
              ? characters.find( // Renomeado
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
                  onHPChange={(tokenId, newHP) => { // Renomeado
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
