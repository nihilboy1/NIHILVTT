import { z } from "zod";
import { ConditionEnum, EffectOutcomeEnum } from "./primitives.js";
import {
  AreaSchema,
  DamageFormulaSchema,
  DiceRollSchema,
  DurationSchema,
} from "./blocks.schema.js";
// CORREÇÃO: Importamos o Hub central 'Schemas' em vez de membros individuais.
import { Schemas } from "../domain/schemas.js";

const NoneOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("none"),
  on: EffectOutcomeEnum,
});

/**
 * Outcome que causa dano direto.
 * - 'on' indica se é aplicado em 'fail', 'success', 'hit' etc.
 * - 'formula' define o dano (dados, tipo, bônus).
 */
const DamageOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("damage"),
  on: EffectOutcomeEnum,
  formula: DamageFormulaSchema,
});
const ModifyVitalsOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("modifyVitals"),
  on: EffectOutcomeEnum,
  vitals: z.array(z.enum(["maxHp", "currentHp", "tempHp"])),
  formula: DiceRollSchema,
});

const conditionsThatRequireDuration = new Set([
  "poisoned",
  "frightened",
  "restrained",
]);
const ApplyConditionOutcomeSchema = z
  .object({
    id: z.string().optional(),
    type: z.literal("applyCondition"),
    on: EffectOutcomeEnum,
    condition: ConditionEnum,
    duration: DurationSchema.optional(),
  })
  .refine(
    (data) =>
      !conditionsThatRequireDuration.has(data.condition) ||
      data.duration !== undefined,
    {
      message: "Duration is required for this condition",
      path: ["duration"],
    }
  );
const ApplyEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyEffect"),
  on: EffectOutcomeEnum,
  effect: z.lazy(() => Schemas.ApplicableEffectSchema),
});
const SummonTokenOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("summonToken"),
  on: EffectOutcomeEnum,
  token: z.object({
    name: z.string(),
    quantity: z.number().int().min(1, "Quantity must be at least 1"),
    effects: z.array(z.lazy(() => Schemas.EffectSchema)),
  }),
  duration: DurationSchema,
});
const PlaySoundOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("playSound"),
  on: EffectOutcomeEnum,
  soundId: z.string(),
});
const NotifyPlayerOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("notifyPlayer"),
  on: EffectOutcomeEnum,
  message: z.string(),
  target: z.enum(["caster", "targetCreature", "allPCs"]),
});
const CreateNarrativeTriggerOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("createNarrativeTrigger"),
  on: EffectOutcomeEnum,
  triggerId: z.string(),
  duration: DurationSchema,
  area: AreaSchema.optional(),
  gmActions: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        outcome: z.discriminatedUnion("type", [
          PlaySoundOutcomeSchema,
          NotifyPlayerOutcomeSchema,
          DamageOutcomeSchema,
          ApplyConditionOutcomeSchema,
        ]),
      })
    )
    .nonempty("gmActions must have at least one action"),
});
const CustomMechanicOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("customMechanic"),
  on: EffectOutcomeEnum,
  mechanic: z.string(),
  details: z.record(z.string(), z.any()).optional(),
});
export const ActionOutcomesSchema = z.discriminatedUnion("type", [
  DamageOutcomeSchema,
  ModifyVitalsOutcomeSchema,
  ApplyConditionOutcomeSchema,
  ApplyEffectOutcomeSchema,
  SummonTokenOutcomeSchema,
  NoneOutcomeSchema,
  CreateNarrativeTriggerOutcomeSchema,
  PlaySoundOutcomeSchema,
  NotifyPlayerOutcomeSchema,
  CustomMechanicOutcomeSchema,
]);
