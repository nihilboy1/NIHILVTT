import { PHB2024CLASSES } from '@nihilvtt/datamodeling/data';

export interface CharacterClass {
  id: string;
  name: string;
  description: string;
}

const resolveClassName = (name: string[]): string => {
  if (name.length > 1 && name[1]) {
    return name[1];
  }
  return name[0] ?? 'Classe';
};

export const CLASSES: CharacterClass[] = PHB2024CLASSES.map((characterClass) => ({
  id: characterClass.id,
  name: resolveClassName(characterClass.name),
  description: characterClass.description,
}));
