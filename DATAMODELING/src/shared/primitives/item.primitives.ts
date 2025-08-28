// ============================================================================
// PRIMITIVOS DE ITEM E EQUIPAMENTO
// Proposta: Mover para 'item.primitives.ts'
// ============================================================================

import z from "zod";

export const RarityEnum = z.enum([
  "none",
  "common",
  "uncommon",
  "rare",
  "veryRare",
  "legendary",
  "artifact",
]);

export const ItemTypeEnum = z.enum(["gear", "tool", "weapon", "armor"]);

export const ArmorTypeEnum = z.enum(["light", "medium", "heavy", "shield"]);

export const WeaponRangeEnum = z.enum(["melee", "ranged"]);
export const WeaponTypeEnum = z.enum(["simple", "martial"]);


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

export const ItemPropertyEnum = z.enum(["pickLockDC", "burstDC"]);

export const CostUnitEnum = z.enum(["copper", "silver", "gold", "platinum"]);

export const WeightUnitEnum = z.enum(["lb"]);
