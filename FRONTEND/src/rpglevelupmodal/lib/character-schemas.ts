import { z } from 'zod';

// =================================================================
// --- ENUMS AND CONSTANTS ---
// =================================================================

export const CharacterTypeEnum = z.enum(['Player', 'Monster/NPC', 'Object']);
export const TokenSizeEnum = z.enum(['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']);
export const HitDiceTypeEnum = z.enum(['d4', 'd6', 'd8', 'd10', 'd12', 'd20']);
export const ProficiencyLevelEnum = z.enum(['none', 'proficient', 'expertise']);

// =================================================================
// --- GAME DATA SCHEMAS ---
// =================================================================

// Ability Scores
export const AbilityScoreEnum = z.enum(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']);

// Skills with their associated abilities
export const SkillsEnum = z.enum([
  'acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception', 'history',
  'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception',
  'performance', 'persuasion', 'religion', 'sleightOfHand', 'stealth', 'survival'
]);

// Equipment Types
export const EquipmentTypeEnum = z.enum(['weapon', 'armor', 'shield', 'tool', 'gear', 'consumable', 'currency']);

// Fighting Styles
export const FightingStyleEnum = z.enum([
  'archery', 'defense', 'dueling', 'great-weapon-fighting', 'protection', 'two-weapon-fighting'
]);

// =================================================================
// --- CORE SCHEMAS ---
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

const combatStatsSchema = z.object({
  maxHp: z.number().int().positive(),
  currentHp: z.number().int().min(0),
  tempHp: z.number().int().min(0).optional(),
  armorClass: z.number().int().min(1).max(40),
  speed: z.number().int().min(0),
  shieldEquipped: z.boolean().optional(),
}).refine((data) => data.currentHp <= data.maxHp, {
  message: 'Current HP cannot exceed maximum HP',
  path: ['currentHp'],
});

const hitDiceEntrySchema = z.object({
  id: z.string().uuid(),
  type: HitDiceTypeEnum,
  quantity: z.number().int().min(1),
});

// Class Features
const classFeatureSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  level: z.number().int().min(1).max(20),
  uses: z.object({
    current: z.number().int(),
    max: z.number().int(),
    per: z.enum(['short-rest', 'long-rest', 'day', 'unlimited']).optional(),
  }).optional(),
});

// Equipment
const equipmentItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: EquipmentTypeEnum,
  quantity: z.number().int().min(0),
  description: z.string().optional(),
  weight: z.number().optional(),
  equipped: z.boolean().optional(),
  properties: z.array(z.string()).optional(),
  // Armor specific
  armorClass: z.number().optional(),
  armorType: z.enum(['light', 'medium', 'heavy', 'shield']).optional(),
  // Weapon specific
  damage: z.string().optional(),
  damageType: z.string().optional(),
  weaponType: z.enum(['simple', 'martial']).optional(),
  range: z.string().optional(),
  // Currency
  value: z.number().optional(),
  currency: z.enum(['cp', 'sp', 'ep', 'gp', 'pp']).optional(),
});

// Feats
const featSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  source: z.string(),
  prerequisite: z.string().optional(),
});

// =================================================================
// --- CHARACTER SCHEMA ---
// =================================================================

export const playerCharacterSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  image: z.string(),
  size: TokenSizeEnum,
  notes: z.string().optional(),
  type: z.literal(CharacterTypeEnum.enum.Player),
  level: z.number().int().min(1).max(20),
  experience: z.number().int().min(0).optional(),
  inspiration: z.boolean(),
  
  // Character basics
  species: z.string(), // e.g., "Human"
  charClass: z.string(), // e.g., "Fighter"
  subclass: z.string().optional(), // e.g., "Champion"
  background: z.string(), // e.g., "Soldier"
  
  // Core stats
  attributes: attributesSchema,
  proficiencies: proficienciesSchema,
  combatStats: combatStatsSchema,
  hitDiceEntries: z.array(hitDiceEntrySchema),
  
  // Character features
  classFeatures: z.array(classFeatureSchema).optional(),
  feats: z.array(featSchema).optional(),
  equipment: z.array(equipmentItemSchema).optional(),
  
  // Class-specific data
  fightingStyle: FightingStyleEnum.optional(),
  weaponMasteries: z.array(z.string()).optional(), // Array of weapon names
  
  // Tracking resources
  secondWindUses: z.object({
    current: z.number().int().min(0),
    max: z.number().int().min(0),
  }).optional(),
  actionSurgeUses: z.object({
    current: z.number().int().min(0),
    max: z.number().int().min(0),
  }).optional(),
});

// =================================================================
// --- GAME DATA DEFINITIONS ---
// =================================================================

// Species definitions
export const speciesDefinitions = {
  human: {
    id: 'human',
    name: 'Human',
    description: 'Versatile and ambitious, humans are the most adaptable of the common races.',
    traits: [
      {
        name: 'Resourceful',
        description: 'You gain Heroic Inspiration whenever you finish a Long Rest.'
      },
      {
        name: 'Skillful',
        description: 'You gain proficiency in one skill of your choice.'
      },
      {
        name: 'Versatile',
        description: 'You gain an Origin feat of your choice.'
      }
    ],
    size: ['Medium', 'Small'], // Player chooses
    speed: 30,
    abilityScoreIncreases: [], // None in 2024 rules
    languages: ['Common'], // Plus one additional
  }
};

// Class definitions
export const classDefinitions = {
  fighter: {
    id: 'fighter',
    name: 'Fighter',
    description: 'A master of martial combat, skilled with a variety of weapons and armor.',
    hitDie: 'd10' as const,
    primaryAbility: ['Strength', 'Dexterity'],
    savingThrowProficiencies: ['strength', 'constitution'],
    skillChoices: {
      count: 2,
      options: ['acrobatics', 'animalHandling', 'athletics', 'history', 'insight', 'intimidation', 'persuasion', 'perception', 'survival']
    },
    weaponProficiencies: ['simple', 'martial'],
    armorProficiencies: ['light', 'medium', 'heavy', 'shields'],
    features: {
      1: [
        {
          name: 'Fighting Style',
          description: 'You have honed your martial prowess and gain a Fighting Style feat of your choice.'
        },
        {
          name: 'Second Wind',
          description: 'You can use a Bonus Action to regain 1d10 + Fighter level Hit Points. You can use this feature twice, regaining uses on Short/Long Rest.',
          uses: { max: 2, per: 'short-rest' }
        },
        {
          name: 'Weapon Mastery',
          description: 'You can use the mastery properties of 3 kinds of Simple or Martial weapons.',
          count: 3
        }
      ],
      2: [
        {
          name: 'Action Surge',
          description: 'You can take one additional action on your turn. Once per Short/Long Rest.',
          uses: { max: 1, per: 'short-rest' }
        },
        {
          name: 'Tactical Mind',
          description: 'When you fail an ability check, you can expend a use of Second Wind to add 1d10 to the check.'
        }
      ],
      3: [
        {
          name: 'Fighter Subclass',
          description: 'You gain a Fighter subclass of your choice.'
        }
      ]
    }
  }
};

// Background definitions
export const backgroundDefinitions = {
  soldier: {
    id: 'soldier',
    name: 'Soldier',
    description: 'You have served in a military organization, learning discipline and combat skills.',
    abilityScores: ['Strength', 'Dexterity', 'Constitution'],
    feat: 'Savage Attacker',
    skillProficiencies: ['athletics', 'intimidation'],
    toolProficiencies: ['gaming-set'], // Player chooses specific type
    equipment: {
      optionA: [
        'Spear', 'Shortbow', '20 Arrows', 'Gaming Set', "Healer's Kit", 'Quiver', "Traveler's Clothes", '14 GP'
      ],
      optionB: ['50 GP']
    }
  }
};

// Fighting Styles
export const fightingStyles = {
  defense: {
    name: 'Defense',
    description: 'While you are wearing armor, you gain a +1 bonus to AC.'
  },
  dueling: {
    name: 'Dueling',
    description: 'When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.'
  },
  'great-weapon-fighting': {
    name: 'Great Weapon Fighting',
    description: 'When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll.'
  },
  archery: {
    name: 'Archery',
    description: 'You gain a +2 bonus to attack rolls you make with ranged weapons.'
  },
  protection: {
    name: 'Protection',
    description: 'When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll.'
  },
  'two-weapon-fighting': {
    name: 'Two-Weapon Fighting',
    description: 'When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.'
  }
};

// Equipment Definitions
export const fighterStartingEquipment = {
  optionA: [
    { name: 'Chain Mail', type: 'armor', armorClass: 16, armorType: 'heavy', weight: 55 },
    { name: 'Greatsword', type: 'weapon', weaponType: 'martial', damage: '2d6', damageType: 'slashing', weight: 6, properties: ['Two-handed'] },
    { name: 'Flail', type: 'weapon', weaponType: 'martial', damage: '1d8', damageType: 'bludgeoning', weight: 2 },
    { name: 'Javelin', type: 'weapon', weaponType: 'simple', damage: '1d6', damageType: 'piercing', weight: 2, quantity: 8, range: '30/120', properties: ['Thrown'] },
    { name: "Dungeoneer's Pack", type: 'gear', weight: 61.5 },
    { name: 'Gold Pieces', type: 'currency', value: 4, currency: 'gp', quantity: 4 }
  ],
  optionB: [
    { name: 'Studded Leather Armor', type: 'armor', armorClass: 12, armorType: 'light', weight: 13 },
    { name: 'Scimitar', type: 'weapon', weaponType: 'martial', damage: '1d6', damageType: 'slashing', weight: 3, properties: ['Finesse', 'Light'] },
    { name: 'Shortsword', type: 'weapon', weaponType: 'martial', damage: '1d6', damageType: 'piercing', weight: 2, properties: ['Finesse', 'Light'] },
    { name: 'Longbow', type: 'weapon', weaponType: 'martial', damage: '1d8', damageType: 'piercing', weight: 2, range: '150/600', properties: ['Two-handed'] },
    { name: 'Arrow', type: 'consumable', quantity: 20, weight: 0.05 },
    { name: 'Quiver', type: 'gear', weight: 1 },
    { name: "Dungeoneer's Pack", type: 'gear', weight: 61.5 },
    { name: 'Gold Pieces', type: 'currency', value: 11, currency: 'gp', quantity: 11 }
  ],
  optionC: [
    { name: 'Gold Pieces', type: 'currency', value: 155, currency: 'gp', quantity: 155 }
  ]
};

export const soldierBackgroundEquipment = {
  optionA: [
    { name: 'Spear', type: 'weapon', weaponType: 'simple', damage: '1d6', damageType: 'piercing', weight: 3, range: '20/60', properties: ['Thrown', 'Versatile'] },
    { name: 'Shortbow', type: 'weapon', weaponType: 'simple', damage: '1d6', damageType: 'piercing', weight: 2, range: '80/320', properties: ['Two-handed'] },
    { name: 'Arrow', type: 'consumable', quantity: 20, weight: 0.05 },
    { name: 'Gaming Set', type: 'tool', weight: 0 },
    { name: "Healer's Kit", type: 'gear', weight: 3 },
    { name: 'Quiver', type: 'gear', weight: 1 },
    { name: "Traveler's Clothes", type: 'gear', weight: 4 },
    { name: 'Gold Pieces', type: 'currency', value: 14, currency: 'gp', quantity: 14 }
  ],
  optionB: [
    { name: 'Gold Pieces', type: 'currency', value: 50, currency: 'gp', quantity: 50 }
  ]
};

// =================================================================
// --- UTILITY FUNCTIONS ---
// =================================================================

export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function getProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

export function calculateHitPointsAtLevel(
  characterClass: string, 
  level: number, 
  constitutionModifier: number
): number {
  const hitDie = classDefinitions[characterClass as keyof typeof classDefinitions]?.hitDie;
  if (!hitDie) return 8; // Default
  
  const baseHp = hitDie === 'd6' ? 6 : 
                 hitDie === 'd8' ? 8 : 
                 hitDie === 'd10' ? 10 : 
                 hitDie === 'd12' ? 12 : 8;
  
  // Level 1: Max hit die + Con modifier
  // Subsequent levels: Average hit die + Con modifier
  const level1Hp = baseHp + constitutionModifier;
  const averageHpPerLevel = Math.floor(baseHp / 2) + 1 + constitutionModifier;
  const additionalLevels = level - 1;
  
  return level1Hp + (additionalLevels * averageHpPerLevel);
}

export function calculateArmorClass(
  character: { 
    attributes: { dexterity: number };
    equipment?: Array<{ 
      type: string; 
      equipped?: boolean; 
      armorClass?: number; 
      armorType?: string 
    }>;
    fightingStyle?: string;
  }
): number {
  const dexMod = getAbilityModifier(character.attributes.dexterity);
  let baseAC = 10 + dexMod;
  
  // Find equipped armor
  const equippedArmor = character.equipment?.find(item => 
    item.type === 'armor' && item.equipped && item.armorClass
  );
  
  if (equippedArmor && equippedArmor.armorClass) {
    switch (equippedArmor.armorType) {
      case 'light':
        baseAC = equippedArmor.armorClass + dexMod;
        break;
      case 'medium':
        baseAC = equippedArmor.armorClass + Math.min(2, dexMod);
        break;
      case 'heavy':
        baseAC = equippedArmor.armorClass;
        break;
      default:
        baseAC = equippedArmor.armorClass + dexMod;
    }
  }
  
  // Defense fighting style bonus
  if (character.fightingStyle === 'defense' && equippedArmor) {
    baseAC += 1;
  }
  
  // Check for equipped shield
  const hasShield = character.equipment?.some(item => 
    item.type === 'armor' && item.armorType === 'shield' && item.equipped
  );
  
  if (hasShield) {
    baseAC += 2;
  }
  
  return baseAC;
}

// =================================================================
// --- TYPE EXPORTS ---
// =================================================================

export type PlayerCharacter = z.infer<typeof playerCharacterSchema>;
export type Attributes = z.infer<typeof attributesSchema>;
export type Proficiencies = z.infer<typeof proficienciesSchema>;
export type CombatStats = z.infer<typeof combatStatsSchema>;
export type HitDiceEntry = z.infer<typeof hitDiceEntrySchema>;
export type ClassFeature = z.infer<typeof classFeatureSchema>;
export type EquipmentItem = z.infer<typeof equipmentItemSchema>;
export type Feat = z.infer<typeof featSchema>;

export type AbilityScore = z.infer<typeof AbilityScoreEnum>;
export type Skill = z.infer<typeof SkillsEnum>;
export type ProficiencyLevel = z.infer<typeof ProficiencyLevelEnum>;
export type FightingStyle = z.infer<typeof FightingStyleEnum>;