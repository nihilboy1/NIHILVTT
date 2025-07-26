import { CharacterTypeEnum } from '@/entities/character/model/schemas/character.schema';
import { useCharactersStore } from '@/entities/character/model/store';

export function usePlayerCharacter(characterId: string) {
  const { characters } = useCharactersStore();
  const character = characters.find((char) => char.id === characterId);

  if (!character || character.type !== CharacterTypeEnum.enum.Player) {
    return null;
  }
  return character;
}
