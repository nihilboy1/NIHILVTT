import { z } from "zod";

import { SpellIdEnum, WeaponIdEnum } from "../shared/data-based-enums.schema.js";
import {
  DistanceUnitEnum,
  DurationUnitEnum,
} from "./primitives/world.primitives.js";
import {
  AbilityScoreEnum,
  AncestryIdEnum,
  ConditionStatusEnum,
  CreatureTypeEnum,
} from "./primitives/character.primitives.js";
import {
  CoverEnum,
  DamageTypeEnum,
  EventTriggerEnum,
  RollModeEnum,
} from "./primitives/combat.primitives.js";
import { WeaponPropertyEnum } from "./primitives/item.primitives.js";

// ============================================================================
// SEÇÃO 1: Fórmulas e Cálculos
// ============================================================================
// Interface para a parte recursiva do nosso tipo
interface ConditionalHPFormulaType {
  type: "conditional";
  conditionals: z.infer<typeof ConditionSchema>[];
  ifTrue: HPFormulaType;
  ifFalse?: HPFormulaType;
}

// O tipo de união final que será usado em todo o sistema
type HPFormulaType =
  | z.infer<typeof HealingFormulaSchema>
  | z.infer<typeof DamageFormulaSchema>
  | ConditionalHPFormulaType // Usando a interface manual limpa
  | z.infer<typeof HalfDamageFormulaSchema>;

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

export const BaseRollModifierSchema = z.object({
  type: z.literal("rollModifier"),
  mode: RollModeEnum,
});

export const RollModifierSchema = z.lazy(() =>
  z.discriminatedUnion("type", [
    BaseRollModifierSchema,
    z.object({
      type: z.literal("conditionalRollModifier"),
      triggers: EventTriggerEnum.array(),
      ifTrue: BaseRollModifierSchema,
      ifFalse: BaseRollModifierSchema,
    }),
  ])
);

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

export const ConditionSchema = z.discriminatedUnion("type", [
  // ─── ATRIBUTOS E NÍVEL ──────────────────────────────
  z.object({
    type: z.literal("hasAttribute"),
    attribute: AbilityScoreEnum,
    value: z.number().int().min(0),
  }),
  z.object({
    type: z.literal("isAncestry"),
    ancestry: AncestryIdEnum, // evita string solta
  }),
  z.object({
    type: z.literal("hasLevel"),
    value: z.number().int().min(1),
  }),

  // ─── ITENS E EQUIPAMENTOS ────────────────────────────
  z.object({
    type: z.literal("isAttuned"),
  }),
  z.object({
    type: z.literal("isEquippingItem"),
    itemIds: WeaponIdEnum.array().nonempty(),
  }),
  z.object({
    type: z.literal("isProficientWithEquippedWeapon"),
  }),

  // ─── STATUS / CONDIÇÕES ─────────────────────────────
  z.object({
    type: z.literal("hasZeroHP"),
  }),
  z.object({
    type: z.literal("targetIsWounded"),
  }),
  z.object({
    type: z.literal("hasStatus"),
    status: ConditionStatusEnum,
    is: z.boolean().default(true),
  }),
  z.object({
    type: z.literal("hasBeenAffectedBySpell"),
    spellId: SpellIdEnum,
    withinLast: z.object({
      value: z.number().positive(),
      unit: z.enum(["hour", "day", "round"]),
    }),
  }),

  // ─── TIPO / CATEGORIA DE ALVO ───────────────────────
  z.object({
    type: z.literal("isObject"),
    isFlammable: z.boolean().optional(),
    isWorn: z.boolean().optional(),
    isCarried: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("isCreatureType"),
    creatureTypes: CreatureTypeEnum.array().nonempty(),
  }),
]);

const HalfDamageFormulaSchema = z.object({
  type: z.literal("halfDamage"),
  of: z
    .string()
    .min(1, "É necessário especificar o ID do outcome de dano original."),
});

export const ConditionalHPFormulaSchema = z.object({
  type: z.literal("conditional"),
  conditionals: z.array(z.lazy(() => ConditionSchema)),
  ifTrue: z.lazy(() => HPFormulaSchema),
  ifFalse: z.lazy(() => HPFormulaSchema).optional(),
});

export const HPFormulaSchema: z.ZodType<HPFormulaType> = z
  .discriminatedUnion("type", [
    HealingFormulaSchema,
    DamageFormulaSchema,
    ConditionalHPFormulaSchema,
    HalfDamageFormulaSchema,
  ])
  .refine(
    (data) => {
      // ✅ CORRIGIDO: A validação agora entende que 'conditional' não tem 'roll' ou 'fixed'
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

const SelectionModeEnum = z.enum(["choice", "all"]);

export const TargetSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("self") }),
  z.object({ type: z.literal("selfArea") }),
  z.object({
    type: z.literal("creature"),
    quantity: z.number().int().default(1),
    creatureTypes: z.array(CreatureTypeEnum).optional(),
  }),
  z.object({
    type: z.literal("object"),
    quantity: z.number().int().default(1),
  }),
  z.object({
    type: z.literal("weapon"),
    quantity: z.number().int().default(1),
    properties: z.array(DamageTypeEnum).optional(),
  }),
  z.object({ type: z.literal("point") }),
  z.object({
    type: z.literal("descriptive"),
    details: z.string(),
  }),
]);

// ============================================================================
// SEÇÃO 3: Requisitos e Condições
// ============================================================================

export const RequirementSchema = z.object({
  user: z.array(ConditionSchema).optional(),
  target: z.array(ConditionSchema).optional(),
  allTargetsInArea: z.array(ConditionSchema).optional(),
  environment: z.array(z.any()).optional(),
});

// ============================================================================
// SEÇÃO 4: Estruturas Geométricas e de Duração
// ============================================================================


export const AreaSchema = z.discriminatedUnion("shape", [
  z.object({
    shape: z.literal("sphere"),
    radius: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
  z.object({
    shape: z.literal("cube"),
    size: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
  z.object({
    shape: z.literal("cone"),
    length: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
  z.object({
    shape: z.literal("line"),
    length: z.number(),
    width: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
]);

export const DurationSchema = z.object({
  unit: DurationUnitEnum,
  value: z.number().int().optional(),
  isConcentration: z.boolean().default(false).optional(),
});
