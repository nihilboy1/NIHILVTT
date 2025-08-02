import { z } from "zod";
import {
  AbilityScoreEnum,
  CreatureTypeEnum,
  DamageTypeEnum,
  DistanceUnitEnum,
  DurationUnitEnum,
  WeaponPropertyEnum,
} from "./primitives.js";
import { WeaponIdEnum } from "../data/items/items-weapon.js";

// ============================================================================
// SEÇÃO: Fórmulas e Cálculos
// Contém schemas para rolagens de dados, dano, cura e Classe de Armadura.
// ============================================================================

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
  count: z.number().int().min(1, "A quantidade de dados deve ser no mínimo 1."),
  faces: z
    .number()
    .int()
    .min(1, "O número de faces do dado deve ser no mínimo 1."),
  bonus: z.number().int().optional(),
  explodesOn: z.number().optional(),
  explodeLimit: z
    .union([z.number().int(), z.literal("spellcastingModifier")])
    .optional(),
});

const BaseDamageFormulaSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal("damage"),
      roll: DiceRollSchema.optional(),
      fixed: z.number().int().optional(),
      damageTypeOptions: z
        .array(DamageTypeEnum)
        .min(1, "É necessário especificar pelo menos um tipo de dano."),
    }),
    z.object({
      type: z.literal("healing"),
      roll: DiceRollSchema.optional(),
      fixed: z.number().int().optional(),
    }),
  ])
  .refine((data) => data.roll || data.fixed !== undefined, {
    message:
      "A fórmula precisa ter pelo menos uma rolagem (roll) ou um valor fixo (fixed).",
  });

const ConditionalDamageFormulaSchema = z.object({
  condition: z.literal("targetIsWounded"),
  ifTrue: z.lazy(() => BaseDamageFormulaSchema),
  ifFalse: z.lazy(() => BaseDamageFormulaSchema),
});

export const DamageFormulaSchema = z.union([
  BaseDamageFormulaSchema,
  ConditionalDamageFormulaSchema,
]);

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

export const HPFormulaSchema = z
  .object({
    roll: DiceRollSchema.optional(),
    fixed: z.number().int().optional(),
    addSpellcastingModifier: z.boolean()
  })
  .refine((data) => data.roll || data.fixed !== undefined, {
    message:
      "A fórmula de valor precisa ter pelo menos uma rolagem (roll) ou um valor fixo (fixed).",
  });

// ============================================================================
// SEÇÃO: Estruturas de Ação
// Contém schemas que definem os componentes de uma ação, como alcance e alvo.
// ============================================================================

export const RangeSchema = z.object({
  normal: z.number().int().optional(),
  long: z.number().int().optional(),
  unit: DistanceUnitEnum.default("ft"),
});

export const TargetSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("self") }),
  z.object({ type: z.literal("pointInSpace") }),
  z.object({
    type: z.literal("creature"),
    quantity: z.number().int().default(1),
  }),
  z.object({
    type: z.literal("object"),
    quantity: z.number().int().default(1),
  }),
  z.object({
    type: z.literal("descriptive"),
    details: z.string(),
  }),
]);

// ============================================================================
// SEÇÃO: Requisitos
// Contém schemas para definir pré-condições para usar itens ou magias.
// ============================================================================

// --- Requisitos de Itens (Legado) ---
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

// --- Condições do Conjurador ---
const CasterEquippedItemSchema = z.object({
  type: z.literal("equippedItem"),
  itemIds: z.array(WeaponIdEnum),
  details: z.string().optional(),
});

const CasterProficientWithEquippedWeaponSchema = z.object({
  type: z.literal("beProficientWithEquippedWeapon"),
  details: z.string().optional(),
});

const CasterConditionSchema = z.discriminatedUnion("type", [
  CasterEquippedItemSchema,
  CasterProficientWithEquippedWeaponSchema,
]);

// --- Condições do Alvo ---
const TargetHasZeroHPSchema = z.object({
  type: z.literal("hasZeroHP"),
  details: z.string().optional(),
});

const TargetIsCreatureType = z.object({
  type: z.literal("isCreatureType"),
  creatureType: CreatureTypeEnum,
  details: z.string().optional(),
});

const TargetConditionSchema = z.discriminatedUnion("type", [
  TargetHasZeroHPSchema,
  TargetIsCreatureType,
]);

// --- Schema Principal de Requisitos de Magia ---
export const SpellRequirementsSchema = z.object({
  casterConditions: z.array(CasterConditionSchema).optional(),
  targetConditions: z.array(TargetConditionSchema).optional(),
});

// ============================================================================
// SEÇÃO: Estruturas Geométricas e de Duração
// Contém schemas para áreas de efeito, duração e propriedades de armas.
// ============================================================================

export const WeaponPropertySchema = z.object({
  property: WeaponPropertyEnum.array(),
  condition: z.string().optional(),
});

export const AreaSchema = z.discriminatedUnion("shape", [
  z.object({ shape: z.literal("sphere"), radius: z.number() }),
  z.object({ shape: z.literal("cube"), size: z.number() }),
  z.object({ shape: z.literal("cone"), length: z.number() }),
  z.object({ shape: z.literal("line"), length: z.number(), width: z.number() }),
]);

export const DurationSchema = z.object({
  unit: DurationUnitEnum,
  value: z.number().int().optional(),
  isConcentration: z.boolean().default(false).optional(),
});

export const AdditionalRulesSchema = z.object({
  id: z.string(),
  details: z.string(),
});
