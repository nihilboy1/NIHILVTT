import { z } from "zod";

// ============================================================================
// PRIMITIVOS GERAIS E DE JOGO
// ============================================================================

export const SourceEnum = z.enum(["LDJ2024"]);

export const RarityEnum = z.enum([
  "none",
  "common",
  "uncommon",
  "rare",
  "veryRare",
  "legendary",
  "artifact",
]);

// ============================================================================
// PRIMITIVOS DE PERSONAGEM
// ============================================================================

export const AbilityScoreEnum = z.enum([
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
]);

export const SkillEnum = z.enum([
  "acrobatics",
  "animalHandling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleightOfHand",
  "stealth",
  "survival",
]);

export const ConditionEnum = z.enum([
  "blinded",
  "charmed",
  "deafened",
  "frightened",
  "grappled",
  "incapacitated",
  "invisible",
  "paralyzed",
  "petrified",
  "poisoned",
  "prone",
  "restrained",
  "stunned",
  "unconscious",
]);

// ============================================================================
// PRIMITIVOS DE COMBATE E AÇÕES
// ============================================================================

export const ActionTypeEnum = z.enum([
  "action",
  "bonusAction",
  "reaction",
  "free",
  "special",
]);

export const AttackTypeEnum = z.enum([
  "meleeWeaponAttack",
  "rangedWeaponAttack",
  "meleeSpellAttack",
  "rangedSpellAttack",
  "rangedItemAttack",
  "meleeItemAttack",
]);

export const DamageTypeEnum = z.enum([
  "slashing",
  "piercing",
  "bludgeoning",
  "poison",
  "acid",
  "fire",
  "cold",
  "radiant",
  "necrotic",
  "lightning",
  "thunder",
  "force",
  "psychic",
]);

export const EffectOutcomeEnum = z.enum(["fail", "success", "hit", "miss"]);

export const ReactionTriggerEnum = z.enum([
  "targetEntersReach",
  "targetLeavesReach",
  "allyIsHit",
  "selfIsDamaged",
]);

export const ResourceCostIdEnum = z.enum([
  "action",
  "bonusAction",
  "reaction",
  "itemCharge",
  "spellSlot",
]);

export const RechargeEventEnum = z.enum([
  "dawn",
  "dusk",
  "shortRest",
  "longRest",
]);

// ============================================================================
// PRIMITIVOS DE MAGIA
// ============================================================================

export const MagicSchoolEnum = z.enum([
  "abjuration",
  "conjuration",
  "divination",
  "enchantment",
  "evocation",
  "illusion",
  "necromancy",
  "transmutation",
]);

// SUGESTÃO: Renomeado de SpellComponentSchema para consistência
export const SpellComponentEnum = z.enum(["verbal", "somatic", "material"]);

// ============================================================================
// PRIMITIVOS DE ITEM
// ============================================================================
export const WeaponTypeEnum = z.enum(["melee", "ranged"]);

export const ItemTypeEnum = z.enum(["gear", "tool", "weapon", "armor"]);

export const ArmorTypeEnum = z.enum(["light", "medium", "heavy", "shield"]);

export const WeaponPropertyEnum = z.enum([
  "versatile",
  "finesse",
  "thrown",
  "ammunition",
  "heavy",
  "loading",
  "reach",
  "twoHanded",
  "light",
  "special",
]);

export const WeaponMasteryEnum = z.enum([
  "topple",
  "sap",
  "vex",
  "slow",
  "push",
  "nick",
  "graze",
  "cleave",
]);

export const WeaponCategoryEnum = z.enum(["simple", "martial"]);

export const ItemPropertyEnum = z.enum(["pickLockDC", "burstDC"]);

// ============================================================================
// PRIMITIVOS DE MEDIDA E AMBIENTE
// ============================================================================

export const DurationUnitEnum = z.enum([
  "round",
  "minute",
  "hour",
  "day",
  "turn",
  "instantaneous",
  "special",
  "unlimited",
]);

// SUGESTÃO: Removidos valores que não são unidades de medida para maior precisão.
export const DistanceUnitEnum = z.enum(["ft", "mile"]);

export const ScalablePropertyEnum = z.enum([
  "dice", // Para modificar o dado de um DiceRollSchema
  "bonus", // Para modificar o bónus de um DiceRollSchema
  "value", // Para modificar um valor numérico genérico
  "radius", // Para modificar o raio de uma AreaSchema
  "length", // Para modificar o comprimento de uma AreaSchema
]);

export const WeightUnitEnum = z.enum(["lb"]);

// SUGESTÃO: Corrigido erro de digitação de "Cooper" para "Copper"
export const CostUnitEnum = z.enum(["copper", "silver", "gold", "platinum"]);

export const SurfaceTypeEnum = z.enum([
  "fire",
  "ice",
  "acid",
  "grease",
  "water",
  "web",
  "darkness",
]);

export const SurfaceTriggerEnum = z.enum([
  "onEnterArea",
  "onStartTurnInArea",
  "onEndTurnInArea",
]);
