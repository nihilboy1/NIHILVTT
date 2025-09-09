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



export const ItemPropertyEnum = z.enum(["pickLockDC", "burstDC"]);

export const CostUnitEnum = z.enum(["copper", "silver", "gold", "platinum"]);

export const WeightUnitEnum = z.enum(["lb"]);
