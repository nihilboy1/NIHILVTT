import { z } from "zod";

export const AbilityScoreEnum = z.enum([
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
]);

// Adicionar em primitives.ts
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

export const SpellComponentSchema = z.enum(["V", "S", "M"]);

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

export const RarityEnum = z.enum([
  "none",
  "common",
  "uncommon",
  "rare",
  "veryRare",
  "legendary",
  "artifact",
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

export const SourceEnum = z.enum(["LDJ2024"]);
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

export const ActionTypeEnum = z.enum([
  "action",
  "bonusAction",
  "reaction",
  "free",
  "special",
]);

export const EffectOutcomeEnum = z.enum(["fail", "success", "hit", "miss"]);

export const CostUnitEnum = z.enum([
  "CooperPiece",
  "SilverPiece",
  "GoldPiece",
  "PlatinumPiece",
]);

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

export const DurationUnitEnum = z.enum([
  "round",
  "minute",
  "hour",
  "day",
  "turn", // Ex: até o final do próximo turno
  "instantaneous", // Para efeitos imediatos
  "special", // Para durações como "até ser dissipada"
  "unlimited", // Para efeitos permanentes
]);

export const WeaponCategoryEnum = z.enum(["simple", "martial"]);

export const WeaponTypeEnum = z.enum(["melee", "ranged"]);

export const WeightUnitEnum = z.enum(["lb"]);

export const DistanceUnitEnum = z.enum([
  "ft", // Pés (feet)
  "mile", // Milhas
  "self", // O alcance é o próprio lançador
  "touch", // Alcance de toque
  "special", // Para alcances especiais descritos no texto
  "unlimited", // Alcance ilimitado
]);

export const AttackTypeEnum = z.enum([
  "meleeWeaponAttack",
  "rangedWeaponAttack",
  "meleeSpellAttack",
  "rangedSpellAttack",
  "rangedItemAttack", // Usado pelo item "Ácido" e outros
  "meleeItemAttack",
]);

export const RechargeEventEnum = z.enum([
  "dawn", // Ao amanhecer
  "dusk", // Ao anoitecer
  "shortRest", // Após um descanso curto
  "longRest", // Após um descanso longo
]);

export const ResourceCostIdEnum = z.enum([
  "action",
  "bonusAction",
  "reaction",
  "itemCharge", // Carga do próprio item
  "spellSlot", // Espaço de magia de um determinado nível
]);

export const ItemPropertyEnum = z.enum([
  "pickLockDC", // Dificuldade para arrombar (lockpicking)
  "burstDC", // Dificuldade para arrebentar com Força
]);
