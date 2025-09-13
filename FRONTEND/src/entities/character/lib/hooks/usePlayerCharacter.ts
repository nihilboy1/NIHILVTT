import { useCharactersStore } from '@/entities/character/model/store';
import { CharacterTypeEnum } from 'node_modules/@nihilvtt/datamodeling/src/shared/primitives/character.primitives';

export function usePlayerCharacter(characterId: string) {
  const { characters } = useCharactersStore();
  const character = characters.find((char) => char.id === characterId);

  if (!character || character.type !== CharacterTypeEnum.enum.Player) {
    return null;
  }
  return character;
}
