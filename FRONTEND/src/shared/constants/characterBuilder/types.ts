// Tipos para o construtor de personagens
export type Attributes = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type Selection = {
  species?: string;
  background?: string;
  class?: string;
  attributes?: Attributes;
};

export type Step = 'species' | 'background' | 'class' | 'attributes';

export type CharacterOption = {
  id: string;
  name: string;
  description: string;
};

export type AttributeInfo = {
  id: keyof Attributes;
  name: string;
  abbr: string;
};
