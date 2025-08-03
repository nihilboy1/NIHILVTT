import { z } from "zod";
import {
  ConditionEnum,
  CreatureSizeEnum,
  DistanceUnitEnum,
  EffectOutcomeEnum,
} from "../shared/primitives.js";
import {
  DamageFormulaSchema,
  DurationSchema,
  HPFormulaSchema,
  SpellRequirementsSchema,
} from "../shared/blocks.schema.js";
import {
  effectSchema,
  ApplicableEffectType,
  applicableEffectSchema,
} from "../shared/effect.schema.js";

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

export const MoveTargetOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("moveTarget"),
  on: EffectOutcomeEnum,
  direction: z.enum(["towards", "away"]), // Para puxar ou empurrar
  distance: z.object({
    value: z.number().int().positive(),
    unit: DistanceUnitEnum, // Reutilizando o enum de distância
  }),
  allowedSizes: z.array(CreatureSizeEnum).optional(), // <-- SUA SUGESTÃO APLICADA
});

export const ModifyHPOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("modifyHP"),
  on: EffectOutcomeEnum,
  vitals: z.array(z.enum(["maxHp", "currentHp", "tempHp"])),
  operation: z.enum(["add", "subtract", "set"]), // <-- OPERAÇÃO EXPLÍCITA
  formula: HPFormulaSchema, // <-- FÓRMULA FLEXÍVEL
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
  details: z.string(),
});

export const CustomMechanicOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("customMechanic"),
  on: EffectOutcomeEnum,
  mechanic: z.string(),
  details: z.any().optional(),
});

export const ApplyCustomEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyCustomEffect"),
  on: EffectOutcomeEnum,
  effect: z.string(),
  value: z.number().optional(),
});

export const BaseActionOutcomesSchema = z.discriminatedUnion("type", [
  NoneOutcomeSchema,
  DamageOutcomeSchema,
  ModifyHPOutcomeSchema,
  ApplyConditionOutcomeSchema,
  DescriptiveOutcomeSchema,
  CustomMechanicOutcomeSchema,
  ApplyCustomEffectOutcomeSchema,
]);

const ApplyEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyEffect"),
  on: EffectOutcomeEnum,
  effect: z.lazy(() => applicableEffectSchema),
});
const SummonTokenOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("summonToken"),
  on: EffectOutcomeEnum,
  token: z.object({
    name: z.string(),
    quantity: z.number().int().min(1),
    effects: z.array(z.lazy(() => effectSchema)),
  }),
  duration: DurationSchema.optional(),
});

export const ModifyAttributeOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("modifyAttribute"),
  on: EffectOutcomeEnum,
  attribute: z.enum(["speed"]),
  operation: z.enum(["add", "subtract"]),
  value: z.number().int().positive("O valor da modificação deve ser positivo."),
  duration: DurationSchema,
});

type NoneOutcomeType = z.infer<typeof NoneOutcomeSchema>;
type DamageOutcomeType = z.infer<typeof DamageOutcomeSchema>;
type ModifyHPOutcomeType = z.infer<typeof ModifyHPOutcomeSchema>;
type ApplyConditionOutcomeType = z.infer<typeof ApplyConditionOutcomeSchema>;
type ModifyAttributeOutcomeType = z.infer<typeof ModifyAttributeOutcomeSchema>;
type CustomMechanicOutcomeType = z.infer<typeof CustomMechanicOutcomeSchema>;
type ApplyCustomEffectOutcomeType = z.infer<
  typeof ApplyCustomEffectOutcomeSchema
>;
type DescriptiveOutcomeType = z.infer<typeof DescriptiveOutcomeSchema>;
type MoveTargetOutcomeType = z.infer<typeof MoveTargetOutcomeSchema>;

export type ApplyEffectOutcomeType = {
  id?: string;
  type: "applyEffect";
  on: z.infer<typeof EffectOutcomeEnum>;
  effect: ApplicableEffectType;
};
export type SummonTokenOutcomeType = {
  id?: string;
  type: "summonToken";
  on: z.infer<typeof EffectOutcomeEnum>;
  token: { name: string; quantity: number; effects: ApplicableEffectType[] };
  duration?: z.infer<typeof DurationSchema>;
};

export type ActionOutcomeType =
  | NoneOutcomeType
  | DamageOutcomeType
  | ModifyHPOutcomeType
  | ApplyConditionOutcomeType
  | DescriptiveOutcomeType
  | ApplyEffectOutcomeType
  | SummonTokenOutcomeType
  | CustomMechanicOutcomeType
  | ModifyAttributeOutcomeType
  | MoveTargetOutcomeType
  | ApplyCustomEffectOutcomeType;

export const ActionOutcomesSchema: z.ZodType<ActionOutcomeType> =
  z.discriminatedUnion("type", [
    ...BaseActionOutcomesSchema.options,
    ApplyEffectOutcomeSchema,
    SummonTokenOutcomeSchema,
    ModifyAttributeOutcomeSchema,
    MoveTargetOutcomeSchema,
  ] as any);

export type ActionOutcome = z.infer<typeof ActionOutcomesSchema>;
