// src/shared/outcome-paths.ts

import { z } from "zod";

// ============================================================================
// PRIMITIVOS GERAIS E DE JOGO
// ============================================================================

export const SourceEnum = z.enum(["LDJ2024"]);

export const CreatureTypeEnum = z.enum([
  "aberration",
  "beast",
  "celestial",
  "construct",
  "dragon",
  "elemental",
  "fey",
  "fiend",
  "giant",
  "humanoid",
  "monstrosity",
  "ooze",
  "plant",
  "undead",
]);

export const RootParameterPaths = z.enum([
  "activation.cost.amount",
  "activation.cost.resourceId",
  "activation.cost.source",
  "activation.type",
  "area.radius",
  "area.shape",
  "area.size",
  "attackType",
  "charges.max",
  "overrideAbilityScore",
  "range.normal",
  "range.unit",
  "save.ability",
  "save.dc",
  "save.dc.attributes",
  "save.dc.base",
  "target.details",
  "target.quantity",
  "target.type",
]);

export const OutcomeParameterPaths = z.enum([
  "allowedSizes",
  "attribute",
  "condition",
  "details",
  "details.against",
  "details.duration.unit",
  "details.duration.value",
  "details.on",
  "direction",
  "distance.unit",
  "distance.value",
  "duration.unit",
  "duration.value",
  "effect",
  "effect.actionId",
  "effect.count",
  "effect.duration.isConcentration",
  "effect.duration.unit",
  "effect.duration.value",
  "effect.modifier.appliesTo",
  "effect.modifier.count",
  "effect.modifier.dice.count",
  "effect.modifier.dice.faces",
  "effect.modifier.faces",
  "effect.modifier.operation",
  "effect.modifier.target",
  "effect.on",
  "effect.parameters.activation.type",
  "effect.parameters.attackType",
  "effect.parameters.outcomes",
  "effect.parameters.overrideAbilityScore",
  "effect.parameters.range.normal",
  "effect.parameters.range.unit",
  "effect.parameters.target.quantity",
  "effect.parameters.target.type",
  "effect.properties.bright",
  "effect.properties.dim",
  "effect.properties.duration.unit",
  "effect.properties.duration.value",
  "effect.requiresChoice",
  "effect.scaling.rules",
  "effect.scaling.type",
  "effect.skill",
  "effect.trigger",
  "effect.type",
  "formula.addSpellcastingModifier",
  "formula.condition",
  "formula.damageTypeOptions",
  "formula.fixed",
  "formula.ifFalse.damageTypeOptions",
  "formula.ifFalse.roll.count",
  "formula.ifFalse.roll.faces",
  "formula.ifFalse.type",
  "formula.ifTrue.damageTypeOptions",
  "formula.ifTrue.roll.count",
  "formula.ifTrue.roll.faces",
  "formula.ifTrue.type",
  "formula.roll.count",
  "formula.roll.explodeLimit",
  "formula.roll.explodesOn",
  "formula.roll.faces",
  "formula.type",
  "id",
  "mechanic",
  "on",
  "operation",
  "token.effects",
  "token.name",
  "token.quantity",
  "type",
  "value",
  "vitals",
]);

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

export const BaseConditionEnum = z.enum([
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
export type BaseCondition = z.infer<typeof BaseConditionEnum>;

// Condições do sistema / pseudoConditions
export const PseudoConditionEnum = z.enum([
  "inflamable", // ex: alvo coberto de óleo, resina, etc
  "wet", // ex: encharcado, pode tomar choque ou gelo
  "frozen", // ex: temporário, facilita quebrar
  "burning", // ex: está em chamas, dano por turno
]);
export type PseudoCondition = z.infer<typeof PseudoConditionEnum>;

export const ConditionEnum = z.union([BaseConditionEnum, PseudoConditionEnum]);
export type Condition = z.infer<typeof ConditionEnum>;

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

export const EffectOutcomeEnum = z.enum([
  "fail",
  "success",
  "hit",
  "miss",
  "custom",
]);

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

export const CreatureSizeEnum = z.enum([
  "tiny",
  "small",
  "medium",
  "large",
  "huge",
  "gargantuan",
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

export const DistanceUnitEnum = z.enum(["ft", "mile"]);

export const ScalablePropertyEnum = z.enum([
  "dice", // Para modificar o dado de um DiceRollSchema
  "bonus", // Para modificar o bónus de um DiceRollSchema
  "value", // Para modificar um valor numérico genérico
  "radius", // Para modificar o raio de uma AreaSchema
  "length", // Para modificar o comprimento de uma AreaSchema
]);

export const WeightUnitEnum = z.enum(["lb"]);

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
