export interface AttributeData {
  id: keyof Attributes;
  name: string;
  abbr: string;
}

export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export const DEFAULT_ATTRIBUTES: Attributes = {
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8,
};

export const ATTRIBUTE_LIST: AttributeData[] = [
  { id: 'strength', name: 'Força', abbr: 'FOR' },
  { id: 'dexterity', name: 'Destreza', abbr: 'DES' },
  { id: 'constitution', name: 'Constituição', abbr: 'CON' },
  { id: 'intelligence', name: 'Inteligência', abbr: 'INT' },
  { id: 'wisdom', name: 'Sabedoria', abbr: 'SAB' },
  { id: 'charisma', name: 'Carisma', abbr: 'CAR' },
];

// Tabela de custo do Point Buy
export const ATTRIBUTE_COST = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};
