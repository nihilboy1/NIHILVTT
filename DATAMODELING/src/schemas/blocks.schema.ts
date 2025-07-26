// Em src/schemas/blocks.schema.ts

import { z } from "zod";
import {
  AbilityScoreEnum,
  DamageTypeEnum,
  DistanceUnitEnum,
  DurationUnitEnum,
  WeaponPropertyEnum,
} from "./primitives.js";
// A importação circular de 'outcomes.schema.js' foi removida.

export const DcSchema = z.union([
  z.number().int(),
  z.object({
    base: z.number().int(),
    attributes: z.array(AbilityScoreEnum.or(z.literal("proficiency"))),
  }),
]);

export const DamageFormulaSchema = z.object({
  dice: z.string().regex(/^\d+d\d+$/),
  damageType: DamageTypeEnum,
  bonus: z.number().int().optional(),
});

export const AcSchema = z.discriminatedUnion("calculation", [
  z.object({ calculation: z.literal("base"), value: z.number() }),
  z.object({ calculation: z.literal("bonus"), value: z.number() }),
  z.object({
    calculation: z.literal("formula"),
    base: z.number(),
    attribute: AbilityScoreEnum,
    maxBonus: z.number().optional(),
  }),
]);

export const WeaponPropertySchema = z.union([
  WeaponPropertyEnum,
  z.object({ name: z.string(), condition: z.string() }),
]);

export const AreaSchema = z.discriminatedUnion("shape", [
  z.object({ shape: z.literal("sphere"), radius: z.number() }),
  z.object({ shape: z.literal("cube"), size: z.number() }),
  z.object({ shape: z.literal("cone"), length: z.number() }),
  z.object({ shape: z.literal("line"), length: z.number(), width: z.number() }),
]);

export const RequirementSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("attribute"),
    attribute: AbilityScoreEnum,
    value: z.number().int(),
  }),
  z.object({ type: z.literal("ancestry"), ancestry: z.string() }),
  z.object({ type: z.literal("level"), value: z.number().int() }),
  z.object({ type: z.literal("attunement") }),
]);

export const DurationSchema = z.object({
  unit: DurationUnitEnum,
  value: z.number().int().optional(), // Opcional para durações como "instantaneous" ou "special"
});

export const RangeSchema = z.object({
  normal: z
    .number()
    .int()
    .optional() /** Tornando opcional para alcances como "self" ou "touch" */,
  /** O alcance longo (máximo) opcional. Ataques neste alcance geralmente têm desvantagem. */
  long: z.number().int().optional(),
  /** A unidade de medida, geralmente "ft" (pés). */
  unit: DistanceUnitEnum.default("ft"),
});

export const TargetSchema = z.discriminatedUnion("type", [
  // Alvos simples que não precisam de mais detalhes
  z.object({ type: z.enum(["self", "touch", "pointInSpace"]) }),

  // Alvos que podem ter uma quantidade
  z.object({
    type: z.enum(["creature", "object"]),
    quantity: z.number().int().default(1),
  }),

  // Para alvos complexos ou com condições especiais
  z.object({
    type: z.literal("descriptive"),
    text: z.string(), // Ex: "fiend or undead", "humanoids only"
  }),
]);
