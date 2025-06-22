import { type PlayerToken } from '../types/index'; // Ajustar o caminho do tipo

export const SKILLS_CONFIG: {
  key: string;
  label: string;
  parentAttribute: keyof NonNullable<PlayerToken["attributes"]>;
}[] = [
  { key: "acrobatics", label: "Acrobacia", parentAttribute: "dexterity" },
  {
    key: "animalHandling",
    label: "Lidar com Animais",
    parentAttribute: "wisdom",
  },
  { key: "arcana", label: "Arcanismo", parentAttribute: "intelligence" },
  { key: "athletics", label: "Atletismo", parentAttribute: "strength" },
  { key: "deception", label: "Enganação", parentAttribute: "charisma" },
  { key: "history", label: "História", parentAttribute: "intelligence" },
  { key: "insight", label: "Intuição", parentAttribute: "wisdom" },
  { key: "intimidation", label: "Intimidação", parentAttribute: "charisma" },
  {
    key: "investigation",
    label: "Investigação",
    parentAttribute: "intelligence",
  },
  { key: "medicine", label: "Medicina", parentAttribute: "wisdom" },
  { key: "nature", label: "Natureza", parentAttribute: "intelligence" },
  { key: "perception", label: "Percepção", parentAttribute: "wisdom" },
  { key: "performance", label: "Atuação", parentAttribute: "charisma" },
  { key: "persuasion", label: "Persuasão", parentAttribute: "charisma" },
  { key: "religion", label: "Religião", parentAttribute: "intelligence" },
  {
    key: "sleightOfHand",
    label: "Prestidigitação",
    parentAttribute: "dexterity",
  },
  { key: "stealth", label: "Furtividade", parentAttribute: "dexterity" },
  { key: "survival", label: "Sobrevivência", parentAttribute: "wisdom" },
];

export const ATTRIBUTE_LABELS: Record<keyof NonNullable<PlayerToken["attributes"]>, string> = {
  strength: 'FORÇA',
  dexterity: 'DESTREZA',
  constitution: 'CONSTITUIÇÃO',
  intelligence: 'INTELIGÊNCIA',
  wisdom: 'SABEDORIA',
  charisma: 'CARISMA',
};

export const defaultAttributes: NonNullable<PlayerToken["attributes"]> = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};
export const defaultSavingThrows: NonNullable<
  PlayerToken["proficiencies"]
>["savingThrows"] = {
  strength: false,
  dexterity: false,
  constitution: false,
  intelligence: false,
  wisdom: false,
  charisma: false,
};
export const defaultSkills: NonNullable<PlayerToken["proficiencies"]>["skills"] = {
  acrobatics: false,
  animalHandling: false,
  arcana: false,
  athletics: false,
  deception: false,
  history: false,
  insight: false,
  intimidation: false,
  investigation: false,
  medicine: false,
  nature: false,
  perception: false,
  performance: false,
  persuasion: false,
  religion: false,
  sleightOfHand: false,
  stealth: false,
  survival: false,
};
