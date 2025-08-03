import { z } from "zod";

import { WeaponIdEnum } from "../shared/data-based-enums.schema.js";
import {
  DistanceUnitEnum,
  DurationUnitEnum,
} from "./primitives/world.primitives.js";
import {
  AbilityScoreEnum,
  ConditionStatusEnum,
  CreatureTypeEnum,
} from "./primitives/character.primitives.js";
import { CoverEnum, DamageTypeEnum } from "./primitives/combat.primitives.js";
import { WeaponPropertyEnum } from "./primitives/item.primitives.js";

// ============================================================================
// SEÇÃO 1: Fórmulas e Cálculos
// ============================================================================

/**
 * ✅ REATORADO: Usando discriminatedUnion para ser mais explícito.
 * Agora, um DC fixo é `{ type: 'fixed', value: 15 }` e um calculado
 * é `{ type: 'calculated', ... }`, eliminando ambiguidades.
 */
export const DcSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("fixed"), value: z.number().int() }),
  z.object({
    type: z.literal("calculated"),
    base: z.number().int(),
    attributes: z.array(
      AbilityScoreEnum.or(z.literal("proficiency")).or(
        z.literal("spellcasting")
      )
    ),
  }),
]);

/**
 * ✅ CORRIGIDO: Schema específico para Testes de Resistência.
 * Encapsula a Classe de Dificuldade (DC) e regras adicionais
 * como ignorar cobertura, mantendo o DcSchema genérico e focado.
 */
export const SavingThrowSchema = z.object({
  ability: AbilityScoreEnum,
  dc: DcSchema,
  ignoreCovers: z.array(CoverEnum).optional(),
});

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

export const HealingFormulaSchema = z.object({
  type: z.literal("healing"),
  roll: DiceRollSchema.optional(),
  fixed: z.number().int().optional(),
  addSpellcastingModifier: z.boolean().optional(),
});

export const DamageFormulaSchema = z.object({
  type: z.literal("damage"),
  roll: DiceRollSchema.optional(),
  fixed: z.number().int().optional(),
  damageTypeOptions: z.array(DamageTypeEnum),
});

export const ConditionalHPFormulaSchema = z.object({
  type: z.literal("conditional"),
  condition: z.literal("targetIsWounded"),
  ifTrue: z.lazy(() => DamageFormulaSchema),
  ifFalse: z.lazy(() => DamageFormulaSchema),
});

const HalfDamageFormulaSchema = z.object({
  type: z.literal("halfDamage"),
  of: z
    .string()
    .min(1, "É necessário especificar o ID do outcome de dano original."),
});

/**
 * ✅ REATORADO: Mudado para discriminatedUnion para melhor performance
 * de validação e clareza de erros.
 */
export const HPFormulaSchema = z
  .discriminatedUnion("type", [
    HealingFormulaSchema,
    DamageFormulaSchema,
    ConditionalHPFormulaSchema,
    HalfDamageFormulaSchema,
  ])
  .refine(
    (data) => {
      if (data.type === "conditional" || data.type === "halfDamage")
        return true;
      return data.roll || data.fixed !== undefined;
    },
    {
      message:
        "A fórmula precisa ter pelo menos uma rolagem (roll) ou um valor fixo (fixed).",
    }
  );

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

// ============================================================================
// SEÇÃO 2: Estruturas de Ação
// ============================================================================

export const RangeSchema = z.object({
  normal: z.number().int().optional(),
  long: z.number().int().optional(),
  unit: DistanceUnitEnum.default("ft"),
});

/**
 * ✏️ SUGESTÃO: O enum de seleção foi simplificado para ser mais claro.
 * 'choice' significa que o conjurador escolhe os alvos dentro da área.
 * 'all' significa que todos os alvos elegíveis na área são afetados.
 */
const SelectionModeEnum = z.enum(["choice", "all"]);

/**
 * ✅ REATORADO: O schema de alvo agora é mais explícito sobre sua função.
 * Ele define o que é "mirado" para a conjuração da magia/ação.
 * A área de efeito (o que é realmente afetado) é um conceito separado.
 */
export const TargetSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("self") }),
  z.object({
    type: z.literal("selfArea"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),

  z.object({
    type: z.literal("creature"),
    quantity: z.number().int().default(1),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
  z.object({
    type: z.literal("object"),
    quantity: z.number().int().default(1),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
  z.object({
    type: z.literal("point"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }), // Usado para originar áreas de efeito
  z.object({
    type: z.literal("descriptive"),
    details: z.string(),
  }),
]);

// ============================================================================
// SEÇÃO 3: Requisitos e Condições
// ============================================================================

export const ConditionSchema = z.discriminatedUnion("type", [
  // Requisitos de Atributo/Nível
  z.object({
    type: z.literal("hasAttribute"),
    attribute: AbilityScoreEnum,
    value: z.number().int(),
  }),
  z.object({ type: z.literal("isAncestry"), ancestry: z.string() }),
  z.object({ type: z.literal("hasLevel"), value: z.number().int() }),
  // Requisitos de Item/Equipamento
  z.object({ type: z.literal("isAttuned") }),
  z.object({
    type: z.literal("isEquippingItem"),
    itemIds: z.array(WeaponIdEnum),
  }),
  z.object({ type: z.literal("isProficientWithEquippedWeapon") }),
  // Requisitos de Estado/Status
  z.object({ type: z.literal("hasZeroHP") }),
  z.object({
    type: z.literal("hasStatus"),
    status: ConditionStatusEnum,
    is: z.boolean(),
  }),
  z.object({
    type: z.literal("hasBeenAffectedBySpell"),
    spellId: z.string(),
    withinLast: z.object({
      value: z.number(),
      unit: z.enum(["hour", "day", "round"]),
    }),
  }),
  // Requisitos de Tipo
  z.object({
    type: z.literal("isObject"),
    isFlammable: z.boolean().optional(),
    isWorn: z.boolean().optional(),
    isCarried: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("isCreatureType"),
    creatureType: CreatureTypeEnum,
  }),
]);

export const RequirementSchema = z.object({
  user: z.array(ConditionSchema).optional(),
  target: z.array(ConditionSchema).optional(),
  allTargetsInArea: z.array(ConditionSchema).optional(),
  environment: z.array(z.any()).optional(),
});

// ============================================================================
// SEÇÃO 4: Estruturas Geométricas e de Duração
// ============================================================================

export const WeaponPropertySchema = z.object({
  property: WeaponPropertyEnum.array(),
  condition: z.string().optional(),
});

export const AreaSchema = z.discriminatedUnion("shape", [
  z.object({
    shape: z.literal("sphere"),
    radius: z.number(),
    unit: DistanceUnitEnum.default("ft"),
  }),
  z.object({
    shape: z.literal("cube"),
    size: z.number(),
    unit: DistanceUnitEnum.default("ft"),
  }),
  z.object({
    shape: z.literal("cone"),
    length: z.number(),
    unit: DistanceUnitEnum.default("ft"),
  }),
  z.object({
    shape: z.literal("line"),
    length: z.number(),
    width: z.number(),
    unit: DistanceUnitEnum.default("ft"),
  }),
]);

export const DurationSchema = z.object({
  unit: DurationUnitEnum,
  value: z.number().int().optional(),
  isConcentration: z.boolean().default(false).optional(),
});
