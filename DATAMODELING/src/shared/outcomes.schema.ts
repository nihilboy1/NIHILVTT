import { z } from "zod";
import { EffectOutcomeEnum, ConditionEnum } from "./primitives.js";
import { DamageFormulaSchema, DurationSchema } from "./blocks.schema.js";

export const NoneOutcomeSchema = z.object({
  on: EffectOutcomeEnum,
  type: z.literal("none"),
});

export const DamageOutcomeSchema = z.object({
  type: z.literal("damage"),
  on: EffectOutcomeEnum,
  formula: DamageFormulaSchema,
});

export const ApplyConditionOutcomeSchema = z.object({
  type: z.literal("applyCondition"),
  on: EffectOutcomeEnum,
  condition: ConditionEnum,
  duration: DurationSchema.optional(), // <-- MUITO MAIS LIMPO!
});

export const ApplyCustomEffectOutcomeSchema = z.object({
  type: z.literal("applyCustomEffect"),
  on: EffectOutcomeEnum,
  effect: z.string(),
  value: z.union([z.string(), z.number(), z.boolean()]).optional(),
  duration: DurationSchema.optional(), // <-- MUITO MAIS LIMPO!
});

export const CustomMechanicOutcomeSchema = z.object({
  type: z.literal("customMechanic"),
  on: EffectOutcomeEnum,
  mechanic: z.string(),
  details: z.record(z.string(), z.any()).optional(),
});

export const ActionOutcomeSchema = z.discriminatedUnion("type", [
  DamageOutcomeSchema,
  ApplyConditionOutcomeSchema,
  ApplyCustomEffectOutcomeSchema,
  CustomMechanicOutcomeSchema,
  NoneOutcomeSchema,
]);
