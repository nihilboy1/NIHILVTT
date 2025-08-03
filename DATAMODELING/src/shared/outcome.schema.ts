import { object, z } from "zod";

import {
  DurationSchema,
  HPFormulaSchema,
  RequirementSchema,
} from "../shared/blocks.schema.js";
import {
  EffectSchema,
  ApplicableEffectType,
  ApplicableEffectSchema,
} from "../shared/effect.schema.js";
import { DistanceUnitEnum } from "./primitives/world.primitives.js";
import {
  DamageTypeEnum,
  EffectOutcomeEnum,
} from "./primitives/combat.primitives.js";
import {
  ConditionStatusEnum,
  CreatureSizeEnum,
} from "./primitives/character.primitives.js";

// ============================================================================
// SEÇÃO: SCHEMAS DE RESULTADOS (OUTCOMES) INDIVIDUAIS
// Cada schema representa um resultado possível de uma ação.
// ============================================================================

export const NoneOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("none"),
  on: EffectOutcomeEnum,
});

export const MoveTargetOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("moveTarget"),
  on: EffectOutcomeEnum,
  direction: z.enum(["towards", "away"]),
  distance: z.object({
    value: z.number().int().positive(),
    unit: DistanceUnitEnum,
  }),
  allowedSizes: z.array(CreatureSizeEnum).optional(),
});

export const ModifyTargetHPOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("modifyTargetHP"),
  on: EffectOutcomeEnum,
  formula: HPFormulaSchema,
  vitals: z
    .array(z.enum(["maxHp", "currentHp", "tempHp"]))
    .default(["currentHp"]),
});

export const ApplyConditionOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyCondition"),
  on: EffectOutcomeEnum,
  condition: ConditionStatusEnum,
  requirements: RequirementSchema.optional(),
  duration: DurationSchema.optional(),
});

export const DescriptiveOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("descriptive"),
  on: EffectOutcomeEnum,
  details: z.string(),
});

export const DealWeaponDamageOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("dealWeaponDamage"),
  on: EffectOutcomeEnum,
  properties: z.object({ damageTypeOptions: DamageTypeEnum.array() }),
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

export const ModifyAttributeOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("modifyAttribute"),
  on: EffectOutcomeEnum,
  attribute: z.enum(["speed"]),
  operation: z.enum(["add", "subtract"]),
  value: z.number().int().positive("O valor da modificação deve ser positivo."),
  duration: DurationSchema,
});

// --- Schemas com Dependências Circulares ---
// Estes schemas dependem do EffectSchema, que por sua vez depende dos outcomes.
// O uso de z.lazy() é a solução correta para quebrar essa referência circular.

const ApplyEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyEffect"),
  on: EffectOutcomeEnum,
  effect: z.lazy(() => ApplicableEffectSchema),
});

const SummonTokenOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("summonToken"),
  on: EffectOutcomeEnum,
  token: z.object({
    name: z.string(),
    quantity: z.number().int().min(1),
    effects: z.array(z.lazy(() => EffectSchema)),
  }),
  duration: DurationSchema.optional(),
});

// ============================================================================
// SEÇÃO: TIPOS E UNIÃO FINAL DOS SCHEMAS
// ============================================================================

// --- Tipos Manuais para Schemas com z.lazy() ---
// A inferência de tipo do Zod (z.infer) pode ter dificuldades com
// discriminatedUnion contendo schemas lazy. Definir os tipos manualmente,
// como feito aqui, é a abordagem mais robusta para garantir a segurança de tipos.

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

// --- Tipo de União Final ---
// Agrega todos os tipos de outcomes possíveis em um único tipo.
export type ActionOutcomeType =
  | z.infer<typeof NoneOutcomeSchema>
  | z.infer<typeof ModifyTargetHPOutcomeSchema>
  | z.infer<typeof ApplyConditionOutcomeSchema>
  | z.infer<typeof DescriptiveOutcomeSchema>
  | z.infer<typeof CustomMechanicOutcomeSchema>
  | z.infer<typeof DealWeaponDamageOutcomeSchema>
  | z.infer<typeof ApplyCustomEffectOutcomeSchema>
  | z.infer<typeof ModifyAttributeOutcomeSchema>
  | z.infer<typeof MoveTargetOutcomeSchema>
  | ApplyEffectOutcomeType // Usando o tipo manual
  | SummonTokenOutcomeType; // Usando o tipo manual

// --- Schema de União Final ---
// O schema Zod que valida qualquer um dos outcomes possíveis.
// O cast `as any` é um artifício necessário para contornar as limitações
// de inferência de tipo do Zod ao combinar schemas normais e lazy em uma união.
export const ActionOutcomesSchema: z.ZodType<ActionOutcomeType> =
  z.discriminatedUnion("type", [
    NoneOutcomeSchema,
    ModifyTargetHPOutcomeSchema,
    ApplyConditionOutcomeSchema,
    DescriptiveOutcomeSchema,
    CustomMechanicOutcomeSchema,
    DealWeaponDamageOutcomeSchema,
    ApplyCustomEffectOutcomeSchema,
    ApplyEffectOutcomeSchema,
    SummonTokenOutcomeSchema,
    ModifyAttributeOutcomeSchema,
    MoveTargetOutcomeSchema,
  ] as any);

export type ActionOutcome = z.infer<typeof ActionOutcomesSchema>;
