import { z } from 'zod';

// =================================================================
// --- 1. ENUMS E TIPOS CONSTANTES ---
// Usados para garantir que apenas valores permitidos sejam usados.
// =================================================================

export const CharacterTypeEnum = z.enum(['Player', 'Monster/NPC', 'Object']);
export const TokenSizeEnum = z.enum(['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']);
export const HitDiceTypeEnum = z.enum(['d4', 'd6', 'd8', 'd10', 'd12', 'd20']);
export const ProficiencyLevelEnum = z.enum(['none', 'proficient', 'expertise']);

// =================================================================
// --- 2. SCHEMAS MODULAREs E REUTILIZÁVEIS ---
// Pequenas partes da ficha que são usadas em múltiplos lugares.
// =================================================================

const attributesSchema = z.object({
  strength: z.number().int().min(1).max(30),
  dexterity: z.number().int().min(1).max(30),
  constitution: z.number().int().min(1).max(30),
  intelligence: z.number().int().min(1).max(30),
  wisdom: z.number().int().min(1).max(30),
  charisma: z.number().int().min(1).max(30),
});

const proficienciesSchema = z.object({
  savingThrows: z.object({
    strength: ProficiencyLevelEnum,
    dexterity: ProficiencyLevelEnum,
    constitution: ProficiencyLevelEnum,
    intelligence: ProficiencyLevelEnum,
    wisdom: ProficiencyLevelEnum,
    charisma: ProficiencyLevelEnum,
  }),
  skills: z.object({
    acrobatics: ProficiencyLevelEnum,
    animalHandling: ProficiencyLevelEnum,
    arcana: ProficiencyLevelEnum,
    athletics: ProficiencyLevelEnum,
    deception: ProficiencyLevelEnum,
    history: ProficiencyLevelEnum,
    insight: ProficiencyLevelEnum,
    intimidation: ProficiencyLevelEnum,
    investigation: ProficiencyLevelEnum,
    medicine: ProficiencyLevelEnum,
    nature: ProficiencyLevelEnum,
    perception: ProficiencyLevelEnum,
    performance: ProficiencyLevelEnum,
    persuasion: ProficiencyLevelEnum,
    religion: ProficiencyLevelEnum,
    sleightOfHand: ProficiencyLevelEnum,
    stealth: ProficiencyLevelEnum,
    survival: ProficiencyLevelEnum,
  }),
});

const combatStatsSchema = z
  .object({
    maxHp: z.number().int().positive('HP Máximo deve ser maior que 0'),
    currentHp: z.number().int().min(0),
    tempHp: z.number().int().min(0).optional(),
    armorClass: z.number().int().min(1).max(40, 'Classe de Armadura deve ser entre 1 e 40'),
    speed: z.number().int().min(0, 'Velocidade não pode ser negativa'),
    shieldEquipped: z.boolean().optional(),
  })
  .refine((data) => data.currentHp <= data.maxHp, {
    message: 'O HP atual não pode ser maior que o HP máximo.',
    path: ['currentHp'], // Onde o erro será mostrado no formulário
  });

export const actionSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  bonus: z.string().or(z.number()).optional(),
  damage: z.string().or(z.number()).optional(),
});

const attackSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  attackBonus: z.string().or(z.number()).optional(),
  damage: z.string().or(z.number()).optional(),
});

const equipmentItemSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  quantity: z.number().int().min(0),
  description: z.string().optional(),
  weight: z.number().optional(),
  equipped: z.boolean().optional(),
});

const featureOrTraitSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  source: z.string().optional(),
  uses: z
    .object({
      current: z.number().int(),
      max: z.number().int(),
      per: z.string().optional(),
    })
    .optional(),
});

const hitDiceEntrySchema = z.object({
  id: z.uuid(),
  type: HitDiceTypeEnum,
  quantity: z.number().int().min(1),
});

// =================================================================
// --- 3. SCHEMAS BASE (PARA EVITAR REPETIÇÃO) ---
// =================================================================

// Schema base para QUALQUER personagem no VTT
const baseCharacterSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'O nome é obrigatório.'),
  image: z.string(),
  size: TokenSizeEnum,
  notes: z.string().optional(),
});

// Schema base para personagens de D&D (Players e Monstros)
const baseDndCharacterSchema = z.object({
  ...baseCharacterSchema.shape,
  attributes: attributesSchema,
  proficiencies: proficienciesSchema,
  combatStats: combatStatsSchema,
  actions: z.array(actionSchema).optional(),
  attacks: z.array(attackSchema).optional(),
  equipment: z.array(equipmentItemSchema).optional(),
  featuresAndTraits: z.array(featureOrTraitSchema).optional(),
});

// =================================================================
// --- 4. SCHEMAS FINAIS E ESPECÍFICOS POR TIPO ---
// =================================================================

// Schema para Personagens de Jogador
export const playerCharacterSchema = z.object({
  ...baseDndCharacterSchema.shape,
  type: z.literal(CharacterTypeEnum.enum.Player),
  level: z.number().int().min(1).max(20),
  inspiration: z.boolean(),
  charClass: z.string(),
  subclass: z.string(),
  background: z.string(),
  species: z.string(),
  hitDiceEntries: z.array(hitDiceEntrySchema),
});

// Schema para Monstros/NPCs
export const monsterNpcCharacterSchema = z.object({
  ...baseDndCharacterSchema.shape,
  type: z.literal(CharacterTypeEnum.enum['Monster/NPC']),
  challengeRating: z.number(),
});

// Schema para Objetos
export const objectCharacterSchema = z.object({
  ...baseCharacterSchema.shape,
  type: z.literal(CharacterTypeEnum.enum.Object),
  isInteractive: z.boolean().optional(),
});

// =================================================================
// --- 5. UNIÃO DISCRIMINADA E TIPOS INFERIDOS ---
// Onde tudo se junta para formar o modelo final.
// =================================================================

export const characterSchema = z.discriminatedUnion('type', [
  playerCharacterSchema,
  monsterNpcCharacterSchema,
  objectCharacterSchema,
]);

// --- Tipos TypeScript exportados para uso na aplicação ---
export type PlayerCharacter = z.infer<typeof playerCharacterSchema>;
export type MonsterNpcCharacter = z.infer<typeof monsterNpcCharacterSchema>;
export type ObjectCharacter = z.infer<typeof objectCharacterSchema>;
export type Character = z.infer<typeof characterSchema>;
export type Action = z.infer<typeof actionSchema>; // Exportar o tipo Action

// --- Tipos Auxiliares para Proficiências (se necessário) ---
type SkillName = keyof z.infer<typeof proficienciesSchema>['skills'];
type SavingThrowName = keyof z.infer<typeof proficienciesSchema>['savingThrows'];

export type ProficiencyPath =
  | `proficiencies.skills.${SkillName}`
  | `proficiencies.savingThrows.${SavingThrowName}`;

export type HitDiceEntry = z.infer<typeof hitDiceEntrySchema>;

export type CharacterType = z.infer<typeof CharacterTypeEnum>;

export const characterTypeTranslations: Record<CharacterType, string> = {
  Player: 'Jogador',
  'Monster/NPC': 'Monstro/NPC',
  Object: 'Objeto',
};
// Esta constante pode ser usada para gerar opções em selects se necessário.
export const CHARACTER_TYPES_OPTIONS = CharacterTypeEnum.options.map((type) => ({
  value: type,
  label: characterTypeTranslations[type],
}));
