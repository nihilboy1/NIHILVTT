// src/shared/config/sheetDefaults.ts

// 1. Importamos os tipos INFERIDOS do Zod, nossa nova fonte da verdade.
import {
  type PlayerCharacterSchema,
  type MonsterNpcCharacterSchema,
} from "@/entities/character/model/schemas/character.schema";
import defaultTokenImage from "../assets/defaultToken.png";

// A maioria dos seus padrões de atributos e perícias pode continuar como está,
// pois a estrutura interna não mudou.
const defaultAttributes = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};

const defaultProficiencies = {
  savingThrows: {
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false,
  },
  skills: {
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
  },
};

export const DEFAULT_TOKEN_IMAGE = defaultTokenImage;

// 2. Criamos o novo objeto de dados padrão para PLAYER, usando o tipo do Zod.
// Note a ausência de proficiencyBonus, xp, deathSaves, etc.
export const DEFAULT_PLAYER_DATA: Omit<PlayerCharacterSchema, "id" | "type"> = {
  name: "Novo Jogador",
  image: DEFAULT_TOKEN_IMAGE,
  size: "medium",
  notes: "",
  attributes: defaultAttributes,
  proficiencies: defaultProficiencies,
  combatStats: {
    maxHp: 10,
    currentHp: 10,
    armorClass: 10,
    speed: 30,
    shieldEquipped: false,
    tempHp: 0,
  },
  level: 1,
  inspiration: false,
  charClass: "Guerreiro", // Adicionado valores padrão para campos obrigatórios
  subclass: "",
  background: "",
  species: "Humano",
  actions: [],
  hitDiceEntries: [],
};

// 3. Criamos o novo objeto de dados padrão para MONSTRO, usando o tipo do Zod.
export const DEFAULT_MONSTER_DATA: Omit<
  MonsterNpcCharacterSchema,
  "id" | "type"
> = {
  name: "Novo Monstro",
  image: DEFAULT_TOKEN_IMAGE,
  proficiencyBonus: 2, // <-- ADICIONE ESTA LINHA DE VOLTA

  size: "medium",
  notes: "",
  attributes: defaultAttributes,
  proficiencies: defaultProficiencies,
  combatStats: {
    maxHp: 10,
    currentHp: 10,
    armorClass: 10,
    speed: 30,
    shieldEquipped: false,
    tempHp: 0,
  },
  challengeRating: 1,
  // Note a ausência de proficiencyBonus
};
