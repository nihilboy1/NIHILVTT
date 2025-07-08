import { PlayerCharacter, MonsterNPCCharacter } from "../api/types";
import defaultTokenImage from "../assets/defaultToken.png"; // Importar a imagem diretamente

export const SKILLS_CONFIG: {
  key: string;
  label: string;
  parentAttribute: keyof NonNullable<PlayerCharacter["attributes"]>;
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

export const ATTRIBUTE_LABELS: Record<
  keyof NonNullable<PlayerCharacter["attributes"]>,
  string
> = {
  strength: "FORÇA",
  dexterity: "DESTREZA",
  constitution: "CONSTITUIÇÃO",
  intelligence: "INTELIGÊNCIA",
  wisdom: "SABEDORIA",
  charisma: "CARISMA",
};

export const defaultAttributes: NonNullable<PlayerCharacter["attributes"]> = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};
export const defaultSavingThrows: NonNullable<
  PlayerCharacter["proficiencies"]
>["savingThrows"] = {
  strength: false,
  dexterity: false,
  constitution: false,
  intelligence: false,
  wisdom: false,
  charisma: false,
};

export const DEFAULT_TOKEN_IMAGE = defaultTokenImage; // Usar a URL processada pelo Vite

export const defaultSkills: NonNullable<
  PlayerCharacter["proficiencies"]
>["skills"] = {
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

export const DEFAULT_CHARACTER_DATA: Omit<PlayerCharacter, "id" | "type"> = { // Removido 'type'
  name: "Novo Personagem",
  image: DEFAULT_TOKEN_IMAGE,
  size: "medium",
  notes: "",
  attributes: defaultAttributes,
  proficiencyBonus: 2,
  proficiencies: {
    savingThrows: defaultSavingThrows,
    skills: defaultSkills,
  },
  combatStats: {
    maxHp: 10,
    currentHp: 10,
    armorClass: 10,
    speed: 30,
    initiative: 0,
    passivePerception: 10,
    shieldEquipped: false,
  },
  // Campos específicos de PlayerCharacter que são obrigatórios ou têm valores padrão
  level: 1, // Nível padrão
  xp: 0,
  inspiration: false,
  hitDiceUsed: 0,
  hitDiceMax: 1, // Exemplo de dado de vida inicial
  deathSavesSuccesses: 0,
  deathSavesFailures: 0,
  hitDiceEntries: [{ id: crypto.randomUUID(), type: "d6", quantity: 1 }], // Exemplo de entrada de dado de vida
  
  // Arrays vazios para evitar undefined
  actions: [],
  attacks: [],
  equipment: [],
  featuresAndTraits: [],
};

export const DEFAULT_MONSTER_NPC_DATA: Omit<MonsterNPCCharacter, "id" | "type"> = { // Removido 'type'
  name: "Novo Monstro/NPC",
  image: DEFAULT_TOKEN_IMAGE,
  size: "medium",
  notes: "",
  attributes: defaultAttributes, // Monstros também têm atributos
  proficiencyBonus: 2, // Bônus de proficiência padrão para CR 0-4
  proficiencies: {
    savingThrows: defaultSavingThrows,
    skills: defaultSkills,
  },
  combatStats: {
    maxHp: 10,
    currentHp: 10,
    armorClass: 10,
    speed: 30,
    initiative: 0,
    passivePerception: 10,
    shieldEquipped: false,
  },
  challengeRating: 0, // CR padrão
  actions: [],
  attacks: [],
  equipment: [],
  featuresAndTraits: [],
};
