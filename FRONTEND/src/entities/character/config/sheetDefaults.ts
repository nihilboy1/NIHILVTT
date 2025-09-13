import { z } from 'zod';

import {
  type PlayerCharacter,
  type MonsterNpcCharacter,
  playerCharacterSchema,
} from '@/entities/character/model/schemas/character.schema';
import { generateUniqueId } from '@/shared/lib/utils/id/idUtils';

import defaultTokenImage from '../../../shared/assets/defaultToken.png';
const defaultAttributes = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};

type ProficienciesSchemaType = z.infer<typeof playerCharacterSchema>['proficiencies'];

const defaultProficiencies: ProficienciesSchemaType = {
  savingThrows: {
    strength: 'none',
    dexterity: 'none',
    constitution: 'none',
    intelligence: 'none',
    wisdom: 'none',
    charisma: 'none',
  },
  skills: {
    acrobatics: 'none',
    animalHandling: 'none',
    arcana: 'none',
    athletics: 'none',
    deception: 'none',
    history: 'none',
    insight: 'none',
    intimidation: 'none',
    investigation: 'none',
    medicine: 'none',
    nature: 'none',
    perception: 'none',
    performance: 'none',
    persuasion: 'none',
    religion: 'none',
    sleightOfHand: 'none',
    stealth: 'none',
    survival: 'none',
  },
};

export const DEFAULT_TOKEN_IMAGE = defaultTokenImage;

export const DEFAULT_PLAYER_DATA: Omit<PlayerCharacter, 'id' | 'type'> = {
  name: 'Novo Jogador',
  image: DEFAULT_TOKEN_IMAGE,
  size: 'medium',
  notes: '',
  attributes: defaultAttributes,
  proficiencies: defaultProficiencies,
  combatStats: {
    maxHp: 1,
    currentHp: 1,
    armorClass: 10,
    speed: 0,
    shieldEquipped: false,
    tempHp: 0,
  },
  level: 1,
  inspiration: false,
  charClass: '',
  subclass: '',
  background: '',
  species: '',
  actions: [],
  hitDiceEntries: [
    {
      id: generateUniqueId(),
      type: 'd6',
      quantity: 1,
    },
  ],
};

export const DEFAULT_MONSTER_DATA: Omit<MonsterNpcCharacter, 'id' | 'type'> = {
  name: 'Novo Monstro',
  image: DEFAULT_TOKEN_IMAGE,
  size: 'medium',
  notes: '',
  attributes: defaultAttributes,
  proficiencies: defaultProficiencies,
  combatStats: {
    maxHp: 1,
    currentHp: 1,
    armorClass: 10,
    speed: 0,
    shieldEquipped: false,
    tempHp: 0,
  },
  challengeRating: 1,
};
