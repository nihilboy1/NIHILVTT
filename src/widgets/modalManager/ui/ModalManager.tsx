import { HPControlModal } from "../../../features/characterUpdateHp/ui/HPControlModal";

import { useCharacters } from "../../../entities/character/model/contexts/CharactersContext"; // Renomeado
import { SimpleNameModal } from "../../../features/characterCreation/ui/SimpleNameModal";
import {
  CharacterType,
  type Character,
  type PlayerCharacter,
  type MonsterNPCCharacter, // Adicionado
  type Token,
} from "../../../shared/api/types";
import {
  DEFAULT_TOKEN_SIZE,
} from "../../../shared/config/constants";
import { DEFAULT_TOKEN_IMAGE, DEFAULT_CHARACTER_DATA, DEFAULT_MONSTER_NPC_DATA } from "../../../shared/config/sheetDefaults"; // Adicionado DEFAULT_MONSTER_NPC_DATA
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
        ...DEFAULT_CHARACTER_DATA,
        name: name,
        type: CharacterType.PLAYER,
      } as Omit<PlayerCharacter, "id">;
    } else if (typeToUse === CharacterType.MONSTER_NPC) {
      newSheetData = {
        ...DEFAULT_MONSTER_NPC_DATA,
        name: name,
        type: CharacterType.MONSTER_NPC,
      } as Omit<MonsterNPCCharacter, "id">;
    } else {
      // Para CharacterType.OBJECT ou outros tipos futuros
      newSheetData = {
        name: name,
        type: typeToUse,
        image: DEFAULT_TOKEN_IMAGE,
        size: DEFAULT_TOKEN_SIZE,
        notes: "",
        // Objetos podem ter uma estrutura mais simples
        // Se houver um DEFAULT_OBJECT_DATA, ele seria usado aqui
      } as Omit<Character, "id">;
    }
    const newCharacter = addCharacter(newSheetData);
    closeModal();
    openModal("sheet", { characterId: newCharacter.id }, false); // Abrir ficha como não dismissible
  };


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
        const { name, props } = modalEntry;
        const isTopModal = index === modalStack.length - 1;


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
