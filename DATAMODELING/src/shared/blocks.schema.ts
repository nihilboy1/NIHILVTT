import { z } from "zod";
import {
  AbilityScoreEnum,
  DamageTypeEnum,
  DistanceUnitEnum,
  DurationUnitEnum,
  WeaponPropertyEnum,
} from "./primitives.js";
export const DcSchema = z.union([
  z.number().int(),
  z.object({
    base: z.number().int(),
    attributes: z.array(
      AbilityScoreEnum.or(z.literal("proficiency")).or(
        z.literal("spellcasting")
      )
    ),
  }),
]);
export const DiceRollSchema = z.object({
  dice: z.string().regex(/^\d+d\d+$/),
  bonus: z.union([z.number().int(), AbilityScoreEnum]).optional(),
});
export const DamageFormulaSchema = DiceRollSchema.extend({
  damageType: DamageTypeEnum,
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
export const WeaponPropertySchema = z.object({
  property: WeaponPropertyEnum,
  condition: z.string().optional(),
});
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
  value: z.number().int().optional(),
  isConcentration: z.boolean().default(false).optional(),
});
export const RangeSchema = z.object({
  normal: z.number().int().optional(),
  long: z.number().int().optional(),
  unit: DistanceUnitEnum.default("ft"),
});
export const TargetSchema = z.discriminatedUnion("type", [
  z.object({ type: z.enum(["self", "touch", "pointInSpace"]) }),
  z.object({
    type: z.enum(["creature", "object"]),
    quantity: z.number().int().default(1),
  }),
  z.object({ type: z.literal("descriptive"), text: z.string() }),
]);
