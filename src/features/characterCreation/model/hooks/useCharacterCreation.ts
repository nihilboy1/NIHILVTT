import { useCharacters } from "../../../../entities/character/model/contexts/CharactersContext";
import { useModal } from "../../../modalManager/model/contexts/ModalProvider";
import {
  CharacterType,
  type Character,
  type PlayerCharacter,
  type MonsterNPCCharacter,
} from "../../../../shared/api/types";
import {
  DEFAULT_TOKEN_SIZE,
} from "../../../../shared/config/constants";
import { DEFAULT_TOKEN_IMAGE } from "../../../../shared/config/sheetDefaults";
import {
  DEFAULT_CHARACTER_DATA,
  DEFAULT_MONSTER_NPC_DATA,
} from "../../../../shared/config/sheetDefaults";

export const useCharacterCreation = () => {
  const { addCharacter } = useCharacters();
  const { openModal, closeModal } = useModal();

  const handleCreateCharacter = (name: string, characterType: CharacterType) => {
    let newSheetData: Omit<Character, "id">;

    if (characterType === CharacterType.PLAYER) {
      newSheetData = {
        ...DEFAULT_CHARACTER_DATA,
        name: name,
        type: CharacterType.PLAYER,
      } as Omit<PlayerCharacter, "id">;
    } else if (characterType === CharacterType.MONSTER_NPC) {
      newSheetData = {
        ...DEFAULT_MONSTER_NPC_DATA,
        name: name,
        type: CharacterType.MONSTER_NPC,
      } as Omit<MonsterNPCCharacter, "id">;
    } else {
      // For CharacterType.OBJECT or other future types
      newSheetData = {
        name: name,
        type: characterType,
        image: DEFAULT_TOKEN_IMAGE,
        size: DEFAULT_TOKEN_SIZE,
        notes: "",
      } as Omit<Character, "id">;
    }
    const newCharacter = addCharacter(newSheetData);
    closeModal(); // Closes the 'simpleName' modal
    openModal("sheet", { characterId: newCharacter.id }, false); // Opens the character sheet
  };

  return { handleCreateCharacter };
};
