import { z } from 'zod';


export const CharacterType = {
  PLAYER: "Player",
  MONSTER_NPC: "Monster/NPC",
  OBJECT: "Object",
} as const;

const proficienciesSchema = z.object({
  savingThrows: z.object({
    strength: z.boolean(),
    dexterity: z.boolean(),
    constitution: z.boolean(),
    intelligence: z.boolean(),
    wisdom: z.boolean(),
    charisma: z.boolean(),
  }),
  skills: z.object({
    acrobatics: z.boolean(),
    animalHandling: z.boolean(),
    arcana: z.boolean(),
    athletics: z.boolean(),
    deception: z.boolean(),
    history: z.boolean(),
    insight: z.boolean(),
    intimidation: z.boolean(),
    investigation: z.boolean(),
    medicine: z.boolean(),
    nature: z.boolean(),
    perception: z.boolean(),
    performance: z.boolean(),
    persuasion: z.boolean(),
    religion: z.boolean(),
    sleightOfHand: z.boolean(),
    stealth: z.boolean(),
    survival: z.boolean(),
  }),
});

// Schema para os atributos (ex: Força, Destreza)
const attributesSchema = z.object({
  strength: z.number().min(0),
  dexterity: z.number().min(0),
  constitution: z.number().min(0),
  intelligence: z.number().min(0),
  wisdom: z.number().min(0),
  charisma: z.number().min(0),
});

// NOVO: Schema para Ataques
const attackSchema = z.object({
  id: z.string(),
  name: z.string(),
  attackBonus: z.string().or(z.number()).optional(),
  damage: z.string().or(z.number()).optional(),
});

// NOVO: Schema para Itens de Equipamento
const equipmentItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  description: z.string().optional(),
  weight: z.number().optional(),
  equipped: z.boolean().optional(),
});

// NOVO: Schema para Características e Talentos
const featureOrTraitSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  source: z.string().optional(),
  uses: z.object({
    current: z.number(),
    max: z.number(),
    per: z.string().optional(),
  }).optional(),
});

// NOVO: Schema para uma única Ação/Ataque
const actionSchema = z.object({
  id: z.string(),
  name: z.string(),
  bonus: z.string().or(z.number()).optional(), // Pode ser string como "1d4+2" ou um número
  damage: z.string().or(z.number()).optional(),
});

const hitDiceEntrySchema = z.object({
  id: z.string(),
  type: z.string(), // Ex: "d6", "d8"
  quantity: z.number().min(1),
});

// Schema para os status de combate
const combatStatsSchema = z.object({
  maxHp: z.number().positive("HP Máximo deve ser maior que 0"),
  currentHp: z.number().min(0),
  armorClass: z.number().min(0, "Classe de Armadura não pode ser negativa"),
  speed: z.number().min(0, "Velocidade não pode ser negativa"),
  shieldEquipped: z.boolean(), // <-- CAMPO ADICIONADO
  tempHp: z.number().min(0).optional(), // <-- CAMPO ADICIONADO


});

// 1. Schema para Monstros/NPCs
export const monsterNpcCharacterSchema = z.object({
  id: z.string(),
  type: z.literal(CharacterType.MONSTER_NPC),
  name: z.string().min(1),
  image: z.string(),
  size: z.string(),
  notes: z.string().optional(),
  attributes: attributesSchema,
  proficiencyBonus: z.number(),
  proficiencies: proficienciesSchema,
  combatStats: combatStatsSchema,
  challengeRating: z.number(),
  actions: z.array(actionSchema).optional(),
  attacks: z.array(attackSchema).optional(),
  equipment: z.array(equipmentItemSchema).optional(),
  featuresAndTraits: z.array(featureOrTraitSchema).optional(),
});

// 2. Schema para Objetos
export const objectCharacterSchema = z.object({
  id: z.string(),
  type: z.literal(CharacterType.OBJECT),
  name: z.string().min(1),
  image: z.string(),
  size: z.string(),
  notes: z.string().optional(),
  isInteractive: z.boolean().optional(),
});





// Schema principal para um PlayerCharacter
export const playerCharacterSchema = z.object({
  id: z.string(),
  type: z.literal(CharacterType.PLAYER), // Garante que o tipo é sempre 'PLAYER'
  name: z.string().min(1, "O nome do personagem é obrigatório."),
  image: z.string(), // Deve ser uma URL válida ou uma string vazia
  size: z.string(), // Poderia ser um z.enum(['small', 'medium', ...]) no futuro
  notes: z.string(),
  
  // Objetos aninhados
  attributes: attributesSchema,
  combatStats: combatStatsSchema,
  proficiencies: proficienciesSchema,

  // Arrays

  actions: z.array(actionSchema),
  hitDiceEntries: z.array(hitDiceEntrySchema),

  // Campos específicos de PlayerCharacter
  inspiration: z.boolean(),
  level: z.number().min(1),

  charClass: z.string(), 
  subclass: z.string(),
  background: z.string(),
  species: z.string(),
  // -------------------------
});

type SkillName = keyof z.infer<typeof proficienciesSchema>['skills'];
type SavingThrowName = keyof z.infer<typeof proficienciesSchema>['savingThrows'];

// Cria um tipo que representa todos os caminhos de proficiência válidos
export type ProficiencyPath = 
  | `proficiencies.skills.${SkillName}` 
  | `proficiencies.savingThrows.${SavingThrowName}`;

// 4. Os tipos inferidos que usaremos em toda a aplicação
export type PlayerCharacterSchema = z.infer<typeof playerCharacterSchema>;
export type MonsterNpcCharacterSchema = z.infer<typeof monsterNpcCharacterSchema>;
export type ObjectCharacterSchema = z.infer<typeof objectCharacterSchema>;

// 3. A união de todos os schemas de personagem
export const characterSchema = z.discriminatedUnion("type", [
  playerCharacterSchema,
  monsterNpcCharacterSchema,
  objectCharacterSchema,
]);

export type CharacterSchema = z.infer<typeof characterSchema>; // <-- O NOVO TIPO 'Character'
