import z from "zod";

export const RollModeEnum = z.enum(["normal", "advantage", "disadvantage"]);

export const CoverEnum = z.enum(["half", "threeQuarters", "total"]);

export const ActionTypeEnum = z.enum([
  "action",
  "bonus",
  "reaction",
  "free",
  "special",
]);

export const AttackSourceEnum = z.enum([
  "weapon",
  "spell",
  "natural",
  "item",
  "unarmed",
  "any",
]);

export const HPTypesEnum = z.enum(["maxHp", "currentHp", "tempHp"]);

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
  "spellEnd",
  "any",
]);

export const ResourceTypeEnum = z.enum([
  "charge",
  "spellSlot",
]);

export const RechargeEventEnum = z.enum([
  "dawn",
  "dusk",
  "shortRest",
  "longRest",
  "turn",
  "round",
  "roll",
]);
