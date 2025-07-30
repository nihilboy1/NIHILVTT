// ============================================================================
// >> INÍCIO: src/domain/shared/outcome.schema.ts
// Este arquivo definirá todos os possíveis resultados de uma ação.
// Ele dependerá de Efeitos, então precisará importá-los.
// ============================================================================

import { z } from "zod";
import { ConditionEnum, EffectOutcomeEnum } from "../shared/primitives.js";
import {
  DamageFormulaSchema,
  DiceRollSchema,
  DurationSchema,
} from "../shared/blocks.schema.js";
import {
  effectSchema,
  EffectType,
  applicableEffectSchema,
} from "../shared/effect.schema.js";

interface NoneOutcomeType {
  id?: string;
  type: "none";
  on: z.infer<typeof EffectOutcomeEnum>;
}
interface DamageOutcomeType {
  id?: string;
  type: "damage";
  on: z.infer<typeof EffectOutcomeEnum>;
  formula: z.infer<typeof DamageFormulaSchema>;
}
interface ModifyVitalsOutcomeType {
  id?: string;
  type: "modifyVitals";
  on: z.infer<typeof EffectOutcomeEnum>;
  vitals: Array<"maxHp" | "currentHp" | "tempHp">;
  formula: z.infer<typeof DiceRollSchema>;
}
interface ApplyConditionOutcomeType {
  id?: string;
  type: "applyCondition";
  on: z.infer<typeof EffectOutcomeEnum>;
  condition: z.infer<typeof ConditionEnum>;
  duration?: z.infer<typeof DurationSchema>;
}
interface DescriptiveOutcomeType {
  id?: string;
  type: "descriptive";
  on: z.infer<typeof EffectOutcomeEnum>;
  text: string;
}
interface ApplyEffectOutcomeType {
  id?: string;
  type: "applyEffect";
  on: z.infer<typeof EffectOutcomeEnum>;
  effect: EffectType;
}
interface SummonTokenOutcomeType {
  id?: string;
  type: "summonToken";
  on: z.infer<typeof EffectOutcomeEnum>;
  token: { name: string; quantity: number; effects: EffectType[] };
  duration: z.infer<typeof DurationSchema>;
}
interface CustomMechanicOutcomeType {
  id?: string;
  type: "customMechanic";
  on: z.infer<typeof EffectOutcomeEnum>;
  mechanic: string;
  details?: any;
}
// Adicionado de volta, conforme solicitado
interface ApplyCustomEffectOutcomeType {
  id?: string;
  type: "applyCustomEffect";
  on: z.infer<typeof EffectOutcomeEnum>;
  effect: string;
  value?: number;
}

export type ActionOutcomeType =
  | NoneOutcomeType
  | DamageOutcomeType
  | ModifyVitalsOutcomeType
  | ApplyConditionOutcomeType
  | DescriptiveOutcomeType
  | ApplyEffectOutcomeType
  | SummonTokenOutcomeType
  | CustomMechanicOutcomeType
  | ApplyCustomEffectOutcomeType; // Adicionado de volta

export const NoneOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("none"),
  on: EffectOutcomeEnum,
});
export const DamageOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("damage"),
  on: EffectOutcomeEnum,
  formula: DamageFormulaSchema,
});
export const ModifyVitalsOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("modifyVitals"),
  on: EffectOutcomeEnum,
  vitals: z.array(z.enum(["maxHp", "currentHp", "tempHp"])),
  formula: DiceRollSchema,
});
export const ApplyConditionOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyCondition"),
  on: EffectOutcomeEnum,
  condition: ConditionEnum,
  duration: DurationSchema.optional(),
});
export const DescriptiveOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("descriptive"),
  on: EffectOutcomeEnum,
  text: z.string(),
});
export const CustomMechanicOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("customMechanic"),
  on: EffectOutcomeEnum,
  mechanic: z.string(),
  details: z.any().optional(),
});
// Adicionado de volta, conforme solicitado
export const ApplyCustomEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyCustomEffect"),
  on: EffectOutcomeEnum,
  effect: z.string(),
  value: z.number().optional(), // CORREÇÃO APLICADA AQUI
});

export const BaseActionOutcomesSchema = z.discriminatedUnion("type", [
  NoneOutcomeSchema,
  DamageOutcomeSchema,
  ModifyVitalsOutcomeSchema,
  ApplyConditionOutcomeSchema,
  DescriptiveOutcomeSchema,
  CustomMechanicOutcomeSchema,
  ApplyCustomEffectOutcomeSchema, // Adicionado de volta
]);

const ApplyEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyEffect"),
  on: z.enum(["success", "fail", "hit", "miss"]),
  effect: z.lazy(() => applicableEffectSchema),
});
const SummonTokenOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("summonToken"),
  on: z.enum(["success", "fail", "hit", "miss"]),
  token: z.object({
    name: z.string(),
    quantity: z.number().int().min(1),
    effects: z.array(z.lazy(() => effectSchema)),
  }),
  duration: DurationSchema,
});

export const actionOutcomesSchema: z.ZodType<ActionOutcomeType> =
  z.discriminatedUnion("type", [
    ...BaseActionOutcomesSchema.options,
    ApplyEffectOutcomeSchema,
    SummonTokenOutcomeSchema,
  ] as any);

export type ActionOutcome = z.infer<typeof actionOutcomesSchema>;
